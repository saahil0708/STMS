// EnhancedAttendanceCalendar.jsx
import React from 'react';
import { 
  CheckCircleIcon, 
  XCircleIcon, 
  ClockIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

const EnhancedAttendanceCalendar = ({ selectedMonth, selectedCourse, viewMode }) => {
  const attendanceData = [
    {
      date: 'Dec 1',
      day: 'Friday',
      weekday: 'Fri',
      status: 'excellent',
      classes: [
        { course: 'Advanced React', time: '10:00 AM', status: 'present' },
        { course: 'Database Systems', time: '2:00 PM', status: 'present' }
      ]
    },
    {
      date: 'Dec 4',
      day: 'Monday',
      weekday: 'Mon',
      status: 'good',
      classes: [
        { course: 'Cloud Computing', time: '11:00 AM', status: 'present' },
        { course: 'UI/UX Design', time: '3:00 PM', status: 'absent' }
      ]
    },
    {
      date: 'Dec 5',
      day: 'Tuesday',
      weekday: 'Tue',
      status: 'excellent',
      classes: [
        { course: 'Advanced React', time: '10:00 AM', status: 'present' },
        { course: 'Database Systems', time: '2:00 PM', status: 'present' }
      ]
    },
    // {
    //   date: 'Dec 6',
    //   day: 'Wednesday',
    //   weekday: 'Wed',
    //   status: 'poor',
    //   classes: [
    //     { course: 'Cloud Computing', time: '11:00 AM', status: 'absent' },
    //     { course: 'UI/UX Design', time: '3:00 PM', status: 'present' }
    //   ]
    // },
    // {
    //   date: 'Dec 7',
    //   day: 'Thursday',
    //   weekday: 'Thu',
    //   status: 'excellent',
    //   classes: [
    //     { course: 'Advanced React', time: '10:00 AM', status: 'present' },
    //     { course: 'Database Systems', time: '2:00 PM', status: 'present' }
    //   ]
    // }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent': return 'bg-gradient-to-r from-green-500 to-emerald-400';
      case 'good': return 'bg-gradient-to-r from-blue-500 to-cyan-400';
      case 'poor': return 'bg-gradient-to-r from-red-500 to-pink-400';
      default: return 'bg-gradient-to-r from-gray-500 to-gray-400';
    }
  };

  const getClassStatusIcon = (status) => {
    switch (status) {
      case 'present':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'absent':
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
      case 'late':
        return <ClockIcon className="h-5 w-5 text-yellow-500" />;
      default:
        return <CheckCircleIcon className="h-5 w-5 text-gray-400" />;
    }
  };

  const getClassStatusColor = (status) => {
    switch (status) {
      case 'present': return 'bg-green-50 border-green-200';
      case 'absent': return 'bg-red-50 border-red-200';
      case 'late': return 'bg-yellow-50 border-yellow-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Daily Attendance</h3>
            <p className="text-gray-600 mt-1">{selectedMonth}</p>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {viewMode === 'calendar' ? (
          // Calendar View
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 auto-rows-min">
            {attendanceData.map((day, index) => (
              <div key={index} className="group min-w-0">
                <div className={`relative overflow-hidden flex flex-col h-full rounded-xl border border-gray-200 group-hover:border-red-300 transition-all duration-300 ${getClassStatusColor(day.classes.some(c => c.status === 'absent') ? 'absent' : 'present')}`}>
                  {/* Status Indicator */}
                  <div className={`absolute top-0 left-0 w-full h-1 ${getStatusColor(day.status)}`}></div>
                  
                  <div className="p-4 flex-1 flex flex-col">
                    {/* Date Header */}
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="text-2xl font-bold text-gray-900">{day.date}</div>
                        <div className="text-sm text-gray-600">{day.weekday}</div>
                      </div>
                      <div className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(day.status)} text-white max-w-[10rem] sm:max-w-[12rem] truncate whitespace-nowrap text-center`}>
                        {day.status === 'excellent' ? 'Excellent' : day.status === 'good' ? 'Good' : 'Needs Improvement'}
                      </div>
                    </div>

                    {/* Classes List */}
                    <div className="space-y-3">
                      {day.classes.map((classItem, classIndex) => (
                        <div key={classIndex} className="flex items-start sm:items-center justify-between gap-3">
                          <div className="min-w-0">
                            <div className="font-medium text-gray-900 text-sm truncate">{classItem.course}</div>
                            <div className="text-xs text-gray-500 truncate">{classItem.time}</div>
                          </div>
                          <div className="flex items-center flex-shrink-0 whitespace-nowrap ml-2">
                            {getClassStatusIcon(classItem.status)}
                            <span className={`ml-2 text-xs font-medium ${
                              classItem.status === 'present' ? 'text-green-600' :
                              classItem.status === 'absent' ? 'text-red-600' :
                              'text-yellow-600'
                            }`}>
                              {classItem.status.charAt(0).toUpperCase() + classItem.status.slice(1)}
                            </span>
                          </div>
                        </div>
                      ))} 
                    </div>

                    {/* Summary */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="text-xs text-gray-600 truncate">
                        {day.classes.filter(c => c.status === 'present').length} of {day.classes.length} attended
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // List View
          <div className="space-y-4">
            {attendanceData.map((day, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-4 hover:border-red-300 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-bold text-gray-900">{day.date} • {day.day}</h4>
                  </div>
                  <div className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(day.status)} text-white`}>
                    {day.status.charAt(0).toUpperCase() + day.status.slice(1)}
                  </div>
                </div>
                
                <div className="space-y-2">
                  {day.classes.map((classItem, classIndex) => (
                    <div key={classIndex} className={`flex items-start sm:items-center justify-between gap-3 p-3 rounded-lg ${getClassStatusColor(classItem.status)}`}>
                      <div className="flex items-start sm:items-center min-w-0">
                        {getClassStatusIcon(classItem.status)}
                        <div className="ml-3 min-w-0">
                          <div className="font-medium text-gray-900 truncate">{classItem.course}</div>
                          <div className="text-sm text-gray-600 truncate">{classItem.time}</div>
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        classItem.status === 'present' ? 'bg-green-100 text-green-800' :
                        classItem.status === 'absent' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      } whitespace-nowrap`}>
                        {classItem.status.charAt(0).toUpperCase() + classItem.status.slice(1)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="mt-8 flex justify-center">
          <div className="flex items-center space-x-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
              Previous Week
            </button>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm">
              Next Week
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedAttendanceCalendar;