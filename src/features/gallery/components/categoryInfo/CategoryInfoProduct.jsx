import React from 'react';

const CategoryInfoProduct = ({ showDescription = true }) => (
  <div data-testid="category-info-product" className="w-4/6 h-full flex flex-col justify-center mx-auto">
    <h2 className={`text-xl md:text-2xl lg:text-8xl mb-2 ${showDescription ? 'text-start' : ''}`}>
      <span className='italic'>04. </span>
      F
      <span className='italic'>oto-</span>
      producto
    </h2>
    {showDescription && (
      <p className="text-lg md:text-xl lg:text-2xl text-justify ">
      Pensado como una <span className='italic'> vitrina visual</span>, donde cada detalle está trabajado para atraer, inspirar y enamorar a tus clientes.
      </p>
    )}
  </div>
);

export default CategoryInfoProduct;
