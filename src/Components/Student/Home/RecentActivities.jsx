import React, { useState, useEffect } from 'react';
import apiClient from '../../../services/apiClient';
import { CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline'; // ensure ClockIcon is imported if used, otherwise remove

const RecentActivities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await apiClient.get('/api/submission/my-submissions');
        // Map submissions to activity format
        // Assuming response.data is array of submissions
        const submissions = Array.isArray(response.data) ? response.data : (response.data.data || []);

        const mappedActivities = submissions.slice(0, 5).map(sub => ({
          id: sub._id,
          title: `Submitted: ${sub.assignmentId?.title || 'Assignment'}`,
          course: sub.assignmentId?.courseId?.title || 'Unknown Course',
          time: new Date(sub.createdAt).toLocaleDateString(),
          type: 'submission',
          score: sub.score
        }));
        setActivities(mappedActivities);
      } catch (error) {
        console.error('Failed to fetch recent activities:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) {
    return (
      <div className="card border-0 pt-2 shadow-sm">
        <div className="card-header bg-white border-0">
          <h5 className="card-title mb-0 fw-semibold">Recent Activities</h5>
        </div>
        <div className="card-body p-4 text-center">
          <p className="text-muted">Loading activities...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card border-0 pt-2 shadow-sm">
      <div className="card-header bg-white border-0">
        <h5 className="card-title mb-0 fw-semibold">Recent Activities</h5>
      </div>
      <div className="card-body">
        <div className="list-group list-group-flush">
          {activities.length > 0 ? (
            activities.map((activity) => (
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
            ))
          ) : (
            <div className="text-center py-4 text-muted">
              No recent activities found.
            </div>
          )}
        </div>
        {activities.length > 0 && (
          <div className="mt-4">
            <button className="btn btn-outline-danger w-100">
              View All Activities
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentActivities;