import React, { useState, useEffect } from 'react';
import apiClient from '../../services/apiClient';
import { useLogin } from '../../Context/LoginContext';
import { ProfileSkeleton } from '../../Components/Global/SkeletonLoaders';
import EnhancedStudentProfileHeader from '../../Components/Student/Attendance/ProfileHeader';
import EnhancedAttendanceOverview from '../../Components/Student/Attendance/Overview';
import EnhancedAttendanceCalendar from '../../Components/Student/Attendance/Calendar';
import EnhancedCourseAttendance from '../../Components/Student/Attendance/AttendanceFilter';
import AttendanceInsights from '../../Components/Student/Attendance/Insights';

const StudentAttendancePage = () => {
  const { user } = useLogin();
  const [selectedMonth, setSelectedMonth] = useState('December 2023');
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [viewMode, setViewMode] = useState('calendar');
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      try {
        // Fetch real student profile (cached in Redis for 600s in backend)
        const response = await apiClient.get(`/api/students/student/${user.id || user._id}`);
        setStudentData(response.data.data || response.data);
      } catch (error) {
        console.error('Failed to fetch student profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  if (loading) {
    return (
      <div className="p-8">
        <ProfileSkeleton />
      </div>
    );
  }

  // Fallback if data fetch fails but we're not loading anymore
  const activeStudentData = studentData || {
    name: user?.name || 'Student',
    id: user?.id || 'N/A',
    program: 'Computer Science', // default fallbacks
    semester: '4th Semester',
    attendancePercentage: 0,
    totalClasses: 0,
    attendedClasses: 0,
    missedClasses: 0
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Enhanced Header */}
      <EnhancedStudentProfileHeader
        studentData={activeStudentData}
        onBack={() => window.history.back()}
      />

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Stats and Calendar */}
          <div className="lg:col-span-8 space-y-6">
            {/* Attendance Overview */}
            <EnhancedAttendanceOverview
              studentData={activeStudentData}
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