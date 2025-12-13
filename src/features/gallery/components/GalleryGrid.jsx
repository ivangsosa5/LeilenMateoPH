import React from 'react';

const GalleryGrid = ({ category = null, limit = null, onImageClick = null }) => {
  // Si no hay categoría o no tiene fotos, mostrar estado vacío
  if (!category || !category.photos || category.photos.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No hay fotos disponibles en esta categoría</p>
      </div>
    );
  }

  // Ordenar fotos por order y aplicar limit si existe
  const sortedPhotos = [...category.photos].sort((a, b) => (a.order || 0) - (b.order || 0));
  const displayPhotos = limit ? sortedPhotos.slice(0, limit) : sortedPhotos;

  const handleImageClick = (photo, index) => {
    if (onImageClick) {
      onImageClick(photo, index);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {displayPhotos.map((photo, index) => (
        <div
          key={photo.image || index}
          className="group cursor-pointer bg-white shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          onClick={() => handleImageClick(photo, index)}
        >
          <div className="aspect-[4/6] overflow-hidden">
            <img
              src={photo.image}
              alt={photo.alt || `Gallery image ${index + 1}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </div>
          
        </div>
      ))}
    </div>
  );
};

export default GalleryGrid;
