import React, { useMemo, useState, useEffect } from 'react';
import apiClient from '../../services/apiClient';
import { Loader2 } from 'lucide-react';

const Scores = () => {
    const [scores, setScores] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchScores = async () => {
            try {
                const response = await apiClient.get('/api/submission/my-submissions');
                // Filter for graded assignments and map to view model
                // submission has: status, score, feedback, assignmentId (populated)
                const graded = response.data
                    .filter(sub => sub.status === 'graded')
                    .map(sub => ({
                        id: sub._id,
                        subject: sub.assignmentId?.title || 'Assignment', // assignment title used as subject/topic name
                        score: sub.score,
                        max: sub.assignmentId?.maxScore || 100
                    }));
                setScores(graded);
            } catch (error) {
                console.error("Error fetching scores:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchScores();
    }, []);

    const average = useMemo(() => {
        if (!scores.length) return 0;
        const totalPercentage = scores.reduce((acc, curr) => {
            const pct = (curr.score / curr.max) * 100;
            return acc + pct;
        }, 0);
        return Math.round(totalPercentage / scores.length);
    }, [scores]);

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-red-600" />
            </div>
        );
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Scores</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="text-sm text-gray-500">Average Score</div>
                    <div className="text-3xl font-bold text-red-600">{average}%</div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:col-span-2">
                    <div className="text-sm text-gray-500 mb-3">Recent Scores</div>
                    <div className="divide-y max-h-[400px] overflow-y-auto">
                        {scores.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center text-gray-400">
                                <div className="bg-gray-50 p-4 rounded-full mb-3">
                                    <Loader2 className="h-6 w-6 text-gray-300" />
                                </div>
                                <p>No scores available yet.</p>
                                <p className="text-sm mt-1 text-gray-300">Complete assignments to see your progress.</p>
                            </div>
                        ) : (
                            scores.map((s) => {
                                const pct = Math.round((s.score / s.max) * 100);
                                return (
                                    <div key={s.id} className="py-3 pr-2">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <div className="font-medium text-gray-800">{s.subject}</div>
                                                <div className="text-sm text-gray-500">{s.score} / {s.max}</div>
                                            </div>
                                            <div className="w-48">
                                                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                                                    <div className="h-3 bg-red-600" style={{ width: `${pct}%` }} />
                                                </div>
                                                <div className="text-sm text-gray-500 mt-1 text-right">{pct}%</div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Scores;
