// HomeworkPage.jsx
import React, { useState } from 'react';
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

  // Mock data
  const studentData = {
    name: 'Alex Johnson',
    id: 'STU-2023-001',
    totalAssignments: 42,
    pendingAssignments: 8,
    submittedAssignments: 34,
    averageGrade: 87.5
  };

  const courses = [
    { id: 'all', name: 'All Courses' },
    { id: 'cs401', name: 'Advanced React Development' },
    { id: 'cs402', name: 'Database Management Systems' },
    { id: 'cs403', name: 'Cloud Computing Fundamentals' },
    { id: 'cs404', name: 'UI/UX Design Principles' }
  ];

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
          />
        ) : (
          <HomeworkCalendar 
            activeTab={activeTab}
            filterCourse={filterCourse}
            dateRange={dateRange}
          />
        )}
      </div>
    </div>
  );
};

export default HomeworkPage;