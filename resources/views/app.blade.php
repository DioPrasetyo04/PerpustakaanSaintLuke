<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- ✅ WAJIB INI -->
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title inertia>{{ config('app.name', 'Perpustakaan Santo Lukas') }}</title>
        <link rel="icon" href="/assets/logos/Saint-Luke.png" type="image/x-icon" size="32x32" />

        {{-- Terapkan tema (dark/light) sedini mungkin agar splash & aplikasi
             tidak berkedip (FOUC), sekaligus menandai waktu mulai loading. --}}
        <script>
            (function () {
                try {
                    window.__SPLASH_T0 = Date.now();
                    var a = localStorage.getItem('appearance') || 'system';
                    var dark = a === 'dark' || (a === 'system' &&
                        window.matchMedia('(prefers-color-scheme: dark)').matches);
                    if (dark) document.documentElement.classList.add('dark');
                } catch (e) {}
            })();
        </script>

        {{-- Splash / loading screen — tampil instan saat load pertama & refresh,
             lalu dihapus oleh React setelah aplikasi siap (lihat app.tsx). --}}
        <style>
            #app-splash {
                --splash-bg: #f2f0ea;
                --splash-fg: #14201b;
                --splash-muted: #5f6b64;
                --splash-track: rgba(31, 157, 115, 0.15);
                --splash-accent: #1f9d73;
                --splash-accent2: #b0822f;
                --splash-glow: rgba(31, 157, 115, 0.14);
                --splash-card: rgba(255, 255, 255, 0.6);
                --splash-border: rgba(20, 32, 27, 0.08);
                position: fixed;
                inset: 0;
                z-index: 99999;
                display: flex;
                align-items: center;
                justify-content: center;
                background: var(--splash-bg);
                transition: opacity 0.6s ease, visibility 0.6s ease;
                font-family: 'Space Grotesk', 'Plus Jakarta Sans', system-ui, sans-serif;
                overflow: hidden;
            }
            html.dark #app-splash {
                --splash-bg: #0e1311;
                --splash-fg: #eceae0;
                --splash-muted: #8a978f;
                --splash-track: rgba(52, 198, 144, 0.16);
                --splash-accent: #34c690;
                --splash-accent2: #d2a653;
                --splash-glow: rgba(52, 198, 144, 0.12);
                --splash-card: rgba(22, 30, 26, 0.6);
                --splash-border: rgba(236, 234, 224, 0.08);
            }
            #app-splash.app-splash--hidden {
                opacity: 0;
                visibility: hidden;
                pointer-events: none;
            }
            #app-splash::before {
                content: '';
                position: absolute;
                width: 520px;
                height: 520px;
                border-radius: 50%;
                background: radial-gradient(circle, var(--splash-glow), transparent 70%);
                filter: blur(40px);
                animation: splash-pulse 3s ease-in-out infinite;
            }
            /* Pola titik halus agar tidak terasa kosong */
            #app-splash::after {
                content: '';
                position: absolute;
                inset: 0;
                background-image: radial-gradient(var(--splash-border) 1px, transparent 1px);
                background-size: 26px 26px;
                opacity: 0.5;
                -webkit-mask-image: radial-gradient(circle at center, #000, transparent 75%);
                mask-image: radial-gradient(circle at center, #000, transparent 75%);
            }
            .app-splash__inner {
                position: relative;
                z-index: 1;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 26px;
                padding: 0 24px;
                text-align: center;
                animation: splash-in 0.5s ease both;
            }
            .app-splash__brand {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 10px;
            }
            .app-splash__logo-wrap {
                position: relative;
                width: 104px;
                height: 104px;
                display: grid;
                place-items: center;
            }
            .app-splash__ring {
                position: absolute;
                inset: 0;
                border-radius: 50%;
                background: conic-gradient(
                    from 0deg,
                    transparent 0 55%,
                    var(--splash-accent2) 78%,
                    var(--splash-accent) 100%
                );
                -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 4px), #000 calc(100% - 4px));
                mask: radial-gradient(farthest-side, transparent calc(100% - 4px), #000 calc(100% - 4px));
                animation: splash-spin 1s linear infinite;
            }
            .app-splash__ring--track {
                background: none;
                border: 4px solid var(--splash-track);
                animation: none;
            }
            .app-splash__logo-disc {
                position: relative;
                width: 78px;
                height: 78px;
                border-radius: 50%;
                display: grid;
                place-items: center;
                background: var(--splash-card);
                border: 1px solid var(--splash-border);
                backdrop-filter: blur(6px);
                box-shadow: 0 10px 30px -12px var(--splash-glow);
                animation: splash-float 2.6s ease-in-out infinite;
            }
            .app-splash__logo {
                width: 52px;
                height: 52px;
                object-fit: contain;
            }
            .app-splash__title {
                font-size: 28px;
                font-weight: 700;
                letter-spacing: 0.01em;
                line-height: 1.2;
                background: linear-gradient(90deg, var(--splash-accent), var(--splash-accent2));
                -webkit-background-clip: text;
                background-clip: text;
                color: transparent;
            }
            .app-splash__sub {
                font-size: 10px;
                letter-spacing: 0.2em;
                text-transform: uppercase;
                line-height: 1.5;
                color: var(--splash-muted);
                font-family: 'JetBrains Mono', ui-monospace, monospace;
            }
            .app-splash__bar {
                position: relative;
                width: 210px;
                height: 4px;
                border-radius: 99px;
                background: var(--splash-track);
                overflow: hidden;
            }
            .app-splash__bar-fill {
                position: absolute;
                top: 0;
                bottom: 0;
                width: 40%;
                border-radius: 99px;
                background: linear-gradient(90deg, var(--splash-accent), var(--splash-accent2));
                animation: splash-load 1.25s cubic-bezier(0.4, 0, 0.2, 1) infinite;
            }
            .app-splash__loading {
                font-size: 12px;
                color: var(--splash-muted);
                letter-spacing: 0.02em;
            }
            .app-splash__loading::after {
                content: '';
                animation: splash-dots 1.4s steps(1, end) infinite;
            }
            @keyframes splash-spin {
                to { transform: rotate(360deg); }
            }
            @keyframes splash-float {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-6px); }
            }
            @keyframes splash-load {
                0% { transform: translateX(-130%); }
                100% { transform: translateX(360%); }
            }
            @keyframes splash-pulse {
                0%, 100% { transform: scale(1); opacity: 0.85; }
                50% { transform: scale(1.08); opacity: 1; }
            }
            @keyframes splash-in {
                from { opacity: 0; transform: translateY(8px); }
                to { opacity: 1; transform: translateY(0); }
            }
            @keyframes splash-dots {
                0% { content: ''; }
                25% { content: '.'; }
                50% { content: '..'; }
                75% { content: '...'; }
            }
            @media (prefers-reduced-motion: reduce) {
                #app-splash *,
                #app-splash::before {
                    animation-duration: 0.001ms !important;
                    animation-iteration-count: 1 !important;
                }
                .app-splash__ring { animation: splash-spin 1.2s linear infinite; }
                .app-splash__bar-fill { animation: splash-load 1.5s linear infinite; }
            }
        </style>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,500&family=Fraunces:ital,opsz,wght@1,9..144,400;1,9..144,500&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />

        <!-- Midtrans Snap -->
        <script
            src="{{ config('midtrans.is_production') ? 'https://app.midtrans.com/snap/snap.js' : 'https://app.sandbox.midtrans.com/snap/snap.js' }}"
            data-client-key="{{ config('midtrans.client_key') }}"></script>

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        {{-- Loading screen (dihapus React setelah aplikasi siap) --}}
        <div id="app-splash" role="status" aria-live="polite" aria-label="Memuat E-Library">
            <div class="app-splash__inner">
                <div class="app-splash__logo-wrap">
                    <span class="app-splash__ring app-splash__ring--track"></span>
                    <span class="app-splash__ring"></span>
                    <span class="app-splash__logo-disc">
                        <img
                            class="app-splash__logo"
                            src="/assets/logos/Saint-Luke.png"
                            alt=""
                            aria-hidden="true"
                        />
                    </span>
                </div>
                <div class="app-splash__brand">
                    <div class="app-splash__title">E-Library</div>
                    <div class="app-splash__sub">Yayasan Pendidikan Umum Santo Lukas</div>
                </div>
                <div class="app-splash__bar"><span class="app-splash__bar-fill"></span></div>
                <div class="app-splash__loading">{{ app()->getLocale() === 'en' ? 'Loading library' : 'Memuat pustaka' }}</div>
            </div>
        </div>
        <script>
            // Pengaman: jika bundle gagal/terlalu lama, sembunyikan splash otomatis.
            window.setTimeout(function () {
                var el = document.getElementById('app-splash');
                if (el) {
                    el.classList.add('app-splash--hidden');
                    window.setTimeout(function () { el.remove(); }, 700);
                }
            }, 10000);
        </script>

        @inertia
    </body>
</html>
