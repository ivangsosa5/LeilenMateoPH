import React from 'react';
import HeroPresentational from './HeroPresentational';

const Hero = ({
  title = 'Leilen Mateo',
  subtitle = 'Professional Photography',
  backgroundImage,
  ctaText = 'View Gallery',
  ctaLink = '/gallery',
  onCtaClick,
  loading = false,
  error,
  ...props
}) => {
  // Handle null/undefined props by using defaults, but preserve empty strings
  const safeTitle = title === null || title === undefined ? 'Leilen Mateo' : title;
  const safeSubtitle = subtitle === null || subtitle === undefined ? 'Professional Photography' : subtitle;
  const safeCtaText = ctaText === null || ctaText === undefined ? 'View Gallery' : ctaText;
  const safeCtaLink = ctaLink === null || ctaLink === undefined ? '/gallery' : ctaLink;
  // Container logic - data processing and state management
  const handleCtaClick = (e) => {
    if (onCtaClick) {
      e.preventDefault();
      onCtaClick();
    }
  };

  // Error state
  if (error) {
    return (
      <section role="banner" aria-label="Hero section" className="relative h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Error loading hero content</h1>
          <p className="text-xl md:text-2xl text-white">{error}</p>
        </div>
      </section>
    );
  }

  // Loading state
  if (loading) {
    return (
      <section role="banner" aria-label="Hero section" className="relative h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center text-white max-w-4xl mx-auto px-4">
          <div data-testid="hero-loading" className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto"></div>
        </div>
      </section>
    );
  }

  // Pass processed data to presentational component
  return (
    <HeroPresentational
      title={safeTitle}
      subtitle={safeSubtitle}
      backgroundImage={backgroundImage}
      ctaText={safeCtaText}
      ctaLink={safeCtaLink}
      onCtaClick={handleCtaClick}
      {...props}
    />
  );
};

export default Hero;
