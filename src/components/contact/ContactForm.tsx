// src/components/contact/ContactForm.tsx
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { ContactForm as ContactFormType } from '@/types';

// Validation schema
const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name is too long'),
  email: z.string().email('Please enter a valid email address'),
  phone: z
    .string()
    .optional()
    .refine((phone) => {
      if (!phone) return true;
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
    }, 'Please enter a valid phone number'),
  subject: z
    .string()
    .min(5, 'Subject must be at least 5 characters')
    .max(200, 'Subject is too long'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message is too long'),
  inquiryType: z.enum([
    'general',
    'booking',
    'events',
    'dining',
    'spa',
    'business',
  ]),
  preferredContact: z.enum(['email', 'phone']).optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface ContactFormProps {
  onSubmit?: (data: ContactFormData) => Promise<void>;
  className?: string;
}

const ContactForm = ({ onSubmit, className = '' }: ContactFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onChange',
    defaultValues: {
      inquiryType: 'general',
      preferredContact: 'email',
    },
  });

  const watchedFields = watch();

  const handleFormSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      if (onSubmit) {
        await onSubmit(data);
      } else {
        // Default mock submission
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log('Form submitted:', data);
      }

      setSubmitStatus('success');
      reset();
    } catch (error) {
      setSubmitStatus('error');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'booking', label: 'Room Booking' },
    { value: 'events', label: 'Events & Conferences' },
    { value: 'dining', label: 'Restaurant & Bar' },
    { value: 'spa', label: 'Spa & Wellness' },
    { value: 'business', label: 'Business Services' },
  ];

  // Icons
  const UserIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 text-gray-400"
    >
      <path
        d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
    </svg>
  );

  const EmailIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 text-gray-400"
    >
      <path
        d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline
        points="22,6 12,13 2,6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const PhoneIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 text-gray-400"
    >
      <path
        d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7293C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1468 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77382 17.3147 6.72533 15.2662 5.18999 12.85C3.49997 10.2412 2.44824 7.27099 2.11999 4.18C2.095 3.90347 2.12787 3.62476 2.21649 3.36162C2.30512 3.09849 2.44756 2.85669 2.63476 2.65162C2.82196 2.44655 3.0498 2.28271 3.30379 2.17052C3.55777 2.05833 3.83233 2.00026 4.10999 2H7.10999C7.59344 1.99522 8.06544 2.16708 8.43999 2.48C8.81454 2.79292 9.06902 3.23038 9.15999 3.71C9.33073 4.66573 9.61644 5.59871 10.01 6.49C10.2 6.96 10.08 7.49 9.71999 7.85L8.38999 9.18C9.93024 11.6765 12.3236 14.0699 14.82 15.61L16.15 14.28C16.51 13.92 17.04 13.8 17.51 13.99C18.4013 14.3836 19.3343 14.6693 20.29 14.84C20.7741 14.9311 21.215 15.1888 21.5257 15.5689C21.8365 15.9489 22.0003 16.4249 21.99 16.91L22 16.92Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const MessageIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 text-gray-400"
    >
      <path
        d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const SendIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
    >
      <line
        x1="22"
        y1="2"
        x2="11"
        y2="13"
        stroke="currentColor"
        strokeWidth="2"
      />
      <polygon
        points="22,2 15,22 11,13 2,9"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );

  const CheckCircleIcon = () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6 text-green-500"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"
        fill="currentColor"
      />
    </svg>
  );

  return (
    <div className={`max-w-2xl mx-auto ${className}`}>
      {/* Success Message */}
      {submitStatus === 'success' && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center">
            <CheckCircleIcon />
            <div className="ml-3">
              <h3 className="text-green-800 font-medium">
                Message Sent Successfully!
              </h3>
              <p className="text-green-700 text-sm mt-1">
                Thank you for contacting Patricia Hotel. We'll get back to you
                within 24 hours.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {submitStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <svg
              className="w-6 h-6 text-red-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <div className="ml-3">
              <h3 className="text-red-800 font-medium">
                Message Failed to Send
              </h3>
              <p className="text-red-700 text-sm mt-1">
                There was an error sending your message. Please try again or
                contact us directly.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Full Name"
            leftIcon={<UserIcon />}
            placeholder="Your full name"
            error={errors.name?.message}
            required
            {...register('name')}
          />

          <Input
            label="Email Address"
            type="email"
            leftIcon={<EmailIcon />}
            placeholder="your@email.com"
            error={errors.email?.message}
            required
            {...register('email')}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Phone Number"
            type="tel"
            leftIcon={<PhoneIcon />}
            placeholder="+1 (555) 123-4567"
            helperText="Optional - for urgent inquiries"
            error={errors.phone?.message}
            {...register('phone')}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Inquiry Type <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
              {...register('inquiryType')}
            >
              {inquiryTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Subject */}
        <Input
          label="Subject"
          leftIcon={<MessageIcon />}
          placeholder="Brief description of your inquiry"
          error={errors.subject?.message}
          required
          {...register('subject')}
        />

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={6}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 resize-none"
            placeholder="Please provide details about your inquiry..."
            {...register('message')}
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-600">
              {errors.message.message}
            </p>
          )}
          <div className="mt-1 text-sm text-gray-500 text-right">
            {watchedFields.message?.length || 0}/1000 characters
          </div>
        </div>

        {/* Preferred Contact Method */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Preferred Contact Method
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="email"
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                {...register('preferredContact')}
              />
              <span className="ml-2 text-sm text-gray-700">Email</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="phone"
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                {...register('preferredContact')}
              />
              <span className="ml-2 text-sm text-gray-700">Phone</span>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <Button
            type="submit"
            size="lg"
            loading={isSubmitting}
            disabled={!isValid || isSubmitting}
            icon={<SendIcon />}
            className="min-w-[200px]"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>
        </div>
      </form>

      {/* Additional Contact Info */}
      <div className="mt-12 text-center">
        <h3 className="font-serif text-lg font-semibold text-gray-900 mb-4">
          Other Ways to Reach Us
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600">
          <div>
            <h4 className="font-medium text-gray-900 mb-1">Phone</h4>
            <p>+234 201 330 9330</p>
            <p className="text-xs text-gray-500">24/7 Available</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-1">Email</h4>
            <p>info@machi-kunzult.com</p>
            <p className="text-xs text-gray-500">Response within 4 hours</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-1">Address</h4>
            <p>35 Olowu Street</p>
            <p>Ikeja Lagos Nigeria</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
