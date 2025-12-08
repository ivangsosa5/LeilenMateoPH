import React, { useState, useEffect } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import { useGalleryCategories } from '../../../shared/hooks/useContent';
import CategoryInfoEditorial from './categoryInfo/CategoryInfoEditorial';
import CategoryInfoPortfolio from './categoryInfo/CategoryInfoPortfolio';
import CategoryInfoEvents from './categoryInfo/CategoryInfoEvents';
import CategoryInfoProduct from './categoryInfo/CategoryInfoProduct';
import GalleryGrid from './GalleryGrid';
import ExpandButton from './ExpandButton';

function getCategoryInfoComponent(categorySlug) {
  switch ((categorySlug || '').toLowerCase()) {
    case 'editorial':
      return <CategoryInfoEditorial />;
    case 'portfolio':
      return <CategoryInfoPortfolio />;
    case 'events':
      return <CategoryInfoEvents />;
    case 'product':
      return <CategoryInfoProduct />;
    default:
      return null;
  }
}

const CategoryView = ({ 
  previewLimit = null, 
  onNavigate = null,
  onGalleryClick = null 
}) => {
  const { categorySlug } = useParams();
  const [searchParams] = useSearchParams();
  const [expanded, setExpanded] = useState(searchParams.get('view') === 'expanded');

  // Cargar todas las categorías
  const { categories, loading, error } = useGalleryCategories();
  // Encontrar la categoría correcta
  const category = categories?.find(cat => (cat.id === categorySlug || cat.slug === categorySlug));

  useEffect(() => {
    setExpanded(searchParams.get('view') === 'expanded');
  }, [searchParams]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleCategoryInfoClick = () => {
    if (onNavigate && category?.slug) {
      onNavigate(category.slug);
    }
  };

  const handleGalleryClick = () => {
    if (onGalleryClick) {
      onGalleryClick();
    }
  };

  if (loading) {
    return (
      <section
        data-testid="category-view-loading"
        className="animate-pulse px-4 md:px-6 lg:px-8"
        aria-label="Category view"
      >
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6">
          <div className="lg:col-span-1">
            <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-full"></div>
          </div>
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i}>
                  <div className="bg-gray-300 aspect-square rounded-lg"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !category) {
    return (
      <section
        data-testid="category-view"
        className="px-4 md:px-6 lg:px-8"
        aria-label="Category view"
        data-category-slug={categorySlug}
      >
        <div className="text-center py-8">
          <p className="text-red-600 mb-2">Error loading category</p>
          <p className="text-gray-600">{error || 'Category not found'}</p>
        </div>
      </section>
    );
  }

  const limit = expanded ? null : previewLimit;

  return (
    <section
      data-testid="category-view"
      className=" grid grid-cols-1 lg:grid-cols-10 px-4 md:px-6 lg:px-30 w-full h-screen py-30"
      aria-label="Category view"
      data-category-slug={categorySlug}
    >
      <div className="lg:col-span-4 " onClick={handleCategoryInfoClick}>
        {getCategoryInfoComponent(categorySlug)}
      </div>
      
      <div className="lg:col-span-6" onClick={handleGalleryClick}>
        <GalleryGrid 
          category={category} 
          limit={limit}
        />
      </div>

      {/* <div className="lg:col-span-10">
        <ExpandButton 
          onClick={handleExpandClick} 
          expanded={expanded}
        />
      </div> */}
    </section>
  );
};

export default CategoryView;

