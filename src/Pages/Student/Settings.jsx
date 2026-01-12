import React, { useState } from 'react';

const Settings = () => {
    const [form, setForm] = useState({ name: 'Student Name', email: 'student@example.com', phone: '' });
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [smsNotifications, setSmsNotifications] = useState(false);
    const [saved, setSaved] = useState(false);

    const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

    const handleSave = (e) => {
        e.preventDefault();
        // placeholder save behavior
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
        console.log('Saved settings', { ...form, emailNotifications, smsNotifications });
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
                        <input name="email" value={form.email} onChange={handleChange} className="mt-1 block w-full border px-3 py-2 rounded-lg" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                        <input name="phone" value={form.phone} onChange={handleChange} className="mt-1 block w-full border px-3 py-2 rounded-lg" />
                    </div>

                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <input id="emailNotif" type="checkbox" checked={emailNotifications} onChange={(e) => setEmailNotifications(e.target.checked)} className="h-4 w-4" />
                            <label htmlFor="emailNotif" className="text-sm text-gray-700">Email notifications</label>
                        </div>

                        <div className="flex items-center gap-3">
                            <input id="smsNotif" type="checkbox" checked={smsNotifications} onChange={(e) => setSmsNotifications(e.target.checked)} className="h-4 w-4" />
                            <label htmlFor="smsNotif" className="text-sm text-gray-700">SMS notifications</label>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg">Save changes</button>
                        {saved && <div className="text-sm text-green-600">Settings saved</div>}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Settings;
