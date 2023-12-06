import { defineConfig } from 'vite';
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
                format: 'es', // Keep as ES module format
                entryFileNames: 'main.js',
                esModule: true,
                compact: true,
                globals: {
                    jquery: '$',
                },
            },
            external: ['jquery'],
            // Disable code splitting
            manualChunks: () => 'main.js', 
        },
    },
});
