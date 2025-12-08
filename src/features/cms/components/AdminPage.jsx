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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando CMS...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error cargando CMS</h1>
          <p className="text-gray-700 mb-4">{error}</p>
          <div className="bg-gray-100 p-4 rounded">
            <p className="text-sm text-gray-600 mb-2">Verifica:</p>
            <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
              <li>Que el archivo <code className="bg-gray-200 px-1 rounded">public/admin/config.yml</code> exista</li>
              <li>Que el archivo tenga sintaxis YAML válida</li>
              <li>Que todas las propiedades requeridas estén presentes</li>
              <li>Que el servidor se haya reiniciado después de cambiar vite.config.js</li>
            </ul>
          </div>
          <button
            onClick={() => {
              cmsInitialized = false; // Resetear para permitir reintentar
              window.location.reload();
            }}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Recargar página
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      id="nc-root" 
      ref={containerRef}
      className="min-h-screen flex items-center justify-center"
    >
      {/* Netlify CMS se renderizará automáticamente aquí */}
    </div>
  );
};

export default AdminPage;