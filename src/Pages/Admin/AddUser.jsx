import React, { useState } from 'react';
import apiClient from '../../services/apiClient';
import { UserPlusIcon } from '@heroicons/react/24/outline';

const AddUser = () => {
    const [userType, setUserType] = useState('student');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phoneNo: '',
        gender: 'Male',
        // Student specific
        rollNo: '',
        branch: 'CSE',
        year: '1st',
        dob: '',
        // Trainer specific - (uses name, email, password, phone, gender too)
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const endpoint = userType === 'student'
                ? '/api/auth/student/register'
                : '/api/auth/trainer/register';

            await apiClient.post(endpoint, formData);
            setMessage({ type: 'success', text: `${userType.charAt(0).toUpperCase() + userType.slice(1)} added successfully!` });

            // Reset form (keep type)
            setFormData({
                name: '', email: '', password: '', phoneNo: '', gender: 'Male',
                rollNo: '', branch: 'CSE', year: '1st', dob: ''
            });

        } catch (error) {
            setMessage({
                type: 'error',
                text: error.response?.data?.message || 'Failed to add user.'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 md:p-12 font-sans bg-gray-50 min-h-screen">
            <div className="max-w-3xl mx-auto space-y-6">

                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Add New User</h1>
                        <p className="text-gray-500 mt-1">Create accounts for students or trainers</p>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="border-b border-gray-100 bg-gray-50/50 p-2 flex gap-2">
                        <button
                            onClick={() => setUserType('student')}
                            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${userType === 'student' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:bg-white/50'
                                }`}
                        >
                            Student
                        </button>
                        <button
                            onClick={() => setUserType('trainer')}
                            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${userType === 'trainer' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:bg-white/50'
                                }`}
                        >
                            Trainer
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 space-y-6">

                        {message.text && (
                            <div className={`p-4 rounded-lg text-sm font-medium ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                {message.text}
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Common Fields */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Full Name</label>
                                <input required name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" placeholder="John Doe" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Email Address</label>
                                <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" placeholder="john@example.com" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Password</label>
                                <input required type="password" name="password" value={formData.password} onChange={handleChange} className="w-full p-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" placeholder="••••••••" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Phone Number</label>
                                <input required name="phoneNo" value={formData.phoneNo} onChange={handleChange} className="w-full p-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" placeholder="+1 234 567 890" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Gender</label>
                                <select name="gender" value={formData.gender} onChange={handleChange} className="w-full p-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500">
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            {/* Student Specific Fields */}
                            {userType === 'student' && (
                                <>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Roll Number</label>
                                        <input required name="rollNo" value={formData.rollNo} onChange={handleChange} className="w-full p-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" placeholder="STD-2024-001" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Branch</label>
                                        <input required name="branch" value={formData.branch} onChange={handleChange} className="w-full p-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Computer Science" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Year</label>
                                        <select name="year" value={formData.year} onChange={handleChange} className="w-full p-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500">
                                            <option value="1st">1st Year</option>
                                            <option value="2nd">2nd Year</option>
                                            <option value="3rd">3rd Year</option>
                                            <option value="4th">4th Year</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Date of Birth</label>
                                        <input required type="date" name="dob" value={formData.dob} onChange={handleChange} className="w-full p-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" />
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="pt-4 flex justify-end">
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2 disabled:opacity-70"
                            >
                                <UserPlusIcon className="h-5 w-5" />
                                {loading ? 'Creating...' : `Create ${userType === 'student' ? 'Student' : 'Trainer'}`}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddUser;
