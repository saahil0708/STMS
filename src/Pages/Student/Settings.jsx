import React, { useState } from 'react';
import { useLogin } from '../../Context/LoginContext';
import apiClient from '../../services/apiClient';
import { Loader2 } from 'lucide-react';

const Settings = () => {
    const { user } = useLogin();
    const [form, setForm] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phoneNo: user?.phoneNo || '',
        password: '', // Only send if changing
        confirmPassword: ''
    });

    // Checkboxes for UI (not currently persisted in backend model provided, assuming local for now or simplified)
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [smsNotifications, setSmsNotifications] = useState(false);

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });

    const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

    const handleSave = async (e) => {
        e.preventDefault();
        setMessage({ text: '', type: '' });

        if (form.password && form.password !== form.confirmPassword) {
            setMessage({ text: 'Passwords do not match', type: 'error' });
            return;
        }

        setLoading(true);
        try {
            const updatePayload = {
                name: form.name,
                phoneNo: form.phoneNo
            };
            if (form.password) updatePayload.password = form.password;

            // Assuming endpoint is /api/students/student/:id based on Student.Routes.js analysis
            // Route def: Router.put('/student/:id', ...)
            // Wait, previous analysis showed user routes under /api/students likely if mounted there?
            // Checking LoginContext: apiClient.get(`/api/auth/${role}/profile`) -> /api/auth or similar.
            // But Student.Routes.js had Router.put('/student/:id'). 
            // In main server app, StudentRoutes might be mounted at /api/students or /api/student.
            // Commonly /api/student based on context. I'll guess /api/students prefix for the router.

            // Corrected endpoint: /api/auth/student/student/:id
            const response = await apiClient.put(`/api/auth/student/student/${user.id || user._id}`, updatePayload);

            setMessage({ text: 'Settings saved successfully!', type: 'success' });
            // Ideally update context user here too, but page reload or re-fetch will handle it.
        } catch (error) {
            console.error(error);
            setMessage({
                text: error.response?.data?.message || 'Failed to save settings.',
                type: 'error'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Settings</h1>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-2xl">
                <form onSubmit={handleSave} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Full name</label>
                        <input name="name" value={form.name} onChange={handleChange} className="mt-1 block w-full border px-3 py-2 rounded-lg" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input name="email" value={form.email} disabled className="mt-1 block w-full border px-3 py-2 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed" />
                        <span className="text-xs text-gray-400">Email cannot be changed</span>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                        <input name="phoneNo" value={form.phoneNo} onChange={handleChange} className="mt-1 block w-full border px-3 py-2 rounded-lg" />
                    </div>

                    <div className="pt-4 border-t">
                        <h3 className="text-sm font-medium text-gray-900 mb-3">Change Password (Optional)</h3>
                        <div className="space-y-3">
                            <div>
                                <label className="block text-xs font-medium text-gray-700">New Password</label>
                                <input type="password" name="password" value={form.password} onChange={handleChange} className="mt-1 block w-full border px-3 py-2 rounded-lg" placeholder="Leave blank to keep current" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-700">Confirm Password</label>
                                <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} className="mt-1 block w-full border px-3 py-2 rounded-lg" />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between gap-4 pt-2">
                        <div className="flex items-center gap-3">
                            <input id="emailNotif" type="checkbox" checked={emailNotifications} onChange={(e) => setEmailNotifications(e.target.checked)} className="h-4 w-4" />
                            <label htmlFor="emailNotif" className="text-sm text-gray-700">Email notifications</label>
                        </div>

                        <div className="flex items-center gap-3">
                            <input id="smsNotif" type="checkbox" checked={smsNotifications} onChange={(e) => setSmsNotifications(e.target.checked)} className="h-4 w-4" />
                            <label htmlFor="smsNotif" className="text-sm text-gray-700">SMS notifications</label>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 pt-4">
                        <button type="submit" disabled={loading} className="px-4 py-2 bg-indigo-600 text-white rounded-lg flex items-center gap-2 disabled:opacity-50">
                            {loading && <Loader2 className="animate-spin h-4 w-4" />}
                            Save changes
                        </button>
                        {message.text && (
                            <div className={`text-sm ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                                {message.text}
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Settings;
