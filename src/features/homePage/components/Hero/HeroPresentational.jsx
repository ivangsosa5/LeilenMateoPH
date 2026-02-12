import React from 'react';

const HeroPresentational = ({
  titleImage,
  backgroundImage,
  satelliteImages,
}) => {
  const sectionRef = React.useRef(null);
  const targetProgress = React.useRef(0);
  const [scrollProgress, setScrollProgress] = React.useState(0);
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    if (!isVisible) return;

    let rafId;
    let currentProgress = targetProgress.current;

    const updateProgress = () => {
      // Linear Interpolation (Lerp) formula: 
      // current = current + (target - current) * factor
      // 0.1 is the follow speed (lower is smoother/slower braking)
      const diff = targetProgress.current - currentProgress;
      
      if (Math.abs(diff) > 0.0001) {
        currentProgress += diff * 0.1;
        setScrollProgress(currentProgress);
      }
      
      rafId = requestAnimationFrame(updateProgress);
    };

    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = rect.height;
      const viewportHeight = window.innerHeight;
      
      const start = rect.top;
      // Actual target progress based on scroll position
      targetProgress.current = Math.max(0, Math.min(1, -start / (sectionHeight - viewportHeight)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    rafId = requestAnimationFrame(updateProgress);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [isVisible]);

  // Satellite configuration with unique parallax factors
  const satellites = [
    /* { src: satelliteImages[0], baseLeft: '494px', baseTop: '1260px', width: '139.98px', opacity: '0.8', factor: 0.1 },
    { src: satelliteImages[1], baseLeft: '1254px', baseTop: '1160px', width: '139.98px', opacity: '0.8', factor: 0.1 },
    { src: satelliteImages[2], baseLeft: '1094px', baseTop: '2060px', width: '139.98px', opacity: '0.9', factor: 0.4, saturate0: true },
    { src: satelliteImages[3], baseLeft: '694px', baseTop: '1950px', width: '100px', opacity: '0.9', factor: 0.2, saturate0: true },
    { src: satelliteImages[4], baseLeft: '1394px', baseTop: '2050px', width: '139.98px', opacity: '0.8', factor: 0.6 },
    { src: satelliteImages[5], baseLeft: '394px', baseTop: '1880px', width: '90px', opacity: '0.8', factor: 0.4 },
    { src: satelliteImages[6], baseLeft: '894px', baseTop: '2610px', width: '139.98px', opacity: '0.8', factor: 0.4 }, */
    { src: satelliteImages[0], baseLeft: '494px', baseTop: '1460px', width: '139.98px', opacity: '0.8', factor: 0.2 },
    { src: satelliteImages[1], baseLeft: '1254px', baseTop: '1300px', width: '139.98px', opacity: '0.8', factor: 0.2 },
    { src: satelliteImages[2], baseLeft: '694px', baseTop: '2760px', width: '139.98px', opacity: '0.9', factor: 0.5, saturate0: true },
    { src: satelliteImages[3], baseLeft: '1494px', baseTop: '1750px', width: '100px', opacity: '0.9', factor: 0.1, saturate0: true },
    { src: satelliteImages[4], baseLeft: '1094px', baseTop: '2350px', width: '139.98px', opacity: '0.8', factor: 0.5 },
    { src: satelliteImages[5], baseLeft: '294px', baseTop: '2080px', width: '90px', opacity: '0.8', factor: 0.1 },
    { src: satelliteImages[6], baseLeft: '1044px', baseTop: '3540px', width: '139.98px', opacity: '0.8', factor: 0.7 },
  ];

  return (
    <section 
      ref={sectionRef}
      role="banner" 
      aria-label="Hero section" 
      className="relative h-[300vh] flex flex-col items-center bg-[#f3efeb] z-10"
    >
      {/* Background Image */}
      {/* {backgroundImage && (
        <div className="inset-0 fixed -z-10">
          <img
            src={backgroundImage}
            alt="Hero background"
            className="w-full h-full object-cover opacity-50"
            loading="lazy"
          />
        </div>
      )} */}

      {/* Satellite Images with Parallax */}
      {satelliteImages && satellites.map((sat, index) => (
        <img 
          key={index}
          src={sat.src} 
          alt={`Satellite Image ${index + 1}`} 
          className={`absolute pointer-events-none transition-transform duration-100 ease-out ${sat.saturate0 ? 'saturate-0' : ''}`}
          style={{ 
            width: sat.width, 
            left: sat.baseLeft, 
            top: sat.baseTop, 
            opacity: sat.opacity,
            transform: `translateY(-${scrollProgress * 1500 * sat.factor}px)`
          }} 
          loading="lazy" 
        />
      ))}

      {/* Sticky Title Content */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center pointer-events-none">
        <div className="relative pointer-events-auto">
          <img src={titleImage} alt="Title Image" className="w-[467px] object-contain" />
        </div>
      </div>
    </section>
  );
};

export default HeroPresentational;


