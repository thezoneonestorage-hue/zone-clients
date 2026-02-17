import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import Marquee from "react-fast-marquee";
import { getActiveStatistics, getVideoReviews } from "../../services/api";
import SectionHeader from "../Shared/SectionHeader";
import useMediaQuery from "../../hooks/useMediaQuery";

// Skeleton Components - Simplified
const StatisticsSkeleton = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div className="relative overflow-hidden py-6 md:py-8 border-y border-teal-200 bg-gradient-to-r from-teal-50 to-emerald-50 backdrop-blur-sm">
      <div className="absolute left-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-r from-white to-transparent z-10"></div>
      <div className="absolute right-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-l from-white to-transparent z-10"></div>

      <div className="flex whitespace-nowrap animate-pulse">
        <div className="flex font-allan items-center">
          {[1, 2, 3].map((item, index) => (
            <div
              key={`skeleton-${index}`}
              className="mx-6 md:mx-10 flex items-center"
            >
              <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-gray-300 mr-3 md:mr-4"></div>
              <div
                className={`${
                  isMobile ? "h-5 w-24" : "h-8 w-40"
                } bg-gray-300 rounded`}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const VideoCardSkeleton = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div className="relative group w-[280px] sm:w-[300px] md:w-[320px] flex-shrink-0 mx-2 sm:mx-3">
      <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden h-full flex flex-col">
        <div className="p-3 sm:p-4 flex-grow flex flex-col">
          {/* Video Section Skeleton */}
          <div className="relative rounded-lg overflow-hidden mb-3 sm:mb-4 bg-gradient-to-br from-teal-50 to-emerald-50 flex-shrink-0 h-32 sm:h-36 md:h-44 animate-pulse">
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gray-300 rounded-full"></div>
            </div>
          </div>

          {/* Description Section Skeleton */}
          <div className="mb-2 sm:mb-3 flex-shrink-0">
            <div className="inline-flex items-center mb-1 sm:mb-2">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-300 rounded-full mr-1 sm:mr-2"></div>
              <div className="h-3 sm:h-4 w-32 sm:w-40 md:w-48 bg-gray-200 rounded"></div>
            </div>
          </div>

          {/* Review Text Skeleton */}
          <div className="mb-3 sm:mb-4 flex-grow min-h-[60px] sm:min-h-[70px] md:min-h-[80px]">
            <div className="space-y-1 sm:space-y-2">
              <div className="h-2 sm:h-2.5 md:h-3 bg-gray-200 rounded w-full"></div>
              <div className="h-2 sm:h-2.5 md:h-3 bg-gray-200 rounded w-5/6"></div>
              <div className="h-2 sm:h-2.5 md:h-3 bg-gray-200 rounded w-4/6"></div>
            </div>
          </div>

          {/* Client Info Skeleton */}
          <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-gray-100 mt-auto">
            <div className="flex items-center">
              <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-gray-300 mr-2 sm:mr-3"></div>
              <div>
                <div className="h-3 sm:h-3.5 md:h-4 w-16 sm:w-20 md:w-24 bg-gray-200 rounded mb-1 sm:mb-2"></div>
                <div className="h-2 sm:h-2.5 md:h-3 w-20 sm:w-24 md:w-32 bg-gray-200 rounded"></div>
              </div>
            </div>
            <div className="flex space-x-0.5 sm:space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <div
                  key={star}
                  className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 bg-gray-200 rounded"
                ></div>
              ))}
            </div>
          </div>
        </div>
        <div className="h-1 sm:h-1.5 bg-gray-200 flex-shrink-0"></div>
      </div>
    </div>
  );
};

const VideoReviewsSkeleton = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div className="mb-8 md:mb-12 lg:mb-20">
      <div className="max-w-7xl mx-auto px-3 sm:px-4">
        {/* Simple status indicator skeleton */}
        <div className="flex items-center justify-end mb-3 sm:mb-4">
          <div className="flex items-center bg-white/80 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-sm border border-gray-100">
            <div className="w-2 h-2 rounded-full bg-gray-300 mr-1 sm:mr-2 animate-pulse"></div>
            <div
              className={`${
                isMobile ? "h-3 w-16" : "h-4 w-24"
              } bg-gray-200 rounded animate-pulse`}
            ></div>
          </div>
        </div>

        {/* Marquee Container Skeleton */}
        <div className="relative overflow-hidden rounded-xl bg-gray-50/50">
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-16 md:w-20 bg-gradient-to-r from-white via-white/95 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-16 md:w-20 bg-gradient-to-l from-white via-white/95 to-transparent z-10"></div>

          <div className="flex space-x-3 sm:space-x-4 md:space-x-6 py-4 sm:py-5 md:py-6 px-2 overflow-hidden">
            {[1, 2, 3].map((index) => (
              <VideoCardSkeleton key={`skeleton-card-${index}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Star rating component - memoized
const StarRating = React.memo(({ rating, size = "sm" }) => {
  const starSize = useMemo(() => {
    switch (size) {
      case "xs":
        return "text-xs";
      case "sm":
        return "text-sm";
      case "md":
        return "text-base";
      default:
        return "text-sm";
    }
  }, [size]);

  return (
    <div className="flex items-center space-x-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`${starSize} ${
            star <= rating ? "text-yellow-400" : "text-gray-300"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
});

StarRating.displayName = "StarRating";

// Video Player Component - optimized
const SimpleVideoPlayer = React.memo(
  ({ videoUrl, isPlaying, onPlay, onPause }) => {
    const videoRef = useRef(null);

    useEffect(() => {
      if (videoRef.current) {
        if (isPlaying) {
          videoRef.current.play().catch(() => {});
        } else {
          videoRef.current.pause();
        }
      }
    }, [isPlaying]);

    if (!isPlaying) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-teal-900/20 to-emerald-900/20 rounded-lg">
          <button
            className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform duration-300"
            onClick={onPlay}
            aria-label="Play video"
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-teal-600 ml-0.5 sm:ml-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        </div>
      );
    }

    return (
      <div className="relative w-full h-full">
        <video
          ref={videoRef}
          className="w-full h-full object-cover rounded-lg"
          controls
          onPause={onPause}
          onEnded={onPause}
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
        <button
          onClick={onPause}
          className="absolute top-2 right-2 bg-black/60 text-white p-1.5 rounded-full hover:bg-black/80 transition-colors"
          aria-label="Close video"
        >
          <svg
            className="w-3 h-3 sm:w-3.5 sm:h-3.5"
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
    );
  }
);

SimpleVideoPlayer.displayName = "SimpleVideoPlayer";

// Compact Video Card Component - memoized
const CompactVideoCard = React.memo(({ review }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = useCallback((e) => {
    e.stopPropagation();
    setIsPlaying(true);
  }, []);

  const handlePause = useCallback((e) => {
    e.stopPropagation();
    setIsPlaying(false);
  }, []);

  return (
    <div className="relative group w-[280px] sm:w-[300px] md:w-[320px] flex-shrink-0 mx-2 sm:mx-3">
      <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] h-full flex flex-col">
        <div className="p-3 sm:p-4 flex-grow flex flex-col">
          {/* Video Section */}
          <div className="relative rounded-lg overflow-hidden mb-3 sm:mb-4 bg-gradient-to-br from-teal-50 to-emerald-50 flex-shrink-0 h-32 sm:h-36 md:h-44">
            <SimpleVideoPlayer
              videoUrl={review.videoUrl}
              isPlaying={isPlaying}
              onPlay={handlePlay}
              onPause={handlePause}
            />
          </div>

          {/* Description Section */}
          <div className="mb-2 sm:mb-3 flex-shrink-0">
            <div className="inline-flex items-center mb-1 sm:mb-2">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full mr-1 sm:mr-2"></div>
              <p className="text-teal-700 font-semibold text-xs sm:text-sm line-clamp-1">
                {review.stats}
              </p>
            </div>
          </div>

          {/* Review Text */}
          <div className="mb-3 sm:mb-4 flex-grow min-h-[60px] sm:min-h-[70px] md:min-h-[80px]">
            <div className="relative h-full">
              <div className="text-3xl sm:text-4xl text-teal-500/20 absolute -top-2 -left-1">
                "
              </div>
              <p className="text-gray-700 text-xs sm:text-sm leading-relaxed pl-3 sm:pl-4 line-clamp-3 sm:line-clamp-4">
                {review.review}
              </p>
            </div>
          </div>

          {/* Client Info */}
          <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-gray-100 mt-auto">
            <div className="flex items-center min-w-0 flex-1">
              <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 flex items-center justify-center text-white font-bold text-xs sm:text-sm mr-2 sm:mr-3 shadow-md flex-shrink-0">
                {review.name?.charAt(0) || "C"}
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-bold text-gray-900 text-sm sm:text-base truncate">
                  {review.name}
                </h4>
                <div className="flex items-center mt-0.5 flex-wrap">
                  <p className="text-teal-600 text-xs truncate max-w-[80px] sm:max-w-[100px]">
                    {review.role}
                  </p>
                  <span className="text-gray-300 text-xs mx-1 hidden sm:inline">
                    •
                  </span>
                  <p className="text-gray-500 text-xs truncate max-w-[80px] sm:max-w-[100px] hidden sm:block">
                    {review.company}
                  </p>
                </div>
              </div>
            </div>

            {/* Star Rating */}
            <div className="flex-shrink-0 ml-2">
              <StarRating rating={review.rating} size="xs" />
            </div>
          </div>
        </div>

        {/* Bottom Gradient Line */}
        <div className="h-1 sm:h-1.5 bg-gradient-to-r from-teal-500 via-emerald-500 to-green-500 flex-shrink-0"></div>
      </div>

      {/* Hover Glow Effect - only on desktop */}
      <div className="absolute -inset-2 bg-gradient-to-r from-teal-400/10 to-emerald-400/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 hidden md:block"></div>
    </div>
  );
});

CompactVideoCard.displayName = "CompactVideoCard";

// Optimized Particle background effect - reduced on mobile
const ParticleBackground = () => {
  const canvasRef = useRef(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let particles = [];

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      // Fewer particles on mobile
      const particleCount = isMobile ? 20 : 40;
      particles = [];

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5 + 0.5,
          speed: Math.random() * 0.3 + 0.1,
          opacity: Math.random() * 0.2 + 0.05,
          direction: Math.random() * Math.PI * 2,
        });
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connecting lines only on desktop
      if (!isMobile) {
        ctx.strokeStyle = "rgba(20, 184, 166, 0.02)";
        ctx.lineWidth = 0.3;

        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 80) {
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
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

      animationRef.current = requestAnimationFrame(drawParticles);
    };

    animationRef.current = requestAnimationFrame(drawParticles);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [isMobile]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-20 md:opacity-30"
    />
  );
};

const MotionCredit = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const isMobile = useMediaQuery("(max-width: 768px)");

  const [statistics, setStatistics] = useState([]);
  const [videoReviews, setVideoReviews] = useState([]);
  const [loading, setLoading] = useState({ stats: true, reviews: true });
  const [error, setError] = useState(null);
  const [isPaused, setIsPaused] = useState(false);

  // Fetch statistics data
  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        setLoading((prev) => ({ ...prev, stats: true }));
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
        setLoading((prev) => ({ ...prev, stats: false }));
      }
    };

    fetchStatistics();
  }, []);

  // Fetch video reviews from API
  useEffect(() => {
    const fetchVideoReviews = async () => {
      try {
        setLoading((prev) => ({ ...prev, reviews: true }));
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
          })) || [];

        setVideoReviews(transformedReviews);
      } catch (err) {
        console.error("Error fetching video reviews:", err);
        setVideoReviews(getFallbackReviews());
      } finally {
        setLoading((prev) => ({ ...prev, reviews: false }));
      }
    };

    fetchVideoReviews();
  }, []);

  // Helper functions - memoized
  const getPerformanceStats = useCallback((rating) => {
    const stats = {
      1: "Quality work delivered",
      2: "Good results achieved",
      3: "Great engagement boost",
      4: "Excellent editing quality",
      5: "Exceptional service",
    };
    return stats[rating] || "Professional service";
  }, []);

  const getFallbackReviews = useCallback(() => {
    return [
      {
        id: 1,
        name: "Sarah Johnson",
        role: "Content Creator",
        company: "Beauty Vlog",
        review:
          "I was amazed by how quickly they turned around my weekly vlog. The editing was so professional.",
        rating: 5,
        stats: "Exceptional service",
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      },
      {
        id: 2,
        name: "Mike Chen",
        role: "Marketing Director",
        company: "TechStart Inc",
        review:
          "Our product launch video needed to be perfect, and they delivered beyond expectations.",
        rating: 5,
        stats: "Exceptional service",
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      },
      {
        id: 3,
        name: "Alex Rodriguez",
        role: "YouTube Creator",
        company: "Tech Reviews",
        review:
          "Consistent quality and fast turnaround times. Perfect for content creators.",
        rating: 5,
        stats: "Exceptional service",
        videoUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      },
    ];
  }, []);

  // Find specific statistics by title - memoized
  const getStatisticByTitle = useCallback(
    (title) => {
      return statistics.find((stat) =>
        stat.title?.toLowerCase().includes(title.toLowerCase())
      );
    },
    [statistics]
  );

  const videosValue = useMemo(() => {
    const projectStat = getStatisticByTitle("project");
    return projectStat ? `${projectStat.value}+` : "500+";
  }, [getStatisticByTitle]);

  const brandsValue = useMemo(() => {
    const brandStat = getStatisticByTitle("brand");
    return brandStat ? `${brandStat.value}+` : "40+";
  }, [getStatisticByTitle]);

  const yearsValue = useMemo(() => {
    const yearStat = getStatisticByTitle("year");
    return yearStat ? `${yearStat.value}+` : "3+";
  }, [getStatisticByTitle]);

  // Prepare scrolling items - memoized
  const scrollingItems = useMemo(
    () => [
      { id: 1, value: videosValue, title: "Videos Delivered" },
      { id: 2, value: brandsValue, title: "Trusted Brands" },
      { id: 3, value: yearsValue, title: "Years Experience" },
    ],
    [videosValue, brandsValue, yearsValue]
  );

  // Animation control
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // Video Reviews Section with Marquee
  const VideoReviewSection = useCallback(() => {
    if (loading.reviews) {
      return <VideoReviewsSkeleton />;
    }

    if (videoReviews.length === 0) {
      return (
        <div className="mb-8 md:mb-12 lg:mb-20 text-center py-6 md:py-8">
          <div className="text-gray-500 text-sm md:text-base">
            No video reviews available yet
          </div>
        </div>
      );
    }

    return (
      <div className="">
        <div className="max-w-7xl mx-auto px-3 sm:px-4">
          {/* Simple status indicator */}
          <div className="flex items-center justify-end mb-3 sm:mb-4">
            <div className="flex items-center bg-white/80 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-sm border border-gray-100">
              <motion.div
                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full mr-1 sm:mr-2 ${
                  isPaused ? "bg-amber-500" : "bg-green-500"
                }`}
                animate={
                  isPaused
                    ? {
                        scale: [1, 1.2, 1],
                      }
                    : {}
                }
                transition={{
                  duration: 0.5,
                  repeat: isPaused ? Infinity : 0,
                }}
              />
              <span className="text-[10px] sm:text-xs text-gray-600 font-medium">
                {isPaused ? "Paused" : "Auto-scrolling"}
              </span>
            </div>
          </div>

          {/* Marquee Container */}
          <div className="relative rounded-xl">
            {/* Gradient Fades */}
            <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-16 md:w-20 bg-gradient-to-r from-white via-white/95 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-16 md:w-20 bg-gradient-to-l from-white via-white/95 to-transparent z-10 pointer-events-none"></div>

            {/* React Fast Marquee */}
            <Marquee
              pauseOnHover={true}
              speed={isMobile ? 30 : 40}
              gradient={false}
              autoFill={true}
              className="py-4 sm:py-5 md:py-6"
              play={!isPaused}
            >
              {videoReviews.map((review, index) => (
                <CompactVideoCard
                  key={`${review.id}-${index}`}
                  review={review}
                />
              ))}
            </Marquee>
          </div>

          {/* Simple Instructions - hidden on mobile */}
          {!isMobile && (
            <div className="mt-4 md:mt-6 text-center">
              <p className="text-gray-500 text-xs md:text-sm">
                Hover over any card to pause • Click play to watch testimonials
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }, [loading.reviews, videoReviews, isPaused, isMobile]);

  return (
    <div>
      {/* Statistics Strip */}
      {loading.stats ? (
        <StatisticsSkeleton />
      ) : error ? (
        <div className="text-center py-4 md:py-6">
          <p className="text-amber-600 text-xs md:text-sm">{error}</p>
        </div>
      ) : (
        <div className="relative overflow-hidden py-4 md:py-6 lg:py-8 border-y border-teal-200 bg-gradient-to-r from-teal-50 to-emerald-50 backdrop-blur-sm">
          <div className="absolute left-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-l from-white to-transparent z-10"></div>

          <motion.div
            className="flex whitespace-nowrap"
            animate={{
              x: [0, isMobile ? -400 : -800],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: isMobile ? 20 : 35,
                ease: "linear",
              },
            }}
          >
            {/* First set */}
            <div className="flex font-allan items-center">
              {scrollingItems.map((item, index) => (
                <div
                  key={`first-${item.id}`}
                  className="mx-4 sm:mx-6 md:mx-10 flex items-center"
                >
                  <div
                    className={`w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 rounded-full ${
                      index === 0
                        ? "bg-teal-500"
                        : index === 1
                        ? "bg-emerald-500"
                        : "bg-green-500"
                    } mr-2 sm:mr-3 md:mr-4 flex-shrink-0`}
                  ></div>
                  <span className="text-gray-700 text-xs sm:text-sm md:text-base lg:text-xl font-medium tracking-wide whitespace-nowrap">
                    <span className="text-teal-600 font-bold">
                      {item.value}
                    </span>{" "}
                    {item.title}
                  </span>
                </div>
              ))}
            </div>

            {/* Duplicate set */}
            <div className="flex font-allan items-center">
              {scrollingItems.map((item, index) => (
                <div
                  key={`second-${item.id}`}
                  className="mx-4 sm:mx-6 md:mx-10 flex items-center"
                >
                  <div
                    className={`w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 rounded-full ${
                      index === 0
                        ? "bg-teal-500"
                        : index === 1
                        ? "bg-emerald-500"
                        : "bg-green-500"
                    } mr-2 sm:mr-3 md:mr-4 flex-shrink-0`}
                  ></div>
                  <span className="text-gray-700 text-xs sm:text-sm md:text-base lg:text-xl font-medium tracking-wide whitespace-nowrap">
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

      <motion.section
        ref={ref}
        className="relative py-8 md:py-12 lg:py-16 xl:py-24 overflow-hidden bg-gradient-to-br from-white to-gray-50"
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { duration: 0.6, ease: "easeOut" },
          },
        }}
      >
        {/* Animated particle background - reduced on mobile */}
        <ParticleBackground />

        {/* Glowing orbs - simplified on mobile */}
        {!isMobile && (
          <>
            <div className="absolute top-1/4 left-1/4 w-48 h-48 md:w-96 md:h-96 bg-teal-100 rounded-full blur-2xl md:blur-3xl animate-pulse-slow"></div>
            <div
              className="absolute bottom-1/3 right-1/3 w-40 h-40 md:w-80 md:h-80 bg-emerald-100 rounded-full blur-2xl md:blur-3xl animate-pulse-slow"
              style={{ animationDelay: "2s" }}
            ></div>
          </>
        )}

        {/* Subtle vignette effect - simplified on mobile */}
        <div className="absolute inset-0 shadow-[inset_0_0_30px_5px_rgba(255,255,255,0.5)] md:shadow-[inset_0_0_100px_20px_rgba(255,255,255,0.5)]"></div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <SectionHeader
            subtitle="What Our Clients Say"
            title="Trusted by Creators"
            highlight="Worldwide"
            description={
              isMobile
                ? "Transforming content and driving engagement"
                : "Delivering exceptional video editing results that transform content and drive engagement"
            }
            center={true}
            titleSize={isMobile ? "lg" : "xl"}
            descriptionSize={isMobile ? "sm" : "base md:lg"}
          />

          {/* Marquee Video Reviews Section */}
          <VideoReviewSection />
        </div>

        <style jsx>{`
          @keyframes pulse-slow {
            0%,
            100% {
              opacity: 0.2;
            }
            50% {
              opacity: 0.4;
            }
          }
          .animate-pulse-slow {
            animation: pulse-slow 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
          .line-clamp-3 {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .line-clamp-4 {
            display: -webkit-box;
            -webkit-line-clamp: 4;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `}</style>
      </motion.section>
    </div>
  );
};

export default MotionCredit;
