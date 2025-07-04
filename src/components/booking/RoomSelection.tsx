// src/components/booking/RoomSelection.tsx
'use client';

import { useState, useEffect } from 'react';
import { format, differenceInDays } from 'date-fns';
import { Room } from '@/types';
import Button from '@/components/ui/Button';
import RoomCard from '@/components/rooms/RoomCard';
import LoadingSkeleton from '@/components/ui/LoadingSkeleton';

interface RoomSelectionProps {
  dates: {
    checkIn: Date;
    checkOut: Date;
    guests: number;
  };
  onNext: (selection: { room: Room; totalPrice: number }) => void;
  onBack: () => void;
  className?: string;
}

interface RoomAvailability extends Room {
  totalPrice: number;
  discountedPrice?: number;
  isLastRoom?: boolean;
  popularChoice?: boolean;
}

const RoomSelection = ({
  dates,
  onNext,
  onBack,
  className = '',
}: RoomSelectionProps) => {
  const [availableRooms, setAvailableRooms] = useState<RoomAvailability[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<RoomAvailability | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'price' | 'size' | 'name'>('price');
  const [filterBy, setFilterBy] = useState<
    'all' | 'standard' | 'deluxe' | 'suite'
  >('all');

  const nightCount = differenceInDays(dates.checkOut, dates.checkIn);

  // Mock room data - In real app, this would come from API
  const mockRooms: Room[] = [
    {
      id: 1,
      name: 'Standard Room',
      price: 150,
      currency: 'USD',
      amenities: ['WiFi', 'Air Conditioning', 'TV', 'Safe'],
      images: ['/rooms/standard-1.jpg', '/rooms/standard-2.jpg'],
      description:
        'Comfortable and modern room with all essential amenities for a pleasant stay.',
      maxGuests: 2,
      bedType: 'Queen Bed',
      size: 300,
      available: true,
    },
    {
      id: 2,
      name: 'Deluxe Room',
      price: 220,
      currency: 'USD',
      amenities: [
        'WiFi',
        'Air Conditioning',
        'TV',
        'Safe',
        'Minibar',
        'City View',
      ],
      images: ['/rooms/deluxe-1.jpg', '/rooms/deluxe-2.jpg'],
      description:
        'Spacious room with premium amenities and stunning city views.',
      maxGuests: 3,
      bedType: 'King Bed',
      size: 400,
      available: true,
    },
    {
      id: 3,
      name: 'Executive Suite',
      price: 350,
      currency: 'USD',
      amenities: [
        'WiFi',
        'Air Conditioning',
        'TV',
        'Safe',
        'Minibar',
        'Ocean View',
        'Balcony',
        'Kitchenette',
      ],
      images: ['/rooms/suite-1.jpg', '/rooms/suite-2.jpg'],
      description:
        'Luxurious suite with separate living area, ocean views, and premium amenities.',
      maxGuests: 4,
      bedType: 'King Bed',
      size: 600,
      available: true,
    },
    {
      id: 4,
      name: 'Presidential Suite',
      price: 650,
      currency: 'USD',
      amenities: [
        'WiFi',
        'Air Conditioning',
        'TV',
        'Safe',
        'Minibar',
        'Ocean View',
        'Balcony',
        'Kitchenette',
        'Jacuzzi',
        'Butler Service',
      ],
      images: ['/rooms/presidential-1.jpg', '/rooms/presidential-2.jpg'],
      description:
        'The ultimate luxury experience with panoramic ocean views and personalized service.',
      maxGuests: 6,
      bedType: 'King Bed + Sofa Bed',
      size: 1000,
      available: true,
    },
    {
      id: 5,
      name: 'Garden View Room',
      price: 180,
      currency: 'USD',
      amenities: ['WiFi', 'Air Conditioning', 'TV', 'Safe', 'Garden View'],
      images: ['/rooms/garden-1.jpg', '/rooms/garden-2.jpg'],
      description: 'Peaceful room overlooking our beautiful hotel gardens.',
      maxGuests: 2,
      bedType: 'Queen Bed',
      size: 320,
      available: false,
    },
  ];

  // Simulate API call to get available rooms
  useEffect(() => {
    const fetchAvailableRooms = async () => {
      setIsLoading(true);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Filter rooms by guest capacity and availability
      const filtered = mockRooms
        .filter((room) => room.maxGuests >= dates.guests && room.available)
        .map((room, index) => {
          const basePrice = room.price * nightCount;
          let totalPrice = basePrice;
          let discountedPrice: number | undefined;

          // Add weekend surcharge
          const isWeekend =
            dates.checkIn.getDay() === 5 || dates.checkIn.getDay() === 6;
          if (isWeekend) {
            totalPrice = basePrice * 1.2;
          }

          // Add long stay discount
          if (nightCount >= 7) {
            discountedPrice = totalPrice;
            totalPrice = totalPrice * 0.9; // 10% discount for 7+ nights
          }

          return {
            ...room,
            totalPrice: Math.round(totalPrice),
            discountedPrice: discountedPrice
              ? Math.round(discountedPrice)
              : undefined,
            isLastRoom: index === 1, // Mock "last room" for urgency
            popularChoice: index === 1, // Mock popular choice
          };
        });

      setAvailableRooms(filtered);
      setIsLoading(false);
    };

    fetchAvailableRooms();
  }, [dates, nightCount]);

  const handleRoomSelect = (room: RoomAvailability) => {
    setSelectedRoom(room);
  };

  const handleContinue = () => {
    if (selectedRoom) {
      onNext({
        room: selectedRoom,
        totalPrice: selectedRoom.totalPrice,
      });
    }
  };

  const getSortedAndFilteredRooms = () => {
    let filtered = availableRooms;

    // Filter by room type
    if (filterBy !== 'all') {
      filtered = filtered.filter((room) => {
        const name = room.name.toLowerCase();
        switch (filterBy) {
          case 'standard':
            return name.includes('standard') || name.includes('garden');
          case 'deluxe':
            return name.includes('deluxe');
          case 'suite':
            return name.includes('suite');
          default:
            return true;
        }
      });
    }

    // Sort rooms
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.totalPrice - b.totalPrice;
        case 'size':
          return b.size - a.size;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
  };

  const sortedRooms = getSortedAndFilteredRooms();

  // Icons
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
    <div className={`max-w-6xl mx-auto ${className}`}>
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="font-serif text-3xl font-bold text-gray-900 mb-2">
          Choose Your Room
        </h2>
        <p className="text-gray-600">
          Select the perfect room for your {nightCount} night stay
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
              2
            </div>
            <span className="ml-2 text-sm font-medium text-primary-600">
              Rooms
            </span>
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

      {/* Booking Summary */}
      <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-8">
        <h3 className="font-medium text-primary-900 mb-2">Your Stay Details</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-primary-800">
          <div>
            <span className="block text-primary-600">Check-in</span>
            <span className="font-medium">
              {format(dates.checkIn, 'MMM do')}
            </span>
          </div>
          <div>
            <span className="block text-primary-600">Check-out</span>
            <span className="font-medium">
              {format(dates.checkOut, 'MMM do')}
            </span>
          </div>
          <div>
            <span className="block text-primary-600">Duration</span>
            <span className="font-medium">
              {nightCount} night{nightCount > 1 ? 's' : ''}
            </span>
          </div>
          <div>
            <span className="block text-primary-600">Guests</span>
            <span className="font-medium">
              {dates.guests} guest{dates.guests > 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Sort Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Room Type
          </label>
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value as any)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">All Room Types</option>
            <option value="standard">Standard Rooms</option>
            <option value="deluxe">Deluxe Rooms</option>
            <option value="suite">Suites</option>
          </select>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sort by
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="price">Price: Low to High</option>
            <option value="size">Size: Largest First</option>
            <option value="name">Name: A to Z</option>
          </select>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <LoadingSkeleton
              key={i}
              variant="rectangular"
              height="400px"
              className="rounded-2xl"
            />
          ))}
        </div>
      )}

      {/* Available Rooms */}
      {!isLoading && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {sortedRooms.map((room) => (
            <div
              key={room.id}
              className={`relative ${
                selectedRoom?.id === room.id
                  ? 'ring-2 ring-primary-500 shadow-lg'
                  : 'hover:shadow-md'
              } transition-all duration-200 rounded-2xl overflow-hidden`}
            >
              {/* Room Badges */}
              <div className="absolute top-4 right-4 z-10 space-y-2">
                {room.popularChoice && (
                  <span className="block px-2 py-1 bg-orange-500 text-white text-xs font-medium rounded-full">
                    Popular Choice
                  </span>
                )}
                {room.isLastRoom && (
                  <span className="block px-2 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
                    Only 1 Left
                  </span>
                )}
                {room.discountedPrice && (
                  <span className="block px-2 py-1 bg-green-500 text-white text-xs font-medium rounded-full">
                    Long Stay Discount
                  </span>
                )}
              </div>

              {/* Selection Indicator */}
              {selectedRoom?.id === room.id && (
                <div className="absolute top-4 left-4 z-10">
                  <div className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center">
                    <CheckIcon />
                  </div>
                </div>
              )}

              <RoomCard
                room={room}
                variant="default"
                onBookNow={() => handleRoomSelect(room)}
              />

              {/* Price Summary */}
              <div className="p-4 bg-gray-50 border-t">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm text-gray-600">
                      Total for {nightCount} night{nightCount > 1 ? 's' : ''}
                    </div>
                    {room.discountedPrice && (
                      <div className="text-sm text-gray-500 line-through">
                        ${room.discountedPrice.toLocaleString()}
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary-600">
                      ${room.totalPrice.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">
                      ${Math.round(room.totalPrice / nightCount)} per night
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => handleRoomSelect(room)}
                  variant={
                    selectedRoom?.id === room.id ? 'primary' : 'secondary'
                  }
                  className="w-full mt-3"
                >
                  {selectedRoom?.id === room.id ? 'Selected' : 'Select Room'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No Rooms Available */}
      {!isLoading && sortedRooms.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg
              className="w-16 h-16 mx-auto"
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
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            No rooms available
          </h3>
          <p className="text-gray-600 mb-4">
            No rooms match your criteria for {dates.guests} guest
            {dates.guests > 1 ? 's' : ''} on the selected dates.
          </p>
          <Button onClick={onBack} variant="secondary">
            Change Dates
          </Button>
        </div>
      )}

      {/* Continue Button */}
      {!isLoading && sortedRooms.length > 0 && (
        <div className="flex justify-between items-center">
          <Button
            onClick={onBack}
            variant="ghost"
            icon={<ArrowLeftIcon />}
            iconPosition="left"
          >
            Back to Dates
          </Button>

          <Button
            onClick={handleContinue}
            disabled={!selectedRoom}
            size="lg"
            icon={<ArrowRightIcon />}
            iconPosition="right"
            className="min-w-[200px]"
          >
            Continue to Details
          </Button>
        </div>
      )}
    </div>
  );
};

export default RoomSelection;
