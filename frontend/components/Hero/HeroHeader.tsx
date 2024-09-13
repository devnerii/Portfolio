'use client'

import { Montserrat, Open_Sans } from 'next/font/google';
import { motion } from 'framer-motion';
import { FaArrowRight, FaPlay } from 'react-icons/fa';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['700'] });
const openSans = Open_Sans({ subsets: ['latin'], weight: ['400'] });

export default function HeroSection() {
  return (
    <div className="relative w-full min-h-[100vh] bg-gradient-to-b from-blue-500 via-blue-600 to-blue-700 dark:from-gray-800 dark:via-gray-900 dark:to-black flex items-center justify-center overflow-hidden transition-colors duration-300">
      {/* Background Animation */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          className="w-full h-full object-cover opacity-20"
        >
          <source src="/background-video.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8 text-center">
        <motion.h1
          className={`${montserrat.className} text-5xl sm:text-6xl md:text-7xl font-extrabold text-white mb-6`}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Bem-vindo ao Nosso Site
        </motion.h1>
        <motion.p
          className={`${openSans.className} text-xl sm:text-2xl md:text-3xl text-white mb-10 max-w-2xl mx-auto`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Descubra soluções inovadoras para impulsionar o seu negócio e alcançar novos patamares de sucesso.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <motion.a
            href="#about-me"
            className="flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-400 text-white hover:from-blue-500 hover:to-blue-300 transition-colors duration-300 text-lg px-8 py-4 rounded-full shadow-lg transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Comece Agora
            <FaArrowRight className="ml-2" />
          </motion.a>
          <motion.button
            className="flex items-center justify-center bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white transition-colors duration-300 text-lg px-8 py-4 rounded-full shadow-lg transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaPlay className="mr-2" />
            Assista ao Vídeo
          </motion.button>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-700 dark:bg-gray-700 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-bounce-slow"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 dark:bg-gray-600 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-bounce-slow"></div>
      <div className="absolute bottom-10 right-10 w-24 h-24 bg-blue-300 dark:bg-gray-500 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-bounce"></div>
    </div>
  );
}
