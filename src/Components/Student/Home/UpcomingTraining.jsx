import React from 'react';
import { CalendarIcon, ClockIcon, UserGroupIcon } from '@heroicons/react/24/outline';

const UpcomingTrainings = () => {
  const trainings = [
    {
      id: 1,
      title: 'React Hooks Workshop',
      date: 'Dec 12, 2023',
      time: '10:00 AM - 12:00 PM',
      type: 'Live Session',
      instructor: 'Alex Thompson',
      attendees: 24,
      location: 'Room 302'
    },
    {
      id: 2,
      title: 'Database Optimization',
      date: 'Dec 15, 2023',
      time: '2:00 PM - 4:00 PM',
      type: 'Webinar',
      instructor: 'Dr. Lisa Park',
      attendees: 42,
      location: 'Online'
    },
    {
      id: 3,
      title: 'Final Project Review',
      date: 'Dec 18, 2023',
      time: '9:00 AM - 11:00 AM',
      type: 'One-on-One',
      instructor: 'Prof. James Wilson',
      attendees: 1,
      location: 'Office 405'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Upcoming Trainings</h2>
          <p className="text-sm text-gray-600 mt-1">Your scheduled sessions</p>
        </div>
        <CalendarIcon className="h-6 w-6 text-[#991b1b]" />
      </div>
      
      <div className="p-6 space-y-4">
        {trainings.map((training) => (
          <div key={training.id} className="border border-gray-200 rounded-lg p-4 hover:border-[#991b1b] transition-colors duration-200">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-900">{training.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{training.type} • {training.instructor}</p>
              </div>
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-red-50 text-[#991b1b]">
                {training.location === 'Online' ? 'Virtual' : 'In-person'}
              </span>
            </div>
            
            <div className="mt-4 space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <CalendarIcon className="h-4 w-4 mr-2" />
                <span>{training.date}</span>
                <ClockIcon className="h-4 w-4 ml-4 mr-2" />
                <span>{training.time}</span>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center">
                  <UserGroupIcon className="h-4 w-4 mr-2" />
                  <span>{training.attendees} attendees</span>
                </div>
                <div className="text-gray-500">
                  {training.location}
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex space-x-2">
              <button className="flex-1 py-2 px-3 bg-[#991b1b] text-white text-sm font-medium rounded-md hover:bg-red-800 transition-colors duration-200">
                Join Session
              </button>
              <button className="flex-1 py-2 px-3 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors duration-200">
                Reschedule
              </button>
            </div>
          </div>
        ))}
        
        <button className="w-full mt-4 py-2 px-4 border border-dashed border-gray-300 text-gray-600 rounded-md hover:border-[#991b1b] hover:text-[#991b1b] font-medium transition-colors duration-200">
          + Add to Calendar
        </button>
      </div>
    </div>
  );
};

export default UpcomingTrainings;