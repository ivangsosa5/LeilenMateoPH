import { useState, useEffect } from 'react';
import yaml from 'js-yaml';

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
                const text = await response.text();

                // Parsear frontmatter YAML entre --- y ---
                const match = text.match(/^---\s*([\s\S]*?)\s*---\s*([\s\S]*)$/);
                let frontmatter = {};
                let body = '';
                if (match) {
                  try {
                    frontmatter = yaml.load(match[1]) || {};
                  } catch(err) {
                    console.warn('Could not parse YAML:', file, err);
                  }
                  body = match[2]?.trim();
                }
                return {
                  id: frontmatter.id || file.replace('.md', ''),
                  slug: frontmatter.slug || file.replace('.md', ''),
                  title: frontmatter.title || '',
                  description: frontmatter.description || body || '',
                  order: frontmatter.order || 1,
                  heroImage: frontmatter.heroImage || null,
                  subcategories: frontmatter.subcategories || [],
                  photos: frontmatter.photos || []
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
