import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import {
  FiPlus,
  FiEdit,
  FiTrash2,
  FiSave,
  FiSearch,
  FiFilter,
  FiEye,
  FiThumbsUp,
  FiThumbsDown,
  FiArrowLeft,
  FiVideo,
  FiCheck,
  FiX,
} from "react-icons/fi";
import { getFAQs, createFAQ, updateFAQ, deleteFAQ } from "../services/api";

const Faqs = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [editMode, setEditMode] = useState(false);
  const [selectedFAQ, setSelectedFAQ] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isMessageVisible, setIsMessageVisible] = useState(false);
  const faqListRef = useRef(null);

  const categories = useMemo(
    () => [
      "general",
      "pricing",
      "turnaround",
      "revisions",
      "file-formats",
      "process",
      "quality",
      "rights-usage",
      "emergency",
      "collaboration",
    ],
    []
  );

  const categoryLabels = useMemo(
    () => ({
      general: "General",
      pricing: "Pricing",
      turnaround: "Turnaround",
      revisions: "Revisions",
      "file-formats": "Formats",
      process: "Process",
      quality: "Quality",
      "rights-usage": "Rights",
      emergency: "Emergency",
      collaboration: "Collaboration",
    }),
    []
  );

  const categoryColors = useMemo(
    () => ({
      general: "bg-blue-100 text-blue-700 border-blue-200",
      pricing: "bg-green-100 text-green-700 border-green-200",
      turnaround: "bg-orange-100 text-orange-700 border-orange-200",
      revisions: "bg-purple-100 text-purple-700 border-purple-200",
      "file-formats": "bg-indigo-100 text-indigo-700 border-indigo-200",
      process: "bg-teal-100 text-teal-700 border-teal-200",
      quality: "bg-amber-100 text-amber-700 border-amber-200",
      "rights-usage": "bg-red-100 text-red-700 border-red-200",
      emergency: "bg-pink-100 text-pink-700 border-pink-200",
      collaboration: "bg-cyan-100 text-cyan-700 border-cyan-200",
    }),
    []
  );

  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    category: "general",
    priority: 0,
    isActive: true,
  });

  // CSS transitions for smooth animations
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(15px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      @keyframes slideInRight {
        from {
          opacity: 0;
          transform: translateX(30px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      
      @keyframes slideInLeft {
        from {
          opacity: 0;
          transform: translateX(-30px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
      }
      
      @keyframes bounceIn {
        0% {
          opacity: 0;
          transform: scale(0.9);
        }
        60% {
          opacity: 1;
          transform: scale(1.05);
        }
        100% {
          opacity: 1;
          transform: scale(1);
        }
      }
      
      @keyframes shimmer {
        0% { background-position: -200px 0; }
        100% { background-position: calc(200px + 100%) 0; }
      }
      
      .animate-fadeInUp {
        animation: fadeInUp 0.4s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
      }
      
      .animate-fadeIn {
        animation: fadeIn 0.3s ease-out forwards;
      }
      
      .animate-slideInRight {
        animation: slideInRight 0.4s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
      }
      
      .animate-slideInLeft {
        animation: slideInLeft 0.4s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
      }
      
      .animate-pulse {
        animation: pulse 1.5s ease-in-out infinite;
      }
      
      .animate-bounceIn {
        animation: bounceIn 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
      }
      
      .animate-shimmer {
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 200px 100%;
        animation: shimmer 1.5s infinite;
      }
      
      .page-transition {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .card-hover {
        transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .card-hover:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
      }
      
      .button-press {
        transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .button-press:active {
        transform: scale(0.97);
      }
      
      .fade-enter {
        opacity: 0;
      }
      
      .fade-enter-active {
        opacity: 1;
        transition: opacity 0.3s ease-out;
      }
      
      .fade-exit {
        opacity: 1;
      }
      
      .fade-exit-active {
        opacity: 0;
        transition: opacity 0.3s ease-out;
      }
      
      .slide-up-enter {
        opacity: 0;
        transform: translateY(10px);
      }
      
      .slide-up-enter-active {
        opacity: 1;
        transform: translateY(0);
        transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
      }
      
      .stagger-item {
        opacity: 0;
        transform: translateY(10px);
      }
      
      .stagger-item.visible {
        opacity: 1;
        transform: translateY(0);
        transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
      }
      
      .smooth-scroll {
        scroll-behavior: smooth;
      }
    `;
    document.head.appendChild(style);

    // Add stagger animation to FAQ items
    const timer = setTimeout(() => {
      const items = document.querySelectorAll(".stagger-item");
      items.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add("visible");
        }, index * 50);
      });
    }, 100);

    return () => {
      document.head.removeChild(style);
      clearTimeout(timer);
    };
  }, [faqs]);

  // Fetch FAQs
  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async (filters = {}) => {
    try {
      setLoading(true);
      const response = await getFAQs(filters);
      setFaqs(response.data?.faqs || []);
    } catch (error) {
      console.error("Error fetching FAQs:", error);
      showMessage("error", "Failed to load FAQs");
    } finally {
      setLoading(false);
    }
  };

  const showMessage = useCallback((type, text) => {
    setMessage({ type, text });
    setIsMessageVisible(true);

    setTimeout(() => {
      setIsMessageVisible(false);
      setTimeout(() => setMessage({ type: "", text: "" }), 300);
    }, 3000);
  }, []);

  const handleInputChange = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData({
      question: "",
      answer: "",
      category: "general",
      priority: 0,
      isActive: true,
    });
    setSelectedFAQ(null);
    setEditMode(false);
  }, []);

  const handleSaveFAQ = async () => {
    if (!formData.question || !formData.answer) {
      showMessage("error", "Question and answer are required");
      return;
    }

    try {
      setSaving(true);
      if (editMode && selectedFAQ) {
        await updateFAQ(selectedFAQ.slug, formData);
        showMessage("success", "FAQ updated successfully");
      } else {
        await createFAQ(formData);
        showMessage("success", "FAQ created successfully");
      }
      resetForm();
      await fetchFAQs();
    } catch (error) {
      console.error("Error saving FAQ:", error);
      showMessage("error", "Failed to save FAQ");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteFAQ = async (faq) => {
    if (!window.confirm(`Delete "${faq.question}"?`)) return;

    try {
      setSaving(true);
      await deleteFAQ(faq.slug);
      showMessage("success", "FAQ deleted successfully");
      await fetchFAQs();
    } catch (error) {
      console.error("Error deleting FAQ:", error);
      showMessage("error", "Failed to delete FAQ");
    } finally {
      setSaving(false);
    }
  };

  const handleEditFAQ = useCallback((faq) => {
    setFormData({
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
      priority: faq.priority,
      isActive: faq.isActive,
    });
    setSelectedFAQ(faq);
    setEditMode(true);

    // Scroll to form
    if (faqListRef.current) {
      faqListRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const handleSearch = useCallback(() => {
    const filters = {};
    if (searchTerm) filters.search = searchTerm;
    if (filterCategory !== "all") filters.category = filterCategory;
    if (filterStatus !== "all") filters.isActive = filterStatus === "active";
    fetchFAQs(filters);
  }, [searchTerm, filterCategory, filterStatus]);

  // Optimized FAQ Item Component
  const FAQItem = React.memo(({ faq, index, onEdit, onDelete }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <div
        className="stagger-item card-hover font-poppins bg-white rounded-xl border border-gray-200 p-5 mb-3"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ animationDelay: `${index * 50}ms` }}
      >
        <div className="flex justify-between items-start">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <h4 className="font-semibold text-gray-900 text-base line-clamp-2 flex-1">
                {faq.question}
              </h4>
              <span
                className={`px-3 py-1 text-xs rounded-full border ${
                  categoryColors[faq.category]
                }`}
              >
                {categoryLabels[faq.category]}
              </span>
              {faq.priority > 0 && (
                <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full border border-gray-200">
                  Priority: {faq.priority}
                </span>
              )}
            </div>
            <p className="text-gray-600 text-sm line-clamp-3 mb-3">
              {faq.answer}
            </p>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <FiEye className="w-3 h-3" />
                <span>{faq.views || 0} views</span>
              </div>
              <div className="flex items-center gap-1">
                <FiThumbsUp className="w-3 h-3" />
                <span>{faq.helpfulCount || 0}</span>
              </div>
              <div
                className={`px-2 py-1 rounded-full ${
                  faq.isActive
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {faq.isActive ? "Active" : "Inactive"}
              </div>
            </div>
          </div>
          <div
            className={`flex items-center gap-1 ml-3 transition-all duration-300 ${
              isHovered
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-2"
            }`}
          >
            <button
              onClick={() => onEdit(faq)}
              className="button-press p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Edit FAQ"
            >
              <FiEdit className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(faq)}
              className="button-press p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete FAQ"
            >
              <FiTrash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  });

  FAQItem.displayName = "FAQItem";

  // Skeleton loading component
  const SkeletonFAQ = () => (
    <div className="animate-shimmer bg-gray-100 rounded-xl p-5 mb-3">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-2/3 mb-4"></div>
          <div className="flex gap-2">
            <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
            <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br font-poppins from-gray-50 to-gray-100 p-4 md:p-6 smooth-scroll page-transition">
      <div className="max-w-7xl mx-auto">
        {/* Header with animation */}
        <div className="animate-fadeInUp mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <a
                href="/dashboard"
                className="button-press inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-3 group transition-all"
              >
                <FiArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                <span>Back to Dashboard</span>
              </a>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Video Editing FAQ Management
              </h1>
              <p className="text-gray-600 mt-1">
                Manage frequently asked questions for your video editing agency
              </p>
            </div>
            <button
              onClick={resetForm}
              className="button-press card-hover animate-bounceIn flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 shadow-md"
            >
              <FiPlus className="w-4 h-4" />
              <span>Add New FAQ</span>
            </button>
          </div>
        </div>

        {/* Animated Message */}
        <div
          className={`transition-all duration-300 transform ${
            isMessageVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-2"
          }`}
        >
          {message.text && (
            <div
              className={`p-4 rounded-xl mb-6 border ${
                message.type === "success"
                  ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 text-green-800"
                  : "bg-gradient-to-r from-red-50 to-rose-50 border-red-200 text-red-800"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-full ${
                    message.type === "success" ? "bg-green-100" : "bg-red-100"
                  }`}
                >
                  {message.type === "success" ? (
                    <FiCheck className="w-4 h-4 text-green-600" />
                  ) : (
                    <FiX className="w-4 h-4 text-red-600" />
                  )}
                </div>
                <span className="font-medium">{message.text}</span>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" ref={faqListRef}>
          {/* Form Section with slide in animation */}
          <div className="animate-slideInLeft lg:col-span-1">
            <div className="card-hover bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-5">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                    <FiVideo className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h2 className="font-bold text-white">
                      {editMode ? "Edit FAQ" : "Create New FAQ"}
                    </h2>
                    <p className="text-white/90 text-sm">
                      {editMode
                        ? "Update FAQ details"
                        : "Add a new video editing question"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 space-y-4">
                <div className="transition-all duration-200">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Question *
                  </label>
                  <textarea
                    value={formData.question}
                    onChange={(e) =>
                      handleInputChange("question", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Enter your question..."
                    rows={3}
                  />
                </div>

                <div className="transition-all duration-200">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Answer *
                  </label>
                  <textarea
                    value={formData.answer}
                    onChange={(e) =>
                      handleInputChange("answer", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Provide a detailed answer..."
                    rows={4}
                  />
                </div>

                <div className="transition-all duration-200">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      handleInputChange("category", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {categoryLabels[cat]}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="transition-all duration-200">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Priority:{" "}
                    <span className="text-purple-600 font-bold">
                      {formData.priority}
                    </span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={formData.priority}
                    onChange={(e) =>
                      handleInputChange("priority", parseInt(e.target.value))
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Low</span>
                    <span>Medium</span>
                    <span>High</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg transition-all duration-200">
                  <div>
                    <label className="text-sm font-semibold text-gray-700">
                      Status
                    </label>
                    <p className="text-sm text-gray-500">
                      {formData.isActive ? "Visible to clients" : "Hidden"}
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) =>
                        handleInputChange("isActive", e.target.checked)
                      }
                      className="sr-only peer"
                    />
                    <div className="w-12 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-500 transition-all duration-300"></div>
                  </label>
                </div>

                <div className="flex gap-3 pt-2">
                  {(editMode || formData.question) && (
                    <button
                      onClick={resetForm}
                      className="button-press flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200"
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    onClick={handleSaveFAQ}
                    disabled={saving || !formData.question || !formData.answer}
                    className="button-press flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md"
                  >
                    {saving ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Saving...</span>
                      </div>
                    ) : editMode ? (
                      "Update FAQ"
                    ) : (
                      "Create FAQ"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ List Section with slide in animation */}
          <div className="animate-slideInRight lg:col-span-2">
            <div className="card-hover bg-white rounded-xl border border-gray-200 overflow-hidden h-full flex flex-col">
              <div className="p-5 border-b border-gray-200">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Video Editing FAQs
                    </h3>
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium animate-fadeIn">
                      {faqs.length} items
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <div className="relative">
                      <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                        placeholder="Search FAQs..."
                        className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>

                    <select
                      value={filterCategory}
                      onChange={(e) => setFilterCategory(e.target.value)}
                      className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="all">All Categories</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {categoryLabels[cat]}
                        </option>
                      ))}
                    </select>

                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="all">All Status</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>

                    <button
                      onClick={handleSearch}
                      className="button-press px-4 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
                    >
                      <FiFilter className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* FAQ Items with smooth scrolling */}
              <div className="flex-1 overflow-y-auto max-h-[calc(100vh-300px)] smooth-scroll p-5">
                {loading && faqs.length === 0 ? (
                  <div className="space-y-3">
                    {[...Array(5)].map((_, i) => (
                      <SkeletonFAQ key={i} />
                    ))}
                  </div>
                ) : faqs.length === 0 ? (
                  <div className="text-center py-10">
                    <div className="animate-bounceIn inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                      <FiVideo className="w-8 h-8 text-purple-600" />
                    </div>
                    <h4 className="text-lg font-medium text-gray-900 mb-2">
                      No FAQs Found
                    </h4>
                    <p className="text-gray-600">
                      {searchTerm ||
                      filterCategory !== "all" ||
                      filterStatus !== "all"
                        ? "Try adjusting your search criteria"
                        : "Create your first FAQ to get started"}
                    </p>
                  </div>
                ) : (
                  <div>
                    {faqs.map((faq, index) => (
                      <FAQItem
                        key={faq._id}
                        faq={faq}
                        index={index}
                        onEdit={handleEditFAQ}
                        onDelete={handleDeleteFAQ}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>Showing {faqs.length} FAQs</span>
                  <button
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                    className="button-press text-purple-600 hover:text-purple-700 font-medium transition-colors"
                  >
                    Back to top ↑
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Faqs);
