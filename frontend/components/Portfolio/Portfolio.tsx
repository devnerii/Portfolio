'use client';

import { useState } from 'react';
import Tilt from 'react-parallax-tilt';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Maximize2, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { FaHtml5, FaCss3Alt, FaJs, FaNodeJs } from 'react-icons/fa';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import ParticleBackground from './ParticleBackground'; // Certifique-se de usar o caminho correto

const projects = [
  {
    id: 1,
    key: 'skanderCapital',
    image: '/src/img/skander.png',
    link: 'https://skandercapital.com',
    libraries: [
      { icon: <FaHtml5 />, name: 'HTML5' },
      { icon: <FaCss3Alt />, name: 'CSS3' },
      { icon: <FaJs />, name: 'JavaScript' },
    ],
    description: 'Descrição detalhada do projeto Skander Capital.',
    category: 'Web Development',
  },
  {
    id: 2,
    key: 'safexBroker',
    image: '/src/img/projeto2.png',
    link: 'https://sfxbroker.com',
    libraries: [
      { icon: <FaJs />, name: 'JavaScript' },
      { icon: <FaNodeJs />, name: 'Node.js' },
    ],
    description: 'Descrição detalhada do projeto Safex Broker.',
    category: 'Web Development',
  },
  // Adicione mais projetos conforme necessário
];

export default function PortfolioGallery() {
  const { t } = useTranslation('common');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects =
    selectedCategory === 'Todos'
      ? projects
      : projects.filter(
          (project) => t(`projects.${project.key}.category`) === selectedCategory
        );

  return (
    <section
      className="relative min-h-screen py-20 bg-gradient-to-b from-blue-900 via-blue-700 to-blue-500 dark:from-gray-800 dark:to-gray-900 transition-colors duration-500"
      id="projetos"
    >
      {/* Partículas de fundo com sombras intensificadas e animação */}
      <ParticleBackground />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título com tipografia forte e gradient text */}
        <header>
          <h1
            id="portfolio-title"
            className="text-6xl font-extrabold text-center mb-12 font-montserrat bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white dark:text-blue-200"
          >
            {t('portfolioTitle')}
          </h1>
        </header>

        {/* Categorias com botões elevados e animados, rolagem horizontal oculta em dispositivos móveis */}
        <nav
          className="flex justify-center mb-12 space-x-4 overflow-x-auto scrollbar-hide no-scrollbar"
          aria-label="Project Categories"
        >
          {['Todos', 'Web Development', 'Mobile Development', 'UI/UX Design'].map(
            (category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`relative px-6 py-3 rounded-full transition-transform transform hover:scale-105 text-lg font-semibold focus:outline-none shadow-md hover:shadow-xl ${
                  selectedCategory === category
                    ? 'bg-white text-[#003366] dark:bg-blue-300 dark:text-gray-900'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
                aria-label={`View projects for ${t(category)}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t(category)}
              </motion.button>
            )
          )}
        </nav>

        {/* Grid de Projetos com sombras aprimoradas usando Tilt e animações */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-full mx-auto"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <Tilt
                key={project.id}
                glareEnable={false}
                scale={1.02}
                transitionSpeed={250}
                tiltMaxAngleX={10}
                tiltMaxAngleY={10}
                className="rounded-xl"
              >
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <ProjectCard
                    project={project}
                    setSelectedProject={setSelectedProject}
                  />
                </motion.div>
              </Tilt>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Modal do Projeto */}
        <AnimatePresence>
          {selectedProject && (
            <Modal
              project={selectedProject}
              close={() => setSelectedProject(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function ProjectCard({ project, setSelectedProject }) {
  const { t } = useTranslation('common');

  return (
    <div
      className="relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 transition-opacity duration-300 shadow-lg hover:shadow-2xl"
      style={{
        boxShadow: '0 40px 80px rgba(0, 0, 0, 0.8)', // Sombras muito mais profundas
      }}
      aria-labelledby={`project-title-${project.id}`}
    >
      {/* Imagem do Projeto sem efeito de escala ao passar o mouse */}
      <div className="relative">
        <Image
          src={project.image}
          alt={`Screenshot of ${t(`projects.${project.key}.title`)}`}
          width={400}
          height={300}
          className="w-full h-64 object-cover rounded-t-xl transition-opacity duration-500"
        />
        {/* Removido o overlay que escurecia a imagem ao passar o mouse */}
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={() => setSelectedProject(project)}
            className="relative p-4 bg-white dark:bg-gray-700 rounded-full text-[#003366] dark:text-blue-300 transition-transform transform hover:scale-110 shadow-lg hover:shadow-2xl"
            aria-label={t('openDetails', {
              project: t(`projects.${project.key}.title`),
            })}
          >
            <Maximize2 className="w-6 h-6" />
            {/* Camada adicional para efeito 3D */}
            <span className="absolute inset-0 rounded-full bg-white dark:bg-gray-700 opacity-0 hover:opacity-50"></span>
          </button>
        </div>
      </div>
      {/* Informações do Projeto com sombras e tipografia aprimorada */}
      <div className="p-6">
        <h2
          id={`project-title-${project.id}`}
          className="text-2xl font-bold mb-2 font-montserrat text-[#003366] dark:text-blue-300"
        >
          {t(`projects.${project.key}.title`)}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 font-open-sans mb-4">
          {t('category')}: {t(`projects.${project.key}.category`)}
        </p>
        {/* Bibliotecas usadas com micro-animações */}
        <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300 font-open-sans">
          <span>{t('libs')}:</span>
          {project.libraries.map((lib, index) => (
            <div
              key={index}
              className="text-2xl transform transition-transform duration-300 hover:scale-125 hover:rotate-12"
              title={lib.name}
            >
              {lib.icon}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Modal({ project, close }) {
  const { t } = useTranslation('common');
  return (
    <motion.div
      onClick={close}
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50"
      aria-labelledby={`modal-title-${project.id}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-full sm:max-w-lg w-full bg-white dark:bg-gray-800 rounded-xl overflow-hidden transform transition-transform duration-300 shadow-2xl"
        style={{
          boxShadow: '0 40px 80px rgba(0, 0, 0, 0.8)', // Sombras muito mais profundas
        }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
      >
        {/* Imagem do Projeto no Modal com efeito de profundidade */}
        <div className="relative">
          <Image
            src={project.image}
            alt={`Screenshot of ${t(`projects.${project.key}.title`)}`}
            width={600}
            height={400}
            className="w-full h-56 object-cover rounded-t-xl"
          />
          <button
            onClick={close}
            className="absolute top-4 right-4 p-3 rounded-full bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300 transform hover:scale-125 shadow-lg hover:shadow-2xl"
            aria-label={t('close')}
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        {/* Conteúdo do Modal com sombras e tipografia aprimorada */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2
              id={`modal-title-${project.id}`}
              className="text-3xl font-extrabold font-montserrat text-[#003366] dark:text-blue-300"
            >
              {t(`projects.${project.key}.title`)}
            </h2>
            {/* Ícone de link externo ao lado do título com animação de rotação */}
            <Link href={project.link} target="_blank" rel="noopener noreferrer">
              <motion.div
                className="ml-4 p-3 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300 transform"
                aria-label={t('visitWebsite', {
                  project: t(`projects.${project.key}.title`),
                })}
                whileHover={{                 rotate: 360 }}
                transition={{ duration: 0.5 }}
                style={{
                  boxShadow: '0 15px 45px rgba(0, 0, 0, 0.7)', // Sombras muito mais profundas e escuras
                }}
              >
                <ExternalLink className="w-6 h-6 text-[#003366] dark:text-blue-300" />
              </motion.div>
            </Link>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-4 font-open-sans">
            {t('category')}: {t(`projects.${project.key}.category`)}
          </p>
          {/* Bibliotecas usadas no modal com animações */}
          <div className="flex items-center space-x-3 mb-4 text-gray-600 dark:text-gray-300 font-open-sans">
            <span>{t('libs')}:</span>
            {project.libraries.map((lib, index) => (
              <div
                key={index}
                className="text-2xl transform transition-transform duration-300 hover:scale-125"
                title={lib.name}
              >
                {lib.icon}
              </div>
            ))}
          </div>
          <div className="overflow-y-auto max-h-32">
            <p className="text-gray-600 dark:text-gray-400 font-open-sans leading-relaxed">
              {t(`projects.${project.key}.description`)}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
               