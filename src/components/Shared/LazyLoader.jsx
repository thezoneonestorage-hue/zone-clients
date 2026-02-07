// components/Home/LazyLoader.jsx
import React, { useRef, useEffect, useState } from "react";

const LazyLoader = ({ children, threshold = 0.1, height = "auto" }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasLoaded) {
          setIsVisible(true);
          setHasLoaded(true);
          // Keep observing for animations that might need to re-trigger
        }
      },
      {
        root: null,
        rootMargin: "50px", // Load 50px before entering viewport
        threshold: threshold,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, hasLoaded]);

  return (
    <div
      ref={ref}
      className="lazy-section"
      style={{
        minHeight: isVisible ? "auto" : height,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
      }}
    >
      {isVisible ? (
        <div className="content-visible">{children}</div>
      ) : (
        <div
          className="loading-placeholder"
          style={{ height, width: "100%" }}
        />
      )}
    </div>
  );
};

export default LazyLoader;
