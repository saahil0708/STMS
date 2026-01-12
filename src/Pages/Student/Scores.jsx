import React, { useMemo } from 'react';

const sampleScores = [
    { id: 1, subject: 'Mathematics', score: 86, max: 100 },
    { id: 2, subject: 'Physics', score: 79, max: 100 },
    { id: 3, subject: 'English', score: 92, max: 100 },
    { id: 4, subject: 'History', score: 74, max: 100 },
];

const Scores = () => {
    const average = useMemo(() => {
        if (!sampleScores.length) return 0;
        const total = sampleScores.reduce((s, r) => s + r.score, 0);
        return Math.round((total / (sampleScores.length * 100)) * 100);
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Scores</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="text-sm text-gray-500">Average Score</div>
                    <div className="text-3xl font-bold text-indigo-600">{average}%</div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:col-span-2">
                    <div className="text-sm text-gray-500 mb-3">Recent Scores</div>
                    <div className="divide-y">
                        {sampleScores.map((s) => {
                            const pct = Math.round((s.score / s.max) * 100);
                            return (
                                <div key={s.id} className="py-3">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="font-medium text-gray-800">{s.subject}</div>
                                            <div className="text-sm text-gray-500">{s.score} / {s.max}</div>
                                        </div>
                                        <div className="w-48">
                                            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                                                <div className="h-3 bg-indigo-600" style={{ width: `${pct}%` }} />
                                            </div>
                                            <div className="text-sm text-gray-500 mt-1">{pct}%</div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Scores;
