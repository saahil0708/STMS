import React, { useState, useEffect } from 'react';
import apiClient from '../../../services/apiClient';
import {
    BookOpenIcon,
    CalendarIcon,
    UserCircleIcon,
    ClockIcon,
    ArrowRightIcon,
    AcademicCapIcon,
    SparklesIcon
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const MyCourses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await apiClient.get('/api/course/my-courses');
                const data = response.data.data || response.data;
                setCourses(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error('Failed to fetch courses:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    if (loading) {
        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-1/4 mb-6"></div>
                <div className="space-y-4">
                    {[1, 2].map((i) => (
                        <div key={i} className="h-24 bg-gray-100 rounded-lg"></div>
                    ))}
                </div>
            </div>
        );
    }

    // premium empty state
    if (courses.length === 0) {
        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center relative overflow-hidden group">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-red-50 rounded-full blur-2xl opacity-50 group-hover:scale-150 transition-transform duration-700"></div>
                <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 bg-blue-50 rounded-full blur-3xl opacity-50 group-hover:scale-150 transition-transform duration-700"></div>

                <div className="relative z-10 flex flex-col items-center">
                    <div className="p-4 bg-red-50 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                        <AcademicCapIcon className="h-10 w-10 text-red-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No Courses Enrolled Yet</h3>
                    <p className="text-gray-500 max-w-sm mx-auto mb-6">
                        You haven't enrolled in any courses. Explore our catalog or ask your administrator to enroll you in your first class!
                    </p>
                    {/* 
                Use a button or link here. Since we assume student is enrolled by admin usually in this context, 
                maybe just a generic clear CTA or just the message. The user asked for UI.
            */}
                    <div className="inline-flex items-center justify-center space-x-2 text-sm text-red-600 bg-red-50 px-4 py-2 rounded-full font-medium hover:bg-red-100 transition-colors cursor-pointer">
                        <SparklesIcon className="h-4 w-4" />
                        <span>Ready to start your journey?</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-white">
                <div>
                    <h2 className="text-lg font-bold text-gray-900 flex items-center">
                        <BookOpenIcon className="h-5 w-5 text-red-600 mr-2" />
                        My Courses
                    </h2>
                </div>
                <Link to="/courses" className="text-sm font-medium text-red-600 hover:text-red-700 hover:underline">
                    View All
                </Link>
            </div>

            <div className="divide-y divide-gray-50">
                {courses.map((course) => (
                    <div key={course._id} className="p-5 hover:bg-gray-50 transition-colors group">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                            {/* Course Info */}
                            <div className="flex-1 min-w-0">
                                <h3 className="text-base font-bold text-gray-900 mb-1 truncate group-hover:text-red-700 transition-colors">
                                    {course.title}
                                </h3>
                                <p className="text-sm text-gray-500 line-clamp-1 mb-2">{course.description}</p>

                                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                                    {course.trainerId && (
                                        <div className="flex items-center">
                                            <UserCircleIcon className="h-4 w-4 mr-1.5 text-gray-400" />
                                            <span className="font-medium text-gray-700">{course.trainerId.name}</span>
                                        </div>
                                    )}
                                    {course.schedule && (
                                        <div className="flex items-center px-2 py-0.5 bg-gray-100 rounded">
                                            <ClockIcon className="h-3.5 w-3.5 mr-1.5 text-gray-500" />
                                            <span>{course.schedule}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Action */}
                            <div className="flex items-center sm:self-center">
                                <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all transform hover:scale-110">
                                    <ArrowRightIcon className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-gray-50 px-6 py-3 border-t border-gray-100">
                <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>Showing {courses.length} enrolled courses</span>
                    <span className="flex items-center text-green-600 font-medium">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></span>
                        Active
                    </span>
                </div>
            </div>
        </div>
    );
};

export default MyCourses;
