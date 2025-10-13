import { vi } from 'vitest'

// Helper para crear mocks de funciones
export const createMockFunction = (returnValue = undefined) => {
  return vi.fn(() => returnValue)
}

// Helper para crear mocks de eventos
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

// Helper para simular scroll
export const mockScrollTo = () => {
  window.scrollTo = vi.fn()
}

// Helper para simular localStorage
export const mockLocalStorage = () => {
  const store = {}
  return {
    getItem: vi.fn((key) => store[key] || null),
    setItem: vi.fn((key, value) => {
      store[key] = value
    }),
    removeItem: vi.fn((key) => {
      delete store[key]
    }),
    clear: vi.fn(() => {
      Object.keys(store).forEach(key => delete store[key])
    }),
  }
}

// Helper para simular fetch
export const mockFetch = (response, ok = true) => {
  globalThis.fetch = vi.fn(() =>
    Promise.resolve({
      ok,
      json: () => Promise.resolve(response),
      text: () => Promise.resolve(JSON.stringify(response)),
    })
  )
}

// Helper para esperar que un elemento aparezca
export const waitForElement = async (getByTestId, testId, timeout = 1000) => {
  const start = Date.now()
  while (Date.now() - start < timeout) {
    try {
      return getByTestId(testId)
    } catch {
      await new Promise(resolve => setTimeout(resolve, 10))
    }
  }
  throw new Error(`Element with testId "${testId}" not found within ${timeout}ms`)
}

// Helper para crear datos de prueba específicos del portafolio
export const createMockPortfolioData = () => ({
  galleries: [
    {
      id: '1',
      title: 'Portraits',
      description: 'Professional portrait sessions',
      photos: [
        {
          id: '1',
          title: 'Portrait 1',
          src: '/images/portrait1.jpg',
          alt: 'Professional portrait',
          category: 'portrait',
        },
      ],
    },
  ],
  contact: {
    whatsapp: '+1234567890',
    email: 'contact@leilenmateo.com',
  },
})




