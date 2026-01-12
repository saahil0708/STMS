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
import LoginPage from '../../Auth/Login';

const StudentRoutes = createBrowserRouter([
    {
        path: '/login',
        element: <LoginPage />
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
                    }
                ]
            }
        ]
    }
]);

export default StudentRoutes;