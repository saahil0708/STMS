import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from '../../services/apiClient';
import {
    UserCircleIcon,
    AcademicCapIcon,
    ClipboardDocumentCheckIcon,
    ChatBubbleLeftRightIcon,
    ClockIcon
} from '@heroicons/react/24/outline';
import { Loader2 } from 'lucide-react';

const StudentDetails = () => {
    const { id } = useParams();
    const [student, setStudent] = useState(null);
    const [attendance, setAttendance] = useState([]);
    const [submissions, setSubmissions] = useState([]);
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                // Fetch aggregate data or individual endpoints
                // Assuming we make a new aggregate endpoint or parallel fetch
                // Let's do parallel fetch for now if specific aggregate doesn't exist
                // We'll Create GET /api/admin/student/:id/details in backend to make this efficient
                // For now, I'll simulate it with what we might have or build the endpoint next.
                // I will build: GET /api/auth/admin/student/:id/details

                const res = await apiClient.get(`/api/auth/admin/student/${id}/details`);
                const data = res.data;

                setStudent(data.student);
                setAttendance(data.attendance || []);
                setSubmissions(data.submissions || []);
                setFeedbacks(data.feedbacks || []);
            } catch (error) {
                console.error("Failed to fetch student details", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [id]);

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
            </div>
        );
    }

    if (!student) {
        return <div className="p-8 text-center">Student not found.</div>;
    }

    return (
        <div className="p-6 md:p-12 font-sans bg-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto space-y-6">
                {/* Header */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center gap-6">
                    <div className="h-20 w-20 rounded-full bg-indigo-100 flex items-center justify-center overflow-hidden">
                        {student.profileValues?.profilePhoto ? (
                            <img src={student.profileValues.profilePhoto || student.profileImage} alt={student.name} className="h-full w-full object-cover" />
                        ) : (
                            <UserCircleIcon className="h-12 w-12 text-indigo-400" />
                        )}
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{student.name}</h1>
                        <p className="text-gray-500">{student.email}</p>
                        <div className="flex gap-2 mt-2">
                            <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold uppercase rounded-full">Student</span>
                            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold uppercase rounded-full">ID: {student._id.slice(-6)}</span>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex space-x-1 border-b border-gray-200">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'overview' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                    >
                        Overview
                    </button>
                    <button
                        onClick={() => setActiveTab('attendance')}
                        className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'attendance' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                    >
                        Attendance
                    </button>
                    <button
                        onClick={() => setActiveTab('assignments')}
                        className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'assignments' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                    >
                        Assignments
                    </button>
                    <button
                        onClick={() => setActiveTab('feedback')}
                        className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'feedback' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                    >
                        Feedbacks
                    </button>
                </div>

                {/* Content */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 min-h-[400px]">
                    {activeTab === 'overview' && (
                        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 text-center">
                                <ClockIcon className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
                                <div className="text-2xl font-bold text-gray-900">{attendance.length}</div>
                                <div className="text-xs text-gray-500 uppercase tracking-wider">Classes Attended</div>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 text-center">
                                <ClipboardDocumentCheckIcon className="h-8 w-8 text-green-600 mx-auto mb-2" />
                                <div className="text-2xl font-bold text-gray-900">{submissions.length}</div>
                                <div className="text-xs text-gray-500 uppercase tracking-wider">Assignments Submitted</div>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 text-center">
                                <ChatBubbleLeftRightIcon className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                                <div className="text-2xl font-bold text-gray-900">{feedbacks.length}</div>
                                <div className="text-xs text-gray-500 uppercase tracking-wider">Feedbacks Given</div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'attendance' && (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 border-b border-gray-100">
                                    <tr>
                                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Date</th>
                                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Course</th>
                                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Duration</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {attendance.map((record) => (
                                        <tr key={record._id} className="hover:bg-gray-50">
                                            <td className="px-6 py-3 text-sm text-gray-700">{new Date(record.joinTime || record.createdAt).toLocaleDateString()}</td>
                                            <td className="px-6 py-3 text-sm text-gray-700">{record.courseId?.title || 'Unknown'}</td>
                                            <td className="px-6 py-3">
                                                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium capitalize ${record.status === 'present' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                                    {record.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-3 text-sm text-gray-500">{record.duration ? `${record.duration} mins` : '-'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeTab === 'assignments' && (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 border-b border-gray-100">
                                    <tr>
                                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Assignment</th>
                                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Submitted On</th>
                                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Grade</th>
                                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Feedback</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {submissions.map((sub) => (
                                        <tr key={sub._id} className="hover:bg-gray-50">
                                            <td className="px-6 py-3 text-sm text-gray-900 font-medium">{sub.assignmentId?.title || 'Assignment'}</td>
                                            <td className="px-6 py-3 text-sm text-gray-500">{new Date(sub.submittedAt).toLocaleDateString()}</td>
                                            <td className="px-6 py-3 text-sm">
                                                {sub.grade ? (
                                                    <span className="font-bold text-gray-900">{sub.grade}</span>
                                                ) : (
                                                    <span className="text-gray-400 italic">Pending</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-3 text-sm text-gray-500 truncate max-w-xs">{sub.feedback || '-'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeTab === 'feedback' && (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 border-b border-gray-100">
                                    <tr>
                                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Date</th>
                                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Course/Class</th>
                                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Comment</th>
                                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Rating</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {feedbacks.map((f) => (
                                        <tr key={f._id} className="hover:bg-gray-50">
                                            <td className="px-6 py-3 text-sm text-gray-500">{new Date(f.createdAt).toLocaleDateString()}</td>
                                            <td className="px-6 py-3 text-sm text-gray-900">{f.courseId?.title || 'General'}</td>
                                            <td className="px-6 py-3 text-sm text-gray-700 max-w-xs truncate">{f.message}</td>
                                            <td className="px-6 py-3 text-sm text-orange-600 font-bold">{f.rating || '-'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StudentDetails;
