// src/app/dining/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { DiningTabSystem } from './TabSystem';
import { RestaurantMenu, BarMenu } from './MenuDisplay';
import { motion } from '@/components/ui/MotionWrapper';

const DiningPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('restaurant'); // Start with restaurant

  useEffect(() => {
    const loadDiningData = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsLoading(false);
    };
    loadDiningData();
  }, []);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  const handleDiningReservation = () => {
    window.location.href = '/contact?inquiry=dining';
  };

  // Restaurant categories
  const restaurantCategories = [
    {
      id: 'appetizers',
      name: 'Appetizers',
      description: 'Start your evening with our exquisite appetizers',
      items: [
        {
          id: 1,
          name: 'Truffle Arancini',
          description: 'Crispy risotto balls with black truffle and parmesan',
          price: 18,
          category: 'appetizers',
          type: 'restaurant' as const,
        },
        {
          id: 2,
          name: 'Tuna Tartare',
          description: 'Fresh yellowfin tuna with avocado, citrus, and sesame',
          price: 24,
          category: 'appetizers',
          type: 'restaurant' as const,
        },
        {
          id: 3,
          name: 'Foie Gras Terrine',
          description: 'Classic French terrine with brioche and fig compote',
          price: 32,
          category: 'appetizers',
          type: 'restaurant' as const,
        },
        {
          id: 4,
          name: 'Oyster Selection',
          description:
            'Daily selection of fresh oysters with classic accompaniments',
          price: 28,
          category: 'appetizers',
          type: 'restaurant' as const,
        },
      ],
    },
    {
      id: 'mains',
      name: 'Main Courses',
      description: 'Expertly crafted entrees featuring the finest ingredients',
      items: [
        {
          id: 5,
          name: 'Wagyu Beef Tenderloin',
          description:
            'Premium wagyu with roasted vegetables and red wine reduction',
          price: 85,
          category: 'mains',
          type: 'restaurant' as const,
        },
        {
          id: 6,
          name: 'Pan-Seared Halibut',
          description:
            'Atlantic halibut with lemon butter sauce and seasonal vegetables',
          price: 42,
          category: 'mains',
          type: 'restaurant' as const,
        },
        {
          id: 7,
          name: 'Duck Confit',
          description:
            'Slow-cooked duck leg with cherry gastrique and potato gratin',
          price: 38,
          category: 'mains',
          type: 'restaurant' as const,
        },
        {
          id: 8,
          name: 'Lobster Thermidor',
          description: 'Classic preparation with cognac cream sauce',
          price: 65,
          category: 'mains',
          type: 'restaurant' as const,
        },
      ],
    },
    {
      id: 'desserts',
      name: 'Desserts',
      description: 'Decadent endings to your culinary journey',
      items: [
        {
          id: 9,
          name: 'Chocolate Soufflé',
          description: 'Rich dark chocolate soufflé with vanilla ice cream',
          price: 16,
          category: 'desserts',
          type: 'restaurant' as const,
        },
        {
          id: 10,
          name: 'Crème Brûlée',
          description: 'Classic vanilla custard with caramelized sugar',
          price: 14,
          category: 'desserts',
          type: 'restaurant' as const,
        },
      ],
    },
  ];

  // Bar categories
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
        {
          id: 13,
          name: 'Opus One',
          description: 'Napa Valley Cabernet Sauvignon blend 2018',
          price: 380,
          category: 'wines',
          type: 'bar' as const,
        },
      ],
    },
    {
      id: 'cocktails',
      name: 'Signature Cocktails',
      description: 'Handcrafted cocktails by expert mixologists',
      items: [
        {
          id: 14,
          name: "Patricia's Old Fashioned",
          description: 'Premium bourbon with house-made bitters and orange',
          price: 18,
          category: 'cocktails',
          type: 'bar' as const,
        },
        {
          id: 15,
          name: 'Garden Martini',
          description: 'Gin infused with fresh herbs and cucumber',
          price: 16,
          category: 'cocktails',
          type: 'bar' as const,
        },
        {
          id: 16,
          name: 'Smoke & Mirrors',
          description: 'Mezcal with smoked salt rim and lime',
          price: 17,
          category: 'cocktails',
          type: 'bar' as const,
        },
      ],
    },
    {
      id: 'spirits',
      name: 'Premium Spirits',
      description: 'Rare and aged spirits from around the world',
      items: [
        {
          id: 17,
          name: 'Macallan 25 Year',
          description: 'Single malt Scotch whisky, aged 25 years',
          price: 120,
          category: 'spirits',
          type: 'bar' as const,
        },
        {
          id: 18,
          name: 'Hennessy Paradis',
          description: 'Ultra-premium cognac blend',
          price: 95,
          category: 'spirits',
          type: 'bar' as const,
        },
      ],
    },
  ];

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="min-h-screen bg-gray-50"
      >
        <Navigation />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        >
          <motion.div className="animate-pulse">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="h-64 bg-gray-300 rounded-lg mb-8"
            ></motion.div>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '75%' }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="h-8 bg-gray-300 rounded mb-4"
            ></motion.div>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '50%' }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="h-4 bg-gray-300 rounded"
            ></motion.div>
          </motion.div>
        </motion.div>
        <Footer />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gray-50"
    >
      <Navigation />

      {/* Dining Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative py-20 bg-gradient-to-br from-amber-900 via-orange-900 to-red-900 overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <pattern
                id="dining-pattern"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="10" cy="10" r="1" fill="currentColor" opacity="0.5">
                  <animate
                    attributeName="opacity"
                    values="0.2;0.8;0.2"
                    dur="4s"
                    repeatCount="indefinite"
                  />
                </circle>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dining-pattern)" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-white space-y-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="inline-flex items-center space-x-3 bg-amber-500/20 backdrop-blur-sm rounded-full px-6 py-3 border border-amber-400/30"
              >
                <svg
                  className="w-4 h-4 text-amber-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-sm font-semibold">
                  AWARD-WINNING CUISINE
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight"
              >
                <span className="block bg-gradient-to-r from-amber-300 via-orange-300 to-red-300 bg-clip-text text-transparent">
                  Fine Dining
                </span>
                <span className="block">Excellence</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="text-xl text-gray-200 leading-relaxed"
              >
                Experience culinary artistry at Patricia Hotel. Our world-class
                chefs create exceptional dishes using the finest ingredients,
                paired with an extensive wine collection and premium spirits.
              </motion.p>

              {/* Key Features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="grid grid-cols-2 gap-4 sm:gap-8 max-w-2xl"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
                >
                  <div className="text-amber-400 font-bold text-lg">5-Star</div>
                  <div className="text-sm text-gray-300">Michelin Rating</div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
                >
                  <div className="text-orange-400 font-bold text-lg">500+</div>
                  <div className="text-sm text-gray-300">Wine Selection</div>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.4 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <motion.button
                  onClick={handleDiningReservation}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-xl hover:from-amber-400 hover:to-orange-500 transition-all duration-300 overflow-hidden"
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
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span>Make Reservation</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </motion.button>
                <motion.a
                  href="/nightclub"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center px-8 py-4 bg-white/20 text-white font-bold rounded-xl hover:bg-white/30 transition-all duration-300 backdrop-blur-sm border border-white/30"
                >
                  Experience Nightclub
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Dining Visualization */}
            <motion.div
              initial={{ opacity: 0, x: 50, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="relative"
            >
              <motion.div
                whileHover={{ rotate: 6, scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="aspect-square bg-gradient-to-br from-amber-600 via-orange-600 to-red-600 rounded-3xl p-8 transform rotate-2 transition-all duration-500 relative overflow-hidden"
              >
                <svg
                  className="w-full h-full"
                  viewBox="0 0 400 400"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Restaurant Tables */}
                  <circle cx="120" cy="150" r="40" fill="url(#tableGradient)" />
                  <circle cx="280" cy="150" r="40" fill="url(#tableGradient)" />
                  <circle cx="200" cy="250" r="40" fill="url(#tableGradient)" />

                  {/* Chairs */}
                  <circle cx="90" cy="130" r="12" fill="#8B5CF6" />
                  <circle cx="150" cy="130" r="12" fill="#8B5CF6" />
                  <circle cx="250" cy="130" r="12" fill="#8B5CF6" />
                  <circle cx="310" cy="130" r="12" fill="#8B5CF6" />

                  {/* Chef Station */}
                  <rect
                    x="160"
                    y="320"
                    width="80"
                    height="60"
                    fill="url(#kitchenGradient)"
                    rx="8"
                  />
                  <circle cx="200" cy="310" r="8" fill="#FDE68A" />

                  {/* Wine Display */}
                  <rect
                    x="50"
                    y="80"
                    width="20"
                    height="40"
                    fill="#7C2D12"
                    rx="2"
                  />
                  <rect
                    x="75"
                    y="70"
                    width="20"
                    height="50"
                    fill="#7C2D12"
                    rx="2"
                  />
                  <rect
                    x="100"
                    y="85"
                    width="20"
                    height="35"
                    fill="#7C2D12"
                    rx="2"
                  />

                  {/* Ambient Lighting */}
                  <circle cx="200" cy="50" r="8" fill="#FCD34D" opacity="0.8">
                    <animate
                      attributeName="opacity"
                      values="0.6;1;0.6"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <circle cx="120" cy="80" r="6" fill="#FCD34D" opacity="0.6">
                    <animate
                      attributeName="opacity"
                      values="0.8;0.4;0.8"
                      dur="3s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <circle cx="280" cy="80" r="6" fill="#FCD34D" opacity="0.6">
                    <animate
                      attributeName="opacity"
                      values="0.4;0.9;0.4"
                      dur="2.5s"
                      repeatCount="indefinite"
                    />
                  </circle>

                  <defs>
                    <linearGradient
                      id="tableGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#F3E8FF" />
                      <stop offset="100%" stopColor="#DDD6FE" />
                    </linearGradient>
                    <linearGradient
                      id="kitchenGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#6B7280" />
                      <stop offset="100%" stopColor="#374151" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Hours Overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg p-3 text-center text-white border border-white/20">
                  <div className="font-bold">DAILY | 6AM-11PM</div>
                  <div className="text-xs opacity-75">
                    Breakfast • Lunch • Dinner
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        {/* Tab System - Restaurant & Bar Only */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Dining Experience
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              From fine dining to premium cocktails, Patricia Hotel offers
              exceptional culinary experiences
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <DiningTabSystem
              restaurantContent={
                <RestaurantMenu
                  categories={restaurantCategories}
                  className="mt-6"
                />
              }
              barContent={
                <BarMenu categories={barCategories} className="mt-6" />
              }
              onTabChange={handleTabChange}
              className="mb-16"
            />
          </motion.div>
        </motion.div>

        {/* Operating Hours */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="font-serif text-2xl font-semibold text-gray-900 mb-8 text-center"
          >
            Dining Hours
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, staggerChildren: 0.2, delay: 0.4 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* Restaurant */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
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
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="font-medium text-gray-900 mb-2">Restaurant</h3>
              <div className="space-y-1 text-sm text-gray-600">
                <p className="font-medium">Daily: 6:00 AM - 11:00 PM</p>
                <p className="text-xs">Breakfast: 6AM-11AM</p>
                <p className="text-xs">Lunch: 11AM-5PM</p>
                <p className="text-xs">Dinner: 5PM-11PM</p>
              </div>
            </motion.div>

            {/* Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
              viewport={{ once: true }}
              className="text-center"
            >
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
                <p className="text-xs">Light Bites Available</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl p-8 text-center text-white"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="font-serif text-3xl font-bold mb-4"
          >
            Ready for an Exceptional Dining Experience?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-lg mb-8 max-w-2xl mx-auto opacity-90"
          >
            Reserve your table today and indulge in world-class cuisine and
            premium beverages
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              onClick={handleDiningReservation}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-amber-600 font-bold rounded-xl hover:bg-gray-100 transition-all duration-300"
            >
              <span className="flex items-center space-x-2">
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
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>Make Reservation</span>
              </span>
            </motion.button>
            <motion.a
              href="/nightclub"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center px-8 py-4 bg-white/20 text-white font-bold rounded-xl hover:bg-white/30 transition-all duration-300 backdrop-blur-sm border border-white/30"
            >
              Explore Nightclub
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.main>

      <Footer />
    </motion.div>
  );
};

export default DiningPage;
