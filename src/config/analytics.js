// Configuración de Plausible Analytics para LeilenMateoPH

export const ANALYTICS_CONFIG = {
  // Dominio de Plausible (usar variable de entorno o fallback)
  domain: import.meta.env.VITE_PLAUSIBLE_DOMAIN || 'leilenmateo.com',
  
  // URL del script de Plausible (usar el proxy para mejor performance)
  scriptUrl: 'https://plausible.io/js/script.js',
  
  // Configuración de eventos personalizados
  events: {
    // Eventos de navegación
    PAGE_VIEW: 'Page View',
    GALLERY_VIEW: 'Gallery View',
    GALLERY_CLICK: 'Gallery Click',
    
    // Eventos de interacción
    CONTACT_FORM_START: 'Contact Form Start',
    CONTACT_FORM_SUBMIT: 'Contact Form Submit',
    WHATSAPP_CLICK: 'WhatsApp Click',
    
    // Eventos de galería específicos
    EDITORIAL_GALLERY_VIEW: 'Editorial Gallery View',
    PORTFOLIO_GALLERY_VIEW: 'Portfolio Gallery View',
    EVENTOS_GALLERY_VIEW: 'Eventos Gallery View',
    PRODUCTOS_GALLERY_VIEW: 'Productos Gallery View',
    
    // Eventos de filtros
    GALLERY_FILTER_APPLIED: 'Gallery Filter Applied',
    
    // Eventos de lightbox
    LIGHTBOX_OPEN: 'Lightbox Open',
    LIGHTBOX_NAVIGATE: 'Lightbox Navigate',
    
    // Eventos de conversión
    CONTACT_INTEREST: 'Contact Interest',
    GALLERY_INTEREST: 'Gallery Interest'
  },
  
  // Propiedades personalizadas para eventos
  properties: {
    GALLERY_TYPE: 'gallery_type',
    FILTER_TYPE: 'filter_type',
    CONTACT_SOURCE: 'contact_source',
    PAGE_SECTION: 'page_section'
  }
};

// Configuración de desarrollo vs producción
export const isDevelopment = import.meta.env.DEV;
export const isProduction = import.meta.env.PROD;

// Configuración del tracker
export const trackerConfig = {
  domain: ANALYTICS_CONFIG.domain,
  trackLocalhost: isDevelopment,
  apiHost: 'https://plausible.io'
};
