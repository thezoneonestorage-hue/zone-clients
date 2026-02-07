import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaGithub,
  FaBehance,
  FaYoutube,
  FaQuoteLeft,
  FaStar,
  FaAward,
  FaTrophy,
  FaLightbulb,
  FaChevronLeft,
  FaChevronRight,
  FaPlay,
  FaPause,
  FaVideo,
  FaPalette,
  FaMusic,
  FaFilm,
  FaMagic,
  FaEye,
  FaFacebook,
  FaGlobe,
} from "react-icons/fa";
import { getAboutPage, iconMap } from "../services/api"; // Update the path

// Helper function to get icon component
const getIconComponent = (iconName) => {
  const IconComponent = iconMap[iconName];
  return IconComponent ? <IconComponent /> : null;
};

const AboutUs = () => {
  const [flippedCards, setFlippedCards] = useState({});
  const [activeAchievement, setActiveAchievement] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [visibleTeamMembers, setVisibleTeamMembers] = useState(4);
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch about page data
  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        setLoading(true);
        const response = await getAboutPage();
        setAboutData(response.data.aboutPage);
      } catch (err) {
        setError(err.message || "Failed to load about page data");
        console.error("Error fetching about data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  // Toggle flip card
  const toggleFlip = (id) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Toggle visibility of team members
  const toggleViewMore = () => {
    if (!aboutData?.teamMembers) return;
    setVisibleTeamMembers((prev) =>
      prev === 4 ? aboutData.teamMembers.length : 4
    );
  };

  // Auto-rotate achievements
  useEffect(() => {
    if (!autoPlay || !aboutData?.achievements) return;

    const interval = setInterval(() => {
      setActiveAchievement(
        (prev) => (prev + 1) % aboutData.achievements.length
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [autoPlay, aboutData?.achievements]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 via-white to-emerald-50/30">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading about page...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !aboutData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 via-white to-emerald-50/30">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaEye className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Unable to load content
          </h2>
          <p className="text-gray-600 mb-4">
            {error || "No about page data available"}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Extract data from the API response
  const {
    agencyInfo,
    teamMembers = [],
    achievements = [],
    brandLogos = [],
  } = aboutData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50/30">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-100 rounded-full text-teal-700 text-sm font-medium mb-8">
            <FaStar className="w-4 h-4" />
            <span>About {agencyInfo?.name || "VisionCraft"}</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            {agencyInfo?.tagline || "We Craft Visual Stories"}
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            {agencyInfo?.mission ||
              "Transforming ideas into cinematic experiences through precision editing, motion design, and creative innovation."}
          </p>
        </motion.div>
      </div>

      {/* Agency Description Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left Column: Agency Image */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={
                  agencyInfo?.heroImage ||
                  "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop&crop=center&q=80"
                }
                alt={agencyInfo?.name || "VisionCraft Studio"}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-teal-900/40 via-transparent to-transparent"></div>

              {/* Studio Badge */}
              <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <FaVideo className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-bold text-gray-900">
                    {agencyInfo?.name || "VisionCraft"} HQ
                  </span>
                </div>
              </div>
            </div>

            {/* Floating Social Media Cards */}
            <div className="absolute -bottom-6 -right-6">
              <div className="bg-white rounded-2xl p-4 shadow-xl border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl flex items-center justify-center">
                    <FaGlobe className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Follow Us</h4>
                    <p className="text-sm text-gray-600">Join our community</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Agency Description */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-500/10 to-emerald-500/10 rounded-full text-teal-700 text-sm font-medium">
              <FaStar className="w-4 h-4" />
              <span>Our Story & Vision</span>
            </div>

            <h2 className="text-4xl font-bold text-gray-900">
              Where Creativity Meets{" "}
              <span className="text-teal-600">Technology</span>
            </h2>

            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Founded in {agencyInfo?.foundedYear || 2015},{" "}
                <strong>{agencyInfo?.name || "VisionCraft"}</strong>{" "}
                {agencyInfo?.description ||
                  "began as a small studio with a big dream: to revolutionize visual storytelling through cutting-edge technology and artistic vision. Today, we're a globally recognized creative agency specializing in video production, motion design, and digital experiences."}
              </p>

              <p>
                Our philosophy is simple: every project deserves{" "}
                <strong>cinematic excellence</strong>. Whether it's a brand
                commercial, a documentary, or a social media campaign, we
                approach each frame with the same passion and attention to
                detail.
              </p>

              {agencyInfo?.values && agencyInfo.values.length > 0 && (
                <div className="bg-gradient-to-r from-teal-50 to-emerald-50 p-6 rounded-2xl border border-teal-100 mt-6">
                  <h3 className="font-bold text-gray-900 text-lg mb-2">
                    What Sets Us Apart:
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    {agencyInfo.values.map((value, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                        <span>{value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Social Media Links */}
            {agencyInfo?.socialLinks && agencyInfo.socialLinks.length > 0 && (
              <div className="pt-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Connect With Our Agency:
                </h3>
                <div className="flex flex-wrap gap-3">
                  {agencyInfo.socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group w-12 h-12 bg-white border border-gray-300 rounded-xl flex items-center justify-center hover:bg-gradient-to-r hover:from-teal-500 hover:to-emerald-500 hover:border-transparent hover:shadow-lg transition-all duration-300"
                      aria-label={link.platform}
                    >
                      <span className="text-gray-600 group-hover:text-white text-lg transition-colors duration-300">
                        {getIconComponent(link.icon)}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Brands Marquee Section */}
      {brandLogos.length > 0 && (
        <div className="py-16 bg-white border-y border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Trusted by Leading Brands
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We've partnered with industry leaders to create exceptional
                visual content
              </p>
            </motion.div>

            <div className="relative overflow-hidden">
              {/* Gradient Fades */}
              <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10"></div>
              <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10"></div>

              {/* Marquee Container */}
              <div className="flex animate-marquee space-x-16 py-4">
                {brandLogos.concat(brandLogos).map((brand, index) => (
                  <div key={index} className="flex-shrink-0 group">
                    <div className="w-48 h-24 bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex items-center justify-center transition-all duration-300 hover:shadow-xl hover:scale-105 hover:border-teal-300">
                      <div className="relative w-full h-full">
                        <img
                          src={brand.logo}
                          alt={brand.name}
                          className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-teal-500/0 via-transparent to-emerald-500/0 group-hover:from-teal-500/5 group-hover:to-emerald-500/5 transition-all duration-300 rounded-xl"></div>
                      </div>
                    </div>
                    <p className="text-center text-sm text-gray-500 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {brand.name}
                    </p>
                  </div>
                ))}
              </div>

              {/* Second Row (reverse direction) */}
              <div className="flex animate-marquee-reverse space-x-16 py-4 mt-8">
                {brandLogos
                  .slice()
                  .reverse()
                  .concat(brandLogos.slice().reverse())
                  .map((brand, index) => (
                    <div
                      key={`reverse-${index}`}
                      className="flex-shrink-0 group"
                    >
                      <div className="w-40 h-20 bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex items-center justify-center transition-all duration-300 hover:shadow-xl hover:scale-105 hover:border-teal-300">
                        <img
                          src={brand.logo}
                          alt={brand.name}
                          className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300 opacity-70 group-hover:opacity-100"
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Achievements Section */}
      {achievements.length > 0 && (
        <div className="py-20 bg-gradient-to-b from-white to-teal-50/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Our Achievements
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Recognized for excellence in creative innovation and technical
                mastery
              </p>
            </motion.div>

            {/* Achievement Carousel */}
            <div className="relative max-w-6xl mx-auto">
              <div className="flex flex-col lg:flex-row gap-8 items-center">
                {/* Achievement Images */}
                <div className="lg:w-2/3 relative">
                  <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
                    <img
                      src={achievements[activeAchievement]?.image}
                      alt={achievements[activeAchievement]?.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                          {getIconComponent(
                            achievements[activeAchievement]?.icon
                          )}
                        </div>
                        <span className="text-sm font-medium bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                          {achievements[activeAchievement]?.year}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold mb-2">
                        {achievements[activeAchievement]?.title}
                      </h3>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex justify-center mt-6 space-x-4">
                    <button
                      onClick={() =>
                        setActiveAchievement(
                          (prev) =>
                            (prev - 1 + achievements.length) %
                            achievements.length
                        )
                      }
                      className="w-12 h-12 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                    >
                      <FaChevronLeft className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => setAutoPlay(!autoPlay)}
                      className="w-12 h-12 rounded-full bg-white border border-teal-300 text-teal-600 flex items-center justify-center hover:bg-teal-50 transition-colors shadow-lg"
                    >
                      {autoPlay ? (
                        <FaPause className="w-4 h-4" />
                      ) : (
                        <FaPlay className="w-4 h-4" />
                      )}
                    </button>

                    <button
                      onClick={() =>
                        setActiveAchievement(
                          (prev) => (prev + 1) % achievements.length
                        )
                      }
                      className="w-12 h-12 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                    >
                      <FaChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Achievement Details */}
                <div className="lg:w-1/3 space-y-6">
                  <div className="space-y-4">
                    {achievements.map((achievement, index) => (
                      <button
                        key={achievement._id || index}
                        onClick={() => setActiveAchievement(index)}
                        className={`w-full p-4 rounded-xl text-left transition-all duration-300 ${
                          index === activeAchievement
                            ? "bg-gradient-to-r from-teal-50 to-emerald-50 border-2 border-teal-200 shadow-lg"
                            : "bg-gray-50 hover:bg-gray-100"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              index === activeAchievement
                                ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white"
                                : "bg-gray-200 text-gray-600"
                            }`}
                          >
                            {getIconComponent(achievement.icon)}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">
                              {achievement.title}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1">
                              {achievement.year}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="bg-gradient-to-r from-teal-500/10 to-emerald-500/10 p-6 rounded-xl">
                    <p className="text-gray-700 leading-relaxed">
                      {achievements[activeAchievement]?.description}
                    </p>
                  </div>

                  {/* Progress Dots */}
                  <div className="flex justify-center space-x-2">
                    {achievements.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveAchievement(index)}
                        className={`w-3 h-3 rounded-full transition-all ${
                          index === activeAchievement
                            ? "bg-gradient-to-r from-teal-500 to-emerald-500 w-8"
                            : "bg-gray-300 hover:bg-gray-400"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Team Section */}
      {teamMembers.length > 0 && (
        <div className="py-20 bg-gradient-to-b from-white to-teal-50/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Meet Our Team
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Click or hover on cards to see team member details and social
                links
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {teamMembers.slice(0, visibleTeamMembers).map((member, index) => (
                <motion.div
                  key={member._id || index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative h-96 perspective-1000 cursor-pointer"
                  onClick={() => toggleFlip(member._id || index)}
                  onMouseEnter={() =>
                    !flippedCards[member._id || index] &&
                    toggleFlip(member._id || index)
                  }
                  onMouseLeave={() =>
                    flippedCards[member._id || index] &&
                    toggleFlip(member._id || index)
                  }
                >
                  {/* Flip Card Container */}
                  <div
                    className={`relative w-full h-full transition-all duration-500 preserve-3d ${
                      flippedCards[member._id || index] ? "rotate-y-180" : ""
                    }`}
                  >
                    {/* Front of Card */}
                    <div className="absolute w-full h-full bg-white rounded-2xl border border-gray-200 shadow-lg backface-hidden overflow-hidden">
                      <div className="relative h-full">
                        {/* Member Image */}
                        <div className="h-2/3 relative overflow-hidden">
                          <img
                            src={member.front.image}
                            alt={member.name}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

                          {/* Role Badge */}
                          <div className="absolute top-4 right-4">
                            <div className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-teal-700 shadow-sm">
                              {member.role}
                            </div>
                          </div>
                        </div>

                        {/* Member Info */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white to-transparent">
                          <h3 className="text-xl font-bold text-gray-900 mb-1">
                            {member.name}
                          </h3>
                          <p className="text-teal-600 font-medium mb-3">
                            {member.role}
                          </p>

                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            {getIconComponent(member.front.icon)}
                            <span>{member.front.specialty}</span>
                          </div>
                        </div>

                        {/* Hover Indicator */}
                        <div className="absolute bottom-4 right-4">
                          <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                            <FaEye className="w-4 h-4 text-teal-600" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Back of Card */}
                    <div className="absolute w-full h-full bg-gradient-to-br from-teal-500 to-emerald-500 rounded-2xl shadow-xl backface-hidden rotate-y-180 overflow-hidden">
                      <div className="relative h-full p-6 text-white">
                        {/* Quote */}
                        <div className="mb-6">
                          <FaQuoteLeft className="w-6 h-6 text-white/60 mb-3" />
                          <p className="text-lg italic leading-relaxed mb-4">
                            "{member.back.quote}"
                          </p>
                        </div>

                        {/* Bio */}
                        <p className="text-white/90 text-sm leading-relaxed mb-6">
                          {member.back.bio}
                        </p>

                        {/* Social Links */}
                        {member.back.social &&
                          member.back.social.length > 0 && (
                            <div>
                              <div className="text-white/80 text-sm mb-3">
                                Connect
                              </div>
                              <div className="flex gap-3">
                                {member.back.social.map(
                                  (social, socialIndex) => (
                                    <a
                                      key={socialIndex}
                                      href={social.url || "#"}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      <span className="text-white text-lg">
                                        {getIconComponent(
                                          social.platform
                                            ? `Fa${
                                                social.platform
                                                  .charAt(0)
                                                  .toUpperCase() +
                                                social.platform.slice(1)
                                              }`
                                            : ""
                                        )}
                                      </span>
                                    </a>
                                  )
                                )}
                              </div>
                            </div>
                          )}
                      </div>
                    </div>
                  </div>

                  {/* Flip Indicator */}
                  <div
                    className={`absolute -bottom-3 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-white border border-gray-200 rounded-full text-xs text-gray-600 transition-all duration-300 ${
                      flippedCards[member._id || index]
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-2"
                    }`}
                  >
                    Click to flip back
                  </div>
                </motion.div>
              ))}
            </div>

            {/* View More Button */}
            {teamMembers.length > 4 && (
              <div className="text-center mt-12">
                <button
                  onClick={toggleViewMore}
                  className="px-8 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2 mx-auto"
                >
                  {visibleTeamMembers === 4 ? (
                    <>
                      <FaEye className="w-5 h-5" />
                      View More Team Members
                    </>
                  ) : (
                    "Show Less"
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CTA Section */}
      <div className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-20 h-20 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl">
              <FaVideo className="w-10 h-10 text-white" />
            </div>

            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Ready to Create Something Amazing?
            </h2>

            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Partner with our award-winning team to bring your vision to life
              with cinematic excellence.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() =>
                  (window.location.href = `mailto:${
                    agencyInfo?.contactEmail || "contact@visioncraft.com"
                  }`)
                }
                className="px-8 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                Start Your Project
              </button>
              <button
                onClick={() => (window.location.href = "/portfolio")}
                className="px-8 py-3 bg-white text-teal-600 font-semibold rounded-xl border border-teal-300 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                View Our Portfolio
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Add CSS for flip animations and marquee */}
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }

        .preserve-3d {
          transform-style: preserve-3d;
        }

        .backface-hidden {
          backface-visibility: hidden;
        }

        .rotate-y-180 {
          transform: rotateY(180deg);
        }

        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes marquee-reverse {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-marquee {
          animation: marquee 40s linear infinite;
        }

        .animate-marquee-reverse {
          animation: marquee-reverse 40s linear infinite;
        }

        .animate-marquee:hover,
        .animate-marquee-reverse:hover {
          animation-play-state: paused;
        }

        /* Smooth transitions */
        * {
          transition-property: transform, opacity;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          transition-duration: 500ms;
        }
      `}</style>
    </div>
  );
};

export default AboutUs;
