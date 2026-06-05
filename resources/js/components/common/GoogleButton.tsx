import { cn } from '@/lib/utils';
import { useLanguage } from '@/hooks/useLanguage';

interface GoogleButtonProps {
    /** Teks override; default mengikuti bahasa aktif. */
    label?: string;
    className?: string;
}

/**
 * Tombol "Lanjutkan dengan Google".
 *
 * OAuth memerlukan full-page redirect ke server (bukan navigasi Inertia),
 * jadi memakai <a href> biasa ke route `google.redirect`.
 */
export function GoogleButton({ label, className }: GoogleButtonProps) {
    const { language } = useLanguage();
    const text =
        label ??
        (language === 'id'
            ? 'Lanjutkan dengan Google'
            : 'Continue with Google');

    return (
        <a
            href={route('google.redirect')}
            className={cn(
                'group btn-press inline-flex h-11 w-full items-center justify-center gap-3 rounded-md border border-input bg-card px-4 text-sm font-semibold text-foreground shadow-soft transition-all duration-300 hover:border-cobalt/40 hover:bg-accent hover:shadow-lift focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none dark:hover:border-cobalt-lt/40',
                className,
            )}
        >
            <GoogleIcon className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:scale-110" />
            <span>{text}</span>
        </a>
    );
}

function GoogleIcon({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z"
            />
            <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.65l-3.57-2.77c-.99.66-2.26 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"
            />
            <path
                fill="#FBBC05"
                d="M5.84 14.11a6.6 6.6 0 0 1 0-4.22V7.05H2.18a11 11 0 0 0 0 9.9l3.66-2.84Z"
            />
            <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.05l3.66 2.84c.87-2.6 3.3-4.51 6.16-4.51Z"
            />
        </svg>
    );
}

export default GoogleButton;
