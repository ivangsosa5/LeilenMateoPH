import { generateSitemapFile } from '../src/utils/sitemap.js';

// Generar sitemap durante el build
const generateSitemap = () => {
  try {
    const sitemap = generateSitemapFile();
    console.log('✅ Sitemap generado exitosamente');
    return sitemap;
  } catch (error) {
    console.error('❌ Error generando sitemap:', error);
    process.exit(1);
  }
};

// Ejecutar si es llamado directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  generateSitemap();
}

export default generateSitemap;




