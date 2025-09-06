'use client';

import { useEffect, useState } from 'react';
import { useTokenStore } from '@/store/useTokenStore';
import { useSession } from 'next-auth/react';
import { motion, useAnimation } from 'framer-motion';

export default function TokenCounter({ isMobileMenu = false }) {
  const tokens = useTokenStore((s) => s.tokens);
  const setTokens = useTokenStore((s) => s.setTokens);
  const { data: session, status } = useSession();
  const [mounted, setMounted] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    console.log('TokenCounter: Mounted, isMobileMenu:', isMobileMenu, 'status:', status, 'session:', !!session, 'userId:', session?.user?.uid);
    setMounted(true);
    controls.start({
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, ease: 'easeOut' },
    });
  }, [controls, session, isMobileMenu]);

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        console.log('TokenCounter: Fetching tokens from /api/token');
        const res = await fetch('/api/token', { cache: 'no-store' });
        if (!res.ok) {
          console.error('TokenCounter: API response not OK', res.status, res.statusText);
          setTokens(0);
          return;
        }
        const data = await res.json();
        console.log('TokenCounter: API response', data);
        if (data.success && typeof data.available_token === 'number') {
          setTokens(data.available_token);
        } else {
          console.error('TokenCounter: Invalid token data', data);
          setTokens(0);
        }
      } catch (error) {
        console.error('TokenCounter: Fetch error', error.message);
        setTokens(0);
      }
    };

    if (status === 'authenticated') {
      fetchTokens();
      const interval = setInterval(fetchTokens, 30000); // Poll every 30s
      return () => clearInterval(interval);
    } else {
      console.log('TokenCounter: Status:', status, 'setting tokens to 0');
      setTokens(0);
    }
  }, [status, setTokens]);

  useEffect(() => {
    console.log('TokenCounter: Tokens updated', tokens);
    if (mounted) {
      controls.start({
        scale: [1, 1.15, 1],
        transition: { duration: 0.3, ease: 'easeInOut' },
      });
    }
  }, [tokens, controls, mounted]);

  if (!mounted) {
    console.log('TokenCounter: Not mounted, returning null');
    return null;
  }

  // Mobile menu rendering
  if (isMobileMenu) {
    return (
      <motion.span
        className="text-white font-semibold text-base tabular-nums"
        animate={controls}
        aria-label={status === 'loading' ? 'Token count loading' : `Available tokens: ${tokens}`}
        role="status"
      >
        {status === 'loading' ? '...' : tokens}
      </motion.span>
    );
  }

  return (
    <>
      {/* Desktop: Inline TokenCounter */}
      <motion.div
        className="hidden md:flex items-center gap-2 rounded-md bg-gray-900 border border-gray-800 px-3 py-1.5 shadow-lg backdrop-blur-sm supports-[backdrop-filter]:bg-gray-900/80"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={controls}
        whileHover={{ scale: 1.05, boxShadow: '0 0 12px rgba(59, 130, 246, 0.3)' }}
        role="status"
      >
        <span className="text-blue-400 text-lg" aria-hidden="true">
          🪙
        </span>
        <span className="text-sm text-gray-400">
          {status === 'loading' ? 'Loading...' : 'Tokens'}
        </span>
        <span
          className="text-white font-semibold text-base tabular-nums"
          aria-label={status === 'loading' ? 'Token count loading' : `Available tokens: ${tokens}`}
        >
          {status === 'loading' ? '...' : tokens}
        </span>
      </motion.div>

      {/* Mobile: Compact Floating HUD TokenCounter */}
      <motion.div
        className="md:hidden fixed right-4 z-90" // border-red-500 for debugging
        style={{ bottom: 'calc(28px + env(safe-area-inset-bottom))' }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={controls}
        whileHover={{ scale: 1.1, boxShadow: '0 0 12px rgba(59, 130, 246, 0.3)' }}
        role="status"
      >
        <div className="flex items-center gap-1 rounded-full bg-gray-900 border border-gray-800 px-2.5 py-1 shadow-lg backdrop-blur-sm supports-[backdrop-filter]:bg-gray-900/80">
          <span className="text-blue-400 text-sm" aria-hidden="true">
            🪙
          </span>
          <span
            className="text-white font-semibold text-sm tabular-nums"
            aria-label={status === 'loading' ? 'Token count loading' : `Available tokens: ${tokens}`}
          >
            {status === 'loading' ? '...' : tokens}
          </span>
        </div>
      </motion.div>
    </>
  );
}