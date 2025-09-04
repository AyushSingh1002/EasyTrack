'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: '/profile', label: 'Profile', icon: '👤' },
    { href: '/dashboard', label: 'Dashboard', icon: '📊' },
    { href: '/applications', label: 'Applications', icon: '📝' },
    { href: '/templates', label: 'Templates', icon: '✉️' },
    { href: '/pricing', label: 'Pricing', icon: '💳' },
  ];

  const isActive = (href) => pathname === href;

  return (
    <motion.nav
      className="bg-gray-950/95 backdrop-blur-md text-gray-100 py-4 px-4 sticky top-0 z-50 shadow-lg border-b border-gray-800/50"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-white hover:text-blue-400 transition-colors">
          EazieTrack
        </Link>
        
        <div className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                isActive(item.href)
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:text-blue-400 hover:bg-gray-800/50'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
          
          {session ? (
            <motion.button
              onClick={() => signOut()}
              className="ml-4 px-4 py-2 bg-red-600/20 text-red-400 rounded-lg text-sm font-medium hover:bg-red-600/30 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign Out
            </motion.button>
          ) : (
            <Link
              href="/api/auth/signin"
              className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-1"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
              d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            
            {/* Menu */}
            <motion.div
              className="fixed top-0 right-0 h-full w-80 bg-gray-900/95 backdrop-blur-md z-50 shadow-2xl md:hidden"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-xl font-bold text-white">Menu</h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-1"
                    aria-label="Close menu"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <nav className="space-y-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive(item.href)
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  ))}
                  
                  <div className="pt-4 border-t border-gray-700">
                    {session ? (
                      <button
                        onClick={() => {
                          signOut();
                          setIsOpen(false);
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-600/20 transition-colors"
                      >
                        <span className="text-xl">🚪</span>
                        <span className="font-medium">Sign Out</span>
                      </button>
                    ) : (
                      <Link
                        href="/api/auth/signin"
                        className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        <span className="text-xl">🔑</span>
                        <span className="font-medium">Sign In</span>
                      </Link>
                    )}
                  </div>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
