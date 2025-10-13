import { useState, useEffect } from 'react';

// Hook para cargar contenido desde los archivos markdown
export const useContent = (contentPath) => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/content/${contentPath}`);
        
        if (!response.ok) {
          throw new Error(`Failed to load content: ${response.statusText}`);
        }
        
        const text = await response.text();
        
        // Parse frontmatter
        const frontmatterMatch = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
        
        if (frontmatterMatch) {
          const [, frontmatter, markdown] = frontmatterMatch;
          const metadata = {};
          
          // Simple YAML parser for basic key-value pairs
          frontmatter.split('\n').forEach(line => {
            const match = line.match(/^(\w+):\s*(.*)$/);
            if (match) {
              const [, key, value] = match;
              metadata[key] = value.replace(/^["']|["']$/g, ''); // Remove quotes
            }
          });
          
          setContent({
            metadata,
            markdown,
            raw: text
          });
        } else {
          setContent({
            metadata: {},
            markdown: text,
            raw: text
          });
        }
        
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error loading content:', err);
      } finally {
        setLoading(false);
      }
    };

    if (contentPath) {
      loadContent();
    }
  }, [contentPath]);

  return { content, loading, error };
};

// Hook para cargar galerías
export const useGalleries = (category = null) => {
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadGalleries = async () => {
      try {
        setLoading(true);
        
        // En un entorno real, esto cargaría desde una API o archivos
        // Por ahora, simulamos la carga de galerías
        const mockGalleries = [
          {
            id: 'sample-editorial-session',
            title: 'Fashion Editorial - Spring Collection',
            description: 'A vibrant fashion editorial showcasing spring colors and textures',
            category: 'Editorial',
            subcategory: 'Fashion Editorial',
            featuredImage: '/images/galleries/editorial-spring/featured.jpg',
            date: '2024-03-15T10:00:00.000Z',
            published: true
          }
        ];
        
        const filteredGalleries = category 
          ? mockGalleries.filter(gallery => gallery.category === category)
          : mockGalleries;
        
        setGalleries(filteredGalleries);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error loading galleries:', err);
      } finally {
        setLoading(false);
      }
    };

    loadGalleries();
  }, [category]);

  return { galleries, loading, error };
};

// Hook para cargar categorías de galería
export const useGalleryCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        
        // Cargar categorías desde los archivos de contenido
        const categoryFiles = [
          'editorial.md',
          'portfolio.md', 
          'events.md',
          'product.md'
        ];
        
        const loadedCategories = await Promise.all(
          categoryFiles.map(async (file) => {
            try {
              const response = await fetch(`/content/gallery-categories/${file}`);
              if (response.ok) {
                const _text = await response.text();
                // Parse frontmatter aquí
                return {
                  id: file.replace('.md', ''),
                  title: file.replace('.md', '').charAt(0).toUpperCase() + file.replace('.md', '').slice(1),
                  description: `Description for ${file.replace('.md', '')}`,
                  heroImage: `/images/${file.replace('.md', '')}-hero.jpg`,
                  order: 1
                };
              }
            } catch (err) {
              console.warn(`Failed to load category ${file}:`, err);
            }
            return null;
          })
        );
        
        setCategories(loadedCategories.filter(Boolean));
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error loading categories:', err);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  return { categories, loading, error };
};
