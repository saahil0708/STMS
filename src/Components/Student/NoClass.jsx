import React from 'react';
import { CalendarIcon, AcademicCapIcon } from '@heroicons/react/24/outline';

const NoClassesToday = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-red-50 mb-4">
          <CalendarIcon className="h-7 w-7 text-red-600" />
        </div>
        <h3 className="text-base font-medium text-gray-900 mb-2">No Classes Scheduled</h3>
        <p className="text-sm text-gray-600 mb-6">
          You have no classes scheduled for today.
        </p>
        
        {/* <div className="space-y-2 mb-6 text-left max-w-xs mx-auto">
          <div className="flex items-center text-sm text-gray-700">
            <AcademicCapIcon className="h-4 w-4 text-red-600 mr-2" />
            <span>Review course materials</span>
          </div>
          <div className="flex items-center text-sm text-gray-700">
            <AcademicCapIcon className="h-4 w-4 text-red-600 mr-2" />
            <span>Work on assignments</span>
          </div>
          <div className="flex items-center text-sm text-gray-700">
            <AcademicCapIcon className="h-4 w-4 text-red-600 mr-2" />
            <span>Prepare for upcoming classes</span>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default NoClassesToday;