'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, ChevronRight, Search } from 'lucide-react';
import Image from 'next/image';

const blogPosts = [
  {
    id: 1,
    title: "10 Tendências de Design Web para 2023",
    summary: "Descubra as principais tendências que estão moldando o design web neste ano e como implementá-las em seus projetos.",
    date: "2023-05-15",
    readTime: "5 min",
    category: "Design",
    image: "/placeholder.svg?height=200&width=300"
  },
  {
    id: 2,
    title: "Guia Completo de SEO para Iniciantes",
    summary: "Aprenda os fundamentos do SEO e comece a melhorar o ranking do seu site nos mecanismos de busca com estas dicas práticas.",
    date: "2023-05-10",
    readTime: "8 min",
    category: "Marketing",
    image: "/placeholder.svg?height=200&width=300"
  },
  {
    id: 3,
    title: "Como Otimizar a Performance do seu Site",
    summary: "Técnicas e ferramentas para melhorar a velocidade e a eficiência do seu site, proporcionando uma melhor experiência ao usuário.",
    date: "2023-05-05",
    readTime: "6 min",
    category: "Desenvolvimento",
    image: "/placeholder.svg?height=200&width=300"
  },
  {
    id: 4,
    title: "Inteligência Artificial no Design de UX",
    summary: "Explore como a IA está revolucionando o design de experiência do usuário e como você pode incorporá-la em seus projetos.",
    date: "2023-04-30",
    readTime: "7 min",
    category: "UX",
    image: "/placeholder.svg?height=200&width=300"
  },
  {
    id: 5,
    title: "Estratégias de Content Marketing para 2023",
    summary: "Descubra as estratégias de marketing de conteúdo mais eficazes para aumentar o engajamento e as conversões este ano.",
    date: "2023-04-25",
    readTime: "9 min",
    category: "Marketing",
    image: "/placeholder.svg?height=200&width=300"
  },
  {
    id: 6,
    title: "Introdução ao React Hooks",
    summary: "Um guia passo a passo para entender e começar a usar React Hooks em seus projetos de desenvolvimento web.",
    date: "2023-04-20",
    readTime: "10 min",
    category: "Desenvolvimento",
    image: "/placeholder.svg?height=200&width=300"
  }
]

const categories = ["Todos", "Design", "Marketing", "Desenvolvimento", "UX"];

export default function BlogListSection() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredPost, setHoveredPost] = useState(null);

  const filteredPosts = blogPosts.filter(
    (post) =>
      (selectedCategory === "Todos" || post.category === selectedCategory) &&
      (post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.summary.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-bold text-center mb-12 font-montserrat text-[#003366] dark:text-blue-300"
        >
          Nosso Blog
        </motion.h2>

        {/* Filtros e Pesquisa */}
        <div className="mb-12 flex flex-col md:flex-row justify-between items-center">
          {/* Categorias */}
          <div className="flex flex-wrap justify-center mb-4 md:mb-0">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full text-lg font-semibold m-1 transition-colors duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-blue-600 to-blue-400 text-white'
                    : 'bg-white dark:bg-gray-800 text-[#003366] dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>

          {/* Barra de Pesquisa */}
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Pesquisar artigos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-[#D1E8FF] dark:border-gray-600 rounded-full focus:outline-none focus:ring-4 focus:ring-blue-500 dark:focus:ring-blue-300 transition-all duration-300"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500 dark:text-gray-400" size={24} />
          </div>
        </div>

        {/* Grid de Artigos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredPosts.map((post) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
                className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-lg border border-[#D1E8FF] dark:border-gray-600 transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2"
                onMouseEnter={() => setHoveredPost(post.id)}
                onMouseLeave={() => setHoveredPost(null)}
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={400}
                    height={300}
                    className="w-full h-56 object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredPost === post.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-50 flex items-center justify-center"
                  >
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="bg-white dark:bg-gray-900 text-[#003366] dark:text-blue-300 px-6 py-3 rounded-full font-semibold shadow-lg"
                    >
                      Ler Mais
                    </motion.button>
                  </motion.div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 font-montserrat text-[#003366] dark:text-blue-300">
                    {post.title}
                  </h3>
                  <p className="text-[#555555] dark:text-gray-400 mb-4 font-open-sans">
                    {post.summary}
                  </p>
                  <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                      <Calendar size={18} className="mr-1" />
                      {new Date(post.date).toLocaleDateString('pt-BR')}
                    </div>
                    <div className="flex items-center">
                      <Clock size={18} className="mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                </div>
                <div className="px-6 py-4 bg-[#F8FBFF] dark:bg-gray-700 border-t border-[#D1E8FF] dark:border-gray-600">
                  <span className="inline-block bg-blue-100 dark:bg-gray-600 rounded-full px-3 py-1 text-sm font-semibold text-[#003366] dark:text-gray-300">
                    {post.category}
                  </span>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {/* Mensagem de nenhum artigo encontrado */}
        {filteredPosts.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center text-gray-500 dark:text-gray-400 mt-8"
          >
            Nenhum artigo encontrado. Tente uma pesquisa diferente.
          </motion.p>
        )}

        {/* Botão de Ver Mais Artigos */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-8 py-4 rounded-full font-semibold inline-flex items-center transition-colors duration-300 hover:from-blue-500 hover:to-blue-300"
          >
            Ver Mais Artigos
            <ChevronRight className="ml-2" size={24} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}