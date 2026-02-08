import { useState, useEffect, lazy } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getReviews,
  createReview,
  updateReview,
  deleteReview,
  uploadFile,
  getVideoReviews, // Add this import
} from "../services/api";
const ReviewModal = lazy(() => import("../components/ReviewModal"));
const ReviewList = lazy(() => import("../components/ReviewList"));

const ReviewsPage = () => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [videoReviews, setVideoReviews] = useState([]); // New state for video reviews
  const [loading, setLoading] = useState(true);
  const [videoReviewsLoading, setVideoReviewsLoading] = useState(false); // Separate loading state
  const [activeTab, setActiveTab] = useState("text"); // 'text' or 'video'
  const [showOnlyBestReviews, setShowOnlyBestReviews] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [uploading, setUploading] = useState({ video: false });
  const [submitting, setSubmitting] = useState(false);

  const [reviewForm, setReviewForm] = useState({
    content: "",
    rating: 5,
    video: "",
    videoId: "",
    userName: "",
    isBest: false,
  });

  useEffect(() => {
    if (activeTab === "text") {
      fetchTextReviews(showOnlyBestReviews);
    } else if (activeTab === "video") {
      fetchVideoReviews(showOnlyBestReviews);
    }
  }, [activeTab, showOnlyBestReviews]);

  const fetchTextReviews = async (filterBest = false) => {
    try {
      setLoading(true);
      let query = {};
      if (filterBest) {
        query.isBest = true;
      }
      const res = await getReviews(query);
      setReviews(res.data.reviews);
    } catch (err) {
      toast.error("Failed to fetch text reviews");
    } finally {
      setLoading(false);
    }
  };

  const fetchVideoReviews = async (filterBest = false) => {
    try {
      setVideoReviewsLoading(true);
      let query = {};
      if (filterBest) {
        query.isBest = true;
      }
      const res = await getVideoReviews(query);
      setVideoReviews(res.data.reviews || res.data.videoReviews || []);
    } catch (err) {
      toast.error("Failed to fetch video reviews");
    } finally {
      setVideoReviewsLoading(false);
    }
  };

  const handleFileUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading({ ...uploading, [type]: true });
      const toastId = toast.loading(`Uploading ${type}...`);
      const res = await uploadFile(file);

      if (type === "video") {
        setReviewForm((prev) => ({
          ...prev,
          video: res.url,
          videoId: res.public_id,
        }));
      }

      toast.update(toastId, {
        render: `${type.charAt(0).toUpperCase() + type.slice(1)} uploaded!`,
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch (err) {
      toast.error(`Failed to upload ${type}`);
    } finally {
      setUploading({ ...uploading, [type]: false });
    }
  };

  const handleReviewChange = (e) => {
    const { name, value, type, checked } = e.target;
    setReviewForm({
      ...reviewForm,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const submitReviewForm = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const toastId = toast.loading(
        editingReview ? "Updating review..." : "Adding review..."
      );

      if (editingReview) {
        await updateReview(editingReview._id, reviewForm);
        toast.update(toastId, {
          render: "Review updated!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      } else {
        await createReview(reviewForm);
        toast.update(toastId, {
          render: "Review added!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      }

      setShowReviewModal(false);
      setReviewForm({
        content: "",
        rating: 5,
        video: "",
        videoId: "",
        userName: "",
        isBest: false,
      });
      setEditingReview(null);

      // Refresh the current tab's reviews
      if (activeTab === "text") {
        await fetchTextReviews(showOnlyBestReviews);
      } else {
        await fetchVideoReviews(showOnlyBestReviews);
      }
    } catch (err) {
      toast.error(err.message || "Failed to save review");
    } finally {
      setSubmitting(false);
    }
  };

  const editReview = (review) => {
    setEditingReview(review);
    setReviewForm({
      content: review.content,
      rating: review.rating,
      video: review.video,
      videoId: review.videoId,
      userName: review.userName || "",
      isBest: review.isBest || false,
    });
    setShowReviewModal(true);
  };

  const deleteReviewItem = async (id) => {
    if (!window.confirm("Delete this review?")) return;
    try {
      await deleteReview(id);
      toast.success("Review deleted");

      // Update the appropriate state based on active tab
      if (activeTab === "text") {
        setReviews((prev) => prev.filter((review) => review._id !== id));
      } else {
        setVideoReviews((prev) => prev.filter((review) => review._id !== id));
      }
    } catch (err) {
      toast.error("Failed to delete review");
    }
  };

  // Calculate counts for tabs
  const textReviewsCount = reviews.length;
  const videoReviewsCount = videoReviews.length;
  const bestTextReviewsCount = reviews.filter((review) => review.isBest).length;
  const bestVideoReviewsCount = videoReviews.filter(
    (review) => review.isBest
  ).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-5 sm:px-6 lg:px-8 flex items-center">
          <motion.button
            onClick={() => navigate("/dashboard")}
            className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ←
          </motion.button>
          <h1 className="text-2xl font-bold text-gray-800">Reviews</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab("text")}
                className={`
                  py-4 px-1 border-b-2 font-medium text-sm
                  ${
                    activeTab === "text"
                      ? "border-red-500 text-red-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }
                `}
              >
                Text Reviews
                <span
                  className={`ml-2 py-0.5 px-2 text-xs rounded-full ${
                    activeTab === "text"
                      ? "bg-red-100 text-red-600"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {showOnlyBestReviews
                    ? bestTextReviewsCount
                    : textReviewsCount}
                </span>
              </button>

              <button
                onClick={() => setActiveTab("video")}
                className={`
                  py-4 px-1 border-b-2 font-medium text-sm
                  ${
                    activeTab === "video"
                      ? "border-red-500 text-red-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }
                `}
              >
                Video Reviews
                <span
                  className={`ml-2 py-0.5 px-2 text-xs rounded-full ${
                    activeTab === "video"
                      ? "bg-red-100 text-red-600"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {showOnlyBestReviews
                    ? bestVideoReviewsCount
                    : videoReviewsCount}
                </span>
              </button>
            </nav>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="text-sm text-gray-600">
            Showing {activeTab === "text" ? "Text" : "Video"} Reviews
            {showOnlyBestReviews && " (Best Only)"}
          </div>

          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowOnlyBestReviews(!showOnlyBestReviews)}
              className={`inline-flex items-center px-4 py-2 border text-sm font-medium rounded-lg shadow-sm ${
                showOnlyBestReviews
                  ? "bg-red-100 text-red-700 border-red-300"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              {showOnlyBestReviews ? "Show All Reviews" : "Show Best Only"}
              {showOnlyBestReviews && (
                <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {activeTab === "text"
                    ? bestTextReviewsCount
                    : bestVideoReviewsCount}
                </span>
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setEditingReview(null);
                setReviewForm({
                  content: "",
                  rating: 5,
                  video: activeTab === "video" ? "" : undefined, // Pre-select video field for video reviews tab
                  videoId: "",
                  userName: "",
                  isBest: false,
                });
                setShowReviewModal(true);
              }}
              className="inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
            >
              + Add {activeTab === "video" ? "Video " : ""}Review
            </motion.button>
          </div>
        </div>

        {activeTab === "text" ? (
          loading ? (
            <div className="flex justify-center items-center h-64">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"
              />
            </div>
          ) : (
            <ReviewList
              reviews={reviews}
              onEdit={editReview}
              onDelete={deleteReviewItem}
              showOnlyBest={showOnlyBestReviews}
              type="text"
            />
          )
        ) : videoReviewsLoading ? (
          <div className="flex justify-center items-center h-64">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"
            />
          </div>
        ) : (
          <ReviewList
            reviews={videoReviews}
            onEdit={editReview}
            onDelete={deleteReviewItem}
            showOnlyBest={showOnlyBestReviews}
            type="video"
          />
        )}
      </main>

      {showReviewModal && (
        <ReviewModal
          show={showReviewModal}
          onClose={() => setShowReviewModal(false)}
          reviewForm={reviewForm}
          setReviewForm={setReviewForm}
          submitting={submitting}
          uploading={uploading}
          handleReviewChange={handleReviewChange}
          handleFileUpload={handleFileUpload}
          submitReviewForm={submitReviewForm}
          editingReview={editingReview}
          reviewType={activeTab} // Pass active tab to modal for conditional rendering
        />
      )}
    </div>
  );
};

export default ReviewsPage;
