// src/app/dining/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { DiningTabSystem } from './TabSystem';
import { RestaurantMenu, BarMenu, NightclubMenu } from './MenuDisplay';

const DiningPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('nightclub'); // Start with nightclub!

  useEffect(() => {
    const loadDiningData = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setIsLoading(false);
    };
    loadDiningData();
  }, []);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  const handleNightclubReservation = () => {
    window.location.href = '/contact?inquiry=nightclub';
  };

  const handleDiningReservation = () => {
    window.location.href = '/contact?inquiry=dining';
  };

  // Mock data for demonstration
  const nightclubCategories = [
    {
      id: 'bottle-service',
      name: 'VIP Bottle Service',
      description:
        'Premium bottle service with dedicated VIP host and prime table locations',
      items: [
        {
          id: 1,
          name: 'Dom Pérignon Vintage',
          description: 'Champagne service with sparklers and VIP treatment',
          price: 850,
          category: 'bottle-service',
          type: 'nightclub' as const,
        },
        {
          id: 2,
          name: 'Grey Goose Premium',
          description: 'Top-shelf vodka with premium mixers',
          price: 650,
          category: 'bottle-service',
          type: 'nightclub' as const,
        },
        {
          id: 3,
          name: 'Hennessy Paradis',
          description: 'Ultra-premium cognac for special occasions',
          price: 1200,
          category: 'bottle-service',
          type: 'nightclub' as const,
        },
        {
          id: 4,
          name: 'Clase Azul Reposado',
          description: 'Premium tequila with agave mixers',
          price: 750,
          category: 'bottle-service',
          type: 'nightclub' as const,
        },
      ],
    },
    {
      id: 'cocktails',
      name: 'Signature Cocktails',
      description: 'Handcrafted cocktails by our expert mixologists',
      items: [
        {
          id: 5,
          name: 'Neon Nights',
          description:
            'LED-illuminated cocktail with premium gin and exotic fruits',
          price: 22,
          category: 'cocktails',
          type: 'nightclub' as const,
        },
        {
          id: 6,
          name: 'VIP Martini',
          description: 'Gold-dusted martini with premium vodka',
          price: 28,
          category: 'cocktails',
          type: 'nightclub' as const,
        },
        {
          id: 7,
          name: 'Electric Storm',
          description: 'Color-changing cocktail with rum and tropical flavors',
          price: 25,
          category: 'cocktails',
          type: 'nightclub' as const,
        },
        {
          id: 8,
          name: 'Midnight Affair',
          description: 'Dark cocktail with whiskey and smoky elements',
          price: 24,
          category: 'cocktails',
          type: 'nightclub' as const,
        },
      ],
    },
  ];

  const restaurantCategories = [
    {
      id: 'appetizers',
      name: 'Appetizers',
      description: 'Start your evening with our exquisite appetizers',
      items: [
        {
          id: 9,
          name: 'Truffle Arancini',
          description: 'Crispy risotto balls with black truffle',
          price: 18,
          category: 'appetizers',
          type: 'restaurant' as const,
        },
        {
          id: 10,
          name: 'Tuna Tartare',
          description: 'Fresh tuna with avocado and citrus',
          price: 24,
          category: 'appetizers',
          type: 'restaurant' as const,
        },
      ],
    },
  ];

  const barCategories = [
    {
      id: 'wines',
      name: 'Premium Wines',
      description: 'Curated selection of international wines',
      items: [
        {
          id: 11,
          name: 'Château Margaux',
          description: 'Bordeaux red wine vintage 2015',
          price: 450,
          category: 'wines',
          type: 'bar' as const,
        },
        {
          id: 12,
          name: 'Dom Pérignon',
          description: 'Champagne vintage 2012',
          price: 320,
          category: 'wines',
          type: 'bar' as const,
        },
      ],
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-64 bg-gray-300 rounded-lg mb-8"></div>
            <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Nightclub Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <svg
            className="w-full h-full opacity-20"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <pattern
                id="club-pattern"
                x="0"
                y="0"
                width="10"
                height="10"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="5" cy="5" r="1" fill="currentColor">
                  <animate
                    attributeName="opacity"
                    values="0.2;1;0.2"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#club-pattern)" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="text-white space-y-8">
              <div className="inline-flex items-center space-x-3 bg-red-500/20 backdrop-blur-sm rounded-full px-6 py-3 border border-red-400/30">
                <div className="relative">
                  <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse block"></span>
                  <span className="absolute inset-0 w-3 h-3 bg-red-400 rounded-full animate-ping"></span>
                </div>
                <span className="text-sm font-semibold">
                  PATRICIA'S PREMIER DESTINATION
                </span>
              </div>

              <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="block bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                  Nightclub
                </span>
                <span className="block">Experience</span>
              </h1>

              <p className="text-xl text-gray-200 leading-relaxed">
                The city's most exclusive nightclub destination. Where
                world-class DJs, premium bottle service, and VIP experiences
                create nights that become legends.
              </p>

              {/* Key Features */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-yellow-400 font-bold text-lg">500+</div>
                  <div className="text-sm">VIP Guests Weekly</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-pink-400 font-bold text-lg">$450+</div>
                  <div className="text-sm">Bottle Service</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleNightclubReservation}
                  className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-xl hover:from-yellow-300 hover:to-orange-400 transition-all duration-300 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                      />
                    </svg>
                    <span>Reserve VIP Table</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </button>
                <button
                  onClick={() => setActiveTab('nightclub')}
                  className="inline-flex items-center justify-center px-8 py-4 bg-white/20 text-white font-bold rounded-xl hover:bg-white/30 transition-all duration-300 backdrop-blur-sm border border-white/30"
                >
                  View Full Experience
                </button>
              </div>
            </div>

            {/* Nightclub Visualization */}
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-purple-600 via-pink-600 to-yellow-500 rounded-3xl p-8 transform rotate-3 hover:rotate-6 transition-all duration-500 relative overflow-hidden">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 400 400"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Club Floor */}
                  <rect
                    x="50"
                    y="350"
                    width="300"
                    height="30"
                    fill="url(#floorGradient)"
                    rx="4"
                  />

                  {/* DJ Stage */}
                  <rect
                    x="120"
                    y="300"
                    width="160"
                    height="50"
                    fill="url(#stageGradient)"
                    rx="8"
                  />

                  {/* DJ Console */}
                  <rect
                    x="160"
                    y="280"
                    width="80"
                    height="20"
                    fill="#1F2937"
                    rx="4"
                  />

                  {/* DJ Figure */}
                  <circle cx="200" cy="270" r="10" fill="#FDE68A" />
                  <rect
                    x="192"
                    y="250"
                    width="16"
                    height="20"
                    fill="#374151"
                    rx="2"
                  />

                  {/* Sound Visualization */}
                  <g className="animate-pulse">
                    <circle
                      cx="200"
                      cy="260"
                      r="30"
                      stroke="#FBBF24"
                      strokeWidth="2"
                      fill="none"
                      opacity="0.8"
                    />
                    <circle
                      cx="200"
                      cy="260"
                      r="50"
                      stroke="#F59E0B"
                      strokeWidth="2"
                      fill="none"
                      opacity="0.6"
                    />
                    <circle
                      cx="200"
                      cy="260"
                      r="70"
                      stroke="#D97706"
                      strokeWidth="2"
                      fill="none"
                      opacity="0.4"
                    />
                  </g>

                  {/* Crowd */}
                  <g fill="#1F2937" opacity="0.7">
                    <ellipse cx="100" cy="370" rx="12" ry="25" />
                    <ellipse cx="130" cy="365" rx="10" ry="30" />
                    <ellipse cx="160" cy="360" rx="14" ry="35" />
                    <ellipse cx="200" cy="355" rx="16" ry="40" />
                    <ellipse cx="240" cy="360" rx="14" ry="35" />
                    <ellipse cx="270" cy="365" rx="10" ry="30" />
                    <ellipse cx="300" cy="370" rx="12" ry="25" />
                  </g>

                  {/* VIP Areas */}
                  <rect
                    x="80"
                    y="200"
                    width="60"
                    height="60"
                    fill="url(#vipGradient)"
                    rx="8"
                  />
                  <rect
                    x="260"
                    y="200"
                    width="60"
                    height="60"
                    fill="url(#vipGradient)"
                    rx="8"
                  />

                  {/* VIP Labels */}
                  <text
                    x="110"
                    y="230"
                    textAnchor="middle"
                    className="fill-yellow-300 text-xs font-bold"
                  >
                    VIP
                  </text>
                  <text
                    x="290"
                    y="230"
                    textAnchor="middle"
                    className="fill-yellow-300 text-xs font-bold"
                  >
                    VIP
                  </text>

                  {/* Disco Lights */}
                  <g>
                    <circle cx="120" cy="120" r="6" fill="#EF4444">
                      <animate
                        attributeName="opacity"
                        values="0.3;1;0.3"
                        dur="1s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    <circle cx="200" cy="100" r="6" fill="#10B981">
                      <animate
                        attributeName="opacity"
                        values="1;0.3;1"
                        dur="1.2s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    <circle cx="280" cy="120" r="6" fill="#3B82F6">
                      <animate
                        attributeName="opacity"
                        values="0.3;1;0.3"
                        dur="0.8s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  </g>

                  {/* Light Beams */}
                  <g opacity="0.7">
                    <path d="M120 126 L110 350 L130 350 Z" fill="url(#redBeam)">
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        values="0 120 126;15 120 126;0 120 126"
                        dur="3s"
                        repeatCount="indefinite"
                      />
                    </path>
                    <path
                      d="M200 106 L190 350 L210 350 Z"
                      fill="url(#greenBeam)"
                    >
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        values="0 200 106;-20 200 106;0 200 106"
                        dur="2.5s"
                        repeatCount="indefinite"
                      />
                    </path>
                    <path
                      d="M280 126 L270 350 L290 350 Z"
                      fill="url(#blueBeam)"
                    >
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        values="0 280 126;-10 280 126;0 280 126"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    </path>
                  </g>

                  {/* Bar */}
                  <rect
                    x="350"
                    y="250"
                    width="30"
                    height="100"
                    fill="url(#barGradient)"
                    rx="4"
                  />
                  <text
                    x="365"
                    y="300"
                    textAnchor="middle"
                    className="fill-white text-xs font-bold"
                  >
                    BAR
                  </text>

                  <defs>
                    <linearGradient
                      id="floorGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#374151" />
                      <stop offset="50%" stopColor="#1F2937" />
                      <stop offset="100%" stopColor="#374151" />
                    </linearGradient>
                    <linearGradient
                      id="stageGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#4B5563" />
                      <stop offset="100%" stopColor="#1F2937" />
                    </linearGradient>
                    <linearGradient
                      id="vipGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#FCD34D" stopOpacity="0.8" />
                      <stop
                        offset="100%"
                        stopColor="#F59E0B"
                        stopOpacity="0.6"
                      />
                    </linearGradient>
                    <linearGradient
                      id="barGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#6B21A8" />
                      <stop offset="100%" stopColor="#1E1B4B" />
                    </linearGradient>
                    <linearGradient
                      id="redBeam"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#EF4444" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#EF4444" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient
                      id="greenBeam"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#10B981" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient
                      id="blueBeam"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Hours Overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg p-3 text-center text-white border border-white/20">
                  <div className="font-bold">THU-SUN | 9PM-3AM</div>
                  <div className="text-xs opacity-75">21+ • Smart Casual</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Enhanced Tab System with Nightclub Focus */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Complete Dining Experience
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              From fine dining to exclusive nightlife, Patricia Hotel offers the
              city's most complete luxury experience
            </p>
          </div>

          <DiningTabSystem
            restaurantContent={
              <RestaurantMenu
                categories={restaurantCategories}
                className="mt-6"
              />
            }
            barContent={<BarMenu categories={barCategories} className="mt-6" />}
            nightclubContent={
              <div className="mt-6">
                {/* Enhanced Nightclub Content */}
                <div className="bg-gradient-to-br from-purple-900 to-pink-900 rounded-2xl p-8 text-white mb-8">
                  <div className="text-center mb-8">
                    <h3 className="font-serif text-3xl font-bold mb-4">
                      The Ultimate Nightclub Experience
                    </h3>
                    <p className="text-lg text-gray-200 max-w-2xl mx-auto">
                      Step into the city's most exclusive nightclub where every
                      night is a celebration
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                      <div className="w-12 h-12 bg-yellow-400/20 rounded-full flex items-center justify-center mb-4">
                        <svg
                          className="w-6 h-6 text-yellow-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                          />
                        </svg>
                      </div>
                      <h4 className="font-bold mb-2">World-Class DJs</h4>
                      <p className="text-sm text-gray-300">
                        International artists and chart-topping DJs every
                        weekend
                      </p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                      <div className="w-12 h-12 bg-pink-400/20 rounded-full flex items-center justify-center mb-4">
                        <svg
                          className="w-6 h-6 text-pink-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                          />
                        </svg>
                      </div>
                      <h4 className="font-bold mb-2">VIP Treatment</h4>
                      <p className="text-sm text-gray-300">
                        Dedicated VIP hosts, premium bottle service, and
                        exclusive areas
                      </p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                      <div className="w-12 h-12 bg-purple-400/20 rounded-full flex items-center justify-center mb-4">
                        <svg
                          className="w-6 h-6 text-purple-400"
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
                      <h4 className="font-bold mb-2">Premium Production</h4>
                      <p className="text-sm text-gray-300">
                        State-of-the-art sound, LED walls, and immersive
                        lighting
                      </p>
                    </div>
                  </div>
                </div>

                <NightclubMenu categories={nightclubCategories} className="" />
              </div>
            }
            onTabChange={handleTabChange}
            className="mb-16"
          />
        </div>

        {/* Enhanced Operating Hours with Nightclub Emphasis */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-8 text-center">
            Patricia's Dining & Entertainment Hours
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Restaurant */}
            <div className="text-center">
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
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="font-medium text-gray-900 mb-2">Restaurant</h3>
              <div className="space-y-1 text-sm text-gray-600">
                <p className="font-medium">Daily: 6:00 AM - 11:00 PM</p>
                <p className="text-xs">Breakfast, Lunch & Dinner</p>
              </div>
            </div>

            {/* Bar */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                  />
                </svg>
              </div>
              <h3 className="font-medium text-gray-900 mb-2">Bar & Lounge</h3>
              <div className="space-y-1 text-sm text-gray-600">
                <p className="font-medium">Daily: 4:00 PM - 2:00 AM</p>
                <p className="text-xs">Happy Hour: 4-7 PM</p>
              </div>
            </div>

            {/* Nightclub - Featured */}
            <div className="text-center relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl opacity-20"></div>
              <div className="relative bg-white rounded-lg p-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                    />
                  </svg>
                </div>
                <div className="inline-flex items-center space-x-1 bg-red-500/20 rounded-full px-3 py-1 mb-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                  <span className="text-red-700 text-xs font-bold">
                    FEATURED
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">
                  Exclusive Nightclub
                </h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <p className="font-bold text-purple-600">
                    Thu-Sun: 9:00 PM - 3:00 AM
                  </p>
                  <p className="text-xs">21+ • Smart Casual Dress Code</p>
                  <p className="text-xs font-medium text-pink-600">
                    VIP Reservations Available
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-center text-white">
          <h2 className="font-serif text-3xl font-bold mb-4">
            Ready for the Ultimate Night Out?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Experience Patricia's legendary nightclub with VIP treatment,
            world-class DJs, and unforgettable moments
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleNightclubReservation}
              className="group relative inline-flex items-center justify-center px-8 py-4 bg-white text-purple-600 font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10 flex items-center space-x-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
                <span>Reserve VIP Experience</span>
              </span>
            </button>
            <button
              onClick={handleDiningReservation}
              className="inline-flex items-center justify-center px-8 py-4 bg-white/20 text-white font-bold rounded-xl hover:bg-white/30 transition-all duration-300 backdrop-blur-sm border border-white/30"
            >
              Restaurant Reservations
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DiningPage;
