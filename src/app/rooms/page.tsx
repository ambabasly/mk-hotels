// src/app/rooms/page.tsx
'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import RoomCard from '@/components/rooms/RoomCard';
import RoomFilter from '@/components/rooms/RoomFilter';
import RoomModal from '@/components/rooms/RoomModal';
import QuickBooking from '@/components/home/QuickBooking';
import LoadingSkeleton, {
  RoomCardSkeleton,
} from '@/components/ui/LoadingSkeleton';
import { Room } from '@/types';
import roomsData from '@/data/rooms.json';
import { motion, AnimatePresence } from '@/components/ui/MotionWrapper';

interface FilterOptions {
  priceRange: [number, number];
  maxGuests: number;
  bedType: string;
  amenities: string[];
  sortBy: string;
}

const RoomsPageContent = () => {
  const searchParams = useSearchParams();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load rooms data
  useEffect(() => {
    const loadRooms = async () => {
      setIsLoading(true);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setRooms(roomsData.rooms);
      setFilteredRooms(roomsData.rooms);
      setIsLoading(false);
    };

    loadRooms();
  }, []);

  // Handle URL parameters (from booking widget or other sources)
  useEffect(() => {
    const roomId = searchParams?.get('roomId');
    if (roomId && rooms.length > 0) {
      const room = rooms.find((r) => r.id === parseInt(roomId));
      if (room) {
        setSelectedRoom(room);
        setIsModalOpen(true);
      }
    }
  }, [searchParams, rooms]);

  // Memoized filter handler to prevent infinite loops
  const handleFilterChange = useCallback(
    (filters: FilterOptions) => {
      let filtered = [...rooms];

      // Filter by price range
      if (filters.priceRange[0] > 0 || filters.priceRange[1] < 1000) {
        filtered = filtered.filter(
          (room) =>
            room.price >= filters.priceRange[0] &&
            (filters.priceRange[1] >= 1000
              ? true
              : room.price <= filters.priceRange[1])
        );
      }

      // Filter by max guests
      if (filters.maxGuests > 0) {
        filtered = filtered.filter(
          (room) => room.maxGuests >= filters.maxGuests
        );
      }

      // Filter by bed type
      if (filters.bedType) {
        filtered = filtered.filter((room) => room.bedType === filters.bedType);
      }

      // Filter by amenities
      if (filters.amenities.length > 0) {
        filtered = filtered.filter((room) =>
          filters.amenities.every((amenity) => room.amenities.includes(amenity))
        );
      }

      // Sort rooms
      switch (filters.sortBy) {
        case 'price-asc':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'name-asc':
          filtered.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'size-desc':
          filtered.sort((a, b) => b.size - a.size);
          break;
        case 'guests-desc':
          filtered.sort((a, b) => b.maxGuests - a.maxGuests);
          break;
        default:
          break;
      }

      setFilteredRooms(filtered);
    },
    [rooms]
  ); // Only depend on rooms, not on the filters

  const handleViewDetails = (room: Room) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  const handleBookNow = (roomId: number) => {
    // Get current booking parameters from URL
    const checkIn = searchParams?.get('checkIn');
    const checkOut = searchParams?.get('checkOut');
    const guests = searchParams?.get('guests');

    // Build booking URL with room and dates
    const params = new URLSearchParams();
    params.set('roomId', roomId.toString());
    if (checkIn) params.set('checkIn', checkIn);
    if (checkOut) params.set('checkOut', checkOut);
    if (guests) params.set('guests', guests);

    window.location.href = `/booking?${params.toString()}`;
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRoom(null);

    // Remove roomId from URL without page reload
    const newParams = new URLSearchParams(searchParams || undefined);
    newParams.delete('roomId');
    const newUrl = `${window.location.pathname}${newParams.toString() ? `?${newParams.toString()}` : ''}`;
    window.history.replaceState({}, '', newUrl);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
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
        className="pt-8 pb-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mb-12"
          >
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Luxury Accommodations
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover our collection of elegantly appointed rooms and suites,
              each designed to provide the ultimate in comfort and
              sophistication for the discerning traveler.
            </p>
          </motion.div>

          {/* Quick Booking Widget */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-12"
          >
            <QuickBooking
              title="Find Your Perfect Room"
              subtitle="Check availability and book your ideal accommodation"
              variant="default"
            />
          </motion.div>

          {/* Room Filter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mb-8"
          >
            <RoomFilter
              onFilterChange={handleFilterChange}
              totalRooms={rooms.length}
              filteredCount={filteredRooms.length}
            />
          </motion.div>

          {/* Loading State */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {Array.from({ length: 6 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <RoomCardSkeleton />
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Rooms Grid */}
          <AnimatePresence mode="wait">
            {!isLoading && filteredRooms.length > 0 && (
              <motion.div
                key="rooms-grid"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: 20 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredRooms.map((room, index) => (
                  <motion.div
                    key={room.id}
                    variants={itemVariants}
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <RoomCard
                      room={room}
                      variant={index === 0 ? 'featured' : 'default'}
                      onViewDetails={handleViewDetails}
                      onBookNow={handleBookNow}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* No Rooms Found */}
            {!isLoading && filteredRooms.length === 0 && (
              <motion.div
                key="no-rooms"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6 }}
                className="text-center py-16"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="w-24 h-24 mx-auto mb-6 opacity-50"
                >
                  <svg
                    className="w-full h-full text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </motion.div>
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-2xl font-serif font-semibold text-gray-900 mb-4"
                >
                  No Rooms Match Your Criteria
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="text-gray-600 mb-8 max-w-md mx-auto"
                >
                  Try adjusting your filters or search criteria to find
                  available rooms that meet your preferences.
                </motion.p>
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.location.reload()}
                  className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
                >
                  Reset Filters
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hotel Features */}
          {!isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mt-16"
            >
              <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-center mb-8"
                >
                  <h2 className="font-serif text-3xl font-bold text-gray-900 mb-4">
                    Why Choose Patricia Hotel?
                  </h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Experience the difference with our award-winning service and
                    luxurious amenities
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{
                    duration: 0.8,
                    staggerChildren: 0.2,
                    delay: 0.4,
                  }}
                  viewport={{ once: true }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    whileHover={{ scale: 1.05 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-8 h-8 text-primary-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      24/7 Concierge
                    </h3>
                    <p className="text-sm text-gray-600">
                      Round-the-clock personalized service
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    whileHover={{ scale: 1.05 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-8 h-8 text-primary-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                        />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Best Rate Guarantee
                    </h3>
                    <p className="text-sm text-gray-600">
                      We'll match any lower price
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    whileHover={{ scale: 1.05 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-8 h-8 text-primary-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Free Cancellation
                    </h3>
                    <p className="text-sm text-gray-600">
                      Cancel up to 24 hours before
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    whileHover={{ scale: 1.05 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-8 h-8 text-primary-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Instant Confirmation
                    </h3>
                    <p className="text-sm text-gray-600">
                      Immediate booking confirmation
                    </p>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.main>

      {/* Room Details Modal */}
      <RoomModal
        room={selectedRoom}
        isOpen={isModalOpen}
        onClose={closeModal}
        onBookNow={handleBookNow}
      />

      <Footer />
    </motion.div>
  );
};

// Wrapper component with Suspense
const RoomsPage = () => {
  return (
    <Suspense
      fallback={
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <LoadingSkeleton variant="rectangular" height="100vh" />
        </motion.div>
      }
    >
      <RoomsPageContent />
    </Suspense>
  );
};

export default RoomsPage;
