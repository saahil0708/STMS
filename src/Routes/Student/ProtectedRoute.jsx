import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useLogin } from '../../Context/LoginContext';
import { CircularProgress, Box } from '@mui/material';

const ProtectedRoute = () => {
    const { user, loading } = useLogin();

    console.log('ProtectedRoute: user=', user, 'loading=', loading);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
