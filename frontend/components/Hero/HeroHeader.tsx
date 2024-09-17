"use client";

import { Montserrat } from "next/font/google";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaArrowDown } from "react-icons/fa";
import { useState } from "react";
import { useTranslation } from "next-i18next";
import Head from "next/head";

// Importando a fonte Montserrat com o peso 700
const montserrat = Montserrat({ subsets: ["latin"], weight: ["700"] });

export default function HeroHeader() {
  const [hovering, setHovering] = useState(false);
  const { t } = useTranslation("common");

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Head>
        <title>{t("page_title")}</title>
        <meta name="description" content={t("page_description")} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://www.seusite.com" />
        <meta property="og:title" content={t("page_title")} />
        <meta property="og:description" content={t("page_description")} />
        <meta property="og:url" content="https://www.seusite.com" />
        <meta property="og:image" content="/src/img/daniel.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t("page_title")} />
        <meta name="twitter:description" content={t("page_description")} />
        <meta name="twitter:image" content="/src/img/daniel.png" />
      </Head>
      <section
        id="home"
        className="relative w-full min-h-screen flex flex-col bg-gradient-to-b from-blue-500 via-blue-600 to-blue-700 dark:from-gray-800 dark:via-gray-900 dark:to-black overflow-hidden transition-colors duration-300"
        aria-labelledby="hero-heading"
      >
        <div className="image-container absolute inset-0 w-full h-full drop-shadow-lg z-0 mt-8 lg:mt-14">
          <Image
            src="/src/img/daniel.png"
            alt="Daniel Neri"
            fill
            style={{ objectPosition: "top" }}
            quality={100}
            priority
            className="w-full h-full sm:max-w-full md:max-w-full lg:max-w-full xl:max-w-full 2xl:max-w-full"
          />
        </div>

        {/* Sobreposição de Gradiente para Melhor Contraste */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-30 z-10"></div>

        {/* Conteúdo Principal Posicionado um Pouco Acima do Final */}
        <div className="relative z-20 w-full max-w-6xl mx-auto px-4 pb-16 flex-grow flex flex-col justify-end">
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            {/* Título Animado */}
            <motion.h1
              id="hero-heading"
              className={`${montserrat.className} text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-7xl 2xl:text-8xl font-extrabold text-white`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              {t("fullstack_dev")}
            </motion.h1>

            {/* Botão de Ação */}
            <motion.button
              onClick={() => scrollToSection("projetos")}
              className="flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-400 text-white hover:from-blue-500 hover:to-blue-300 transition-colors duration-300 text-md sm:text-lg md:text-xl lg:text-2xl xl:text-2xl 2xl:text-3xl px-4 sm:px-6 py-3 rounded-full shadow-lg transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={t("learn_more")}
            >
              {t("learn_more")}
              <FaArrowDown className="ml-2 animate-bounce" />
            </motion.button>
          </div>
        </div>

        {/* Marquee */}
        <div className="absolute bottom-0 left-0 w-full z-50 overflow-hidden">
          <div className="relative w-full py-2 bg-gradient-to-r from-blue-600 to-blue-400">
            <div className="marquee-content flex space-x-8 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-white">
              <span>{t("landing_pages")}</span>
              <span>•</span>
              <span>{t("frontend_apps")}</span>
              <span>•</span>
              <span>{t("responsive_design")}</span>
              <span>•</span>
              <span>{t("api_development")}</span>
              <span>•</span>
              <span>{t("database_integration")}</span>
              <span>•</span>
              <span>{t("mobile_development")}</span>
              <span>•</span>
              <span>{t("seo_optimization")}</span>
              <span>•</span>
              <span>{t("web_systems")}</span>
              <span>•</span>
              <span>{t("performance_improvement")}</span>
              <span>•</span>

              {/* Duplicação automática para efeito contínuo */}
              <span>{t("landing_pages")}</span>
              <span>•</span>
              <span>{t("frontend_apps")}</span>
              <span>•</span>
              <span>{t("responsive_design")}</span>
              <span>•</span>
              <span>{t("api_development")}</span>
              <span>•</span>
              <span>{t("database_integration")}</span>
              <span>•</span>
              <span>{t("mobile_development")}</span>
              <span>•</span>
              <span>{t("seo_optimization")}</span>
              <span>•</span>
              <span>{t("web_systems")}</span>
              <span>•</span>
              <span>{t("performance_improvement")}</span>
              <span>•</span>
            </div>
          </div>
        </div>

        {/* Blobs Animados */}
        <motion.div
          className="absolute bottom-5 left-5 w-12 h-12 sm:w-10 sm:h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 xl:w-20 xl:h-20 2xl:w-24 2xl:h-24 bg-blue-700 dark:bg-gray-700 rounded-full mix-blend-multiply filter blur-2xl opacity-50"
          animate={{ scale: hovering ? 1.5 : 1 }}
          transition={{ duration: 0.5 }}
          onHoverStart={() => setHovering(true)}
          onHoverEnd={() => setHovering(false)}
          aria-hidden="true"
        ></motion.div>
        <motion.div
          className="absolute top-5 right-5 w-12 h-12 sm:w-10 sm:h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 xl:w-20 xl:h-20 2xl:w-24 2xl:h-24 bg-green-500 dark:bg-gray-600 rounded-full mix-blend-multiply filter blur-2xl opacity-70"
          animate={{ scale: hovering ? 1.5 : 1 }}
          transition={{ duration: 0.5 }}
          onHoverStart={() => setHovering(true)}
          onHoverEnd={() => setHovering(false)}
          aria-hidden="true"
        ></motion.div>
        <motion.div
          className="absolute bottom-20 right-10 w-48 sm:w-40 sm:h-40 md:w-44 md:h-44 lg:w-52 lg:h-52 xl:w-60 xl:h-60 2xl:w-72 2xl:h-72 bg-purple-500 dark:bg-gray-500 rounded-full mix-blend-multiply filter blur-2xl opacity-60"
          animate={{ scale: hovering ? 1.5 : 1 }}
          transition={{ duration: 0.5 }}
          onHoverStart={() => setHovering(true)}
          onHoverEnd={() => setHovering(false)}
          aria-hidden="true"
        ></motion.div>

        {/* Estilos customizados para animações */}
        <style jsx>{`
          @keyframes marquee {
            0% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .marquee-content {
            display: inline-flex;
            animation: marquee 60s linear infinite;
            white-space: nowrap;
          }
        `}</style>
      </section>
    </>
  );
}