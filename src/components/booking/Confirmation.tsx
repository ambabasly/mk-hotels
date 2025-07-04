// src/components/booking/Confirmation.tsx
'use client';

import { useState } from 'react';
import { format, differenceInDays } from 'date-fns';
import { Room } from '@/types';
import Button from '@/components/ui/Button';

interface ConfirmationProps {
  bookingData: {
    dates: {
      checkIn: Date;
      checkOut: Date;
      guests: number;
    };
    room: Room;
    totalPrice: number;
    guestDetails: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      country: string;
      specialRequests?: string;
      arrivalTime: string;
    };
  };
  onConfirm: () => void;
  onBack: () => void;
  className?: string;
}

const Confirmation = ({
  bookingData,
  onConfirm,
  onBack,
  className = '',
}: ConfirmationProps) => {
  const [isBooking, setIsBooking] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [confirmationNumber, setConfirmationNumber] = useState<string>('');

  const nightCount = differenceInDays(
    bookingData.dates.checkOut,
    bookingData.dates.checkIn
  );

  const handleConfirmBooking = async () => {
    setIsBooking(true);

    // Simulate booking process
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Generate confirmation number
    const confirmation = `PTH${Date.now().toString().slice(-6)}`;
    setConfirmationNumber(confirmation);
    setIsConfirmed(true);
    setIsBooking(false);

    onConfirm();
  };

  const handlePrintConfirmation = () => {
    window.print();
  };

  const handleEmailConfirmation = () => {
    // In real app, this would trigger email sending
    alert('Confirmation email sent to ' + bookingData.guestDetails.email);
  };

  const getArrivalTimeLabel = (time: string) => {
    const timeLabels = {
      morning: 'Morning (8 AM - 12 PM)',
      afternoon: 'Afternoon (12 PM - 6 PM)',
      evening: 'Evening (6 PM - 10 PM)',
      late: 'Late Night (After 10 PM)',
    };
    return timeLabels[time as keyof typeof timeLabels] || time;
  };

  // Icons
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

  const CreditCardIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
    >
      <rect
        x="1"
        y="4"
        width="22"
        height="16"
        rx="2"
        ry="2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <line
        x1="1"
        y1="10"
        x2="23"
        y2="10"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );

  const PrintIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
    >
      <polyline
        points="6,9 6,2 18,2 18,9"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M6 18H4C2.89543 18 2 17.1046 2 16V11C2 9.89543 2.89543 9 4 9H20C21.1046 9 22 9.89543 22 11V16C22 17.1046 21.1046 18 20 18H18"
        stroke="currentColor"
        strokeWidth="2"
      />
      <rect
        x="6"
        y="14"
        width="12"
        height="8"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );

  const EmailIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
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

  const CalendarIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
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

  if (isConfirmed) {
    return (
      <div className={`max-w-4xl mx-auto text-center ${className}`}>
        {/* Success Header */}
        <div className="mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-10 h-10 text-green-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h1 className="font-serif text-4xl font-bold text-gray-900 mb-2">
            Booking Confirmed!
          </h1>
          <p className="text-xl text-gray-600">
            Your reservation at Patricia Hotel has been successfully confirmed.
          </p>
        </div>

        {/* Confirmation Details */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="border-b border-gray-200 pb-6 mb-6">
            <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-2">
              Confirmation Details
            </h2>
            <div className="text-3xl font-bold text-primary-600 mb-2">
              #{confirmationNumber}
            </div>
            <p className="text-gray-600">
              Please save this confirmation number for your records
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            {/* Guest Information */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">
                Guest Information
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Name:</span>
                  <span className="font-medium">
                    {bookingData.guestDetails.firstName}{' '}
                    {bookingData.guestDetails.lastName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium">
                    {bookingData.guestDetails.email}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phone:</span>
                  <span className="font-medium">
                    {bookingData.guestDetails.phone}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Arrival:</span>
                  <span className="font-medium">
                    {getArrivalTimeLabel(bookingData.guestDetails.arrivalTime)}
                  </span>
                </div>
              </div>
            </div>

            {/* Booking Information */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">
                Booking Information
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Check-in:</span>
                  <span className="font-medium">
                    {format(bookingData.dates.checkIn, 'EEEE, MMMM do, yyyy')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Check-out:</span>
                  <span className="font-medium">
                    {format(bookingData.dates.checkOut, 'EEEE, MMMM do, yyyy')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Room:</span>
                  <span className="font-medium">{bookingData.room.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Guests:</span>
                  <span className="font-medium">
                    {bookingData.dates.guests} guest
                    {bookingData.dates.guests > 1 ? 's' : ''}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t">
                  <span className="text-gray-900 font-semibold">Total:</span>
                  <span className="font-bold text-primary-600">
                    ${bookingData.totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Special Requests */}
          {bookingData.guestDetails.specialRequests && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">
                Special Requests
              </h3>
              <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                {bookingData.guestDetails.specialRequests}
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Button
            onClick={handlePrintConfirmation}
            variant="secondary"
            icon={<PrintIcon />}
            iconPosition="left"
          >
            Print Confirmation
          </Button>
          <Button
            onClick={handleEmailConfirmation}
            variant="secondary"
            icon={<EmailIcon />}
            iconPosition="left"
          >
            Email Confirmation
          </Button>
          <Button
            onClick={() => (window.location.href = '/')}
            variant="primary"
          >
            Return to Homepage
          </Button>
        </div>

        {/* Next Steps */}
        <div className="bg-primary-50 border border-primary-200 rounded-2xl p-6">
          <h3 className="font-serif text-xl font-semibold text-primary-900 mb-4">
            What's Next?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-primary-800">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-2">
                <EmailIcon />
              </div>
              <h4 className="font-medium mb-1">Confirmation Email</h4>
              <p className="text-xs">
                You'll receive a detailed confirmation email within 5 minutes.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-2">
                <CalendarIcon />
              </div>
              <h4 className="font-medium mb-1">Check-in Reminder</h4>
              <p className="text-xs">
                We'll send you a reminder 24 hours before your arrival.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-2">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </div>
              <h4 className="font-medium mb-1">24/7 Support</h4>
              <p className="text-xs">
                Our concierge team is available for any questions or changes.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`max-w-4xl mx-auto ${className}`}>
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="font-serif text-3xl font-bold text-gray-900 mb-2">
          Review & Confirm
        </h2>
        <p className="text-gray-600">
          Please review your booking details before confirming
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
              <CheckIcon />
            </div>
            <span className="ml-2 text-sm font-medium text-primary-600">
              Details
            </span>
          </div>
          <div className="w-8 h-0.5 bg-primary-600"></div>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
              4
            </div>
            <span className="ml-2 text-sm font-medium text-primary-600">
              Confirm
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Booking Review */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stay Details */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="font-serif text-xl font-semibold text-gray-900 mb-4">
              Your Stay
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">
                  Dates & Guests
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Check-in:</span>
                    <span className="font-medium">
                      {format(bookingData.dates.checkIn, 'MMM do, yyyy')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Check-out:</span>
                    <span className="font-medium">
                      {format(bookingData.dates.checkOut, 'MMM do, yyyy')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">
                      {nightCount} night{nightCount > 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Guests:</span>
                    <span className="font-medium">
                      {bookingData.dates.guests} guest
                      {bookingData.dates.guests > 1 ? 's' : ''}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">Room Details</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">{bookingData.room.name}</span>
                  </div>
                  <div className="text-gray-600">
                    {bookingData.room.bedType} • {bookingData.room.size} sq ft
                  </div>
                  <div className="text-gray-600">
                    Up to {bookingData.room.maxGuests} guests
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {bookingData.room.amenities
                      .slice(0, 4)
                      .map((amenity, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                        >
                          {amenity}
                        </span>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Guest Information */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="font-serif text-xl font-semibold text-gray-900 mb-4">
              Guest Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">
                  Contact Details
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span className="font-medium">
                      {bookingData.guestDetails.firstName}{' '}
                      {bookingData.guestDetails.lastName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium">
                      {bookingData.guestDetails.email}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone:</span>
                    <span className="font-medium">
                      {bookingData.guestDetails.phone}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Country:</span>
                    <span className="font-medium">
                      {bookingData.guestDetails.country}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">
                  Arrival & Preferences
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Arrival Time:</span>
                    <span className="font-medium">
                      {getArrivalTimeLabel(
                        bookingData.guestDetails.arrivalTime
                      )}
                    </span>
                  </div>
                  {bookingData.guestDetails.specialRequests && (
                    <div className="mt-3">
                      <span className="text-gray-600 block mb-1">
                        Special Requests:
                      </span>
                      <div className="bg-gray-50 p-2 rounded text-xs text-gray-700">
                        {bookingData.guestDetails.specialRequests}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Important Information */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
            <h3 className="font-medium text-amber-900 mb-3">
              Important Information
            </h3>
            <ul className="space-y-2 text-sm text-amber-800">
              <li className="flex items-start space-x-2">
                <CheckIcon />
                <span>
                  Standard check-in time is 3:00 PM and check-out is 11:00 AM
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckIcon />
                <span>Free cancellation up to 24 hours before check-in</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckIcon />
                <span>
                  A confirmation email will be sent to{' '}
                  {bookingData.guestDetails.email}
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckIcon />
                <span>
                  Payment will be processed securely upon confirmation
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Price Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
            <h3 className="font-serif text-xl font-semibold text-gray-900 mb-4">
              Price Summary
            </h3>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{bookingData.room.name}</span>
                <span className="font-medium">
                  ${bookingData.room.price.toLocaleString()}/night
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Number of nights</span>
                <span className="font-medium">× {nightCount}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">
                  ${(bookingData.room.price * nightCount).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Taxes & fees</span>
                <span className="font-medium">
                  $
                  {(
                    bookingData.totalPrice -
                    bookingData.room.price * nightCount
                  ).toLocaleString()}
                </span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">
                  Total
                </span>
                <span className="text-2xl font-bold text-primary-600">
                  ${bookingData.totalPrice.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                onClick={handleConfirmBooking}
                loading={isBooking}
                disabled={isBooking}
                size="lg"
                icon={<CreditCardIcon />}
                iconPosition="left"
                className="w-full"
              >
                {isBooking ? 'Processing...' : 'Confirm Booking'}
              </Button>

              <Button
                onClick={onBack}
                variant="ghost"
                icon={<ArrowLeftIcon />}
                iconPosition="left"
                className="w-full"
                disabled={isBooking}
              >
                Back to Details
              </Button>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h5 className="font-medium text-gray-900 mb-2 text-sm">
                Payment Information
              </h5>
              <p className="text-xs text-gray-600 leading-relaxed">
                Your payment will be processed securely. No charges will be made
                until you confirm your booking.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
