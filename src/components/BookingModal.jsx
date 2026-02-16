import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "react-modal";

// Set the app element for accessibility
if (typeof window !== "undefined") {
  Modal.setAppElement("#root"); // or your app's root element ID
}

const BookingModal = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [bookingCompleted, setBookingCompleted] = useState(false);
  const [error, setError] = useState(null);
  const [iframeError, setIframeError] = useState(false);

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // Handle Calendly/TidyCal messages
  const handleMessage = useCallback(
    (event) => {
      // Verify event origin for security
      const allowedOrigins = [
        "https://calendly.com",
        "https://tidycal.com",
        window.location.origin,
      ];

      if (!allowedOrigins.includes(event.origin)) return;

      if (event.data.event === "calendly.event_scheduled") {
        setBookingCompleted(true);
        console.log("Booking completed!", event.data);

        // Auto-close modal after successful booking
        setTimeout(() => {
          onClose();
        }, 3000);
      }
    },
    [onClose]
  );

  // Reset booking state
  const resetBooking = useCallback(() => {
    setBookingCompleted(false);
    setError(null);
    setIframeError(false);
    setIsLoading(true);

    // Reload iframe
    const iframe = document.querySelector('iframe[title*="Schedule"]');
    if (iframe) {
      iframe.src = iframe.src;
    }
  }, []);

  // Handle iframe load
  const handleIframeLoad = () => {
    setIsLoading(false);
    setIframeError(false);
    setError(null);
  };

  // Handle iframe error
  const handleIframeError = () => {
    setIframeError(true);
    setIsLoading(false);
    setError(
      "Failed to load calendar. Please check your connection and try again."
    );
  };

  // Listen for booking completion
  useEffect(() => {
    if (isOpen) {
      window.addEventListener("message", handleMessage);
    }

    return () => window.removeEventListener("message", handleMessage);
  }, [isOpen, handleMessage]);

  // Reset states when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setBookingCompleted(false);
      setError(null);
      setIframeError(false);
    }
  }, [isOpen]);

  // Animation variants with reduced motion support
  const modalVariants = {
    hidden: {
      opacity: 0,
      ...(!prefersReducedMotion && { scale: 0.8, y: -20 }),
    },
    visible: {
      opacity: 1,
      ...(!prefersReducedMotion && { scale: 1, y: 0 }),
      transition: {
        duration: prefersReducedMotion ? 0.1 : 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      ...(!prefersReducedMotion && { scale: 0.8, y: 20 }),
      transition: {
        duration: prefersReducedMotion ? 0.1 : 0.2,
        ease: "easeIn",
      },
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.2,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  // Custom styles for react-modal
  const customModalStyles = {
    overlay: {
      backgroundColor: "transparent",
      zIndex: 50,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "1rem",
    },
    content: {
      position: "relative",
      inset: "auto",
      padding: 0,
      border: "none",
      background: "transparent",
      borderRadius: "0.75rem",
      maxWidth: "72rem",
      width: "100%",
      maxHeight: "90vh",
      overflow: "visible",
      WebkitOverflowScrolling: "touch",
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customModalStyles}
      contentLabel="Booking Consultation Modal"
      closeTimeoutMS={300}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      preventScroll={true}
      overlayElement={(props, contentElement) => (
        <motion.div
          {...props}
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={{
            ...props.style,
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(4px)",
          }}
        >
          {/* Gradient overlays for teal/emerald soft effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-teal-50/60 to-emerald-50/80 pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-teal-100/40 to-emerald-50/40 pointer-events-none"></div>
          {contentElement}
        </motion.div>
      )}
      contentElement={(props, children) => (
        <motion.div
          {...props}
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={{
            ...props.style,
            position: "relative",
            backgroundColor: "white",
            border: "1px solid #99f6e4",
            borderRadius: "0.75rem",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            width: "100%",
            maxHeight: "90vh",
            overflow: "hidden",
            margin: "auto",
          }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white hover:bg-teal-50 border border-teal-200 flex items-center justify-center transition-all duration-200 group shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            aria-label="Close modal"
          >
            <svg
              className="w-4 h-4 text-teal-600 group-hover:text-teal-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {children}

          {/* Decorative elements with teal/emerald colors */}
          <div className="absolute top-4 left-4 flex gap-2 z-10 pointer-events-none">
            <span className="w-2 h-2 rounded-full bg-teal-400 shadow-sm"></span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm"></span>
            <span className="w-2 h-2 rounded-full bg-teal-600 shadow-sm"></span>
          </div>
        </motion.div>
      )}
    >
      <div className="max-h-[90vh] overflow-y-auto">
        <div className="bg-gradient-to-br from-white via-teal-50/30 to-emerald-50/30 py-8 px-6 sm:px-8 border-b border-teal-200">
          <div className="max-w-6xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-8">
              <motion.h2
                className="text-teal-600 font-mono uppercase tracking-widest text-sm md:text-base mb-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Book Your Creative Session
              </motion.h2>

              <motion.h1
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Schedule Your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-500">
                  1-Hour Consultation
                </span>
              </motion.h1>

              <motion.p
                className="text-lg text-gray-600 max-w-3xl mx-auto"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Let's discuss your project and create something extraordinary
                together.
              </motion.p>

              {/* Success Message */}
              {bookingCompleted && (
                <motion.div
                  className="mt-6 bg-emerald-50 border border-emerald-200 rounded-lg p-4 max-w-md mx-auto backdrop-blur-sm"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  role="status"
                  aria-live="polite"
                >
                  <div className="flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-emerald-600 mr-2 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-emerald-700 font-medium">
                      Booking confirmed! Check your email for details.
                    </span>
                  </div>
                </motion.div>
              )}

              {/* Error Message */}
              {error && !bookingCompleted && (
                <motion.div
                  className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4 max-w-md mx-auto"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  role="alert"
                >
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-red-600 mr-2 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-red-700 text-sm">{error}</span>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Sidebar - Info & Features */}
              <div className="lg:col-span-1 space-y-4">
                {/* Quick Info Card */}
                <motion.div
                  className="bg-white rounded-xl border border-teal-200 p-4 shadow-sm"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <h3 className="font-semibold text-teal-700 mb-3 font-mono">
                    SESSION DETAILS
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm">
                      <svg
                        className="w-4 h-4 text-teal-600 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="text-gray-600">60 minutes</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <svg
                        className="w-4 h-4 text-teal-600 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      <span className="text-gray-600">
                        1-on-1 creative session
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <svg
                        className="w-4 h-4 text-teal-600 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                      <span className="text-gray-600">Video call</span>
                    </div>
                  </div>
                </motion.div>

                {/* Features Card */}
                <motion.div
                  className="bg-white rounded-xl border border-teal-200 p-4 shadow-sm"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <h3 className="font-semibold text-teal-700 mb-3 font-mono">
                    WHAT WE'LL COVER
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
                      <span className="text-gray-600">
                        Project analysis & strategy
                      </span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                      <span className="text-gray-600">
                        Creative direction & vision
                      </span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
                      <span className="text-gray-600">
                        Technical requirements
                      </span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                      <span className="text-gray-600">
                        Timeline & deliverables
                      </span>
                    </li>
                  </ul>
                </motion.div>

                {/* Support Card */}
                <motion.div
                  className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-xl border border-teal-200 p-4 shadow-sm"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <h3 className="font-semibold text-teal-700 mb-2 font-mono">
                    NEED HELP?
                  </h3>
                  <p className="text-gray-600 text-xs mb-3">
                    Technical issues or questions? We're here to assist!
                  </p>
                  <a
                    href="mailto:support@yourdomain.com"
                    className="text-teal-600 hover:text-teal-700 text-xs font-medium inline-flex items-center group"
                  >
                    Contact support
                    <svg
                      className="w-3 h-3 ml-1 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </a>
                </motion.div>
              </div>

              {/* Calendar Section */}
              <div className="lg:col-span-3">
                <motion.div
                  className="bg-white rounded-xl border border-teal-200 overflow-hidden shadow-sm"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {/* Loading State */}
                  {isLoading && !iframeError && (
                    <div className="flex items-center justify-center py-16">
                      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-teal-600"></div>
                      <span className="ml-3 text-teal-600 font-mono">
                        Loading calendar...
                      </span>
                    </div>
                  )}

                  {/* Error State */}
                  {iframeError && (
                    <div className="flex flex-col items-center justify-center py-16 px-4">
                      <div className="text-red-600 mb-4">
                        <svg
                          className="w-12 h-12 mx-auto"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <p className="text-gray-700 text-center mb-4">{error}</p>
                      <button
                        onClick={resetBooking}
                        className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                      >
                        Try Again
                      </button>
                    </div>
                  )}

                  {/* Calendly Iframe */}
                  <iframe
                    src={`${import.meta.env.VITE_TIDYCAL_URL}`}
                    width="100%"
                    height="600"
                    frameBorder="0"
                    title="Schedule Your Creative Session"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
                    className={`w-full ${
                      isLoading || iframeError ? "hidden" : "block"
                    }`}
                    onLoad={handleIframeLoad}
                    onError={handleIframeError}
                  />
                </motion.div>

                {/* Booking Steps */}
                <motion.div
                  className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3 text-center"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="bg-white rounded-lg p-3 border border-teal-200 shadow-sm hover:border-teal-300 transition-colors">
                    <div className="text-xl font-bold text-teal-600 mb-1 font-mono">
                      01
                    </div>
                    <p className="text-xs text-gray-600">Select your time</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-teal-200 shadow-sm hover:border-teal-300 transition-colors">
                    <div className="text-xl font-bold text-emerald-600 mb-1 font-mono">
                      02
                    </div>
                    <p className="text-xs text-gray-600">Enter details</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-teal-200 shadow-sm hover:border-teal-300 transition-colors">
                    <div className="text-xl font-bold text-teal-600 mb-1 font-mono">
                      03
                    </div>
                    <p className="text-xs text-gray-600">Get confirmation</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default BookingModal;
