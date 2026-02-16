import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
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
import useMediaQuery from "../../hooks/useMediaQuery"; // You'll need to create this hook

// Background Logo Only Animation
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
          className={`${
            isMobile ? "w-[95%]" : isTablet ? "w-[90%]" : "w-[80%]"
          } max-w-[1000px] h-auto`}
          style={{
            filter: `
              brightness(1.2)
              contrast(1.1)
              drop-shadow(0 0 120px rgba(13, 148, 136, 0.15))
            `,
          }}
        />
      </motion.div>

      {/* Secondary Larger Logo for Depth - Hide on mobile */}
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
              isMobile ? "w-[95%]" : isTablet ? "w-[90%]" : "w-[85%]"
            } max-w-[1200px] h-auto opacity-60`}
            style={{
              filter: "blur(35px) brightness(1.3)",
              mixBlendMode: "soft-light",
            }}
          />
        </motion.div>
      )}

      {/* Subtle Floating Particles - Fewer on mobile */}
      {Array.from({ length: isMobile ? 5 : 10 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-gradient-to-r from-teal-400/50 to-teal-300/30 rounded-full"
          style={{
            left: `${8 + i * (isMobile ? 12 : 8)}%`,
            top: `${12 + i * (isMobile ? 10 : 8)}%`,
            zIndex: 5,
          }}
          animate={{
            y: [0, -15, 0, -10, 0],
            x: [0, 4, -3, 4, 0],
            scale: [1, 1.2, 0.8, 1.1, 1],
            opacity: [0.2, 0.4, 0.2, 0.35, 0.2],
          }}
          transition={{
            duration: 8 + i * 1.5,
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Glow Effect */}
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
        <div
          className={`${
            isMobile ? "w-[300px] h-[300px]" : "w-[600px] h-[600px]"
          } bg-teal-400/12 rounded-full blur-2xl`}
        />
      </motion.div>
    </div>
  );
};

// Floating App Logos Component - Responsive version
const FloatingAppLogos = ({ videoTools }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");

  const positions = useMemo(() => {
    if (isMobile) {
      return [
        { top: "10%", left: "2%", scale: 0.4 },
        { top: "20%", right: "2%", scale: 0.5 },
        { top: "70%", left: "2%", scale: 0.4 },
        { bottom: "15%", right: "2%", scale: 0.5 },
        { top: "40%", right: "10%", scale: 0.3 },
        { bottom: "35%", left: "5%", scale: 0.4 },
      ];
    } else if (isTablet) {
      return [
        { top: "12%", left: "4%", scale: 0.5 },
        { top: "20%", right: "6%", scale: 0.6 },
        { top: "60%", left: "3%", scale: 0.5 },
        { bottom: "18%", right: "4%", scale: 0.7 },
        { top: "38%", right: "3%", scale: 0.4 },
        { bottom: "30%", left: "15%", scale: 0.6 },
      ];
    } else {
      return [
        { top: "15%", left: "8%", scale: 0.6 },
        { top: "22%", right: "12%", scale: 0.8 },
        { top: "65%", left: "6%", scale: 0.7 },
        { bottom: "20%", right: "8%", scale: 1.0 },
        { top: "42%", right: "5%", scale: 0.5 },
        { bottom: "32%", left: "20%", scale: 0.9 },
      ];
    }
  }, [isMobile, isTablet]);

  const getRandomPosition = useCallback(
    (index) => {
      return positions[index % positions.length];
    },
    [positions]
  );

  // Show fewer logos on mobile
  const displayTools = isMobile ? videoTools.slice(0, 4) : videoTools;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-25">
      {displayTools.map((tool, index) => {
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
              className="relative bg-gradient-to-br from-white/30 to-white/12 backdrop-blur-xl rounded-xl p-2 md:p-3 border border-white/40 shadow-lg"
              whileHover={
                !isMobile
                  ? {
                      scale: 1.4,
                      rotateY: 180,
                      transition: {
                        duration: 0.8,
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                      },
                    }
                  : {}
              }
            >
              <motion.img
                src={tool.logo}
                alt={tool.name}
                className="w-8 h-8 md:w-12 md:h-12 lg:w-14 lg:h-14 object-contain"
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

              {/* Tooltip - Hide on mobile */}
              {!isMobile && (
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
              )}
            </motion.div>
          </motion.div>
        );
      })}

      {/* Floating Particles - Fewer on mobile */}
      {Array.from({ length: isMobile ? 3 : 6 }).map((_, i) => {
        const positions = isMobile
          ? [
              { top: "30%", left: "16%" },
              { top: "45%", right: "22%" },
              { top: "70%", left: "11%" },
            ]
          : [
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
            className="absolute w-0.5 h-0.5 md:w-1 md:h-1 bg-gradient-to-r from-teal-400/50 to-teal-300/30 rounded-full opacity-60 z-20"
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
    </div>
  );
};

const CinematicStack = ({ videos, activeIndex, onVideoChange }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");

  // Adjust rotations for mobile
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
    } else if (isTablet) {
      if (distance === 1) {
        return {
          rotateZ: -8,
          rotateY: -12,
          rotateX: -5,
          opacity: 0.7,
          zIndex: 20,
          scale: 0.95,
        };
      } else {
        return {
          rotateZ: -15,
          rotateY: -18,
          rotateX: -8,
          opacity: 0.4,
          zIndex: 10,
          scale: 0.92,
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

  const rotation0 = getCardRotation(0);
  const rotation1 = getCardRotation(1);
  const rotation2 = getCardRotation(2);

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

  const handleCardClick = (index, e) => {
    if (
      e.target.tagName === "VIDEO" ||
      e.target.closest("video") ||
      e.target.closest(".video-controls") ||
      e.target.closest(".video-controls *")
    ) {
      return;
    }

    if (index !== activeIndex) {
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
    }
  };

  useEffect(() => {
    if (videos.length > 0 && videos[0]?.ref?.current) {
      const video = videos[0].ref.current;
      video.play().catch(() => {
        video.muted = true;
        video.play().catch(() => {});
      });
    }
  }, [videos]);

  return (
    <div className="relative w-full flex items-center justify-center">
      <div className="relative w-full max-w-6xl mx-auto px-2 md:px-4">
        {/* Stack Container */}
        <div className="relative w-full flex items-center justify-center">
          <div
            className={`relative ${
              isMobile
                ? "w-[300px] h-[200px]"
                : isTablet
                ? "w-[600px] h-[350px]"
                : "w-[900px] h-[500px]"
            }`}
          >
            {/* Video 1 */}
            <motion.div
              className="absolute inset-0 cursor-pointer"
              style={{ left: 0, right: 0, margin: "auto" }}
              animate={{
                scale: rotation0.scale,
                rotateZ: rotation0.rotateZ,
                rotateY: rotation0.rotateY,
                rotateX: rotation0.rotateX,
                opacity: rotation0.opacity,
                zIndex: rotation0.zIndex,
              }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              onClick={(e) => handleCardClick(0, e)}
              whileHover={
                !isMobile
                  ? {
                      scale: rotation0.scale * 1.02,
                      transition: { duration: 0.2 },
                    }
                  : {}
              }
            >
              <div className="relative w-full h-full transform-gpu preserve-3d">
                <div className="absolute inset-0 bg-teal-500 rounded-xl md:rounded-2xl shadow-2xl overflow-hidden">
                  <div className="absolute inset-2 md:inset-3 bg-black rounded-lg md:rounded-xl overflow-hidden">
                    {videos[0]?.videoUrl ? (
                      <video
                        ref={videos[0].ref}
                        className="w-full h-full object-cover"
                        poster={videos[0]?.poster}
                        controls
                        loop
                        playsInline
                        onClick={(e) => e.stopPropagation()}
                      >
                        <source src={videos[0].videoUrl} type="video/mp4" />
                      </video>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-900">
                        <p className="text-white/50 text-xs md:text-sm">
                          No video available
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Switch Area - Responsive */}
                  <div className="absolute inset-x-0 top-0 flex justify-between items-start p-2 md:p-4 z-30 pointer-events-none">
                    {/* Left switch - Hide on very small screens */}
                    <div
                      className="pointer-events-auto cursor-pointer group/switch"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCardClick(0, e);
                      }}
                    >
                      <div className="bg-black/60 backdrop-blur-sm px-1.5 md:px-3 py-1 md:py-1.5 rounded-full border border-teal-500/50 shadow-lg hover:bg-teal-600/80 transition-all duration-300 flex items-center gap-1 md:gap-2">
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
                        <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-teal-500 flex items-center justify-center">
                          <span className="text-white font-bold text-[10px] md:text-xs">
                            {titles[0].number}
                          </span>
                        </div>
                        {!isMobile && (
                          <span className="text-white text-xs md:text-sm font-medium truncate max-w-[80px] md:max-w-[120px]">
                            {titles[0].title}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Right switch */}
                    <div
                      className="pointer-events-auto cursor-pointer group/switch"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCardClick(0, e);
                      }}
                    >
                      <div className="bg-black/60 backdrop-blur-sm px-1.5 md:px-3 py-1 md:py-1.5 rounded-full border border-teal-500/50 shadow-lg hover:bg-teal-600/80 transition-all duration-300 flex items-center gap-1 md:gap-2">
                        {activeIndex === 0 ? (
                          <>
                            <span className="w-1 h-1 md:w-1.5 md:h-1.5 bg-white rounded-full animate-pulse" />
                            <span className="text-white text-[10px] md:text-xs font-medium">
                              {isMobile ? "Live" : "Now Playing"}
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="text-white text-[10px] md:text-xs">
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

                  {/* Decorative corners - Hide on mobile */}
                  {!isMobile && (
                    <>
                      <div className="absolute top-0 left-0 w-6 md:w-10 h-6 md:h-10 border-t-4 border-l-4 border-teal-200 rounded-tl-2xl z-10 pointer-events-none" />
                      <div className="absolute bottom-0 right-0 w-6 md:w-10 h-6 md:h-10 border-b-4 border-r-4 border-teal-200 rounded-br-2xl z-10 pointer-events-none" />
                    </>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Video 2 - Similar responsive adjustments */}
            <motion.div
              className="absolute inset-0 cursor-pointer"
              style={{ left: 0, right: 0, margin: "auto" }}
              animate={{
                scale: rotation1.scale,
                rotateZ: rotation1.rotateZ,
                rotateY: rotation1.rotateY,
                rotateX: rotation1.rotateX,
                opacity: rotation1.opacity,
                zIndex: rotation1.zIndex,
              }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              onClick={(e) => handleCardClick(1, e)}
              whileHover={
                !isMobile
                  ? {
                      scale: rotation1.scale * 1.02,
                      transition: { duration: 0.2 },
                    }
                  : {}
              }
            >
              <div className="relative w-full h-full transform-gpu preserve-3d">
                <div className="absolute inset-0 bg-teal-500 rounded-xl md:rounded-2xl shadow-2xl overflow-hidden">
                  <div className="absolute inset-2 md:inset-3 bg-black rounded-lg md:rounded-xl overflow-hidden">
                    {videos[1]?.videoUrl ? (
                      <video
                        ref={videos[1].ref}
                        className="w-full h-full object-cover"
                        poster={videos[1]?.poster}
                        controls
                        loop
                        playsInline
                        onClick={(e) => e.stopPropagation()}
                      >
                        <source src={videos[1].videoUrl} type="video/mp4" />
                      </video>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-900">
                        <p className="text-white/50 text-xs md:text-sm">
                          No video available
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Similar switch area for video 2 */}
                  <div className="absolute inset-x-0 top-0 flex justify-between items-start p-2 md:p-4 z-30 pointer-events-none">
                    <div
                      className="pointer-events-auto cursor-pointer group/switch"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCardClick(1, e);
                      }}
                    >
                      <div className="bg-black/60 backdrop-blur-sm px-1.5 md:px-3 py-1 md:py-1.5 rounded-full border border-teal-500/50 shadow-lg hover:bg-teal-600/80 transition-all duration-300 flex items-center gap-1 md:gap-2">
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
                        <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-teal-500 flex items-center justify-center">
                          <span className="text-white font-bold text-[10px] md:text-xs">
                            {titles[1].number}
                          </span>
                        </div>
                        {!isMobile && (
                          <span className="text-white text-xs md:text-sm font-medium truncate max-w-[80px] md:max-w-[120px]">
                            {titles[1].title}
                          </span>
                        )}
                      </div>
                    </div>

                    <div
                      className="pointer-events-auto cursor-pointer group/switch"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCardClick(1, e);
                      }}
                    >
                      <div className="bg-black/60 backdrop-blur-sm px-1.5 md:px-3 py-1 md:py-1.5 rounded-full border border-teal-500/50 shadow-lg hover:bg-teal-600/80 transition-all duration-300 flex items-center gap-1 md:gap-2">
                        {activeIndex === 1 ? (
                          <>
                            <span className="w-1 h-1 md:w-1.5 md:h-1.5 bg-white rounded-full animate-pulse" />
                            <span className="text-white text-[10px] md:text-xs font-medium">
                              {isMobile ? "Live" : "Now Playing"}
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="text-white text-[10px] md:text-xs">
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

                  {!isMobile && (
                    <>
                      <div className="absolute top-0 right-0 w-6 md:w-10 h-6 md:h-10 border-t-4 border-r-4 border-teal-200 rounded-tr-2xl z-10 pointer-events-none" />
                      <div className="absolute bottom-0 left-0 w-6 md:w-10 h-6 md:h-10 border-b-4 border-l-4 border-teal-200 rounded-bl-2xl z-10 pointer-events-none" />
                    </>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Video 3 - Similar responsive adjustments */}
            <motion.div
              className="absolute inset-0 cursor-pointer"
              style={{ left: 0, right: 0, margin: "auto" }}
              animate={{
                scale: rotation2.scale,
                rotateZ: rotation2.rotateZ,
                rotateY: rotation2.rotateY,
                rotateX: rotation2.rotateX,
                opacity: rotation2.opacity,
                zIndex: rotation2.zIndex,
              }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              onClick={(e) => handleCardClick(2, e)}
              whileHover={
                !isMobile
                  ? {
                      scale: rotation2.scale * 1.02,
                      transition: { duration: 0.2 },
                    }
                  : {}
              }
            >
              <div className="relative w-full h-full transform-gpu preserve-3d">
                <div className="absolute inset-0 bg-teal-500 rounded-xl md:rounded-2xl shadow-2xl overflow-hidden">
                  <div className="absolute inset-2 md:inset-3 bg-black rounded-lg md:rounded-xl overflow-hidden">
                    {videos[2]?.videoUrl ? (
                      <video
                        ref={videos[2].ref}
                        className="w-full h-full object-cover"
                        poster={videos[2]?.poster}
                        controls
                        loop
                        playsInline
                        onClick={(e) => e.stopPropagation()}
                      >
                        <source src={videos[2].videoUrl} type="video/mp4" />
                      </video>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-900">
                        <p className="text-white/50 text-xs md:text-sm">
                          No video available
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Similar switch area for video 3 */}
                  <div className="absolute inset-x-0 top-0 flex justify-between items-start p-2 md:p-4 z-30 pointer-events-none">
                    <div
                      className="pointer-events-auto cursor-pointer group/switch"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCardClick(2, e);
                      }}
                    >
                      <div className="bg-black/60 backdrop-blur-sm px-1.5 md:px-3 py-1 md:py-1.5 rounded-full border border-teal-500/50 shadow-lg hover:bg-teal-600/80 transition-all duration-300 flex items-center gap-1 md:gap-2">
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
                        <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-teal-500 flex items-center justify-center">
                          <span className="text-white font-bold text-[10px] md:text-xs">
                            {titles[2].number}
                          </span>
                        </div>
                        {!isMobile && (
                          <span className="text-white text-xs md:text-sm font-medium truncate max-w-[80px] md:max-w-[120px]">
                            {titles[2].title}
                          </span>
                        )}
                      </div>
                    </div>

                    <div
                      className="pointer-events-auto cursor-pointer group/switch"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCardClick(2, e);
                      }}
                    >
                      <div className="bg-black/60 backdrop-blur-sm px-1.5 md:px-3 py-1 md:py-1.5 rounded-full border border-teal-500/50 shadow-lg hover:bg-teal-600/80 transition-all duration-300 flex items-center gap-1 md:gap-2">
                        {activeIndex === 2 ? (
                          <>
                            <span className="w-1 h-1 md:w-1.5 md:h-1.5 bg-white rounded-full animate-pulse" />
                            <span className="text-white text-[10px] md:text-xs font-medium">
                              {isMobile ? "Live" : "Now Playing"}
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="text-white text-[10px] md:text-xs">
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

                  {!isMobile && (
                    <>
                      <div className="absolute bottom-0 left-0 w-6 md:w-10 h-6 md:h-10 border-b-4 border-l-4 border-teal-200 rounded-bl-2xl z-10 pointer-events-none" />
                      <div className="absolute top-0 right-0 w-6 md:w-10 h-6 md:h-10 border-t-4 border-r-4 border-teal-200 rounded-tr-2xl z-10 pointer-events-none" />
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-2 md:gap-3 mt-4 md:mt-6">
          {[0, 1, 2].map((index) => (
            <motion.button
              key={index}
              className={`${
                activeIndex === index
                  ? "bg-teal-500 w-4 md:w-6"
                  : "bg-gray-300 hover:bg-gray-500 w-2 md:w-2.5"
              } h-2 md:h-2.5 rounded-full transition-all duration-300`}
              onClick={() => {
                if (index !== activeIndex) {
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
                }
              }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
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

// Skeleton Loader Component - Responsive
const HeroSectionSkeleton = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");

  const dummyVideoTools = [
    { name: "DaVinci Resolve", logo: null },
    { name: "Premier Pro", logo: null },
    { name: "Final Cut Pro", logo: null },
    { name: "CapCut", logo: null },
  ];

  return (
    <motion.div
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-gray-50 via-white to-teal-50/80 flex flex-col items-center justify-start pt-12 md:pt-16 lg:pt-20 pb-4 md:pb-6 lg:pb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <BackgroundLogoAnimation />

      <div className="absolute inset-0 overflow-hidden pointer-events-none z-25">
        {dummyVideoTools.map((_, index) => {
          const positions = isMobile
            ? [
                { top: "10%", left: "2%" },
                { top: "20%", right: "2%" },
                { top: "70%", left: "2%" },
                { bottom: "15%", right: "2%" },
              ]
            : [
                { top: "15%", left: "8%" },
                { top: "22%", right: "12%" },
                { top: "65%", left: "6%" },
                { bottom: "20%", right: "8%" },
              ];

          return (
            <motion.div
              key={`skeleton-floating-${index}`}
              className="absolute z-30"
              style={positions[index]}
              animate={{
                opacity: [0.3, 0.6, 0.3],
                y: [0, -15, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                delay: index * 1,
              }}
            >
              <div className="w-10 h-10 md:w-14 md:h-16 bg-gray-200/50 backdrop-blur-sm rounded-xl animate-pulse" />
            </motion.div>
          );
        })}
      </div>

      <div className="relative z-30 w-full max-w-4xl px-3 md:px-4">
        {/* Title Section Skeleton */}
        <div className="text-center mb-4 md:mb-6 lg:mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="h-3 md:h-4 w-32 md:w-48 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full mx-auto mb-2 md:mb-4 animate-pulse" />
            <div className="space-y-2 md:space-y-3">
              <div
                className={`${
                  isMobile ? "h-8 w-64" : "h-10 w-96"
                } bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg mx-auto animate-pulse`}
              />
              <div
                className={`${
                  isMobile ? "h-5 w-48" : "h-6 w-64"
                } bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg mx-auto animate-pulse`}
              />
            </div>
            {!isMobile && (
              <div className="h-3 md:h-4 w-64 md:w-96 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full mx-auto mt-3 md:mt-4 animate-pulse" />
            )}
          </motion.div>
        </div>

        {/* Video Player Skeleton */}
        <motion.div
          className={`w-full ${
            isMobile ? "h-[250px]" : isTablet ? "h-[350px]" : "h-[450px]"
          } relative overflow-hidden rounded-xl border-2 md:border-4 border-white/95 shadow-xl bg-white`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center">
            <div className="flex flex-col items-center w-full max-w-md px-4 md:px-6">
              {/* Animated Spinner */}
              <div className="relative mb-4 md:mb-6">
                <div
                  className={`${
                    isMobile ? "w-12 h-12" : "w-16 h-16 md:w-20 md:h-20"
                  } border-4 border-teal-100 rounded-full`}
                ></div>
                <div
                  className={`absolute top-0 left-0 ${
                    isMobile ? "w-12 h-12" : "w-16 h-16 md:w-20 md:h-20"
                  } border-4 border-transparent border-t-teal-500 rounded-full animate-spin`}
                ></div>
              </div>

              {/* Loading Text */}
              <div className="space-y-2 md:space-y-3 text-center mb-4 md:mb-6 lg:mb-8">
                <div
                  className={`${
                    isMobile ? "h-3 w-32" : "h-4 w-48"
                  } bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse mx-auto`}
                ></div>
                <div
                  className={`${
                    isMobile ? "h-2 w-24" : "h-3 w-32"
                  } bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse mx-auto`}
                ></div>
              </div>

              {/* Progress Bar Skeleton */}
              <div className="w-full space-y-2">
                <div className="h-1 md:h-1.5 bg-gray-200 rounded-full w-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-teal-400 to-teal-600"
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      ease: "linear",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Main HeroSection Component
const HeroSection = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");

  // Create refs for three videos
  const videoRefs = [useRef(null), useRef(null), useRef(null)];
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState([]);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [hasVideoData, setHasVideoData] = useState(false);

  // Booking modal state
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Video editing tools data
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

  // Marquee content - fewer items on mobile
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

  // Fallback videos
  const fallbackVideos = useMemo(
    () => [
      {
        id: 1,
        title: "INTRODUCTION.MP4",
        description: "Professional color grading showcase",
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        poster:
          "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        category: "introduction",
      },
      {
        id: 2,
        title: "INTRODUCTION_2.MP4",
        description: "Motion graphics & VFX",
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        poster:
          "https://images.unsplash.com/photo-1536240478700-b869070f9279?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        category: "introduction_2",
      },
      {
        id: 3,
        title: "INTRODUCTION_3.MP4",
        description: "Production process",
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        poster:
          "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        category: "introduction_3",
      },
    ],
    []
  );

  // Function to fetch video by category
  const fetchVideoByCategory = useCallback(
    async (category, index) => {
      try {
        console.log(`Fetching video for category: ${category}`);
        const response = await getVideoReelsByCategory(category);
        console.log(`Response for ${category}:`, response);

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
            description:
              videoData.description || fallbackVideos[index].description,
            videoUrl: videoData.videoUrl || fallbackVideos[index].videoUrl,
            poster: videoData.thumbnailUrl || fallbackVideos[index].poster,
            ref: videoRefs[index],
            category: category,
          };
        }

        console.log(`No videos found for ${category}, using fallback`);
        return {
          ...fallbackVideos[index],
          ref: videoRefs[index],
        };
      } catch (error) {
        console.error(`Error fetching video for category ${category}:`, error);
        return {
          ...fallbackVideos[index],
          ref: videoRefs[index],
        };
      }
    },
    [fallbackVideos]
  );

  // Fetch all videos on mount
  useEffect(() => {
    const fetchAllVideos = async () => {
      try {
        setLoading(true);

        const categories = ["introduction", "introduction2", "introduction3"];

        // Fetch all videos in parallel
        const fetchPromises = categories.map((category, index) =>
          fetchVideoByCategory(category, index)
        );

        const fetchedVideos = await Promise.all(fetchPromises);
        console.log("All fetched videos:", fetchedVideos);

        setVideos(fetchedVideos);

        // Check if any video has real data (not fallback)
        const hasRealData = fetchedVideos.some(
          (video, index) => video.videoUrl !== fallbackVideos[index].videoUrl
        );
        setHasVideoData(hasRealData);
      } catch (error) {
        console.error("Error fetching videos:", error);
        const fallbackWithRefs = fallbackVideos.map((video, index) => ({
          ...video,
          ref: videoRefs[index],
        }));
        setVideos(fallbackWithRefs);
        setHasVideoData(false);
      } finally {
        setLoading(false);
      }
    };

    fetchAllVideos();
  }, [fetchVideoByCategory, fallbackVideos]);

  // Function to fetch and update a single video by category
  const fetchAndUpdateVideo = useCallback(
    async (category, index) => {
      try {
        console.log(`Fetching updated video for ${category}`);
        const response = await getVideoReelsByCategory(category);

        if (
          response?.status === "success" &&
          response.data?.videoReels?.length > 0
        ) {
          const videoData = response.data.videoReels[0];
          const updatedVideo = {
            id: videoData._id || index + 1,
            title: videoData.title
              ? `${videoData.title.toUpperCase()}.MP4`
              : fallbackVideos[index].title,
            description:
              videoData.description || fallbackVideos[index].description,
            videoUrl: videoData.videoUrl || fallbackVideos[index].videoUrl,
            poster: videoData.thumbnailUrl || fallbackVideos[index].poster,
            ref: videoRefs[index],
            category: category,
          };

          setVideos((prev) => {
            const newVideos = [...prev];
            newVideos[index] = updatedVideo;
            return newVideos;
          });

          // Check if this video has real data
          const hasRealData =
            updatedVideo.videoUrl !== fallbackVideos[index].videoUrl;
          setHasVideoData((prev) => prev || hasRealData);
        }
      } catch (error) {
        console.error(`Error updating video for ${category}:`, error);
      }
    },
    [fallbackVideos]
  );

  // Handle video change - fetch new video for the selected category
  const handleVideoChange = useCallback(
    (index) => {
      setActiveVideoIndex(index);

      // Get the category for the selected index
      const categories = ["introduction", "introduction_2", "introduction_3"];
      const category = categories[index];

      // Fetch new video for this category
      fetchAndUpdateVideo(category, index);
    },
    [fetchAndUpdateVideo]
  );

  // Modal handlers
  const openBookingModal = useCallback(() => setIsBookingModalOpen(true), []);
  const closeBookingModal = useCallback(() => setIsBookingModalOpen(false), []);

  if (loading || videos.length === 0) {
    return <HeroSectionSkeleton />;
  }

  return (
    <motion.div
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-gray-50 via-white to-teal-50/80 flex flex-col items-center justify-start pt-12 md:pt-16 lg:pt-20 pb-4 md:pb-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.0, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <BackgroundLogoAnimation />
      <FloatingAppLogos videoTools={videoTools} />

      <SectionHeader
        subtitle={isMobile ? "Video Editing" : "Next Generation Video Editing"}
        title={isMobile ? "Visual Stories" : "Visual Stories"}
        highlight={isMobile ? "Reimagined" : "Reimagined"}
        description={
          "Transform your vision into captivating visual experiences with our AI-powered editing platform."
        }
        center={true}
        titleSize={isMobile ? "md" : "xl"}
        titleWeight="medium"
        descriptionSize={isMobile ? "sm" : "base"}
        highlightWeight=""
      />

      {/* Video Player Section */}
      <motion.div
        className="relative z-30 w-full max-w-6xl px-2 sm:px-3 md:px-4"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Cinematic Stack Display */}
        <div className="mt-4 md:mt-6 lg:mt-8">
          <CinematicStack
            videos={videos}
            activeIndex={activeVideoIndex}
            onVideoChange={handleVideoChange}
          />
        </div>

        {/* Video Info Banner */}
        <motion.div
          className="mt-3 md:mt-4 lg:mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          <div className="inline-flex items-center gap-1.5 md:gap-2">
            <div
              className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${
                hasVideoData ? "bg-green-500" : "bg-amber-500"
              }`}
            />
            <span className="text-xs md:text-sm text-gray-600">
              {hasVideoData
                ? isMobile
                  ? videos[activeVideoIndex]?.title?.split(".")[0] || "Video"
                  : `Now Showing: ${videos[activeVideoIndex]?.title || "Video"}`
                : isMobile
                ? "Demo"
                : "Demo video playing"}
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Scrolling Marquee */}
      <motion.div
        className="relative w-full max-w-4xl px-2 sm:px-3 md:px-4 mt-3 md:mt-4 lg:mt-6"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="bg-white/95 backdrop-blur-md rounded-lg p-1.5 md:p-2 shadow-md border border-gray-200 overflow-hidden">
          <motion.div
            className="flex gap-4 md:gap-8 items-center"
            animate={{ x: [0, isMobile ? -400 : -800] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: isMobile ? 20 : 30,
                ease: "linear",
              },
            }}
          >
            {[...marqueeItems, ...marqueeItems].map((tech, index) => (
              <div
                key={index}
                className="flex font-allan items-center gap-4 md:gap-8 shrink-0"
              >
                <motion.span
                  className="text-gray-800 font-bold text-[10px] md:text-xs whitespace-nowrap"
                  whileHover={
                    !isMobile
                      ? {
                          color: "#0d9488",
                          scale: 1.02,
                          textShadow: "0 0 12px rgba(13, 148, 136, 0.3)",
                        }
                      : {}
                  }
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  {tech}
                </motion.span>
                <motion.div
                  className="w-0.5 h-0.5 md:w-1 md:h-1 bg-teal-500 rounded-full shadow-sm"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: index * 0.2,
                    ease: "easeInOut",
                  }}
                />
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Booking Modal */}
      <BookingModal isOpen={isBookingModalOpen} onClose={closeBookingModal} />
    </motion.div>
  );
};

export default HeroSection;
