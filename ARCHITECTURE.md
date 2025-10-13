# LeilenMateoPH - Arquitectura del Proyecto

## 🏗️ Estructura Según Scope Rule

### **Principios Arquitectónicos**
- **"La estructura debe gritar funcionalidad"** - Cada carpeta es autodescriptiva
- **Componentes globales**: Solo si se usan en 2+ features
- **Componentes locales**: Mantener dentro de su feature específica
- **Arquitectura escalable** para portfolio fotográfico profesional

---

## 📁 Estructura de Directorios

```
src/
├── features/                    # Features específicas del dominio
│   ├── homePage/               # Feature: Página de inicio
│   │   └── components/         # Componentes locales de homePage
│   │       └── HomePage.jsx
│   ├── gallery/                # Feature: Sistema de galerías
│   │   └── components/         # Componentes locales de gallery
│   │       ├── GalleryGrid.jsx
│   │       └── Lightbox.jsx
│   ├── contact/                # Feature: Página de contacto
│   │   └── components/         # Componentes locales de contact
│   │       └── ContactForm.jsx
│   └── cms/                    # Feature: Gestión de contenido
│       └── components/         # Componentes locales de cms
│           ├── AdminButton.jsx
│           └── CMSProvider.jsx
├── shared/                     # Componentes y utilidades globales
│   ├── components/             # Componentes compartidos (2+ features)
│   │   ├── NavBar.jsx          # Navegación global
│   │   └── Footer.jsx          # Footer global
│   ├── hooks/                  # Hooks compartidos
│   │   └── useContent.js       # Hook para contenido CMS
│   └── utils/                  # Utilidades globales
├── config/                     # Configuraciones globales
├── assets/                     # Recursos estáticos
└── App.jsx                     # Punto de entrada principal
```

---

## 🎯 Clasificación de Componentes

### **Componentes Globales (shared/)**
- **NavBar**: Usado en todas las páginas
- **Footer**: Usado en todas las páginas
- **useContent**: Hook usado por múltiples features

### **Componentes Locales (features/)**
- **HomePage**: Solo usado en feature homePage
- **GalleryGrid**: Solo usado en feature gallery
- **Lightbox**: Solo usado en feature gallery
- **ContactForm**: Solo usado en feature contact
- **AdminButton**: Solo usado en feature cms
- **CMSProvider**: Solo usado en feature cms

---

## 🔄 Flujo de Datos

### **CMS → Features**
1. **Netlify CMS** gestiona contenido en `/content/`
2. **useContent hook** carga datos desde archivos markdown
3. **Features** consumen datos a través de hooks compartidos

### **Features → Shared**
1. **Features** importan componentes globales
2. **Shared components** proporcionan funcionalidad común
3. **Hooks compartidos** manejan lógica reutilizable

---

## 📋 Reglas de Scope

### ✅ **Componentes Globales (shared/)**
- Usados en **2 o más features**
- Funcionalidad **genérica y reutilizable**
- **Ejemplos**: NavBar, Footer, useContent

### ✅ **Componentes Locales (features/)**
- Usados **solo en su feature**
- Funcionalidad **específica del dominio**
- **Ejemplos**: GalleryGrid, ContactForm, AdminButton

### ❌ **Anti-patrones Evitados**
- Componentes específicos en shared/
- Componentes genéricos en features/
- Imports cruzados entre features

---

## 🚀 Beneficios de la Arquitectura

### **Mantenibilidad**
- **Separación clara** de responsabilidades
- **Fácil localización** de componentes
- **Escalabilidad** para nuevas features

### **Reutilización**
- **Hooks compartidos** para lógica común
- **Componentes globales** para UI común
- **Utilidades centralizadas**

### **Testing**
- **Aislamiento** de features
- **Mocks específicos** por feature
- **Tests independientes**

---

## 🔧 Configuración Técnica

### **Stack Tecnológico**
- **React 19** + **JavaScript**
- **Vite** + **Tailwind CSS**
- **Netlify CMS** + **React Router DOM**
- **Vitest** + **Testing Library**

### **Build System**
- **Compilación exitosa**: ✅ 29.37s
- **Tamaño optimizado**: 4.98MB (gzipped: 1.47MB)
- **Code splitting** recomendado para chunks grandes

---

## 📈 Próximos Pasos

1. **Implementar routing** entre features
2. **Añadir tests** por feature
3. **Optimizar bundle** con code splitting
4. **Configurar CI/CD** para deployment

---

*Arquitectura diseñada por **scope-rule-architect** siguiendo principios de Scope Rule para máxima funcionalidad e intuitividad.*
