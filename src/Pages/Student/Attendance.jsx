// StudentAttendancePage.jsx
import React, { useState } from 'react';
import EnhancedStudentProfileHeader from '../../Components/Student/Attendance/ProfileHeader';
import EnhancedAttendanceOverview from '../../Components/Student/Attendance/Overview';
import EnhancedAttendanceCalendar from '../../Components/Student/Attendance/Calendar';
import EnhancedCourseAttendance from '../../Components/Student/Attendance/AttendanceFilter';
import AttendanceInsights from '../../Components/Student/Attendance/Insights';

const StudentAttendancePage = () => {
  const [selectedMonth, setSelectedMonth] = useState('December 2023');
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [viewMode, setViewMode] = useState('calendar');

  const studentData = {
    name: 'Alex Johnson',
    id: 'STU-2023-001',
    program: 'Computer Science',
    semester: '4th Semester',
    email: 'alex.johnson@university.edu',
    enrollmentDate: 'August 2023',
    attendancePercentage: 87.5,
    totalClasses: 84,
    attendedClasses: 73,
    missedClasses: 11
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Enhanced Header */}
      <EnhancedStudentProfileHeader 
        studentData={studentData}
        onBack={() => window.history.back()}
      />

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Stats and Calendar */}
          <div className="lg:col-span-8 space-y-6">
            {/* Attendance Overview */}
            <EnhancedAttendanceOverview 
              studentData={studentData}
              selectedMonth={selectedMonth}
              onMonthChange={setSelectedMonth}
              onViewModeChange={setViewMode}
              viewMode={viewMode}
            />

            {/* Attendance Calendar/List */}
            <EnhancedAttendanceCalendar 
              selectedMonth={selectedMonth}
              selectedCourse={selectedCourse}
              viewMode={viewMode}
            />
          </div>

          {/* Right Column - Course Stats and Insights */}
          <div className="lg:col-span-4 space-y-6">
            {/* Course Performance */}
            <EnhancedCourseAttendance 
              selectedCourse={selectedCourse}
              onCourseChange={setSelectedCourse}
            />

            {/* Attendance Insights */}
            <AttendanceInsights />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentAttendancePage;