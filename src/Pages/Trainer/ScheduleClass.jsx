import React, { useState, useEffect } from 'react';
import apiClient from '../../services/apiClient';
import { useLogin } from '../../Context/LoginContext';
import { VideoCameraIcon, BookOpenIcon, ClockIcon, LinkIcon } from '@heroicons/react/24/outline';

const ScheduleClass = () => {
    const { user } = useLogin();
    const [courses, setCourses] = useState([]);
    const [loadingCourses, setLoadingCourses] = useState(true);
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        courseId: '',
        title: '',
        description: '',
        timing: '',
        duration: 60, // minutes
        meetingLink: '',
        type: 'virtual'
    });

    // Fetch courses
    useEffect(() => {
        const fetchTrainerCourses = async () => {
            try {
                const response = await apiClient.get('/api/course/trainer');
                const courseData = response.data.data || response.data;
                setCourses(Array.isArray(courseData) ? courseData : []);
            } catch (err) {
                console.error('Failed to fetch courses:', err);
                setError('Could not load courses.');
            } finally {
                setLoadingCourses(false);
            }
        };
        fetchTrainerCourses();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoadingSubmit(true);
        setError('');
        setSuccess('');

        if (!formData.courseId) {
            setError('Please select a course.');
            setLoadingSubmit(false);
            return;
        }

        try {
            // Updated endpoint to /api/auth/lecture/create based on server instructions
            // Generate Room ID for virtual classes
            const payload = {
                ...formData,
                trainerId: user._id || user.id
            };

            if (formData.type === 'virtual') {
                payload.roomId = `room-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
                payload.meetingLink = ''; // Clear meeting link if virtual (internal system)
            }

            const response = await apiClient.post('/api/auth/lecture/create', payload);

            if (response.data) {
                setSuccess('Class scheduled successfully!');
                setFormData({
                    courseId: '',
                    title: '',
                    description: '',
                    timing: '',
                    duration: 60,
                    meetingLink: '',
                    type: 'virtual'
                });
            }
        } catch (err) {
            console.error('Schedule class error:', err);
            setError(err.response?.data?.message || 'Failed to schedule class.');
        } finally {
            setLoadingSubmit(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-3xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                        <VideoCameraIcon className="h-8 w-8 text-red-600 mr-3" />
                        Schedule Virtual Class
                    </h1>
                    <p className="text-gray-600 mt-2 ml-11">
                        Set up live lectures for your courses.
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="bg-red-600 h-2 w-full"></div>

                    <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
                        {error && (
                            <div className="p-4 bg-red-50 text-red-700 rounded-lg text-sm border border-red-200">
                                {error}
                            </div>
                        )}
                        {success && (
                            <div className="p-4 bg-green-50 text-green-700 rounded-lg text-sm border border-green-200">
                                {success}
                            </div>
                        )}

                        {/* Course Select */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Select Course</label>
                            <div className="relative">
                                <BookOpenIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
                                <select
                                    name="courseId"
                                    required
                                    value={formData.courseId}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition-colors bg-white"
                                >
                                    <option value="">-- Choose a Course --</option>
                                    {courses.map(course => (
                                        <option key={course._id} value={course._id}>
                                            {course.title}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Lecture Title</label>
                            <input
                                type="text"
                                name="title"
                                required
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="e.g., Introduction to State Management"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition-colors"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                                name="description"
                                required
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Briefly describe the lecture content..."
                                rows="3"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition-colors"
                            />
                        </div>

                        {/* Date & Time */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                                <div className="relative">
                                    <ClockIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
                                    <input
                                        type="datetime-local"
                                        name="timing"
                                        required
                                        value={formData.timing}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition-colors"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
                                <input
                                    type="number"
                                    name="duration"
                                    required
                                    min="15"
                                    step="15"
                                    value={formData.duration}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition-colors"
                                />
                            </div>
                        </div>

                        {/* Class Type Toggle */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Class Type</label>
                            <div className="flex space-x-4">
                                <label className={`flex-1 border rounded-lg p-4 cursor-pointer transition-all ${formData.type === 'virtual' ? 'border-red-600 bg-red-50 ring-1 ring-red-600' : 'border-gray-200 hover:border-gray-300'}`}>
                                    <div className="flex items-center">
                                        <input
                                            type="radio"
                                            name="type"
                                            value="virtual"
                                            checked={formData.type === 'virtual'}
                                            onChange={handleChange}
                                            className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300"
                                        />
                                        <div className="ml-3">
                                            <span className="block text-sm font-medium text-gray-900">Virtual Class</span>
                                            <span className="block text-xs text-gray-500">In-app video call system</span>
                                        </div>
                                    </div>
                                </label>
                                <label className={`flex-1 border rounded-lg p-4 cursor-pointer transition-all ${formData.type === 'offline' ? 'border-red-600 bg-red-50 ring-1 ring-red-600' : 'border-gray-200 hover:border-gray-300'}`}>
                                    <div className="flex items-center">
                                        <input
                                            type="radio"
                                            name="type"
                                            value="offline"
                                            checked={formData.type === 'offline'}
                                            onChange={handleChange}
                                            className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300"
                                        />
                                        <div className="ml-3">
                                            <span className="block text-sm font-medium text-gray-900">Offline Class</span>
                                            <span className="block text-xs text-gray-500">Physical location</span>
                                        </div>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* Location / Meeting Link */}
                        {formData.type === 'offline' ? (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Location / Classroom</label>
                                <div className="relative">
                                    <LinkIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
                                    <input
                                        type="text"
                                        name="meetingLink" // Reusing this field for location to match backend model
                                        required
                                        value={formData.meetingLink}
                                        onChange={handleChange}
                                        placeholder="e.g., Room 304, Building A"
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition-colors"
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start">
                                <VideoCameraIcon className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                                <div>
                                    <h4 className="text-sm font-medium text-blue-900">Automatic Room Generation</h4>
                                    <p className="text-sm text-blue-700 mt-1">
                                        A secure video calling room ID will be automatically generated for this class.
                                        You and your students will see a "Join Class" button on the dashboard at the scheduled time.
                                    </p>
                                </div>
                            </div>
                        )}

                        <div className="pt-4 flex justify-end">
                            <button
                                type="submit"
                                disabled={loadingSubmit || loadingCourses}
                                className={`
                                    px-6 py-2.5 rounded-lg text-white font-medium shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500
                                    ${(loadingSubmit || loadingCourses) ? 'bg-red-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 hover:shadow-md transform hover:-translate-y-0.5'}
                                `}
                            >
                                {loadingSubmit ? 'Scheduling...' : 'Schedule Class'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ScheduleClass;
