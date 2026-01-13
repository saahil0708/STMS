import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import StudentLayout from '../../Layout/Student/Layout';

import HomePage from '../../Pages/Student/Home';
import StudentAttendancePage from '../../Pages/Student/Attendance';
import HomeworkPage from '../../Pages/Student/Homework';
import HomeworkStatus from '../../Pages/Student/HomeworkStatus';
import Scores from '../../Pages/Student/Scores';
import FeedbackForms from '../../Pages/Student/FeedbackForms';
import Settings from '../../Pages/Student/Settings';
import Chatbot from '../../Pages/Global/ChatBot';
import LoginPage from '../../Auth/Login';
import VirtualClass from '../../Pages/Student/VirtualClass';
import EnrollCourse from '../../Pages/Student/EnrollCourse';
import StudentMyCourses from '../../Pages/Student/MyCourses';

const StudentRoutes = createBrowserRouter([
    {
        path: '/login',
        element: <LoginPage />
    },
    {
        path: '/trainer',
        element: <div className="min-h-screen flex items-center justify-center">Loading Trainer Dashboard...</div>
    },
    {
        path: '/admin',
        element: <div className="min-h-screen flex items-center justify-center">Loading Admin Dashboard...</div>
    },
    {
        path: '/',
        element: <ProtectedRoute />,
        children: [
            {
                path: '/',
                element: <StudentLayout />,
                children: [
                    {
                        path: '/',
                        element: <HomePage />
                    },
                    {
                        path: '/attendance',
                        element: <StudentAttendancePage />
                    },
                    {
                        path: '/homework',
                        element: <HomeworkPage />
                    },
                    {
                        path: '/homework-status',
                        element: <HomeworkStatus />
                    },
                    {
                        path: '/scores',
                        element: <Scores />
                    },
                    {
                        path: '/feedback-forms',
                        element: <FeedbackForms />
                    },
                    {
                        path: '/settings',
                        element: <Settings />
                    },
                    {
                        path: '/courses',
                        element: <StudentMyCourses />
                    },
                    {
                        path: '/chatbot',
                        element: <Chatbot />
                    },
                    {
                        path: '/enroll',
                        element: <EnrollCourse />
                    },
                    {
                        path: '/class/:roomId',
                        element: <VirtualClass />
                    }
                ]
            }
        ]
    }
]);

export default StudentRoutes;