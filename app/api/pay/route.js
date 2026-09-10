import crypto from "crypto";
import { NextResponse } from "next/server";
import { pool } from "@/app/api/pg";
import { getSessionUser } from "@/app/helper/sessionManager";

const plans = {
  Starter: { amount: 50, tokens: 5 },
  Pro: { amount: 400, tokens: 20 },
  "10 extra analyses": { amount: 100, tokens: 10 },
  "25 extra emails": { amount: 150, tokens: 25 },
  "Full bundle (50 tokens)": { amount: 250, tokens: 50 },
};

export async function POST(req) {
  try {
    const user = await getSessionUser();
    const body = await req.json();
    const plan = plans[body.planName];
    const phone = typeof body.customer_phone === "string" && /^[0-9+ -]{7,20}$/.test(body.customer_phone)
      ? body.customer_phone : "9999999999";
    if (!plan || body.order_id || !Number.isFinite(plan.amount)) {
      return NextResponse.json({ success: false, message: "Invalid payment request" }, { status: 400 });
    }

    const orderId = `order_${crypto.randomUUID()}`;
    const appId = process.env.CASHFREE_APP_ID;
    const secretKey = process.env.CASHFREE_SECRET_KEY;
    const baseUrl = process.env.CASHFREE_MODE === "PRODUCTION" ? "https://api.cashfree.com/pg" : "https://sandbox.cashfree.com/pg";
    if (!appId || !secretKey || !process.env.SITE_URL) return NextResponse.json({ success: false, message: "Payment service unavailable" }, { status: 503 });

    const customerId = `cust_${crypto.randomUUID()}`;
    await pool.query(
      `INSERT INTO orders (order_id, order_amount, customer_email, customer_phone, customer_id, user_id, active_plan, tokens_awarded)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
      [orderId, plan.amount, user.email, phone, customerId, user.uid, body.planName, plan.tokens]
    );

    const response = await fetch(`${baseUrl}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-client-id": appId, "x-client-secret": secretKey, "x-api-version": "2022-09-01" },
      body: JSON.stringify({
        order_id: orderId, order_amount: plan.amount, order_currency: "INR",
        customer_details: { customer_id: customerId, customer_email: user.email, customer_phone: phone },
        order_meta: { return_url: `${process.env.SITE_URL}/pricing/`, notify_url: `${process.env.SITE_URL}/api/webhook` },
      }),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.payment_session_id) {
      await pool.query("UPDATE orders SET status = 'failed', updated_at = CURRENT_TIMESTAMP WHERE order_id = $1", [orderId]);
      return NextResponse.json({ success: false, message: "Unable to create payment session" }, { status: 502 });
    }
    await pool.query("UPDATE orders SET payment_session_id = $1, updated_at = CURRENT_TIMESTAMP WHERE order_id = $2", [data.payment_session_id, orderId]);
    return NextResponse.json({ success: true, data: { payment_session_id: data.payment_session_id, order_id: orderId } });
  } catch (error) {
    if (error.message === "Unauthorized") return NextResponse.json({ success: false, message: "Authentication required" }, { status: 401 });
    console.error("Payment creation failed", error.message);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
