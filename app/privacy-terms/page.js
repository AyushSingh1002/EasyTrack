'use client'

import { motion } from 'framer-motion'

export default function PrivacyAndTerms() {
  return (
    <main className="min-h-screen bg-gray-950 text-gray-100 py-12 px-4 sm:px-6 flex flex-col items-center relative">
      <section id="privacy-terms" className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.h2
          className="text-2xl sm:text-3xl font-semibold text-center text-white mb-8 relative"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          Privacy Policy & Terms of Service
          <span className="block w-16 h-0.5 bg-blue-500 mx-auto mt-2" />
        </motion.h2>

        {/* SaaS Description for Razorpay */}
        <p className="text-center text-sm text-gray-400 mb-8">
          EazieTrack – Subscription service for task tracking and productivity tools.
        </p>

        {/* Privacy Policy Section */}
        <motion.div
          className="bg-gray-900 p-6 rounded-md shadow-lg border border-gray-800 hover:shadow-xl transition duration-300 mb-12"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          whileHover={{ scale: 1.03 }}
        >
          <h3 className="text-lg font-semibold text-white mb-4">Privacy Policy</h3>
          <p className="text-sm text-gray-400 mb-4">Last updated: August 25, 2025</p>
          <p className="text-sm text-gray-400 mb-4">
            EazieTrack ("we", "our", or "us") respects your privacy and is committed to protecting your personal information. 
            This Privacy Policy explains how we collect, use, and safeguard your data when you use our website or services.
          </p>
          <ul className="space-y-6 text-gray-400 text-sm">
            <li>
              <strong className="text-white font-semibold">1. Information We Collect</strong>
              <ul className="mt-2 space-y-2 list-disc list-inside">
                <li>Account details such as your name, email, and login information.</li>
                <li>Payment information processed securely via Razorpay (we do not store card data).</li>
                <li>Usage analytics to help improve our service.</li>
              </ul>
            </li>
            <li>
              <strong className="text-white font-semibold">2. How We Use Your Information</strong>
              <ul className="mt-2 space-y-2 list-disc list-inside">
                <li>To provide and improve our services.</li>
                <li>To process payments and subscriptions.</li>
                <li>To send service updates or respond to support requests.</li>
              </ul>
            </li>
            <li>
              <strong className="text-white font-semibold">3. Data Security</strong>
              <p className="mt-2">We apply reasonable security measures to protect your data, though no method of transmission over the Internet is completely secure.</p>
            </li>
            <li>
              <strong className="text-white font-semibold">4. Third-Party Services</strong>
              <p className="mt-2">Payments are handled by Razorpay, and their privacy practices apply to any payment data you provide.</p>
            </li>
            <li>
              <strong className="text-white font-semibold">5. Your Rights & Contact</strong>
              <p className="mt-2">
                You may request to update, correct, or delete your personal information by contacting us at{' '}
                <a href="mailto:thoughttrailservices@gmail.com" className="text-blue-400 hover:underline">thoughttrailservices@gmail.com</a>.
              </p>
            </li>
          </ul>
        </motion.div>

        {/* Terms of Service Section */}
        <motion.div
          className="bg-gray-900 p-6 rounded-md shadow-lg border border-gray-800 hover:shadow-xl transition duration-300"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut', delay: 0.2 }}
          whileHover={{ scale: 1.03 }}
        >
          <h3 className="text-lg font-semibold text-white mb-4">Terms of Service</h3>
          <p className="text-sm text-gray-400 mb-4">Last updated: August 25, 2025</p>
          <p className="text-sm text-gray-400 mb-4">
            By using EazieTrack, you agree to these Terms of Service. If you do not agree, please discontinue use of our services.
          </p>
          <ul className="space-y-6 text-gray-400 text-sm">
            <li>
              <strong className="text-white font-semibold">1. Use of Service</strong>
              <ul className="mt-2 space-y-2 list-disc list-inside">
                <li>You may use EazieTrack for personal or business purposes as permitted by these terms.</li>
                <li>You must not misuse our service or attempt unauthorized access.</li>
              </ul>
            </li>
            <li>
              <strong className="text-white font-semibold">2. Payment & Subscription</strong>
              <ul className="mt-2 space-y-2 list-disc list-inside">
                <li>Plans are billed in INR via Razorpay.</li>
                <li>All payments are non-refundable, except in cases of billing errors or accidental charges.</li>
                <li>You can cancel your subscription anytime from your dashboard (cancellation stops future billing, not past payments).</li>
              </ul>
            </li>
            <li>
              <strong className="text-white font-semibold">3. Add-ons and Tokens</strong>
              <ul className="mt-2 space-y-2 list-disc list-inside">
                <li>Purchased tokens are valid only for the current billing cycle.</li>
                <li>Unused tokens do not roll over to the next cycle.</li>
              </ul>
            </li>
            <li>
              <strong className="text-white font-semibold">4. Service Availability & Liability</strong>
              <p className="mt-2">
                We aim to provide uninterrupted service but do not guarantee it. EazieTrack is not liable for indirect or incidental damages caused by service interruptions or feature changes.
              </p>
            </li>
            <li>
              <strong className="text-white font-semibold">5. Contact</strong>
              <p className="mt-2">
                For any questions about these Terms, email us at{' '}
                <a href="mailto:thoughttrailservices@gmail.com" className="text-blue-400 hover:underline">thoughttrailservices@gmail.com</a>.
              </p>
            </li>
          </ul>
        </motion.div>

        {/* Business Location (for Razorpay compliance) */}
        <p className="text-xs text-gray-500 mt-6 text-center">
          EazieTrack is operated by [Your Name/Company], located in [City, Country].
        </p>
      </section>

      {/* Floating FAQ Button */}
      <motion.a
        href="/help"
        className="fixed bottom-6 right-6 w-12 h-12 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition duration-200 bg-gradient-to-r from-blue-600 to-blue-500 z-50"
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
    </main>
  )
}
