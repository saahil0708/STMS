import React, { useState, useEffect } from 'react';
import apiClient from '../../services/apiClient';
import {
    BookOpenIcon,
    ClockIcon,
    UserCircleIcon,
    MagnifyingGlassIcon,
    ArrowRightIcon
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const StudentMyCourses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

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

    const filteredCourses = courses.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                            <BookOpenIcon className="h-8 w-8 text-red-600 mr-3" />
                            My Enrolled Courses
                        </h1>
                        <p className="text-gray-500 mt-1 ml-11">
                            Continue learning where you left off.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        {/* Join Course Button */}
                        <Link
                            to="/enroll"
                            className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all"
                        >
                            <span className="mr-2 text-lg">+</span> Join Course
                        </Link>

                        {/* Search */}
                        <div className="relative">
                            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
                            <input
                                type="text"
                                placeholder="Search courses..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 w-full sm:w-64 transition-all"
                            />
                        </div>
                    </div>
                </div>

                {/* Content */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 h-64 animate-pulse">
                                <div className="h-40 bg-gray-200 rounded-t-xl" />
                                <div className="p-4 space-y-3">
                                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : filteredCourses.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-200">
                        <div className="mx-auto h-24 w-24 bg-red-50 rounded-full flex items-center justify-center mb-6">
                            <BookOpenIcon className="h-12 w-12 text-red-600 opacity-80" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No Courses Found</h3>
                        {searchTerm ? (
                            <p className="text-gray-500">Try adjusting your search criteria.</p>
                        ) : (
                            <div className="space-y-4">
                                <p className="text-gray-500 max-w-md mx-auto">
                                    You haven't enrolled in any courses yet. Use an enrollment code from your trainer to get started.
                                </p>
                                <Link
                                    to="/enroll"
                                    className="inline-flex items-center px-6 py-2.5 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors shadow-sm"
                                >
                                    Re-Enroll / Join Course
                                </Link>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCourses.map(course => (
                            <div key={course._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group flex flex-col h-full">
                                {/* Thumbnail Placeholder */}
                                <div className="h-40 bg-gradient-to-br from-red-50 to-orange-50 relative flex items-center justify-center overflow-hidden">
                                    {course.thumbnail ? (
                                        <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                                    ) : (
                                        <BookOpenIcon className="h-16 w-16 text-red-200" />
                                    )}
                                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold text-gray-700 shadow-sm">
                                        {course.enrollmentCode || 'Enrolled'}
                                    </div>
                                </div>

                                <div className="p-5 flex-1 flex flex-col">
                                    <div className="mb-4 flex-1">
                                        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-red-700 transition-colors">
                                            {course.title}
                                        </h3>
                                        <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                                            {course.description || "No description available."}
                                        </p>

                                        <div className="flex items-center text-xs text-gray-500 space-x-4">
                                            {course.trainerId && (
                                                <div className="flex items-center">
                                                    <UserCircleIcon className="h-4 w-4 mr-1 text-gray-400" />
                                                    <span className="truncate max-w-[100px]">{course.trainerId.name || 'Trainer'}</span>
                                                </div>
                                            )}
                                            {course.schedule && (
                                                <div className="flex items-center">
                                                    <ClockIcon className="h-4 w-4 mr-1 text-gray-400" />
                                                    <span className="truncate max-w-[100px]">{course.schedule}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <Link
                                        to={`/course/${course._id}`} // Assuming course detail page exists or will exist
                                        // For now, if no detail page, maybe link to class/assignments? 
                                        // Let's link to homework status or similar for now if strictly no detail page
                                        // But standards suggest a detail page. I'll point to /course/:id which might be 404 if not built.
                                        // Better: Point to /homework for now or simple "View"
                                        // Actually, let's just make it a "View Details" button that might go nowhere or placeholder
                                        className="w-full mt-auto flex items-center justify-center px-4 py-2 border border-red-600 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors"
                                        onClick={e => {
                                            // Since we haven't explicitly built Course Detail page for Student yet, 
                                            // prevent navigation to empty page if it doesn't exist.
                                            // But user asked for "My Courses" page, not "Course Detail".
                                            // Ideally this should go to a course dashboard.
                                            // I will leave the link but might need to handle 404 elsewhere or build detail page later.
                                        }}
                                    >
                                        View Content
                                        <ArrowRightIcon className="h-4 w-4 ml-2" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentMyCourses;
