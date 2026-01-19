import React, { useState, useEffect } from 'react';
import apiClient from '../../../services/apiClient';
import { ClassSkeleton } from '../../Global/SkeletonLoaders';
import {
  ClockIcon,
  VideoCameraIcon,
  AcademicCapIcon,
  UserGroupIcon,
  CalendarIcon,
  ChevronRightIcon,
  CheckCircleIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

const TodaysClasses = () => {
  const [todaysClasses, setTodaysClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLectures();
  }, []);

  const fetchLectures = async () => {
    setLoading(true);
    try {
      // Calculate local YYYY-MM-DD to handle timezone differences with server (e.g. UTC server vs Local user)
      const localDate = new Date().toLocaleDateString('en-CA'); // 'en-CA' gives YYYY-MM-DD
      const response = await apiClient.get(`/api/auth/lecture/today?date=${localDate}`);
      const data = response.data.lectures || []; // Controller returns { lectures: [] }

      const mapped = data.map(l => {
        const startTime = new Date(l.timing);
        const now = new Date();
        const duration = l.duration || 60; // Default 60 mins if missing
        const endTime = new Date(startTime.getTime() + duration * 60000);

        let status = 'upcoming';
        if (now >= startTime && now <= endTime) {
          status = 'in-progress';
        } else if (now > endTime) {
          status = 'completed';
        }

        return {
          id: l._id,
          course: l.courseId?.title || 'Unknown Course',
          instructor: l.courseId?.trainerId?.name || 'Your Trainer',
          time: startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: status,
          type: l.type || 'virtual', // Default for display
          attendees: 'All',
          isOnline: l.type === 'virtual',
          roomId: l.roomId,
          meetingLink: l.meetingLink
        };
      });

      setTodaysClasses(mapped);
    } catch (error) {
      console.error('Failed to fetch today\'s lectures:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    fetchLectures();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-700 bg-green-50 border-green-100';
      case 'in-progress': return 'text-blue-700 bg-blue-50 border-blue-100';
      case 'upcoming': return 'text-gray-700 bg-gray-50 border-gray-100';
      default: return 'text-gray-700 bg-gray-50 border-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return '✓';
      case 'in-progress': return '⏳';
      case 'upcoming': return '⏰';
      default: return '•';
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <ClassSkeleton />
        <ClassSkeleton />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header with stats */}
      <div className="px-5 py-3 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div className='flex items-center'>
            <div className="flex justify-center items-center">
              <CalendarIcon className="h-5 w-5 text-red-700 mr-2" />
              <h2 className="text-base relative top-1 font-semibold text-gray-900">Today's Schedule</h2>
            </div>
            <button
              onClick={handleRefresh}
              className="ml-4 p-1 rounded-full hover:bg-red-50 text-gray-400 hover:text-red-700 transition-all duration-300 transform hover:rotate-180"
              title="Refresh Schedule"
            >
              <ArrowPathIcon className="h-4 w-4" />
            </button>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-gray-900">{todaysClasses.length} Classes</div>
            <div className="text-xs text-gray-500">Live from Redis</div>
          </div>
        </div>
      </div>

      {/* Classes List */}
      <div className="divide-y divide-gray-100">
        <style>{`
          @keyframes pulse-soft {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.6; }
          }
          .animate-pulse-soft {
            animation: pulse-soft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
        `}</style>
        {todaysClasses.length > 0 ? (
          todaysClasses.map((classItem) => (
            <div
              key={classItem.id || classItem._id}
              className="px-5 py-4 hover:bg-gray-50 transition-all duration-200 group border-l-4 border-transparent hover:border-red-600 relative overflow-hidden"
            >
              <div className="space-y-3 relative z-10">
                {/* Top row - Course info and status */}
                <div className="flex justify-between items-start">
                  <div className="flex items-start">
                    <div className={`p-2 rounded-lg mr-3 shadow-sm ${classItem.isOnline ? 'bg-blue-50 text-blue-600' : 'bg-red-50 text-red-600'}`}>
                      {classItem.isOnline ? (
                        <VideoCameraIcon className="h-5 w-5" />
                      ) : (
                        <AcademicCapIcon className="h-5 w-5" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-[15px] font-bold text-gray-900 mb-1 group-hover:text-red-700 transition-colors uppercase tracking-tight">{classItem.course}</h3>
                      <div className="flex items-center text-xs text-gray-600">
                        <span className="font-semibold text-gray-700">{classItem.instructor}</span>
                        <span className="mx-1.5 opacity-40">•</span>
                        <span className={`px-2 py-0.5 rounded-full border text-[10px] uppercase font-bold tracking-wider flex items-center ${getStatusColor(classItem.status)}`}>
                          {classItem.status === 'in-progress' && (
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-1.5 animate-pulse-soft"></span>
                          )}
                          <span className="mr-1">{getStatusIcon(classItem.status)}</span>
                          {classItem.status.replace('-', ' ')}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {classItem.type === 'virtual' && classItem.status === 'in-progress' && (
                      <a
                        href={`/class/${classItem.roomId}`}
                        className="px-3 py-1.5 bg-red-600 text-white text-xs font-bold uppercase rounded shadow hover:bg-red-700 transition-colors animate-pulse"
                      >
                        Join Live
                      </a>
                    )}

                    {classItem.type === 'offline' && classItem.meetingLink && (
                      <span className="text-[11px] font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded flex items-center">
                        <span className="mr-1">📍</span> {classItem.meetingLink}
                      </span>
                    )}

                    <button className="p-1.5 border border-gray-200 rounded-lg hover:bg-white hover:shadow-sm transition-all text-gray-400 hover:text-red-700 transform hover:scale-110 active:scale-95">
                      <ChevronRightIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Middle row - Time and attendees */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center text-xs text-gray-700 font-medium bg-gray-50 px-2 py-1 rounded">
                      <ClockIcon className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
                      <span>{classItem.time}</span>
                    </div>
                    <div className="flex items-center text-xs text-gray-600">
                      <UserGroupIcon className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
                      <span className="font-medium text-gray-800">{classItem.attendees}</span>
                      <span className="ml-1">students</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 bg-gray-100 px-2 py-0.5 rounded italic">{classItem.type}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="px-5 py-16 text-center">
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-red-100 rounded-full blur-2xl opacity-50 animate-pulse"></div>
              <div className="relative inline-flex items-center justify-center p-6 bg-white border border-red-50 rounded-full shadow-sm">
                <CalendarIcon className="h-10 w-10 text-red-700" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Weekend Vibes? or Just a Clear Day!</h3>
            <p className="text-sm text-gray-500 max-w-xs mx-auto leading-relaxed">
              No classes are scheduled for today. It's the perfect time to catch up on assignments or just take a breath.
            </p>
          </div>
        )}
      </div>

      {/* Enhanced Footer */}
      {todaysClasses.length > 0 && (
        <div className="px-5 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-3 sm:mb-0">
              <div className="text-center">
                <div className="text-sm font-bold text-gray-900">{todaysClasses.filter(c => c.status === 'completed').length}</div>
                <div className="text-xs text-gray-600">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-bold text-blue-600">{todaysClasses.filter(c => c.status === 'in-progress').length}</div>
                <div className="text-xs text-gray-600">In Progress</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-bold text-gray-900">{todaysClasses.filter(c => c.status === 'upcoming').length}</div>
                <div className="text-xs text-gray-600">Upcoming</div>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1.5 bg-red-700 text-white text-[15px] font-medium rounded hover:bg-red-800">
                Set Reminders
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodaysClasses; 