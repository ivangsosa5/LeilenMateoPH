# Plausible Analytics - LeilenMateoPH

## 📊 Implementación Completa de Analytics

### ✅ Características Implementadas

#### 1. **Configuración Básica**
- ✅ Script asíncrono sin afectar performance
- ✅ Sin cookies (privacy-first)
- ✅ Configuración por variables de entorno
- ✅ Modo desarrollo con logs

#### 2. **Tracking de Page Views**
- ✅ Automático en cada página
- ✅ Propiedades personalizadas por página
- ✅ Tracking de secciones y tipos de página

#### 3. **Tracking de Galerías**
- ✅ Vista de galería al cargar
- ✅ Clicks en imágenes específicas
- ✅ Aplicación de filtros
- ✅ Navegación en lightbox

#### 4. **Tracking de Contacto**
- ✅ Inicio de formulario
- ✅ Envío de formulario
- ✅ Clicks en WhatsApp
- ✅ Interés en contacto

### 🛠️ Estructura de Archivos

```
src/
├── config/
│   └── analytics.js              # Configuración centralizada
├── hooks/
│   └── useAnalytics.js           # Hooks personalizados
├── componentes/
│   ├── analytics/
│   │   └── AnalyticsProvider.jsx # Provider asíncrono
│   └── lightbox/
│       └── LightboxTracker.jsx  # Tracking de lightbox
└── env.example                  # Variables de entorno
```

### 🎯 Eventos Trackeados

#### **Page Views**
- `Page View` - Vista de página con propiedades
- Propiedades: `page_section`, `page_type`, `gallery_type`

#### **Galerías**
- `Gallery View` - Vista de galería
- `Gallery Click` - Click en imagen
- `Gallery Filter Applied` - Aplicación de filtro
- `Lightbox Open` - Apertura de lightbox
- `Lightbox Navigate` - Navegación en lightbox

#### **Contacto**
- `Contact Form Start` - Inicio de formulario
- `Contact Form Submit` - Envío de formulario
- `WhatsApp Click` - Click en WhatsApp
- `Contact Interest` - Interés en contacto

### 🚀 Uso en Componentes

#### **Tracking Automático de Páginas:**
```jsx
import { usePageTracking } from '../hooks/useAnalytics';

const MiPagina = () => {
  usePageTracking('Nombre Página', {
    page_section: 'gallery',
    page_type: 'landing'
  });
  // ...
};
```

#### **Tracking de Galerías:**
```jsx
import { useGalleryTracking } from '../hooks/useAnalytics';

const Galeria = () => {
  const { trackGalleryClick, trackFilterApplied } = useGalleryTracking('editorial');
  
  const handleImageClick = (index, name) => {
    trackGalleryClick(index, name);
  };
  
  const handleFilter = (filterType) => {
    trackFilterApplied(filterType);
  };
  // ...
};
```

#### **Tracking de Contacto:**
```jsx
import { useContactTracking } from '../hooks/useAnalytics';

const Contacto = () => {
  const { trackFormStart, trackFormSubmit, trackWhatsAppClick } = useContactTracking();
  
  const handleSubmit = () => {
    trackFormSubmit('form');
  };
  
  const handleWhatsApp = () => {
    trackWhatsAppClick('button');
  };
  // ...
};
```

### ⚙️ Configuración

#### **Variables de Entorno:**
```bash
# .env
VITE_PLAUSIBLE_DOMAIN=leilenmateo.com
VITE_ENABLE_ANALYTICS_DEV=false
```

#### **Configuración de Desarrollo:**
```bash
# Habilitar analytics en desarrollo
VITE_ENABLE_ANALYTICS_DEV=true
```

### 📈 Propiedades Personalizadas

#### **Por Tipo de Galería:**
- `gallery_type`: editorial, portfolio, eventos, productos
- `filter_type`: retrato, paisaje, moda, etc.
- `image_index`: índice de la imagen
- `image_name`: nombre de la imagen

#### **Por Fuente de Contacto:**
- `contact_source`: form, button, whatsapp
- `session_type`: tipo de sesión seleccionada

#### **Por Sección de Página:**
- `page_section`: hero, gallery, contact, about
- `page_type`: landing, conversion, gallery

### 🔧 Hooks Disponibles

#### **useAnalytics()**
Hook principal con todas las funciones de tracking.

#### **usePageTracking(pageName, props)**
Tracking automático de page views.

#### **useGalleryTracking(galleryType)**
Tracking específico para galerías.

#### **useContactTracking()**
Tracking específico para formularios de contacto.

### 🎨 Integración con Componentes

#### **AnalyticsProvider**
Envuelve toda la aplicación y carga el script de Plausible de forma asíncrona.

#### **LightboxTracker**
Componente invisible que maneja el tracking de lightbox.

### 📊 Dashboard de Plausible

Los eventos aparecerán en el dashboard de Plausible con:
- **Eventos personalizados** con propiedades
- **Page views** con metadata
- **Filtros** por tipo de galería y fuente
- **Conversiones** de contacto

### 🚀 Performance

- ✅ Script cargado de forma asíncrona
- ✅ No bloquea el renderizado
- ✅ Fallback en caso de error
- ✅ Logs en desarrollo para debugging
- ✅ Sin cookies, respeta privacidad

### 🔍 Debugging

En desarrollo, todos los eventos se logean en consola:
```
📊 Analytics Event: Gallery View {gallery_type: "editorial"}
📊 Page View: Homepage {page_section: "hero"}
```

### 📋 Checklist de Implementación

- ✅ Script asíncrono configurado
- ✅ Page views automáticos
- ✅ Tracking de galerías
- ✅ Tracking de contacto
- ✅ Variables de entorno
- ✅ Hooks personalizados
- ✅ Sin cookies
- ✅ Performance optimizada







