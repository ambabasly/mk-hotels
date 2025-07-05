// src/app/gallery/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import ImageGallery from '@/components/gallery/ImageGallery';
import LoadingSkeleton, { PageSkeleton, GalleryImageSkeleton } from '@/components/ui/LoadingSkeleton';
import Button from '@/components/ui/Button';
import { motion } from '@/components/ui/MotionWrapper';

// Import gallery data (in real app, this would be API calls)
import galleryData from '@/data/gallery.json';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  title?: string;
  description?: string;
  category: string;
  thumbnail?: string;
}

const GalleryPage = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('grid');
  const [sortBy, setSortBy] = useState<'newest' | 'category' | 'title'>('category');

  // Available images to use randomly
  const availableImages = [
    '/images/hotel/image_1.jpeg',
    '/images/hotel/image-2.png', 
    '/images/hotel/image_3.jpeg',
    '/images/hotel/image_4.jpeg'  
  ];

  // Function to get random image
  const getRandomImage = () => {
    return availableImages[Math.floor(Math.random() * availableImages.length)];
  };

  // PDF Download functionality
  const downloadPDFBrochure = async () => {
    setIsGeneratingPDF(true);
    
    try {
      // Dynamic import of jsPDF to avoid SSR issues
      const { jsPDF } = await import('jspdf');
      
      const pdf = new jsPDF();
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      
      // Cover Page
      pdf.setFillColor(25, 25, 112); // Dark blue background
      pdf.rect(0, 0, pageWidth, pageHeight, 'F');
      
      // Title
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(32);
      pdf.setFont('helvetica', 'bold');
      pdf.text('PATRICIA HOTEL', pageWidth / 2, 60, { align: 'center' });
      
      pdf.setFontSize(18);
      pdf.setFont('helvetica', 'normal');
      pdf.text('Luxury • Elegance • Excellence', pageWidth / 2, 80, { align: 'center' });
      
      // Decorative line
      pdf.setDrawColor(255, 215, 0); // Gold color
      pdf.setLineWidth(2);
      pdf.line(50, 100, pageWidth - 50, 100);
      
      // Hotel description
      pdf.setFontSize(12);
      pdf.setTextColor(240, 240, 240);
      const description = [
        'Experience unparalleled luxury at Patricia Hotel,',
        'where elegance meets modern sophistication.',
        '',
        'From our exquisite rooms and world-class dining',
        'to our vibrant nightlife and premium facilities,',
        'every detail is crafted for your comfort.'
      ];
      
      description.forEach((line, index) => {
        pdf.text(line, pageWidth / 2, 130 + (index * 15), { align: 'center' });
      });
      
      // Contact information
      pdf.setFontSize(10);
      pdf.setTextColor(255, 215, 0);
      pdf.text('www.patriciahotel.com | info@patriciahotel.com | +1 (555) 123-4567', 
               pageWidth / 2, 220, { align: 'center' });
      
      // Page 2 - Gallery Overview
      pdf.addPage();
      pdf.setFillColor(255, 255, 255);
      pdf.rect(0, 0, pageWidth, pageHeight, 'F');
      
      // Header
      pdf.setTextColor(25, 25, 112);
      pdf.setFontSize(24);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Photo Gallery', 20, 30);
      
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`Featuring ${images.length} professional photographs across ${categories.length - 1} categories`, 20, 45);
      
      // Categories summary
      let yPosition = 70;
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Our Facilities:', 20, yPosition);
      
      yPosition += 20;
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'normal');
      
      const categoryDescriptions = {
        'hotel': 'Stunning architecture and elegant facades showcasing our premium location',
        'rooms': 'Luxuriously appointed accommodations with breathtaking views',
        'restaurant': 'Fine dining experiences with world-class culinary artistry',
        'bar': 'Sophisticated lounges and expert mixology in elegant settings',
        'nightclub': 'Vibrant nightlife with state-of-the-art entertainment systems',
        'facilities': 'Premium amenities including spa, fitness center, and swimming pool'
      };
      
      categories.slice(1).forEach((category) => {
        const count = getCategoryCount(category);
        const name = formatCategoryName(category);
        const desc = categoryDescriptions[category as keyof typeof categoryDescriptions] || '';
        
        pdf.setFont('helvetica', 'bold');
        pdf.text(`${name} (${count} photos)`, 20, yPosition);
        pdf.setFont('helvetica', 'normal');
        pdf.text(desc, 20, yPosition + 10);
        yPosition += 25;
      });
      
      // Page 3 - Featured Images (mock layout since we can't load actual images in this context)
      pdf.addPage();
      pdf.setFillColor(255, 255, 255);
      pdf.rect(0, 0, pageWidth, pageHeight, 'F');
      
      pdf.setTextColor(25, 25, 112);
      pdf.setFontSize(24);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Featured Highlights', 20, 30);
      
      // Create placeholder rectangles for images with descriptions
      const featuredHighlights = [
        { title: 'Luxury Accommodations', desc: 'Elegantly designed rooms with premium amenities' },
        { title: 'Fine Dining Experience', desc: 'Award-winning cuisine in sophisticated settings' },
        { title: 'Premium Facilities', desc: 'World-class spa, fitness center, and recreation' },
        { title: 'Vibrant Nightlife', desc: 'Exclusive entertainment and premium bar service' }
      ];
      
      let currentY = 50;
      featuredHighlights.forEach((highlight, index) => {
        // Image placeholder
        pdf.setFillColor(240, 240, 240);
        pdf.rect(20, currentY, 80, 50, 'F');
        pdf.setDrawColor(200, 200, 200);
        pdf.rect(20, currentY, 80, 50);
        
        // Image label
        pdf.setTextColor(150, 150, 150);
        pdf.setFontSize(10);
        pdf.text('Photo', 60, currentY + 25, { align: 'center' });
        
        // Description
        pdf.setTextColor(25, 25, 112);
        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'bold');
        pdf.text(highlight.title, 110, currentY + 15);
        
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        pdf.text(highlight.desc, 110, currentY + 30);
        
        currentY += 70;
      });
      
      // Page 4 - Contact & Booking
      pdf.addPage();
      pdf.setFillColor(25, 25, 112);
      pdf.rect(0, 0, pageWidth, pageHeight, 'F');
      
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(28);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Ready to Experience Luxury?', pageWidth / 2, 60, { align: 'center' });
      
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'normal');
      pdf.text('Book your stay today and discover what makes Patricia Hotel extraordinary', 
               pageWidth / 2, 85, { align: 'center' });
      
      // Contact details
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(255, 215, 0);
      pdf.text('Contact Information:', pageWidth / 2, 120, { align: 'center' });
      
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(255, 255, 255);
      const contactInfo = [
        'Phone: +1 (555) 123-4567',
        'Email: reservations@patriciahotel.com',
        'Website: www.patriciahotel.com',
        '',
        'Address:',
        '123 Luxury Boulevard',
        'Premium District, City 12345'
      ];
      
      contactInfo.forEach((line, index) => {
        pdf.text(line, pageWidth / 2, 140 + (index * 12), { align: 'center' });
      });
      
      // Generate and download
      const pdfBlob = pdf.output('blob');
      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Patricia-Hotel-Gallery-Brochure.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Sorry, there was an error generating the PDF. Please try again later.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  // Load gallery data
  useEffect(() => {
    const loadGallery = async () => {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create extended images using random existing images
      const extendedImages = [
        ...galleryData.images.map(img => ({
          ...img,
          src: getRandomImage(),
          thumbnail: getRandomImage()
        })),
        // Add more hotel images
        {
          id: 'hotel-3',
          src: getRandomImage(),
          alt: 'Hotel pool deck',
          title: 'Pool Deck',
          description: 'Rooftop infinity pool with panoramic city views',
          category: 'hotel',
          thumbnail: getRandomImage()
        },
        {
          id: 'hotel-4',
          src: getRandomImage(),
          alt: 'Hotel facade at night',
          title: 'Evening Facade',
          description: 'Patricia Hotel illuminated against the night sky',
          category: 'hotel',
          thumbnail: getRandomImage()
        },
        {
          id: 'hotel-5',
          src: getRandomImage(),
          alt: 'Hotel lobby',
          title: 'Grand Lobby',
          description: 'Elegant entrance with marble finishes',
          category: 'hotel',
          thumbnail: getRandomImage()
        },
        // Add more room images
        {
          id: 'room-4',
          src: getRandomImage(),
          alt: 'Presidential suite',
          title: 'Presidential Suite',
          description: 'Ultimate luxury with panoramic ocean views',
          category: 'rooms',
          thumbnail: getRandomImage()
        },
        {
          id: 'room-5',
          src: getRandomImage(),
          alt: 'Luxury bathroom',
          title: 'Marble Bathroom',
          description: 'Spa-inspired bathroom with premium finishes',
          category: 'rooms',
          thumbnail: getRandomImage()
        },
        {
          id: 'room-6',
          src: getRandomImage(),
          alt: 'Ocean view room',
          title: 'Ocean View Suite',
          description: 'Breathtaking ocean views from every window',
          category: 'rooms',
          thumbnail: getRandomImage()
        },
        // Add more restaurant images
        {
          id: 'restaurant-3',
          src: getRandomImage(),
          alt: 'Chef in kitchen',
          title: 'Culinary Artistry',
          description: 'Our award-winning chef preparing signature dishes',
          category: 'restaurant',
          thumbnail: getRandomImage()
        },
        {
          id: 'restaurant-4',
          src: getRandomImage(),
          alt: 'Private dining room',
          title: 'Private Dining',
          description: 'Intimate dining space for special occasions',
          category: 'restaurant',
          thumbnail: getRandomImage()
        },
        {
          id: 'restaurant-5',
          src: getRandomImage(),
          alt: 'Fine dining setup',
          title: 'Fine Dining Experience',
          description: 'Elegant table settings for memorable meals',
          category: 'restaurant',
          thumbnail: getRandomImage()
        },
        // Add bar images
        {
          id: 'bar-2',
          src: getRandomImage(),
          alt: 'Bartender creating cocktail',
          title: 'Mixology Excellence',
          description: 'Expert mixologists crafting signature cocktails',
          category: 'bar',
          thumbnail: getRandomImage()
        },
        {
          id: 'bar-3',
          src: getRandomImage(),
          alt: 'Wine cellar',
          title: 'Wine Cellar',
          description: 'Temperature-controlled cellar with rare vintages',
          category: 'bar',
          thumbnail: getRandomImage()
        },
        {
          id: 'bar-4',
          src: getRandomImage(),
          alt: 'Bar atmosphere',
          title: 'Evening Bar',
          description: 'Sophisticated atmosphere for evening drinks',
          category: 'bar',
          thumbnail: getRandomImage()
        },
        // Add nightclub images
        {
          id: 'nightclub-2',
          src: getRandomImage(),
          alt: 'DJ booth in action',
          title: 'DJ Experience',
          description: 'World-class DJs spinning the latest hits',
          category: 'nightclub',
          thumbnail: getRandomImage()
        },
        {
          id: 'nightclub-3',
          src: getRandomImage(),
          alt: 'VIP seating area',
          title: 'VIP Lounge',
          description: 'Exclusive VIP seating with bottle service',
          category: 'nightclub',
          thumbnail: getRandomImage()
        },
        {
          id: 'nightclub-4',
          src: getRandomImage(),
          alt: 'Dance floor',
          title: 'Dance Floor',
          description: 'State-of-the-art lighting and sound system',
          category: 'nightclub',
          thumbnail: getRandomImage()
        },
        {
          id: 'nightclub-5',
          src: getRandomImage(),
          alt: 'Nightclub atmosphere',
          title: 'Night Vibes',
          description: 'Electric atmosphere with premium entertainment',
          category: 'nightclub',
          thumbnail: getRandomImage()
        },
        // Add facilities images
        {
          id: 'facilities-3',
          src: getRandomImage(),
          alt: 'Fitness center',
          title: 'Fitness Center',
          description: 'State-of-the-art equipment with personal training',
          category: 'facilities',
          thumbnail: getRandomImage()
        },
        {
          id: 'facilities-4',
          src: getRandomImage(),
          alt: 'Rooftop terrace',
          title: 'Rooftop Terrace',
          description: 'Panoramic terrace perfect for events and relaxation',
          category: 'facilities',
          thumbnail: getRandomImage()
        },
        {
          id: 'facilities-5',
          src: getRandomImage(),
          alt: 'Swimming pool',
          title: 'Swimming Pool',
          description: 'Olympic-sized pool with poolside service',
          category: 'facilities',
          thumbnail: getRandomImage()
        },
        {
          id: 'facilities-6',
          src: getRandomImage(),
          alt: 'Spa area',
          title: 'Spa & Wellness',
          description: 'Relaxing spa treatments and wellness services',
          category: 'facilities',
          thumbnail: getRandomImage()
        }
      ];
      
      setImages(extendedImages);
      setIsLoading(false);
    };

    loadGallery();
  }, []);

  // Get unique categories with counts
  const categories = ['all', ...Array.from(new Set(images.map(img => img.category)))];
  const getCategoryCount = (category: string) => {
    return category === 'all' ? images.length : images.filter(img => img.category === category).length;
  };

  // Sort and filter images
  const getSortedAndFilteredImages = () => {
    let filtered = selectedCategory === 'all' 
      ? images 
      : images.filter(img => img.category === selectedCategory);

    // Sort images
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return (a.title || a.alt).localeCompare(b.title || b.alt);
        case 'category':
          return a.category.localeCompare(b.category);
        default: // newest
          return b.id.localeCompare(a.id);
      }
    });

    return filtered;
  };

  const filteredImages = getSortedAndFilteredImages();

  const formatCategoryName = (category: string) => {
    const names = {
      'all': 'All Photos',
      'hotel': 'Hotel',
      'rooms': 'Rooms',
      'restaurant': 'Restaurant',
      'bar': 'Bar & Lounge',
      'nightclub': 'Nightclub',
      'facilities': 'Facilities',
      'events': 'Events'
    };
    return names[category as keyof typeof names] || category;
  };

  // Icons
  const GridIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
    >
      <rect x="3" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2" />
      <rect x="14" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2" />
      <rect x="14" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2" />
      <rect x="3" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2" />
    </svg>
  );

  const CameraIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
    >
      <path
        d="M23 19C23 19.5304 22.7893 20.0391 22.4142 20.4142C22.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H7L9 3H15L17 6H19C19.5304 6 20.0391 6.21071 20.4142 6.58579C20.7893 6.96086 21 7.46957 21 8V19H23Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="13" r="4" stroke="currentColor" strokeWidth="2" />
    </svg>
  );

  const DownloadIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
    >
      <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="7,10 12,15 17,10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const ShareIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
    >
      <circle cx="18" cy="5" r="3" stroke="currentColor" strokeWidth="2" />
      <circle cx="6" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
      <circle cx="18" cy="19" r="3" stroke="currentColor" strokeWidth="2" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" stroke="currentColor" strokeWidth="2" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" stroke="currentColor" strokeWidth="2" />
    </svg>
  );

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
          <PageSkeleton variant="gallery" />
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
      
      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mb-12"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Photo Gallery
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
          >
            Discover the beauty and elegance of Patricia Hotel through our curated collection of photography. 
            From luxurious accommodations to world-class dining and vibrant nightlife.
          </motion.p>
          
          {/* Quick Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-8 justify-center items-center text-sm text-gray-600"
          >
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2"
            >
              <CameraIcon />
              <span>{images.length} Professional Photos</span>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2"
            >
              <GridIcon />
              <span>{categories.length - 1} Categories</span>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span>High-Resolution Downloads</span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Gallery Controls */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            
            {/* Category Filter */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex-1"
            >
              <label className="block text-sm font-medium text-gray-700 mb-3">Browse by Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category, index) => (
                  <motion.button
                    key={category}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedCategory === category
                        ? 'bg-primary-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {formatCategoryName(category)}
                    <span className="ml-2 text-xs opacity-75">
                      ({getCategoryCount(category)})
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* View Controls */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="flex items-center space-x-4"
            >
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">Sort:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="text-sm border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="category">By Category</option>
                  <option value="newest">Newest First</option>
                  <option value="title">Alphabetical</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">View:</label>
                <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                  >
                    <GridIcon />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setViewMode('masonry')}
                    className={`p-2 ${viewMode === 'masonry' ? 'bg-primary-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <rect x="3" y="3" width="7" height="13" stroke="currentColor" strokeWidth="2" />
                      <rect x="14" y="3" width="7" height="5" stroke="currentColor" strokeWidth="2" />
                      <rect x="14" y="12" width="7" height="9" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Gallery */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-16"
        >
          <ImageGallery
            images={filteredImages}
            columns={viewMode === 'grid' ? 4 : 3}
            aspectRatio={viewMode === 'grid' ? 'square' : 'auto'}
            showFilter={false}
            showTitles={true}
            lightbox={true}
            spacing="normal"
          />
        </motion.div>

        {/* Empty State */}
        {filteredImages.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16"
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-24 h-24 mx-auto mb-6 text-gray-300"
            >
              <CameraIcon />
            </motion.div>
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-2xl font-medium text-gray-900 mb-2"
            >
              No photos found
            </motion.h3>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-gray-600 mb-6"
            >
              No images found in the "{formatCategoryName(selectedCategory)}" category.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Button onClick={() => setSelectedCategory('all')}>
                View All Photos
              </Button>
            </motion.div>
          </motion.div>
        )}

        {/* Gallery Actions */}
        {filteredImages.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg p-8 text-center"
          >
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="font-serif text-2xl font-semibold text-gray-900 mb-4"
            >
              Love What You See?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-gray-600 mb-6 max-w-2xl mx-auto"
            >
              Experience Patricia Hotel in person. Our photography captures just a glimpse 
              of the luxury and elegance that awaits you.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => window.location.href = '/booking'}
                  size="lg"
                >
                  Book Your Stay
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => window.location.href = '/contact'}
                  variant="secondary"
                  size="lg"
                >
                  Contact Us
                </Button>
              </motion.div>
            </motion.div>

            {/* Sharing Options */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              className="border-t border-gray-200 pt-6"
            >
              <h3 className="font-medium text-gray-900 mb-4">Share Our Gallery</h3>
              <div className="flex justify-center space-x-4">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <ShareIcon />
                  <span>Share</span>
                </motion.button>
                <motion.button 
                  onClick={downloadPDFBrochure}
                  disabled={isGeneratingPDF}
                  whileHover={{ scale: isGeneratingPDF ? 1 : 1.05 }}
                  whileTap={{ scale: isGeneratingPDF ? 1 : 0.95 }}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <DownloadIcon />
                  <span>{isGeneratingPDF ? 'Generating PDF...' : 'Download Brochure'}</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Category Showcase */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {categories.slice(1).map((category, index) => {
            const categoryImages = images.filter(img => img.category === category);
            const featuredImage = categoryImages[0];
            
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                onClick={() => setSelectedCategory(category)}
              >
                <div className="h-48 overflow-hidden">
                  {featuredImage ? (
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                      src={featuredImage.thumbnail || featuredImage.src}
                      alt={featuredImage.alt}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback to a random available image if the image fails to load
                        e.currentTarget.src = getRandomImage();
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <CameraIcon />
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-medium text-gray-900 mb-2">
                    {formatCategoryName(category)}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {getCategoryCount(category)} photos
                  </p>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                    >
                      View Gallery
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.main>

      <Footer />
    </motion.div>
  );
};

export default GalleryPage;