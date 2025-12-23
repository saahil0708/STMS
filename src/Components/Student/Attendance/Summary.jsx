// EnhancedCourseAttendance.jsx
import React from 'react';
import {
  BookOpenIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  ChevronRightIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';

const EnhancedCourseAttendance = ({ selectedCourse, onCourseChange }) => {
  const courses = [
    {
      id: 'cs401',
      name: 'Advanced React Development',
      code: 'CS401',
      instructor: 'Dr. Sarah Chen',
      attendance: 92,
      present: 23,
      absent: 2,
      trend: 'up',
      trendValue: '+2.5%'
    },
    {
      id: 'cs402',
      name: 'Database Management Systems',
      code: 'CS402',
      instructor: 'Prof. James Wilson',
      attendance: 88,
      present: 22,
      absent: 3,
      trend: 'up',
      trendValue: '+1.2%'
    },
    {
      id: 'cs403',
      name: 'Cloud Computing Fundamentals',
      code: 'CS403',
      instructor: 'Dr. Michael Brown',
      attendance: 85,
      present: 21,
      absent: 4,
      trend: 'down',
      trendValue: '-1.8%'
    },
    {
      id: 'cs404',
      name: 'UI/UX Design Principles',
      code: 'CS404',
      instructor: 'Ms. Emily Davis',
      attendance: 90,
      present: 18,
      absent: 2,
      trend: 'up',
      trendValue: '+3.1%'
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-red-50 p-2 rounded-lg mr-3">
              <BookOpenIcon className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Course Performance</h3>
              <p className="text-gray-600 text-sm mt-1">Attendance by subject</p>
            </div>
          </div>
          <select
            value={selectedCourse}
            onChange={(e) => onCourseChange(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
          >
            <option value="all">All Courses</option>
            {courses.map(course => (
              <option key={course.id} value={course.id}>{course.code}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-4">
          {courses.map((course) => (
            <div 
              key={course.id}
              className={`group border border-gray-200 rounded-xl p-4 hover:border-red-300 hover:shadow-sm transition-all duration-300 ${
                selectedCourse === course.id ? 'border-red-300 bg-red-50' : ''
              }`}
              onClick={() => onCourseChange(course.id)}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center">
                    <div className="bg-gradient-to-r from-red-500 to-red-400 w-8 h-8 rounded-lg flex items-center justify-center mr-3">
                      <AcademicCapIcon className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{course.code}</h4>
                      <p className="text-sm text-gray-600 truncate max-w-[180px]">{course.name}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  {course.trend === 'up' ? (
                    <TrendingUpIcon className="h-4 w-4 text-green-500 mr-1" />
                  ) : (
                    <TrendingDownIcon className="h-4 w-4 text-red-500 mr-1" />
                  )}
                  <span className={`text-xs font-semibold ${
                    course.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {course.trendValue}
                  </span>
                </div>
              </div>

              {/* Attendance Progress */}
              <div className="mb-3">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Attendance</span>
                  <span className="font-bold text-gray-900">{course.attendance}%</span>
                </div>
                <div className="relative">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        course.attendance >= 90 ? 'bg-gradient-to-r from-green-500 to-emerald-400' :
                        course.attendance >= 80 ? 'bg-gradient-to-r from-blue-500 to-cyan-400' :
                        'bg-gradient-to-r from-red-500 to-pink-400'
                      }`}
                      style={{ width: `${course.attendance}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-green-50 rounded-lg p-2 text-center">
                  <div className="text-lg font-bold text-gray-900">{course.present}</div>
                  <div className="text-xs text-gray-600">Present</div>
                </div>
                <div className="bg-red-50 rounded-lg p-2 text-center">
                  <div className="text-lg font-bold text-gray-900">{course.absent}</div>
                  <div className="text-xs text-gray-600">Absent</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-2 text-center">
                  <div className="text-lg font-bold text-gray-900">{course.present + course.absent}</div>
                  <div className="text-xs text-gray-600">Total</div>
                </div>
              </div>

              <div className="mt-3 text-xs text-gray-500">
                Instructor: {course.instructor}
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600">Overall Course Average</div>
                <div className="text-2xl font-bold text-gray-900">88.8%</div>
              </div>
              <button className="text-red-600 hover:text-red-700 font-medium text-sm flex items-center">
                View Details
                <ChevronRightIcon className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedCourseAttendance;