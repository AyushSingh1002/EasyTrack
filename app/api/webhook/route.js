import { NextResponse } from "next/server";
import { headers } from "next/headers";
import crypto from "crypto";
import { pool } from "@/app/api/pg";
import { awardTokens } from "@/app/lib/tokenService";

function validSignature(signature, body, secret, timestamp) {
  if (!/^\d+$/.test(timestamp)) return false;
  if (Math.abs(Date.now() - Number(timestamp)) > 5 * 60 * 1000) return false;
  const expected = crypto.createHmac("sha256", secret).update(timestamp + body).digest("base64");
  const received = Buffer.from(signature);
  const generated = Buffer.from(expected);
  return received.length === generated.length && crypto.timingSafeEqual(received, generated);
}

export async function POST(req) {
  const headerList = await headers();
  const signature = headerList.get("x-webhook-signature");
  const timestamp = headerList.get("x-webhook-timestamp");
  const secret = process.env.CASHFREE_WEBHOOK_SECRET;
  const rawBody = await req.text();

  if (!signature || !timestamp || !secret || !validSignature(signature, rawBody, secret, timestamp)) {
    return NextResponse.json({ success: false, message: "Invalid webhook" }, { status: 401 });
  }

  let webhookData;
  try {
    webhookData = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ success: false, message: "Invalid payload" }, { status: 400 });
  }

  const orderId = webhookData?.data?.order?.order_id;
  const payment = webhookData?.data?.payment;
  if (!orderId || !payment?.payment_id) {
    return NextResponse.json({ success: false, message: "Invalid payload" }, { status: 400 });
  }

  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query(
      `INSERT INTO payments (order_id, payment_id, payment_amount, payment_currency, payment_status)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (payment_id) DO UPDATE SET payment_status = EXCLUDED.payment_status`,
      [orderId, payment.payment_id, payment.payment_amount || null, payment.payment_currency || null, payment.payment_status || null]
    );

    const statusMap = {
      PAYMENT_SUCCESS: "success", PAYMENT_SUCCESS_WEBHOOK: "success", PAYMENT_FAILED: "failed",
      PAYMENT_PENDING: "pending", REFUND_SUCCESS: "refunded", PAYMENT_CHARGES_WEBHOOK: "charged",
    };
    const status = statusMap[webhookData.type];
    if (status) await client.query("UPDATE orders SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE order_id = $2", [status, orderId]);

    if (status === "success") {
      const order = await client.query(
        `UPDATE orders SET tokens_awarded = 0, updated_at = CURRENT_TIMESTAMP
         WHERE order_id = $1 AND tokens_awarded > 0
         RETURNING user_id, tokens_awarded`, [orderId]
      );
      const row = order.rows[0];
      if (row?.user_id && row.tokens_awarded > 0) await awardTokens(client, row.user_id, row.tokens_awarded);
    }
    await client.query("COMMIT");
    return NextResponse.json({ success: true });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Webhook processing failed", error.message);
    return NextResponse.json({ success: false, message: "Webhook processing failed" }, { status: 500 });
  } finally {
    client.release();
  }
}
