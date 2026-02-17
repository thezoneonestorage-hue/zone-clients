import { useRef, useState, useEffect, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionHeader from "../Shared/SectionHeader";
import bg from "/ICON.png";

// Service data
const services = [
  {
    number: "01",
    icon: "🎬",
    title: "YouTube Video Editing",
    description:
      "Professional editing for YouTube content creators with complete packages including color grading, sound design, and motion graphics.",
    color: "teal",
  },
  {
    number: "02",
    icon: "⚡",
    title: "Short Form Content",
    description:
      "Transform your long-form content into viral short-form videos optimized for TikTok, Reels & Shorts with trending audio.",
    color: "emerald",
  },
  {
    number: "03",
    icon: "🎭",
    title: "Corporate Videos",
    description:
      "High-quality corporate video production for businesses, including promotional videos and company presentations.",
    color: "teal",
  },
  {
    number: "04",
    icon: "💼",
    title: "Podcast Editing",
    description:
      "Complete podcast editing service including audio cleanup, video synchronization, and multi-camera editing.",
    color: "emerald",
  },
  {
    number: "05",
    title: "Motion Graphics",
    icon: "✨",
    description:
      "Custom animated graphics and visual effects to make your content stand out and engage your audience.",
    color: "teal",
  },
  {
    number: "06",
    title: "Content Strategy",
    icon: "📈",
    description:
      "Complete content planning and strategy to grow your channel and maximize audience engagement.",
    color: "emerald",
  },
];

// Background particles configuration
const particlePositions = [
  { top: "10%", left: "15%", size: "w-3 h-3", color: "bg-teal-400/80" },
  { top: "20%", left: "80%", size: "w-2 h-2", color: "bg-emerald-400/70" },
  { top: "30%", left: "25%", size: "w-3 h-3", color: "bg-teal-300/80" },
  { top: "40%", left: "70%", size: "w-2 h-2", color: "bg-emerald-300/70" },
  { top: "50%", left: "10%", size: "w-3 h-3", color: "bg-teal-400/80" },
  { top: "60%", left: "85%", size: "w-2 h-2", color: "bg-emerald-400/70" },
  { top: "70%", left: "35%", size: "w-3 h-3", color: "bg-teal-300/80" },
  { top: "80%", left: "65%", size: "w-2 h-2", color: "bg-emerald-300/70" },
  { top: "25%", left: "45%", size: "w-2 h-2", color: "bg-teal-400/70" },
  { top: "45%", left: "55%", size: "w-3 h-3", color: "bg-emerald-400/80" },
  { top: "65%", left: "20%", size: "w-2 h-2", color: "bg-teal-300/70" },
  { top: "85%", left: "75%", size: "w-3 h-3", color: "bg-emerald-300/80" },
];

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const connectorVariants = {
  hidden: { pathLength: 0, strokeDashoffset: 1000 },
  visible: {
    pathLength: 1,
    strokeDashoffset: 0,
    transition: { duration: 2, ease: "easeInOut" },
  },
};

// Optimized Background Component
const BackgroundLogoAnimation = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none will-change-transform">
    {/* Main Background Logo */}
    <motion.div
      className="absolute inset-0 flex items-center justify-center z-0"
      animate={{
        scale: [1, 1.03, 1],
        opacity: [0.12, 0.18, 0.12],
        rotate: [0, 1, 0, -1, 0],
      }}
      transition={{ duration: 12, repeat: Infinity, ease: [0.4, 0, 0.2, 1] }}
    >
      <img
        src={bg}
        alt=""
        className="w-[80%] max-w-[1000px] h-auto opacity-20"
        loading="lazy"
      />
    </motion.div>

    {/* Secondary Logo */}
    <motion.div
      className="absolute inset-0 flex items-center justify-center z-0"
      animate={{
        scale: [1.05, 1.12, 1.05],
        opacity: [0.08, 0.12, 0.08],
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
        alt=""
        className="w-[85%] max-w-[1200px] h-auto opacity-15"
        loading="lazy"
      />
    </motion.div>

    {/* Floating Particles */}
    {particlePositions.map((particle, i) => (
      <motion.div
        key={i}
        className={`absolute rounded-full ${particle.size} ${particle.color} z-10`}
        style={{ top: particle.top, left: particle.left }}
        animate={{
          y: [0, -30, 0],
          x: [0, Math.random() * 20 - 10, 0],
          scale: [1, 1.1, 1],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 6 + Math.random() * 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: Math.random() * 3,
        }}
      />
    ))}

    {/* Large Floating Elements */}
    <motion.div
      className="absolute top-1/2 left-1/4 w-8 h-8 bg-teal-400/90 rounded-full z-10"
      animate={{ y: [0, -40, 0], x: [0, 15, 0], scale: [1, 1.2, 1] }}
      transition={{
        duration: 9,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.5,
      }}
    />
    <motion.div
      className="absolute top-1/3 right-1/4 w-6 h-6 bg-emerald-400/90 rounded-full z-10"
      animate={{ y: [0, -35, 0], x: [0, -12, 0], scale: [1, 1.3, 1] }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 2.5,
      }}
    />

    {/* Pulse Dots */}
    <motion.div
      className="absolute top-40 right-40 w-4 h-4 bg-teal-400/90 rounded-full z-10"
      animate={{ scale: [1, 2, 1], opacity: [0.9, 0.3, 0.9] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute bottom-40 left-40 w-3 h-3 bg-emerald-400/90 rounded-full z-10"
      animate={{ scale: [1, 2.2, 1], opacity: [0.8, 0.2, 0.8] }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 2,
      }}
    />

    {/* Gradient Orbs */}
    <motion.div
      className="absolute top-20 left-10 w-60 h-60 bg-gradient-to-r from-teal-200/40 to-emerald-200/50 rounded-full z-0"
      animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute bottom-20 right-10 w-52 h-52 bg-gradient-to-r from-emerald-200/35 to-teal-200/45 rounded-full z-0"
      animate={{ scale: [1.15, 1, 1.15], opacity: [0.5, 0.3, 0.5] }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 2,
      }}
    />
  </div>
);

// Service Card Component
const ServiceCard = ({ service, index }) => {
  const isLeft = index % 2 === 0;
  const gradientFrom = service.color === "teal" ? "teal" : "emerald";
  const gradientTo = service.color === "teal" ? "emerald" : "teal";
  const borderColor = service.color === "teal" ? "teal-200" : "emerald-200";
  const hoverBorderColor =
    service.color === "teal" ? "teal-300" : "emerald-300";
  const bgColor = service.color === "teal" ? "teal-50" : "emerald-50";
  const textColor = service.color === "teal" ? "teal-600" : "emerald-600";

  return (
    <motion.div
      className={`relative z-20 ${
        isLeft ? "order-2 md:order-1" : "order-1 md:order-2"
      }`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={cardVariants}
    >
      <div className="relative group">
        <div
          className={`relative bg-gradient-to-br from-white to-${bgColor} rounded-3xl border-2 border-${borderColor} p-8 shadow-lg shadow-${borderColor}/30 md:w-80 w-72 transform transition-all duration-500 group-hover:shadow-${hoverBorderColor}/40 group-hover:scale-105 group-hover:border-${hoverBorderColor}`}
        >
          <div
            className={`absolute -top-2 -left-2 w-8 h-8 bg-${bgColor} rounded-full opacity-60`}
          />
          <div
            className={`absolute -bottom-2 -right-2 w-6 h-6 bg-${bgColor} rounded-full opacity-60`}
          />

          <div
            className={`absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-${gradientFrom}-500 to-${gradientTo}-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg shadow-${gradientFrom}-500/30 group-hover:rotate-12 transition-transform duration-500`}
          >
            {service.icon}
          </div>

          <div
            className={`inline-flex items-center justify-center w-14 h-14 bg-white text-${textColor} rounded-2xl font-allan text-xl font-bold mb-6 border-2 border-${borderColor} shadow-sm group-hover:bg-${bgColor} transition-colors duration-300`}
          >
            {service.number}
          </div>

          <div className="space-y-5">
            <h2 className="text-xl font-poppins font-semibold tracking-tight text-gray-800 leading-tight">
              {service.title}
            </h2>
            <div
              className={`h-1 w-16 bg-gradient-to-r from-${gradientFrom}-500 to-${gradientTo}-500 rounded-full opacity-80`}
            />
            <p className="text-gray-600 font-poppins leading-relaxed text-base font-light">
              {service.description}
            </p>
          </div>

          <div
            className={`absolute inset-0 rounded-3xl bg-gradient-to-br from-${bgColor}/50 to-${gradientTo}-50/50 opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10`}
          />
        </div>
      </div>
    </motion.div>
  );
};

// Connector SVG Component
const Connector = ({
  id,
  fromColor = "#0d9488",
  toColor = "#10b981",
  className = "",
  path = "M10,100 Q200,50 390,100",
}) => (
  <div
    className={`absolute z-10 w-80 h-40 transform hidden md:block ${className}`}
  >
    <svg width="100%" height="100%" viewBox="0 0 400 200" fill="none">
      <motion.path
        d={path}
        stroke={`url(#${id})`}
        strokeWidth="3"
        strokeDasharray="8 8"
        fill="none"
        variants={connectorVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      />
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={fromColor} />
          <stop offset="100%" stopColor={toColor} />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

// Service Row Component
const ServiceRow = ({ services, rowIndex, isLast = false }) => {
  const [service1, service2] = services;
  const baseIndex = rowIndex * 2;

  return (
    <div className="relative flex flex-col items-center justify-center w-full">
      {/* Cards Row */}
      <div className="relative flex flex-col items-center justify-center w-full max-w-4xl gap-12 md:flex-row md:gap-32">
        <ServiceCard service={service1} index={baseIndex} />
        <Connector
          id={`horizontal-${rowIndex}`}
          className="md:top-6 rotate-0"
          path="M10,100 Q200,50 390,100"
        />
        <ServiceCard service={service2} index={baseIndex + 1} />
      </div>

      {/* Vertical Connector to Next Row - Hidden for last row */}
      {!isLast && (
        <Connector
          id={`vertical-${rowIndex}`}
          fromColor="#10b981"
          toColor="#0d9488"
          className="md:top-[18rem] md:rotate-45"
          path="M10,100 Q200,150 390,100"
        />
      )}
    </div>
  );
};

// Skeleton Components
const ServiceCardSkeleton = () => (
  <div className="relative group w-72 md:w-80 animate-pulse">
    <div className="relative bg-gradient-to-br from-white to-gray-100 rounded-3xl border-2 border-gray-200 p-8 shadow-lg">
      <div className="absolute -top-2 -left-2 w-8 h-8 bg-gray-200 rounded-full" />
      <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-gray-200 rounded-full" />
      <div className="absolute -top-4 -right-4 w-16 h-16 bg-gray-300 rounded-2xl" />
      <div className="w-14 h-14 bg-gray-300 rounded-2xl mb-6" />
      <div className="space-y-5">
        <div className="h-8 bg-gray-300 rounded w-3/4" />
        <div className="h-1 w-16 bg-gray-300 rounded-full" />
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
          <div className="h-4 bg-gray-200 rounded w-4/6" />
        </div>
      </div>
    </div>
  </div>
);

const NextGenServicesSkeleton = () => (
  <div className="flex flex-col text-left justify-center items-center w-full mx-auto py-12 gap-16 md:gap-24 relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-teal-50/90">
    <div className="text-center space-y-4 animate-pulse">
      <div className="h-6 w-48 bg-gray-300 rounded-full mx-auto" />
      <div className="space-y-3">
        <div className="h-12 w-96 bg-gray-300 rounded-lg mx-auto" />
        <div className="h-12 w-80 bg-gray-300 rounded-lg mx-auto" />
      </div>
      <div className="h-5 w-72 bg-gray-200 rounded-full mx-auto" />
    </div>

    <div className="relative flex flex-col items-center justify-center w-full gap-12 p-4 md:gap-20 z-10">
      {[1, 2, 3].map((row) => (
        <div
          key={row}
          className="relative flex flex-col items-center justify-center w-full max-w-4xl gap-12 md:flex-row md:gap-32"
        >
          <ServiceCardSkeleton />
          <ServiceCardSkeleton />
        </div>
      ))}
    </div>

    <div className="text-center mt-12 relative z-10 p-6 animate-pulse">
      <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/80 border border-gray-200 shadow-sm mb-6">
        <div className="w-2 h-2 bg-gray-300 rounded-full" />
        <div className="h-4 w-32 bg-gray-300 rounded" />
        <div className="w-2 h-2 bg-gray-300 rounded-full" />
      </div>
      <div className="h-6 w-96 bg-gray-300 rounded mx-auto mb-8" />
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <div className="px-8 py-4 bg-gray-300 rounded-full w-48 h-14" />
        <div className="px-8 py-4 bg-gray-200 rounded-full w-48 h-14" />
      </div>
    </div>
  </div>
);

// Main Component
const NextGenServices = () => {
  const containerRef = useRef(null);
  const [activeService, setActiveService] = useState(0);
  const [loading, setLoading] = useState(true);
  const rafRef = useRef(null);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Optimized scroll tracking
  const { scrollYProgress } = useScroll({
    target: !loading ? containerRef : undefined,
    offset: ["start start", "end end"],
  });

  const serviceProgress = useTransform(
    scrollYProgress,
    [0, 1],
    [0, services.length - 1]
  );

  // Throttle state updates with requestAnimationFrame
  useEffect(() => {
    if (loading) return;

    const unsubscribe = serviceProgress.on("change", (latest) => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        setActiveService(Math.floor(latest));
        rafRef.current = null;
      });
    });

    return () => {
      unsubscribe();
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [serviceProgress, loading]);

  // Memoize background to prevent re-renders
  const memoizedBackground = useMemo(() => <BackgroundLogoAnimation />, []);

  if (loading) {
    return <NextGenServicesSkeleton />;
  }

  return (
    <div
      ref={containerRef}
      className="flex flex-col text-left justify-center items-center w-full mx-auto py-12 gap-16 md:gap-24 relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-teal-50/90"
    >
      {memoizedBackground}

      <SectionHeader
        subtitle="Our Services"
        title="Professional"
        highlight="Video Editing Services"
        description="Tailored solutions to elevate your content and grow your audience"
        center={true}
        titleSize="2xl"
        titleWeight="normal"
        descriptionSize="lg"
        lineSpacing="tight"
        highlightColor="teal-500"
        dotColor="teal-500"
      />

      <div className="relative flex flex-col items-center justify-center w-full gap-12 p-4 md:gap-20 z-10">
        {[services.slice(0, 2), services.slice(2, 4), services.slice(4, 6)].map(
          (rowServices, index) => (
            <ServiceRow
              key={index}
              services={rowServices}
              rowIndex={index}
              isLast={index === 2}
            />
          )
        )}
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        viewport={{ once: true }}
        className="text-center  relative z-10 p-6 font-poppins"
      >
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/80 border border-teal-200 shadow-sm mb-6">
          <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" />
          <span className="text-teal-700 font-medium text-sm tracking-wide">
            Ready to Start?
          </span>
          <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" />
        </div>

        <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-lg">
          Ready to elevate your content with our professional editing services?
          Schedule a free consultation to discuss your project needs.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-4 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-full font-semibold text-lg hover:from-teal-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-teal-500/25">
            Book Free Call
          </button>
          <button className="px-8 py-4 bg-transparent border border-teal-500 text-teal-600 rounded-full font-semibold text-lg hover:bg-teal-50 transition-all duration-300">
            View Portfolio
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default NextGenServices;
