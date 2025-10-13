import React from 'react'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

// Wrapper personalizado para componentes que necesitan Router
export const RouterWrapper = ({ children }) => {
  return <BrowserRouter>{children}</BrowserRouter>
}

// Función de renderizado personalizada con providers comunes
export const customRender = (ui, options = {}) => {
  const { wrapper: Wrapper = RouterWrapper, ...renderOptions } = options

  const AllTheProviders = ({ children }) => {
    return <Wrapper>{children}</Wrapper>
  }

  return render(ui, { wrapper: AllTheProviders, ...renderOptions })
}

// Función para renderizar sin Router (para componentes que no lo necesitan)
export const renderWithoutRouter = (ui, options = {}) => {
  return render(ui, options)
}

// Función para crear mocks de props comunes
export const createMockProps = (overrides = {}) => {
  return {
    // Props comunes que se pueden sobrescribir
    className: '',
    children: null,
    ...overrides,
  }
}

// Función para simular eventos comunes
export const createMockEvent = (type, options = {}) => {
  return {
    type,
    preventDefault: vi.fn(),
    stopPropagation: vi.fn(),
    target: {
      value: '',
      checked: false,
      ...options,
    },
  }
}

// Función para crear datos de prueba para el portafolio
export const createMockPhoto = (overrides = {}) => {
  return {
    id: '1',
    title: 'Test Photo',
    src: '/test-image.jpg',
    alt: 'Test photo description',
    category: 'portrait',
    ...overrides,
  }
}

export const createMockGallery = (overrides = {}) => {
  return {
    id: '1',
    title: 'Test Gallery',
    photos: [createMockPhoto()],
    description: 'Test gallery description',
    ...overrides,
  }
}

// Re-exportar todo desde testing-library
export { customRender as render }
export * from '@testing-library/react'




