import { createBrowserRouter } from 'react-router-dom';
import StudentLayout from '../../Layout/Student/Layout';

import HomePage from '../../Pages/Student/Home';

const StudentRoutes = createBrowserRouter([
    {
        path: '/',
        element: <StudentLayout />,
        children: [
            {
                path: '/',
                element: <HomePage />
            }
        ]
    }
]);

export default StudentRoutes;