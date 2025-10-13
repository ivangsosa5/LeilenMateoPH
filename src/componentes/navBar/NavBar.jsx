import React from "react";

const NavBar = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-10 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <a className="text-2xl font-bold font-bodoni tracking-wider" href="#">Leilen</a>
          <nav>
            <ul className="flex space-x-8 text-sm tracking-widest uppercase">
              <li><a className="hover:text-stone-500 transition-colors" href="#editoriales">Editoriales</a></li>
              <li><a className="hover:text-stone-500 transition-colors" href="#portfolio">Portfolio</a></li>
              <li><a className="hover:text-stone-500 transition-colors" href="#eventos">Eventos</a></li>
              <li><a className="hover:text-stone-500 transition-colors" href="#fotoproducto">Fotoproducto</a></li>
            </ul>
          </nav>
        </div>
      </header>
  );
};

export default NavBar; 