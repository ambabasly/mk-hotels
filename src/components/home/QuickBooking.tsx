// src/components/home/QuickBooking.tsx
'use client';

import { useState } from 'react';

interface QuickBookingProps {
  title?: string;
  subtitle?: string;
  variant?: 'default' | 'compact' | 'sidebar';
  className?: string;
}

const QuickBooking = ({ 
  title = "Quick Booking", 
  subtitle = "Find and book your perfect room",
  variant = 'default',
  className = ""
}: QuickBookingProps) => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [roomType, setRoomType] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleBookingSearch = async () => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Navigate to booking page with pre-filled data
    const params = new URLSearchParams({
      checkIn,
      checkOut,
      guests: guests.toString(),
      roomType,
    });
    
    window.location.href = `/booking?${params.toString()}`;
    setIsLoading(false);
  };

  // Calendar Icon
  const CalendarIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 text-gray-400"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2" />
      <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2" />
      <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2" />
      <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2" />
    </svg>
  );

  // Users Icon
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
      <path
        d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  // Bed Icon
  const BedIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 text-gray-400"
    >
      <path
        d="M2 18V9C2 8.44772 2.44772 8 3 8H21C21.5523 8 22 8.44772 22 9V18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 18V20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 18V20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 8V6C2 5.44772 2.44772 5 3 5H9C9.55228 5 10 5.44772 10 6V8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 8V6C14 5.44772 14.4477 5 15 5H21C21.5523 5 22 5.44772 22 6V8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  // Search Icon
  const SearchIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
    >
      <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
      <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  // Loading Spinner
  const LoadingSpinner = () => (
    <svg
      className="animate-spin w-5 h-5"
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
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  // Variant-specific styling
  const getContainerClasses = () => {
    const baseClasses = "bg-white rounded-2xl shadow-lg";
    
    switch (variant) {
      case 'compact':
        return `${baseClasses} p-4`;
      case 'sidebar':
        return `${baseClasses} p-6 sticky top-24`;
      default:
        return `${baseClasses} p-6 md:p-8`;
    }
  };

  const getGridClasses = () => {
    switch (variant) {
      case 'compact':
        return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3";
      case 'sidebar':
        return "space-y-4";
      default:
        return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4";
    }
  };

  return (
    <div className={`${getContainerClasses()} ${className}`}>
      {/* Header */}
      {(title || subtitle) && (
        <div className={`text-center ${variant === 'compact' ? 'mb-4' : 'mb-6'}`}>
          {title && (
            <h3 className={`font-serif font-semibold text-gray-900 ${
              variant === 'compact' ? 'text-lg mb-1' : 'text-2xl mb-2'
            }`}>
              {title}
            </h3>
          )}
          {subtitle && (
            <p className={`text-gray-600 ${
              variant === 'compact' ? 'text-sm' : 'text-base'
            }`}>
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Booking Form */}
      <div className={getGridClasses()}>
        {/* Check-in Date */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Check-in
          </label>
          <div className="relative">
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              min={today}
              className="input-field pl-10"
              placeholder="Select date"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <CalendarIcon />
            </div>
          </div>
        </div>

        {/* Check-out Date */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Check-out
          </label>
          <div className="relative">
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              min={checkIn || today}
              className="input-field pl-10"
              placeholder="Select date"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <CalendarIcon />
            </div>
          </div>
        </div>

        {/* Guests */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Guests
          </label>
          <div className="relative">
            <select
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="input-field pl-10 appearance-none"
            >
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <option key={num} value={num}>
                  {num} Guest{num > 1 ? 's' : ''}
                </option>
              ))}
            </select>
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <UsersIcon />
            </div>
          </div>
        </div>

        {/* Room Type */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Room Type
          </label>
          <div className="relative">
            <select
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
              className="input-field pl-10 appearance-none"
            >
              <option value="">Any Room</option>
              <option value="standard">Standard Room</option>
              <option value="deluxe">Deluxe Room</option>
              <option value="suite">Suite</option>
              <option value="presidential">Presidential Suite</option>
            </select>
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <BedIcon />
            </div>
          </div>
        </div>

        {/* Search Button */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 opacity-0">
            Search
          </label>
          <button
            onClick={handleBookingSearch}
            disabled={isLoading || !checkIn || !checkOut}
            className="w-full btn-primary flex items-center justify-center space-x-2 h-[42px] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <LoadingSpinner />
                <span>Searching...</span>
              </>
            ) : (
              <>
                <SearchIcon />
                <span>Search</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Additional Info for Sidebar Variant */}
      {variant === 'sidebar' && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Free cancellation up to 24 hours</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Best rate guarantee</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Instant confirmation</span>
            </div>
          </div>
        </div>
      )}

      {/* Form Validation Messages */}
      {(!checkIn || !checkOut) && (
        <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-sm text-amber-700">
            Please select both check-in and check-out dates to search for available rooms.
          </p>
        </div>
      )}
    </div>
  );
};

export default QuickBooking;