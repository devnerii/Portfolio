'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2 } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

const projects = [
  { id: 1, title: 'Website Corporativo', category: 'Web', image: '/images/project1.jpg' },
  { id: 2, title: 'Aplicativo Mobile', category: 'Mobile', image: '/images/project2.jpg' },
  { id: 3, title: 'Design Gráfico', category: 'Design', image: '/images/project3.jpg' },
  { id: 4, title: 'E-commerce', category: 'Web', image: '/images/project4.jpg' },
  { id: 5, title: 'App de Fitness', category: 'Mobile', image: '/images/project5.jpg' },
  { id: 6, title: 'Branding', category: 'Design', image: '/images/project6.jpg' },
];

const categories = ['Todos', 'Web', 'Mobile', 'Design'];

export default function PortfolioGallery() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects =
    selectedCategory === 'Todos'
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  return (
    <section
      className="min-h-screen py-20 bg-gradient-to-b from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 transition-colors duration-500"
      id="portfolio"
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Título */}
        <motion.h2
          className="text-5xl font-bold text-center mb-12 font-montserrat text-[#003366] dark:text-blue-300"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Meu Portfólio
        </motion.h2>

        {/* Categorias */}
        <div className="flex justify-center mb-12 space-x-4">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full transition-colors duration-300 text-lg font-semibold shadow-md focus:outline-none ${
                selectedCategory === category
                  ? 'bg-[#003366] text-white dark:bg-blue-300 dark:text-gray-900'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Grid de Projetos */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                setSelectedProject={setSelectedProject}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Modal do Projeto */}
        <AnimatePresence>
          {selectedProject && (
            <Modal project={selectedProject} close={() => setSelectedProject(null)} />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function ProjectCard({ project, setSelectedProject }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-lg shadow-lg bg-white dark:bg-gray-800 transform hover:scale-105 transition-transform duration-300 group"
    >
      {/* Imagem do Projeto */}
      <div className="relative">
        <Image
          src={project.image}
          alt={project.title}
          width={400}
          height={300}
          className="w-full h-64 object-cover rounded-t-lg transition-transform duration-500 group-hover:scale-110"
        />
        {/* Overlay com Botão */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-500"
        >
          <motion.button
            onClick={() => setSelectedProject(project)}
            className="p-3 bg-white dark:bg-gray-700 rounded-full text-[#003366] dark:text-blue-300 shadow-lg transform hover:scale-110 transition-transform duration-300"
            whileHover={{ rotate: 360 }}
          >
            <Maximize2 className="w-6 h-6" />
          </motion.button>
        </motion.div>
      </div>
      {/* Informações do Projeto */}
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2 font-montserrat text-[#003366] dark:text-blue-300">
          {project.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 font-open-sans">
          Categoria: {project.category}
        </p>
      </div>
      {/* Efeito Decorativo */}
      <div className="absolute -bottom-1 -right-1 w-20 h-20 bg-gradient-to-tr from-[#003366] to-blue-500 dark:from-blue-300 dark:to-blue-500 rounded-full opacity-30 pointer-events-none"></div>
    </motion.div>
  );
}

function Modal({ project, close }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={close}
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-4xl w-full bg-white dark:bg-gray-800 rounded-lg shadow-2xl overflow-hidden"
      >
        {/* Imagem do Projeto no Modal */}
        <div className="relative">
          <Image
            src={project.image}
            alt={project.title}
            width={800}
            height={600}
            className="w-full h-96 object-cover"
          />
          <button
            onClick={close}
            className="absolute top-4 right-4 p-2 rounded-full bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        {/* Conteúdo do Modal */}
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-4 font-montserrat text-[#003366] dark:text-blue-300">
            {project.title}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6 font-open-sans">
            Categoria: {project.category}
          </p>
          <p className="text-gray-600 dark:text-gray-400 font-open-sans leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac venenatis erat.
            Suspendisse potenti. Sed ac risus in sem viverra bibendum non quis justo. Praesent
            tristique euismod sapien, non scelerisque risus tincidunt eu.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
