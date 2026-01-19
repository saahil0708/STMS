import React from 'react';
import { UsersIcon, ServerIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

const Stats = ({ stats }) => {
    const statItems = [
        { name: 'Total Users', value: stats?.totalUsers || '0', icon: UsersIcon, color: 'text-red-600', bg: 'bg-red-50' },
        { name: 'Total Students', value: stats?.totalStudents || '0', icon: UsersIcon, color: 'text-red-600', bg: 'bg-red-50' },
        { name: 'Total Trainers', value: stats?.totalTrainers || '0', icon: UsersIcon, color: 'text-red-600', bg: 'bg-red-50' },
        { name: 'System Health', value: stats?.systemHealth || 'Unknown', icon: ServerIcon, color: 'text-green-600', bg: 'bg-green-100' },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statItems.map((stat, index) => {
                const Icon = stat.icon;
                return (
                    <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center hover:shadow-md transition-shadow">
                        <div className={`p-4 rounded-full ${stat.bg} mr-4`}>
                            <Icon className={`h-6 w-6 ${stat.color}`} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Stats;
