import React, { useEffect, useRef, useState } from 'react';
import { router } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { useLanguage } from '@/hooks/useLanguage';
import { slidesHero } from '@/data/data';
import { Search, ArrowRight, Loader2, ChevronUp } from 'lucide-react';
import Carousel from '@/components/common/Carousel';
import BookCard from '@/components/component/Card/BookCard';
import type { BookProps } from '@/types/DataTypes/BooksProps';

const content = {
    id: {
        eyebrow: 'Perpustakaan Digital · Yayasan Santo Lukas',
        h1a: 'Ruang baca digital',
        h1b: 'yang ',
        h1em: 'terlengkap',
        h1c: ' &',
        h1d: 'terpercaya.',
        lead1: 'Jelajahi ',
        leadStrong: '12.480+ koleksi',
        lead2: ' — sastra, sains, sejarah, hingga jurnal akademik. Cari, pinjam, dan kelola bacaanmu dalam satu portal untuk siswa Santo Lukas.',
        placeholder: 'Cari judul, penulis, ISBN, atau topik…',
        search: 'Cari',
        trending: 'Trending',
        librarianPick: 'Pilihan Pustakawan',
        available: 'Tersedia kini',
        availableSub: 'Koleksi siap dipinjam',
        showcase: 'Koleksi Unggulan',
        swipeUp: 'Geser ke atas',
        stats: [
            { v: '12.480+', l: 'Koleksi buku' },
            { v: '1.856', l: 'Anggota aktif' },
            { v: '58 thn', l: 'Melayani' },
        ],
    },
    en: {
        eyebrow: 'Digital Library · Saint Luke Foundation',
        h1a: 'A digital reading space',
        h1b: "that's ",
        h1em: 'complete',
        h1c: ' &',
        h1d: 'trusted.',
        lead1: 'Explore ',
        leadStrong: '12,480+ collections',
        lead2: ' — literature, science, history, and academic journals. Search, borrow, and manage your reading in one portal for Saint Luke students.',
        placeholder: 'Search title, author, ISBN, or topic…',
        search: 'Search',
        trending: 'Trending',
        librarianPick: "Librarian's Pick",
        available: 'Available now',
        availableSub: 'Ready to borrow',
        showcase: 'Featured Collection',
        swipeUp: 'Swipe up',
        stats: [
            { v: '12,480+', l: 'Book collections' },
            { v: '1,856', l: 'Active members' },
            { v: '58 yrs', l: 'Of service' },
        ],
    },
};

const trendingTerms = [
    'Pramoedya',
    'Filosofi Teras',
    'Atomic Habits',
    'Sapiens',
    'Laskar Pelangi',
];

type HeroSectionProps = {
    books?: BookProps[];
};

const HeroSection = ({ books = [] }: HeroSectionProps) => {
    const { language } = useLanguage();
    const t = language === 'id' ? content.id : content.en;
    const [searchInput, setSearchInput] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const secRef = useRef<HTMLElement>(null);

    const showcaseBooks = books.slice(0, 8);

    // Background slideshow (hero1 → hero2 → hero3)
    const [bgIndex, setBgIndex] = useState(0);
    useEffect(() => {
        if (slidesHero.length <= 1) return;
        const id = setInterval(() => {
            setBgIndex((i) => (i + 1) % slidesHero.length);
        }, 6000);
        return () => clearInterval(id);
    }, []);

    const scrollToNext = () => {
        secRef.current?.nextElementSibling?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    };

    const goSearch = (keyword: string) => {
        const kw = keyword.trim();
        // Pencarian hero mengarah ke Katalog Buku (data buku), bukan halaman Sumber.
        router.get(route('catalog.books'), kw ? { search: kw } : {}, {
            preserveScroll: false,
            onStart: () => setSubmitting(true),
            onFinish: () => setSubmitting(false),
        });
    };

    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        goSearch(searchInput);
    };

    const onMove = (e: React.MouseEvent<HTMLElement>) => {
        const el = secRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty(
            '--mx',
            `${((e.clientX - r.left) / r.width) * 100}%`,
        );
        el.style.setProperty(
            '--my',
            `${((e.clientY - r.top) / r.height) * 100}%`,
        );
    };

    return (
        <header
            id="home"
            ref={secRef}
            onMouseMove={onMove}
            className="relative overflow-hidden"
        >
            {/* Background slideshow (hero1 → hero2 → hero3) */}
            <div className="pointer-events-none absolute inset-0">
                {slidesHero.map((src, i) => (
                    <img
                        key={src}
                        src={src}
                        alt=""
                        aria-hidden
                        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-in-out ${
                            i === bgIndex
                                ? 'opacity-100 dark:opacity-90'
                                : 'opacity-0'
                        }`}
                    />
                ))}
                {/* directional scrims — protect the text on the left, let the image stay vivid on the right */}
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/75 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/10 to-background/30" />
            </div>

            <div className="cursor-glow pointer-events-none absolute inset-0" />
            <div className="hero-mesh pointer-events-none absolute inset-0" />
            <div
                className="dot-grid pointer-events-none absolute inset-0 opacity-50"
                style={{
                    maskImage:
                        'linear-gradient(to bottom, black, transparent 70%)',
                }}
            />

            <div className="relative mx-auto max-w-7xl px-6 pt-14 pb-16 lg:px-10 lg:pt-20 lg:pb-24">
                <div className="grid grid-cols-12 items-center gap-8 lg:gap-6">
                    {/* LEFT */}
                    <div className="col-span-12 lg:col-span-7">
                        <div className="tracking-editorial inline-flex items-center gap-2 font-mono text-[11px] uppercase text-cobalt dark:text-cobalt-lt">
                            <span className="h-1.5 w-1.5 rounded-full bg-cobalt dark:bg-cobalt-lt" />
                            {t.eyebrow}
                        </div>

                        <h1
                            className="mt-6 font-display text-[44px] leading-[0.98] font-medium text-foreground sm:text-[60px] lg:text-[72px] xl:text-[80px]"
                            style={{ textWrap: 'balance' }}
                        >
                            <span className="block">{t.h1a}</span>
                            <span className="block">
                                {t.h1b}
                                <em className="text-cobalt not-italic dark:text-cobalt-lt">
                                    {t.h1em}
                                </em>
                                {t.h1c}
                            </span>
                            <span className="relative block">
                                <span
                                    className="hero-stroke absolute -top-1 left-0 hidden select-none lg:block"
                                    aria-hidden="true"
                                >
                                    {t.h1d}
                                </span>
                                <span className="relative">{t.h1d}</span>
                            </span>
                        </h1>

                        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                            {t.lead1}
                            <span className="font-semibold text-foreground">
                                {t.leadStrong}
                            </span>
                            {t.lead2}
                        </p>

                        {/* Search */}
                        <form
                            onSubmit={handleSearchSubmit}
                            role="search"
                            className="hairline mt-8 flex max-w-2xl items-center gap-2 rounded-full border bg-card p-2 shadow-lift transition-colors focus-within:border-cobalt/50 dark:bg-night-2"
                        >
                            <Search className="ml-4 h-5 w-5 shrink-0 text-muted-foreground" />
                            <input
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                placeholder={t.placeholder}
                                aria-label={t.placeholder}
                                className="min-w-0 flex-1 bg-transparent py-2 text-base text-foreground outline-none placeholder:text-muted-foreground"
                            />
                            <button
                                type="submit"
                                disabled={submitting}
                                className="btn-press inline-flex shrink-0 items-center gap-2 rounded-full bg-cobalt px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-cobalt-dk disabled:opacity-70"
                            >
                                {submitting ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <>
                                        <span className="hidden sm:inline">
                                            {t.search}
                                        </span>
                                        <ArrowRight className="h-4 w-4" />
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Trending chips */}
                        <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-muted-foreground">
                            <span className="tracking-editorial font-mono uppercase">
                                {t.trending}:
                            </span>
                            {trendingTerms.map((term) => (
                                <button
                                    key={term}
                                    type="button"
                                    onClick={() => goSearch(term)}
                                    className="hairline rounded-full border px-3 py-1 transition-colors hover:border-cobalt/40 hover:text-cobalt dark:hover:text-cobalt-lt"
                                >
                                    {term}
                                </button>
                            ))}
                        </div>

                        {/* Inline stats */}
                        <div className="mt-8 flex items-center gap-8">
                            {t.stats.map((s, i) => (
                                <div key={i} className="flex items-center gap-8">
                                    {i > 0 && (
                                        <span className="h-10 w-px bg-line dark:bg-night-line" />
                                    )}
                                    <div>
                                        <div className="font-display text-2xl tabnum text-foreground">
                                            {s.v}
                                        </div>
                                        <div className="text-xs text-muted-foreground">
                                            {s.l}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT — auto-sliding book showcase */}
                    <div className="relative col-span-12 lg:col-span-5">
                        {showcaseBooks.length > 0 && (
                            <div className="relative">
                                <div className="pointer-events-none absolute -inset-6 -z-10 rounded-full bg-cobalt/10 blur-3xl" />

                                <div className="tracking-editorial mb-3 flex items-center gap-2 font-mono text-[11px] uppercase text-cobalt dark:text-cobalt-lt">
                                    <span className="h-1.5 w-1.5 rounded-full bg-cobalt dark:bg-cobalt-lt" />
                                    {t.showcase}
                                </div>

                                <Carousel<BookProps>
                                    items={showcaseBooks}
                                    getKey={(book) => book.id}
                                    ariaLabel={t.showcase}
                                    autoplay={3000}
                                    loop
                                    spaceBetween={16}
                                    renderItem={(book) => <BookCard {...book} />}
                                    breakpoints={{
                                        0: { slidesPerView: 1.3 },
                                        480: { slidesPerView: 2.2 },
                                        768: { slidesPerView: 3 },
                                        1024: { slidesPerView: 1.5 },
                                        1280: { slidesPerView: 1.7 },
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Swipe-up navigator */}
                <button
                    type="button"
                    onClick={scrollToNext}
                    aria-label={t.swipeUp}
                    className="group absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-1.5 text-muted-foreground transition-colors hover:text-cobalt dark:hover:text-cobalt-lt"
                >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card/70 shadow-soft backdrop-blur-sm transition-transform group-hover:-translate-y-0.5">
                        <ChevronUp className="h-4 w-4 animate-bounce" />
                    </span>
                    <span className="tracking-editorial font-mono text-[10px] uppercase">
                        {t.swipeUp}
                    </span>
                </button>
            </div>
        </header>
    );
};

export default HeroSection;
