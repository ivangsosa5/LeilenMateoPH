import React from 'react';

const HeroPresentational = ({
  title,
  subtitle,
  backgroundImage,
  ctaText,
  ctaLink,
  onCtaClick
}) => {
  return (
    <section 
      role="banner" 
      aria-label="Hero section" 
      className="relative h-screen flex items-center justify-center"
    >
      {/* Background Image */}
      {backgroundImage && (
        <div className="absolute inset-0">
          <img
            src={backgroundImage}
            alt="Hero background"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
      )}
      
      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
          {title}
        </h1>
        <p className="text-xl md:text-2xl text-white mb-8">
          {subtitle}
        </p>
        <a
          href={ctaLink}
          onClick={onCtaClick}
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors duration-200"
          tabIndex="0"
        >
          {ctaText}
        </a>
      </div>
    </section>
  );
};

export default HeroPresentational;
