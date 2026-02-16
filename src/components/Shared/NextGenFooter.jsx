import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaLinkedin,
  FaArrowRight,
  FaLock,
  FaStar,
  FaTrophy,
  FaLightbulb,
  FaShieldAlt,
  FaHeart,
  FaCode,
  FaArrowUp,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/Zone-logo.svg";

const NextGenFooter = () => {
  const navigate = useNavigate();
  const [hoveredItem, setHoveredItem] = useState(null);
  const [showRiddles, setShowRiddles] = useState(false);
  const [currentRiddleIndex, setCurrentRiddleIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [showMotivationalModal, setShowMotivationalModal] = useState(false);
  const [motivationalQuote, setMotivationalQuote] = useState("");
  const [redirectCountdown, setRedirectCountdown] = useState(3);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Secret admin riddle (answer from environment variable)
  const secretRiddle = {
    question:
      "I'm the invisible artist that makes every frame perfect. I use algorithms to enhance, but I'm not a programmer. What am I?",
    answer: import.meta.env.VITE_SECRET_RIDDLE_ANSWER,
    hint: "Modern editing technology",
    isSecret: true,
  };

  // Riddle data with secret riddle as 5th position
  const riddles = [
    {
      question:
        "I have a timeline but no clock, I cut but don't bleed. What am I?",
      answer: "video editing",
      hint: "Think about digital creativity",
    },
    {
      question:
        "I make things smooth between scenes, but I'm not a dancer. What am I?",
      answer: "transition",
      hint: "Connects different shots",
    },
    {
      question:
        "I can make you laugh or cry without saying a word, through moving pictures. What am I?",
      answer: "montage",
      hint: "Sequence of shots telling a story",
    },
    {
      question:
        "I control the mood with colors but I'm not a painter. What am I?",
      answer: "color grading",
      hint: "Post-production process",
    },
    // Secret riddle as 5th position
    secretRiddle,
    {
      question:
        "I remove what you don't want but I'm not an eraser. What am I?",
      answer: "masking",
      hint: "Hides or reveals parts of footage",
    },
    {
      question: "I sync movements but I'm not a conductor. What am I?",
      answer: "motion tracking",
      hint: "Follows objects in footage",
    },
    {
      question:
        "I make things bigger than life but I'm not a telescope. What am I?",
      answer: "zoom",
      hint: "Camera effect",
    },
    {
      question: "I tell your story in seconds but I'm not a book. What am I?",
      answer: "trailer",
      hint: "Movie preview",
    },
    {
      question: "I make voices clear but I'm not a microphone. What am I?",
      answer: "audio mixing",
      hint: "Sound editing process",
    },
    {
      question: "I create the illusion of time but I'm not a clock. What am I?",
      answer: "time remapping",
      hint: "Speed control effect",
    },
  ];

  // Motivational quotes pool
  const motivationalQuotes = [
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
    "Every expert was once a beginner with a dream.",
    "Your passion for editing shines through your work.",
    "Small edits today lead to big achievements tomorrow.",
    "You have the power to make moments unforgettable.",
    "Editing is where good footage becomes great stories.",
    "Your attention to detail sets your work apart.",
    "Every timeline tells a story of dedication.",
    "The magic happens outside your comfort zone.",
    "You're writing history with every clip you arrange.",
    "Great editors see possibilities where others see problems.",
    "Your creativity is limitless - keep exploring!",
    "Every project makes you a better storyteller.",
    "The best edits come from a place of curiosity.",
    "You're not just cutting, you're composing visual music.",
    "Your progress may be gradual, but it's always forward.",
    "Editing is the art of making the complex look simple.",
    "Your unique style is your signature in the digital world.",
    "Every challenge in editing is an opportunity to grow.",
    "You have the vision to create what others can only imagine.",
    "The most powerful stories are often the best edited.",
    "Your dedication to craft inspires others.",
    "Editing transforms raw footage into emotional journeys.",
    "You're not just an editor, you're a time architect.",
    "Every cut is a decision that shapes the narrative.",
    "Your work has the power to move people profoundly.",
    "The editor's chair is where magic gets organized.",
    "You're developing an eye for what moves audiences.",
    "Every timeline conquered builds your confidence.",
    "Your edits create connections between people and stories.",
    "Editing is problem-solving with creative flair.",
    "You're learning the language of visual emotion.",
    "Every project completed is a milestone achieved.",
    "Your patience with details creates seamless experiences.",
    "You're not just editing - you're enhancing reality.",
    "The best editors are eternal students of their craft.",
    "Your work makes complex stories understandable.",
    "Every transition smooths the path for your audience.",
    "You're building a portfolio of visual accomplishments.",
    "Editing is where technical skill meets artistic vision.",
    "Your growing expertise is evident in every frame.",
    "Every color correction sets the perfect mood.",
    "You're mastering the tools of digital storytelling.",
    "Your edits give voice to silent moments.",
    "The rhythm of your cuts creates visual poetry.",
    "You're developing instincts that can't be taught.",
    "Every audio mix enhances the visual experience.",
    "Your work turns information into inspiration.",
    "Editing is the invisible art that makes stories shine.",
    "You're creating order from creative chaos.",
    "Every effect you add serves the story.",
    "Your attention to pacing keeps audiences engaged.",
    "You're not just making videos, you're creating memories.",
    "The precision of your edits shows your dedication.",
    "Your work makes complicated concepts accessible.",
    "Every project teaches you something valuable.",
    "You're building a reputation for quality work.",
    "Editing is your superpower for communication.",
    "Your cuts reveal what's essential in the story.",
    "Every timeline is a new opportunity to excel.",
    "You're developing a signature style that's uniquely yours.",
    "Your work transforms ideas into visual reality.",
    "Editing is where patience meets creativity.",
    "You're learning to see stories in raw footage.",
    "Every transition is a bridge you build for viewers.",
    "Your color grading sets the emotional temperature.",
    "You're not just an editor - you're a visual composer.",
    "The care you take shows in every detail.",
    "Your edits make stories flow like rivers.",
    "Every project expands your creative boundaries.",
    "You're mastering the art of visual rhythm.",
    "Your work turns moments into meaningful narratives.",
    "Editing is your platform for creative expression.",
    "You're developing an instinct for emotional pacing.",
    "Every cut is a stroke of your creative brush.",
    "Your attention to sound creates immersive experiences.",
    "You're building skills that will last a lifetime.",
    "Every timeline finished is a story well told.",
    "Your edits have the power to change perspectives.",
    "Editing is where your technical and creative sides meet.",
    "You're learning to speak the language of cinema.",
    "Every effect serves to enhance, not distract.",
    "Your growing portfolio tells a story of progress.",
    "You're not just editing footage - you're crafting impact.",
    "The precision of your work inspires confidence.",
    "Your edits create seamless visual journeys.",
    "Every project makes you more valuable as a creator.",
    "You're developing the eye of a true visual artist.",
  ];

  // Footer data
  const footerData = {
    logo: {
      src: logo,
      alt: "Zone Logo",
    },
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
  };

  // Add scroll listener to show/hide back to top button
  useEffect(() => {
    const handleScroll = () => {
      // Show button when page is scrolled down 300px from top
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top function with smooth behavior
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Countdown effect for redirect
  useEffect(() => {
    let countdownInterval;
    if (showMotivationalModal && motivationalQuote.includes("🔐")) {
      countdownInterval = setInterval(() => {
        setRedirectCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            // Redirect to login/secretAnswer
            const secretAnswer = secretRiddle.answer
              .toLowerCase()
              .replace(/\s+/g, "");
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
  const checkAnswer = () => {
    const currentRiddle = riddles[currentRiddleIndex];
    if (
      userAnswer.toLowerCase().trim() === currentRiddle.answer.toLowerCase()
    ) {
      if (currentRiddle.isSecret) {
        // Special achievement with redirect countdown for secret riddle
        setMotivationalQuote(
          `🔐 **Secret Access Granted!** 🔐\n\nYou've proven your expertise in video editing! Your knowledge has unlocked exclusive admin access. Redirecting to secure login in ${redirectCountdown} seconds...\n\nPrepare for advanced editing tools and features!`
        );
        setShowMotivationalModal(true);
        setUserAnswer("");
        setRedirectCountdown(3);
      } else {
        // Correct answer for regular riddle - show random motivational quote
        const randomQuote =
          motivationalQuotes[
            Math.floor(Math.random() * motivationalQuotes.length)
          ];
        setMotivationalQuote(randomQuote);
        setShowMotivationalModal(true);
        setUserAnswer("");
      }

      // Move to next riddle or loop back
      if (currentRiddleIndex < riddles.length - 1) {
        setCurrentRiddleIndex(currentRiddleIndex + 1);
      } else {
        setCurrentRiddleIndex(0);
      }
    } else {
      alert("Not quite right! Try again. Hint: " + currentRiddle.hint);
    }
  };

  // Handle immediate redirect
  const handleImmediateRedirect = () => {
    const secretAnswer = secretRiddle.answer.toLowerCase().replace(/\s+/g, "");
    window.location.href = `/login/${secretAnswer}`;
  };

  // Animation 1: Floating Bubble Effect
  const bubbleAnimation = {
    initial: {
      opacity: 0,
      scale: 0.2,
      y: 100,
      filter: "blur(10px)",
    },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 200,
        mass: 0.8,
        duration: 0.8,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.2,
      y: 100,
      filter: "blur(10px)",
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  // Animation 2: Rotating Bloom Effect
  const bloomAnimation = {
    initial: {
      opacity: 0,
      scale: 0,
      rotate: -180,
      borderRadius: "50%",
    },
    animate: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      borderRadius: "9999px",
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 150,
        mass: 1,
        duration: 1,
      },
    },
    exit: {
      opacity: 0,
      scale: 0,
      rotate: 180,
      borderRadius: "50%",
      transition: {
        duration: 0.6,
        ease: "anticipate",
      },
    },
  };

  // Animation 3: Ripple Wave Effect (using this one)
  const rippleAnimation = {
    initial: {
      opacity: 0,
      scale: 0.3,
      x: 50,
      y: 50,
      rotate: 45,
    },
    animate: {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      rotate: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 180,
        mass: 0.9,
        duration: 0.7,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.3,
      x: -50,
      y: 50,
      rotate: -45,
      transition: {
        duration: 0.5,
        ease: "easeIn",
      },
    },
    hover: {
      scale: 1.1,
      rotate: 5,
      boxShadow:
        "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 300,
      },
    },
    tap: {
      scale: 0.95,
      rotate: -2,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 400,
      },
    },
  };

  // Animation 4: Magnetic Pull Effect
  const magneticAnimation = {
    initial: {
      opacity: 0,
      scale: 0.5,
      x: 100,
      rotate: 360,
    },
    animate: {
      opacity: 1,
      scale: 1,
      x: 0,
      rotate: 0,
      transition: {
        type: "spring",
        damping: 30,
        stiffness: 120,
        mass: 1.2,
        duration: 0.9,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.5,
      x: -100,
      rotate: -360,
      transition: {
        duration: 0.5,
        ease: "backIn",
      },
    },
  };

  // Animation 5: Elastic Stretch Effect
  const elasticAnimation = {
    initial: {
      opacity: 0,
      scaleX: 0,
      scaleY: 0.2,
      y: 50,
    },
    animate: {
      opacity: 1,
      scaleX: 1,
      scaleY: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 150,
        mass: 0.7,
        duration: 0.8,
      },
    },
    exit: {
      opacity: 0,
      scaleX: 0,
      scaleY: 0.2,
      y: 50,
      transition: {
        duration: 0.4,
        ease: "easeIn",
      },
    },
  };

  // Choose your favorite animation (currently using rippleAnimation)
  const selectedAnimation = rippleAnimation;

  // Particle effect for button
  const particleVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: (i) => ({
      scale: [0, 1, 0],
      opacity: [0, 1, 0],
      x: [0, i % 2 === 0 ? 20 : -20],
      y: [0, -30],
      transition: {
        duration: 1.2,
        repeat: Infinity,
        delay: i * 0.2,
        ease: "easeOut",
      },
    }),
  };

  return (
    <footer className="relative font-poppins bg-white border-t border-gray-200/50">
      {/* Back to Top Button - Smooth Ripple Animation */}
      <AnimatePresence mode="wait">
        {showBackToTop && (
          <motion.button
            key="back-to-top"
            variants={selectedAnimation}
            initial="initial"
            animate="animate"
            exit="exit"
            whileHover="hover"
            whileTap="tap"
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-[9999] bg-gradient-to-r from-teal-500 to-emerald-500 text-white p-5 rounded-full shadow-xl hover:shadow-2xl transition-shadow duration-300 group"
            aria-label="Back to top"
          >
            {/* Floating particles around button */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={particleVariants}
                initial="initial"
                animate="animate"
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  left: "50%",
                  top: "50%",
                }}
              />
            ))}

            {/* Gradient glow effect */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-400 to-emerald-400 opacity-0 group-hover:opacity-100"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Arrow icon with smooth floating animation */}
            <motion.div
              animate={{
                y: [0, -4, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative z-10"
            >
              <FaArrowUp className="text-xl" />
            </motion.div>

            {/* Tooltip with smooth slide */}
            <motion.span
              initial={{ opacity: 0, x: -10, scale: 0.9 }}
              whileHover={{ opacity: 1, x: -5, scale: 1 }}
              transition={{
                type: "spring",
                damping: 15,
                stiffness: 300,
              }}
              className="absolute right-full mr-3 px-3 py-1.5 bg-gray-800 text-white text-sm rounded-lg whitespace-nowrap pointer-events-none shadow-lg"
            >
              <span className="relative">
                Back to Top
                <motion.span
                  animate={{ x: [0, 3, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="inline-block ml-1"
                >
                  ↑
                </motion.span>
              </span>
              <span className="absolute top-1/2 -right-1 transform -translate-y-1/2 border-4 border-transparent border-l-gray-800" />
            </motion.span>

            {/* Ripple rings */}
            <motion.span
              className="absolute inset-0 rounded-full bg-white/30"
              animate={{
                scale: [1, 1.8, 1],
                opacity: [0.3, 0, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
            <motion.span
              className="absolute inset-0 rounded-full bg-white/20"
              animate={{
                scale: [1, 2.2, 1],
                opacity: [0.2, 0, 0.2],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeOut",
                delay: 0.3,
              }}
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Riddle Section */}
      <AnimatePresence>
        {showRiddles && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-gradient-to-r from-teal-50 to-emerald-50 border-b border-gray-200/50 relative z-30"
          >
            <div className="container mx-auto px-4 py-8">
              <div className="max-w-2xl mx-auto">
                {/* Header */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center mb-6"
                >
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <FaLightbulb className="text-yellow-500" />
                    <h3 className="text-xl font-bold text-gray-800">
                      Video Editing Riddles
                    </h3>
                    <FaLightbulb className="text-yellow-500" />
                  </div>
                  <p className="text-gray-600">
                    Test your video editing knowledge!
                  </p>
                </motion.div>

                {/* Riddle Card */}
                <motion.div
                  key={currentRiddleIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white rounded-xl shadow-lg p-6 mb-4 border border-gray-200/50 relative z-30"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-teal-600 font-medium">
                      Riddle {currentRiddleIndex + 1} of {riddles.length}
                    </span>
                  </div>

                  {riddles[currentRiddleIndex].isSecret ? (
                    <div>
                      <p className="text-lg text-gray-800 mb-4 font-medium">
                        {riddles[currentRiddleIndex].question}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-lg text-gray-800 mb-4 font-medium">
                        {riddles[currentRiddleIndex].question}
                      </p>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <span>💡</span>
                        <span>Hint: {riddles[currentRiddleIndex].hint}</span>
                      </div>
                    </div>
                  )}

                  {/* Answer Input */}
                  <div className="mt-6 flex space-x-3">
                    <input
                      type="text"
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      placeholder={
                        riddles[currentRiddleIndex].isSecret
                          ? "Type your answer here..."
                          : "Type your answer here..."
                      }
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      onKeyPress={(e) => e.key === "Enter" && checkAnswer()}
                    />
                    <button
                      onClick={checkAnswer}
                      className={`px-6 py-2 text-white rounded-lg transition-all duration-300 font-medium ${
                        riddles[currentRiddleIndex].isSecret
                          ? "bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600"
                          : "bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600"
                      }`}
                    >
                      {riddles[currentRiddleIndex].isSecret ? "check" : "Check"}
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
                    className="px-4 py-2 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:text-teal-600 transition-colors"
                  >
                    Previous
                  </button>

                  <button
                    onClick={() => setShowRiddles(false)}
                    className="px-4 py-2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    Close Riddles
                  </button>

                  <button
                    onClick={() =>
                      setCurrentRiddleIndex(
                        Math.min(riddles.length - 1, currentRiddleIndex + 1)
                      )
                    }
                    disabled={currentRiddleIndex === riddles.length - 1}
                    className="px-4 py-2 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:text-teal-600 transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Motivational Modal - HIGHEST Z-INDEX */}
      <AnimatePresence>
        {showMotivationalModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
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
              className={`rounded-xl shadow-2xl max-w-md w-full p-6 text-center relative z-[10000] ${
                motivationalQuote.includes("🔐")
                  ? "bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200"
                  : "bg-white"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {motivationalQuote.includes("🔐") ? (
                // Secret Access Granted Modal
                <>
                  <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaShieldAlt className="text-white text-2xl" />
                  </div>

                  <h3 className="text-2xl font-bold text-amber-800 mb-4">
                    Access Granted! 🎊
                  </h3>

                  <div className="text-amber-700 mb-6 leading-relaxed whitespace-pre-line">
                    {motivationalQuote.split("\n").map((line, index) => (
                      <p key={index} className="mb-2">
                        {line}
                      </p>
                    ))}
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center justify-center space-x-2 text-amber-600">
                      <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse"></div>
                      <span className="font-medium">
                        Redirecting to login/
                        {secretRiddle.answer
                          .toLowerCase()
                          .replace(/\s+/g, "")}{" "}
                        in {redirectCountdown} seconds...
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleImmediateRedirect}
                    className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-300 font-medium mb-3"
                  >
                    Go to Admin Login Now
                  </button>

                  <button
                    onClick={() => setShowMotivationalModal(false)}
                    className="w-full py-2 text-amber-600 hover:text-amber-700 transition-colors font-medium"
                  >
                    Stay Here
                  </button>
                </>
              ) : (
                // Regular Motivational Modal
                <>
                  <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaTrophy className="text-white text-2xl" />
                  </div>

                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    Correct! 🌟
                  </h3>

                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {motivationalQuote}
                  </p>

                  <button
                    onClick={() => setShowMotivationalModal(false)}
                    className="w-full py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-lg hover:from-teal-600 hover:to-emerald-600 transition-all duration-300 font-medium"
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
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowRiddles(!showRiddles)}
            className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 font-medium relative z-30"
          >
            <FaLightbulb />
            <span>
              {showRiddles ? "Hide Riddles" : "Try Video Editing Riddles"}
            </span>
          </motion.button>
        </div>
      </div>

      {/* Original Footer Content */}
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-100/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-emerald-100/30 rounded-full blur-3xl"></div>

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(20, 184, 166, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(20, 184, 166, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Left: Logo */}
          <motion.div
            className="flex items-center mb-6 md:mb-0"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <img
                src={footerData.logo.src}
                alt={footerData.logo.alt}
                className="h-8 object-contain"
              />
            </div>
          </motion.div>

          {/* Right: Links and social icons */}
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
            {/* Quick links */}
            <motion.div
              className="flex space-x-6"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              {footerData.links.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  className="relative text-gray-600 hover:text-gray-900 transition-colors duration-300 text-sm group/link"
                  onHoverStart={() => setHoveredItem(`link-${index}`)}
                  onHoverEnd={() => setHoveredItem(null)}
                  whileHover={{ y: -2 }}
                >
                  {link.name}
                  <motion.div
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{
                      scaleX: hoveredItem === `link-${index}` ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  <FaArrowRight
                    className="inline-block ml-1 text-teal-500 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300 transform group-hover/link:translate-x-1"
                    size={10}
                  />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Bottom copyright */}
        <motion.div
          className="mt-12 pt-6 border-t border-gray-200/50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {/* Creator Credit */}
          <div className="text-center mb-4">
            <p className="text-gray-500 text-sm">
              Designed and Developed by
              <span>
                <FaCode className="inline-block mx-1 text-teal-500" />
              </span>
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
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Zone Studio. All rights reserved.
            </p>

            <div className="flex justify-center items-center mt-2 space-x-4 text-xs text-gray-500">
              <span>Powered by Renderloop</span>
              <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
              <span>4K & 8K Support</span>
              <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
              <span>Global Delivery</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${1 + Math.random() * 3}px`,
              height: `${1 + Math.random() * 3}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, ${
                Math.random() > 0.5
                  ? "rgba(20, 184, 166, 0.3)"
                  : "rgba(16, 185, 129, 0.3)"
              }, transparent)`,
              animation: `float ${
                10 + Math.random() * 10
              }s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
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
