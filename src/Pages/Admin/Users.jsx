import React, { useState, useEffect } from 'react';
import apiClient from '../../services/apiClient';
import {
    UserIcon,
    AcademicCapIcon,
    MagnifyingGlassIcon,
    FunnelIcon,
    ChevronRightIcon
} from '@heroicons/react/24/outline';

const Users = () => {
    const [activeTab, setActiveTab] = useState('students');
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const endpoint = activeTab === 'students'
                    ? '/api/auth/student/students'
                    : '/api/auth/trainer/trainers';

                const response = await apiClient.get(endpoint);
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [activeTab]);

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6 md:p-12 font-sans bg-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
                        <p className="text-gray-500 mt-1">View and manage system users</p>
                    </div>
                </div>

                {/* Tabs & Search */}
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between gap-4 items-center">
                    <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
                        <button
                            onClick={() => setActiveTab('students')}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'students'
                                    ? 'bg-white text-blue-600 shadow-sm'
                                    : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            <div className="flex items-center gap-2">
                                <AcademicCapIcon className="h-4 w-4" />
                                Students
                            </div>
                        </button>
                        <button
                            onClick={() => setActiveTab('trainers')}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'trainers'
                                    ? 'bg-white text-indigo-600 shadow-sm'
                                    : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            <div className="flex items-center gap-2">
                                <UserIcon className="h-4 w-4" />
                                Trainers
                            </div>
                        </button>
                    </div>

                    <div className="relative w-full md:w-64">
                        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search users..."
                            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Users List */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    {loading ? (
                        <div className="p-12 flex justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 border-b border-gray-100">
                                    <tr>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider md:table-cell hidden">Role</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Contact</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider md:table-cell hidden">Joined</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {filteredUsers.length > 0 ? (
                                        filteredUsers.map((user) => (
                                            <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-4">
                                                        <div className="h-10 w-10 rounded-full bg-gray-200 border border-gray-300 overflow-hidden shrink-0">
                                                            <img
                                                                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                                                                alt="Avatar"
                                                                className="h-full w-full object-cover"
                                                            />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                                                            <p className="text-xs text-gray-500 md:hidden">{user.email}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 md:table-cell hidden">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${activeTab === 'students' ? 'bg-blue-50 text-blue-700' : 'bg-indigo-50 text-indigo-700'
                                                        }`}>
                                                        {activeTab}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <p className="text-sm text-gray-600">{user.email}</p>
                                                    <p className="text-xs text-gray-400">{user.phoneNo || 'No phone'}</p>
                                                </td>
                                                <td className="px-6 py-4 md:table-cell hidden">
                                                    <p className="text-sm text-gray-500">
                                                        {new Date(user.createdAt).toLocaleDateString()}
                                                    </p>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button className="text-gray-400 hover:text-indigo-600 transition-colors p-2">
                                                        <ChevronRightIcon className="h-5 w-5" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                                                No users found matching your search.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Users;
