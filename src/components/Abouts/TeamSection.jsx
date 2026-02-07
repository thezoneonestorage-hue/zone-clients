import React from "react";
import { motion } from "framer-motion";
import {
  FaVideo,
  FaPalette,
  FaMusic,
  FaLightbulb,
  FaUserTie,
  FaStar,
} from "react-icons/fa";
import { GiFilmSpool } from "react-icons/gi";

const TeamSection = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Mike Rodriguez",
      role: "Senior Editor",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
      skills: ["Color Grading", "Cinematic Cuts", "Sound Design"],
      projects: 120,
      icon: <FaVideo />,
      color: "teal",
    },
    {
      id: 2,
      name: "Emma Wilson",
      role: "Motion Designer",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
      skills: ["After Effects", "2D Animation", "Visual Effects"],
      projects: 85,
      icon: <FaPalette />,
      color: "purple",
    },
    {
      id: 3,
      name: "David Park",
      role: "Video Editor",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
      skills: ["Premiere Pro", "Social Media", "Fast Delivery"],
      projects: 95,
      icon: <GiFilmSpool />,
      color: "blue",
    },
    {
      id: 4,
      name: "Lisa Johnson",
      role: "Content Strategist",
      avatar:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop&crop=face",
      skills: ["Strategy", "Analytics", "Client Relations"],
      projects: 60,
      icon: <FaLightbulb />,
      color: "yellow",
    },
    {
      id: 5,
      name: "James Miller",
      role: "Senior Editor",
      avatar:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=face",
      skills: ["DaVinci Resolve", "Documentary", "Color Theory"],
      projects: 110,
      icon: <FaVideo />,
      color: "teal",
    },
    {
      id: 6,
      name: "Olivia Taylor",
      role: "Assistant Editor",
      avatar:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop&crop=face",
      skills: ["Final Cut", "Organization", "Quality Check"],
      projects: 45,
      icon: <FaUserTie />,
      color: "green",
    },
  ];

  const getColorClasses = (color) => {
    switch (color) {
      case "teal":
        return "bg-teal-500 text-white";
      case "purple":
        return "bg-purple-500 text-white";
      case "blue":
        return "bg-blue-500 text-white";
      case "yellow":
        return "bg-yellow-500 text-white";
      case "green":
        return "bg-green-500 text-white";
      default:
        return "bg-teal-500 text-white";
    }
  };

  return (
    <motion.div
      className="mb-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-3">
        Our Creative Team
      </h2>
      <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10 text-sm sm:text-base">
        Talented professionals dedicated to bringing your vision to life
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
        {teamMembers.map((member, index) => (
          <motion.div
            key={member.id}
            className="relative p-5 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 group"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            whileHover={{ y: -5 }}
          >
            {/* Avatar */}
            <div className="relative w-20 h-20 mx-auto mb-4">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-emerald-500 rounded-full opacity-10 group-hover:opacity-20 transition-opacity"></div>
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white shadow-md">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Role indicator */}
              <div
                className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center shadow-lg ${getColorClasses(
                  member.color
                )}`}
              >
                <span className="text-xs">{member.icon}</span>
              </div>
            </div>

            {/* Info */}
            <h4 className="font-bold text-gray-900 text-center text-sm mb-1">
              {member.name}
            </h4>
            <p className="text-teal-600 text-center text-xs font-medium mb-3">
              {member.role}
            </p>

            {/* Skills */}
            <div className="flex flex-wrap justify-center gap-1 mb-4">
              {member.skills.slice(0, 2).map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-teal-50 text-teal-700 text-xs rounded-full"
                >
                  {skill}
                </span>
              ))}
              {member.skills.length > 2 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                  +{member.skills.length - 2}
                </span>
              )}
            </div>

            {/* Projects completed */}
            <div className="text-center">
              <div className="text-xs text-gray-500 flex items-center justify-center gap-1">
                <FaStar className="w-3 h-3 text-yellow-400" />
                Projects
              </div>
              <div className="font-bold text-gray-900 text-lg">
                {member.projects}+
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default TeamSection;
