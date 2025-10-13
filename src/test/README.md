# Testing Setup - LeilenMateoPH

## Configuración TDD (Test-Driven Development)

Este directorio contiene toda la configuración necesaria para el desarrollo basado en pruebas (TDD) del proyecto LeilenMateoPH.

## Estructura

```
src/test/
├── setup.js              # Configuración global de tests
├── test-utils.jsx        # Utilidades personalizadas de testing
├── helpers/              # Helpers y funciones auxiliares
│   └── test-helpers.js   # Helpers específicos del proyecto
├── __mocks__/            # Mocks para archivos estáticos
│   ├── fileMock.js       # Mock para imágenes y archivos
│   └── styleMock.js      # Mock para archivos CSS
└── example.test.jsx      # Test de ejemplo para verificar setup
```

## Scripts Disponibles

```bash
# Ejecutar tests en modo watch
npm run test

# Ejecutar tests una sola vez
npm run test:run

# Ejecutar tests con UI
npm run test:ui

# Ejecutar tests con coverage
npm run test:coverage

# Ejecutar tests en modo watch
npm run test:watch
```

## Flujo TDD

### 1. RED - Escribir tests que fallen
```jsx
// Ejemplo: test para un componente que aún no existe
describe('PhotoGallery Component', () => {
  it('should render gallery title', () => {
    render(<PhotoGallery title="Test Gallery" />)
    expect(screen.getByText('Test Gallery')).toBeInTheDocument()
  })
})
```

### 2. GREEN - Implementar código mínimo
```jsx
// Implementar solo lo necesario para pasar el test
const PhotoGallery = ({ title }) => {
  return <h2>{title}</h2>
}
```

### 3. REFACTOR - Mejorar el código
```jsx
// Mejorar manteniendo los tests verdes
const PhotoGallery = ({ title, photos = [] }) => {
  return (
    <section className="gallery">
      <h2>{title}</h2>
      <div className="photos">
        {photos.map(photo => <img key={photo.id} src={photo.src} alt={photo.alt} />)}
      </div>
    </section>
  )
}
```

## Utilidades Disponibles

### test-utils.jsx
- `render()` - Renderizado con providers comunes
- `renderWithoutRouter()` - Renderizado sin Router
- `createMockPhoto()` - Crear datos mock de fotos
- `createMockGallery()` - Crear datos mock de galerías

### test-helpers.js
- `createMockFunction()` - Crear mocks de funciones
- `mockLocalStorage()` - Mock de localStorage
- `mockFetch()` - Mock de fetch API
- `createMockPortfolioData()` - Datos mock del portafolio

## Convenciones

1. **Naming**: Usar `.test.jsx` o `.spec.jsx` para archivos de test
2. **Ubicación**: Colocar tests junto a los componentes o en `__tests__/`
3. **Estructura**: Seguir el patrón Arrange-Act-Assert
4. **Coverage**: Mantener cobertura mínima del 80%

## Ejemplo de Test Completo

```jsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '../test/test-utils'
import PhotoGallery from '../components/PhotoGallery'

describe('PhotoGallery', () => {
  it('should display gallery title', () => {
    const mockGallery = createMockGallery({ title: 'Wedding Photos' })
    
    render(<PhotoGallery gallery={mockGallery} />)
    
    expect(screen.getByText('Wedding Photos')).toBeInTheDocument()
  })

  it('should handle photo click', () => {
    const mockOnPhotoClick = vi.fn()
    const mockPhoto = createMockPhoto({ id: '1' })
    
    render(
      <PhotoGallery 
        photos={[mockPhoto]} 
        onPhotoClick={mockOnPhotoClick} 
      />
    )
    
    fireEvent.click(screen.getByAltText(mockPhoto.alt))
    expect(mockOnPhotoClick).toHaveBeenCalledWith(mockPhoto)
  })
})
```

## Configuración de Coverage

El proyecto está configurado para generar reportes de cobertura con umbrales mínimos:
- Branches: 80%
- Functions: 80%
- Lines: 80%
- Statements: 80%

Los reportes se generan en el directorio `coverage/` y se pueden visualizar abriendo `coverage/index.html`.







