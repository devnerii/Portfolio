'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    quote:
      'A equipe superou todas as nossas expectativas. O projeto foi entregue antes do prazo e com qualidade excepcional.',
    name: 'Maria Silva',
    company: 'Tech Innovations',
    avatar: '/images/avatar1.jpg',
  },
  {
    id: 2,
    quote:
      'O profissionalismo e a criatividade da equipe transformaram nossa visão em realidade. Estamos extremamente satisfeitos com o resultado.',
    name: 'João Santos',
    company: 'Creative Solutions',
    avatar: '/images/avatar2.jpg',
  },
  {
    id: 3,
    quote:
      'A atenção aos detalhes e o suporte pós-projeto foram impressionantes. Recomendo seus serviços sem hesitação.',
    name: 'Ana Oliveira',
    company: 'Global Enterprises',
    avatar: '/images/avatar3.jpg',
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const navigate = (newDirection: number) => {
    setIsAutoPlaying(false);
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      if (newDirection === -1) {
        return prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1;
      } else {
        return (prevIndex + 1) % testimonials.length;
      }
    });
  };

  useEffect(() => {
    if (isAutoPlaying) {
      const timer = setTimeout(() => {
        setDirection(1);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, isAutoPlaying]);

  return (
    <section
      className="py-20 bg-gradient-to-b from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 transition-colors duration-500"
      id="testimonials"
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Título */}
        <motion.h2
          className="text-5xl font-bold text-center mb-16 font-montserrat text-[#003366] dark:text-blue-300"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Depoimentos
        </motion.h2>

        {/* Container do Testimonial */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={testimonials[currentIndex]?.id}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 300 : -300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -300 : 300 }}
              transition={{ duration: 0.6 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-12 md:p-16"
            >
              <div className="flex flex-col items-center text-center">
                <motion.div
                  className="mb-6"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 120, damping: 10 }}
                >
                  <Quote className="w-16 h-16 text-[#003366] dark:text-blue-300" />
                </motion.div>
                <p className="text-xl md:text-2xl italic text-gray-700 dark:text-gray-300 font-open-sans mb-8 leading-relaxed">
                  &ldquo;{testimonials[currentIndex]?.quote}&rdquo;
                </p>
                <motion.img
                  src={testimonials[currentIndex]?.avatar}
                  alt={testimonials[currentIndex]?.name}
                  className="w-24 h-24 rounded-full mb-4 border-4 border-[#003366] dark:border-blue-300 object-cover"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                />
                <h3 className="text-2xl font-semibold text-[#003366] dark:text-blue-300 font-montserrat">
                  {testimonials[currentIndex]?.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 font-open-sans">
                  {testimonials[currentIndex]?.company}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Botões de Navegação */}
          <div className="absolute inset-0 flex justify-between items-center px-4">
            <motion.button
              onClick={() => navigate(-1)}
              className="bg-[#003366] dark:bg-blue-300 text-white dark:text-gray-900 rounded-full p-3 shadow-lg hover:bg-[#002244] dark:hover:bg-blue-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#003366] dark:focus:ring-blue-300"
              whileHover={{ scale: 1.2, rotate: -10 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
            <motion.button
              onClick={() => navigate(1)}
              className="bg-[#003366] dark:bg-blue-300 text-white dark:text-gray-900 rounded-full p-3 shadow-lg hover:bg-[#002244] dark:hover:bg-blue-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#003366] dark:focus:ring-blue-300"
              whileHover={{ scale: 1.2, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>
        </div>

        {/* Dots de Indicação */}
        <div className="flex justify-center mt-12 space-x-2">
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => {
                setIsAutoPlaying(false);
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`w-4 h-4 rounded-full transition-colors duration-300 ${
                index === currentIndex
                  ? 'bg-[#003366] dark:bg-blue-300'
                  : 'bg-gray-300 dark:bg-gray-600 hover:bg-[#003366] dark:hover:bg-blue-300'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
