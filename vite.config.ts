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
    // Configuration de build pour mieux découper les chunks et réduire l'avertissement
    build: {
        // Augmente simplement la limite de warning (en Ko) si votre app est volumineuse
        // sans que ce soit problématique en production.
        chunkSizeWarningLimit: 1024, // 1 Mo
        rollupOptions: {
            output: {
                // Regroupe certaines dépendances lourdes dans des chunks dédiés
                manualChunks: {
                    react: ['react', 'react-dom'],
                    inertia: ['@inertiajs/react'],
                    i18n: ['react-i18next', 'i18next'],
                    ziggy: ['ziggy-js'],
                },
            },
        },
    },
    server: {
        host: '127.0.0.1',
        hmr: {
            host: '127.0.0.1',
        },
    },
});
