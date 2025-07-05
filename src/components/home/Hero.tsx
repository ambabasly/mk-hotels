// src/components/home/Hero.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Hotel images for carousel
  const carouselImages = [
    '/images/hotel/image_1.jpeg',
    '/images/hotel/image-2.png',
    '/images/hotel/image_3.jpeg',
    '/images/hotel/image_4.jpeg'
  ];

  // Auto-slide functionality
  useEffect(() => {
    console.log('Hero carousel initialized with images:', carouselImages);
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        const nextSlide = (prev + 1) % carouselImages.length;
        console.log('Hero auto-advancing to slide:', nextSlide);
        return nextSlide;
      });
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [carouselImages.length]);

  // Manual slide navigation
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Image Carousel Background */}
      <div className="absolute inset-0 z-0">
        {/* Fallback gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-pink-800"></div>
        
        {carouselImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image}
              alt={`Patricia Hotel view ${index + 1}`}
              className="w-full h-full object-cover"
              onLoad={(e) => {
                console.log(`Hero image ${index + 1} loaded successfully:`, image);
              }}
              onError={(e) => {
                console.log(`Hero image ${index + 1} failed to load:`, image);
                // Keep the element but hide the image, showing fallback background
                e.currentTarget.style.opacity = '0';
              }}
            />
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-primary-900/70 to-pink-900/60"></div>
          </div>
        ))}
      </div>

      {/* Carousel Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
        <div className="flex space-x-3">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-white scale-125 shadow-lg'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 z-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="hero-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="1" fill="currentColor" />
              <circle cx="5" cy="5" r="0.5" fill="currentColor" />
              <circle cx="15" cy="15" r="0.5" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-pattern)" />
        </svg>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-5">
        <div className="absolute top-20 left-10 w-4 h-4 sm:w-6 sm:h-6 bg-yellow-400/30 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-20 w-3 h-3 sm:w-4 sm:h-4 bg-pink-400/30 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/3 left-1/4 w-5 h-5 sm:w-8 sm:h-8 bg-blue-400/20 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 right-1/3 w-2 h-2 sm:w-3 sm:h-3 bg-green-400/30 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
      </div>
      
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-6 sm:space-y-8 lg:space-y-10">
          {/* Welcome Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 sm:px-6 sm:py-3 mb-4">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-white text-sm sm:text-base font-medium">Welcome to Luxury</span>
          </div>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight">
              <span className="block">Patricia</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-200 to-purple-200">
                Hotel & Suites
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
              Experience unparalleled luxury with our premium accommodations, world-class dining, 
              and exclusive nightlife in the heart of the city.
            </p>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-white font-semibold text-sm sm:text-base mb-1">Luxury Suites</h3>
              <p className="text-gray-300 text-xs sm:text-sm">Premium accommodations</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
              <h3 className="text-white font-semibold text-sm sm:text-base mb-1">Fine Dining</h3>
              <p className="text-gray-300 text-xs sm:text-sm">World-class cuisine</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6 sm:col-span-1">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>
              <h3 className="text-white font-semibold text-sm sm:text-base mb-1">Nightclub</h3>
              <p className="text-gray-300 text-xs sm:text-sm">Exclusive entertainment</p>
            </div>
          </div>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center pt-4 sm:pt-6">
            <Link
              href="/rooms"
              className="w-full sm:w-auto bg-white text-primary-900 font-semibold py-4 px-8 sm:px-10 rounded-lg hover:bg-gray-100 transition-all duration-200 text-sm sm:text-base lg:text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Explore Rooms
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto bg-white/20 text-white font-semibold py-4 px-8 sm:px-10 rounded-lg hover:bg-white/30 transition-all duration-200 backdrop-blur-sm text-sm sm:text-base lg:text-lg border border-white/30 hover:border-white/50"
            >
              Contact Us
            </Link>
          </div>

          {/* Scroll Indicator */}
          <div className="hidden sm:block pt-8 lg:pt-12">
            <div className="flex flex-col items-center space-y-2 animate-bounce">
              <span className="text-white/70 text-sm">Discover More</span>
              <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
    </section>
  );
};

export default Hero;