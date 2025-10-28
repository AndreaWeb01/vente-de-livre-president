import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';

// ----- REMOVE THE LUCIDE-REACT Route (conflicting) AND react-router-dom imports below -----

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// You typically should not combine Inertia and react-router-dom routing in the same place.
// Inertia handles routing itself! All the imports of pages/components here are not needed nor used in Inertia's createInertiaApp.
// Instead, all you need is createInertiaApp configuration and theme initialization.

initializeTheme();

createInertiaApp({
    title: (title: string) => (title ? `${title} - ${appName}` : appName),
    resolve: (name: string) =>
        resolvePageComponent(
            `./pages/${name}.jsx`,
            import.meta.glob('./pages/**/*.jsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
});

