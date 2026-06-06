{{-- Tautan "back to login" di pojok kiri atas kartu halaman lupa password. --}}
<div style="margin-bottom: 0.75rem;">
    <a
        href="{{ filament()->getLoginUrl() }}"
        class="fi-link inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
        style="color: var(--primary-600, #d97706);"
    >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
             stroke="currentColor" style="width:1rem;height:1rem;">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
        <span>{{ __('filament-panels::auth/pages/password-reset/request-password-reset.actions.login.label') }}</span>
    </a>
</div>
