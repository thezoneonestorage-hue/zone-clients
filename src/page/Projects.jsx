import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiPlay,
  FiX,
  FiGrid,
  FiBox,
  FiFilm,
  FiTool,
  FiEdit,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import {
  getVideoReels,
  getVisibleCategories,
  getVideoReelsByCategory,
} from "../services/api";
import bg from "/ICON.png";

// Import app icons - mapping for tags
import davinchi from "../assets/davenchi.png";
import premier from "../assets/premier.png";
import cap_cut from "../assets/cap-cut.png";
import after_effect from "../assets/after-effect.png";
import final_cut from "../assets/final-cut.png";
import SectionHeader from "../components/Shared/SectionHeader";

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

// Optimized Background Animation with reduced particles on mobile
const FluidBackground = () => {
  const canvasRef = useRef(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const animationRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Reduce particles on mobile for performance
    const particleCount = isMobile ? 5 : 15;
    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * (isMobile ? 40 : 80) + (isMobile ? 10 : 20),
      speed: Math.random() * 0.2 + 0.1,
      offset: Math.random() * Math.PI * 2,
    }));

    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Base gradient
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width, canvas.height) / 1.5
      );

      gradient.addColorStop(0, "rgba(13, 148, 136, 0.05)");
      gradient.addColorStop(0.3, "rgba(13, 148, 136, 0.02)");
      gradient.addColorStop(1, "transparent");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Animated particles
      particles.forEach((particle) => {
        const x =
          particle.x +
          Math.cos(time * particle.speed + particle.offset) *
            (isMobile ? 15 : 30);
        const y =
          particle.y +
          Math.sin(time * particle.speed + particle.offset) *
            (isMobile ? 10 : 20);

        const particleGradient = ctx.createRadialGradient(
          x,
          y,
          0,
          x,
          y,
          particle.size
        );

        particleGradient.addColorStop(
          0,
          `rgba(13, 148, 136, ${isMobile ? 0.02 : 0.03})`
        );
        particleGradient.addColorStop(1, "transparent");

        ctx.fillStyle = particleGradient;
        ctx.beginPath();
        ctx.arc(x, y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      time += 0.005;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [isMobile]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Optimized Logo Animation */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center z-0"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{
          scale: [1, 1.03, 1],
          opacity: isMobile ? 0.1 : [0.08, 0.12, 0.08],
          rotate: isMobile ? 0 : [0, 1, 0, -1, 0],
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
          className="w-[80%] max-w-[1000px] h-auto"
          style={{
            filter: `brightness(1.2) contrast(1.1) drop-shadow(0 0 120px rgba(13, 148, 136, 0.15))`,
          }}
        />
      </motion.div>

      {/* Secondary Logo - Hidden on mobile for performance */}
      {!isMobile && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-0"
          animate={{
            scale: [1.05, 1.12, 1.05],
            opacity: [0.05, 0.08, 0.05],
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
            className="w-[85%] max-w-[1200px] h-auto opacity-60"
            style={{
              filter: "blur(35px) brightness(1.3)",
              mixBlendMode: "soft-light",
            }}
          />
        </motion.div>
      )}

      {/* Reduced floating particles on mobile */}
      {Array.from({ length: isMobile ? 3 : 10 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-gradient-to-r from-teal-400/50 to-teal-300/30 rounded-full z-5"
          style={{
            left: `${8 + i * 8}%`,
            top: `${12 + i * 8}%`,
          }}
          animate={{
            y: [0, isMobile ? -8 : -15, 0, isMobile ? -5 : -10, 0],
            x: [0, isMobile ? 2 : 4, isMobile ? -2 : -3, isMobile ? 2 : 4, 0],
            opacity: [0.2, 0.4, 0.2, 0.35, 0.2],
          }}
          transition={{
            duration: isMobile ? 6 + i : 8 + i * 1.5,
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Enhanced FloatingTools - Completely disabled on mobile
const FloatingTools = ({ videoTools }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Return null on mobile - no floating icons
  if (isMobile) return null;

  // Generate random positions for floating logos (only desktop)
  const getRandomPosition = (index) => {
    const positions = [
      { top: "15%", left: "8%", scale: 0.6 },
      { top: "22%", right: "12%", scale: 0.8 },
      { top: "65%", left: "6%", scale: 0.7 },
      { bottom: "20%", right: "8%", scale: 1.0 },
      { top: "42%", right: "5%", scale: 0.5 },
      { bottom: "32%", left: "20%", scale: 0.9 },
      { top: "12%", right: "25%", scale: 1.1 },
      { bottom: "16%", right: "32%", scale: 0.4 },
    ];
    return positions[index % positions.length];
  };

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
              opacity: [0.4, 0.9, 0.4],
              scale: [
                position.scale * 0.8,
                position.scale * 1.2,
                position.scale * 0.8,
              ],
              y: [0, -30, 0, -20, 0],
              x: [0, 8, -12, 6, 0],
              rotate: [0, 4, -2, 2, 0],
            }}
            transition={{
              duration: 14 + Math.random() * 8,
              repeat: Infinity,
              delay: index * 1.2,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <motion.div
              className="relative bg-gradient-to-br from-white/30 to-white/12 backdrop-blur-xl rounded-xl p-3 border border-white/40 shadow-lg"
              whileHover={{
                scale: 1.4,
                rotateY: 180,
                transition: {
                  duration: 0.8,
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                },
              }}
            >
              <motion.img
                src={tool.logo}
                alt={tool.name}
                className="w-14 h-14 object-contain"
                animate={{
                  filter: [
                    "brightness(1.1) drop-shadow(0 0 12px rgba(13, 148, 136, 0.5))",
                    "brightness(1.4) drop-shadow(0 0 20px rgba(20, 184, 166, 0.8))",
                    "brightness(1.1) drop-shadow(0 0 12px rgba(13, 148, 136, 0.5))",
                  ],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  delay: index * 0.8,
                  ease: "easeInOut",
                }}
              />

              {/* Tool Name Tooltip */}
              <motion.div
                className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-teal-800/95 text-white text-xs px-3 py-1.5 rounded-md whitespace-nowrap opacity-0 border border-teal-600/30 backdrop-blur-sm shadow-lg"
                whileHover={{
                  opacity: 1,
                  y: -2,
                  transition: { duration: 0.4, ease: "easeOut" },
                }}
              >
                {tool.name}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-1.5 h-1.5 bg-teal-800/95 rotate-45" />
              </motion.div>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
};

// Optimized Video Card with reduced animations on mobile
const EnhancedVideoCard = React.memo(({ project, onClick, isActive }) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Map tags to display app names - memoized
  const getAppNameFromTag = useCallback((tag) => {
    if (!tag || typeof tag !== "string") return tag || "Unknown App";
    const tagLower = tag.toLowerCase();
    if (tagLower.includes("davinci") || tagLower.includes("resolve"))
      return "DaVinci Resolve";
    if (tagLower.includes("premier") || tagLower.includes("pro"))
      return "Premier Pro";
    if (tagLower.includes("final") || tagLower.includes("cut"))
      return "Final Cut Pro";
    if (tagLower.includes("capcut")) return "CapCut";
    if (tagLower.includes("after") || tagLower.includes("effects"))
      return "After Effects";
    return tag
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }, []);

  // Get unique app names from tags - memoized
  const appNames = useMemo(() => {
    if (!project.technologies || !Array.isArray(project.technologies))
      return [];
    const names = project.technologies.map((tag) => getAppNameFromTag(tag));
    return [...new Set(names)];
  }, [project.technologies, getAppNameFromTag]);

  // Show fewer apps on mobile
  const MAX_VISIBLE_APPS = isMobile ? 2 : 2;
  const visibleApps = appNames.slice(0, MAX_VISIBLE_APPS);
  const hiddenAppsCount = Math.max(0, appNames.length - MAX_VISIBLE_APPS);

  useEffect(() => {
    if (videoRef.current && isHovered && !isMobile) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    } else if (videoRef.current) {
      videoRef.current.pause();
    }
  }, [isHovered, isMobile]);

  return (
    <motion.article
      className="group relative cursor-pointer font-poppins"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={
        !isMobile
          ? { y: -8, transition: { duration: 0.4, ease: "easeOut" } }
          : {}
      }
      onClick={onClick}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
    >
      {/* Glow effect - disabled on mobile */}
      {!isMobile && (
        <motion.div
          className="absolute inset-0 rounded-3xl bg-gradient-to-r from-teal-400/10 to-teal-600/10 blur-xl"
          animate={{
            opacity: isHovered ? 0.6 : 0,
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Card container */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-sm border border-white/50 shadow-lg">
        {/* Video container */}
        <div className="relative aspect-video overflow-hidden">
          {/* Thumbnail */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
            style={{
              backgroundImage: `url(${project.thumbnail})`,
              opacity: !isMobile && isHovered ? 0 : 1,
            }}
          />

          {/* Video - only play on desktop hover */}
          {!isMobile && (
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
              style={{ opacity: isHovered ? 1 : 0 }}
              muted
              loop
              playsInline
              preload="metadata"
              poster={project.thumbnail}
            >
              <source src={project.videoUrl} type="video/mp4" />
            </video>
          )}

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

          {/* Play button - always visible on mobile */}
          {(!isMobile ? isHovered : true) ? null : (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{
                scale: isHovered ? 0 : 1,
                opacity: isHovered ? 0 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg">
                <FiPlay className="w-6 h-6 text-white ml-1" />
              </div>
            </motion.div>
          )}

          {/* Category badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-teal-700">
              {project.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 md:p-6">
          <motion.h3
            className="text-base md:text-lg font-semibold text-gray-800 mb-3 md:mb-4 line-clamp-2"
            animate={
              !isMobile ? { color: isHovered ? "#0d9488" : "#1f2937" } : {}
            }
            transition={{ duration: 0.3 }}
          >
            {project.title}
          </motion.h3>

          {/* App/Tools Used Section */}
          {appNames.length > 0 && (
            <div className="mb-2 md:mb-3">
              <div className="flex items-center gap-1.5 mb-2">
                <FiTool className="w-3 h-3 md:w-3.5 md:h-3.5 text-teal-600" />
                <span className="text-xs font-medium text-gray-600">
                  Tools Used:
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {visibleApps.map((appName, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 md:px-2.5 md:py-1 bg-teal-50 border border-teal-200 rounded-lg text-xs font-medium text-teal-700 flex items-center gap-1"
                  >
                    <FiEdit className="w-2.5 h-2.5 md:w-3 md:h-3" />
                    {appName}
                  </span>
                ))}
                {hiddenAppsCount > 0 && (
                  <span className="px-2 py-1 md:px-2.5 md:py-1 bg-gray-100 border border-gray-200 rounded-lg text-xs font-medium text-gray-600">
                    +{hiddenAppsCount}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Description - hide on mobile if too long */}
          {project.description && (
            <p className="text-xs md:text-sm text-gray-600 line-clamp-2 md:line-clamp-2">
              {project.description}
            </p>
          )}
        </div>

        {/* Hover line effect - disabled on mobile */}
        {!isMobile && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-400 to-teal-600"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isHovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          />
        )}
      </div>
    </motion.article>
  );
});

// Scrollable Category Filter with side-by-side scrolling
const CategoryFilter = React.memo(
  ({ categories, activeCategory, onChange, loading }) => {
    const isMobile = useMediaQuery("(max-width: 768px)");
    const scrollContainerRef = useRef(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(false);

    // Check scroll position to show/hide arrows
    const checkScroll = useCallback(() => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } =
          scrollContainerRef.current;
        setShowLeftArrow(scrollLeft > 10);
        setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
      }
    }, []);

    useEffect(() => {
      const scrollContainer = scrollContainerRef.current;
      if (scrollContainer) {
        checkScroll();
        scrollContainer.addEventListener("scroll", checkScroll);
        window.addEventListener("resize", checkScroll);

        return () => {
          scrollContainer.removeEventListener("scroll", checkScroll);
          window.removeEventListener("resize", checkScroll);
        };
      }
    }, [checkScroll, categories]);

    // Scroll functions
    const scroll = (direction) => {
      if (scrollContainerRef.current) {
        const scrollAmount = 200;
        const newScrollLeft =
          scrollContainerRef.current.scrollLeft +
          (direction === "left" ? -scrollAmount : scrollAmount);

        scrollContainerRef.current.scrollTo({
          left: newScrollLeft,
          behavior: "smooth",
        });
      }
    };

    // Scroll active category into view on change
    useEffect(() => {
      if (scrollContainerRef.current && activeCategory) {
        const activeButton = scrollContainerRef.current.querySelector(
          `[data-category="${activeCategory}"]`
        );
        if (activeButton) {
          activeButton.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center",
          });
        }
      }
    }, [activeCategory]);

    return (
      <div className="relative w-full mb-8 md:mb-12 font-poppins">
        {/* Left Arrow - only show if needed and not on mobile */}
        {!isMobile && showLeftArrow && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-gradient-to-r from-white via-white to-transparent pl-2 pr-6 py-3 rounded-r-full shadow-lg hover:shadow-xl transition-all duration-300"
            aria-label="Scroll left"
          >
            <FiChevronLeft className="w-5 h-5 text-teal-600" />
          </button>
        )}

        {/* Right Arrow - only show if needed and not on mobile */}
        {!isMobile && showRightArrow && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-gradient-to-l from-white via-white to-transparent pr-2 pl-6 py-3 rounded-l-full shadow-lg hover:shadow-xl transition-all duration-300"
            aria-label="Scroll right"
          >
            <FiChevronRight className="w-5 h-5 text-teal-600" />
          </button>
        )}

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className="overflow-x-auto scrollbar-hide pb-2"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          <motion.div
            className="flex gap-2 md:gap-3 px-4 md:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ minWidth: "min-content" }}
          >
            {categories.map((category) => (
              <motion.button
                key={category.id}
                data-category={category.id}
                onClick={() => onChange(category.id)}
                disabled={loading}
                className={`relative flex-shrink-0 px-4 md:px-5 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                  activeCategory === category.id
                    ? "text-white"
                    : "text-gray-700 hover:text-teal-600 bg-white/80 backdrop-blur-sm border border-gray-200"
                } ${
                  loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                }`}
                whileHover={!loading && !isMobile ? { scale: 1.05 } : {}}
                whileTap={!loading && !isMobile ? { scale: 0.95 } : {}}
              >
                {activeCategory === category.id && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-500 to-teal-600"
                    layoutId="activeCategory"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1 md:gap-2">
                  {loading && activeCategory === category.id ? (
                    <motion.div
                      className="w-3 h-3 md:w-4 md:h-4 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  ) : (
                    category.icon
                  )}
                  {category.name}
                </span>
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* Gradient Fades on sides for better UX */}
        {!isMobile && (
          <>
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none" />
          </>
        )}
      </div>
    );
  }
);

// Main Projects Component
const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeLayout, setActiveLayout] = useState("grid");
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState({
    initial: true,
    category: false,
  });
  const [error, setError] = useState(null);

  const modalVideoRef = useRef(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Video tools data - memoized
  const videoTools = useMemo(
    () => [
      { name: "DaVinci Resolve", logo: davinchi },
      { name: "Premier Pro", logo: premier },
      { name: "Final Cut Pro", logo: final_cut },
      { name: "CapCut", logo: cap_cut },
      { name: "After Effects", logo: after_effect },
    ],
    []
  );

  // Fetch initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading((prev) => ({ ...prev, initial: true }));
        const [categoriesResponse, projectsResponse] = await Promise.all([
          getVisibleCategories(),
          getVideoReels(),
        ]);

        const categoriesData = categoriesResponse.data?.categories || [];
        const filteredCategories = categoriesData.filter(
          (cat) =>
            cat.slug !== "introduction" &&
            cat.name.toLowerCase() !== "introduction"
        );

        const formattedCategories = [
          {
            id: "all",
            name: "All Projects",
            icon: <FiFilm className="w-3 h-3 md:w-4 md:h-4" />,
          },
          ...filteredCategories.map((cat) => ({
            id: cat.slug || cat.name.toLowerCase(),
            name: cat.name,
            icon: <FiFilm className="w-3 h-3 md:w-4 md:h-4" />,
          })),
        ];

        setCategories(formattedCategories);
        processProjectsResponse(projectsResponse);
        setError(null);
      } catch (err) {
        console.error("Error fetching initial data:", err);
        setError("Failed to load projects. Please try again later.");
      } finally {
        setLoading((prev) => ({ ...prev, initial: false }));
      }
    };

    fetchInitialData();
  }, []);

  // Fetch projects when category changes
  useEffect(() => {
    const fetchProjectsByCategory = async () => {
      try {
        setLoading((prev) => ({ ...prev, category: true }));

        let response;
        if (activeCategory === "all") {
          response = await getVideoReels();
        } else {
          response = await getVideoReelsByCategory(activeCategory);
        }

        processProjectsResponse(response);
        setError(null);
      } catch (err) {
        console.error(
          `Error fetching projects for category ${activeCategory}:`,
          err
        );
        setError(
          `Failed to load ${
            activeCategory === "all" ? "all" : activeCategory
          } projects. Please try again.`
        );
      } finally {
        setLoading((prev) => ({ ...prev, category: false }));
      }
    };

    if (!loading.initial) {
      fetchProjectsByCategory();
    }
  }, [activeCategory, loading.initial]);

  // Helper function to process projects response
  const processProjectsResponse = (response) => {
    let projectsData = response.data?.videoReels || [];

    projectsData = projectsData.filter(
      (project) =>
        project.category !== "introduction" &&
        !project.category?.toLowerCase().includes("introduction")
    );

    const formattedProjects = projectsData.map((project) => ({
      id: project._id,
      title: project.title,
      category: project.category,
      description: project.description,
      videoUrl: project.videoUrl,
      thumbnail: project.thumbnailUrl,
      technologies: project.tags || [],
      isBest: project.isBest,
    }));

    setProjects(formattedProjects);
  };

  // Handle category change
  const handleCategoryChange = useCallback(
    (categoryId) => {
      if (categoryId === activeCategory) return;
      setActiveCategory(categoryId);
      setSelectedProject(null);
    },
    [activeCategory]
  );

  // Handle modal
  const closeModal = useCallback(() => {
    if (modalVideoRef.current) {
      modalVideoRef.current.pause();
    }
    setSelectedProject(null);
  }, []);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [closeModal]);

  // Loading state
  if (loading.initial && projects.length === 0) {
    return (
      <section className="relative min-h-screen w-full bg-gradient-to-br from-gray-50 via-white to-teal-50/50 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            className="w-12 h-12 md:w-16 md:h-16 border-4 border-teal-500/30 border-t-teal-500 rounded-full mx-auto mb-4 md:mb-6"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.p
            className="text-sm md:text-base text-gray-700"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Loading creative projects...
          </motion.p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="projects"
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-gray-50 via-white to-teal-50/50 py-12 md:py-16 px-4 md:px-8"
    >
      {/* Background Effects */}
      <FluidBackground />
      <FloatingTools videoTools={videoTools} />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <SectionHeader
          subtitle="Portfolio Showcase"
          title="Our"
          highlight="Visual Projects"
          description="Discover our collection of video editing projects showcasing expertise in storytelling, color grading, and visual effects."
          center={true}
          titleSize={isMobile ? "xl" : "2xl"}
          titleWeight="medium"
          descriptionSize={isMobile ? "sm" : "lg"}
          highlightWeight=""
          highlightOnNewLine={false}
        />

        {/* Layout Switcher - Hidden on mobile */}
        {!isMobile && (
          <motion.div
            className="flex justify-center gap-2 mb-8 font-poppins"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <button
              onClick={() => setActiveLayout("grid")}
              className={`p-3 rounded-xl transition-all duration-300 flex items-center gap-2 ${
                activeLayout === "grid"
                  ? "bg-teal-500 text-white shadow-lg shadow-teal-500/30"
                  : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              <FiGrid className="w-5 h-5" />
              <span className="text-sm font-medium">Grid</span>
            </button>
            <button
              onClick={() => setActiveLayout("stack")}
              className={`p-3 rounded-xl transition-all duration-300 flex items-center gap-2 ${
                activeLayout === "stack"
                  ? "bg-teal-500 text-white shadow-lg shadow-teal-500/30"
                  : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              <FiBox className="w-5 h-5" />
              <span className="text-sm font-medium">Stack</span>
            </button>
          </motion.div>
        )}

        {/* Scrollable Category Filter */}
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onChange={handleCategoryChange}
          loading={loading.category}
        />

        {/* Loading indicator for category change */}
        {loading.category && (
          <motion.div
            className="text-center py-6 md:py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="inline-flex items-center gap-2 text-teal-600">
              <motion.div
                className="w-3 h-3 md:w-4 md:h-4 border-2 border-teal-600 border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <span className="text-sm md:text-base">
                Loading {activeCategory === "all" ? "" : activeCategory}{" "}
                projects...
              </span>
            </div>
          </motion.div>
        )}

        {/* Projects Grid */}
        {error ? (
          <div className="text-center py-12 md:py-20">
            <p className="text-sm md:text-base text-gray-600">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors text-sm md:text-base"
            >
              Try Again
            </button>
          </div>
        ) : !loading.category && projects.length === 0 ? (
          <div className="text-center py-12 md:py-20">
            <p className="text-sm md:text-base text-gray-600">
              No projects found for this category.
            </p>
          </div>
        ) : (
          <motion.div
            className={
              activeLayout === "grid" || isMobile
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8"
                : "flex flex-col gap-8 max-w-4xl mx-auto"
            }
            layout
            transition={{ duration: 0.5 }}
          >
            {projects.map((project) => (
              <EnhancedVideoCard
                key={project.id}
                project={project}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </motion.div>
        )}

        {/* Stats - Simplified on mobile */}
        <motion.div
          className="mt-12 md:mt-20 pt-6 md:pt-8 border-t border-gray-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              {
                label: isMobile ? "Projects" : "Total Projects",
                value: projects.length,
              },
              {
                label: isMobile ? "Categories" : "Categories",
                value: categories.length - 1,
              },
              {
                label: isMobile ? "Tools" : "Tools Used",
                value: videoTools.length,
              },
              { label: isMobile ? "Apps" : "Editing Apps", value: 5 },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.5 }}
              >
                <div className="text-xl md:text-3xl font-anton font-bold text-teal-600 mb-1 md:mb-2">
                  {stat.value}+
                </div>
                <div className="text-xs md:text-sm text-gray-600 font-poppins">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4 bg-black/95"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="relative w-full max-w-6xl"
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 300,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <motion.button
                onClick={closeModal}
                className="absolute -top-8 md:-top-12 right-0 p-1.5 md:p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-20"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <FiX className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </motion.button>

              {/* Video */}
              <div className="rounded-xl overflow-hidden shadow-2xl">
                <video
                  ref={modalVideoRef}
                  controls
                  autoPlay
                  className="w-full h-auto"
                  poster={selectedProject.thumbnail}
                  playsInline
                >
                  <source src={selectedProject.videoUrl} type="video/mp4" />
                </video>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating CTA - Hidden on mobile */}
      {!isMobile && (
        <motion.div
          className="fixed bottom-8 right-8 z-40"
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 1, type: "spring" }}
        >
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="p-3 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full shadow-lg shadow-teal-500/30 hover:shadow-xl hover:shadow-teal-500/40 transition-all duration-300"
          >
            <FiFilm className="w-6 h-6 text-white" />
          </button>
        </motion.div>
      )}
    </section>
  );
};

export default Projects;
