import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../../services/apiClient';
import {
    BookOpenIcon,
    VideoCameraIcon,
    ClipboardDocumentListIcon,
    ArrowLeftIcon,
    CalendarIcon, // Replaced ClockIcon with CalendarIcon for schedule
    PlayCircleIcon,
    DocumentTextIcon
} from '@heroicons/react/24/outline';

const CourseContent = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [course, setCourse] = useState(null);
    const [lectures, setLectures] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const [activeTab, setActiveTab] = useState('classes'); // 'classes' or 'assignments'

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Fetch Course Details (Optional if we want title etc, but good for header)
                // Assuming we can get course details or just rely on separate calls
                // Let's try to get course info first.
                // If specific endpoint missing, we might rely on the list or just generic "Course Content"

                // Fetch Lectures
                const lectureRes = await apiClient.get(`/api/lecture/course/${courseId}`);
                setLectures(lectureRes.data.data || lectureRes.data || []);

                // Fetch Assignments
                const assignmentRes = await apiClient.get(`/api/assignment/course/${courseId}`);
                setAssignments(assignmentRes.data.data || assignmentRes.data || []);

                // Try to get course title from first lecture or assignment if course endpoint fails or doesn't exist
                // Or try a specific course endpoint
                try {
                    const courseRes = await apiClient.get(`/api/course/${courseId}`);
                    setCourse(courseRes.data.data || courseRes.data);
                } catch (e) {
                    console.log("Could not fetch course details details independently");
                }

            } catch (error) {
                console.error("Failed to fetch course content:", error);
            } finally {
                setLoading(false);
            }
        };

        if (courseId) {
            fetchData();
        }
    }, [courseId]);

    const handleBack = () => {
        navigate('/courses');
    };

    const handleJoinClass = (roomId) => {
        navigate(`/class/${roomId}`);
    };

    const handleViewAssignment = (assignmentId) => {
        // Navigate to assignment details or form
        // Assuming /homework might be the place or we create a specific route
        // Logic from HomeworkPage might apply
        navigate('/homework'); // Redirecting to main homework page for now as per current structure
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-8 font-sans">
            <div className="max-w-6xl mx-auto space-y-8">

                {/* Header */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                    <button
                        onClick={handleBack}
                        className="flex items-center text-gray-500 hover:text-gray-700 transition-colors mb-4"
                    >
                        <ArrowLeftIcon className="h-4 w-4 mr-1" />
                        Back to My Courses
                    </button>

                    <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                        <BookOpenIcon className="h-8 w-8 text-red-600" />
                        {course?.title || 'Course Content'}
                    </h1>
                    {course?.description && (
                        <p className="text-gray-500 mt-2 max-w-3xl">{course.description}</p>
                    )}
                </div>

                {/* Tabs */}
                <div className="flex space-x-4 border-b border-gray-200">
                    <button
                        onClick={() => setActiveTab('classes')}
                        className={`pb-4 px-4 text-sm font-medium transition-colors relative ${activeTab === 'classes'
                                ? 'text-red-600 border-b-2 border-red-600'
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        <span className="flex items-center gap-2">
                            <VideoCameraIcon className="h-5 w-5" />
                            Classes ({lectures.length})
                        </span>
                    </button>
                    <button
                        onClick={() => setActiveTab('assignments')}
                        className={`pb-4 px-4 text-sm font-medium transition-colors relative ${activeTab === 'assignments'
                                ? 'text-red-600 border-b-2 border-red-600'
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        <span className="flex items-center gap-2">
                            <ClipboardDocumentListIcon className="h-5 w-5" />
                            Assignments ({assignments.length})
                        </span>
                    </button>
                </div>

                {/* Content Area */}
                <div className="min-h-[400px]">

                    {/* Classes Tab */}
                    {activeTab === 'classes' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {lectures.length > 0 ? (
                                lectures.map((lecture) => (
                                    <div key={lecture._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                                        <div className="p-6">
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="p-3 bg-red-50 rounded-lg">
                                                    <VideoCameraIcon className="h-6 w-6 text-red-600" />
                                                </div>
                                                <span className={`px-2 py-1 rounded text-xs font-medium ${new Date(lecture.startTime) > new Date() ? 'bg-blue-50 text-blue-700' : 'bg-gray-100 text-gray-600'
                                                    }`}>
                                                    {new Date(lecture.startTime) > new Date() ? 'Upcoming' : 'Completed'}
                                                </span>
                                            </div>
                                            <h3 className="text-lg font-bold text-gray-900 mb-2">{lecture.title || 'Untitled Lecture'}</h3>
                                            <div className="flex items-center text-sm text-gray-500 mb-4">
                                                <CalendarIcon className="h-4 w-4 mr-2" />
                                                {new Date(lecture.date || lecture.createdAt).toLocaleDateString()}
                                            </div>

                                            <button
                                                onClick={() => handleJoinClass(lecture.roomId || lecture._id)}
                                                className="w-full flex items-center justify-center px-4 py-2 border border-red-600 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors"
                                            >
                                                <PlayCircleIcon className="h-4 w-4 mr-2" />
                                                Join / View Class
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full py-12 text-center text-gray-500 bg-white rounded-xl border border-dashed border-gray-300">
                                    <VideoCameraIcon className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                                    <p>No classes scheduled for this course yet.</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Assignments Tab */}
                    {activeTab === 'assignments' && (
                        <div className="space-y-4">
                            {assignments.length > 0 ? (
                                assignments.map((assignment) => (
                                    <div key={assignment._id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                                        <div className="flex items-start gap-4">
                                            <div className="p-3 bg-indigo-50 rounded-lg shrink-0">
                                                <DocumentTextIcon className="h-6 w-6 text-indigo-600" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-900">{assignment.title}</h3>
                                                <p className="text-sm text-gray-500 mt-1 line-clamp-1">{assignment.description}</p>
                                                <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                                                    <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                                                    <span>•</span>
                                                    <span>Points: {assignment.totalPoints || 100}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleViewAssignment(assignment._id)}
                                            className="w-full md:w-auto px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
                                        >
                                            View Assignments
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <div className="py-12 text-center text-gray-500 bg-white rounded-xl border border-dashed border-gray-300">
                                    <ClipboardDocumentListIcon className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                                    <p>No assignments posted for this course yet.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CourseContent;
