"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FaLinkedin,
  FaReact,
  FaJsSquare,
  FaNodeJs,
  FaPaintBrush,
  FaUserAlt,
} from "react-icons/fa";
import { FiDownload, FiArrowRightCircle } from "react-icons/fi";
import TypeScriptIcon from "./TypeScriptIcon";
import PortfolioPage from "./PortfolioPage";
import { useTranslation } from "next-i18next";

// Main Component with modern visual elements, interactivity, and AR inclusion
export default function AboutMe() {
  const { t } = useTranslation("common");

  const scrollToProjects = () => {
    document.getElementById("projetos").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative bg-white dark:bg-gray-900 py-12 overflow-hidden transition-colors duration-300"
      id="sobre"
    >
      <div className="absolute top-0 right-0 transform scale-75 translate-x-1/2 -translate-y-1/2 z-0 opacity-20">
        {/* AR Element as a futuristic, immersive 3D object */}
        <motion.div
          className="w-[500px] h-[500px] rounded-full bg-blue-500 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.8, 0.9, 0.8] }}
          transition={{ repeat: Infinity, duration: 10 }}
        />
      </div>
      <div className="absolute bottom-0 left-0 transform scale-80 -translate-l-1/2 translate-l-1/2 z-0 opacity-30">
        {/* AR Element as a futuristic, immersive 3D object */}
        <motion.div
          className="w-[500px] h-[500px] rounded-full bg-blue-500 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.8, 0.9, 0.8] }}
          transition={{ repeat: Infinity, duration: 10 }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Subcomponent container for PortfolioPage with 3D and AR visuals */}
          <motion.div
            className="relative w-full h-[500px] rounded-3xl overflow-hidden shadow-2xl transition-transform duration-300 group"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <PortfolioPage />
          </motion.div>

          {/* Text and Skills Section */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.h2
              className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-6xl 2xl:text-7xl font-bold text-[#003366] dark:text-white font-montserrat mb-4 leading-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {t("about_me")}
            </motion.h2>

            <motion.p
              className="text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl 2xl:text-2xl text-[#333333] dark:text-gray-300 font-open-sans leading-relaxed mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              {t("intro_text")}
            </motion.p>

            <motion.p
              className="text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl 2xl:text-2xl text-[#003366] dark:text-blue-300 font-open-sans font-semibold mb-4 border-l-4 border-blue-500 pl-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              {t("availability")}
            </motion.p>

            {/* Enhanced Skill bars with modern micro-interactions */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <SkillBar
                skill={t("javascript")}
                percentage={95}
                icon={<FaJsSquare size={24} />}
              />
              <SkillBar
                skill={t("react")}
                percentage={90}
                icon={<FaReact size={24} />}
              />
              <SkillBar
                skill={t("node_js")}
                percentage={90}
                icon={<FaNodeJs size={24} />}
              />
              <SkillBar
                skill={t("typescript")}
                percentage={85}
                icon={<TypeScriptIcon />}
              />
              <SkillBar
                skill={t("web_design")}
                percentage={80}
                icon={<FaPaintBrush size={24} />}
              />
              <SkillBar
                skill={t("ux_ui")}
                percentage={75}
                icon={<FaUserAlt size={24} />}
              />
            </motion.div>

            {/* Call to Action buttons updated with modern animations */}
            <motion.div
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <motion.button
                className="bg-blue-600 text-white font-montserrat font-bold py-2 px-6 rounded-full hover:bg-blue-500 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500 dark:focus:ring-blue-300 focus:ring-opacity-50 flex items-center whitespace-nowrap"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToProjects}
              >
                <FiArrowRightCircle className="mr-2" /> {t("learn_more")}
              </motion.button>
              <motion.a
                href="https://www.linkedin.com/in/daniel-neri-51a7b12b3/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-transparent border-2 border-blue-600 dark:border-blue-300 text-blue-600 dark:text-blue-300 font-montserrat font-bold py-2 px-6 rounded-full hover:bg-blue-600 hover:text-white dark:hover:bg-blue-300 dark:hover:text-gray-900 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500 dark:focus:ring-blue-300 focus:ring-opacity-50 flex items-center whitespace-nowrap"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaLinkedin className="mr-2" /> {t("contact_me")}
              </motion.a>
              <motion.a
                href="/src/resume-pt.pdf"
                download
                className="relative text-blue-600 dark:text-blue-300 font-bold py-2 px-6 rounded-full border-2 border-blue-600 dark:border-blue-300 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-300 dark:hover:text-gray-900 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500 dark:focus:ring-blue-300 focus:ring-opacity-50 flex items-center whitespace-nowrap"
                whileHover={{ scale: 1.1 }}
              >
                <FiDownload className="mr-2" /> {t("download_cv")}
                <span className="absolute inset-0 border border-dashed border-blue-600 dark:border-blue-300 rounded-full opacity-25 transition duration-300"></span>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Curved Background Transition */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg
          className="relative block w-full h-[100px] transform translate-y-1/2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#ffffff"
            d="M0,224L48,213.3C96,203,192,181,288,192C384,203,480,245,576,245.3C672,245,768,203,864,186.7C960,171,1056,181,1152,186.7C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
}

// Enhanced SkillBar component with added motion effects
function SkillBar({ skill, percentage, icon }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <span className="flex items-center text-[#333333] dark:text-gray-300 font-open-sans font-semibold">
          {icon} <span className="ml-2">{skill}</span>
        </span>
        <span className="text-[#003366] dark:text-white font-montserrat font-bold">
          {percentage}%
        </span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3">
        <motion.div
          className="bg-blue-600 h-3 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, delay: 0.5 }}
        ></motion.div>
      </div>
    </div>
  );
}