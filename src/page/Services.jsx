import React, { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useAnimation,
} from "framer-motion";
import {
  FaVideo,
  FaFilm,
  FaYoutube,
  FaMagic,
  FaRocket,
  FaCube,
  FaRegLightbulb,
  FaRocketchat,
  FaPalette,
  FaShippingFast,
  FaHandshake,
  FaPlay,
  FaExpand,
  FaCut,
  FaLayerGroup,
} from "react-icons/fa";
import { GiFilmSpool } from "react-icons/gi";
import davinchi from "../assets/davenchi.png";
import premier from "../assets/premier.png";
import cap_cut from "../assets/cap-cut.png";
import after_effect from "../assets/after-effect.png";
import blender from "../assets/blender.png";
import final_cut from "../assets/final-cut.png";
import SectionHeader from "../components/Shared/SectionHeader";
import {
  getServices,
  getActiveStatistics,
  getVideoReviews,
  getReviews,
} from "../services/api";

// Icon mapping for services
const serviceIcons = {
  "YouTube Videos": <FaYoutube className="w-5 h-5 sm:w-6 sm:h-6" />,
  "Short Form Video": <GiFilmSpool className="w-5 h-5 sm:w-6 sm:h-6" />,
  "SaaS Video": <FaCube className="w-5 h-5 sm:w-6 sm:h-6" />,
  "Ad Creatives & VSLs": <FaRocket className="w-5 h-5 sm:w-6 sm:h-6" />,
  "Demo Videos": <FaVideo className="w-5 h-5 sm:w-6 sm:h-6" />,
  Podcasts: <FaRegLightbulb className="w-5 h-5 sm:w-6 sm:h-6" />,
  "Reels Video": <FaFilm className="w-5 h-5 sm:w-6 sm:h-6" />,
  "Motion Graphics": <FaMagic className="w-5 h-5 sm:w-6 sm:h-6" />,
  premium: <FaVideo className="w-5 h-5 sm:w-6 sm:h-6" />,
  default: <FaVideo className="w-5 h-5 sm:w-6 sm:h-6" />,
};

// Function to get icon for service
const getServiceIcon = (serviceTitle, serviceIcon) => {
  if (serviceIcon) {
    return <span className="text-xl sm:text-2xl">{serviceIcon}</span>;
  }
  return serviceIcons[serviceTitle] || serviceIcons.default;
};

// Floating App Logos Component - Mobile Optimized
const FloatingAppLogos = () => {
  const videoTools = [
    { name: "DaVinci Resolve", logo: davinchi },
    { name: "Premier Pro", logo: premier },
    { name: "Final Cut Pro", logo: final_cut },
    { name: "CapCut", logo: cap_cut },
    { name: "After Effects", logo: after_effect },
    { name: "Blender", logo: blender },
  ];

  // Generate responsive positions
  const getRandomPosition = (index) => {
    const mobilePositions = [
      { top: "10%", left: "5%", scale: 0.5 },
      { top: "15%", right: "8%", scale: 0.6 },
      { top: "70%", left: "4%", scale: 0.5 },
      { bottom: "15%", right: "6%", scale: 0.7 },
      { top: "45%", right: "3%", scale: 0.4 },
      { bottom: "25%", left: "15%", scale: 0.6 },
    ];

    const desktopPositions = [
      { top: "15%", left: "8%", scale: 0.6 },
      { top: "22%", right: "12%", scale: 0.8 },
      { top: "65%", left: "6%", scale: 0.7 },
      { bottom: "20%", right: "8%", scale: 1.0 },
      { top: "42%", right: "5%", scale: 0.5 },
      { bottom: "32%", left: "20%", scale: 0.9 },
    ];

    return window.innerWidth < 768
      ? mobilePositions[index % mobilePositions.length]
      : desktopPositions[index % desktopPositions.length];
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-25">
      {/* Floating App Logos */}
      {videoTools.map((tool, index) => {
        const position = getRandomPosition(index);

        return (
          <motion.div
            key={`floating-${tool.name}`}
            className="absolute z-30"
            style={position}
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{
              opacity: [0.3, 0.7, 0.3],
              scale: [
                position.scale * 0.8,
                position.scale * 1.1,
                position.scale * 0.8,
              ],
              y: [0, -20, 0, -15, 0],
              x: [0, 5, -8, 4, 0],
              rotate: [0, 3, -2, 1, 0],
            }}
            transition={{
              duration: 12 + Math.random() * 6,
              repeat: Infinity,
              delay: index * 1,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <motion.div
              className="relative bg-gradient-to-br from-white/30 to-white/12 backdrop-blur-xl rounded-lg sm:rounded-xl p-2 sm:p-3 border border-white/40 shadow-md sm:shadow-lg"
              whileHover={{
                scale: window.innerWidth >= 768 ? 1.4 : 1.1,
                rotateY: window.innerWidth >= 768 ? 180 : 0,
                transition: {
                  duration: 0.6,
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                },
              }}
            >
              <motion.img
                src={tool.logo}
                alt={tool.name}
                className="w-10 h-10 sm:w-14 sm:h-14 object-contain"
                animate={{
                  filter: [
                    "brightness(1.1) drop-shadow(0 0 8px rgba(13, 148, 136, 0.4))",
                    "brightness(1.3) drop-shadow(0 0 15px rgba(20, 184, 166, 0.6))",
                    "brightness(1.1) drop-shadow(0 0 8px rgba(13, 148, 136, 0.4))",
                  ],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: index * 0.6,
                  ease: "easeInOut",
                }}
              />

              {/* Tool Name Tooltip - Only on desktop */}
              <motion.div
                className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-teal-800/95 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap opacity-0 border border-teal-600/30 backdrop-blur-sm shadow-lg hidden sm:block"
                whileHover={{
                  opacity: 1,
                  y: -2,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
              >
                {tool.name}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-1.5 h-1.5 bg-teal-800/95 rotate-45" />
              </motion.div>
            </motion.div>
          </motion.div>
        );
      })}

      {/* Subtle Floating Particles - Reduced for mobile */}
      {Array.from({ length: window.innerWidth < 768 ? 4 : 6 }).map((_, i) => {
        const mobilePositions = [
          { top: "25%", left: "12%" },
          { top: "50%", right: "18%" },
          { top: "75%", left: "8%" },
          { bottom: "28%", right: "12%" },
        ];

        const desktopPositions = [
          { top: "30%", left: "16%" },
          { top: "45%", right: "22%" },
          { top: "70%", left: "11%" },
          { bottom: "32%", right: "16%" },
          { top: "55%", right: "9%" },
          { bottom: "42%", left: "26%" },
        ];

        const position =
          window.innerWidth < 768 ? mobilePositions[i] : desktopPositions[i];

        return (
          <motion.div
            key={`floating-particle-${i}`}
            className="absolute w-1 h-1 bg-gradient-to-r from-teal-400/50 to-teal-300/30 rounded-full opacity-60 z-20"
            style={position}
            animate={{
              y: [0, -15, 0, -8, 0],
              x: [0, 4, -6, 3, 0],
              scale: [1, 1.2, 0.8, 1.1, 1],
              opacity: [0.3, 0.5, 0.3, 0.4, 0.3],
              rotate: [0, 45, 90, 135, 180],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              delay: Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
};

// Responsive Animated Logo Cards for Differentiators
const AnimatedLogoCard = ({ item, index }) => {
  return (
    <motion.div
      className={`relative p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 ${item.borderColor} ${item.bgColor} backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{
        scale: window.innerWidth < 768 ? 1.01 : 1.02,
        y: window.innerWidth < 768 ? -2 : -5,
      }}
    >
      {/* Metric Badge - Smaller on mobile */}
      <div
        className={`absolute -top-2 -right-2 sm:-top-3 sm:-right-3 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-gradient-to-r ${item.color} text-white text-xs sm:text-sm font-bold shadow-lg z-10`}
      >
        {item.metric}
      </div>

      {/* Icon - Smaller on mobile */}
      <motion.div
        className="text-2xl sm:text-4xl mb-3 sm:mb-4 relative z-10"
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {item.icon}
      </motion.div>

      {/* Title - Smaller text on mobile */}
      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 relative z-10">
        {item.title}
      </h3>

      {/* Description - Smaller text on mobile */}
      <p className="text-gray-700 text-xs sm:text-sm leading-relaxed relative z-10">
        {item.description}
      </p>
    </motion.div>
  );
};

// Responsive Animated Comparison Card - Fixed with consistent bottom advantage text
const AnimatedComparisonCard = ({ item, index }) => {
  return (
    <motion.div
      key={index}
      className="text-center p-4 sm:p-6 bg-gradient-to-br from-white to-gray-50 rounded-xl sm:rounded-2xl border border-gray-100 hover:border-teal-200 transition-all duration-300 relative overflow-hidden group hover:shadow-lg"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{
        scale: window.innerWidth < 768 ? 1.02 : 1.05,
        boxShadow: "0 20px 40px -10px rgba(13, 148, 136, 0.1)",
      }}
    >
      <div className="text-xs sm:text-sm text-gray-500 mb-3 font-medium relative z-10 uppercase tracking-wide">
        {item.aspect}
      </div>

      <div className="flex items-center justify-between mb-2 relative z-10">
        <div className="text-center flex-1">
          <div className="text-xs text-gray-400 mb-1">Others</div>
          <div className="text-sm sm:text-base text-gray-600 line-through font-medium px-2 py-1 bg-gray-100 rounded-lg">
            {item.others}
          </div>
        </div>

        <motion.div
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-teal-500 to-teal-600 flex items-center justify-center mx-2 sm:mx-3 flex-shrink-0 shadow-lg"
          whileHover={{ scale: 1.2, rotate: 180 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </motion.div>

        <div className="text-center flex-1">
          <div className="text-xs text-teal-600 font-medium mb-1">We Offer</div>
          <div className="text-sm sm:text-base font-semibold text-gray-900 px-2 py-1 bg-teal-50 rounded-lg border border-teal-100">
            {item.you}
          </div>
        </div>
      </div>

      {/* Advantage text at the bottom - Consistent for all cards */}
      <div className="mt-4 pt-3 border-t border-gray-100">
        <div className="inline-block px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg text-xs sm:text-sm font-bold relative z-10 shadow-md">
          {item.advantage}
        </div>
      </div>
    </motion.div>
  );
};

// Video Player Component
const VideoPlayer = ({ videoUrl, thumbnail, isBest, duration }) => {
  const isMobile = window.innerWidth < 768;

  return (
    <div
      className={`relative rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-2xl ${
        isMobile ? "h-48" : "h-64 lg:h-80"
      } bg-black`}
    >
      {/* Default HTML5 Video Player */}
      <video
        className="w-full h-full object-cover"
        poster={thumbnail}
        controls
        controlsList="nodownload"
        preload="metadata"
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Best Review Badge */}
      {isBest && (
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-yellow-500 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium z-10">
          ⭐ Featured
        </div>
      )}

      {/* Video Duration */}
      <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 bg-black/80 text-white px-2 py-1 rounded text-xs sm:text-sm">
        {duration}
      </div>
    </div>
  );
};

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // New state for video reviews and statistics
  const [videoReviews, setVideoReviews] = useState([]);
  const [statistics, setStatistics] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Real Differentiators - Updated Unlimited Revisions description
  const differentiators = [
    {
      icon: "⏰",
      title: "24-48 Hour Delivery",
      description:
        "While others take 5-7 days, we deliver professional edits in 1-2 days without rushing or compromising quality.",
      metric: "Fastest",
      color: "from-green-500 to-teal-500",
      borderColor: "border-green-200",
      bgColor: "bg-gradient-to-br from-green-50 to-teal-50",
    },
    {
      icon: "💬",
      title: "Real-Time Collaboration",
      description:
        "Work directly with your editor via live chat and screen sharing. No more waiting days for email responses.",
      metric: "Live Editing",
      color: "from-blue-500 to-cyan-500",
      borderColor: "border-blue-200",
      bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50",
    },
    {
      icon: "🔄",
      title: "Flexible Revisions",
      description:
        "Most editors charge extra for revisions. We offer reasonable revision rounds to ensure your complete satisfaction.",
      metric: "Quality Focused",
      color: "from-purple-500 to-indigo-500",
      borderColor: "border-purple-200",
      bgColor: "bg-gradient-to-br from-purple-50 to-indigo-50",
    },
    {
      icon: "🎵",
      title: "Copyright-Free Music",
      description:
        "We provide access to premium, copyright-free music libraries so your videos never get taken down.",
      metric: "Safe Music",
      color: "from-orange-500 to-amber-500",
      borderColor: "border-orange-200",
      bgColor: "bg-gradient-to-br from-orange-50 to-amber-50",
    },
  ];

  // Real Comparison - Updated with better text and consistent advantage buttons
  const comparisonData = [
    {
      aspect: "Delivery Time",
      you: "24-48 hours 1-2 days",
      others: "5-7 days",
      advantage: "3x Faster Delivery",
    },
    {
      aspect: "Communication",
      you: "Live chat & calls",
      others: "Email only",
      advantage: "Instant Response",
    },
    {
      aspect: "Revisions",
      you: "Flexible revisions",
      others: "Limited or extra cost",
      advantage: "Better Value",
    },
    {
      aspect: "Music Rights",
      you: "Copyright-free library",
      others: "You provide music",
      advantage: "Worry-Free Usage",
    },
  ];

  // Fetch services from API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await getServices();

        if (
          response &&
          response.status === "success" &&
          response.data &&
          response.data.services
        ) {
          const transformedServices = response.data.services.map((service) => ({
            _id: service._id,
            title: service.title,
            description: service.description,
            icon: getServiceIcon(service.title, service.icon),
            features: service.features || [],
            details: service.details || service.description,
            examples: service.examples || [],
            deliveryTime: service.deliveryTime
              ? `${service.deliveryTime} business days`
              : "3-5 business days",
            revisions: service.revisions
              ? `${service.revisions} rounds included`
              : "Reasonable revisions included",
            ...service,
          }));

          setServices(transformedServices);
        } else {
          throw new Error("Invalid response format from server");
        }
      } catch (err) {
        console.error("Error fetching services:", err);
        setError("Failed to load services. Please try again later.");
        setServices([]);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Fetch statistics data
  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        setStatsLoading(true);
        const response = await getActiveStatistics();
        setStatistics(response.data?.statistics || []);
      } catch (err) {
        console.error("Error fetching statistics:", err);
        setStatistics([
          { value: "500+", title: "Videos Delivered" },
          { value: "40+", title: "Trusted Brands" },
          { value: "3+", title: "Years Experience" },
        ]);
      } finally {
        setStatsLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  // Fetch video reviews from API
  useEffect(() => {
    const fetchVideoReviews = async () => {
      try {
        setReviewsLoading(true);
        const response = await getVideoReviews();

        const transformedReviews =
          response.data?.reviews?.map((review, index) => ({
            id: review._id || review.id || index,
            name: review.userName,
            role: review.user?.role || "Client",
            company: review.user?.company || "Satisfied Client",
            videoThumbnail: getVideoThumbnail(review.video),
            review: review.content,
            rating: review.rating,
            stats: getPerformanceStats(review.rating),
            duration: getVideoDuration(review.video),
            videoUrl: review.video,
            isBest: review.isBest,
            user: review.user,
          })) || [];

        setVideoReviews(transformedReviews);
      } catch (err) {
        console.error("Error fetching video reviews:", err);
        setVideoReviews(getFallbackReviews());
      } finally {
        setReviewsLoading(false);
      }
    };

    fetchVideoReviews();
  }, []);

  // Helper functions for video reviews
  const getVideoThumbnail = (videoUrl) => {
    if (!videoUrl) return getDefaultThumbnail();
    if (videoUrl.includes("cloudinary.com")) {
      return videoUrl.replace(
        "/upload/",
        "/upload/w_600,h_400,c_fill,q_auto,f_auto/"
      );
    }
    return getDefaultThumbnail();
  };

  const getVideoDuration = (videoUrl) => {
    const durations = ["1:45", "2:30", "3:15", "4:20", "2:50"];
    return durations[Math.floor(Math.random() * durations.length)];
  };

  const getDefaultThumbnail = () => {
    const thumbnails = [
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=600&h=400&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=400&fit=crop",
    ];
    return thumbnails[Math.floor(Math.random() * thumbnails.length)];
  };

  const getPerformanceStats = (rating) => {
    const stats = {
      1: "Quality work delivered",
      2: "Good results achieved",
      3: "Great engagement boost",
      4: "Excellent editing quality",
      5: "Exceptional service delivery",
    };
    return stats[rating] || "Professional service delivered";
  };

  const getFallbackReviews = () => [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Content Creator",
      company: "Beauty Vlog",
      videoThumbnail:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=600&h=400&fit=crop",
      review:
        "I was amazed by how quickly they turned around my weekly vlog. The editing was so professional and they perfectly captured my brand's aesthetic. The color grading made my footage look cinematic!",
      rating: 5,
      stats: "3x faster delivery than my previous editor",
      duration: "2:34",
      videoUrl:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      isBest: true,
    },
    {
      id: 2,
      name: "Mike Chen",
      role: "Marketing Director",
      company: "TechStart Inc",
      videoThumbnail:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=400&fit=crop",
      review:
        "Our product launch video needed to be perfect, and they delivered beyond expectations. The attention to detail in the motion graphics and sound design was exceptional. Our engagement rates skyrocketed!",
      rating: 5,
      stats: "215% increase in engagement",
      duration: "1:45",
      videoUrl:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      isBest: false,
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Documentary Filmmaker",
      company: "Independent Films",
      videoThumbnail:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=400&fit=crop",
      review:
        "As a documentary filmmaker, storytelling is everything. They understood my vision completely and helped me craft a narrative that moved my audience. The pacing and emotional impact were perfect.",
      rating: 5,
      stats: "Film festival selection",
      duration: "3:12",
      videoUrl:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      isBest: true,
    },
  ];

  // Auto-advance video reviews
  useEffect(() => {
    if (videoReviews.length === 0) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentReviewIndex((prev) => (prev + 1) % videoReviews.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [videoReviews.length]);

  // Navigation functions
  const nextReview = () => {
    if (videoReviews.length === 0) return;
    setDirection(1);
    setCurrentReviewIndex((prev) => (prev + 1) % videoReviews.length);
  };

  const prevReview = () => {
    if (videoReviews.length === 0) return;
    setDirection(-1);
    setCurrentReviewIndex(
      (prev) => (prev - 1 + videoReviews.length) % videoReviews.length
    );
  };

  // Slide variants for smooth transitions
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  const slideTransition = {
    x: { type: "spring", stiffness: 300, damping: 30 },
    opacity: { duration: 0.2 },
  };

  // Star rating component
  const StarRating = ({ rating }) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.span
            key={star}
            className={`text-lg ${
              star <= rating ? "text-yellow-400" : "text-gray-400"
            }`}
            whileHover={{ scale: 1.2, rotate: 10 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            ★
          </motion.span>
        ))}
      </div>
    );
  };

  // Updated Video Review Component
  const VideoReviewSection = () => {
    if (reviewsLoading) {
      return (
        <div className="mb-12 sm:mb-20 text-center py-8 sm:py-12">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-6 h-6 sm:w-8 sm:h-8 border-2 border-teal-500 border-t-transparent rounded-full mx-auto"
          />
          <span className="ml-2 sm:ml-3 text-gray-600 text-sm sm:text-base">
            Loading video reviews...
          </span>
        </div>
      );
    }

    if (videoReviews.length === 0) {
      return (
        <div className="mb-12 sm:mb-20 text-center py-8 sm:py-12">
          <div className="text-gray-500 text-sm sm:text-base">
            No video reviews available yet
          </div>
          <p className="text-xs sm:text-sm text-gray-400 mt-1 sm:mt-2">
            Check back later for client video testimonials
          </p>
        </div>
      );
    }

    const currentReview = videoReviews[currentReviewIndex];

    return (
      <div className="mb-12 sm:mb-20">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
            Real Client Results
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-lg px-4">
            See how we've helped content creators and businesses achieve their
            goals with professional video editing
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-4">
          {/* Card Container */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-gray-200 shadow-xl sm:shadow-2xl overflow-hidden relative">
            {/* Navigation Buttons - Only show if multiple reviews */}
            {videoReviews.length > 1 && (
              <div
                className={`absolute top-1/2 left-3 right-3 sm:left-4 sm:right-4 transform -translate-y-1/2 flex justify-between z-10`}
              >
                <motion.button
                  onClick={prevReview}
                  className={`${
                    isMobile ? "w-8 h-8" : "w-12 h-12"
                  } bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white border border-gray-200 relative z-20`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg
                    className={`${
                      isMobile ? "w-4 h-4" : "w-6 h-6"
                    } text-gray-700`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </motion.button>

                <motion.button
                  onClick={nextReview}
                  className={`${
                    isMobile ? "w-8 h-8" : "w-12 h-12"
                  } bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white border border-gray-200 relative z-20`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg
                    className={`${
                      isMobile ? "w-4 h-4" : "w-6 h-6"
                    } text-gray-700`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </motion.button>
              </div>
            )}

            <div
              className={`grid grid-cols-1 ${
                isMobile ? "" : "lg:grid-cols-2"
              } min-h-[${isMobile ? "400px" : "500px"}] relative z-10`}
            >
              {/* Video Section */}
              <div
                className={`relative ${
                  isMobile ? "p-4" : "p-8"
                } bg-gradient-to-br from-gray-50 to-white`}
              >
                {/* Video Container with Default Player */}
                <VideoPlayer
                  videoUrl={currentReview.videoUrl}
                  thumbnail={currentReview.videoThumbnail}
                  isBest={currentReview.isBest}
                  duration={currentReview.duration}
                />

                {/* Client Info with Slide Transition */}
                <div
                  className={`mt-4 sm:mt-6 text-center ${
                    isMobile ? "h-20" : "h-24"
                  }`}
                >
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={currentReview.id}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={slideTransition}
                    >
                      <h3
                        className={`${
                          isMobile ? "text-lg" : "text-xl"
                        } font-bold text-gray-900`}
                      >
                        {currentReview.name}
                      </h3>
                      <p className="text-teal-600 font-medium text-sm sm:text-base">
                        {currentReview.role}
                      </p>
                      <p className="text-gray-500 text-xs sm:text-sm">
                        {currentReview.company}
                      </p>
                      <div className="mt-1 sm:mt-2 flex justify-center">
                        <StarRating rating={currentReview.rating} />
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Review Text Section */}
              <div
                className={`${
                  isMobile ? "p-4" : "p-8"
                } flex flex-col justify-center`}
              >
                <div className={`${isMobile ? "mb-4" : "mb-6"}`}>
                  <div className="text-teal-500 text-4xl sm:text-6xl mb-3 sm:mb-4">
                    "
                  </div>

                  {/* Review Text with Slide Transition */}
                  <div
                    className={`${isMobile ? "h-32" : "h-48"} overflow-hidden`}
                  >
                    <AnimatePresence mode="wait" custom={direction}>
                      <motion.p
                        key={currentReview.id}
                        className="text-gray-700 text-sm sm:text-lg leading-relaxed"
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={slideTransition}
                      >
                        {currentReview.review}
                      </motion.p>
                    </AnimatePresence>
                  </div>

                  {/* Stats Badge with Slide Transition */}
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={currentReview.stats}
                      className="bg-teal-50 inline-flex items-center px-3 py-1 sm:px-4 sm:py-2 rounded-full mt-3 sm:mt-4"
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={slideTransition}
                    >
                      <span className="text-teal-700 font-semibold text-xs sm:text-sm">
                        🎯 {currentReview.stats}
                      </span>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Navigation Dots and Counter - Only show if multiple reviews */}
                {videoReviews.length > 1 && (
                  <div className="flex items-center justify-between mt-4 sm:mt-8">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      {videoReviews.map((_, index) => (
                        <motion.button
                          key={index}
                          onClick={() => {
                            const newDirection =
                              index > currentReviewIndex ? 1 : -1;
                            setDirection(newDirection);
                            setCurrentReviewIndex(index);
                          }}
                          className={`${
                            isMobile ? "w-2 h-2" : "w-3 h-3"
                          } rounded-full transition-all duration-300 ${
                            index === currentReviewIndex
                              ? "bg-teal-500 scale-125"
                              : "bg-gray-300 hover:bg-gray-400"
                          }`}
                          whileHover={{ scale: 1.3 }}
                          whileTap={{ scale: 0.8 }}
                        />
                      ))}
                    </div>

                    <div className="text-gray-500 text-xs sm:text-sm">
                      {currentReviewIndex + 1} of {videoReviews.length}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Statistics functions
  const getStatisticByTitle = (title) => {
    return statistics.find((stat) =>
      stat.title.toLowerCase().includes(title.toLowerCase())
    );
  };

  const getVideosValue = () => {
    const projectStat = getStatisticByTitle("project");
    return projectStat ? `${projectStat.value}+` : "500+";
  };

  const getBrandsValue = () => {
    const brandStat = getStatisticByTitle("brand");
    return brandStat ? `${brandStat.value}+` : "40+";
  };

  const getYearsValue = () => {
    const yearStat = getStatisticByTitle("year");
    return yearStat ? `${yearStat.value}+` : "3+";
  };

  // Handle Learn More click
  const handleLearnMore = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedService(null), 300);
  };

  // Create marquee data only if we have services
  const marqueeServices = services.length > 0 ? [...services, ...services] : [];

  // Loading state for just the services section
  const renderServicesSection = () => {
    if (loading) {
      return (
        <div className="relative py-8 sm:py-12 overflow-hidden mb-12 sm:mb-20">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-400 mx-auto mb-4"></div>
              <p className="text-gray-600 text-lg">Loading services...</p>
            </div>
          </div>
        </div>
      );
    }

    if (error && services.length === 0) {
      return (
        <div className="relative py-8 sm:py-12 overflow-hidden mb-12 sm:mb-20">
          <div className="flex items-center justify-center h-64">
            <div className="text-center px-4">
              <div className="text-5xl mb-4 text-teal-400">🎬</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Services Not Available
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-teal-400 text-white rounded-lg hover:bg-teal-500 transition-colors"
              >
                Refresh
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (!loading && services.length === 0) {
      return (
        <div className="relative py-8 sm:py-12 overflow-hidden mb-12 sm:mb-20">
          <div className="flex items-center justify-center h-64">
            <div className="text-center px-4">
              <div className="text-5xl mb-4 text-teal-400">🎬</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                No Services Available
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                We're currently updating our service offerings. Please check
                back soon or contact us for custom projects.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-teal-400 text-white rounded-lg hover:bg-teal-500 transition-colors"
              >
                Refresh
              </button>
            </div>
          </div>
        </div>
      );
    }

    // Normal services marquee rendering when we have services
    return (
      <div className="relative py-8 sm:py-12 overflow-hidden mb-12 sm:mb-20">
        {/* Single Marquee for Mobile, Double for Desktop */}
        <div className="hidden sm:block">
          {/* Top Marquee - Desktop Only */}
          <div className="flex mb-6">
            <div className="flex space-x-4 sm:space-x-5 animate-marquee-left">
              {marqueeServices
                .slice(0, Math.min(8, marqueeServices.length))
                .map((service, index) => (
                  <motion.div
                    key={`${service._id}-top-${index}`}
                    className="flex-shrink-0 w-[300px] sm:w-[380px]"
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-teal-200 shadow-lg sm:shadow-xl shadow-teal-100 relative overflow-hidden h-full min-h-[180px] sm:min-h-[220px] flex flex-col group hover:shadow-xl sm:hover:shadow-2xl hover:border-teal-300 transition-all duration-300">
                      <div className="relative z-10 flex flex-col items-center h-full text-center">
                        {/* Icon Container */}
                        <motion.div
                          className="p-3 sm:p-4 bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg shadow-teal-100 mb-3 sm:mb-4 border border-teal-200"
                          whileHover={{
                            scale: 1.05,
                            rotate: window.innerWidth >= 640 ? 5 : 0,
                          }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <div className="text-teal-500">{service.icon}</div>
                        </motion.div>

                        {/* Title */}
                        <h3 className="mb-2 sm:mb-3 text-base sm:text-lg font-bold leading-tight tracking-tight text-gray-800 group-hover:text-teal-600 transition-colors duration-300">
                          {service.title}
                        </h3>

                        {/* Accent Line */}
                        <div className="w-12 sm:w-16 h-0.5 sm:h-1 bg-gradient-to-r from-teal-400 to-teal-500 rounded-full mb-3 sm:mb-4" />

                        {/* Description */}
                        <p className="flex-1 text-xs sm:text-sm font-light leading-relaxed text-gray-600">
                          {service.description}
                        </p>

                        {/* Learn More Button */}
                        <motion.button
                          className="mt-3 sm:mt-4 px-3 py-1.5 sm:px-4 sm:py-2 bg-teal-50 text-teal-600 rounded-lg text-xs sm:text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 border border-teal-200 hover:bg-teal-100 hover:border-teal-300"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleLearnMore(service)}
                        >
                          Learn More
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>

          {/* Bottom Marquee - Desktop Only */}
          <div className="flex">
            <div className="flex space-x-4 sm:space-x-5 animate-marquee-right">
              {marqueeServices
                .slice(
                  Math.min(4, marqueeServices.length),
                  Math.min(12, marqueeServices.length)
                )
                .map((service, index) => (
                  <motion.div
                    key={`${service._id}-bottom-${index}`}
                    className="flex-shrink-0 w-[300px] sm:w-[380px]"
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-teal-200 shadow-lg sm:shadow-xl shadow-teal-100 relative overflow-hidden h-full min-h-[180px] sm:min-h-[220px] flex flex-col group hover:shadow-xl sm:hover:shadow-2xl hover:border-teal-300 transition-all duration-300">
                      <div className="relative z-10 flex flex-col items-center h-full text-center">
                        {/* Icon Container */}
                        <motion.div
                          className="p-3 sm:p-4 bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg shadow-teal-100 mb-3 sm:mb-4 border border-teal-200"
                          whileHover={{
                            scale: 1.05,
                            rotate: window.innerWidth >= 640 ? -5 : 0,
                          }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <div className="text-teal-500">{service.icon}</div>
                        </motion.div>

                        {/* Title */}
                        <h3 className="mb-2 sm:mb-3 text-base sm:text-lg font-bold leading-tight tracking-tight text-gray-800 group-hover:text-teal-600 transition-colors duration-300">
                          {service.title}
                        </h3>

                        {/* Accent Line */}
                        <div className="w-12 sm:w-16 h-0.5 sm:h-1 bg-gradient-to-r from-teal-400 to-teal-500 rounded-full mb-3 sm:mb-4" />

                        {/* Description */}
                        <p className="flex-1 text-xs sm:text-sm font-light leading-relaxed text-gray-600">
                          {service.description}
                        </p>

                        {/* Learn More Button */}
                        <motion.button
                          className="mt-3 sm:mt-4 px-3 py-1.5 sm:px-4 sm:py-2 bg-teal-50 text-teal-600 rounded-lg text-xs sm:text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 border border-teal-200 hover:bg-teal-100 hover:border-teal-300"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleLearnMore(service)}
                        >
                          Learn More
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        </div>

        {/* Single Marquee for Mobile */}
        <div className="sm:hidden">
          <div className="flex">
            <div className="flex space-x-4 animate-marquee-left">
              {marqueeServices
                .slice(0, Math.min(6, marqueeServices.length))
                .map((service, index) => (
                  <motion.div
                    key={`${service._id}-mobile-${index}`}
                    className="flex-shrink-0 w-[280px]"
                  >
                    <div className="bg-white rounded-xl p-4 border border-teal-200 shadow-lg shadow-teal-100 relative overflow-hidden h-full min-h-[160px] flex flex-col group">
                      <div className="relative z-10 flex flex-col items-center h-full text-center">
                        {/* Icon Container */}
                        <div className="p-3 bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl shadow-md shadow-teal-100 mb-3 border border-teal-200">
                          <div className="text-teal-500">{service.icon}</div>
                        </div>

                        {/* Title */}
                        <h3 className="mb-2 text-sm font-bold leading-tight tracking-tight text-gray-800">
                          {service.title}
                        </h3>

                        {/* Accent Line */}
                        <div className="w-12 h-0.5 bg-gradient-to-r from-teal-400 to-teal-500 rounded-full mb-2" />

                        {/* Description */}
                        <p className="flex-1 text-xs font-light leading-relaxed text-gray-600">
                          {service.description}
                        </p>

                        {/* Learn More Button */}
                        <motion.button
                          className="mt-2 px-3 py-1.5 bg-teal-50 text-teal-600 rounded-lg text-xs border border-teal-200 hover:bg-teal-100 hover:border-teal-300"
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleLearnMore(service)}
                        >
                          Learn More
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        </div>

        {/* Gradient Overlays */}
        <div className="absolute top-0 left-0 z-20 w-16 sm:w-32 h-full pointer-events-none bg-gradient-to-r from-white to-transparent" />
        <div className="absolute top-0 right-0 z-20 w-16 sm:w-32 h-full pointer-events-none bg-gradient-to-l from-white to-transparent" />
      </div>
    );
  };

  return (
    <div className="relative min-h-screen w-full bg-white flex flex-col items-center justify-center pt-16 sm:pt-20 pb-8 sm:pb-10 overflow-hidden">
      {/* Subtle Teal Gradient Orbs Background - Mobile Optimized */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top Left */}
        <motion.div
          className="absolute top-10 sm:top-20 left-10 sm:left-20 w-48 h-48 sm:w-80 sm:h-80 bg-gradient-to-r from-teal-100/10 to-teal-200/10 sm:from-teal-100/15 sm:to-teal-200/15 rounded-full blur-2xl sm:blur-3xl"
          animate={{
            x: [0, 40, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Top Right */}
        <motion.div
          className="absolute top-16 sm:top-32 right-16 sm:right-32 w-40 h-40 sm:w-72 sm:h-72 bg-gradient-to-r from-teal-200/15 to-teal-300/15 sm:from-teal-200/20 sm:to-teal-300/20 rounded-full blur-2xl sm:blur-3xl"
          animate={{
            x: [0, -35, 0],
            y: [0, 25, 0],
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Bottom Left */}
        <motion.div
          className="absolute bottom-20 sm:bottom-40 left-20 sm:left-40 w-56 h-56 sm:w-96 sm:h-96 bg-gradient-to-r from-teal-300/10 to-teal-400/10 sm:from-teal-300/15 sm:to-teal-400/15 rounded-full blur-2xl sm:blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, 35, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Center */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-r from-teal-100/5 to-teal-200/5 sm:from-teal-100/10 sm:to-teal-200/10 rounded-full blur-2xl sm:blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Floating App Logos */}
      <FloatingAppLogos />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-3 sm:px-4 py-8 sm:py-12">
        {/* Header Section */}
        <div className="mb-8 sm:mb-12">
          <SectionHeader
            subtitle="Core services"
            title="Types of work"
            highlight="‍We do"
            description="Professional video editing services tailored to your unique needs and vision"
            center={true}
            titleSize="xl"
            titleWeight="normal"
            descriptionSize="base"
            lineSpacing="tight"
            highlightColor="teal-500"
            dotColor="teal-500"
          />
        </div>

        {/* Services Marquee Section - Now contains loading/error/empty states */}
        {renderServicesSection()}

        {/* ===== WHY WE'RE DIFFERENT SECTION ===== */}
        <motion.div
          className="mb-12 sm:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-8 sm:mb-12">
            <SectionHeader
              subtitle="Why We're Different"
              title="Video Editing That "
              highlight="Actually Delivers"
              description="While other editors make promises, we deliver results. Faster turnaround, better communication, and features that actually matter to content creators."
              center={true}
              titleSize={isMobile ? "xl" : "2xl"}
              descriptionSize={isMobile ? "base" : "lg"}
              lineSpacing="tight"
              highlightColor="teal-500"
              dotColor="teal-500"
              highlightOnNewLine={false}
            />
          </div>

          {/* Differentiator Cards - Responsive grid */}
          <div
            className={`grid grid-cols-1 ${
              isMobile ? "gap-4" : "md:grid-cols-2 lg:grid-cols-4 gap-6"
            } mb-12 sm:mb-16`}
          >
            {differentiators.map((item, index) => (
              <AnimatedLogoCard key={index} item={item} index={index} />
            ))}
          </div>

          {/* Comparison Section */}
          <motion.div
            className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-gray-200 shadow-lg sm:shadow-xl p-4 sm:p-8 mb-12 sm:mb-16 relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-2 relative z-10">
              The Real Difference
            </h2>
            <p className="text-gray-600 text-center mb-6 sm:mb-8 max-w-2xl mx-auto text-sm sm:text-base relative z-10 px-2">
              See how we solve the biggest frustrations content creators face
              with other editors
            </p>

            <div
              className={`grid grid-cols-1 ${
                isMobile ? "gap-4" : "md:grid-cols-2 lg:grid-cols-4 gap-6"
              } relative z-10`}
            >
              {comparisonData.map((item, index) => (
                <AnimatedComparisonCard key={index} item={item} index={index} />
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Video Reviews Section */}
        <VideoReviewSection />

        {/* Statistics Section */}
        {!statsLoading && (
          <motion.div
            className={`grid grid-cols-1 ${
              isMobile ? "gap-4" : "md:grid-cols-3 gap-8"
            } mb-12 sm:mb-20`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            {/* Stat 1 - Videos Delivered */}
            <motion.div
              className="text-center p-6 sm:p-8 bg-white rounded-xl sm:rounded-2xl border border-teal-100 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
              whileHover={{
                y: isMobile ? -2 : -5,
                borderColor: "rgba(20, 184, 166, 0.3)",
                transition: { duration: 0.3 },
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-teal-50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="text-4xl sm:text-5xl font-bold text-teal-600 mb-2">
                  {getVideosValue()}
                </div>
                <div className="text-gray-600 font-light tracking-wide text-sm sm:text-base">
                  Videos Delivered
                </div>
              </div>
            </motion.div>

            {/* Stat 2 - Trusted Brands */}
            <motion.div
              className="text-center p-6 sm:p-8 bg-white rounded-xl sm:rounded-2xl border border-emerald-100 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
              whileHover={{
                y: isMobile ? -2 : -5,
                borderColor: "rgba(16, 185, 129, 0.3)",
                transition: { duration: 0.3 },
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="text-4xl sm:text-5xl font-bold text-emerald-600 mb-2">
                  {getBrandsValue()}
                </div>
                <div className="text-gray-600 font-light tracking-wide text-sm sm:text-base">
                  Trusted Brands
                </div>
              </div>
            </motion.div>

            {/* Stat 3 - Years Experience */}
            <motion.div
              className="text-center p-6 sm:p-8 bg-white rounded-xl sm:rounded-2xl border border-green-100 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
              whileHover={{
                y: isMobile ? -2 : -5,
                borderColor: "rgba(34, 197, 94, 0.3)",
                transition: { duration: 0.3 },
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="text-4xl sm:text-5xl font-bold text-green-600 mb-2">
                  {getYearsValue()}
                </div>
                <div className="text-gray-600 font-light tracking-wide text-sm sm:text-base">
                  Years Experience
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* CTA Section - Mobile Optimized */}
        <motion.div
          className="bg-gradient-to-r from-teal-50 to-teal-100 border border-teal-200 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 text-center relative overflow-hidden shadow-lg"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 sm:mb-4"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Ready to Elevate Your Content?
          </motion.h2>

          <motion.p
            className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto mb-4 sm:mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Let's discuss your project and create something extraordinary
            together.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.button
              className="px-6 py-2.5 sm:px-8 sm:py-3 bg-gradient-to-r from-teal-400 to-teal-500 text-white font-medium rounded-full text-sm sm:text-base shadow-lg hover:shadow-teal-200"
              whileHover={{ scale: window.innerWidth >= 640 ? 1.05 : 1 }}
              whileTap={{ scale: 0.95 }}
            >
              Start a Project
            </motion.button>

            <motion.button
              className="px-6 py-2.5 sm:px-8 sm:py-3 border border-teal-300 text-teal-600 font-medium rounded-full text-sm sm:text-base bg-white/80 backdrop-blur-sm shadow-lg hover:border-teal-400"
              whileHover={{
                scale: window.innerWidth >= 640 ? 1.05 : 1,
                backgroundColor: "rgba(45, 212, 191, 0.1)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              Book a Consultation
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Service Detail Modal - Mobile Optimized */}
      <AnimatePresence>
        {isModalOpen && selectedService && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50 p-3 sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="bg-white rounded-xl sm:rounded-2xl border border-teal-200 max-w-2xl w-full max-h-[85vh] sm:max-h-[90vh] overflow-y-auto shadow-xl sm:shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 sm:p-6">
                <div className="flex justify-between items-start mb-4 sm:mb-6">
                  <div>
                    <div className="text-2xl sm:text-4xl mb-1 sm:mb-2 text-teal-500">
                      {selectedService.icon}
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                      {selectedService.title}
                    </h2>
                  </div>
                  <button
                    className="text-gray-500 hover:text-gray-700 transition-colors p-1"
                    onClick={closeModal}
                  >
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <div className="mb-4 sm:mb-6">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
                    Service Overview
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    {selectedService.details}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
                      Features
                    </h3>
                    <ul className="space-y-1 sm:space-y-2">
                      {selectedService.features?.map((feature, i) => (
                        <li
                          key={i}
                          className="text-teal-500 text-xs sm:text-sm flex items-center"
                        >
                          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-teal-400 rounded-full mr-2 flex-shrink-0" />
                          <span className="truncate">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
                      Project Examples
                    </h3>
                    <ul className="space-y-1 sm:space-y-2">
                      {selectedService.examples?.map((example, i) => (
                        <li
                          key={i}
                          className="text-gray-600 text-xs sm:text-sm flex items-center"
                        >
                          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-teal-300 rounded-full mr-2 flex-shrink-0" />
                          <span className="truncate">{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
                      Delivery Time
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base">
                      {selectedService.deliveryTime}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
                      Revisions
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base">
                      {selectedService.revisions}
                    </p>
                  </div>
                </div>

                <motion.button
                  className="w-full py-2.5 sm:py-3 bg-gradient-to-r from-teal-400 to-teal-500 text-white font-medium rounded-lg text-sm sm:text-base shadow-lg hover:shadow-teal-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Discuss This Service
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes marquee-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes marquee-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-marquee-left {
          animation: marquee-left 40s linear infinite;
        }

        .animate-marquee-right {
          animation: marquee-right 40s linear infinite;
        }

        @media (max-width: 640px) {
          .animate-marquee-left {
            animation: marquee-left 30s linear infinite;
          }
        }
      `}</style>
    </div>
  );
};

export default Services;
