import React from 'react';

const HeroPresentational = ({
  titleImage,
  backgroundImage,
  satelliteImages,
 
}) => {

  console.log(satelliteImages[0]);
  return (
    <section 
      role="banner" 
      aria-label="Hero section" 
      className="relative h-[1522px] flex items-center justify-center"
    >
      {/* Background Image */}
      {backgroundImage && (
        <div className="inset-0 fixed -z-10">
          <img
            src={backgroundImage}
            alt="Hero background"
            className="w-full object-cover opacity-50"
            loading="lazy"
          />
          
        </div>
      )}
      <img src={satelliteImages[0]} alt="Satellite Image" className="absolute w-[139.98px] left-[494px] top-[460px] opacity-[0.8]" loading="lazy" />
      <img src={satelliteImages[1]} alt="Satellite Image" className="absolute w-[139.98px] left-[1254px] top-[320px] opacity-[0.8]" loading="lazy" />
      <img src={satelliteImages[2]} alt="Satellite Image" className="absolute w-[139.98px] left-[1094px] top-[760px] opacity-[0.9] saturate-0" loading="lazy" />
      <img src={satelliteImages[3]} alt="Satellite Image" className="absolute w-[100px] left-[694px] top-[850px] opacity-[0.9] saturate-0" loading="lazy" />
      <img src={satelliteImages[4]} alt="Satellite Image" className="absolute w-[139.98px] left-[1394px] top-[990px] opacity-[0.8]" loading="lazy" />
      <img src={satelliteImages[5]} alt="Satellite Image" className="absolute w-[90px] left-[394px] top-[960px] opacity-[0.8]" loading="lazy" />
      <img src={satelliteImages[6]} alt="Satellite Image" className="absolute w-[139.98px] left-[894px] top-[1160px] opacity-[0.8]" loading="lazy" />

      
      {/* Content */}
      <div className="relative mx-auto">
        <img src={titleImage} alt="Title Image" className=" w-[467px] object-contain" />
        

        {/* <a
          href={ctaLink}
          onClick={onCtaClick}
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors duration-200"
          tabIndex="0"
        >
          {ctaText}
        </a> */}
      </div>
    </section>
  );
};

export default HeroPresentational;


