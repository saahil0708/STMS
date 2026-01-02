import React, { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";
import TopNav from "../../Components/Global/Top_Navbar";
import Sidebar from "../../Components/Student/Sidebar";

const StudentLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    useEffect(() => {
        if (location.state && location.state.message && location.state.type === 'success') {
            setSnackbarMessage(location.state.message);
            setSnackbarOpen(true);
            // Clear state so it doesn't show again on reload
            window.history.replaceState({}, document.title);
        }
    }, [location]);

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    return (
        <React.Fragment>
            <TopNav sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            <Outlet />
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </React.Fragment>
    )
}

export default StudentLayout;