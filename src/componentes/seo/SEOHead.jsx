import { Helmet } from 'react-helmet-async';

const SEOHead = ({ 
  title = "Leilen Mateo - Fotógrafa Profesional",
  description = "Fotógrafa profesional especializada en sesiones editoriales, portfolios, eventos y fotografía de productos. Capturando momentos únicos con estilo y profesionalismo.",
  keywords = "fotógrafa, fotografía profesional, sesiones editoriales, portfolio, eventos, fotografía de productos, Leilen Mateo",
  image = "/og-image.jpg",
  url = "",
  type = "website",
  locale = "es_ES"
}) => {
  const fullUrl = url ? `https://leilenmateo.com${url}` : "https://leilenmateo.com";
  const fullImageUrl = image.startsWith('http') ? image : `https://leilenmateo.com${image}`;

  return (
    <Helmet>
      {/* Meta tags básicos */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Leilen Mateo" />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="Leilen Mateo Photography" />
      <meta property="og:locale" content={locale} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      
      {/* Schema.org structured data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Leilen Mateo",
          "jobTitle": "Fotógrafa Profesional",
          "description": description,
          "url": fullUrl,
          "image": fullImageUrl,
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
        })}
      </script>
    </Helmet>
  );
};

export default SEOHead;







