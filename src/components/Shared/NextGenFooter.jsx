import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaLinkedin,
  FaArrowRight,
  FaTrophy,
  FaLightbulb,
  FaShieldAlt,
  FaCode,
  FaArrowUp,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/Zone-logo.svg";
import useMediaQuery from "../../hooks/useMediaQuery";

const NextGenFooter = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");

  const [hoveredItem, setHoveredItem] = useState(null);
  const [showRiddles, setShowRiddles] = useState(false);
  const [currentRiddleIndex, setCurrentRiddleIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [showMotivationalModal, setShowMotivationalModal] = useState(false);
  const [motivationalQuote, setMotivationalQuote] = useState("");
  const [redirectCountdown, setRedirectCountdown] = useState(3);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Secret admin riddle (answer from environment variable)
  const secretRiddle = useMemo(
    () => ({
      question:
        "I'm the invisible artist that makes every frame perfect. I use algorithms to enhance, but I'm not a programmer. What am I?",
      answer: import.meta.env.VITE_SECRET_RIDDLE_ANSWER,
      hint: "Modern editing technology",
      isSecret: true,
    }),
    []
  );

  // Riddle data with secret riddle as 5th position - memoized
  const riddles = useMemo(
    () => [
      {
        question:
          "I have a timeline but no clock, I cut but don't bleed. What am I?",
        answer: "video editing",
        hint: "Think about digital creativity",
        isSecret: false,
      },
      {
        question:
          "I make things smooth between scenes, but I'm not a dancer. What am I?",
        answer: "transition",
        hint: "Connects different shots",
        isSecret: false,
      },
      {
        question:
          "I can make you laugh or cry without saying a word, through moving pictures. What am I?",
        answer: "montage",
        hint: "Sequence of shots telling a story",
        isSecret: false,
      },
      {
        question:
          "I control the mood with colors but I'm not a painter. What am I?",
        answer: "color grading",
        hint: "Post-production process",
        isSecret: false,
      },
      secretRiddle,
      {
        question:
          "I remove what you don't want but I'm not an eraser. What am I?",
        answer: "masking",
        hint: "Hides or reveals parts of footage",
        isSecret: false,
      },
      {
        question: "I sync movements but I'm not a conductor. What am I?",
        answer: "motion tracking",
        hint: "Follows objects in footage",
        isSecret: false,
      },
      {
        question:
          "I make things bigger than life but I'm not a telescope. What am I?",
        answer: "zoom",
        hint: "Camera effect",
        isSecret: false,
      },
      {
        question: "I tell your story in seconds but I'm not a book. What am I?",
        answer: "trailer",
        hint: "Movie preview",
        isSecret: false,
      },
      {
        question: "I make voices clear but I'm not a microphone. What am I?",
        answer: "audio mixing",
        hint: "Sound editing process",
        isSecret: false,
      },
      {
        question:
          "I create the illusion of time but I'm not a clock. What am I?",
        answer: "time remapping",
        hint: "Speed control effect",
        isSecret: false,
      },
    ],
    [secretRiddle]
  );

  // Motivational quotes pool - reduced for performance, memoized
  const motivationalQuotes = useMemo(
    () => [
      "Every great editor was once a beginner who never gave up!",
      "Your creativity is your superpower - keep editing!",
      "The best videos are edited with passion, not just software.",
      "Every cut you make brings you closer to masterpiece.",
      "In video editing, patience creates perfection.",
      "Your unique perspective can change how people see the world.",
      "Great editors don't just cut footage, they tell stories.",
      "The timeline is your canvas - paint boldly!",
      "Every professional was once an amateur who kept practicing.",
      "Your next edit could be someone's favorite video.",
      "Creativity is intelligence having fun!",
      "The only bad edit is the one you don't learn from.",
      "You're not just editing videos, you're crafting emotions.",
      "Persistence turns obstacles into opportunities.",
      "Your skills grow with every project you complete.",
      "The world needs your unique visual storytelling.",
      "Your passion for editing shines through your work.",
      "Small edits today lead to big achievements tomorrow.",
      "You have the power to make moments unforgettable.",
      "Editing is where good footage becomes great stories.",
    ],
    []
  ); // Reduced from 100 to 20 for better performance

  // Footer data - memoized
  const footerData = useMemo(
    () => ({
      logo: { src: logo, alt: "Zone Logo" },
      links: [
        { name: "Services", href: "/services" },
        { name: "Work", href: "/projects" },
        { name: "About", href: "/whyChooseUs" },
        { name: "Contact", href: "/contact" },
      ],
      social: [
        {
          name: "Instagram",
          href: "#",
          icon: FaInstagram,
          color: "hover:text-pink-500",
        },
        {
          name: "YouTube",
          href: "#",
          icon: FaYoutube,
          color: "hover:text-red-500",
        },
        {
          name: "Twitter",
          href: "#",
          icon: FaTwitter,
          color: "hover:text-blue-400",
        },
        {
          name: "LinkedIn",
          href: "#",
          icon: FaLinkedin,
          color: "hover:text-blue-600",
        },
      ],
    }),
    []
  );

  // Optimized scroll handler
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Countdown effect for redirect
  useEffect(() => {
    let countdownInterval;
    if (showMotivationalModal && motivationalQuote.includes("🔐")) {
      countdownInterval = setInterval(() => {
        setRedirectCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            const secretAnswer =
              secretRiddle.answer?.toLowerCase().replace(/\s+/g, "") || "";
            navigate(`/login/${secretAnswer}`);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(countdownInterval);
  }, [showMotivationalModal, motivationalQuote, navigate, secretRiddle.answer]);

  // Check answer for riddles
  const checkAnswer = useCallback(() => {
    const currentRiddle = riddles[currentRiddleIndex];
    if (
      userAnswer.toLowerCase().trim() === currentRiddle.answer?.toLowerCase()
    ) {
      if (currentRiddle.isSecret) {
        setMotivationalQuote(
          `🔐 **Secret Access Granted!** 🔐\n\nYou've proven your expertise! Redirecting to secure login in ${redirectCountdown} seconds...`
        );
        setShowMotivationalModal(true);
        setUserAnswer("");
        setRedirectCountdown(3);
      } else {
        const randomQuote =
          motivationalQuotes[
            Math.floor(Math.random() * motivationalQuotes.length)
          ];
        setMotivationalQuote(randomQuote);
        setShowMotivationalModal(true);
        setUserAnswer("");
      }

      setCurrentRiddleIndex((prev) =>
        prev < riddles.length - 1 ? prev + 1 : 0
      );
    } else {
      alert("Not quite right! Try again. Hint: " + currentRiddle.hint);
    }
  }, [
    currentRiddleIndex,
    userAnswer,
    riddles,
    motivationalQuotes,
    redirectCountdown,
  ]);

  // Handle immediate redirect
  const handleImmediateRedirect = useCallback(() => {
    const secretAnswer =
      secretRiddle.answer?.toLowerCase().replace(/\s+/g, "") || "";
    window.location.href = `/login/${secretAnswer}`;
  }, [secretRiddle.answer]);

  // Simplified animations for mobile
  const rippleAnimation = useMemo(
    () => ({
      initial: { opacity: 0, scale: 0.3 },
      animate: {
        opacity: 1,
        scale: 1,
        transition: {
          type: "spring",
          damping: 25,
          stiffness: 180,
          duration: isMobile ? 0.4 : 0.7,
        },
      },
      exit: {
        opacity: 0,
        scale: 0.3,
        transition: { duration: isMobile ? 0.3 : 0.5 },
      },
      hover: !isMobile
        ? { scale: 1.1, transition: { type: "spring", damping: 15 } }
        : {},
      tap: { scale: 0.95 },
    }),
    [isMobile]
  );

  // Particle effect for button - disabled on mobile
  const particleVariants = useMemo(
    () => ({
      animate: (i) =>
        !isMobile
          ? {
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
              x: [0, i % 2 === 0 ? 20 : -20],
              y: [0, -30],
              transition: { duration: 1.2, repeat: Infinity, delay: i * 0.2 },
            }
          : {},
    }),
    [isMobile]
  );

  return (
    <footer className="relative font-poppins bg-white border-t border-gray-200/50">
      {/* Back to Top Button - Simplified on mobile */}
      <AnimatePresence mode="wait">
        {showBackToTop && (
          <motion.button
            key="back-to-top"
            variants={rippleAnimation}
            initial="initial"
            animate="animate"
            exit="exit"
            whileHover={!isMobile ? "hover" : undefined}
            whileTap="tap"
            onClick={scrollToTop}
            className={`fixed ${
              isMobile ? "bottom-4 right-4 p-3" : "bottom-8 right-8 p-5"
            } z-[9999] bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-full shadow-xl hover:shadow-2xl transition-shadow duration-300 group`}
            aria-label="Back to top"
          >
            {/* Floating particles - disabled on mobile */}
            {!isMobile &&
              [...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={particleVariants}
                  initial="initial"
                  animate="animate"
                  className="absolute w-1 h-1 bg-white rounded-full"
                  style={{ left: "50%", top: "50%" }}
                />
              ))}

            {/* Arrow icon with animation */}
            <motion.div
              animate={{ y: isMobile ? 0 : [0, -4, 0] }}
              transition={
                !isMobile
                  ? { duration: 2, repeat: Infinity, ease: "easeInOut" }
                  : {}
              }
              className="relative z-10"
            >
              <FaArrowUp className={isMobile ? "text-base" : "text-xl"} />
            </motion.div>

            {/* Tooltip - hidden on mobile */}
            {!isMobile && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                whileHover={{ opacity: 1, x: -5 }}
                className="absolute right-full mr-3 px-3 py-1.5 bg-gray-800 text-white text-sm rounded-lg whitespace-nowrap pointer-events-none shadow-lg"
              >
                Back to Top ↑
                <span className="absolute top-1/2 -right-1 transform -translate-y-1/2 border-4 border-transparent border-l-gray-800" />
              </motion.span>
            )}

            {/* Ripple rings - simplified on mobile */}
            {!isMobile && (
              <>
                <motion.span
                  className="absolute inset-0 rounded-full bg-white/30"
                  animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0, 0.3] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                />
                <motion.span
                  className="absolute inset-0 rounded-full bg-white/20"
                  animate={{ scale: [1, 2.2, 1], opacity: [0.2, 0, 0.2] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeOut",
                    delay: 0.3,
                  }}
                />
              </>
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Riddle Section - Simplified animations on mobile */}
      <AnimatePresence>
        {showRiddles && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: isMobile ? 0.3 : 0.5 }}
            className="bg-gradient-to-r from-teal-50 to-emerald-50 border-b border-gray-200/50 relative z-30"
          >
            <div className="container mx-auto px-4 py-6 md:py-8">
              <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-4 md:mb-6">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <FaLightbulb className="text-yellow-500 text-sm md:text-base" />
                    <h3 className="text-lg md:text-xl font-bold text-gray-800">
                      Video Editing Riddles
                    </h3>
                    <FaLightbulb className="text-yellow-500 text-sm md:text-base" />
                  </div>
                  <p className="text-sm md:text-base text-gray-600">
                    Test your video editing knowledge!
                  </p>
                </div>

                {/* Riddle Card */}
                <motion.div
                  key={currentRiddleIndex}
                  initial={{ opacity: 0, x: isMobile ? 10 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: isMobile ? 0.2 : 0.3 }}
                  className="bg-white rounded-xl shadow-lg p-4 md:p-6 mb-4 border border-gray-200/50 relative z-30"
                >
                  <div className="flex items-center justify-between mb-3 md:mb-4">
                    <span className="text-xs md:text-sm text-teal-600 font-medium">
                      Riddle {currentRiddleIndex + 1} of {riddles.length}
                    </span>
                  </div>

                  <p className="text-base md:text-lg text-gray-800 mb-3 md:mb-4 font-medium">
                    {riddles[currentRiddleIndex].question}
                  </p>

                  {!riddles[currentRiddleIndex].isSecret && (
                    <div className="flex items-center space-x-2 text-xs md:text-sm text-gray-500">
                      <span>💡</span>
                      <span>Hint: {riddles[currentRiddleIndex].hint}</span>
                    </div>
                  )}

                  {/* Answer Input */}
                  <div className="mt-4 md:mt-6 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                    <input
                      type="text"
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      placeholder="Type your answer here..."
                      className="flex-1 px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      onKeyPress={(e) => e.key === "Enter" && checkAnswer()}
                    />
                    <button
                      onClick={checkAnswer}
                      className="px-4 md:px-6 py-2 text-sm md:text-base bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-lg hover:from-teal-600 hover:to-emerald-600 transition-all duration-300 font-medium"
                    >
                      Check
                    </button>
                  </div>
                </motion.div>

                {/* Navigation */}
                <div className="flex justify-between items-center">
                  <button
                    onClick={() =>
                      setCurrentRiddleIndex(Math.max(0, currentRiddleIndex - 1))
                    }
                    disabled={currentRiddleIndex === 0}
                    className="px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:text-teal-600 transition-colors"
                  >
                    Previous
                  </button>

                  <button
                    onClick={() => setShowRiddles(false)}
                    className="px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    Close
                  </button>

                  <button
                    onClick={() =>
                      setCurrentRiddleIndex(
                        Math.min(riddles.length - 1, currentRiddleIndex + 1)
                      )
                    }
                    disabled={currentRiddleIndex === riddles.length - 1}
                    className="px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:text-teal-600 transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Motivational Modal */}
      <AnimatePresence>
        {showMotivationalModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: isMobile ? 0.2 : 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4"
            onClick={() =>
              !motivationalQuote.includes("🔐") &&
              setShowMotivationalModal(false)
            }
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: isMobile ? 0.2 : 0.3 }}
              className={`rounded-xl shadow-2xl max-w-md w-full p-4 md:p-6 text-center relative z-[10000] ${
                motivationalQuote.includes("🔐")
                  ? "bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200"
                  : "bg-white"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {motivationalQuote.includes("🔐") ? (
                <>
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                    <FaShieldAlt className="text-white text-xl md:text-2xl" />
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold text-amber-800 mb-3 md:mb-4">
                    Access Granted! 🎊
                  </h3>

                  <div className="text-sm md:text-base text-amber-700 mb-4 md:mb-6 leading-relaxed whitespace-pre-line">
                    {motivationalQuote.split("\n").map((line, index) => (
                      <p key={index} className="mb-2">
                        {line}
                      </p>
                    ))}
                  </div>

                  <div className="mb-4 md:mb-6">
                    <div className="flex items-center justify-center space-x-2 text-amber-600 text-sm md:text-base">
                      <div className="w-2 h-2 md:w-3 md:h-3 bg-amber-500 rounded-full animate-pulse"></div>
                      <span className="font-medium">
                        Redirecting in {redirectCountdown}s...
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleImmediateRedirect}
                    className="w-full py-2 md:py-3 text-sm md:text-base bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-300 font-medium mb-2 md:mb-3"
                  >
                    Go to Admin Login Now
                  </button>

                  <button
                    onClick={() => setShowMotivationalModal(false)}
                    className="w-full py-1.5 md:py-2 text-sm md:text-base text-amber-600 hover:text-amber-700 transition-colors font-medium"
                  >
                    Stay Here
                  </button>
                </>
              ) : (
                <>
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                    <FaTrophy className="text-white text-xl md:text-2xl" />
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 md:mb-4">
                    Correct! 🌟
                  </h3>

                  <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6 leading-relaxed">
                    {motivationalQuote}
                  </p>

                  <button
                    onClick={() => setShowMotivationalModal(false)}
                    className="w-full py-2 md:py-3 text-sm md:text-base bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-lg hover:from-teal-600 hover:to-emerald-600 transition-all duration-300 font-medium"
                  >
                    Keep Creating! 🚀
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Riddle Toggle Button */}
      <div className="container mx-auto px-4">
        <div className="flex justify-center -mt-6 relative z-30">
          <motion.button
            whileHover={!isMobile ? { scale: 1.05 } : undefined}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowRiddles(!showRiddles)}
            className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-4 md:px-6 py-2 md:py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 text-sm md:text-base font-medium relative z-30"
          >
            <FaLightbulb className="text-xs md:text-sm" />
            <span>
              {showRiddles ? "Hide Riddles" : "Try Video Editing Riddles"}
            </span>
          </motion.button>
        </div>
      </div>

      {/* Background effects - simplified on mobile */}
      <div className="absolute inset-0 z-0">
        {!isMobile && (
          <>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-100/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-emerald-100/30 rounded-full blur-3xl"></div>
          </>
        )}

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(20, 184, 166, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(20, 184, 166, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: isMobile ? "20px 20px" : "40px 40px",
          }}
        ></div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-8 md:py-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo */}
          <motion.div
            className="flex items-center mb-4 md:mb-0"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            <img
              src={footerData.logo.src}
              alt={footerData.logo.alt}
              className="h-6 md:h-8 object-contain"
              loading="lazy"
            />
          </motion.div>

          {/* Links */}
          <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-8">
            <motion.div
              className="flex space-x-4 md:space-x-6"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              viewport={{ once: true }}
            >
              {footerData.links.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  className="relative text-xs md:text-sm text-gray-600 hover:text-gray-900 transition-colors duration-300 group/link"
                  onHoverStart={() =>
                    !isMobile && setHoveredItem(`link-${index}`)
                  }
                  onHoverEnd={() => !isMobile && setHoveredItem(null)}
                  whileHover={!isMobile ? { y: -2 } : undefined}
                >
                  {link.name}
                  {!isMobile && (
                    <>
                      <motion.div
                        className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full"
                        initial={{ scaleX: 0 }}
                        animate={{
                          scaleX: hoveredItem === `link-${index}` ? 1 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      />
                      <FaArrowRight
                        className="inline-block ml-1 text-teal-500 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300"
                        size={8}
                      />
                    </>
                  )}
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Bottom copyright */}
        <motion.div
          className="mt-8 md:mt-12 pt-4 md:pt-6 border-t border-gray-200/50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Creator Credit */}
          <div className="text-center mb-3 md:mb-4">
            <p className="text-xs md:text-sm text-gray-500">
              Designed and Developed by
              <FaCode className="inline-block mx-1 text-teal-500 text-xs md:text-sm" />
              <a
                href="https://mahim-protfolio.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-600 hover:text-teal-700 font-medium transition-colors duration-300 hover:underline"
              >
                Mahim Shahriar
              </a>
            </p>
          </div>

          <div className="text-center">
            <p className="text-xs md:text-sm text-gray-500">
              © {new Date().getFullYear()} Zone Studio. All rights reserved.
            </p>

            <div className="flex flex-wrap justify-center items-center mt-2 space-x-2 md:space-x-4 text-[10px] md:text-xs text-gray-500">
              <span>Powered by Renderloop</span>
              <span className="w-0.5 h-0.5 md:w-1 md:h-1 bg-gray-400 rounded-full"></span>
              <span>4K & 8K Support</span>
              <span className="w-0.5 h-0.5 md:w-1 md:h-1 bg-gray-400 rounded-full"></span>
              <span>Global Delivery</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating particles - reduced count on mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(isMobile ? 4 : 8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${1 + Math.random() * 2}px`,
              height: `${1 + Math.random() * 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, ${
                Math.random() > 0.5
                  ? "rgba(20, 184, 166, 0.2)"
                  : "rgba(16, 185, 129, 0.2)"
              }, transparent)`,
              animation: !isMobile
                ? `float ${10 + Math.random() * 10}s ease-in-out infinite`
                : "none",
              opacity: isMobile ? 0.1 : 0.3,
            }}
          ></div>
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) translateX(0);
            opacity: 0.3;
          }
          25% {
            transform: translateY(-10px) translateX(5px);
            opacity: 0.5;
          }
          50% {
            transform: translateY(-5px) translateX(10px);
            opacity: 0.7;
          }
          75% {
            transform: translateY(-15px) translateX(5px);
            opacity: 0.5;
          }
        }
      `}</style>
    </footer>
  );
};

export default NextGenFooter;
