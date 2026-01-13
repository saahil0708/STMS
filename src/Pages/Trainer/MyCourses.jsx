import React, { useState, useEffect } from 'react';
import apiClient from '../../services/apiClient';
import {
    BookOpenIcon,
    PlusIcon,
    ShareIcon,
    UsersIcon,
    EllipsisHorizontalIcon,
    ClipboardDocumentIcon,
    CheckIcon
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const TrainerMyCourses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [shareModal, setShareModal] = useState({ open: false, course: null });
    const [editModal, setEditModal] = useState({ open: false, course: null });
    const [deleteModal, setDeleteModal] = useState({ open: false, course: null });
    const [activeMenu, setActiveMenu] = useState(null); // Course ID for open menu
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await apiClient.get('/api/course/trainer');
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

    const handleOpenShare = (course) => {
        setShareModal({ open: true, course });
        setCopied(false);
    };

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleUpdateCourse = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { _id, title, description, schedule } = editModal.course;
            await apiClient.put(`/api/course/${_id}`, { title, description, schedule });
            setCourses(prev => prev.map(c => c._id === _id ? { ...c, title, description, schedule } : c));
            setEditModal({ open: false, course: null });
        } catch (error) {
            console.error('Failed to update course:', error);
            alert('Failed to update course. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteCourse = async () => {
        setLoading(true);
        try {
            const { _id } = deleteModal.course;
            await apiClient.delete(`/api/course/${_id}`);
            setCourses(prev => prev.filter(c => c._id !== _id));
            setDeleteModal({ open: false, course: null });
        } catch (error) {
            console.error('Failed to delete course:', error);
            alert('Failed to delete course. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const toggleMenu = (courseId, e) => {
        e.stopPropagation();
        setActiveMenu(activeMenu === courseId ? null : courseId);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                            <BookOpenIcon className="h-8 w-8 text-red-600 mr-3" />
                            My Courses
                        </h1>
                        <p className="text-gray-600 mt-1 ml-11">
                            Manage your courses and student enrollments.
                        </p>
                    </div>

                    <Link
                        to="/trainer/create-course"
                        className="inline-flex items-center px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors shadow-sm"
                    >
                        <PlusIcon className="h-5 w-5 mr-2" />
                        Create New Course
                    </Link>
                </div>

                {/* Content */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 h-64 animate-pulse"></div>
                        ))}
                    </div>
                ) : courses.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-200">
                        <div className="mx-auto h-24 w-24 bg-red-50 rounded-full flex items-center justify-center mb-6">
                            <BookOpenIcon className="h-12 w-12 text-red-600 opacity-80" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No Courses Created</h3>
                        <p className="text-gray-500 mb-6">Start by creating your first course to engage students.</p>
                        <Link
                            to="/trainer/create-course"
                            className="inline-flex items-center px-6 py-2.5 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
                        >
                            Create Course
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {courses.map(course => (
                            <div key={course._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow">
                                <div className="p-6 flex-1">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-lg font-bold text-gray-900 line-clamp-2">{course.title}</h3>
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                            {course.category || 'Course'}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-500 line-clamp-3 mb-6">
                                        {course.description}
                                    </p>

                                    <div className="flex items-center text-sm text-gray-600 mb-2">
                                        <UsersIcon className="h-4 w-4 mr-2" />
                                        <span>{course.students ? course.students.length : 0} Students Enrolled</span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <span className="font-mono bg-gray-100 px-2 py-0.5 rounded text-xs border">
                                            {course.enrollmentCode || 'NO-CODE'}
                                        </span>
                                    </div>
                                </div>

                                <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                                    <button
                                        onClick={() => handleOpenShare(course)}
                                        className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center"
                                    >
                                        <ShareIcon className="h-4 w-4 mr-1.5" />
                                        Share Link
                                    </button>
                                    <div className="relative">
                                        <button
                                            onClick={(e) => toggleMenu(course._id, e)}
                                            className="text-gray-400 hover:text-gray-600 focus:outline-none"
                                        >
                                            <EllipsisHorizontalIcon className="h-6 w-6" />
                                        </button>

                                        {activeMenu === course._id && (
                                            <>
                                                <div className="fixed inset-0 z-10" onClick={() => setActiveMenu(null)}></div>
                                                <div className="absolute right-0 bottom-full mb-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-20">
                                                    <button
                                                        onClick={() => {
                                                            setEditModal({ open: true, course: { ...course } });
                                                            setActiveMenu(null);
                                                        }}
                                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                                                    >
                                                        Edit Course
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setDeleteModal({ open: true, course });
                                                            setActiveMenu(null);
                                                        }}
                                                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
                                                    >
                                                        Delete Course
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Share Modal */}
            {shareModal.open && shareModal.course && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100">
                        <div className="p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Share Course</h3>
                            <p className="text-sm text-gray-600 mb-6">
                                Invite students to <strong>{shareModal.course.title}</strong> using the details below.
                            </p>

                            <div className="space-y-4">
                                {/* Code */}
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                                        Enrollment Code
                                    </label>
                                    <div className="flex gap-2">
                                        <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 font-mono font-bold text-gray-800 select-all">
                                            {shareModal.course.enrollmentCode}
                                        </div>
                                        <button
                                            onClick={() => handleCopy(shareModal.course.enrollmentCode)}
                                            className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors"
                                            title="Copy Code"
                                        >
                                            {copied ? <CheckIcon className="h-5 w-5 text-green-600" /> : <ClipboardDocumentIcon className="h-5 w-5" />}
                                        </button>
                                    </div>
                                </div>

                                {/* Link */}
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                                        Shareable Link
                                    </label>
                                    <div className="relative">
                                        <input
                                            readOnly
                                            value={`${window.location.origin}/student/enroll?code=${shareModal.course.enrollmentCode}`}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-600 pr-24 focus:ring-0"
                                        />
                                        <button
                                            onClick={() => handleCopy(`${window.location.origin}/student/enroll?code=${shareModal.course.enrollmentCode}`)}
                                            className="absolute right-1 top-1 bottom-1 px-3 bg-red-600 text-white rounded-md text-xs font-bold hover:bg-red-700 transition-colors"
                                        >
                                            {copied ? 'Copied!' : 'Copy Link'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-6 py-4 flex justify-end">
                            <button
                                onClick={() => setShareModal({ open: false, course: null })}
                                className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {editModal.open && editModal.course && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden">
                        <form onSubmit={handleUpdateCourse}>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Edit Course</h3>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Course Title</label>
                                        <input
                                            type="text"
                                            required
                                            value={editModal.course.title}
                                            onChange={(e) => setEditModal({ ...editModal, course: { ...editModal.course, title: e.target.value } })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                        <textarea
                                            required
                                            rows="4"
                                            value={editModal.course.description}
                                            onChange={(e) => setEditModal({ ...editModal, course: { ...editModal.course, description: e.target.value } })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Schedule</label>
                                        <input
                                            type="text"
                                            value={editModal.course.schedule || ''}
                                            onChange={(e) => setEditModal({ ...editModal, course: { ...editModal.course, schedule: e.target.value } })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setEditModal({ open: false, course: null })}
                                    className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {deleteModal.open && deleteModal.course && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden">
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Course?</h3>
                            <p className="text-gray-600 mb-6">
                                Are you sure you want to delete <strong>{deleteModal.course.title}</strong>? This action cannot be undone.
                            </p>
                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => setDeleteModal({ open: false, course: null })}
                                    className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDeleteCourse}
                                    className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TrainerMyCourses;
