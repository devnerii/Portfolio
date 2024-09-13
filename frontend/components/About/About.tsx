'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

export default function AboutMe() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 py-16 overflow-hidden transition-colors duration-300"
      id="about-me"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Container da Imagem com Efeitos de Hover */}
          <motion.div
            className="relative w-full h-[500px] rounded-3xl overflow-hidden shadow-2xl transition-transform duration-300 group"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
          >
            <Image
              src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23"
              alt="Profile picture"
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 ease-in-out transform group-hover:scale-110"
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-50 group-hover:opacity-70 transition-opacity duration-300 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
            >
              <p className="text-white text-3xl font-bold font-montserrat drop-shadow-lg">Seu Nome</p>
            </motion.div>
            {/* Ícones Sociais */}
            <div className="absolute bottom-4 left-4 flex space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <a href="#" className="text-white hover:text-blue-500">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="text-white hover:text-blue-400">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="text-white hover:text-blue-600">
                <FaLinkedin size={24} />
              </a>
              <a href="#" className="text-white hover:text-gray-400">
                <FaGithub size={24} />
              </a>
            </div>
          </motion.div>

          {/* Seção de Texto e Habilidades */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.h2
              className="text-5xl font-bold text-[#003366] dark:text-white font-montserrat mb-6 leading-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Sobre Mim
            </motion.h2>

            <motion.p
              className="text-[#333333] dark:text-gray-300 font-open-sans text-lg leading-relaxed mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              Sou um desenvolvedor web apaixonado por criar experiências digitais inovadoras. Com uma forte atenção aos detalhes e um compromisso com a excelência, busco constantemente aprimorar minhas habilidades e acompanhar as tendências do setor.
            </motion.p>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <SkillBar skill="Web Design" percentage={95} />
              <SkillBar skill="UX/UI" percentage={90} />
              <SkillBar skill="JavaScript" percentage={92} />
              <SkillBar skill="React" percentage={88} />
              <SkillBar skill="Node.js" percentage={85} />
              <SkillBar skill="TypeScript" percentage={90} />
            </motion.div>

            {/* Botão de Call to Action */}
            <motion.div
              className="flex space-x-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <motion.button
                className="mt-8 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-montserrat font-bold py-3 px-8 rounded-full hover:from-blue-500 hover:to-blue-300 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500 dark:focus:ring-blue-300 focus:ring-opacity-50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Saiba Mais
              </motion.button>
              <motion.button
                className="mt-8 bg-transparent border-2 border-blue-600 dark:border-blue-300 text-blue-600 dark:text-blue-300 font-montserrat font-bold py-3 px-8 rounded-full hover:bg-blue-600 hover:text-white dark:hover:bg-blue-300 dark:hover:text-gray-900 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500 dark:focus:ring-blue-300 focus:ring-opacity-50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contate-me
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function SkillBar({ skill, percentage }) {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-1">
        <span className="text-[#333333] dark:text-gray-300 font-open-sans font-semibold">{skill}</span>
        <span className="text-[#003366] dark:text-white font-montserrat font-bold">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3">
        <motion.div
          className="bg-gradient-to-r from-blue-600 to-blue-400 h-3 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, delay: 0.5 }}
        ></motion.div>
      </div>
    </div>
  );
}
