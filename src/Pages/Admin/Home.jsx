import React from 'react';
import QuickActions from '../../Components/Admin/Home/QuickActions';
import Stats from '../../Components/Admin/Home/Stats';

const AdminHome = () => {
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
                    <Stats />
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        {/* System Activity Placeholder */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">System Activity</h3>
                            <div className="space-y-4">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="flex items-center justify-between p-3 border-b border-gray-100 last:border-0">
                                        <div className="flex gap-3">
                                            <span className="text-gray-400 text-sm">10:4{i} AM</span>
                                            <span className="text-gray-700 text-sm">New user registration: <span className="font-medium">User_{i}</span></span>
                                        </div>
                                        <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">Success</span>
                                    </div>
                                ))}
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
