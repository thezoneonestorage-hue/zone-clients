// components/Home/MotionCredibilityStrip.jsx
import React, { useEffect, useRef, useCallback } from "react";

const MotionCredibilityStrip = () => {
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  // Optimized scroll handler
  const handleScroll = useCallback(() => {
    if (!containerRef.current || ticking.current) return;

    ticking.current = true;

    requestAnimationFrame(() => {
      const currentScrollY = window.scrollY;
      const container = containerRef.current;

      // Only animate if element is in viewport
      const rect = container.getBoundingClientRect();
      const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;

      if (isInViewport) {
        // Your animation logic here (optimized)
        const scrollDelta = currentScrollY - lastScrollY.current;
        // Limit animation updates for performance
        if (Math.abs(scrollDelta) > 1) {
          // Apply transform with will-change
          container.style.transform = `translateX(${scrollDelta * 0.1}px)`;
        }
      }

      lastScrollY.current = currentScrollY;
      ticking.current = false;
    });
  }, []);

  useEffect(() => {
    // Use passive event listener for better performance
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [handleScroll]);

  return (
    <div
      ref={containerRef}
      className="optimize-scroll"
      style={{
        willChange: "transform",
        contain: "layout style paint", // CSS containment for performance
      }}
    >
      {/* Your credibility strip content */}
      <div className="flex overflow-hidden">
        {/* Use simple transforms instead of heavy libraries */}
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="flex-shrink-0 px-8"
            style={{
              transform: "translateZ(0)", // Force GPU acceleration
            }}
          >
            {/* Logo or text */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(MotionCredibilityStrip);
