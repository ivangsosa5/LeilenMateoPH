import React from 'react';

const WhatsappPreview = ({ message }) => {
  if (!message) return (
    <div className="mt-8 lg:mt-0 px-20 h-full flex flex-col justify-center">
      <div className=" text-sm text-gray-600 whitespace-pre-wrap">
        <p className='text-xl text-gray-700 italic text-start'>
          Hola Leilen! Soy _________, quiero más info sobre las sesiones de _________.<br></br><br></br>
        - Fecha estimada: _________ de _________.</p>
        <br></br>
        <br></br>
        <br></br>
        <p className='text-xl text-gray-700 italic text-start'>
          ¡Gracias! 😊
        </p>
      </div>
      <p className="text-md italic text-gray-400 mt-2 text-center">
        Así se verá tu mensaje en WhatsApp
      </p>
    </div>
  );

  return (
    <div className="mt-8 lg:mt-0 px-20 h-full flex flex-col justify-center">
      <div className=" text-sm text-gray-600 whitespace-pre-wrap">
        <p className='text-xl text-gray-700 italic text-start'>{message}</p>
      </div>
      <p className="text-md italic text-gray-400 mt-2 text-center ">
        Así se verá tu mensaje en WhatsApp
      </p>
    </div>
  );
};

export default WhatsappPreview;
