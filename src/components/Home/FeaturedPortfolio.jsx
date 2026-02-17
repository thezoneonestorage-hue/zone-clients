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
  FiFilm,
  FiTool,
  FiEdit,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import Modal from "react-modal";
import {
  getVideoReels,
  getVisibleCategories,
  getVideoReelsByCategory,
} from "../../services/api";
import bg from "/ICON.png";
import useMediaQuery from "../../hooks/useMediaQuery";

// Import app icons
import davinchi from "../../assets/davenchi.png";
import premier from "../../assets/premier.png";
import cap_cut from "../../assets/cap-cut.png";
import after_effect from "../../assets/after-effect.png";
import final_cut from "../../assets/final-cut.png";
import SectionHeader from "../Shared/SectionHeader";

// Set the app element for react-modal
if (typeof window !== "undefined") {
  Modal.setAppElement("#root");
}

// Optimized Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] },
  },
};

// Optimized pulse animation
const pulseAnimation = {
  initial: { opacity: 0.6 },
  animate: {
    opacity: [0.6, 0.8, 0.6],
    transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
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

const CategorySkeleton = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <motion.div
      className={
        isMobile
          ? "w-full overflow-x-auto scrollbar-hide pb-2"
          : "flex flex-wrap justify-center gap-3"
      }
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <div
        className={
          isMobile
            ? "flex gap-2 min-w-max px-1"
            : "flex flex-wrap justify-center gap-3"
        }
      >
        {[1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={i}
            className="px-5 py-2.5 rounded-full bg-gray-200 w-24 h-10 flex-shrink-0"
            variants={fadeInUp}
          />
        ))}
      </div>
    </motion.div>
  );
};

const FeaturedCarouselSkeleton = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <motion.div
      className={`${isMobile ? "mb-3" : "mb-8"}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <section className="min-h-[400px] backdrop-blur-sm rounded-3xl relative overflow-hidden">
        <div className="relative w-full min-h-[400px] flex items-center justify-center">
          <div
            className="relative w-full flex items-center justify-center"
            style={{ height: isMobile ? "280px" : "380px" }}
          >
            {/* Center skeleton card */}
            <motion.div
              className="absolute cursor-pointer"
              style={{
                left: "50%",
                top: "50%",
                translateX: "-50%",
                translateY: "-50%",
                width: isMobile ? "220px" : "320px",
                height: isMobile ? "130px" : "200px",
              }}
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="relative bg-white rounded-xl overflow-hidden h-full">
                <div className="w-full h-full bg-gray-200 animate-pulse" />
              </div>
            </motion.div>

            {/* Side skeleton cards - hidden on mobile */}
            {!isMobile &&
              [1, 2].map((i, index) => (
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
                  animate={{ opacity: [0.3, 0.5, 0.3] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.3,
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
};

// Optimized Background Particles Component
const BackgroundParticles = () => {
  const canvasRef = useRef(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let particles = [];
    let time = 0;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      const particleCount = isMobile ? 6 : 15;
      particles = Array.from({ length: particleCount }).map(() => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: isMobile ? Math.random() * 30 + 10 : Math.random() * 80 + 20,
        speed: Math.random() * 0.2 + 0.1,
        offset: Math.random() * Math.PI * 2,
      }));
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

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

      particles.forEach((particle) => {
        const x =
          particle.x + Math.cos(time * particle.speed + particle.offset) * 15;
        const y =
          particle.y + Math.sin(time * particle.speed + particle.offset) * 10;

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
          `rgba(13, 148, 136, ${isMobile ? 0.01 : 0.02})`
        );
        particleGradient.addColorStop(1, "transparent");

        ctx.fillStyle = particleGradient;
        ctx.beginPath();
        ctx.arc(x, y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      time += 0.003;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [isMobile]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
};

// Optimized Floating Tools Component - Desktop only
const FloatingTools = ({ tools }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  if (isMobile) return null;

  const positions = useMemo(
    () => [
      { top: "15%", left: "8%", scale: 0.6 },
      { top: "22%", right: "12%", scale: 0.8 },
      { top: "65%", left: "6%", scale: 0.7 },
      { bottom: "20%", right: "8%", scale: 1.0 },
      { top: "42%", right: "5%", scale: 0.5 },
      { bottom: "32%", left: "20%", scale: 0.9 },
    ],
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-25">
      {tools.map((tool, index) => {
        const position = positions[index % positions.length];

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
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              delay: index * 1.2,
              ease: "easeInOut",
            }}
          >
            <div className="relative bg-gradient-to-br from-white/30 to-white/12 backdrop-blur-xl rounded-xl p-3 border border-white/40 shadow-lg">
              <img
                src={tool.logo}
                alt={tool.name}
                className="w-14 h-14 object-contain"
                loading="lazy"
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

// Optimized Background Logo Animation
const BackgroundLogoAnimation = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute inset-0 flex items-center justify-center z-0"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{
          scale: isMobile ? 1 : [1, 1.02, 1],
          opacity: isMobile ? 0.05 : [0.08, 0.1, 0.08],
          rotate: isMobile ? 0 : [0, 0.5, 0, -0.5, 0],
        }}
        transition={
          isMobile
            ? { duration: 0.5 }
            : { duration: 15, repeat: Infinity, ease: [0.4, 0, 0.2, 1] }
        }
      >
        <img
          src={bg}
          alt="Background Logo"
          className={`w-[${isMobile ? "95%" : "80%"}] max-w-[1000px] h-auto`}
          style={{
            filter:
              "brightness(1.2) contrast(1.1) drop-shadow(0 0 120px rgba(13, 148, 136, 0.15))",
          }}
          loading="lazy"
        />
      </motion.div>

      {!isMobile && (
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
      )}
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

// ============== STACKED CARD CAROUSEL COMPONENT ==============
const StackedCardCarousel = ({
  videos,
  activeIndex,
  setActiveIndex,
  isPlaying,
  setIsPlaying,
  isHovered,
  setIsHovered,
}) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [dragStart, setDragStart] = useState(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);
  const videoRefs = useRef([]);

  const totalCards = videos.length;

  const dimensions = useMemo(() => {
    if (isMobile) {
      return {
        baseWidth: 180,
        baseHeight: 110,
        activeScale: 1.4,
        sideCardScale: 0.8,
        gapMultiplier: 50,
      };
    } else {
      return {
        baseWidth: 340,
        baseHeight: 200,
        activeScale: 1.6,
        sideCardScale: 0.95,
        gapMultiplier: 140,
      };
    }
  }, [isMobile]);

  const handleDragStart = (e) => {
    setIsDragging(true);
    setDragStart(e.clientX);
  };

  const handleDragMove = (e) => {
    if (!isDragging || !dragStart) return;
    const diff = e.clientX - dragStart;
    setDragOffset(diff);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;

    if (Math.abs(dragOffset) > 50) {
      if (dragOffset > 0) {
        setActiveIndex((prev) => (prev - 1 + totalCards) % totalCards);
      } else {
        setActiveIndex((prev) => (prev + 1) % totalCards);
      }
    }

    setIsDragging(false);
    setDragStart(null);
    setDragOffset(0);
  };

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + totalCards) % totalCards);
  }, [totalCards, setActiveIndex]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % totalCards);
  }, [totalCards, setActiveIndex]);

  const handleVideoPlay = useCallback(
    (index) => {
      videoRefs.current.forEach((videoRef, i) => {
        if (videoRef && i !== index) {
          videoRef.pause();
        }
      });
      setIsPlaying(true);
      setActiveIndex(index);
    },
    [setIsPlaying, setActiveIndex]
  );

  const handleVideoEnd = useCallback(() => {
    setIsPlaying(false);
  }, [setIsPlaying]);

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-[300px] sm:min-h-[350px] md:min-h-[450px] flex items-center justify-center overflow-hidden py-1 sm:py-2 md:py-6"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        handleDragEnd();
      }}
      onMouseDown={!isMobile ? handleDragStart : undefined}
      onMouseMove={!isMobile ? handleDragMove : undefined}
      onMouseUp={!isMobile ? handleDragEnd : undefined}
      onTouchStart={isMobile ? (e) => handleDragStart(e.touches[0]) : undefined}
      onTouchMove={isMobile ? (e) => handleDragMove(e.touches[0]) : undefined}
      onTouchEnd={isMobile ? handleDragEnd : undefined}
      style={{ cursor: isDragging ? "grabbing" : "grab" }}
    >
      <div
        className="relative w-full flex items-center justify-center"
        style={{
          height: `${dimensions.baseHeight * 2}px`,
          perspective: isMobile ? "none" : "1500px",
        }}
      >
        <AnimatePresence mode="popLayout">
          {videos.slice(0, isMobile ? 5 : 15).map((video, index) => {
            let position = index - activeIndex;

            if (position > totalCards / 2) position -= totalCards;
            if (position < -totalCards / 2) position += totalCards;

            const translateX =
              position * dimensions.gapMultiplier +
              (isDragging ? dragOffset / 2 : 0);
            const translateZ = isMobile ? 0 : -Math.abs(position) * 80;
            const rotateY = isMobile ? 0 : position * 6;
            const scale = isMobile
              ? 1
              : Math.max(0.5, 1 - Math.abs(position) * 0.2);
            const opacity = isMobile
              ? position === 0
                ? 1
                : 0.4
              : Math.max(0.3, 1 - Math.abs(position) * 0.2);
            const zIndex = 30 - Math.abs(position) * 2;

            const isActive = position === 0;
            const blur = isMobile ? 0 : Math.abs(position) * 0.5;
            const brightness = isMobile
              ? 1
              : Math.max(0.5, 1 - Math.abs(position) * 0.1);

            const width = isActive
              ? dimensions.baseWidth * dimensions.activeScale
              : dimensions.baseWidth * dimensions.sideCardScale;
            const height = isActive
              ? dimensions.baseHeight * dimensions.activeScale
              : dimensions.baseHeight * dimensions.sideCardScale;

            const y = isMobile ? 0 : Math.sin(Math.abs(position) * 0.5) * 8;

            return (
              <motion.div
                key={video.id}
                className="absolute cursor-pointer"
                initial={false}
                animate={{
                  x: translateX,
                  y: y,
                  z: translateZ,
                  scale: scale,
                  opacity: opacity,
                  rotateY: rotateY,
                  width: width,
                  height: height,
                  zIndex: zIndex,
                  filter: isMobile
                    ? "none"
                    : `blur(${blur}px) brightness(${brightness})`,
                }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 25,
                  mass: 0.8,
                }}
                whileHover={
                  !isMobile
                    ? {
                        scale: isActive ? 1.08 : scale * 1.05,
                        zIndex: 200,
                        filter: "blur(0px) brightness(1.1)",
                        transition: { duration: 0.2 },
                      }
                    : undefined
                }
                onClick={() => !isDragging && setActiveIndex(index)}
                style={{
                  left: "50%",
                  top: "50%",
                  translateX: "-50%",
                  translateY: "-50%",
                  transformStyle: isMobile ? "flat" : "preserve-3d",
                  willChange: "transform, opacity",
                }}
              >
                <div
                  className={`relative bg-white rounded-lg md:rounded-xl overflow-hidden shadow-xl ${
                    isActive ? "ring-1 sm:ring-2 ring-teal-500/50" : ""
                  }`}
                  style={{ width: "100%", height: "100%" }}
                >
                  {isActive && isPlaying ? (
                    <video
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
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      <div className="absolute bottom-0 left-0 right-0 p-1.5 sm:p-2 md:p-3">
                        <h3
                          className={`text-white font-anton font-light drop-shadow-lg ${
                            isActive
                              ? "text-[10px] sm:text-xs md:text-sm lg:text-base"
                              : "text-[8px] sm:text-[10px] md:text-xs"
                          } truncate`}
                        >
                          {video.title}
                        </h3>

                        {isActive && isHovered && (
                          <div className="mt-0.5 sm:mt-1">
                            <span className="inline-block px-1 sm:px-2 py-0.5 bg-teal-500/80 backdrop-blur-sm rounded-full text-[6px] sm:text-[8px] md:text-xs text-white">
                              Featured
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="absolute top-1 sm:top-2 left-1 sm:left-2 bg-black/60 backdrop-blur-sm text-white text-[6px] sm:text-[8px] md:text-xs px-1 sm:px-2 py-0.5 rounded-full">
                        #{String(index + 1).padStart(2, "0")}
                      </div>

                      {isActive && isHovered && !isPlaying && (
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center backdrop-blur-[2px]">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleVideoPlay(index);
                            }}
                            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-teal-500 hover:bg-teal-600 rounded-full flex items-center justify-center shadow-lg"
                          >
                            <svg
                              className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white ml-0.5"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-1 sm:left-2 md:left-4 top-1/2 -translate-y-1/2 z-50 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-teal-600 hover:bg-teal-500 hover:text-white transition-colors shadow-md sm:shadow-lg"
      >
        <svg
          className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5"
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
      </button>

      <button
        onClick={handleNext}
        className="absolute right-1 sm:right-2 md:right-4 top-1/2 -translate-y-1/2 z-50 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-teal-600 hover:bg-teal-500 hover:text-white transition-colors shadow-md sm:shadow-lg"
      >
        <svg
          className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5"
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
      </button>

      {/* Progress Indicators */}
      <div className="absolute bottom-1 sm:bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 z-50 flex gap-0.5 sm:gap-1 md:gap-1.5">
        {videos.slice(0, isMobile ? 5 : 10).map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className="group relative"
          >
            <div
              style={{
                width:
                  index === activeIndex
                    ? isMobile
                      ? 10
                      : 24
                    : isMobile
                    ? 2
                    : 6,
                backgroundColor: index === activeIndex ? "#14b8a6" : "#d1d5db",
              }}
              className="h-1 sm:h-1.5 md:h-2 rounded-full transition-all duration-300"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

const Projects = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const categoryScrollRef = useRef(null);

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
  const modalVideoRef = useRef(null);

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

  useEffect(() => {
    const fetchProjectsByCategory = async () => {
      // Don't show loading if we're already loading or if it's the same category
      if (activeCategory === "all" && projects.length > 0) {
        return;
      }

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

  // ============== GRID PROJECTS FUNCTIONS ==============
  const handleCategoryChange = useCallback(
    (categoryId) => {
      if (categoryId === activeCategory) return;
      setActiveCategory(categoryId);
      setSelectedProject(null);
    },
    [activeCategory]
  );

  const scrollCategories = (direction) => {
    if (categoryScrollRef.current) {
      const scrollAmount = direction === "left" ? -200 : 200;
      categoryScrollRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

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
          <motion.div
            className="text-center mb-6"
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
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
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-gray-50 via-white to-teal-50/50 py-12 md:py-16 px-4 md:px-8"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <BackgroundParticles />
        <BackgroundLogoAnimation />
      </div>

      {/* Floating Tools - Desktop only */}
      {!isMobile && <FloatingTools tools={videoTools} />}

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

        {/* ============== FEATURED STACKED CARD CAROUSEL SECTION ============== */}
        {loading.featured ? (
          <FeaturedCarouselSkeleton />
        ) : (
          featuredVideos.length > 0 && (
            <motion.div
              className={`${isMobile ? "mb-3" : "mb-8"}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <section className="min-h-[350px] md:min-h-[450px] backdrop-blur-sm rounded-3xl relative overflow-hidden">
                {!isMobile && (
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
                )}

                <StackedCardCarousel
                  videos={featuredVideos}
                  activeIndex={activeIndex}
                  setActiveIndex={setActiveIndex}
                  isPlaying={isPlaying}
                  setIsPlaying={setIsPlaying}
                  isHovered={isHovered}
                  setIsHovered={setIsHovered}
                />
              </section>
            </motion.div>
          )
        )}

        {/* Category Filter - Mobile: scrollable, Desktop: centered grid */}
        {loading.category ? (
          <CategorySkeleton />
        ) : (
          <div
            className={`${isMobile ? "relative w-full mb-4" : "mb-6 md:mb-8"}`}
          >
            {/* Mobile scroll buttons */}
            {isMobile && (
              <>
                <button
                  onClick={() => scrollCategories("left")}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-6 h-6 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-teal-600 shadow-md"
                >
                  <FiChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollCategories("right")}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-6 h-6 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-teal-600 shadow-md"
                >
                  <FiChevronRight className="w-4 h-4" />
                </button>
              </>
            )}

            {/* Categories container */}
            <div
              ref={categoryScrollRef}
              className={`font-poppins ${
                isMobile
                  ? "overflow-x-auto scrollbar-hide px-8 py-1"
                  : "flex flex-wrap justify-center gap-3"
              }`}
            >
              <div
                className={
                  isMobile
                    ? "flex gap-2 min-w-max"
                    : "flex flex-wrap justify-center gap-3"
                }
              >
                {categories.map((category, index) => (
                  <motion.button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    disabled={loading.category}
                    className={`relative px-4 py-2 md:px-5 md:py-2.5 rounded-full text-xs md:text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                      activeCategory === category.id
                        ? "text-white"
                        : "text-gray-700 hover:text-teal-600"
                    } ${
                      loading.category
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer"
                    } ${isMobile ? "flex-shrink-0" : ""}`}
                    variants={!isMobile ? fadeInUp : undefined}
                    initial={!isMobile ? "hidden" : undefined}
                    animate={!isMobile ? "visible" : undefined}
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
                    <span className="relative z-10 flex items-center gap-1 md:gap-2">
                      {category.icon}
                      {category.name}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Loading indicator for category change - only shows in video grid area */}
        <AnimatePresence>
          {loading.category && (
            <motion.div
              className="text-center py-8 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="inline-flex items-center gap-2 text-teal-600">
                <div className="w-5 h-5 border-2 border-teal-600 border-t-transparent rounded-full animate-spin" />
                <span className="text-sm">
                  Loading{" "}
                  {activeCategory === "all"
                    ? "projects"
                    : `${activeCategory} projects`}
                  ...
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Projects Grid */}
        {error ? (
          <motion.div
            className="text-center py-12"
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
            >
              Try Again
            </motion.button>
          </motion.div>
        ) : !loading.category && projects.length === 0 ? (
          <motion.div
            className="text-center py-12"
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            layout
          >
            {projects.map((project, projectIndex) => {
              const appNames = (project.technologies || []).map((tag) =>
                getAppNameFromTag(tag)
              );
              const uniqueAppNames = [...new Set(appNames)];
              const visibleApps = uniqueAppNames.slice(0, 2);
              const hiddenAppsCount = Math.max(0, uniqueAppNames.length - 2);

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
                        duration: 0.4,
                        delay: projectIndex * 0.03,
                      },
                    },
                  }}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
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
                        <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg">
                          <FiPlay className="w-5 h-5 md:w-6 md:h-6 text-white ml-1" />
                        </div>
                      </motion.div>

                      <div className="absolute top-3 left-3">
                        <span className="px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] md:text-xs font-medium text-teal-700">
                          {project.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 md:p-5">
                      <motion.h3
                        className="text-base md:text-lg font-semibold text-gray-800 mb-3 line-clamp-2"
                        whileHover={{ color: "#0d9488" }}
                        transition={{ duration: 0.3 }}
                      >
                        {project.title}
                      </motion.h3>

                      {uniqueAppNames.length > 0 && (
                        <div className="mb-2">
                          <div className="flex items-center gap-1.5 mb-1.5">
                            <FiTool className="w-3 h-3 text-teal-600" />
                            <span className="text-[10px] md:text-xs font-medium text-gray-600">
                              Tools Used:
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {visibleApps.map((appName, index) => (
                              <span
                                key={index}
                                className="px-2 py-0.5 bg-teal-50 border border-teal-200 rounded-lg text-[10px] md:text-xs font-medium text-teal-700 flex items-center gap-1"
                              >
                                <FiEdit className="w-2.5 h-2.5" />
                                {appName}
                              </span>
                            ))}
                            {hiddenAppsCount > 0 && (
                              <span className="px-2 py-0.5 bg-gray-100 border border-gray-200 rounded-lg text-[10px] md:text-xs font-medium text-gray-600">
                                +{hiddenAppsCount}
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {project.description && (
                        <p className="text-xs md:text-sm text-gray-600 line-clamp-2 mt-2">
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

      {/* Video Modal */}
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
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 50 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative"
        >
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

          <div className="rounded-xl overflow-hidden shadow-2xl">
            <video
              ref={modalVideoRef}
              controls
              className="w-full h-auto"
              poster={selectedProject?.thumbnail}
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
