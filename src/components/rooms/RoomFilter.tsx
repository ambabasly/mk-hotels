// src/components/rooms/RoomFilter.tsx
'use client';

import { useState, useEffect } from 'react';

interface FilterOptions {
  priceRange: [number, number];
  maxGuests: number;
  bedType: string;
  amenities: string[];
  sortBy: string;
}

interface RoomFilterProps {
  onFilterChange: (filters: FilterOptions) => void;
  totalRooms: number;
  filteredCount: number;
  className?: string;
}

const RoomFilter = ({ 
  onFilterChange, 
  totalRooms, 
  filteredCount, 
  className = "" 
}: RoomFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: [0, 1000],
    maxGuests: 0,
    bedType: '',
    amenities: [],
    sortBy: 'price-asc'
  });

  // Available filter options
  const bedTypes = [
    'King Bed',
    'Queen Bed', 
    'Twin Beds',
    'Double Bed',
    'Sofa Bed'
  ];

  const availableAmenities = [
    'WiFi',
    'Air Conditioning',
    'Minibar',
    'Room Service',
    'Safe',
    'TV',
    'Balcony',
    'Ocean View',
    'City View',
    'Jacuzzi',
    'Kitchenette',
    'Workspace'
  ];

  const sortOptions = [
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'name-asc', label: 'Name: A to Z' },
    { value: 'size-desc', label: 'Size: Largest First' },
    { value: 'guests-desc', label: 'Capacity: Most Guests' }
  ];

  // Update parent component when filters change
  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const updateFilter = (key: keyof FilterOptions, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleAmenityToggle = (amenity: string) => {
    setFilters(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      priceRange: [0, 1000],
      maxGuests: 0,
      bedType: '',
      amenities: [],
      sortBy: 'price-asc'
    });
  };

  const hasActiveFilters = () => {
    return filters.priceRange[0] > 0 || 
           filters.priceRange[1] < 1000 ||
           filters.maxGuests > 0 ||
           filters.bedType !== '' ||
           filters.amenities.length > 0;
  };

  // Icons
  const FilterIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
    >
      <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const ChevronDownIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
    >
      <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const XIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4"
    >
      <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  return (
    <div className={`bg-white rounded-2xl shadow-lg ${className}`}>
      {/* Filter Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center space-x-2 btn-secondary"
          >
            <FilterIcon />
            <span>Filters</span>
            <ChevronDownIcon />
          </button>
          
          {hasActiveFilters() && (
            <button
              onClick={clearAllFilters}
              className="flex items-center space-x-1 text-sm text-primary-600 hover:text-primary-700 transition-colors duration-200"
            >
              <XIcon />
              <span>Clear All</span>
            </button>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600">
            Showing {filteredCount} of {totalRooms} rooms
          </div>
          
          {/* Sort Dropdown */}
          <select
            value={filters.sortBy}
            onChange={(e) => updateFilter('sortBy', e.target.value)}
            className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Filter Content */}
      <div className={`transition-all duration-300 ease-in-out ${
        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      } overflow-hidden`}>
        <div className="p-6 space-y-6">
          
          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Price Range (per night)
            </label>
            <div className="space-y-3">
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="50"
                  value={filters.priceRange[0]}
                  onChange={(e) => updateFilter('priceRange', [Number(e.target.value), filters.priceRange[1]])}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="50"
                  value={filters.priceRange[1]}
                  onChange={(e) => updateFilter('priceRange', [filters.priceRange[0], Number(e.target.value)])}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>${filters.priceRange[0]}</span>
                <span>${filters.priceRange[1]}+</span>
              </div>
            </div>
          </div>

          {/* Maximum Guests */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Maximum Guests
            </label>
            <div className="flex flex-wrap gap-2">
              {[0, 1, 2, 3, 4, 5, 6].map((num) => (
                <button
                  key={num}
                  onClick={() => updateFilter('maxGuests', num)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    filters.maxGuests === num
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {num === 0 ? 'Any' : `${num}+`}
                </button>
              ))}
            </div>
          </div>

          {/* Bed Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Bed Type
            </label>
            <select
              value={filters.bedType}
              onChange={(e) => updateFilter('bedType', e.target.value)}
              className="w-full input-field"
            >
              <option value="">Any Bed Type</option>
              {bedTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Amenities */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Amenities
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {availableAmenities.map((amenity) => (
                <label
                  key={amenity}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={filters.amenities.includes(amenity)}
                    onChange={() => handleAmenityToggle(amenity)}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 focus:ring-offset-0"
                  />
                  <span className="text-sm text-gray-700">{amenity}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Active Filters Summary */}
      {hasActiveFilters() && (
        <div className="px-6 pb-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Active Filters:</h4>
            <div className="flex flex-wrap gap-2">
              {filters.priceRange[0] > 0 && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700">
                  Min: ${filters.priceRange[0]}
                </span>
              )}
              {filters.priceRange[1] < 1000 && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700">
                  Max: ${filters.priceRange[1]}
                </span>
              )}
              {filters.maxGuests > 0 && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700">
                  {filters.maxGuests}+ Guests
                </span>
              )}
              {filters.bedType && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700">
                  {filters.bedType}
                </span>
              )}
              {filters.amenities.map((amenity) => (
                <span
                  key={amenity}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700"
                >
                  {amenity}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomFilter;