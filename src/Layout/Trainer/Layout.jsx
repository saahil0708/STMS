import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import TopNav from "../../Components/Global/Top_Navbar";
import TrainerSidebar from "../../Components/Trainer/Sidebar";

const TrainerLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <React.Fragment>
            <TopNav sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <TrainerSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <Outlet />
        </React.Fragment>
    )
}

export default TrainerLayout;
