import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline';
import apiClient from '../../services/apiClient';

const FeedbackModal = ({ isOpen, closeModal, lecture, onFeedbackSubmitted }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (rating === 0) {
            setError('Please select a rating');
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            await apiClient.post('/api/feedback/submit', {
                lectureId: lecture.id,
                courseId: lecture.originalCourseId,
                rating,
                comment
            });

            if (onFeedbackSubmitted) onFeedbackSubmitted();
            closeModal();
            // Reset form
            setRating(0);
            setComment('');
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Failed to submit feedback');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    Class Feedback
                                </Dialog.Title>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        How was your class on <strong>{lecture?.course}</strong>?
                                        Your feedback helps us improve.
                                    </p>

                                    {error && (
                                        <div className="mt-2 p-2 bg-red-50 text-red-700 text-sm rounded">
                                            {error}
                                        </div>
                                    )}

                                    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                                        {/* Star Rating */}
                                        <div className="flex justify-center space-x-2">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    type="button"
                                                    onClick={() => setRating(star)}
                                                    className="focus:outline-none transition-transform hover:scale-110"
                                                >
                                                    {star <= rating ? (
                                                        <StarIcon className="h-8 w-8 text-yellow-400" />
                                                    ) : (
                                                        <StarIconOutline className="h-8 w-8 text-gray-300" />
                                                    )}
                                                </button>
                                            ))}
                                        </div>

                                        {/* Comment */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Additional Comments (Optional)
                                            </label>
                                            <textarea
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                                                rows={4}
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                                placeholder="What did you like? What could be better?"
                                            />
                                        </div>

                                        <div className="mt-4 flex justify-end space-x-2">
                                            <button
                                                type="button"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none"
                                                onClick={closeModal}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className={`inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white focus:outline-none ${isSubmitting
                                                    ? 'bg-indigo-400 cursor-not-allowed'
                                                    : 'bg-indigo-600 hover:bg-indigo-700'
                                                    }`}
                                            >
                                                {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default FeedbackModal;
