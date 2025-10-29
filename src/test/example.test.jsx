import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '../test/test-utils'
import { createMockPhoto, createMockGallery } from '../test/test-utils'

// Test de ejemplo para verificar que la configuración funciona
describe('Testing Setup Verification', () => {
  it('should render a simple component', () => {
    const TestComponent = () => <div data-testid="test-component">Hello World</div>
    
    render(<TestComponent />)
    
    expect(screen.getByTestId('test-component')).toBeInTheDocument()
    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })

  it('should create mock data correctly', () => {
    const mockPhoto = createMockPhoto({
      title: 'Custom Photo',
      category: 'wedding',
    })
    
    const mockGallery = createMockGallery({
      title: 'Custom Gallery',
      description: 'Custom description',
    })

    expect(mockPhoto).toMatchObject({
      id: '1',
      title: 'Custom Photo',
      category: 'wedding',
    })

    expect(mockGallery).toMatchObject({
      id: '1',
      title: 'Custom Gallery',
      description: 'Custom description',
    })
  })

  it('should handle async operations', async () => {
    const asyncFunction = async () => {
      return new Promise(resolve => {
        setTimeout(() => resolve('async result'), 100)
      })
    }

    const result = await asyncFunction()
    expect(result).toBe('async result')
  })
})














