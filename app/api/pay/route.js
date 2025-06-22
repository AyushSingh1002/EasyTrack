import { instance } from "@/app/utils/razorpay";
import { NextResponse } from "next/server";
import toast from "react-hot-toast";
import { getRandomPokemonImageUrl } from "@/app/lib/randomProfile";
const url = getRandomPokemonImageUrl()




export async function POST(req) {

  const body = await req.json();
  const { action } = body;

  if (action === 'create-order') {
    const { amount } = body;
    const order = await instance.orders.create({
      amount,
      currency: 'INR',
    });
    return NextResponse.json({ order });
  }

  if (action === 'verify-payment') {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    const crypto = await import('crypto');
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + '|' + razorpay_payment_id)
      .digest('hex');

    if (generatedSignature === razorpay_signature) {
      return NextResponse.json({ verified: true });
    } else {
      return NextResponse.json({ verified: false }, { status: 400 });
    }
  }

  return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
}

   export const openRazorpay = (amount, plan, orderid) => {
    console.log("rederid is =", orderid)
  const options = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    amount: amount * 100, // in paise
    currency: 'INR',
    name: plan,
    description: 'Test Transaction',
    order_id: orderid,
    image: url,

    handler: async function (response) {
    handlePaymentVerification(response); // async function
    },

    prefill: {
      name: 'Test User',
      email: 'test.user@example.com',
      contact: '9999999999',
    },

    theme: {
      color: '#3399cc',
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};

const handlePaymentVerification = async (response) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;

  try {
    const res = await fetch('/api/pay', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'verify-payment',
        razorpay_payment_id,
        razorpay_order_id,
        razorpay_signature
      }),
    });

    const result = await res.json();

    if (result.verified) {
      console.log("✅ Payment verified!");
      const res = await fetch('/api/token', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ tokensToAdd: 10 }),
});

const result = await res.json();

      toast.success("token successfully added")
    } else {
      console.error("❌ Payment verification failed");
    }
  } catch (err) {
    console.error("💥 Error verifying payment:", err);
  }
};
