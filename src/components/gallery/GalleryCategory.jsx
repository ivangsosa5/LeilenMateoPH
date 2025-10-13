import React from 'react';
import { useGalleryCategories } from '../../hooks/useContent';

const GalleryCategory = ({ categoryId }) => {
  const { categories, loading, error } = useGalleryCategories();
  
  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-64 bg-gray-300 rounded-lg mb-6"></div>
        <div className="h-8 bg-gray-300 rounded w-1/2 mb-4"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Error loading category: {error}</p>
      </div>
    );
  }

  const category = categories.find(cat => cat.id === categoryId);
  
  if (!category) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Category not found</p>
      </div>
    );
  }

  return (
    <div className="mb-8">
      {/* Hero Section */}
      <div className="relative h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden mb-8">
        <img
          src={category.heroImage}
          alt={category.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {category.title}
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto">
              {category.description}
            </p>
          </div>
        </div>
      </div>

      {/* Subcategories */}
      {category.subcategories && category.subcategories.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Subcategories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {category.subcategories.map((subcategory, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="font-semibold text-lg mb-2">
                  {subcategory.name}
                </h3>
                <p className="text-gray-600 text-sm">
                  {subcategory.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryCategory;

