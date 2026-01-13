import React, { useMemo, useState, useEffect } from 'react';
import apiClient from '../../services/apiClient';
import { useLogin } from '../../Context/LoginContext';
import { Loader2 } from 'lucide-react';

const HomeworkStatus = () => {
    const { user } = useLogin();
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');
    const [query, setQuery] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // 1. Fetch all submissions
                const subResponse = await apiClient.get('/api/submission/my-submissions');
                const submissions = subResponse.data; // Array of submission objects (populated with assignmentId)

                // 2. Fetch enrolled courses
                const coursesRes = await apiClient.get('/api/course/my-courses');
                const courses = coursesRes.data.data || coursesRes.data;
                const courseList = Array.isArray(courses) ? courses : [];

                // 3. Fetch all assignments for these courses
                let allAssignments = [];

                for (const course of courseList) {
                    try {
                        const assignResponse = await apiClient.get(`/api/assignment/course/${course._id}`);
                        if (assignResponse.data) {
                            // Ensure we map assignments to include course context if not present
                            const courseAssignments = (assignResponse.data.data || assignResponse.data).map(a => ({
                                ...a,
                                courseId: course // Embed full course object for display
                            }));
                            allAssignments = [...allAssignments, ...courseAssignments];
                        }
                    } catch (e) {
                        console.error(`Failed to fetch assignments for course ${course._id}`, e);
                    }
                }

                // 3. Merge data
                const mergedData = allAssignments.map(assign => {
                    const submission = submissions.find(s => s.assignmentId._id === assign._id || s.assignmentId === assign._id);

                    let status = 'Pending';
                    if (submission) {
                        status = submission.status === 'graded' ? 'Graded' : 'Submitted';
                    } else {
                        if (new Date(assign.dueDate) < new Date()) {
                            status = 'Overdue';
                        }
                    }

                    return {
                        id: assign._id,
                        title: assign.title,
                        subject: assign.courseId?.title || 'Unknown Course', // Assuming assignment populates course or we have it
                        due: new Date(assign.dueDate).toLocaleDateString(),
                        status: status,
                        submission: submission
                    };
                });

                // If no assignments found but submissions exist (edge case), add them? 
                // Usually submissions are subsets. I'll stick to allAssignments as the source of truth for "Status".

                setAssignments(mergedData);

            } catch (error) {
                console.error("Error fetching homework status:", error);
            } finally {
                setLoading(false);
            }
        };

        if (user) fetchData();
    }, [user]);

    const statusClasses = {
        Pending: 'bg-yellow-100 text-yellow-800',
        Submitted: 'bg-green-100 text-green-800',
        Graded: 'bg-blue-100 text-blue-800',
        Overdue: 'bg-red-100 text-red-800',
    };

    const filtered = useMemo(() => {
        return assignments.filter((hw) => {
            if (filter !== 'All' && hw.status !== filter) return false;
            if (query && !(`${hw.title} ${hw.subject}`.toLowerCase()).includes(query.toLowerCase())) return false;
            return true;
        });
    }, [filter, query, assignments]);

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
            </div>
        );
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Homework Status</h1>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            placeholder="Search homework..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring w-64"
                        />
                        <div className="hidden md:flex items-center gap-2">
                            {['All', 'Pending', 'Submitted', 'Overdue', 'Graded'].map(f => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f)}
                                    className={`px-3 py-1 rounded-lg ${filter === f ? 'bg-indigo-600 text-white' : 'bg-gray-100'}`}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <span className="text-sm text-gray-500">Showing</span>
                        <span className="font-medium">{filtered.length}</span>
                        <span className="text-sm text-gray-500">items</span>
                    </div>
                </div>

                <div className="divide-y">
                    {filtered.length === 0 ? (
                        <div className="py-8 text-center text-gray-500">No homework found.</div>
                    ) : (
                        filtered.map((hw) => (
                            <div key={hw.id} className="py-4 flex flex-col md:flex-row md:items-center md:justify-between">
                                <div>
                                    <div className="flex items-center gap-3">
                                        <div className="font-semibold text-gray-800">{hw.title}</div>
                                        {/* <div className="text-sm text-gray-500">· {hw.subject}</div> */}
                                    </div>
                                    <div className="text-sm text-gray-500">Due: <span className="font-medium text-gray-700">{hw.due}</span></div>
                                </div>

                                <div className="mt-3 md:mt-0 flex items-center gap-3">
                                    <div className={`px-2 py-1 rounded text-sm ${statusClasses[hw.status] || 'bg-gray-100 text-gray-700'}`}>{hw.status}</div>
                                    {/* <button className="px-3 py-1 bg-indigo-600 text-white rounded-lg">View</button> */}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomeworkStatus;
