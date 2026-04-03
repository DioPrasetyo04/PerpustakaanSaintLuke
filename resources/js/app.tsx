import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../css/app.css';
// import { initializeTheme } from './hooks/use-appearance';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Layouts/Navbar/Navbar';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) =>
        resolvePageComponent(
            `./pages/${name}.tsx`,
            import.meta.glob('./pages/**/*.tsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);
        const initialAuth = (props.initialPage.props as any).auth ?? null;

        root.render(
            <StrictMode>
                <LanguageProvider>
                    <Navbar initialAuth={initialAuth} />
                    <App {...props} />
                </LanguageProvider>
            </StrictMode>,
        );
    },
});

// This will set light / dark mode on load...
// initializeTheme();
