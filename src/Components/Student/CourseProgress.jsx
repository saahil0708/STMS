import React from 'react';
import { BookOpenIcon, CalendarIcon, UserCircleIcon, ClockIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const CourseProgress = () => {
  const courses = [
    {
      id: 1,
      name: 'Advanced React Development',
      instructor: 'Dr. Sarah Chen',
      startDate: 'Sep 10, 2023',
      endDate: 'Dec 10, 2023',
      nextDeadline: 'Dec 15, 2023',
      duration: '3 months',
      creditHours: 4
    },
    {
      id: 2,
      name: 'Database Management Systems',
      instructor: 'Prof. James Wilson',
      startDate: 'Aug 5, 2023',
      endDate: 'Dec 5, 2023',
      nextDeadline: 'Completed',
      duration: '4 months',
      creditHours: 3
    },
    {
      id: 3,
      name: 'Cloud Computing Fundamentals',
      instructor: 'Dr. Michael Brown',
      startDate: 'Oct 15, 2023',
      endDate: 'Jan 15, 2024',
      nextDeadline: 'Jan 10, 2024',
      duration: '3 months',
      creditHours: 3
    },
    {
      id: 4,
      name: 'UI/UX Design Principles',
      instructor: 'Ms. Emily Davis',
      startDate: 'Nov 20, 2023',
      endDate: 'Feb 5, 2024',
      nextDeadline: 'Feb 5, 2024',
      duration: '2.5 months',
      creditHours: 2
    }
  ];

  return (
    <div className="card border-0 shadow-sm h-auto pt-2">
      <div className="card-header bg-white border-0">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h5 className="card-title mb-1 fw-bold text-dark">My Courses</h5>
            {/* <p className="text-muted mb-0">Track your enrolled courses</p> */}
          </div>
          <button className="btn btn-sm btn-outline-danger">
            View All
          </button>
        </div>
      </div>
      
      <div className="card-body p-0">
        <div className="list-group list-group-flush">
          {courses.map((course, index) => (
            <React.Fragment key={course.id}>
              <div className="list-group-item border-0 px-4 py-3">
                <div className="row align-items-center">
                  {/* Course Info */}
                  <div className="col-lg-5 mb-3 mb-lg-0">
                    <div className="d-flex align-items-start">
                      <div className="bg-danger-subtle p-2 rounded-circle me-3">
                        <BookOpenIcon className="h-5 w-5 text-danger" />
                      </div>
                      <div>
                        <h6 className="fw-semibold mb-1 text-dark">{course.name}</h6>
                        <div className="d-flex align-items-center text-muted small">
                          <UserCircleIcon className="h-4 w-4 me-1" />
                          <span>{course.instructor}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Duration and Credits */}
                  <div className="col-lg-3 mb-3 mb-lg-0">
                    <div className="d-flex flex-column">
                      <div className="d-flex align-items-center mb-1">
                        <ClockIcon className="h-4 w-4 text-muted me-2" />
                        <span className="text-dark">{course.duration}</span>
                      </div>
                      <small className="text-muted">{course.creditHours} credit hours</small>
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="col-lg-3 mb-3 mb-lg-0">
                    <div className="d-flex flex-column">
                      <small className="text-muted d-flex align-items-center mb-1">
                        <CalendarIcon className="h-3 w-3 me-1" />
                        {course.startDate}
                      </small>
                      <small className="text-muted d-flex align-items-center">
                        <CalendarIcon className="h-3 w-3 me-1" />
                        {course.endDate}
                      </small>
                    </div>
                  </div>

                  {/* Action */}
                  <div className="col-lg-1 text-lg-end">
                    <div className="d-flex align-items-center justify-content-between">
                      {course.nextDeadline !== 'Completed' && (
                        <span className="badge bg-danger-subtle text-danger d-lg-none">
                          Due Soon
                        </span>
                      )}
                      <button className="btn btn-sm btn-outline-secondary">
                        <ArrowRightIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Deadline info for mobile */}
                {course.nextDeadline !== 'Completed' && (
                  <div className="row mt-3 d-lg-none">
                    <div className="col-12">
                      <div className="alert alert-danger py-2 mb-0">
                        <small className="d-flex align-items-center">
                          <CalendarIcon className="h-3 w-3 me-2" />
                          Next deadline: {course.nextDeadline}
                        </small>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Separator */}
              {index < courses.length - 1 && (
                <div className="px-4">
                  <hr className="my-0" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Footer with Actions */}
        <div className="p-4 border-top">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
            <div className="mb-3 mb-md-0">
              <small className="text-muted">
                Showing {courses.length} of 8 courses • 
                <span className="text-success ms-2">4 active</span>
              </small>
            </div>
            <div className="d-flex gap-2">
              <button className="btn btn-danger p-2 px-3 btn-sm">
                Download Schedule
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;