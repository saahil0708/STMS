import React from 'react';
import { Link } from 'react-router-dom';
import {
    PlusCircleIcon,
    ClipboardDocumentCheckIcon,
    VideoCameraIcon,
    AcademicCapIcon
} from '@heroicons/react/24/outline';

const QuickActions = () => {
    const actions = [
        {
            title: 'Create Course',
            description: 'Add a new course',
            icon: PlusCircleIcon,
            color: 'bg-indigo-50 text-indigo-600',
            hoverBorder: 'hover:border-indigo-200',
            action: '/trainer/create-course'
        },
        {
            title: 'Add Assignment',
            description: 'Post new work',
            icon: ClipboardDocumentCheckIcon,
            color: 'bg-purple-50 text-purple-600',
            hoverBorder: 'hover:border-purple-200',
            action: '/trainer/add-assignment'
        },
        {
            title: 'Schedule Class',
            description: 'Start live session',
            icon: VideoCameraIcon,
            color: 'bg-pink-50 text-pink-600',
            hoverBorder: 'hover:border-pink-200',
            action: '/trainer/schedule-class'
        },
        {
            title: 'Grade Work',
            description: 'Review submissions',
            icon: AcademicCapIcon,
            color: 'bg-orange-50 text-orange-600',
            hoverBorder: 'hover:border-orange-200',
            action: '/trainer/grading'
        }
    ];

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-900">Quick Actions</h2>
                <p className="text-sm text-gray-500 mt-1">Manage your training tasks</p>
            </div>

            <div className="p-6">
                <div className="grid grid-cols-2 gap-4">
                    {actions.map((action, index) => {
                        const Icon = action.icon;
                        return (
                            <Link
                                key={index}
                                to={action.action}
                                className={`flex flex-col items-center justify-center p-4 border border-gray-100 rounded-xl ${action.hoverBorder} hover:shadow-md transition-all duration-200 group bg-gray-50/50 hover:bg-white`}
                            >
                                <div className={`p-3 rounded-xl ${action.color} group-hover:scale-110 transition-transform duration-200`}>
                                    <Icon className="h-6 w-6" />
                                </div>
                                <span className="mt-3 text-sm font-semibold text-gray-900 text-center">
                                    {action.title}
                                </span>
                                <span className="mt-1 text-xs text-gray-500 text-center">
                                    {action.description}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default QuickActions;
