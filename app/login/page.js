'use client';

import React from 'react';
import { useSession, signIn } from 'next-auth/react';

export default function Login() {
  const { data: session, status } = useSession();

  console.log("session", status)

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
        {status === 'loading' ? (
          <div className="flex justify-center items-center">
            <svg
              className="animate-spin h-8 w-8 text-indigo-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
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
                d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"
              />
            </svg>
            <span className="ml-3 text-gray-600 text-lg">Loading...</span>
          </div>
        ) : !session ? (
          <div>
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">
              Welcome to JobTracker
            </h1>
            <button
              onClick={() => signIn('github')}
              className="w-full bg-gray-800 text-white px-4 py-3 rounded-md hover:bg-gray-900 transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48v-1.69c-2.78.61-3.37-1.34-3.37-1.34-.46-1.16-1.12-1.47-1.12-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.564 9.564 0 0112 6.8c.85.004 1.71.11 2.52.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10.007 10.007 0 0022 12c0-5.52-4.48-10-10-10z" />
              </svg>
              Sign in with GitHub
            </button>
          </div>
        ) : (
          <div>
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">
              Welcome, {session.user.name}!
            </h1>
            <p className="text-gray-600 mb-6">
              You&apos;re signed in. Start tracking your job applications now.
            </p>
            <a
              href="/dashboard"
              className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-200"
            >
              Go to Dashboard
            </a>
          </div>
        )}
      </div>
    </div>
  );
}