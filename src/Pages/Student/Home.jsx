import React, { useState } from 'react';
import TopNav from '../../Components/Global/Top_Navbar';
import Sidebar from '../../Components/Student/Sidebar';
import TodayClass from '../../Components/Student/Home/TodayClass';
import NoClassesToday from '../../Components/Student/Home/NoClass';
import CourseProgress from '../../Components/Student/Home/CourseProgress';
import RecentActivities from '../../Components/Student/Home/RecentActivities';
import QuickActions from '../../Components/Student/Home/QuickActions';

function Home() {
  const hasClassesToday = true; // Change to false to test NoClassesToday component

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Main Content */}
      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Welcome back, Alex Johnson
          </h1>
          <p className="text-gray-600">
            Track your training progress and upcoming activities
          </p>
        </div>

        {/* Stats Grid */}
        <div className="mb-8">
          {hasClassesToday ? <TodayClass /> : <NoClassesToday />}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            <CourseProgress />
            <RecentActivities />
          </div>

          {/* Right Column - 1/3 width */}
          <div className="space-y-6">
            <QuickActions />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;