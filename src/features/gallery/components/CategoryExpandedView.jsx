import React, { useState } from 'react';
import CategoryInfoEditorial from './categoryInfo/CategoryInfoEditorial';
import CategoryInfoPortfolio from './categoryInfo/CategoryInfoPortfolio';
import CategoryInfoEvents from './categoryInfo/CategoryInfoEvents';
import CategoryInfoProduct from './categoryInfo/CategoryInfoProduct';
import GalleryGrid from './GalleryGrid';
import ExpandButton from './ExpandButton';

function getCategoryInfoComponent(categorySlug, showDescription = false) {
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

const CategoryExpandedView = ({ 
  category, 
  photos: photosProp, 
  onCollapseClick, 
  onPhotoClick 
}) => {
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  // Derive photos source
  const photos = photosProp || category?.photos || [];

  // Get unique subcategories
  const subcategories = category?.subcategories || 
    [...new Set(photos.map(p => p.subcategory))].filter(Boolean).map(s => ({ id: s, name: s.charAt(0).toUpperCase() + s.slice(1) }));

  // Filter photos
  const filteredPhotos = selectedSubcategory
    ? photos.filter(p => p.subcategory === selectedSubcategory)
    : photos;

  const handleGridPhotoClick = (photo) => {
    // When clicking a photo in expanded view, we want to navigate purely within the *currently visible set*
    // So we pass the filteredPhotos as the context for the lightbox
    if (onPhotoClick) {
      onPhotoClick(photo, filteredPhotos);
    }
  };

  return (
    <section 
      data-testid="category-expanded-view"
      className="grid grid-cols-1 md:gap-8 px-4 md:px-6 lg:px-30 w-full py-10"
      aria-label={`${category?.title} expanded view`}
    >
      <div className="mb-8 cursor-pointer" onClick={onCollapseClick}>
         {/* Show only title, no description */}
        {getCategoryInfoComponent(category?.slug, false)}
      </div>

      <div className="w-full">
        {/* Filter UI */}
        <div data-testid="subcategory-filter" className="flex flex-wrap gap-4 mb-6">
          <button
            data-testid="subcategory-filter-option"
            onClick={() => setSelectedSubcategory(null)}
            className={`px-4 py-2 rounded-full text-sm transition-colors ${
              selectedSubcategory === null 
                ? 'bg-black text-white' 
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
            tabIndex="0"
          >
            All
          </button>
          
          {subcategories?.map(sub => (
            <button
              key={sub.id}
              data-testid="subcategory-filter-option"
              onClick={() => setSelectedSubcategory(sub.id)}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                selectedSubcategory === sub.id 
                  ? 'bg-black text-white' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
              tabIndex="0"
            >
              {sub.name}
            </button>
          ))}
        </div>

        <div data-testid="gallery-grid-wrapper" data-subcategory={selectedSubcategory || ''}>
          <GalleryGrid 
            category={{ ...category, photos: filteredPhotos }} // Pass filtered photos masquerading as category photos or use photos prop if GalleryGrid supports it better?
            // Actually GalleryGrid prefers 'category' prop or 'photos' prop maybe? 
            // My previous read showed: const sourcePhotos = photos.length > 0 ? ...
            // So if I pass photos={filteredPhotos} it should work.
            // But let's check current GalleryGrid signature from the diff I saw earlier:
            // const GalleryGrid = ({ category = null, limit = null, onImageClick = null }) => {
            //   if (!category || !category.photos ...
            // It ONLY takes category and limit. It removed photos prop!
            // Wait, I saw a diff earlier:
            // - const GalleryGrid = ({ ... photos = [], ...
            // + const GalleryGrid = ({ category = null, limit = null, onImageClick = null }) => {
            // So I MUST pass a constructed category object with the filtered photos.
            // category={{ ...category, photos: filteredPhotos }}  is the correct approach.
            onImageClick={handleGridPhotoClick}
            limit={null}
          />
        </div>

        <div className="mt-8 flex justify-center">
          <ExpandButton 
            onClick={onCollapseClick} 
            expanded={true}
          />
        </div>
      </div>
    </section>
  );
};

export default CategoryExpandedView;
