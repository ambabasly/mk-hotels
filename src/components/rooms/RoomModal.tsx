// src/components/rooms/RoomModal.tsx
'use client';

import { useState, useEffect } from 'react';
import { Room } from '@/types';

interface RoomModalProps {
  room: Room | null;
  isOpen: boolean;
  onClose: () => void;
  onBookNow?: (roomId: number) => void;
}

const RoomModal = ({ room, isOpen, onClose, onBookNow }: RoomModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'amenities' | 'policies'>('overview');

  // Reset modal state when opening
  useEffect(() => {
    if (isOpen && room) {
      setCurrentImageIndex(0);
      setActiveTab('overview');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, room]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleBookNow = () => {
    if (room) {
      if (onBookNow) {
        onBookNow(room.id);
      } else {
        window.location.href = `/booking?roomId=${room.id}`;
      }
    }
  };

  const nextImage = () => {
    if (room && room.images.length > 0) {
      setCurrentImageIndex((prev) => 
        prev === room.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (room && room.images.length > 0) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? room.images.length - 1 : prev - 1
      );
    }
  };

  if (!isOpen || !room) return null;

  // Icons
  const CloseIcon = () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6"
    >
      <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const ChevronLeftIcon = () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6"
    >
      <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const ChevronRightIcon = () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6"
    >
      <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const UsersIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 text-gray-500"
    >
      <path
        d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
    </svg>
  );

  const BedIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 text-gray-500"
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
    </svg>
  );

  const SquareIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 text-gray-500"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2" />
    </svg>
  );

  const CheckIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4 text-green-600"
    >
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
        fill="currentColor"
      />
    </svg>
  );

  // Room placeholder SVG for modal
  const RoomPlaceholder = () => (
    <svg
      className="w-full h-full object-cover"
      viewBox="0 0 600 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="600" height="400" fill="#f3f4f6" />
      <rect x="100" y="120" width="400" height="160" fill="#e5e7eb" stroke="#d1d5db" strokeWidth="3" />
      <rect x="130" y="150" width="80" height="100" fill="#d1d5db" />
      <rect x="230" y="150" width="80" height="100" fill="#d1d5db" />
      <rect x="330" y="150" width="80" height="100" fill="#d1d5db" />
      <circle cx="450" cy="180" r="20" fill="#d1d5db" />
      <rect x="260" y="320" width="80" height="40" fill="#d1d5db" />
      <text x="300" y="345" textAnchor="middle" className="fill-gray-500 text-lg font-medium">
        {room.name}
      </text>
    </svg>
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200"
            aria-label="Close modal"
          >
            <CloseIcon />
          </button>

          {/* Image Gallery */}
          <div className="relative h-80 md:h-96 overflow-hidden">
            {room.images && room.images.length > 0 ? (
              <img
                src={room.images[currentImageIndex]}
                alt={`${room.name} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <RoomPlaceholder />
            )}

            {/* Image Navigation */}
            {room.images && room.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200"
                  aria-label="Previous image"
                >
                  <ChevronLeftIcon />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200"
                  aria-label="Next image"
                >
                  <ChevronRightIcon />
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {room.images.length}
                </div>
              </>
            )}

            {/* Availability Badge */}
            <div className="absolute top-6 left-6">
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                room.available
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {room.available ? 'Available' : 'Unavailable'}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8 max-h-[50vh] overflow-y-auto">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
              <div className="mb-4 md:mb-0">
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {room.name}
                </h2>
                <div className="flex items-center space-x-6 text-gray-600">
                  <div className="flex items-center space-x-2">
                    <UsersIcon />
                    <span>Up to {room.maxGuests} guests</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BedIcon />
                    <span>{room.bedType}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <SquareIcon />
                    <span>{room.size} sq ft</span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-3xl md:text-4xl font-bold text-primary-600">
                  ${room.price.toLocaleString()}
                </div>
                <div className="text-gray-500">per night</div>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
              <nav className="flex space-x-8">
                {[
                  { id: 'overview', label: 'Overview' },
                  { id: 'amenities', label: 'Amenities' },
                  { id: 'policies', label: 'Policies' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                      activeTab === tab.id
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="space-y-6">
              
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-gray-900 mb-3">Description</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {room.description}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-gray-900 mb-3">Key Features</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="flex items-center space-x-2">
                        <CheckIcon />
                        <span className="text-gray-700">Premium bedding</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckIcon />
                        <span className="text-gray-700">24/7 room service</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckIcon />
                        <span className="text-gray-700">Daily housekeeping</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckIcon />
                        <span className="text-gray-700">Complimentary WiFi</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckIcon />
                        <span className="text-gray-700">Climate control</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckIcon />
                        <span className="text-gray-700">Blackout curtains</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Amenities Tab */}
              {activeTab === 'amenities' && (
                <div>
                  <h3 className="font-serif text-xl font-semibold text-gray-900 mb-4">Room Amenities</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {room.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckIcon />
                        <span className="text-gray-700">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Policies Tab */}
              {activeTab === 'policies' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Check-in / Check-out</h4>
                    <p className="text-gray-600 text-sm">Check-in: 3:00 PM | Check-out: 11:00 AM</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Cancellation Policy</h4>
                    <p className="text-gray-600 text-sm">Free cancellation up to 24 hours before check-in. Cancellations within 24 hours are subject to a one-night penalty.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Additional Policies</h4>
                    <ul className="text-gray-600 text-sm space-y-1">
                      <li>• No smoking rooms available</li>
                      <li>• Pets allowed with additional fee</li>
                      <li>• Maximum occupancy: {room.maxGuests} guests</li>
                      <li>• Extra bed available upon request</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 p-6 md:p-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onClose}
                className="flex-1 btn-secondary"
              >
                Close
              </button>
              <button
                onClick={handleBookNow}
                disabled={!room.available}
                className={`flex-1 btn-primary ${
                  !room.available ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {room.available ? 'Book This Room' : 'Unavailable'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomModal;