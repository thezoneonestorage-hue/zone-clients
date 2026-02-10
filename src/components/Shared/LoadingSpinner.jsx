import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const LoadingSpinner = () => {
  const canvasRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [dimensions, setDimensions] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1200,
    height: typeof window !== "undefined" ? window.innerHeight : 800,
  });

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Simulate loading progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Canvas animation for background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = dimensions.width * dpr;
      canvas.height = dimensions.height * dpr;
      canvas.style.width = `${dimensions.width}px`;
      canvas.style.height = `${dimensions.height}px`;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();

    const draw = (time) => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      // Responsive particle count based on screen size
      const particleCount = dimensions.width < 768 ? 30 : 50;

      for (let i = 0; i < particleCount; i++) {
        const x =
          Math.sin(time * 0.0005 + i * 0.2) * dimensions.width * 0.2 +
          dimensions.width / 2;
        const y =
          Math.cos(time * 0.0005 + i * 0.2) * dimensions.height * 0.2 +
          dimensions.height / 2;
        const size = Math.sin(time * 0.002 + i) * 2 + 1;

        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(20, 184, 166, ${
          0.2 + Math.sin(time * 0.005 + i) * 0.15
        })`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [dimensions]);

  // Responsive sizes
  const getSpinnerSize = () => {
    if (dimensions.width < 640) return 48; // sm
    if (dimensions.width < 768) return 64; // md
    if (dimensions.width < 1024) return 80; // lg
    return 96; // xl and above
  };

  const getMainSpinnerSize = () => {
    if (dimensions.width < 640) return "w-48 h-48";
    if (dimensions.width < 768) return "w-56 h-56";
    if (dimensions.width < 1024) return "w-64 h-64";
    return "w-80 h-80";
  };

  const getInnerSpinnerSize = () => {
    if (dimensions.width < 640) return "w-32 h-32";
    if (dimensions.width < 768) return "w-40 h-40";
    if (dimensions.width < 1024) return "w-48 h-48";
    return "w-64 h-64";
  };

  const getCenterIconSize = () => {
    if (dimensions.width < 640) return "w-20 h-20";
    if (dimensions.width < 768) return "w-24 h-24";
    if (dimensions.width < 1024) return "w-28 h-28";
    return "w-32 h-32";
  };

  const getIconSvgSize = () => {
    if (dimensions.width < 640) return "w-8 h-8";
    if (dimensions.width < 768) return "w-10 h-10";
    if (dimensions.width < 1024) return "w-12 h-12";
    return "w-16 h-16";
  };

  const getTextContainerWidth = () => {
    if (dimensions.width < 640) return "w-64";
    if (dimensions.width < 768) return "w-72";
    return "w-96";
  };

  const getFontSize = () => {
    if (dimensions.width < 640) return "text-xs";
    if (dimensions.width < 768) return "text-sm";
    return "text-sm";
  };

  const getAudioBarCount = () => {
    if (dimensions.width < 640) return 15;
    if (dimensions.width < 768) return 20;
    return 25;
  };

  const getAudioBarWidth = () => {
    if (dimensions.width < 640) return "w-48";
    if (dimensions.width < 768) return "w-56";
    return "w-80";
  };

  return (
    <div className="fixed font-poppins inset-0 w-full h-full bg-white flex items-center justify-center z-50 overflow-hidden">
      {/* Animated background canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{
          width: dimensions.width,
          height: dimensions.height,
        }}
      />

      {/* Gradient overlays for soft effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-teal-50/20 to-white/80"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-teal-100/10 to-emerald-100/10"></div>

      {/* Main centered content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4">
        {/* Outer container with glow effect */}
        <motion.div
          className={`relative ${getMainSpinnerSize()} flex items-center justify-center`}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Glow effect behind the spinner */}
          <motion.div
            className="absolute inset-0 rounded-full bg-teal-200/30 blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          {/* Main spinner ring */}
          <motion.div
            className={`absolute w-full h-full rounded-full border-4 border-transparent`}
            style={{
              backgroundImage:
                "linear-gradient(white, white), linear-gradient(to right, #0d9488, #10b981, #0d9488)",
              backgroundOrigin: "border-box",
              backgroundClip: "content-box, border-box",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />

          {/* Inner ring with reverse rotation */}
          <motion.div
            className={`absolute ${getInnerSpinnerSize()} rounded-full border-4 border-transparent`}
            style={{
              backgroundImage:
                "linear-gradient(white, white), linear-gradient(to left, #0d9488, #10b981, #0d9488)",
              backgroundOrigin: "border-box",
              backgroundClip: "content-box, border-box",
            }}
            animate={{ rotate: -360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />

          {/* Video play icon in center */}
          <motion.div
            className={`absolute ${getCenterIconSize()} rounded-full bg-gradient-to-br from-teal-100/40 to-emerald-100/40 backdrop-blur-md flex items-center justify-center shadow-lg border border-white/50`}
            animate={{
              scale: [1, 1.05, 1],
              boxShadow: [
                "0 0 0px rgba(13, 148, 136, 0.2)",
                "0 0 30px rgba(13, 148, 136, 0.4)",
                "0 0 0px rgba(13, 148, 136, 0.2)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <svg
                className={`${getIconSvgSize()} text-teal-600 drop-shadow-sm`}
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Loading text and progress */}
        <motion.div
          className={`mt-8 lg:mt-12 text-center ${getTextContainerWidth()}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <motion.p
            className={`text-teal-700 font-mono ${getFontSize()} mb-3 lg:mb-4 tracking-wider uppercase`}
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Preparing Your Visual Experience
          </motion.p>

          {/* Progress bar with gradient */}
          <div className="w-full h-1.5 lg:h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
            <motion.div
              className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {/* Progress percentage and timecode */}
          <div className="flex justify-between items-center">
            <motion.span
              className={`text-teal-600 font-mono ${
                dimensions.width < 640 ? "text-xs" : "text-xs"
              }`}
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              {progress}%
            </motion.span>

            <motion.span
              className={`text-teal-600 font-mono ${
                dimensions.width < 640 ? "text-xs" : "text-xs"
              }`}
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
            >
              {`00:00:${progress < 10 ? "0" + progress : progress}:24`}
            </motion.span>
          </div>
        </motion.div>

        {/* Video editing terms floating in background - Hidden on small screens */}
        {dimensions.width >= 768 && (
          <div className="absolute -z-10 inset-0 overflow-hidden opacity-20">
            {[
              "COLOR GRADING",
              "MOTION GRAPHICS",
              "VISUAL EFFECTS",
              "4K EDITING",
              "CINEMATIC",
              "SOUND DESIGN",
            ].map((term, i) => (
              <motion.div
                key={i}
                className="absolute text-teal-600/20 font-mono text-xs uppercase tracking-widest"
                style={{
                  left: `${10 + i * 15}%`,
                  top: `${20 + i * 10}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0, 0.3, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  delay: i * 0.7,
                }}
              >
                {term}
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Subtle audio visualization at bottom - Responsive */}
      <div
        className={`absolute bottom-6 lg:bottom-10 left-0 right-0 mx-auto ${getAudioBarWidth()} h-4 lg:h-6 flex items-center justify-center`}
      >
        {[...Array(getAudioBarCount())].map((_, i) => (
          <motion.div
            key={i}
            className="w-0.5 lg:w-1 h-3 lg:h-4 mx-0.5 bg-gradient-to-t from-teal-400 to-emerald-400 rounded-t-sm"
            animate={{
              height: [
                dimensions.width < 640 ? 4 : 8,
                dimensions.width < 640 ? 12 : 24,
                dimensions.width < 640 ? 4 : 8,
              ],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.05,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingSpinner;
