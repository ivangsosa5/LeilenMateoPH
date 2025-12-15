import React from 'react';

const WhatsappPreview = ({ message }) => {
  if (!message) return null;

  return (
    <div className="mt-8 lg:mt-0 p-20 h-full flex flex-col justify-center">
      <div className="p-3 text-sm text-gray-600 whitespace-pre-wrap">
        <p className='text-xl md:text-2xl text-gray-700 italic text-start'>{message}</p>
      </div>
      <p className="text-xs text-gray-400 mt-2 text-center">
        Así se verá tu mensaje en WhatsApp
      </p>
    </div>
  );
};

export default WhatsappPreview;
