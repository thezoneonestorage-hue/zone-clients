import React from "react";
import { motion } from "framer-motion";
import {
  FaBullseye,
  FaBolt,
  FaHandshake,
  FaLightbulb,
  FaHeart,
  FaUsers,
  FaShieldAlt,
  FaChartLine,
} from "react-icons/fa";

const ValuesSection = () => {
  const values = [
    {
      icon: <FaBullseye />,
      title: "Quality First",
      description:
        "Never compromise on quality. Every frame matters in telling your story perfectly.",
      color: "from-teal-500 to-emerald-500",
    },
    {
      icon: <FaBolt />,
      title: "Fast & Efficient",
      description:
        "Deliver exceptional work faster than industry standards without cutting corners.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <FaHandshake />,
      title: "Client Partnership",
      description:
        "We work with you, not just for you. Your success is our success.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <FaLightbulb />,
      title: "Innovation",
      description:
        "Constantly evolving with new techniques and technologies to stay ahead.",
      color: "from-yellow-500 to-amber-500",
    },
    {
      icon: <FaHeart />,
      title: "Passion Driven",
      description:
        "We love what we do, and it shows in every project we deliver.",
      color: "from-red-500 to-pink-500",
    },
    {
      icon: <FaUsers />,
      title: "Team Collaboration",
      description:
        "Great work comes from great teamwork and shared creative vision.",
      color: "from-green-500 to-lime-500",
    },
    {
      icon: <FaShieldAlt />,
      title: "Reliability",
      description:
        "Consistent, dependable service you can count on every single time.",
      color: "from-indigo-500 to-purple-500",
    },
    {
      icon: <FaChartLine />,
      title: "Continuous Growth",
      description:
        "Always learning, always improving, always pushing boundaries.",
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <motion.div
      className="mb-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.7 }}
    >
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-3">
        Our Core Values
      </h2>
      <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10 text-sm sm:text-base">
        The principles that guide everything we do and define who we are
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {values.map((value, index) => (
          <motion.div
            key={index}
            className="relative p-6 rounded-xl bg-white/90 backdrop-blur-sm border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 group"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            whileHover={{ y: -5 }}
          >
            {/* Icon with gradient background */}
            <div
              className={`absolute -top-3 -right-3 w-12 h-12 rounded-xl bg-gradient-to-r ${value.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}
            ></div>

            {/* Icon */}
            <div
              className={`w-14 h-14 rounded-xl bg-gradient-to-r ${value.color} flex items-center justify-center mb-4 text-white shadow-lg`}
            >
              <div className="text-xl">{value.icon}</div>
            </div>

            {/* Title */}
            <h4 className="font-bold text-gray-900 text-lg mb-3 group-hover:text-teal-600 transition-colors">
              {value.title}
            </h4>

            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed">
              {value.description}
            </p>

            {/* Bottom accent */}
            <div
              className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${value.color} rounded-b-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
            ></div>

            {/* Hover effect */}
            <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-teal-200 transition-all duration-300 pointer-events-none"></div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ValuesSection;
