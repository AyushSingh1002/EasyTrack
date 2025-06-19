'use client';

import { motion } from 'framer-motion';

export default function Dashboard() {
  const jobApplications = [
    { id: 1, company: 'Tech Corp', position: 'Frontend Developer', date: '2025-05-01', status: 'Applied' },
    { id: 2, company: 'Data Inc', position: 'Data Analyst', date: '2025-04-15', status: 'Interview' },
    { id: 3, company: 'Startup X', position: 'Full Stack Engineer', date: '2025-03-20', status: 'Rejected' },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 py-12 px-4 sm:px-6 flex items-center justify-center">
      <section id="dashboard" className="max-w-4xl mx-auto w-full">
        <motion.h2
          className="text-2xl sm:text-3xl font-semibold text-center text-white mb-8 relative"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          Application Dashboard
          <span className="block w-16 h-0.5 bg-blue-500 mx-auto mt-2" />
        </motion.h2>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {[
            {
              title: 'Total Applications',
              value: '12',
              description: 'All your submitted applications.',
              icon: (
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              ),
            },
            {
              title: 'Interviews Scheduled',
              value: '3',
              description: 'Upcoming interview opportunities.',
              icon: (
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              ),
            },
            {
              title: 'Offers Received',
              value: '1',
              description: 'Job offers in hand.',
              icon: (
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              ),
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              className="bg-gray-900 p-6 rounded-md shadow-lg border border-gray-800 hover:bg-gray-800 hover:shadow-xl transition duration-300"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.15 }}
              whileHover={{ scale: 1.03 }}
            >
              <div className="flex items-center justify-center mb-2">
                {stat.icon}
                <h3 className="text-lg font-medium text-white ml-2">{stat.title}</h3>
              </div>
              <p className="text-xl font-bold text-blue-400">{stat.value}</p>
              <p className="text-xs text-gray-400 mt-1">{stat.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Application Table */}
        <motion.div
          className="bg-gray-900 p-6 rounded-md shadow-lg border border-gray-800"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.45 }}
        >
          <h3 className="text-lg font-semibold text-white mb-4">Application History</h3>

          {/* Hint for mobile users */}
          <p className="text-xs text-gray-500 text-center mt-2 sm:hidden">Swipe left/right to view more columns</p>

          <div className="overflow-x-auto">
            <table className="min-w-[600px] w-full text-left text-sm sm:text-base">
              <thead>
                <tr className="text-gray-300 border-b border-gray-700">
                  <th className="p-3 whitespace-nowrap">Company</th>
                  <th className="p-3 whitespace-nowrap">Position</th>
                  <th className="p-3 whitespace-nowrap">Date Applied</th>
                  <th className="p-3 whitespace-nowrap">Status</th>
                  <th className="p-3 whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobApplications.map((app, index) => (
                  <motion.tr
                    key={app.id}
                    className="border-t border-gray-800 hover:bg-gray-800"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    <td className="p-3 whitespace-nowrap">{app.company}</td>
                    <td className="p-3 whitespace-nowrap">{app.position}</td>
                    <td className="p-3 whitespace-nowrap">{app.date}</td>
                    <td className="p-3 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          app.status === 'Applied'
                            ? 'bg-blue-500/20 text-blue-400'
                            : app.status === 'Interview'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}
                      >
                        {app.status}
                      </span>
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      <motion.button
                        className="text-blue-400 hover:text-blue-300 text-xs font-medium transition duration-150"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Edit
                      </motion.button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
