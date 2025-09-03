"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      className="bg-gray-900 w-full py-8 px-4 sm:px-6 border-t border-gray-800"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-4 gap-8">
        {/* Explore */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Explore</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <a
                href="/"
                className="hover:text-blue-400 transition duration-200"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/aboutus"
                className="hover:text-blue-400 transition duration-200"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="/pricing"
                className="hover:text-blue-400 transition duration-200"
              >
                Pricing
              </a>
            </li>
            <li>
              <a
                href="/help"
                className="hover:text-blue-400 transition duration-200"
              >
                FAQ's
              </a>
            </li>
          </ul>
        </div>
        {/* Policies */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Policies</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <a
                href="/refundPolicy"
                className="hover:text-blue-400 transition duration-200"
              >
                Refund Policy
              </a>
            </li>
            <li>
              <a
                href="/PrivacyAndTerms"
                className="hover:text-blue-400 transition duration-200"
              >
                Privacy Policy & Terms
              </a>
            </li>
          </ul>
        </div>
        {/* Support */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Support</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <a
                href="/contactus"
                className="hover:text-blue-400 transition duration-200"
              >
                Help Center
              </a>
            </li>
            <li>
              <a
                href="/contactus"
                className="hover:text-blue-400 transition duration-200"
              >
                Submit a Ticket
              </a>
            </li>
            <li>
              <a
                href="mailto:thoughttrailservices@gmail.com"
                className="hover:text-blue-400 transition duration-200"
              >
                thoughttrailservices@gmail.com
              </a>
            </li>
          </ul>
        </div>
        {/* Social Media Links */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Follow Us</h4>
          <div className="flex space-x-4">
            <a
              href="https://twitter.com/"
              className="text-gray-400 hover:text-blue-400 transition duration-200"
              aria-label="Follow us on Twitter"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/ayush-kumar-singh-1b21e/"
              className="text-gray-400 hover:text-blue-400 transition duration-200"
              aria-label="Follow us on LinkedIn"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68M8.27 15.5v-8.37H5.5v8.37h2.77z" />
              </svg>
            </a>
            <a
              href="https://instagram.com/_its_ayu_11"
              className="text-gray-400 hover:text-blue-400 transition duration-200"
              aria-label="Follow us on Instagram"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a
              href="https://github.com/AyushSingh1002"
              className="text-gray-400 hover:text-blue-400 transition duration-200"
              aria-label="Follow us on GitHub"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.164 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.154-1.108-1.462-1.108-1.462-.905-.619.069-.606.069-.606 1.002.071 1.53 1.03 1.53 1.03.892 1.529 2.341 1.087 2.91.831.091-.645.349-1.087.635-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .268.18.583.688.482A10.002 10.002 0 0022 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
       <div className="mt-8 text-center text-sm text-gray-400">
        <p>&copy; 2025 Eazietrack. All rights reserved.</p>
        <p className="mt-1">Legal Name: <span className="text-gray-200 font-medium">Ayush Kumar Singh</span></p>
      </div>
    </motion.footer>
  );
}