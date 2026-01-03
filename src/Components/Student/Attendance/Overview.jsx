// EnhancedAttendanceOverview.jsx
import React from 'react';
import {
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  CalendarIcon,
  ChevronDownIcon,
  TableCellsIcon as ViewGridIcon,
  ListBulletIcon as ViewListIcon
} from '@heroicons/react/24/outline';

const EnhancedAttendanceOverview = ({
  studentData,
  selectedMonth,
  onMonthChange,
  onViewModeChange,
  viewMode
}) => {
  const months = [
    'August 2023', 'September 2023', 'October 2023',
    'November 2023', 'December 2023', 'January 2024'
  ];

  const stats = [
    {
      title: 'Present',
      value: studentData?.attendedClasses || 0,
      icon: CheckCircleIcon,
      color: 'from-green-500 to-emerald-400',
      bgColor: 'bg-green-50',
      trend: '+3 from last month'
    },
    {
      title: 'Absent',
      value: studentData?.missedClasses || 0,
      icon: XCircleIcon,
      color: 'from-red-500 to-pink-400',
      bgColor: 'bg-red-50',
      trend: '-2 from last month'
    },
    {
      title: 'Total Classes',
      value: studentData?.totalClasses || 0,
      icon: CalendarIcon,
      color: 'from-blue-500 to-cyan-400',
      bgColor: 'bg-blue-50',
      trend: 'This month'
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="p-6">
        {/* Header with Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Attendance Overview</h3>
            <p className="text-gray-600 mt-1">Track your attendance performance</p>
          </div>

          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            {/* Month Selector */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CalendarIcon className="h-4 w-4 text-gray-400" />
              </div>
              <select
                value={selectedMonth}
                onChange={(e) => onMonthChange(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 appearance-none bg-white"
              >
                {months.map((month) => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
              <ChevronDownIcon className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>

            {/* View Toggle */}
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => onViewModeChange('calendar')}
                className={`px-3 py-2 ${viewMode === 'calendar' ? 'bg-red-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              >
                <ViewGridIcon className="h-4 w-4" />
              </button>
              <button
                onClick={() => onViewModeChange('list')}
                className={`px-3 py-2 ${viewMode === 'list' ? 'bg-red-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              >
                <ViewListIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Attendance Percentage Card */}
          <div className="md:col-span-1 bg-gradient-to-br from-red-600 to-red-500 rounded-xl p-6 text-white">
            <div className="text-4xl font-bold mb-2">{studentData?.attendancePercentage || 0}%</div>
            <div className="text-sm opacity-90">Overall Attendance</div>
            <div className="mt-4 text-xs opacity-75">Target: 85%</div>
          </div>

          {/* Stats Cards */}
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600 mt-1">{stat.title}</div>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`h-6 w-6 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} />
                  </div>
                </div>
                <div className="mt-4 text-xs text-gray-500">{stat.trend}</div>
              </div>
            );
          })}
        </div>

        {/* Progress Bar */}
        <div className="mt-8">
          <div className="flex justify-between text-sm text-gray-600 mb-3">
            <span>Attendance Progress</span>
            <span className="font-semibold">{studentData?.attendancePercentage || 0}%</span>
          </div>
          <div className="relative">
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-red-600 to-red-400 h-3 rounded-full"
                style={{ width: `${studentData?.attendancePercentage || 0}%` }}
              ></div>
            </div>
            <div
              className="absolute top-0 h-3 w-0.5 bg-red-700"
              style={{ left: '85%' }}
            >
              <div className="absolute -top-5 -right-2 text-xs font-semibold text-red-700">Target</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedAttendanceOverview;