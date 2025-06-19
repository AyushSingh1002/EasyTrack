'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';

export default function JobApplicationsPage() {
  const [jobs, setJobs] = useState([]);
  const [url, setUrl] = useState({ link: '' });
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    let fileBase64 = null;
    if (file) {
      const reader = new FileReader();
      fileBase64 = await new Promise((resolve, reject) => {
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }

    try {
      const res = await fetch('/api/jobApplication', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.link, file: fileBase64 || null }),
      });

      if (!res.ok) throw new Error(await res.text());

      toast.success('Application submitted!', { duration: 3000 });
      setUrl({ link: '' });
      setFile(null);
      fetchJobs();
    } catch (error) {
      toast.error('Submission failed.', { duration: 3000 });
      console.error('Upload Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchJobs = async () => {
    try {
      const res = await fetch('/api/jobApplication');
      if (!res.ok) throw new Error('Failed to fetch jobs');
      const data = await res.json();
      setJobs(data.jobs || data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      toast.error('Failed to load applications.', { duration: 3000 });
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleChange = (e) => setUrl({ link: e.target.value });

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected?.type === 'application/pdf') setFile(selected);
    else {
      toast.error('Please upload a PDF.', { duration: 3000 });
      setFile(null);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(['dragenter', 'dragover'].includes(e.type));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile?.type === 'application/pdf') setFile(droppedFile);
    else {
      toast.error('Please upload a PDF.', { duration: 3000 });
      setFile(null);
    }
  };

  const handleClick = () => fileInputRef.current.click();

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 py-8 px-4 sm:px-6">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: '6px',
            background: '#1e293b',
            color: '#fff',
            padding: '8px 12px',
            fontSize: '14px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
          },
        }}
      />
      <motion.div
        className="max-w-4xl mx-auto space-y-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl sm:text-3xl font-semibold text-center text-white mb-6">
          Job Applications
        </h1>

        {/* Form Section */}
        <motion.div
          className="bg-gray-900 rounded-lg p-6 shadow-md border border-gray-800"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <h2 className="text-lg font-medium text-white mb-4">New Application</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <motion.input
              type="url"
              required
              value={url.link}
              onChange={handleChange}
              placeholder="Job listing URL"
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-gray-100 placeholder-gray-500 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-200"
              whileFocus={{ scale: 1.005 }}
            />
            <motion.div
              className={`border-2 border-dashed rounded-md p-6 text-center cursor-pointer transition duration-200 ${
                dragActive ? 'border-blue-500 bg-gray-700' : 'border-gray-700 bg-gray-800'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={handleClick}
              whileHover={{ borderColor: '#3b82f6' }}
            >
              <label htmlFor="file-upload" className="block text-gray-300 text-sm font-medium mb-2">
                Upload Resume (PDF)
              </label>
              <input
                id="file-upload"
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                ref={fileInputRef}
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
              <p className="text-gray-400 text-xs">
                {file ? file.name : 'Drag & drop or click to select'}
              </p>
            </motion.div>
            <motion.button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200 flex items-center justify-center text-sm font-medium disabled:bg-gray-600 disabled:cursor-not-allowed"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 mr-2 text-white"
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
                  Submitting
                </>
              ) : (
                'Submit'
              )}
            </motion.button>
          </form>
        </motion.div>

        {/* Job List Section */}
        <motion.div
          className="bg-gray-900 rounded-lg p-6 shadow-md border border-gray-800"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <h2 className="text-lg font-medium text-white mb-4">Your Applications</h2>
          <AnimatePresence>
            {jobs.length === 0 ? (
              <motion.p
                className="text-gray-400 text-center text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                No applications yet.
              </motion.p>
            ) : (
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {jobs.map((job, index) => (
                  <motion.li
                    key={job.id}
                    className="p-4 bg-gray-800 rounded-md border border-gray-700 hover:bg-gray-700 transition duration-200"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.03 }}
                  >
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <h3 className="text-sm font-medium text-white">
                          Score: <span className="text-blue-400">{job.score}</span>
                        </h3>
                        <span className="text-xs text-gray-500">ID: {job.id}</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-1.5">
                        <motion.div
                          className="bg-blue-500 h-1.5 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: job.score?.replace('%', '') + '%' }}
                          transition={{ duration: 0.6 }}
                        />
                      </div>
                      <p className="text-xs text-gray-300">
                        <strong className="font-medium">Location:</strong> {job.location}
                      </p>
                      <p className="text-xs text-gray-300">
                        <strong className="font-medium">Summary:</strong> {job.summary_of_fit}
                      </p>
                      <div className="text-xs">
                        <p className="text-gray-200 font-medium">Matching Skills:</p>
                        <ul className="list-disc list-inside text-gray-400">
                          {job.matching_skills?.map((skill, idx) => (
                            <li key={`match-${idx}`}>{skill}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="text-xs">
                        <p className="text-gray-200 font-medium">Skill Gaps:</p>
                        <ul className="list-disc list-inside text-red-400">
                          {job.skill_gaps?.map((gap, idx) => (
                            <li key={`gap-${idx}`}>{gap}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="text-xs">
                        <p className="text-gray-200 font-medium">Suggestions:</p>
                        <ul className="list-disc list-inside text-gray-400">
                          {job.improvement_suggestions?.map((suggestion, idx) => (
                            <li key={`improve-${idx}`}>{suggestion}</li>
                          ))}
                        </ul>
                      </div>
                      {job.notes && (
                        <p className="text-xs text-gray-500 italic">Note: {job.notes}</p>
                      )}
                    </div>
                    <div className="mt-3 flex justify-end">
                      <motion.button
                        className="text-blue-400 hover:text-blue-300 text-xs font-medium transition duration-150"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Edit
                      </motion.button>
                    </div>
                  </motion.li>
                ))}
              </ul>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
}