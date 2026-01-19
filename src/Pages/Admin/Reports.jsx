import React from 'react';
import { ChartBarIcon, DocumentTextIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';

const Reports = () => {
    const reportList = [
        { id: 1, name: 'Monthly User Growth', date: 'Jan 15, 2026', size: '2.4 MB' },
        { id: 2, name: 'System Performance Audit', date: 'Jan 10, 2026', size: '1.1 MB' },
        { id: 3, name: 'Attendance Summary (Dec)', date: 'Jan 01, 2026', size: '4.5 MB' },
    ];

    return (
        <div className="p-6 md:p-12 font-sans bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">System Reports</h1>
                    <p className="text-gray-500 mt-1">Download and view system analytics</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600">
                                <ChartBarIcon className="h-6 w-6" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">Analytics Overview</h3>
                        </div>
                        <p className="text-gray-600 text-sm mb-4">
                            View detailed metrics on user engagement, course completion rates, and system utilization specific to your organization.
                        </p>
                        <button className="text-indigo-600 font-medium text-sm hover:text-indigo-700">View Analytics &rarr;</button>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                                <DocumentTextIcon className="h-6 w-6" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">Compliance Reports</h3>
                        </div>
                        <p className="text-gray-600 text-sm mb-4">
                            Access automated compliance reports, security audits, and data privacy logs generated monthly.
                        </p>
                        <button className="text-blue-600 font-medium text-sm hover:text-blue-700">View Logs &rarr;</button>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                        <h3 className="font-bold text-gray-900">Recent Generated Reports</h3>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {reportList.map((report) => (
                            <div key={report.id} className="p-4 md:p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-gray-100 rounded text-gray-500">
                                        <DocumentTextIcon className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">{report.name}</p>
                                        <p className="text-xs text-gray-500">Generated on {report.date} • {report.size}</p>
                                    </div>
                                </div>
                                <button className="p-2 text-gray-400 hover:text-indigo-600 transition-colors">
                                    <ArrowDownTrayIcon className="h-5 w-5" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reports;
