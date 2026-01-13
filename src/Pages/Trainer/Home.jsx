import React from 'react';
import QuickActions from '../../Components/Trainer/Home/QuickActions';
import Stats from '../../Components/Trainer/Home/Stats';

const TrainerHome = () => {
    // Mock user for now, or use context if you have trainer auth
    const user = { name: 'Trainer' };

    return (
        <div className="min-h-screen bg-gray-50">
            <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                        Trainer Dashboard
                    </h1>
                    <p className="text-gray-600">
                        Manage your courses and student progress
                    </p>
                </div>

                {/* Stats */}
                <div className="mb-8">
                    <Stats />
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        {/* Recent Submissions Placeholder */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Submissions</h3>
                            <div className="space-y-4">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">S</div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">Student {i}</p>
                                                <p className="text-xs text-gray-500">React Basics - Assignment {i}</p>
                                            </div>
                                        </div>
                                        <button className="text-sm text-blue-600 font-medium hover:underline">Grade</button>
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

export default TrainerHome;
