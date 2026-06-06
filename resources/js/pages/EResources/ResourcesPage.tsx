import { useEffect, useRef, useState, type ComponentType } from 'react';
import { router, usePage, Link } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { motion } from 'framer-motion';
import {
    Search,
    Globe,
    BookOpen,
    Bookmark,
    Play,
    Video,
    Library,
    ExternalLink,
    ArrowUpRight,
    ArrowRight,
    Compass,
} from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';
import { useLanguage } from '@/hooks/useLanguage';
import { cn } from '@/lib/utils';
import { SortToggle } from '@/components/component/Catalog/CatalogShell';
import type { OnlineResourcePageProps } from '@/types/ResourcePage/OnlineResourcePageProps';

const content = {
    id: {
        eyebrow: 'Sumber Daring',
        h1a: 'E-book, jurnal & riset yang kami ',
        h1em: 'percayai',
        h1b: '.',
        lead: 'Sumber daring terkurasi yang diakses lewat kredensial sekolah atau akses terbuka. Diperiksa pustakawan tiap awal semester.',
        countSuffix: 'sumber',
        countNote: 'Akses gratis untuk anggota',
        placeholder: 'Cari sumber, topik, atau penyedia…',
        all: 'Semua',
        open: 'Buka',
        empty: 'Tidak ada sumber yang cocok.',
        emptyDesc: 'Coba ubah kata kunci atau pilih tipe lain.',
        ctaTitle: 'Tidak menemukan sumber yang Anda cari?',
        ctaDesc: 'Pustakawan dapat membantu mengakses jurnal berbayar lewat kemitraan antar-perpustakaan, atau merekomendasikan alternatif berkualitas.',
        ctaButton: 'Hubungi Pustakawan',
    },
    en: {
        eyebrow: 'Online Resources',
        h1a: 'E-books, journals & research we ',
        h1em: 'trust',
        h1b: '.',
        lead: 'Curated online resources accessed via school credentials or open access. Reviewed by librarians every semester.',
        countSuffix: 'resources',
        countNote: 'Free access for members',
        placeholder: 'Search resources, topics, or providers…',
        all: 'All',
        open: 'Open',
        empty: 'No matching resources.',
        emptyDesc: 'Try a different keyword or pick another type.',
        ctaTitle: "Can't find the resource you need?",
        ctaDesc: 'Our librarians can help access paid journals through inter-library partnerships, or recommend quality alternatives.',
        ctaButton: 'Contact a Librarian',
    },
};

/* thumbnail theme derived from the resource's saved hex color */
const cardTheme = (hex: string | null | undefined) => {
    const bg = hex && /^#?[0-9a-fA-F]{3,8}$/.test(hex) ? normalizeHex(hex) : '#0F3D2E';
    // Light backgrounds get dark accents, dark backgrounds get light accents,
    // so badges/icons/quotes stay readable on top of the chosen color.
    const accent = isLightHex(bg) ? '#0f172a' : '#ffffff';
    return { bg, accent };
};

function normalizeHex(hex: string): string {
    let c = hex.startsWith('#') ? hex.slice(1) : hex;
    if (c.length === 3) {
        c = c
            .split('')
            .map((x) => x + x)
            .join('');
    }
    return '#' + c.slice(0, 6);
}

function isLightHex(hex: string): boolean {
    const c = normalizeHex(hex).slice(1);
    const r = parseInt(c.slice(0, 2), 16) || 0;
    const g = parseInt(c.slice(2, 4), 16) || 0;
    const b = parseInt(c.slice(4, 6), 16) || 0;
    // Perceived luminance (0–1); >0.6 is treated as a light color.
    return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.6;
}

const ICONS: Record<string, ComponentType<{ className?: string }>> = {
    'book-open': BookOpen,
    bookmark: Bookmark,
    play: Play,
    search: Search,
    globe: Globe,
    video: Video,
    library: Library,
};

const ResourcesPage = () => {
    const { resources, filters, typeOptions } =
        usePage<OnlineResourcePageProps>().props;
    const { language } = useLanguage();
    const t = language === 'id' ? content.id : content.en;

    const [search, setSearch] = useState(filters.search || '');
    const [type, setType] = useState(filters.type || 'Semua');
    const debounceSearch = useDebounce(search, 400);

    // Urut judul A–Z (asc) / Z–A (desc). null = urutan default (sort_order, title).
    const [sortDir, setSortDir] = useState<'asc' | 'desc' | null>(null);

    const firstRender = useRef(true);
    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }
        router.get(
            route('resource'),
            {
                search: debounceSearch || undefined,
                type,
                ...(sortDir ? { field: 'title', direction: sortDir } : {}),
            },
            { preserveState: true, preserveScroll: true, replace: true },
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounceSearch, type, sortDir]);

    const chips = ['Semua', ...typeOptions];

    return (
        <section className="mx-auto max-w-7xl px-6 pt-12 pb-24 lg:px-10">
            {/* Header */}
            <div className="grid grid-cols-12 items-end gap-8">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="col-span-12 lg:col-span-8"
                >
                    <div className="tracking-editorial inline-flex items-center gap-2 font-mono text-[11px] uppercase text-cobalt dark:text-cobalt-lt">
                        <span className="h-1.5 w-1.5 rounded-full bg-cobalt dark:bg-cobalt-lt" />
                        {t.eyebrow}
                    </div>
                    <h1
                        className="mt-4 font-display text-4xl leading-[1.03] font-medium text-foreground lg:text-6xl"
                        style={{ textWrap: 'balance' }}
                    >
                        {t.h1a}
                        <em className="text-cobalt not-italic dark:text-cobalt-lt">
                            {t.h1em}
                        </em>
                        {t.h1b}
                    </h1>
                    <p className="mt-4 max-w-2xl text-muted-foreground">
                        {t.lead}
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="col-span-12 lg:col-span-4"
                >
                    <div className="hairline flex items-center gap-4 rounded-xl2 border bg-card p-5 shadow-soft dark:bg-night-2">
                        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-cobalt text-white">
                            <Globe className="h-6 w-6" />
                        </div>
                        <div>
                            <div className="font-display text-2xl tabnum text-foreground">
                                {resources.length} {t.countSuffix}
                            </div>
                            <div className="text-xs text-muted-foreground">
                                {t.countNote}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Search + sort */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="hairline flex flex-1 items-center gap-3 rounded-full border bg-card px-5 shadow-soft transition-colors focus-within:border-cobalt dark:bg-night-2">
                    <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
                    <input
                        type="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder={t.placeholder}
                        className="flex-1 bg-transparent py-3.5 text-base text-foreground outline-none placeholder:text-muted-foreground"
                    />
                </div>
                <SortToggle
                    direction={sortDir}
                    onChange={setSortDir}
                    language={language}
                />
            </div>

            {/* Type chips */}
            <div className="mt-6 -mx-1 flex items-center gap-2 overflow-x-auto px-1 pb-2">
                {chips.map((c) => {
                    const active =
                        type === c || (c === 'Semua' && type === 'Semua');
                    return (
                        <button
                            key={c}
                            type="button"
                            onClick={() => setType(c)}
                            className={cn(
                                'shrink-0 rounded-full border px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors',
                                active
                                    ? 'border-cobalt bg-cobalt text-white'
                                    : 'hairline text-foreground hover:border-cobalt/40',
                            )}
                        >
                            {c === 'Semua' ? t.all : c}
                        </button>
                    );
                })}
            </div>

            {/* Grid */}
            {resources.length > 0 ? (
                <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {resources.map((r, i) => {
                        const p = cardTheme(r.color);
                        const Icon = ICONS[r.icon] ?? BookOpen;
                        return (
                            <motion.a
                                key={r.id}
                                href={r.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-40px' }}
                                transition={{ delay: (i % 3) * 0.05 }}
                                className="hairline group flex flex-col overflow-hidden rounded-xl2 border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-cobalt/30 hover:shadow-lift dark:bg-night-2"
                            >
                                {/* thumbnail */}
                                <div
                                    className="relative h-36 overflow-hidden"
                                    style={{ background: p.bg, color: p.accent }}
                                >
                                    <div className="dot-grid absolute inset-0 opacity-30" />
                                    <div className="absolute top-4 left-4">
                                        <span
                                            className="tracking-editorial inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase"
                                            style={{
                                                background: p.accent,
                                                color: p.bg,
                                            }}
                                        >
                                            <Icon className="h-3 w-3" />
                                            {r.type}
                                        </span>
                                    </div>
                                    <div
                                        className="absolute top-4 right-4 grid h-8 w-8 place-items-center rounded-full border transition-transform group-hover:scale-110"
                                        style={{
                                            borderColor: p.accent + '66',
                                            color: p.accent,
                                        }}
                                    >
                                        <ExternalLink className="h-3.5 w-3.5" />
                                    </div>
                                    {r.tag && (
                                        <div
                                            className="absolute inset-x-5 bottom-4 font-quote text-2xl leading-tight italic"
                                            style={{ color: p.accent }}
                                        >
                                            {r.tag}
                                        </div>
                                    )}
                                </div>

                                {/* body */}
                                <div className="flex flex-1 flex-col p-5">
                                    <h3
                                        className="font-display text-lg leading-snug font-semibold text-foreground transition-colors group-hover:text-cobalt dark:group-hover:text-cobalt-lt"
                                        style={{ textWrap: 'balance' }}
                                    >
                                        {r.title}
                                    </h3>
                                    {r.description && (
                                        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                                            {r.description}
                                        </p>
                                    )}
                                    <div className="mt-auto flex items-center justify-between pt-4">
                                        {r.format && (
                                            <span className="tracking-editorial inline-flex items-center gap-1.5 font-mono text-[11px] uppercase text-muted-foreground">
                                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                                {r.format}
                                            </span>
                                        )}
                                        <span className="tracking-editorial inline-flex items-center gap-1 text-[12px] font-semibold uppercase text-cobalt transition-all group-hover:gap-2 dark:text-cobalt-lt">
                                            {t.open}
                                            <ArrowUpRight className="h-3.5 w-3.5" />
                                        </span>
                                    </div>
                                </div>
                            </motion.a>
                        );
                    })}
                </div>
            ) : (
                <div className="mt-12 flex flex-col items-center gap-3 py-16 text-center">
                    <div className="grid h-20 w-20 place-items-center rounded-full bg-cobalt-50 text-cobalt dark:bg-cobalt/10 dark:text-cobalt-lt">
                        <Compass className="h-9 w-9" />
                    </div>
                    <h3 className="font-display text-2xl font-semibold text-foreground">
                        {t.empty}
                    </h3>
                    <p className="max-w-md text-muted-foreground">
                        {t.emptyDesc}
                    </p>
                </div>
            )}

            {/* CTA */}
            <div className="relative mt-16 overflow-hidden rounded-4xl bg-cobalt p-8 text-white lg:p-12">
                <div className="dot-grid absolute inset-0 opacity-20" />
                <div className="absolute -top-16 -right-16 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
                <div className="relative grid grid-cols-12 items-center gap-8">
                    <div className="col-span-12 lg:col-span-8">
                        <h3
                            className="font-display text-3xl leading-tight font-semibold lg:text-4xl"
                            style={{ textWrap: 'balance' }}
                        >
                            {t.ctaTitle}
                        </h3>
                        <p className="mt-3 max-w-xl leading-relaxed text-white/80">
                            {t.ctaDesc}
                        </p>
                    </div>
                    <div className="col-span-12 lg:col-span-4 lg:text-right">
                        <Link
                            href={route('about.contact')}
                            className="btn-press inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-cobalt transition-colors hover:bg-paper"
                        >
                            {t.ctaButton}
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ResourcesPage;
