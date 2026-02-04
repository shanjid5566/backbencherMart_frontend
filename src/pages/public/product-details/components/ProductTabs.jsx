import React, { useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import { reviews as mockReviews } from "../../../../data/productData";
import ReviewModal from "./ReviewModal";

const ProductTabs = ({ totalReviews }) => {
  const [activeTab, setActiveTab] = useState("reviews");
  const [sortBy, setSortBy] = useState("latest");
  const [showModal, setShowModal] = useState(false);
  const [reviews, setReviews] = useState(mockReviews);

  const tabs = [
    { id: "reviews", label: "Rating & Reviews" },
    { id: "faqs", label: "FAQs" }
  ];

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={`full-${i}`} className="text-yellow-400 text-lg">★</span>
      );
    }
    if (hasHalfStar) {
      stars.push(
        <span key="half" className="text-yellow-400 text-lg">⯨</span>
      );
    }
    const remaining = 5 - Math.ceil(rating);
    for (let i = 0; i < remaining; i++) {
      stars.push(
        <span key={`empty-${i}`} className="text-gray-300 text-lg">★</span>
      );
    }
    return stars;
  };

  return (
    <div className="mt-8 lg:mt-12">
      {/* Tabs */}
      <div className="border-b dark:border-gray-700 mb-6 lg:mb-8">
        <div className="flex gap-6 lg:gap-12 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 text-sm sm:text-base lg:text-lg whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? "text-black dark:text-white font-medium border-b-2 border-black dark:border-white"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "reviews" && (
        <div>
          {/* Reviews Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 lg:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold dark:text-white">
              All Reviews{" "}
              <span className="text-gray-500 dark:text-gray-400">
                ({totalReviews})
              </span>
            </h2>
            <div className="flex items-center gap-3">
              {/* <button className="p-2 sm:p-3 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                <svg className="w-5 h-5 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                </svg>
              </button> */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 sm:py-3 bg-gray-100 dark:bg-gray-800 dark:text-white rounded-lg text-sm sm:text-base border-0 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600"
              >
                <option value="latest">Latest</option>
                <option value="highest">Highest Rating</option>
                <option value="lowest">Lowest Rating</option>
              </select>
              <button
                onClick={() => setShowModal(true)}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-black dark:bg-white text-white dark:text-black rounded-full text-sm sm:text-base font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Write a Review
              </button>
            </div>
          </div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="p-5 sm:p-6 border dark:border-gray-700 rounded-2xl hover:shadow-md dark:hover:shadow-gray-800/50 transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-1">
                    {renderStars(review.rating)}
                  </div>
                  <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                    <FiMoreVertical className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <h4 className="font-bold text-base sm:text-lg dark:text-white">
                    {review.name}
                  </h4>
                  {review.verified && (
                    <span className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                  )}
                </div>

                <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed mb-4">
                  {review.comment}
                </p>

                <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
                  Posted on {review.date}
                </p>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="flex justify-center mt-6 lg:mt-8">
            <button className="px-6 sm:px-8 py-3 sm:py-4 border dark:border-gray-700 dark:text-white rounded-full text-sm sm:text-base font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              Load More Reviews
            </button>
          </div>
          {showModal && (
            <ReviewModal
              onClose={() => setShowModal(false)}
              onSubmit={(newReview) => {
                setReviews((r) => [newReview, ...r]);
                setShowModal(false);
              }}
            />
          )}
        </div>
      )}

      {activeTab === "details" && (
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-gray-600 dark:text-gray-300">
            Product details content goes here...
          </p>
        </div>
      )}

      {activeTab === "faqs" && (
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-gray-600 dark:text-gray-300">
            FAQs content goes here...
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductTabs;
