import React from 'react';
import { BookOpenIcon, CalendarIcon, UserCircleIcon, ClockIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const CourseProgress = () => {
  const courses = [
    {
      id: 1,
      name: 'Advanced React Development',
      instructor: 'Dr. Sarah Chen',
      startDate: 'Sep 10, 2023',
      endDate: 'Dec 10, 2023',
      nextDeadline: 'Dec 15, 2023',
      duration: '3 months',
      creditHours: 4
    },
    {
      id: 2,
      name: 'Database Management Systems',
      instructor: 'Prof. James Wilson',
      startDate: 'Aug 5, 2023',
      endDate: 'Dec 5, 2023',
      nextDeadline: 'Completed',
      duration: '4 months',
      creditHours: 3
    },
    {
      id: 3,
      name: 'Cloud Computing Fundamentals',
      instructor: 'Dr. Michael Brown',
      startDate: 'Oct 15, 2023',
      endDate: 'Jan 15, 2024',
      nextDeadline: 'Jan 10, 2024',
      duration: '3 months',
      creditHours: 3
    },
    {
      id: 4,
      name: 'UI/UX Design Principles',
      instructor: 'Ms. Emily Davis',
      startDate: 'Nov 20, 2023',
      endDate: 'Feb 5, 2024',
      nextDeadline: 'Feb 5, 2024',
      duration: '2.5 months',
      creditHours: 2
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-auto">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <h5 className="text-lg font-bold text-gray-900">My Courses</h5>
            {/* <p className="text-gray-500 text-sm">Track your enrolled courses</p> */}
          </div>
          <button className="px-3 py-1.5 text-sm font-medium text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors">
            View All
          </button>
        </div>
      </div>

      <div className="p-0">
        <div className="divide-y divide-gray-100">
          {courses.map((course) => (
            <div key={course.id} className="p-5 hover:bg-gray-50 transition-colors">
              <div className="flex flex-wrap items-center -mx-4">
                {/* Course Info */}
                <div className="w-full lg:w-5/12 px-4 mb-4 lg:mb-0">
                  <div className="flex items-start">
                    <div className="bg-red-50 p-2.5 rounded-full mr-4 shrink-0">
                      <BookOpenIcon className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <h6 className="font-bold text-gray-900 mb-1">{course.name}</h6>
                      <div className="flex items-center text-sm text-gray-500">
                        <UserCircleIcon className="h-4 w-4 mr-1.5" />
                        <span>{course.instructor}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Duration and Credits */}
                <div className="w-full sm:w-1/2 lg:w-3/12 px-4 mb-4 lg:mb-0">
                  <div className="flex flex-col">
                    <div className="flex items-center mb-1 text-sm text-gray-900">
                      <ClockIcon className="h-4 w-4 text-gray-400 mr-2" />
                      <span>{course.duration}</span>
                    </div>
                    <small className="text-gray-500 ml-6 text-xs">{course.creditHours} credit hours</small>
                  </div>
                </div>

                {/* Dates */}
                <div className="w-full sm:w-1/2 lg:w-3/12 px-4 mb-4 lg:mb-0">
                  <div className="flex flex-col space-y-1">
                    <small className="text-gray-500 flex items-center text-xs">
                      <CalendarIcon className="h-3.5 w-3.5 mr-1.5 opacity-70" />
                      Start: {course.startDate}
                    </small>
                    <small className="text-gray-500 flex items-center text-xs">
                      <CalendarIcon className="h-3.5 w-3.5 mr-1.5 opacity-70" />
                      End: {course.endDate}
                    </small>
                  </div>
                </div>

                {/* Action */}
                <div className="w-full lg:w-1/12 px-4 text-right flex lg:block justify-between items-center">
                  {course.nextDeadline !== 'Completed' && (
                    <span className="lg:hidden px-2 py-1 bg-red-50 text-red-700 rounded text-xs font-semibold">
                      Due Soon
                    </span>
                  )}
                  <button className="p-2 text-gray-400 border border-gray-200 rounded-lg hover:text-red-600 hover:bg-white hover:border-red-200 transition-all shadow-sm">
                    <ArrowRightIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Deadline info for mobile */}
              {course.nextDeadline !== 'Completed' && (
                <div className="mt-4 lg:hidden">
                  <div className="bg-red-50 text-red-800 p-3 rounded-lg text-sm flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    <span className="font-semibold">Next deadline: {course.nextDeadline}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer with Actions */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 rounded-b-xl leading-none">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-xs text-gray-500">
              Showing <span className="font-medium text-gray-900">{courses.length}</span> of 8 courses •
              <span className="text-green-600 font-medium ml-2">4 active</span>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 shadow-sm transition-colors">
                Download Schedule
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;