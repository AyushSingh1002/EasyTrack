'use client';

import { motion } from 'framer-motion';

export default function RefundPolicy() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-gray-100">
      <div className="flex-1 py-12 px-4 sm:px-6 flex flex-col items-center relative">
        <section id="refund-policy" className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.h2
            className="text-2xl sm:text-3xl font-semibold text-center text-white mb-8 relative"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            Refund Policy
            <span className="block w-16 h-0.5 bg-blue-500 mx-auto mt-2" />
          </motion.h2>

          {/* Refund Policy Content */}
          <motion.div
            className="bg-gray-900 p-6 rounded-md shadow-lg border border-gray-800 hover:shadow-xl transition duration-300"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            whileHover={{ scale: 1.03 }}
          >
            <p className="text-sm text-gray-400 mb-4">Last updated: August 26, 2025</p>
            <p className="text-sm text-gray-400 mb-4">
              Thank you for using Eazietrack. Please read our refund policy carefully before making any payment.
            </p>
            <ul className="space-y-6 text-gray-400 text-sm">
              <li>
                <strong className="text-white font-semibold">All Payments Are Final</strong>
                <p className="mt-2">Once a payment is successfully processed, we do not offer refunds, cancellations, or chargebacks.</p>
              </li>
              <li>
                <strong className="text-white font-semibold">Why We Have a No-Refund Policy</strong>
                <p className="mt-2">Our services are delivered instantly and involve operational costs from the moment your request is processed.</p>
              </li>
              <li>
                <strong className="text-white font-semibold">Incorrect Payments</strong>
                <p className="mt-2">
                  If you believe a payment has been made in error (e.g., duplicate transaction or incorrect amount), please contact us within 24 hours at{' '}
                  <a href="mailto:thoughttrailservices@gmail.com" className="text-blue-400 hover:underline">thoughttrailservices@gmail.com</a>. We will review the case and assist you as per our discretion.
                </p>
              </li>
              <li>
                <strong className="text-white font-semibold">Contact Us</strong>
                <p className="mt-2">
                  For any queries about this policy, please reach us at{' '}
                  <a href="mailto:thoughttrailservices@gmail.com" className="text-blue-400 hover:underline">thoughttrailservices@gmail.com</a> or{' '}
                  <a href="/support" className="text-blue-400 hover:underline">submit a support ticket</a>.
                </p>
              </li>
            </ul>
          </motion.div>
        </section>

        {/* Floating FAQ Button */}
        <motion.a
          href="/help"
          className="fixed bottom-6 right-6 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition duration-200 bg-gradient-to-r from-blue-600 to-blue-500 z-50"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, y: 0 }}
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
      </div>
    </div>
  );
}