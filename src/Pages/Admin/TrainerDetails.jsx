import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../../services/apiClient';
import {
    UserCircleIcon,
    ArrowLeftIcon,
    BookOpenIcon
} from '@heroicons/react/24/outline';
import { Loader2 } from 'lucide-react';

const TrainerDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [trainer, setTrainer] = useState(null);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const res = await apiClient.get(`/api/auth/admin/trainer/${id}/details`);
                const data = res.data;
                setTrainer(data.trainer);
                setCourses(data.courses || []);
            } catch (error) {
                console.error("Failed to fetch trainer details", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [id]);

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
            </div>
        );
    }

    if (!trainer) {
        return <div className="p-8 text-center">Trainer not found.</div>;
    }

    return (
        <div className="p-6 md:p-12 font-sans bg-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto space-y-6">

                {/* Back Button */}
                <button onClick={() => navigate(-1)} className="flex items-center text-gray-500 hover:text-gray-700 transition-colors">
                    <ArrowLeftIcon className="h-5 w-5 mr-2" />
                    Back to Users
                </button>

                {/* Header */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center gap-6">
                    <div className="h-20 w-20 rounded-full bg-indigo-100 flex items-center justify-center overflow-hidden">
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${trainer.name}`} alt={trainer.name} className="h-full w-full object-cover" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{trainer.name}</h1>
                        <p className="text-gray-500">{trainer.email}</p>
                        <div className="flex gap-2 mt-2">
                            <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold uppercase rounded-full">Trainer</span>
                            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold uppercase rounded-full">ID: {trainer._id.slice(-6)}</span>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Stats Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 col-span-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Overview</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center">
                                    <BookOpenIcon className="h-6 w-6 text-indigo-500 mr-3" />
                                    <span className="text-gray-700 font-medium">Courses Taught</span>
                                </div>
                                <span className="text-2xl font-bold text-gray-900">{courses.length}</span>
                            </div>
                            <div className="p-3">
                                <span className="text-sm text-gray-500">Joined: {new Date(trainer.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>

                    {/* Courses List */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 col-span-1 md:col-span-2">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Assigned Courses</h3>
                        {courses.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-gray-50 border-b border-gray-100">
                                        <tr>
                                            <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Course Title</th>
                                            <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Code</th>
                                            <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Description</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {courses.map((course) => (
                                            <tr key={course._id} className="hover:bg-gray-50">
                                                <td className="px-6 py-3 text-sm font-medium text-gray-900">{course.title}</td>
                                                <td className="px-6 py-3 text-sm text-gray-500">{course.courseCode}</td>
                                                <td className="px-6 py-3 text-sm text-gray-500 truncate max-w-xs">{course.description}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="text-gray-500 italic">No courses assigned yet.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrainerDetails;
