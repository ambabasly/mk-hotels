// src/components/booking/GuestDetails.tsx
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format, differenceInDays } from 'date-fns';
import { Room } from '@/types';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

interface GuestDetailsProps {
  bookingData: {
    dates: {
      checkIn: Date;
      checkOut: Date;
      guests: number;
    };
    room: Room;
    totalPrice: number;
  };
  onNext: (guestDetails: GuestFormData) => void;
  onBack: () => void;
  className?: string;
}

// Validation schema
const guestDetailsSchema = z.object({
  firstName: z
    .string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name is too long'),
  lastName: z
    .string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name is too long'),
  email: z.string().email('Please enter a valid email address'),
  phone: z
    .string()
    .min(10, 'Please enter a valid phone number')
    .max(20, 'Phone number is too long'),
  country: z.string().min(2, 'Please select your country'),
  specialRequests: z
    .string()
    .max(500, 'Special requests must be under 500 characters')
    .optional(),
  arrivalTime: z.enum(['morning', 'afternoon', 'evening', 'late']),
  marketingConsent: z.boolean().optional(),
  termsAccepted: z
    .boolean()
    .refine((val) => val === true, 'You must accept the terms and conditions'),
});

type GuestFormData = z.infer<typeof guestDetailsSchema>;

const GuestDetails = ({
  bookingData,
  onNext,
  onBack,
  className = '',
}: GuestDetailsProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useForm<GuestFormData>({
    resolver: zodResolver(guestDetailsSchema),
    mode: 'onChange',
    defaultValues: {
      marketingConsent: false,
      termsAccepted: false,
      arrivalTime: 'afternoon',
      country: 'US',
    },
  });

  const nightCount = differenceInDays(
    bookingData.dates.checkOut,
    bookingData.dates.checkIn
  );

  const handleFormSubmit = async (data: GuestFormData) => {
    setIsSubmitting(true);

    // Simulate validation/processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    onNext(data);
    setIsSubmitting(false);
  };

  const countries = [
    { code: 'US', name: 'United States' },
    { code: 'CA', name: 'Canada' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'DE', name: 'Germany' },
    { code: 'FR', name: 'France' },
    { code: 'IT', name: 'Italy' },
    { code: 'ES', name: 'Spain' },
    { code: 'AU', name: 'Australia' },
    { code: 'JP', name: 'Japan' },
    { code: 'CN', name: 'China' },
    { code: 'Other', name: 'Other' },
  ];

  const arrivalTimes = [
    { value: 'morning', label: 'Morning (8 AM - 12 PM)' },
    { value: 'afternoon', label: 'Afternoon (12 PM - 6 PM)' },
    { value: 'evening', label: 'Evening (6 PM - 10 PM)' },
    { value: 'late', label: 'Late Night (After 10 PM)' },
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

  const GlobeIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 text-gray-400"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <line
        x1="2"
        y1="12"
        x2="22"
        y2="12"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2V2Z"
        stroke="currentColor"
        strokeWidth="2"
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

  const ArrowLeftIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
    >
      <line
        x1="19"
        y1="12"
        x2="5"
        y2="12"
        stroke="currentColor"
        strokeWidth="2"
      />
      <polyline
        points="12,19 5,12 12,5"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );

  const ArrowRightIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
    >
      <line
        x1="5"
        y1="12"
        x2="19"
        y2="12"
        stroke="currentColor"
        strokeWidth="2"
      />
      <polyline
        points="12,5 19,12 12,19"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );

  const CheckIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        fill="currentColor"
      />
    </svg>
  );

  return (
    <div className={`max-w-4xl mx-auto ${className}`}>
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="font-serif text-3xl font-bold text-gray-900 mb-2">
          Guest Information
        </h2>
        <p className="text-gray-600">
          Please provide your details to complete the booking
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-center space-x-4">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
              <CheckIcon />
            </div>
            <span className="ml-2 text-sm font-medium text-primary-600">
              Dates
            </span>
          </div>
          <div className="w-8 h-0.5 bg-primary-600"></div>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
              <CheckIcon />
            </div>
            <span className="ml-2 text-sm font-medium text-primary-600">
              Rooms
            </span>
          </div>
          <div className="w-8 h-0.5 bg-primary-600"></div>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
              3
            </div>
            <span className="ml-2 text-sm font-medium text-primary-600">
              Details
            </span>
          </div>
          <div className="w-8 h-0.5 bg-gray-300"></div>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center text-sm font-medium">
              4
            </div>
            <span className="ml-2 text-sm text-gray-500">Confirm</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Guest Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            {/* Personal Information */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-serif text-xl font-semibold text-gray-900 mb-4">
                Personal Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  leftIcon={<UserIcon />}
                  placeholder="Your first name"
                  error={errors.firstName?.message}
                  required
                  {...register('firstName')}
                />

                <Input
                  label="Last Name"
                  leftIcon={<UserIcon />}
                  placeholder="Your last name"
                  error={errors.lastName?.message}
                  required
                  {...register('lastName')}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <Input
                  label="Email Address"
                  type="email"
                  leftIcon={<EmailIcon />}
                  placeholder="your@email.com"
                  error={errors.email?.message}
                  required
                  {...register('email')}
                />

                <Input
                  label="Phone Number"
                  type="tel"
                  leftIcon={<PhoneIcon />}
                  placeholder="+1 (555) 123-4567"
                  error={errors.phone?.message}
                  required
                  {...register('phone')}
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <GlobeIcon />
                  </div>
                  <select
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                    {...register('country')}
                  >
                    {countries.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.country && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.country.message}
                  </p>
                )}
              </div>
            </div>

            {/* Arrival Information */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-serif text-xl font-semibold text-gray-900 mb-4">
                Arrival Details
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Expected Arrival Time
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {arrivalTimes.map((time) => (
                    <label
                      key={time.value}
                      className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
                    >
                      <input
                        type="radio"
                        value={time.value}
                        className="text-primary-600 focus:ring-primary-500"
                        {...register('arrivalTime')}
                      />
                      <span className="ml-3 text-sm text-gray-700">
                        {time.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Special Requests */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-serif text-xl font-semibold text-gray-900 mb-4">
                Special Requests
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Requests (Optional)
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-3">
                    <MessageIcon />
                  </div>
                  <textarea
                    rows={4}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 resize-none"
                    placeholder="Any special requests or preferences for your stay..."
                    {...register('specialRequests')}
                  />
                </div>
                {errors.specialRequests && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.specialRequests.message}
                  </p>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  {watch('specialRequests')?.length || 0}/500 characters
                </p>
              </div>
            </div>

            {/* Terms and Marketing */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-serif text-xl font-semibold text-gray-900 mb-4">
                Final Details
              </h3>

              <div className="space-y-4">
                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    className="mt-1 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    {...register('marketingConsent')}
                  />
                  <span className="text-sm text-gray-700">
                    I would like to receive special offers and updates from
                    Patricia Hotel via email.
                  </span>
                </label>

                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    className="mt-1 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    {...register('termsAccepted')}
                  />
                  <span className="text-sm text-gray-700">
                    I accept the{' '}
                    <a
                      href="/terms"
                      className="text-primary-600 hover:text-primary-700 underline"
                    >
                      Terms & Conditions
                    </a>{' '}
                    and{' '}
                    <a
                      href="/privacy"
                      className="text-primary-600 hover:text-primary-700 underline"
                    >
                      Privacy Policy
                    </a>
                    . <span className="text-red-500">*</span>
                  </span>
                </label>
                {errors.termsAccepted && (
                  <p className="text-sm text-red-600">
                    {errors.termsAccepted.message}
                  </p>
                )}
              </div>
            </div>

            {/* Form Buttons */}
            <div className="flex justify-between items-center">
              <Button
                type="button"
                onClick={onBack}
                variant="ghost"
                icon={<ArrowLeftIcon />}
                iconPosition="left"
              >
                Back to Rooms
              </Button>

              <Button
                type="submit"
                disabled={!isValid || isSubmitting}
                loading={isSubmitting}
                size="lg"
                icon={<ArrowRightIcon />}
                iconPosition="right"
                className="min-w-[200px]"
              >
                Review Booking
              </Button>
            </div>
          </form>
        </div>

        {/* Booking Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
            <h3 className="font-serif text-xl font-semibold text-gray-900 mb-4">
              Booking Summary
            </h3>

            {/* Dates */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Check-in</span>
                <span className="font-medium">
                  {format(bookingData.dates.checkIn, 'MMM do, yyyy')}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Check-out</span>
                <span className="font-medium">
                  {format(bookingData.dates.checkOut, 'MMM do, yyyy')}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Duration</span>
                <span className="font-medium">
                  {nightCount} night{nightCount > 1 ? 's' : ''}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Guests</span>
                <span className="font-medium">
                  {bookingData.dates.guests} guest
                  {bookingData.dates.guests > 1 ? 's' : ''}
                </span>
              </div>
            </div>

            {/* Room Details */}
            <div className="border-t border-gray-200 pt-4 mb-6">
              <h4 className="font-medium text-gray-900 mb-2">
                {bookingData.room.name}
              </h4>
              <p className="text-sm text-gray-600 mb-3">
                {bookingData.room.description}
              </p>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Room rate per night</span>
                  <span className="font-medium">
                    ${bookingData.room.price.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Nights</span>
                  <span className="font-medium">× {nightCount}</span>
                </div>
              </div>
            </div>

            {/* Total */}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">
                  Total
                </span>
                <span className="text-2xl font-bold text-primary-600">
                  ${bookingData.totalPrice.toLocaleString()}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Includes taxes and fees
              </p>
            </div>

            {/* Policies */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h5 className="font-medium text-gray-900 mb-2 text-sm">
                Cancellation Policy
              </h5>
              <p className="text-xs text-gray-600 leading-relaxed">
                Free cancellation up to 24 hours before check-in. Cancellations
                within 24 hours are subject to a one-night penalty.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestDetails;
