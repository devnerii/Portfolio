'use client';

import { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { FiChevronDown } from 'react-icons/fi';
import Flag from 'react-world-flags';
import LogoSVG from './LogoSVG';

export default function HeaderMain() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const { t } = useTranslation('common');
  const router = useRouter();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const changeLanguage = (locale: string) => {
    router.push(router.pathname, router.asPath, { locale });
    setShowLanguageMenu(false);
  };

  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleSmoothScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  const menuItems = [
    { id: 'home', label: 'home' },
    { id: 'sobre', label: 'about' },
    { id: 'servicos', label: 'services' },
    { id: 'contato', label: 'contact' }
  ];

  return (
    <>
      <header id="home" className="absolute top-0 left-0 w-full z-50 bg-transparent">
        <nav className="w-full bg-transparent" aria-label="Main Navigation">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              {/* Logo */}
              <div className="flex items-center space-x-4">
                <Link href="/" className="flex items-center space-x-2" aria-label="Home">
                  <motion.div
                    className="w-full h-auto max-w-full sm:max-w-full lg:max-w-6xl"
                    whileHover={{ scale: 1.05 }}
                  >
                    <LogoSVG />
                  </motion.div>
                </Link>
              </div>

              {/* Menu Desktop */}
              <div className="hidden md:flex items-center space-x-8">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSmoothScroll(item.id)}
                    className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl 2xl:text-xl font-medium text-white dark:text-white hover:text-green-400 transition duration-300 dark:hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 dark:focus:ring-blue-400"
                    aria-label={capitalize(t(item.label))}
                  >
                    {capitalize(t(item.label))}
                  </button>
                ))}
              </div>

              {/* Ações */}
              <div className="flex items-center space-x-4 relative">
                {/* Seleção de Idioma */}
                <div className="relative hidden md:block">
                  <motion.button
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 dark:focus:ring-gray-700"
                    whileHover={{ rotate: 360 }}
                    onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                    aria-label="Change Language"
                  >
                    <FiChevronDown className="w-5 h-5 text-white hidden md:block" />
                  </motion.button>
                  {showLanguageMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute left-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="language-menu"
                    >
                      <button
                        onClick={() => changeLanguage('pt')}
                        className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 w-full"
                        role="menuitem"
                      >
                        <Flag code="BRA" className="w-5 h-5" alt="Portuguese" />
                        <span className="text-black dark:text-white">Português</span>
                      </button>
                      <button
                        onClick={() => changeLanguage('en')}
                        className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 w-full"
                        role="menuitem"
                      >
                        <Flag code="USA" className="w-5 h-5" alt="English" />
                        <span className="text-black dark:text-white">English</span>
                      </button>
                      <button
                        onClick={() => changeLanguage('es')}
                        className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 w-full"
                        role="menuitem"
                      >
                        <Flag code="ESP" className="w-5 h-5" alt="Spanish" />
                        <span className="text-black dark:text-white">Español</span>
                      </button>
                    </motion.div>
                  )}
                </div>

                {/* Modo Escuro/Claro */}
                <motion.button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 dark:focus:ring-gray-700"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  aria-label="Toggle dark mode"
                >
                  {isDarkMode ? <Sun className="w-5 h-5 sm:w-6 sm:h-6 text-white" /> : <Moon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />}
                </motion.button>

                {/* Botão do Menu Mobile */}
                <div className="md:hidden">
                  <motion.button
                    className="outline-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 dark:focus:ring-gray-700"
                    onClick={toggleMenu}
                    whileHover={{ scale: 1.2 }}
                    transition={{ duration: 0.3 }}
                    aria-label="Toggle menu"
                  >
                    {isOpen ? <FaTimes className="w-6 h-6 text-white dark:text-white" /> : <FaBars className="w-6 h-6 text-white dark:text-white" />}
                  </motion.button>
                </div>
              </div>
            </div>
          </div>

          {/* Menu Mobile */}
          <motion.div
            className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-white dark:bg-gray-900 transition-all duration-300 rounded-lg shadow-lg`}
            initial={{ opacity: 0 }}
            animate={{ opacity: isOpen ? 1 : 0 }}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="mobile-menu"
          >
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSmoothScroll(item.id)}
                className="block py-3 px-6 text-black hover:bg-green-500 dark:text-white dark:hover:bg-blue-700 hover:text-white transition duration-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-blue-700"
                role="menuitem"
                aria-label={capitalize(t(item.label))}
              >
                {capitalize(t(item.label))}
              </button>
            ))}
            {/* Menu de Seleção de Idioma no Mobile */}
            <div className="flex flex-col items-start px-6 py-3">
              <button
                onClick={() => changeLanguage('pt')}
                className="flex items-center space-x-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-100 dark:focus:ring-gray-700"
                role="menuitem"
              >
                <Flag code="BRA" className="w-5 h-5" alt="Portuguese" />
                <span className="text-black dark:text-white">Português</span>
              </button>
              <button
                onClick={() => changeLanguage('en')}
                className="flex items-center space-x-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-100 dark:focus:ring-gray-700"
                role="menuitem"
              >
                <Flag code="USA" className="w-5 h-5" alt="English" />
                <span className="text-black dark:text-white">English</span>
              </button>
              <button
                onClick={() => changeLanguage('es')}
                className="flex items-center space-x-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-100 dark:focus:ring-gray-700"
                role="menuitem"
              >
                <Flag code="ESP" className="w-5 h-5" alt="Spanish" />
                <span className="text-black dark:text-white">Español</span>
              </button>
            </div>
          </motion.div>
        </nav>
      </header>
    </>
  );
}