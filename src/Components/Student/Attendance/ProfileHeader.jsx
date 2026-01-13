import React, { useState } from 'react';
import {
  UserCircleIcon,
  AcademicCapIcon,
  ArrowLeftIcon,
  ArrowDownTrayIcon as DownloadIcon,
  EnvelopeIcon,
  CalendarIcon,
  IdentificationIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import { Snackbar, Alert } from '@mui/material';

const EnhancedStudentProfileHeader = ({ studentData, onBack }) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleExport = () => {
    // Determine the user's preferred greeting time
    const hour = new Date().getHours();
    let greeting = 'Good day';
    if (hour < 12) greeting = 'Good morning';
    else if (hour < 18) greeting = 'Good afternoon';
    else greeting = 'Good evening';

    setOpenSnackbar(true);
    // Logic for actual export would go here
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Navigation */}
        <div className="py-4 flex items-center justify-between border-b border-gray-200">
          <div className="flex items-center">
            <button
              onClick={onBack}
              className="flex items-center text-gray-600 hover:text-gray-900 group"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to Dashboard</span>
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">
              Last updated: Today, 10:30 AM
            </span>
            <button
              onClick={handleExport}
              className="flex items-center px-4 py-2 bg-red-700 text-white text-sm font-medium rounded-md hover:bg-red-800 transition-colors"
            >
              <DownloadIcon className="h-4 w-4 mr-2" />
              Export Report
            </button>
          </div>
        </div>

        {/* Profile Section */}
        <div className="py-8">
          <div className="flex flex-col md:flex-row items-start md:items-center">
            {/* Avatar and Basic Info */}
            <div className="flex items-start mb-8 md:mb-0 md:mr-12">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-100 to-gray-50 border-4 border-white shadow-lg flex items-center justify-center">
                  <UserCircleIcon className="h-14 w-14 text-gray-400" />
                </div>
                <div className="absolute bottom-0 right-0 bg-green-500 w-6 h-6 rounded-full border-2 border-white shadow-sm"></div>
              </div>

              <div className="ml-6">
                <div className="flex items-center mb-2">
                  <h1 className="text-2xl font-bold text-gray-900 mr-3">{studentData.name}</h1>
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                    Active
                  </span>
                </div>

                <div className="flex flex-col space-y-1.5 border-l-2 border-gray-200 pl-4 mt-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="w-24 font-medium text-gray-500">Roll No:</span>
                    <span className="font-semibold text-gray-900">
                      {studentData.rollNumber || studentData.rollNo || studentData.id || 'N/A'}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="w-24 font-medium text-gray-500">Degree:</span>
                    <span className="font-semibold text-gray-900">
                      {studentData.degree || studentData.program || 'N/A'}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="w-24 font-medium text-gray-500">Date of Joining:</span>
                    <span className="font-semibold text-gray-900">
                      {studentData.joiningDate || studentData.enrollmentDate || (studentData.createdAt ? new Date(studentData.createdAt).toLocaleDateString() : 'N/A')}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex-1">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">Attendance Rate</div>
                  <div className="flex items-baseline">
                    <span className="text-2xl font-bold text-gray-900">{studentData.attendancePercentage}%</span>
                    <span className="ml-2 text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">+2.1%</span>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">Classes Attended</div>
                  <div className="text-2xl font-bold text-gray-900">{studentData.attendedClasses}</div>
                  <div className="text-xs text-gray-500 mt-1">of {studentData.totalClasses} total</div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">Missed Classes</div>
                  <div className="text-2xl font-bold text-gray-900">{studentData.missedClasses}</div>
                  <div className="text-xs text-gray-500 mt-1">This semester</div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">Current Courses</div>
                  <div className="text-2xl font-bold text-gray-900">4</div>
                  <div className="text-xs text-gray-500 mt-1">Active enrollments</div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">Enrollment Date</div>
                  <div className="text-lg font-semibold text-gray-900">{studentData.enrollmentDate}</div>
                  <div className="text-xs text-gray-500 mt-1">Student since</div>
                </div>
              </div>

              {/* Contact Info */}
              {/* <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-600">
                    <EnvelopeIcon className="h-4 w-4 mr-2" />
                    <span className="text-sm">{studentData.email}</span>
                  </div>
                  <button className="flex items-center text-red-700 hover:text-red-800 text-sm font-medium">
                    <span>View full profile</span>
                    <ChevronRightIcon className="h-4 w-4 ml-1" />
                  </button>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Export process started successfully! Your report will be downloaded shortly.
        </Alert>
      </Snackbar>
    </div>
  );
};

export default EnhancedStudentProfileHeader;