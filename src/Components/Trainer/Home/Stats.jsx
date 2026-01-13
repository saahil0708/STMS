import React from 'react';
import { UserGroupIcon, BookOpenIcon, StarIcon } from '@heroicons/react/24/outline';

const Stats = () => {
    const stats = [
        { name: 'Active Courses', value: '4', icon: BookOpenIcon, color: 'text-blue-600', bg: 'bg-blue-100' },
        { name: 'Total Students', value: '128', icon: UserGroupIcon, color: 'text-green-600', bg: 'bg-green-100' },
        { name: 'Average Rating', value: '4.8', icon: StarIcon, color: 'text-yellow-600', bg: 'bg-yellow-100' },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                    <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center">
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
