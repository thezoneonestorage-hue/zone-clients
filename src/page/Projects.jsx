import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiPlay,
  FiX,
  FiGrid,
  FiBox,
  FiFilm,
  FiTool,
  FiEdit,
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

// Enhanced Background Animation with smoother logo animation
const FluidBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationId;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Create fluid gradient animation
    const particles = Array.from({ length: 15 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 80 + 20,
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
          particle.x + Math.cos(time * particle.speed + particle.offset) * 30;
        const y =
          particle.y + Math.sin(time * particle.speed + particle.offset) * 20;

        const particleGradient = ctx.createRadialGradient(
          x,
          y,
          0,
          x,
          y,
          particle.size
        );

        particleGradient.addColorStop(0, `rgba(13, 148, 136, ${0.03})`);
        particleGradient.addColorStop(1, "transparent");

        ctx.fillStyle = particleGradient;
        ctx.beginPath();
        ctx.arc(x, y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      time += 0.005;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Smoother Logo Animation - Like in HeroSection */}
      {/* Main Background Logo */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center z-0"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{
          scale: [1, 1.03, 1],
          opacity: [0.08, 0.12, 0.08],
          rotate: [0, 1, 0, -1, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: [0.4, 0, 0.2, 1],
        }}
      >
        <img
          src={bg}
          alt="Background Logo"
          className="w-[80%] max-w-[1000px] h-auto"
          style={{
            filter: `
              brightness(1.2)
              contrast(1.1)
              drop-shadow(0 0 120px rgba(13, 148, 136, 0.15))
            `,
          }}
        />
      </motion.div>

      {/* Secondary Larger Logo for Depth */}
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

      {/* Subtle Floating Particles */}
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-gradient-to-r from-teal-400/50 to-teal-300/30 rounded-full z-5"
          style={{
            left: `${8 + i * 8}%`,
            top: `${12 + i * 8}%`,
          }}
          animate={{
            y: [0, -15, 0, -10, 0],
            x: [0, 4, -3, 4, 0],
            scale: [1, 1.2, 0.8, 1.1, 1],
            opacity: [0.2, 0.4, 0.2, 0.35, 0.2],
            rotate: [0, 45, 90, 135, 180],
          }}
          transition={{
            duration: 8 + i * 1.5,
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Glow Effect Behind Background Logo */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center z-0"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.08, 0.15, 0.08],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: [0.4, 0, 0.2, 1],
        }}
      >
        <div className="w-[600px] h-[600px] bg-teal-400/12 rounded-full blur-2xl" />
      </motion.div>
    </div>
  );
};

// Enhanced FloatingTools with random positions and smoother animations
const FloatingTools = ({ videoTools }) => {
  // Generate random positions for floating logos
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
      {/* Floating App Logos in Random Positions */}
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

      {/* Subtle Floating Particles */}
      {Array.from({ length: 6 }).map((_, i) => {
        const positions = [
          { top: "30%", left: "16%" },
          { top: "45%", right: "22%" },
          { top: "70%", left: "11%" },
          { bottom: "32%", right: "16%" },
          { top: "55%", right: "9%" },
          { bottom: "42%", left: "26%" },
        ];

        const position = positions[i];

        return (
          <motion.div
            key={`floating-particle-${i}`}
            className="absolute w-1 h-1 bg-gradient-to-r from-teal-400/50 to-teal-300/30 rounded-full opacity-60 z-20"
            style={position}
            animate={{
              y: [0, -20, 0, -12, 0],
              x: [0, 6, -8, 5, 0],
              scale: [1, 1.3, 0.9, 1.2, 1],
              opacity: [0.3, 0.6, 0.3, 0.5, 0.3],
              rotate: [0, 45, 90, 135, 180],
            }}
            transition={{
              duration: 10 + Math.random() * 6,
              delay: Math.random() * 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      })}

      {/* Subtle Glow Spots */}
      {Array.from({ length: 3 }).map((_, i) => {
        const positions = [
          { top: "35%", left: "30%" },
          { top: "50%", right: "35%" },
          { bottom: "40%", left: "25%" },
        ];

        const position = positions[i];

        return (
          <motion.div
            key={`floating-glow-${i}`}
            className="absolute w-32 h-32 rounded-full z-15"
            style={position}
            animate={{
              scale: [1, 1.8, 1],
              opacity: [0, 0.06, 0],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              delay: i * 4,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            <div className="w-full h-full bg-teal-400/20 rounded-full blur-2xl" />
          </motion.div>
        );
      })}
    </div>
  );
};

// Enhanced Video Card with app tags instead of year and duration
const EnhancedVideoCard = React.memo(({ project, onClick, isActive }) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef(null);

  // Map tags to display app names
  const getAppNameFromTag = (tag) => {
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
    // Capitalize first letter of each word for better display
    return tag
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  // Get unique app names from tags - show all tags, not just first few
  const appNames = React.useMemo(() => {
    if (!project.technologies || !Array.isArray(project.technologies))
      return [];
    const names = project.technologies.map((tag) => getAppNameFromTag(tag));
    return [...new Set(names)]; // Remove duplicates
  }, [project.technologies]);

  // Show first 3 apps, rest in +X more
  const MAX_VISIBLE_APPS = 2;
  const visibleApps = appNames.slice(0, MAX_VISIBLE_APPS);
  const hiddenAppsCount = Math.max(0, appNames.length - MAX_VISIBLE_APPS);

  useEffect(() => {
    if (videoRef.current) {
      if (isHovered) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isHovered]);

  return (
    <motion.article
      className="group relative cursor-pointer"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{
        y: -8,
        transition: { duration: 0.4, ease: "easeOut" },
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-3xl bg-gradient-to-r from-teal-400/10 to-teal-600/10 blur-xl"
        animate={{
          opacity: isHovered ? 0.6 : 0,
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Card container */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-sm border border-white/50 shadow-lg">
        {/* Video container */}
        <div className="relative aspect-video overflow-hidden">
          {/* Thumbnail */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
            style={{
              backgroundImage: `url(${project.thumbnail})`,
              opacity: isHovered ? 0 : 1,
            }}
          />

          {/* Video */}
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

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

          {/* Play button */}
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

          {/* Category badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-teal-700">
              {project.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <motion.h3
            className="text-lg font-semibold text-gray-800 mb-4 line-clamp-2"
            animate={{ color: isHovered ? "#0d9488" : "#1f2937" }}
            transition={{ duration: 0.3 }}
          >
            {project.title}
          </motion.h3>

          {/* App/Tools Used Section - Show all apps or at least 2 */}
          {appNames.length > 0 && (
            <div className="mb-3">
              <div className="flex items-center gap-1.5 mb-2">
                <FiTool className="w-3.5 h-3.5 text-teal-600" />
                <span className="text-xs font-medium text-gray-600">
                  Tools Used:
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {visibleApps.map((appName, index) => (
                  <motion.span
                    key={index}
                    className="px-2.5 py-1 bg-teal-50 border border-teal-200 rounded-lg text-xs font-medium text-teal-700 flex items-center gap-1"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "rgba(13, 148, 136, 0.1)",
                    }}
                  >
                    <FiEdit className="w-3 h-3" />
                    {appName}
                  </motion.span>
                ))}
                {hiddenAppsCount > 0 && (
                  <span className="px-2.5 py-1 bg-gray-100 border border-gray-200 rounded-lg text-xs font-medium text-gray-600">
                    +{hiddenAppsCount} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Description */}
          {project.description && (
            <p className="text-sm text-gray-600 line-clamp-2 mt-2">
              {project.description}
            </p>
          )}
        </div>

        {/* Hover line effect */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-400 to-teal-600"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />
      </div>
    </motion.article>
  );
});

// Enhanced Category Filter
const CategoryFilter = ({ categories, activeCategory, onChange, loading }) => {
  return (
    <motion.div
      className="flex flex-wrap justify-center gap-3 mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {categories.map((category) => (
        <motion.button
          key={category.id}
          onClick={() => onChange(category.id)}
          disabled={loading}
          className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
            activeCategory === category.id
              ? "text-white"
              : "text-gray-700 hover:text-teal-600"
          } ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
          whileHover={loading ? {} : { scale: 1.05 }}
          whileTap={loading ? {} : { scale: 0.95 }}
        >
          {activeCategory === category.id && (
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-500 to-teal-600"
              layoutId="activeCategory"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-2">
            {loading && activeCategory === category.id ? (
              <motion.div
                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            ) : (
              category.icon
            )}
            {category.name}
          </span>
        </motion.button>
      ))}
    </motion.div>
  );
};

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

  // Video tools data - map to imported logos
  const videoTools = [
    { name: "DaVinci Resolve", logo: davinchi },
    { name: "Premier Pro", logo: premier },
    { name: "Final Cut Pro", logo: final_cut },
    { name: "CapCut", logo: cap_cut },
    { name: "After Effects", logo: after_effect },
  ];

  // Fetch initial data (categories and all projects)
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading((prev) => ({ ...prev, initial: true }));
        const [categoriesResponse, projectsResponse] = await Promise.all([
          getVisibleCategories(),
          getVideoReels(), // Load all projects initially
        ]);

        // Process categories
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
            icon: <FiFilm className="w-4 h-4" />,
          },
          ...filteredCategories.map((cat) => ({
            id: cat.slug || cat.name.toLowerCase(),
            name: cat.name,
            icon: <FiFilm className="w-4 h-4" />,
          })),
        ];

        setCategories(formattedCategories);

        // Process projects for "all" category
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
          // Use getVideoReels for "all" category
          response = await getVideoReels();
        } else {
          // Use getVideoReelsByCategory for specific categories
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

    fetchProjectsByCategory();
  }, [activeCategory]); // Only re-run when activeCategory changes

  // Helper function to process projects response
  const processProjectsResponse = (response) => {
    let projectsData = response.data?.videoReels || [];

    // Filter out introduction projects
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
      technologies: project.tags || [], // Use tags as app names
      isBest: project.isBest,
    }));

    setProjects(formattedProjects);
  };

  // Handle category change
  const handleCategoryChange = async (categoryId) => {
    if (categoryId === activeCategory) return;

    setActiveCategory(categoryId);
    setSelectedProject(null); // Reset selected project on category change
  };

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
            className="w-16 h-16 border-4 border-teal-500/30 border-t-teal-500 rounded-full mx-auto mb-6"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.p
            className="text-gray-700"
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
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-gray-50 via-white to-teal-50/50 py-16 px-4 md:px-8"
    >
      {/* Background Effects */}
      <FluidBackground />
      <FloatingTools videoTools={videoTools} />

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-teal-400/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-teal-50 to-teal-100/50 border border-teal-200 mb-4">
            <FiFilm className="w-4 h-4 text-teal-600" />
            <span className="text-sm font-medium text-teal-700">
              Portfolio Showcase
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-light text-gray-800 mb-4">
            Our{" "}
            <span className="font-semibold text-teal-600">Visual Projects</span>
          </h1>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our collection of video editing projects showcasing
            expertise in storytelling, color grading, and visual effects.
          </p>
        </motion.div>

        {/* Layout Switcher */}
        <motion.div
          className="flex justify-center gap-2 mb-8"
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

        {/* Category Filter */}
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onChange={handleCategoryChange}
          loading={loading.category}
        />

        {/* Loading indicator for category change */}
        {loading.category && (
          <motion.div
            className="text-center py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="inline-flex items-center gap-2 text-teal-600">
              <motion.div
                className="w-4 h-4 border-2 border-teal-600 border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <span>
                Loading {activeCategory === "all" ? "all" : activeCategory}{" "}
                projects...
              </span>
            </div>
          </motion.div>
        )}

        {/* Projects Grid */}
        {error ? (
          <div className="text-center py-20">
            <p className="text-gray-600">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : !loading.category && projects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600">
              No projects found for this category.
            </p>
          </div>
        ) : (
          <motion.div
            className={`${
              activeLayout === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                : "flex flex-col gap-8 max-w-4xl mx-auto"
            }`}
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

        {/* Stats */}
        <motion.div
          className="mt-20 pt-8 border-t border-gray-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Total Projects", value: projects.length },
              { label: "Categories", value: categories.length - 1 },
              { label: "Tools Used", value: videoTools.length },
              { label: "Editing Apps", value: 5 },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.5 }}
              >
                <div className="text-3xl font-bold text-teal-600 mb-2">
                  {stat.value}+
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Video Modal - Simplified without title and chips */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95"
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
              {/* Close button - positioned absolutely */}
              <motion.button
                onClick={closeModal}
                className="absolute -top-12 right-0 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-20"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <FiX className="w-6 h-6 text-white" />
              </motion.button>

              {/* Video only - clean and minimal */}
              <div className="rounded-xl overflow-hidden shadow-2xl">
                <video
                  ref={modalVideoRef}
                  controls
                  autoPlay
                  className="w-full h-auto"
                  poster={selectedProject.thumbnail}
                >
                  <source src={selectedProject.videoUrl} type="video/mp4" />
                </video>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating CTA */}
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
    </section>
  );
};

export default Projects;
