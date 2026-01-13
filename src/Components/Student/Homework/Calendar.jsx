// HomeworkCalendar.jsx
import React from 'react';
import {
  CalendarIcon,
  DocumentTextIcon,
  ClockIcon,
  CheckCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

const HomeworkCalendar = ({ activeTab, filterCourse, dateRange, assignments = [] }) => {
  // Generate calendar days dynamically based on current week
  const getCalendarDays = () => {
    const days = [];
    const today = new Date();
    // Start from Sunday of current week
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(startOfWeek);
      currentDate.setDate(startOfWeek.getDate() + i);

      const dateStr = currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }); // "Dec 10"

      // Filter assignments for this day
      // Note: This is a simple string match, improved logic would compare date objects
      const dayAssignments = assignments.filter(a => {
        if (!a.dueDate) return false;
        const d = new Date(a.dueDate);
        return d.getDate() === currentDate.getDate() &&
          d.getMonth() === currentDate.getMonth() &&
          d.getFullYear() === currentDate.getFullYear();
      }).map(a => ({
        title: a.title,
        course: a.courseId?.title || 'Unknown',
        dueTime: new Date(a.dueDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: a.status || 'upcoming'
      }));

      days.push({
        date: dateStr,
        day: currentDate.toLocaleDateString('en-US', { weekday: 'long' }),
        assignments: dayAssignments
      });
    }
    return days;
  };

  const calendarDays = getCalendarDays();

  const getStatusColor = (status) => {
    switch (status) {
      case 'due-today': return 'bg-red-100 text-red-800 border-red-200';
      case 'due-tomorrow': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'upcoming': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'submitted': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <CalendarIcon className="h-5 w-5 text-red-700 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Homework Calendar</h3>
            <span className="ml-2 text-sm text-gray-500">December 2023</span>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <ChevronLeftIcon className="h-4 w-4" />
            </button>
            <button className="px-3 py-1 text-sm font-medium text-gray-900">
              This Week
            </button>
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <ChevronRightIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Calendar Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
          {calendarDays.map((day, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              {/* Day Header */}
              <div className="text-center mb-4">
                <div className="text-sm text-gray-500">{day.day}</div>
                <div className={`text-xl font-bold mt-1 ${day.assignments.some(a => a.status === 'due-today') ? 'text-red-700' : 'text-gray-900'}`}>
                  {day.date}
                </div>
              </div>

              {/* Assignments */}
              <div className="space-y-3">
                {day.assignments.length > 0 ? (
                  day.assignments.map((assignment, idx) => (
                    <div
                      key={idx}
                      className={`border rounded-lg p-3 ${getStatusColor(assignment.status)}`}
                    >
                      <div className="flex items-start mb-2">
                        {assignment.status === 'due-today' ? (
                          <ClockIcon className="h-4 w-4 mr-2 mt-0.5 text-red-600" />
                        ) : assignment.status === 'submitted' ? (
                          <CheckCircleIcon className="h-4 w-4 mr-2 mt-0.5 text-green-600" />
                        ) : (
                          <DocumentTextIcon className="h-4 w-4 mr-2 mt-0.5 text-blue-600" />
                        )}
                        <div>
                          <div className="font-medium text-sm mb-1">{assignment.title}</div>
                          <div className="text-xs opacity-75">{assignment.course}</div>
                        </div>
                      </div>
                      <div className="text-xs">
                        Due: {assignment.dueTime}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6">
                    <div className="text-gray-400 text-sm">No assignments</div>
                  </div>
                )}
              </div>

              {/* Assignment Count */}
              {day.assignments.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-100 text-center">
                  <div className="text-xs text-gray-600">
                    {day.assignments.length} assignment{day.assignments.length > 1 ? 's' : ''}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <span className="text-sm text-gray-600">Due Today</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
              <span className="text-sm text-gray-600">Due Tomorrow</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
              <span className="text-sm text-gray-600">Upcoming</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <span className="text-sm text-gray-600">Submitted</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeworkCalendar;