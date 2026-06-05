import type { ReactNode } from 'react';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';

interface AuthShellProps {
    /** Judul tab browser (Head). */
    title: string;
    /** Ikon/emoji besar di atas judul kartu. */
    icon?: ReactNode;
    /** Judul utama kartu. */
    heading: string;
    /** Deskripsi singkat di bawah judul. */
    description?: ReactNode;
    children: ReactNode;
    /** Footer kartu (mis. link kembali ke login). */
    footer?: ReactNode;
    className?: string;
}

/**
 * Kerangka halaman auth (verify email / forgot / reset password) bertema
 * Emerald + Brass — kartu glass di atas latar hero-mesh + dot-grid.
 */
export function AuthShell({
    title,
    icon,
    heading,
    description,
    children,
    footer,
    className,
}: AuthShellProps) {
    return (
        <div className="hero-mesh relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-background px-4 py-10">
            <Head title={title} />

            {/* Decorative layers */}
            <div className="dot-grid pointer-events-none absolute inset-0 opacity-60" />
            <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-cobalt/15 blur-3xl" />
            <div className="pointer-events-none absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-brass/15 blur-3xl" />

            {/* Back to home */}
            <Link
                href="/"
                className="absolute top-5 left-5 inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-card/70 px-3.5 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-md transition-colors hover:text-foreground"
            >
                <ArrowLeft className="h-3.5 w-3.5" />
                {/* Bahasa netral agar tetap singkat */}
                Home
            </Link>

            <div
                className={cn(
                    'relative z-10 w-full max-w-md page-enter in',
                    className,
                )}
            >
                {/* Brand */}
                <div className="mb-6 flex flex-col items-center gap-3 text-center">
                    <ImageWithFallback
                        src="/assets/logos/Saint-Luke.png"
                        alt="Saint Luke"
                        className="h-14 w-14 rounded-full object-cover shadow-soft ring-2 ring-cobalt/20"
                    />
                    <span className="font-display text-sm font-semibold tracking-wider-2 text-muted-foreground uppercase">
                        Saint Luke E-Library
                    </span>
                </div>

                {/* Card */}
                <div className="glass rounded-4xl border border-border/70 p-7 shadow-lift sm:p-9">
                    <div className="mb-6 flex flex-col items-center text-center">
                        {icon && (
                            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-cobalt-50 text-3xl shadow-soft dark:bg-night-3">
                                {icon}
                            </div>
                        )}
                        <h1 className="font-display text-2xl font-bold text-foreground">
                            {heading}
                        </h1>
                        {description && (
                            <p className="mt-2 text-sm leading-relaxed text-balance text-muted-foreground">
                                {description}
                            </p>
                        )}
                    </div>

                    {children}
                </div>

                {footer && (
                    <div className="mt-6 text-center text-sm text-muted-foreground">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
}

export default AuthShell;
