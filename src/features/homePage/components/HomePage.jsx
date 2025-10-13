import React from 'react';
import { useContent } from '../../../shared/hooks/useContent';
import Hero from '../../../componentes/hero/Hero';

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

  const { metadata } = content || {};

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero
        title={metadata?.heroTitle || 'Leilen Mateo'}
        subtitle={metadata?.heroSubtitle || 'Professional Photography'}
        backgroundImage={metadata?.heroImage}
        ctaText="View Gallery"
        ctaLink="/gallery"
        loading={loading}
        error={error}
      />

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                {metadata?.aboutTitle || 'About Leilen'}
              </h2>
              <div className="prose prose-lg text-gray-600">
                {metadata?.aboutText && (
                  <div dangerouslySetInnerHTML={{ __html: metadata.aboutText }} />
                )}
              </div>
            </div>
            <div>
              {metadata?.aboutImage && (
                <img
                  src={metadata.aboutImage}
                  alt="About Leilen"
                  className="w-full h-96 object-cover rounded-lg shadow-lg"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Preview Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Work</h2>
            <p className="text-xl text-gray-600">Explore my latest photography sessions</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Gallery preview cards would go here */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="aspect-square bg-gray-200"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Editorial Photography</h3>
                <p className="text-gray-600">Creative and artistic sessions</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="aspect-square bg-gray-200"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Portfolio Sessions</h3>
                <p className="text-gray-600">Professional headshots and portraits</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="aspect-square bg-gray-200"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Event Photography</h3>
                <p className="text-gray-600">Weddings and special occasions</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
