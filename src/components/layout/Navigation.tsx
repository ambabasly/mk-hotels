// src/components/layout/Navigation.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/rooms', label: 'Rooms' },
    { href: '/dining', label: 'Dining' },
    { href: '/dining#nightclub', label: 'Nightclub' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/contact', label: 'Contact' },
  ];

  const isActiveLink = (href: string) => {
    // Handle root path specially
    if (href === '/') {
      return pathname === '/';
    }
    
    // Handle anchor links
    if (href.includes('#')) {
      const [path] = href.split('#');
      return pathname === path;
    }
    
    // Handle regular paths
    return pathname === href || pathname.startsWith(href + '/');
  };

  const handleLinkClick = () => {
    // Close mobile menu when any link is clicked
    setIsMenuOpen(false);
  };

  // Hotel Logo SVG
  const HotelLogo = () => (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-8 h-8 sm:w-10 sm:h-10"
    >
      <rect width="40" height="40" rx="8" fill="#7c3aed" />
      <path
        d="M8 32V12C8 10.8954 8.89543 10 10 10H30C31.1046 10 32 10.8954 32 12V32"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <rect x="12" y="14" width="4" height="6" fill="white" />
      <rect x="18" y="14" width="4" height="6" fill="white" />
      <rect x="24" y="14" width="4" height="6" fill="white" />
      <rect x="12" y="22" width="4" height="6" fill="white" />
      <rect x="18" y="22" width="4" height="6" fill="white" />
      <rect x="24" y="22" width="4" height="6" fill="white" />
      <rect x="16" y="28" width="8" height="4" fill="white" />
    </svg>
  );

  // Hamburger Menu Icon
  const HamburgerIcon = () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6"
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

  // Close Icon
  const CloseIcon = () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6"
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
    <nav className="sticky top-0 z-50 bg-white shadow-lg border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo and Brand */}
          <Link href="/" className="flex items-center space-x-2 sm:space-x-3 group">
            <HotelLogo />
            <div className="flex flex-col">
              <span className="font-serif font-bold text-lg sm:text-xl text-gray-900 group-hover:text-primary-600 transition-colors duration-200">
                Patricia
              </span>
              <span className="text-xs text-gray-500 font-light tracking-wide uppercase">
                Hotel & Suites
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative font-medium text-sm lg:text-base transition-colors duration-200 ${
                  isActiveLink(link.href)
                    ? 'text-primary-600'
                    : 'text-gray-700 hover:text-primary-600'
                }`}
              >
                {link.label}
                {isActiveLink(link.href) && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary-600 rounded-full"></span>
                )}
              </Link>
            ))}
            
            {/* Book Now Button */}
            <Link
              href="/booking"
              className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 lg:px-6 rounded-lg text-sm lg:text-base transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:text-primary-600 hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? 'max-h-96 opacity-100 visible'
            : 'max-h-0 opacity-0 invisible'
        } overflow-hidden bg-white border-t border-gray-100`}
      >
        <div className="px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={handleLinkClick}
              className={`block py-2 px-3 rounded-lg font-medium transition-colors duration-200 ${
                isActiveLink(link.href)
                  ? 'text-primary-600 bg-primary-50'
                  : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
              }`}
            >
              {link.label}
            </Link>
          ))}
          
          {/* Mobile Book Now Button */}
          <Link
            href="/booking"
            onClick={handleLinkClick}
            className="block w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-lg text-center mt-4 transition-colors duration-200"
          >
            Book Now
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;