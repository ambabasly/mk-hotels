// src/components/gallery/ImageGallery.tsx
'use client';

import { useState, useEffect } from 'react';
import Modal from '@/components/ui/Modal';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  title?: string;
  description?: string;
  category: string;
  thumbnail?: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  columns?: 2 | 3 | 4;
  showFilter?: boolean;
  showTitles?: boolean;
  spacing?: 'tight' | 'normal' | 'wide';
  aspectRatio?: 'square' | 'landscape' | 'portrait' | 'auto';
  lightbox?: boolean;
  className?: string;
}

const ImageGallery = ({
  images,
  columns = 3,
  showFilter = true,
  showTitles = false,
  spacing = 'normal',
  aspectRatio = 'landscape',
  lightbox = true,
  className = '',
}: ImageGalleryProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);
  const [isImageLoading, setIsImageLoading] = useState<{
    [key: string]: boolean;
  }>({});

  // Get unique categories
  const categories = [
    'all',
    ...Array.from(new Set(images.map((img) => img.category))),
  ];

  // Filter images based on selected category
  const filteredImages =
    selectedCategory === 'all'
      ? images
      : images.filter((img) => img.category === selectedCategory);

  // Handle lightbox navigation
  const openLightbox = (image: GalleryImage) => {
    if (!lightbox) return;
    const index = filteredImages.findIndex((img) => img.id === image.id);
    setLightboxImage(image);
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (!lightboxImage) return;

    const newIndex =
      direction === 'next'
        ? (lightboxIndex + 1) % filteredImages.length
        : (lightboxIndex - 1 + filteredImages.length) % filteredImages.length;

    setLightboxImage(filteredImages[newIndex]);
    setLightboxIndex(newIndex);
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!lightboxImage) return;

      switch (e.key) {
        case 'ArrowLeft':
          navigateLightbox('prev');
          break;
        case 'ArrowRight':
          navigateLightbox('next');
          break;
        case 'Escape':
          closeLightbox();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [lightboxImage, lightboxIndex]);

  // Grid styles
  const getGridStyles = () => {
    const columnStyles = {
      2: 'grid-cols-1 md:grid-cols-2',
      3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    };

    const spacingStyles = {
      tight: 'gap-2',
      normal: 'gap-4',
      wide: 'gap-6',
    };

    return `grid ${columnStyles[columns]} ${spacingStyles[spacing]}`;
  };

  const getAspectRatioStyles = () => {
    switch (aspectRatio) {
      case 'square':
        return 'aspect-square';
      case 'landscape':
        return 'aspect-[4/3]';
      case 'portrait':
        return 'aspect-[3/4]';
      default:
        return '';
    }
  };

  // Image placeholder
  const ImagePlaceholder = ({ title }: { title?: string }) => (
    <svg
      className="w-full h-full object-cover"
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="400" height="300" fill="#f3f4f6" />
      <rect
        x="120"
        y="90"
        width="160"
        height="120"
        fill="#e5e7eb"
        stroke="#d1d5db"
        strokeWidth="2"
      />
      <circle cx="160" cy="130" r="20" fill="#d1d5db" />
      <path d="M140 170L160 150L180 170L200 150L220 170H140Z" fill="#d1d5db" />
      {title && (
        <text
          x="200"
          y="250"
          textAnchor="middle"
          className="fill-gray-500 text-sm font-medium"
        >
          {title}
        </text>
      )}
    </svg>
  );

  // Icons
  const FilterIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
    >
      <polygon
        points="22,3 2,3 10,12.46 10,19 14,21 14,12.46"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const ChevronLeftIcon = () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6"
    >
      <path
        d="M15 18L9 12L15 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const ChevronRightIcon = () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6"
    >
      <path
        d="M9 18L15 12L9 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

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

  const formatCategoryName = (category: string) => {
    return (
      category.charAt(0).toUpperCase() +
      category.slice(1).replace(/([A-Z])/g, ' $1')
    );
  };

  return (
    <div className={className}>
      {/* Filter Tabs */}
      {showFilter && categories.length > 2 && (
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <FilterIcon />
            <span className="font-medium text-gray-700">
              Filter by category:
            </span>
          </div>

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
                  (
                  {category === 'all'
                    ? images.length
                    : images.filter((img) => img.category === category).length}
                  )
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Image Grid */}
      <div className={getGridStyles()}>
        {filteredImages.map((image) => (
          <div
            key={image.id}
            className={`group relative overflow-hidden rounded-lg bg-gray-100 ${getAspectRatioStyles()} ${
              lightbox ? 'cursor-pointer' : ''
            }`}
            onClick={() => openLightbox(image)}
          >
            {/* Loading State */}
            {isImageLoading[image.id] !== false && (
              <div className="absolute inset-0 flex items-center justify-center">
                <ImagePlaceholder title={image.title} />
              </div>
            )}

            {/* Image */}
            <img
              src={image.thumbnail || image.src}
              alt={image.alt}
              className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-105 ${
                isImageLoading[image.id] === false ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() =>
                setIsImageLoading((prev) => ({ ...prev, [image.id]: false }))
              }
              onError={() =>
                setIsImageLoading((prev) => ({ ...prev, [image.id]: false }))
              }
            />

            {/* Overlay */}
            {lightbox && (
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            )}

            {/* Title Overlay */}
            {showTitles && (image.title || image.description) && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                {image.title && (
                  <h3 className="text-white font-semibold text-sm mb-1">
                    {image.title}
                  </h3>
                )}
                {image.description && (
                  <p className="text-white/90 text-xs">{image.description}</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredImages.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 opacity-50">
            <ImagePlaceholder />
          </div>
          <h3 className="font-medium text-gray-900 mb-2">No images found</h3>
          <p className="text-gray-500">
            {selectedCategory === 'all'
              ? 'No images available in the gallery.'
              : `No images found in the "${formatCategoryName(selectedCategory)}" category.`}
          </p>
        </div>
      )}

      {/* Lightbox Modal */}
      {lightbox && lightboxImage && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-10 text-white hover:text-gray-300 transition-colors duration-200"
            aria-label="Close lightbox"
          >
            <CloseIcon />
          </button>

          {/* Navigation Buttons */}
          {filteredImages.length > 1 && (
            <>
              <button
                onClick={() => navigateLightbox('prev')}
                className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors duration-200"
                aria-label="Previous image"
              >
                <ChevronLeftIcon />
              </button>
              <button
                onClick={() => navigateLightbox('next')}
                className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors duration-200"
                aria-label="Next image"
              >
                <ChevronRightIcon />
              </button>
            </>
          )}

          {/* Image Container */}
          <div className="max-w-7xl max-h-full mx-4 flex flex-col items-center">
            <img
              src={lightboxImage.src}
              alt={lightboxImage.alt}
              className="max-w-full max-h-[80vh] object-contain"
            />

            {/* Image Info */}
            {(lightboxImage.title || lightboxImage.description) && (
              <div className="mt-4 text-center text-white">
                {lightboxImage.title && (
                  <h3 className="text-xl font-semibold mb-2">
                    {lightboxImage.title}
                  </h3>
                )}
                {lightboxImage.description && (
                  <p className="text-gray-300">{lightboxImage.description}</p>
                )}
              </div>
            )}

            {/* Image Counter */}
            {filteredImages.length > 1 && (
              <div className="mt-4 text-white text-sm">
                {lightboxIndex + 1} of {filteredImages.length}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
