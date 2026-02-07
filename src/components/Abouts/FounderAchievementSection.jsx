import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaChevronLeft,
  FaChevronRight,
  FaTrophy,
  FaAward,
  FaMedal,
  FaStar,
  FaRocket,
  FaLightbulb,
} from "react-icons/fa";
import { GiFilmSpool, GiVideoCamera } from "react-icons/gi";

const FounderAchievementSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const founder = {
    name: "Alex Thompson",
    title: "Founder & Creative Visionary",
    bio: "With over 15 years in film production and digital media, Alex founded our studio with a simple mission: to make professional-grade video editing accessible to every creator. His award-winning background in cinematic storytelling forms the foundation of our creative philosophy.",
    stats: {
      experience: "15+ Years",
      projects: "500+",
      awards: "25+",
    },
    specialties: [
      "Cinematic Storytelling",
      "Color Theory",
      "Director's Vision",
      "Creative Strategy",
    ],
  };

  const achievements = [
    {
      id: 1,
      title: "Best Film Director 2020",
      organization: "International Film Festival",
      year: "2020",
      description:
        "Awarded for excellence in cinematic storytelling and visual innovation",
      icon: <FaTrophy />,
      image:
        "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?w=600&h=400&fit=crop",
    },
    {
      id: 2,
      title: "Innovation in Video Production",
      organization: "Digital Media Awards",
      year: "2021",
      description:
        "Recognized for groundbreaking approaches to digital video content",
      icon: <FaLightbulb />,
      image:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&h=400&fit=crop",
    },
    {
      id: 3,
      title: "Creative Excellence Award",
      organization: "Global Content Association",
      year: "2022",
      description:
        "Honored for outstanding contributions to the creative industry",
      icon: <FaAward />,
      image:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop",
    },
    {
      id: 4,
      title: "Video Editor of the Year",
      organization: "Professional Editors Guild",
      year: "2023",
      description: "Top honor for technical excellence and creative innovation",
      icon: <GiVideoCamera />,
      image:
        "https://images.unsplash.com/photo-1489599809516-9827b6d1cf13?w=600&h=400&fit=crop",
    },
    {
      id: 5,
      title: "Industry Pioneer Award",
      organization: "Future of Media Summit",
      year: "2024",
      description:
        "Recognizing leadership in transforming video editing standards",
      icon: <FaRocket />,
      image:
        "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % achievements.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + achievements.length) % achievements.length
    );
  };

  return (
    <motion.div
      className="mb-16 sm:mb-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Founder Section */}
        <motion.div
          className="bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-lg p-6 sm:p-8"
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex items-start gap-4 sm:gap-6 mb-6">
            <div className="relative">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-4 border-white shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
                  alt={founder.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                <GiFilmSpool className="w-5 h-5 text-white" />
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                  {founder.name}
                </h3>
                <div className="px-2 py-1 bg-gradient-to-r from-teal-500 to-teal-600 text-white text-xs font-bold rounded-full">
                  FOUNDER
                </div>
              </div>
              <p className="text-teal-600 font-medium text-sm sm:text-base mb-3">
                {founder.title}
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-3 mb-4">
                <div className="px-3 py-1 bg-teal-50 rounded-full">
                  <span className="text-teal-700 font-bold text-sm">
                    {founder.stats.experience}
                  </span>
                  <span className="text-gray-600 text-xs ml-1">Exp</span>
                </div>
                <div className="px-3 py-1 bg-emerald-50 rounded-full">
                  <span className="text-emerald-700 font-bold text-sm">
                    {founder.stats.projects}
                  </span>
                  <span className="text-gray-600 text-xs ml-1">Projects</span>
                </div>
                <div className="px-3 py-1 bg-blue-50 rounded-full">
                  <span className="text-blue-700 font-bold text-sm">
                    {founder.stats.awards}
                  </span>
                  <span className="text-gray-600 text-xs ml-1">Awards</span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
            {founder.bio}
          </p>

          <div className="space-y-4">
            <h4 className="font-bold text-gray-900 text-lg">Specialties</h4>
            <div className="flex flex-wrap gap-2">
              {founder.specialties.map((specialty, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gradient-to-r from-teal-50 to-emerald-50 text-teal-700 text-sm font-medium rounded-lg border border-teal-100"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Achievements Slider */}
        <motion.div
          className="relative bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-lg overflow-hidden"
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Slider Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
                <FaMedal className="text-teal-500" />
                Awards & Achievements
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={prevSlide}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-teal-100 transition-colors"
                >
                  <FaChevronLeft className="w-4 h-4 text-gray-600" />
                </button>
                <button
                  onClick={nextSlide}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-teal-100 transition-colors"
                >
                  <FaChevronRight className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
            <p className="text-gray-600 text-sm">
              Recognitions that define our commitment to excellence
            </p>
          </div>

          {/* Slider Content */}
          <div className="relative h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0"
              >
                <div className="relative h-full">
                  {/* Achievement Image */}
                  <div className="h-48 sm:h-56 relative overflow-hidden">
                    <img
                      src={achievements[currentSlide].image}
                      alt={achievements[currentSlide].title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                    {/* Badge */}
                    <div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                      <div className="text-teal-500 text-xl">
                        {achievements[currentSlide].icon}
                      </div>
                    </div>
                  </div>

                  {/* Achievement Details */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-3 py-1 bg-teal-100 text-teal-700 text-xs font-bold rounded-full">
                        {achievements[currentSlide].year}
                      </span>
                      <span className="text-gray-500 text-sm">
                        {achievements[currentSlide].organization}
                      </span>
                    </div>

                    <h4 className="font-bold text-gray-900 text-lg mb-3">
                      {achievements[currentSlide].title}
                    </h4>

                    <p className="text-gray-600 text-sm leading-relaxed">
                      {achievements[currentSlide].description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slide Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {achievements.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentSlide
                    ? "w-8 bg-teal-500"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>

          {/* Current Slide Indicator */}
          <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
            <span className="text-sm font-medium text-gray-700">
              {currentSlide + 1} / {achievements.length}
            </span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FounderAchievementSection;
