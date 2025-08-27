'use client';

import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Navbar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <motion.nav
      className="bg-gray-950 text-gray-100 py-3 px-4 sticky top-0 z-20 shadow-md border-b border-gray-800"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <h1 className="text-lg font-semibold text-white">
          <Link href="/">EasyTrack</Link>
        </h1>
        <div className="hidden sm:flex items-center space-x-4">
          <Link
            href="/profile"
            className="text-gray-300 text-sm hover:text-blue-400 transition duration-150"
          >
            <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              Profile
            </motion.span>
          </Link>
          <Link
            href="/dashboard"
            className="text-gray-300 text-sm hover:text-blue-400 transition duration-150"
          >
            <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              Dashboard
            </motion.span>
          </Link>
          <Link
            href="/addjobs"
            className="text-gray-300 text-sm hover:text-blue-400 transition duration-150"
          >
            <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              Add Job
            </motion.span>
          </Link>
          <Link
            href="/email"
            className="text-gray-300 text-sm hover:text-blue-400 transition duration-150"
          >
            <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              E-Template
            </motion.span>
          </Link>
          <Link
            href="/pricing"
            className="text-gray-300 text-sm hover:text-blue-400 transition duration-150"
          >
            <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              Pricing
            </motion.span>
          </Link>
          {session ? (
            <motion.button
              onClick={() => signOut()}
              className="text-gray-300 text-sm hover:text-blue-400 transition duration-150"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Logout
            </motion.button>
          ) : (
            <Link
              href="/api/auth/signin"
              className="text-gray-300 text-sm hover:text-blue-400 transition duration-150"
            >
              <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                Login
              </motion.span>
            </Link>
          )}
        </div>
        <button
          className="sm:hidden text-gray-300 focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>
      </div>
      {isOpen && (
        <motion.div
          className="sm:hidden bg-gray-900 mt-2 rounded-md border border-gray-800 p-4"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex flex-col space-y-2">
            <Link
              href="/profile"
              className="text-gray-300 text-sm hover:text-blue-400 transition duration-150"
              onClick={toggleMenu}
            >
              Profile
            </Link>
            <Link
              href="/dashboard"
              className="text-gray-300 text-sm hover:text-blue-400 transition duration-150"
              onClick={toggleMenu}
            >
              Dashboard
            </Link>
            <Link
              href="/addjobs"
              className="text-gray-300 text-sm hover:text-blue-400 transition duration-150"
              onClick={toggleMenu}
            >
              Add Job
            </Link>
            <Link
            href="/email"
            className="text-gray-300 text-sm hover:text-blue-400 transition duration-150"
          >
            <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              E-Template
            </motion.span>
          </Link>
            <Link
              href="/pricing"
              className="text-gray-300 text-sm hover:text-blue-400 transition duration-150"
              onClick={toggleMenu}
            >
              Pricing
            </Link>
            {session ? (
              <button
                onClick={() => {
                  signOut();
                  toggleMenu();
                }}
                className="text-gray-300 text-sm hover:text-blue-400 transition duration-150 text-left"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/api/auth/signin"
                className="text-gray-300 text-sm hover:text-blue-400 transition duration-150"
                onClick={toggleMenu}
              >
                Login
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
