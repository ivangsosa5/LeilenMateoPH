// Configuración centralizada de SEO para LeilenMateoPH

export const SEO_CONFIG = {
  // Información básica del sitio
  site: {
    name: "Leilen Mateo Photography",
    url: "https://leilenmateo.com",
    logo: "https://leilenmateo.com/logo.png",
    description: "Fotógrafa profesional especializada en sesiones editoriales, portfolios, eventos y fotografía de productos."
  },

  // Configuración por defecto
  default: {
    title: "Leilen Mateo - Fotógrafa Profesional",
    description: "Fotógrafa profesional especializada en sesiones editoriales, portfolios, eventos y fotografía de productos. Capturando momentos únicos con estilo y profesionalismo.",
    keywords: "fotógrafa, fotografía profesional, Leilen Mateo, sesiones editoriales, portfolio, eventos, fotografía de productos",
    image: "/og-default.jpg",
    type: "website",
    locale: "es_ES"
  },

  // Redes sociales
  social: {
    twitter: "@leilenmateo",
    facebook: "https://facebook.com/leilenmateo",
    instagram: "https://instagram.com/leilenmateo"
  },

  // Configuración de Open Graph
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "Leilen Mateo Photography"
  },

  // Configuración de Twitter Card
  twitter: {
    card: "summary_large_image",
    creator: "@leilenmateo"
  },

  // Estructura de datos JSON-LD
  structuredData: {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Leilen Mateo",
    "jobTitle": "Fotógrafa Profesional",
    "url": "https://leilenmateo.com",
    "sameAs": [
      "https://instagram.com/leilenmateo",
      "https://facebook.com/leilenmateo"
    ],
    "knowsAbout": [
      "Fotografía Editorial",
      "Fotografía de Portfolio", 
      "Fotografía de Eventos",
      "Fotografía de Productos"
    ]
  }
};

// Función para generar meta tags dinámicos
export const generateMetaTags = (pageData = {}) => {
  const config = {
    ...SEO_CONFIG.default,
    ...pageData
  };

  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    image: config.image.startsWith('http') ? config.image : `${SEO_CONFIG.site.url}${config.image}`,
    url: config.url ? `${SEO_CONFIG.site.url}${config.url}` : SEO_CONFIG.site.url,
    type: config.type || SEO_CONFIG.default.type,
    locale: config.locale || SEO_CONFIG.default.locale
  };
};














