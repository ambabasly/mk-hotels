// src/app/page.tsx
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import FeaturedServices from '@/components/home/FeaturedServices';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      
      {/* Enhanced Nightclub Spotlight Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-primary-900 via-purple-900 to-pink-900 relative overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="nightclub-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="1" fill="currentColor" opacity="0.8">
                  <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="5" cy="5" r="0.5" fill="currentColor" opacity="0.6">
                  <animate attributeName="opacity" values="0.6;0.2;0.6" dur="3s" repeatCount="indefinite" />
                </circle>
                <circle cx="15" cy="15" r="0.5" fill="currentColor" opacity="0.4">
                  <animate attributeName="opacity" values="0.2;0.8;0.2" dur="2.5s" repeatCount="indefinite" />
                </circle>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#nightclub-pattern)" />
          </svg>
        </div>

        {/* Spotlight Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-1/4 w-32 h-32 bg-yellow-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-1/4 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Enhanced Header */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-red-500/20 to-pink-500/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-red-400/30">
              <div className="relative">
                <span className="w-4 h-4 bg-red-500 rounded-full animate-pulse block"></span>
                <span className="absolute inset-0 w-4 h-4 bg-red-400 rounded-full animate-ping"></span>
              </div>
              <span className="text-white text-sm sm:text-base font-semibold tracking-wide">LIVE NOW • THU-SUN • 9PM-3AM</span>
            </div>
            
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              <span className="block bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                The Night
              </span>
              <span className="block">Never Ends</span>
            </h2>
            
            <p className="text-lg sm:text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed mb-8">
              Benin City's premier nightclub destination - where top Nigerian DJs, Afrobeats rhythms, 
              premium bottle service, and VIP experiences create legendary nights that celebrate our vibrant culture.
            </p>

            {/* Key Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto mb-8">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-yellow-400">500+</div>
                <div className="text-xs sm:text-sm text-gray-300">VIP Guests</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-pink-400">4</div>
                <div className="text-xs sm:text-sm text-gray-300">Nights Weekly</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-purple-400">$450+</div>
                <div className="text-xs sm:text-sm text-gray-300">Bottle Service</div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Enhanced Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                {/* World-Class DJs */}
                <div className="flex items-start space-x-4 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full flex items-center justify-center flex-shrink-0 border border-yellow-400/30">
                    <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg mb-2">Nigerian DJ Lineup</h3>
                    <p className="text-gray-300 text-sm mb-3">Top Naija DJs spinning the hottest Afrobeats and Amapiano every weekend</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-yellow-400/20 text-yellow-200 text-xs rounded-full border border-yellow-400/30">Afrobeats</span>
                      <span className="px-3 py-1 bg-pink-400/20 text-pink-200 text-xs rounded-full border border-pink-400/30">Amapiano</span>
                      <span className="px-3 py-1 bg-purple-400/20 text-purple-200 text-xs rounded-full border border-purple-400/30">Afro-Fusion</span>
                    </div>
                  </div>
                </div>
                
                {/* VIP Bottle Service */}
                <div className="flex items-start space-x-4 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-400/20 to-red-500/20 rounded-full flex items-center justify-center flex-shrink-0 border border-pink-400/30">
                    <svg className="w-8 h-8 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg mb-2">Exclusive VIP Experience</h3>
                    <p className="text-gray-300 text-sm mb-3">Premium bottle service with dedicated staff and prime locations</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-pink-400/20 text-pink-200 text-xs rounded-full border border-pink-400/30">Dom Pérignon</span>
                      <span className="px-3 py-1 bg-purple-400/20 text-purple-200 text-xs rounded-full border border-purple-400/30">Grey Goose</span>
                      <span className="px-3 py-1 bg-yellow-400/20 text-yellow-200 text-xs rounded-full border border-yellow-400/30">Hennessy</span>
                    </div>
                  </div>
                </div>
                
                {/* Premium Experience */}
                <div className="flex items-start space-x-4 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-400/20 to-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 border border-purple-400/30">
                    <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg mb-2">Cutting-Edge Production</h3>
                    <p className="text-gray-300 text-sm mb-3">State-of-the-art sound system, LED walls, and immersive lighting</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-blue-400/20 text-blue-200 text-xs rounded-full border border-blue-400/30">L-Acoustics</span>
                      <span className="px-3 py-1 bg-green-400/20 text-green-200 text-xs rounded-full border border-green-400/30">LED Walls</span>
                      <span className="px-3 py-1 bg-red-400/20 text-red-200 text-xs rounded-full border border-red-400/30">Laser Shows</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Enhanced CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/nightclub"
                  className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-xl hover:from-yellow-300 hover:to-orange-400 transition-all duration-300 text-base overflow-hidden"
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                    </svg>
                    <span>Experience the Nightclub</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </a>
                <a
                  href="/contact?inquiry=nightclub"
                  className="group relative inline-flex items-center justify-center px-8 py-4 bg-white/20 text-white font-bold rounded-xl hover:bg-white/30 transition-all duration-300 backdrop-blur-sm border border-white/30 hover:border-white/50 text-base"
                >
                  <span className="flex items-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                    <span>Book VIP Table</span>
                  </span>
                </a>
              </div>
            </div>
            
            {/* Enhanced Visual with Custom SVG */}
            <div className="relative">
              {/* Main Nightclub Visual */}
              <div className="aspect-square bg-gradient-to-br from-purple-600 via-pink-600 to-yellow-500 rounded-3xl p-8 transform rotate-2 hover:rotate-6 transition-all duration-500 relative overflow-hidden group">
                {/* Disco Ball Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20 rounded-3xl"></div>
                
                {/* Custom Nightclub Scene SVG */}
                <div className="h-full relative z-10">
                  <svg className="w-full h-full" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Stage */}
                    <rect x="50" y="320" width="300" height="60" fill="url(#stageGradient)" rx="8"/>
                    
                    {/* DJ Booth */}
                    <rect x="150" y="280" width="100" height="40" fill="url(#djBoothGradient)" rx="8"/>
                    
                    {/* DJ Figure */}
                    <circle cx="200" cy="270" r="12" fill="#FDE68A"/>
                    <rect x="190" y="250" width="20" height="25" fill="#374151" rx="4"/>
                    
                    {/* Sound Waves */}
                    <g className="animate-pulse">
                      <circle cx="200" cy="260" r="40" stroke="#FBBF24" strokeWidth="2" fill="none" opacity="0.6"/>
                      <circle cx="200" cy="260" r="60" stroke="#F59E0B" strokeWidth="2" fill="none" opacity="0.4"/>
                      <circle cx="200" cy="260" r="80" stroke="#D97706" strokeWidth="2" fill="none" opacity="0.2"/>
                    </g>
                    
                    {/* Crowd Silhouettes */}
                    <g fill="#1F2937" opacity="0.8">
                      <ellipse cx="100" cy="350" rx="15" ry="30"/>
                      <ellipse cx="130" cy="345" rx="12" ry="35"/>
                      <ellipse cx="160" cy="340" rx="18" ry="40"/>
                      <ellipse cx="240" cy="340" rx="18" ry="40"/>
                      <ellipse cx="270" cy="345" rx="12" ry="35"/>
                      <ellipse cx="300" cy="350" rx="15" ry="30"/>
                    </g>
                    
                    {/* Lights */}
                    <g>
                      <circle cx="100" cy="100" r="8" fill="#EF4444">
                        <animate attributeName="opacity" values="0.3;1;0.3" dur="1s" repeatCount="indefinite"/>
                      </circle>
                      <circle cx="200" cy="80" r="8" fill="#10B981">
                        <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite"/>
                      </circle>
                      <circle cx="300" cy="100" r="8" fill="#3B82F6">
                        <animate attributeName="opacity" values="0.3;1;0.3" dur="0.8s" repeatCount="indefinite"/>
                      </circle>
                    </g>
                    
                    {/* Light Beams */}
                    <g opacity="0.6">
                      <path d="M100 108 L90 350 L110 350 Z" fill="url(#lightBeam1)">
                        <animateTransform attributeName="transform" type="rotate" values="0 100 108;10 100 108;0 100 108" dur="3s" repeatCount="indefinite"/>
                      </path>
                      <path d="M200 88 L190 350 L210 350 Z" fill="url(#lightBeam2)">
                        <animateTransform attributeName="transform" type="rotate" values="0 200 88;-15 200 88;0 200 88" dur="2.5s" repeatCount="indefinite"/>
                      </path>
                      <path d="M300 108 L290 350 L310 350 Z" fill="url(#lightBeam3)">
                        <animateTransform attributeName="transform" type="rotate" values="0 300 108;15 300 108;0 300 108" dur="2s" repeatCount="indefinite"/>
                      </path>
                    </g>
                    
                    {/* VIP Area */}
                    <rect x="320" y="200" width="60" height="80" fill="url(#vipGradient)" rx="8"/>
                    <text x="350" y="240" textAnchor="middle" className="fill-yellow-300 text-xs font-bold">VIP</text>
                    
                    <defs>
                      <linearGradient id="stageGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#1F2937"/>
                        <stop offset="100%" stopColor="#374151"/>
                      </linearGradient>
                      <linearGradient id="djBoothGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#4B5563"/>
                        <stop offset="100%" stopColor="#1F2937"/>
                      </linearGradient>
                      <linearGradient id="vipGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FCD34D" stopOpacity="0.8"/>
                        <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.6"/>
                      </linearGradient>
                      <linearGradient id="lightBeam1" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#EF4444" stopOpacity="0.8"/>
                        <stop offset="100%" stopColor="#EF4444" stopOpacity="0"/>
                      </linearGradient>
                      <linearGradient id="lightBeam2" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#10B981" stopOpacity="0.8"/>
                        <stop offset="100%" stopColor="#10B981" stopOpacity="0"/>
                      </linearGradient>
                      <linearGradient id="lightBeam3" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8"/>
                        <stop offset="100%" stopColor="#3B82F6" stopOpacity="0"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                
                {/* Operating Hours Overlay */}
                <div className="absolute bottom-6 left-6 right-6 bg-black/40 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
                  <div className="text-white space-y-2">
                    <div className="text-xl sm:text-2xl font-bold">THU-SUN</div>
                    <div className="text-base sm:text-lg">9 PM - 3 AM</div>
                    <div className="text-xs sm:text-sm opacity-75">21+ • Smart Casual Dress Code</div>
                  </div>
                </div>
              </div>
              
              {/* Enhanced Floating Elements */}
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-bounce flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <div className="absolute -bottom-4 -right-4 w-10 h-10 bg-gradient-to-br from-pink-400 to-red-500 rounded-full animate-bounce flex items-center justify-center" style={{animationDelay: '0.5s'}}>
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="absolute top-1/2 -right-8 w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full animate-bounce flex items-center justify-center" style={{animationDelay: '1s'}}>
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13" />
                </svg>
              </div>
            </div>
          </div>

          {/* Event Calendar Preview */}
          <div className="mt-16 bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h3 className="text-center text-white font-serif text-2xl sm:text-3xl font-bold mb-8">This Week's Lineup</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white/10 rounded-xl p-4 text-center border border-white/20">
                <div className="text-yellow-400 font-bold">THU</div>
                <div className="text-white text-sm mt-1">DJ Spinall</div>
                <div className="text-gray-300 text-xs">Afrobeats Mix</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 text-center border border-white/20">
                <div className="text-pink-400 font-bold">FRI</div>
                <div className="text-white text-sm mt-1">DJ Cuppy</div>
                <div className="text-gray-300 text-xs">Afro-Fusion</div>
              </div>
              <div className="bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-xl p-4 text-center border-2 border-yellow-400/50">
                <div className="text-yellow-400 font-bold">SAT</div>
                <div className="text-white text-sm mt-1">DJ Neptune</div>
                <div className="text-gray-300 text-xs">Amapiano Night</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 text-center border border-white/20">
                <div className="text-purple-400 font-bold">SUN</div>
                <div className="text-white text-sm mt-1">DJ Obi</div>
                <div className="text-gray-300 text-xs">Naija Vibes</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <FeaturedServices />
      <Footer />
    </main>
  );
}