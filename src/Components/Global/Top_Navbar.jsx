import { useState, useEffect } from 'react';
import logo from '../../assets/Logo.png';
import {
  BellIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
  ChevronDownIcon,
  Bars3BottomRightIcon
} from '@heroicons/react/24/outline';

const TopNav = ({ sidebarOpen, setSidebarOpen }) => {
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
    <header className={`sticky top-0 z-40 transition-all duration-300 ${scrolled
        ? 'bg-white shadow-lg border-b border-gray-200'
        : 'bg-white border-b shadow-sm'
      }`}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? 'h-14' : 'h-16'
          }`}>
          {/* Left Section */}
          <div className="flex items-center">
            {/* Logo */}
            <div className="flex items-center">
              <img
                src={logo}
                alt="Logo"
                className={`transition-all duration-300 object-contain ${scrolled ? 'h-8' : 'h-10'
                  }`}
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Menu Button */}
            <button
              id="menu-button"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="relative p-2 text-black hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-300"
              aria-label="Toggle sidebar"
            >
              <Bars3BottomRightIcon className={scrolled ? "h-7 w-7" : "h-7 w-7"} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNav;