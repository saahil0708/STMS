import React, { useState, useEffect } from 'react';
import apiClient from '../../services/apiClient';
import { CalendarDaysIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { useLogin } from '../../Context/LoginContext';

const OfflineAttendance = () => {
    const { user } = useLogin();
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [students, setStudents] = useState([]);
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [attendanceMap, setAttendanceMap] = useState({}); // { studentId: 'present' | 'absent' }
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                // Fetch trainer's courses. Assuming we have an endpoint for 'my-courses' or using getAll filtered
                // We'll try the trainer specific courses endpoint if it exists or reuse existing logic
                // The logical endpoint would be /api/course/my-courses (which works for trainer too if implemented)
                // Let's assume /api/course/created-courses exists or we use getting all courses and filtering
                // Actually, let's use the one from Trainer Dashboard logic: CourseModel.find({trainerId})
                // We'll try GET /api/course/my-courses first as per previous sessions
                const response = await apiClient.get('/api/course/my-courses');
                setCourses(response.data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            } finally {
                setLoading(false);
            }
        };

        if (user) fetchCourses();
    }, [user]);

    const handleCourseChange = async (courseId) => {
        setSelectedCourse(courseId);
        if (!courseId) {
            setStudents([]);
            return;
        }

        try {
            // Fetch course details to get students
            // Endpoint: /api/course/:id
            const response = await apiClient.get(`/api/course/${courseId}`);
            const courseData = response.data;

            // Assuming courseData.students is populated or we need to fetch them
            // If it returns IDs, we might need another call. But let's assume it populates or we handle it.
            // Based on previous files, typically we populate.
            setStudents(courseData.students || []);

            // Initialize attendance map
            const initialMap = {};
            (courseData.students || []).forEach(s => {
                initialMap[s._id] = 'present';
            });
            setAttendanceMap(initialMap);

        } catch (error) {
            console.error('Error fetching course students:', error);
        }
    };

    const toggleAttendance = (studentId) => {
        setAttendanceMap(prev => ({
            ...prev,
            [studentId]: prev[studentId] === 'present' ? 'absent' : 'present'
        }));
    };

    const handleSubmit = async () => {
        setSubmitting(true);
        setMessage('');
        try {
            const studentList = students.map(s => ({
                studentId: s._id,
                status: attendanceMap[s._id]
            }));

            await apiClient.post('/api/auth/trainer/attendance/offline', {
                courseId: selectedCourse,
                date,
                students: studentList
            });

            setMessage('Attendance marked successfully!');
            // Reset? Maybe keep for review.
        } catch (error) {
            setMessage('Failed to mark attendance.');
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="p-6 md:p-12 font-sans bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Offline Attendance</h1>
                    <p className="text-gray-500 mt-1">Mark attendance for physical classroom sessions</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
                    {/* Controls */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Select Course</label>
                            <select
                                className="w-full p-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                                value={selectedCourse}
                                onChange={(e) => handleCourseChange(e.target.value)}
                            >
                                <option value="">-- Choose Course --</option>
                                {courses.map(c => (
                                    <option key={c._id} value={c._id}>{c.title}</option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Date</label>
                            <input
                                type="date"
                                className="w-full p-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Student List */}
                    {selectedCourse && (
                        <div className="border-t border-gray-100 pt-6">
                            <h3 className="font-semibold text-gray-900 mb-4">Class List ({students.length} Students)</h3>

                            {students.length > 0 ? (
                                <div className="space-y-2">
                                    {students.map(student => (
                                        <div key={student._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">
                                                    {student.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900">{student.name}</p>
                                                    <p className="text-xs text-gray-500">{student.email}</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => toggleAttendance(student._id)}
                                                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${attendanceMap[student._id] === 'present'
                                                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                                        : 'bg-red-100 text-red-700 hover:bg-red-200'
                                                    }`}
                                            >
                                                {attendanceMap[student._id] === 'present' ? 'Present' : 'Absent'}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-center text-gray-500 py-4">No students enrolled in this course.</p>
                            )}

                            {students.length > 0 && (
                                <div className="mt-8 flex items-center justify-between">
                                    <p className={`text-sm font-medium ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>{message}</p>
                                    <button
                                        onClick={handleSubmit}
                                        disabled={submitting}
                                        className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-70"
                                    >
                                        {submitting ? 'Saving...' : 'Save Attendance'}
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OfflineAttendance;
