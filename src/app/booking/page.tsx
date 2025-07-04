// src/app/booking/page.tsx
'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Room } from '@/types';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import DateSelection from '@/components/booking/DateSelection';
import RoomSelection from '@/components/booking/RoomSelection';
import GuestDetails from '@/components/booking/GuestDetails';
import Confirmation from '@/components/booking/Confirmation';

// Import room data
import roomsData from '@/data/rooms.json';

interface BookingState {
  step: 1 | 2 | 3 | 4;
  dates: {
    checkIn: Date;
    checkOut: Date;
    guests: number;
  } | null;
  room: Room | null;
  totalPrice: number;
  guestDetails: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    country: string;
    specialRequests?: string;
    arrivalTime: string;
  } | null;
}

const BookingPageContent = () => {
  const [bookingState, setBookingState] = useState<BookingState>({
    step: 1,
    dates: null,
    room: null,
    totalPrice: 0,
    guestDetails: null,
  });

  const searchParams = useSearchParams();

  // Initialize booking with URL parameters
  useEffect(() => {
    const urlParams = {
      checkIn: searchParams?.get('checkIn'),
      checkOut: searchParams?.get('checkOut'),
      guests: searchParams?.get('guests'),
      roomType: searchParams?.get('roomType'),
      roomId: searchParams?.get('roomId'),
    };

    // Pre-fill dates if provided
    const initialDates = {
      checkIn: urlParams.checkIn ? new Date(urlParams.checkIn) : null,
      checkOut: urlParams.checkOut ? new Date(urlParams.checkOut) : null,
      guests: urlParams.guests ? parseInt(urlParams.guests) : 1,
    };

    // Pre-select room if provided
    if (urlParams.roomId) {
      const selectedRoom = roomsData.rooms.find(
        (room) => room.id === parseInt(urlParams.roomId!)
      );
      if (selectedRoom && initialDates.checkIn && initialDates.checkOut) {
        const nightCount = Math.ceil(
          (initialDates.checkOut.getTime() - initialDates.checkIn.getTime()) /
            (1000 * 60 * 60 * 24)
        );
        setBookingState({
          step: 3, // Skip to guest details
          dates: {
            checkIn: initialDates.checkIn,
            checkOut: initialDates.checkOut,
            guests: initialDates.guests,
          },
          room: selectedRoom,
          totalPrice: selectedRoom.price * nightCount,
          guestDetails: null,
        });
        return;
      }
    }

    // If we have valid dates, skip to room selection
    if (
      initialDates.checkIn &&
      initialDates.checkOut &&
      initialDates.checkIn < initialDates.checkOut
    ) {
      setBookingState((prev) => ({
        ...prev,
        step: 2,
        dates: {
          checkIn: initialDates.checkIn!,
          checkOut: initialDates.checkOut!,
          guests: initialDates.guests,
        },
      }));
    }
  }, [searchParams]);

  // Step 1: Date Selection
  const handleDateSelection = (dates: {
    checkIn: Date;
    checkOut: Date;
    guests: number;
  }) => {
    setBookingState((prev) => ({
      ...prev,
      step: 2,
      dates,
    }));
  };

  // Step 2: Room Selection
  const handleRoomSelection = (selection: {
    room: Room;
    totalPrice: number;
  }) => {
    setBookingState((prev) => ({
      ...prev,
      step: 3,
      room: selection.room,
      totalPrice: selection.totalPrice,
    }));
  };

  // Step 3: Guest Details
  const handleGuestDetails = (guestDetails: any) => {
    setBookingState((prev) => ({
      ...prev,
      step: 4,
      guestDetails,
    }));
  };

  // Step 4: Confirmation
  const handleBookingConfirmation = () => {
    // In real app, this would process payment and create reservation
    console.log('Booking confirmed!', bookingState);

    // Could redirect to a thank you page or reset for new booking
    // For now, we'll just log the successful booking
  };

  // Navigation functions
  const goToStep = (step: 1 | 2 | 3 | 4) => {
    setBookingState((prev) => ({ ...prev, step }));
  };

  const goBack = () => {
    setBookingState((prev) => ({
      ...prev,
      step: Math.max(1, prev.step - 1) as 1 | 2 | 3 | 4,
    }));
  };

  // Get initial data for components
  const getInitialDates = () => {
    if (bookingState.dates) return bookingState.dates;

    const urlParams = {
      checkIn: searchParams?.get('checkIn'),
      checkOut: searchParams?.get('checkOut'),
      guests: searchParams?.get('guests'),
    };

    return {
      checkIn: urlParams.checkIn ? new Date(urlParams.checkIn) : undefined,
      checkOut: urlParams.checkOut ? new Date(urlParams.checkOut) : undefined,
      guests: urlParams.guests ? parseInt(urlParams.guests) : undefined,
    };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="min-h-screen py-8">
        {/* Step 1: Date Selection */}
        {bookingState.step === 1 && (
          <DateSelection
            onNext={handleDateSelection}
            initialData={getInitialDates()}
            className="px-4 sm:px-6 lg:px-8"
          />
        )}

        {/* Step 2: Room Selection */}
        {bookingState.step === 2 && bookingState.dates && (
          <RoomSelection
            dates={bookingState.dates}
            onNext={handleRoomSelection}
            onBack={goBack}
            className="px-4 sm:px-6 lg:px-8"
          />
        )}

        {/* Step 3: Guest Details */}
        {bookingState.step === 3 && bookingState.dates && bookingState.room && (
          <GuestDetails
            bookingData={{
              dates: bookingState.dates,
              room: bookingState.room,
              totalPrice: bookingState.totalPrice,
            }}
            onNext={handleGuestDetails}
            onBack={goBack}
            className="px-4 sm:px-6 lg:px-8"
          />
        )}

        {/* Step 4: Confirmation */}
        {bookingState.step === 4 &&
          bookingState.dates &&
          bookingState.room &&
          bookingState.guestDetails && (
            <Confirmation
              bookingData={{
                dates: bookingState.dates,
                room: bookingState.room,
                totalPrice: bookingState.totalPrice,
                guestDetails: bookingState.guestDetails,
              }}
              onConfirm={handleBookingConfirmation}
              onBack={goBack}
              className="px-4 sm:px-6 lg:px-8"
            />
          )}
      </main>

      <Footer />
    </div>
  );
};

const BookingPage = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2 mb-8"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="h-96 bg-gray-300 rounded-lg"></div>
                <div className="h-96 bg-gray-300 rounded-lg"></div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      }
    >
      <BookingPageContent />
    </Suspense>
  );
};

export default BookingPage;
