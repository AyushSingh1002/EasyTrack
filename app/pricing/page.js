'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Script from 'next/script';
import { openRazorpay } from '../api/pay/route';
import toast from 'react-hot-toast';

const openPay = async (price, plan, setSelectedPlan) => {
  try {
    const amountInPaise = Math.round(parseFloat(price.replace('$', '')) * 100);

    const res = await fetch('/api/pay', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'create-order', amount: amountInPaise }),
    });

    if (!res.ok) throw new Error(await res.text());
    const { order } = await res.json();

    toast.success('Pay now!', { duration: 3000 });
    openRazorpay(amountInPaise, plan, order.id, () => {
      setSelectedPlan(plan);
      localStorage.setItem('selectedPlan', plan);
      toast.success(`Successfully subscribed to ${plan} plan!`);
    });

    // Simulated success (for dev)
    setSelectedPlan(plan);
    localStorage.setItem('selectedPlan', plan);
  } catch (err) {
    console.error('Payment failed:', err);
    toast.error('Something went wrong');
  }
};

export default function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  useEffect(() => {
    const savedPlan = localStorage.getItem('selectedPlan');
    if (savedPlan) setSelectedPlan(savedPlan);
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 py-12 px-4 sm:px-6 flex flex-col items-center">
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

        {/* Main pricing grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              title: 'Free',
              description: 'Get started with essential tools at no cost.',
              price: 'Free',
              period: '',
              features: [
                '2 resume analyses',
                '5 email generations',
                'Basic dashboard access',
                'Community support',
              ],
              buttonText: 'Start Free',
              highlighted: false,
            },
            {
              title: 'Pro',
              description: 'For serious job seekers who need more power and flexibility.',
              price: '400',
              period: '/mo',
              features: [
                '20 resume analyses per month',
                '50 email generations per month',
                'Advanced dashboard & analytics',
                'Priority email support',
                'Access to upcoming features first',
              ],
              buttonText: 'Upgrade to Pro',
              highlighted: true,
            },
            {
              title: 'Enterprise',
              description: 'Custom solutions for teams, career coaches, or organizations.',
              price: 'Custom',
              period: '',
              features: [
                'Unlimited resume analyses & emails',
                'Team dashboard & collaboration tools',
                'Dedicated account manager',
                'Custom integrations and API access',
                'Bulk token purchase options',
              ],
              buttonText: 'Contact Sales',
              highlighted: false,
            },
          ].map((plan, index) => (
            <motion.div
              key={plan.title}
              className={`bg-gray-900 p-6 rounded-md shadow-lg text-center border relative ${
                plan.highlighted
                  ? 'border-blue-500 bg-gradient-to-b from-blue-500/10 to-transparent'
                  : 'border-gray-800'
              } hover:shadow-xl hover:bg-gray-800 transition duration-300 overflow-hidden`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.15, ease: 'easeOut' }}
              whileHover={{ scale: 1.03 }}
            >
              {selectedPlan === plan.title && (
                <motion.div
                  className="absolute top-5 -right-10 w-40 bg-blue-600 text-white text-xs font-medium py-1 text-center transform rotate-45 shadow-md z-10"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                  Your Current Plan
                </motion.div>
              )}
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
                onClick={() => openPay(plan.price, plan.title, setSelectedPlan)}
                className="mt-6 w-full bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition duration-200 text-sm font-medium bg-gradient-to-r from-blue-600 to-blue-500"
                whileHover={{ scale: 1.05, boxShadow: '0 0 8px rgba(59, 130, 246, 0.3)' }}
                whileTap={{ scale: 0.95 }}
              >
                {plan.buttonText}
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Add-ons section */}
        <motion.div
          className="mt-16 bg-gray-900 p-6 rounded-md shadow-lg border border-gray-800 hover:shadow-xl transition duration-300"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          whileHover={{ scale: 1.03 }}
        >
          <h3 className="text-lg font-semibold text-white text-center">Add-ons</h3>
          <p className="text-sm text-gray-400 text-center mt-1">
            Buy extra credits without upgrading your plan.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            {[
              { label: '10 extra analyses', price: '100' },
              { label: '25 extra emails', price: '150' },
              { label: 'Full bundle (50 tokens)', price: '250' },
            ].map((addon, idx) => (
              <motion.div
                key={idx}
                className="bg-gray-800 p-4 rounded-md border border-gray-700 hover:bg-gray-700 transition duration-200"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1, ease: 'easeOut' }}
                whileHover={{ scale: 1.03 }}
              >
                <p className="text-sm text-gray-400">{addon.label}</p>
                <p className="text-lg font-bold text-blue-400 mt-1">₹{addon.price}</p>
                <motion.button
                  onClick={() => openPay(addon.price, addon.label, setSelectedPlan)}
                  className="mt-4 w-full bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition duration-200 text-sm font-medium bg-gradient-to-r from-blue-600 to-blue-500"
                  whileHover={{ scale: 1.05, boxShadow: '0 0 8px rgba(59, 130, 246, 0.3)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  Buy Now
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </section>

 <motion.a
        href="/help"
        className="fixed bottom-6 right-6 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition duration-200 bg-gradient-to-r from-blue-600 to-blue-500 z-50"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        whileHover={{ scale: 1.1, boxShadow: '0 0 12px rgba(59, 130, 246, 0.4)' }}
        whileTap={{ scale: 0.9 }}
        aria-label="Go to FAQ"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </motion.a>

      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
        onLoad={() => console.log('Razorpay SDK loaded')}
      />
    </div>
  );
}