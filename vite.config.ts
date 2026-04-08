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

                    // React / React DOM
                    if (id.includes('react') || id.includes('react-dom')) {
                        return 'react-vendor';
                    }

                    // Inertia
                    if (id.includes('@inertiajs')) {
                        return 'inertia';
                    }

                    // i18n (i18next, react-i18next, language detector)
                    if (id.includes('i18next') || id.includes('react-i18next') || id.includes('i18next-browser-languagedetector')) {
                        return 'i18n';
                    }

                    // UI primitives (Radix, Headless UI, etc.)
                    if (id.includes('@radix-ui') || id.includes('@headlessui')) {
                        return 'ui-primitives';
                    }

                    // Icônes Lucide (souvent volumineux)
                    if (id.includes('lucide-react')) {
                        return 'icons';
                    }

                    // Lecteur PDF (react-pdf + pdfjs-dist)
                    if (id.includes('react-pdf') || id.includes('pdfjs-dist')) {
                        return 'pdf-viewer';
                    }

                    // Video.js
                    if (id.includes('video.js')) {
                        return 'video-player';
                    }

                    // Reste de node_modules
                    return 'vendor';
                },
            },
        },
    },
});
