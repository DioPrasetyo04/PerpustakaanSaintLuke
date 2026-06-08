import { useEffect, useMemo, useRef, useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { motion } from 'framer-motion';
import {
    Search,
    SlidersHorizontal,
    LayoutGrid,
    List as ListIcon,
    Book,
    X,
    ChevronUp,
    ChevronDown,
} from 'lucide-react';
import BookCard from '@/components/component/Card/BookCard';
import Pagination from '@/components/component/Home/Pagination/Pagination';
import {
    CatalogHeader,
    CatalogEmpty,
} from '@/components/component/Catalog/CatalogShell';
import {
    FilterSidebar,
    FilterChip,
} from '@/components/component/Catalog/CatalogFilters';
import { catalogBooks } from '@/data/data';
import { useDebounce } from '@/hooks/useDebounce';
import { useLanguage } from '@/hooks/useLanguage';
import { cn } from '@/lib/utils';
import type {
    CatalogFilters,
    FeaturedCatalogBooksProps,
} from '@/types/CatalogPage/CatalogBooksPageProps';

type ArrayKey = 'categories' | 'authors' | 'publishers' | 'types' | 'attachments';

const sortMap: Record<string, { field: string; direction: string }> = {
    relevance: { field: '', direction: '' },
    newest: { field: 'publication_year', direction: 'desc' },
    rating: { field: 'avg_rating', direction: 'desc' },
    title: { field: 'title', direction: 'asc' },
};

const deriveSort = (field: string) => {
    if (field === 'publication_year') return 'newest';
    if (field === 'avg_rating') return 'rating';
    if (field === 'title') return 'title';
    return 'relevance';
};

const BooksPage = () => {
    const { books, state, filters, options } =
        usePage<FeaturedCatalogBooksProps>().props;
    const { language } = useLanguage();
    const text = language === 'id' ? catalogBooks.id : catalogBooks.en;
    const tr = (id: string, en: string) => (language === 'id' ? id : en);

    const [search, setSearch] = useState(filters.search || '');
    const debounceSearch = useDebounce(search, 400);

    const [local, setLocal] = useState<CatalogFilters>({
        ...filters,
        yearMin: filters.yearMin ?? null,
        yearMax: filters.yearMax ?? null,
    });
    const [sort, setSort] = useState(deriveSort(filters.field));
    // Arah urut khusus judul: panah atas = A→Z (asc), panah bawah = Z→A (desc).
    const [titleDir, setTitleDir] = useState<'asc' | 'desc'>(
        filters.field === 'title' && filters.direction === 'desc'
            ? 'desc'
            : 'asc',
    );
    const [view, setView] = useState<'grid' | 'list'>('grid');

    // Klik panah → aktifkan sort judul dengan arah terpilih.
    const setTitleSort = (dir: 'asc' | 'desc') => {
        setTitleDir(dir);
        setSort('title');
    };
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    const setFilter = <K extends keyof CatalogFilters>(
        key: K,
        value: CatalogFilters[K],
    ) => setLocal((prev) => ({ ...prev, [key]: value }));

    const toggleArray = (key: ArrayKey, value: string) =>
        setLocal((prev) => {
            const current = prev[key];
            return {
                ...prev,
                [key]: current.includes(value)
                    ? current.filter((v) => v !== value)
                    : [...current, value],
            };
        });

    const resetFilters = () => {
        setSearch('');
        setSort('relevance');
        setLocal({
            search: '',
            categories: [],
            authors: [],
            publishers: [],
            types: [],
            attachments: [],
            availability: '',
            yearMin: null,
            yearMax: null,
            field: '',
            direction: '',
        });
    };

    const buildParams = (page: number, perPage: number) => {
        const { field, direction } = sortMap[sort];
        // Untuk judul, arah ditentukan tombol panah (titleDir).
        const dir = sort === 'title' ? titleDir : direction;
        const params: Record<string, unknown> = {
            search: debounceSearch || undefined,
            categories: local.categories,
            authors: local.authors,
            publishers: local.publishers,
            types: local.types,
            attachments: local.attachments,
            availability: local.availability || undefined,
            field: field || undefined,
            direction: dir || undefined,
            books_page: page,
            books_load: perPage,
        };
        if (local.yearMin != null && local.yearMin !== options.yearBounds.min)
            params.yearMin = local.yearMin;
        if (local.yearMax != null && local.yearMax !== options.yearBounds.max)
            params.yearMax = local.yearMax;
        return params;
    };

    // Sync filters → server (skip first mount; data already rendered)
    const firstRender = useRef(true);
    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }
        router.get(route('catalog.books'), buildParams(1, books.meta.per_page), {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounceSearch, local, sort, titleDir]);

    const onPageChange = (page: number) =>
        router.get(
            route('catalog.books'),
            buildParams(page, books.meta.per_page),
            { preserveState: true, preserveScroll: true, replace: true },
        );

    const onPerPageChange = (perPage: number) =>
        router.get(route('catalog.books'), buildParams(1, perPage), {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });

    const start = (books.meta.current_page - 1) * books.meta.per_page + 1;
    const end = Math.min(
        books.meta.current_page * books.meta.per_page,
        books.meta.total,
    );

    const yearActive =
        (local.yearMin != null && local.yearMin !== options.yearBounds.min) ||
        (local.yearMax != null && local.yearMax !== options.yearBounds.max);

    const hasActiveChips =
        !!debounceSearch ||
        local.categories.length > 0 ||
        local.authors.length > 0 ||
        local.publishers.length > 0 ||
        local.types.length > 0 ||
        local.attachments.length > 0 ||
        !!local.availability ||
        yearActive;

    const availabilityLabel = useMemo(() => {
        if (!local.availability) return '';
        if (local.availability === 'available')
            return tr('Tersedia', 'Available');
        return options.statusOptions[local.availability] ?? local.availability;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [local.availability, options.statusOptions, language]);

    return (
        <div className="min-h-screen bg-background py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <CatalogHeader
                    eyebrow={language === 'id' ? 'Katalog' : 'Catalog'}
                    title={text.title}
                    count={books.meta.total}
                    subtitle={text.subtitle}
                />

                {/* Search + toolbar */}
                <div className="hairline mb-6 flex flex-col gap-3 rounded-xl2 border bg-card p-3 shadow-soft dark:bg-night-2 sm:flex-row sm:items-center">
                    <div className="flex flex-1 items-center gap-3 rounded-full bg-paper px-4 transition-colors focus-within:ring-2 focus-within:ring-cobalt/40 dark:bg-night-3">
                        <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
                        <input
                            type="search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder={text.placeholder}
                            className="flex-1 bg-transparent py-3 text-base text-foreground outline-none placeholder:text-muted-foreground"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            className="hairline rounded-full border bg-paper px-4 py-2.5 text-sm text-foreground outline-none focus:border-cobalt dark:bg-night-3"
                        >
                            <option value="relevance">
                                {tr('Relevansi', 'Relevance')}
                            </option>
                            <option value="newest">
                                {tr('Terbaru', 'Newest')}
                            </option>
                            <option value="rating">
                                {tr('Penilaian', 'Rating')}
                            </option>
                            <option value="title">{tr('Judul', 'Title')}</option>
                        </select>
                        {/* Sort judul: panah atas = A→Z, panah bawah = Z→A */}
                        <div
                            role="group"
                            aria-label={tr('Urutkan judul', 'Sort by title')}
                            className="hairline inline-flex overflow-hidden rounded-full border"
                        >
                            <button
                                type="button"
                                onClick={() => setTitleSort('asc')}
                                aria-label={tr('Judul A–Z', 'Title A–Z')}
                                aria-pressed={
                                    sort === 'title' && titleDir === 'asc'
                                }
                                title={tr('Judul A–Z', 'Title A–Z')}
                                className={cn(
                                    'grid h-10 w-10 place-items-center transition-colors',
                                    sort === 'title' && titleDir === 'asc'
                                        ? 'bg-cobalt text-white'
                                        : 'text-muted-foreground hover:text-cobalt',
                                )}
                            >
                                <ChevronUp className="h-4 w-4" />
                            </button>
                            <button
                                type="button"
                                onClick={() => setTitleSort('desc')}
                                aria-label={tr('Judul Z–A', 'Title Z–A')}
                                aria-pressed={
                                    sort === 'title' && titleDir === 'desc'
                                }
                                title={tr('Judul Z–A', 'Title Z–A')}
                                className={cn(
                                    'grid h-10 w-10 place-items-center transition-colors',
                                    sort === 'title' && titleDir === 'desc'
                                        ? 'bg-cobalt text-white'
                                        : 'text-muted-foreground hover:text-cobalt',
                                )}
                            >
                                <ChevronDown className="h-4 w-4" />
                            </button>
                        </div>
                        <div className="hairline inline-flex overflow-hidden rounded-full border">
                            <button
                                type="button"
                                onClick={() => setView('grid')}
                                aria-label="Grid"
                                className={cn(
                                    'grid h-10 w-10 place-items-center transition-colors',
                                    view === 'grid'
                                        ? 'bg-cobalt text-white'
                                        : 'text-muted-foreground hover:text-cobalt',
                                )}
                            >
                                <LayoutGrid className="h-4 w-4" />
                            </button>
                            <button
                                type="button"
                                onClick={() => setView('list')}
                                aria-label="List"
                                className={cn(
                                    'grid h-10 w-10 place-items-center transition-colors',
                                    view === 'list'
                                        ? 'bg-cobalt text-white'
                                        : 'text-muted-foreground hover:text-cobalt',
                                )}
                            >
                                <ListIcon className="h-4 w-4" />
                            </button>
                        </div>
                        <button
                            type="button"
                            onClick={() => setShowMobileFilters((s) => !s)}
                            className="hairline inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm text-foreground hover:border-cobalt/40 lg:hidden"
                        >
                            <SlidersHorizontal className="h-4 w-4" />
                            {tr('Filter', 'Filters')}
                        </button>
                    </div>
                </div>

                {/* Quick category chips */}
                {options.categories.length > 0 && (
                    <div className="mb-5 -mx-1 flex items-center gap-2 overflow-x-auto px-1 pb-2">
                        <button
                            type="button"
                            onClick={() => setFilter('categories', [])}
                            className={cn(
                                'shrink-0 rounded-full border px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors',
                                local.categories.length === 0
                                    ? 'border-cobalt bg-cobalt text-white'
                                    : 'hairline text-foreground hover:border-cobalt/40',
                            )}
                        >
                            {tr('Semua', 'All')}
                        </button>
                        {options.categories.map((c) => (
                            <button
                                key={c.id}
                                type="button"
                                onClick={() => toggleArray('categories', c.name)}
                                className={cn(
                                    'inline-flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors',
                                    local.categories.includes(c.name)
                                        ? 'border-cobalt bg-cobalt text-white'
                                        : 'hairline text-foreground hover:border-cobalt/40',
                                )}
                            >
                                {c.icon &&
                                    (/^(https?:|\/)/.test(c.icon) ? (
                                        <img
                                            src={c.icon}
                                            alt=""
                                            className="h-4 w-4 shrink-0 rounded-sm object-cover"
                                        />
                                    ) : (
                                        <span>{c.icon}</span>
                                    ))}
                                {c.name}
                            </button>
                        ))}
                    </div>
                )}

                {/* Active filter chips */}
                {hasActiveChips && (
                    <div className="mb-6 flex flex-wrap items-center gap-2">
                        <span className="tracking-editorial font-mono text-[10px] uppercase text-muted-foreground">
                            {tr('Filter aktif', 'Active filters')}:
                        </span>
                        {debounceSearch && (
                            <FilterChip
                                label={`"${debounceSearch}"`}
                                onRemove={() => setSearch('')}
                            />
                        )}
                        {local.categories.map((c) => (
                            <FilterChip
                                key={`c-${c}`}
                                label={c}
                                onRemove={() => toggleArray('categories', c)}
                            />
                        ))}
                        {local.authors.map((a) => (
                            <FilterChip
                                key={`a-${a}`}
                                label={a}
                                onRemove={() => toggleArray('authors', a)}
                            />
                        ))}
                        {local.publishers.map((p) => (
                            <FilterChip
                                key={`p-${p}`}
                                label={p}
                                onRemove={() => toggleArray('publishers', p)}
                            />
                        ))}
                        {local.types.map((t) => (
                            <FilterChip
                                key={`t-${t}`}
                                label={t}
                                onRemove={() => toggleArray('types', t)}
                            />
                        ))}
                        {local.attachments.map((at) => (
                            <FilterChip
                                key={`at-${at}`}
                                label={at}
                                onRemove={() => toggleArray('attachments', at)}
                            />
                        ))}
                        {local.availability && (
                            <FilterChip
                                label={availabilityLabel}
                                onRemove={() => setFilter('availability', '')}
                            />
                        )}
                        {yearActive && (
                            <FilterChip
                                label={`${local.yearMin ?? options.yearBounds.min}–${local.yearMax ?? options.yearBounds.max}`}
                                onRemove={() => {
                                    setFilter('yearMin', null);
                                    setFilter('yearMax', null);
                                }}
                            />
                        )}
                        <button
                            type="button"
                            onClick={resetFilters}
                            className="ml-1 text-xs font-semibold text-cobalt hover:underline dark:text-cobalt-lt"
                        >
                            {tr('Bersihkan', 'Clear')}
                        </button>
                    </div>
                )}

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                    {/* Sidebar (desktop) */}
                    <aside className="col-span-full hidden lg:col-span-3 lg:block">
                        <FilterSidebar
                            language={language}
                            filters={local}
                            options={options}
                            setFilter={setFilter}
                            toggleArray={toggleArray}
                            onReset={resetFilters}
                        />
                    </aside>

                    {/* Mobile sidebar */}
                    {showMobileFilters && (
                        <div className="col-span-full lg:hidden">
                            <FilterSidebar
                                language={language}
                                filters={local}
                                options={options}
                                setFilter={setFilter}
                                toggleArray={toggleArray}
                                onReset={resetFilters}
                                onClose={() => setShowMobileFilters(false)}
                            />
                        </div>
                    )}

                    {/* Main */}
                    <div className="col-span-full lg:col-span-9">
                        {books.data.length > 0 ? (
                            <>
                                <div className="tracking-editorial mb-5 font-mono text-[10px] uppercase text-muted-foreground">
                                    {tr(
                                        `Menampilkan ${start}–${end} dari ${books.meta.total} judul`,
                                        `Showing ${start}–${end} of ${books.meta.total} titles`,
                                    )}
                                </div>

                                {view === 'grid' ? (
                                    <motion.div
                                        layout
                                        className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 xl:grid-cols-4"
                                    >
                                        {books.data.map((book) => (
                                            <BookCard key={book.id} {...book} />
                                        ))}
                                    </motion.div>
                                ) : (
                                    <div className="hairline divide-y rounded-xl2 border bg-card dark:bg-night-2">
                                        {books.data.map((book) => (
                                            <a
                                                key={book.id}
                                                href={`/book/detail/${book.slug}`}
                                                className="group flex gap-4 p-4 transition-colors hover:bg-paper-2/40 dark:hover:bg-night-3/40"
                                            >
                                                <img
                                                    src={book.cover}
                                                    alt={book.title}
                                                    loading="lazy"
                                                    className="aspect-[3/4] w-16 shrink-0 rounded-md object-cover"
                                                />
                                                <div className="min-w-0 flex-1">
                                                    <div className="font-display text-lg leading-snug font-semibold text-foreground group-hover:text-cobalt dark:group-hover:text-cobalt-lt">
                                                        {book.title}
                                                    </div>
                                                    <div className="mt-0.5 line-clamp-1 text-sm text-muted-foreground">
                                                        {book.authors?.[0]?.name}
                                                        {book.publisher?.name
                                                            ? ` · ${book.publisher.name}`
                                                            : ''}
                                                        {book.publication_year
                                                            ? ` · ${book.publication_year}`
                                                            : ''}
                                                    </div>
                                                    {book.synopsis && (
                                                        <p className="mt-2 line-clamp-2 max-w-3xl text-sm text-foreground/70">
                                                            {book.synopsis}
                                                        </p>
                                                    )}
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                )}

                                {books.meta.total > books.meta.per_page && (
                                    <Pagination
                                        page={books.meta.current_page}
                                        total={books.meta.total}
                                        perPage={books.meta.per_page}
                                        onPageChange={onPageChange}
                                        onPerPageChange={onPerPageChange}
                                    />
                                )}
                            </>
                        ) : (
                            <CatalogEmpty
                                icon={hasActiveChips ? X : Book}
                                title={tr(
                                    'Buku Tidak Ditemukan',
                                    'Books Not Found',
                                )}
                                desc={tr(
                                    'Coba ubah filter atau gunakan kata kunci lain.',
                                    'Try adjusting filters or using different keywords.',
                                )}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BooksPage;
