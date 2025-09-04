'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

export const useFormValidation = (initialValues, validationRules) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validate = (fieldName, value) => {
    const rules = validationRules[fieldName];
    if (!rules) return '';

    for (const rule of rules) {
      const error = rule(value);
      if (error) return error;
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      setErrors(prev => ({ ...prev, [name]: validate(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ ...prev, [name]: validate(name, value) }));
  };

  const handleSubmit = (onSubmit) => async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {};
    Object.keys(validationRules).forEach(field => {
      newErrors[field] = validate(field, values[field]);
    });
    
    setErrors(newErrors);
    setTouched(Object.keys(validationRules).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
    
    const hasErrors = Object.values(newErrors).some(error => error);
    if (hasErrors) {
      toast.error('Please fix the errors before submitting');
      return;
    }
    
    try {
      await onSubmit(values);
    } catch (error) {
      toast.error(error.message || 'Submission failed');
    }
  };

  return { values, errors, touched, handleChange, handleBlur, handleSubmit };
};

export const AccessibleButton = ({ 
  children, 
  onClick, 
  disabled = false, 
  variant = 'primary',
  ariaLabel,
  ...props 
}) => {
  const baseClasses = "px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-950";
  
  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary: "bg-gray-800 text-gray-200 hover:bg-gray-700 focus:ring-gray-500",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500"
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      role="button"
      tabIndex={disabled ? -1 : 0}
      {...props}
    >
      {children}
    </button>
  );
};

export const FormField = ({ 
  label, 
  name, 
  type = 'text', 
  value, 
  onChange, 
  onBlur, 
  error, 
  touched, 
  placeholder,
  required = false,
  ...props 
}) => (
  <div className="space-y-2">
    <label htmlFor={name} className="block text-sm font-medium text-gray-300">
      {label}
      {required && <span className="text-red-400 ml-1">*</span>}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      className={`form-input ${error && touched ? 'border-red-500 focus:ring-red-500' : ''}`}
      aria-invalid={error && touched}
      aria-describedby={error && touched ? `${name}-error` : undefined}
      {...props}
    />
    {error && touched && (
      <p id={`${name}-error`} className="text-sm text-red-400" role="alert">
        {error}
      </p>
    )}
  </div>
);

export const TextAreaField = ({ 
  label, 
  name, 
  value, 
  onChange, 
  onBlur, 
  error, 
  touched, 
  placeholder,
  required = false,
  rows = 4,
  ...props 
}) => (
  <div className="space-y-2">
    <label htmlFor={name} className="block text-sm font-medium text-gray-300">
      {label}
      {required && <span className="text-red-400 ml-1">*</span>}
    </label>
    <textarea
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      rows={rows}
      className={`form-input resize-vertical ${error && touched ? 'border-red-500 focus:ring-red-500' : ''}`}
      aria-invalid={error && touched}
      aria-describedby={error && touched ? `${name}-error` : undefined}
      {...props}
    />
    {error && touched && (
      <p id={`${name}-error`} className="text-sm text-red-400" role="alert">
        {error}
      </p>
    )}
  </div>
);

// Common validation rules
export const validationRules = {
  required: (value) => !value ? 'This field is required' : '',
  email: (value) => {
    if (!value) return '';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !emailRegex.test(value) ? 'Please enter a valid email address' : '';
  },
  minLength: (min) => (value) => 
    value && value.length < min ? `Must be at least ${min} characters` : '',
  maxLength: (max) => (value) => 
    value && value.length > max ? `Must be no more than ${max} characters` : '',
  url: (value) => {
    if (!value) return '';
    try {
      new URL(value);
      return '';
    } catch {
      return 'Please enter a valid URL';
    }
  }
};
