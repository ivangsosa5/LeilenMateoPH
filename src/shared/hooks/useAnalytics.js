import { useEffect, useCallback } from 'react';
import Plausible  from 'plausible-tracker';
import { ANALYTICS_CONFIG, trackerConfig, isDevelopment } from '../../config/analytics';

// Inicializar Plausible tracker
const plausible = new Plausible(trackerConfig);

// Hook personalizado para analytics
export const useAnalytics = () => {
  // Función para trackear eventos personalizados
  const trackEvent = useCallback((eventName, props = {}) => {
    if (isDevelopment) {
      console.log('📊 Analytics Event:', eventName, props);
    }
    
    try {
      plausible.trackEvent(eventName, {
        props: props
      });
    } catch (error) {
      console.error('Error tracking event:', error);
    }
  }, []);

  // Función para trackear page views
  const trackPageView = useCallback((pageName = '', props = {}) => {
    if (isDevelopment) {
      console.log('📊 Page View:', pageName, props);
    }
    
    try {
      plausible.trackPageview({
        url: window.location.href,
        ...props
      });
    } catch (error) {
      console.error('Error tracking page view:', error);
    }
  }, []);

  // Función para trackear eventos de galería
  const trackGalleryEvent = useCallback((eventType, galleryType, additionalProps = {}) => {
    trackEvent(eventType, {
      [ANALYTICS_CONFIG.properties.GALLERY_TYPE]: galleryType,
      ...additionalProps
    });
  }, [trackEvent]);

  // Función para trackear eventos de contacto
  const trackContactEvent = useCallback((eventType, source = 'unknown', additionalProps = {}) => {
    trackEvent(eventType, {
      [ANALYTICS_CONFIG.properties.CONTACT_SOURCE]: source,
      ...additionalProps
    });
  }, [trackEvent]);

  // Función para trackear filtros de galería
  const trackGalleryFilter = useCallback((filterType, galleryType, additionalProps = {}) => {
    trackEvent(ANALYTICS_CONFIG.events.GALLERY_FILTER_APPLIED, {
      [ANALYTICS_CONFIG.properties.FILTER_TYPE]: filterType,
      [ANALYTICS_CONFIG.properties.GALLERY_TYPE]: galleryType,
      ...additionalProps
    });
  }, [trackEvent]);

  // Función para trackear eventos de lightbox
  const trackLightboxEvent = useCallback((eventType, imageIndex, galleryType, additionalProps = {}) => {
    trackEvent(eventType, {
      image_index: imageIndex,
      [ANALYTICS_CONFIG.properties.GALLERY_TYPE]: galleryType,
      ...additionalProps
    });
  }, [trackEvent]);

  return {
    trackEvent,
    trackPageView,
    trackGalleryEvent,
    trackContactEvent,
    trackGalleryFilter,
    trackLightboxEvent,
    events: ANALYTICS_CONFIG.events,
    properties: ANALYTICS_CONFIG.properties
  };
};

// Hook específico para tracking automático de page views
export const usePageTracking = (pageName, pageProps = {}) => {
  const { trackPageView } = useAnalytics();

  useEffect(() => {
    // Track page view cuando el componente se monta
    trackPageView(pageName, pageProps);
  }, [pageName, trackPageView, pageProps]);
};

// Hook para tracking de galerías
export const useGalleryTracking = (galleryType) => {
  const { trackGalleryEvent, trackGalleryFilter } = useAnalytics();

  const trackGalleryView = useCallback(() => {
    trackGalleryEvent(ANALYTICS_CONFIG.events.GALLERY_VIEW, galleryType);
  }, [trackGalleryEvent, galleryType]);

  const trackGalleryClick = useCallback((imageIndex, imageName) => {
    trackGalleryEvent(ANALYTICS_CONFIG.events.GALLERY_CLICK, galleryType, {
      image_index: imageIndex,
      image_name: imageName
    });
  }, [trackGalleryEvent, galleryType]);

  const trackFilterApplied = useCallback((filterType) => {
    trackGalleryFilter(filterType, galleryType);
  }, [trackGalleryFilter, galleryType]);

  return {
    trackGalleryView,
    trackGalleryClick,
    trackFilterApplied
  };
};

// Hook para tracking de contacto
export const useContactTracking = () => {
  const { trackContactEvent } = useAnalytics();

  const trackFormStart = useCallback((source = 'form') => {
    trackContactEvent(ANALYTICS_CONFIG.events.CONTACT_FORM_START, source);
  }, [trackContactEvent]);

  const trackFormSubmit = useCallback((source = 'form') => {
    trackContactEvent(ANALYTICS_CONFIG.events.CONTACT_FORM_SUBMIT, source);
  }, [trackContactEvent]);

  const trackWhatsAppClick = useCallback((source = 'button') => {
    trackContactEvent(ANALYTICS_CONFIG.events.WHATSAPP_CLICK, source);
  }, [trackContactEvent]);

  const trackContactInterest = useCallback((source = 'link') => {
    trackContactEvent(ANALYTICS_CONFIG.events.CONTACT_INTEREST, source);
  }, [trackContactEvent]);

  return {
    trackFormStart,
    trackFormSubmit,
    trackWhatsAppClick,
    trackContactInterest
  };
};

