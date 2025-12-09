import React, { useState, useEffect } from 'react';
import {
  BellIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
  ChevronDownIcon,
  Bars3BottomRightIcon
} from '@heroicons/react/24/outline';

const TopNav = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${
      scrolled 
        ? 'bg-white shadow-lg border-b border-gray-200' 
        : 'bg-white border-b shadow-sm'
    }`}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-300 ${
          scrolled ? 'h-14' : 'h-16'
        }`}>
          {/* Left Section */}
          <div className="flex items-center">
            {/* Logo */}
            <div className="flex items-center">
              <div className={`bg-red-700 flex items-center justify-center mr-3 transition-all duration-300 ${
                scrolled ? 'w-7 h-7 rounded-md' : 'w-8 h-8 rounded-lg'
              }`}>
                <span className="text-white font-bold transition-all duration-300" style={{
                  fontSize: scrolled ? '0.875rem' : '0.875rem'
                }}>
                  TH
                </span>
              </div>
              <span className={`font-bold text-gray-900 hidden md:block transition-all duration-300 ${
                scrolled ? 'text-lg' : 'text-xl'
              }`}>
                TrainingHub
              </span>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Mobile Search Button */}
            <button className="md:hidden p-2 text-gray-500 hover:text-gray-600">
              <MagnifyingGlassIcon className="h-5 w-5" />
            </button>

            {/* Notifications */}
            <button className="relative p-2 text-black hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-300">
              <Bars3BottomRightIcon className={scrolled ? "h-7 w-7" : "h-7 w-7"} />
              {/* <span className="absolute top-1 right-1 h-2 w-2 bg-red-700 rounded-full"></span> */}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNav;