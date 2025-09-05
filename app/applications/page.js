'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { FloatingInput, FileUpload, EnhancedButton } from '../components/EnhancedForms';
import { Icon } from '../components/Icons';

export default function JobApplicationsPage() {
  const [jobs, setJobs] = useState([]);
  const [url, setUrl] = useState({ link: '' });
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [isPinned, setIsPinned] = useState(false);
  const fileInputRef = useRef(null);
  const panelRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let fileBase64 = null;

      if (file) {
        fileBase64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            const result = reader.result;
            const base64Data = result?.toString().split(',')[1];
            resolve(base64Data);
          };
          reader.onerror = (error) => reject(error);
          reader.readAsDataURL(file);
        });
      }

      const payload = {
        url: url.link,
        file: fileBase64 || null,
      };

      const res = await fetch('${window.location.origin}/api/jobApplication', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

 

      toast.success('Application submitted!', { duration: 3000 });
      setUrl({ link: '' });
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      fetchJobs();
    } catch (error) {
      console.error('Upload Error:', error);
      toast.error('Submission failed. Please try again.', { duration: 3000 });
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
    if (selected?.type === 'application/pdf') {
      setFile(selected);
    } else {
      toast.error('Please upload a PDF.', { duration: 3000 });
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
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
    if (droppedFile?.type === 'application/pdf') {
      setFile(droppedFile);
    } else {
      toast.error('Please upload a PDF.', { duration: 3000 });
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleClick = () => fileInputRef.current.click();

  const togglePin = () => {
    setIsPinned(!isPinned);
    if (isPinned) {
      setSelectedJobId(null);
    }
  };

  const handleStickHover = (jobId) => {
    if (!isPinned) {
      setSelectedJobId(jobId);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-gray-100 py-8 px-4 sm:px-6 relative font-inter">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        body {
          font-family: 'Inter', sans-serif;
        }
      `}</style>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: '8px',
            background: '#1e293b',
            color: '#fff',
            padding: '10px 16px',
            fontSize: '14px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          },
        }}
      />
      <motion.div
        className="max-w-4xl mx-auto space-y-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-white mb-6">
          Job Applications
        </h1>
        <p className="text-center text-gray-400 mb-8 max-w-2xl mx-auto">
          Submit your job applications and get AI-powered analysis to improve your chances of success.
        </p>

        {/* Form Section */}
        <motion.div
          className="card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className="text-xl font-semibold text-white mb-6">New Application</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <FloatingInput
              label="Job Listing URL"
              type="url"
              required
              value={url.link}
              onChange={handleChange}
              placeholder="https://example.com/job-posting"
            />
            
            <FileUpload
              label="Upload Resume (PDF)"
              accept="application/pdf"
              onChange={handleFileChange}
              maxSize={10 * 1024 * 1024} // 10MB
            />
            
            <EnhancedButton
              type="submit"
              variant="primary"
              size="lg"
              loading={isLoading}
              disabled={isLoading}
              className="w-full"
              icon="upload"
            >
              {isLoading ? 'Submitting Application...' : 'Submit Application'}
            </EnhancedButton>
          </form>
        </motion.div>
      </motion.div>

      {/* Job List Section */}
      <motion.div
        ref={panelRef}
        className="fixed bottom-0 left-0 right-0 z-50"
        initial={{ height: jobs.length > 0 ? '40px' : '0px' }}
        animate={{ height: selectedJobId || isPinned ? '100vh' : jobs.length > 0 ? '40px' : '0px' }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        onMouseEnter={() => selectedJobId && !isPinned && setSelectedJobId(selectedJobId)}
        onMouseLeave={() => !isPinned && setSelectedJobId(null)}
      >
        <div className="relative h-full bg-gradient-to-b from-gray-950 to-gray-900">
          <motion.div
            className="absolute top-0 left-0 right-0 h-full max-w-4xl mx-auto overflow-y-auto px-6 py-8"
            animate={{ opacity: selectedJobId || isPinned ? 1 : 0, y: selectedJobId || isPinned ? 0 : 20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="sticky top-0 bg-white p-4 flex justify-between items-center border-b border-gray-200 z-10">
              <h2 className="text-xl font-semibold text-gray-900">Application Details</h2>
              <motion.button
                onClick={togglePin}
                className="text-blue-600 hover:text-blue-500 text-sm font-medium transition duration-200 flex items-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isPinned ? (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20.5a4 4 0 01-4-4H6.5m0 0l7.5-3-7.5-3m3-5.5a2.5 2.5 0 013-2.5V4" />
                    </svg>
                    Unpin
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v14a2 2 0 01-2 2H7a2 2 0 01-2-2V5z" />
                    </svg>
                    Pin
                  </>
                )}
              </motion.button>
            </div>
            <AnimatePresence mode="wait">
              {selectedJobId || isPinned ? (
                jobs
                  .filter((job) => job.id === selectedJobId)
                  .map((job) => (
                    <motion.div
                      key={job.id}
                      className="p-6 bg-white rounded-xl border border-gray-200 mt-6"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className="text-base font-semibold text-gray-900">
                            Score: <span className="text-blue-600">{job.score}</span>
                          </h3>
                          <span className="text-xs text-gray-500">ID: {job.id}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <motion.div
                            className="bg-blue-600 h-2 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: job.score?.replace('%', '') + '%' }}
                            transition={{ duration: 0.6 }}
                          />
                        </div>
                        <p className="text-sm text-gray-700">
                          <strong className="font-medium">Location:</strong> {job.location}
                        </p>
                        <p className="text-sm text-gray-700">
                          <strong className="font-medium">Summary:</strong> {job.summary_of_fit}
                        </p>
                        <div className="text-sm">
                          <p className="text-gray-900 font-medium">Matching Skills:</p>
                          <ul className="list-disc list-inside text-gray-600">
                            {job.matching_skills?.map((skill, idx) => (
                              <li key={`match-${idx}`}>{skill}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="text-sm">
                          <p className="text-gray-900 font-medium">Skill Gaps:</p>
                          <ul className="list-disc list-inside text-red-600">
                            {job.skill_gaps?.map((gap, idx) => (
                              <li key={`gap-${idx}`}>{gap}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="text-sm">
                          <p className="text-gray-900 font-medium">Suggestions:</p>
                          <ul className="list-disc list-inside text-gray-600">
                            {job.improvement_suggestions?.map((suggestion, idx) => (
                              <li key={`improve-${idx}`}>{suggestion}</li>
                            ))}
                          </ul>
                        </div>
                        {job.notes && (
                          <p className="text-sm text-gray-500 italic">Note: {job.notes}</p>
                        )}
                      </div>
                      <div className="mt-4 flex justify-end">
                        <motion.button
                          className="text-blue-600 hover:text-blue-500 text-sm font-medium transition duration-200"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Edit
                        </motion.button>
                      </div>
                    </motion.div>
                  ))
              ) : (
                <motion.p
                  className="text-gray-600 text-center text-sm p-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  Hover over a stick below to view details.
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
          <motion.div
            className="absolute bottom-0 left-0 right-0 flex justify-center px-6"
            initial={{ opacity: 1 }}
            animate={{ opacity: selectedJobId || isPinned ? 0 : 1, y: selectedJobId || isPinned ? 20 : 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {jobs.map((job, index) => (
              <motion.div
                key={job.id}
                className="h-8 w-20 mr-2 rounded-t-md bg-white flex items-center justify-center text-xs text-gray-900 font-medium shadow-md cursor-pointer border border-gray-200"
                onMouseEnter={() => handleStickHover(job.id)}
                whileHover={{ scaleY: 1.3, translateY: -4 }}
                transition={{ duration: 0.2 }}
              >
                {`Job ${index + 1}`}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}