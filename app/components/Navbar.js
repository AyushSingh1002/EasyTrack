'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from './Icons';
import TokenCounter from './TokenCounter';

export default function Navbar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: '/profile', label: 'Profile', icon: 'profile' },
    { href: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
    { href: '/applications', label: 'Applications', icon: 'applications' },
    { href: '/templates', label: 'Templates', icon: 'templates' },
    { href: '/pricing', label: 'Pricing', icon: 'pricing' },
  ];

  const isActive = (href) => pathname === href;

  return (
    <motion.nav
      className="bg-gray-950/95 backdrop-blur-md text-gray-100 py-3 px-3 sm:px-6 sticky top-0 z-50 shadow-lg border-b border-gray-800/50"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="text-xl font-bold text-white hover:text-blue-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md px-2 py-1"
        >
          EasyTrack
        </Link>

        <div className="hidden md:flex items-center space-x-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                isActive(item.href)
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:text-blue-400 hover:bg-gray-800/50 focus:bg-gray-800/50 focus:text-blue-400'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              aria-current={isActive(item.href) ? 'page' : undefined}
            >
              <Icon name={item.icon} size="sm" />
              <span>{item.label}</span>
            </Link>
          ))}
          <TokenCounter />
          {session ? (
            <motion.button
              onClick={() => signOut()}
              className="ml-2 px-3 py-2 rounded-md bg-red-600/20 text-red-400 text-sm font-medium hover:bg-red-600/30 focus:bg-red-600/30 focus:ring-2 focus:ring-red-500 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign Out
            </motion.button>
          ) : (
            <Link
              href="/api/auth/signin"
              className="ml-2 px-3 py-2 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 focus:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
            >
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-1.5 transition-colors duration-200"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <Icon name={isOpen ? 'close' : 'menu'} size="md" />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
            />
            {/* Menu */}
            <motion.div
              className="fixed top-0 right-0 h-full w-80 bg-gray-900/95 backdrop-blur-md z-60 shadow-2xl md:hidden"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200, duration: 0.3 }}
            >
              <div className="p-5">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-white">Menu</h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-1.5 transition-colors duration-200"
                    aria-label="Close menu"
                  >
                    <Icon name="close" size="md" />
                  </button>
                </div>
                <nav className="space-y-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-md text-base font-medium transition-colors duration-200 ${
                        isActive(item.href)
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-300 hover:text-white hover:bg-gray-800/50 focus:bg-gray-800/50 focus:text-white'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      aria-current={isActive(item.href) ? 'page' : undefined}
                      onClick={() => setIsOpen(false)}
                    >
                      <Icon name={item.icon} size="md" />
                      <span>{item.label}</span>
                    </Link>
                  ))}
                  <div className="pt-4 border-t border-gray-700">
                    <div className="flex items-center space-x-3 px-4 py-3 text-gray-300">
                      <Icon name="tokens" size="md" />
                      <span className="font-medium text-base">Tokens:</span>
                      <TokenCounter isMobileMenu={true} />
                    </div>
                    {session ? (
                      <button
                        onClick={() => {
                          signOut();
                          setIsOpen(false);
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-3 rounded-md text-red-400 hover:text-red-300 hover:bg-red-600/20 focus:bg-red-600/20 focus:ring-2 focus:ring-red-500 transition-colors duration-200"
                      >
                        <Icon name="close" size="md" />
                        <span className="font-medium">Sign Out</span>
                      </button>
                    ) : (
                      <Link
                        href="/api/auth/signin"
                        className="w-full flex items-center space-x-3 px-4 py-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                        onClick={() => setIsOpen(false)}
                      >
                        <Icon name="profile" size="md" />
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