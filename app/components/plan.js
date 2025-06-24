'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function UserPlanBanner({ plan, isSubscribed }) {
  if (!isSubscribed) return null;

  const planStyles = {
    Free: {
      bg: 'bg-gradient-to-br from-slate-800 to-slate-900',
      text: 'text-ivory-50',
      border: 'border-ivory-200/30',
      icon: '✨',
    },
    Pro: {
      bg: 'bg-gradient-to-br from-emerald-800 to-emerald-900',
      text: 'text-emerald-50',
      border: 'border-emerald-300/30',
      icon: '💎',
    },
    Enterprise: {
      bg: 'bg-gradient-to-br from-rose-800 to-rose-900',
      text: 'text-rose-50',
      border: 'border-rose-300/30',
      icon: '👑',
    },
  };

  const currentPlan = planStyles[plan] || planStyles.Free;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      whileHover={{ scale: 1.02 }}
      className={`relative w-full max-w-2xl mx-auto p-5 rounded-2xl ${currentPlan.bg} ${currentPlan.text} ${currentPlan.border} border shadow-2xl overflow-hidden mb-8`}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{ duration: 3, repeat: Infinity, repeatType: 'loop', ease: 'linear' }}
      />
      <div className="relative flex items-center justify-center space-x-3">
        <motion.span
          initial={{ rotate: 0 }}
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: 'loop' }}
          className="text-xl"
        >
          {currentPlan.icon}
        </motion.span>
        <p className="text-sm sm:text-lg font-sans tracking-tight font-light">
          Subscribed to the{' '}
          <strong className="font-extrabold italic uppercase">{plan}</strong> Plan
        </p>
      </div>
    </motion.div>
  );
}