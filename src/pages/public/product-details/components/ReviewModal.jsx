import React, { useState } from "react";
import { FiX } from "react-icons/fi";

const Star = ({ filled, onClick, onMouseEnter, onMouseLeave }) => (
  <button
    type="button"
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    className={`text-3xl px-1 transition-colors ${filled ? "text-yellow-400" : "text-gray-300 dark:text-gray-500"}`}
    aria-label={filled ? "Star filled" : "Star"}
  >
    {filled ? "★" : "☆"}
  </button>
);

const ReviewModal = ({ onClose, onSubmit, submitting = false }) => {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(null);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  const displayedRating = hoverRating !== null ? hoverRating : rating;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim() || !name.trim()) return;

    const newReview = {
      id: Date.now(),
      name: name.trim(),
      verified: false,
      rating,
      date: new Date().toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" }),
      comment: comment.trim(),
    };

    onSubmit(newReview);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <form
        onSubmit={handleSubmit}
        role="dialog"
        aria-modal="true"
        className="relative bg-white dark:bg-dark-surface w-full max-w-2xl rounded-2xl p-6 sm:p-8 z-10 shadow-2xl overflow-auto max-h-[90vh]"
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold dark:text-white">Write a Review</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Share your thoughts to help others — it only takes a minute.</p>
          </div>
          <button type="button" onClick={onClose} className="ml-4 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">
            <FiX className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2 dark:text-gray-200">Your Rating</label>
            <div className="flex items-center">
              {[1,2,3,4,5].map((s) => (
                <Star
                  key={s}
                  filled={s <= displayedRating}
                  onClick={() => setRating(s)}
                  onMouseEnter={() => setHoverRating(s)}
                  onMouseLeave={() => setHoverRating(null)}
                />
              ))}
              <span className="ml-3 text-sm text-gray-500 dark:text-gray-400">{displayedRating}/5</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 dark:text-gray-200">Your Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-600 outline-none"
              placeholder="Your name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 dark:text-gray-200">Your Review</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full min-h-[140px] px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-600 outline-none"
              placeholder="Share your experience..."
              required
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 text-sm hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className={`w-full sm:w-auto px-6 py-3 rounded-full ${submitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'} text-white font-semibold text-sm sm:text-base shadow-lg transform-gpu transition-all hover:scale-[1.02] active:scale-95 focus:outline-none focus:ring-4 focus:ring-indigo-400/25`}
            >
              {submitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ReviewModal;
