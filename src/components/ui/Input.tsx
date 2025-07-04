// src/components/ui/Input.tsx
'use client';

import { InputHTMLAttributes, ReactNode, forwardRef } from 'react';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  helperText?: string;
  error?: string;
  success?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'filled' | 'outlined';
  fullWidth?: boolean;
  required?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  helperText,
  error,
  success,
  leftIcon,
  rightIcon,
  size = 'md',
  variant = 'default',
  fullWidth = true,
  required = false,
  disabled = false,
  className = '',
  id,
  ...props
}, ref) => {
  
  // Generate unique ID if not provided
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  
  // Determine validation state
  const hasError = !!error;
  const hasSuccess = !!success && !hasError;
  
  // Base input styles
  const baseStyles = 'transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';
  
  // Variant styles
  const variantStyles = {
    default: 'bg-white border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent',
    filled: 'bg-gray-50 border border-transparent focus:bg-white focus:ring-2 focus:ring-primary-500',
    outlined: 'bg-transparent border-2 border-gray-300 focus:border-primary-500'
  };
  
  // Size styles
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm rounded-md',
    md: 'px-3 py-2 text-sm rounded-lg',
    lg: 'px-4 py-3 text-base rounded-lg'
  };
  
  // State-specific styles
  const getStateStyles = () => {
    if (hasError) {
      return 'border-red-300 focus:border-red-500 focus:ring-red-500';
    }
    if (hasSuccess) {
      return 'border-green-300 focus:border-green-500 focus:ring-green-500';
    }
    return '';
  };
  
  // Icon container styles
  const getIconStyles = (position: 'left' | 'right') => {
    const baseIconStyles = 'absolute top-1/2 transform -translate-y-1/2 flex items-center pointer-events-none';
    const sizeIconStyles = {
      sm: position === 'left' ? 'left-3' : 'right-3',
      md: position === 'left' ? 'left-3' : 'right-3',
      lg: position === 'left' ? 'left-4' : 'right-4'
    };
    return `${baseIconStyles} ${sizeIconStyles[size]}`;
  };
  
  // Input padding when icons are present
  const getInputPadding = () => {
    const basePadding = sizeStyles[size].split(' ').filter(style => style.startsWith('px-'))[0];
    const leftPadding = leftIcon ? (size === 'lg' ? 'pl-12' : 'pl-10') : '';
    const rightPadding = rightIcon ? (size === 'lg' ? 'pr-12' : 'pr-10') : '';
    
    return [leftPadding, rightPadding].filter(Boolean).join(' ') || basePadding;
  };
  
  const inputClassName = [
    baseStyles,
    variantStyles[variant],
    sizeStyles[size].replace(/px-\d+/, ''), // Remove default padding
    getInputPadding(),
    getStateStyles(),
    fullWidth ? 'w-full' : '',
    className
  ].filter(Boolean).join(' ');

  // Icons
  const CheckCircleIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 text-green-500"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"
        fill="currentColor"
      />
    </svg>
  );

  const ExclamationCircleIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 text-red-500"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z"
        fill="currentColor"
      />
    </svg>
  );

  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {/* Label */}
      {label && (
        <label
          htmlFor={inputId}
          className={`block text-sm font-medium mb-2 ${
            hasError ? 'text-red-700' : 'text-gray-700'
          }`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      {/* Input Container */}
      <div className="relative">
        {/* Left Icon */}
        {leftIcon && (
          <div className={getIconStyles('left')}>
            {leftIcon}
          </div>
        )}
        
        {/* Input Field */}
        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          className={inputClassName}
          {...props}
        />
        
        {/* Right Icon */}
        {rightIcon && !hasError && !hasSuccess && (
          <div className={getIconStyles('right')}>
            {rightIcon}
          </div>
        )}
        
        {/* Success Icon */}
        {hasSuccess && (
          <div className={getIconStyles('right')}>
            <CheckCircleIcon />
          </div>
        )}
        
        {/* Error Icon */}
        {hasError && (
          <div className={getIconStyles('right')}>
            <ExclamationCircleIcon />
          </div>
        )}
      </div>
      
      {/* Helper Text / Error / Success Message */}
      {(helperText || error || success) && (
        <div className="mt-2">
          {error && (
            <p className="text-sm text-red-600 flex items-center">
              <ExclamationCircleIcon />
              <span className="ml-1">{error}</span>
            </p>
          )}
          {success && !error && (
            <p className="text-sm text-green-600 flex items-center">
              <CheckCircleIcon />
              <span className="ml-1">{success}</span>
            </p>
          )}
          {helperText && !error && !success && (
            <p className="text-sm text-gray-500">{helperText}</p>
          )}
        </div>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;