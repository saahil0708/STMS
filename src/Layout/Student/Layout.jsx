import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import TopNav from "../../Components/Student/Top_Navbar";
import Sidebar from "../../Components/Student/Sidebar";

const StudentLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <React.Fragment>
            <TopNav sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <Outlet />
        </React.Fragment>
    )
}

export default StudentLayout;