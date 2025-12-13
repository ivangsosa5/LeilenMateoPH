import React from 'react';

const CategoryInfoPortfolio = ({ showDescription = true }) => (
  <div data-testid="category-info-portfolio" className="w-4/6 h-full flex flex-col justify-center mx-auto">
    <h2 className="text-xl md:text-2xl lg:text-8xl mb-2">
      <span className='italic'>02. </span>
      Port
      <span className='italic'>folio</span>
      
    </h2>
    {showDescription && (
      <p className="text-lg md:text-xl lg:text-2xl text-justify ">
          Una selección de imágenes que captura la
          <span className='italic'> esencia</span>, el <span className='italic'>estilo</span> y el <span className='italic'>potencial</span> para crear una carta de presentación visual.
          
      </p>
    )}
  </div>
);

export default CategoryInfoPortfolio;
