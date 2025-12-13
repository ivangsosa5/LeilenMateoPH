import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '../../../test/test-utils'

// Mock de los componentes hijos
vi.mock('./CategoryDefaultView', () => ({
  default: ({ previewLimit }) => <div data-testid="category-default-view" data-limit={previewLimit}>Default View</div>
}))

vi.mock('./CategoryExpandedView', () => ({
  default: () => <div data-testid="category-expanded-view">Expanded View</div>
}))

vi.mock('../../../shared/hooks/useContent', () => ({
  useGalleryCategories: () => ({
    categories: [
      {
        id: 'editorial',
        title: 'Editorial Photography',
        description: 'Creative and artistic photography sessions',
        slug: 'editorial',
        photos: []
      }
    ],
    loading: false,
    error: null
  })
}))

// Importar el componente CategoryView
import CategoryView from './CategoryView'

describe('CategoryView Controller', () => {
  const mockCategory = {
    id: 'editorial',
    title: 'Editorial Photography',
    description: 'Creative and artistic photography sessions',
    slug: 'editorial'
  }

  beforeEach(() => {
    vi.clearAllMocks()
    // Reset URL params default behavior if needed via test-utils or wrapper
  })

  describe('View Switching', () => {
    it('should render CategoryDefaultView by default (no view param)', () => {
      render(<CategoryView category={mockCategory} />)
      
      expect(screen.getByTestId('category-default-view')).toBeInTheDocument()
      expect(screen.queryByTestId('category-expanded-view')).not.toBeInTheDocument()
    })

    it('should pass previewLimit to CategoryDefaultView', () => {
      render(<CategoryView category={mockCategory} previewLimit={8} />)
      
      const defaultView = screen.getByTestId('category-default-view')
      expect(defaultView).toHaveAttribute('data-limit', '8')
    })
  })
})
