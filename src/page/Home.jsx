// pages/Home.jsx
import React, { lazy, Suspense, useEffect } from "react";
import LazyLoader from "../components/Shared/LazyLoader";

// Import components normally (for better initial load)
import HeroSection from "../components/Home/HeroSection";
import MotionCredibilityStrip from "../components/Shared/MotionCredibilityStrip";
import MotionCredit from "../components/Home/MotionCredit";

// Lazy load only the heavier components
const FeaturedPortfolio = lazy(() =>
  import("../components/Home/FeaturedPortfolio")
);
const NextGenServices = lazy(() =>
  import("../components/Home/NextGenServices")
);
const TestimonialSection = lazy(() =>
  import("../components/Home/TestimonialSection")
);
const CallToAction = lazy(() => import("../components/Home/CallToAction"));

// Loading placeholder component
const SectionPlaceholder = ({ height = "60vh" }) => (
  <div
    className="bg-gradient-to-br from-gray-50 to-gray-100 animate-pulse rounded-lg"
    style={{ height }}
  />
);

const Home = () => {
  // Add passive scroll listeners for performance
  useEffect(() => {
    // Optimize scroll performance - FIXED VERSION
    const optimizeScroll = () => {
      // Force hardware acceleration on scroll containers
      const style = document.createElement("style");
      style.setAttribute("data-scroll-opt", "true");
      style.textContent = `
        .optimize-scroll {
          transform: translateZ(0);
          backface-visibility: hidden;
          perspective: 1000px;
          will-change: transform;
        }
        /* Remove global scrollbar styles that might conflict */
        html {
          overflow-y: auto;
          overflow-x: hidden;
        }
        body {
          overflow-y: auto;
          overflow-x: hidden;
          width: 100%;
          position: relative;
        }
        /* Only style specific scrollbars */
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f7fafc;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #cbd5e0;
          border-radius: 4px;
        }
      `;
      document.head.appendChild(style);

      // Clean up any conflicting overflow styles
      document.documentElement.style.overflowX = "hidden";
      document.body.style.overflowX = "hidden";
    };

    optimizeScroll();

    // Cleanup
    return () => {
      const style = document.querySelector("style[data-scroll-opt]");
      if (style) style.remove();
      // Reset styles
      document.documentElement.style.overflowX = "";
      document.body.style.overflowX = "";
    };
  }, []);

  return (
    // REMOVED scroll-container class - this was causing the issue
    <div className="relative">
      {/* Hero - Load immediately (critical content) */}
      <div className="optimize-scroll">
        <HeroSection />
      </div>

      {/* Credibility Strip - Load immediately */}
      <div className="optimize-scroll">
        <MotionCredibilityStrip />
      </div>

      {/* Featured Portfolio - Lazy load with intersection observer */}
      <LazyLoader height="70vh" threshold={0.05}>
        <Suspense fallback={<SectionPlaceholder height="70vh" />}>
          <MotionCredit />
        </Suspense>
      </LazyLoader>

      {/* Featured Portfolio - Lazy load with intersection observer */}
      <LazyLoader height="70vh">
        <Suspense fallback={<SectionPlaceholder height="70vh" />}>
          <FeaturedPortfolio />
        </Suspense>
      </LazyLoader>

      {/* NextGen Services - Lazy load */}
      <LazyLoader height="80vh" threshold={0.05}>
        <Suspense fallback={<SectionPlaceholder height="80vh" />}>
          <NextGenServices />
        </Suspense>
      </LazyLoader>

      {/* Testimonials - Lazy load */}
      <LazyLoader height="50vh">
        <Suspense fallback={<SectionPlaceholder height="50vh" />}>
          <TestimonialSection />
        </Suspense>
      </LazyLoader>

      {/* CTA - Lazy load with lower threshold (load earlier) */}
      <LazyLoader height="40vh" threshold={0.2}>
        <Suspense fallback={<SectionPlaceholder height="40vh" />}>
          <CallToAction />
        </Suspense>
      </LazyLoader>
    </div>
  );
};

export default React.memo(Home);
