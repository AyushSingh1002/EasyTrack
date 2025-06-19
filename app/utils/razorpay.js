import Razorpay from "razorpay";
export const instance = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Replace with environment variables for security
  key_secret: process.env.RAZORPAY_KEY_SECRET
});