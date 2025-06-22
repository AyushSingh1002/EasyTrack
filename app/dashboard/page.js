'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const [applications, setApplications] = useState([]);
  const [averageScore, setAverageScore] = useState(0);
  const [topSkills, setTopSkills] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await fetch('/api/dashboard');
        const data = await res.json();

        setApplications(data);

        const scores = data.map(app => parseFloat(app.score)).filter(Boolean);
        if (scores.length) {
          const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
          setAverageScore(avg.toFixed(1));
        }

        const allSuggestions = data.flatMap(app => {
          try {
            const parsed = JSON.parse(app.improvement_suggestions);
            return Array.isArray(parsed) ? parsed : [];
          } catch {
            return [];
          }
        });

        const freq = {};
        for (const skill of allSuggestions) {
          freq[skill] = (freq[skill] || 0) + 1;
        }

        const top = Object.entries(freq)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([skill]) => skill);

        setTopSkills(top);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      }
    };

    fetchApplications();
  }, []);

  const getMatchTag = (score) => {
    const s = parseFloat(score);
    if (s >= 80) return { label: 'Strong Match', color: 'green' };
    if (s >= 60) return { label: 'Moderate Match', color: 'yellow' };
    return { label: 'Weak Match', color: 'red' };
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 py-12 px-4 sm:px-8 flex items-center justify-center">
      <section className="max-w-6xl w-full">
        <motion.h2
          className="text-3xl font-semibold text-center text-white mb-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          Application Dashboard
          <span className="block w-16 h-0.5 bg-blue-500 mx-auto mt-2" />
        </motion.h2>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
          {[{
            title: 'Total Applications',
            value: applications.length,
            description: 'All submitted applications.'
          }, {
            title: 'Average Score',
            value: averageScore,
            description: 'AI-based match score.'
          }, {
            title: 'Offers Received',
            value: 1,
            description: 'Total job offers.'
          }].map((stat, idx) => (
            <motion.div
              key={idx}
              className="bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-800 hover:bg-gray-800 transition"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.15 }}
              whileHover={{ scale: 1.03 }}
            >
              <h3 className="text-sm font-medium text-gray-400">{stat.title}</h3>
              <p className="text-3xl font-bold text-blue-400 mt-1">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Top Skills */}
        {topSkills.length > 0 && (
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-800 mb-12">
            <h3 className="text-lg font-semibold text-white mb-4">Top Improvement Skills</h3>
            <div className="flex flex-wrap gap-3">
              {topSkills.map((skill, idx) => (
                <span key={idx} className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-sm font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Application Table */}
        <motion.div
          className="bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-800"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.45 }}
        >
          <h3 className="text-lg font-semibold text-white mb-4">Application History</h3>
          <div className="overflow-x-auto">
            <table className="min-w-[600px] w-full text-left text-sm sm:text-base">
              <thead>
                <tr className="text-gray-300 border-b border-gray-700">
                  <th className="p-3">Company</th>
                  <th className="p-3">Level</th>
                  <th className="p-3">Score</th>
                  <th className="p-3">Match</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app, index) => {
                  const tag = getMatchTag(app.score);
                  return (
                    <motion.tr
                      key={index}
                      className="border-t border-gray-800 hover:bg-gray-800"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                    >
                      <td className="p-3">{app.company_name || "N/A"}</td>
                      <td className="p-3">{app.job_level}</td>
                      <td className="p-3">{app.score}</td>
                      <td className="p-3">
                        <span className={`text-${tag.color}-400 bg-${tag.color}-500/10 px-2 py-0.5 rounded-full text-xs font-medium`}>
                          {tag.label}
                        </span>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>
      </section>
    </div>
  );
}