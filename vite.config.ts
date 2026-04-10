import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        react(),
        tailwindcss(),
        wayfinder({
            formVariants: true,
        }),
    ],
    esbuild: {
        jsx: 'automatic',
    },
    server: {
        host: '127.0.0.1',
        hmr: {
            host: '127.0.0.1',
        },
    },
    build: {
        // Limite d’avertissement (en kB). Tu peux l’ajuster si nécessaire.
        chunkSizeWarningLimit: 1000,
        rollupOptions: {
            output: {
                // Découpage fin des dépendances lourdes pour réduire la taille des gros chunks
                manualChunks(id) {
                    if (!id.includes('node_modules')) {
                        return;
                    }

                    // 1. Specific bulky libraries first to prevent them from being sucked into 'react-core' or 'vendor'
                    if (id.includes('lucide-react')) {
                        return 'icons';
                    }

                    if (id.includes('@inertiajs')) {
                        return 'inertia';
                    }

                    // 2. React Core - strictly match core packages (must stay together)
                    // We use path segments to avoid matching things like 'react-hook-form' or 'react-i18next'
                    if (
                        id.includes('node_modules/react/') ||
                        id.includes('node_modules/react-dom/') ||
                        id.includes('node_modules/scheduler/') ||
                        id.includes('node_modules/react-is/')
                    ) {
                        return 'react-core';
                    }

                    // 3. i18n
                    if (id.includes('i18next')) {
                        return 'i18n';
                    }

                    // 4. UI primitives
                    if (id.includes('@radix-ui') || id.includes('@headlessui')) {
                        return 'ui-primitives';
                    }

                    // 5. Specialized heavy components
                    if (id.includes('react-pdf') || id.includes('pdfjs-dist')) {
                        return 'pdf-viewer';
                    }

                    if (id.includes('video.js') || id.includes('react-player') || id.includes('react-video')) {
                        return 'video-player';
                    }

                    // 6. Default to vendor for all other node_modules
                    return 'vendor';
                },
            },
        },
    },
});
