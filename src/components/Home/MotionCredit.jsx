import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { getActiveStatistics, getVideoReviews } from "../../services/api";
import SectionHeader from "../Shared/SectionHeader";

const MotionCredit = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const canvasRef = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const [statistics, setStatistics] = useState([]);
  const [videoReviews, setVideoReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Marquee State
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Fetch statistics data
  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        setLoading(true);
        const response = await getActiveStatistics();
        setStatistics(response.data?.statistics || []);
      } catch (err) {
        console.error("Error fetching statistics:", err);
        setError("Failed to load statistics");
        setStatistics([
          { value: "500+", title: "Videos Delivered" },
          { value: "40+", title: "Trusted Brands" },
          { value: "3+", title: "Years Experience" },
        ]);
      } finally {
        setLoading(false);
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
            review: review.content,
            rating: review.rating || 5,
            stats: getPerformanceStats(review.rating || 5),
            videoUrl: review.video,
            isBest: review.isBest,
            user: review.user,
          })) || [];

        // Duplicate for seamless marquee
        const duplicatedReviews = [
          ...transformedReviews,
          ...transformedReviews,
        ];
        setVideoReviews(duplicatedReviews);
      } catch (err) {
        console.error("Error fetching video reviews:", err);
        setVideoReviews(getFallbackReviews());
      } finally {
        setReviewsLoading(false);
      }
    };

    fetchVideoReviews();
  }, []);

  // Helper functions
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

  const getFallbackReviews = () => {
    const fallbackReviews = [
      {
        id: 1,
        name: "Sarah Johnson",
        role: "Content Creator",
        company: "Beauty Vlog",
        review:
          "I was amazed by how quickly they turned around my weekly vlog. The editing was so professional and they perfectly captured my brand's aesthetic.",
        rating: 5,
        stats: "Exceptional service delivery with 3x faster turnaround",
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        isBest: true,
      },
      {
        id: 2,
        name: "Mike Chen",
        role: "Marketing Director",
        company: "TechStart Inc",
        review:
          "Our product launch video needed to be perfect, and they delivered beyond expectations. The attention to detail was exceptional.",
        rating: 5,
        stats: "Exceptional service delivery with 215% engagement increase",
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        isBest: false,
      },
      {
        id: 3,
        name: "Alex Rodriguez",
        role: "YouTube Creator",
        company: "Tech Reviews",
        review:
          "Consistent quality and fast turnaround times. Perfect for content creators who need reliable editing services every week.",
        rating: 5,
        stats: "Exceptional service delivery with 2x subscriber growth",
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        isBest: true,
      },
    ];
    return [...fallbackReviews, ...fallbackReviews]; // Duplicate for marquee
  };

  // Star rating component
  const StarRating = ({ rating, size = "sm" }) => (
    <div className="flex items-center space-x-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`${size === "xs" ? "text-xs" : "text-sm"} ${
            star <= rating ? "text-yellow-400" : "text-gray-300"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );

  // Video Player Component without Thumbnail
  const SimpleVideoPlayer = ({ videoUrl, isPlaying, onPlay, onPause }) => {
    const videoRef = useRef(null);

    useEffect(() => {
      if (videoRef.current) {
        if (isPlaying) {
          videoRef.current.play();
        } else {
          videoRef.current.pause();
        }
      }
    }, [isPlaying]);

    return (
      <div className="relative w-full h-full">
        {!isPlaying ? (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-teal-900/20 to-emerald-900/20 rounded-lg">
            <button
              className="w-14 h-14 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform duration-300"
              onClick={onPlay}
            >
              <svg
                className="w-6 h-6 text-teal-600 ml-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>
        ) : (
          <div className="relative w-full h-full">
            <video
              ref={videoRef}
              className="w-full h-full object-cover rounded-lg"
              controls
              onPause={onPause}
              onEnded={onPause}
            >
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <button
              onClick={onPause}
              className="absolute top-3 right-3 bg-black/60 text-white p-2 rounded-full hover:bg-black/80 transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    );
  };

  // Compact Video Card Component without thumbnail
  const CompactVideoCard = ({ review, index }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handlePlay = (e) => {
      e.stopPropagation();
      setIsPlaying(true);
    };

    const handlePause = (e) => {
      e.stopPropagation();
      setIsPlaying(false);
    };

    return (
      <div
        className="relative group w-[320px] flex-shrink-0"
        onMouseEnter={() => {
          setIsHovered(true);
          setHoveredCardIndex(index);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          setHoveredCardIndex(null);
        }}
      >
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] h-full flex flex-col">
          {/* Card Content - Flex column for consistent height */}
          <div className="p-4 flex-grow flex flex-col">
            {/* Video Section - Fixed height without thumbnail */}
            <div className="relative rounded-lg overflow-hidden mb-4 bg-gradient-to-br from-teal-50 to-emerald-50 flex-shrink-0 h-44">
              <SimpleVideoPlayer
                videoUrl={review.videoUrl}
                isPlaying={isPlaying}
                onPlay={handlePlay}
                onPause={handlePause}
              />
            </div>

            {/* Description Section */}
            <div className="mb-3 flex-shrink-0">
              <div className="inline-flex items-center mb-2">
                <div className="w-2 h-2 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full mr-2"></div>
                <p className="text-teal-700 font-semibold text-sm">
                  {review.stats}
                </p>
              </div>
            </div>

            {/* Review Text - Flexible height with min-height */}
            <div className="mb-4 flex-grow min-h-[80px]">
              <div className="relative h-full">
                <div className="text-4xl text-teal-500/20 absolute -top-2 -left-1">
                  "
                </div>
                <p className="text-gray-700 text-sm leading-relaxed pl-4 line-clamp-4">
                  {review.review}
                </p>
              </div>
            </div>

            {/* Client Info - Bottom Section - Fixed at bottom */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 flex items-center justify-center text-white font-bold text-sm mr-3 shadow-md">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-base">
                    {review.name}
                  </h4>
                  <div className="flex items-center mt-0.5">
                    <p className="text-teal-600 text-xs mr-2">{review.role}</p>
                    <span className="text-gray-300 text-xs">•</span>
                    <p className="text-gray-500 text-xs ml-2">
                      {review.company}
                    </p>
                  </div>
                </div>
              </div>

              {/* Star Rating */}
              <div className="text-right">
                <StarRating rating={review.rating} size="xs" />
              </div>
            </div>
          </div>

          {/* Bottom Gradient Line */}
          <div className="h-1.5 bg-gradient-to-r from-teal-500 via-emerald-500 to-green-500 flex-shrink-0"></div>
        </div>

        {/* Hover Glow Effect */}
        {isHovered && (
          <div className="absolute -inset-2 bg-gradient-to-r from-teal-400/10 to-emerald-400/10 rounded-2xl blur-xl transition-opacity duration-300 -z-10"></div>
        )}
      </div>
    );
  };

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const handleCardHover = (index) => {
    setHoveredCardIndex(index);
  };

  const handleCardLeave = () => {
    setHoveredCardIndex(null);
  };

  const handlePauseToggle = () => {
    setIsTransitioning(true);
    setIsPaused(!isPaused);

    // Smooth transition delay
    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  };

  // Marquee Video Reviews Section
  const VideoReviewSection = () => {
    if (reviewsLoading) {
      return (
        <div className="mb-12 md:mb-20 text-center py-8 md:py-12">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full mx-auto"
          />
          <span className="ml-3 text-gray-600 text-sm md:text-base">
            Loading video reviews...
          </span>
        </div>
      );
    }

    if (videoReviews.length === 0) {
      return (
        <div className="mb-12 md:mb-20 text-center py-8 md:py-12">
          <div className="text-gray-500 text-sm md:text-base">
            No video reviews available yet
          </div>
          <p className="text-xs md:text-sm text-gray-400 mt-1 md:mt-2">
            Check back later for client video testimonials
          </p>
        </div>
      );
    }

    return (
      <div className="mb-12 md:mb-20">
        <div className="max-w-7xl mx-auto px-4">
          {/* Marquee Controls */}
          <div className="flex items-center justify-center space-x-4 mb-6">
            <button
              onClick={handlePauseToggle}
              disabled={isTransitioning}
              className={`px-4 py-2 bg-white border border-gray-200 rounded-lg flex items-center hover:bg-gray-50 transition-all duration-300 shadow-sm text-sm md:text-base ${
                isTransitioning ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isPaused ? (
                <>
                  <motion.svg
                    key="play"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="w-5 h-5 text-teal-600 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </motion.svg>
                  <motion.span
                    key="play-text"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2, delay: 0.1 }}
                  >
                    Resume Auto-scroll
                  </motion.span>
                </>
              ) : (
                <>
                  <motion.svg
                    key="pause"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="w-5 h-5 text-teal-600 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </motion.svg>
                  <motion.span
                    key="pause-text"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2, delay: 0.1 }}
                  >
                    Pause Auto-scroll
                  </motion.span>
                </>
              )}
            </button>

            <div className="flex items-center">
              <motion.div
                className={`w-3 h-3 rounded-full mr-2 ${
                  isPaused || hoveredCardIndex !== null
                    ? "bg-red-500"
                    : "bg-green-500"
                }`}
                animate={{
                  scale: isTransitioning ? [1, 1.2, 1] : 1,
                }}
                transition={{
                  duration: 0.3,
                  repeat: isTransitioning ? 1 : 0,
                }}
              />
              <motion.span
                className="text-sm text-gray-600"
                key={
                  isPaused || hoveredCardIndex !== null ? "paused" : "playing"
                }
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isPaused || hoveredCardIndex !== null
                  ? "Paused"
                  : "Auto-scrolling"}
              </motion.span>
            </div>
          </div>

          {/* Marquee Container */}
          <div className="relative overflow-hidden rounded-xl">
            {/* Gradient Fades */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white via-white/95 to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white via-white/95 to-transparent z-10"></div>

            {/* Marquee with smooth pause */}
            <motion.div
              className="flex space-x-6 py-6 px-2"
              animate={{
                x:
                  isPaused || hoveredCardIndex !== null
                    ? [null, 0] // When paused, just stay at 0 without animation
                    : [0, -1600], // When playing, animate from 0 to -1600
              }}
              transition={{
                x: {
                  repeat: isPaused || hoveredCardIndex !== null ? 0 : Infinity,
                  repeatType: "loop",
                  duration: 40,
                  ease: "linear",
                  type: "tween",
                },
              }}
            >
              {videoReviews.map((review, index) => (
                <div
                  key={`${review.id}-${index}`}
                  onMouseEnter={() => handleCardHover(index)}
                  onMouseLeave={handleCardLeave}
                  className="flex-shrink-0 h-full"
                >
                  <CompactVideoCard review={review} index={index} />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Instructions */}
          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm md:text-base">
              Hover over any card to pause scrolling • Click play button to
              watch video testimonials
            </p>
          </div>
        </div>
      </div>
    );
  };

  // Find specific statistics by title
  const getStatisticByTitle = (title) => {
    return statistics.find((stat) =>
      stat.title.toLowerCase().includes(title.toLowerCase())
    );
  };

  // Get values for specific statistics
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

  // Prepare scrolling items
  const scrollingItems = [
    {
      id: 1,
      value: getVideosValue(),
      title: "Videos Delivered",
      type: "number",
    },
    {
      id: 2,
      value: getBrandsValue(),
      title: "Trusted Brands",
      type: "number",
    },
    {
      id: 3,
      value: getYearsValue(),
      title: "Years Experience",
      type: "number",
    },
  ];

  // Particle background effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const particles = [];
    const particleCount = window.innerWidth < 768 ? 40 : 80;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 0.5 + 0.2,
        opacity: Math.random() * 0.3 + 0.1,
        direction: Math.random() * Math.PI * 2,
      });
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connecting lines
      ctx.strokeStyle = "rgba(20, 184, 166, 0.03)";
      ctx.lineWidth = 0.5;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      particles.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(20, 184, 166, ${particle.opacity})`;
        ctx.fill();

        particle.x += Math.cos(particle.direction) * particle.speed;
        particle.y += Math.sin(particle.direction) * particle.speed;

        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
      });

      animationFrameId = requestAnimationFrame(drawParticles);
    };

    animationFrameId = requestAnimationFrame(drawParticles);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <motion.section
      ref={ref}
      className="relative py-12 md:py-20 lg:py-24 overflow-hidden bg-gradient-to-br from-white to-gray-50"
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            duration: 0.8,
            ease: "easeOut",
          },
        },
      }}
    >
      {/* Stats Grid */}
      {!loading && (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mt-12 md:mt-16"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
              },
            },
          }}
        >
          {/* Stat 1 - Videos Delivered */}
          <motion.div
            className="text-center p-4 md:p-6 lg:p-8 bg-white rounded-xl md:rounded-2xl border border-teal-100 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.6,
                  ease: "easeOut",
                },
              },
            }}
            whileHover={{
              y: window.innerWidth >= 768 ? -5 : 0,
              borderColor: "rgba(20, 184, 166, 0.3)",
              transition: { duration: 0.3 },
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-teal-50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="text-3xl font-anton md:text-4xl lg:text-5xl font-bold text-teal-600 mb-1 md:mb-2">
                {getVideosValue()}
              </div>
              <div className="text-gray-600 font-poppins font-light tracking-wide text-sm md:text-base">
                Videos Delivered
              </div>
            </div>
          </motion.div>

          {/* Stat 2 - Trusted Brands */}
          <motion.div
            className="text-center p-4 md:p-6 lg:p-8 bg-white rounded-xl md:rounded-2xl border border-emerald-100 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.6,
                  ease: "easeOut",
                  delay: 0.1,
                },
              },
            }}
            whileHover={{
              y: window.innerWidth >= 768 ? -5 : 0,
              borderColor: "rgba(16, 185, 129, 0.3)",
              transition: { duration: 0.3 },
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="text-3xl md:text-4xl font-anton lg:text-5xl font-bold text-emerald-600 mb-1 md:mb-2">
                {getBrandsValue()}
              </div>
              <div className="text-gray-600 font-poppins font-light tracking-wide text-sm md:text-base">
                Trusted Brands
              </div>
            </div>
          </motion.div>

          {/* Stat 3 - Years Experience */}
          <motion.div
            className="text-center p-4 md:p-6 lg:p-8 bg-white rounded-xl md:rounded-2xl border border-green-100 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.6,
                  ease: "easeOut",
                  delay: 0.2,
                },
              },
            }}
            whileHover={{
              y: window.innerWidth >= 768 ? -5 : 0,
              borderColor: "rgba(34, 197, 94, 0.3)",
              transition: { duration: 0.3 },
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="text-3xl font-anton md:text-4xl lg:text-5xl font-bold text-green-600 mb-1 md:mb-2">
                {getYearsValue()}
              </div>
              <div className="text-gray-600 font-poppins font-light tracking-wide text-sm md:text-base">
                Years Experience
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
      {/* Scrolling Credibility Strip */}
      {!loading && (
        <div className="relative overflow-hidden py-6 md:py-8 border-y border-teal-200 bg-gradient-to-r from-teal-50 to-emerald-50 backdrop-blur-sm">
          {/* Glowing edges */}
          <div className="absolute left-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-l from-white to-transparent z-10"></div>

          <motion.div
            className="flex whitespace-nowrap"
            animate={{
              x: [0, -800],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: window.innerWidth < 768 ? 25 : 35,
                ease: "linear",
              },
            }}
          >
            {/* First set */}
            <div className="flex font-allan items-center">
              {scrollingItems.map((item, index) => (
                <div
                  key={`first-${item.id}`}
                  className="mx-6 md:mx-10 flex items-center"
                >
                  <div
                    className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${
                      index === 0
                        ? "bg-teal-500 shadow-lg shadow-teal-500/30"
                        : index === 1
                        ? "bg-emerald-500 shadow-lg shadow-emerald-500/30"
                        : "bg-green-500 shadow-lg shadow-green-500/30"
                    } mr-3 md:mr-4`}
                  ></div>
                  <span className="text-gray-700 text-sm md:text-lg lg:text-xl font-medium tracking-wide">
                    <span className="text-teal-600 font-bold">
                      {item.value}
                    </span>{" "}
                    {item.title}
                  </span>
                </div>
              ))}
            </div>

            {/* Duplicate set for seamless looping */}
            <div className="flex font-allan items-center">
              {scrollingItems.map((item, index) => (
                <div
                  key={`second-${item.id}`}
                  className="mx-6 md:mx-10 flex items-center"
                >
                  <div
                    className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${
                      index === 0
                        ? "bg-teal-500 shadow-lg shadow-teal-500/30"
                        : index === 1
                        ? "bg-emerald-500 shadow-lg shadow-emerald-500/30"
                        : "bg-green-500 shadow-lg shadow-green-500/30"
                    } mr-3 md:mr-4`}
                  ></div>
                  <span className="text-gray-700 text-sm md:text-lg lg:text-xl font-medium tracking-wide">
                    <span className="text-teal-600 font-bold">
                      {item.value}
                    </span>{" "}
                    {item.title}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
      {/* Animated particle background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-30 md:opacity-50 "
      />

      {/* Glowing orbs with light colors */}
      <div className="absolute top-1/4 left-1/4 w-48 h-48 md:w-96 md:h-96 bg-teal-100 rounded-full blur-2xl md:blur-3xl animate-pulse-slow"></div>
      <div
        className="absolute bottom-1/3 right-1/3 w-40 h-40 md:w-80 md:h-80 bg-emerald-100 rounded-full blur-2xl md:blur-3xl animate-pulse-slow"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="absolute top-2/3 left-1/3 w-32 h-32 md:w-64 md:h-64 bg-green-100 rounded-full blur-2xl md:blur-3xl animate-pulse-slow"
        style={{ animationDelay: "4s" }}
      ></div>

      {/* Subtle vignette effect */}
      <div className="absolute inset-0 shadow-[inset_0_0_50px_10px_rgba(255,255,255,0.5)] md:shadow-[inset_0_0_100px_20px_rgba(255,255,255,0.5)]"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 mt-20 lg:px-6">
        <SectionHeader
          subtitle="What Our Clients Say"
          title="Trusted by Creators"
          highlight="Worldwide"
          description="Delivering exceptional video editing results that transform content and drive engagement"
          center={true}
          titleSize="xl"
          titleWeight="normal"
          descriptionSize="base md:lg"
          highlightColor="teal-500"
          lineSpacing="tight"
          dotColor="teal-500"
        />

        {/* Marquee Video Reviews Section */}
        <VideoReviewSection />

        {/* Loading State for Statistics */}
        {loading && (
          <div className="flex justify-center items-center py-6 md:py-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-6 h-6 border-2 border-teal-500 border-t-transparent rounded-full"
            />
            <span className="ml-2 text-gray-600 text-sm md:text-base">
              Loading statistics...
            </span>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-6 md:py-8">
            <p className="text-amber-600 text-sm md:text-base">{error}</p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </motion.section>
  );
};

export default MotionCredit;
