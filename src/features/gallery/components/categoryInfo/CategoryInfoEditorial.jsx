import React from 'react';

const CategoryInfoEditorial = () => (
    <div data-testid="category-info-editorial" className="w-4/6 h-full flex flex-col justify-center mx-auto">
    <h2 className="text-xl md:text-2xl lg:text-8xl mb-2">
      <span className='italic'>01. </span>
      <span>Ed</span>
      <span className='italic'>it</span>
      <span>orial</span>
    </h2>
    <p className="text-lg md:text-xl lg:text-2xl text-justify ">
        Producciones que 
        <span className='italic'> Transforman Ideas </span>
        en imágenes listas para transmitir conceptos o 
        <span className='italic'> dar vida </span>
        a artículos
        <span className='italic'> editoriales.</span> 
    </p>
  </div>
);

export default CategoryInfoEditorial;
