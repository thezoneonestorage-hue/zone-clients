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

// Background Logo Only Animation
const BackgroundLogoAnimation = () => {
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
          className="absolute w-1 h-1 bg-gradient-to-r from-teal-400/50 to-teal-300/30 rounded-full"
          style={{
            left: `${8 + i * 8}%`,
            top: `${12 + i * 8}%`,
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

// Floating App Logos Component
const FloatingAppLogos = ({ videoTools }) => {
  // Memoize positions array
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

  const getRandomPosition = useCallback(
    (index) => {
      return positions[index % positions.length];
    },
    [positions]
  );

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

// Custom hook for video autoplay logic
const useVideoAutoplay = (videoRef, loadingIntroduction) => {
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(true);
  const [autoplayAttempted, setAutoplayAttempted] = useState(false);

  const attemptAutoplay = useCallback(async () => {
    const video = videoRef.current;
    if (!video || autoplayAttempted) return;

    setAutoplayAttempted(true);

    try {
      // Try to play with sound
      await video.play();
      setVideoPlaying(true);
      setShowPlayButton(false);
      console.log("Autoplay with sound successful!");
    } catch (error) {
      console.log("Autoplay with sound blocked by browser:", error);

      // Fallback: Try muted autoplay first, then unmute
      try {
        video.muted = true;
        await video.play();
        setVideoPlaying(true);
        setShowPlayButton(false);

        // Try to unmute after a short delay
        setTimeout(() => {
          if (video) {
            video.muted = false;
          }
        }, 1000);

        console.log("Autoplay with muted start successful");
      } catch (mutedError) {
        console.log("Muted autoplay also blocked:", mutedError);
        setShowPlayButton(true);
      }
    }
  }, [videoRef, autoplayAttempted]);

  // Handle video events
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => {
      setVideoPlaying(true);
      setShowPlayButton(false);
    };

    const handlePause = () => {
      setVideoPlaying(false);
      setShowPlayButton(true);
    };

    const handleEnded = () => {
      setVideoPlaying(false);
      setShowPlayButton(true);
    };

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("ended", handleEnded);
    };
  }, [videoRef]);

  // Setup autoplay and user interaction listeners
  useEffect(() => {
    const video = videoRef.current;
    if (!video || loadingIntroduction || autoplayAttempted) return;

    let cleanupFunctions = [];

    const handleUserInteraction = () => {
      attemptAutoplay();
    };

    const handleLoadedData = () => {
      attemptAutoplay();
    };

    // Add event listeners
    video.addEventListener("loadeddata", handleLoadedData);
    document.addEventListener("click", handleUserInteraction);
    document.addEventListener("touchstart", handleUserInteraction);

    // Initial attempt after 1 second
    const timer = setTimeout(() => {
      attemptAutoplay();
    }, 1000);

    // Cleanup function
    return () => {
      video.removeEventListener("loadeddata", handleLoadedData);
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("touchstart", handleUserInteraction);
      clearTimeout(timer);
    };
  }, [videoRef, loadingIntroduction, autoplayAttempted, attemptAutoplay]);

  return {
    videoPlaying,
    showPlayButton,
    autoplayAttempted,
    setVideoPlaying,
    setShowPlayButton,
    attemptAutoplay,
  };
};

// Skeleton Loader Component
const HeroSectionSkeleton = () => {
  // Create a dummy videoTools array for the skeleton
  const dummyVideoTools = [
    { name: "DaVinci Resolve", logo: null },
    { name: "Premier Pro", logo: null },
    { name: "Final Cut Pro", logo: null },
    { name: "CapCut", logo: null },
    { name: "After Effects", logo: null },
    { name: "Blender", logo: null },
  ];

  return (
    <motion.div
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-gray-50 via-white to-teal-50/80 flex flex-col items-center justify-start pt-20 pb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Background Logo Animation - keep it visible */}
      <BackgroundLogoAnimation />

      {/* Floating App Logos Skeleton - show placeholder logos */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-25">
        {dummyVideoTools.map((_, index) => {
          const positions = [
            { top: "15%", left: "8%" },
            { top: "22%", right: "12%" },
            { top: "65%", left: "6%" },
            { bottom: "20%", right: "8%" },
            { top: "42%", right: "5%" },
            { bottom: "32%", left: "20%" },
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
              <div className="w-16 h-16 bg-gray-200/50 backdrop-blur-sm rounded-xl animate-pulse" />
            </motion.div>
          );
        })}
      </div>

      {/* Main Content Skeleton */}
      <div className="relative z-30 w-full max-w-4xl px-4">
        {/* Title Section Skeleton */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="h-4 w-48 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full mx-auto mb-4 animate-pulse" />
            <div className="space-y-3">
              <div className="h-10 w-96 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg mx-auto animate-pulse" />
              <div className="h-6 w-64 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg mx-auto animate-pulse" />
            </div>
            <div className="h-4 w-96 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full mx-auto mt-4 animate-pulse" />
          </motion.div>
        </div>

        {/* Video Label Skeleton */}
        <motion.div
          className="text-center mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-md rounded-lg px-4 py-2 shadow-md border border-gray-200">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            </div>
            <div className="h-4 w-48 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse"></div>
          </div>
        </motion.div>

        {/* Video Player Skeleton */}
        <motion.div
          className="w-full h-[380px] lg:h-[480px] relative overflow-hidden rounded-xl border-4 border-white/95 shadow-xl bg-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center">
            <div className="flex flex-col items-center w-full max-w-md px-6">
              {/* Animated Spinner */}
              <div className="relative mb-6">
                <div className="w-20 h-20 border-4 border-teal-100 rounded-full"></div>
                <div className="absolute top-0 left-0 w-20 h-20 border-4 border-transparent border-t-teal-500 rounded-full animate-spin"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-10 h-10 bg-gradient-to-r from-teal-400/20 to-teal-500/20 rounded-full blur-sm"></div>
                </div>
              </div>

              {/* Loading Text */}
              <div className="space-y-3 text-center mb-8">
                <div className="h-4 w-48 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse mx-auto"></div>
                <div className="h-3 w-32 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse mx-auto"></div>
                <div className="h-2 w-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse mx-auto"></div>
              </div>

              {/* Progress Bar Skeleton */}
              <div className="w-full space-y-2">
                <div className="h-1.5 bg-gray-200 rounded-full w-full overflow-hidden">
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

                {/* Video Controls Skeleton */}
                <div className="flex justify-between items-center mt-4">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                    <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                    <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                  </div>
                  <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                    <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Video Info Banner Skeleton */}
          <div className="absolute top-4 left-4 z-10">
            <div className="h-6 w-40 bg-gray-200/70 backdrop-blur-sm rounded-md animate-pulse"></div>
          </div>
        </motion.div>

        {/* Status Indicator Skeleton */}
        <motion.div
          className="text-center mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="inline-flex items-center gap-2">
            <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse"></div>
            <div className="h-3 w-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse"></div>
          </div>
        </motion.div>

        {/* Marquee Skeleton */}
        <motion.div
          className="relative w-full mt-6"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="bg-white/95 backdrop-blur-md rounded-lg p-3 shadow-md border border-gray-200 overflow-hidden">
            <div className="flex gap-8">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="flex items-center gap-8 shrink-0">
                  <div className="h-4 w-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse"></div>
                  <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA Buttons Skeleton */}
        <motion.div
          className="flex justify-center gap-4 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <div className="h-10 w-32 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg animate-pulse"></div>
          <div className="h-10 w-32 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg animate-pulse"></div>
        </motion.div>
      </div>

      {/* Subtle Floating Particles (keep them for visual interest) */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`skeleton-particle-${i}`}
          className="absolute w-1 h-1 bg-gray-300/30 rounded-full"
          style={{
            left: `${5 + i * 10}%`,
            top: `${10 + i * 8}%`,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 10 + i,
            repeat: Infinity,
            delay: i * 0.8,
          }}
        />
      ))}
    </motion.div>
  );
};

const HeroSection = () => {
  const videoRef = useRef(null);
  const [loadingIntroduction, setLoadingIntroduction] = useState(true);
  const [introductionVideo, setIntroductionVideo] = useState(null);
  const [videoError, setVideoError] = useState(false);
  const [hasVideoData, setHasVideoData] = useState(false);

  // Booking modal state
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Use custom hook for video autoplay
  const {
    videoPlaying,
    showPlayButton,
    attemptAutoplay,
    setVideoPlaying,
    setShowPlayButton,
  } = useVideoAutoplay(videoRef, loadingIntroduction);

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

  // Marquee content
  const marqueeItems = useMemo(
    () => [
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
    []
  );

  // Fallback video URLs
  const fallbackVideos = useMemo(
    () => [
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    ],
    []
  );

  const fallbackPosters = useMemo(
    () => [
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1536240478700-b869070f9279?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    ],
    []
  );

  // Fetch introduction video
  useEffect(() => {
    let isMounted = true;

    const fetchIntroductionVideo = async () => {
      try {
        setLoadingIntroduction(true);
        setVideoError(false);

        const response = await getVideoReelsByCategory("introduction");

        if (
          isMounted &&
          response.status === "success" &&
          response.data?.videoReels?.length > 0
        ) {
          const introVideo = response.data.videoReels[0];

          // Verify video has required properties
          if (introVideo?.videoUrl) {
            setIntroductionVideo(introVideo);
            setHasVideoData(true);
            setVideoError(false);
          } else {
            console.warn("Video data incomplete, using fallback");
            setHasVideoData(false);
            setVideoError(true);
          }
        } else {
          console.warn("No introduction videos found, using fallback");
          if (isMounted) {
            setHasVideoData(false);
            setVideoError(true);
          }
        }
      } catch (error) {
        console.error("Error fetching introduction video:", error);
        if (isMounted) {
          setHasVideoData(false);
          setVideoError(true);
        }
      } finally {
        if (isMounted) {
          setLoadingIntroduction(false);
        }
      }
    };

    fetchIntroductionVideo();

    return () => {
      isMounted = false;
    };
  }, []);

  const handlePlayPause = useCallback(() => {
    if (videoRef.current) {
      if (videoRef.current.paused || videoRef.current.ended) {
        videoRef.current
          .play()
          .then(() => {
            setVideoPlaying(true);
            setShowPlayButton(false);
          })
          .catch((error) => {
            console.log("Manual play failed:", error);
            setShowPlayButton(true);
          });
      } else {
        videoRef.current.pause();
        setVideoPlaying(false);
        setShowPlayButton(true);
      }
    }
  }, [setVideoPlaying, setShowPlayButton]);

  // Modal handlers
  const openBookingModal = useCallback(() => setIsBookingModalOpen(true), []);
  const closeBookingModal = useCallback(() => setIsBookingModalOpen(false), []);
  const navigateToProjects = useCallback(() => {
    window.location.href = "/projects";
  }, []);

  // Determine video source and poster
  const { videoSource, videoPoster, videoTitle } = useMemo(() => {
    if (hasVideoData && introductionVideo?.videoUrl) {
      return {
        videoSource: introductionVideo.videoUrl,
        videoPoster: introductionVideo.thumbnailUrl || fallbackPosters[0],
        videoTitle: `${introductionVideo.title || "INTRODUCTION"}.MP4`,
      };
    } else {
      const randomIndex = Math.floor(Math.random() * fallbackVideos.length);
      return {
        videoSource: fallbackVideos[randomIndex],
        videoPoster: fallbackPosters[randomIndex],
        videoTitle: "DEMO_SHOWCASE.MP4",
      };
    }
  }, [hasVideoData, introductionVideo, fallbackVideos, fallbackPosters]);

  // Show skeleton while loading
  if (loadingIntroduction) {
    return <HeroSectionSkeleton />;
  }

  return (
    <motion.div
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-gray-50 via-white to-teal-50/80 flex flex-col items-center justify-start pt-20 pb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.0, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Background Logo Only Animation */}
      <BackgroundLogoAnimation />

      {/* Floating App Logos in Random Positions */}
      <FloatingAppLogos videoTools={videoTools} />

      {/* Content Section */}
      <SectionHeader
        subtitle="Next Generation Video Editing"
        title="Visual Stories"
        highlight="Reimagined"
        description="Transform your vision into captivating visual experiences with our AI-powered editing platform."
        center={true}
        titleSize="2xl"
        titleWeight="medium"
        descriptionSize="lg"
        highlightWeight=""
      />

      {/* Video Player Section */}
      <motion.div
        className="relative z-30 w-full max-w-4xl px-4 mb-4"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <motion.div
          className="text-center mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-md rounded-lg px-4 py-2 shadow-md border border-gray-200">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-red-500 rounded-full shadow-sm"></div>
              <div className="w-2 h-2 bg-yellow-500 rounded-full shadow-sm"></div>
              <div className="w-2 h-2 bg-green-500 rounded-full shadow-sm"></div>
            </div>
            <p className="text-gray-800 font-poppins font-semibold text-sm">
              {hasVideoData
                ? "Experience Our Creative Process"
                : "Demo Showcase - Sample Content"}
            </p>
          </div>
        </motion.div>

        <motion.div
          className="w-full h-[380px] lg:h-[480px] relative overflow-hidden rounded-xl border-4 border-white/95 shadow-xl bg-white"
          whileHover={{
            boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.25)",
            transition: { duration: 0.3 },
          }}
        >
          {!hasVideoData ? (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-amber-50 rounded-xl flex flex-col items-center justify-center z-30 p-6">
              <div className="flex flex-col items-center text-center max-w-md">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-8 h-8 text-amber-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-amber-800 font-semibold text-lg mb-2">
                  Showcase Video Coming Soon
                </h3>
                <p className="text-amber-700 text-sm mb-4">
                  Our portfolio showcase is being prepared. In the meantime,
                  enjoy this demo video that demonstrates the quality of our
                  video editing capabilities.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={openBookingModal}
                    className="px-4 py-2 bg-teal-500 text-white rounded-lg text-sm hover:bg-teal-600 transition-colors"
                  >
                    Book a Consultation
                  </button>
                  <button
                    onClick={navigateToProjects}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg text-sm hover:bg-gray-300 transition-colors"
                  >
                    View Projects
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* HTML5 Video Player with sound */}
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                poster={videoPoster}
                controls
                controlsList="nodownload"
                playsInline
                preload="auto"
                loop
                muted={!videoPlaying}
                onError={() => {
                  console.error("Video playback error");
                  setVideoError(true);
                }}
              >
                <source src={videoSource} type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Video Info Banner */}
              <div className="absolute top-4 left-4 z-10">
                <div className="bg-black/70 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-md">
                  {videoTitle}
                </div>
              </div>

              {/* Simple Play Button Overlay - Only shown if video is not playing */}
              <AnimatePresence>
                {showPlayButton && !loadingIntroduction && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center z-20 cursor-pointer bg-black/10 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={handlePlayPause}
                  >
                    <motion.div
                      className="relative w-24 h-24 bg-gradient-to-br from-white to-gray-100 rounded-2xl flex items-center justify-center shadow-2xl backdrop-blur-md border-2 border-white/60"
                      whileHover={{
                        scale: 1.1,
                        boxShadow: "0 0 40px rgba(13, 148, 136, 0.3)",
                      }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <svg
                        className="w-12 h-12 text-gray-800 ml-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          strokeWidth={0}
                          d="M8 5v14l11-7z"
                        />
                      </svg>
                      <motion.div
                        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-teal-600/95 text-white text-xs px-3 py-1.5 rounded-md whitespace-nowrap opacity-0"
                        animate={{
                          opacity: [0, 1, 0],
                          y: [10, 0, 10],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        Click to play
                      </motion.div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </motion.div>
      </motion.div>

      {/* Status indicator */}
      {!loadingIntroduction && (
        <motion.div
          className="text-center mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          <div className="inline-flex items-center gap-2 text-xs">
            <div
              className={`w-2 h-2 rounded-full ${
                hasVideoData ? "bg-green-500" : "bg-amber-500"
              }`}
            ></div>
            <span className="text-gray-600">
              {hasVideoData ? "Live portfolio video" : "Demo video playing"}
            </span>
          </div>
        </motion.div>
      )}

      {/* Scrolling Marquee */}
      <motion.div
        className="relative w-full max-w-4xl px-4 mb-3"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="bg-white/95 backdrop-blur-md rounded-lg p-2 shadow-md border border-gray-200 overflow-hidden">
          <motion.div
            className="flex gap-8 items-center"
            animate={{ x: [0, -800] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
          >
            {[...marqueeItems, ...marqueeItems].map((tech, index) => (
              <div
                key={index}
                className="flex font-allan items-center gap-8 shrink-0"
              >
                <motion.span
                  className="text-gray-800 font-bold text-xs whitespace-nowrap"
                  whileHover={{
                    color: "#0d9488",
                    scale: 1.02,
                    textShadow: "0 0 12px rgba(13, 148, 136, 0.3)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  {tech}
                </motion.span>
                <motion.div
                  className="w-1 h-1 bg-teal-500 rounded-full shadow-sm"
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
