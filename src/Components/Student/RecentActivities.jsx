import React from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

const RecentActivities = () => {
  const activities = [
    {
      id: 1,
      title: 'Submitted React Project',
      course: 'Advanced React Development',
      time: '2 hours ago',
      type: 'submission'
    },
    {
      id: 2,
      title: 'Completed Database Quiz',
      course: 'Database Management',
      time: 'Yesterday',
      type: 'quiz'
    },
    {
      id: 3,
      title: 'Watched Cloud Computing Lecture',
      course: 'Cloud Fundamentals',
      time: '2 days ago',
      type: 'lecture'
    }
  ];

  return (
    <div className="card border-0 pt-2 shadow-sm">
      <div className="card-header bg-white border-0">
        <h5 className="card-title mb-0 fw-semibold">Recent Activities</h5>
      </div>
      <div className="card-body">
        <div className="list-group list-group-flush">
          {activities.map((activity) => (
            <div key={activity.id} className="list-group-item border-0 px-0 py-3">
              <div className="d-flex align-items-center">
                <div className="bg-danger-subtle p-2 rounded-circle me-3">
                  <CheckCircleIcon className="h-4 w-4 text-danger" />
                </div>
                <div className="flex-grow-1">
                  <h6 className="mb-1 fw-semibold">{activity.title}</h6>
                  <small className="text-muted">{activity.course}</small>
                </div>
                <small className="text-muted">{activity.time}</small>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <button className="btn btn-outline-danger w-100">
            View All Activities
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecentActivities;