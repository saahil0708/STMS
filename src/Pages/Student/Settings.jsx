import React, { useState, useEffect } from 'react';
import { useLogin } from '../../Context/LoginContext';
import apiClient from '../../services/apiClient';
import {
    Loader2,
    Save,
    Bell,
    Lock,
    User,
    Mail,
    Phone,
    Eye,
    EyeOff,
    Shield,
    Palette,
    Globe
} from 'lucide-react';

const Settings = () => {
    const { user, updateUser } = useLogin();
    const [activeTab, setActiveTab] = useState('profile');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Profile Settings
    const [profileForm, setProfileForm] = useState({
        name: '',
        email: '',
        phoneNo: '',
        bio: '',
        location: ''
    });

    // Security Settings
    const [securityForm, setSecurityForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    // Notification Preferences
    const [notifications, setNotifications] = useState({
        emailNotifications: true,
        smsNotifications: false,
        pushNotifications: true,
        marketingEmails: false,
        assignmentReminders: true,
        deadlineAlerts: true
    });

    // Theme Preferences
    const [theme, setTheme] = useState('light');
    const [language, setLanguage] = useState('en');

    // Initialize form with user data
    useEffect(() => {
        if (user) {
            setProfileForm({
                name: user?.name || '',
                email: user?.email || '',
                phoneNo: user?.phoneNo || '',
                bio: user?.bio || '',
                location: user?.location || ''
            });
        }
    }, [user]);

    const handleProfileChange = (e) => {
        setProfileForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    };

    const handleSecurityChange = (e) => {
        setSecurityForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    };

    const handleNotificationChange = (key) => (e) => {
        setNotifications((prev) => ({ ...prev, [key]: e.target.checked }));
    };

    const saveProfile = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ text: '', type: '' });

        try {
            const updatePayload = {
                name: profileForm.name,
                phoneNo: profileForm.phoneNo,
                bio: profileForm.bio,
                location: profileForm.location
            };

            const response = await apiClient.put(
                `/api/auth/student/student/${user.id || user._id}`,
                updatePayload
            );

            // Update context with new user data
            updateUser(response.data.user || response.data);

            setMessage({ text: 'Profile updated successfully!', type: 'success' });
        } catch (error) {
            setMessage({
                text: error.response?.data?.message || 'Failed to update profile.',
                type: 'error'
            });
        } finally {
            setLoading(false);
        }
    };

    const changePassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ text: '', type: '' });

        const { currentPassword, newPassword, confirmPassword } = securityForm;

        if (newPassword !== confirmPassword) {
            setMessage({ text: 'New passwords do not match', type: 'error' });
            setLoading(false);
            return;
        }

        if (newPassword.length < 6) {
            setMessage({ text: 'Password must be at least 6 characters', type: 'error' });
            setLoading(false);
            return;
        }

        try {
            await apiClient.post('/api/auth/change-password', {
                currentPassword,
                newPassword
            });

            setMessage({ text: 'Password changed successfully!', type: 'success' });
            setSecurityForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (error) {
            setMessage({
                text: error.response?.data?.message || 'Failed to change password.',
                type: 'error'
            });
        } finally {
            setLoading(false);
        }
    };

    const saveNotifications = async () => {
        setLoading(true);
        try {
            await apiClient.put('/api/users/notifications', notifications);
            setMessage({ text: 'Notification preferences saved!', type: 'success' });
        } catch (error) {
            setMessage({ text: 'Failed to save notification preferences', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const savePreferences = () => {
        // Save theme and language preferences
        localStorage.setItem('theme', theme);
        localStorage.setItem('language', language);
        document.documentElement.setAttribute('data-theme', theme);
        setMessage({ text: 'Preferences saved!', type: 'success' });
    };

    const tabs = [
        { id: 'profile', label: 'Profile', icon: <User size={18} /> },
        { id: 'security', label: 'Security', icon: <Shield size={18} /> },
        { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
        { id: 'preferences', label: 'Preferences', icon: <Palette size={18} /> }
    ];

    return (
        <div className="p-6 max-w-8xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
                <p className="text-gray-600 mt-2">Manage your account settings and preferences</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Sidebar Navigation */}
                <div className="lg:w-1/4">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                        <nav className="space-y-1">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-3 w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors ${activeTab === tab.id
                                        ? 'bg-red-50 text-red-700 border border-red-100'
                                        : 'text-gray-700 hover:bg-gray-50'
                                        }`}
                                >
                                    {tab.icon}
                                    {tab.label}
                                </button>
                            ))}
                        </nav>

                        <div className="mt-6 pt-6 border-t border-gray-200">
                            <div className="px-4">
                                <p className="text-xs font-medium text-gray-500 mb-2">ACCOUNT CREATED</p>
                                <p className="text-sm text-gray-900">
                                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="lg:w-3/4">
                    {message.text && (
                        <div className={`mb-6 p-4 rounded-lg ${message.type === 'success'
                            ? 'bg-red-50 text-red-800 border border-red-200'
                            : 'bg-red-50 text-red-800 border border-red-200'
                            }`}>
                            {message.text}
                        </div>
                    )}

                    {/* Profile Tab */}
                    {activeTab === 'profile' && (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <User className="text-red-600" />
                                <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
                            </div>

                            <form onSubmit={saveProfile} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Full Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            name="name"
                                            value={profileForm.name}
                                            onChange={handleProfileChange}
                                            required
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Phone Number
                                        </label>
                                        <div className="flex items-center">
                                            <Phone className="absolute ml-3 text-gray-400" size={20} />
                                            <input
                                                name="phoneNo"
                                                value={profileForm.phoneNo}
                                                onChange={handleProfileChange}
                                                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                                                placeholder="+1 (555) 123-4567"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Address
                                        </label>
                                        <div className="flex items-center">
                                            <Mail className="absolute ml-3 text-gray-400" size={20} />
                                            <input
                                                name="email"
                                                value={profileForm.email}
                                                disabled
                                                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-500"
                                            />
                                        </div>
                                        <p className="mt-2 text-xs text-gray-500">Email cannot be changed</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Location
                                        </label>
                                        <input
                                            name="location"
                                            value={profileForm.location}
                                            onChange={handleProfileChange}
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                                            placeholder="City, Country"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Bio
                                    </label>
                                    <textarea
                                        name="bio"
                                        value={profileForm.bio}
                                        onChange={handleProfileChange}
                                        rows="4"
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                                        placeholder="Tell us about yourself..."
                                    />
                                    <p className="mt-2 text-xs text-gray-500">Max 500 characters</p>
                                </div>

                                <div className="pt-4 border-t border-gray-200">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="px-6 py-2.5 bg-red-600 text-white rounded-lg font-medium flex items-center gap-2 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                    >
                                        {loading && <Loader2 className="animate-spin h-4 w-4" />}
                                        <Save size={18} />
                                        Save Profile
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Security Tab */}
                    {activeTab === 'security' && (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <Shield className="text-red-600" />
                                <h2 className="text-xl font-semibold text-gray-900">Security & Password</h2>
                            </div>

                            <form onSubmit={changePassword} className="space-y-6">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Current Password
                                        </label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                name="currentPassword"
                                                value={securityForm.currentPassword}
                                                onChange={handleSecurityChange}
                                                required
                                                className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                            >
                                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            New Password
                                        </label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                name="newPassword"
                                                value={securityForm.newPassword}
                                                onChange={handleSecurityChange}
                                                required
                                                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                                            />
                                        </div>
                                        <p className="mt-2 text-xs text-gray-500">Minimum 6 characters</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Confirm New Password
                                        </label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                            <input
                                                type={showConfirmPassword ? "text" : "password"}
                                                name="confirmPassword"
                                                value={securityForm.confirmPassword}
                                                onChange={handleSecurityChange}
                                                required
                                                className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                            >
                                                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-gray-200">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="px-6 py-2.5 bg-red-600 text-white rounded-lg font-medium flex items-center gap-2 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                    >
                                        {loading && <Loader2 className="animate-spin h-4 w-4" />}
                                        <Save size={18} />
                                        Change Password
                                    </button>
                                </div>
                            </form>

                            <div className="mt-8 pt-8 border-t border-gray-200">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Two-Factor Authentication</h3>
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium text-gray-900">Two-factor authentication</p>
                                            <p className="text-sm text-gray-600 mt-1">Add an extra layer of security to your account</p>
                                        </div>
                                        <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition">
                                            Enable 2FA
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Notifications Tab */}
                    {activeTab === 'notifications' && (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <Bell className="text-red-600" />
                                <h2 className="text-xl font-semibold text-gray-900">Notification Preferences</h2>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Communication</h3>
                                    <div className="space-y-4">
                                        {[
                                            { key: 'emailNotifications', label: 'Email notifications', description: 'Receive important updates via email' },
                                            { key: 'smsNotifications', label: 'SMS notifications', description: 'Receive text messages for urgent alerts' },
                                            { key: 'pushNotifications', label: 'Push notifications', description: 'Get browser push notifications' },
                                            { key: 'marketingEmails', label: 'Marketing emails', description: 'Receive product updates and offers' }
                                        ].map((item) => (
                                            <div key={item.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                                                <div>
                                                    <p className="font-medium text-gray-900">{item.label}</p>
                                                    <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                                                </div>
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={notifications[item.key]}
                                                        onChange={handleNotificationChange(item.key)}
                                                        className="sr-only peer"
                                                    />
                                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Course Alerts</h3>
                                    <div className="space-y-4">
                                        {[
                                            { key: 'assignmentReminders', label: 'Assignment reminders', description: 'Get reminded about upcoming assignments' },
                                            { key: 'deadlineAlerts', label: 'Deadline alerts', description: 'Receive alerts for approaching deadlines' }
                                        ].map((item) => (
                                            <div key={item.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                                                <div>
                                                    <p className="font-medium text-gray-900">{item.label}</p>
                                                    <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                                                </div>
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={notifications[item.key]}
                                                        onChange={handleNotificationChange(item.key)}
                                                        className="sr-only peer"
                                                    />
                                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-gray-200">
                                    <button
                                        onClick={saveNotifications}
                                        disabled={loading}
                                        className="px-6 py-2.5 bg-red-600 text-white rounded-lg font-medium flex items-center gap-2 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                    >
                                        {loading && <Loader2 className="animate-spin h-4 w-4" />}
                                        <Save size={18} />
                                        Save Notification Preferences
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Preferences Tab */}
                    {activeTab === 'preferences' && (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <Palette className="text-red-600" />
                                <h2 className="text-xl font-semibold text-gray-900">Appearance & Preferences</h2>
                            </div>

                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Theme</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {[
                                            { id: 'light', label: 'Light', description: 'Light theme' },
                                            { id: 'dark', label: 'Dark', description: 'Dark theme' },
                                            { id: 'system', label: 'System', description: 'Use system preference' }
                                        ].map((themeOption) => (
                                            <button
                                                key={themeOption.id}
                                                onClick={() => setTheme(themeOption.id)}
                                                className={`p-4 border rounded-lg text-left transition ${theme === themeOption.id
                                                    ? 'border-red-500 bg-red-50'
                                                    : 'border-gray-200 hover:border-gray-300'
                                                    }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-8 h-8 rounded-full ${themeOption.id === 'light' ? 'bg-gray-200' :
                                                        themeOption.id === 'dark' ? 'bg-gray-800' :
                                                            'bg-gradient-to-r from-gray-200 to-gray-800'
                                                        }`} />
                                                    <div>
                                                        <p className="font-medium text-gray-900">{themeOption.label}</p>
                                                        <p className="text-sm text-gray-600">{themeOption.description}</p>
                                                    </div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                                        <Globe className="inline mr-2" size={20} />
                                        Language & Region
                                    </h3>
                                    <div className="max-w-md">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Language
                                        </label>
                                        <select
                                            value={language}
                                            onChange={(e) => setLanguage(e.target.value)}
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                                        >
                                            <option value="en">English</option>
                                            <option value="es">Español</option>
                                            <option value="fr">Français</option>
                                            <option value="de">Deutsch</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-gray-200">
                                    <button
                                        onClick={savePreferences}
                                        className="px-6 py-2.5 bg-red-600 text-white rounded-lg font-medium flex items-center gap-2 hover:bg-red-700 transition"
                                    >
                                        <Save size={18} />
                                        Save Preferences
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Settings;