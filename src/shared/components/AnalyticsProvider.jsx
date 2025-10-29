import { useEffect, useState } from 'react';
import Plausible  from 'plausible-tracker';
import { ANALYTICS_CONFIG, isDevelopment } from '../../config/analytics';

// Componente provider para analytics
const AnalyticsProvider = ({ children }) => {
  const [, setIsAnalyticsReady] = useState(false);

  useEffect(() => {
    // Función para cargar el script de Plausible de forma asíncrona
    const loadPlausibleScript = () => {
      return new Promise((resolve, reject) => {
        // Verificar si el script ya existe
        if (document.querySelector('script[data-domain]')) {
          resolve();
          return;
        }

        // Crear script element
        const script = document.createElement('script');
        script.src = ANALYTICS_CONFIG.scriptUrl;
        script.setAttribute('data-domain', ANALYTICS_CONFIG.domain);
        script.setAttribute('data-api', 'https://plausible.io/api/event');
        script.defer = true;
        script.async = true;

        // Event listeners
        script.onload = () => {
          if (isDevelopment) {
            console.log('✅ Plausible Analytics cargado correctamente');
          }
          resolve();
        };

        script.onerror = (error) => {
          console.error('❌ Error cargando Plausible Analytics:', error);
          reject(error);
        };

        // Agregar al head
        document.head.appendChild(script);
      });
    };

    // Cargar analytics solo en producción o cuando se especifique
    const shouldLoadAnalytics = isDevelopment ? 
      import.meta.env.VITE_ENABLE_ANALYTICS_DEV === 'true' : 
      true;

    if (shouldLoadAnalytics) {
      loadPlausibleScript()
        .then(() => {
          setIsAnalyticsReady(true);
        })
        .catch((error) => {
          console.error('Error inicializando analytics:', error);
          // Continuar sin analytics si hay error
          setIsAnalyticsReady(true);
        });
    } else {
      setIsAnalyticsReady(true);
    }
  }, []);

  // Renderizar children independientemente del estado de analytics
  return children;
};

export default AnalyticsProvider;

