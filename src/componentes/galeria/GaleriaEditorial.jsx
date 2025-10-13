import React from "react";
import SEOHead from "../seo/SEOHead";
import { usePageTracking, useGalleryTracking } from "../../hooks/useAnalytics";

const GaleriaEditorial = () => {
  // Tracking de página y galería
  usePageTracking('Galería Editorial', {
    page_section: 'gallery',
    gallery_type: 'editorial'
  });

  const { trackGalleryView } = useGalleryTracking('editorial');

  // Trackear vista de galería al montar
  React.useEffect(() => {
    trackGalleryView();
  }, [trackGalleryView]);

  // Funciones para manejar interacciones (comentadas hasta implementar UI)
  // const handleImageClick = (imageIndex, imageName) => {
  //   trackGalleryClick(imageIndex, imageName);
  // };

  // const handleFilterChange = (filterType) => {
  //   trackFilterApplied(filterType);
  // };

  return (
    <>
      <SEOHead 
        title="Galería Editorial - Leilen Mateo | Fotografía Editorial Profesional"
        description="Explora mi galería de fotografía editorial. Sesiones creativas y artísticas que capturan la esencia y estilo único de cada modelo y concepto."
        keywords="fotografía editorial, galería editorial, sesiones creativas, fotografía artística, moda, Leilen Mateo"
        url="/galeria/editorial"
        image="/og-editorial.jpg"
      />
      <div>
        <h1>Galería Editorial</h1>
        {/* Contenido de la galería editorial */}
        {/* Ejemplo de uso: onClick={() => handleImageClick(0, 'imagen-1')} */}
        {/* Ejemplo de filtro: onChange={() => handleFilterChange('retrato')} */}
      </div>
    </>
  );
};

export default GaleriaEditorial;
