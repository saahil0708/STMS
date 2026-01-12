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
import {
  CalendarDaysIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  ChartBarIcon,
  ChatBubbleLeftEllipsisIcon,
  ClipboardDocumentListIcon
} from '@heroicons/react/24/outline';
import { NavLink, useNavigate } from 'react-router-dom';
import { useLogin } from '../../Context/LoginContext';
import { useState } from 'react';
import axios from 'axios';

// interface SidebarProps {
//   sidebarOpen: boolean;
//   setSidebarOpen: (open: boolean) => void;
// }

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { logout } = useLogin();
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigation = [
    { name: 'Dashboard', icon: Home, to: '/' },
    { name: 'Attendance History', icon: CalendarDaysIcon, to: '/attendance' },
    { name: 'Homework', icon: DocumentTextIcon, to: '/homework' },
    { name: 'Homework Status', icon: CheckCircleIcon, to: '/homework-status' },
    { name: 'Scores', icon: ChartBarIcon, to: '/scores' },
    { name: 'Feedback Forms', icon: ClipboardDocumentListIcon, to: '/feedback-forms' },
    { name: 'Settings', icon: Settings, to: '/settings' },
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

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = async () => {
    localStorage.setItem('logoutMessage', 'Logged out successfully');
    await logout();
    setShowLogoutConfirm(false);
    navigate('/login');
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
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
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'
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
          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-br from-red-600 to-red-700 shadow-lg shadow-red-500/30 overflow-hidden">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="Student" className="h-10 w-10" />
          </div>
          <div className="ml-3">
            <span className="text-lg font-bold text-gray-900">Alex Johnson</span>
            <div className="text-xs text-gray-500 font-medium">Roll No: STU-2023-001</div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto h-[calc(100vh-200px)]">
          <div className="mb-3 px-4">
            <small className="text-xs uppercase text-gray-500 font-semibold tracking-wider">
              Navigation
            </small>
          </div>

          <nav className="space-y-0">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.to}
                  end
                  className={({ isActive }) => `group flex items-center px-4 py-3 text-sm font-medium transition-all duration-200 ${isActive ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-md shadow-red-500/30' : 'text-gray-700 hover:bg-red-50 hover:text-red-700'}`}
                  onClick={() => {
                    if (window.innerWidth < 1024) {
                      setSidebarOpen(false);
                    }
                  }}
                >
                  {({ isActive }) => (
                    <>
                      <Icon className={`h-5 w-5 mr-3 transition-all duration-200 flex-shrink-0 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-red-600 group-hover:scale-125'}`} />
                      <span className="flex-1 font-medium transition-all duration-200 group-hover:scale-110 origin-left">{item.name}</span>
                      {/* {isActive && (
                        <ChevronRight className="h-4 w-4 animate-pulse" />
                      )} */}
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        <div className="border-t border-gray-100 bg-gradient-to-b from-white to-gray-50">
          <div className="p-4">
            <button
              onClick={handleLogoutClick}
              className="w-full flex items-center justify-center px-4 py-3 text-sm font-semibold text-white bg-red-700 rounded-lg hover:bg-red-800 hover:shadow-lg active:scale-95 transition-all duration-200 group"
            >
              <LogOut className="h-5 w-5 mr-2 transition-transform duration-200" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden transform transition-all scale-100 opacity-100">
            <div className="p-6 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <LogOut className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Sign Out?</h3>
              <p className="text-sm text-gray-500 mb-6">
                Are you sure you want to sign out of your account? You'll need to sign in again to access your dashboard.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={cancelLogout}
                  className="flex-1 px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmLogout}
                  className="flex-1 px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded hover:bg-red-700 transition-colors shadow-lg shadow-red-500/30"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
