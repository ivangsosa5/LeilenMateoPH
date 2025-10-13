# 🧪 Configuración TDD - LeilenMateoPH

## ✅ Entorno de Testing Completamente Configurado

El entorno de testing para el proyecto LeilenMateoPH está completamente configurado siguiendo las mejores prácticas de TDD (Test-Driven Development).

## 📦 Dependencias Instaladas

- **Vitest** - Framework de testing moderno y rápido
- **jsdom** - Entorno DOM simulado para tests
- **React Testing Library** - Utilidades para testing de componentes React
- **@testing-library/jest-dom** - Matchers adicionales para DOM
- **@testing-library/user-event** - Simulación de eventos de usuario
- **@vitest/coverage-v8** - Generación de reportes de cobertura

## 🛠️ Scripts Disponibles

```bash
# Ejecutar tests en modo watch (desarrollo)
npm run test

# Ejecutar tests una sola vez
npm run test:run

# Ejecutar tests con interfaz gráfica
npm run test:ui

# Ejecutar tests con reporte de cobertura
npm run test:coverage

# Ejecutar tests en modo watch
npm run test:watch
```

## 📁 Estructura de Testing

```
src/test/
├── setup.js              # Configuración global de tests
├── test-utils.jsx        # Utilidades personalizadas de testing
├── helpers/
│   └── test-helpers.js   # Helpers específicos del proyecto
├── __mocks__/
│   ├── fileMock.js       # Mock para archivos estáticos
│   └── styleMock.js      # Mock para archivos CSS
├── example.test.jsx      # Test de ejemplo (funcionando ✅)
└── README.md             # Documentación completa
```

## 🎯 Flujo TDD Implementado

### 1. **RED** - Escribir tests que fallen
```jsx
describe('NuevoComponente', () => {
  it('should render correctly', () => {
    render(<NuevoComponente />)
    expect(screen.getByText('Expected Text')).toBeInTheDocument()
  })
})
```

### 2. **GREEN** - Implementar código mínimo
```jsx
const NuevoComponente = () => {
  return <div>Expected Text</div>
}
```

### 3. **REFACTOR** - Mejorar manteniendo tests verdes
```jsx
const NuevoComponente = ({ title, children }) => {
  return (
    <div className="component">
      <h2>{title}</h2>
      {children}
    </div>
  )
}
```

## 🧰 Utilidades Disponibles

### test-utils.jsx
- `render()` - Renderizado con providers comunes
- `createMockPhoto()` - Datos mock para fotos
- `createMockGallery()` - Datos mock para galerías
- `createMockProps()` - Props mock personalizables

### test-helpers.js
- `createMockFunction()` - Mocks de funciones
- `mockLocalStorage()` - Mock de localStorage
- `mockFetch()` - Mock de fetch API
- `createMockPortfolioData()` - Datos del portafolio

## 📊 Configuración de Coverage

- **Umbrales mínimos**: 80% en branches, functions, lines, statements
- **Reportes**: HTML, JSON y texto
- **Exclusiones**: node_modules, archivos de configuración, tests

## ✅ Verificación Completada

- ✅ Tests ejecutándose correctamente
- ✅ Coverage funcionando
- ✅ Configuración de jsdom activa
- ✅ React Testing Library configurado
- ✅ Utilidades personalizadas creadas
- ✅ Documentación completa

## 🚀 Próximos Pasos

El entorno está listo para comenzar el desarrollo TDD. Para crear una nueva funcionalidad:

1. **Escribir tests primero** (fase RED)
2. **Implementar código mínimo** (fase GREEN)  
3. **Refactorizar** manteniendo tests verdes
4. **Repetir el ciclo**

¡El entorno TDD está completamente operativo! 🎉







