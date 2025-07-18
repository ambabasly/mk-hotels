// src/components/layout/Header.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Updated navigation order: Home > Dining > Nightclub > Rooms > Contact > Gallery
  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Dining', href: '/dining' },
    { name: 'Nightclub', href: '/nightclub' },
    { name: 'Rooms', href: '/rooms' },
    { name: 'Contact', href: '/contact' },
    { name: 'Gallery', href: '/gallery' },
  ];

  const isActive = (path: string) => pathname === path;

  // Icon Components
  const PhoneIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-3 h-3 sm:w-4 sm:h-4"
    >
      <path
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const MapPinIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-3 h-3 sm:w-4 sm:h-4"
    >
      <path
        d="M21 10C21 17 12 23 12 23S3 17 3 10C3 6.13401 6.13401 3 10 3H14C17.866 3 21 6.13401 21 10Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" />
    </svg>
  );

  const MenuIcon = () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 sm:w-6 sm:h-6"
    >
      <path
        d="M3 12H21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 6H21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 18H21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const XIcon = () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 sm:w-6 sm:h-6"
    >
      <path
        d="M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 6L18 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Top Bar */}
      <div className="bg-primary-700 text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-xs sm:text-sm">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="flex items-center space-x-1 sm:space-x-2">
              <PhoneIcon />
              <span className="hidden xs:inline">+234 812 345 6789</span>
              <span className="xs:hidden">Call Us</span>
            </div>
            <div className="hidden sm:flex items-center space-x-1 sm:space-x-2">
              <MapPinIcon />
              <span>Benin City, Nigeria</span>
            </div>
          </div>
          <div className="hidden sm:block">
            <Link
              href="/booking"
              className="bg-accent-600 hover:bg-accent-700 px-3 sm:px-4 py-1 rounded text-xs sm:text-sm font-medium transition-colors"
            >
              Book Now
            </Link>
          </div>
          <div className="sm:hidden">
            <Link
              href="/booking"
              className="bg-accent-600 hover:bg-accent-700 px-2 py-1 rounded text-xs font-medium transition-colors"
            >
              Book
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-accent-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm sm:text-lg">
                  P
                </span>
              </div>
              <div>
                <h1 className="text-base sm:text-xl font-serif font-bold text-primary-700">
                  Patricia Hotel
                </h1>
                <p className="text-xs text-gray-500 -mt-1 hidden sm:block">
                  Luxury & Comfort
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-6 lg:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-2 lg:px-3 py-2 text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-accent-600 border-b-2 border-accent-600'
                      : 'text-gray-700 hover:text-accent-600'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-accent-600 focus:outline-none focus:ring-2 focus:ring-accent-600 p-2 rounded-lg"
                aria-label="Toggle navigation menu"
              >
                {isMenuOpen ? <XIcon /> : <MenuIcon />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="px-4 py-3 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-3 py-2 text-base font-medium transition-colors rounded-lg ${
                    isActive(item.href)
                      ? 'text-accent-600 bg-accent-50'
                      : 'text-gray-700 hover:text-accent-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-3 py-2 pt-4">
                <Link
                  href="/booking"
                  className="block w-full text-center bg-accent-600 hover:bg-accent-700 text-white px-4 py-3 rounded-lg font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Book Your Stay
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;