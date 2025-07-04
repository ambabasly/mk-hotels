// src/app/gallery/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import ImageGallery from '@/components/gallery/ImageGallery';
import LoadingSkeleton, { PageSkeleton, GalleryImageSkeleton } from '@/components/ui/LoadingSkeleton';
import Button from '@/components/ui/Button';

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
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('grid');
  const [sortBy, setSortBy] = useState<'newest' | 'category' | 'title'>('category');

  // Load gallery data
  useEffect(() => {
    const loadGallery = async () => {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Add more mock images to make gallery fuller
      const extendedImages = [
        ...galleryData.images,
        // Add more hotel images
        {
          id: 'hotel-3',
          src: '/gallery/hotel-pool-deck.jpg',
          alt: 'Hotel pool deck',
          title: 'Pool Deck',
          description: 'Rooftop infinity pool with panoramic city views',
          category: 'hotel',
          thumbnail: '/gallery/thumbs/hotel-pool-deck.jpg'
        },
        {
          id: 'hotel-4',
          src: '/gallery/hotel-facade-night.jpg',
          alt: 'Hotel facade at night',
          title: 'Evening Facade',
          description: 'Patricia Hotel illuminated against the night sky',
          category: 'hotel',
          thumbnail: '/gallery/thumbs/hotel-facade-night.jpg'
        },
        // Add more room images
        {
          id: 'room-4',
          src: '/gallery/presidential-suite.jpg',
          alt: 'Presidential suite',
          title: 'Presidential Suite',
          description: 'Ultimate luxury with panoramic ocean views',
          category: 'rooms',
          thumbnail: '/gallery/thumbs/presidential-suite.jpg'
        },
        {
          id: 'room-5',
          src: '/gallery/bathroom-luxury.jpg',
          alt: 'Luxury bathroom',
          title: 'Marble Bathroom',
          description: 'Spa-inspired bathroom with premium finishes',
          category: 'rooms',
          thumbnail: '/gallery/thumbs/bathroom-luxury.jpg'
        },
        // Add more restaurant images
        {
          id: 'restaurant-3',
          src: '/gallery/chef-kitchen.jpg',
          alt: 'Chef in kitchen',
          title: 'Culinary Artistry',
          description: 'Our award-winning chef preparing signature dishes',
          category: 'restaurant',
          thumbnail: '/gallery/thumbs/chef-kitchen.jpg'
        },
        {
          id: 'restaurant-4',
          src: '/gallery/private-dining.jpg',
          alt: 'Private dining room',
          title: 'Private Dining',
          description: 'Intimate dining space for special occasions',
          category: 'restaurant',
          thumbnail: '/gallery/thumbs/private-dining.jpg'
        },
        // Add bar images
        {
          id: 'bar-2',
          src: '/gallery/cocktail-creation.jpg',
          alt: 'Bartender creating cocktail',
          title: 'Mixology Excellence',
          description: 'Expert mixologists crafting signature cocktails',
          category: 'bar',
          thumbnail: '/gallery/thumbs/cocktail-creation.jpg'
        },
        {
          id: 'bar-3',
          src: '/gallery/wine-cellar.jpg',
          alt: 'Wine cellar',
          title: 'Wine Cellar',
          description: 'Temperature-controlled cellar with rare vintages',
          category: 'bar',
          thumbnail: '/gallery/thumbs/wine-cellar.jpg'
        },
        // Add nightclub images
        {
          id: 'nightclub-2',
          src: '/gallery/dj-booth.jpg',
          alt: 'DJ booth in action',
          title: 'DJ Experience',
          description: 'World-class DJs spinning the latest hits',
          category: 'nightclub',
          thumbnail: '/gallery/thumbs/dj-booth.jpg'
        },
        {
          id: 'nightclub-3',
          src: '/gallery/vip-area.jpg',
          alt: 'VIP seating area',
          title: 'VIP Lounge',
          description: 'Exclusive VIP seating with bottle service',
          category: 'nightclub',
          thumbnail: '/gallery/thumbs/vip-area.jpg'
        },
        // Add facilities images
        {
          id: 'facilities-3',
          src: '/gallery/fitness-center.jpg',
          alt: 'Fitness center',
          title: 'Fitness Center',
          description: 'State-of-the-art equipment with personal training',
          category: 'facilities',
          thumbnail: '/gallery/thumbs/fitness-center.jpg'
        },
        {
          id: 'facilities-4',
          src: '/gallery/rooftop-terrace.jpg',
          alt: 'Rooftop terrace',
          title: 'Rooftop Terrace',
          description: 'Panoramic terrace perfect for events and relaxation',
          category: 'facilities',
          thumbnail: '/gallery/thumbs/rooftop-terrace.jpg'
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
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <PageSkeleton variant="gallery" />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Photo Gallery
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Discover the beauty and elegance of Patricia Hotel through our curated collection of photography. 
            From luxurious accommodations to world-class dining and vibrant nightlife.
          </p>
          
          {/* Quick Stats */}
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <CameraIcon />
              <span>{images.length} Professional Photos</span>
            </div>
            <div className="flex items-center space-x-2">
              <GridIcon />
              <span>{categories.length - 1} Categories</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span>High-Resolution Downloads</span>
            </div>
          </div>
        </div>

        {/* Gallery Controls */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            
            {/* Category Filter */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-3">Browse by Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
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
                  </button>
                ))}
              </div>
            </div>

            {/* View Controls */}
            <div className="flex items-center space-x-4">
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
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                  >
                    <GridIcon />
                  </button>
                  <button
                    onClick={() => setViewMode('masonry')}
                    className={`p-2 ${viewMode === 'masonry' ? 'bg-primary-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <rect x="3" y="3" width="7" height="13" stroke="currentColor" strokeWidth="2" />
                      <rect x="14" y="3" width="7" height="5" stroke="currentColor" strokeWidth="2" />
                      <rect x="14" y="12" width="7" height="9" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery */}
        <div className="mb-16">
          <ImageGallery
            images={filteredImages}
            columns={viewMode === 'grid' ? 4 : 3}
            aspectRatio={viewMode === 'grid' ? 'square' : 'auto'}
            showFilter={false}
            showTitles={true}
            lightbox={true}
            spacing="normal"
          />
        </div>

        {/* Empty State */}
        {filteredImages.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 text-gray-300">
              <CameraIcon />
            </div>
            <h3 className="text-2xl font-medium text-gray-900 mb-2">No photos found</h3>
            <p className="text-gray-600 mb-6">
              No images found in the "{formatCategoryName(selectedCategory)}" category.
            </p>
            <Button onClick={() => setSelectedCategory('all')}>
              View All Photos
            </Button>
          </div>
        )}

        {/* Gallery Actions */}
        {filteredImages.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-4">
              Love What You See?
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Experience Patricia Hotel in person. Our photography captures just a glimpse 
              of the luxury and elegance that awaits you.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button
                onClick={() => window.location.href = '/booking'}
                size="lg"
              >
                Book Your Stay
              </Button>
              <Button
                onClick={() => window.location.href = '/contact'}
                variant="secondary"
                size="lg"
              >
                Contact Us
              </Button>
            </div>

            {/* Sharing Options */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="font-medium text-gray-900 mb-4">Share Our Gallery</h3>
              <div className="flex justify-center space-x-4">
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <ShareIcon />
                  <span>Share</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  <DownloadIcon />
                  <span>Download Brochure</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Category Showcase */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.slice(1).map((category) => {
            const categoryImages = images.filter(img => img.category === category);
            const featuredImage = categoryImages[0];
            
            return (
              <div
                key={category}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                onClick={() => setSelectedCategory(category)}
              >
                <div className="h-48 overflow-hidden">
                  {featuredImage ? (
                    <img
                      src={featuredImage.thumbnail || featuredImage.src}
                      alt={featuredImage.alt}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
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
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    View Gallery
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default GalleryPage;