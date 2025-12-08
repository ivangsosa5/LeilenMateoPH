import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '../../../test/test-utils'

// Estado controlado de query params
const searchState = { view: null }
const mockNavigate = vi.fn()

// Mocks de react-router-dom y hooks de datos
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useParams: () => ({ categorySlug: 'editorial' }),
    useSearchParams: () => [
      {
        get: (key) => searchState[key] ?? null,
      },
    ],
    useNavigate: () => mockNavigate,
  }
})

vi.mock('../../../shared/hooks/useContent', () => ({
  useGalleryCategories: () => ({
    categories: [
      {
        id: 'editorial',
        slug: 'editorial',
        title: 'Editorial Photography',
        description: 'Creative and artistic photography sessions',
        subcategories: [
          { id: 'portraits', name: 'Portraits' },
          { id: 'fashion', name: 'Fashion' },
        ],
      },
    ],
    loading: false,
    error: null,
  }),
}))

// Mocks de CategoryInfo específicos (carga dinámica)
vi.mock('./categoryInfo/CategoryInfoEditorial', () => ({
  default: () => (
    <div data-testid="category-info">
      <h2>Editorial Photography</h2>
      <p>Creative and artistic photography sessions</p>
    </div>
  ),
}))
vi.mock('./categoryInfo/CategoryInfoPortfolio', () => ({ default: () => null }))
vi.mock('./categoryInfo/CategoryInfoEvents', () => ({ default: () => null }))
vi.mock('./categoryInfo/CategoryInfoProduct', () => ({ default: () => null }))

// Mock de GalleryGrid (esperamos props que deberá pasar CategoryView)
vi.mock('./GalleryGrid', () => ({
  default: ({ photos = [], limit, subcategory, expanded, onPhotoClick }) => (
    <div
      data-testid="gallery-grid"
      data-limit={limit ?? ''}
      data-subcategory={subcategory ?? ''}
      data-expanded={expanded ? 'true' : 'false'}
      aria-label="Gallery grid"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
    >
      {photos
        .filter((photo) => !subcategory || photo.subcategory === subcategory)
        .slice(0, limit ?? photos.length)
        .map((photo) => (
          <button
            key={photo.id}
            data-testid={`photo-${photo.id}`}
            onClick={() => onPhotoClick?.(photo, photos)}
          >
            {photo.title}
          </button>
        ))}
    </div>
  ),
}))

vi.mock('./ExpandButton', () => ({
  default: ({ onClick, expanded }) => (
    <button
      data-testid="expand-button"
      onClick={onClick}
      aria-expanded={expanded}
      tabIndex={0}
    >
      {expanded ? 'Collapse' : 'Expand'}
    </button>
  ),
}))

// Componente bajo test (aún no implementado - fase RED)
import CategoryView from './CategoryView'

describe('CategoryView - Story 2.2a (vista expandida con filtro)', () => {
  const photos = [
    { id: '1', title: 'Portrait 1', subcategory: 'portraits' },
    { id: '2', title: 'Fashion 1', subcategory: 'fashion' },
    { id: '3', title: 'Portrait 2', subcategory: 'portraits' },
  ]

  beforeEach(() => {
    vi.clearAllMocks()
    searchState.view = null
  })

  describe('Render y layout en modo normal vs expandido', () => {
    it('muestra grid limitado (previewLimit) en modo normal (sin ?view=expanded)', () => {
      render(<CategoryView photos={photos} previewLimit={2} />)

      const grid = screen.getByTestId('gallery-grid')
      expect(grid).toHaveAttribute('data-limit', '2')
      expect(grid).toHaveAttribute('data-expanded', 'false')
    })

    it('muestra grid full-width sin límite en modo expandido (?view=expanded)', () => {
      searchState.view = 'expanded'
      render(<CategoryView photos={photos} previewLimit={2} />)

      const grid = screen.getByTestId('gallery-grid')
      expect(grid).toHaveAttribute('data-limit', '')
      expect(grid).toHaveAttribute('data-expanded', 'true')
    })
  })

  describe('Filtro de subcategoría', () => {
    it('muestra filtro de subcategoría solo en vista expandida', () => {
      // Vista normal
      render(<CategoryView photos={photos} />)
      expect(screen.queryByTestId('subcategory-filter')).not.toBeInTheDocument()

      // Vista expandida
      searchState.view = 'expanded'
      render(<CategoryView photos={photos} />)
      expect(screen.getByTestId('subcategory-filter')).toBeInTheDocument()
      expect(screen.getByText('All')).toBeInTheDocument()
      expect(screen.getByText('Portraits')).toBeInTheDocument()
      expect(screen.getByText('Fashion')).toBeInTheDocument()
    })

    it('al seleccionar una subcategoría, el grid muestra solo esas fotos', () => {
      searchState.view = 'expanded'
      render(<CategoryView photos={photos} />)

      fireEvent.click(screen.getByText('Portraits'))

      const grid = screen.getByTestId('gallery-grid')
      expect(grid).toHaveAttribute('data-subcategory', 'portraits')
      expect(screen.getByTestId('photo-1')).toBeInTheDocument()
      expect(screen.getByTestId('photo-3')).toBeInTheDocument()
      expect(screen.queryByTestId('photo-2')).not.toBeInTheDocument()
    })

    it('la opción “All” muestra todas las fotos', () => {
      searchState.view = 'expanded'
      render(<CategoryView photos={photos} />)

      fireEvent.click(screen.getByText('All'))

      expect(screen.getByTestId('photo-1')).toBeInTheDocument()
      expect(screen.getByTestId('photo-2')).toBeInTheDocument()
      expect(screen.getByTestId('photo-3')).toBeInTheDocument()
    })
  })

  describe('Navegación y expand', () => {
    it('click en “Expandir” navega a ?view=expanded', () => {
      render(<CategoryView photos={photos} />)

      fireEvent.click(screen.getByTestId('expand-button'))
      expect(mockNavigate).toHaveBeenCalledWith(expect.stringContaining('?view=expanded'), { replace: false })
    })
  })

  describe('Interacción con fotos y lightbox', () => {
    it('click en una foto dispara callback con el set filtrado', () => {
      const onPhotoClick = vi.fn()
      searchState.view = 'expanded'
      render(<CategoryView photos={photos} onPhotoClick={onPhotoClick} />)

      // Filtrar a portraits
      fireEvent.click(screen.getByText('Portraits'))
      fireEvent.click(screen.getByTestId('photo-1'))

      expect(onPhotoClick).toHaveBeenCalledTimes(1)
      const [photo, filteredSet] = onPhotoClick.mock.calls[0]
      expect(photo.id).toBe('1')
      expect(filteredSet).toHaveLength(2)
      expect(filteredSet.every((p) => p.subcategory === 'portraits')).toBe(true)
    })
  })

  describe('Estados loading/error', () => {
    it('muestra estado loading', () => {
      render(<CategoryView photos={photos} loading />)

      expect(screen.getByTestId('category-view-loading')).toBeInTheDocument()
    })

    it('muestra estado de error', () => {
      render(<CategoryView photos={photos} error="Failed to load category" />)

      expect(screen.getByText('Failed to load category')).toBeInTheDocument()
    })
  })

  describe('Responsive básico', () => {
    it('incluye clases de grid responsivas', () => {
      render(<CategoryView photos={photos} />)

      const container = screen.getByTestId('category-view')
      expect(container).toHaveClass('grid', 'grid-cols-1')
      expect(container.className).toMatch(/lg:grid-cols-\d+/)
    })
  })

  describe('Accesibilidad', () => {
    it('aria-label en secciones', () => {
      render(<CategoryView photos={photos} />)

      const container = screen.getByTestId('category-view')
      expect(container).toHaveAttribute('aria-label', 'Category view')
    })

    it('botones del filtro son focusables', () => {
      searchState.view = 'expanded'
      render(<CategoryView photos={photos} />)

      const filterButtons = screen.getAllByTestId('subcategory-filter-option')
      filterButtons.forEach((btn) => {
        expect(btn).toHaveAttribute('tabindex', '0')
      })
    })
  })
})

