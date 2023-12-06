import { defineConfig } from 'vite'
import glsl from 'vite-plugin-glsl';

export default defineConfig({
  plugins: [glsl()],
  server: {
    host: 'localhost',
    cors: '*',
    hmr: {
      host: 'localhost',
      protocol: 'ws',
    },
  },
  build: {
    minify: true,
    manifest: true,
    rollupOptions: {
      input: './src/main.js',
      output: {
        format: 'es',
        entryFileNames: '[name]-[hash].js',
        chunkFileNames: '[name]-[hash].js',
        esModule: false,
        compact: true,
        globals: {
          jquery: '$',
        },
      },
      external: ['jquery'],
      manualChunks(id) {
        if (id.includes('node_modules')) {
          // Logic to split vendor modules into separate chunks
          const modules = ['react', 'react-dom']; // Example modules, adjust as needed
          return modules.find(module => id.includes(module)) || 'vendors';
        }
      },
    },
  },
});
