// src/components/ui/Modal.tsx
'use client';

import { ReactNode, useEffect, useRef } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showCloseButton?: boolean;
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
  className?: string;
  overlayClassName?: string;
}

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
  closeOnBackdropClick = true,
  closeOnEscape = true,
  className = '',
  overlayClassName = ''
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && closeOnEscape) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, closeOnEscape, onClose]);

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (closeOnBackdropClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  // Handle focus management
  useEffect(() => {
    if (isOpen && modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      if (firstElement) {
        firstElement.focus();
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Size styles
  const sizeStyles = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-7xl mx-4'
  };

  // Close Icon
  const CloseIcon = () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6"
    >
      <path 
        d="M18 6L6 18" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d="M6 6L18 18" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </svg>
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black transition-opacity ${overlayClassName}`}
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
        onClick={handleBackdropClick}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          ref={modalRef}
          className={`relative bg-white rounded-2xl shadow-2xl w-full ${sizeStyles[size]} transform transition-all ${className}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? 'modal-title' : undefined}
        >
          
          {/* Header */}
          {(title || showCloseButton) && (
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              {title && (
                <h2 
                  id="modal-title"
                  className="font-serif text-xl font-semibold text-gray-900"
                >
                  {title}
                </h2>
              )}
              
              {showCloseButton && (
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  aria-label="Close modal"
                >
                  <CloseIcon />
                </button>
              )}
            </div>
          )}

          {/* Content */}
          <div className={`${title || showCloseButton ? 'p-6' : 'p-6'}`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

// Modal Header Component
interface ModalHeaderProps {
  children: ReactNode;
  className?: string;
}

const ModalHeader = ({ children, className = '' }: ModalHeaderProps) => (
  <div className={`border-b border-gray-200 px-6 py-4 ${className}`}>
    {children}
  </div>
);

// Modal Body Component
interface ModalBodyProps {
  children: ReactNode;
  className?: string;
}

const ModalBody = ({ children, className = '' }: ModalBodyProps) => (
  <div className={`px-6 py-4 ${className}`}>
    {children}
  </div>
);

// Modal Footer Component
interface ModalFooterProps {
  children: ReactNode;
  className?: string;
}

const ModalFooter = ({ children, className = '' }: ModalFooterProps) => (
  <div className={`border-t border-gray-200 px-6 py-4 flex items-center justify-end space-x-3 ${className}`}>
    {children}
  </div>
);

// Confirmation Modal Component
interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
  loading?: boolean;
}

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'info',
  loading = false
}: ConfirmationModalProps) => {
  
  const getVariantStyles = () => {
    switch (variant) {
      case 'danger':
        return {
          icon: '🗑️',
          confirmButtonVariant: 'danger' as const,
          iconBg: 'bg-red-100',
          iconColor: 'text-red-600'
        };
      case 'warning':
        return {
          icon: '⚠️',
          confirmButtonVariant: 'primary' as const,
          iconBg: 'bg-yellow-100',
          iconColor: 'text-yellow-600'
        };
      default:
        return {
          icon: 'ℹ️',
          confirmButtonVariant: 'primary' as const,
          iconBg: 'bg-blue-100',
          iconColor: 'text-blue-600'
        };
    }
  };

  const variantStyles = getVariantStyles();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      closeOnBackdropClick={!loading}
      closeOnEscape={!loading}
    >
      <div className="text-center">
        {/* Icon */}
        <div className={`mx-auto flex items-center justify-center h-12 w-12 rounded-full ${variantStyles.iconBg} mb-4`}>
          <span className="text-2xl">{variantStyles.icon}</span>
        </div>
        
        {/* Title */}
        <h3 className="font-serif text-lg font-semibold text-gray-900 mb-2">
          {title}
        </h3>
        
        {/* Message */}
        <p className="text-gray-600 mb-6">
          {message}
        </p>
        
        {/* Actions */}
        <div className="flex space-x-3 justify-center">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="btn-secondary px-4 py-2 text-sm"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className={`btn-${variantStyles.confirmButtonVariant} px-4 py-2 text-sm ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Processing...' : confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
};

// Export all components
export default Modal;
export { ModalHeader, ModalBody, ModalFooter, ConfirmationModal };