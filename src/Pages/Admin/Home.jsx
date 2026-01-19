import React, { useState, useEffect } from 'react';
import QuickActions from '../../Components/Admin/Home/QuickActions';
import Stats from '../../Components/Admin/Home/Stats';
import apiClient from '../../services/apiClient';

const AdminHome = () => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        systemHealth: 'Checking...',
        revenue: '$0',
        recentActivity: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await apiClient.get('/api/org/stats');
                setStats(response.data);
            } catch (error) {
                console.error('Failed to fetch admin stats:', error);
                setStats(prev => ({ ...prev, systemHealth: 'Offline' }));
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                        Admin Dashboard
                    </h1>
                    <p className="text-gray-600">
                        System overview and management
                    </p>
                </div>

                {/* Stats */}
                <div className="mb-8">
                    <Stats stats={stats} />
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        {/* System Activity */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">System Activity</h3>
                            <div className="space-y-4">
                                {stats.recentActivity && stats.recentActivity.length > 0 ? (
                                    stats.recentActivity.map((activity) => (
                                        <div key={activity.id} className="flex items-center justify-between p-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                                            <div className="flex gap-3">
                                                <span className="text-gray-400 text-sm">{activity.time}</span>
                                                <span className="text-gray-700 text-sm flex-1">{activity.description}</span>
                                            </div>
                                            <span className={`text-xs px-2 py-1 rounded-full ${activity.status === 'Success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                {activity.status}
                                            </span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center text-gray-500 py-4">No recent activity</div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <QuickActions />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminHome;
