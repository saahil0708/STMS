// HomeworkList.jsx
import React from 'react';
import {
  ClockIcon,
  CheckCircleIcon,
  DocumentTextIcon,
  CalendarIcon,
  PaperClipIcon,
  ChevronRightIcon,
  ExclamationTriangleIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';

const HomeworkList = ({ activeTab, filterCourse, dateRange }) => {
  // Mock homework data
  const homeworkData = [
    {
      id: 1,
      title: 'React Components Assignment',
      course: 'Advanced React Development',
      courseCode: 'CS401',
      dueDate: 'Tomorrow, 11:59 PM',
      status: 'pending',
      priority: 'high',
      description: 'Create reusable components with props and state management',
      attachments: 3,
      points: 100,
      submitted: false,
      submittedDate: null,
      grade: null
    },
    {
      id: 2,
      title: 'Database Schema Design',
      course: 'Database Management Systems',
      courseCode: 'CS402',
      dueDate: 'Dec 15, 2023',
      status: 'pending',
      priority: 'medium',
      description: 'Design normalized database schema for e-commerce platform',
      attachments: 2,
      points: 150,
      submitted: false,
      submittedDate: null,
      grade: null
    },
    {
      id: 3,
      title: 'Cloud Architecture Analysis',
      course: 'Cloud Computing Fundamentals',
      courseCode: 'CS403',
      dueDate: 'Dec 10, 2023',
      status: 'submitted',
      priority: 'low',
      description: 'Analyze cloud architecture patterns and write report',
      attachments: 1,
      points: 120,
      submitted: true,
      submittedDate: 'Dec 8, 2023',
      grade: null
    },
    {
      id: 4,
      title: 'UI Design Critique',
      course: 'UI/UX Design Principles',
      courseCode: 'CS404',
      dueDate: 'Dec 5, 2023',
      status: 'graded',
      priority: 'low',
      description: 'Critique existing UI designs and suggest improvements',
      attachments: 0,
      points: 80,
      submitted: true,
      submittedDate: 'Dec 4, 2023',
      grade: 92
    },
    {
      id: 5,
      title: 'API Integration Project',
      course: 'Advanced React Development',
      courseCode: 'CS401',
      dueDate: 'Today, 5:00 PM',
      status: 'pending',
      priority: 'high',
      description: 'Integrate REST API with React application',
      attachments: 4,
      points: 200,
      submitted: false,
      submittedDate: null,
      grade: null
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'submitted': return 'bg-blue-100 text-blue-800';
      case 'graded': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Filter homework based on active tab and filters
  const filteredHomework = homeworkData.filter(item => {
    if (activeTab !== 'all' && item.status !== activeTab) return false;
    if (filterCourse !== 'all' && item.courseCode !== filterCourse) return false;
    // Add date range filtering logic here
    return true;
  });

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Homework Assignments</h3>
            <p className="text-sm text-gray-600 mt-1">
              {filteredHomework.length} assignments found
            </p>
          </div>
          <div className="text-sm text-gray-500">
            Sorted by: Due Date
          </div>
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {filteredHomework.map((homework) => (
          <div key={homework.id} className="p-6 hover:bg-gray-50 transition-colors">
            <div className="flex flex-col lg:flex-row lg:items-center">
              {/* Left Column - Homework Info */}
              <div className="lg:w-2/3 mb-4 lg:mb-0 lg:pr-8">
                <div className="flex items-start mb-3">
                  <div className={`p-2 rounded-lg mr-4 ${
                    homework.status === 'pending' ? 'bg-yellow-50 text-yellow-700' :
                    homework.status === 'submitted' ? 'bg-blue-50 text-blue-700' :
                    'bg-green-50 text-green-700'
                  }`}>
                    <DocumentTextIcon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h4 className="font-semibold text-gray-900 mr-3">{homework.title}</h4>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded ${getStatusColor(homework.status)}`}>
                          {homework.status.charAt(0).toUpperCase() + homework.status.slice(1)}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded ${getPriorityColor(homework.priority)}`}>
                          {homework.priority.charAt(0).toUpperCase() + homework.priority.slice(1)} Priority
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600 mb-3">
                      <AcademicCapIcon className="h-4 w-4 mr-2" />
                      <span>{homework.course} ({homework.courseCode})</span>
                      <span className="mx-2">•</span>
                      <span>{homework.points} points</span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4">{homework.description}</p>
                    
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center text-sm text-gray-600">
                        <CalendarIcon className="h-4 w-4 mr-2 text-gray-400" />
                        <span className={homework.status === 'pending' && homework.priority === 'high' ? 'text-red-600 font-medium' : ''}>
                          Due: {homework.dueDate}
                        </span>
                      </div>
                      
                      {homework.attachments > 0 && (
                        <div className="flex items-center text-sm text-gray-600">
                          <PaperClipIcon className="h-4 w-4 mr-2 text-gray-400" />
                          <span>{homework.attachments} attachment{homework.attachments > 1 ? 's' : ''}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Actions and Status */}
              <div className="lg:w-1/3">
                <div className="flex flex-col space-y-4">
                  {/* Grade/Status Display */}
                  {homework.grade ? (
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-700">{homework.grade}%</div>
                      <div className="text-sm text-gray-600">Grade Received</div>
                    </div>
                  ) : homework.submitted ? (
                    <div className="text-right">
                      <div className="flex items-center justify-end text-blue-600 mb-1">
                        <CheckCircleIcon className="h-5 w-5 mr-2" />
                        <span className="font-medium">Submitted</span>
                      </div>
                      <div className="text-sm text-gray-600">On {homework.submittedDate}</div>
                    </div>
                  ) : (
                    <div className="text-right">
                      <div className="flex items-center justify-end text-yellow-600 mb-1">
                        <ClockIcon className="h-5 w-5 mr-2" />
                        <span className="font-medium">Pending Submission</span>
                      </div>
                      {homework.priority === 'high' && (
                        <div className="flex items-center justify-end text-red-600 text-sm mt-1">
                          <ExclamationTriangleIcon className="h-4 w-4 mr-1" />
                          <span>Urgent</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex justify-end space-x-3">
                    {!homework.submitted ? (
                      <button className="px-4 py-2 bg-red-700 text-white text-sm font-medium rounded-lg hover:bg-red-800">
                        Submit Now
                      </button>
                    ) : (
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50">
                        View Submission
                      </button>
                    )}
                    <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      <ChevronRightIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredHomework.length === 0 && (
        <div className="p-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
            <DocumentTextIcon className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Homework Found</h3>
          <p className="text-gray-600 max-w-md mx-auto">
            {activeTab === 'all' ? 'No homework assignments found with the current filters.' : `No ${activeTab} homework found.`}
          </p>
        </div>
      )}

      {/* Pagination/Footer */}
      <div className="px-6 py-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Showing {filteredHomework.length} of {homeworkData.length} assignments
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1.5 border border-gray-300 text-sm rounded-lg hover:bg-gray-50">
              Previous
            </button>
            <button className="px-3 py-1.5 bg-red-700 text-white text-sm rounded-lg hover:bg-red-800">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeworkList;