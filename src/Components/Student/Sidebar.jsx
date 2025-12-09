import React from 'react';
import {
  HomeIcon,
  BookOpenIcon,
  CalendarIcon,
  ChartBarIcon,
  DocumentTextIcon,
  UserGroupIcon,
  CogIcon,
  QuestionMarkCircleIcon,
  XMarkIcon,
  AcademicCapIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigation = [
    { name: 'Dashboard', icon: HomeIcon, current: true },
    { name: 'My Courses', icon: BookOpenIcon, current: false },
    { name: 'Training Calendar', icon: CalendarIcon, current: false },
    { name: 'Progress Reports', icon: ChartBarIcon, current: false },
    { name: 'Assignments', icon: DocumentTextIcon, current: false },
    { name: 'Discussion Forums', icon: UserGroupIcon, current: false },
    { name: 'Settings', icon: CogIcon, current: false },
    { name: 'Help & Support', icon: QuestionMarkCircleIcon, current: false },
  ];

  return (
    <aside 
      className={`fixed top-0 right-0 h-full w-72 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : 'translate-x-full'
      } lg:translate-x-0 lg:relative lg:w-64`}
    >
      {/* Close button for mobile */}
      <button
        className="absolute top-4 right-4 p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 lg:hidden"
        onClick={() => setSidebarOpen(false)}
      >
        <XMarkIcon className="h-5 w-5" />
      </button>

      {/* Logo Section */}
      <div className="flex items-center p-4 border-b">
        <AcademicCapIcon className="h-8 w-8 text-red-700 mr-3" />
        <div>
          <span className="text-lg font-bold text-gray-900">TrainingHub</span>
          <div className="text-xs text-gray-500">Student Portal</div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="mb-4">
          <small className="text-xs uppercase text-gray-500 font-semibold tracking-wider">
            Databases
          </small>
        </div>
        
        <nav className="space-y-1">
          {navigation.slice(1).map((item) => (
            <a
              key={item.name}
              href="#"
              className={`flex items-center px-3 py-2.5 text-sm rounded-md transition-colors ${
                item.current
                  ? 'bg-red-700 text-white'
                  : 'text-gray-700 hover:bg-red-50 hover:text-red-700'
              }`}
            >
              <item.icon className={`h-5 w-5 mr-3 ${item.current ? 'text-white' : 'text-gray-400'}`} />
              <span className="flex-1 font-medium">{item.name}</span>
              {item.current && (
                <ChevronRightIcon className="h-4 w-4" />
              )}
            </a>
          ))}
        </nav>
      </div>

      {/* User Profile */}
      <div className="p-4 border-t bg-gray-50">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="h-10 w-10 rounded-full bg-red-700 flex items-center justify-center">
              <span className="text-white font-semibold">AJ</span>
            </div>
          </div>
          <div className="ml-3">
            <p className="text-sm font-semibold text-gray-900">Alex Johnson</p>
            <p className="text-xs text-gray-500">Computer Science</p>
            <p className="text-xs text-red-700 font-medium mt-1">Student ID: STU-2023-001</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;