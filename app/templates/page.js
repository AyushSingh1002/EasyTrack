'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { FloatingInput, AutoResizeTextarea, EnhancedSelect, EnhancedButton } from '../components/EnhancedForms';
import { Icon } from '../components/Icons';

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
            <FloatingInput
              label="Job Title"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleInputChange}
              placeholder="e.g., Software Engineer"
              required
            />
            
            <FloatingInput
              label="Company Name"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              placeholder="e.g., Google, Microsoft"
              required
            />
            
            <EnhancedSelect
              label="Tone"
              name="tone"
              value={formData.tone}
              onChange={handleInputChange}
              options={[
                { value: 'professional', label: 'Professional' },
                { value: 'friendly', label: 'Friendly' },
                { value: 'formal', label: 'Formal' }
              ]}
              placeholder="Select tone"
            />
            
            <AutoResizeTextarea
              label="Highlights (Optional)"
              name="highlights"
              value={formData.highlights}
              onChange={handleInputChange}
              placeholder="Enter key highlights or achievements..."
              minRows={3}
              maxRows={6}
            />

            <EnhancedButton
              onClick={handleSubmit}
              variant="primary"
              size="lg"
              loading={isLoading}
              disabled={isLoading}
              className="w-full"
              icon="ai"
            >
              {isLoading ? 'Generating Template...' : 'Generate Template'}
            </EnhancedButton>
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
              <EnhancedButton
                onClick={handleCopy}
                variant="primary"
                size="sm"
                icon="copy"
              >
                Copy
              </EnhancedButton>
              <EnhancedButton
                onClick={handleRegenerate}
                disabled={cooldown > 0 || isLoading}
                variant="secondary"
                size="sm"
                icon="regenerate"
              >
                {cooldown > 0 ? `Wait ${cooldown}s` : 'Regenerate'}
              </EnhancedButton>
              <EnhancedButton
                onClick={handleSave}
                variant="secondary"
                size="sm"
                icon="save"
              >
                Save
              </EnhancedButton>
            </div>
          </motion.div>
        )}
      </motion.section>
    </div>
  );
}