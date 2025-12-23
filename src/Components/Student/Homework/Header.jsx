// HomeworkHeader.jsx (Simplified)
import React from 'react';
import {
  BookOpenIcon,
  ArrowLeftIcon,
  CalendarIcon,
  CheckCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const HomeworkHeader = ({ studentData, onBack }) => {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Simple Navigation */}
        <div className="py-3">
          <div className="flex items-center">
            <button
              onClick={onBack}
              className="flex items-center text-gray-600 hover:text-gray-900 mr-6"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              {/* <span className="font-medium">Back to Dashboard</span> */}
            </button>
            <h1 className="text-xl mt-2 font-bold text-gray-900">Homework Manager</h1>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="pb-6">
          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center">
                <div className="bg-red-50 p-2 rounded-lg mr-3">
                  <BookOpenIcon className="h-5 w-5 text-red-700" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Total Assignments</div>
                  <div className="text-xl font-bold text-gray-900">{studentData.totalAssignments}</div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center">
                <div className="bg-yellow-50 p-2 rounded-lg mr-3">
                  <ClockIcon className="h-5 w-5 text-yellow-700" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Pending</div>
                  <div className="text-xl font-bold text-gray-900">{studentData.pendingAssignments}</div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center">
                <div className="bg-green-50 p-2 rounded-lg mr-3">
                  <CheckCircleIcon className="h-5 w-5 text-green-700" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Submitted</div>
                  <div className="text-xl font-bold text-gray-900">{studentData.submittedAssignments}</div>
                </div>
              </div>
            </div>
          </div> */}

          {/* Student Info Bar */}
          <div className="pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-600">
                <CalendarIcon className="h-4 w-4 mr-2" />
                <span>Showing assignments for: Current Semester</span>
              </div>
              <div className="text-sm text-gray-600">
                Average Grade: <span className="font-bold text-gray-900">{studentData.averageGrade}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeworkHeader;