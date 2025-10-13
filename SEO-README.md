# SEO Configuration - LeilenMateoPH

## 📋 Implementación Completa de SEO Dinámico

### ✅ Características Implementadas

#### 1. **React Helmet Async**
- Configurado en `App.jsx` con `HelmetProvider`
- Manejo dinámico de meta tags por página

#### 2. **Componente SEOHead**
- Meta tags básicos (title, description, keywords)
- Open Graph completo para redes sociales
- Twitter Cards
- Schema.org structured data
- URLs canónicas

#### 3. **Configuración por Página**
- **Homepage**: SEO optimizado para página principal
- **Galerías**: SEO específico para cada tipo de sesión
  - Editorial
  - Portfolio  
  - Eventos
  - Productos
- **Soy Leilen**: Página personal con SEO
- **Contacto**: SEO para conversión

#### 4. **Sitemap Dinámico**
- Generación automática en build
- Incluye todas las páginas principales
- Prioridades y frecuencias optimizadas
- Script: `npm run generate:sitemap`

#### 5. **Robots.txt**
- Configurado para permitir indexación
- Referencia al sitemap
- Protección de áreas admin

### 🛠️ Uso

#### En Componentes:
```jsx
import SEOHead from '../seo/SEOHead';

const MiPagina = () => (
  <>
    <SEOHead 
      title="Título específico"
      description="Descripción específica"
      keywords="palabras clave"
      url="/mi-pagina"
      image="/og-mi-pagina.jpg"
    />
    {/* Contenido */}
  </>
);
```

#### Con Hook useSEO:
```jsx
import { useSEO, SEOConfigs } from '../hooks/useSEO';

const MiPagina = () => {
  const seoData = useSEO(SEOConfigs.editorial);
  // Usar seoData en SEOHead
};
```

### 📁 Estructura de Archivos

```
src/
├── componentes/
│   ├── seo/
│   │   └── SEOHead.jsx          # Componente principal SEO
│   ├── galeria/                 # Páginas de galería con SEO
│   ├── soyLeilen/              # Página personal con SEO
│   └── contacto/               # Página contacto con SEO
├── hooks/
│   └── useSEO.js               # Hook personalizado SEO
├── config/
│   └── seo.js                  # Configuración centralizada
└── utils/
    └── sitemap.js              # Generación sitemap

public/
└── robots.txt                  # Configuración robots

scripts/
└── generate-sitemap.js         # Script generación sitemap
```

### 🚀 Comandos

```bash
# Generar sitemap manualmente
npm run generate:sitemap

# Build con sitemap automático
npm run build
```

### 📊 Meta Tags Incluidos

- **Básicos**: title, description, keywords, author
- **Open Graph**: og:title, og:description, og:image, og:url, og:type
- **Twitter**: twitter:card, twitter:title, twitter:description, twitter:image
- **Técnicos**: robots, canonical, viewport
- **Structured Data**: JSON-LD para Person schema

### 🎯 Optimizaciones

- URLs absolutas para Open Graph
- Imágenes optimizadas para redes sociales
- Schema.org para rich snippets
- Sitemap automático en build
- Configuración centralizada y reutilizable

### 📈 Próximos Pasos

1. Crear imágenes OG específicas para cada página
2. Implementar analytics (Plausible)
3. Configurar Google Search Console
4. Optimizar Core Web Vitals
5. Implementar breadcrumbs structured data







