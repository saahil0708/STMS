import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import apiClient from '../../services/apiClient';
import { useLogin } from '../../Context/LoginContext';
import { TicketIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const EnrollCourse = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { user } = useLogin();

    const [enrollmentCode, setEnrollmentCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        // Auto-fill from URL if present
        const codeFromUrl = searchParams.get('code');
        if (codeFromUrl) {
            setEnrollmentCode(codeFromUrl);
        }
    }, [searchParams]);

    const handleEnroll = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await apiClient.post('/api/course/enroll', { enrollmentCode });

            if (response.data) {
                setSuccess('Successfully enrolled! Redirecting...');
                setTimeout(() => {
                    navigate('/courses');
                }, 2000);
            }
        } catch (err) {
            console.error('Enrollment error:', err);
            setError(err.response?.data?.message || 'Failed to enroll. Please check the code.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all hover:scale-[1.01]">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white text-center">
                    <TicketIcon className="h-12 w-12 mx-auto mb-3 opacity-90" />
                    <h2 className="text-2xl font-bold">Join a Course</h2>
                    <p className="text-blue-100 text-sm mt-1">Enter your unique enrollment code</p>
                </div>

                <div className="p-8">
                    <form onSubmit={handleEnroll} className="space-y-6">
                        {error && (
                            <div className="p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-100 text-center animate-pulse">
                                {error}
                            </div>
                        )}
                        {success && (
                            <div className="p-3 bg-green-50 text-green-700 text-sm rounded-lg border border-green-100 text-center">
                                {success}
                            </div>
                        )}

                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                Enrollment Code
                            </label>
                            <input
                                type="text"
                                required
                                value={enrollmentCode}
                                onChange={(e) => setEnrollmentCode(e.target.value.toUpperCase())}
                                placeholder="e.g. COURSE-X7Y8Z9"
                                className="w-full text-center text-2xl font-mono font-bold tracking-widest px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all uppercase placeholder-gray-300"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading || !enrollmentCode}
                            className={`w-full py-3.5 px-4 rounded-xl font-bold text-white shadow-lg flex items-center justify-center space-x-2 transition-all transform active:scale-95
                                ${loading
                                    ? 'bg-gray-400 cursor-wait'
                                    : 'bg-blue-600 hover:bg-blue-700 hover:shadow-blue-500/30'
                                }
                            `}
                        >
                            <span>{loading ? 'Joining...' : 'Enroll Now'}</span>
                            {!loading && <ArrowRightIcon className="h-5 w-5" />}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-xs text-gray-400">
                            Don't have a code? Ask your trainer for the share link.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EnrollCourse;
