// HomeworkFilters.jsx
import React from 'react';
import {
  FunnelIcon,
  ViewColumnsIcon,
  CalendarIcon,
  ListBulletIcon as ViewListIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';

const HomeworkFilters = ({
  filterCourse,
  viewMode,
  dateRange,
  courses,
  onCourseChange,
  onViewModeChange,
  onDateRangeChange
}) => {
  const dateRanges = [
    { id: 'all', label: 'All Dates' },
    { id: 'today', label: 'Today' },
    { id: 'this-week', label: 'This Week' },
    { id: 'next-week', label: 'Next Week' },
    { id: 'this-month', label: 'This Month' }
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        {/* Filter Label */}
        <div className="flex items-center">
          <FunnelIcon className="h-5 w-5 text-gray-400 mr-2" />
          <span className="text-sm font-medium text-gray-700">Filter Homework</span>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          {/* Course Filter */}
          <div className="relative">
            <select
              value={filterCourse}
              onChange={(e) => onCourseChange(e.target.value)}
              className="appearance-none border border-gray-300 rounded-lg px-4 py-2 pl-10 pr-8 text-sm focus:ring-2 focus:ring-red-700 focus:border-red-700"
            >
              {courses.map((course) => (
                <option key={course.id} value={course.id}>{course.name}</option>
              ))}
            </select>
            <ViewColumnsIcon className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <ChevronDownIcon className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>

          {/* Date Range Filter */}
          <div className="relative">
            <select
              value={dateRange}
              onChange={(e) => onDateRangeChange(e.target.value)}
              className="appearance-none border border-gray-300 rounded-lg px-4 py-2 pl-10 pr-8 text-sm focus:ring-2 focus:ring-red-700 focus:border-red-700"
            >
              {dateRanges.map((range) => (
                <option key={range.id} value={range.id}>{range.label}</option>
              ))}
            </select>
            <CalendarIcon className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <ChevronDownIcon className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>

          {/* View Toggle */}
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => onViewModeChange('list')}
              className={`px-3 py-2 ${viewMode === 'list' ? 'bg-red-700 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            >
              <ViewListIcon className="h-4 w-4" />
            </button>
            <button
              onClick={() => onViewModeChange('calendar')}
              className={`px-3 py-2 ${viewMode === 'calendar' ? 'bg-red-700 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            >
              <CalendarIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeworkFilters;