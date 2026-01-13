import React, { useState } from 'react';
import apiClient from '../../services/apiClient';
import { useLogin } from '../../Context/LoginContext';
import { BookOpenIcon, PhotoIcon, ClockIcon, FolderIcon, TagIcon } from '@heroicons/react/24/outline';

const CreateCourse = () => {
    const { user } = useLogin();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        schedule: '', // Added as per backend
        // Removed unsupported fields from state to avoid confusion, 
        // though we can keep them in UI and append to description if generally needed.
        // For now, strictly matching backend to fix 500.
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        // Generate a random enrollment code (required by backend)
        const enrollmentCode = 'COURSE-' + Math.random().toString(36).substring(2, 8).toUpperCase();

        // Get organizationId from user (assuming trainer has it)
        // Fallback to user ID if missing (might fail if strict relation, but worth a try if schema differs)
        const organizationId = user.organizationId || user._id;

        const payload = {
            title: formData.title,
            description: formData.description,
            schedule: formData.schedule,
            enrollmentCode,
            organizationId
        };

        try {
            // API call to create course
            const response = await apiClient.post('/api/course/create', payload);

            if (response.data) {
                // Construct share link
                const shareLink = `${window.location.origin}/student/enroll?code=${enrollmentCode}`;

                setSuccess({
                    message: 'Course created successfully!',
                    code: enrollmentCode,
                    link: shareLink
                });

                // Reset form
                setFormData({
                    title: '',
                    description: '',
                    schedule: ''
                });
            }
        } catch (err) {
            console.error('Create course error:', err);
            setError(err.response?.data?.message || 'Failed to create course. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                        <BookOpenIcon className="h-8 w-8 text-red-600 mr-3" />
                        Create New Course
                    </h1>
                    <p className="text-gray-600 mt-2 ml-11">
                        Share your knowledge with students by creating a comprehensive course.
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="bg-red-600 h-2 w-full"></div>

                    <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">

                        {/* Status Messages */}
                        {error && (
                            <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-200 text-sm">
                                {error}
                            </div>
                        )}
                        {success && (
                            <div className="p-6 bg-green-50 rounded-xl border border-green-200 space-y-4">
                                <div className="flex items-center text-green-800 font-medium">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                    {success.message}
                                </div>

                                <div className="bg-white p-4 rounded-lg border border-green-100 shadow-sm">
                                    <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">Enrollment Code</p>
                                    <div className="flex items-center justify-between">
                                        <code className="text-lg font-mono font-bold text-gray-800">{success.code}</code>
                                        <button
                                            type="button"
                                            onClick={() => navigator.clipboard.writeText(success.code)}
                                            className="text-xs text-green-600 hover:text-green-700 font-medium"
                                        >
                                            Copy Code
                                        </button>
                                    </div>
                                </div>

                                <div className="bg-white p-4 rounded-lg border border-green-100 shadow-sm">
                                    <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">Shareable Link</p>
                                    <div className="flex items-center gap-2">
                                        <input
                                            readOnly
                                            value={success.link}
                                            className="text-sm text-gray-600 w-full bg-gray-50 px-2 py-1 rounded border-none focus:ring-0"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => navigator.clipboard.writeText(success.link)}
                                            className="text-white bg-green-600 hover:bg-green-700 px-3 py-1.5 rounded-md text-xs font-medium transition-colors"
                                        >
                                            Copy
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Course Title</label>
                            <input
                                type="text"
                                name="title"
                                required
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="e.g., Advanced React Patterns"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition-colors"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                                name="description"
                                required
                                rows="4"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="What will students learn in this course?"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition-colors"
                            />
                        </div>

                        {/* Schedule (Replaces category/level for now as per backend) */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Schedule (Optional)</label>
                            <div className="relative">
                                <ClockIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
                                <input
                                    type="text"
                                    name="schedule"
                                    value={formData.schedule}
                                    onChange={handleChange}
                                    placeholder="e.g., Mon, Wed 10:00 AM"
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition-colors"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4 flex justify-end">
                            <button
                                type="submit"
                                disabled={loading}
                                className={`
                                    px-6 py-2.5 rounded-lg text-white font-medium shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500
                                    ${loading ? 'bg-red-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 hover:shadow-md transform hover:-translate-y-0.5'}
                                `}
                            >
                                {loading ? (
                                    <span className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Creating...
                                    </span>
                                ) : (
                                    'Create Course'
                                )}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateCourse;
