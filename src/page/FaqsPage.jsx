import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSearch,
  FiChevronDown,
  FiStar,
  FiHelpCircle,
  FiFilter,
  FiX,
  FiMessageSquare,
  FiTrendingUp,
  FiZap,
  FiAward,
  FiUsers,
  FiVideo,
  FiEdit3,
  FiGlobe,
  FiClock,
  FiMessageCircle,
} from "react-icons/fi";
import { getFAQs } from "../services/api";
import SectionHeader from "../components/Shared/SectionHeader";
import bg from "/ICON.png";

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

// Background Logo Animation - Optimized for mobile
const BackgroundLogoAnimation = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Main Background Logo */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center z-0"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{
          scale: [1, isMobile ? 1.02 : 1.05, 1],
          opacity: isMobile ? 0.1 : [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: isMobile ? 8 : 12,
          repeat: Infinity,
          ease: [0.4, 0, 0.2, 1],
        }}
      >
        <img
          src={bg}
          alt="Background Logo"
          className="w-[85%] max-w-[1100px] h-auto"
          style={{
            filter: `brightness(1.3) contrast(1.2) drop-shadow(0 0 200px rgba(13, 148, 136, 0.25))`,
          }}
        />
      </motion.div>

      {/* Secondary Logo - Hidden on mobile */}
      {!isMobile && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-0"
          animate={{
            scale: [1.05, 1.15, 1.05],
            opacity: [0.08, 0.15, 0.08],
            rotate: [0, -2, 0, 2, 0],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: [0.4, 0, 0.2, 1],
            delay: 2,
          }}
        >
          <img
            src={bg}
            alt="Background Logo Glow"
            className="w-[90%] max-w-[1300px] h-auto opacity-70"
            style={{
              filter: "blur(30px) brightness(1.4)",
              mixBlendMode: "soft-light",
            }}
          />
        </motion.div>
      )}

      {/* Floating Particles - Reduced on mobile */}
      {Array.from({ length: isMobile ? 5 : 15 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 sm:w-2 sm:h-2 bg-gradient-to-r from-teal-400/70 to-teal-300/50 rounded-full z-5"
          style={{
            left: `${8 + i * 6}%`,
            top: `${12 + i * 6}%`,
          }}
          animate={{
            y: [0, isMobile ? -15 : -25, 0, isMobile ? -8 : -15, 0],
            x: [0, isMobile ? 4 : 8, isMobile ? -3 : -6, isMobile ? 3 : 7, 0],
            opacity: [0.3, 0.6, 0.3, 0.5, 0.3],
          }}
          transition={{
            duration: isMobile ? 6 + i * 0.8 : 8 + i * 1.2,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Glow Effects - Simplified on mobile */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center z-0"
        animate={{
          scale: [1, isMobile ? 1.05 : 1.15, 1],
          opacity: isMobile ? 0.08 : [0.12, 0.2, 0.12],
        }}
        transition={{
          duration: isMobile ? 6 : 10,
          repeat: Infinity,
          ease: [0.4, 0, 0.2, 1],
        }}
      >
        <div
          className={`${
            isMobile ? "w-[400px] h-[400px]" : "w-[800px] h-[800px]"
          } bg-teal-400/20 rounded-full blur-3xl`}
        />
      </motion.div>
    </div>
  );
};

const FaqsPage = () => {
  const canvasRef = useRef(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const animationRef = useRef(null);

  const [faqs, setFaqs] = useState([]);
  const [filteredFaqs, setFilteredFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    categories: {},
    highPriority: 0,
  });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Enhanced FAQ categories - memoized
  const categories = useMemo(
    () => [
      {
        id: "all",
        name: "All Questions",
        color: "from-teal-400 to-teal-500",
        icon: FiHelpCircle,
        description: isMobile
          ? "All questions"
          : "Browse all frequently asked questions",
      },
      {
        id: "general",
        name: "General",
        color: "from-teal-400 to-blue-400",
        icon: FiGlobe,
        description: isMobile
          ? "General info"
          : "General information about our services",
      },
      {
        id: "turnaround",
        name: "Turnaround Time",
        color: "from-emerald-400 to-teal-400",
        icon: FiClock,
        description: isMobile
          ? "Delivery times"
          : "Project timelines and delivery",
      },
      {
        id: "pricing",
        name: "Pricing & Packages",
        color: "from-cyan-400 to-teal-400",
        icon: FiTrendingUp,
        description: isMobile ? "Costs" : "Costs and service packages",
      },
      {
        id: "revisions",
        name: "Revisions & Changes",
        color: "from-blue-400 to-cyan-400",
        icon: FiEdit3,
        description: isMobile
          ? "Modifications"
          : "Modification policies and limits",
      },
      {
        id: "file-formats",
        name: "File Formats",
        color: "from-teal-500 to-blue-500",
        icon: FiVideo,
        description: isMobile
          ? "Formats"
          : "Supported formats and specifications",
      },
      {
        id: "process",
        name: "Editing Process",
        color: "from-cyan-400 to-teal-500",
        icon: FiZap,
        description: isMobile ? "Workflow" : "Our workflow and collaboration",
      },
      {
        id: "quality",
        name: "Quality & Standards",
        color: "from-teal-500 to-emerald-400",
        icon: FiAward,
        description: isMobile ? "Quality" : "Quality assurance and standards",
      },
      {
        id: "emergency",
        name: "Emergency Services",
        color: "from-blue-500 to-cyan-500",
        icon: FiZap,
        description: isMobile ? "Rush editing" : "Rush and emergency editing",
      },
      {
        id: "collaboration",
        name: "Collaboration",
        color: "from-teal-400 to-cyan-400",
        icon: FiUsers,
        description: isMobile ? "Team work" : "Client collaboration tools",
      },
    ],
    [isMobile]
  );

  // Optimized background animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.body.scrollHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Reduced particles on mobile
    const particleCount = isMobile ? 15 : 30;
    const particles = [];

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * (isMobile ? 1 : 1.5) + 0.3;
        this.speedX =
          Math.random() * (isMobile ? 0.2 : 0.3) - (isMobile ? 0.1 : 0.15);
        this.speedY =
          Math.random() * (isMobile ? 0.2 : 0.3) - (isMobile ? 0.1 : 0.15);
        this.color =
          Math.random() > 0.5
            ? "rgba(20, 184, 166, 0.1)"
            : "rgba(6, 182, 212, 0.1)";
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    let time = 0;

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Skip grid on mobile for performance
      if (!isMobile) {
        ctx.strokeStyle = "rgba(20, 184, 166, 0.03)";
        ctx.lineWidth = 0.5;

        const cellSize = 80;
        const offsetX = (time * 0.005) % cellSize;
        const offsetY = (time * 0.005) % cellSize;

        for (let x = offsetX; x < canvas.width; x += cellSize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, canvas.height);
          ctx.stroke();
        }

        for (let y = offsetY; y < canvas.height; y += cellSize) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(canvas.width, y);
          ctx.stroke();
        }
      }

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      // Subtle gradient overlay
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width, canvas.height) * 0.6
      );

      const pulseIntensity = (Math.sin(time * 0.0005) + 1) * 0.1;
      gradient.addColorStop(
        0,
        `rgba(240, 253, 250, ${isMobile ? 0.05 : 0.1 + pulseIntensity * 0.05})`
      );
      gradient.addColorStop(
        0.4,
        `rgba(236, 254, 255, ${isMobile ? 0.03 : 0.05 + pulseIntensity * 0.03})`
      );
      gradient.addColorStop(
        0.8,
        `rgba(255, 255, 255, ${isMobile ? 0.01 : 0.02 + pulseIntensity * 0.02})`
      );
      gradient.addColorStop(1, "rgba(255, 255, 255, 0.95)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 1;
      animationRef.current = requestAnimationFrame(drawGrid);
    };

    animationRef.current = requestAnimationFrame(drawGrid);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [isMobile]);

  // Fetch FAQs
  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      setLoading(true);
      const response = await getFAQs({ isActive: true });
      const faqsData = response.data?.faqs || [];
      setFaqs(faqsData);
      setFilteredFaqs(faqsData);

      // Calculate stats
      const categoryCounts = {};
      let highPriority = 0;

      faqsData.forEach((faq) => {
        categoryCounts[faq.category] = (categoryCounts[faq.category] || 0) + 1;
        if (faq.priority >= 7) {
          highPriority += 1;
        }
      });

      setStats({
        total: faqsData.length,
        categories: categoryCounts,
        highPriority,
      });
    } catch (error) {
      console.error("Error fetching FAQs:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter FAQs based on search and category
  useEffect(() => {
    let filtered = faqs;

    if (searchTerm) {
      filtered = filtered.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((faq) => faq.category === selectedCategory);
    }

    setFilteredFaqs(filtered);
  }, [searchTerm, selectedCategory, faqs]);

  const handleSearch = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleCategorySelect = useCallback((categoryId) => {
    setSelectedCategory(categoryId);
    setActiveFAQ(null);
    setMobileFiltersOpen(false);
  }, []);

  const toggleFAQ = useCallback((faqId) => {
    setActiveFAQ((prev) => (prev === faqId ? null : faqId));
  }, []);

  const getCategoryColor = useCallback(
    (category) => {
      const categoryObj = categories.find((cat) => cat.id === category);
      return categoryObj ? categoryObj.color : "from-teal-400 to-teal-500";
    },
    [categories]
  );

  const getCategoryIcon = useCallback(
    (category) => {
      const categoryObj = categories.find((cat) => cat.id === category);
      return categoryObj ? categoryObj.icon : FiHelpCircle;
    },
    [categories]
  );

  const getPriorityStars = useCallback((priority) => {
    const stars = [];
    const starCount = Math.min(Math.floor(priority / 2), 5);
    for (let i = 0; i < starCount; i++) {
      stars.push(
        <FiStar key={i} className="w-3 h-3 text-yellow-500 fill-current" />
      );
    }
    return stars;
  }, []);

  const getPriorityLabel = useCallback((priority) => {
    if (priority >= 9) return "Critical";
    if (priority >= 7) return "High";
    if (priority >= 5) return "Medium";
    if (priority >= 3) return "Low";
    return "Normal";
  }, []);

  const getPriorityColor = useCallback((priority) => {
    if (priority >= 9) return "text-red-500";
    if (priority >= 7) return "text-orange-500";
    if (priority >= 5) return "text-yellow-500";
    if (priority >= 3) return "text-blue-500";
    return "text-teal-500";
  }, []);

  // Animation variants - simplified for mobile
  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: isMobile ? 0.05 : 0.1,
          delayChildren: 0.2,
        },
      },
    }),
    [isMobile]
  );

  const itemVariants = useMemo(
    () => ({
      hidden: { y: isMobile ? 15 : 30, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          type: "spring",
          stiffness: isMobile ? 80 : 100,
          damping: 15,
        },
      },
    }),
    [isMobile]
  );

  const staggerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-teal-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-4 border-teal-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-teal-600 text-sm sm:text-base">
            Loading Knowledge Base...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative font-poppins min-h-screen w-full overflow-hidden bg-gradient-to-br from-white via-teal-50 to-blue-50 py-6 sm:py-10">
      {/* Background Logo Animation */}
      <BackgroundLogoAnimation />

      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Simplified gradient overlays on mobile */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-100/10 via-white/40 to-blue-100/10" />

      {/* Floating Elements - Hidden on mobile */}
      {!isMobile && (
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-teal-200/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.15, 0.25, 0.15],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-16">
        {/* Header Section */}
        <motion.div
          className="text-center mb-8 sm:mb-12 lg:mb-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <SectionHeader
            subtitle="VIDEO EDITING SUPPORT"
            title="Expert Answers"
            highlight="For Creators"
            description={
              isMobile
                ? "Get answers about video editing, pricing, and workflow."
                : "Get instant answers about video editing, pricing, turnaround times, and professional workflow."
            }
            center={true}
            titleSize={isMobile ? "xl" : "3xl"}
            descriptionSize={isMobile ? "sm" : "lg"}
            lineSpacing="tight"
            highlightColor="teal-500"
            dotColor="teal-500"
          />

          {/* Search Bar */}
          <motion.div
            className="relative max-w-2xl mx-auto px-3 sm:px-0"
            variants={itemVariants}
          >
            <div className="relative group">
              <FiSearch className="absolute left-4 sm:left-5 top-1/2 transform -translate-y-1/2 text-teal-500 w-4 h-4 sm:w-5 sm:h-5 z-10" />
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder={
                  isMobile
                    ? "Search questions..."
                    : "Ask about video editing, pricing, timelines..."
                }
                className="w-full pl-10 sm:pl-12 pr-20 sm:pr-24 py-3 sm:py-5 bg-white/80 backdrop-blur-sm border-2 border-teal-200 rounded-xl sm:rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/20 shadow-lg text-sm sm:text-lg transition-all duration-300"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 hidden sm:block">
                <kbd className="px-2 py-1 text-xs border border-teal-300 rounded text-teal-600 bg-teal-100">
                  ⌘K
                </kbd>
              </div>
            </div>
          </motion.div>

          {/* Stats - Simplified on mobile */}
          <motion.div
            className="grid grid-cols-3 gap-2 sm:gap-6 max-w-2xl mx-auto mt-4 sm:mt-8"
            variants={staggerVariants}
            initial="hidden"
            animate="visible"
          >
            {[
              {
                label: isMobile ? "Questions" : "Total Questions",
                value: stats.total,
                icon: FiHelpCircle,
                color: "text-teal-600",
              },
              {
                label: isMobile ? "Priority" : "High Priority",
                value: stats.highPriority,
                icon: FiStar,
                color: "text-yellow-600",
              },
              {
                label: isMobile ? "Categories" : "Categories",
                value: Object.keys(stats.categories).length,
                icon: FiFilter,
                color: "text-blue-600",
              },
            ].map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  className="text-center p-2 sm:p-4 bg-white/80 backdrop-blur-sm border border-teal-100 rounded-lg sm:rounded-xl shadow-md"
                >
                  <IconComponent
                    className={`w-4 h-4 sm:w-6 sm:h-6 mx-auto mb-1 sm:mb-2 ${stat.color}`}
                  />
                  <div
                    className={`text-base sm:text-2xl font-bold ${stat.color} mb-0.5 sm:mb-1`}
                  >
                    {stat.value}
                  </div>
                  <div className="text-gray-600 text-xs sm:text-sm">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Mobile Filter Toggle */}
        <motion.div className="lg:hidden mb-4 sm:mb-6" variants={itemVariants}>
          <button
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 sm:py-3 bg-white/80 backdrop-blur-sm border border-teal-200 rounded-xl text-teal-600 shadow-md text-sm"
          >
            <FiFilter className="w-4 h-4" />
            <span>Filter Categories</span>
            <motion.div
              animate={{ rotate: mobileFiltersOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <FiChevronDown className="w-4 h-4" />
            </motion.div>
          </button>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
          {/* Category Sidebar */}
          <motion.div
            className={`lg:w-80 flex-shrink-0 ${
              mobileFiltersOpen ? "block" : "hidden lg:block"
            }`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="bg-white/80 backdrop-blur-sm border border-teal-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg sticky top-4 sm:top-6">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                  Categories
                </h3>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="lg:hidden text-teal-600"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-1 sm:space-y-2 max-h-[60vh] overflow-y-auto">
                {categories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <motion.button
                      key={category.id}
                      onClick={() => handleCategorySelect(category.id)}
                      variants={itemVariants}
                      className={`w-full text-left p-2 sm:p-3 rounded-lg sm:rounded-xl transition-all duration-300 ${
                        selectedCategory === category.id
                          ? `bg-gradient-to-r ${category.color} text-white shadow-md`
                          : "bg-white/60 text-gray-700 hover:bg-teal-50 hover:text-teal-700"
                      }`}
                      whileHover={!isMobile ? { scale: 1.02 } : {}}
                      whileTap={isMobile ? { scale: 0.98 } : {}}
                    >
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <IconComponent className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-xs sm:text-sm truncate">
                            {category.name}
                          </div>
                          {!isMobile && (
                            <div className="text-xs opacity-70 truncate hidden sm:block">
                              {category.description}
                            </div>
                          )}
                        </div>
                        {stats.categories[category.id] && (
                          <span
                            className={`px-1.5 py-0.5 text-xs rounded-full ${
                              selectedCategory === category.id
                                ? "bg-white/20"
                                : "bg-teal-100 text-teal-700"
                            }`}
                          >
                            {stats.categories[category.id]}
                          </span>
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* FAQ List */}
          <motion.div
            className="flex-1"
            variants={staggerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Results Header */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-2"
            >
              <div>
                <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
                  {selectedCategory === "all"
                    ? "All Questions"
                    : categories.find((c) => c.id === selectedCategory)?.name}
                </h2>
                <p className="text-xs sm:text-sm text-gray-600">
                  {filteredFaqs.length} of {stats.total} questions
                </p>
              </div>
              {!isMobile && (
                <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500">
                  <FiTrendingUp className="w-4 h-4" />
                  <span>Sorted by priority</span>
                </div>
              )}
            </motion.div>

            {/* FAQ Items */}
            <div className="space-y-3 sm:space-y-4">
              {filteredFaqs.length === 0 ? (
                <motion.div
                  variants={itemVariants}
                  className="text-center py-8 sm:py-16 bg-white/80 backdrop-blur-sm border border-teal-100 rounded-xl sm:rounded-2xl shadow-md"
                >
                  <FiHelpCircle className="w-12 h-12 sm:w-20 sm:h-20 text-gray-400 mx-auto mb-3 sm:mb-4" />
                  <h3 className="text-base sm:text-2xl text-gray-600 mb-1 sm:mb-2">
                    No questions found
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto px-4">
                    {searchTerm
                      ? `No results for "${searchTerm}". Try different keywords.`
                      : "No questions available in this category yet."}
                  </p>
                </motion.div>
              ) : (
                filteredFaqs
                  .sort((a, b) => b.priority - a.priority)
                  .map((faq, index) => {
                    const CategoryIcon = getCategoryIcon(faq.category);

                    return (
                      <motion.div
                        key={faq._id}
                        variants={itemVariants}
                        custom={index}
                        className="group relative"
                      >
                        {/* Background Glow - Hidden on mobile */}
                        {!isMobile && (
                          <div
                            className={`absolute inset-0 bg-gradient-to-r ${getCategoryColor(
                              faq.category
                            )} rounded-2xl opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-300`}
                          />
                        )}

                        <div className="relative bg-white/80 backdrop-blur-sm border-2 border-teal-100 rounded-xl sm:rounded-2xl overflow-hidden shadow-md hover:border-teal-200 transition-all duration-300">
                          <button
                            onClick={() => toggleFAQ(faq._id)}
                            className="w-full px-4 sm:px-6 py-4 sm:py-6 text-left flex items-start justify-between"
                          >
                            <div className="flex items-start space-x-2 sm:space-x-4 flex-1">
                              <div className="flex-shrink-0">
                                <div
                                  className={`p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-r ${getCategoryColor(
                                    faq.category
                                  )}`}
                                >
                                  <CategoryIcon className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
                                </div>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-1 sm:gap-2 mb-1 sm:mb-3">
                                  <h3 className="text-sm sm:text-lg font-semibold text-gray-900 group-hover:text-teal-700 transition-colors line-clamp-2">
                                    {faq.question}
                                  </h3>
                                  <div className="flex items-center space-x-1">
                                    <div className="flex items-center space-x-0.5">
                                      {getPriorityStars(faq.priority)}
                                    </div>
                                    <span
                                      className={`px-1.5 py-0.5 text-xs rounded-full bg-gradient-to-r ${getCategoryColor(
                                        faq.category
                                      )} text-white hidden sm:inline-block`}
                                    >
                                      {faq.category}
                                    </span>
                                  </div>
                                </div>

                                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
                                  <span
                                    className={`flex items-center space-x-1 ${getPriorityColor(
                                      faq.priority
                                    )}`}
                                  >
                                    <FiStar className="w-3 h-3" />
                                    <span className="hidden sm:inline">
                                      {getPriorityLabel(faq.priority)} Priority
                                    </span>
                                    <span className="sm:hidden">
                                      {getPriorityLabel(faq.priority)}
                                    </span>
                                  </span>
                                  <span className="flex items-center space-x-1 text-gray-500">
                                    <FiClock className="w-3 h-3" />
                                    <span className="hidden sm:inline">
                                      Updated recently
                                    </span>
                                  </span>
                                </div>
                              </div>
                            </div>

                            <motion.div
                              animate={{
                                rotate: activeFAQ === faq._id ? 180 : 0,
                              }}
                              transition={{ duration: 0.3 }}
                              className="flex-shrink-0 ml-2 sm:ml-4 p-1 sm:p-2 text-teal-500"
                            >
                              <FiChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
                            </motion.div>
                          </button>

                          <AnimatePresence>
                            {activeFAQ === faq._id && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{
                                  duration: 0.3,
                                  ease: "easeInOut",
                                }}
                                className="border-t border-teal-100"
                              >
                                <div className="p-4 sm:p-6">
                                  <div className="pl-2 sm:pl-3 border-l-2 border-teal-300">
                                    <p className="text-gray-700 text-xs sm:text-base leading-relaxed">
                                      {faq.answer}
                                    </p>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </motion.div>
                    );
                  })
              )}
            </div>

            {/* High Priority FAQs Section - Hidden on mobile */}
            {!isMobile && filteredFaqs.length > 0 && (
              <motion.div
                className="mt-12 sm:mt-16"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div
                  variants={itemVariants}
                  className="text-center mb-6 sm:mb-8"
                >
                  <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-100 to-orange-100 border border-yellow-200 rounded-full px-3 py-1 sm:px-4 sm:py-2">
                    <FiStar className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-600" />
                    <span className="text-yellow-700 text-xs sm:text-sm font-medium">
                      High Priority Questions
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-3xl font-bold text-gray-900 mt-2 sm:mt-4">
                    Critical Information
                  </h3>
                </motion.div>

                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                  {faqs
                    .filter((faq) => faq.priority >= 7)
                    .sort((a, b) => b.priority - a.priority)
                    .slice(0, 6)
                    .map((faq, index) => {
                      const CategoryIcon = getCategoryIcon(faq.category);
                      return (
                        <motion.div
                          key={faq._id}
                          variants={itemVariants}
                          custom={index}
                          className="bg-white/80 backdrop-blur-sm border border-yellow-200 rounded-xl p-4 sm:p-6 hover:border-yellow-300 transition-all duration-300 cursor-pointer group shadow-md"
                          onClick={() => toggleFAQ(faq._id)}
                          whileHover={{
                            scale: 1.02,
                            y: -5,
                          }}
                        >
                          <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-3">
                            <div
                              className={`p-1.5 sm:p-2 rounded-lg bg-gradient-to-r ${getCategoryColor(
                                faq.category
                              )}`}
                            >
                              <CategoryIcon className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                            </div>
                            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                              {faq.category}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1 mb-1 sm:mb-2">
                            <div className="flex items-center space-x-0.5">
                              {getPriorityStars(faq.priority)}
                            </div>
                            <span
                              className={`text-xs font-medium ${getPriorityColor(
                                faq.priority
                              )}`}
                            >
                              {getPriorityLabel(faq.priority)}
                            </span>
                          </div>
                          <h4 className="text-sm sm:text-base text-gray-900 font-semibold line-clamp-3 group-hover:text-teal-700 transition-colors">
                            {faq.question}
                          </h4>
                        </motion.div>
                      );
                    })}
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Can't Find Your Answer? CTA Section */}
        <motion.div
          className="mt-12 sm:mt-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="text-center bg-white/80 backdrop-blur-sm p-6 sm:p-10 rounded-xl sm:rounded-2xl border border-teal-200 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center space-x-2 bg-teal-100 border border-teal-200 rounded-full px-3 py-1 sm:px-4 sm:py-2 mb-3 sm:mb-4">
              <FiMessageCircle className="w-3 h-3 sm:w-4 sm:h-4 text-teal-600" />
              <span className="text-teal-700 text-xs sm:text-sm font-medium">
                Can't Find Your Answer?
              </span>
            </div>

            <h2 className="text-lg sm:text-3xl font-anton font-bold text-gray-900 mb-2 sm:mb-4">
              We're Here to Help You
            </h2>
            <p className="text-gray-700 text-xs sm:text-base mb-4 sm:mb-8 max-w-2xl mx-auto px-4">
              {isMobile
                ? "Contact our support team for personalized assistance."
                : "Didn't find what you were looking for? Contact our support team directly and get personalized assistance for your specific video editing needs."}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <motion.a
                href="/contact"
                className="px-6 py-2.5 sm:px-8 sm:py-3 bg-teal-500 text-white text-sm sm:text-base font-medium rounded-full hover:bg-teal-600 transition-all duration-300 shadow-md"
                whileHover={!isMobile ? { scale: 1.05 } : {}}
                whileTap={isMobile ? { scale: 0.95 } : {}}
              >
                Contact Support
              </motion.a>
            </div>

            <p className="text-gray-600 text-xs sm:text-sm mt-3 sm:mt-4">
              Typically respond within 24 hours • Professional support
              guaranteed
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Scrolling Marquee - Hidden on mobile */}
      {!isMobile && (
        <motion.div
          className="relative z-20 mt-12 sm:mt-16 bg-gradient-to-r from-teal-100 to-blue-100 border-y border-teal-200 py-4 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <motion.div
            className="flex space-x-8"
            animate={{ x: [0, -1000] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 40,
                ease: "linear",
              },
            }}
          >
            {[...Array(3)].map((_, i) => (
              <React.Fragment key={i}>
                <span className="text-teal-700 font-allan text-sm whitespace-nowrap">
                  • VIDEO EDITING • COLOR GRADING • MOTION GRAPHICS • 4K QUALITY
                  • FAST TURNAROUND • PROFESSIONAL WORKFLOW • CINEMATIC RESULTS
                  •
                </span>
              </React.Fragment>
            ))}
          </motion.div>
        </motion.div>
      )}

      {/* Floating Action Button for Mobile */}
      {isMobile && (
        <motion.button
          className="fixed bottom-6 right-6 z-30 w-12 h-12 bg-teal-500 rounded-full shadow-lg flex items-center justify-center text-white hover:bg-teal-600 transition-colors"
          whileTap={{ scale: 0.9 }}
          onClick={() => setMobileFiltersOpen(true)}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, type: "spring" }}
        >
          <FiFilter className="w-5 h-5" />
        </motion.button>
      )}
    </div>
  );
};

export default FaqsPage;
