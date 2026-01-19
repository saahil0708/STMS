import React, { useState, useEffect } from 'react';
import apiClient from '../../services/apiClient';
import { useLogin } from '../../Context/LoginContext';
import {
    UserCircleIcon,
    EnvelopeIcon,
    ShieldCheckIcon,
    BuildingOfficeIcon,
    KeyIcon,
    ClockIcon
} from '@heroicons/react/24/outline';

const AdminProfile = () => {
    const { user } = useLogin();
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                // Fetch profile using the ID from the logged-in user context
                const userId = user.id || user._id;
                const response = await apiClient.get(`/api/auth/admin/admin/${userId}`);
                setProfileData(response.data);
            } catch (error) {
                console.error('Error fetching admin profile:', error);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchProfile();
        }
    }, [user]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
            </div>
        );
    }

    if (!profileData) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center text-red-600">
                Failed to load profile data.
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-12 font-sans">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Header Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative">
                    <div className="h-32 bg-gradient-to-r from-red-800 to-red-600"></div>
                    <div className="px-8 pb-8">
                        <div className="relative flex items-end -mt-12 mb-6">
                            <div className="h-24 w-24 rounded-full border-4 border-white bg-white shadow-md overflow-hidden">
                                <img
                                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profileData.name}`}
                                    alt="Profile"
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <div className="ml-6 mb-2">
                                <h1 className="text-3xl font-bold text-gray-900">{profileData.name}</h1>
                                <p className="text-sm font-medium text-gray-500 flex items-center gap-1">
                                    <ShieldCheckIcon className="h-4 w-4 text-green-600" />
                                    System Administrator
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Personal Information */}
                            <div className="space-y-6">
                                <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">Personal Information</h3>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-4">
                                        <div className="p-2 bg-gray-50 rounded-lg text-gray-400">
                                            <UserCircleIcon className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Full Name</p>
                                            <p className="text-sm font-medium text-gray-900">{profileData.name}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="p-2 bg-gray-50 rounded-lg text-gray-400">
                                            <EnvelopeIcon className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Email Address</p>
                                            <p className="text-sm font-medium text-gray-900">{profileData.email}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Account Details */}
                            <div className="space-y-6">
                                <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">Account Details</h3>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-4">
                                        <div className="p-2 bg-gray-50 rounded-lg text-gray-400">
                                            <KeyIcon className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Role</p>
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 capitalize">
                                                {profileData.role}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="p-2 bg-gray-50 rounded-lg text-gray-400">
                                            <BuildingOfficeIcon className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Organization</p>
                                            <p className={`text-sm font-medium ${profileData.organizationId ? 'text-gray-900' : 'text-gray-400 italic'}`}>
                                                {profileData.organizationId?.name || 'Not Assigned'}
                                            </p>
                                            {profileData.organizationId && (
                                                <>
                                                    <p className="text-xs text-gray-500 mt-0.5">Code: {profileData.organizationId.code}</p>
                                                    <p className="text-xs text-gray-500">{profileData.organizationId.description}</p>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="p-2 bg-gray-50 rounded-lg text-gray-400">
                                            <ClockIcon className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Joined On</p>
                                            <p className="text-sm font-medium text-gray-900">
                                                {new Date(profileData.createdAt).toLocaleDateString(undefined, {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Settings / Actions */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Account Actions</h3>
                    <div className="flex gap-4">
                        <button className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors">
                            Change Password
                        </button>
                        <button className="px-4 py-2 bg-red-50 text-red-600 font-medium rounded-lg hover:bg-red-100 transition-colors">
                            Edit Profile
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;
