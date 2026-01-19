import React, { useState, useEffect } from 'react';
import apiClient from '../../services/apiClient';
import { StarIcon } from '@heroicons/react/24/solid';

const AdminFeedback = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeedback = async () => {
            try {
                const response = await apiClient.get('/api/auth/admin/feedback');
                setFeedbacks(response.data);
            } catch (error) {
                console.error('Error fetching feedback:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFeedback();
    }, []);

    return (
        <div className="p-6 md:p-12 font-sans bg-gray-50 min-h-screen">
            <div className="max-w-5xl mx-auto space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Course Feedback</h1>
                    <p className="text-gray-500 mt-1">Student reviews and ratings</p>
                </div>

                <div className="space-y-4">
                    {loading ? (
                        <div className="p-12 flex justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                        </div>
                    ) : feedbacks.length > 0 ? (
                        feedbacks.map((item) => (
                            <div key={item._id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center gap-2">
                                        <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">
                                            {item.studentId?.name ? item.studentId.name.charAt(0) : '?'}
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-gray-900">{item.studentId?.name || 'Anonymous'}</p>
                                            <p className="text-xs text-gray-500">{new Date(item.createdAt).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <div className="flex text-yellow-400">
                                        {[...Array(5)].map((_, i) => (
                                            <StarIcon key={i} className={`h-4 w-4 ${i < item.rating ? 'text-yellow-400' : 'text-gray-200'}`} />
                                        ))}
                                    </div>
                                </div>
                                <div className="ml-10">
                                    <p className="text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide">Course: {item.courseId?.title}</p>
                                    <p className="text-gray-700">{item.comment}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-gray-500 py-12">No feedback submitted yet.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminFeedback;
