import { useMemo } from 'react';

// Hook personalizado para manejar SEO de manera eficiente
export const useSEO = (pageData) => {
  const seoData = useMemo(() => {
    const defaultData = {
      title: "Leilen Mateo - Fotógrafa Profesional",
      description: "Fotógrafa profesional especializada en sesiones editoriales, portfolios, eventos y fotografía de productos.",
      keywords: "fotógrafa, fotografía profesional, Leilen Mateo",
      image: "/og-default.jpg",
      url: "",
      type: "website",
      locale: "es_ES"
    };

    return {
      ...defaultData,
      ...pageData,
      // Asegurar que las URLs sean absolutas
      url: pageData?.url ? (pageData.url.startsWith('/') ? pageData.url : `/${pageData.url}`) : "",
      // Asegurar que las imágenes tengan la ruta completa
      image: pageData?.image ? (pageData.image.startsWith('http') ? pageData.image : pageData.image) : defaultData.image
    };
  }, [pageData]);

  return seoData;
};

// Configuraciones predefinidas para diferentes tipos de páginas
export const SEOConfigs = {
  home: {
    title: "Leilen Mateo - Fotógrafa Profesional | Portfolio y Servicios",
    description: "Fotógrafa profesional especializada en sesiones editoriales, portfolios, eventos y fotografía de productos. Capturando momentos únicos con estilo y profesionalismo.",
    keywords: "fotógrafa profesional, sesiones editoriales, portfolio fotográfico, eventos, fotografía de productos, Leilen Mateo",
    url: "",
    image: "/og-home.jpg"
  },
  editorial: {
    title: "Galería Editorial - Leilen Mateo | Fotografía Editorial Profesional",
    description: "Explora mi galería de fotografía editorial. Sesiones creativas y artísticas que capturan la esencia y estilo único de cada modelo y concepto.",
    keywords: "fotografía editorial, galería editorial, sesiones creativas, fotografía artística, moda, Leilen Mateo",
    url: "/galeria/editorial",
    image: "/og-editorial.jpg"
  },
  portfolio: {
    title: "Galería Portfolio - Leilen Mateo | Portfolio Fotográfico Profesional",
    description: "Descubre mi portfolio fotográfico profesional. Una colección cuidadosamente seleccionada de mis mejores trabajos en diferentes estilos y técnicas.",
    keywords: "portfolio fotográfico, galería portfolio, fotografía profesional, mejores trabajos, Leilen Mateo, portfolio creativo",
    url: "/galeria/portfolio",
    image: "/og-portfolio.jpg"
  },
  eventos: {
    title: "Galería Eventos - Leilen Mateo | Fotografía de Eventos Profesional",
    description: "Explora mi galería de fotografía de eventos. Capturando momentos especiales, celebraciones y eventos corporativos con profesionalismo y creatividad.",
    keywords: "fotografía de eventos, galería eventos, eventos corporativos, celebraciones, fotografía profesional eventos, Leilen Mateo",
    url: "/galeria/eventos",
    image: "/og-eventos.jpg"
  },
  productos: {
    title: "Galería Productos - Leilen Mateo | Fotografía de Productos Profesional",
    description: "Descubre mi galería de fotografía de productos. Imágenes profesionales que destacan la calidad y características de cada producto con técnicas especializadas.",
    keywords: "fotografía de productos, galería productos, fotografía comercial, productos profesionales, e-commerce, Leilen Mateo",
    url: "/galeria/productos",
    image: "/og-productos.jpg"
  },
  about: {
    title: "Soy Leilen - Conoce a la Fotógrafa | Leilen Mateo",
    description: "Conoce a Leilen Mateo, fotógrafa profesional con años de experiencia. Mi historia, pasión por la fotografía y enfoque único en cada sesión.",
    keywords: "soy Leilen, fotógrafa Leilen Mateo, historia personal, experiencia fotográfica, pasión por la fotografía, profesional",
    url: "/soy-leilen",
    image: "/og-soy-leilen.jpg"
  },
  contacto: {
    title: "Contacto - Leilen Mateo | Reserva tu Sesión Fotográfica",
    description: "Contacta con Leilen Mateo para reservar tu sesión fotográfica. Formulario de contacto y WhatsApp para consultas sobre servicios de fotografía profesional.",
    keywords: "contacto Leilen Mateo, reservar sesión, fotografía profesional, WhatsApp, formulario contacto, servicios fotográficos",
    url: "/contacto",
    image: "/og-contacto.jpg"
  }
};







