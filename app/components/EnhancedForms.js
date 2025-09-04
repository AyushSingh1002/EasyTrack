'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from './Icons';
import toast from 'react-hot-toast';

// Enhanced input component with floating labels
export const FloatingInput = ({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  onBlur,
  error, 
  touched,
  required = false,
  disabled = false,
  placeholder,
  className = '',
  ...props 
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  const isFloating = isFocused || value || touched;

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <input
          ref={inputRef}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur?.(e);
          }}
          onFocus={() => setIsFocused(true)}
          disabled={disabled}
          placeholder={isFloating ? placeholder : ''}
          className={`
            w-full px-4 pt-6 pb-2 bg-gray-800/50 border rounded-lg
            text-gray-100 placeholder-transparent
            transition-all duration-200 ease-in-out
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            disabled:opacity-50 disabled:cursor-not-allowed
            ${error && touched 
              ? 'border-red-500 focus:ring-red-500' 
              : 'border-gray-700/50 hover:border-gray-600/50'
            }
          `}
          {...props}
        />
        <label
          className={`
            absolute left-4 transition-all duration-200 ease-in-out pointer-events-none
            ${isFloating 
              ? 'top-2 text-xs text-blue-400' 
              : 'top-4 text-sm text-gray-400'
            }
            ${error && touched ? 'text-red-400' : ''}
          `}
          onClick={() => inputRef.current?.focus()}
        >
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      </div>
      
      <AnimatePresence>
        {error && touched && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center mt-2 text-sm text-red-400"
          >
            <Icon name="error" size="sm" className="mr-2" />
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Enhanced textarea with auto-resize
export const AutoResizeTextarea = ({ 
  label, 
  value, 
  onChange, 
  onBlur,
  error, 
  touched,
  required = false,
  disabled = false,
  placeholder,
  minRows = 3,
  maxRows = 10,
  className = '',
  ...props 
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef(null);

  const isFloating = isFocused || value || touched;

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const scrollHeight = textarea.scrollHeight;
      const lineHeight = parseInt(getComputedStyle(textarea).lineHeight);
      const maxHeight = lineHeight * maxRows;
      const minHeight = lineHeight * minRows;
      
      textarea.style.height = `${Math.min(Math.max(scrollHeight, minHeight), maxHeight)}px`;
    }
  }, [value, minRows, maxRows]);

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={onChange}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur?.(e);
          }}
          onFocus={() => setIsFocused(true)}
          disabled={disabled}
          placeholder={isFloating ? placeholder : ''}
          className={`
            w-full px-4 pt-6 pb-2 bg-gray-800/50 border rounded-lg
            text-gray-100 placeholder-transparent resize-none
            transition-all duration-200 ease-in-out
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            disabled:opacity-50 disabled:cursor-not-allowed
            ${error && touched 
              ? 'border-red-500 focus:ring-red-500' 
              : 'border-gray-700/50 hover:border-gray-600/50'
            }
          `}
          {...props}
        />
        <label
          className={`
            absolute left-4 transition-all duration-200 ease-in-out pointer-events-none
            ${isFloating 
              ? 'top-2 text-xs text-blue-400' 
              : 'top-4 text-sm text-gray-400'
            }
            ${error && touched ? 'text-red-400' : ''}
          `}
          onClick={() => textareaRef.current?.focus()}
        >
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      </div>
      
      <AnimatePresence>
        {error && touched && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center mt-2 text-sm text-red-400"
          >
            <Icon name="error" size="sm" className="mr-2" />
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Enhanced select component
export const EnhancedSelect = ({ 
  label, 
  value, 
  onChange, 
  onBlur,
  error, 
  touched,
  required = false,
  disabled = false,
  options = [],
  placeholder = 'Select an option',
  className = '',
  ...props 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const selectRef = useRef(null);

  const selectedOption = options.find(option => option.value === value);
  const isFloating = isFocused || value || touched;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`}>
      <div className="relative" ref={selectRef}>
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onBlur={() => setIsFocused(false)}
          onFocus={() => setIsFocused(true)}
          disabled={disabled}
          className={`
            w-full px-4 pt-6 pb-2 bg-gray-800/50 border rounded-lg
            text-gray-100 text-left
            transition-all duration-200 ease-in-out
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            disabled:opacity-50 disabled:cursor-not-allowed
            ${error && touched 
              ? 'border-red-500 focus:ring-red-500' 
              : 'border-gray-700/50 hover:border-gray-600/50'
            }
          `}
        >
          <span className={selectedOption ? 'text-gray-100' : 'text-transparent'}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <Icon 
            name="chevronDown" 
            size="sm" 
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 transition-transform ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
        
        <label
          className={`
            absolute left-4 transition-all duration-200 ease-in-out pointer-events-none
            ${isFloating 
              ? 'top-2 text-xs text-blue-400' 
              : 'top-4 text-sm text-gray-400'
            }
            ${error && touched ? 'text-red-400' : ''}
          `}
        >
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute z-50 w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-lg max-h-60 overflow-auto"
            >
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange({ target: { name: props.name, value: option.value } });
                    setIsOpen(false);
                  }}
                  className={`
                    w-full px-4 py-3 text-left text-gray-100 hover:bg-gray-700
                    transition-colors duration-150
                    ${value === option.value ? 'bg-blue-600/20 text-blue-400' : ''}
                  `}
                >
                  {option.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <AnimatePresence>
        {error && touched && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center mt-2 text-sm text-red-400"
          >
            <Icon name="error" size="sm" className="mr-2" />
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// File upload component with drag and drop
export const FileUpload = ({ 
  label, 
  accept, 
  onChange, 
  error, 
  touched,
  required = false,
  disabled = false,
  maxSize = 10 * 1024 * 1024, // 10MB
  className = '',
  ...props 
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileSelect = (file) => {
    if (file.size > maxSize) {
      toast.error(`File size must be less than ${maxSize / (1024 * 1024)}MB`);
      return;
    }

    setUploadedFile(file);
    onChange({ target: { name: props.name, files: [file] } });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  return (
    <div className={`relative ${className}`}>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => !disabled && fileInputRef.current?.click()}
        className={`
          relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
          transition-all duration-200 ease-in-out
          ${isDragOver 
            ? 'border-blue-500 bg-blue-500/10' 
            : 'border-gray-700/50 hover:border-gray-600/50'
          }
          ${error && touched ? 'border-red-500' : ''}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
          className="hidden"
          disabled={disabled}
          {...props}
        />
        
        <Icon 
          name="upload" 
          size="xl" 
          className={`mx-auto mb-4 ${isDragOver ? 'text-blue-400' : 'text-gray-400'}`}
        />
        
        <p className="text-gray-300 mb-2">
          {uploadedFile ? uploadedFile.name : 'Drag & drop or click to upload'}
        </p>
        
        <p className="text-sm text-gray-500">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </p>
      </div>
      
      <AnimatePresence>
        {error && touched && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center mt-2 text-sm text-red-400"
          >
            <Icon name="error" size="sm" className="mr-2" />
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Enhanced button with loading states
export const EnhancedButton = ({ 
  children, 
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon,
  iconPosition = 'left',
  className = '',
  onClick,
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-950 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-800 text-gray-200 hover:bg-gray-700 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    ghost: 'bg-transparent text-gray-300 hover:bg-gray-800/50 focus:ring-gray-500',
    outline: 'border border-gray-700 text-gray-300 hover:bg-gray-800 focus:ring-gray-500'
  };

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg'
  };

  return (
    <motion.button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
      whileHover={{ scale: disabled || loading ? 1 : 1.05 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.95 }}
      {...props}
    >
      {loading ? (
        <Icon name="spinner" size="sm" className="mr-2" />
      ) : icon && iconPosition === 'left' ? (
        <Icon name={icon} size="sm" className="mr-2" />
      ) : null}
      
      {children}
      
      {!loading && icon && iconPosition === 'right' && (
        <Icon name={icon} size="sm" className="ml-2" />
      )}
    </motion.button>
  );
};
