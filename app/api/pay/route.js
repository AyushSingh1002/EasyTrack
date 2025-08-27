import { NextResponse } from "next/server";
import { pool } from "@/app/api/pg";

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
      planName,
      token
    } = await req.json();

    // Validate input
    if (!order_id || !order_amount) {
      return NextResponse.json(
        { success: false, message: "Missing required fields: order_id and order_amount" },
        { status: 400 }
      );
    }

    // Validate order amount (minimum ₹1 for sandbox)
    const amount = parseFloat(order_amount);
    if (amount < 1) {
      return NextResponse.json(
        { success: false, message: "Order amount must be at least ₹1" },
        { status: 400 }
      );
    }

    // Calculate tokens based on plan name using the mapping
    let tokens_awarded = 0;
    if (planName && tokenMapping.hasOwnProperty(planName)) {
      tokens_awarded = tokenMapping[planName];
    } else if (token) {
      tokens_awarded = parseInt(token) || 0;
    }

    // Use server-side environment variables
    const appId = process.env.NEXT_PUBLIC_CASHFREE_APP_ID;
    const secretKey = process.env.NEXT_PUBLIC_CASHFREE_SECRET_KEY;
    const env = process.env.NEXT_PUBLIC_CASHFREE_ENV || "TEST";

    if (!appId || !secretKey) {
      console.error('Cashfree credentials missing');
      throw new Error('Cashfree credentials not configured');
    }

    const baseUrl = env === "PRODUCTION" 
      ? "https://api.cashfree.com/pg" 
      : "https://sandbox.cashfree.com/pg";

    const webhookUrl = process.env.NODE_ENV === "production" 
      ? `${process.env.NEXT_PUBLIC_SITE_URL}/api/webhook`
      : "https://6077512d8811.ngrok-free.app/api/webhook";

    const customerId = `cust_${Date.now()}`;

    // Store order in database
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
      amount, 
      customer_email || "customer@example.com", 
      customer_phone || "9999999999", 
      customerId,
      "unknown_user",
      planName || null,
      tokens_awarded
    ];

    const orderResult = await pool.query(insertOrderQuery, orderValues);
    console.log('Order saved to DB:', orderResult.rows[0]);

    // Prepare Cashfree request with proper structure
    const cashfreeRequestBody = {
      order_id: order_id,
      order_amount: amount,
      order_currency: "INR",
      customer_details: {
        customer_id: customerId,
        customer_email: customer_email || "customer@example.com",
        customer_phone: customer_phone || "9999999999",
      },
      order_meta: {
        return_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/pricing?order_id=${order_id}`,
        // Add more metadata for better tracking
        payment_methods: "cc,dc,upi,netbanking,paylater,wallet", // Specify allowed methods
      },
      order_note: planName ? `Plan: ${planName}, Tokens: ${tokens_awarded}` : null,
      notify_url: webhookUrl
    };

    console.log('Calling Cashfree API:', {
      url: `${baseUrl}/orders`,
      amount: amount
    });

    // Call Cashfree API
    const response = await fetch(`${baseUrl}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-client-id': appId,
        'x-client-secret': secretKey,
        'x-api-version': '2022-09-01'
      },
      body: JSON.stringify(cashfreeRequestBody)
    });

    const responseData = await response.json();
    console.log('Cashfree API Response:', {
      status: response.status,
      data: responseData
    });

    if (!response.ok) {
      // Update order status to failed
      await pool.query(
        `UPDATE orders SET status = 'failed', updated_at = CURRENT_TIMESTAMP WHERE order_id = $1`,
        [order_id]
      );
      
      // More specific error messages
      let errorMessage = responseData.message || `Cashfree API error: ${response.status}`;
      if (responseData.details) {
        errorMessage += ` - ${JSON.stringify(responseData.details)}`;
      }
      
      throw new Error(errorMessage);
    }

    if (!responseData.payment_session_id) {
      console.error('No payment_session_id in response:', responseData);
      throw new Error('No payment session ID received from Cashfree. Response: ' + JSON.stringify(responseData));
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
        tokens_awarded: tokens_awarded,
        // Return additional info for debugging
        cf_order_id: responseData.cf_order_id,
        order_status: responseData.order_status
      }
    });

  } catch (err) {
    console.error("Error in order creation:", err);
    return NextResponse.json(
      { 
        success: false, 
        message: err.message || "Something went wrong",
        error: err.toString(),
        // Add more context for debugging
        order_id: order_id
      },
      { status: 500 }
    );
  }
}
