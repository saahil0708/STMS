import React, { useState, useEffect } from 'react';
import apiClient from '../../services/apiClient';
import { useLogin } from '../../Context/LoginContext';
import { ProfileSkeleton } from '../../Components/Global/SkeletonLoaders';
import EnhancedStudentProfileHeader from '../../Components/Student/Attendance/ProfileHeader';
import EnhancedAttendanceOverview from '../../Components/Student/Attendance/Overview';
import EnhancedAttendanceCalendar from '../../Components/Student/Attendance/Calendar';
import EnhancedCourseAttendance from '../../Components/Student/Attendance/AttendanceFilter';
import AttendanceInsights from '../../Components/Student/Attendance/Insights';
import AttendanceGraph from '../../Components/Student/Attendance/AttendanceGraph';

const StudentAttendancePage = () => {
  const { user } = useLogin();
  const [selectedMonth, setSelectedMonth] = useState('December 2023');
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [viewMode, setViewMode] = useState('calendar');
  const [studentData, setStudentData] = useState(null);
  const [attendanceHistory, setAttendanceHistory] = useState([]); // New state for history
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      try {
        setLoading(true);
        // 1. Fetch real student profile
        const profileRes = await apiClient.get(`/api/auth/student/student/${user.id || user._id}`);
        setStudentData(profileRes.data.data || profileRes.data);

        // 2. Fetch attendance history
        const historyRes = await apiClient.get('/api/attendance/my-attendance');
        const historyData = historyRes.data.data || historyRes.data; // Expecting array

        if (Array.isArray(historyData)) {
          // Transform and group by date
          // Assuming historyData items have: { date, status, courseId: { title }, slot: { startTime } }
          // We need to group them.
          const grouped = historyData.reduce((acc, record) => {
            const dateObj = new Date(record.date);
            const dateKey = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }); // Dec 1

            if (!acc[dateKey]) {
              acc[dateKey] = {
                date: dateKey,
                fullDate: record.date, // Store full date for sorting
                day: dateObj.toLocaleDateString('en-US', { weekday: 'long' }), // Friday
                weekday: dateObj.toLocaleDateString('en-US', { weekday: 'short' }), // Fri
                status: 'good', // Default, will calculate
                classes: []
              };
            }

            acc[dateKey].classes.push({
              course: record.courseId?.title || 'Unknown Course',
              time: record.slot?.startTime || 'N/A', // Assuming slot populated or just a time field
              status: record.status // 'present', 'absent', etc.
            });
            return acc;
          }, {});

          // Calculate daily status based on classes
          const processedHistory = Object.values(grouped).map(day => {
            const presentCount = day.classes.filter(c => c.status === 'present').length;
            const total = day.classes.length;
            const percentage = total === 0 ? 0 : (presentCount / total) * 100;

            let dailyStatus = 'good';
            if (percentage === 100) dailyStatus = 'excellent';
            else if (percentage < 50) dailyStatus = 'poor';

            return { ...day, status: dailyStatus, percentage: Math.round(percentage) };
          });

          // Sort by date descending (assuming new dates are better on top/first)
          // Ideally parse date again to sort
          setAttendanceHistory(processedHistory);
        }

      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
              attendanceData={attendanceHistory} // Pass real data
            />

            {/* Attendance Graph */}
            <AttendanceGraph
              data={[...attendanceHistory].sort((a, b) => new Date(a.fullDate) - new Date(b.fullDate))}
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