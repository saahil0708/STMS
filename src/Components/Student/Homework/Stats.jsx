// HomeworkStats.jsx
import React from 'react';
import {
  CheckCircleIcon,
  ClockIcon,
  DocumentCheckIcon,
  DocumentIcon,
  ArrowTrendingUpIcon as TrendingUpIcon
} from '@heroicons/react/24/outline';

const HomeworkStats = ({ activeTab, onTabChange, studentData }) => {
  const tabs = [
    { id: 'all', label: 'All Homework', count: studentData.totalAssignments || 0, icon: DocumentIcon },
    { id: 'pending', label: 'Pending', count: studentData.pendingAssignments || 0, icon: ClockIcon },
    { id: 'submitted', label: 'Submitted', count: studentData.submittedAssignments || 0, icon: DocumentCheckIcon },
    { id: 'graded', label: 'Graded', count: studentData.gradedAssignments || 0, icon: CheckCircleIcon }
  ];

  const getTabColor = (tabId) => {
    if (activeTab === tabId) return 'bg-red-700 text-white';
    return 'bg-white text-gray-700 hover:bg-gray-50';
  };

  const completionRate = studentData.totalAssignments > 0
    ? Math.round((studentData.submittedAssignments / studentData.totalAssignments) * 100)
    : 0;

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center justify-between p-4 rounded-lg border transition-all ${getTabColor(tab.id)} ${isActive ? 'border-red-300' : 'border-gray-200'}`}
              >
                <div>
                  <div className="text-2xl font-bold">{tab.count}</div>
                  <div className={`text-sm ${isActive ? 'text-white/90' : 'text-gray-600'} mt-1`}>
                    {tab.label}
                  </div>
                </div>
                <div className={`p-2 rounded-lg ${isActive ? 'bg-white/20' : 'bg-gray-100'}`}>
                  <Icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-gray-600'}`} />
                </div>
              </button>
            );
          })}
        </div>

        {/* Progress Summary */}
        <div className="border-t border-gray-200 pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-gray-900">Submission Progress</h3>
            <div className="flex items-center text-green-600 text-sm">
              <TrendingUpIcon className="h-4 w-4 mr-1" />
              <span>{completionRate}% completion rate</span>
            </div>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-600 h-2 rounded-full"
              style={{ width: `${completionRate}%` }}
            ></div>
          </div>

          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>0 submitted</span>
            <span>{studentData.submittedAssignments || 0} of {studentData.totalAssignments || 0} completed</span>
            <span>All submitted</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeworkStats;