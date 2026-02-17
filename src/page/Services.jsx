import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";
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

// Custom hook for responsive design
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = (e) => setMatches(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
};

// Icon mapping for services - memoized
const serviceIcons = {
  "YouTube Videos": <FaYoutube className="w-4 h-4 sm:w-6 sm:h-6" />,
  "Short Form Video": <GiFilmSpool className="w-4 h-4 sm:w-6 sm:h-6" />,
  "SaaS Video": <FaCube className="w-4 h-4 sm:w-6 sm:h-6" />,
  "Ad Creatives & VSLs": <FaRocket className="w-4 h-4 sm:w-6 sm:h-6" />,
  "Demo Videos": <FaVideo className="w-4 h-4 sm:w-6 sm:h-6" />,
  Podcasts: <FaRegLightbulb className="w-4 h-4 sm:w-6 sm:h-6" />,
  "Reels Video": <FaFilm className="w-4 h-4 sm:w-6 sm:h-6" />,
  "Motion Graphics": <FaMagic className="w-4 h-4 sm:w-6 sm:h-6" />,
  premium: <FaVideo className="w-4 h-4 sm:w-6 sm:h-6" />,
  default: <FaVideo className="w-4 h-4 sm:w-6 sm:h-6" />,
};

// Function to get icon for service
const getServiceIcon = (serviceTitle, serviceIcon) => {
  if (serviceIcon) {
    return <span className="text-lg sm:text-2xl">{serviceIcon}</span>;
  }
  return serviceIcons[serviceTitle] || serviceIcons.default;
};

// Floating App Logos Component - Fixed: Hooks called before any conditional returns
const FloatingAppLogos = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const videoTools = useMemo(
    () => [
      { name: "DaVinci Resolve", logo: davinchi },
      { name: "Premier Pro", logo: premier },
      { name: "Final Cut Pro", logo: final_cut },
      { name: "CapCut", logo: cap_cut },
      { name: "After Effects", logo: after_effect },
      { name: "Blender", logo: blender },
    ],
    []
  );

  // Generate positions for desktop only
  const getRandomPosition = (index) => {
    const desktopPositions = [
      { top: "15%", left: "8%", scale: 0.6 },
      { top: "22%", right: "12%", scale: 0.8 },
      { top: "65%", left: "6%", scale: 0.7 },
      { bottom: "20%", right: "8%", scale: 1.0 },
      { top: "42%", right: "5%", scale: 0.5 },
      { bottom: "32%", left: "20%", scale: 0.9 },
    ];
    return desktopPositions[index % desktopPositions.length];
  };

  // Return null after all hooks are called
  if (isMobile) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-25">
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
            }}
            transition={{
              duration: 12 + Math.random() * 6,
              repeat: Infinity,
              delay: index * 1,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <div className="relative bg-gradient-to-br from-white/30 to-white/12 backdrop-blur-xl rounded-lg p-2 border border-white/40 shadow-md">
              <img
                src={tool.logo}
                alt={tool.name}
                className="w-10 h-10 object-contain"
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

// Responsive Animated Logo Cards for Differentiators - Optimized
const AnimatedLogoCard = React.memo(({ item, index }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <motion.div
      className={`relative p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 ${item.borderColor} ${item.bgColor} backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={!isMobile ? { scale: 1.02, y: -5 } : {}}
      whileTap={isMobile ? { scale: 0.98 } : {}}
    >
      {/* Metric Badge */}
      <div
        className={`absolute font-poppins -top-2 -right-2 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-gradient-to-r ${item.color} text-white text-xs sm:text-sm font-bold shadow-lg z-10`}
      >
        {item.metric}
      </div>

      {/* Icon */}
      <div className="text-2xl sm:text-4xl mb-2 sm:mb-4 relative z-10">
        {item.icon}
      </div>

      {/* Title */}
      <h3 className="text-base sm:text-xl font-anton font-bold text-gray-900 mb-1 sm:mb-3 relative z-10">
        {item.title}
      </h3>

      {/* Description */}
      <p className="text-gray-700 font-poppins text-xs sm:text-sm leading-relaxed relative z-10">
        {item.description}
      </p>
    </motion.div>
  );
});

// Responsive Animated Comparison Card - Optimized
const AnimatedComparisonCard = React.memo(({ item, index }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <motion.div
      className="text-center p-4 sm:p-6 bg-gradient-to-br from-white to-gray-50 rounded-xl sm:rounded-2xl border border-gray-100 hover:border-teal-200 transition-all duration-300 relative overflow-hidden hover:shadow-lg"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={!isMobile ? { scale: 1.03 } : {}}
      whileTap={isMobile ? { scale: 0.98 } : {}}
    >
      <div className="text-xs sm:text-sm text-gray-500 mb-2 font-medium relative z-10 uppercase tracking-wide">
        {item.aspect}
      </div>

      <div className="flex items-center justify-between mb-2 relative z-10">
        <div className="text-center flex-1">
          <div className="text-xs text-gray-400 mb-1">Others</div>
          <div className="text-xs sm:text-sm text-gray-600 line-through font-medium px-2 py-1 bg-gray-100 rounded-lg">
            {item.others}
          </div>
        </div>

        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-teal-500 to-teal-600 flex items-center justify-center mx-1 sm:mx-2 flex-shrink-0 shadow-md">
          <svg
            className="w-3 h-3 sm:w-4 sm:h-4 text-white"
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
        </div>

        <div className="text-center flex-1">
          <div className="text-xs text-teal-600 font-medium mb-1">We Offer</div>
          <div className="text-xs sm:text-sm font-semibold text-gray-900 px-2 py-1 bg-teal-50 rounded-lg border border-teal-100">
            {item.you}
          </div>
        </div>
      </div>

      {/* Advantage text */}
      <div className="mt-3 pt-2 border-t border-gray-100">
        <div className="inline-block px-3 py-1 sm:px-4 sm:py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg text-xs sm:text-sm font-bold relative z-10 shadow-md">
          {item.advantage}
        </div>
      </div>
    </motion.div>
  );
});

// Video Player Component - Optimized
const VideoPlayer = React.memo(({ videoUrl, thumbnail, isBest, duration }) => {
  const videoRef = useRef(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div
      className={`relative rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-2xl ${
        isMobile ? "h-40" : "h-64 lg:h-80"
      } bg-black`}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        poster={thumbnail}
        controls
        controlsList="nodownload"
        preload="metadata"
        playsInline
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Best Review Badge */}
      {isBest && (
        <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-yellow-500 text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium z-10">
          ⭐ Featured
        </div>
      )}

      {/* Video Duration */}
      <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 bg-black/80 text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded text-xs sm:text-sm">
        {duration}
      </div>
    </div>
  );
});

// Star rating component - Optimized
const StarRating = React.memo(({ rating }) => {
  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`text-sm sm:text-lg ${
            star <= rating ? "text-yellow-400" : "text-gray-300"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
});

// Service Card Component - Fixed: Hooks called before any conditional returns
const ServiceCard = React.memo(({ service, onLearnMore, isMobile = false }) => {
  // All hooks at the top
  const handleClick = useCallback(() => {
    onLearnMore(service);
  }, [onLearnMore, service]);

  return (
    <div className="bg-white rounded-xl p-4 border border-teal-200 shadow-lg shadow-teal-100 relative overflow-hidden h-full min-h-[160px] sm:min-h-[200px] flex flex-col group">
      <div className="relative z-10 flex flex-col items-center h-full text-center">
        {/* Icon Container */}
        <div className="p-2 sm:p-3 bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg sm:rounded-xl shadow-md mb-2 sm:mb-3 border border-teal-200">
          <div className="text-teal-500">{service.icon}</div>
        </div>

        {/* Title */}
        <h3 className="mb-1 sm:mb-2 text-sm sm:text-base font-anton font-bold text-gray-800 group-hover:text-teal-600 transition-colors">
          {service.title}
        </h3>

        {/* Accent Line */}
        <div className="w-10 h-0.5 bg-gradient-to-r from-teal-400 to-teal-500 rounded-full mb-2 sm:mb-3" />

        {/* Description */}
        <p className="flex-1 text-xs font-light leading-relaxed text-gray-600 line-clamp-2">
          {service.description}
        </p>

        {/* Learn More Button */}
        <button
          className={`mt-2 px-3 py-1 bg-teal-50 text-teal-600 rounded-lg text-xs border border-teal-200 hover:bg-teal-100 transition-colors ${
            !isMobile ? "opacity-0 group-hover:opacity-100" : ""
          }`}
          onClick={handleClick}
        >
          Learn More
        </button>
      </div>
    </div>
  );
});

// Main Services Component
const Services = () => {
  // All hooks at the top level - NO CONDITIONAL RETURNS BEFORE HOOKS
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [videoReviews, setVideoReviews] = useState([]);
  const [statistics, setStatistics] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const isMobile = useMediaQuery("(max-width: 768px)");
  const autoPlayRef = useRef();

  // Real Differentiators - Memoized
  const differentiators = useMemo(
    () => [
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
          "Work directly with your editor via live chat and screen sharing.",
        metric: "Live Editing",
        color: "from-blue-500 to-cyan-500",
        borderColor: "border-blue-200",
        bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50",
      },
      {
        icon: "🔄",
        title: "Flexible Revisions",
        description:
          "We offer reasonable revision rounds to ensure your complete satisfaction.",
        metric: "Quality Focused",
        color: "from-purple-500 to-indigo-500",
        borderColor: "border-purple-200",
        bgColor: "bg-gradient-to-br from-purple-50 to-indigo-50",
      },
      {
        icon: "🎵",
        title: "Copyright-Free Music",
        description:
          "Access to premium, copyright-free music libraries for worry-free usage.",
        metric: "Safe Music",
        color: "from-orange-500 to-amber-500",
        borderColor: "border-orange-200",
        bgColor: "bg-gradient-to-br from-orange-50 to-amber-50",
      },
    ],
    []
  );

  // Real Comparison - Memoized
  const comparisonData = useMemo(
    () => [
      {
        aspect: "Delivery Time",
        you: "24-48 hours",
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
        others: "Limited/extra cost",
        advantage: "Better Value",
      },
      {
        aspect: "Music Rights",
        you: "Copyright-free",
        others: "You provide music",
        advantage: "Worry-Free Usage",
      },
    ],
    []
  );

  // Fetch services from API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await getServices();

        if (response?.status === "success" && response.data?.services) {
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
        "/upload/w_400,h_300,c_fill,q_auto,f_auto/"
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
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=300&fit=crop",
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
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=300&fit=crop",
      review:
        "I was amazed by how quickly they turned around my weekly vlog. The editing was so professional and they perfectly captured my brand's aesthetic.",
      rating: 5,
      stats: "3x faster delivery",
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
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300&fit=crop",
      review:
        "Our product launch video needed to be perfect, and they delivered beyond expectations. The attention to detail was exceptional.",
      rating: 5,
      stats: "215% engagement increase",
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
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=300&fit=crop",
      review:
        "They understood my vision completely and helped me craft a narrative that moved my audience. The emotional impact was perfect.",
      rating: 5,
      stats: "Film festival selection",
      duration: "3:12",
      videoUrl:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      isBest: true,
    },
  ];

  // Auto-advance video reviews - Only on desktop
  useEffect(() => {
    if (videoReviews.length === 0 || isMobile) return;

    autoPlayRef.current = setInterval(() => {
      setDirection(1);
      setCurrentReviewIndex((prev) => (prev + 1) % videoReviews.length);
    }, 6000);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [videoReviews.length, isMobile]);

  // Navigation functions
  const nextReview = useCallback(() => {
    if (videoReviews.length === 0) return;
    setDirection(1);
    setCurrentReviewIndex((prev) => (prev + 1) % videoReviews.length);
  }, [videoReviews.length]);

  const prevReview = useCallback(() => {
    if (videoReviews.length === 0) return;
    setDirection(-1);
    setCurrentReviewIndex(
      (prev) => (prev - 1 + videoReviews.length) % videoReviews.length
    );
  }, [videoReviews.length]);

  // Handle Learn More click
  const handleLearnMore = useCallback((service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  }, []);

  // Close modal
  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedService(null), 300);
  }, []);

  // Statistics functions
  const getStatisticByTitle = useCallback(
    (title) => {
      return statistics.find((stat) =>
        stat.title.toLowerCase().includes(title.toLowerCase())
      );
    },
    [statistics]
  );

  const getVideosValue = useCallback(() => {
    const projectStat = getStatisticByTitle("project");
    return projectStat ? `${projectStat.value}+` : "500+";
  }, [getStatisticByTitle]);

  const getBrandsValue = useCallback(() => {
    const brandStat = getStatisticByTitle("brand");
    return brandStat ? `${brandStat.value}+` : "40+";
  }, [getStatisticByTitle]);

  const getYearsValue = useCallback(() => {
    const yearStat = getStatisticByTitle("year");
    return yearStat ? `${yearStat.value}+` : "3+";
  }, [getStatisticByTitle]);

  // Create marquee data
  const marqueeServices = useMemo(
    () => (services.length > 0 ? [...services, ...services] : []),
    [services]
  );

  // Slide variants for transitions
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? (isMobile ? 200 : 300) : -(isMobile ? 200 : 300),
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (direction) => ({
      x: direction > 0 ? -(isMobile ? 200 : 300) : isMobile ? 200 : 300,
      opacity: 0,
    }),
  };

  const slideTransition = {
    x: { type: "spring", stiffness: 300, damping: 30 },
    opacity: { duration: 0.2 },
  };

  // Video Review Section Component
  const VideoReviewSection = useCallback(() => {
    if (reviewsLoading) {
      return (
        <div className="mb-8 sm:mb-20 text-center py-6 sm:py-12">
          <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-teal-400 mx-auto mb-2"></div>
          <span className="text-gray-600 text-sm sm:text-base">
            Loading video reviews...
          </span>
        </div>
      );
    }

    if (videoReviews.length === 0) {
      return (
        <div className="mb-8 sm:mb-20 text-center py-6 sm:py-12">
          <div className="text-gray-500 text-sm sm:text-base">
            No video reviews available yet
          </div>
        </div>
      );
    }

    const currentReview = videoReviews[currentReviewIndex];

    return (
      <div className="mb-8 sm:mb-20">
        <div className="text-center mb-6 sm:mb-12">
          <h2 className="text-xl sm:text-3xl font-anton font-bold text-gray-900 mb-2 sm:mb-4">
            Real Client Results
          </h2>
          <p className="text-gray-600 font-poppins max-w-2xl mx-auto text-sm sm:text-lg px-4">
            See how we've helped content creators and businesses achieve their
            goals
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-2 sm:px-4">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-3xl border border-gray-200 shadow-xl sm:shadow-2xl overflow-hidden relative">
            {/* Navigation Buttons */}
            {videoReviews.length > 1 && !isMobile && (
              <div className="absolute top-1/2 left-2 right-2 transform -translate-y-1/2 flex justify-between z-10">
                <button
                  onClick={prevReview}
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white border border-gray-200"
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700"
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
                </button>
                <button
                  onClick={nextReview}
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white border border-gray-200"
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700"
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
                </button>
              </div>
            )}

            <div
              className={`grid grid-cols-1 ${isMobile ? "" : "lg:grid-cols-2"}`}
            >
              {/* Video Section */}
              <div
                className={`relative ${
                  isMobile ? "p-3" : "p-6 sm:p-8"
                } bg-gradient-to-br from-gray-50 to-white`}
              >
                <VideoPlayer
                  videoUrl={currentReview.videoUrl}
                  thumbnail={currentReview.videoThumbnail}
                  isBest={currentReview.isBest}
                  duration={currentReview.duration}
                />

                <div
                  className={`mt-3 sm:mt-6 text-center ${
                    isMobile ? "h-16" : "h-20"
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
                          isMobile ? "text-sm" : "text-lg sm:text-xl"
                        } font-bold text-gray-900 font-anton`}
                      >
                        {currentReview.name}
                      </h3>
                      <p className="text-teal-600 font-poppins font-medium text-xs sm:text-sm">
                        {currentReview.role}
                      </p>
                      <p className="text-gray-500 font-poppins text-xs hidden sm:block">
                        {currentReview.company}
                      </p>
                      <div className="mt-1 flex justify-center">
                        <StarRating rating={currentReview.rating} />
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Review Text Section */}
              <div
                className={`${
                  isMobile ? "p-3" : "p-6 sm:p-8"
                } flex flex-col justify-center`}
              >
                <div className={`${isMobile ? "mb-2" : "mb-4"}`}>
                  <div className="text-teal-500 text-3xl sm:text-5xl mb-2 sm:mb-4">
                    "
                  </div>

                  <div
                    className={`${
                      isMobile ? "h-24" : "h-32 sm:h-40"
                    } overflow-hidden font-poppins`}
                  >
                    <AnimatePresence mode="wait" custom={direction}>
                      <motion.p
                        key={currentReview.id}
                        className="text-gray-700 text-xs sm:text-base leading-relaxed"
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

                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={currentReview.stats}
                      className="bg-teal-50 inline-flex items-center px-2 py-0.5 sm:px-3 sm:py-1 rounded-full mt-2 sm:mt-3"
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={slideTransition}
                    >
                      <span className="text-teal-700 font-semibold text-xs">
                        🎯 {currentReview.stats}
                      </span>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Navigation Dots - Mobile Only */}
                {videoReviews.length > 1 && isMobile && (
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-2">
                      {videoReviews.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            const newDirection =
                              index > currentReviewIndex ? 1 : -1;
                            setDirection(newDirection);
                            setCurrentReviewIndex(index);
                          }}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            index === currentReviewIndex
                              ? "bg-teal-500 w-4"
                              : "bg-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-gray-500 text-xs">
                      {currentReviewIndex + 1}/{videoReviews.length}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }, [
    reviewsLoading,
    videoReviews,
    currentReviewIndex,
    direction,
    isMobile,
    slideVariants,
    slideTransition,
    nextReview,
    prevReview,
  ]);

  // Services Marquee Section
  const renderServicesSection = useCallback(() => {
    if (loading) {
      return (
        <div className="relative py-6 sm:py-12 overflow-hidden mb-8 sm:mb-20">
          <div className="flex items-center justify-center h-48">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-teal-400 mx-auto mb-3"></div>
              <p className="text-gray-600 text-sm sm:text-base">
                Loading services...
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (error && services.length === 0) {
      return (
        <div className="relative py-6 sm:py-12 overflow-hidden mb-8 sm:mb-20">
          <div className="flex items-center justify-center h-48">
            <div className="text-center px-4">
              <div className="text-4xl mb-3 text-teal-400">🎬</div>
              <p className="text-gray-600 text-sm sm:text-base max-w-md mx-auto">
                {error}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-teal-400 text-white rounded-lg text-sm hover:bg-teal-500 transition-colors"
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
        <div className="relative py-6 sm:py-12 overflow-hidden mb-8 sm:mb-20">
          <div className="flex items-center justify-center h-48">
            <div className="text-center px-4">
              <div className="text-4xl mb-3 text-teal-400">🎬</div>
              <p className="text-gray-600 text-sm sm:text-base mb-3">
                No services available. Please check back soon.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-teal-400 text-white rounded-lg text-sm hover:bg-teal-500 transition-colors"
              >
                Refresh
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="relative py-6 sm:py-12 overflow-hidden mb-8 sm:mb-20">
        {/* Single Marquee for Mobile, Double for Desktop */}
        {!isMobile ? (
          <>
            {/* Top Marquee - Desktop */}
            <div className="flex mb-4">
              <div className="flex space-x-4 animate-marquee-left">
                {marqueeServices.slice(0, 8).map((service, index) => (
                  <div
                    key={`${service._id}-top-${index}`}
                    className="flex-shrink-0 w-[280px] sm:w-[320px]"
                  >
                    <ServiceCard
                      service={service}
                      onLearnMore={handleLearnMore}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Marquee - Desktop */}
            <div className="flex">
              <div className="flex space-x-4 animate-marquee-right">
                {marqueeServices.slice(4, 12).map((service, index) => (
                  <div
                    key={`${service._id}-bottom-${index}`}
                    className="flex-shrink-0 w-[280px] sm:w-[320px]"
                  >
                    <ServiceCard
                      service={service}
                      onLearnMore={handleLearnMore}
                    />
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          /* Single Marquee for Mobile */
          <div className="flex">
            <div className="flex space-x-3 animate-marquee-left">
              {marqueeServices.slice(0, 6).map((service, index) => (
                <div
                  key={`${service._id}-mobile-${index}`}
                  className="flex-shrink-0 w-[240px]"
                >
                  <ServiceCard
                    service={service}
                    onLearnMore={handleLearnMore}
                    isMobile={true}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Gradient Overlays */}
        <div className="absolute top-0 left-0 z-20 w-12 sm:w-32 h-full pointer-events-none bg-gradient-to-r from-white to-transparent" />
        <div className="absolute top-0 right-0 z-20 w-12 sm:w-32 h-full pointer-events-none bg-gradient-to-l from-white to-transparent" />
      </div>
    );
  }, [loading, error, services, marqueeServices, isMobile, handleLearnMore]);

  // Loading state - AFTER all hooks
  if (loading && services.length === 0) {
    return (
      <div className="relative min-h-screen w-full bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-4 border-teal-500/30 border-t-teal-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-sm sm:text-base">
            Loading services...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen font-poppins w-full bg-white flex flex-col items-center justify-center pt-12 sm:pt-20 pb-6 sm:pb-10 overflow-hidden">
      {/* Subtle Background - Simplified on mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 sm:w-80 h-32 sm:h-80 bg-gradient-to-r from-teal-100/10 to-teal-200/10 rounded-full blur-2xl sm:blur-3xl" />
        <div className="absolute bottom-10 right-10 w-40 sm:w-96 h-40 sm:h-96 bg-gradient-to-r from-teal-100/5 to-teal-200/5 rounded-full blur-2xl sm:blur-3xl" />
      </div>

      {/* Floating App Logos */}
      <FloatingAppLogos />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {/* Header Section */}
        <div className="mb-6 sm:mb-12">
          <SectionHeader
            subtitle="Core services"
            title="Types of work"
            highlight="We do"
            description="Professional video editing services tailored to your unique needs and vision"
            center={true}
            titleSize={isMobile ? "lg" : "xl"}
            descriptionSize={isMobile ? "sm" : "base"}
            lineSpacing="tight"
            highlightColor="teal-500"
            dotColor="teal-500"
          />
        </div>

        {/* Services Marquee Section */}
        {renderServicesSection()}

        {/* Why We're Different Section */}
        <motion.div
          className="mb-8 sm:mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-6 sm:mb-12">
            <SectionHeader
              subtitle="Why We're Different"
              title="Video Editing That "
              highlight="Actually Delivers"
              description="Faster turnaround, better communication, and features that actually matter to content creators."
              center={true}
              titleSize={isMobile ? "xl" : "2xl"}
              descriptionSize={isMobile ? "sm" : "lg"}
              lineSpacing="tight"
              highlightColor="teal-500"
              dotColor="teal-500"
              highlightOnNewLine={false}
            />
          </div>

          {/* Differentiator Cards */}
          <div
            className={`grid grid-cols-1 ${
              isMobile
                ? "gap-3"
                : "md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
            } mb-8 sm:mb-16`}
          >
            {differentiators.map((item, index) => (
              <AnimatedLogoCard key={index} item={item} index={index} />
            ))}
          </div>

          {/* Comparison Section */}
          <motion.div
            className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-gray-200 shadow-lg p-3 sm:p-6 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-xl sm:text-2xl font-anton font-bold text-center text-gray-900 mb-1 sm:mb-2">
              The Real Difference
            </h2>
            <p className="text-gray-600 font-poppins text-center mb-4 sm:mb-6 max-w-2xl mx-auto text-xs sm:text-sm">
              See how we solve the biggest frustrations content creators face
            </p>

            <div
              className={`grid grid-cols-1 ${
                isMobile
                  ? "gap-2"
                  : "md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
              }`}
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
              isMobile ? "gap-3" : "md:grid-cols-3 gap-4 sm:gap-6"
            } mb-8 sm:mb-20`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {/* Stat 1 */}
            <div className="text-center p-4 sm:p-6 bg-white rounded-xl border border-teal-100 shadow-md">
              <div className="text-2xl sm:text-4xl font-bold text-teal-600 mb-1">
                {getVideosValue()}
              </div>
              <div className="text-gray-600 text-xs sm:text-sm">
                Videos Delivered
              </div>
            </div>

            {/* Stat 2 */}
            <div className="text-center p-4 sm:p-6 bg-white rounded-xl border border-emerald-100 shadow-md">
              <div className="text-2xl sm:text-4xl font-bold text-emerald-600 mb-1">
                {getBrandsValue()}
              </div>
              <div className="text-gray-600 text-xs sm:text-sm">
                Trusted Brands
              </div>
            </div>

            {/* Stat 3 */}
            <div className="text-center p-4 sm:p-6 bg-white rounded-xl border border-green-100 shadow-md">
              <div className="text-2xl sm:text-4xl font-bold text-green-600 mb-1">
                {getYearsValue()}
              </div>
              <div className="text-gray-600 text-xs sm:text-sm">
                Years Experience
              </div>
            </div>
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div
          className="bg-gradient-to-r from-teal-50 to-teal-100 border border-teal-200 rounded-xl p-4 sm:p-8 text-center relative overflow-hidden shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-lg sm:text-2xl md:text-3xl font-anton font-bold text-gray-800 mb-2">
            Ready to Elevate Your Content?
          </h2>

          <p className="text-gray-600 text-xs sm:text-sm max-w-2xl mx-auto mb-3 sm:mb-4">
            Let's discuss your project and create something extraordinary
            together.
          </p>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
            <button className="px-4 py-2 sm:px-6 sm:py-2.5 bg-gradient-to-r from-teal-400 to-teal-500 text-white font-medium rounded-full text-xs sm:text-sm shadow-md">
              Start a Project
            </button>
            <button className="px-4 py-2 sm:px-6 sm:py-2.5 border border-teal-300 text-teal-600 font-medium rounded-full text-xs sm:text-sm bg-white/80">
              Book a Consultation
            </button>
          </div>
        </motion.div>
      </div>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {isModalOpen && selectedService && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50 p-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="bg-white rounded-xl border border-teal-200 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 sm:p-6">
                <div className="flex justify-between items-start mb-3 sm:mb-4">
                  <div>
                    <div className="text-xl sm:text-3xl mb-1 text-teal-500">
                      {selectedService.icon}
                    </div>
                    <h2 className="text-base sm:text-xl font-bold text-gray-800">
                      {selectedService.title}
                    </h2>
                  </div>
                  <button
                    className="text-gray-500 hover:text-gray-700 p-1"
                    onClick={closeModal}
                  >
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5"
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

                <div className="mb-3 sm:mb-4">
                  <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-1">
                    Service Overview
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    {selectedService.details}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div>
                    <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-1">
                      Features
                    </h3>
                    <ul className="space-y-1">
                      {selectedService.features
                        ?.slice(0, 3)
                        .map((feature, i) => (
                          <li
                            key={i}
                            className="text-xs text-gray-600 flex items-center"
                          >
                            <span className="w-1 h-1 bg-teal-400 rounded-full mr-2 flex-shrink-0" />
                            <span className="truncate">{feature}</span>
                          </li>
                        ))}
                      {selectedService.features?.length > 3 && (
                        <li className="text-xs text-teal-500">
                          +{selectedService.features.length - 3} more
                        </li>
                      )}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-1">
                      Delivery
                    </h3>
                    <p className="text-xs text-gray-600 mb-1">
                      {selectedService.deliveryTime}
                    </p>
                    <p className="text-xs text-gray-600">
                      {selectedService.revisions}
                    </p>
                  </div>
                </div>

                <button className="w-full py-2 bg-gradient-to-r from-teal-400 to-teal-500 text-white font-medium rounded-lg text-sm shadow-md">
                  Discuss This Service
                </button>
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
          animation: marquee-left ${isMobile ? "30s" : "40s"} linear infinite;
        }
        .animate-marquee-right {
          animation: marquee-right 40s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Services;
