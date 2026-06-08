import { useMemo, useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    ArrowRight,
    Compass,
    Home,
    KeyRound,
    Lock,
    RefreshCw,
    Search,
    ServerCrash,
    ShieldAlert,
    Timer,
    TriangleAlert,
    Wrench,
    type LucideIcon,
} from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

type Accent = 'info' | 'danger' | 'warn';

type ErrorConfig = {
    icon: LucideIcon;
    accent: Accent;
    code: string; // label kode (mis. "404")
    title: { id: string; en: string };
    desc: { id: string; en: string };
    /** Tombol khusus selain Beranda + Kembali. */
    actions?: ('retry' | 'login' | 'search')[];
};

/* ── Peta status → konten (dwibahasa) ───────────────────────────────────────── */
const ERROR_MAP: Record<number, ErrorConfig> = {
    400: {
        icon: TriangleAlert,
        accent: 'warn',
        code: '400',
        title: { id: 'Permintaan Tidak Valid', en: 'Bad Request' },
        desc: {
            id: 'Server tidak dapat memahami permintaan ini. Periksa kembali tautan atau coba ulangi.',
            en: 'The server could not understand this request. Check the link or try again.',
        },
        actions: ['retry'],
    },
    401: {
        icon: KeyRound,
        accent: 'info',
        code: '401',
        title: { id: 'Belum Masuk', en: 'Unauthorized' },
        desc: {
            id: 'Kamu perlu masuk terlebih dahulu untuk mengakses halaman ini.',
            en: 'You need to sign in first to access this page.',
        },
        actions: ['login'],
    },
    403: {
        icon: ShieldAlert,
        accent: 'info',
        code: '403',
        title: { id: 'Akses Ditolak', en: 'Forbidden' },
        desc: {
            id: 'Kamu tidak memiliki izin untuk membuka halaman ini. Hubungi pustakawan bila ini sebuah kekeliruan.',
            en: 'You don’t have permission to open this page. Contact the librarian if this is a mistake.',
        },
    },
    404: {
        icon: Compass,
        accent: 'info',
        code: '404',
        title: { id: 'Halaman Tidak Ditemukan', en: 'Page Not Found' },
        desc: {
            id: 'Sepertinya halaman atau buku yang kamu cari sudah dipindahkan atau tidak pernah ada.',
            en: 'The page or book you’re looking for may have been moved or never existed.',
        },
        actions: ['search'],
    },
    419: {
        icon: Timer,
        accent: 'warn',
        code: '419',
        title: { id: 'Sesi Kedaluwarsa', en: 'Page Expired' },
        desc: {
            id: 'Demi keamanan, sesi halaman ini telah berakhir. Muat ulang lalu coba lagi.',
            en: 'For your security, this page session has expired. Reload and try again.',
        },
        actions: ['retry'],
    },
    429: {
        icon: Timer,
        accent: 'warn',
        code: '429',
        title: { id: 'Terlalu Banyak Permintaan', en: 'Too Many Requests' },
        desc: {
            id: 'Kamu mengirim permintaan terlalu cepat. Tunggu sejenak lalu coba kembali.',
            en: 'You’ve sent requests too quickly. Please wait a moment and try again.',
        },
        actions: ['retry'],
    },
    500: {
        icon: ServerCrash,
        accent: 'danger',
        code: '500',
        title: { id: 'Terjadi Kesalahan Server', en: 'Internal Server Error' },
        desc: {
            id: 'Ada gangguan di sisi kami. Tim sudah diberi tahu — silakan coba beberapa saat lagi.',
            en: 'Something went wrong on our end. Our team has been notified — please try again shortly.',
        },
        actions: ['retry'],
    },
    503: {
        icon: Wrench,
        accent: 'warn',
        code: '503',
        title: { id: 'Sedang Pemeliharaan', en: 'Service Unavailable' },
        desc: {
            id: 'Perpustakaan digital sedang dalam pemeliharaan singkat. Kami segera kembali.',
            en: 'The digital library is under brief maintenance. We’ll be right back.',
        },
        actions: ['retry'],
    },
};

const FALLBACK: ErrorConfig = {
    icon: TriangleAlert,
    accent: 'danger',
    code: 'Error',
    title: { id: 'Terjadi Kesalahan', en: 'Something Went Wrong' },
    desc: {
        id: 'Maaf, terjadi kesalahan yang tidak terduga. Coba muat ulang halaman.',
        en: 'Sorry, an unexpected error occurred. Try reloading the page.',
    },
    actions: ['retry'],
};

/* ── Tema warna per accent (kelas literal agar terbaca Tailwind JIT) ─────────── */
const ACCENT: Record<
    Accent,
    { text: string; ring: string; soft: string; glow: string; btn: string }
> = {
    info: {
        text: 'text-cobalt dark:text-cobalt-lt',
        ring: 'ring-cobalt/20',
        soft: 'bg-cobalt-50 dark:bg-cobalt/15',
        glow: 'bg-cobalt/20',
        btn: 'bg-cobalt hover:bg-cobalt-dk',
    },
    danger: {
        text: 'text-rose-600 dark:text-rose-400',
        ring: 'ring-rose-500/20',
        soft: 'bg-rose-500/10',
        glow: 'bg-rose-500/20',
        btn: 'bg-rose-600 hover:bg-rose-700',
    },
    warn: {
        text: 'text-amber-600 dark:text-amber-400',
        ring: 'ring-amber-500/20',
        soft: 'bg-amber-500/10',
        glow: 'bg-amber-500/20',
        btn: 'bg-amber-600 hover:bg-amber-700',
    },
};

type ErrorPageProps = { status?: number };

export default function ErrorPage({ status = 500 }: ErrorPageProps) {
    const { language } = useLanguage();
    const id = language === 'id';
    const [query, setQuery] = useState('');

    const cfg = useMemo(() => ERROR_MAP[status] ?? FALLBACK, [status]);
    const accent = ACCENT[cfg.accent];
    const Icon = cfg.icon;
    const actions = cfg.actions ?? [];

    const onSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const kw = query.trim();
        router.get('/catalog/books', kw ? { search: kw } : {});
    };

    const reload = () => router.reload();
    const goBack = () => window.history.back();

    return (
        <>
        <Head title={`${cfg.code} · ${cfg.title[id ? 'id' : 'en']}`} />
        <section className="relative flex min-h-[82vh] items-center overflow-hidden bg-background">
            {/* Lapisan dekoratif (disembunyikan dari pembaca layar) */}
            <div className="hero-mesh pointer-events-none absolute inset-0 opacity-60" />
            <div
                className="line-grid pointer-events-none absolute inset-0 opacity-40"
                style={{
                    maskImage:
                        'radial-gradient(circle at 50% 40%, black, transparent 75%)',
                }}
            />
            <motion.div
                aria-hidden
                className={`pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full blur-3xl sm:h-96 sm:w-96 ${accent.glow}`}
                animate={{ scale: [1, 1.12, 1], opacity: [0.6, 0.9, 0.6] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            />

            <div className="relative mx-auto w-full max-w-3xl px-6 py-16 text-center sm:py-20 lg:px-10">
                {/* Badge kode */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-[11px] uppercase tracking-editorial ${accent.soft} ${accent.text}`}
                >
                    <span className={`h-1.5 w-1.5 rounded-full ${accent.glow}`} />
                    {id ? 'Kode Status' : 'Status Code'} · {cfg.code}
                </motion.div>

                {/* Ikon + angka raksasa */}
                <div className="relative mt-8 flex items-center justify-center">
                    <motion.span
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                            type: 'spring',
                            stiffness: 140,
                            damping: 14,
                        }}
                        className={`absolute -z-0 grid h-20 w-20 place-items-center rounded-2xl bg-card shadow-lift ring-1 sm:h-24 sm:w-24 ${accent.ring}`}
                    >
                        <motion.span
                            animate={{ y: [0, -6, 0] }}
                            transition={{
                                duration: 3.5,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                        >
                            <Icon
                                className={`h-9 w-9 sm:h-11 sm:w-11 ${accent.text}`}
                                strokeWidth={1.6}
                            />
                        </motion.span>
                    </motion.span>

                    <h1
                        aria-hidden
                        className="select-none font-display text-[28vw] leading-none font-semibold text-foreground/[0.06] sm:text-[200px]"
                    >
                        {cfg.code}
                    </h1>
                </div>

                {/* Judul + deskripsi */}
                <motion.h2
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="mt-2 font-display text-3xl leading-tight text-foreground sm:text-4xl lg:text-5xl"
                    style={{ textWrap: 'balance' }}
                >
                    {cfg.title[id ? 'id' : 'en']}
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.15 }}
                    className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
                    style={{ textWrap: 'pretty' }}
                >
                    {cfg.desc[id ? 'id' : 'en']}
                </motion.p>

                {/* Pencarian (khusus 404) */}
                {actions.includes('search') && (
                    <motion.form
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        onSubmit={onSearch}
                        role="search"
                        className="hairline mx-auto mt-8 flex max-w-md items-center gap-2 rounded-full border bg-card p-2 shadow-soft transition-colors focus-within:border-cobalt/50 dark:bg-night-2"
                    >
                        <Search className="ml-3 h-5 w-5 shrink-0 text-muted-foreground" />
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder={
                                id
                                    ? 'Cari judul atau penulis…'
                                    : 'Search title or author…'
                            }
                            aria-label={id ? 'Cari katalog' : 'Search catalog'}
                            className="min-w-0 flex-1 bg-transparent py-1.5 text-sm text-foreground outline-none placeholder:text-muted-foreground"
                        />
                        <button
                            type="submit"
                            className="btn-press inline-flex shrink-0 items-center gap-1.5 rounded-full bg-cobalt px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-cobalt-dk"
                        >
                            <span className="hidden sm:inline">
                                {id ? 'Cari' : 'Search'}
                            </span>
                            <ArrowRight className="h-4 w-4" />
                        </button>
                    </motion.form>
                )}

                {/* Tombol aksi */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.25 }}
                    className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap"
                >
                    <Link
                        href="/"
                        className={`btn-press inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-colors sm:w-auto ${accent.btn}`}
                    >
                        <Home className="h-4 w-4" />
                        {id ? 'Ke Beranda' : 'Go Home'}
                    </Link>

                    {actions.includes('login') && (
                        <Link
                            href="/login"
                            className="btn-press hairline inline-flex w-full items-center justify-center gap-2 rounded-full border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-cobalt hover:text-cobalt sm:w-auto dark:hover:text-cobalt-lt"
                        >
                            <Lock className="h-4 w-4" />
                            {id ? 'Masuk' : 'Sign In'}
                        </Link>
                    )}

                    {actions.includes('retry') && (
                        <button
                            type="button"
                            onClick={reload}
                            className="btn-press hairline inline-flex w-full items-center justify-center gap-2 rounded-full border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-cobalt hover:text-cobalt sm:w-auto dark:hover:text-cobalt-lt"
                        >
                            <RefreshCw className="h-4 w-4" />
                            {id ? 'Muat Ulang' : 'Reload'}
                        </button>
                    )}

                    <button
                        type="button"
                        onClick={goBack}
                        className="btn-press inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:w-auto"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        {id ? 'Kembali' : 'Go Back'}
                    </button>
                </motion.div>

                {/* Tautan bantuan */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.35 }}
                    className="mt-10 text-xs text-muted-foreground"
                >
                    {id ? 'Butuh bantuan?' : 'Need help?'}{' '}
                    <Link
                        href="/about/contact"
                        className="font-medium text-cobalt underline-offset-4 hover:underline dark:text-cobalt-lt"
                    >
                        {id ? 'Hubungi pustakawan' : 'Contact the librarian'}
                    </Link>
                </motion.p>
            </div>
        </section>
        </>
    );
}
