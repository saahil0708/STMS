import React from 'react';

export const ClassSkeleton = () => (
    <div className="animate-pulse bg-white rounded-lg shadow-sm border border-gray-200 p-5 mb-4">
        <div className="flex justify-between items-start mb-4">
            <div className="flex items-start">
                <div className="w-10 h-10 bg-gray-200 rounded-lg mr-3"></div>
                <div>
                    <div className="h-4 w-48 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 w-32 bg-gray-200 rounded"></div>
                </div>
            </div>
            <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
        </div>
        <div className="flex items-center justify-between">
            <div className="flex space-x-4">
                <div className="h-3 w-24 bg-gray-200 rounded"></div>
                <div className="h-3 w-24 bg-gray-200 rounded"></div>
            </div>
            <div className="h-3 w-16 bg-gray-200 rounded"></div>
        </div>
    </div>
);

export const StatsSkeleton = () => (
    <div className="animate-pulse flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-4">
            <div className="text-center">
                <div className="h-5 w-8 bg-gray-200 rounded mb-1 mx-auto"></div>
                <div className="h-3 w-12 bg-gray-200 rounded"></div>
            </div>
            <div className="text-center">
                <div className="h-5 w-8 bg-gray-200 rounded mb-1 mx-auto"></div>
                <div className="h-3 w-12 bg-gray-200 rounded"></div>
            </div>
            <div className="text-center">
                <div className="h-5 w-8 bg-gray-200 rounded mb-1 mx-auto"></div>
                <div className="h-3 w-12 bg-gray-200 rounded"></div>
            </div>
        </div>
        <div className="h-8 w-24 bg-gray-200 rounded"></div>
    </div>
);

export const ProfileSkeleton = () => (
    <div className="animate-pulse p-6 bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
        <div className="flex items-center">
            <div className="h-16 w-16 rounded-full bg-gray-200 mr-4"></div>
            <div className="flex-1">
                <div className="h-6 w-48 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 w-32 bg-gray-200 rounded"></div>
            </div>
            <div className="space-y-2">
                <div className="h-4 w-24 bg-gray-200 rounded"></div>
                <div className="h-4 w-24 bg-gray-200 rounded"></div>
            </div>
        </div>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-12 bg-gray-100 rounded-lg"></div>
            ))}
        </div>
    </div>
);
