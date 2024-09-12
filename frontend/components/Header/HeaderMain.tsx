import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white bg-opacity-70 backdrop-blur-lg shadow-md fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo e Título */}
          <div className="flex items-center space-x-7">
            <div>
              <a href="#" className="flex items-center space-x-2">
                <span className="font-bold text-[#003366] text-2xl hover:scale-105 transition-transform duration-300">Logo</span>
              </a>
            </div>
          </div>

          {/* Links de Navegação Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-[#003366] text-lg font-medium hover:text-[#007BFF] hover:underline underline-offset-4 transition duration-300">Home</a>
            <a href="#" className="text-[#003366] text-lg font-medium hover:text-[#007BFF] hover:underline underline-offset-4 transition duration-300">Sobre</a>
            <a href="#" className="text-[#003366] text-lg font-medium hover:text-[#007BFF] hover:underline underline-offset-4 transition duration-300">Serviços</a>
            <a href="#" className="text-[#003366] text-lg font-medium hover:text-[#007BFF] hover:underline underline-offset-4 transition duration-300">Contato</a>
          </div>

          {/* Botão de Menu Mobile */}
          <div className="md:hidden flex items-center">
            <button className="outline-none mobile-menu-button" onClick={toggleMenu}>
              {isOpen ? (
                <FaTimes className="w-6 h-6 text-[#003366]" />
              ) : (
                <FaBars className="w-6 h-6 text-[#003366]" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-white shadow-lg`}>
        <a href="#" className="block py-2 px-4 text-[#003366] hover:bg-[#007BFF] hover:text-white transition duration-300">Home</a>
        <a href="#" className="block py-2 px-4 text-[#003366] hover:bg-[#007BFF] hover:text-white transition duration-300">Sobre</a>
        <a href="#" className="block py-2 px-4 text-[#003366] hover:bg-[#007BFF] hover:text-white transition duration-300">Serviços</a>
        <a href="#" className="block py-2 px-4 text-[#003366] hover:bg-[#007BFF] hover:text-white transition duration-300">Contato</a>
      </div>
    </nav>
  );
}
