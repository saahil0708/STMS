import { ToastProvider } from "./Context/ToastContext";

// ... existing imports

export default function App() {
  const { user, loading } = useLogin();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-12 w-12 animate-spin text-indigo-600" />
      </div>
    );
  }

  // Default to StudentRoutes for unauthenticated users (Login page) or Students
  let activeRouter = StudentRoutes;

  if (user) {
    if (user.role === 'trainer') {
      activeRouter = TrainerRoutes;
    } else if (user.role === 'admin') {
      activeRouter = AdminRoutes;
    }
  }

  return (
    <ToastProvider>
      <RouterProvider router={activeRouter} />
    </ToastProvider>
  );
} 