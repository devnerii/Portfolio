// C:\Users\dnnxz\Downloads\Portfolio\frontend\components\Hero\HeroHeader.tsx
import { Montserrat } from "next/font/google";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaArrowDown } from "react-icons/fa";
import { useState } from "react";

// Importar a fonte Montserrat com o peso 700
const montserrat = Montserrat({ subsets: ["latin"], weight: ["700"] });

export default function HeroHeader() {
  const [hovering, setHovering] = useState(false);

  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex flex-col bg-gradient-to-b from-blue-500 via-blue-600 to-blue-700 dark:from-gray-800 dark:via-gray-900 dark:to-black overflow-hidden transition-colors duration-300"
    >
      {/* Imagem de Fundo com Sombra */}
      <div className="absolute inset-0 max-w-full max-h-full drop-shadow-lg mt-6 z-0">
        <Image
          src="/src/img/daniel.png" // Substitua com o caminho correto da imagem
          alt="Daniel Neri"
          layout="fill"
          objectFit="contain" // Ajusta para conter a imagem no espaço definido
          quality={100}
          priority={true}
          className="opacity-100 dark:opacity-100"
        />
      </div>

      {/* Sobreposição de Gradiente para Melhor Contraste */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-30 z-10"></div>

      {/* Conteúdo Principal Posicionado um Pouco Acima do Final */}
      <div className="relative z-20 w-full max-w-6xl mx-auto px-4 pb-16 flex-grow flex flex-col justify-end">
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          {/* Título Animado */}
          <motion.h1
            className={`${montserrat.className} text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            DEV FULL STACK
          </motion.h1>

          {/* Botão de Ação */}
          <motion.a
            href="#sobre"
            className="flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-400 text-white hover:from-blue-500 hover:to-blue-300 transition-colors duration-300 text-lg px-6 py-3 rounded-full shadow-lg transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Conheça Mais
            <FaArrowDown className="ml-2 animate-bounce" />
          </motion.a>
        </div>
      </div>

      {/* Marquee */}
      <div className="absolute bottom-0 left-0 w-full z-50">
        <div className="marquee overflow-hidden whitespace-nowrap w-full py-2 bg-gradient-to-r from-blue-600 to-blue-400">
          <div className="marquee-content inline-block animate-marquee space-x-8 text-sm sm:text-base md:text-lg text-white">
            <span>Full Stack Dev</span>
            <span>•</span>
            <span>Criação de Landing Pages</span>
            <span>•</span>
            <span>Aplicações Front-End Modernas</span>
            <span>•</span>
            <span>Design Responsivo</span>
            <span>•</span>
            <span>Desenvolvimento de APIs</span>
            <span>•</span>
            <span>Integração com Banco de Dados</span>
            <span>•</span>
            <span>Desenvolvimento Mobile</span>
            <span>•</span>
            <span>Otimização para SEO</span>
            <span>•</span>
            <span>Desenvolvimento de Sistemas Web</span>
            <span>•</span>
            <span>Melhoria de Performance</span>
            <span>•</span>
          </div>
        </div>
      </div>

      {/* Linhas Decorativas Curvadas com Animação */}
      <div className="absolute top-96 left-0 w-full h-10 bg-gradient-to-r from-white to-transparent opacity-30 rounded-full z-[-10] animate-[moveCurve1_10s_infinite]"></div>
      <div className="absolute top-44 right-0 w-full h-20 bg-gradient-to-l from-white to-transparent opacity-20 rounded-full z-[-10] animate-[moveCurve2_8s_infinite]"></div>
      <div className="absolute bottom-10 left-0 w-full h-10 bg-gradient-to-r from-white to-transparent opacity-10 rounded-full z-[-10] animate-[moveCurve3_12s_infinite]"></div>

      {/* Blobs Animados */}
      <motion.div
        className="absolute bottom-5 left-5 w-12 h-12 bg-blue-700 dark:bg-gray-700 rounded-full mix-blend-multiply filter blur-2xl opacity-50"
        animate={{ scale: hovering ? 1.5 : 1 }}
        transition={{ duration: 0.5 }}
        onHoverStart={() => setHovering(true)}
        onHoverEnd={() => setHovering(false)}
      ></motion.div>
      <motion.div
        className="absolute top-5 right-5 w-12 h-12 bg-green-500 dark:bg-gray-600 rounded-full mix-blend-multiply filter blur-2xl opacity-70"
        animate={{ scale: hovering ? 1.5 : 1 }}
        transition={{ duration: 0.5 }}
        onHoverStart={() => setHovering(true)}
        onHoverEnd={() => setHovering(false)}
      ></motion.div>
      <motion.div
        className="absolute bottom-20 right-10 w-48 h-48 bg-purple-500 dark:bg-gray-500 rounded-full mix-blend-multiply filter blur-2xl opacity-60"
        animate={{ scale: hovering ? 1.5 : 1 }}
        transition={{ duration: 0.5 }}
        onHoverStart={() => setHovering(true)}
        onHoverEnd={() => setHovering(false)}
      ></motion.div>

      {/* Keyframes para animações de curva */}
      <style jsx>{`
        @keyframes moveCurve1 {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        @keyframes moveCurve2 {
          0% {
            transform: translateX(100%);
          }
          50% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        @keyframes moveCurve3 {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        @keyframes blob {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.5);
          }
        }
      `}</style>
    </section>
  );
}
