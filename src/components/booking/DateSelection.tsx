// src/components/booking/DateSelection.tsx
'use client';

import { useState, useEffect } from 'react';
import {
  format,
  addDays,
  isBefore,
  isAfter,
  isSameDay,
  differenceInDays,
} from 'date-fns';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

interface DateSelectionProps {
  onNext: (dates: { checkIn: Date; checkOut: Date; guests: number }) => void;
  initialData?: {
    checkIn?: Date;
    checkOut?: Date;
    guests?: number;
  };
  className?: string;
}

const DateSelection = ({
  onNext,
  initialData,
  className = '',
}: DateSelectionProps) => {
  const [checkInDate, setCheckInDate] = useState<Date | null>(
    initialData?.checkIn || null
  );
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(
    initialData?.checkOut || null
  );
  const [guests, setGuests] = useState(initialData?.guests || 1);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Get today's date and format for input
  const today = new Date();
  const todayString = format(today, 'yyyy-MM-dd');
  const maxDate = format(addDays(today, 365), 'yyyy-MM-dd'); // 1 year ahead

  // Validate dates
  useEffect(() => {
    const newErrors: { [key: string]: string } = {};

    if (checkInDate) {
      if (isBefore(checkInDate, today)) {
        newErrors.checkIn = 'Check-in date cannot be in the past';
      }
    }

    if (checkInDate && checkOutDate) {
      if (isSameDay(checkInDate, checkOutDate)) {
        newErrors.checkOut = 'Check-out must be at least 1 day after check-in';
      } else if (isBefore(checkOutDate, checkInDate)) {
        newErrors.checkOut = 'Check-out date must be after check-in date';
      }
    }

    setErrors(newErrors);
  }, [checkInDate, checkOutDate]);

  const handleCheckInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value ? new Date(e.target.value) : null;
    setCheckInDate(date);

    // Auto-adjust checkout if it's before or same as checkin
    if (
      date &&
      checkOutDate &&
      (isBefore(checkOutDate, date) || isSameDay(checkOutDate, date))
    ) {
      setCheckOutDate(addDays(date, 1));
    }
  };

  const handleCheckOutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value ? new Date(e.target.value) : null;
    setCheckOutDate(date);
  };

  const handleNext = () => {
    if (checkInDate && checkOutDate && Object.keys(errors).length === 0) {
      onNext({
        checkIn: checkInDate,
        checkOut: checkOutDate,
        guests,
      });
    }
  };

  const isFormValid =
    checkInDate && checkOutDate && Object.keys(errors).length === 0;
  const nightCount =
    checkInDate && checkOutDate
      ? differenceInDays(checkOutDate, checkInDate)
      : 0;

  // Icons
  const CalendarIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 text-gray-400"
    >
      <rect
        x="3"
        y="4"
        width="18"
        height="18"
        rx="2"
        ry="2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <line
        x1="16"
        y1="2"
        x2="16"
        y2="6"
        stroke="currentColor"
        strokeWidth="2"
      />
      <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2" />
      <line
        x1="3"
        y1="10"
        x2="21"
        y2="10"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );

  const UsersIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 text-gray-400"
    >
      <path
        d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
      <path
        d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
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

  return (
    <div className={`max-w-2xl mx-auto ${className}`}>
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="font-serif text-3xl font-bold text-gray-900 mb-2">
          Select Your Dates
        </h2>
        <p className="text-gray-600">
          Choose your check-in and check-out dates to begin your booking
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-center space-x-4">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
              1
            </div>
            <span className="ml-2 text-sm font-medium text-primary-600">
              Dates
            </span>
          </div>
          <div className="w-8 h-0.5 bg-gray-300"></div>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center text-sm font-medium">
              2
            </div>
            <span className="ml-2 text-sm text-gray-500">Rooms</span>
          </div>
          <div className="w-8 h-0.5 bg-gray-300"></div>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center text-sm font-medium">
              3
            </div>
            <span className="ml-2 text-sm text-gray-500">Details</span>
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

      {/* Date Selection Form */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Check-in Date */}
          <Input
            label="Check-in Date"
            type="date"
            value={checkInDate ? format(checkInDate, 'yyyy-MM-dd') : ''}
            onChange={handleCheckInChange}
            min={todayString}
            max={maxDate}
            leftIcon={<CalendarIcon />}
            error={errors.checkIn}
            required
          />

          {/* Check-out Date */}
          <Input
            label="Check-out Date"
            type="date"
            value={checkOutDate ? format(checkOutDate, 'yyyy-MM-dd') : ''}
            onChange={handleCheckOutChange}
            min={
              checkInDate
                ? format(addDays(checkInDate, 1), 'yyyy-MM-dd')
                : todayString
            }
            max={maxDate}
            leftIcon={<CalendarIcon />}
            error={errors.checkOut}
            required
          />
        </div>

        {/* Number of Guests */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Number of Guests
          </label>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-gray-400">
              <UsersIcon />
              <span className="text-sm">Guests:</span>
            </div>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                type="button"
                onClick={() => setGuests(Math.max(1, guests - 1))}
                className="p-2 hover:bg-gray-50 transition-colors duration-200 rounded-l-lg"
                disabled={guests <= 1}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 12H4"
                  />
                </svg>
              </button>
              <div className="px-4 py-2 text-center min-w-[3rem] font-medium">
                {guests}
              </div>
              <button
                type="button"
                onClick={() => setGuests(Math.min(8, guests + 1))}
                className="p-2 hover:bg-gray-50 transition-colors duration-200 rounded-r-lg"
                disabled={guests >= 8}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </button>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Maximum 8 guests per booking
          </p>
        </div>

        {/* Booking Summary */}
        {checkInDate && checkOutDate && nightCount > 0 && (
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-6">
            <h3 className="font-medium text-primary-900 mb-2">
              Booking Summary
            </h3>
            <div className="space-y-1 text-sm text-primary-800">
              <div className="flex justify-between">
                <span>Check-in:</span>
                <span className="font-medium">
                  {format(checkInDate, 'EEEE, MMMM do, yyyy')}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Check-out:</span>
                <span className="font-medium">
                  {format(checkOutDate, 'EEEE, MMMM do, yyyy')}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Duration:</span>
                <span className="font-medium">
                  {nightCount} night{nightCount > 1 ? 's' : ''}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Guests:</span>
                <span className="font-medium">
                  {guests} guest{guests > 1 ? 's' : ''}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Quick Date Suggestions */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">
            Quick Select
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {[
              { label: 'Tonight', nights: 1 },
              { label: 'Weekend', nights: 2 },
              { label: 'Week', nights: 7 },
              { label: 'Extended', nights: 14 },
            ].map((option) => (
              <button
                key={option.label}
                type="button"
                onClick={() => {
                  const checkIn = new Date();
                  const checkOut = addDays(checkIn, option.nights);
                  setCheckInDate(checkIn);
                  setCheckOutDate(checkOut);
                }}
                className="p-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                {option.label}
                <div className="text-xs text-gray-500">
                  {option.nights} night{option.nights > 1 ? 's' : ''}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Continue Button */}
        <div className="flex justify-center">
          <Button
            onClick={handleNext}
            disabled={!isFormValid}
            size="lg"
            icon={<ArrowRightIcon />}
            iconPosition="right"
            className="min-w-[200px]"
          >
            Continue to Rooms
          </Button>
        </div>
      </div>

      {/* Additional Information */}
      <div className="mt-8 bg-gray-50 rounded-xl p-6">
        <h3 className="font-medium text-gray-900 mb-3">
          Important Information
        </h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-start space-x-2">
            <svg
              className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span>
              Standard check-in time is 3:00 PM and check-out is 11:00 AM
            </span>
          </li>
          <li className="flex items-start space-x-2">
            <svg
              className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span>Free cancellation up to 24 hours before check-in</span>
          </li>
          <li className="flex items-start space-x-2">
            <svg
              className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span>Best rate guarantee - we'll match any lower price</span>
          </li>
          <li className="flex items-start space-x-2">
            <svg
              className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span>
              All rooms include complimentary WiFi and daily housekeeping
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DateSelection;
