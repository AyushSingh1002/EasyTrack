import { NextResponse } from "next/server";
import { pool } from "@/app/api/pg";
import { getSessionUser } from "@/app/helper/sessionManager";

// Token mapping (same as frontend)
const tokenMapping = {
  Free: 0,
  Pro: 50,
  Enterprise: 0,
  '10 extra analyses': 10,
  '25 extra emails': 25,
  'Full bundle (50 tokens)': 50,
};

export async function POST(req) {
  try {
    const { 
      order_id, 
      order_amount, 
      customer_email, 
      customer_phone, 
      planName, // Changed from plan_id to planName to match frontend
      token // This might be passed directly, but we'll use mapping as primary
    } = await req.json();

    // Get user from session

    const userId = "unknown_user";

    // Validate input
    if (!order_id || !order_amount) {
      return NextResponse.json(
        { success: false, message: "Missing required fields: order_id and order_amount" },
        { status: 400 }
      );
    }

    // Calculate tokens based on plan name using the mapping
    let tokens_awarded = 0;
    if (planName && tokenMapping.hasOwnProperty(planName)) {
      tokens_awarded = tokenMapping[planName];
    } else if (token) {
      // Fallback to directly passed token value if mapping doesn't exist
      tokens_awarded = parseInt(token) || 0;
    }

    // Use server-side environment variables
    const appId = process.env.NEXT_PUBLIC_CASHFREE_APP_ID;
    const secretKey = process.env.NEXT_PUBLIC_CASHFREE_SECRET_KEY;
    const env = "production" || "TEST";

    if (!appId || !secretKey) {
      console.log('Cashfree credentials:', { appId: !!appId, secretKey: !!secretKey });
      throw new Error('Cashfree credentials not configured');
    }

    const baseUrl = env === "PRODUCTION" 
      ? "https://api.cashfree.com/pg" 
      : "https://sandbox.cashfree.com/pg";

    const webhookUrl = process.env.NODE_ENV === "PRODUCTION" 
      ? `${process.env.NEXT_PUBLIC_SITE_URL}/api/webhook`
      : "https://6077512d8811.ngrok-free.app/api/webhook";

    const customerId = `cust_${Date.now()}`;

    // Store order in database first with plan and token data
    // CORRECTED: Now matching 8 columns with 8 values
    const insertOrderQuery = `
      INSERT INTO orders (
        order_id, order_amount, customer_email, customer_phone, 
        customer_id, user_id, active_plan, tokens_awarded
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      ON CONFLICT (order_id) 
      DO UPDATE SET 
        order_amount = EXCLUDED.order_amount,
        customer_email = EXCLUDED.customer_email,
        customer_phone = EXCLUDED.customer_phone,
        user_id = EXCLUDED.user_id,
        active_plan = EXCLUDED.active_plan,
        tokens_awarded = EXCLUDED.tokens_awarded,
        updated_at = CURRENT_TIMESTAMP
      RETURNING *;
    `;

    const orderValues = [
      order_id, 
      parseFloat(order_amount), 
      customer_email || "customer@example.com", 
      customer_phone || "9999999999", 
      customerId,
      userId, // Link to user account
      planName || null, // Use planName directly for active_plan
      tokens_awarded
    ];

    console.log('Inserting order with values:', orderValues);

    const orderResult = await pool.query(insertOrderQuery, orderValues);
    console.log('Order saved to DB:', orderResult.rows[0]);

    // Call Cashfree API
    const response = await fetch(`${baseUrl}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-client-id': appId,
        'x-client-secret': secretKey,
        'x-api-version': '2022-09-01'
      },
      body: JSON.stringify({
        order_id: order_id,
        order_amount: parseFloat(order_amount),
        order_currency: "INR",
        customer_details: {
          customer_id: customerId,
          customer_email: customer_email || "customer@example.com",
          customer_phone: customer_phone || "9999999999",
        },
        order_meta: {
          return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/pricing`,
          // Add plan information to order meta for reference
          note: planName ? `Plan: ${planName}, Tokens: ${tokens_awarded}` : null
        },
        notify_url: webhookUrl
      })
    });

    const responseData = await response.json();
    console.log('Cashfree Response:', response.status, responseData);

    if (!response.ok) {
      // Update order status to failed
      await pool.query(
        `UPDATE orders SET status = 'failed', updated_at = CURRENT_TIMESTAMP WHERE order_id = $1`,
        [order_id]
      );
      
      throw new Error(responseData.message || `Cashfree API error: ${response.status}`);
    }

    if (!responseData.payment_session_id) {
      throw new Error('No payment session ID received from Cashfree');
    }

    // Update the order with payment session ID
    const updateOrderQuery = `
      UPDATE orders 
      SET payment_session_id = $1, updated_at = CURRENT_TIMESTAMP 
      WHERE order_id = $2
      RETURNING *;
    `;

    const updateResult = await pool.query(updateOrderQuery, [responseData.payment_session_id, order_id]);
    console.log('Order updated with payment session:', updateResult.rows[0]);

    return NextResponse.json({
      success: true,
      message: "Payment session created successfully",
      data: {
        payment_session_id: responseData.payment_session_id,
        order_id: responseData.order_id,
        active_plan: planName,
        tokens_awarded: tokens_awarded
      }
    });

  } catch (err) {
    console.error("Error in order creation:", err);
    return NextResponse.json(
      { 
        success: false, 
        message: err.message || "Something went wrong",
        error: err.toString()
      },
      { status: 500 }
    );
  }
}
