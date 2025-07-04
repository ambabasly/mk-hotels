// src/components/ui/LoadingSkeleton.tsx
'use client';

interface LoadingSkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
  className?: string;
  animate?: boolean;
}

const LoadingSkeleton = ({
  variant = 'rectangular',
  width = '100%',
  height = '1rem',
  className = '',
  animate = true
}: LoadingSkeletonProps) => {
  
  const getVariantStyles = () => {
    switch (variant) {
      case 'text':
        return 'rounded';
      case 'circular':
        return 'rounded-full';
      case 'rounded':
        return 'rounded-lg';
      default:
        return 'rounded-sm';
    }
  };

  const getAnimationStyles = () => {
    return animate ? 'animate-pulse' : '';
  };

  const style = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  return (
    <div
      className={`bg-gray-200 ${getVariantStyles()} ${getAnimationStyles()} ${className}`}
      style={style}
    />
  );
};

// Room Card Skeleton
const RoomCardSkeleton = ({ className = '' }: { className?: string }) => (
  <div className={`bg-white rounded-2xl shadow-lg overflow-hidden ${className}`}>
    {/* Image Skeleton */}
    <LoadingSkeleton variant="rectangular" height="16rem" className="w-full" />
    
    {/* Content Skeleton */}
    <div className="p-6 space-y-4">
      {/* Title and Price */}
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <LoadingSkeleton variant="text" width="60%" height="1.5rem" className="mb-2" />
          <LoadingSkeleton variant="text" width="40%" height="1rem" />
        </div>
        <div className="ml-4">
          <LoadingSkeleton variant="text" width="5rem" height="1.5rem" />
        </div>
      </div>
      
      {/* Details */}
      <div className="flex space-x-4">
        <LoadingSkeleton variant="text" width="4rem" height="1rem" />
        <LoadingSkeleton variant="text" width="4rem" height="1rem" />
        <LoadingSkeleton variant="text" width="4rem" height="1rem" />
      </div>
      
      {/* Description */}
      <div className="space-y-2">
        <LoadingSkeleton variant="text" width="100%" height="1rem" />
        <LoadingSkeleton variant="text" width="80%" height="1rem" />
      </div>
      
      {/* Amenities */}
      <div className="flex flex-wrap gap-2">
        <LoadingSkeleton variant="rounded" width="4rem" height="1.5rem" />
        <LoadingSkeleton variant="rounded" width="3rem" height="1.5rem" />
        <LoadingSkeleton variant="rounded" width="5rem" height="1.5rem" />
        <LoadingSkeleton variant="rounded" width="4rem" height="1.5rem" />
      </div>
      
      {/* Buttons */}
      <div className="flex gap-3">
        <LoadingSkeleton variant="rounded" width="50%" height="2.5rem" />
        <LoadingSkeleton variant="rounded" width="50%" height="2.5rem" />
      </div>
    </div>
  </div>
);

// Menu Item Skeleton
const MenuItemSkeleton = ({ showImage = false, className = '' }: { showImage?: boolean; className?: string }) => (
  <div className={`flex gap-4 p-4 ${className}`}>
    {/* Image Skeleton */}
    {showImage && (
      <LoadingSkeleton variant="rounded" width="6rem" height="6rem" className="flex-shrink-0" />
    )}
    
    {/* Content Skeleton */}
    <div className="flex-1 space-y-2">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <LoadingSkeleton variant="text" width="60%" height="1.25rem" className="mb-1" />
          <LoadingSkeleton variant="text" width="30%" height="0.875rem" />
        </div>
        <LoadingSkeleton variant="text" width="4rem" height="1.25rem" />
      </div>
      <div className="space-y-1">
        <LoadingSkeleton variant="text" width="100%" height="0.875rem" />
        <LoadingSkeleton variant="text" width="85%" height="0.875rem" />
      </div>
    </div>
  </div>
);

// Gallery Image Skeleton
const GalleryImageSkeleton = ({ 
  aspectRatio = 'landscape',
  className = '' 
}: { 
  aspectRatio?: 'square' | 'landscape' | 'portrait';
  className?: string;
}) => {
  const getAspectRatioStyles = () => {
    switch (aspectRatio) {
      case 'square':
        return 'aspect-square';
      case 'portrait':
        return 'aspect-[3/4]';
      default:
        return 'aspect-[4/3]';
    }
  };

  return (
    <LoadingSkeleton 
      variant="rounded" 
      className={`w-full ${getAspectRatioStyles()} ${className}`}
    />
  );
};

// Contact Form Skeleton
const ContactFormSkeleton = ({ className = '' }: { className?: string }) => (
  <div className={`max-w-2xl mx-auto space-y-6 ${className}`}>
    {/* Personal Information Row */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <LoadingSkeleton variant="text" width="4rem" height="1rem" />
        <LoadingSkeleton variant="rounded" width="100%" height="2.5rem" />
      </div>
      <div className="space-y-2">
        <LoadingSkeleton variant="text" width="5rem" height="1rem" />
        <LoadingSkeleton variant="rounded" width="100%" height="2.5rem" />
      </div>
    </div>
    
    {/* Phone and Inquiry Type Row */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <LoadingSkeleton variant="text" width="6rem" height="1rem" />
        <LoadingSkeleton variant="rounded" width="100%" height="2.5rem" />
      </div>
      <div className="space-y-2">
        <LoadingSkeleton variant="text" width="5rem" height="1rem" />
        <LoadingSkeleton variant="rounded" width="100%" height="2.5rem" />
      </div>
    </div>
    
    {/* Subject */}
    <div className="space-y-2">
      <LoadingSkeleton variant="text" width="3rem" height="1rem" />
      <LoadingSkeleton variant="rounded" width="100%" height="2.5rem" />
    </div>
    
    {/* Message */}
    <div className="space-y-2">
      <LoadingSkeleton variant="text" width="4rem" height="1rem" />
      <LoadingSkeleton variant="rounded" width="100%" height="9rem" />
    </div>
    
    {/* Preferred Contact */}
    <div className="space-y-3">
      <LoadingSkeleton variant="text" width="8rem" height="1rem" />
      <div className="flex space-x-4">
        <LoadingSkeleton variant="text" width="3rem" height="1rem" />
        <LoadingSkeleton variant="text" width="3rem" height="1rem" />
      </div>
    </div>
    
    {/* Submit Button */}
    <div className="flex justify-center">
      <LoadingSkeleton variant="rounded" width="12rem" height="3rem" />
    </div>
  </div>
);

// Booking Form Skeleton
const BookingFormSkeleton = ({ className = '' }: { className?: string }) => (
  <div className={`bg-white rounded-2xl shadow-lg p-6 md:p-8 ${className}`}>
    {/* Header */}
    <div className="text-center mb-6">
      <LoadingSkeleton variant="text" width="8rem" height="1.5rem" className="mx-auto mb-2" />
      <LoadingSkeleton variant="text" width="12rem" height="1rem" className="mx-auto" />
    </div>
    
    {/* Form Fields */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {/* Check-in */}
      <div className="space-y-2">
        <LoadingSkeleton variant="text" width="4rem" height="1rem" />
        <LoadingSkeleton variant="rounded" width="100%" height="2.5rem" />
      </div>
      
      {/* Check-out */}
      <div className="space-y-2">
        <LoadingSkeleton variant="text" width="4rem" height="1rem" />
        <LoadingSkeleton variant="rounded" width="100%" height="2.5rem" />
      </div>
      
      {/* Guests */}
      <div className="space-y-2">
        <LoadingSkeleton variant="text" width="3rem" height="1rem" />
        <LoadingSkeleton variant="rounded" width="100%" height="2.5rem" />
      </div>
      
      {/* Room Type */}
      <div className="space-y-2">
        <LoadingSkeleton variant="text" width="5rem" height="1rem" />
        <LoadingSkeleton variant="rounded" width="100%" height="2.5rem" />
      </div>
      
      {/* Search Button */}
      <div className="space-y-2">
        <LoadingSkeleton variant="text" width="3rem" height="1rem" className="opacity-0" />
        <LoadingSkeleton variant="rounded" width="100%" height="2.5rem" />
      </div>
    </div>
  </div>
);

// Navigation Skeleton
const NavigationSkeleton = ({ className = '' }: { className?: string }) => (
  <nav className={`bg-white shadow-lg border-b border-gray-100 ${className}`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <LoadingSkeleton variant="rounded" width="2.5rem" height="2.5rem" />
          <div className="space-y-1">
            <LoadingSkeleton variant="text" width="4rem" height="1.25rem" />
            <LoadingSkeleton variant="text" width="3rem" height="0.75rem" />
          </div>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <LoadingSkeleton variant="text" width="3rem" height="1rem" />
          <LoadingSkeleton variant="text" width="3rem" height="1rem" />
          <LoadingSkeleton variant="text" width="4rem" height="1rem" />
          <LoadingSkeleton variant="text" width="4rem" height="1rem" />
          <LoadingSkeleton variant="text" width="4rem" height="1rem" />
          <LoadingSkeleton variant="rounded" width="6rem" height="2rem" />
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <LoadingSkeleton variant="rounded" width="2rem" height="2rem" />
        </div>
      </div>
    </div>
  </nav>
);

// Page Skeleton Layouts
const PageSkeleton = ({ 
  variant = 'default',
  className = ''
}: { 
  variant?: 'default' | 'rooms' | 'dining' | 'contact' | 'gallery';
  className?: string;
}) => {
  switch (variant) {
    case 'rooms':
      return (
        <div className={`space-y-8 ${className}`}>
          {/* Header */}
          <div className="text-center space-y-4">
            <LoadingSkeleton variant="text" width="12rem" height="2.5rem" className="mx-auto" />
            <LoadingSkeleton variant="text" width="20rem" height="1.25rem" className="mx-auto" />
          </div>
          
          {/* Filter */}
          <BookingFormSkeleton />
          
          {/* Room Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <RoomCardSkeleton key={i} />
            ))}
          </div>
        </div>
      );
      
    case 'dining':
      return (
        <div className={`space-y-8 ${className}`}>
          {/* Header */}
          <div className="text-center space-y-4">
            <LoadingSkeleton variant="text" width="10rem" height="2.5rem" className="mx-auto" />
            <LoadingSkeleton variant="text" width="18rem" height="1.25rem" className="mx-auto" />
          </div>
          
          {/* Tabs */}
          <div className="flex space-x-8 border-b border-gray-200">
            <LoadingSkeleton variant="text" width="6rem" height="1.5rem" />
            <LoadingSkeleton variant="text" width="7rem" height="1.5rem" />
            <LoadingSkeleton variant="text" width="5rem" height="1.5rem" />
          </div>
          
          {/* Menu Content */}
          <div className="space-y-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
                <LoadingSkeleton variant="text" width="8rem" height="1.75rem" />
                <div className="space-y-4">
                  {Array.from({ length: 4 }).map((_, j) => (
                    <MenuItemSkeleton key={j} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
      
    case 'gallery':
      return (
        <div className={`space-y-8 ${className}`}>
          {/* Header */}
          <div className="text-center space-y-4">
            <LoadingSkeleton variant="text" width="8rem" height="2.5rem" className="mx-auto" />
            <LoadingSkeleton variant="text" width="16rem" height="1.25rem" className="mx-auto" />
          </div>
          
          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <LoadingSkeleton key={i} variant="rounded" width="5rem" height="2rem" />
            ))}
          </div>
          
          {/* Image Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <GalleryImageSkeleton key={i} aspectRatio="square" />
            ))}
          </div>
        </div>
      );
      
    case 'contact':
      return (
        <div className={`space-y-8 ${className}`}>
          {/* Header */}
          <div className="text-center space-y-4">
            <LoadingSkeleton variant="text" width="8rem" height="2.5rem" className="mx-auto" />
            <LoadingSkeleton variant="text" width="20rem" height="1.25rem" className="mx-auto" />
          </div>
          
          {/* Contact Form */}
          <ContactFormSkeleton />
        </div>
      );
      
    default:
      return (
        <div className={`space-y-8 ${className}`}>
          {/* Hero Section */}
          <div className="min-h-screen flex items-center justify-center bg-gray-100 rounded-2xl">
            <div className="text-center space-y-6">
              <LoadingSkeleton variant="text" width="20rem" height="3rem" className="mx-auto" />
              <LoadingSkeleton variant="text" width="24rem" height="1.5rem" className="mx-auto" />
              <div className="flex justify-center gap-4">
                <LoadingSkeleton variant="rounded" width="8rem" height="3rem" />
                <LoadingSkeleton variant="rounded" width="8rem" height="3rem" />
              </div>
            </div>
          </div>
          
          {/* Content Sections */}
          <div className="space-y-12">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-6">
                <div className="text-center space-y-4">
                  <LoadingSkeleton variant="text" width="12rem" height="2rem" className="mx-auto" />
                  <LoadingSkeleton variant="text" width="18rem" height="1.25rem" className="mx-auto" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {Array.from({ length: 3 }).map((_, j) => (
                    <div key={j} className="bg-white rounded-xl shadow-lg p-6 space-y-4">
                      <LoadingSkeleton variant="circular" width="3rem" height="3rem" />
                      <LoadingSkeleton variant="text" width="8rem" height="1.5rem" />
                      <div className="space-y-2">
                        <LoadingSkeleton variant="text" width="100%" height="1rem" />
                        <LoadingSkeleton variant="text" width="85%" height="1rem" />
                        <LoadingSkeleton variant="text" width="90%" height="1rem" />
                      </div>
                      <LoadingSkeleton variant="rounded" width="6rem" height="2rem" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
  }
};

export default LoadingSkeleton;
export { 
  RoomCardSkeleton, 
  MenuItemSkeleton, 
  GalleryImageSkeleton, 
  ContactFormSkeleton, 
  BookingFormSkeleton,
  NavigationSkeleton,
  PageSkeleton 
};