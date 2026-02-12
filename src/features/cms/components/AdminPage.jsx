import React, { useEffect, useRef, useState } from 'react';
import CMS from 'netlify-cms-app';
import yaml from 'js-yaml';

// Variable global para evitar múltiples inicializaciones
let cmsInitialized = false;

// Componente para renderizar el CMS
const AdminPage = () => {
  const containerRef = useRef(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Función para inicializar el CMS
    const initializeCMS = async () => {
      if (typeof window === 'undefined') {
        return;
      }

      // Evitar múltiples inicializaciones
      if (cmsInitialized) {
        console.log('⚠️ CMS ya está inicializado, omitiendo nueva inicialización');
        setLoading(false);
        return;
      }

      // Verificar si el CMS ya existe en el DOM
      const existingCMS = document.getElementById('nc-root');
      if (existingCMS && existingCMS.children.length > 0 && cmsInitialized) {
        console.log('⚠️ CMS ya existe en el DOM');
        setLoading(false);
        return;
      }

      try {
        // Cargar el config.yml usando fetch
        const configResponse = await fetch('/admin/config.yml', {
          headers: {
            'Accept': 'text/yaml, text/plain, */*'
          },
          cache: 'no-cache'
        });
        
        if (!configResponse.ok) {
          throw new Error(`No se pudo cargar config.yml: ${configResponse.status} ${configResponse.statusText}`);
        }

        // Obtener el texto YAML
        const yamlText = await configResponse.text();
        
        // Verificar que no sea HTML
        if (yamlText.trim().startsWith('<!DOCTYPE') || yamlText.trim().startsWith('<html')) {
          throw new Error('Se recibió HTML en lugar de YAML. El middleware de Vite no está funcionando correctamente.');
        }

        // Parsear el YAML a objeto JavaScript
        const config = yaml.load(yamlText);
        
        if (!config) {
          throw new Error('El archivo config.yml está vacío o no es válido');
        }

        // Validar que tenga las propiedades requeridas
        const requiredProps = ['backend', 'media_folder', 'collections'];
        const missingProps = requiredProps.filter(prop => !config[prop]);
        
        if (missingProps.length > 0) {
          throw new Error(`Faltan propiedades requeridas en config.yml: ${missingProps.join(', ')}`);
        }

        // Limpiar cualquier contenido previo del contenedor
        if (containerRef.current) {
          containerRef.current.innerHTML = '';
        }

        // Inicializar CMS solo una vez
        CMS.init({
          config,
        });
        
        cmsInitialized = true;
        setLoading(false);
        console.log('✅ CMS inicializado correctamente');
      } catch (err) {
        console.error('❌ Error inicializando CMS:', err);
        setError(err.message);
        setLoading(false);
        cmsInitialized = false; // Permitir reintentar en caso de error
      }
    };

    // Esperar a que el DOM esté listo
    const timer = setTimeout(() => {
      initializeCMS();
    }, 100);

    // Cleanup solo si el componente se desmonta completamente
    return () => {
      clearTimeout(timer);
      // NO limpiar cmsInitialized aquí porque queremos que persista entre re-renders
      // Solo se resetea si hay un error
    };
  }, []); // Array de dependencias vacío - solo ejecutar una vez

  return (
    <div className="relative min-h-screen w-full mt-20">
      <div 
        id="nc-root" 
        ref={containerRef}
        className="min-h-screen"
      >
        {/* Netlify CMS se renderizará automáticamente dentro de este div por el ID nc-root */}
      </div>

      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-[9999]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium">Cargando CMS...</p>
          </div>
        </div>
      )}

      {error && (
        <div className="fixed inset-0 flex items-center justify-center bg-red-50 z-[9999] p-6">
          <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-2xl border border-red-100">
            <h1 className="text-2xl font-bold text-red-600 mb-4 flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Error cargando CMS
            </h1>
            <p className="text-gray-700 mb-6 bg-red-50 p-3 rounded text-sm italic border-l-4 border-red-400">
              {error}
            </p>
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200 text-left mb-6">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Sugerencias:</p>
              <ul className="text-sm text-gray-600 list-disc list-inside space-y-2">
                <li>Verifica que <code className="bg-gray-200 px-1 rounded text-red-600">public/admin/config.yml</code> exista.</li>
                <li>Comprueba la sintaxis YAML.</li>
                <li>Asegúrate de que el proxy esté activo: <code className="bg-gray-800 text-white px-2 py-0.5 rounded text-xs select-all">npm run cms:proxy</code></li>
              </ul>
            </div>
            <button
              onClick={() => {
                cmsInitialized = false;
                window.location.reload();
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-all shadow-md active:scale-[0.98]"
            >
              Reintentar Carga
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;