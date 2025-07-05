// src/app/nightclub/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { NightclubMenu } from '../dining/MenuDisplay';
import { motion } from '@/components/ui/MotionWrapper';

const NightclubPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadNightclubData = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 800));
      setIsLoading(false);
    };
    loadNightclubData();
  }, []);

  const handleNightclubReservation = () => {
    window.location.href = '/contact?inquiry=nightclub';
  };

  // Mock data for nightclub menu
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

      {/* Nightclub Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 overflow-hidden"
      >
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

        {/* Spotlight Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-1/4 w-32 h-32 bg-yellow-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-20 right-1/4 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: '1s' }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: '2s' }}
          ></div>
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
                className="inline-flex items-center space-x-3 bg-red-500/20 backdrop-blur-sm rounded-full px-6 py-3 border border-red-400/30"
              >
                <div className="relative">
                  <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse block"></span>
                  <span className="absolute inset-0 w-3 h-3 bg-red-400 rounded-full animate-ping"></span>
                </div>
                <span className="text-sm font-semibold">
                  LIVE NOW • THU-SUN • 9PM-3AM
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight"
              >
                <span className="block bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                  Patricia's
                </span>
                <span className="block">Nightclub</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="text-xl text-gray-200 leading-relaxed"
              >
                Benin City's hottest nightlife destination. Where the best
                Afrobeats, Amapiano, and Naija vibes meet premium bottle service
                and VIP experiences.
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
                  <div className="text-yellow-400 font-bold text-lg">500+</div>
                  <div className="text-sm text-gray-300">VIP Guests Weekly</div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
                >
                  <div className="text-pink-400 font-bold text-lg">₦450K+</div>
                  <div className="text-sm text-gray-300">Bottle Service</div>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.4 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <motion.button
                  onClick={handleNightclubReservation}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
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
                </motion.button>
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center px-8 py-4 bg-white/20 text-white font-bold rounded-xl hover:bg-white/30 transition-all duration-300 backdrop-blur-sm border border-white/30"
                >
                  Contact Us
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Nightclub Visualization */}
            <motion.div
              initial={{ opacity: 0, x: 50, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="relative"
            >
              <motion.div
                whileHover={{ rotate: 6, scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="aspect-square bg-gradient-to-br from-purple-600 via-pink-600 to-yellow-500 rounded-3xl p-8 transform rotate-3 transition-all duration-500 relative overflow-hidden"
              >
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
        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-purple-900 to-pink-900 rounded-2xl p-8 text-white mb-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h3 className="font-serif text-3xl font-bold mb-4">
              The Ultimate Nightclub Experience
            </h3>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto">
              Step into Benin City's most exclusive nightclub where every night
              is a celebration of Afrobeats and Amapiano
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, staggerChildren: 0.2, delay: 0.4 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
            >
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
              <h4 className="font-bold mb-2">Top Nigerian DJs</h4>
              <p className="text-sm text-gray-300">
                The hottest Afrobeats and Amapiano DJs every weekend
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
            >
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
                Dedicated VIP hosts, premium bottle service, and exclusive areas
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
            >
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
              <h4 className="font-bold mb-2">Premium Sound</h4>
              <p className="text-sm text-gray-300">
                State-of-the-art sound system for the best Naija vibes
              </p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Menu Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <NightclubMenu categories={nightclubCategories} className="mb-16" />
        </motion.div>

        {/* Event Calendar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-16"
        >
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center font-serif text-2xl font-bold mb-8"
          >
            This Week's Lineup
          </motion.h3>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, staggerChildren: 0.1, delay: 0.4 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-xl p-4 text-center"
            >
              <div className="text-yellow-600 font-bold">THU</div>
              <div className="text-gray-900 text-sm mt-1">DJ Kess</div>
              <div className="text-gray-600 text-xs">Afrobeats Night</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ scale: 1.05 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-xl p-4 text-center"
            >
              <div className="text-pink-600 font-bold">FRI</div>
              <div className="text-gray-900 text-sm mt-1">DJ Big N</div>
              <div className="text-gray-600 text-xs">Naija Party Mix</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.08 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-xl p-4 text-center border-2 border-yellow-300"
            >
              <div className="text-yellow-600 font-bold">SAT</div>
              <div className="text-gray-900 text-sm mt-1">DJ Puffy</div>
              <div className="text-gray-600 text-xs">Amapiano Special</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-xl p-4 text-center"
            >
              <div className="text-purple-600 font-bold">SUN</div>
              <div className="text-gray-900 text-sm mt-1">DJ Zee</div>
              <div className="text-gray-600 text-xs">Afro-House Vibes</div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-center text-white"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="font-serif text-3xl font-bold mb-4"
          >
            Ready for the Ultimate Night Out?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-lg mb-8 max-w-2xl mx-auto opacity-90"
          >
            Experience Patricia's legendary nightclub with VIP treatment, the
            best Nigerian DJs, and unforgettable moments
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              onClick={handleNightclubReservation}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
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
            </motion.button>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center px-8 py-4 bg-white/20 text-white font-bold rounded-xl hover:bg-white/30 transition-all duration-300 backdrop-blur-sm border border-white/30"
            >
              Contact Us
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.main>

      <Footer />
    </motion.div>
  );
};

export default NightclubPage;
