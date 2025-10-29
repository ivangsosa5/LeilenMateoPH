import React from "react";
import SEOHead from "../../../shared/components/SEOHead";
import { usePageTracking, useGalleryTracking } from "../../../shared/hooks/useAnalytics";

const GaleriaPortfolio = () => {
  // Tracking de página y galería
  usePageTracking('Galería Portfolio', {
    page_section: 'gallery',
    gallery_type: 'portfolio'
  });

  const { trackGalleryView } = useGalleryTracking('portfolio');

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
        title="Galería Portfolio - Leilen Mateo | Portfolio Fotográfico Profesional"
        description="Descubre mi portfolio fotográfico profesional. Una colección cuidadosamente seleccionada de mis mejores trabajos en diferentes estilos y técnicas."
        keywords="portfolio fotográfico, galería portfolio, fotografía profesional, mejores trabajos, Leilen Mateo, portfolio creativo"
        url="/galeria/portfolio"
        image="/og-portfolio.jpg"
      />
      <div>
        <h1>Galería Portfolio</h1>
        {/* Contenido de la galería portfolio */}
        {/* Ejemplo de uso: onClick={() => handleImageClick(0, 'imagen-1')} */}
        {/* Ejemplo de filtro: onChange={() => handleFilterChange('retrato')} */}
      </div>
    </>
  );
};

export default GaleriaPortfolio;

