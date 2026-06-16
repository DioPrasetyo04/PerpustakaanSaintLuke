import { useEffect, useRef, useState } from 'react';
import { X, ChevronDown, Tag, Building2, User, Languages } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import type {
    CatalogFilters as Filters,
    CatalogOptions,
} from '@/types/CatalogPage/CatalogBooksPageProps';

type Lang = 'id' | 'en';

const tr = (lang: Lang, id: string, en: string) => (lang === 'id' ? id : en);

/* ───────── Reusable option shape for the icon dropdown ───────── */
type SelectOption = {
    value: string;
    label: string;
    image?: string | null;
    count?: number;
};

/* Thumbnail: foto/ikon/avatar bila ada, kalau tidak fallback ikon di chip warna */
function OptionThumb({
    option,
    fallbackIcon,
    circular,
}: {
    option: SelectOption;
    fallbackIcon: React.ReactNode;
    circular?: boolean;
}) {
    const shape = circular ? 'rounded-full' : 'rounded-sm';
    if (option.image) {
        return (
            <ImageWithFallback
                src={option.image}
                alt={option.label}
                loading="lazy"
                className={cn(
                    'h-5 w-5 shrink-0 object-cover ring-1 ring-border',
                    shape,
                )}
            />
        );
    }
    return (
        <span
            className={cn(
                'grid h-5 w-5 shrink-0 place-items-center bg-cobalt/10 text-cobalt dark:text-cobalt-lt',
                shape,
            )}
        >
            {fallbackIcon}
        </span>
    );
}

/* ───────── Custom single-select dropdown with icon/avatar per option ─────────
 * Native <select> tidak bisa menampilkan gambar, jadi pakai dropdown sendiri.
 * Data ikon/logo/avatar sudah di-eager-load dari server (tanpa N+1). */
function IconSelect({
    value,
    onChange,
    options,
    placeholder,
    fallbackIcon,
    circular,
}: {
    value: string;
    onChange: (v: string) => void;
    options: SelectOption[];
    placeholder: string;
    fallbackIcon: React.ReactNode;
    circular?: boolean;
}) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open) return;
        const onDoc = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node))
                setOpen(false);
        };
        document.addEventListener('mousedown', onDoc);
        return () => document.removeEventListener('mousedown', onDoc);
    }, [open]);

    const selected = options.find((o) => o.value === value);

    return (
        <div ref={ref} className="relative">
            <button
                type="button"
                onClick={() => setOpen((s) => !s)}
                aria-haspopup="listbox"
                aria-expanded={open}
                className="hairline flex w-full items-center justify-between gap-2 rounded-lg border bg-paper px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-cobalt dark:bg-night-3"
            >
                <span className="flex min-w-0 items-center gap-2">
                    {selected ? (
                        <>
                            <OptionThumb
                                option={selected}
                                fallbackIcon={fallbackIcon}
                                circular={circular}
                            />
                            <span className="truncate">{selected.label}</span>
                        </>
                    ) : (
                        <span className="truncate text-muted-foreground">
                            {placeholder}
                        </span>
                    )}
                </span>
                <ChevronDown
                    className={cn(
                        'h-4 w-4 shrink-0 text-muted-foreground transition-transform',
                        open && 'rotate-180',
                    )}
                />
            </button>

            {open && (
                <div
                    role="listbox"
                    className="custom-scrollbar hairline absolute z-30 mt-2 max-h-64 w-full overflow-y-auto rounded-lg border bg-card p-1 shadow-lift dark:bg-night-2"
                >
                    <button
                        type="button"
                        onClick={() => {
                            onChange('');
                            setOpen(false);
                        }}
                        className={cn(
                            'flex w-full items-center rounded-md px-2.5 py-2 text-left text-sm transition-colors',
                            !value
                                ? 'bg-cobalt/10 text-cobalt dark:text-cobalt-lt'
                                : 'text-foreground/75 hover:bg-foreground/[.04]',
                        )}
                    >
                        {placeholder}
                    </button>
                    {options.map((o) => {
                        const on = o.value === value;
                        return (
                            <button
                                key={o.value}
                                type="button"
                                onClick={() => {
                                    onChange(o.value);
                                    setOpen(false);
                                }}
                                className={cn(
                                    'flex w-full items-center justify-between gap-2 rounded-md px-2.5 py-2 text-left text-sm transition-colors',
                                    on
                                        ? 'bg-cobalt/10 text-cobalt dark:text-cobalt-lt'
                                        : 'text-foreground/75 hover:bg-foreground/[.04]',
                                )}
                            >
                                <span className="flex min-w-0 items-center gap-2">
                                    <OptionThumb
                                        option={o}
                                        fallbackIcon={fallbackIcon}
                                        circular={circular}
                                    />
                                    <span className="truncate">{o.label}</span>
                                </span>
                                {typeof o.count === 'number' && (
                                    <span className="font-mono text-[10px] tabnum opacity-60">
                                        {o.count}
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

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
        key:
            | 'categories'
            | 'authors'
            | 'publishers'
            | 'languages'
            | 'types'
            | 'attachments',
        value: string,
    ) => void;
    onReset: () => void;
    onClose?: () => void;
}) {
    // Hanya tampilkan ketersediaan yang relevan untuk pemustaka: Tersedia /
    // Tidak Tersedia. Status Dipinjam/Hilang/Rusak adalah keadaan internal
    // koleksi dan tidak ditawarkan sebagai filter publik.
    const availabilityOptions = [
        { v: '', label: tr(language, 'Semua', 'All') },
        ...Object.entries(options.statusOptions)
            .filter(([key]) => key === 'Tersedia' || key === 'Tidak Tersedia')
            .map(([key, label]) => ({
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

            {/* Bahasa — checkbox, dengan bendera/ikon bahasa */}
            {options.languages.length > 0 && (
                <div className="mb-6">
                    {groupLabel(tr(language, 'Bahasa', 'Language'))}
                    <div className="custom-scrollbar max-h-56 space-y-1.5 overflow-y-auto pr-1">
                        {options.languages.map((l) => {
                            const on = filters.languages.includes(l.language);
                            return (
                                <label
                                    key={l.id}
                                    className="flex cursor-pointer items-center justify-between gap-2 text-sm text-foreground/80 hover:text-cobalt dark:hover:text-cobalt-lt"
                                >
                                    <span className="flex min-w-0 items-center gap-2.5">
                                        <input
                                            type="checkbox"
                                            checked={on}
                                            onChange={() =>
                                                toggleArray(
                                                    'languages',
                                                    l.language,
                                                )
                                            }
                                            className="accent-cobalt"
                                        />
                                        {l.photo ? (
                                            <ImageWithFallback
                                                src={l.photo}
                                                alt={l.language}
                                                loading="lazy"
                                                className="h-5 w-5 shrink-0 rounded-sm object-cover ring-1 ring-border"
                                            />
                                        ) : (
                                            <span className="grid h-5 w-5 shrink-0 place-items-center rounded-sm bg-cobalt/10 text-cobalt dark:text-cobalt-lt">
                                                <Languages className="h-3 w-3" />
                                            </span>
                                        )}
                                        <span className="truncate">
                                            {l.language}
                                        </span>
                                    </span>
                                    {typeof l.count_of_books === 'number' && (
                                        <span className="font-mono text-[10px] tabnum opacity-60">
                                            {l.count_of_books}
                                        </span>
                                    )}
                                </label>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Kategori — dropdown dengan ikon kategori */}
            {options.categories.length > 0 && (
                <div className="mb-6">
                    {groupLabel(tr(language, 'Kategori', 'Category'))}
                    <IconSelect
                        value={filters.categories[0] ?? ''}
                        onChange={(v) =>
                            setFilter('categories', v ? [v] : [])
                        }
                        placeholder={tr(
                            language,
                            'Semua kategori',
                            'All categories',
                        )}
                        fallbackIcon={<Tag className="h-3 w-3" />}
                        options={options.categories.map((c) => ({
                            value: c.name,
                            label: c.name,
                            image: c.icon,
                            count: c.count_of_books,
                        }))}
                    />
                </div>
            )}

            {/* Penerbit — dropdown dengan logo penerbit */}
            {options.publishers.length > 0 && (
                <div className="mb-6">
                    {groupLabel(tr(language, 'Penerbit', 'Publisher'))}
                    <IconSelect
                        value={filters.publishers[0] ?? ''}
                        onChange={(v) =>
                            setFilter('publishers', v ? [v] : [])
                        }
                        placeholder={tr(
                            language,
                            'Semua penerbit',
                            'All publishers',
                        )}
                        fallbackIcon={<Building2 className="h-3 w-3" />}
                        options={options.publishers.map((p) => ({
                            value: p.name,
                            label: p.name,
                            image: p.logo,
                            count: p.count_of_books,
                        }))}
                    />
                </div>
            )}

            {/* Penulis — dropdown dengan avatar penulis */}
            {options.authors.length > 0 && (
                <div>
                    {groupLabel(tr(language, 'Penulis', 'Author'))}
                    <IconSelect
                        value={filters.authors[0] ?? ''}
                        onChange={(v) => setFilter('authors', v ? [v] : [])}
                        placeholder={tr(
                            language,
                            'Semua penulis',
                            'All authors',
                        )}
                        fallbackIcon={<User className="h-3 w-3" />}
                        circular
                        options={options.authors.map((a) => ({
                            value: a.name,
                            label: a.name,
                            image: a.avatar,
                            count: a.count_of_books,
                        }))}
                    />
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
