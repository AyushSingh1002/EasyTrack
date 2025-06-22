'use client';

import { motion } from 'framer-motion';
import Script from 'next/script';
import { openRazorpay } from '../api/pay/route';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';

const openPay = async (price, plan) => {

  try {
    console.log("Clicked plan:", price, plan);

    const amountInPaise = Math.round(parseFloat(price.replace('$', '')) * 100);

    const res = await fetch('/api/pay', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'create-order', amount: amountInPaise }),
    });

    if (!res.ok) throw new Error(await res.text());

    const { order } = await res.json(); // assuming your backend returns the order object directly
    console.log('Created order:', order);

    toast.success('Pay now!', { duration: 3000 });
    console.log("order id issss", order.id)

    openRazorpay(amountInPaise, plan, order.id ); // Pass amount, plan, and orderId
  } catch (err) {
    console.error('Payment failed:', err);
    toast.error('Something went wrong');
  }
};




export default function Pricing() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 py-12 px-4 sm:px-6 flex items-center justify-center">
      <section id="pricing" className="max-w-4xl mx-auto">
        <motion.h2
          className="text-2xl sm:text-3xl font-semibold text-center text-white mb-8 relative"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          Pricing Plans
          <span className="block w-16 h-0.5 bg-blue-500 mx-auto mt-2" />
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              title: 'Free',
              description: 'Perfect for getting started with job tracking.',
              price: '1',
              period: '/mo',
              features: [
                'Track up to 10 applications',
                'Basic analytics',
                'Email support',
                'Limited export options',
              ],
              buttonText: 'Get Started',
              highlighted: false,
            },
            {
              title: 'Pro',
              description: 'Ideal for serious job seekers.',
              price: '5',
              period: '/mo',
              features: [
                'Unlimited applications',
                'Advanced analytics',
                'Priority support',
                'Full export capabilities',
              ],
              buttonText: 'Choose Pro',
              highlighted: true,
            },
            {
              title: 'Enterprise',
              description: 'Tailored for teams and businesses.',
              price: '1',
              period: '',
              features: [
                'Custom integrations',
                'Dedicated support',
                'Team features',
                'API access',
              ],
              buttonText: 'Contact Us',
              highlighted: false,
            },
          ].map((plan, index) => (
            <motion.div
              key={plan.title}
              className={`bg-gray-900 p-6 rounded-md shadow-lg text-center border ${
                plan.highlighted
                  ? 'border-blue-500 bg-gradient-to-b from-blue-500/10 to-transparent'
                  : 'border-gray-800'
              } hover:shadow-xl hover:bg-gray-800 transition duration-300 relative overflow-hidden`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.15, ease: 'easeOut' }}
              whileHover={{ scale: 1.03 }}
            >
              <h3 className="text-lg font-semibold text-white">{plan.title}</h3>
              <p className="text-sm text-gray-400 mt-1">{plan.description}</p>
              <p className="text-xl font-bold text-blue-400 mt-3">
                {plan.price}
                <span className="text-xs text-gray-400">{plan.period}</span>
              </p>
              <ul className="mt-4 text-gray-400 text-sm space-y-2">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-blue-500 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <motion.button
              onClick={() => openPay(plan.price, plan.title)}
                className="mt-6 w-full bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition duration-200 text-sm font-medium bg-gradient-to-r from-blue-600 to-blue-500"
                whileHover={{ scale: 1.05, boxShadow: '0 0 8px rgba(59, 130, 246, 0.3)' }}
                whileTap={{ scale: 0.95 }}
              >
                {plan.buttonText}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </section>
      <Script
  src="https://checkout.razorpay.com/v1/checkout.js"
  strategy="afterInteractive"
  onLoad={() => console.log('Razorpay SDK loaded')}
/>

    </div>
  );
}