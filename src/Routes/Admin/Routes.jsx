import { createBrowserRouter, Navigate } from 'react-router-dom';
import AdminHome from '../../Pages/Admin/Home';
import AdminLayout from '../../Layout/Admin/Layout';
import LoginPage from '../../Auth/Login';
import AdminProfile from '../../pages/Admin/Profile';
import Users from '../../pages/Admin/Users';
import AddUser from '../../pages/Admin/AddUser';
import Roles from '../../pages/Admin/Roles';
import SystemHealth from '../../pages/Admin/System';
import Reports from '../../pages/Admin/Reports';

import AdminResults from '../../pages/Admin/Results';
import AdminFeedback from '../../pages/Admin/Feedback';
import AdminAttendance from '../../pages/Admin/Attendance';
import Chatbot from '../../Pages/Global/ChatBot';
import StudentDetails from '../../Pages/Global/StudentDetails';
import TrainerDetails from '../../Pages/Admin/TrainerDetails';

const AdminRoutes = createBrowserRouter([
    {
        path: '/login',
        element: <LoginPage />
    },
    {
        path: '/',
        element: <Navigate to="/admin" replace />
    },
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [
            {
                index: true,
                element: <AdminHome />
            },
            {
                path: 'add-user',
                element: <AddUser />
            },
            {
                path: 'roles',
                element: <Roles />
            },
            {
                path: 'users',
                element: <Users />
            },
            {
                path: 'student/:id',
                element: <StudentDetails />
            },
            {
                path: 'system',
                element: <SystemHealth />
            },
            {
                path: 'reports',
                element: <Reports />
            },
            {
                path: 'results',
                element: <AdminResults />
            },
            {
                path: 'feedback',
                element: <AdminFeedback />
            },
            {
                path: 'attendance',
                element: <AdminAttendance />
            },
            {
                path: 'chatbot',
                element: <Chatbot />
            },
            {
                path: 'settings',
                element: <AdminProfile />
            },
            {
                path: 'profile',
                element: <AdminProfile />
            }
        ]
    }
]);

export default AdminRoutes;
