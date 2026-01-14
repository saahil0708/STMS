import React, { useState, useEffect, useRef } from 'react';
import apiClient from '../../services/apiClient';
import { useLogin } from '../../Context/LoginContext';
import {
    ClipboardDocumentListIcon,
    BookOpenIcon,
    CalendarIcon,
    TrophyIcon,
    ListBulletIcon,
    DocumentTextIcon,
    PlusIcon,
    TrashIcon,
    ChevronDownIcon,
    CheckIcon
} from '@heroicons/react/24/outline';

const AddAssignment = () => {
    const { user } = useLogin();
    const [courses, setCourses] = useState([]);
    const [loadingCourses, setLoadingCourses] = useState(true);
    const [loadingSubmit, setLoadingSubmit] = useState(false);

    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const [assignmentType, setAssignmentType] = useState('task'); // 'task' or 'form'
    const [questions, setQuestions] = useState([{ id: 1, questionText: '', type: 'text' }]);

    // Multi-select state
    const [selectedCourseIds, setSelectedCourseIds] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        dueDate: '',
        totalMarks: 100
    });

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Fetch courses on mount
    useEffect(() => {
        const fetchTrainerCourses = async () => {
            try {
                const response = await apiClient.get('/api/course/trainer');
                const courseData = response.data.data || response.data;
                setCourses(Array.isArray(courseData) ? courseData : []);
            } catch (err) {
                console.error('Failed to fetch courses:', err);
                setError('Could not load your courses. Please try refreshing.');
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

    const toggleCourseSelection = (courseId) => {
        setSelectedCourseIds(prev =>
            prev.includes(courseId)
                ? prev.filter(id => id !== courseId)
                : [...prev, courseId]
        );
    };

    const selectAllCourses = () => {
        if (selectedCourseIds.length === courses.length) {
            setSelectedCourseIds([]);
        } else {
            setSelectedCourseIds(courses.map(c => c._id));
        }
    };

    // Form Builder Handlers
    const addQuestion = () => {
        setQuestions([...questions, { id: Date.now(), questionText: '', type: 'text' }]);
    };

    const removeQuestion = (id) => {
        if (questions.length > 1) {
            setQuestions(questions.filter(q => q.id !== id));
        }
    };

    const updateQuestion = (id, field, value) => {
        setQuestions(questions.map(q => q.id === id ? { ...q, [field]: value } : q));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoadingSubmit(true);
        setError('');
        setSuccess('');

        if (selectedCourseIds.length === 0) {
            setError('Please select at least one course (batch).');
            setLoadingSubmit(false);
            return;
        }

        const successes = [];
        const failures = [];

        // Base Payload
        const basePayload = {
            title: formData.title,
            description: formData.description,
            dueDate: formData.dueDate,
            maxScore: parseInt(formData.totalMarks, 10), // Ensure number
            type: assignmentType,
            content: assignmentType === 'form'
                ? { questions }
                : { instructions: formData.description }
        };

        console.log('Publishing Assignment Payload:', basePayload);

        try {
            // Iterate and publish to all selected courses
            await Promise.all(selectedCourseIds.map(async (courseId) => {
                try {
                    await apiClient.post('/api/assignment/create', { ...basePayload, courseId });
                    successes.push(courseId);
                } catch (err) {
                    console.error(`Failed for course ${courseId}:`, err);
                    failures.push(courseId);
                }
            }));

            if (failures.length === 0) {
                setSuccess(`Successfully published to ${successes.length} batch(es)!`);
                // Reset form
                setFormData({
                    title: '',
                    description: '',
                    dueDate: '',
                    totalMarks: 100
                });
                setQuestions([{ id: 1, questionText: '', type: 'text' }]);
                setAssignmentType('task');
                setSelectedCourseIds([]);
            } else {
                setError(`Partial success: Published to ${successes.length} batches, failed for ${failures.length}.`);
            }

        } catch (err) {
            console.error('Create assignment error:', err);
            setError('Critical error occurred while publishing assignments.');
        } finally {
            setLoadingSubmit(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                        <ClipboardDocumentListIcon className="h-8 w-8 text-red-600 mr-3" />
                        Add New Assignment
                    </h1>
                    <p className="text-gray-600 mt-2 ml-11">
                        Create tasks or forms and publish them to multiple batches at once.
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="bg-red-600 h-2 w-full"></div>

                    <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8">
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

                        {/* Top Section: Course Selection (Multi) & Title */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* Multi-Select Dropdown */}
                            <div className="relative" ref={dropdownRef}>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Select Batches / Courses</label>
                                <button
                                    type="button"
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition-colors bg-white text-left flex items-center justify-between"
                                >
                                    <span className={`block truncate ${selectedCourseIds.length === 0 ? 'text-gray-400' : 'text-gray-900'}`}>
                                        {selectedCourseIds.length === 0
                                            ? '-- Select Batches --'
                                            : selectedCourseIds.length === courses.length
                                                ? 'All Batches Selected'
                                                : `${selectedCourseIds.length} Batches Selected`
                                        }
                                    </span>
                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                        <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </span>
                                </button>

                                {isDropdownOpen && (
                                    <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                        {courses.length > 0 && (
                                            <div
                                                className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-50 text-gray-900 border-b border-gray-100 font-semibold"
                                                onClick={selectAllCourses}
                                            >
                                                <span className="block truncate">
                                                    {selectedCourseIds.length === courses.length ? 'Unselect All' : 'Select All'}
                                                </span>
                                            </div>
                                        )}
                                        {loadingCourses ? (
                                            <div className="py-2 px-4 text-gray-500">Loading...</div>
                                        ) : courses.length === 0 ? (
                                            <div className="py-2 px-4 text-gray-500">No courses found</div>
                                        ) : (
                                            courses.map((course) => (
                                                <div
                                                    key={course._id}
                                                    className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-red-50 text-gray-900"
                                                    onClick={() => toggleCourseSelection(course._id)}
                                                >
                                                    <div className="flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedCourseIds.includes(course._id)}
                                                            readOnly
                                                            className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded mr-3 pointer-events-none"
                                                        />
                                                        <span className={`block truncate ${selectedCourseIds.includes(course._id) ? 'font-medium' : 'font-normal'}`}>
                                                            {course.title}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Assignment Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    required
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="e.g., Weekly Quiz"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition-colors"
                                />
                            </div>
                        </div>

                        {/* Type Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">Assignment Type</label>
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    type="button"
                                    onClick={() => setAssignmentType('task')}
                                    className={`flex items-center justify-center p-4 rounded-xl border-2 transition-all ${assignmentType === 'task'
                                        ? 'border-red-500 bg-red-50 text-red-700'
                                        : 'border-gray-200 hover:border-red-200 hover:bg-gray-50'
                                        }`}
                                >
                                    <DocumentTextIcon className="h-6 w-6 mr-2" />
                                    <div className="text-left">
                                        <div className="font-bold">Single Task</div>
                                        <div className="text-xs opacity-75">File upload or status update</div>
                                    </div>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setAssignmentType('form')}
                                    className={`flex items-center justify-center p-4 rounded-xl border-2 transition-all ${assignmentType === 'form'
                                        ? 'border-red-500 bg-red-50 text-red-700'
                                        : 'border-gray-200 hover:border-red-200 hover:bg-gray-50'
                                        }`}
                                >
                                    <ListBulletIcon className="h-6 w-6 mr-2" />
                                    <div className="text-left">
                                        <div className="font-bold">Form / Quiz</div>
                                        <div className="text-xs opacity-75">Multiple questions</div>
                                    </div>
                                </button>
                            </div>
                        </div>

                        {/* Dynamic Content Based on Type */}
                        {assignmentType === 'task' ? (
                            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                                <label className="block text-sm font-bold text-gray-900 mb-2">Task Instructions</label>
                                <textarea
                                    name="description"
                                    required
                                    rows="6"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Describe what the student needs to do..."
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition-colors"
                                />
                            </div>
                        ) : (
                            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 space-y-4">
                                <div className="flex justify-between items-center mb-2">
                                    <label className="block text-sm font-bold text-gray-900">Form Questions</label>
                                    <button
                                        type="button"
                                        onClick={addQuestion}
                                        className="text-sm font-medium text-red-600 hover:text-red-700 flex items-center"
                                    >
                                        <PlusIcon className="h-4 w-4 mr-1" />
                                        Add Question
                                    </button>
                                </div>

                                {questions.map((q, index) => (
                                    <div key={q.id} className="flex gap-3 items-start animate-fadeIn">
                                        <span className="text-gray-400 font-mono mt-3 text-sm">{index + 1}.</span>
                                        <div className="flex-1 space-y-2">
                                            <input
                                                type="text"
                                                required
                                                placeholder="Enter question text..."
                                                value={q.questionText}
                                                onChange={(e) => updateQuestion(q.id, 'questionText', e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition-colors"
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeQuestion(q.id)}
                                            className="mt-2 text-gray-400 hover:text-red-600 transition-colors"
                                            title="Remove Question"
                                        >
                                            <TrashIcon className="h-5 w-5" />
                                        </button>
                                    </div>
                                ))}

                                <div className="pt-2">
                                    <label className="block text-sm font-bold text-gray-900 mb-2">General Instructions (Optional)</label>
                                    <textarea
                                        name="description"
                                        rows="2"
                                        value={formData.description}
                                        onChange={handleChange}
                                        placeholder="Any overall instructions for this form..."
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition-colors"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Metadata: Date & Marks */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-xl border border-gray-200">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                                <div className="relative">
                                    <CalendarIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
                                    <input
                                        type="date"
                                        name="dueDate"
                                        required
                                        value={formData.dueDate}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition-colors"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Total Marks / Points</label>
                                <div className="relative">
                                    <TrophyIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
                                    <input
                                        type="number"
                                        name="totalMarks"
                                        required
                                        min="0"
                                        value={formData.totalMarks}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition-colors"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4 flex justify-end">
                            <button
                                type="submit"
                                disabled={loadingSubmit}
                                className={`
                                    px-8 py-3 rounded-xl text-white font-bold shadow-lg transition-all 
                                    ${loadingSubmit
                                        ? 'bg-red-400 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 hover:shadow-xl transform hover:-translate-y-0.5'
                                    }
                                `}
                            >
                                {loadingSubmit ? (
                                    <span className="flex items-center">
                                        publishing...
                                    </span>
                                ) : (
                                    'Publish Assignment'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddAssignment;
