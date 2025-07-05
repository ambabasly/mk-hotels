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
import { motion, AnimatePresence } from '@/components/ui/MotionWrapper';

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

  // Animation variants for step transitions
  const stepVariants = {
    hidden: {
      opacity: 0,
      x: 50,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
    exit: {
      opacity: 0,
      x: -50,
      scale: 0.95,
      transition: {
        duration: 0.3,
        ease: 'easeIn',
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gray-50"
    >
      <Navigation />

      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="min-h-screen py-8"
      >
        <AnimatePresence mode="wait">
          {/* Step 1: Date Selection */}
          {bookingState.step === 1 && (
            <motion.div
              key="step1"
              variants={stepVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <DateSelection
                onNext={handleDateSelection}
                initialData={getInitialDates()}
                className="px-4 sm:px-6 lg:px-8"
              />
            </motion.div>
          )}

          {/* Step 2: Room Selection */}
          {bookingState.step === 2 && bookingState.dates && (
            <motion.div
              key="step2"
              variants={stepVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <RoomSelection
                dates={bookingState.dates}
                onNext={handleRoomSelection}
                onBack={goBack}
                className="px-4 sm:px-6 lg:px-8"
              />
            </motion.div>
          )}

          {/* Step 3: Guest Details */}
          {bookingState.step === 3 &&
            bookingState.dates &&
            bookingState.room && (
              <motion.div
                key="step3"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
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
              </motion.div>
            )}

          {/* Step 4: Confirmation */}
          {bookingState.step === 4 &&
            bookingState.dates &&
            bookingState.room &&
            bookingState.guestDetails && (
              <motion.div
                key="step4"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
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
              </motion.div>
            )}
        </AnimatePresence>
      </motion.main>

      <Footer />
    </motion.div>
  );
};

const BookingPage = () => {
  return (
    <Suspense
      fallback={
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="min-h-screen bg-gray-50"
        >
          <Navigation />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
          >
            <motion.div
              className="animate-pulse"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '75%' }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="h-8 bg-gray-300 rounded mb-4"
              ></motion.div>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '50%' }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="h-4 bg-gray-300 rounded mb-8"
              ></motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                  className="h-96 bg-gray-300 rounded-lg"
                ></motion.div>
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.4 }}
                  className="h-96 bg-gray-300 rounded-lg"
                ></motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
          <Footer />
        </motion.div>
      }
    >
      <BookingPageContent />
    </Suspense>
  );
};

export default BookingPage;
