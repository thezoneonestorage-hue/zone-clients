import React from "react";
import { motion } from "framer-motion";
import {
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaAward,
  FaBriefcase,
} from "react-icons/fa";
import { GiFilmProjector } from "react-icons/gi";

const LeadershipSection = () => {
  const leadership = [
    {
      id: 1,
      name: "Alex Thompson",
      position: "CEO & Founder",
      role: "Founder",
      bio: "Former film director with 15+ years in video production. Founded EditPro to bridge the gap between professional quality and accessible pricing.",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      experience: "15+ Years",
      specialties: ["Film Production", "Business Strategy", "Client Relations"],
      socialLinks: [
        { icon: <FaLinkedin />, url: "#" },
        { icon: <FaTwitter />, url: "#" },
        { icon: <FaInstagram />, url: "#" },
      ],
    },
    {
      id: 2,
      name: "Sarah Chen",
      position: "Creative Director",
      role: "Co-Founder",
      bio: "Award-winning editor with expertise in cinematic storytelling. Leads our creative vision and quality assurance across all projects.",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      experience: "12+ Years",
      specialties: ["Cinematic Editing", "Color Grading", "Creative Direction"],
      socialLinks: [
        { icon: <FaLinkedin />, url: "#" },
        { icon: <FaTwitter />, url: "#" },
        { icon: <FaBriefcase />, url: "#" },
      ],
    },
  ];

  return (
    <motion.div
      className="mb-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-3">
        Meet Our Leadership
      </h2>
      <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10 text-sm sm:text-base">
        The visionaries behind our success and the driving force of our creative
        excellence
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {leadership.map((member, index) => (
          <motion.div
            key={member.id}
            className="relative p-6 sm:p-8 rounded-2xl bg-white/90 backdrop-blur-sm border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 group"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            {/* Floating badge */}
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
              <FaAward className="text-xs" />
              {member.role}
            </div>

            {/* Avatar */}
            <div className="relative mx-auto w-32 h-32 mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-emerald-500 rounded-full animate-pulse"></div>
              <div className="absolute inset-2 bg-white rounded-full overflow-hidden">
                <motion.img
                  src={member.avatar}
                  alt={member.name}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                />
              </div>

              {/* Verified badge */}
              <div className="absolute bottom-2 right-2 w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center shadow-lg">
                <GiFilmProjector className="w-4 h-4 text-white" />
              </div>
            </div>

            {/* Info */}
            <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
              {member.name}
            </h3>
            <p className="text-teal-600 text-center font-medium mb-4">
              {member.position}
            </p>

            {/* Bio */}
            <p className="text-gray-600 text-sm text-center leading-relaxed mb-4">
              {member.bio}
            </p>

            {/* Specialties */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {member.specialties.map((specialty, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-teal-50 text-teal-700 text-xs rounded-full border border-teal-100"
                >
                  {specialty}
                </span>
              ))}
            </div>

            {/* Social links */}
            <div className="flex justify-center space-x-3">
              {member.socialLinks.map((link, idx) => (
                <motion.a
                  key={idx}
                  href={link.url}
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-teal-500 hover:text-white transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-gray-600 hover:text-white transition-colors">
                    {link.icon}
                  </span>
                </motion.a>
              ))}
            </div>

            {/* Experience badge */}
            <div className="absolute -bottom-2 right-4 bg-white border border-teal-200 px-3 py-1 rounded-full shadow-md flex items-center gap-1">
              <FaBriefcase className="w-3 h-3 text-teal-600" />
              <span className="text-xs font-bold text-teal-600">
                {member.experience}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default LeadershipSection;
