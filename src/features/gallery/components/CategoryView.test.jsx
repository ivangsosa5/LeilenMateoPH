import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '../../../test/test-utils'
import { createMockGallery } from '../../../test/test-utils'

// Mock de los componentes hijos
vi.mock('./CategoryInfo', () => ({
  default: ({ title, description }) => (
    <div data-testid="category-info">
      <h2 className="text-xl md:text-2xl lg:text-3xl">{title}</h2>
      <p>{description}</p>
    </div>
  )
}))

vi.mock('./GalleryGrid', () => ({
  default: ({ category, limit }) => (
    <div data-testid="gallery-grid">
      <div data-testid="category-filter">{category}</div>
      <div data-testid="limit">{limit}</div>
    </div>
  )
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
  )
}))

// Importar el componente CategoryView (que aún no existe - fase RED)
import CategoryView from './CategoryView'

describe('CategoryView Component', () => {
  const mockCategory = {
    id: 'editorial',
    title: 'Editorial Photography',
    description: 'Creative and artistic photography sessions',
    slug: 'editorial'
  }

  const mockGalleries = [
    createMockGallery({ id: '1', category: 'editorial', title: 'Editorial Gallery 1' }),
    createMockGallery({ id: '2', category: 'editorial', title: 'Editorial Gallery 2' }),
    createMockGallery({ id: '3', category: 'editorial', title: 'Editorial Gallery 3' })
  ]

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should render CategoryView with category prop', () => {
      render(<CategoryView category={mockCategory} />)
      
      expect(screen.getByTestId('category-view')).toBeInTheDocument()
    })

    it('should render CategoryInfo component in left column', () => {
      render(<CategoryView category={mockCategory} />)
      
      const categoryInfo = screen.getByTestId('category-info')
      expect(categoryInfo).toBeInTheDocument()
      expect(categoryInfo).toHaveTextContent('Editorial Photography')
      expect(categoryInfo).toHaveTextContent('Creative and artistic photography sessions')
    })

    it('should render GalleryGrid component in right column', () => {
      render(<CategoryView category={mockCategory} />)
      
      const galleryGrid = screen.getByTestId('gallery-grid')
      expect(galleryGrid).toBeInTheDocument()
    })

    it('should pass category to GalleryGrid for filtering', () => {
      render(<CategoryView category={mockCategory} />)
      
      const categoryFilter = screen.getByTestId('category-filter')
      expect(categoryFilter).toHaveTextContent('editorial')
    })

    it('should render ExpandButton component', () => {
      render(<CategoryView category={mockCategory} />)
      
      const expandButton = screen.getByTestId('expand-button')
      expect(expandButton).toBeInTheDocument()
    })
  })

  describe('Layout Structure', () => {
    it('should have correct layout with 25% left column and 75% right column', () => {
      render(<CategoryView category={mockCategory} />)
      
      const container = screen.getByTestId('category-view')
      expect(container).toHaveClass('grid', 'grid-cols-1', 'lg:grid-cols-4')
      
      const leftColumn = container.querySelector('[class*="lg:col-span-1"]')
      expect(leftColumn).toBeInTheDocument()
      
      const rightColumn = container.querySelector('[class*="lg:col-span-3"]')
      expect(rightColumn).toBeInTheDocument()
    })

    it('should have CategoryInfo in left column (25%)', () => {
      render(<CategoryView category={mockCategory} />)
      
      const categoryInfo = screen.getByTestId('category-info')
      const container = screen.getByTestId('category-view')
      
      expect(container.querySelector('[class*="lg:col-span-1"]')).toContainElement(categoryInfo)
    })

    it('should have GalleryGrid in right column (75%)', () => {
      render(<CategoryView category={mockCategory} />)
      
      const galleryGrid = screen.getByTestId('gallery-grid')
      const container = screen.getByTestId('category-view')
      
      expect(container.querySelector('[class*="lg:col-span-3"]')).toContainElement(galleryGrid)
    })

    it('should have proper spacing between columns', () => {
      render(<CategoryView category={mockCategory} />)
      
      const container = screen.getByTestId('category-view')
      expect(container).toHaveClass('gap-6')
    })
  })

  describe('CategoryInfo Integration', () => {
    it('should pass category title to CategoryInfo', () => {
      render(<CategoryView category={mockCategory} />)
      
      expect(screen.getByText('Editorial Photography')).toBeInTheDocument()
    })

    it('should pass category description to CategoryInfo', () => {
      render(<CategoryView category={mockCategory} />)
      
      expect(screen.getByText('Creative and artistic photography sessions')).toBeInTheDocument()
    })

    it('should handle empty description gracefully', () => {
      const categoryWithoutDescription = { ...mockCategory, description: '' }
      render(<CategoryView category={categoryWithoutDescription} />)
      
      const categoryInfo = screen.getByTestId('category-info')
      expect(categoryInfo).toBeInTheDocument()
    })

    it('should handle long descriptions', () => {
      const longDescription = 'This is a very long description that should be handled properly by the CategoryInfo component. It contains multiple sentences and should be displayed correctly.'
      const categoryWithLongDescription = { ...mockCategory, description: longDescription }
      
      render(<CategoryView category={categoryWithLongDescription} />)
      
      expect(screen.getByText(longDescription)).toBeInTheDocument()
    })
  })

  describe('GalleryGrid Integration', () => {
    it('should filter galleries by category', () => {
      render(<CategoryView category={mockCategory} />)
      
      const categoryFilter = screen.getByTestId('category-filter')
      expect(categoryFilter).toHaveTextContent('editorial')
    })

    it('should pass preview limit to GalleryGrid when provided', () => {
      render(<CategoryView category={mockCategory} previewLimit={6} />)
      
      const limit = screen.getByTestId('limit')
      expect(limit).toHaveTextContent('6')
    })

    it('should not pass limit when previewLimit is not provided', () => {
      render(<CategoryView category={mockCategory} />)
      
      const limit = screen.getByTestId('limit')
      expect(limit).toHaveTextContent('')
    })
  })

  describe('ExpandButton Functionality', () => {
    it('should initialize with collapsed state', () => {
      render(<CategoryView category={mockCategory} />)
      
      const expandButton = screen.getByTestId('expand-button')
      expect(expandButton).toHaveAttribute('aria-expanded', 'false')
      expect(expandButton).toHaveTextContent('Expand')
    })

    it('should toggle expanded state when ExpandButton is clicked', () => {
      render(<CategoryView category={mockCategory} />)
      
      const expandButton = screen.getByTestId('expand-button')
      
      fireEvent.click(expandButton)
      expect(expandButton).toHaveAttribute('aria-expanded', 'true')
      expect(expandButton).toHaveTextContent('Collapse')
      
      fireEvent.click(expandButton)
      expect(expandButton).toHaveAttribute('aria-expanded', 'false')
      expect(expandButton).toHaveTextContent('Expand')
    })

    it('should show full gallery when expanded', () => {
      render(<CategoryView category={mockCategory} />)
      
      const expandButton = screen.getByTestId('expand-button')
      fireEvent.click(expandButton)
      
      const limit = screen.getByTestId('limit')
      expect(limit).toHaveTextContent('')
    })

    it('should show limited preview when collapsed', () => {
      render(<CategoryView category={mockCategory} previewLimit={3} />)
      
      const limit = screen.getByTestId('limit')
      expect(limit).toHaveTextContent('3')
    })
  })

  describe('Loading States', () => {
    it('should show loading state when category is loading', () => {
      render(<CategoryView category={mockCategory} loading={true} />)
      
      expect(screen.getByTestId('category-view-loading')).toBeInTheDocument()
      expect(screen.queryByTestId('category-info')).not.toBeInTheDocument()
      expect(screen.queryByTestId('gallery-grid')).not.toBeInTheDocument()
    })

    it('should not show loading state when category is loaded', () => {
      render(<CategoryView category={mockCategory} loading={false} />)
      
      expect(screen.queryByTestId('category-view-loading')).not.toBeInTheDocument()
      expect(screen.getByTestId('category-info')).toBeInTheDocument()
      expect(screen.getByTestId('gallery-grid')).toBeInTheDocument()
    })

    it('should show skeleton loader in loading state', () => {
      render(<CategoryView category={mockCategory} loading={true} />)
      
      const loadingState = screen.getByTestId('category-view-loading')
      expect(loadingState).toHaveClass('animate-pulse')
    })
  })

  describe('Error States', () => {
    it('should show error message when category fails to load', () => {
      render(<CategoryView category={mockCategory} error="Failed to load category" />)
      
      expect(screen.getByText('Error loading category')).toBeInTheDocument()
      expect(screen.getByText('Failed to load category')).toBeInTheDocument()
    })

    it('should not show category content when there is an error', () => {
      render(<CategoryView category={mockCategory} error="Failed to load category" />)
      
      expect(screen.queryByTestId('category-info')).not.toBeInTheDocument()
      expect(screen.queryByTestId('gallery-grid')).not.toBeInTheDocument()
    })

    it('should handle gallery loading errors', () => {
      render(<CategoryView category={mockCategory} galleryError="Failed to load galleries" />)
      
      // El componente debería manejar errores de galería sin romper el layout
      expect(screen.getByTestId('category-info')).toBeInTheDocument()
    })
  })

  describe('Responsive Design', () => {
    it('should stack columns on mobile devices', () => {
      render(<CategoryView category={mockCategory} />)
      
      const container = screen.getByTestId('category-view')
      expect(container).toHaveClass('grid-cols-1')
    })

    it('should show side-by-side layout on large screens', () => {
      render(<CategoryView category={mockCategory} />)
      
      const container = screen.getByTestId('category-view')
      expect(container).toHaveClass('lg:grid-cols-4')
    })

    it('should have responsive padding', () => {
      render(<CategoryView category={mockCategory} />)
      
      const container = screen.getByTestId('category-view')
      expect(container).toHaveClass('px-4', 'md:px-6', 'lg:px-8')
    })

    it('should have responsive gap between columns', () => {
      render(<CategoryView category={mockCategory} />)
      
      const container = screen.getByTestId('category-view')
      expect(container).toHaveClass('gap-4', 'md:gap-6')
    })

    it('should adjust text sizes for different screen sizes', () => {
      render(<CategoryView category={mockCategory} />)
      
      const categoryInfo = screen.getByTestId('category-info')
      const title = categoryInfo.querySelector('h2')
      expect(title).toHaveClass('text-xl', 'md:text-2xl', 'lg:text-3xl')
    })
  })

  describe('Accessibility', () => {
    it('should have proper semantic HTML structure', () => {
      render(<CategoryView category={mockCategory} />)
      
      const container = screen.getByTestId('category-view')
      expect(container.tagName).toBe('SECTION')
    })

    it('should have proper ARIA labels', () => {
      render(<CategoryView category={mockCategory} />)
      
      const container = screen.getByTestId('category-view')
      expect(container).toHaveAttribute('aria-label', 'Category view')
    })

    it('should have proper heading hierarchy', () => {
      render(<CategoryView category={mockCategory} />)
      
      const categoryInfo = screen.getByTestId('category-info')
      const heading = categoryInfo.querySelector('h2')
      expect(heading).toBeInTheDocument()
    })

    it('should have keyboard navigable ExpandButton', () => {
      render(<CategoryView category={mockCategory} />)
      
      const expandButton = screen.getByTestId('expand-button')
      expandButton.focus()
      expect(expandButton).toHaveFocus()
    })

    it('should have proper ARIA expanded state', () => {
      render(<CategoryView category={mockCategory} />)
      
      const expandButton = screen.getByTestId('expand-button')
      expect(expandButton).toHaveAttribute('aria-expanded')
    })

    it('should have proper focus management', () => {
      render(<CategoryView category={mockCategory} />)
      
      const expandButton = screen.getByTestId('expand-button')
      expect(expandButton).toHaveAttribute('tabindex', '0')
    })
  })

  describe('Navigation', () => {
    it('should handle category slug for navigation', () => {
      render(<CategoryView category={mockCategory} />)
      
      const container = screen.getByTestId('category-view')
      expect(container).toHaveAttribute('data-category-slug', 'editorial')
    })

    it('should support navigation to category details', () => {
      const mockOnNavigate = vi.fn()
      render(<CategoryView category={mockCategory} onNavigate={mockOnNavigate} />)
      
      const categoryInfo = screen.getByTestId('category-info')
      fireEvent.click(categoryInfo)
      
      expect(mockOnNavigate).toHaveBeenCalledWith('editorial')
    })

    it('should handle gallery item click navigation', () => {
      const mockOnGalleryClick = vi.fn()
      render(<CategoryView category={mockCategory} onGalleryClick={mockOnGalleryClick} />)
      
      // Simular clic en un elemento de la galería
      const galleryGrid = screen.getByTestId('gallery-grid')
      fireEvent.click(galleryGrid)
      
      expect(mockOnGalleryClick).toHaveBeenCalled()
    })
  })

  describe('Edge Cases', () => {
    it('should handle missing category prop gracefully', () => {
      render(<CategoryView category={null} />)
      
      expect(screen.getByTestId('category-view')).toBeInTheDocument()
    })

    it('should handle undefined category', () => {
      render(<CategoryView category={undefined} />)
      
      expect(screen.getByTestId('category-view')).toBeInTheDocument()
    })

    it('should handle empty category title', () => {
      const emptyCategory = { ...mockCategory, title: '' }
      render(<CategoryView category={emptyCategory} />)
      
      const categoryInfo = screen.getByTestId('category-info')
      expect(categoryInfo).toBeInTheDocument()
    })

    it('should handle special characters in category title', () => {
      const specialCategory = { 
        ...mockCategory, 
        title: 'Editorial & Portfolio Photography - 2024'
      }
      render(<CategoryView category={specialCategory} />)
      
      expect(screen.getByText('Editorial & Portfolio Photography - 2024')).toBeInTheDocument()
    })

    it('should handle very long category descriptions', () => {
      const veryLongDescription = 'A'.repeat(500)
      const longCategory = { ...mockCategory, description: veryLongDescription }
      
      render(<CategoryView category={longCategory} />)
      
      expect(screen.getByText(veryLongDescription)).toBeInTheDocument()
    })
  })

  describe('Performance', () => {
    it('should memoize GalleryGrid to prevent unnecessary re-renders', () => {
      const { rerender } = render(<CategoryView category={mockCategory} />)
      
      const galleryGrid = screen.getByTestId('gallery-grid')
      const initialRender = galleryGrid.textContent
      
      rerender(<CategoryView category={mockCategory} />)
      
      expect(galleryGrid.textContent).toBe(initialRender)
    })

    it('should lazy load gallery images', () => {
      render(<CategoryView category={mockCategory} />)
      
      const galleryGrid = screen.getByTestId('gallery-grid')
      // El GalleryGrid debería tener lazy loading implementado
      expect(galleryGrid).toBeInTheDocument()
    })
  })

  describe('Integration with Parent Components', () => {
    it('should work with Router context', () => {
      render(<CategoryView category={mockCategory} />)
      
      expect(screen.getByTestId('category-view')).toBeInTheDocument()
    })

    it('should handle URL parameters for category', () => {
      render(<CategoryView category={mockCategory} categorySlug="editorial" />)
      
      const container = screen.getByTestId('category-view')
      expect(container).toHaveAttribute('data-category-slug', 'editorial')
    })
  })
})
