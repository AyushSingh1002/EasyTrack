'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Script from 'next/script';
import toast from 'react-hot-toast';


const tokenMapping = {
  Free: 5,
  Pro: 20,
  Enterprise: 0,
  '10 extra analyses': 10,
  '25 extra emails': 25,
  'Full bundle (50 tokens)': 50,
};

export default function Pricing() {

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [cashfree, setCashfree] = useState(null);

  useEffect(() => {
    const savedPlan = localStorage.getItem('selectedPlan');
    if (savedPlan) setSelectedPlan(savedPlan);
  }, []);

  // Initialize Cashfree when SDK loads
useEffect(() => {
  if (sdkLoaded && window.Cashfree) {
    const cashfreeInstance = window.Cashfree({
      mode: process.env.NEXT_PUBLIC_CASHFREE_MODE === "PRODUCTION" ? "production" : "sandbox"
    });
    setCashfree(cashfreeInstance);
  }
}, [sdkLoaded]);
  // Open Cashfree Hosted Checkout
  // Open Cashfree Hosted Checkout - UPDATED VERSION
const openCashfreeCheckout = async (paymentSessionId) => {
  if (!cashfree) {
    toast.error("Payment system is not ready. Please try again.");
    return;
  }

  try {
    const checkoutOptions = {
      paymentSessionId: paymentSessionId,
      redirectTarget: "_self", // Changed from "_self" to avoid potential issues
    };
    
    console.log("Starting checkout with session ID:", paymentSessionId);
    
    // Initialize checkout
    const result = await cashfree.checkout(checkoutOptions);
    
    if (result.error) {
      console.error("Checkout error:", result.error);
      toast.error("Failed to initialize payment. Please try again.");
    } else {
      console.log("Checkout initialized successfully");
    }
  } catch (err) {
    console.error("Failed to open checkout:", err);
    
    // More specific error handling
    if (err.message?.includes("session")) {
      toast.error("Payment session expired or invalid. Please try again.");
    } else {
      toast.error("Failed to process payment. Please try again.");
    }
  }
};

const handleBuyNow = async (price, planName) => {
  try {
    // Extract numeric value
    let numericPrice;
    if (typeof price === 'string') {
      numericPrice = price.replace('₹', '').replace(',', '').trim();
      if (price.toLowerCase().includes('contact')) {
        window.location.href = '/contactus';
        return;
      }
    } else {
      numericPrice = price;
    }

    if (isNaN(numericPrice) || numericPrice <= 0) {
      toast.error('Invalid price amount');
      return;
    }

    // Get tokens from mapping
    const tokens = tokenMapping[planName] || 0;

    const response = await fetch(`${window.location.origin}/api/pay`, { // Make sure this matches your API endpoint
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        order_id: `order_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
        order_amount: numericPrice,
        customer_phone: '9999999999', // You might want to get this from user session
        planName: planName, // Send the plan name
        token: tokens, // Send the token amount as backup

      }),
    });
    

    const data = await response.json();

    if (!data.success) {
      toast.error(data.message || 'Failed to initiate payment');
      return;
    }

    const paymentSessionId = data.data.payment_session_id;
    openCashfreeCheckout(paymentSessionId);

  } catch (err) {
    console.error('Error initiating payment:', err);
    toast.error('Something went wrong. Please try again.');
  }
};

const plans = [
  {
    title: 'Starter',
    description: 'Begin your journey with essential tools at an affordable cost.',
    price: '₹1',
    features: [
      '5 email generations',
      '2 resume analyses',
      'Basic dashboard access',
      'Community support'
    ],
    buttonText: 'Get Started',
    highlighted: false
  },
  {
    title: 'Pro',
    description: 'Perfect for job seekers who want advanced tools and more flexibility.',
    price: '₹400',
    features: [
      '50 email generations per month',
      '20 resume analyses per month',
      'Advanced dashboard & analytics',
      'Early access to new features',
      'Priority email support'
    ],
    buttonText: 'Upgrade to Pro',
    highlighted: true
  },
  {
    title: 'Enterprise',
    description: 'Tailored solutions for teams, coaches, and organizations.',
    price: 'Contact us',
    features: [
      'Unlimited resume analyses & emails',
      'Custom integrations & API access',
      'Team dashboard & collaboration tools',
      'Bulk token purchase options',
      'Dedicated account manager'
    ],
    buttonText: 'Contact Sales',
    highlighted: false
  },
];


  const addons = [
    { label: '10 extra analyses', price: '100' },
    { label: '25 extra emails', price: '150' },
    { label: 'Full bundle (50 tokens)', price: '250' },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 py-12 px-4 sm:px-6 flex flex-col items-center">
      {/* Load Cashfree SDK */}
      <Script
        src="https://sdk.cashfree.com/js/v3/cashfree.js"
        strategy="afterInteractive"
        onLoad={() => setSdkLoaded(true)}
        onError={() => toast.error("Failed to load payment system")}
      />

      <section id="pricing" className="max-w-4xl mx-auto">
        <motion.h2
          className="text-2xl sm:text-3xl font-semibold text-center text-white mb-4 relative"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          Pricing Plans
          <span className="block w-16 h-0.5 bg-blue-500 mx-auto mt-2" />
        </motion.h2>

        <p className="text-center text-gray-400 mb-8 text-sm">
          EazieTrack – Subscription for resume analysis and job search tools. All payments are non-refundable.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.title}
              className={`bg-gray-900 p-6 rounded-md shadow-lg text-center border relative ${plan.highlighted ? 'border-blue-500 bg-gradient-to-b from-blue-500/10 to-transparent' : 'border-gray-800'} hover:shadow-xl hover:bg-gray-800 transition duration-300 overflow-hidden`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.15, ease: 'easeOut' }}
              whileHover={{ scale: 1.03 }}
            >
              {selectedPlan === plan.title && (
                <motion.div className="absolute top-5 -right-10 w-40 bg-blue-600 text-white text-xs font-medium py-1 text-center transform rotate-45 shadow-md z-10"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                  Your Current Plan
                </motion.div>
              )}
              <h3 className="text-lg font-semibold text-white">{plan.title}</h3>
              <p className="text-sm text-gray-400 mt-1">{plan.description}</p>
              <p className="text-xl font-bold text-blue-400 mt-3">{plan.price}</p>
              <ul className="mt-4 text-gray-400 text-sm space-y-2">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <motion.button
                onClick={() => handleBuyNow(plan.price, plan.title)}
                className="mt-6 w-full btn-primary text-sm font-medium"
                whileHover={{ scale: 1.05, boxShadow: '0 0 8px rgba(59, 130, 246, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                disabled={!sdkLoaded || !cashfree}
              >
                {!sdkLoaded || !cashfree ? "Loading..." : plan.buttonText}
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Add-ons */}
        <motion.div className="mt-16 card hover:shadow-xl transition duration-300"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          whileHover={{ scale: 1.03 }}
        >
          <h3 className="text-lg font-semibold text-white text-center">Add-ons</h3>
          <p className="text-sm text-gray-400 text-center mt-1">
            Buy extra credits as a one-time purchase without upgrading your plan.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            {addons.map((addon, idx) => (
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
                  onClick={() => handleBuyNow(addon.price, addon.label)}
                  className="mt-4 w-full btn-primary text-sm font-medium"
                  whileHover={{ scale: 1.05, boxShadow: '0 0 8px rgba(59, 130, 246, 0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  disabled={!sdkLoaded || !cashfree}
                >
                  {!sdkLoaded || !cashfree ? "Loading..." : "Buy Now"}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
