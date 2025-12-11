import StudentRoutes from "./Routes/Student/Routes";
import { RouterProvider } from "react-router-dom";

export default function App() {
  return <RouterProvider router={StudentRoutes} />;
} 