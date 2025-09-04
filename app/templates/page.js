'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';

export default function Home() {
  const [tab, setTab] = useState('cold-email');
  const [formData, setFormData] = useState({
    type: tab,
    jobTitle: '',
    companyName: '',
    tone: 'professional',
    highlights: '',
  });
  const [generatedText, setGeneratedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0); // seconds remaining

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    // Prevent default only if it's a real event
    if (e && e.preventDefault) e.preventDefault();
    
    if (!formData.jobTitle || !formData.companyName) {
      toast.error('Please fill in Job Title and Company Name.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, type: tab }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setGeneratedText(data.text || '');
      toast.success('Template generated successfully!');
    } catch (error) {
      console.error('Error generating template:', error);
      toast.error('Failed to generate template.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedText);
    toast.success('Copied to clipboard!');
  };

  const handleRegenerate = () => {
    if (cooldown > 0 || isLoading) return;
    
    // Call handleSubmit with a mock event object
    handleSubmit({ preventDefault: () => {} });

    // Start 30s cooldown
    const duration = 30;
    setCooldown(duration);
    const timer = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSave = () => {
    toast.success('Saved successfully!');
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut', staggerChildren: 0.2 },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-gray-100 py-16 px-4 sm:px-8">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        body {
          font-family: 'Inter', sans-serif;
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        .pulse:hover {
          animation: pulse 1.5s ease-in-out infinite;
        }
      `}</style>

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: '10px',
            backgroundColor: '#1e293b',
            color: '#fff',
            padding: '12px 20px',
            fontSize: '16px',
            boxShadow: '0 6px 15px rgba(0, 0, 0, 0.2)',
          },
        }}
      />

      <motion.section
        className="max-w-3xl mx-auto w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-3xl font-semibold text-center text-white mb-6"
          variants={childVariants}
        >
          Email Templates
          <span className="block w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-700 mx-auto mt-4 rounded-full" />
        </motion.h1>

        <motion.p
          className="text-center text-gray-400 text-base mb-8"
          variants={childVariants}
        >
          Create professional cold emails or cover letters in seconds
        </motion.p>

        <div className="flex space-x-2 mb-6">
          <button
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              tab === 'cold-email'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
            onClick={() => setTab('cold-email')}
          >
            Cold Email Template
          </button>
          <button
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              tab === 'cover-letter'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
            onClick={() => setTab('cover-letter')}
          >
            Cover Letter Template
          </button>
        </div>

        <motion.div
          className="card"
          variants={childVariants}
        >
          <div className="space-y-6">
            <div>
              <label className="block text-sm text-gray-300 mb-2">Job Title</label>
              <input
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter job title"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-2">Company Name</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter company name"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-2">Tone</label>
              <select
                name="tone"
                value={formData.tone}
                onChange={handleInputChange}
                className="form-input"
              >
                <option value="professional">Professional</option>
                <option value="friendly">Friendly</option>
                <option value="formal">Formal</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-2">Highlights (Optional)</label>
              <textarea
                name="highlights"
                value={formData.highlights}
                onChange={handleInputChange}
                className="form-input resize-vertical"
                rows="4"
                placeholder="Enter key highlights or achievements"
              />
            </div>

            <motion.button
              onClick={handleSubmit}
              className="w-full btn-primary text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-6 w-6 mr-3 text-white"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Generating...
                </div>
              ) : (
                'Generate'
              )}
            </motion.button>
          </div>
        </motion.div>

        {generatedText && (
          <motion.div
            className="mt-8 card"
            variants={childVariants}
          >
            <h2 className="text-xl font-semibold text-white mb-4">
              {tab === 'cold-email' ? 'Cold Email' : 'Cover Letter'} Preview
            </h2>
            <div className="bg-gray-800 p-4 rounded-lg text-gray-200 whitespace-pre-wrap">
              {generatedText}
            </div>
            <div className="flex gap-4 mt-4">
              <motion.button
                onClick={handleCopy}
                className="btn-primary text-sm font-medium pulse"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Copy
              </motion.button>
              <motion.button
                onClick={handleRegenerate}
                disabled={cooldown > 0 || isLoading}
                className="btn-secondary text-sm font-medium pulse disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {cooldown > 0 ? `Wait ${cooldown}s` : 'Regenerate'}
              </motion.button>
              <motion.button
                onClick={handleSave}
                className="btn-secondary text-sm font-medium pulse"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Save
              </motion.button>
            </div>
          </motion.div>
        )}
      </motion.section>
    </div>
  );
}