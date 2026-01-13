import React, { useState, useEffect } from 'react';
import apiClient from '../../services/apiClient';
import { Loader2 } from 'lucide-react';
import HomeworkHeader from '../../Components/Student/Homework/Header';
import HomeworkStats from '../../Components/Student/Homework/Stats';
import HomeworkFilters from '../../Components/Student/Homework/Filter';
import HomeworkList from '../../Components/Student/Homework/List';
import HomeworkCalendar from '../../Components/Student/Homework/Calendar';

const HomeworkPage = () => {
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'pending', 'submitted', 'graded'
  const [filterCourse, setFilterCourse] = useState('all');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'calendar'
  const [dateRange, setDateRange] = useState('this-week');

  const [loading, setLoading] = useState(true);
  const [assignments, setAssignments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [stats, setStats] = useState({
    totalAssignments: 0,
    pendingAssignments: 0,
    submittedAssignments: 0,
    averageGrade: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch Assignments - trying likely endpoints based on other pages
        const res = await apiClient.get('/api/assignment/my-assignments');
        const data = res.data.data || res.data; // Handle potential response wrapper

        let assignmentList = Array.isArray(data) ? data : [];
        setAssignments(assignmentList);

        // Extract Unique Courses
        const uniqueCourses = [];
        const courseMap = new Map();

        assignmentList.forEach(a => {
          if (a.courseId && !courseMap.has(a.courseId._id)) {
            courseMap.set(a.courseId._id, true);
            uniqueCourses.push({
              id: a.courseId._id,
              name: a.courseId.title || 'Unknown Course'
            });
          }
        });

        setCourses([{ id: 'all', name: 'All Courses' }, ...uniqueCourses]);

        // Calculate Stats
        const total = assignmentList.length;
        const submitted = assignmentList.filter(a => a.status === 'submitted' || a.status === 'graded').length;
        const pending = total - submitted;

        // Calculate Average Grade (only for graded ones)
        const gradedCount = assignmentList.filter(a => a.status === 'graded').length;
        const avg = gradedCount > 0
          ? assignmentList.filter(a => a.status === 'graded' && a.grade !== undefined)
            .reduce((acc, curr) => acc + curr.grade, 0) / gradedCount
          : 0;

        setStats({
          totalAssignments: total,
          pendingAssignments: pending,
          submittedAssignments: submitted,
          gradedAssignments: gradedCount,
          averageGrade: Math.round(avg * 10) / 10 // Rounded to 1 decimal
        });

      } catch (error) {
        console.error("Error fetching homework:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-red-600" />
      </div>
    );
  }

  const studentData = {
    name: 'My Dashboard', // Fallback or could fetch user info
    ...stats
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <HomeworkHeader
        studentData={studentData}
        onBack={() => window.history.back()}
      />

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Statistics */}
        <div className="mb-6">
          <HomeworkStats
            activeTab={activeTab}
            onTabChange={setActiveTab}
            studentData={studentData}
          />
        </div>

        {/* Filters and Controls */}
        <div className="mb-6">
          <HomeworkFilters
            filterCourse={filterCourse}
            viewMode={viewMode}
            dateRange={dateRange}
            courses={courses}
            onCourseChange={setFilterCourse}
            onViewModeChange={setViewMode}
            onDateRangeChange={setDateRange}
          />
        </div>

        {/* Main Content */}
        {viewMode === 'list' ? (
          <HomeworkList
            activeTab={activeTab}
            filterCourse={filterCourse}
            dateRange={dateRange}
            assignments={assignments}
          />
        ) : (
          <HomeworkCalendar
            activeTab={activeTab}
            filterCourse={filterCourse}
            dateRange={dateRange}
            assignments={assignments}
          />
        )}
      </div>
    </div>
  );
};

export default HomeworkPage;