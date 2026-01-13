import { createBrowserRouter } from 'react-router-dom';
import TrainerHome from '../../Pages/Trainer/Home';
import TrainerLayout from '../../Layout/Trainer/Layout';
import LoginPage from '../../Auth/Login';

const TrainerRoutes = createBrowserRouter([
    {
        path: '/login',
        element: <LoginPage />
    },
    {
        path: '/trainer',
        element: <TrainerLayout />,
        children: [
            {
                index: true,
                element: <TrainerHome />
            },
            {
                path: 'create-course',
                element: <div>Create Course Page (Coming Soon)</div>
            },
            {
                path: 'add-assignment',
                element: <div>Add Assignment Page (Coming Soon)</div>
            },
            {
                path: 'schedule-class',
                element: <div>Schedule Class Page (Coming Soon)</div>
            },
            {
                path: 'grading',
                element: <div>Grading Page (Coming Soon)</div>
            },
            {
                path: 'settings',
                element: <div>Settings Page (Coming Soon)</div>
            }
        ]
    }
]);

export default TrainerRoutes;
