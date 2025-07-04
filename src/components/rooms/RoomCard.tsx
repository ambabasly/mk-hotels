// src/components/rooms/RoomCard.tsx
'use client';

import { useState } from 'react';
import { Room } from '@/types';

interface RoomCardProps {
  room: Room;
  onViewDetails?: (room: Room) => void;
  onBookNow?: (roomId: number) => void;
  variant?: 'default' | 'featured' | 'compact';
  className?: string;
}

const RoomCard = ({ 
  room, 
  onViewDetails, 
  onBookNow,
  variant = 'default',
  className = ""
}: RoomCardProps) => {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(room);
    }
  };

  const handleBookNow = () => {
    if (onBookNow) {
      onBookNow(room.id);
    } else {
      // Default booking redirect
      window.location.href = `/booking?roomId=${room.id}`;
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === room.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? room.images.length - 1 : prev - 1
    );
  };

  // Icons
  const UsersIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4 text-gray-500"
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

  const BedIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4 text-gray-500"
    >
      <path
        d="M2 18V9C2 8.44772 2.44772 8 3 8H21C21.5523 8 22 8.44772 22 9V18"
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

  const SquareIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4 text-gray-500"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2" />
    </svg>
  );

  const ChevronLeftIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
    >
      <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const ChevronRightIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
    >
      <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const EyeIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4"
    >
      <path d="M1 12S5 4 12 4S23 12 23 12S19 20 12 20S1 12 1 12Z" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
    </svg>
  );

  // Room placeholder SVG
  const RoomPlaceholder = () => (
    <svg
      className="w-full h-full object-cover"
      viewBox="0 0 400 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="400" height="280" fill="#f3f4f6" />
      <rect x="50" y="80" width="300" height="120" fill="#e5e7eb" stroke="#d1d5db" strokeWidth="2" />
      <rect x="70" y="100" width="60" height="80" fill="#d1d5db" />
      <rect x="150" y="100" width="60" height="80" fill="#d1d5db" />
      <rect x="230" y="100" width="60" height="80" fill="#d1d5db" />
      <circle cx="320" cy="120" r="15" fill="#d1d5db" />
      <rect x="170" y="220" width="60" height="30" fill="#d1d5db" />
      <text x="200" y="240" textAnchor="middle" className="fill-gray-500 text-sm font-medium">
        {room.name}
      </text>
    </svg>
  );

  // Variant-specific styling
  const getCardClasses = () => {
    const baseClasses = "bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300";
    
    switch (variant) {
      case 'featured':
        return `${baseClasses} transform hover:-translate-y-2`;
      case 'compact':
        return `${baseClasses} hover:shadow-md`;
      default:
        return `${baseClasses} transform hover:-translate-y-1`;
    }
  };

  const getImageHeight = () => {
    switch (variant) {
      case 'featured':
        return 'h-64 md:h-72';
      case 'compact':
        return 'h-48';
      default:
        return 'h-56 md:h-64';
    }
  };

  return (
    <div className={`${getCardClasses()} ${className}`}>
      {/* Image Gallery */}
      <div className={`relative ${getImageHeight()} overflow-hidden`}>
        {/* Main Image */}
        <div className="relative w-full h-full">
          {isImageLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <RoomPlaceholder />
            </div>
          )}
          
          {room.images && room.images.length > 0 ? (
            <img
              src={room.images[currentImageIndex]}
              alt={`${room.name} - Image ${currentImageIndex + 1}`}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                isImageLoading ? 'opacity-0' : 'opacity-100'
              }`}
              onLoad={() => setIsImageLoading(false)}
              onError={() => setIsImageLoading(false)}
            />
          ) : (
            <RoomPlaceholder />
          )}
        </div>

        {/* Image Navigation */}
        {room.images && room.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
              aria-label="Previous image"
            >
              <ChevronLeftIcon />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
              aria-label="Next image"
            >
              <ChevronRightIcon />
            </button>

            {/* Image Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              {room.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                  aria-label={`View image ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}

        {/* Availability Badge */}
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            room.available
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {room.available ? 'Available' : 'Unavailable'}
          </span>
        </div>

        {/* Room Type Badge */}
        {variant === 'featured' && (
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 bg-primary-600 text-white rounded-full text-xs font-medium">
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className={`p-6 ${variant === 'compact' ? 'p-4' : ''}`}>
        {/* Room Header */}
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className={`font-serif font-semibold text-gray-900 ${
              variant === 'compact' ? 'text-lg' : 'text-xl'
            }`}>
              {room.name}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {room.bedType} • {room.size} sq ft
            </p>
          </div>
          <div className="text-right">
            <div className={`font-bold text-primary-600 ${
              variant === 'compact' ? 'text-lg' : 'text-xl'
            }`}>
              ${room.price.toLocaleString()}
            </div>
            <div className="text-sm text-gray-500">per night</div>
          </div>
        </div>

        {/* Room Details */}
        <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <UsersIcon />
            <span>Up to {room.maxGuests} guests</span>
          </div>
          <div className="flex items-center space-x-1">
            <BedIcon />
            <span>{room.bedType}</span>
          </div>
          <div className="flex items-center space-x-1">
            <SquareIcon />
            <span>{room.size} sq ft</span>
          </div>
        </div>

        {/* Description */}
        {variant !== 'compact' && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {room.description}
          </p>
        )}

        {/* Amenities */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {room.amenities.slice(0, variant === 'compact' ? 3 : 4).map((amenity, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
              >
                {amenity}
              </span>
            ))}
            {room.amenities.length > (variant === 'compact' ? 3 : 4) && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-500">
                +{room.amenities.length - (variant === 'compact' ? 3 : 4)} more
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className={`flex gap-3 ${variant === 'compact' ? 'flex-col' : 'flex-row'}`}>
          {onViewDetails && (
            <button
              onClick={handleViewDetails}
              className="flex-1 btn-secondary flex items-center justify-center space-x-2 text-sm"
            >
              <EyeIcon />
              <span>View Details</span>
            </button>
          )}
          <button
            onClick={handleBookNow}
            disabled={!room.available}
            className={`flex-1 btn-primary text-sm ${
              !room.available ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {room.available ? 'Book Now' : 'Unavailable'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;