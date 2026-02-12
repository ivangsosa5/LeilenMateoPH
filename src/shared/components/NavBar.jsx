import { useState } from 'react';
import { useNavBar } from '../context/NavBarContext';

const NavBar = () => {
  const { isTransparent } = useNavBar();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const galleryItems = [
    { label: 'Editorial', path: '/gallery/editorial' },
    { label: 'Portfolio', path: '/gallery/portfolio' },
    { label: 'Eventos', path: '/gallery/events' },
    { label: 'Fotoproducto', path: '/gallery/product' }
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ease-in-out theme-force-web ${isTransparent ? "is-transparent" : "border-gray-200 border-b shadow-sm"
        }`}
    >
      <div className="w-full mx-auto px-50 h-20">
        <div className="flex justify-between items-center h-full">
          <div className="">
            <a
              href='/'
              className="text-2xl transition-colors duration-500 logo"
            >
              Leilen Mateo
            </a>
          </div>
          <div className="hidden text-lg md:flex space-x-8 ">
            {['Inicio', 'Galería', 'Soy Leilen', 'Contacto'].map((label, idx) => {
              const paths = ['/', '/gallery', '/about', '/contact'];

              if (label === 'Galería') {
                return (
                  <div
                    key={label}
                    className="relative"
                    onMouseEnter={() => setIsDropdownOpen(true)}
                    onMouseLeave={() => setIsDropdownOpen(false)}
                  >
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      aria-haspopup="true"
                      aria-expanded={isDropdownOpen}
                      className="transition-colors duration-500 nav-link cursor-pointer"
                    >
                      {label}
                    </button>

                    {isDropdownOpen && (
                      <div
                        className="absolute left-0 top-full w-48 pt-2 z-50"
                      >
                        <div
                          className={`py-2 rounded-sm shadow-sm transition-all duration-300 ${isTransparent
                            ? "bg-black/20 backdrop-blur-md border border-white/10"
                            : "bg-[#f3efeb] border border-gray-200"
                            }`}
                        >
                          {galleryItems.map((item) => (
                            <a
                              key={item.label}
                              href={item.path}
                              className={`block px-4 py-2 text-base transition-colors duration-300 ${isTransparent
                                ? "text-white hover:text-white/80"
                                : "text-gray-700 hover:text-black hover:bg-black/5"
                                }`}
                              onClick={() => setIsDropdownOpen(false)}
                            >
                              {item.label}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <a
                  key={label}
                  href={paths[idx]}
                  className="transition-colors duration-500 nav-link"
                >
                  {label}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
