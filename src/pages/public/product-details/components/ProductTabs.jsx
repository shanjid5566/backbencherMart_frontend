import React, { useState, useEffect } from "react";
import { FiMoreVertical } from "react-icons/fi";
import ReviewModal from "./ReviewModal";
import apiService from "../../../../services/apiService";

const ProductTabs = ({ productId, totalReviews }) => {
  const [activeTab, setActiveTab] = useState("reviews");
  const [sortBy, setSortBy] = useState("latest");
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [error, setError] = useState(null);
  // FAQs state
  const [faqs, setFaqs] = useState([]);
  const [faqPage, setFaqPage] = useState(1);
  const [faqLimit] = useState(10);
  const [faqLoading, setFaqLoading] = useState(false);
  const [faqHasMore, setFaqHasMore] = useState(false);
  const [faqError, setFaqError] = useState(null);

  const loadReviews = async (p = 1, append = false) => {
    if (!productId) return;
    setLoading(true);
    setError(null);
    try {
      // Helper to fetch base reviews and sort client-side when special endpoints are missing
      const fetchBaseAndSort = async (mode) => {
        const baseRes = await apiService.get(`/products/${productId}/reviews`, { params: { page: 1, limit: 1000 } });
        const all = baseRes.items || [];
        if (mode === 'highest') return all.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        if (mode === 'lowest') return all.sort((a, b) => (a.rating || 0) - (b.rating || 0));
        return all;
      };

      let res;
      let items = [];

      if (sortBy === 'latest') {
        res = await apiService.get(`/products/${productId}/reviews`, { params: { page: p, limit } });
        items = res.items || [];
      } else if (sortBy === 'highest') {
        try {
          res = await apiService.get(`/products/${productId}/reviews/top`, { params: { limit } });
          items = res.items || [];
        } catch (errTop) {
          const status = errTop?.status || errTop?.response?.status;
          if (status === 404 || String(errTop).includes('Cannot GET')) {
            items = await fetchBaseAndSort('highest');
            res = null;
          } else throw errTop;
        }
      } else if (sortBy === 'lowest') {
        try {
          res = await apiService.get(`/products/${productId}/reviews/lowest`, { params: { limit } });
          items = res.items || [];
        } catch (errLow) {
          const status = errLow?.status || errLow?.response?.status;
          if (status === 404 || String(errLow).includes('Cannot GET')) {
            items = await fetchBaseAndSort('lowest');
            res = null;
          } else throw errLow;
        }
      } else {
        res = await apiService.get(`/products/${productId}/reviews`, { params: { page: p, limit } });
        items = res.items || [];
      }

      if (append) setReviews((r) => [...r, ...items]);
      else setReviews(items);

      // Determine pagination support
      if (res && res.meta) setHasMore(p < res.meta.totalPages);
      else setHasMore(false);
    } catch (err) {
      const msg = err?.message || err?.data?.message || JSON.stringify(err) || String(err);
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // reset and load first page when productId changes
    setPage(1);
    setReviews([]);
    if (productId) loadReviews(1, false);
    // reset/faqs
    setFaqPage(1);
    setFaqs([]);
    if (productId) loadFaqs(1, false);
  }, [productId]);

  // Reload reviews when sort changes
  useEffect(() => {
    if (!productId) return;
    setPage(1);
    setReviews([]);
    loadReviews(1, false);
  }, [sortBy]);

  const handleSubmitReview = async (newReview) => {
    if (!productId) return;
    setSubmitting(true);
    setError(null);
    try {
      const payload = { rating: newReview.rating, comment: newReview.comment };
      const res = await apiService.post(`/products/${productId}/reviews`, payload);
      // API may return the created review object; attempt to extract it
      const created = res?.item || res?.review || res || null;
      if (created) {
        setReviews((r) => [created, ...r]);
      }
      setShowModal(false);
    } catch (err) {
      const msg = err?.message || err?.data?.message || JSON.stringify(err) || String(err);
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const loadFaqs = async (p = 1, append = false) => {
    if (!productId) return;
    setFaqLoading(true);
    setFaqError(null);
    try {
      const res = await apiService.get(`/faqs/${productId}`, { params: { page: p, limit: faqLimit } });
      const items = res.items || [];
      if (append) setFaqs((f) => [...f, ...items]);
      else setFaqs(items);
      setFaqHasMore(res.meta ? p < res.meta.totalPages : false);
    } catch (err) {
      const msg = err?.message || err?.data?.message || JSON.stringify(err) || String(err);
      setFaqError(msg);
    } finally {
      setFaqLoading(false);
    }
  };

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
            {loading && reviews.length === 0 ? (
              <>
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="p-5 sm:p-6 border dark:border-gray-700 rounded-2xl animate-pulse">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <div key={s} className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        ))}
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-2"></div>
                    </div>
                    <div className="space-y-2 mb-4">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
                    </div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-40"></div>
                  </div>
                ))}
              </>
            ) : error ? (
              <div className="col-span-1 lg:col-span-2 text-center text-red-500 py-8">{error}</div>
            ) : reviews.length === 0 ? (
              <div className="col-span-1 lg:col-span-2 text-center text-gray-500 py-8">No reviews yet.</div>
            ) : (
              reviews.map((review) => (
                <div
                  key={review._id || review.id}
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
                      {review.userName || review.user || review.name}
                    </h4>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed mb-4">
                    {review.comment}
                  </p>

                  <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
                    Posted on {new Date(review.createdAt || review.date).toLocaleDateString()}
                  </p>
                </div>
              ))
            )}
          </div>

          {/* Load More Button */}
          <div className="flex justify-center mt-6 lg:mt-8">
            {hasMore ? (
              <button
                onClick={() => {
                  const next = page + 1;
                  setPage(next);
                  loadReviews(next, true);
                }}
                className="px-6 sm:px-8 py-3 sm:py-4 border dark:border-gray-700 dark:text-white rounded-full text-sm sm:text-base font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                {loading ? 'Loading...' : 'Load More Reviews'}
              </button>
            ) : (
              <div className="text-sm text-gray-500">{reviews.length ? 'No more reviews' : ''}</div>
            )}
          </div>
          {showModal && (
            <ReviewModal
              onClose={() => setShowModal(false)}
              onSubmit={handleSubmitReview}
              submitting={submitting}
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
        <div>
          {faqLoading && faqs.length === 0 ? (
            <div className="text-center py-8">Loading FAQs...</div>
          ) : faqError ? (
            <div className="text-center text-red-500 py-8">{faqError}</div>
          ) : faqs.length === 0 ? (
            <div className="text-center text-gray-500 py-8">No FAQs yet.</div>
          ) : (
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq._id || faq.id} className="p-4 border dark:border-gray-700 rounded-2xl">
                  <h4 className="font-semibold dark:text-white mb-2">{faq.question}</h4>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">{faq.answer}</p>
                  <div className="text-xs text-gray-400">Asked on {new Date(faq.createdAt).toLocaleDateString()}</div>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-center mt-6">
            {faqHasMore ? (
              <button
                onClick={() => {
                  const next = faqPage + 1;
                  setFaqPage(next);
                  loadFaqs(next, true);
                }}
                className="px-6 py-3 border rounded-full"
              >
                {faqLoading ? 'Loading...' : 'Load More FAQs'}
              </button>
            ) : (
              <div className="text-sm text-gray-500">{faqs.length ? 'No more FAQs' : ''}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductTabs;
