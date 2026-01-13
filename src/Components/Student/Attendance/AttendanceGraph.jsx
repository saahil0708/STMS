// AttendanceGraph.jsx
import React from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import { ChartBarIcon } from '@heroicons/react/24/outline';

const AttendanceGraph = ({ data }) => {
    // Generate default zero-data for the last 7 days if no data is provided
    const processedData = React.useMemo(() => {
        if (data && data.length > 0) return data;

        return Array.from({ length: 7 }, (_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - (6 - i));
            return {
                date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                percentage: 0
            };
        });
    }, [data]);

    return (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden p-6">
            <div className="flex items-center mb-6">
                <div className="bg-red-50 p-2 rounded-lg mr-3">
                    <ChartBarIcon className="h-5 w-5 text-red-600" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-gray-900">Attendance Trends</h3>
                    <p className="text-gray-600 text-sm mt-1">Daily attendance performance over time</p>
                </div>
            </div>

            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={processedData}
                        margin={{
                            top: 10,
                            right: 10,
                            left: -20,
                            bottom: 0,
                        }}
                    >
                        <defs>
                            <linearGradient id="colorAttendance" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#dc2626" stopOpacity={0.1} />
                                <stop offset="95%" stopColor="#dc2626" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                        <XAxis
                            dataKey="date"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6b7280', fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6b7280', fontSize: 12 }}
                            domain={[0, 100]}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#fff',
                                borderRadius: '12px',
                                border: '1px solid #e5e7eb',
                                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                            }}
                            formatter={(value) => [`${value}%`, 'Attendance']}
                        />
                        <Area
                            type="monotone"
                            dataKey="percentage"
                            stroke="#dc2626"
                            fillOpacity={1}
                            fill="url(#colorAttendance)"
                            strokeWidth={3}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default AttendanceGraph;
