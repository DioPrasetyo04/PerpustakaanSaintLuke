import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';

const viteDevServerUrl = process.env.VITE_DEV_SERVER_URL;

export default defineConfig({
    server: viteDevServerUrl
        ? {
              origin: viteDevServerUrl,
              cors: { origin: '*' },
              hmr: {
                  host: new URL(viteDevServerUrl).hostname,
                  protocol: 'wss',
              },
          }
        : undefined,
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
});
