import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import TopNav from "../../Components/Global/Top_Navbar";
import AdminSidebar from "../../Components/Admin/Sidebar";

const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <React.Fragment>
            <TopNav sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <Outlet />
        </React.Fragment>
    )
}

export default AdminLayout;
