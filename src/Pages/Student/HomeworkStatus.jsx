import React, { useMemo, useState } from 'react';

const sampleHomeworks = [
    { id: 1, title: 'Math - Algebra worksheet', subject: 'Mathematics', due: '2026-01-15', status: 'Pending' },
    { id: 2, title: 'History - WW2 essay', subject: 'History', due: '2026-01-10', status: 'Submitted' },
    { id: 3, title: 'Physics - Lab report', subject: 'Physics', due: '2026-01-12', status: 'Overdue' },
    { id: 4, title: 'English - Reading summary', subject: 'English', due: '2026-01-20', status: 'Pending' },
];

const statusClasses = {
    Pending: 'bg-yellow-100 text-yellow-800',
    Submitted: 'bg-green-100 text-green-800',
    Overdue: 'bg-red-100 text-red-800',
};

const HomeworkStatus = () => {
    const [filter, setFilter] = useState('All');
    const [query, setQuery] = useState('');

    const filtered = useMemo(() => {
        return sampleHomeworks.filter((hw) => {
            if (filter !== 'All' && hw.status !== filter) return false;
            if (query && !(`${hw.title} ${hw.subject}`.toLowerCase()).includes(query.toLowerCase())) return false;
            return true;
        });
    }, [filter, query]);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Homework Status</h1>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            placeholder="Search homework or subject..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring w-64"
                        />
                        <div className="hidden md:flex items-center gap-2">
                            <button onClick={() => setFilter('All')} className={`px-3 py-1 rounded-lg ${filter === 'All' ? 'bg-indigo-600 text-white' : 'bg-gray-100'}`}>All</button>
                            <button onClick={() => setFilter('Pending')} className={`px-3 py-1 rounded-lg ${filter === 'Pending' ? 'bg-indigo-600 text-white' : 'bg-gray-100'}`}>Pending</button>
                            <button onClick={() => setFilter('Submitted')} className={`px-3 py-1 rounded-lg ${filter === 'Submitted' ? 'bg-indigo-600 text-white' : 'bg-gray-100'}`}>Submitted</button>
                            <button onClick={() => setFilter('Overdue')} className={`px-3 py-1 rounded-lg ${filter === 'Overdue' ? 'bg-indigo-600 text-white' : 'bg-gray-100'}`}>Overdue</button>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <span className="text-sm text-gray-500">Showing</span>
                        <span className="font-medium">{filtered.length}</span>
                        <span className="text-sm text-gray-500">items</span>
                    </div>
                </div>

                <div className="divide-y">
                    {filtered.length === 0 ? (
                        <div className="py-8 text-center text-gray-500">No homework found.</div>
                    ) : (
                        filtered.map((hw) => (
                            <div key={hw.id} className="py-4 flex flex-col md:flex-row md:items-center md:justify-between">
                                <div>
                                    <div className="flex items-center gap-3">
                                        <div className="font-semibold text-gray-800">{hw.title}</div>
                                        <div className="text-sm text-gray-500">· {hw.subject}</div>
                                    </div>
                                    <div className="text-sm text-gray-500">Due: <span className="font-medium text-gray-700">{hw.due}</span></div>
                                </div>

                                <div className="mt-3 md:mt-0 flex items-center gap-3">
                                    <div className={`px-2 py-1 rounded text-sm ${statusClasses[hw.status] || 'bg-gray-100 text-gray-700'}`}>{hw.status}</div>
                                    <button className="px-3 py-1 bg-indigo-600 text-white rounded-lg">View</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomeworkStatus;
