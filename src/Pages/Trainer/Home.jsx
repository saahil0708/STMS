import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import QuickActions from '../../components/Trainer/Home/QuickActions';
import Stats from '../../components/Trainer/Home/Stats';
import TodayClasses from '../../components/Trainer/Home/TodayClasses';
import apiClient from '../../services/apiClient';

const TrainerHome = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        activeCourses: 0,
        totalStudents: 0,
        averageRating: 0,
        recentSubmissions: []
    });
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({ name: 'Trainer' }); // Fallback or fetch from context

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // Fetch stats
                const response = await apiClient.get('/api/auth/trainer/dashboard-stats');
                setStats(response.data);

                // Fetch user info if needed, or use stored user
                const storedUser = JSON.parse(localStorage.getItem('user'));
                if (storedUser) setUser(storedUser);

            } catch (error) {
                console.error('Error fetching dashboard stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Welcome back, {user.name}!
                    </h1>
                    <p className="text-gray-500 text-lg">
                        Here's what's happening with your courses today.
                    </p>
                </div>

                {/* Stats */}
                <div className="mb-8">
                    <Stats stats={stats} />
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    <div className="xl:col-span-2 space-y-8">
                        {/* Today's Classes */}
                        <TodayClasses />

                        {/* Recent Submissions */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
                                <h3 className="text-lg font-bold text-gray-900">Recent Submissions</h3>
                                <button className="text-sm text-indigo-600 font-semibold hover:text-indigo-700 hover:bg-indigo-50 px-3 py-1 rounded-lg transition-colors">
                                    View All
                                </button>
                            </div>
                            <div className="divide-y divide-gray-50">
                                {stats.recentSubmissions.length > 0 ? (
                                    stats.recentSubmissions.map((submission) => (
                                        <div key={submission.id} className="flex items-center justify-between p-6 hover:bg-gray-50 transition-colors">
                                            <div className="flex items-center gap-4">
                                                <div className="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-sm">
                                                    {submission.studentName.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-gray-900">{submission.studentName}</p>
                                                    <p className="text-xs text-gray-500">{submission.assignmentTitle}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize
                                                ${submission.status === 'submitted' ? 'bg-yellow-100 text-yellow-700' :
                                                        submission.status === 'graded' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                                                    {submission.status}
                                                </span>
                                                <button
                                                    onClick={() => navigate('/trainer/grading', { state: { selectedSubmissionId: submission._id } })}
                                                    className="text-sm text-indigo-600 font-semibold hover:underline"
                                                >
                                                    Review
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-8 text-center text-gray-500">
                                        No recent submissions found.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <QuickActions />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default TrainerHome;
