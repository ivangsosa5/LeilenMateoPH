import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    fs: {
      strict: false,
    },
  },
  resolve: {
    alias: {
      // Asegurar que todas las dependencias usen la misma instancia de React
      'react': path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
    },
  },
  configureServer(server) {
    // Middleware para servir config.yml antes que React Router lo intercepte
    // Insertar al principio del stack de middlewares
    server.middlewares.stack.unshift({
      route: '',
      handle: (req, res, next) => {
        // Interceptar la ruta exacta /admin/config.yml
        if (req.url === '/admin/config.yml' || req.url.startsWith('/admin/config.yml')) {
          const configPath = path.join(__dirname, 'public', 'admin', 'config.yml')
          
          try {
            if (fs.existsSync(configPath)) {
              res.setHeader('Content-Type', 'text/yaml; charset=utf-8')
              res.setHeader('Cache-Control', 'no-cache')
              const content = fs.readFileSync(configPath, 'utf-8')
              res.statusCode = 200
              res.end(content)
              console.log('✅ config.yml servido por middleware')
              return
            } else {
              console.warn('⚠️ config.yml no encontrado en:', configPath)
            }
          } catch (error) {
            console.error('❌ Error serving config.yml:', error)
          }
        }
        next()
      }
    })
  },
})