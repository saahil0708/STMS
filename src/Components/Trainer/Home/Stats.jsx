import React from 'react';
import { UserGroupIcon, BookOpenIcon, StarIcon } from '@heroicons/react/24/outline';

const Stats = ({ stats }) => {
    const statItems = [
        {
            name: 'Active Courses',
            value: stats?.activeCourses || 0,
            icon: BookOpenIcon,
            color: 'text-indigo-600',
            bg: 'bg-indigo-50',
            trend: '+1 this week'
        },
        {
            name: 'Total Students',
            value: stats?.totalStudents || 0,
            icon: UserGroupIcon,
            color: 'text-purple-600',
            bg: 'bg-purple-50',
            trend: 'Active learners'
        },
        {
            name: 'Average Rating',
            value: stats?.averageRating || 0,
            icon: StarIcon,
            color: 'text-yellow-500',
            bg: 'bg-yellow-50',
            trend: 'Last 30 days'
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {statItems.map((stat, index) => {
                const Icon = stat.icon;
                return (
                    <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col justify-between hover:shadow-md transition-shadow duration-200">
                        <div className="flex items-start justify-between mb-4">
                            <div className={`p-3 rounded-xl ${stat.bg}`}>
                                <Icon className={`h-6 w-6 ${stat.color}`} />
                            </div>
                            <span className="text-xs font-medium text-gray-400 bg-gray-50 px-2 py-1 rounded-full">
                                {stat.trend}
                            </span>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                            <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Stats;
