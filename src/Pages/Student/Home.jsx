import React, { useState } from 'react';
import { useLogin } from '../../Context/LoginContext';
import TopNav from '../../Components/Global/Top_Navbar';
import Sidebar from '../../Components/Student/Sidebar';
import TodayClass from '../../Components/Student/Home/TodayClass';
import NoClassesToday from '../../Components/Student/Home/NoClass';
import MyCourses from '../../Components/Student/Home/MyCourses';
import RecentActivities from '../../Components/Student/Home/RecentActivities';
import QuickActions from '../../Components/Student/Home/QuickActions';

function Home() {
  const { user } = useLogin();


  return (
    <div className="min-h-screen bg-gray-50">

      {/* Main Content */}
      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 italic">
            Welcome back, {user?.name || 'Student'}
          </h1>
          <p className="text-gray-600">
            Track your training progress and upcoming activities
          </p>
        </div>

        {/* Stats Grid */}
        <div className="mb-8">
          <TodayClass />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            <MyCourses />
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