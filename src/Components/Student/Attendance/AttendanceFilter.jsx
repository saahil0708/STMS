// AttendanceFilters.jsx
import React from 'react';
import { AdjustmentsHorizontalIcon as FilterIcon, DocumentTextIcon, CalendarIcon, ChevronDownIcon, TableCellsIcon as ViewGridIcon, ListBulletIcon as ViewListIcon } from '@heroicons/react/24/outline';

const AttendanceFilters = ({
  selectedMonth,
  selectedCourse,
  viewMode,
  onMonthChange,
  onCourseChange,
  onViewModeChange
}) => {
  const months = [
    'August 2023',
    'September 2023',
    'October 2023',
    'November 2023',
    'December 2023',
    'January 2024'
  ];

  const courses = [
    { id: 'all', name: 'All Courses' },
    { id: 'cs401', name: 'Advanced React Development' },
    { id: 'cs402', name: 'Database Management Systems' },
    { id: 'cs403', name: 'Cloud Computing Fundamentals' },
    { id: 'cs404', name: 'UI/UX Design Principles' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        {/* <div className="flex items-center">
          <FilterIcon className="h-5 w-5 text-gray-400 mr-2" />
          <span className="text-sm font-medium text-gray-700">Filters</span>
        </div> */}

        <div className="flex flex-col sm:flex-row sm:flex-wrap items-center gap-3">
          {/* Month Selector */}
          <div className="flex items-center min-w-0 w-full sm:w-auto">
            <CalendarIcon className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
            <select
              value={selectedMonth}
              onChange={(e) => onMonthChange(e.target.value)}
              className="border border-gray-300 rounded-lg px-2 py-1.5 outline-none text-sm focus:ring-2 focus:ring-red-700 focus:border-red-700 min-w-0 w-full sm:w-[220px] truncate"
            >
              {months.map((month) => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
            {/* <ChevronDownIcon className="h-4 w-4 text-gray-400 ml-2 flex-shrink-0" /> */}
          </div>

          {/* Course Filter */}
          <div className="flex items-center min-w-0 w-full sm:w-auto">
            <DocumentTextIcon className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
            <select
              value={selectedCourse}
              onChange={(e) => onCourseChange(e.target.value)}
              className="border border-gray-300 rounded-lg px-2 py-1.5 text-sm focus:ring-2 focus:ring-red-700 focus:border-red-700 min-w-0 w-full sm:w-[240px] truncate"
            >
              {courses.map((course) => (
                <option key={course.id} value={course.id}>{course.name}</option>
              ))}
            </select>
          </div>

          {/* View Toggle */}
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden w-full sm:w-auto justify-center flex-shrink-0">
            <button
              onClick={() => onViewModeChange('monthly')}
              className={`px-3 py-1.5 text-sm ${viewMode === 'monthly' ? 'bg-red-700 text-white' : 'bg-white text-gray-700'}`}
            >
              <ViewGridIcon className="h-4 w-4" />
            </button>
            <button
              onClick={() => onViewModeChange('weekly')}
              className={`px-3 py-1.5 text-sm ${viewMode === 'weekly' ? 'bg-red-700 text-white' : 'bg-white text-gray-700'}`}
            >
              <ViewListIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceFilters;