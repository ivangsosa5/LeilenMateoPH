// Configuración del sitemap dinámico
export const generateSitemap = () => {
  const baseUrl = 'https://leilenmateo.com';
  const currentDate = new Date().toISOString();
  
  // Páginas estáticas principales
  const staticPages = [
    {
      url: '',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '1.0'
    },
    {
      url: '/soy-leilen',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.8'
    },
    {
      url: '/contacto',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.7'
    }
  ];

  // Páginas de galerías por tipo de sesión
  const galleryPages = [
    {
      url: '/galeria/editorial',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.9'
    },
    {
      url: '/galeria/portfolio',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.9'
    },
    {
      url: '/galeria/eventos',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.9'
    },
    {
      url: '/galeria/productos',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.9'
    }
  ];

  const allPages = [...staticPages, ...galleryPages];

  // Generar XML del sitemap
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return sitemapXml;
};

// Función para generar sitemap en tiempo de build
export const generateSitemapFile = async () => {
  const sitemap = generateSitemap();
  
  // En un entorno de build, escribir el archivo
  if (typeof window === 'undefined') {
    try {
      const fs = await import('fs');
      const path = await import('path');
      const publicPath = path.join(process.cwd(), 'public');
      const sitemapPath = path.join(publicPath, 'sitemap.xml');
      
      fs.writeFileSync(sitemapPath, sitemap);
      console.log('Sitemap generado en:', sitemapPath);
    } catch (error) {
      console.warn('No se pudo escribir el sitemap:', error.message);
    }
  }
  
  return sitemap;
};




