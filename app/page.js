'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Icon } from './components/Icons';
import { AnimatedPage, AnimatedCard, AnimatedButton } from './components/Animations';

export default function Home() {
  return (
    <AnimatedPage className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      
      {/* Hero Section */}
      <section className="relative py-20 px-6 sm:px-10 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        
        <motion.div
          className="relative max-w-4xl mx-auto text-center z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Track Your Job Applications
            <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              with Ease
            </span>
          </motion.h1>
          
          <motion.p
            className="text-lg sm:text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            EazieTrack helps you organize applications, analyze progress, and land your dream job with AI-powered insights and professional templates.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <AnimatedButton as={Link} href="/applications" variant="primary" size="lg" className="text-lg px-8 py-4">
              <Icon name="applications" size="sm" className="mr-2" />
              Start Tracking Applications
            </AnimatedButton>
            <AnimatedButton as={Link} href="/pricing" variant="secondary" size="lg" className="text-lg px-8 py-4">
              <Icon name="pricing" size="sm" className="mr-2" />
              View Pricing Plans
            </AnimatedButton>
          </motion.div>
          
          {/* Trust indicators */}
          <motion.div
            className="mt-12 flex flex-wrap justify-center items-center gap-8 text-sm text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>AI-Powered Analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Secure & Private</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Professional Templates</span>
            </div>
          </motion.div>
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
            Why Choose EazieTrack?
            <span className="block w-16 h-0.5 bg-blue-500 mx-auto mt-2" />
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Organize Applications',
                description: 'Keep all your job applications in one place with easy tracking and updates.',
                icon: 'applications',
              },
              {
                title: 'Analyze Progress',
                description: 'Get insights into your application success with detailed analytics.',
                icon: 'dashboard',
              },
              {
                title: 'Manage Resumes',
                description: 'Upload and store resumes to apply to jobs quickly and efficiently.',
                icon: 'upload',
              },
              {
                title: 'Email Templates',
                description: 'Access ready-to-use email templates for follow-ups and interview requests.',
                icon: 'templates',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="card text-center"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.15 }}
                whileHover={{ scale: 1.03 }}
              >
                <div className="flex justify-center mb-4">
                  <Icon name={feature.icon} size="lg" className="text-blue-500" />
                </div>
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
          className="max-w-3xl mx-auto text-center card"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-white mb-4">Ready to Start Tracking?</h2>
          <p className="text-sm sm:text-base text-gray-400 mb-6">
            Join EazieTrack today and take control of your job search journey.
          </p>
          <AnimatedButton as={Link} href="/pricing" variant="primary" size="md" className="text-sm sm:text-base">
            <Icon name="pricing" size="sm" className="mr-2" />
            Explore Plans
          </AnimatedButton>
        </motion.div>
      </section>
    </AnimatedPage>
  );
}
