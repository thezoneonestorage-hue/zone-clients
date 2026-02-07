// components/Home/OptimizedSection.jsx
import React from "react";
import { useInView } from "react-intersection-observer";

const OptimizedSection = ({ children, threshold = 0.1, className = "" }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold,
    rootMargin: "50px 0px",
  });

  return (
    <div
      ref={ref}
      className={`transition-all duration-500 ease-out transform ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      } ${className}`}
      style={{
        willChange: "transform, opacity",
      }}
    >
      {inView ? (
        children
      ) : (
        <div className="h-64 bg-gradient-to-r from-gray-100 to-gray-200 animate-pulse rounded" />
      )}
    </div>
  );
};

export default OptimizedSection;
