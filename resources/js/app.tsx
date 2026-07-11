import { createInertiaApp, router } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../css/app.css';
import { LanguageProvider } from './context/LanguageContext';
import { initializeTheme } from './hooks/use-appearance';
import Navbar from './components/Layouts/Navbar/Navbar';
import { Footer } from './components/Layouts/Footer/Footer';
import AnnouncementModal from './components/component/Announcement/AnnouncementModal';
import LibraryStatusBadge from './components/component/LibraryStatusBadge/LibraryStatusBadge';
import AccessDeniedModal from './components/component/AccessDenied/AccessDeniedModal';
import SweetAlertListener from './components/component/SweetAlertListener/SweetAlertListener';
import type { PageProps, AnnouncementProps } from './types';
import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json';

const initialToken = document
    .querySelector('meta[name="csrf-token"]')
    ?.getAttribute('content');

if (initialToken) {
    axios.defaults.headers.common['X-CSRF-TOKEN'] = initialToken;
}

router.on('navigate', (event) => {
    const token = (event.detail.page.props as PageProps).csrfToken;
    if (token) {
        axios.defaults.headers.common['X-CSRF-TOKEN'] = token;
    }
});

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// Apply the persisted light/dark theme (.dark class) before the app renders.
initializeTheme();

/**
 * Sembunyikan splash/loading screen (dirender di app.blade.php) dengan transisi
 * halus setelah aplikasi siap. Dijaga tampil minimal ~500ms agar tidak berkedip
 * terlalu cepat saat load instan.
 */
const hideSplash = () => {
    const splash = document.getElementById('app-splash');
    if (!splash) return;

    const t0 = (window as unknown as { __SPLASH_T0?: number }).__SPLASH_T0 ?? 0;
    const wait = Math.max(0, 500 - (Date.now() - t0));

    window.setTimeout(() => {
        splash.classList.add('app-splash--hidden');
        // Hapus dari DOM setelah transisi opacity selesai.
        window.setTimeout(() => splash.remove(), 700);
    }, wait);
};

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) =>
        resolvePageComponent(
            `./pages/${name}.tsx`,
            import.meta.glob('./pages/**/*.tsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);
        const initialProps = props.initialPage.props as PageProps;
        const initialAuth = initialProps.auth ?? null;
        const announcement: AnnouncementProps | null =
            initialProps.announcement ?? null;
        const flash = initialProps.flash ?? null;

        root.render(
            <StrictMode>
                <LanguageProvider>
                    <AnnouncementModal announcement={announcement} />
                    <LibraryStatusBadge initialAnnouncement={announcement} />
                    <AccessDeniedModal initialFlash={flash} />
                    <SweetAlertListener initialFlash={flash} />
                    <Navbar initialAuth={initialAuth} />
                    <div className="flex-1 overflow-x-clip">
                        <App {...props} />
                    </div>
                    <Footer />
                </LanguageProvider>
            </StrictMode>,
        );

        // Setelah React melukis frame pertama, baru sembunyikan splash.
        requestAnimationFrame(() => requestAnimationFrame(hideSplash));
    },
});
