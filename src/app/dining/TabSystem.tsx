// src/components/dining/TabSystem.tsx
'use client';

import { useState, ReactNode } from 'react';

interface Tab {
  id: string;
  label: string;
  content: ReactNode;
  icon?: ReactNode;
  badge?: string | number;
  disabled?: boolean;
}

interface TabSystemProps {
  tabs: Tab[];
  defaultTab?: string;
  onTabChange?: (tabId: string) => void;
  variant?: 'default' | 'pills' | 'underline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
}

const TabSystem = ({
  tabs,
  defaultTab,
  onTabChange,
  variant = 'underline',
  size = 'md',
  fullWidth = false,
  className = ''
}: TabSystemProps) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const handleTabClick = (tabId: string) => {
    if (tabs.find(tab => tab.id === tabId)?.disabled) return;
    
    setActiveTab(tabId);
    if (onTabChange) {
      onTabChange(tabId);
    }
  };

  const activeTabContent = tabs.find(tab => tab.id === activeTab)?.content;

  // Variant styles
  const getTabListStyles = () => {
    const baseStyles = 'flex';
    
    switch (variant) {
      case 'pills':
        return `${baseStyles} space-x-1 bg-gray-100 p-1 rounded-lg`;
      case 'underline':
        return `${baseStyles} border-b border-gray-200`;
      default:
        return `${baseStyles} border-b border-gray-200`;
    }
  };

  const getTabStyles = (tab: Tab) => {
    const isActive = tab.id === activeTab;
    const isDisabled = tab.disabled;
    
    // Size styles
    const sizeStyles = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-3 text-base',
      lg: 'px-6 py-4 text-lg'
    };
    
    // Base styles
    const baseStyles = `${sizeStyles[size]} font-medium transition-all duration-200 cursor-pointer relative flex items-center space-x-2`;
    
    if (isDisabled) {
      return `${baseStyles} text-gray-400 cursor-not-allowed`;
    }
    
    switch (variant) {
      case 'pills':
        return `${baseStyles} rounded-md ${
          isActive 
            ? 'bg-white text-primary-600 shadow-sm' 
            : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
        }`;
      case 'underline':
        return `${baseStyles} border-b-2 ${
          isActive
            ? 'border-primary-500 text-primary-600'
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
        }`;
      default:
        return `${baseStyles} ${
          isActive
            ? 'text-primary-600 bg-primary-50'
            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
        }`;
    }
  };

  return (
    <div className={className}>
      {/* Tab Navigation */}
      <nav
        className={`${getTabListStyles()} ${fullWidth ? 'w-full' : ''}`}
        role="tablist"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={tab.id === activeTab}
            aria-controls={`tabpanel-${tab.id}`}
            aria-disabled={tab.disabled}
            tabIndex={tab.disabled ? -1 : 0}
            className={`${getTabStyles(tab)} ${fullWidth ? 'flex-1 justify-center' : ''}`}
            onClick={() => handleTabClick(tab.id)}
          >
            {/* Icon */}
            {tab.icon && (
              <span className="flex-shrink-0">
                {tab.icon}
              </span>
            )}
            
            {/* Label */}
            <span>{tab.label}</span>
            
            {/* Badge */}
            {tab.badge && (
              <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-primary-600 rounded-full">
                {tab.badge}
              </span>
            )}
            
            {/* Active Indicator for Pills */}
            {variant === 'pills' && tab.id === activeTab && (
              <span className="absolute inset-0 rounded-md bg-white shadow-sm pointer-events-none" />
            )}
          </button>
        ))}
      </nav>

      {/* Tab Content */}
      <div className="mt-6">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            id={`tabpanel-${tab.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${tab.id}`}
            className={tab.id === activeTab ? 'block' : 'hidden'}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

// Pre-configured Dining Tab System (REMOVED NIGHTCLUB)
interface DiningTabSystemProps {
  restaurantContent: ReactNode;
  barContent: ReactNode;
  onTabChange?: (tabId: string) => void;
  className?: string;
}

const DiningTabSystem = ({
  restaurantContent,
  barContent,
  onTabChange,
  className = ''
}: DiningTabSystemProps) => {
  
  const RestaurantIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
    >
      <path
        d="M5 7L5 20L19 20L19 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 6C9 4.89543 9.89543 4 11 4L13 4C14.1046 4 15 4.89543 15 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const BarIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
    >
      <path
        d="M5 12V7C5 5.89543 5.89543 5 7 5H17C18.1046 5 19 5.89543 19 7V12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 12L7 14H17L19 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="19" r="3" stroke="currentColor" strokeWidth="2" />
    </svg>
  );

  // ONLY Restaurant and Bar tabs now
  const diningTabs = [
    {
      id: 'restaurant',
      label: 'Restaurant',
      icon: <RestaurantIcon />,
      content: restaurantContent
    },
    {
      id: 'bar',
      label: 'Bar & Lounge',
      icon: <BarIcon />,
      content: barContent
    }
  ];

  return (
    <TabSystem
      tabs={diningTabs}
      defaultTab="restaurant"
      variant="underline"
      size="lg"
      fullWidth={true}
      onTabChange={onTabChange}
      className={className}
    />
  );
};

export default TabSystem;
export { DiningTabSystem };