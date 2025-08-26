'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      
      {/* Hero Section */}
      <section className="py-16 px-6 sm:px-10 flex items-center justify-center">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-snug mb-4">
            Track Your Job Applications with Ease
          </h1>
          <p className="text-base sm:text-lg text-gray-400 mb-6 max-w-2xl mx-auto">
            EasyTrack helps you organize applications, analyze progress, and land your dream job with a simple, powerful interface.
          </p>
          <Link href="/addjobs">
            <motion.button
              className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-md text-sm sm:text-base font-medium hover:from-blue-700 hover:to-blue-600 transition duration-200"
              whileHover={{ scale: 1.05, boxShadow: '0 0 8px rgba(59, 130, 246, 0.3)' }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-14 px-6 sm:px-10 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-2xl sm:text-3xl font-semibold text-center text-white mb-10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            Why Choose EasyTrack?
            <span className="block w-16 h-0.5 bg-blue-500 mx-auto mt-2" />
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Organize Applications',
                description: 'Keep all your job applications in one place with easy tracking and updates.',
                icon: (
                  <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                ),
              },
              {
                title: 'Analyze Progress',
                description: 'Get insights into your application success with detailed analytics.',
                icon: (
                  <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                ),
              },
              {
                title: 'Manage Resumes',
                description: 'Upload and store resumes to apply to jobs quickly and efficiently.',
                icon: (
                  <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                ),
              },
              {
                title: 'Email Templates',
                description: 'Access ready-to-use email templates for follow-ups and interview requests.',
                icon: (
                  <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12H8m8 4H8m8-8H8m12 8V8a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2h12z"
                    />
                  </svg>
                ),
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700 hover:shadow-lg hover:bg-gray-700 transition duration-300 text-center"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.15 }}
                whileHover={{ scale: 1.03 }}
              >
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                <p className="text-sm text-gray-400 mt-2">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-6 sm:px-10">
        <motion.div
          className="max-w-3xl mx-auto text-center bg-gray-900 p-6 sm:p-8 rounded-lg shadow-lg border border-gray-800"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-white mb-4">Ready to Start Tracking?</h2>
          <p className="text-sm sm:text-base text-gray-400 mb-6">
            Join EasyTrack today and take control of your job search journey.
          </p>
          <Link href="/pricing">
            <motion.button
              className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-md text-sm sm:text-base font-medium hover:from-blue-700 hover:to-blue-600 transition duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Plans
            </motion.button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
