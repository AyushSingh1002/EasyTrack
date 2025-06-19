'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';

export default function Profile() {
  const [resume, setResume] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [parsedData, setParsedData] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (selected && selected.type === 'application/pdf') {
      setResume(selected);
    } else {
      toast.error('Please upload a valid PDF file.');
      setResume(null);
      setParsedData(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resume) return toast.error('Upload a resume before submitting.');

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('resume', resume);

      //      // Send to backend
      const response = await fetch('/api/parse-resume', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to parse resume');

      const data = await response.json();
      setParsedData(data);
      toast.success('Resume parsed successfully!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to process resume.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 py-12 px-4 sm:px-6 flex items-center justify-center">
      <Toaster position="top-right" />
      <section id="profile" className="max-w-3xl mx-auto w-full">
        <motion.h2
          className="text-2xl sm:text-3xl font-semibold text-center text-white mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          Upload Resume
          <span className="block w-16 h-0.5 bg-blue-500 mx-auto mt-2" />
        </motion.h2>

        <motion.div
          className="bg-gray-900 p-6 rounded-md border border-gray-800 shadow-lg"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div
              onClick={handleClick}
              className={`border-2 border-dashed rounded-md p-6 text-center cursor-pointer transition duration-200 ${
                resume ? 'border-blue-500 bg-gray-700' : 'border-gray-700 bg-gray-800'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="hidden"
              />
              <svg
                className="w-8 h-8 text-blue-500 mx-auto mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <p className="text-gray-400 text-sm">
                {resume ? resume.name : 'Click to upload your PDF resume'}
              </p>
            </div>

            <motion.button
              type="submit"
              disabled={!resume || isLoading}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isLoading ? 'Parsing...' : 'Upload and Parse'}
            </motion.button>
          </form>

          {parsedData && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-white mb-4">Extracted Profile Info</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Full Name</span>
                  <p className="text-white">{parsedData.fullName || 'N/A'}</p>
                </div>
                <div>
                  <span className="text-gray-400">Email</span>
                  <p className="text-white">{parsedData.email || 'N/A'}</p>
                </div>
                <div>
                  <span className="text-gray-400">Phone</span>
                  <p className="text-white">{parsedData.phone || 'N/A'}</p>
                </div>
                <div>
                  <span className="text-gray-400">LinkedIn</span>
                  <p className="text-white">{parsedData.linkedIn || 'N/A'}</p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </section>
    </div>
  );
}
