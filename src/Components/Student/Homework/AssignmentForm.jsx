import React from 'react';

const AssignmentForm = ({ questions = [], answers = {}, onAnswerChange }) => {
    if (!questions || questions.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500 italic">
                No questions provided for this assignment.
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {questions.map((q, index) => (
                <div key={q.id || index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                        <span className="text-gray-500 mr-2">{index + 1}.</span>
                        {q.questionText}
                    </label>

                    <div className="mt-2">
                        {q.type === 'text' || !q.type ? (
                            <textarea
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition-colors bg-white"
                                rows="3"
                                placeholder="Type your answer here..."
                                value={answers[q.id] || ''}
                                onChange={(e) => onAnswerChange(q.id, e.target.value)}
                                required
                            />
                        ) : (
                            // Fallback for other types if we add them later (MCQ, etc)
                            <input
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition-colors bg-white"
                                value={answers[q.id] || ''}
                                onChange={(e) => onAnswerChange(q.id, e.target.value)}
                                required
                            />
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AssignmentForm;
