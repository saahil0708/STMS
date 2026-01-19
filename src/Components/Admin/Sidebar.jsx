import React, { useState } from 'react';
import {
    Home,
    Users,
    Shield,
    BarChart,
    Settings,
    X,
    LogOut,
    UserPlus,
    Server,
    Sparkles
} from 'lucide-react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useLogin } from '../../Context/LoginContext';

const AdminSidebar = ({ sidebarOpen, setSidebarOpen }) => {
    const { logout, user } = useLogin();
    const navigate = useNavigate();
    const location = useLocation();
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    const navigation = [
        { name: 'Dashboard', to: '/admin', icon: Home },
        { name: 'AI Assistant', to: '/admin/chatbot', icon: Sparkles },
        { name: 'Add User', to: '/admin/add-user', icon: UserPlus },
        { name: 'Manage Roles', to: '/admin/roles', icon: Shield },
        { name: 'Users', to: '/admin/users', icon: Users },
        { name: 'System Health', to: '/admin/system', icon: Server },
        { name: 'Reports', to: '/admin/reports', icon: BarChart },
        { name: 'Settings', to: '/admin/settings', icon: Settings },
    ];

    const handleLogoutClick = () => {
        setShowLogoutConfirm(true);
    };

    const cancelLogout = () => {
        setShowLogoutConfirm(false);
    };

    const confirmLogout = async () => {
        await logout();
        setShowLogoutConfirm(false);
        navigate('/login');
    };

    return (
        <>
            {/* Backdrop */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
            <aside className={`fixed inset-y-0 right-0 z-50 w-72 bg-white border-l border-gray-200 transform transition-transform duration-300 ease-in-out shadow-2xl ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="absolute top-4 right-4">
                    <button onClick={() => setSidebarOpen(false)} className="p-2 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none">
                        <span className="sr-only">Close sidebar</span>
                        <X className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>

                <div className="flex items-center p-6 border-b border-gray-100">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-br from-red-600 to-red-700 shadow-lg shadow-red-500/30 overflow-hidden">
                        {/* Admin Avatar Seed */}
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'Admin'}`} alt="Admin" className="h-10 w-10" />
                    </div>
                    <div className="ml-3">
                        <span className="text-lg font-bold text-gray-900">{user?.name || 'Admin'}</span>
                        <div className="text-xs text-gray-500 font-medium">Administrator</div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto h-[calc(100vh-200px)]">
                    <div className="mb-3 px-4">
                        <small className="text-xs uppercase text-gray-500 font-semibold tracking-wider">
                            System
                        </small>
                    </div>

                    <nav className="space-y-1">
                        {navigation.map((item) => {
                            const Icon = item.icon;
                            return (
                                <NavLink
                                    key={item.name}
                                    to={item.to}
                                    end={item.to === '/admin'}
                                    className={({ isActive }) => `group flex items-center px-4 py-3 text-sm font-medium transition-all duration-200 ${isActive ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-md shadow-red-500/30' : 'text-gray-700 hover:bg-red-50 hover:text-red-700'}`}
                                    onClick={() => {
                                        if (window.innerWidth < 1024) {
                                            setSidebarOpen(false);
                                        }
                                    }}
                                >
                                    <Icon className={`h-5 w-5 mr-3 transition-all duration-200 flex-shrink-0 ${item.to === location.pathname ? 'text-white' : 'group-hover:text-red-600 group-hover:scale-125'}`} />
                                    <span className="flex-1 font-medium transition-all duration-200 group-hover:scale-110 origin-left">{item.name}</span>
                                </NavLink>
                            );
                        })}
                    </nav>
                </div>

                <div className="border-t border-gray-100 bg-gradient-to-b from-white to-gray-50 p-4">
                    <button
                        onClick={handleLogoutClick}
                        className="w-full flex items-center justify-center px-4 py-3 text-sm font-semibold text-white bg-red-700 rounded-lg hover:bg-red-800 hover:shadow-lg active:scale-95 transition-all duration-200 group"
                    >
                        <LogOut className="h-5 w-5 mr-2 transition-transform duration-200" />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside >

            {/* Logout Confirmation Modal */}
            {showLogoutConfirm && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    {/* Reusing same modal style */}
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-sm p-6 text-center">
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                            <LogOut className="h-6 w-6 text-red-600" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Sign Out?</h3>
                        <p className="text-sm text-gray-500 mb-6">Are you sure you want to sign out?</p>
                        <div className="flex gap-3">
                            <button onClick={cancelLogout} className="flex-1 px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 rounded hover:bg-gray-200">Cancel</button>
                            <button onClick={confirmLogout} className="flex-1 px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded hover:bg-red-700">Sign Out</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AdminSidebar;
