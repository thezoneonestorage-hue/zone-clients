import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import SectionHeader from "../Shared/SectionHeader";
import useMediaQuery from "../../hooks/useMediaQuery";

const CallToAction = () => {
  const ctaRef = useRef(null);
  const isInView = useInView(ctaRef, { once: true, amount: 0.3 });
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");

  // Interactive particle effect - optimized
  useEffect(() => {
    const container = containerRef.current;
    if (!container || isMobile) return; // Disable on mobile for performance

    const particles = [];
    const particleCount = 15; // Reduced from 30

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.className = "absolute rounded-full cta-particle";
      particle.style.width = `${2 + Math.random() * 2}px`; // Smaller on mobile
      particle.style.height = particle.style.width;
      particle.style.background = `radial-gradient(circle, ${
        Math.random() > 0.5
          ? "rgba(255, 255, 255, 0.8)"
          : "rgba(20, 184, 166, 0.8)"
      }, transparent)`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.opacity = "0.2";
      particle.style.transition = "all 0.4s ease-out";
      container.appendChild(particle);
      particles.push(particle);
    }

    // Animate particles on hover
    const handleMouseEnter = () => {
      setIsHovered(true);
      particles.forEach((particle) => {
        const x = (Math.random() - 0.5) * 60; // Reduced movement
        const y = (Math.random() - 0.5) * 60;
        particle.style.transform = `translate(${x}px, ${y}px)`;
        particle.style.opacity = "1";
      });
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      particles.forEach((particle) => {
        particle.style.transform = "translate(0, 0)";
        particle.style.opacity = "0.2";
      });
    };

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
      particles.forEach((particle) => container.removeChild(particle));
    };
  }, [isMobile]);

  // Binary rain effect - memoized
  const binaryRainItems = useMemo(() => {
    if (isMobile) return []; // Disable on mobile
    return [...Array(8)].map((_, i) => ({
      // Reduced from 15
      left: 5 + Math.random() * 90,
      delay: Math.random() * 5,
      duration: 5 + Math.random() * 5,
      digit: Math.random() > 0.5 ? "1" : "0",
    }));
  }, [isMobile]);

  // Feature items data - memoized
  const featureItems = useMemo(
    () => [
      {
        id: 1,
        icon: (
          <svg
            className={`${isMobile ? "w-6 h-6" : "w-8 h-8"} text-teal-500`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        ),
        text: "Replies within 24 hours",
        color: "teal",
        width: "95%",
        delay: 0.6,
      },
      {
        id: 2,
        icon: (
          <svg
            className={`${isMobile ? "w-6 h-6" : "w-8 h-8"} text-emerald-500`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
        ),
        text: "Simple pricing",
        color: "emerald",
        width: "100%",
        delay: 0.8,
      },
      {
        id: 3,
        icon: (
          <svg
            className={`${isMobile ? "w-6 h-6" : "w-8 h-8"} text-teal-500`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        ),
        text: "Fast delivery",
        color: "teal",
        width: "90%",
        delay: 1.0,
      },
    ],
    [isMobile]
  );

  // Animation variants - memoized
  const buttonVariants = useMemo(
    () => ({
      hidden: { opacity: 0, scale: 0.9 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5, delay: 0.2 },
      },
    }),
    []
  );

  const featureVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { duration: 0.5, delay: 0.4 },
      },
    }),
    []
  );

  const progressBarVariants = useMemo(
    () => ({
      hidden: { width: "0%" },
      visible: (width) => ({
        width: width,
        transition: { duration: 0.8, ease: "easeOut" },
      }),
    }),
    []
  );

  return (
    <section
      ref={ctaRef}
      className={`relative ${
        isMobile ? "py-16" : isTablet ? "py-24" : "py-32"
      } bg-gradient-to-b font-poppins from-white to-gray-50 overflow-hidden`}
    >
      {/* Animated circuit board background - simplified on mobile */}
      <div
        className={`absolute inset-0 z-0 ${
          isMobile ? "opacity-5" : "opacity-10"
        }`}
      >
        <div className="circuit-board"></div>
      </div>

      {/* Glowing orbs - hidden on mobile */}
      {!isMobile && (
        <>
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-teal-100 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-emerald-100 rounded-full blur-3xl animate-pulse-slow"></div>
        </>
      )}

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <SectionHeader
            title="Your footage deserves "
            highlight="an unforgettable edit"
            description={
              isMobile
                ? "Transform your raw footage into captivating visual stories."
                : "Transform your raw footage into captivating visual stories that engage your audience and elevate your brand."
            }
            center={true}
            titleSize={isMobile ? "lg" : "2xl"}
            descriptionSize={isMobile ? "sm" : "lg"}
            lineSpacing="tight"
          />

          {/* Teal CTA Button */}
          <motion.div
            ref={containerRef}
            variants={buttonVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative inline-block group"
          >
            {/* Outer glow - simplified on mobile */}
            <div
              className={`absolute -inset-4 rounded-2xl blur-xl transition-all duration-500 ${
                isHovered && !isMobile ? "bg-teal-500/30" : "bg-teal-500/20"
              } ${isMobile ? "hidden" : ""}`}
            ></div>

            {/* Teal button */}
            <Link
              to="/contact"
              className={`relative ${
                isMobile ? "px-8 py-4 text-xl" : "px-12 py-6 text-2xl"
              } bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-2xl font-bold border border-teal-500 hover:from-teal-600 hover:to-teal-700 transition-all duration-300 transform group-hover:scale-105 shadow-2xl shadow-teal-500/20 group-hover:shadow-teal-500/40 flex items-center justify-center overflow-hidden`}
              onMouseEnter={() => !isMobile && setIsHovered(true)}
              onMouseLeave={() => !isMobile && setIsHovered(false)}
            >
              {/* Animated background - simplified on mobile */}
              {!isMobile && (
                <div className="absolute inset-0 opacity-20">
                  <div className="modern-pattern"></div>
                </div>
              )}

              {/* Shine effect - hidden on mobile */}
              {!isMobile && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-shine"></div>
              )}

              <span>Start a Project</span>
              <motion.svg
                className={`${
                  isMobile ? "w-5 h-5 ml-2" : "w-6 h-6 ml-3"
                } text-white`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                animate={{ x: isHovered && !isMobile ? 5 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </motion.svg>
            </Link>

            {/* Binary code rain effect - hidden on mobile */}
            {!isMobile && (
              <div className="absolute inset-0 overflow-hidden rounded-2xl opacity-10 pointer-events-none">
                {binaryRainItems.map((item, i) => (
                  <div
                    key={i}
                    className="absolute text-white font-mono text-xs opacity-70 binary-rain"
                    style={{
                      left: `${item.left}%`,
                      animationDelay: `${item.delay}s`,
                      animationDuration: `${item.duration}s`,
                    }}
                  >
                    {item.digit}
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Feature indicators with animated bars */}
          <motion.div
            variants={featureVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className={`grid grid-cols-1 ${
              isMobile ? "gap-4 mt-8" : "md:grid-cols-3 gap-6 mt-12"
            }`}
          >
            {featureItems.map((item) => (
              <div
                key={item.id}
                className={`bg-white/60 backdrop-blur-sm rounded-xl ${
                  isMobile ? "p-3" : "p-4"
                } border border-${item.color}-100 hover:border-${
                  item.color
                }-200 transition-colors duration-300 shadow-sm`}
              >
                <div
                  className={`flex items-center justify-center ${
                    isMobile ? "mb-1" : "mb-2"
                  }`}
                >
                  {item.icon}
                </div>
                <p
                  className={`text-gray-700 font-medium ${
                    isMobile ? "text-xs" : "text-sm"
                  }`}
                >
                  {item.text}
                </p>
                <div
                  className={`h-1 mt-2 bg-gray-200 rounded-full overflow-hidden`}
                >
                  <motion.div
                    className={`h-full bg-${item.color}-500 rounded-full`}
                    custom={item.width}
                    variants={progressBarVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        .circuit-board {
          background-image: radial-gradient(
              circle at 1px 1px,
              rgba(20, 184, 166, 0.1) 1px,
              transparent 0
            ),
            radial-gradient(
              circle at 1px 1px,
              rgba(16, 185, 129, 0.1) 1px,
              transparent 0
            );
          background-size: ${isMobile ? "20px 20px" : "30px 30px"};
          background-position: 0 0, 15px 15px;
        }

        .modern-pattern {
          background-image: linear-gradient(
              45deg,
              rgba(255, 255, 255, 0.1) 25%,
              transparent 25%,
              transparent 75%,
              rgba(255, 255, 255, 0.1) 75%,
              rgba(255, 255, 255, 0.1)
            ),
            linear-gradient(
              45deg,
              rgba(255, 255, 255, 0.1) 25%,
              transparent 25%,
              transparent 75%,
              rgba(255, 255, 255, 0.1) 75%,
              rgba(255, 255, 255, 0.1)
            );
          background-size: 60px 60px;
          background-position: 0 0, 30px 30px;
        }

        .cta-particle {
          transition: all 0.4s ease-out;
        }

        .binary-rain {
          animation: binaryFall linear infinite;
        }

        @keyframes binaryFall {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          10% {
            opacity: 0.7;
          }
          90% {
            opacity: 0.7;
          }
          100% {
            transform: translateY(1000%);
            opacity: 0;
          }
        }

        @keyframes shine {
          0% {
            transform: translateX(-100%) skewX(-12deg);
          }
          100% {
            transform: translateX(200%) skewX(-12deg);
          }
        }

        .animate-shine {
          animation: shine 3s infinite;
        }

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
          animation: pulse-slow 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default CallToAction;
