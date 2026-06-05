import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import type {
    CatalogFilters as Filters,
    CatalogOptions,
} from '@/types/CatalogPage/CatalogBooksPageProps';

type Lang = 'id' | 'en';

const tr = (lang: Lang, id: string, en: string) => (lang === 'id' ? id : en);

/* ───────── Removable active-filter chip ───────── */
export function FilterChip({
    label,
    onRemove,
}: {
    label: string;
    onRemove: () => void;
}) {
    return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-cobalt-50 px-3 py-1.5 text-xs font-medium text-cobalt dark:bg-cobalt/15 dark:text-cobalt-lt">
            {label}
            <button
                type="button"
                onClick={onRemove}
                aria-label="Hapus filter"
                className="grid h-4 w-4 place-items-center rounded-full hover:bg-cobalt/20"
            >
                <X className="h-3 w-3" />
            </button>
        </span>
    );
}

/* ───────── Dual-handle year range ───────── */
export function YearRange({
    min,
    max,
    valueMin,
    valueMax,
    onChange,
}: {
    min: number;
    max: number;
    valueMin: number;
    valueMax: number;
    onChange: (lo: number, hi: number) => void;
}) {
    const lo = Math.max(min, Math.min(valueMin, valueMax));
    const hi = Math.min(max, Math.max(valueMin, valueMax));
    const pct = (v: number) => ((v - min) / (max - min || 1)) * 100;

    return (
        <div>
            <div className="mb-3 flex items-center justify-between">
                <span className="rounded-lg bg-cobalt-50 px-2.5 py-1 text-sm font-semibold tabnum text-cobalt dark:bg-cobalt/15 dark:text-cobalt-lt">
                    {lo}
                </span>
                <span className="text-xs text-muted-foreground">—</span>
                <span className="rounded-lg bg-cobalt-50 px-2.5 py-1 text-sm font-semibold tabnum text-cobalt dark:bg-cobalt/15 dark:text-cobalt-lt">
                    {hi}
                </span>
            </div>
            <div className="relative flex h-6 items-center">
                <div className="absolute inset-x-0 h-1.5 rounded-full bg-paper-2 dark:bg-night-3" />
                <div
                    className="absolute h-1.5 rounded-full bg-cobalt"
                    style={{ left: `${pct(lo)}%`, right: `${100 - pct(hi)}%` }}
                />
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={lo}
                    onChange={(e) =>
                        onChange(Math.min(+e.target.value, hi), hi)
                    }
                    className="yr-range pointer-events-none absolute inset-x-0 w-full appearance-none bg-transparent"
                    aria-label="Tahun minimum"
                />
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={hi}
                    onChange={(e) =>
                        onChange(lo, Math.max(+e.target.value, lo))
                    }
                    className="yr-range pointer-events-none absolute inset-x-0 w-full appearance-none bg-transparent"
                    aria-label="Tahun maksimum"
                />
            </div>
            <div className="mt-1 flex items-center justify-between text-[10px] tabnum text-muted-foreground">
                <span>{min}</span>
                <span>{max}</span>
            </div>
        </div>
    );
}

const groupLabel = (label: string) => (
    <div className="tracking-editorial mb-3 font-mono text-[10px] uppercase text-muted-foreground">
        {label}
    </div>
);

/* ───────── Sidebar ───────── */
export function FilterSidebar({
    language,
    filters,
    options,
    setFilter,
    toggleArray,
    onReset,
    onClose,
}: {
    language: Lang;
    filters: Filters;
    options: CatalogOptions;
    setFilter: <K extends keyof Filters>(key: K, value: Filters[K]) => void;
    toggleArray: (
        key: 'categories' | 'authors' | 'publishers' | 'types' | 'attachments',
        value: string,
    ) => void;
    onReset: () => void;
    onClose?: () => void;
}) {
    const availabilityOptions = [
        { v: '', label: tr(language, 'Semua', 'All') },
        ...Object.entries(options.statusOptions).map(([key, label]) => ({
            v: key === 'Tersedia' ? 'available' : key,
            label: label as string,
        })),
    ];

    return (
        <div className="hairline sticky top-24 rounded-xl2 border bg-card p-6 shadow-soft dark:bg-night-2">
            <div className="mb-6 flex items-center justify-between">
                <div className="font-display text-xl font-semibold text-foreground">
                    {tr(language, 'Filter', 'Filters')}
                </div>
                <button
                    type="button"
                    onClick={onReset}
                    className="text-xs font-semibold text-cobalt hover:underline dark:text-cobalt-lt"
                >
                    {tr(language, 'Atur ulang', 'Reset')}
                </button>
            </div>

            {/* Availability */}
            <div className="mb-6">
                {groupLabel(tr(language, 'Ketersediaan', 'Availability'))}
                <div className="space-y-2">
                    {availabilityOptions.map((o) => (
                        <label
                            key={o.v || 'all'}
                            className="flex cursor-pointer items-center gap-2.5 text-sm text-foreground/80 hover:text-cobalt dark:hover:text-cobalt-lt"
                        >
                            <input
                                type="radio"
                                name="availability"
                                checked={filters.availability === o.v}
                                onChange={() => setFilter('availability', o.v)}
                                className="accent-cobalt"
                            />
                            {o.label}
                        </label>
                    ))}
                </div>
            </div>

            {/* Tipe Koleksi */}
            {options.types.length > 0 && (
                <div className="mb-6">
                    {groupLabel(tr(language, 'Tipe Koleksi', 'Collection Type'))}
                    <div className="space-y-2">
                        {options.types.map((t) => (
                            <label
                                key={t.id}
                                className="flex cursor-pointer items-center gap-2.5 text-sm capitalize text-foreground/80 hover:text-cobalt dark:hover:text-cobalt-lt"
                            >
                                <input
                                    type="checkbox"
                                    checked={filters.types.includes(t.type)}
                                    onChange={() => toggleArray('types', t.type)}
                                    className="accent-cobalt"
                                />
                                {t.type}
                            </label>
                        ))}
                    </div>
                </div>
            )}

            {/* Lampiran */}
            {options.attachments.length > 0 && (
                <div className="mb-6">
                    {groupLabel(tr(language, 'Lampiran', 'Attachments'))}
                    <div className="flex flex-wrap gap-2">
                        {options.attachments.map((a) => {
                            const on = filters.attachments.includes(a);
                            return (
                                <button
                                    key={a}
                                    type="button"
                                    onClick={() => toggleArray('attachments', a)}
                                    className={cn(
                                        'rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
                                        on
                                            ? 'border-cobalt bg-cobalt text-white'
                                            : 'hairline text-foreground hover:border-cobalt/40',
                                    )}
                                >
                                    {a}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Tahun Publikasi */}
            <div className="mb-6">
                {groupLabel(tr(language, 'Tahun Publikasi', 'Publication Year'))}
                <YearRange
                    min={options.yearBounds.min}
                    max={options.yearBounds.max}
                    valueMin={filters.yearMin ?? options.yearBounds.min}
                    valueMax={filters.yearMax ?? options.yearBounds.max}
                    onChange={(lo, hi) => {
                        setFilter('yearMin', lo);
                        setFilter('yearMax', hi);
                    }}
                />
            </div>

            {/* Kategori */}
            {options.categories.length > 0 && (
                <div className="mb-6">
                    {groupLabel(tr(language, 'Kategori', 'Category'))}
                    <div className="custom-scrollbar max-h-64 space-y-1 overflow-y-auto pr-1">
                        {options.categories.map((c) => {
                            const on = filters.categories.includes(c.name);
                            return (
                                <button
                                    key={c.id}
                                    type="button"
                                    onClick={() =>
                                        toggleArray('categories', c.name)
                                    }
                                    className={cn(
                                        'flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors',
                                        on
                                            ? 'bg-cobalt/10 text-cobalt dark:text-cobalt-lt'
                                            : 'text-foreground/75 hover:bg-foreground/[.04]',
                                    )}
                                >
                                    <span className="flex min-w-0 items-center gap-2">
                                        {c.icon && (
                                            <ImageWithFallback
                                                src={c.icon}
                                                alt={c.name}
                                                loading="lazy"
                                                className="h-5 w-5 shrink-0 rounded-sm object-contain"
                                            />
                                        )}
                                        <span className="truncate">
                                            {c.name}
                                        </span>
                                    </span>
                                    {typeof c.count_of_books === 'number' && (
                                        <span className="text-[10px] font-mono tabnum opacity-60">
                                            {c.count_of_books}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Penerbit */}
            {options.publishers.length > 0 && (
                <div className="mb-6">
                    {groupLabel(tr(language, 'Penerbit', 'Publisher'))}
                    <select
                        value={filters.publishers[0] ?? ''}
                        onChange={(e) =>
                            setFilter(
                                'publishers',
                                e.target.value ? [e.target.value] : [],
                            )
                        }
                        className="hairline w-full rounded-lg border bg-paper px-3 py-2.5 text-sm text-foreground outline-none focus:border-cobalt dark:bg-night-3"
                    >
                        <option value="">
                            {tr(language, 'Semua penerbit', 'All publishers')}
                        </option>
                        {options.publishers.map((p) => (
                            <option key={p.id} value={p.name}>
                                {p.name}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {/* Penulis */}
            {options.authors.length > 0 && (
                <div>
                    {groupLabel(tr(language, 'Penulis', 'Author'))}
                    <select
                        value={filters.authors[0] ?? ''}
                        onChange={(e) =>
                            setFilter(
                                'authors',
                                e.target.value ? [e.target.value] : [],
                            )
                        }
                        className="hairline w-full rounded-lg border bg-paper px-3 py-2.5 text-sm text-foreground outline-none focus:border-cobalt dark:bg-night-3"
                    >
                        <option value="">
                            {tr(language, 'Semua penulis', 'All authors')}
                        </option>
                        {options.authors.map((a) => (
                            <option key={a.id} value={a.name}>
                                {a.name}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {onClose && (
                <button
                    type="button"
                    onClick={onClose}
                    className="btn-press mt-6 w-full rounded-full bg-cobalt py-2.5 text-sm font-semibold text-white lg:hidden"
                >
                    {tr(language, 'Terapkan', 'Apply')}
                </button>
            )}
        </div>
    );
}
