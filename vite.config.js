import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: './index.html'
      }
    },
    // Code splitting for better performance
    chunkSizeWarningLimit: 1000
  },
  server: {
    port: 3000,
    open: true,
    // Enable hot reloading for data files
    watch: {
      include: ['src/**/*']
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@data': resolve(__dirname, 'src/data'),
      '@js': resolve(__dirname, 'src/js'),
      '@css': resolve(__dirname, 'src/css')
    }
  },
  // Enable source maps for development
  css: {
    devSourcemap: true
  },
  // Optimize dependencies
  optimizeDeps: {
    include: []
  }
})
