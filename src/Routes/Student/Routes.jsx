import { createBrowserRouter } from 'react-router-dom';
import StudentLayout from '../../Layout/Student/Layout';

import HomePage from '../../Pages/Student/Home';
import StudentAttendancePage from '../../Pages/Student/Attendance';
import HomeworkPage from '../../Pages/Student/Homework';

const StudentRoutes = createBrowserRouter([
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
]);

export default StudentRoutes;