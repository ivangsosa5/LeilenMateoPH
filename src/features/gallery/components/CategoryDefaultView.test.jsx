import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '../../../test/test-utils'

// Mocks
vi.mock('./GalleryGrid', () => ({
  default: ({ limit }) => (
    <div data-testid="gallery-grid" data-limit={limit ?? ''}>Grid</div>
  ),
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
import CategoryDefaultView from './CategoryDefaultView'

describe('CategoryDefaultView', () => {
  const mockCategory = {
    id: 'editorial',
    slug: 'editorial',
    title: 'Editorial Photography',
    description: 'Description'
  }

  const mockOnExpand = vi.fn()

  it('renders category info WITH description', () => {
    render(
      <CategoryDefaultView
        category={mockCategory}
        onExpandClick={mockOnExpand}
        previewLimit={3}
      />
    )

    expect(screen.getByTestId('category-info')).toBeInTheDocument()
    expect(screen.getByText('Description')).toBeInTheDocument()
  })

  it('renders limited grid', () => {
    render(
      <CategoryDefaultView
        category={mockCategory}
        onExpandClick={mockOnExpand}
        previewLimit={8}
      />
    )

    expect(screen.getByTestId('gallery-grid')).toBeInTheDocument()
    expect(screen.getByTestId('gallery-grid')).toHaveAttribute('data-limit', '8')
  })

  it('calls onExpandClick when expand button is clicked', () => {
    render(
      <CategoryDefaultView
        category={mockCategory}
        onExpandClick={mockOnExpand}
        previewLimit={3}
      />
    )

    // Assuming button with "Expand" text
    const expandButton = screen.getByRole('button', { name: /expand/i })
    fireEvent.click(expandButton)

    expect(mockOnExpand).toHaveBeenCalled()
  })
})
