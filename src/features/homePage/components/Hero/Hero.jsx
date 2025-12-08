import React from 'react';
import HeroPresentational from './HeroPresentational';

const Hero = ({
  titleImage,
  backgroundImage,
  satelliteImages,
}) => {

  // Pass processed data to presentational component
  // Content is static, so no loading/error states needed
  return (
    <HeroPresentational
      titleImage={titleImage}
      backgroundImage={backgroundImage}
      satelliteImages={satelliteImages}
    />
  );
};

export default Hero;
