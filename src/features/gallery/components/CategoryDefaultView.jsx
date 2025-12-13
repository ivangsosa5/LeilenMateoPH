import React from 'react';
import CategoryInfoEditorial from './categoryInfo/CategoryInfoEditorial';
import CategoryInfoPortfolio from './categoryInfo/CategoryInfoPortfolio';
import CategoryInfoEvents from './categoryInfo/CategoryInfoEvents';
import CategoryInfoProduct from './categoryInfo/CategoryInfoProduct';
import GalleryGrid from './GalleryGrid';
import ExpandButton from './ExpandButton';

function getCategoryInfoComponent(categorySlug, showDescription = true) {
  switch ((categorySlug || '').toLowerCase()) {
    case 'editorial':
      return <CategoryInfoEditorial showDescription={showDescription} />;
    case 'portfolio':
      return <CategoryInfoPortfolio showDescription={showDescription} />;
    case 'events':
      return <CategoryInfoEvents showDescription={showDescription} />;
    case 'product':
      return <CategoryInfoProduct showDescription={showDescription} />;
    default:
      return null;
  }
}

const CategoryDefaultView = ({ 
  category, 
  previewLimit = 8, 
  onExpandClick, 
  onPhotoClick,
  onNavigate 
}) => {
  const handleCategoryInfoClick = () => {
    if (onNavigate && category?.slug) {
      onNavigate(category.slug);
    }
  };

  return (
    <section 
      data-testid="category-default-view"
      className="grid grid-cols-1 lg:grid-cols-10 px-4 md:px-6 lg:px-30 w-full py-10 gap-8"
      aria-label={`${category?.title} default view`}
    >
      <div className="lg:col-span-4" onClick={handleCategoryInfoClick}>
        {getCategoryInfoComponent(category?.slug, true)}
      </div>
      
      <div className="lg:col-span-6">
        <GalleryGrid 
          category={category}
          limit={previewLimit}
          onPhotoClick={onPhotoClick}
        />
        
        <div className="mt-8 flex justify-center">
          <ExpandButton 
            onClick={onExpandClick} 
            expanded={false}
          />
        </div>
      </div>
    </section>
  );
};

export default CategoryDefaultView;
