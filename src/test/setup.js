import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'
import { afterEach, beforeAll, afterAll } from 'vitest'

// Limpiar el DOM después de cada test
afterEach(() => {
  cleanup()
})

// Configuración global para tests
beforeAll(() => {
  // Configurar variables de entorno para testing
  process.env.NODE_ENV = 'test'
})

afterAll(() => {
  // Limpieza final si es necesaria
})














