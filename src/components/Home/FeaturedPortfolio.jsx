import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlay, FiX, FiGrid, FiFilm, FiTool, FiEdit } from "react-icons/fi";
import Modal from "react-modal";
import {
  getVideoReels,
  getVisibleCategories,
  getVideoReelsByCategory,
} from "../../services/api";
import bg from "/ICON.png";

// Import app icons
import davinchi from "../../assets/davenchi.png";
import premier from "../../assets/premier.png";
import cap_cut from "../../assets/cap-cut.png";
import after_effect from "../../assets/after-effect.png";
import final_cut from "../../assets/final-cut.png";
import SectionHeader from "../Shared/SectionHeader";

// Set the app element for react-modal
if (typeof window !== "undefined") {
  Modal.setAppElement("#root"); // or whatever your root element ID is
}

// Animation Variants - Optimized for performance
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.34, 1.56, 0.64, 1], // Bounce effect
    },
  },
};

// Smooth pulse animation for skeletons
const pulseAnimation = {
  initial: { opacity: 0.6 },
  animate: {
    opacity: [0.6, 0.8, 0.6],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Optimized Skeleton Components
const ProjectCardSkeleton = () => (
  <motion.div
    className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-sm border border-white/50 shadow-lg"
    variants={scaleIn}
    initial="hidden"
    animate="visible"
  >
    <div className="relative aspect-video overflow-hidden bg-gray-200">
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      />
    </div>
    <div className="p-6">
      <motion.div
        className="h-5 bg-gray-200 rounded-full w-3/4 mb-4"
        variants={pulseAnimation}
        initial="initial"
        animate="animate"
      />
      <div className="flex gap-1.5 mb-3">
        <motion.div
          className="h-6 bg-gray-200 rounded-lg w-16"
          variants={pulseAnimation}
          initial="initial"
          animate="animate"
        />
        <motion.div
          className="h-6 bg-gray-200 rounded-lg w-20"
          variants={pulseAnimation}
          initial="initial"
          animate="animate"
        />
      </div>
      <div className="space-y-2">
        <motion.div
          className="h-3 bg-gray-200 rounded-full w-full"
          variants={pulseAnimation}
          initial="initial"
          animate="animate"
        />
        <motion.div
          className="h-3 bg-gray-200 rounded-full w-5/6"
          variants={pulseAnimation}
          initial="initial"
          animate="animate"
        />
      </div>
    </div>
  </motion.div>
);

const CategorySkeleton = () => (
  <motion.div
    className="flex flex-wrap justify-center gap-3 mb-12"
    variants={staggerContainer}
    initial="hidden"
    animate="visible"
  >
    {[1, 2, 3, 4, 5].map((i) => (
      <motion.div
        key={i}
        className="px-5 py-2.5 rounded-full bg-gray-200 w-24 h-10"
        variants={fadeInUp}
      />
    ))}
  </motion.div>
);

const FeaturedCarouselSkeleton = () => (
  <motion.div
    className="mb-8"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
  >
    <section className="min-h-[400px] backdrop-blur-sm rounded-3xl relative overflow-hidden">
      <div className="relative w-full min-h-[400px] flex items-center justify-center">
        <div
          className="relative w-full flex items-center justify-center"
          style={{ height: "380px" }}
        >
          {/* Center skeleton card */}
          <motion.div
            className="absolute cursor-pointer"
            style={{
              left: "50%",
              top: "50%",
              translateX: "-50%",
              translateY: "-50%",
              width: "320px",
              height: "200px",
            }}
            animate={{
              scale: [1, 1.02, 1],
              transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            <div className="relative bg-white rounded-xl overflow-hidden h-full">
              <motion.div
                className="w-full h-full bg-gray-200"
                animate={{
                  opacity: [0.5, 0.7, 0.5],
                  transition: { duration: 1.5, repeat: Infinity },
                }}
              />
            </div>
          </motion.div>

          {/* Side skeleton cards with smooth animation */}
          {[1, 2].map((i, index) => (
            <motion.div
              key={i}
              className="absolute cursor-pointer"
              style={{
                left: "50%",
                top: "50%",
                translateX: index === 0 ? "-80%" : "-20%",
                translateY: "-50%",
                width: "240px",
                height: "150px",
              }}
              animate={{
                opacity: [0.3, 0.5, 0.3],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.3,
                },
              }}
            >
              <div className="relative bg-white rounded-xl overflow-hidden h-full">
                <div className="w-full h-full bg-gray-200" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </motion.div>
);

// Optimized Background Particles Component
const BackgroundParticles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationId;
    let particles = [];
    let time = 0;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

      // Reinitialize particles on resize
      particles = Array.from({ length: 15 }).map(() => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 80 + 20,
        speed: Math.random() * 0.2 + 0.1,
        offset: Math.random() * Math.PI * 2,
      }));
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth gradient background
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width, canvas.height) / 1.5
      );

      gradient.addColorStop(0, "rgba(13, 148, 136, 0.03)");
      gradient.addColorStop(0.5, "rgba(13, 148, 136, 0.01)");
      gradient.addColorStop(1, "transparent");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Smooth particle animation
      particles.forEach((particle) => {
        const x =
          particle.x + Math.cos(time * particle.speed + particle.offset) * 20;
        const y =
          particle.y + Math.sin(time * particle.speed + particle.offset) * 15;

        const particleGradient = ctx.createRadialGradient(
          x,
          y,
          0,
          x,
          y,
          particle.size
        );
        particleGradient.addColorStop(0, `rgba(13, 148, 136, ${0.02})`);
        particleGradient.addColorStop(1, "transparent");

        ctx.fillStyle = particleGradient;
        ctx.beginPath();
        ctx.arc(x, y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      time += 0.003; // Smoother time increment
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
};

// Optimized Floating Tools Component
const FloatingTools = ({ tools }) => {
  const positions = useMemo(
    () => [
      { top: "15%", left: "8%", scale: 0.6 },
      { top: "22%", right: "12%", scale: 0.8 },
      { top: "65%", left: "6%", scale: 0.7 },
      { bottom: "20%", right: "8%", scale: 1.0 },
      { top: "42%", right: "5%", scale: 0.5 },
      { bottom: "32%", left: "20%", scale: 0.9 },
      { top: "12%", right: "25%", scale: 1.1 },
      { bottom: "16%", right: "32%", scale: 0.4 },
    ],
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-25">
      {tools.map((tool, index) => {
        const position = positions[index % positions.length];
        const randomDelay = useMemo(
          () => index * 0.5 + Math.random() * 2,
          [index]
        );

        return (
          <motion.div
            key={`floating-${tool.name}`}
            className="absolute z-30"
            style={position}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [
                position.scale * 0.9,
                position.scale * 1.1,
                position.scale * 0.9,
              ],
              y: [0, -20, 0],
              x: [0, 10, -10, 0],
              rotate: [0, 3, -3, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              delay: randomDelay,
              ease: [0.45, 0.05, 0.2, 0.99], // Custom cubic-bezier for smoothness
              times: [0, 0.3, 0.6, 1],
            }}
          >
            <motion.div
              className="relative bg-gradient-to-br from-white/30 to-white/12 backdrop-blur-xl rounded-xl p-3 border border-white/40 shadow-lg"
              whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
            >
              <img
                src={tool.logo}
                alt={tool.name}
                className="w-14 h-14 object-contain"
                loading="lazy"
              />
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
};

// Custom Modal Styles
const modalStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.95)",
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem",
  },
  content: {
    position: "relative",
    inset: "auto",
    padding: 0,
    border: "none",
    background: "transparent",
    maxWidth: "1200px",
    width: "100%",
    overflow: "visible",
    borderRadius: "0.75rem",
  },
};

const Projects = () => {
  // ============== STATE MANAGEMENT ==============
  const [featuredVideos, setFeaturedVideos] = useState([]);
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState({
    initial: true,
    category: false,
    featured: true,
  });
  const [error, setError] = useState(null);

  // Featured carousel state
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Grid projects state
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);

  // Refs
  const videoRefs = useRef([]);
  const autoplayRef = useRef(null);
  const containerRef = useRef(null);
  const modalVideoRef = useRef(null);
  const carouselIntervalRef = useRef(null);

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

  // ============== DATA FETCHING ==============
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading((prev) => ({ ...prev, initial: true, featured: true }));

        const [categoriesResponse, projectsResponse, featuredResponse] =
          await Promise.all([
            getVisibleCategories(),
            getVideoReels(),
            getVideoReels({ isBest: true }),
          ]);

        // Process categories
        const categoriesData = categoriesResponse.data?.categories || [];
        const filteredCategories = categoriesData.filter(
          (cat) =>
            cat.slug !== "introduction" &&
            !cat.name.toLowerCase().includes("introduction")
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
        processProjectsResponse(projectsResponse);

        if (
          featuredResponse.status === "success" &&
          featuredResponse.data.videoReels
        ) {
          const transformedVideos = featuredResponse.data.videoReels.map(
            (video) => ({
              id: video._id,
              title: video.title,
              description: video.description,
              videoUrl: video.videoUrl,
              thumbnail: video.thumbnailUrl,
            })
          );
          setFeaturedVideos(transformedVideos);
        }

        setError(null);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load projects. Please try again later.");
      } finally {
        setLoading((prev) => ({ ...prev, initial: false, featured: false }));
      }
    };

    fetchAllData();
  }, []);

  // Fetch projects when category changes
  useEffect(() => {
    const fetchProjectsByCategory = async () => {
      try {
        setLoading((prev) => ({ ...prev, category: true }));

        const response =
          activeCategory === "all"
            ? await getVideoReels()
            : await getVideoReelsByCategory(activeCategory);

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
          } projects.`
        );
      } finally {
        setLoading((prev) => ({ ...prev, category: false }));
      }
    };

    fetchProjectsByCategory();
  }, [activeCategory]);

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

  // ============== CLEANUP VIDEO REFS ==============
  useEffect(() => {
    return () => {
      // Cleanup all video refs when component unmounts
      videoRefs.current.forEach((videoRef) => {
        if (videoRef) {
          videoRef.pause();
          videoRef.removeAttribute("src");
          videoRef.load();
        }
      });
    };
  }, []);

  // ============== FEATURED CAROUSEL FUNCTIONS ==============
  useEffect(() => {
    if (featuredVideos.length === 0 || isPlaying || isHovered) return;

    carouselIntervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % featuredVideos.length);
    }, 5000); // Slightly longer for smoother transitions

    return () => {
      if (carouselIntervalRef.current) {
        clearInterval(carouselIntervalRef.current);
      }
    };
  }, [featuredVideos.length, isPlaying, isHovered]);

  const handleVideoPlay = useCallback((index) => {
    // Pause any other playing videos
    videoRefs.current.forEach((videoRef, i) => {
      if (videoRef && i !== index) {
        videoRef.pause();
      }
    });

    setIsPlaying(true);
    setActiveIndex(index);
    if (carouselIntervalRef.current) {
      clearInterval(carouselIntervalRef.current);
    }
  }, []);

  const handleVideoEnd = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex(
      (prev) => (prev - 1 + featuredVideos.length) % featuredVideos.length
    );
  }, [featuredVideos.length]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % featuredVideos.length);
  }, [featuredVideos.length]);

  const handleThumbnailClick = useCallback((index) => {
    setActiveIndex(index);
  }, []);

  // ============== GRID PROJECTS FUNCTIONS ==============
  const handleCategoryChange = useCallback(
    async (categoryId) => {
      if (categoryId === activeCategory) return;
      setActiveCategory(categoryId);
      setSelectedProject(null);
    },
    [activeCategory]
  );

  // ============== MODAL FUNCTIONS ==============
  const closeModal = useCallback(() => {
    if (modalVideoRef.current) {
      modalVideoRef.current.pause();
      modalVideoRef.current.currentTime = 0;
      modalVideoRef.current.removeAttribute("src");
      modalVideoRef.current.load();
    }
    setSelectedProject(null);
  }, []);

  const openModal = useCallback((project) => {
    setSelectedProject(project);
  }, []);

  // Cleanup modal video on unmount
  useEffect(() => {
    return () => {
      if (modalVideoRef.current) {
        modalVideoRef.current.pause();
        modalVideoRef.current.removeAttribute("src");
        modalVideoRef.current.load();
      }
    };
  }, []);

  // ============== CAROUSEL POSITION CALCULATION ==============
  const getPosition = useCallback(
    (index) => {
      const totalSlides = Math.min(featuredVideos.length, 20);
      const centerIndex = activeIndex;

      let offset = index - centerIndex;
      if (offset > totalSlides / 2) offset -= totalSlides;
      if (offset < -totalSlides / 2) offset += totalSlides;

      const maxOffset = 9;
      const normalizedOffset = Math.max(
        -maxOffset,
        Math.min(maxOffset, offset)
      );

      const spacing = 95;
      const x = normalizedOffset * spacing;

      const absOffset = Math.abs(normalizedOffset);
      const z = -absOffset * 70;
      const scale = 1 - absOffset * 0.05;
      const opacity = Math.max(0.15, 1 - absOffset * 0.06);
      const rotateY = normalizedOffset * 5;

      const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
      const baseWidth = isMobile ? 220 : 340;
      const baseHeight = isMobile ? 140 : 220;

      const width =
        absOffset === 0 ? baseWidth * 1.6 : baseWidth * (1 - absOffset * 0.02);
      const height =
        absOffset === 0
          ? baseHeight * 1.6
          : baseHeight * (1 - absOffset * 0.02);

      const blur = absOffset * 0.4;
      const brightness = Math.max(0.4, 1 - absOffset * 0.04);
      const y = Math.sin(absOffset * 0.4) * 12;

      return {
        x,
        y,
        z,
        scale,
        opacity,
        rotateY,
        width,
        height,
        blur,
        isActive: absOffset === 0,
        zIndex: 100 - absOffset * 1.5,
        brightness,
      };
    },
    [activeIndex, featuredVideos.length]
  );

  // ============== HELPER FUNCTIONS ==============
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

  // ============== LOADING STATE ==============
  if (loading.initial && projects.length === 0) {
    return (
      <section className="relative min-h-screen w-full bg-gradient-to-br from-gray-50 via-white to-teal-50/50 py-16 px-4 md:px-8">
        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Header Skeleton with smooth animations */}
          <motion.div
            className="text-center mb-8"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="h-4 bg-gray-200 rounded-full w-32 mx-auto mb-4"
              variants={fadeInUp}
            />
            <motion.div
              className="h-8 bg-gray-200 rounded-full w-64 mx-auto mb-2"
              variants={fadeInUp}
            />
            <motion.div
              className="h-8 bg-gray-200 rounded-full w-48 mx-auto mb-4"
              variants={fadeInUp}
            />
            <motion.div
              className="h-4 bg-gray-200 rounded-full w-96 max-w-full mx-auto"
              variants={fadeInUp}
            />
          </motion.div>

          <FeaturedCarouselSkeleton />
          <CategorySkeleton />

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <motion.div key={i} variants={scaleIn}>
                <ProjectCardSkeleton />
              </motion.div>
            ))}
          </motion.div>
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
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <BackgroundParticles />

        {/* Logo Animations - Optimized */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-0"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{
            scale: [1, 1.02, 1],
            opacity: [0.08, 0.1, 0.08],
            rotate: [0, 0.5, 0, -0.5, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: [0.4, 0, 0.2, 1],
          }}
        >
          <img
            src={bg}
            alt="Background Logo"
            className="w-[80%] max-w-[1000px] h-auto"
            style={{
              filter:
                "brightness(1.2) contrast(1.1) drop-shadow(0 0 120px rgba(13, 148, 136, 0.15))",
            }}
            loading="lazy"
          />
        </motion.div>

        <motion.div
          className="absolute inset-0 flex items-center justify-center z-0"
          animate={{
            scale: [1.05, 1.1, 1.05],
            opacity: [0.05, 0.07, 0.05],
            rotate: [0, -1, 0, 1, 0],
          }}
          transition={{
            duration: 18,
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
            loading="lazy"
          />
        </motion.div>
      </div>

      {/* Floating Tools */}
      <FloatingTools tools={videoTools} />

      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-teal-400/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header - Title Section */}
        <SectionHeader
          subtitle="Portfolio Showcase"
          title="Our"
          highlight="Visual Projects"
          description="Discover our collection of video editing projects showcasing expertise in storytelling, color grading, and visual effects."
          center={true}
          titleSize="2xl"
          titleWeight="medium"
          descriptionSize="lg"
          highlightWeight=""
          highlightOnNewLine={false}
        />

        {/* ============== FEATURED 3D CAROUSEL SECTION ============== */}
        {loading.featured ? (
          <FeaturedCarouselSkeleton />
        ) : (
          featuredVideos.length > 0 && (
            <motion.div
              className="mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <section className="min-h-[450px] backdrop-blur-sm rounded-3xl relative overflow-hidden">
                {/* Abstract Background Elements */}
                <div className="absolute inset-0">
                  <motion.div
                    className="absolute top-1/4 left-1/4 w-48 h-48 md:w-64 md:h-64 bg-gradient-to-br from-teal-100 to-emerald-100 rounded-full mix-blend-multiply filter blur-2xl opacity-20"
                    animate={{
                      x: [0, 20, -20, 0],
                      y: [0, -20, 20, 0],
                      scale: [1, 1.1, 0.9, 1],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.div
                    className="absolute top-3/4 right-1/4 w-40 h-40 md:w-56 md:h-56 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full mix-blend-multiply filter blur-2xl opacity-20"
                    animate={{
                      x: [0, -20, 20, 0],
                      y: [0, 20, -20, 0],
                      scale: [1, 0.9, 1.1, 1],
                    }}
                    transition={{
                      duration: 22,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </div>

                {/* Main Carousel Container */}
                <div
                  ref={containerRef}
                  className="relative w-full min-h-[450px] flex items-center justify-center overflow-hidden py-4 md:py-6"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <div
                    className="relative w-full flex items-center justify-center"
                    style={{ height: "420px", perspective: "5000px" }}
                  >
                    <AnimatePresence mode="popLayout">
                      {featuredVideos.slice(0, 20).map((video, index) => {
                        const pos = getPosition(index);
                        if (pos.opacity <= 0.1) return null;

                        return (
                          <motion.div
                            key={video.id}
                            className="absolute cursor-pointer"
                            initial={false}
                            animate={{
                              x: pos.x,
                              y: pos.y,
                              z: pos.z,
                              scale: pos.scale,
                              opacity: pos.opacity,
                              rotateY: pos.rotateY,
                              width: pos.width,
                              height: pos.height,
                              zIndex: pos.zIndex,
                              filter: `blur(${pos.blur}px) brightness(${pos.brightness})`,
                            }}
                            transition={{
                              type: "spring",
                              stiffness: 150,
                              damping: 24,
                              mass: 1.2,
                              restDelta: 0.001,
                              restSpeed: 0.001,
                            }}
                            whileHover={{
                              scale: pos.isActive ? 1.12 : pos.scale * 1.08,
                              zIndex: 200,
                              filter: "blur(0px) brightness(1.15)",
                              transition: { duration: 0.3, ease: "easeOut" },
                            }}
                            onClick={() => handleThumbnailClick(index)}
                            style={{
                              left: "50%",
                              top: "50%",
                              translateX: "-50%",
                              translateY: "-50%",
                              transformStyle: "preserve-3d",
                              willChange: "transform, opacity, filter",
                            }}
                          >
                            <motion.div
                              className={`relative bg-white rounded-lg md:rounded-xl overflow-hidden ${
                                pos.isActive ? "ring-2 ring-teal-500" : ""
                              }`}
                              animate={{
                                boxShadow: pos.isActive
                                  ? "0 30px 50px -20px rgba(20, 184, 166, 0.5), 0 0 0 2px rgba(20, 184, 166, 0.3)"
                                  : "0 15px 30px -12px rgba(0, 0, 0, 0.2)",
                              }}
                              transition={{ duration: 0.3 }}
                              style={{ width: "100%", height: "100%" }}
                            >
                              {pos.isActive && isPlaying ? (
                                <motion.video
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ duration: 0.5 }}
                                  ref={(el) => (videoRefs.current[index] = el)}
                                  src={video.videoUrl}
                                  className="w-full h-full object-cover"
                                  poster={video.thumbnail}
                                  controls
                                  autoPlay
                                  playsInline
                                  onEnded={handleVideoEnd}
                                />
                              ) : (
                                <>
                                  <motion.img
                                    src={video.thumbnail}
                                    alt={video.title}
                                    className="w-full h-full object-cover"
                                    whileHover={{ scale: 1.08 }}
                                    transition={{ duration: 0.5 }}
                                    loading="lazy"
                                  />

                                  {/* Gradient Overlay */}
                                  <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{
                                      opacity: pos.isActive ? 1 : 0.7,
                                    }}
                                    transition={{ duration: 0.3 }}
                                    className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"
                                  />

                                  {/* Title */}
                                  <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{
                                      opacity: pos.isActive ? 1 : 0.8,
                                      y: 0,
                                    }}
                                    transition={{ duration: 0.4, delay: 0.1 }}
                                    className="absolute bottom-0 left-0 right-0 p-2 md:p-3"
                                  >
                                    <motion.h3
                                      animate={{
                                        scale:
                                          pos.isActive && isHovered ? 1.03 : 1,
                                      }}
                                      className={`text-white font-anton font-light drop-shadow-lg ${
                                        pos.isActive
                                          ? "text-sm md:text-lg"
                                          : "text-xs md:text-sm"
                                      } truncate`}
                                    >
                                      {video.title}
                                    </motion.h3>
                                  </motion.div>

                                  {/* Play Button */}
                                  {pos.isActive && isHovered && !isPlaying && (
                                    <motion.div
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                      exit={{ opacity: 0 }}
                                      transition={{ duration: 0.2 }}
                                      className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-sm"
                                    >
                                      <motion.button
                                        initial={{ scale: 0.8 }}
                                        animate={{ scale: 1 }}
                                        whileHover={{ scale: 1.12 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleVideoPlay(index);
                                        }}
                                        className="w-12 h-12 md:w-16 md:h-16 bg-teal-500 hover:bg-teal-600 rounded-full flex items-center justify-center shadow-2xl shadow-teal-500/30"
                                      >
                                        <motion.svg
                                          animate={{ x: [0, 2, 0] }}
                                          transition={{
                                            duration: 1.5,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                          }}
                                          className="w-6 h-6 md:w-8 md:h-8 text-white ml-0.5"
                                          fill="currentColor"
                                          viewBox="0 0 24 24"
                                        >
                                          <path d="M8 5v14l11-7z" />
                                        </motion.svg>
                                      </motion.button>
                                    </motion.div>
                                  )}
                                </>
                              )}
                            </motion.div>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>

                  {/* Navigation Buttons */}
                  <motion.button
                    onClick={handlePrev}
                    whileHover={{ scale: 1.1, x: -3 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-50 w-10 h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-teal-600 hover:bg-teal-500 hover:text-white transition-colors duration-300 shadow-lg border border-gray-200"
                  >
                    <svg
                      className="w-5 h-5 md:w-6 md:h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </motion.button>

                  <motion.button
                    onClick={handleNext}
                    whileHover={{ scale: 1.1, x: 3 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-50 w-10 h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-teal-600 hover:bg-teal-500 hover:text-white transition-colors duration-300 shadow-lg border border-gray-200"
                  >
                    <svg
                      className="w-5 h-5 md:w-6 md:h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </motion.button>

                  {/* Progress Indicators */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 flex gap-1.5 md:gap-2">
                    {featuredVideos.slice(0, 16).map((_, index) => (
                      <motion.button
                        key={index}
                        onClick={() => handleThumbnailClick(index)}
                        className="group relative"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 25,
                        }}
                      >
                        <motion.div
                          animate={{
                            width:
                              index === activeIndex
                                ? window.innerWidth >= 768
                                  ? 40
                                  : 24
                                : window.innerWidth >= 768
                                ? 6
                                : 4,
                            backgroundColor:
                              index === activeIndex ? "#14b8a6" : "#d1d5db",
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                          }}
                          className="h-1.5 md:h-2 rounded-full shadow-lg"
                        />
                      </motion.button>
                    ))}
                  </div>
                </div>
              </section>
            </motion.div>
          )
        )}

        {/* Category Filter */}
        {loading.category ? (
          <CategorySkeleton />
        ) : (
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-12 font-poppins"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                disabled={loading.category}
                className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? "text-white"
                    : "text-gray-700 hover:text-teal-600"
                } ${
                  loading.category
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
                variants={fadeInUp}
                whileHover={loading.category ? {} : { scale: 1.05 }}
                whileTap={loading.category ? {} : { scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                {activeCategory === category.id && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-500 to-teal-600"
                    layoutId="activeCategory"
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 30,
                    }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {loading.category && activeCategory === category.id ? (
                    <motion.div
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
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
        )}

        {/* Loading indicator for category change */}
        <AnimatePresence>
          {loading.category && (
            <motion.div
              className="text-center py-8"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
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
        </AnimatePresence>

        {/* Projects Grid */}
        {error ? (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-gray-600">{error}</p>
            <motion.button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              Try Again
            </motion.button>
          </motion.div>
        ) : !loading.category && projects.length === 0 ? (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-gray-600">
              No projects found for this category.
            </p>
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            layout
          >
            {loading.category
              ? [1, 2, 3, 4, 5, 6].map((i) => (
                  <motion.div key={i} variants={scaleIn}>
                    <ProjectCardSkeleton />
                  </motion.div>
                ))
              : projects.map((project, projectIndex) => {
                  const appNames = (project.technologies || []).map((tag) =>
                    getAppNameFromTag(tag)
                  );
                  const uniqueAppNames = [...new Set(appNames)];
                  const visibleApps = uniqueAppNames.slice(0, 2);
                  const hiddenAppsCount = Math.max(
                    0,
                    uniqueAppNames.length - 2
                  );

                  return (
                    <motion.article
                      key={project.id}
                      className="group relative cursor-pointer font-poppins"
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: {
                            duration: 0.5,
                            delay: projectIndex * 0.05,
                            ease: [0.25, 0.1, 0.25, 1],
                          },
                        },
                      }}
                      whileHover={{
                        y: -6,
                        transition: { duration: 0.3, ease: "easeOut" },
                      }}
                      onClick={() => openModal(project)}
                    >
                      <motion.div
                        className="absolute inset-0 rounded-3xl bg-gradient-to-r from-teal-400/10 to-teal-600/10 blur-xl"
                        animate={{ opacity: 0, scale: 1 }}
                        whileHover={{
                          opacity: 0.5,
                          scale: 1.03,
                          transition: { duration: 0.3 },
                        }}
                      />

                      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-sm border border-white/50 shadow-lg">
                        <div className="relative aspect-video overflow-hidden">
                          <div
                            className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
                            style={{
                              backgroundImage: `url(${project.thumbnail})`,
                            }}
                          />

                          <video
                            className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500"
                            muted
                            loop
                            playsInline
                            preload="metadata"
                            poster={project.thumbnail}
                            onMouseEnter={(e) => {
                              e.target.currentTime = 0;
                              e.target.play().catch(() => {});
                            }}
                            onMouseLeave={(e) => e.target.pause()}
                          >
                            <source src={project.videoUrl} type="video/mp4" />
                          </video>

                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

                          <motion.div
                            className="absolute inset-0 flex items-center justify-center"
                            whileHover={{
                              scale: 0,
                              opacity: 0,
                              transition: { duration: 0.3 },
                            }}
                          >
                            <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg">
                              <FiPlay className="w-6 h-6 text-white ml-1" />
                            </div>
                          </motion.div>

                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-teal-700">
                              {project.category}
                            </span>
                          </div>
                        </div>

                        <div className="p-6">
                          <motion.h3
                            className="text-lg font-semibold text-gray-800 mb-4 line-clamp-2"
                            whileHover={{ color: "#0d9488" }}
                            transition={{ duration: 0.3 }}
                          >
                            {project.title}
                          </motion.h3>

                          {uniqueAppNames.length > 0 && (
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
                                    transition={{
                                      delay: index * 0.05 + projectIndex * 0.1,
                                      duration: 0.3,
                                    }}
                                    whileHover={{
                                      scale: 1.05,
                                      backgroundColor:
                                        "rgba(13, 148, 136, 0.1)",
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

                          {project.description && (
                            <p className="text-sm text-gray-600 line-clamp-2 mt-2">
                              {project.description}
                            </p>
                          )}
                        </div>

                        <motion.div
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-400 to-teal-600"
                          initial={{ scaleX: 0 }}
                          whileHover={{ scaleX: 1 }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                        />
                      </div>
                    </motion.article>
                  );
                })}
          </motion.div>
        )}
      </div>

      {/* Video Modal with react-modal */}
      <Modal
        isOpen={!!selectedProject}
        onRequestClose={closeModal}
        style={modalStyles}
        contentLabel="Video Player"
        closeTimeoutMS={300}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        preventScroll={true}
        onAfterOpen={() => {
          if (modalVideoRef.current) {
            modalVideoRef.current.play().catch(() => {});
          }
        }}
        onAfterClose={() => {
          if (modalVideoRef.current) {
            modalVideoRef.current.pause();
            modalVideoRef.current.currentTime = 0;
            modalVideoRef.current.removeAttribute("src");
            modalVideoRef.current.load();
          }
        }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 50 }}
          transition={{
            type: "spring",
            damping: 25,
            stiffness: 300,
          }}
          className="relative"
        >
          {/* Close button - positioned absolutely */}
          <motion.button
            onClick={closeModal}
            className="absolute -top-12 right-0 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-20"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiX className="w-6 h-6 text-white" />
          </motion.button>

          {/* Video only - clean and minimal */}
          <div className="rounded-xl overflow-hidden shadow-2xl">
            <video
              ref={modalVideoRef}
              controls
              className="w-full h-auto"
              poster={selectedProject?.thumbnail}
              onEnded={() => {
                console.log("Video ended");
              }}
            >
              <source src={selectedProject?.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </motion.div>
      </Modal>
    </section>
  );
};

export default Projects;
