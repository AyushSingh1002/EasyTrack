'use client';

import { motion } from 'framer-motion';

export const LoadingSpinner = ({ size = 'md', text = 'Loading...' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      <svg
        className={`animate-spin ${sizeClasses[size]} text-blue-500`}
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
      <span className="text-gray-400 text-sm">{text}</span>
    </div>
  );
};

export const ErrorBoundary = ({ error, resetError }) => (
  <div className="min-h-screen bg-gray-950 flex items-center justify-center">
    <div className="text-center">
      <div className="text-red-400 text-6xl mb-4">⚠️</div>
      <h2 className="text-2xl font-bold text-white mb-2">Something went wrong</h2>
      <p className="text-gray-400 mb-6">{error?.message || 'An unexpected error occurred'}</p>
      <button
        onClick={resetError}
        className="btn-primary"
      >
        Try Again
      </button>
    </div>
  </div>
);

export const EmptyState = ({ icon, title, description, action }) => (
  <div className="text-center py-12">
    <div className="text-6xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-400 mb-6 max-w-md mx-auto">{description}</p>
    {action && action}
  </div>
);

export const SkeletonCard = () => (
  <div className="card animate-pulse">
    <div className="h-4 bg-gray-700 rounded w-3/4 mb-4"></div>
    <div className="h-3 bg-gray-700 rounded w-1/2 mb-2"></div>
    <div className="h-3 bg-gray-700 rounded w-2/3"></div>
  </div>
);

export const SkeletonTable = ({ rows = 5 }) => (
  <div className="card">
    <div className="space-y-4">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex space-x-4 animate-pulse">
          <div className="h-4 bg-gray-700 rounded flex-1"></div>
          <div className="h-4 bg-gray-700 rounded w-20"></div>
          <div className="h-4 bg-gray-700 rounded w-16"></div>
        </div>
      ))}
    </div>
  </div>
);
