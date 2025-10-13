import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '../../test/test-utils'
import { createMockPhoto } from '../../test/test-utils'

// Mock del hook useContent
vi.mock('../../hooks/useContent', () => ({
  useContent: vi.fn()
}))

// Importar el componente Hero (que aún no existe - fase RED)
import Hero from './Hero'

describe('Hero Component', () => {
  const mockHeroData = {
    title: 'Leilen Mateo',
    subtitle: 'Professional Photography',
    backgroundImage: '/images/hero-bg.jpg',
    ctaText: 'View Gallery',
    ctaLink: '/gallery'
  }

  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should render hero title', () => {
      render(<Hero {...mockHeroData} />)
      
      expect(screen.getByText('Leilen Mateo')).toBeInTheDocument()
    })

    it('should render hero subtitle', () => {
      render(<Hero {...mockHeroData} />)
      
      expect(screen.getByText('Professional Photography')).toBeInTheDocument()
    })

    it('should render call-to-action button', () => {
      render(<Hero {...mockHeroData} />)
      
      const ctaButton = screen.getByText('View Gallery')
      expect(ctaButton).toBeInTheDocument()
      expect(ctaButton).toHaveAttribute('href', '/gallery')
    })

    it('should render background image when provided', () => {
      render(<Hero {...mockHeroData} />)
      
      const backgroundImage = screen.getByAltText('Hero background')
      expect(backgroundImage).toBeInTheDocument()
      expect(backgroundImage).toHaveAttribute('src', '/images/hero-bg.jpg')
    })

    it('should render without background image when not provided', () => {
      const heroDataWithoutImage = { ...mockHeroData }
      delete heroDataWithoutImage.backgroundImage
      
      render(<Hero {...heroDataWithoutImage} />)
      
      expect(screen.queryByAltText('Hero background')).not.toBeInTheDocument()
    })
  })

  describe('Styling and Layout', () => {
    it('should have correct CSS classes for hero section', () => {
      render(<Hero {...mockHeroData} />)
      
      const heroSection = screen.getByRole('banner')
      expect(heroSection).toHaveClass('relative', 'h-screen', 'flex', 'items-center', 'justify-center')
    })

    it('should have correct CSS classes for title', () => {
      render(<Hero {...mockHeroData} />)
      
      const title = screen.getByText('Leilen Mateo')
      expect(title).toHaveClass('text-5xl', 'md:text-7xl', 'font-bold')
    })

    it('should have correct CSS classes for subtitle', () => {
      render(<Hero {...mockHeroData} />)
      
      const subtitle = screen.getByText('Professional Photography')
      expect(subtitle).toHaveClass('text-xl', 'md:text-2xl')
    })

    it('should have correct CSS classes for CTA button', () => {
      render(<Hero {...mockHeroData} />)
      
      const ctaButton = screen.getByText('View Gallery')
      expect(ctaButton).toHaveClass('inline-block', 'bg-blue-600', 'hover:bg-blue-700')
    })
  })

  describe('Interactions', () => {
    it('should handle CTA button click', () => {
      const mockOnCtaClick = vi.fn()
      render(<Hero {...mockHeroData} onCtaClick={mockOnCtaClick} />)
      
      const ctaButton = screen.getByText('View Gallery')
      fireEvent.click(ctaButton)
      
      expect(mockOnCtaClick).toHaveBeenCalledTimes(1)
    })

    it('should navigate to correct URL when CTA is clicked', () => {
      render(<Hero {...mockHeroData} />)
      
      const ctaButton = screen.getByText('View Gallery')
      expect(ctaButton).toHaveAttribute('href', '/gallery')
    })
  })

  describe('Accessibility', () => {
    it('should have proper heading structure', () => {
      render(<Hero {...mockHeroData} />)
      
      const title = screen.getByRole('heading', { level: 1 })
      expect(title).toBeInTheDocument()
      expect(title).toHaveTextContent('Leilen Mateo')
    })

    it('should have proper alt text for background image', () => {
      render(<Hero {...mockHeroData} />)
      
      const backgroundImage = screen.getByAltText('Hero background')
      expect(backgroundImage).toBeInTheDocument()
    })

    it('should be keyboard navigable', () => {
      render(<Hero {...mockHeroData} />)
      
      const ctaButton = screen.getByText('View Gallery')
      ctaButton.focus()
      expect(ctaButton).toHaveFocus()
    })
  })

  describe('Responsive Design', () => {
    it('should have responsive text classes', () => {
      render(<Hero {...mockHeroData} />)
      
      const title = screen.getByText('Leilen Mateo')
      expect(title).toHaveClass('text-5xl', 'md:text-7xl')
      
      const subtitle = screen.getByText('Professional Photography')
      expect(subtitle).toHaveClass('text-xl', 'md:text-2xl')
    })
  })

  describe('Loading States', () => {
    it('should show loading state when data is loading', () => {
      render(<Hero {...mockHeroData} loading={true} />)
      
      expect(screen.getByTestId('hero-loading')).toBeInTheDocument()
      expect(screen.queryByText('Leilen Mateo')).not.toBeInTheDocument()
    })

    it('should not show loading state when data is loaded', () => {
      render(<Hero {...mockHeroData} loading={false} />)
      
      expect(screen.queryByTestId('hero-loading')).not.toBeInTheDocument()
      expect(screen.getByText('Leilen Mateo')).toBeInTheDocument()
    })
  })

  describe('Error States', () => {
    it('should show error message when there is an error', () => {
      render(<Hero {...mockHeroData} error="Failed to load hero data" />)
      
      expect(screen.getByText('Error loading hero content')).toBeInTheDocument()
      expect(screen.getByText('Failed to load hero data')).toBeInTheDocument()
    })

    it('should not show hero content when there is an error', () => {
      render(<Hero {...mockHeroData} error="Failed to load hero data" />)
      
      expect(screen.queryByText('Leilen Mateo')).not.toBeInTheDocument()
    })
  })

  describe('Default Props', () => {
    it('should render with default props when no props are provided', () => {
      render(<Hero />)
      
      expect(screen.getByText('Leilen Mateo')).toBeInTheDocument()
      expect(screen.getByText('Professional Photography')).toBeInTheDocument()
      expect(screen.getByText('View Gallery')).toBeInTheDocument()
    })
  })

  describe('Advanced Accessibility', () => {
    it('should have proper ARIA labels', () => {
      render(<Hero {...mockHeroData} />)
      
      const heroSection = screen.getByRole('banner')
      expect(heroSection).toHaveAttribute('aria-label', 'Hero section')
    })

    it('should have proper heading hierarchy', () => {
      render(<Hero {...mockHeroData} />)
      
      const title = screen.getByRole('heading', { level: 1 })
      expect(title).toBeInTheDocument()
      
      // No debería haber h2, h3, etc. en el hero
      expect(screen.queryByRole('heading', { level: 2 })).not.toBeInTheDocument()
    })

    it('should have proper focus management', () => {
      render(<Hero {...mockHeroData} />)
      
      const ctaButton = screen.getByText('View Gallery')
      expect(ctaButton).toHaveAttribute('tabindex', '0')
    })

    it('should have proper color contrast indicators', () => {
      render(<Hero {...mockHeroData} />)
      
      const title = screen.getByText('Leilen Mateo')
      expect(title).toHaveClass('text-white')
      
      const subtitle = screen.getByText('Professional Photography')
      expect(subtitle).toHaveClass('text-white')
    })
  })

  describe('Enhanced Responsive Design', () => {
    it('should have mobile-first responsive classes', () => {
      render(<Hero {...mockHeroData} />)
      
      const title = screen.getByText('Leilen Mateo')
      expect(title).toHaveClass('text-5xl', 'md:text-7xl')
      
      const subtitle = screen.getByText('Professional Photography')
      expect(subtitle).toHaveClass('text-xl', 'md:text-2xl')
    })

    it('should have proper spacing for different screen sizes', () => {
      render(<Hero {...mockHeroData} />)
      
      const heroSection = screen.getByRole('banner')
      expect(heroSection).toHaveClass('h-screen')
      
      const contentContainer = screen.getByText('Leilen Mateo').closest('div')
      expect(contentContainer).toHaveClass('max-w-4xl', 'mx-auto', 'px-4')
    })

    it('should handle text overflow gracefully', () => {
      const longTitle = 'Leilen Mateo Photography Studio - Professional Services'
      render(<Hero {...mockHeroData} title={longTitle} />)
      
      const title = screen.getByText(longTitle)
      expect(title).toBeInTheDocument()
      expect(title).toHaveClass('text-5xl', 'md:text-7xl')
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty strings gracefully', () => {
      render(<Hero title="" subtitle="" ctaText="" />)
      
      // Debería renderizar elementos vacíos pero visibles
      const title = screen.getByRole('heading', { level: 1 })
      expect(title).toBeInTheDocument()
      expect(title).toHaveTextContent('')
    })

    it('should handle special characters in text', () => {
      const specialTitle = 'Leilen Mateo - Fotógrafa Profesional & Diseñadora'
      const specialSubtitle = 'Capturando momentos únicos con pasión'
      
      render(<Hero title={specialTitle} subtitle={specialSubtitle} />)
      
      expect(screen.getByText(specialTitle)).toBeInTheDocument()
      expect(screen.getByText(specialSubtitle)).toBeInTheDocument()
    })

    it('should handle very long text content', () => {
      const veryLongTitle = 'Leilen Mateo Photography Studio - Professional Photography Services for Weddings, Events, Portraits, and Commercial Photography'
      const veryLongSubtitle = 'Specializing in capturing life\'s most precious moments with artistic vision and professional expertise'
      
      render(<Hero title={veryLongTitle} subtitle={veryLongSubtitle} />)
      
      expect(screen.getByText(veryLongTitle)).toBeInTheDocument()
      expect(screen.getByText(veryLongSubtitle)).toBeInTheDocument()
    })

    it('should handle null and undefined props', () => {
      render(<Hero title={null} subtitle={undefined} />)
      
      // Debería usar valores por defecto
      expect(screen.getByText('Leilen Mateo')).toBeInTheDocument()
      expect(screen.getByText('Professional Photography')).toBeInTheDocument()
    })
  })

  describe('Performance and Optimization', () => {
    it('should have lazy loading for background image', () => {
      render(<Hero {...mockHeroData} />)
      
      const backgroundImage = screen.getByAltText('Hero background')
      expect(backgroundImage).toHaveAttribute('loading', 'lazy')
    })

    it('should have proper image optimization attributes', () => {
      render(<Hero {...mockHeroData} />)
      
      const backgroundImage = screen.getByAltText('Hero background')
      expect(backgroundImage).toHaveAttribute('alt', 'Hero background')
      expect(backgroundImage).toHaveClass('w-full', 'h-full', 'object-cover')
    })

    it('should handle image loading errors gracefully', () => {
      render(<Hero {...mockHeroData} backgroundImage="/invalid-image.jpg" />)
      
      const backgroundImage = screen.getByAltText('Hero background')
      expect(backgroundImage).toBeInTheDocument()
      // El componente debería manejar errores de imagen
    })
  })

  describe('SEO and Meta Data', () => {
    it('should have proper semantic HTML structure', () => {
      render(<Hero {...mockHeroData} />)
      
      const heroSection = screen.getByRole('banner')
      expect(heroSection).toBeInTheDocument()
      
      const title = screen.getByRole('heading', { level: 1 })
      expect(title).toBeInTheDocument()
    })

    it('should have proper link attributes for SEO', () => {
      render(<Hero {...mockHeroData} />)
      
      const ctaButton = screen.getByText('View Gallery')
      expect(ctaButton).toHaveAttribute('href', '/gallery')
    })

    it('should have proper alt text for accessibility and SEO', () => {
      render(<Hero {...mockHeroData} />)
      
      const backgroundImage = screen.getByAltText('Hero background')
      expect(backgroundImage).toHaveAttribute('alt', 'Hero background')
    })
  })

  describe('Animation and Transitions', () => {
    it('should have proper transition classes', () => {
      render(<Hero {...mockHeroData} />)
      
      const ctaButton = screen.getByText('View Gallery')
      expect(ctaButton).toHaveClass('transition-colors', 'duration-200')
    })

    it('should have hover states for interactive elements', () => {
      render(<Hero {...mockHeroData} />)
      
      const ctaButton = screen.getByText('View Gallery')
      expect(ctaButton).toHaveClass('hover:bg-blue-700')
    })
  })

  describe('Content Management Integration', () => {
    it('should handle dynamic content from CMS', () => {
      const cmsData = {
        title: 'Leilen Mateo - Fotógrafa Profesional',
        subtitle: 'Capturando momentos únicos',
        backgroundImage: '/cms/hero-image.jpg',
        ctaText: 'Ver Galería',
        ctaLink: '/galeria'
      }
      
      render(<Hero {...cmsData} />)
      
      expect(screen.getByText('Leilen Mateo - Fotógrafa Profesional')).toBeInTheDocument()
      expect(screen.getByText('Capturando momentos únicos')).toBeInTheDocument()
      expect(screen.getByText('Ver Galería')).toBeInTheDocument()
      expect(screen.getByText('Ver Galería')).toHaveAttribute('href', '/galeria')
    })

    it('should handle markdown content in subtitle', () => {
      const markdownSubtitle = '**Professional Photography** *for all occasions*'
      render(<Hero {...mockHeroData} subtitle={markdownSubtitle} />)
      
      expect(screen.getByText(markdownSubtitle)).toBeInTheDocument()
    })
  })
})
