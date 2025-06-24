'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { getRandomPokemonImageUrl } from '../lib/randomProfile';
import { useUserStore } from '../store/useUserStore';
import { useSession } from 'next-auth/react';
import UserPlanBanner from '../components/plan';
export default function JobApplicationsPage() {
  const { data : session } = useSession()
  const { user, setUser, setisCalled, isCalled } = useUserStore()
  let url = getRandomPokemonImageUrl()
  const [jobs, setJobs] = useState([]);
  const [resume, setResume] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [parsedData, setParsedData] = useState(null);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [isPinned, setIsPinned] = useState(false);
  const fileInputRef = useRef(null);
  const panelRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resume) {
      toast.error('Please upload a resume.');
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('resume', resume);

      const response = await fetch('/api/parse-resume', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to process resume');

      const data = await response.json();
      setParsedData({
        fullName: data.fullName || 'N/A',
        email: data.email || 'N/A',
        phone: data.phone || 'N/A',
        linkedIn: data.linkedIn || 'N/A',
        skills: data.skills || 'N/A',
        summary: data.summary || 'N/A',
      });
      setisCalled(true)

      toast.success('Resume processed successfully!');
      setResume(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      fetchJobs();
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to process resume.');
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
  const fetchParsedResume = async () => {
    if (!isCalled) return;

    try {
      const res = await fetch(`/api/parse-resume`, {
        method: 'GET',
      });

      const data = await res.json();

      setParsedData({
        fullName: data.fullName || 'N/A',
        email: data.email || 'N/A',
        phone: data.phone || 'N/A',
        linkedIn: data.linkedIn || 'N/A',
        skills: data.skills || 'N/A',
        summary: data.summary || 'N/A',
      });
    } catch (err) {
      console.error('Failed to fetch parsed resume:', err);
    }
  };

  fetchParsedResume();
}, [isCalled]); // 🔁 re-run when isCalled changes


  useEffect(() => {
    fetchJobs();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file?.type === 'application/pdf') {
      setResume(file);
    } else {
      toast.error('Please upload a PDF.', { duration: 3000 });
      setResume(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleClick = () => fileInputRef.current?.click();

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

  // Animation variants
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

  const stickVariants = {
    initial: { scaleY: 1, translateY: 0 },
    hover: {
      scaleY: 1.4,
      translateY: -6,
      transition: { duration: 0.2, type: 'spring', stiffness: 300 },
    },
  };

  // Job panel variants
  const jobPanelVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut', staggerChildren: 0.2 },
    },
  };

  // Get initials for profile picture placeholder
  const getInitials = (name) => {
    if (!name || name === 'N/A') return '??';
    const names = name.split(' ').filter(Boolean);
    return names.length > 1
      ? `${names[0][0]}${names[names.length - 1][0]}`
      : names[0].slice(0, 2).toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-gray-100 py-16 px-4 sm:px-8 font-inter">
    

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        body {
          font-family: 'Inter', sans-serif;
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        .upload-pulse:hover {
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
      <section id="profile" className="max-w-3xl mx-auto w-full">
        <AnimatePresence mode="wait">
          {!parsedData ? (
            <motion.div
              key="upload"
              className="max-w-xl mx-auto w-full"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <motion.h1
                className="text-3xl sm:text-3xl font-semibold text-center text-white mb-6"
                variants={childVariants}
              >
                Upload Your Resume
                <span className="block w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-700 mx-auto mt-4 rounded-full" />
              </motion.h1>
              <motion.p
                className="text-center text-gray-400 text-base mb-8"
                variants={childVariants}
              >
                Get a smart profile preview in seconds
              </motion.p>
              <motion.div
                className="bg-gray-900/90 backdrop-blur-md p-8 rounded-xl shadow-lg"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.form
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  variants={childVariants}
                >
                  <motion.div
                    className={`border-3 border-dashed rounded-lg p-12 min-h-48 text-center cursor-pointer transition duration-300 ease-in-out upload-pulse ${
                      resume ? 'border-blue-500 bg-gray-700/50' : 'border-gray-600 bg-gray-800/50'
                    } hover:bg-gray-800/80 hover:shadow-inner`}
                    onClick={handleClick}
                    whileHover={{ scale: 1.02 }}
                    variants={childVariants}
                  >
                    <input
                      id="file-upload"
                      type="file"
                      accept="application/pdf"
                      onChange={handleFileChange}
                      ref={fileInputRef}
                      className="hidden"
                    />
                    <svg
                      className="w-12 h-12 text-blue-500 mx-auto mb-4"
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
                    <p className="text-gray-300 text-base">
                      {resume ? resume.name : 'Click or drag to upload your PDF resume'}
                    </p>
                  </motion.div>
                  <motion.button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg text-base font-medium hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
                    disabled={isLoading || !resume}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    variants={childVariants}
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
                        Processing...
                      </div>
                    ) : (
                      'Submit'
                    )}
                  </motion.button>
                </motion.form>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="profile"
              className="space-y-8"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              {/* Profile Card */}
              <motion.div
                className="bg-gray-900/90 backdrop-blur-md p-8 rounded-xl shadow-lg"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div
                  className="flex flex-col sm:flex-row items-center sm:items-start gap-6"
                  variants={childVariants}
                >
                  <motion.div
                    className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center text-white text-2xl font-bold"
                    
                    variants={childVariants}
                  >
                    <img className='read-only:cursor-not-allowed:' src={url} />
                  </motion.div>
                  <motion.div className="text-center sm:text-left" variants={childVariants}>
                    <h1 className="text-2xl sm:text-3xl font-semibold text-white">
                      {parsedData.fullName}
                    </h1>
                    <p className="text-gray-400 text-base mt-1">{parsedData.email}</p>
                  </motion.div>
                </motion.div>
                <motion.div
                  className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6"
                  variants={childVariants}
                >
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-6 h-6 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <div>
                      <span className="text-gray-400 text-sm">Phone</span>
                      <p className="text-white text-base">{parsedData.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-6 h-6 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                      />
                    </svg>
                    <div>
                      <span className="text-gray-400 text-sm">LinkedIn</span>
                      <p className="text-white text-base">
                        <a
                          href={parsedData.linkedIn}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-blue-500 transition duration-200"
                        >
                          {parsedData.linkedIn}
                        </a>
                      </p>
                    </div>
                  </div>
                  {/* Summary Section */}
<motion.div
  className="mt-8 flex items-start gap-4"
  variants={childVariants}
>
  <svg
    className="w-6 h-6 mt-1 text-blue-500 flex-shrink-0"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M19 21H5a2 2 0 01-2-2V7a2 2 0 012-2h5l2-2h7a2 2 0 012 2v14a2 2 0 01-2 2z"
    />
  </svg>
  <div>
    <span className="text-gray-400 text-sm">Summary</span>
    <p className="text-white text-base mt-1">{parsedData?.summary}</p>
  </div>
</motion.div>

{/* Skills Section */}
<motion.div
  className="mt-6 flex items-start gap-4"
  variants={childVariants}
>
  <svg
    className="w-6 h-6 mt-1 text-blue-500 flex-shrink-0"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9.75 17L15 12.75 9.75 8.5v8.5z"
    />
  </svg>
  <div>
    <span className="text-gray-400 text-sm">Skills</span>
    <ul className="flex flex-wrap mt-2 gap-2">
      {parsedData.skills?.map((skill, index) => (
        <li
          key={index}
          className="bg-blue-700/30 text-blue-300 text-sm px-3 py-1 rounded-full"
        >
          {skill}
        </li>
      ))}
    </ul>
  </div>
</motion.div>

                </motion.div>
              </motion.div>


            </motion.div>
          )}
        </AnimatePresence>

      </section>
    </div>
  );
}