"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useTranslation } from "next-i18next";

const testimonials = [
  {
    id: 1,
    nameKey: "testimonials.jorge.name",
    companyKey: "testimonials.jorge.company",
    quoteKey: "testimonials.jorge.quote",
    avatar: "/src/img/jorge.jpg",
  },
  {
    id: 2,
    nameKey: "testimonials.paola.name",
    companyKey: "testimonials.paola.company",
    quoteKey: "testimonials.paola.quote",
    avatar: "/src/img/paola.png",
  },
  {
    id: 3,
    nameKey: "testimonials.renato.name",
    companyKey: "testimonials.renato.company",
    quoteKey: "testimonials.renato.quote",
    avatar: "/src/img/renato.jpg",
  },
];

const slideFade = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.3 },
    },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 100 : -100,
    opacity: 0,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.3 },
    },
  }),
};

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const { t } = useTranslation();

  const navigate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) =>
      newDirection === -1
        ? prevIndex === 0
          ? testimonials.length - 1
          : prevIndex - 1
        : (prevIndex + 1) % testimonials.length
    );
  };

  return (
    <>
      <section
        id="testimonials"
        className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 bg-gradient-to-b from-blue-300 via-blue-300 to-blue-300 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
          <motion.h2
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center mb-12 sm:mb-16 md:mb-20 font-montserrat bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent dark:text-blue-200"
            aria-label={t("common.testimonialsHeading")}
          >
            {t("common.testimonialsHeading")}
          </motion.h2>

          <div className="relative max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto h-80 sm:h-96 md:h-[28rem] lg:h-[26rem] xl:h-[30rem] 2xl:h-[32rem]">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={testimonials[currentIndex]?.id}
                custom={direction}
                variants={slideFade}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute w-full h-full flex items-center justify-center"
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
              >
                <div className="bg-white/40 dark:bg-gray-800 rounded-3xl shadow-xl p-6 sm:p-8 md:p-10 lg:p-10 xl:p-12 backdrop-blur-lg w-full flex items-center justify-center">
                  <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4 md:space-y-6 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl">
                    <motion.div>
                      <Quote
                        className="w-10 sm:w-12 md:w-14 lg:w-14 xl:w-16 2xl:w-20 h-10 sm:h-12 md:h-14 lg:h-14 xl:h-16 2xl:h-20 text-[#003366] dark:text-blue-300"
                        aria-hidden="true"
                      />
                    </motion.div>
                    <motion.p
                      className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl italic text-blue-950 dark:text-gray-300 font-open-sans mb-2 sm:mb-4 md:mb-6 leading-relaxed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      &ldquo;{t(testimonials[currentIndex]?.quoteKey)}&rdquo;
                    </motion.p>
                    <motion.img
                      src={testimonials[currentIndex]?.avatar}
                      alt={t(testimonials[currentIndex]?.nameKey)}
                      className="w-16 sm:w-20 md:w-24 lg:w-28 xl:w-32 2xl:w-36 h-16 sm:h-20 md:h-24 lg:h-28 xl:h-32 2xl:h-36 rounded-full mb-1 sm:mb-2 md:mb-4 border-2 sm:border-4 border-blue-100 dark:border-blue-300 object-cover"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-semibold text-[#003366] dark:text-blue-300 font-montserrat">
                      {t(testimonials[currentIndex]?.nameKey)}
                    </h3>
                    <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-blue-950 dark:text-gray-400 font-open-sans">
                      {t(testimonials[currentIndex]?.companyKey)}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navegação */}
            <div className="absolute inset-0 flex justify-between items-center px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
              <motion.button
                onClick={() => navigate(-1)}
                className="bg-blue-100 dark:bg-blue-300 text-[#003366] dark:text-gray-900 rounded-full p-2 sm:p-3 md:p-4 lg:p-5 xl:p-6 2xl:p-7 shadow-lg z-10"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 sm:w-5 md:w-6 lg:w-8 xl:w-10 2xl:w-12 h-4 sm:h-5 md:h-6 lg:h-8 xl:h-10 2xl:h-12" />
              </motion.button>
              <motion.button
                onClick={() => navigate(1)}
                className="bg-blue-100 dark:bg-blue-300 text-[#003366] dark:text-gray-900 rounded-full p-2 sm:p-3 md:p-4 lg:p-5 xl:p-6 2xl:p-7 shadow-lg z-10"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-4 sm:w-5 md:w-6 lg:w-8 xl:w-10 2xl:w-12 h-4 sm:h-5 md:h-6 lg:h-8 xl:h-10 2xl:h-12" />
              </motion.button>
            </div>
          </div>

          {/* Indicadores */}
          <div className="flex justify-center mt-6 sm:mt-8 md:mt-10 lg:mt-12 xl:mt-14 2xl:mt-16 space-x-2 sm:space-x-3 md:space-x-4 lg:space-x-5 xl:space-x-6 2xl:space-x-8">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => navigate(index > currentIndex ? 1 : -1)}
                className={`w-2 sm:w-3 md:w-4 lg:w-5 xl:w-6 2xl:w-8 h-2 sm:h-3 md:h-4 lg:h-5 xl:h-6 2xl:h-8 rounded-full transition-colors duration-300 ${
                  index === currentIndex
                    ? "bg-blue-500 dark:bg-blue-300"
                    : "bg-gray-300 dark:bg-gray-600"
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}