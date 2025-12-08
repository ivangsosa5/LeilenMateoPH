import React from 'react';
import { useContent } from '../../../shared/hooks/useContent';
import Hero from './Hero/Hero';
import { homepageContent } from '../config/homepageContent';


const HomePage = () => {
  const { content, loading, error } = useContent('homepage.md');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Content</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero 
        titleImage={homepageContent.hero.titleImage}
        backgroundImage={homepageContent.hero.backgroundImage}
        satelliteImages={homepageContent.hero.satelliteImages}
      />

      {/*Banner Section*/}
      <section className="">
        <div className=" mx-auto bg-[#f3efeb] h-[100vh] flex items-center justify-center">
          <img src="/images/banner.svg" alt="Banner"/>
          
        </div>
      </section>

      {/* Gallery Preview Section */}
      <section className="">
        <div className=" mx-auto h-[100vh] flex items-center justify-center">
          <a href="/gallery/editorial"><img src="/images/editorialHomeImg.svg" alt="Editorial Home" /></a>
          
        </div>
        <div className=" mx-auto bg-[#f3efeb] h-[100vh] flex items-center justify-center">
          <a href="/gallery/portfolio"><img src="/images/portfolioHomeImg.svg" alt="Portfolio Home" /></a>
          
        </div>
        <div className=" mx-auto h-[100vh] flex items-center justify-center">
          <a href="/gallery/events"><img src="/images/eventosHomeImg.svg" alt="Eventos Home" /></a>
        
          
        </div>
        <div className=" mx-auto bg-[#f3efeb] h-[100vh] flex items-center justify-center">
          <a href="/gallery/product"><img src="/images/fotoproductoHomeImg.svg" alt="Fotoproductos Home" /></a>          
          
        </div>
      </section>
    </div>
  );
};

export default HomePage;
