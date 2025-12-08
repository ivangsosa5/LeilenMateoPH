import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '../../../test/test-utils'

// Componente bajo test (aún no implementado - fase RED)
import GalleryGrid from './GalleryGrid'

describe('GalleryGrid - modo expandido con filtro (Story 2.2a)', () => {
  const photos = [
    { id: '1', title: 'Portrait 1', subcategory: 'portraits' },
    { id: '2', title: 'Fashion 1', subcategory: 'fashion' },
    { id: '3', title: 'Portrait 2', subcategory: 'portraits' },
  ]

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Render y límites', () => {
    it('modo normal aplica previewLimit', () => {
      render(<GalleryGrid photos={photos} limit={2} expanded={false} />)

      expect(screen.getAllByRole('img')).toHaveLength(2)
    })

    it('modo expandido ignora previewLimit y muestra todo', () => {
      render(<GalleryGrid photos={photos} expanded />)

      expect(screen.getAllByRole('img')).toHaveLength(3)
    })
  })

  describe('Filtro de subcategoría', () => {
    it('aplica filtro a las fotos por subcategoría', () => {
      render(<GalleryGrid photos={photos} expanded subcategory="portraits" />)

      const visibleTitles = screen.getAllByRole('img').map((el) => el.getAttribute('alt'))
      expect(visibleTitles).toEqual(['Portrait 1', 'Portrait 2'])
    })

    it('opción “All” muestra todas las fotos', () => {
      render(<GalleryGrid photos={photos} expanded subcategory="" />)

      expect(screen.getAllByRole('img')).toHaveLength(3)
    })
  })

  describe('Interacción', () => {
    it('click en foto dispara callback con set filtrado', () => {
      const onPhotoClick = vi.fn()
      render(<GalleryGrid photos={photos} expanded subcategory="portraits" onPhotoClick={onPhotoClick} />)

      fireEvent.click(screen.getByAltText('Portrait 1'))

      expect(onPhotoClick).toHaveBeenCalledTimes(1)
      const [photo, filteredSet] = onPhotoClick.mock.calls[0]
      expect(photo.id).toBe('1')
      expect(filteredSet).toHaveLength(2)
      expect(filteredSet.every((p) => p.subcategory === 'portraits')).toBe(true)
    })
  })

  describe('Loading/Error', () => {
    it('muestra estado loading', () => {
      render(<GalleryGrid loading />)
      expect(screen.getByTestId('gallery-grid-loading')).toBeInTheDocument()
    })

    it('muestra estado error', () => {
      render(<GalleryGrid error="Failed to load galleries" />)
      expect(screen.getByText(/Failed to load galleries/)).toBeInTheDocument()
    })
  })

  describe('Responsive', () => {
    it('incluye clases de grid responsivas', () => {
      render(<GalleryGrid photos={photos} expanded />)

      const grid = screen.getByTestId('gallery-grid')
      expect(grid).toHaveClass('grid', 'grid-cols-1')
      expect(grid.className).toMatch(/md:grid-cols-\d+/)
      expect(grid.className).toMatch(/lg:grid-cols-\d+/)
    })
  })

  describe('Accesibilidad', () => {
    it('aria-label presente en la sección', () => {
      render(<GalleryGrid photos={photos} expanded />)
      const grid = screen.getByTestId('gallery-grid')
      expect(grid).toHaveAttribute('aria-label', 'Gallery grid')
    })

    it('imágenes con alt descriptivo', () => {
      render(<GalleryGrid photos={photos} expanded />)
      expect(screen.getByAltText('Portrait 1')).toBeInTheDocument()
    })
  })
})

