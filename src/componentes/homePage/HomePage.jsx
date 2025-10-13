import React from "react";
import SEOHead from "../seo/SEOHead";
import { usePageTracking } from "../../hooks/useAnalytics";

const HomePage = () => {
  // Tracking automático de page view
  usePageTracking('Homepage', {
    page_section: 'hero',
    page_type: 'landing'
  });

  return (
    <>
      <SEOHead 
        title="Leilen Mateo - Fotógrafa Profesional | Portfolio y Servicios"
        description="Fotógrafa profesional especializada en sesiones editoriales, portfolios, eventos y fotografía de productos. Capturando momentos únicos con estilo y profesionalismo en cada sesión."
        keywords="fotógrafa profesional, sesiones editoriales, portfolio fotográfico, eventos, fotografía de productos, Leilen Mateo, fotografía creativa"
        url=""
        image="/og-home.jpg"
      />
      <div>
        {/* Contenido de la página principal */}
        <h1>HomePage</h1>
      </div>
    </>
  );
};

export default HomePage; 