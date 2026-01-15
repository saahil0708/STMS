import React from 'react';
import { ShieldCheckIcon } from '@heroicons/react/24/outline';

const Roles = () => {
    return (
        <div className="p-6 md:p-12 font-sans bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Role Management</h1>
                    <p className="text-gray-500 mt-1">Configure user access and permissions</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
                    <div className="mx-auto w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-4">
                        <ShieldCheckIcon className="h-8 w-8" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Advanced Permissions Coming Soon</h3>
                    <p className="text-gray-500 max-w-md mx-auto">
                        We are building a granular permission system. Currently, roles are fixed to Student, Trainer, and Admin.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Roles;
