import React, { useEffect, useState } from 'react';
import { useSearchParams, useParams, useNavigate } from 'react-router-dom';
import { useGalleryCategories } from '../../../shared/hooks/useContent';
import CategoryDefaultView from './CategoryDefaultView';
import CategoryExpandedView from './CategoryExpandedView';

const CategoryView = ({ 
  category: categoryProp,
  categorySlug: categorySlugProp,
  photos: photosProp,
  previewLimit = null, 
  onNavigate = null,
  onPhotoClick = null,
  loading: loadingProp = false,
  error: errorProp = null
}) => {
  const { categorySlug: categorySlugParam } = useParams();
  const categorySlug = categorySlugProp || categorySlugParam;
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const expanded = searchParams.get('view') === 'expanded';

  // Load category data
  const { categories, loading: loadingHook, error: errorHook } = useGalleryCategories();
  
  // Effective loading/error states
  const loading = loadingProp || loadingHook;
  const error = errorProp || errorHook;

  // Derive category and photos
  const category = categoryProp || categories?.find(cat => (cat.id === categorySlug || cat.slug === categorySlug));
  // Note: photosProp usage is tricky now. 
  // If provided, it overrides category photos for both views.
  // We pass it down if it exists.
  
  const handleExpandClick = () => {
    navigate('?view=expanded', { replace: false });
  };

  const handleCollapseClick = () => {
    navigate('?', { replace: false });
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
          <div className="lg:col-span-3"></div>
        </div>
      </section>
    );
  }

  if (error || (!category && !photosProp)) {
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

  // Common props for child views
  const viewProps = {
    category,
    photos: photosProp, // Optional override
    onPhotoClick,
  };

  return (
    <div data-testid="category-view" data-category-slug={categorySlug || category?.slug}>
      {expanded ? (
        <CategoryExpandedView 
          {...viewProps} 
          onCollapseClick={handleCollapseClick} 
        />
      ) : (
        <CategoryDefaultView 
          {...viewProps} 
          previewLimit={previewLimit}
          onExpandClick={handleExpandClick}
          onNavigate={onNavigate}
        />
      )}
    </div>
  );
};

export default CategoryView;

