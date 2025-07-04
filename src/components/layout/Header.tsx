// src/components/layout/Header.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, MapPin } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Rooms', href: '/rooms' },
    { name: 'Dining', href: '/dining' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Top Bar */}
      <div className="bg-primary-700 text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-xs sm:text-sm">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="flex items-center space-x-1 sm:space-x-2">
              <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden xs:inline">+254 123 456 789</span>
              <span className="xs:hidden">Call Us</span>
            </div>
            <div className="hidden sm:flex items-center space-x-1 sm:space-x-2">
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Nairobi, Kenya</span>
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
                <span className="text-white font-bold text-sm sm:text-lg">P</span>
              </div>
              <div>
                <h1 className="text-base sm:text-xl font-serif font-bold text-primary-700">
                  Patricia Hotel
                </h1>
                <p className="text-xs text-gray-500 -mt-1 hidden sm:block">Luxury & Comfort</p>
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
                {isMenuOpen ? (
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                ) : (
                  <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
                )}
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