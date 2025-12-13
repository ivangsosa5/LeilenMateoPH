import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '../../../test/test-utils'

// Mocks
vi.mock('./GalleryGrid', () => ({
  default: ({ category, photos, limit, subcategory, onPhotoClick }) => {
    const displayPhotos = photos || category?.photos || []
    return (
      <div
        data-testid="gallery-grid"
        data-limit={limit ?? ''}
        data-subcategory={subcategory ?? ''}
      >
        {displayPhotos
          .filter((photo) => !subcategory || photo.subcategory === subcategory)
          .map((photo) => (
            <button
              key={photo.id}
              data-testid={`photo-${photo.id}`}
              onClick={() => onPhotoClick?.(photo, displayPhotos)}
            >
              {photo.title}
            </button>
          ))}
      </div>
    )
  },
}))

vi.mock('./categoryInfo/CategoryInfoEditorial', () => ({
  default: ({ showDescription }) => (
    <div data-testid="category-info">
      <h2>Editorial Photography</h2>
      {showDescription && <p>Description</p>}
    </div>
  ),
}))

// Component under test
import CategoryExpandedView from './CategoryExpandedView'

describe('CategoryExpandedView', () => {
  const mockCategory = {
    id: 'editorial',
    slug: 'editorial',
    title: 'Editorial Photography',
    description: 'Description',
    subcategories: [
      { id: 'portraits', name: 'Portraits' },
      { id: 'fashion', name: 'Fashion' },
    ],
  }

  const mockPhotos = [
    { id: '1', title: 'Portrait 1', subcategory: 'portraits' },
    { id: '2', title: 'Fashion 1', subcategory: 'fashion' },
    { id: '3', title: 'Portrait 2', subcategory: 'portraits' },
  ]

  const mockOnCollapse = vi.fn()
  const mockOnPhotoClick = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders category info without description', () => {
    render(
      <CategoryExpandedView
        category={mockCategory}
        photos={mockPhotos}
        onCollapseClick={mockOnCollapse}
      />
    )

    expect(screen.getByTestId('category-info')).toBeInTheDocument()
    expect(screen.queryByText('Description')).not.toBeInTheDocument()
  })

  it('renders filter functionality', () => {
    render(
      <CategoryExpandedView
        category={mockCategory}
        photos={mockPhotos}
        onCollapseClick={mockOnCollapse}
      />
    )

    // Check filters exist
    expect(screen.getByText('All')).toBeInTheDocument()
    expect(screen.getByText('Portraits')).toBeInTheDocument()

    // Default: Show all
    expect(screen.getByTestId('photo-1')).toBeInTheDocument()
    expect(screen.getByTestId('photo-2')).toBeInTheDocument()

    // Click filter
    fireEvent.click(screen.getByText('Portraits'))

    // Should only show portraits
    expect(screen.getByTestId('photo-1')).toBeInTheDocument()
    expect(screen.queryByTestId('photo-2')).not.toBeInTheDocument()
    expect(screen.getByTestId('gallery-grid-wrapper')).toHaveAttribute('data-subcategory', 'portraits')
  })

  it('calls onCollapseClick when back button is clicked', () => {
    render(
      <CategoryExpandedView
        category={mockCategory}
        photos={mockPhotos}
        onCollapseClick={mockOnCollapse}
      />
    )

    // Assuming there is a button with text "Back" or similar, or aria-label
    // Ideally we put a data-testid on the collapse button in implementation
    const collapseButton = screen.getByRole('button', { name: /collapse|back/i })
    fireEvent.click(collapseButton)

    expect(mockOnCollapse).toHaveBeenCalled()
  })
})
