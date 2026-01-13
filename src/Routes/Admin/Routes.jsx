import { createBrowserRouter, Navigate } from 'react-router-dom';
import AdminHome from '../../Pages/Admin/Home';
import AdminLayout from '../../Layout/Admin/Layout';
import LoginPage from '../../Auth/Login';

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
                element: <div>Add User Page (Coming Soon)</div>
            },
            {
                path: 'roles',
                element: <div>Manage Roles Page (Coming Soon)</div>
            },
            {
                path: 'users',
                element: <div>User List Page (Coming Soon)</div>
            },
            {
                path: 'system',
                element: <div>System Health Page (Coming Soon)</div>
            },
            {
                path: 'reports',
                element: <div>Reports Page (Coming Soon)</div>
            },
            {
                path: 'settings',
                element: <div>Settings Page (Coming Soon)</div>
            }
        ]
    }
]);

export default AdminRoutes;
