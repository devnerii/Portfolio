'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Palette, Smartphone, Globe, Zap, Users } from 'lucide-react';

const services = [
  {
    icon: Code,
    title: 'Desenvolvimento Web',
    description: 'Criamos sites responsivos e aplicações web de alta performance.',
  },
  {
    icon: Palette,
    title: 'Design UI/UX',
    description: 'Designs intuitivos e atraentes que encantam os usuários.',
  },
  {
    icon: Smartphone,
    title: 'Desenvolvimento Mobile',
    description: 'Aplicativos móveis nativos e híbridos para iOS e Android.',
  },
  {
    icon: Globe,
    title: 'SEO',
    description: 'Otimização para mecanismos de busca para aumentar sua visibilidade online.',
  },
  {
    icon: Zap,
    title: 'Performance',
    description: 'Otimização de velocidade e desempenho para suas aplicações.',
  },
  {
    icon: Users,
    title: 'Consultoria',
    description: 'Aconselhamento especializado em estratégias digitais e tecnológicas.',
  },
];

export default function ServicesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      className="py-20 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-500"
      id="services"
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Título com Animação */}
        <motion.h2
          className="text-5xl font-bold text-center mb-16 font-montserrat text-[#003366] dark:text-blue-200"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Nossos Serviços
        </motion.h2>

        {/* Grid de Serviços */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isHovered = hoveredIndex === index;

            return (
              <motion.div
                key={service.title}
                className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transform transition-transform duration-500 hover:scale-105"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Efeito de Brilho no Hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r from-[#003366] to-blue-500 dark:from-blue-200 dark:to-blue-400 opacity-0 ${
                    isHovered ? 'opacity-20' : ''
                  } transition-opacity duration-500`}
                ></div>
                {/* Conteúdo do Serviço */}
                <div className="p-8">
                  <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-blue-100 dark:bg-gray-700 rounded-full transform transition-transform duration-500">
                    <Icon
                      className={`w-10 h-10 text-[#003366] dark:text-blue-200 ${
                        isHovered ? 'animate-pulse' : ''
                      }`}
                    />
                  </div>
                  <h3 className="text-2xl font-montserrat font-semibold text-center mb-4 text-[#003366] dark:text-blue-200">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-center font-open-sans">
                    {service.description}
                  </p>
                </div>
                {/* Botão Saiba Mais */}
                <div className="flex justify-center mb-6">
                  <motion.button
                    className="mt-4 px-6 py-3 bg-[#003366] dark:bg-blue-300 text-white dark:text-gray-900 rounded-full font-semibold hover:bg-[#002244] dark:hover:bg-blue-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#003366] dark:focus:ring-blue-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Saiba Mais
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
