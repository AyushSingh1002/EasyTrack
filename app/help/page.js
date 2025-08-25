'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const faqs = [
    {
      question: 'Can I cancel anytime?',
      answer: 'Yes, you can cancel your subscription from your dashboard with no penalties.',
    },
    {
      question: 'What happens if I use all my tokens?',
      answer: 'You can purchase add-ons anytime without switching plans.',
    },
    {
      question: 'Do unused tokens roll over?',
      answer: 'Currently, tokens reset every billing cycle.',
    },
    {
      question: 'Is there a refund policy?',
      answer: 'We provide a refund if there’s a billing issue or accidental charge.',
    },
  ];

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 py-12 px-4 sm:px-6 flex flex-col items-center">
      <section id="help-center" className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.h2
          className="text-2xl sm:text-3xl font-semibold text-center text-white mb-8 relative"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          Help Center
          <span className="block w-16 h-0.5 bg-blue-500 mx-auto mt-2" />
        </motion.h2>

        {/* Search Bar */}
        <motion.div
          className="mb-12 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <label htmlFor="search" className="block text-sm text-gray-400 mb-2 text-center">
            Search FAQs
          </label>
          <input
            type="text"
            id="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-800 text-gray-100 border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your question..."
          />
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          className="bg-gray-900 p-6 rounded-md shadow-lg border border-gray-800 hover:shadow-xl transition duration-300 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          whileHover={{ scale: 1.03 }}
        >
          <h3 className="text-lg font-semibold text-white text-center mb-6">
            Frequently Asked Questions
          </h3>
          {filteredFaqs.length === 0 ? (
            <p className="text-sm text-gray-400 text-center">
              No results found. Try a different search term.
            </p>
          ) : (
            <ul className="space-y-6 text-gray-400 text-sm">
              {filteredFaqs.map((faq, idx) => (
                <motion.li
                  key={idx}
                  className="border-b border-gray-800 pb-4 last:border-b-0"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1, ease: 'easeOut' }}
                >
                  <strong className="text-white font-semibold">{faq.question}</strong>
                  <p className="mt-1">{faq.answer}</p>
                </motion.li>
              ))}
            </ul>
          )}
        </motion.div>

        {/* Additional Help Options */}
        <motion.div
          className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-4"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          {[
            {
              title: 'Contact Support',
              description: 'Need further assistance? Submit a support ticket.',
              actionText: 'Get Support',
              actionLink: '/contactus',
            },
            {
              title: 'Community Forum',
              description: 'Join our community to discuss and find answers.',
              actionText: 'Coming Soon',
              actionLink: '/community',
            },
          ].map((option, index) => (
            <motion.div
              key={option.title}
              className="bg-gray-900 p-6 rounded-md shadow-lg text-center border border-gray-800 hover:shadow-xl hover:bg-gray-800 transition duration-300"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.15, ease: 'easeOut' }}
              whileHover={{ scale: 1.03 }}
            >
              <h3 className="text-lg font-semibold text-white">{option.title}</h3>
              <p className="text-sm text-gray-400 mt-1">{option.description}</p>
              <motion.a
                href={option.actionLink}
                className="mt-4 inline-block w-full bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition duration-200 text-sm font-medium bg-gradient-to-r from-blue-600 to-blue-500"
                whileHover={{ scale: 1.05, boxShadow: '0 0 8px rgba(59, 130, 246, 0.3)' }}
                whileTap={{ scale: 0.95 }}
              >
                {option.actionText}
              </motion.a>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}