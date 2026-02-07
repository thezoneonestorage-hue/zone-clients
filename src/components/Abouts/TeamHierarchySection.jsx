import React from "react";
import { motion } from "framer-motion";
import {
  FaCrown,
  FaUserTie,
  FaUsers,
  FaVideo,
  FaPalette,
  FaMusic,
  FaLightbulb,
  FaChartLine,
  FaShieldAlt,
  FaHandshake,
  FaStar,
  FaRocket,
} from "react-icons/fa";
import { GiFilmSpool, GiDirectorChair } from "react-icons/gi";

const TeamHierarchySection = () => {
  const leadership = [
    {
      id: 1,
      name: "Alex Thompson",
      role: "Founder & CEO",
      level: "founder",
      icon: <FaCrown />,
      color: "from-teal-500 to-emerald-500",
      description: "Overall vision and strategy",
      teamSize: "15+ Members",
      projects: "500+",
    },
    {
      id: 2,
      name: "Sarah Chen",
      role: "Co-Founder & Creative Director",
      level: "cofounder",
      icon: <GiDirectorChair />,
      color: "from-purple-500 to-pink-500",
      description: "Creative direction and quality control",
      teamSize: "8 Members",
      projects: "300+",
    },
  ];

  const departmentHeads = [
    {
      id: 1,
      name: "Michael Rodriguez",
      role: "Head of Video Editing",
      department: "Editing",
      icon: <FaVideo />,
      color: "from-blue-500 to-cyan-500",
      team: [
        { name: "James Wilson", role: "Senior Editor" },
        { name: "Emma Davis", role: "Color Specialist" },
        { name: "David Park", role: "Video Editor" },
      ],
    },
    {
      id: 2,
      name: "Lisa Johnson",
      role: "Head of Motion Design",
      department: "Motion Graphics",
      icon: <FaPalette />,
      color: "from-purple-500 to-pink-500",
      team: [
        { name: "Olivia Taylor", role: "Motion Designer" },
        { name: "Robert Kim", role: "VFX Artist" },
        { name: "Sophia Lee", role: "Animator" },
      ],
    },
    {
      id: 3,
      name: "David Miller",
      role: "Head of Strategy",
      department: "Client Relations",
      icon: <FaChartLine />,
      color: "from-green-500 to-lime-500",
      team: [
        { name: "Rachel Brown", role: "Account Manager" },
        { name: "Thomas White", role: "Strategy Lead" },
        { name: "Amanda Clark", role: "Client Success" },
      ],
    },
  ];

  const specialRoles = [
    {
      id: 1,
      name: "Emma Wilson",
      role: "Sound Design Lead",
      icon: <FaMusic />,
      color: "from-yellow-500 to-amber-500",
      description: "Audio excellence specialist",
    },
    {
      id: 2,
      name: "Chris Evans",
      role: "Technical Director",
      icon: <FaShieldAlt />,
      color: "from-red-500 to-orange-500",
      description: "Workflow optimization expert",
    },
    {
      id: 3,
      name: "Sophia Rodriguez",
      role: "Innovation Lead",
      icon: <FaLightbulb />,
      color: "from-indigo-500 to-purple-500",
      description: "Future technologies specialist",
    },
  ];

  return (
    <motion.div
      className="mb-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          Our Creative Family
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
          Meet the talented individuals who bring your vision to life. From
          visionary leadership to specialized experts.
        </p>
      </div>

      {/* Leadership Level */}
      <div className="mb-12">
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-full">
            <FaCrown className="w-5 h-5" />
            <span className="font-bold">Leadership Team</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {leadership.map((leader, index) => (
            <motion.div
              key={leader.id}
              className="relative bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-lg p-6"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-16 h-16 rounded-xl bg-gradient-to-r ${leader.color} flex items-center justify-center text-white shadow-lg`}
                >
                  <div className="text-2xl">{leader.icon}</div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-900 text-lg">
                      {leader.name}
                    </h3>
                    <span
                      className={`px-2 py-1 text-xs font-bold rounded-full ${
                        leader.level === "founder"
                          ? "bg-teal-100 text-teal-700"
                          : "bg-purple-100 text-purple-700"
                      }`}
                    >
                      {leader.level === "founder" ? "FOUNDER" : "CO-FOUNDER"}
                    </span>
                  </div>
                  <p className="text-teal-600 font-medium text-sm mb-3">
                    {leader.role}
                  </p>

                  <p className="text-gray-600 text-sm mb-4">
                    {leader.description}
                  </p>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <FaUsers className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {leader.teamSize}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <GiFilmSpool className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {leader.projects}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Department Heads */}
      <div className="mb-12">
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full">
            <FaUserTie className="w-5 h-5" />
            <span className="font-bold">Department Heads</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {departmentHeads.map((head, index) => (
            <motion.div
              key={head.id}
              className="bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200 shadow-md p-5"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -3 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-r ${head.color} flex items-center justify-center text-white`}
                >
                  <div className="text-lg">{head.icon}</div>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{head.name}</h4>
                  <p className="text-teal-600 text-sm font-medium">
                    {head.role}
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded-full">
                  {head.department}
                </span>
              </div>

              <div className="space-y-3">
                <p className="text-gray-500 text-xs font-medium">
                  Team Members:
                </p>
                {head.team.map((member, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                  >
                    <span className="text-gray-700 text-sm">{member.name}</span>
                    <span className="text-teal-600 text-xs font-medium">
                      {member.role}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Specialized Roles */}
      <div>
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full">
            <FaStar className="w-5 h-5" />
            <span className="font-bold">Specialized Experts</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {specialRoles.map((role, index) => (
            <motion.div
              key={role.id}
              className="bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200 shadow-sm p-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-lg bg-gradient-to-r ${role.color} flex items-center justify-center text-white`}
                >
                  <div className="text-base">{role.icon}</div>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">
                    {role.name}
                  </h4>
                  <p className="text-teal-600 text-xs font-medium">
                    {role.role}
                  </p>
                </div>
              </div>

              <p className="text-gray-600 text-xs mt-3">{role.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Total Team Stats */}
      <motion.div
        className="mt-12 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-2xl border border-teal-200 p-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="text-2xl font-bold text-teal-600">15+</div>
            <div className="text-gray-600 text-sm">Team Members</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-emerald-600">8+</div>
            <div className="text-gray-600 text-sm">Expertise Areas</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">500+</div>
            <div className="text-gray-600 text-sm">Projects Completed</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">25+</div>
            <div className="text-gray-600 text-sm">Awards Won</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TeamHierarchySection;
