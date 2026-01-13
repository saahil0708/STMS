import React, { useState, useEffect } from 'react';
import apiClient from '../../services/apiClient';
import { useLogin } from '../../Context/LoginContext';
import { Loader2, Star } from 'lucide-react';

const FeedbackForms = () => {
    const { user } = useLogin();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        courseId: '',
        rating: 5,
        comment: ''
    });
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await apiClient.get('/api/course/my-courses');
                const courseList = res.data.data || res.data; // Handle potential wrapper
                setCourses(Array.isArray(courseList) ? courseList : []);

                if (Array.isArray(courseList) && courseList.length > 0) {
                    setFormData(prev => ({ ...prev, courseId: courseList[0]._id }));
                }
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        };
        fetchCourses();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            await apiClient.post('/api/feedback/submit', formData);
            setMessage('Feedback submitted successfully!');
            setFormData(prev => ({ ...prev, comment: '', rating: 5 }));
        } catch (error) {
            setMessage(error.response?.data?.message || 'Error submitting feedback.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Feedback Forms</h1>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-xl">
                {courses.length === 0 ? (
                    <p className="text-gray-500">You are not enrolled in any courses to provide feedback for.</p>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Select Course</label>
                            <select
                                value={formData.courseId}
                                onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
                                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
                            >
                                {courses.map(c => (
                                    <option key={c._id} value={c._id}>{c.title || c.name || c._id}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        type="button"
                                        key={star}
                                        onClick={() => setFormData({ ...formData, rating: star })}
                                        className="focus:outline-none transition-transform hover:scale-110"
                                    >
                                        <Star
                                            className={`h - 8 w - 8 ${star <= formData.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} `}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Comments</label>
                            <textarea
                                required
                                rows="4"
                                value={formData.comment}
                                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                                placeholder="Share your experience..."
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 flex justify-center items-center"
                        >
                            {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Submit Feedback'}
                        </button>

                        {message && (
                            <div className={`p - 3 rounded - lg text - sm text - center ${message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} `}>
                                {message}
                            </div>
                        )}
                    </form>
                )}
            </div>
        </div>
    );
};

export default FeedbackForms;
