import { NextResponse } from 'next/server';

const CF_APP_ID = process.env.CASHFREE_APP_ID;
const CF_SECRET_KEY = process.env.CASHFREE_SECRET_KEY;
const CF_MODE = (process.env.CASHFREE_MODE || process.env.NEXT_PUBLIC_CASHFREE_MODE || 'sandbox').toLowerCase();
const CF_BASE_URL = CF_MODE === 'production' ? 'https://api.cashfree.com/pg' : 'https://sandbox.cashfree.com/pg';

export async function POST(req) {
  try {
    const body = await req.json();
    const { action } = body || {};
    if (!action) return NextResponse.json({ error: 'Missing action' }, { status: 400 });

    // Create order for Cashfree Checkout
    if (action === 'create-order') {
      const { amount, plan, tokensToAdd } = body || {};
      if (!amount || Number.isNaN(Number(amount))) {
        return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
      }

      const res = await fetch(`${CF_BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'x-client-id': CF_APP_ID,
          'x-client-secret': CF_SECRET_KEY,
          'x-api-version': '2022-09-01',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          order_amount: Number(amount) / 100,
          order_currency: 'INR',
          order_note: plan || 'Plan purchase',
          customer_details: {
            customer_id: `cust_${Date.now()}`,
            customer_email: 'noreply@example.com',
            customer_phone: '9999999999',
          },
          order_meta: {
            return_url: 'https://your-domain.com/cashfree/return?order_id={order_id}',
          },
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        return NextResponse.json({ error: data?.message || 'Cashfree order failed' }, { status: 400 });
      }
      // data contains order_id and payment_session_id
      return NextResponse.json({ order: data });
    }

    // Verify payment status by orderId (for popup/redirect post-completion)
    if (action === 'verify-payment') {
      const { orderId } = body || {};
      if (!orderId) return NextResponse.json({ verified: false, error: 'Missing orderId' }, { status: 400 });

      const res = await fetch(`${CF_BASE_URL}/orders/${encodeURIComponent(orderId)}`, {
        method: 'GET',
        headers: {
          'x-client-id': CF_APP_ID,
          'x-client-secret': CF_SECRET_KEY,
          'x-api-version': '2022-09-01',
        },
      });

      const data = await res.json();
      if (!res.ok) {
        return NextResponse.json({ verified: false, error: data?.message || 'Verify failed' }, { status: 400 });
      }
      const status = data?.order_status || data?.status;
      const verified = status === 'PAID' || status === 'COMPLETED';
      return NextResponse.json({ verified, raw: data });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (err) {
    console.error('Cashfree API error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}