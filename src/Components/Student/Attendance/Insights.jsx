// AttendanceInsights.jsx
import React from 'react';
import {
  LightBulbIcon,
  ChartBarIcon,
  CalendarIcon,
  ExclamationCircleIcon as ExclamationIcon,
  CheckIcon,
  XMarkIcon as XIcon
} from '@heroicons/react/24/outline';

const AttendanceInsights = () => {
  const insights = [
    {
      type: 'positive',
      icon: CheckIcon,
      title: 'Excellent Week Performance',
      description: 'Perfect attendance last week',
      color: 'bg-green-50 text-green-700 border-green-200'
    },
    {
      type: 'warning',
      icon: ExclamationIcon,
      title: 'Morning Classes',
      description: '100% attendance in 10 AM classes',
      color: 'bg-blue-50 text-blue-700 border-blue-200'
    },
    {
      type: 'alert',
      icon: XIcon,
      title: 'Improvement Needed',
      description: 'Lower attendance on Wednesdays',
      color: 'bg-red-50 text-red-700 border-red-200'
    }
  ];

  const patterns = [
    { day: 'Monday', attendance: 95 },
    { day: 'Tuesday', attendance: 92 },
    { day: 'Wednesday', attendance: 78 },
    { day: 'Thursday', attendance: 90 },
    { day: 'Friday', attendance: 94 }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center">
          <div className="bg-gradient-to-r from-purple-500 to-purple-400 p-2 rounded-lg mr-3">
            <LightBulbIcon className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Attendance Insights</h3>
            <p className="text-gray-600 text-sm mt-1">Patterns & recommendations</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Insights */}
        <div className="space-y-4 mb-6">
          {insights.map((insight, index) => {
            const Icon = insight.icon;
            return (
              <div key={index} className={`border rounded-xl p-4 ${insight.color}`}>
                <div className="flex items-start">
                  <Icon className="h-5 w-5 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">{insight.title}</h4>
                    <p className="text-sm opacity-90">{insight.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>



        {/* Recommendation */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="bg-gradient-to-r from-red-50 to-white rounded-xl p-4 border border-red-100">
            <h4 className="font-semibold text-gray-900 mb-2">Recommendation</h4>
            <p className="text-sm text-gray-600">
              Focus on improving Wednesday attendance. Consider setting reminders for morning classes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceInsights;