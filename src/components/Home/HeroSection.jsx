import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import Marquee from "react-fast-marquee";
import { getVideoReelsByCategory } from "../../services/api";
import BookingModal from "../BookingModal";
import davinchi from "../../assets/davenchi.png";
import premier from "../../assets/premier.png";
import cap_cut from "../../assets/cap-cut.png";
import after_effect from "../../assets/after-effect.png";
import blender from "../../assets/blender.png";
import final_cut from "../../assets/final-cut.png";
import bg from "/ICON.png";
import SectionHeader from "../Shared/SectionHeader";
import useMediaQuery from "../../hooks/useMediaQuery";

// Background Logo Only Animation - Optimized
const BackgroundLogoAnimation = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Main Background Logo */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center z-0"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{
          scale: isMobile ? 1 : [1, 1.03, 1],
          opacity: isMobile ? 0.1 : [0.08, 0.12, 0.08],
          rotate: isMobile ? 0 : [0, 1, 0, -1, 0],
        }}
        transition={
          isMobile
            ? { duration: 0.5 }
            : { duration: 12, repeat: Infinity, ease: [0.4, 0, 0.2, 1] }
        }
      >
        <img
          src={bg}
          alt="Background Logo"
          className={`${
            isMobile ? "w-[95%]" : isTablet ? "w-[90%]" : "w-[80%]"
          } max-w-[1000px] h-auto`}
          style={{
            filter: `brightness(1.2) contrast(1.1) drop-shadow(0 0 120px rgba(13, 148, 136, 0.15))`,
          }}
          loading="lazy"
        />
      </motion.div>

      {/* Secondary Larger Logo for Depth - Desktop only */}
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
            className={`${
              isTablet ? "w-[90%]" : "w-[85%]"
            } max-w-[1200px] h-auto opacity-60`}
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

// Floating App Logos - Desktop only
const FloatingAppLogos = ({ videoTools }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  if (isMobile) return null;

  const positions = [
    { top: "15%", left: "8%", scale: 0.6 },
    { top: "22%", right: "12%", scale: 0.8 },
    { top: "65%", left: "6%", scale: 0.7 },
    { bottom: "20%", right: "8%", scale: 1.0 },
    { top: "42%", right: "5%", scale: 0.5 },
    { bottom: "32%", left: "20%", scale: 0.9 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-25">
      {videoTools.map((tool, index) => {
        const position = positions[index % positions.length];

        return (
          <motion.div
            key={`floating-${tool.name}`}
            className="absolute z-30"
            style={position}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0.4, 0.9, 0.4],
              scale: [
                position.scale * 0.8,
                position.scale * 1.2,
                position.scale * 0.8,
              ],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 14 + Math.random() * 8,
              repeat: Infinity,
              delay: index * 1.2,
            }}
          >
            <motion.div
              className="relative bg-gradient-to-br from-white/30 to-white/12 backdrop-blur-xl rounded-xl p-3 border border-white/40 shadow-lg"
              whileHover={{
                scale: 1.4,
                rotateY: 180,
                transition: { duration: 0.8, type: "spring" },
              }}
            >
              <img
                src={tool.logo}
                alt={tool.name}
                className="w-12 h-12 lg:w-14 lg:h-14 object-contain"
                loading="lazy"
              />
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
};

// Cinematic Stack Component - Original design preserved
const CinematicStack = ({ videos, activeIndex, onVideoChange }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 50;

  const canSwipeLeft = activeIndex < videos.length - 1;
  const canSwipeRight = activeIndex > 0;

  // Touch handlers
  const onTouchStart = (e) => {
    if (!isMobile) return;
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    if (!isMobile) return;
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!isMobile || !touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && canSwipeLeft) {
      handleVideoChange(activeIndex + 1);
    } else if (isRightSwipe && canSwipeRight) {
      handleVideoChange(activeIndex - 1);
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  const handleVideoChange = (index) => {
    if (index === activeIndex) return;

    videos.forEach((v, i) => {
      if (i !== index && v.ref?.current) {
        v.ref.current.pause();
      }
    });

    onVideoChange(index);

    setTimeout(() => {
      if (videos[index]?.ref?.current) {
        videos[index].ref.current.play().catch(() => {});
      }
    }, 100);
  };

  const getCardRotation = (cardIndex) => {
    if (cardIndex === activeIndex) {
      return {
        rotateZ: 0,
        rotateY: 0,
        rotateX: 0,
        opacity: 1,
        zIndex: 30,
        scale: 1,
      };
    }

    const distance = (cardIndex - activeIndex + 3) % 3;

    if (isMobile) {
      if (distance === 1) {
        return {
          rotateZ: -5,
          rotateY: -8,
          rotateX: -3,
          opacity: 0.6,
          zIndex: 20,
          scale: 0.92,
        };
      } else {
        return {
          rotateZ: -10,
          rotateY: -12,
          rotateX: -5,
          opacity: 0.3,
          zIndex: 10,
          scale: 0.88,
        };
      }
    } else {
      if (distance === 1) {
        return {
          rotateZ: -10,
          rotateY: -14,
          rotateX: -6,
          opacity: 0.75,
          zIndex: 20,
          scale: 0.97,
        };
      } else {
        return {
          rotateZ: -18,
          rotateY: -22,
          rotateX: -10,
          opacity: 0.5,
          zIndex: 10,
          scale: 0.94,
        };
      }
    }
  };

  const titles = [
    { number: "01", title: videos[0]?.title?.split(".")[0] || "Introduction" },
    {
      number: "02",
      title: videos[1]?.title?.split(".")[0] || "Introduction 2",
    },
    {
      number: "03",
      title: videos[2]?.title?.split(".")[0] || "Introduction 3",
    },
  ];

  useEffect(() => {
    if (videos.length > 0 && videos[0]?.ref?.current) {
      videos[0].ref.current.play().catch(() => {});
    }
  }, [videos]);

  return (
    <div className="relative w-full flex items-center justify-center">
      <div className="relative w-full max-w-6xl mx-auto px-2 md:px-4">
        <div
          className={`relative ${
            isMobile
              ? "w-[300px] h-[180px] mx-auto"
              : "w-[900px] h-[500px] mx-auto"
          }`}
          onTouchStart={isMobile ? onTouchStart : undefined}
          onTouchMove={isMobile ? onTouchMove : undefined}
          onTouchEnd={isMobile ? onTouchEnd : undefined}
        >
          {videos.slice(0, 3).map((video, index) => {
            const rotation = getCardRotation(index);

            return (
              <motion.div
                key={`video-${index}`}
                className="absolute inset-0 cursor-pointer"
                style={{ left: 0, right: 0, margin: "auto" }}
                animate={{
                  scale: rotation.scale,
                  rotateZ: rotation.rotateZ,
                  rotateY: rotation.rotateY,
                  rotateX: rotation.rotateX,
                  opacity: rotation.opacity,
                  zIndex: rotation.zIndex,
                }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                onClick={(e) => {
                  if (e.target.closest(".switch-button")) return;
                  if (index !== activeIndex) handleVideoChange(index);
                }}
              >
                <div className="relative w-full h-full transform-gpu preserve-3d">
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-teal-600 rounded-xl md:rounded-2xl shadow-2xl overflow-hidden border border-teal-300/40">
                    <div className="absolute inset-0.5 md:inset-1 bg-black rounded-lg md:rounded-xl overflow-hidden">
                      {video?.videoUrl ? (
                        <video
                          ref={video.ref}
                          className="w-full h-full object-cover"
                          poster={video?.poster}
                          controls
                          loop
                          playsInline
                          muted={index !== activeIndex}
                        >
                          <source src={video.videoUrl} type="video/mp4" />
                        </video>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-900">
                          <p className="text-white/50 text-xs md:text-sm">
                            No video available
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Switch Area - Original design */}
                    <div className="absolute inset-x-0 top-0 flex justify-between items-start p-1.5 md:p-4 z-30 pointer-events-none">
                      <div
                        className="pointer-events-auto cursor-pointer group/switch switch-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleVideoChange(index);
                        }}
                      >
                        <div className="bg-black/60 backdrop-blur-sm px-1.5 md:px-3 py-0.5 md:py-1.5 rounded-full border border-teal-500/50 shadow-lg hover:bg-teal-600/80 transition-all duration-300 flex items-center gap-1 md:gap-2">
                          {!isMobile && (
                            <svg
                              className="w-3 h-3 md:w-4 md:h-4 text-teal-400 group-hover/switch:text-white"
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
                          )}
                          <div className="w-4 h-4 md:w-6 md:h-6 rounded-full bg-teal-500 flex items-center justify-center">
                            <span className="text-white font-bold text-[8px] md:text-xs">
                              {titles[index].number}
                            </span>
                          </div>
                          {!isMobile && (
                            <span className="text-white text-xs md:text-sm font-medium truncate max-w-[120px]">
                              {titles[index].title}
                            </span>
                          )}
                        </div>
                      </div>

                      <div
                        className="pointer-events-auto cursor-pointer group/switch switch-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleVideoChange(index);
                        }}
                      >
                        <div className="bg-black/60 backdrop-blur-sm px-1.5 md:px-3 py-0.5 md:py-1.5 rounded-full border border-teal-500/50 shadow-lg hover:bg-teal-600/80 transition-all duration-300 flex items-center gap-1 md:gap-2">
                          {activeIndex === index ? (
                            <>
                              <span className="w-1 h-1 md:w-1.5 md:h-1.5 bg-white rounded-full animate-pulse" />
                              <span className="text-white text-[8px] md:text-xs font-medium">
                                {isMobile ? "Live" : "Now Playing"}
                              </span>
                            </>
                          ) : (
                            <>
                              <span className="text-white text-[8px] md:text-xs">
                                {isMobile ? "" : "Switch"}
                              </span>
                              <svg
                                className="w-3 h-3 md:w-4 md:h-4 text-teal-400 group-hover/switch:text-white"
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
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Decorative corners - Desktop only */}
                    {!isMobile && (
                      <>
                        <div className="absolute top-0 left-0 w-4 md:w-5 h-4 md:h-5 border-t-2 border-l-2 border-teal-200/80 rounded-tl-2xl z-10 pointer-events-none" />
                        <div className="absolute bottom-0 right-0 w-4 md:w-5 h-4 md:h-5 border-b-2 border-r-2 border-teal-200/80 rounded-br-2xl z-10 pointer-events-none" />
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-2 md:gap-3 mt-2 md:mt-6">
          {[0, 1, 2].map((index) => (
            <motion.button
              key={index}
              className={`${
                activeIndex === index
                  ? "bg-teal-500 w-3 md:w-6"
                  : "bg-gray-300 hover:bg-gray-500 w-1.5 md:w-2.5"
              } h-1.5 md:h-2.5 rounded-full transition-all duration-300`}
              onClick={() => handleVideoChange(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>

        {/* Swipe instruction for mobile */}
        {isMobile && (
          <motion.div
            className="text-center mt-1 text-[10px] text-teal-600/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 2 }}
          >
            ← Swipe to switch videos →
          </motion.div>
        )}
      </div>

      <style jsx>{`
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .transform-gpu {
          transform: translate3d(0, 0, 0);
        }
      `}</style>
    </div>
  );
};

// Skeleton Loader
const HeroSectionSkeleton = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-gray-50 via-white to-teal-50/80 flex flex-col items-center justify-center pt-8 pb-4">
      <BackgroundLogoAnimation />

      <div className="relative z-30 w-full max-w-4xl px-3">
        <div className="text-center mb-4">
          <div className="h-3 w-32 bg-gray-200 rounded-full mx-auto mb-2 animate-pulse" />
          <div className="h-8 w-48 bg-gray-200 rounded-lg mx-auto animate-pulse" />
          <div className="h-3 w-64 bg-gray-200 rounded-full mx-auto mt-2 animate-pulse" />
        </div>

        <div
          className={`w-full ${
            isMobile ? "h-[180px]" : "h-[450px]"
          } relative overflow-hidden rounded-xl bg-white shadow-xl`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center">
            <div className="flex flex-col items-center">
              <div className={`${isMobile ? "w-8 h-8" : "w-16 h-16"} relative`}>
                <div className="w-full h-full border-4 border-teal-100 rounded-full" />
                <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-teal-500 rounded-full animate-spin" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main HeroSection Component
const HeroSection = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const videoRefs = [useRef(null), useRef(null), useRef(null)];
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState([]);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

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

  const marqueeItems = useMemo(
    () =>
      isMobile
        ? ["4K", "COLOR", "MOTION", "VFX", "SOUND", "3D"]
        : [
            "4K RESOLUTION",
            "COLOR GRADING",
            "MOTION GRAPHICS",
            "VISUAL EFFECTS",
            "SOUND DESIGN",
            "AI ENHANCEMENT",
            "DRONE FOOTAGE",
            "CINEMATIC EDITING",
            "3D ANIMATION",
            "VR CONTENT",
          ],
    [isMobile]
  );

  const fallbackVideos = useMemo(
    () => [
      {
        id: 1,
        title: "INTRODUCTION.MP4",
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        poster: "https://images.unsplash.com/photo-1611224923853-80b023f02d71",
        category: "introduction",
      },
      {
        id: 2,
        title: "INTRODUCTION_2.MP4",
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        poster: "https://images.unsplash.com/photo-1536240478700-b869070f9279",
        category: "introduction_2",
      },
      {
        id: 3,
        title: "INTRODUCTION_3.MP4",
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        poster: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37",
        category: "introduction_3",
      },
    ],
    []
  );

  const fetchVideoByCategory = useCallback(
    async (category, index) => {
      try {
        const response = await getVideoReelsByCategory(category);

        if (
          response?.status === "success" &&
          response.data?.videoReels?.length > 0
        ) {
          const videoData = response.data.videoReels[0];
          return {
            id: videoData._id || index + 1,
            title: videoData.title
              ? `${videoData.title.toUpperCase()}.MP4`
              : fallbackVideos[index].title,
            videoUrl: videoData.videoUrl || fallbackVideos[index].videoUrl,
            poster: videoData.thumbnailUrl || fallbackVideos[index].poster,
            ref: videoRefs[index],
            category: category,
          };
        }

        return { ...fallbackVideos[index], ref: videoRefs[index] };
      } catch {
        return { ...fallbackVideos[index], ref: videoRefs[index] };
      }
    },
    [fallbackVideos]
  );

  useEffect(() => {
    const fetchAllVideos = async () => {
      try {
        setLoading(true);
        const categories = ["introduction", "introduction_2", "introduction_3"];

        const fetchPromises = categories.map((category, index) =>
          fetchVideoByCategory(category, index)
        );

        const fetchedVideos = await Promise.all(fetchPromises);
        setVideos(fetchedVideos);
      } catch {
        const fallbackWithRefs = fallbackVideos.map((video, index) => ({
          ...video,
          ref: videoRefs[index],
        }));
        setVideos(fallbackWithRefs);
      } finally {
        setLoading(false);
      }
    };

    fetchAllVideos();
  }, [fetchVideoByCategory, fallbackVideos]);

  const handleVideoChange = useCallback((index) => {
    setActiveVideoIndex(index);
  }, []);

  if (loading || videos.length === 0) {
    return <HeroSectionSkeleton />;
  }

  return (
    <motion.div
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-gray-50 via-white to-teal-50/80 flex flex-col items-center justify-center pt-4 md:pt-16 pb-2 md:pb-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.0 }}
    >
      <BackgroundLogoAnimation />

      {/* Floating logos - desktop only */}
      {!isMobile && <FloatingAppLogos videoTools={videoTools} />}

      <SectionHeader
        subtitle={isMobile ? "Video Editing" : "Next Generation Video Editing"}
        title="Visual Stories"
        highlight="Reimagined"
        description="Transform your vision into captivating visual experiences with our AI-powered editing platform."
        center={true}
        titleSize={isMobile ? "2xl" : "xl"}
        descriptionSize={isMobile ? "sm" : "base"}
      />

      <motion.div
        className="relative z-30 w-full max-w-6xl px-2 sm:px-3 md:px-4"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.7 }}
      >
        <div className="mt-1 md:mt-6">
          <CinematicStack
            videos={videos}
            activeIndex={activeVideoIndex}
            onVideoChange={handleVideoChange}
          />
        </div>
      </motion.div>

      <motion.div
        className="relative w-full max-w-4xl px-2 sm:px-3 md:px-4 mt-3 md:mt-20"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <div className="bg-white/95 backdrop-blur-md rounded-lg p-1.5 md:p-2 shadow-md border border-gray-200 overflow-hidden">
          <Marquee
            gradient={false}
            speed={isMobile ? 30 : 40}
            pauseOnHover={false}
            delay={0}
            direction="left"
          >
            {marqueeItems.map((tech, index) => (
              <div
                key={index}
                className="flex font-allan items-center gap-4 md:gap-8 mx-4 md:mx-8"
              >
                <span className="text-gray-800 font-bold text-[10px] md:text-xs whitespace-nowrap">
                  {tech}
                </span>
                <div className="w-0.5 h-0.5 md:w-1 md:h-1 bg-teal-500 rounded-full" />
              </div>
            ))}
          </Marquee>
        </div>
      </motion.div>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </motion.div>
  );
};

export default HeroSection;
