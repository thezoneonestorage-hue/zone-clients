import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import BookingModal from "../BookingModal";
import { verifyTokenOnInit, logout } from "../../services/api";
import logo from "../../assets/Zone-logo.png";
import useMediaQuery from "../../hooks/useMediaQuery";

const NextGenNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navbarRef = useRef(null);
  const profileRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");

  // Check authentication status on component mount
  useEffect(() => {
    checkAuthentication();
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const checkAuthentication = async () => {
    try {
      setLoading(true);
      const result = await verifyTokenOnInit();
      setIsAuthenticated(result.isValid);
      setUser(result.user);
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Optimized scroll handler
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
    setIsProfileOpen(false);
  }, [location]);

  const handleLogout = useCallback(async () => {
    try {
      await logout();
      setIsAuthenticated(false);
      setUser(null);
      setIsProfileOpen(false);
      window.location.href = "/";
    } catch (error) {
      console.error("Logout error:", error);
      setIsAuthenticated(false);
      setUser(null);
      setIsProfileOpen(false);
      window.location.href = "/";
    }
  }, []);

  const handleDashboard = useCallback(() => {
    setIsProfileOpen(false);
    window.location.href = "/dashboard";
  }, []);

  const handleNavigation = useCallback((path) => {
    setIsOpen(false);
    setIsProfileOpen(false);
    window.location.href = path;
  }, []);

  const handleBookCall = useCallback(() => {
    setIsModalOpen(true);
    setIsOpen(false);
  }, []);

  // Memoized menu items
  const menuItems = useMemo(
    () => [
      { name: "Home", path: "/" },
      { name: "Portfolio", path: "/projects" },
      { name: "Services", path: "/services" },
      { name: "About", path: "/whyChooseUs" },
      { name: "Contact", path: "/contact" },
      { name: "Faqs", path: "/faqs" },
    ],
    []
  );

  // Get user initials for avatar
  const getUserInitials = useCallback(() => {
    if (!user) return "U";
    if (user.name) {
      return user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    if (user.email) {
      return user.email[0].toUpperCase();
    }
    return "U";
  }, [user]);

  // Simplified animations for mobile
  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: isMobile ? 0.05 : 0.1,
          delayChildren: isMobile ? 0.1 : 0.3,
        },
      },
    }),
    [isMobile]
  );

  const itemVariants = useMemo(
    () => ({
      hidden: { y: -20, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: { duration: isMobile ? 0.3 : 0.5, ease: "easeOut" },
      },
    }),
    [isMobile]
  );

  const mobileMenuVariants = useMemo(
    () => ({
      hidden: { opacity: 0, height: 0 },
      visible: {
        opacity: 1,
        height: "auto",
        transition: { duration: isMobile ? 0.2 : 0.3, ease: "easeInOut" },
      },
      exit: {
        opacity: 0,
        height: 0,
        transition: { duration: isMobile ? 0.2 : 0.3, ease: "easeInOut" },
      },
    }),
    [isMobile]
  );

  const dropdownVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: -10, scale: 0.95 },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: isMobile ? 0.15 : 0.2, ease: "easeOut" },
      },
      exit: {
        opacity: 0,
        y: -10,
        scale: 0.95,
        transition: { duration: isMobile ? 0.1 : 0.15, ease: "easeIn" },
      },
    }),
    [isMobile]
  );

  // Background animation elements - disabled on mobile
  const backgroundElements = useMemo(() => {
    if (isMobile) return null;

    return (
      <>
        <motion.div
          className="absolute top-0 left-1/4 w-1 h-1 rounded-full bg-teal-400"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-0 right-1/3 w-1 h-1 rounded-full bg-emerald-400"
          animate={{
            scale: [1, 2, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </>
    );
  }, [isMobile]);

  return (
    <motion.nav
      ref={navbarRef}
      className={`fixed w-full z-50 transition-all font-poppins duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md py-2 md:py-2 border-b border-teal-200 shadow-sm"
          : "bg-transparent py-3 md:py-4"
      }`}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="container mx-auto px-3 md:px-4 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo - smaller on mobile */}
          <motion.div
            className="flex items-center"
            variants={itemVariants}
            whileHover={!isMobile ? { scale: 1.05 } : undefined}
          >
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                handleNavigation("/");
              }}
              className="flex items-center focus:outline-none cursor-pointer"
            >
              <div className="relative group">
                <div className="flex items-center justify-center overflow-hidden">
                  <img
                    src={logo}
                    alt="Zone Logo"
                    className={`${
                      isMobile ? "h-6" : isTablet ? "h-7" : "h-8"
                    } object-contain transition-all duration-300`}
                    loading="eager"
                  />
                </div>
              </div>
            </a>
          </motion.div>

          {/* Desktop Menu */}
          <motion.div
            className="hidden md:flex items-center space-x-1"
            variants={containerVariants}
          >
            {menuItems.map((item, index) => (
              <motion.div
                key={index}
                className="relative"
                variants={itemVariants}
                whileHover={!isMobile ? { y: -2 } : undefined}
                whileTap={{ y: 0 }}
              >
                <a
                  href={item.path}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation(item.path);
                  }}
                  className={`relative px-3 lg:px-4 py-2 group block focus:outline-none cursor-pointer text-sm lg:text-base ${
                    location.pathname === item.path
                      ? "text-teal-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <span className="relative z-10">{item.name}</span>
                  <div
                    className={`absolute bottom-0 left-0 w-full h-0.5 ${
                      location.pathname === item.path
                        ? "bg-teal-500 scale-x-100"
                        : "bg-teal-500 scale-x-0 group-hover:scale-x-100"
                    } transition-transform duration-300 origin-left`}
                  ></div>
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-teal-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
              </motion.div>
            ))}

            {/* Profile Dropdown for Authenticated Users */}
            {!loading && isAuthenticated && (
              <motion.div
                className="relative ml-2"
                variants={itemVariants}
                ref={profileRef}
              >
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center justify-center w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-medium relative overflow-hidden group"
                  whileHover={!isMobile ? { scale: 1.05 } : undefined}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 text-xs lg:text-sm font-semibold">
                    {getUserInitials()}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-md rounded-lg shadow-xl border border-teal-200 py-1 z-50"
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <div className="px-4 py-2 border-b border-teal-100">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {user?.name || "User"}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {user?.email || ""}
                        </p>
                      </div>

                      <button
                        onClick={handleDashboard}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 transition-colors duration-200"
                      >
                        <svg
                          className="w-4 h-4 mr-2 text-teal-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                          />
                        </svg>
                        Dashboard
                      </button>

                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                      >
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            <motion.button
              className="ml-4 px-4 lg:px-6 py-1.5 lg:py-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-medium rounded-full relative overflow-hidden group text-sm lg:text-base"
              whileHover={!isMobile ? { scale: 1.05 } : undefined}
              whileTap={{ scale: 0.95 }}
              variants={itemVariants}
              onClick={handleBookCall}
            >
              <span className="relative z-10">Book a Call</span>
              <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 rounded-full shadow-lg shadow-teal-500/20 group-hover:shadow-teal-500/30 transition-all duration-300"></div>
            </motion.button>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.div
            className="md:hidden flex items-center space-x-2"
            variants={itemVariants}
          >
            {/* Mobile Profile Icon */}
            {!loading && isAuthenticated && (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 text-white text-xs font-semibold mr-1"
                >
                  {getUserInitials()}
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-md rounded-lg shadow-xl border border-teal-200 py-1 z-50"
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <div className="px-4 py-2 border-b border-teal-100">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {user?.name || "User"}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {user?.email || ""}
                        </p>
                      </div>

                      <button
                        onClick={handleDashboard}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 transition-colors duration-200"
                      >
                        <svg
                          className="w-4 h-4 mr-2 text-teal-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                          />
                        </svg>
                        Dashboard
                      </button>

                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                      >
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none p-1"
              aria-label="Toggle menu"
            >
              <div className="w-5 h-5 flex flex-col justify-between items-center">
                <motion.span
                  className="w-5 h-0.5 bg-teal-500 block rounded-full"
                  animate={{
                    rotate: isOpen ? 45 : 0,
                    y: isOpen ? 6 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                ></motion.span>
                <motion.span
                  className="w-5 h-0.5 bg-teal-500 block rounded-full"
                  animate={{ opacity: isOpen ? 0 : 1 }}
                  transition={{ duration: 0.2 }}
                ></motion.span>
                <motion.span
                  className="w-5 h-0.5 bg-teal-500 block rounded-full"
                  animate={{
                    rotate: isOpen ? -45 : 0,
                    y: isOpen ? -6 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                ></motion.span>
              </div>
            </button>
          </motion.div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden mt-3 overflow-hidden"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="py-3 bg-white/95 backdrop-blur-lg rounded-lg border border-teal-200 shadow-xl">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={index}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.1 }}
                  >
                    <a
                      href={item.path}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavigation(item.path);
                      }}
                      className={`block w-full text-left px-5 py-2.5 transition-colors duration-300 focus:outline-none cursor-pointer text-sm ${
                        location.pathname === item.path
                          ? "text-teal-600 bg-teal-50"
                          : "text-gray-600 hover:text-gray-900 hover:bg-teal-50"
                      }`}
                    >
                      <span className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mr-3"></span>
                        {item.name}
                      </span>
                    </a>
                  </motion.div>
                ))}

                {/* Mobile Logout Option */}
                {isAuthenticated && (
                  <>
                    <div className="border-t border-teal-100 my-2"></div>
                    <button
                      onClick={handleDashboard}
                      className="flex items-center w-full px-5 py-2.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-teal-50 transition-colors duration-300"
                    >
                      <svg
                        className="w-4 h-4 mr-3 text-teal-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        />
                      </svg>
                      Dashboard
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-5 py-2.5 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors duration-300"
                    >
                      <svg
                        className="w-4 h-4 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      Logout
                    </button>
                  </>
                )}

                <div className="px-5 py-3 mt-2">
                  <motion.button
                    className="w-full px-5 py-2.5 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-medium rounded-full relative overflow-hidden text-sm"
                    whileTap={{ scale: 0.95 }}
                    onClick={handleBookCall}
                  >
                    <span className="relative z-10">Book a Call</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-emerald-600 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Animated elements - disabled on mobile */}
      {!scrolled && !isMobile && backgroundElements}

      {/* TidyCal Modal */}
      <BookingModal
        onClose={() => setIsModalOpen(false)}
        isOpen={isModalOpen}
      />
    </motion.nav>
  );
};

export default NextGenNavbar;
