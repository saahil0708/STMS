import { createBrowserRouter, Navigate } from 'react-router-dom';
import TrainerHome from '../../Pages/Trainer/Home';
import TrainerLayout from '../../Layout/Trainer/Layout';
import LoginPage from '../../Auth/Login';
import CreateCourse from '../../Pages/Trainer/CreateCourse';
import TrainerMyCourses from '../../Pages/Trainer/MyCourses';
import AddAssignment from '../../Pages/Trainer/AddAssignment';
import ScheduleClass from '../../Pages/Trainer/ScheduleClass';
import Grading from '../../Pages/Trainer/Grading';
import TrainerSettings from '../../Pages/Trainer/Settings';
import VirtualClass from '../../Pages/Student/VirtualClass'; // Reusing the same component
import OfflineAttendance from '../../Pages/Trainer/OfflineAttendance';
import Chatbot from '../../Pages/Global/ChatBot';
import StudentDetails from '../../Pages/Global/StudentDetails';

const TrainerRoutes = createBrowserRouter([
    {
        path: '/login',
        element: <LoginPage />
    },
    {
        path: '/',
        element: <Navigate to="/trainer" replace />
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
                path: 'courses',
                element: <TrainerMyCourses />
            },
            {
                path: 'create-course',
                element: <CreateCourse />
            },
            {
                path: 'add-assignment',
                element: <AddAssignment />
            },
            {
                path: 'schedule-class',
                element: <ScheduleClass />
            },
            {
                path: 'grading',
                element: <Grading />
            },
            {
                path: 'settings',
                element: <TrainerSettings />
            },

            {
                path: 'class/:roomId',
                element: <VirtualClass />
            },
            {
                path: 'attendance',
                element: <OfflineAttendance />
            },
            {
                path: 'chatbot',
                element: <Chatbot />
            }
        ]
    }
]);

export default TrainerRoutes;
