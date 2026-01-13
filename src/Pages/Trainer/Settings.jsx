import React, { useState, useEffect } from 'react';
import apiClient from '../../services/apiClient';
import { useLogin } from '../../Context/LoginContext';
import { Cog6ToothIcon, UserIcon, EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';

const TrainerSettings = () => {
    const { user, setUser } = useLogin();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        currentPassword: '',
        newPassword: '',
        bio: ''
    });

    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                name: user.name || '',
                email: user.email || '',
                bio: user.bio || ''
            }));
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const updateData = {
                name: formData.name,
                bio: formData.bio
            };

            // Only send password if provided
            if (formData.newPassword) {
                updateData.password = formData.newPassword;
                updateData.currentPassword = formData.currentPassword; // Backend might verify this
            }

            const response = await apiClient.put(`/api/auth/trainer/trainer/${user._id || user.id}`, updateData);

            if (response.data) {
                const updatedUser = response.data.data || response.data;
                setUser(updatedUser);
                localStorage.setItem('user', JSON.stringify(updatedUser));
                setSuccess('Profile updated successfully!');

                // Clear password fields
                setFormData(prev => ({
                    ...prev,
                    currentPassword: '',
                    newPassword: ''
                }));
            }
        } catch (err) {
            console.error('Profile update error:', err);
            setError(err.response?.data?.message || 'Failed to update profile.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-2xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                        <Cog6ToothIcon className="h-8 w-8 text-red-600 mr-3" />
                        Account Settings
                    </h1>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="bg-red-600 h-2 w-full"></div>

                    <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
                        {error && (
                            <div className="p-4 bg-red-50 text-red-700 rounded-lg text-sm border border-red-200">
                                {error}
                            </div>
                        )}
                        {success && (
                            <div className="p-4 bg-green-50 text-green-700 rounded-lg text-sm border border-green-200">
                                {success}
                            </div>
                        )}

                        {/* Public Profile */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">Public Profile</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <div className="relative">
                                        <UserIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition-colors"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Bio / Expertise</label>
                                    <textarea
                                        name="bio"
                                        rows="3"
                                        value={formData.bio}
                                        onChange={handleChange}
                                        placeholder="Tell students about your qualifications..."
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition-colors"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Account Security */}
                        <div className="pt-2">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">Security</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address (Read Only)</label>
                                    <div className="relative">
                                        <EnvelopeIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            readOnly
                                            className="w-full pl-10 pr-4 py-2 border border-gray-200 bg-gray-50 rounded-lg text-gray-500 cursor-not-allowed"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">New Password (leave blank to keep current)</label>
                                    <div className="relative">
                                        <LockClosedIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
                                        <input
                                            type="password"
                                            name="newPassword"
                                            value={formData.newPassword}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition-colors"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 flex justify-end">
                            <button
                                type="submit"
                                disabled={loading}
                                className={`
                                    px-6 py-2.5 rounded-lg text-white font-medium shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500
                                    ${loading ? 'bg-red-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 hover:shadow-md transform hover:-translate-y-0.5'}
                                `}
                            >
                                {loading ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TrainerSettings;
