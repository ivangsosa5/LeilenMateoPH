import React from 'react';
import { useGalleries } from '../../../shared/hooks/useContent';

const GalleryGrid = ({ category = null, limit = null }) => {
  const { galleries, loading, error } = useGalleries(category);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-300 aspect-square rounded-lg"></div>
            <div className="mt-2 h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="mt-1 h-3 bg-gray-300 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Error loading galleries: {error}</p>
      </div>
    );
  }

  const displayGalleries = limit ? galleries.slice(0, limit) : galleries;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {displayGalleries.map((gallery) => (
        <div
          key={gallery.id}
          className="group cursor-pointer bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <div className="aspect-square overflow-hidden">
            <img
              src={gallery.featuredImage}
              alt={gallery.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-lg text-gray-900 mb-2">
              {gallery.title}
            </h3>
            <p className="text-gray-600 text-sm mb-2">
              {gallery.description}
            </p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                {gallery.category}
              </span>
              <span>
                {new Date(gallery.date).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GalleryGrid;
