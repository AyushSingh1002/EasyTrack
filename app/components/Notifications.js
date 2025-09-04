'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from './Icons';
import toast from 'react-hot-toast';

// Enhanced toast configuration
export const toastConfig = {
  success: {
    icon: 'success',
    style: {
      background: '#1f2937',
      color: '#f9fafb',
      border: '1px solid #10b981',
      borderRadius: '12px',
      padding: '16px 20px',
      fontSize: '14px',
      fontWeight: '500',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
    },
    duration: 4000,
  },
  error: {
    icon: 'error',
    style: {
      background: '#1f2937',
      color: '#f9fafb',
      border: '1px solid #ef4444',
      borderRadius: '12px',
      padding: '16px 20px',
      fontSize: '14px',
      fontWeight: '500',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
    },
    duration: 5000,
  },
  warning: {
    icon: 'warning',
    style: {
      background: '#1f2937',
      color: '#f9fafb',
      border: '1px solid #f59e0b',
      borderRadius: '12px',
      padding: '16px 20px',
      fontSize: '14px',
      fontWeight: '500',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
    },
    duration: 4000,
  },
  info: {
    icon: 'info',
    style: {
      background: '#1f2937',
      color: '#f9fafb',
      border: '1px solid #3b82f6',
      borderRadius: '12px',
      padding: '16px 20px',
      fontSize: '14px',
      fontWeight: '500',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
    },
    duration: 4000,
  },
};

// Custom toast functions
export const showToast = {
  success: (message) => toast.success(message, toastConfig.success),
  error: (message) => toast.error(message, toastConfig.error),
  warning: (message) => toast.warning(message, toastConfig.warning),
  info: (message) => toast.info(message, toastConfig.info),
  loading: (message) => toast.loading(message, {
    style: toastConfig.info.style,
    duration: Infinity,
  }),
  dismiss: (toastId) => toast.dismiss(toastId),
};

// Inline notification component
export const Notification = ({ 
  type = 'info', 
  title, 
  message, 
  onClose, 
  autoClose = true,
  duration = 5000,
  className = '' 
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => onClose?.(), 300);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [autoClose, duration, onClose]);

  const typeConfig = {
    success: {
      icon: 'success',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20',
      iconColor: 'text-green-400',
      titleColor: 'text-green-300',
    },
    error: {
      icon: 'error',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/20',
      iconColor: 'text-red-400',
      titleColor: 'text-red-300',
    },
    warning: {
      icon: 'warning',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/20',
      iconColor: 'text-yellow-400',
      titleColor: 'text-yellow-300',
    },
    info: {
      icon: 'info',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
      iconColor: 'text-blue-400',
      titleColor: 'text-blue-300',
    },
  };

  const config = typeConfig[type];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 300, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 300, scale: 0.8 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className={`
            fixed top-4 right-4 z-50 max-w-sm w-full
            ${config.bgColor} ${config.borderColor} border rounded-lg p-4
            backdrop-blur-sm shadow-lg
            ${className}
          `}
        >
          <div className="flex items-start space-x-3">
            <Icon 
              name={config.icon} 
              size="md" 
              className={`${config.iconColor} flex-shrink-0 mt-0.5`}
            />
            <div className="flex-1 min-w-0">
              {title && (
                <h4 className={`text-sm font-semibold ${config.titleColor} mb-1`}>
                  {title}
                </h4>
              )}
              <p className="text-sm text-gray-300 leading-relaxed">
                {message}
              </p>
            </div>
            {onClose && (
              <button
                onClick={() => {
                  setIsVisible(false);
                  setTimeout(() => onClose(), 300);
                }}
                className="flex-shrink-0 text-gray-400 hover:text-gray-200 transition-colors"
              >
                <Icon name="close" size="sm" />
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Notification container for managing multiple notifications
export const NotificationContainer = ({ notifications, onRemove }) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {notifications.map((notification) => (
          <Notification
            key={notification.id}
            {...notification}
            onClose={() => onRemove(notification.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

// Progress notification for long-running operations
export const ProgressNotification = ({ 
  title, 
  progress, 
  message, 
  onClose,
  className = '' 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className={`
        fixed top-4 right-4 z-50 max-w-sm w-full
        bg-gray-800/90 border border-gray-700/50 rounded-lg p-4
        backdrop-blur-sm shadow-lg
        ${className}
      `}
    >
      <div className="flex items-start space-x-3">
        <Icon name="spinner" size="md" className="text-blue-400 flex-shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-blue-300 mb-2">
            {title}
          </h4>
          <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
            <motion.div
              className="bg-blue-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <p className="text-xs text-gray-400">
            {message || `${Math.round(progress)}% complete`}
          </p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="flex-shrink-0 text-gray-400 hover:text-gray-200 transition-colors"
          >
            <Icon name="close" size="sm" />
          </button>
        )}
      </div>
    </motion.div>
  );
};

// Confirmation dialog
export const ConfirmationDialog = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'warning',
  className = '' 
}) => {
  const typeConfig = {
    warning: {
      icon: 'warning',
      iconColor: 'text-yellow-400',
      confirmColor: 'bg-yellow-600 hover:bg-yellow-700',
    },
    danger: {
      icon: 'error',
      iconColor: 'text-red-400',
      confirmColor: 'bg-red-600 hover:bg-red-700',
    },
    info: {
      icon: 'info',
      iconColor: 'text-blue-400',
      confirmColor: 'bg-blue-600 hover:bg-blue-700',
    },
  };

  const config = typeConfig[type];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className={`
              relative bg-gray-900 border border-gray-700 rounded-lg p-6 max-w-md w-full
              shadow-2xl
              ${className}
            `}
          >
            <div className="flex items-start space-x-4">
              <Icon 
                name={config.icon} 
                size="lg" 
                className={`${config.iconColor} flex-shrink-0 mt-1`}
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">
                  {title}
                </h3>
                <p className="text-gray-300 mb-6">
                  {message}
                </p>
                <div className="flex space-x-3 justify-end">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                  >
                    {cancelText}
                  </button>
                  <button
                    onClick={() => {
                      onConfirm();
                      onClose();
                    }}
                    className={`px-4 py-2 text-white rounded-lg transition-colors ${config.confirmColor}`}
                  >
                    {confirmText}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Success animation component
export const SuccessAnimation = ({ isVisible, onComplete }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.5 }}
          onAnimationComplete={onComplete}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: 'spring', 
              damping: 15, 
              stiffness: 300,
              delay: 0.1 
            }}
            className="bg-white rounded-full p-8 shadow-2xl"
          >
            <motion.div
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Icon name="success" size="xl" className="text-green-500" />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
