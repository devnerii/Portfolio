'use client';

import { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <>
      <nav
        className={`bg-white dark:bg-gray-900 bg-opacity-70 dark:bg-opacity-70 backdrop-blur-lg shadow-md w-full z-50 transition-colors duration-300`}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center py-1.5">
            {/* Logo e Título */}
            <div className="flex items-center space-x-7">
              <div>
                <a href="#" className="flex items-center space-x-2">
                  {/* SVG Logo diretamente no JSX */}
                  <div className="h-16 w-auto text-[#003366] dark:text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      width="64"
                      height="64"
                      viewBox="0 0 375 374.999991"
                      preserveAspectRatio="xMidYMid meet"
                      fill="currentColor"
                    >
                      <g fill="currentColor" fillOpacity="1">
                        <g transform="translate(142.850781, 267.133319)">
                          <g>
                            <path d="M 167.53125 24.140625 C 159.0625 26.785156 151.4375 27.257812 144.65625 25.5625 C 137.5625 23.65625 131.421875 20.691406 126.234375 16.671875 C 121.265625 12.648438 116.1875 7.832031 111 2.21875 L 27.3125 -90.515625 L 27.3125 -11.109375 C 27.414062 -7.410156 29.054688 -4.660156 32.234375 -2.859375 C 33.710938 -2.015625 35.300781 -1.59375 37 -1.59375 L 40.015625 -1.59375 L 40.015625 0 L 7.296875 0 L 7.296875 -1.59375 L 10.3125 -1.59375 C 12.96875 -1.59375 15.242188 -2.515625 17.140625 -4.359375 C 19.046875 -6.210938 20 -8.519531 20 -11.28125 L 20 -98.453125 C 19.476562 -99.191406 18.421875 -100.59375 16.828125 -102.65625 C 15.242188 -104.726562 13.921875 -106.394531 12.859375 -107.65625 C 11.796875 -108.925781 10.363281 -110.59375 8.5625 -112.65625 C 6.769531 -114.726562 5.101562 -116.398438 3.5625 -117.671875 C 2.03125 -118.941406 0.257812 -120.421875 -1.75 -122.109375 C -4.925781 -124.546875 -8.3125 -126.289062 -11.90625 -127.34375 C -15.507812 -128.40625 -18.554688 -128.9375 -21.046875 -128.9375 C -23.535156 -128.9375 -26.207031 -128.515625 -29.0625 -127.671875 L -29.703125 -129.265625 C -24.617188 -131.378906 -19.71875 -132.4375 -15 -132.4375 C -10.289062 -132.4375 -6.242188 -131.878906 -2.859375 -130.765625 C 0.523438 -129.660156 4.175781 -127.675781 8.09375 -124.8125 C 12.007812 -121.957031 15.210938 -119.3125 17.703125 -116.875 C 20.191406 -114.4375 23.179688 -111.257812 26.671875 -107.34375 L 106.703125 -18.421875 L 106.703125 -99.890625 C 106.597656 -102.640625 105.59375 -104.9375 103.6875 -106.78125 C 101.78125 -108.632812 99.503906 -109.5625 96.859375 -109.5625 L 93.84375 -109.5625 L 93.84375 -111.15625 L 126.5625 -111.15625 L 126.5625 -109.5625 L 123.703125 -109.5625 C 121.054688 -109.5625 118.78125 -108.632812 116.875 -106.78125 C 114.96875 -104.9375 113.960938 -102.691406 113.859375 -100.046875 L 113.859375 -10.328125 C 114.910156 -9.160156 116.414062 -7.410156 118.375 -5.078125 C 120.332031 -2.753906 121.707031 -1.113281 122.5 -0.15625 C 123.300781 0.789062 124.492188 2.164062 126.078125 3.96875 C 127.671875 5.769531 129.019531 7.171875 130.125 8.171875 C 131.238281 9.179688 132.613281 10.453125 134.25 11.984375 C 135.894531 13.523438 137.429688 14.742188 138.859375 15.640625 C 140.296875 16.535156 141.910156 17.566406 143.703125 18.734375 C 146.242188 20.222656 149.128906 21.335938 152.359375 22.078125 C 155.585938 22.816406 158.234375 23.1875 160.296875 23.1875 C 162.367188 23.1875 164.566406 22.972656 166.890625 22.546875 Z M 167.53125 24.140625 "/>
                          </g>
                        </g>
                      </g>
                      <g fill="currentColor" fillOpacity="1">
                        <g transform="translate(93.307998, 235.88332)">
                          <g>
                            <path d="M -15.875 -87.96875 C -12.8125 -96.96875 -7.675781 -103.160156 -0.46875 -106.546875 C 6.726562 -109.941406 19.484375 -111.640625 37.796875 -111.640625 C 41.609375 -111.640625 51.238281 -111.476562 66.6875 -111.15625 C 77.914062 -110.84375 87.816406 -108.410156 96.390625 -103.859375 C 104.960938 -99.304688 111.65625 -92.875 116.46875 -84.5625 C 121.289062 -76.25 123.703125 -66.585938 123.703125 -55.578125 C 123.703125 -38.953125 118.4375 -25.53125 107.90625 -15.3125 C 97.375 -5.101562 83.632812 0 66.6875 0 L 12.859375 0 L 13.015625 -1.59375 L 14.921875 -1.59375 C 17.566406 -1.59375 19.84375 -2.460938 21.75 -4.203125 C 23.65625 -5.953125 24.769531 -8.097656 25.09375 -10.640625 L 25.09375 -106.390625 C 11.851562 -106.078125 2.484375 -104.015625 -3.015625 -100.203125 C -5.867188 -98.191406 -8.035156 -96.257812 -9.515625 -94.40625 C -11.003906 -92.550781 -12.546875 -90.195312 -14.140625 -87.34375 Z M 35.40625 -106.390625 L 35.40625 -4.765625 L 66.6875 -4.765625 C 80.132812 -4.765625 91.015625 -9.421875 99.328125 -18.734375 C 107.640625 -28.054688 111.796875 -40.335938 111.796875 -55.578125 C 111.796875 -65.640625 109.914062 -74.503906 106.15625 -82.171875 C 102.394531 -89.847656 97.097656 -95.800781 90.265625 -100.03125 C 83.441406 -104.269531 75.582031 -106.390625 66.6875 -106.390625 Z M 35.40625 -106.390625 "/>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </div>
                </a>
              </div>
            </div>

            {/* Links de Navegação Desktop */}
            <div className="hidden md:flex items-center space-x-8">
              {['Home', 'Sobre', 'Serviços', 'Contato'].map((item) => (
                <a
                  href={`#${item.toLowerCase()}`}
                  key={item}
                  className="text-[#003366] dark:text-gray-300 text-lg font-medium hover:text-blue-500 dark:hover:text-blue-400 transition duration-300"
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Modo escuro/claro */}
            <motion.button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              {isDarkMode ? <Sun className="w-6 h-6 text-white" /> : <Moon className="w-6 h-6 text-gray-800" />}
            </motion.button>

            {/* Botão de Menu Mobile */}
            <div className="md:hidden flex items-center">
              <button className="outline-none mobile-menu-button" onClick={toggleMenu}>
                {isOpen ? (
                  <FaTimes className="w-6 h-6 text-[#003366] dark:text-white" />
                ) : (
                  <FaBars className="w-6 h-6 text-[#003366] dark:text-white" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Menu Mobile */}
        <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-white dark:bg-gray-800 shadow-lg`}>
          {['Home', 'Sobre', 'Serviços', 'Contato'].map((item) => (
            <a
              href={`#${item.toLowerCase()}`}
              key={item}
              className="block py-4 px-6 text-[#003366] dark:text-white hover:bg-blue-500 hover:text-white transition duration-300"
              onClick={() => setIsOpen(false)}
            >
              {item}
            </a>
          ))}
        </div>
      </nav>
    </>
  );
}
