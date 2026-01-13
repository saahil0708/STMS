import React from 'react';
import { Link } from 'react-router-dom';
import {
  PlusCircleIcon,
  DocumentArrowUpIcon,
  QuestionMarkCircleIcon,
  CalendarDaysIcon,
  BookmarkIcon,
  ShareIcon,
  ClipboardDocumentCheckIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';

const QuickActions = () => {
  const actions = [
    {
      title: 'View Timetable',
      description: 'Check your schedule',
      icon: CalendarDaysIcon,
      color: 'bg-red-50 text-[#991b1b]',
      action: '/courses'
    },
    {
      title: 'Submit Assignment',
      description: 'Upload your work',
      icon: DocumentArrowUpIcon,
      color: 'bg-blue-50 text-blue-600',
      action: '/homework'
    },
    {
      title: 'Check Attendance',
      description: 'View your attendance record',
      icon: ClipboardDocumentCheckIcon,
      color: 'bg-green-50 text-green-600',
      action: '/attendance'
    },
    {
      title: 'View Grades',
      description: 'Check your academic performance',
      icon: AcademicCapIcon,
      color: 'bg-purple-50 text-purple-600',
      action: '/scores'
    },
    // {
    //   title: 'Save Resources',
    //   description: 'Bookmark learning materials',
    //   icon: BookmarkIcon,
    //   color: 'bg-yellow-50 text-yellow-600',
    //   action: '/resources'
    // },
    // {
    //   title: 'Share Progress',
    //   description: 'Export your achievements',
    //   icon: ShareIcon,
    //   color: 'bg-indigo-50 text-indigo-600',
    //   action: '/share'
    // }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
        <p className="text-sm text-gray-600 mt-1">Common tasks at your fingertips</p>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-2 gap-4">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Link
                key={index}
                to={action.action}
                className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:border-[#991b1b] hover:shadow-sm transition-all duration-200 group"
              >
                <div className={`p-3 rounded-full ${action.color} group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className="h-6 w-6" />
                </div>
                <span className="mt-3 text-sm font-medium text-gray-900 text-center">
                  {action.title}
                </span>
                <span className="mt-1 text-xs text-gray-600 text-center">
                  {action.description}
                </span>
              </Link>
            );
          })}
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="bg-red-50 border border-red-100 rounded-lg p-4">
            <h3 className="text-sm font-medium text-[#991b1b]">Upcoming Deadline</h3>
            <p className="text-sm text-gray-700 mt-1">React Project Submission</p>
            <p className="text-xs text-gray-600 mt-2">Due: Dec 15, 2023 • 2 days left</p>
            <button className="mt-3 w-full py-2 bg-[#991b1b] text-white text-sm font-medium rounded-md hover:bg-red-800 transition-colors duration-200">
              Work on Assignment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;