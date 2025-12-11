import React from 'react';
import {
  ClockIcon,
  VideoCameraIcon,
  AcademicCapIcon,
  UserGroupIcon,
  CalendarIcon,
  ChevronRightIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

const TodaysClasses = () => {
  const todaysClasses = [
    {
      id: 1,
      course: 'Advanced React Development',
      time: '10:00 AM - 11:30 AM',
      type: 'Lecture',
      instructor: 'Dr. Sarah Chen',
      attendees: 45,
      isOnline: false,
      status: 'completed',
      progress: '85%'
    },
    {
      id: 2,
      course: 'Database Management Systems',
      time: '2:00 PM - 3:30 PM',
      type: 'Lab Session',
      instructor: 'Prof. James Wilson',
      attendees: 28,
      isOnline: false,
      status: 'in-progress',
      progress: '50%'
    },
    {
      id: 3,
      course: 'Cloud Computing Fundamentals',
      time: '4:00 PM - 5:30 PM',
      type: 'Lecture',
      instructor: 'Dr. Michael Brown',
      attendees: 62,
      isOnline: true,
      status: 'upcoming',
      progress: '0%'
    },
    {
      id: 4,
      course: 'UI/UX Design Principles',
      time: '6:00 PM - 7:30 PM',
      type: 'Workshop',
      instructor: 'Ms. Emily Davis',
      attendees: 35,
      isOnline: false,
      status: 'upcoming',
      progress: '0%'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50';
      case 'in-progress': return 'text-blue-600 bg-blue-50';
      case 'upcoming': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return '✓';
      case 'in-progress': return '⏳';
      case 'upcoming': return '⏰';
      default: return '•';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header with stats */}
      <div className="px-5 py-2 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div className='flex items-center'>
            <div className="flex justify-center items-center">
              <CalendarIcon className="h-5 w-5 text-red-700 mr-2" />
              <h2 className="text-base font-semibold mt-[9px] text-gray-900">Today's Schedule</h2>
            </div>
            {/* <div className="flex items-center space-x-4 text-xs text-gray-600">
              <span className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-1.5"></div>
                Completed
              </span>
              <span className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-blue-500 mr-1.5"></div>
                In Progress
              </span>
              <span className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-gray-400 mr-1.5"></div>
                Upcoming
              </span>
            </div> */}
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-gray-900">{todaysClasses.length} Classes</div>
            <div className="text-xs text-gray-500">Today</div>
          </div>
        </div>
      </div>

      {/* Classes List with enhanced layout */}
      <div className="divide-y divide-gray-100">
        {todaysClasses.map((classItem) => (
          <div key={classItem.id} className="px-5 py-4 hover:bg-gray-50 transition-colors">
            <div className="space-y-3">
              {/* Top row - Course info and status */}
              <div className="flex justify-between items-start">
                <div className="flex items-start">
                  <div className={`p-2 rounded-lg mr-3 ${classItem.isOnline ? 'bg-blue-50 text-blue-600' : 'bg-red-50 text-red-600'}`}>
                    {classItem.isOnline ? (
                      <VideoCameraIcon className="h-4 w-4" />
                    ) : (
                      <AcademicCapIcon className="h-4 w-4" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">{classItem.course}</h3>
                    <div className="flex items-center text-xs text-gray-600">
                      <span className="font-medium">{classItem.instructor}</span>
                      <span className="mx-1.5">•</span>
                      <span className={`px-1.5 py-0.5 rounded ${getStatusColor(classItem.status)}`}>
                        <span className="mr-1">{getStatusIcon(classItem.status)}</span>
                        {classItem.status.replace('-', ' ')}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="p-1.5 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <ChevronRightIcon className="h-3.5 w-3.5 text-gray-500" />
                </button>
              </div>

              {/* Middle row - Time and attendees */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-xs text-gray-700">
                    <ClockIcon className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
                    <span className="font-medium">{classItem.time}</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-600">
                    <UserGroupIcon className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
                    <span>{classItem.attendees} students</span>
                  </div>
                </div>
                <span className="text-xs font-medium text-gray-900">{classItem.type}</span>
              </div>

              {/* Bottom row - Progress indicator (for in-progress/upcoming) */}
              {/* {(classItem.status === 'in-progress' || classItem.status === 'upcoming') && (
                <div className="pt-2">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Progress</span>
                    <span className="font-medium">{classItem.progress}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className={`h-1.5 rounded-full ${
                        classItem.status === 'in-progress' ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                      style={{ width: classItem.progress }}
                    ></div>
                  </div>
                </div>
              )} */}

              {/* Completed indicator */}
              {/* {classItem.status === 'completed' && (
                <div className="flex items-center text-xs text-green-600 bg-green-50 px-3 py-1.5 rounded">
                  <CheckCircleIcon className="h-3.5 w-3.5 mr-1.5" />
                  <span>Completed • Materials available</span>
                </div>
              )} */}
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced Footer */}
      <div className="px-5 py-4 border-t border-gray-200 bg-gray-50">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center space-x-4 mb-3 sm:mb-0">
            <div className="text-center">
              <div className="text-sm font-bold text-gray-900">1</div>
              <div className="text-xs text-gray-600">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-bold text-blue-600">1</div>
              <div className="text-xs text-gray-600">In Progress</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-bold text-gray-900">2</div>
              <div className="text-xs text-gray-600">Upcoming</div>
            </div>
          </div>
          <div className="flex space-x-2">
            {/* <button className="px-3 py-1.5 border border-red-700 text-red-700 text-xs font-medium rounded hover:bg-red-50">
              View Calendar
            </button> */}
            <button className="px-3 py-1.5 bg-red-700 text-white text-[15px] font-medium rounded hover:bg-red-800">
              Set Reminders
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodaysClasses; 