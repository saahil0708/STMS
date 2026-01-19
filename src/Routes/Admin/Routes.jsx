import { createBrowserRouter, Navigate } from 'react-router-dom';
import AdminHome from '../../Pages/Admin/Home';
import AdminLayout from '../../Layout/Admin/Layout';
import LoginPage from '../../Auth/Login';
import AdminProfile from '../../Pages/Admin/Profile';
import Users from '../../Pages/Admin/Users';
import AddUser from '../../Pages/Admin/AddUser';
import Roles from '../../Pages/Admin/Roles';
import SystemHealth from '../../Pages/Admin/System';
import Reports from '../../Pages/Admin/Reports';

import AdminResults from '../../Pages/Admin/Results';
import AdminFeedback from '../../Pages/Admin/Feedback';
import AdminAttendance from '../../Pages/Admin/Attendance';
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
