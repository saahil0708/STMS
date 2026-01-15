import React, { useState, useEffect } from 'react';
import apiClient from '../../../services/apiClient';
import {
    ClockIcon,
    VideoCameraIcon,
    AcademicCapIcon,
    UserGroupIcon,
    CalendarIcon,
    ChevronRightIcon
} from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

const TodayClasses = () => {
    const [todaysClasses, setTodaysClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchLectures();
    }, []);

    const fetchLectures = async () => {
        try {
            const localDate = new Date().toLocaleDateString('en-CA');
            const response = await apiClient.get(`/api/auth/lecture/today?date=${localDate}`);
            const data = response.data.lectures || [];

            const mapped = data.map(l => {
                const startTime = new Date(l.timing);
                const now = new Date();
                const duration = l.duration || 60;
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
                    time: startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    status: status,
                    type: l.type || 'virtual',
                    attendees: 'All Students',
                    isOnline: l.type === 'virtual',
                    roomId: l.roomId
                };
            });

            setTodaysClasses(mapped);
        } catch (error) {
            console.error('Failed to fetch today\'s lectures:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="space-y-3">
                    <div className="h-20 bg-gray-100 rounded-xl"></div>
                    <div className="h-20 bg-gray-100 rounded-xl"></div>
                </div>
            </div>
        );
    }

    if (todaysClasses.length === 0) return null;

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
            <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <h3 className="text-lg font-bold text-gray-900 flex items-center">
                    <CalendarIcon className="h-5 w-5 mr-2 text-indigo-600" />
                    Today's Schedule
                </h3>
                <span className="text-xs font-semibold px-2.5 py-1 bg-indigo-100 text-indigo-700 rounded-full">
                    {todaysClasses.length} Classes
                </span>
            </div>
            <div className="divide-y divide-gray-50">
                {todaysClasses.map((classItem) => (
                    <div key={classItem.id} className="p-6 hover:bg-gray-50 transition-colors group">
                        <div className="flex items-center justify-between">
                            <div className="flex items-start gap-4">
                                <div className={`p-3 rounded-xl ${classItem.isOnline ? 'bg-indigo-50 text-indigo-600' : 'bg-orange-50 text-orange-600'}`}>
                                    {classItem.isOnline ? <VideoCameraIcon className="h-6 w-6" /> : <AcademicCapIcon className="h-6 w-6" />}
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{classItem.course}</h4>
                                    <div className="flex items-center gap-4 mt-1">
                                        <span className="flex items-center text-sm text-gray-500">
                                            <ClockIcon className="h-4 w-4 mr-1" />
                                            {classItem.time}
                                        </span>
                                        <span className="flex items-center text-sm text-gray-500">
                                            <UserGroupIcon className="h-4 w-4 mr-1" />
                                            {classItem.attendees}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide
                            ${classItem.status === 'in-progress' ? 'bg-green-100 text-green-700 animate-pulse' :
                                        classItem.status === 'completed' ? 'bg-gray-100 text-gray-600' : 'bg-blue-50 text-blue-600'}`}>
                                    {classItem.status}
                                </span>

                                {classItem.isOnline && (
                                    <button
                                        onClick={() => navigate(`/trainer/class/${classItem.roomId}`)}
                                        disabled={classItem.status !== 'in-progress'}
                                        className={`px-4 py-2 rounded-lg text-sm font-semibold shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                                    ${classItem.status === 'in-progress'
                                                ? 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-md hover:-translate-y-0.5'
                                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                                    >
                                        {classItem.status === 'completed' ? 'Ended' : 'Start Class'}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TodayClasses;
