'use client';

import { motion } from 'framer-motion';

export default function AboutUs() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-gray-100">
      <div className="flex-1 py-12 px-4 sm:px-6 flex flex-col items-center relative">
        <section id="about-us" className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.h2
            className="text-2xl sm:text-3xl font-semibold text-center text-white mb-8 relative"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            About Us
            <span className="block w-16 h-0.5 bg-blue-500 mx-auto mt-2" />
          </motion.h2>

          {/* About Us Content */}
          <motion.div
            className="bg-gray-900 p-6 rounded-md shadow-lg border border-gray-800 hover:shadow-xl transition duration-300"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            whileHover={{ scale: 1.03 }}
          >
            <h3 className="text-lg font-semibold text-white mb-4">Welcome to Eazietrack!</h3>
            <p className="text-sm text-gray-400 mb-4">
              Eazietrack is a simple and reliable platform designed to track tasks, manage projects, and organize personal work seamlessly.
            </p>
            <h4 className="text-md font-semibold text-white mb-3">We believe in:</h4>
            <ul className="space-y-2 text-gray-400 text-sm list-disc list-inside">
              <li><strong className="text-white">Simplicity</strong> – A clean and user-friendly interface.</li>
              <li><strong className="text-white">Speed</strong> – No unnecessary steps, just fast and effective solutions.</li>
              <li><strong className="text-white">Transparency</strong> – Clear policies and secure payment processing.</li>
            </ul>
            <p className="text-sm text-gray-400 mt-4">
              We’re a small team passionate about building tools that make your day easier. Whether you’re using Eazietrack for work or personal tasks, our goal is to help you stay productive with minimal hassle.
            </p>
            <p className="text-sm text-gray-400 mt-4">
              For feedback, suggestions, or support, reach out at{' '}
              <a href="mailto:thoughttrailservices@gmail.com" className="text-blue-400 hover:underline">thoughttrailservices@gmail.com</a> or{' '}
              <a href="/help" className="text-blue-400 hover:underline">submit a support ticket</a>.
            </p>
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