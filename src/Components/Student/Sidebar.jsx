import React, { useEffect } from 'react';
import {
  Home,
  BookOpen,
  Calendar,
  BarChart3,
  FileText,
  Users,
  Settings,
  HelpCircle,
  X,
  GraduationCap,
  ChevronRight,
  LogOut
} from 'lucide-react';

// interface SidebarProps {
//   sidebarOpen: boolean;
//   setSidebarOpen: (open: boolean) => void;
// }

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigation = [
    { name: 'Dashboard', icon: Home, current: true },
    { name: 'My Courses', icon: BookOpen, current: false },
    { name: 'Training Calendar', icon: Calendar, current: false },
    { name: 'Progress Reports', icon: BarChart3, current: false },
    { name: 'Assignments', icon: FileText, current: false },
    { name: 'Discussion Forums', icon: Users, current: false },
    { name: 'Settings', icon: Settings, current: false },
    { name: 'Help & Support', icon: HelpCircle, current: false },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebar = document.getElementById('sidebar');
      const menuButton = document.getElementById('menu-button');

      if (sidebarOpen &&
          sidebar &&
          !sidebar.contains(event.target) &&
          menuButton &&
          !menuButton.contains(event.target)) {
        setSidebarOpen(false);
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape' && sidebarOpen) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [sidebarOpen, setSidebarOpen]);

  useEffect(() => {
    if (sidebarOpen && window.innerWidth < 1024) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [sidebarOpen]);

  const handleLogout = () => {
    console.log('Logout clicked');
  };

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        id="sidebar"
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button
          className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-200 hover:rotate-90 transform"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center p-6 border-b border-gray-100">
          <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-gradient-to-br from-red-600 to-red-700 shadow-lg shadow-red-500/30">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <div className="ml-3">
            <span className="text-lg font-bold text-gray-900">TrainingHub</span>
            <div className="text-xs text-gray-500 font-medium">Student Portal</div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto h-[calc(100vh-200px)]">
          <div className="mb-3 px-4">
            <small className="text-xs uppercase text-gray-500 font-semibold tracking-wider">
              Navigation
            </small>
          </div>

          <nav className="space-y-0">
            {navigation.slice(1).map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href="#"
                  className={`group flex items-center px-4 py-3 text-sm font-medium transition-all duration-200 ${
                    item.current
                      ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-md shadow-red-500/30'
                      : 'text-gray-700 hover:bg-red-50 hover:text-red-700'
                  }`}
                  onClick={() => {
                    if (window.innerWidth < 1024) {
                      setSidebarOpen(false);
                    }
                  }}
                >
                  <Icon className={`h-5 w-5 mr-3 transition-all duration-200 flex-shrink-0 ${
                    item.current
                      ? 'text-white'
                      : 'text-gray-400 group-hover:text-red-600 group-hover:scale-125'
                  }`} />
                  <span className="flex-1 font-medium transition-all duration-200 group-hover:scale-110 origin-left">{item.name}</span>
                  {item.current && (
                    <ChevronRight className="h-4 w-4 animate-pulse" />
                  )}
                </a>
              );
            })}
          </nav>
        </div>

        <div className="border-t border-gray-100 bg-gradient-to-b from-white to-gray-50">
          <div className="p-4">
            {/* <div className="flex items-center p-3 rounded-lg bg-white border border-gray-200 group hover:border-red-300 hover:shadow-md transition-all duration-200">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center shadow-md ring-2 ring-red-100 group-hover:ring-red-300 transition-all duration-200">
                  <span className="text-white font-semibold text-sm">AJ</span>
                </div>
              </div>
              <div className="ml-3 flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">Alex Johnson</p>
                <p className="text-xs text-gray-500">Computer Science</p>
                <p className="text-xs text-red-700 font-medium mt-0.5">STU-2023-001</p>
              </div>
            </div> */}

            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center px-4 py-3 text-sm font-semibold text-white bg-red-700 rounded-lg hover:bg-red-800 hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 group"
            >
              <LogOut className="h-5 w-5 mr-2 transition-transform duration-200 group-hover:scale-125" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
