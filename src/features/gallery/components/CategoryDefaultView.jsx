import React from 'react';
import CategoryInfoEditorial from './categoryInfo/CategoryInfoEditorial';
import CategoryInfoPortfolio from './categoryInfo/CategoryInfoPortfolio';
import CategoryInfoEvents from './categoryInfo/CategoryInfoEvents';
import CategoryInfoProduct from './categoryInfo/CategoryInfoProduct';
import GenericButton from '../../../shared/components/GenericButton';
import GalleryGrid from './GalleryGrid';
import ExpandButton from './ExpandButton';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const handleCategoryInfoClick = () => {
    if (onNavigate && category?.slug) {
      onNavigate(category.slug);
    }
  };

  return (
    <section 
      data-testid="category-default-view"
      className="grid grid-cols-1 lg:grid-cols-10 px-4 md:px-6 lg:px-30 w-full py-10 gap-8 mt-20 animate-fade-in"
      aria-label={`${category?.title} default view`}
    >
      <div className="lg:col-span-4 h-full flex flex-col justify-center relative pb-20" onClick={handleCategoryInfoClick}>
        {getCategoryInfoComponent(category?.slug, true)}
        <div className="mt-8 flex justify-center relative">
        <GenericButton onClick={() => navigate('/contact')}>Habla conmigo</GenericButton>
        <img src="/images/galleriesImages/buttonGalleryDecoration.svg" className="absolute top-1/2 right-1/6" alt="" />
        </div>
        
      </div>
      
      <div className="lg:col-span-6">
        <GalleryGrid 
          category={category}
          limit={previewLimit}
          classes="saturate-0 hover:saturate-100 transition-saturate ease-out duration-500"
          onPhotoClick={(photo) => onPhotoClick && onPhotoClick(photo, category?.photos || [])}
        />
        
        <div className="relative flex justify-end my-6">
          <img src="/images/galleriesImages/expandGallery.svg" className="absolute top-0 right-1/12" alt="" />
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
