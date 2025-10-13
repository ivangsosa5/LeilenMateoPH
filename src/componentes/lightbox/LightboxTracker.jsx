import React from 'react';
import { useAnalytics } from '../../hooks/useAnalytics';

// Componente para tracking de lightbox
const LightboxTracker = ({ 
  isOpen, 
  currentImageIndex, 
  totalImages, 
  galleryType, 
  imageName 
}) => {
  const { trackLightboxEvent } = useAnalytics();

  // Trackear apertura de lightbox
  React.useEffect(() => {
    if (isOpen) {
      trackLightboxEvent('Lightbox Open', currentImageIndex, galleryType, {
        image_name: imageName,
        total_images: totalImages
      });
    }
  }, [isOpen, currentImageIndex, galleryType, imageName, totalImages, trackLightboxEvent]);

  // Función para trackear navegación (comentada hasta implementar UI)
  // const handleNavigation = (direction, newIndex) => {
  //   trackLightboxEvent('Lightbox Navigate', newIndex, galleryType, {
  //     direction: direction,
  //     image_name: imageName,
  //     total_images: totalImages
  //   });
  // };

  return null; // Este componente no renderiza nada, solo maneja tracking
};

export default LightboxTracker;




