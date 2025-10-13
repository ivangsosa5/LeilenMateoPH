import React from 'react';

const NavBar = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-800">Leilen Mateo</h1>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
              Inicio
            </a>
            <a href="/gallery" className="text-gray-600 hover:text-gray-900 transition-colors">
              Galería
            </a>
            <a href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
              Sobre Mí
            </a>
            <a href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">
              Contacto
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
