import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import StudentLayout from '../../Layout/Student/Layout';

import HomePage from '../../Pages/Student/Home';
import StudentAttendancePage from '../../Pages/Student/Attendance';
import HomeworkPage from '../../Pages/Student/Homework';
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
                    }
                ]
            }
        ]
    }
]);

export default StudentRoutes;