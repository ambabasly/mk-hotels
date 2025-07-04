// src/components/dining/MenuDisplay.tsx
'use client';

import { useState } from 'react';
import { MenuItem } from '@/types';

interface MenuCategory {
  id: string;
  name: string;
  description?: string;
  items: MenuItem[];
}

interface MenuDisplayProps {
  categories: MenuCategory[];
  title?: string;
  subtitle?: string;
  type?: 'restaurant' | 'bar' | 'nightclub';
  showImages?: boolean;
  collapsible?: boolean;
  className?: string;
}

const MenuDisplay = ({
  categories,
  title,
  subtitle,
  type = 'restaurant',
  showImages = false,
  collapsible = true,
  className = '',
}: MenuDisplayProps) => {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(categories.map((cat) => cat.id))
  );

  const toggleCategory = (categoryId: string) => {
    if (!collapsible) return;

    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  // Icons
  const ChevronDownIcon = ({ isOpen }: { isOpen: boolean }) => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
    >
      <path
        d="M6 9L12 15L18 9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const VegetarianIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4 text-green-600"
      aria-label="Vegetarian"
    >
      <path
        d="M12 2L13.09 8.26L20 9L15 14L16.18 21L12 17.27L7.82 21L9 14L4 9L10.91 8.26L12 2Z"
        stroke="currentColor"
        strokeWidth="2"
        fill="currentColor"
      />
    </svg>
  );

  const GlutenFreeIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4 text-blue-600"
      aria-label="Gluten Free"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <path
        d="M8 12L11 15L16 9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const SpicyIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4 text-red-600"
      aria-label="Spicy"
    >
      <path
        d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 13L13.5 11.5C13.1 11.1 12.6 11 12 11S10.9 11.1 10.5 11.5L9 13L15 19V21H13L9 17L7.5 18.5C7.1 18.9 6.6 19 6 19S4.9 18.9 4.5 18.5L3 17L9 11L10.5 9.5C10.9 9.1 11.4 9 12 9S13.1 9.1 13.5 9.5L15 11L21 5V7L15 13L21 9Z"
        fill="currentColor"
      />
    </svg>
  );

  // Menu item placeholder
  const MenuItemPlaceholder = ({ name }: { name: string }) => (
    <svg
      className="w-full h-full object-cover rounded-lg"
      viewBox="0 0 200 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="200" height="150" fill="#f3f4f6" />
      <circle cx="100" cy="75" r="30" fill="#e5e7eb" />
      <rect x="70" y="90" width="60" height="4" fill="#d1d5db" />
      <rect x="80" y="100" width="40" height="3" fill="#d1d5db" />
      <text
        x="100"
        y="130"
        textAnchor="middle"
        className="fill-gray-500 text-xs font-medium"
      >
        {name.slice(0, 12)}...
      </text>
    </svg>
  );

  const getTypeStyles = () => {
    switch (type) {
      case 'bar':
        return {
          accent: 'border-l-blue-500',
          background: 'bg-blue-50',
          text: 'text-blue-900',
        };
      case 'nightclub':
        return {
          accent: 'border-l-purple-500',
          background: 'bg-purple-50',
          text: 'text-purple-900',
        };
      default:
        return {
          accent: 'border-l-primary-500',
          background: 'bg-primary-50',
          text: 'text-primary-900',
        };
    }
  };

  const typeStyles = getTypeStyles();

  return (
    <div className={`max-w-4xl mx-auto ${className}`}>
      {/* Header */}
      {(title || subtitle) && (
        <div className="text-center mb-8">
          {title && (
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Menu Categories */}
      <div className="space-y-8">
        {categories.map((category) => {
          const isExpanded = expandedCategories.has(category.id);

          return (
            <div
              key={category.id}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden border-l-4 ${typeStyles.accent}`}
            >
              {/* Category Header */}
              <div
                className={`p-6 ${typeStyles.background} ${collapsible ? 'cursor-pointer' : ''}`}
                onClick={() => toggleCategory(category.id)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3
                      className={`font-serif text-2xl font-semibold ${typeStyles.text}`}
                    >
                      {category.name}
                    </h3>
                    {category.description && (
                      <p className="text-gray-600 mt-1">
                        {category.description}
                      </p>
                    )}
                  </div>

                  {collapsible && (
                    <div className={typeStyles.text}>
                      <ChevronDownIcon isOpen={isExpanded} />
                    </div>
                  )}
                </div>
              </div>

              {/* Category Items */}
              <div
                className={`transition-all duration-300 ${
                  isExpanded
                    ? 'max-h-none opacity-100'
                    : 'max-h-0 opacity-0 overflow-hidden'
                }`}
              >
                <div className="p-6 space-y-6">
                  {category.items.map((item) => (
                    <div
                      key={item.id}
                      className={`flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200 ${
                        showImages ? 'min-h-[120px]' : ''
                      }`}
                    >
                      {/* Item Image */}
                      {showImages && (
                        <div className="flex-shrink-0 w-24 h-24">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          ) : (
                            <MenuItemPlaceholder name={item.name} />
                          )}
                        </div>
                      )}

                      {/* Item Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 text-lg">
                              {item.name}
                            </h4>

                            {/* Dietary Icons */}
                            <div className="flex items-center space-x-2 mt-1">
                              {item.name
                                .toLowerCase()
                                .includes('vegetarian') && <VegetarianIcon />}
                              {item.name
                                .toLowerCase()
                                .includes('gluten-free') && <GlutenFreeIcon />}
                              {item.name.toLowerCase().includes('spicy') && (
                                <SpicyIcon />
                              )}
                            </div>
                          </div>

                          <div className="ml-4 text-right">
                            <span className="font-bold text-xl text-primary-600">
                              {formatPrice(item.price)}
                            </span>
                          </div>
                        </div>

                        <p className="text-gray-600 text-sm leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}

                  {category.items.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <p>No items available in this category.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Menu Footer */}
      <div className="mt-12 text-center">
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="font-serif text-lg font-semibold text-gray-900 mb-2">
            Dietary Information
          </h3>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <VegetarianIcon />
              <span>Vegetarian Options Available</span>
            </div>
            <div className="flex items-center space-x-1">
              <GlutenFreeIcon />
              <span>Gluten-Free Options Available</span>
            </div>
            <div className="flex items-center space-x-1">
              <SpicyIcon />
              <span>Spicy Dishes Marked</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            Please inform our staff of any allergies or dietary restrictions.
            All prices are subject to change.
          </p>
        </div>
      </div>
    </div>
  );
};

// Pre-configured menu displays for different dining types
interface RestaurantMenuProps {
  categories: MenuCategory[];
  className?: string;
}

const RestaurantMenu = ({ categories, className }: RestaurantMenuProps) => (
  <MenuDisplay
    categories={categories}
    title="Fine Dining Menu"
    subtitle="Exquisite cuisine crafted by our world-class chefs using the finest ingredients"
    type="restaurant"
    showImages={true}
    className={className}
  />
);

const BarMenu = ({ categories, className }: RestaurantMenuProps) => (
  <MenuDisplay
    categories={categories}
    title="Bar & Lounge"
    subtitle="Premium cocktails, fine wines, and light bites in an elegant atmosphere"
    type="bar"
    showImages={false}
    className={className}
  />
);

const NightclubMenu = ({ categories, className }: RestaurantMenuProps) => (
  <MenuDisplay
    categories={categories}
    title="Nightclub Experience"
    subtitle="Bottle service and signature cocktails • Open Thursday to Sunday, 9 PM - 3 AM"
    type="nightclub"
    showImages={false}
    collapsible={false}
    className={className}
  />
);

export default MenuDisplay;
export { RestaurantMenu, BarMenu, NightclubMenu };
