import React from 'react';

const NavBar = () => {
  return (
    <nav className="bg-[#f3efeb] fixed top-0 left-0 right-0 z-50 font-the-seasons">
      <div className="w-full mx-auto px-30 h-20">
        <div className="flex justify-between items-center py-5">
          <div className="flex items-center">
            <h1 className="text-2xl text-gray-800">Leilen Mateo</h1>
          </div>
          <div className="hidden text-lg md:flex space-x-8">
            <a href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
              Inicio
            </a>
            <a href="/gallery" className="text-gray-600 hover:text-gray-900 transition-colors">
              Galería
            </a>
            <a href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
              Soy Leilen
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
