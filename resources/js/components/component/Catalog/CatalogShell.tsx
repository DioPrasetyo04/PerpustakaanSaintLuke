import { Search, ChevronUp, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import type { ChangeEvent, ComponentType, ReactNode } from 'react';
import { cn } from '@/lib/utils';

/* Editorial catalog header — mono eyebrow + Space Grotesk title + subtitle */
export function CatalogHeader({
    eyebrow,
    title,
    count,
    subtitle,
}: {
    eyebrow: string;
    title: string;
    count?: number;
    subtitle?: string;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
        >
            <div className="tracking-editorial font-mono text-[10px] uppercase text-cobalt dark:text-cobalt-lt">
                {eyebrow}
            </div>
            <h1
                className="mt-3 font-display text-4xl text-foreground lg:text-5xl"
                style={{ textWrap: 'balance' }}
            >
                {title}
                {typeof count === 'number' && (
                    <span className="text-muted-foreground"> · {count}</span>
                )}
            </h1>
            {subtitle && (
                <p className="mt-3 max-w-2xl text-foreground/70">{subtitle}</p>
            )}
        </motion.div>
    );
}

/* Rounded pill search field — optional `trailing` slot for a sort toggle, etc. */
export function CatalogSearch({
    placeholder,
    value,
    onChange,
    trailing,
}: {
    placeholder?: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    trailing?: ReactNode;
}) {
    return (
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="hairline flex flex-1 items-center gap-3 rounded-full border bg-card px-5 shadow-soft transition-colors focus-within:border-cobalt dark:bg-night-2">
                <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
                <input
                    type="search"
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="flex-1 bg-transparent py-3.5 text-base text-foreground outline-none placeholder:text-muted-foreground"
                />
            </div>
            {trailing}
        </div>
    );
}

/**
 * Tombol urut A–Z: panah atas = ascending (A→Z), panah bawah = descending (Z→A).
 * `direction` null berarti belum aktif (tidak ada yang ter-highlight).
 */
export function SortToggle({
    direction,
    onChange,
    language,
}: {
    direction: 'asc' | 'desc' | null;
    onChange: (dir: 'asc' | 'desc') => void;
    language: 'id' | 'en';
}) {
    const tr = (id: string, en: string) => (language === 'id' ? id : en);
    return (
        <div
            role="group"
            aria-label={tr('Urutkan A–Z', 'Sort A–Z')}
            className="hairline inline-flex shrink-0 overflow-hidden rounded-full border bg-card shadow-soft dark:bg-night-2"
        >
            <button
                type="button"
                onClick={() => onChange('asc')}
                aria-pressed={direction === 'asc'}
                aria-label={tr('Urutkan A ke Z', 'Sort A to Z')}
                title={tr('A–Z', 'A–Z')}
                className={cn(
                    'grid h-12 w-12 place-items-center transition-colors',
                    direction === 'asc'
                        ? 'bg-cobalt text-white'
                        : 'text-muted-foreground hover:text-cobalt',
                )}
            >
                <ChevronUp className="h-4 w-4" />
            </button>
            <button
                type="button"
                onClick={() => onChange('desc')}
                aria-pressed={direction === 'desc'}
                aria-label={tr('Urutkan Z ke A', 'Sort Z to A')}
                title={tr('Z–A', 'Z–A')}
                className={cn(
                    'grid h-12 w-12 place-items-center transition-colors',
                    direction === 'desc'
                        ? 'bg-cobalt text-white'
                        : 'text-muted-foreground hover:text-cobalt',
                )}
            >
                <ChevronDown className="h-4 w-4" />
            </button>
        </div>
    );
}

/* Mono result counter */
export function CatalogResultMeta({
    start,
    end,
    total,
    language,
    noun = { id: 'hasil', en: 'results' },
}: {
    start: number;
    end: number;
    total: number;
    language: 'id' | 'en';
    noun?: { id: string; en: string };
}) {
    return (
        <div className="tracking-editorial mb-6 font-mono text-[10px] uppercase text-muted-foreground">
            {language === 'id'
                ? `Menampilkan ${start}–${end} dari ${total} ${noun.id}`
                : `Showing ${start}–${end} of ${total} ${noun.en}`}
        </div>
    );
}

/* Editorial empty state */
export function CatalogEmpty({
    icon: Icon,
    title,
    desc,
}: {
    icon: ComponentType<{ className?: string }>;
    title: string;
    desc: string;
}) {
    return (
        <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
            <div className="grid h-20 w-20 place-items-center rounded-full bg-cobalt-50 text-cobalt dark:bg-cobalt/10 dark:text-cobalt-lt">
                <Icon className="h-9 w-9" />
            </div>
            <h3 className="font-display text-2xl font-semibold text-foreground">
                {title}
            </h3>
            <p className="max-w-md text-muted-foreground">{desc}</p>
        </div>
    );
}
