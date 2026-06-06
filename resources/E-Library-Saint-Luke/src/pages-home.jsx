// pages-home.jsx — Beranda (Nordic Library v2 — digital product platform)
const { useState: hUseState, useEffect: hUseEffect, useRef: hUseRef } = React;

function HomePage() {
    const latest = BOOKS.filter((b) => b.new || b.year >= 2018).slice(0, 10);
    const popular = [...BOOKS]
        .sort((a, b) => b.popularity - a.popularity)
        .slice(0, 5);
    const trending = [...BOOKS]
        .sort((a, b) => b.popularity - a.popularity)
        .slice(0, 10);
    const featured = BOOKS.find((b) => b.id === 'b001');
    const featured2 = BOOKS.find((b) => b.id === 'b006');
    const featured3 = BOOKS.find((b) => b.id === 'b029');
    const news = NEWS.slice(0, 3);

    return (
        <div>
            <Hero
                featured={featured}
                featured2={featured2}
                featured3={featured3}
            />
            <LiveTicker />
            <TrustBar />
            <SpotlightBanner />
            <CategoriesSection />
            <ForYou />
            <NewArrivals books={latest} />
            <CuratorShelf />
            <HowToBorrow />
            <TrendingSection books={trending} />
            <StatsSection />
            <WhyUs />
            <Testimonials />
            <EventsSection />
            <PublishersMarquee />
            <NewsSection news={news} />
            <FaqSection />
            <CtaJoin />
        </div>
    );
}

/* ─────────── HERO ─────────── */
function Hero({ featured, featured2, featured3 }) {
    const secRef = hUseRef(null);
    const onMove = (e) => {
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
        <section
            ref={secRef}
            onMouseMove={onMove}
            className="relative overflow-hidden"
        >
            <div className="cursor-glow pointer-events-none absolute inset-0" />
            <div className="hero-mesh pointer-events-none absolute inset-0" />
            <div
                className="dot-grid pointer-events-none absolute inset-0 opacity-[.5]"
                style={{
                    maskImage:
                        'linear-gradient(to bottom, black, transparent 70%)',
                }}
            />
            <div className="relative mx-auto max-w-7xl px-6 pt-14 pb-16 lg:px-10 lg:pt-20 lg:pb-24">
                <div className="grid grid-cols-12 items-center gap-8 lg:gap-6">
                    {/* LEFT */}
                    <div className="col-span-12 lg:col-span-7">
                        <Reveal>
                            <Eyebrow>
                                Perpustakaan Digital · Yayasan Santo Lukas
                            </Eyebrow>
                        </Reveal>
                        <Reveal delay={80}>
                            <h1
                                className="mt-6 font-serif text-[44px] leading-[.98] font-medium text-ink sm:text-[60px] lg:text-[72px] xl:text-[80px] dark:text-paper"
                                style={{ textWrap: 'balance' }}
                            >
                                <span className="block">
                                    Ruang baca digital
                                </span>
                                <span className="block">
                                    yang{' '}
                                    <em className="text-cobalt dark:text-cobalt-lt">
                                        terlengkap
                                    </em>{' '}
                                    &amp;
                                </span>
                                <span className="relative block">
                                    <span
                                        className="hero-stroke pointer-events-none absolute -top-1 left-0 hidden select-none lg:block"
                                        aria-hidden="true"
                                    >
                                        terpercaya.
                                    </span>
                                    <span className="relative">
                                        terpercaya.
                                    </span>
                                </span>
                            </h1>
                        </Reveal>
                        <Reveal delay={160}>
                            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted dark:text-paper/65">
                                Jelajahi{' '}
                                <span className="font-semibold text-ink dark:text-paper">
                                    12.480+ koleksi
                                </span>{' '}
                                — sastra, sains, sejarah, hingga jurnal
                                akademik. Cari, pinjam, dan kelola bacaanmu
                                dalam satu portal yang dirancang untuk siswa
                                Santo Lukas.
                            </p>
                        </Reveal>

                        <Reveal delay={240}>
                            <div className="mt-8 max-w-2xl">
                                <HeroSearch />
                            </div>
                        </Reveal>

                        <Reveal delay={300}>
                            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted dark:text-paper/55">
                                <span className="font-mono tracking-editorial uppercase">
                                    Trending:
                                </span>
                                {[
                                    'Pramoedya',
                                    'Filosofi Teras',
                                    'Atomic Habits',
                                    'Sapiens',
                                    'Laskar Pelangi',
                                ].map((t) => (
                                    <a
                                        key={t}
                                        href={`#/cari?q=${encodeURIComponent(t)}`}
                                        className="hairline rounded-full border px-3 py-1 transition-colors hover:border-cobalt/40 hover:text-cobalt dark:hover:text-cobalt-lt"
                                    >
                                        {t}
                                    </a>
                                ))}
                            </div>
                        </Reveal>

                        <Reveal delay={360}>
                            <div className="mt-8 flex items-center gap-8">
                                {[
                                    { v: '12.480+', l: 'Koleksi buku' },
                                    { v: '1.856', l: 'Anggota aktif' },
                                    { v: '58 thn', l: 'Melayani' },
                                ].map((s, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-8"
                                    >
                                        {i > 0 && (
                                            <span className="h-10 w-px bg-line dark:bg-night-line" />
                                        )}
                                        <div>
                                            <div className="tabnum font-serif text-2xl text-ink dark:text-paper">
                                                {s.v}
                                            </div>
                                            <div className="text-xs text-muted dark:text-paper/50">
                                                {s.l}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Reveal>
                    </div>

                    {/* RIGHT — floating book showcase with mouse parallax */}
                    <div className="relative col-span-12 lg:col-span-5">
                        <HeroShowcase
                            featured={featured}
                            featured2={featured2}
                            featured3={featured3}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

function HeroShowcase({ featured, featured2, featured3 }) {
    const ref = hUseRef(null);
    const [p, setP] = hUseState({ x: 0, y: 0 });
    const onMove = (e) => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        setP({
            x: (e.clientX - r.left - r.width / 2) / r.width,
            y: (e.clientY - r.top - r.height / 2) / r.height,
        });
    };
    const onLeave = () => setP({ x: 0, y: 0 });
    const tf = (mx, my, extra = {}) => ({
        transform: `translate3d(${p.x * mx}px, ${p.y * my}px, 0)`,
        transition: 'transform .25s ease-out',
        ...extra,
    });
    return (
        <div
            ref={ref}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            className="relative flex h-[420px] items-center justify-center lg:h-[520px]"
        >
            <div className="absolute h-72 w-72 rounded-full bg-cobalt/10 blur-3xl" />
            <div className="relative">
                <div className="floaty relative z-20" style={tf(24, 18)}>
                    <BookCover
                        book={featured}
                        size="xl"
                        className="shadow-book-3d"
                        noHover
                    />
                </div>
                <div
                    className="floaty-2 absolute top-16 -left-24 z-10 hidden opacity-95 sm:block"
                    style={tf(44, 32)}
                >
                    <BookCover book={featured2} size="lg" noHover />
                </div>
                <div
                    className="floaty absolute -right-20 bottom-8 z-30 hidden sm:block"
                    style={tf(-36, 26, { animationDelay: '-3s' })}
                >
                    <BookCover book={featured3} size="md" noHover />
                </div>
                <div
                    className="hairline floaty-2 absolute top-4 -right-6 z-40 rounded-2xl border bg-card px-4 py-3 shadow-lift dark:bg-night-3"
                    style={tf(-18, -14)}
                >
                    <div className="flex items-center gap-1.5">
                        <Icon
                            name="star-fill"
                            size={14}
                            className="text-brass-lt"
                        />
                        <span className="font-serif text-lg text-ink dark:text-paper">
                            4.8
                        </span>
                    </div>
                    <div className="mt-0.5 text-[10px] tracking-editorial text-muted uppercase dark:text-paper/50">
                        Pilihan Pustakawan
                    </div>
                </div>
                <div
                    className="hairline floaty absolute bottom-2 -left-10 z-40 hidden rounded-2xl border bg-card px-4 py-3 shadow-lift sm:block dark:bg-night-3"
                    style={tf(20, -16)}
                >
                    <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        <span className="text-sm font-semibold text-ink dark:text-paper">
                            Tersedia kini
                        </span>
                    </div>
                    <div className="mt-0.5 text-[10px] text-muted dark:text-paper/50">
                        2 dari 4 eksemplar
                    </div>
                </div>
            </div>
        </div>
    );
}

function HeroSearch() {
    const [q, setQ] = hUseState('');
    const submit = (e) => {
        e.preventDefault();
        if (q.trim()) goTo(`cari?q=${encodeURIComponent(q.trim())}`);
    };
    return (
        <form
            onSubmit={submit}
            className="hairline flex items-center gap-2 rounded-full border bg-card p-2 shadow-lift transition-colors focus-within:border-cobalt/50 dark:bg-night-2"
        >
            <div className="pl-4 text-muted">
                <Icon name="search" size={20} />
            </div>
            <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Cari judul, penulis, ISBN, atau topik…"
                className="placeholder:text-muted-2 flex-1 bg-transparent py-2 text-base text-ink outline-none dark:text-paper"
                aria-label="Pencarian katalog"
            />
            <Button variant="primary" className="!px-6 !py-3">
                Cari <Icon name="arrow-right" size={14} />
            </Button>
        </form>
    );
}

/* ─────────── TRUST BAR ─────────── */
function TrustBar() {
    const items = [
        { icon: 'book', t: 'Katalog Lengkap', s: '12.480+ koleksi terkurasi' },
        { icon: 'clock', t: 'Pinjam Mudah', s: 'Reservasi daring 24/7' },
        { icon: 'globe', t: 'Sumber Digital', s: 'E-book, jurnal & riset' },
        { icon: 'check', t: 'Gratis Anggota', s: 'Untuk seluruh siswa' },
    ];
    return (
        <section className="hairline border-y bg-card/60 backdrop-blur dark:bg-night-2/40">
            <div className="mx-auto max-w-7xl px-6 lg:px-10">
                <div className="hairline grid grid-cols-2 divide-x divide-y lg:grid-cols-4 lg:divide-y-0">
                    {items.map((it, i) => (
                        <Reveal key={i} delay={i * 70}>
                            <div className="flex items-center gap-3 px-4 py-6 lg:px-6">
                                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-cobalt-50 text-cobalt dark:bg-cobalt/15 dark:text-cobalt-lt">
                                    <Icon name={it.icon} size={18} />
                                </div>
                                <div>
                                    <div className="text-sm font-semibold text-ink dark:text-paper">
                                        {it.t}
                                    </div>
                                    <div className="text-xs text-muted dark:text-paper/50">
                                        {it.s}
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ─────────── SPOTLIGHT (dual banner à la iyelstore flash-sale + newbie) ─────────── */
function SpotlightBanner() {
    const pick = BOOKS.find((b) => b.id === 'b003') || BOOKS[2];
    const pal = COVER_PALETTES[pick.palette];
    return (
        <section className="mx-auto max-w-7xl px-6 pt-16 lg:px-10 lg:pt-20">
            <div className="grid grid-cols-12 gap-5">
                {/* Big spotlight */}
                <Reveal className="col-span-12 lg:col-span-8">
                    <div className="bracket relative flex h-full min-h-[260px] overflow-hidden rounded-xl2 bg-cobalt text-paper">
                        <div className="line-grid absolute inset-0 opacity-20" />
                        <div className="absolute -top-16 -right-16 h-72 w-72 rounded-full bg-brass/20 blur-2xl" />
                        <div className="relative z-10 flex flex-1 flex-col justify-between gap-6 p-8 lg:p-10">
                            <div>
                                <span className="inline-flex items-center gap-2 rounded-full bg-brass px-3 py-1 text-[11px] font-bold tracking-editorial text-white uppercase">
                                    <Icon name="star-fill" size={12} /> Sorotan
                                    Minggu Ini
                                </span>
                                <h3
                                    className="mt-5 font-serif text-3xl leading-tight text-paper lg:text-4xl"
                                    style={{ textWrap: 'balance' }}
                                >
                                    Pilihan pustakawan:{' '}
                                    <em className="text-brass-lt">
                                        {pick.title}
                                    </em>
                                </h3>
                                <p className="mt-3 line-clamp-2 max-w-md text-sm leading-relaxed text-paper/70">
                                    {pick.synopsis}
                                </p>
                            </div>
                            <div className="flex items-center gap-4">
                                <Button
                                    as="a"
                                    href={`#/buku/${pick.id}`}
                                    variant="dark"
                                    className="!bg-paper !text-cobalt hover:!bg-card"
                                >
                                    Baca Sinopsis{' '}
                                    <Icon name="arrow-right" size={14} />
                                </Button>
                                <div className="flex items-center gap-2 text-sm text-paper/70">
                                    <span className="inline-flex items-center gap-1 text-brass-lt">
                                        <Icon name="star-fill" size={13} />{' '}
                                        {pick.rating.toFixed(1)}
                                    </span>
                                    <span>·</span>
                                    <span className="tabnum">
                                        Dipinjam {borrowCount(pick)}×
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="relative z-10 hidden items-center pr-8 sm:flex lg:pr-12">
                            <div className="rotate-3">
                                <BookCover book={pick} size="lg" />
                            </div>
                        </div>
                    </div>
                </Reveal>

                {/* Member CTA card */}
                <Reveal delay={120} className="col-span-12 lg:col-span-4">
                    <div className="bracket relative flex h-full min-h-[260px] flex-col justify-between overflow-hidden rounded-xl2 border-2 border-cobalt/30 bg-cobalt-50 p-8 text-cobalt dark:border-cobalt-lt/30 dark:bg-night-2 dark:text-cobalt-lt">
                        <div className="absolute -bottom-10 -left-10 h-44 w-44 rounded-full bg-brass/10 blur-2xl" />
                        <div className="relative">
                            <span className="font-mono text-[11px] tracking-editorial text-brass uppercase dark:text-brass-lt">
                                Anggota Baru?
                            </span>
                            <div
                                className="mt-4 font-serif text-3xl leading-tight text-ink dark:text-paper"
                                style={{ textWrap: 'balance' }}
                            >
                                Aktivasi kartu, pinjam <em>gratis</em>{' '}
                                selamanya.
                            </div>
                            <p className="mt-3 text-sm text-muted dark:text-paper/60">
                                Seluruh siswa Yayasan Saint Luke otomatis jadi
                                anggota. Cukup aktivasi sekali.
                            </p>
                        </div>
                        <div className="relative mt-6 flex items-center justify-between">
                            <Button as="a" href="#/akun" variant="primary">
                                Aktivasi Sekarang
                            </Button>
                            <span className="font-mono text-[11px] tracking-editorial text-muted uppercase dark:text-paper/50">
                                Gratis
                            </span>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

/* ─────────── CATEGORIES ─────────── */
function CategoriesSection() {
    return (
        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
            <div className="mb-12 flex items-end justify-between gap-6">
                <div>
                    <Reveal>
                        <Eyebrow>Jelajahi Koleksi</Eyebrow>
                    </Reveal>
                    <Reveal delay={80}>
                        <h2
                            className="mt-5 font-serif text-3xl text-ink lg:text-5xl dark:text-paper"
                            style={{ textWrap: 'balance' }}
                        >
                            Telusuri berdasarkan{' '}
                            <em className="text-cobalt dark:text-cobalt-lt">
                                kategori
                            </em>
                        </h2>
                    </Reveal>
                </div>
                <Reveal delay={120}>
                    <a
                        href="#/katalog/kategori"
                        className="group hidden items-center gap-2 text-sm font-semibold text-ink hover:text-cobalt md:inline-flex dark:text-paper dark:hover:text-cobalt-lt"
                    >
                        Semua kategori{' '}
                        <Icon
                            name="arrow-right"
                            size={16}
                            className="transition-transform group-hover:translate-x-1"
                        />
                    </a>
                </Reveal>
            </div>

            <Stagger
                step={50}
                className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-3"
            >
                {CATEGORIES.map((c) => (
                    <a
                        key={c.id}
                        href={`#/katalog/buku?kategori=${c.id}`}
                        className="group hairline relative overflow-hidden rounded-xl2 border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cobalt/30 hover:shadow-lift dark:bg-night-2"
                    >
                        <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-cobalt-50 transition-transform duration-500 group-hover:scale-150 dark:bg-cobalt/10" />
                        <div className="relative flex items-start justify-between">
                            <div className="text-3xl">{c.icon}</div>
                            <Icon
                                name="arrow-up-right"
                                size={18}
                                className="text-muted-2 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-cobalt dark:group-hover:text-cobalt-lt"
                            />
                        </div>
                        <div className="relative mt-8">
                            <div className="font-serif text-xl text-ink transition-colors group-hover:text-cobalt dark:text-paper dark:group-hover:text-cobalt-lt">
                                {c.name}
                            </div>
                            <div className="mt-1 text-xs text-muted dark:text-paper/50">
                                <span className="tabnum font-medium">
                                    {c.count}
                                </span>{' '}
                                judul tersedia
                            </div>
                        </div>
                    </a>
                ))}
            </Stagger>
        </section>
    );
}

/* ─────────── NEW ARRIVALS ─────────── */
function NewArrivals({ books }) {
    return (
        <section className="hairline border-y bg-paper-2/40 dark:bg-night-2/30">
            <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
                <div className="mb-12 flex items-end justify-between gap-6">
                    <div>
                        <Reveal>
                            <Eyebrow>Baru Tiba</Eyebrow>
                        </Reveal>
                        <Reveal delay={80}>
                            <h2
                                className="mt-5 font-serif text-3xl text-ink lg:text-5xl dark:text-paper"
                                style={{ textWrap: 'balance' }}
                            >
                                Koleksi terbaru di rak kami
                            </h2>
                        </Reveal>
                    </div>
                    <Reveal delay={120}>
                        <a
                            href="#/katalog/buku"
                            className="group hidden items-center gap-2 text-sm font-semibold text-ink hover:text-cobalt md:inline-flex dark:text-paper dark:hover:text-cobalt-lt"
                        >
                            Lihat semua{' '}
                            <Icon
                                name="arrow-right"
                                size={16}
                                className="transition-transform group-hover:translate-x-1"
                            />
                        </a>
                    </Reveal>
                </div>

                <Stagger
                    step={50}
                    className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5"
                >
                    {books.map((b) => (
                        <BookCard key={b.id} book={b} size="md" />
                    ))}
                </Stagger>
            </div>
        </section>
    );
}

/* ─────────── HOW TO BORROW ─────────── */
function HowToBorrow() {
    const steps = [
        {
            num: '1',
            icon: 'search',
            title: 'Cari & Temukan',
            body: 'Telusuri katalog daring, gunakan filter kategori, penulis, atau ketersediaan untuk menemukan buku.',
        },
        {
            num: '2',
            icon: 'bookmark',
            title: 'Reservasi Online',
            body: 'Klik "Pinjam" pada halaman buku. Reservasi langsung tercatat di akun anggotamu.',
        },
        {
            num: '3',
            icon: 'pin',
            title: 'Ambil di Rak',
            body: 'Datang ke perpustakaan, tunjukkan kode reservasi, ambil di lokasi rak yang tertera.',
        },
        {
            num: '4',
            icon: 'check',
            title: 'Baca & Kembalikan',
            body: 'Pinjam hingga 14 hari. Perpanjang sekali lewat akun jika butuh waktu lebih.',
        },
    ];
    return (
        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
            <div className="mx-auto mb-16 max-w-2xl text-center">
                <Reveal>
                    <Eyebrow className="mx-auto">Cara Meminjam</Eyebrow>
                </Reveal>
                <Reveal delay={80}>
                    <h2
                        className="mt-5 font-serif text-3xl text-ink lg:text-5xl dark:text-paper"
                        style={{ textWrap: 'balance' }}
                    >
                        Empat langkah, bukumu di tangan
                    </h2>
                </Reveal>
                <Reveal delay={140}>
                    <p className="mt-4 text-muted dark:text-paper/60">
                        Proses sederhana dan transparan — dari pencarian hingga
                        buku sampai di tanganmu.
                    </p>
                </Reveal>
            </div>

            <Stagger
                step={90}
                className="flex flex-col gap-10 lg:flex-row lg:gap-6"
            >
                {steps.map((s, i) => (
                    <Step key={i} {...s} last={i === steps.length - 1} />
                ))}
            </Stagger>
        </section>
    );
}

/* ─────────── TRENDING ─────────── */
function TrendingSection({ books }) {
    const [hero, ...rest] = books;
    return (
        <section className="hairline border-y bg-ink text-paper dark:bg-night-2">
            <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
                <div className="mb-12 flex items-end justify-between gap-6">
                    <div>
                        <Reveal>
                            <span className="inline-flex items-center gap-2 rounded-full bg-cobalt/20 px-3 py-1 text-[11px] font-semibold tracking-editorial text-cobalt-lt uppercase">
                                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cobalt-lt" />{' '}
                                Paling Dicari
                            </span>
                        </Reveal>
                        <Reveal delay={80}>
                            <h2
                                className="mt-5 font-serif text-3xl lg:text-5xl"
                                style={{ textWrap: 'balance' }}
                            >
                                Sedang ramai dipinjam{' '}
                                <em className="text-cobalt-lt">minggu ini</em>
                            </h2>
                        </Reveal>
                    </div>
                    <Reveal delay={120}>
                        <a
                            href="#/top"
                            className="group hidden items-center gap-2 text-sm font-semibold text-paper hover:text-cobalt-lt md:inline-flex"
                        >
                            Top 20{' '}
                            <Icon
                                name="arrow-right"
                                size={16}
                                className="transition-transform group-hover:translate-x-1"
                            />
                        </a>
                    </Reveal>
                </div>

                <div className="grid grid-cols-12 gap-8">
                    {/* Featured #1 */}
                    <Reveal className="col-span-12 lg:col-span-5">
                        <a
                            href={`#/buku/${hero.id}`}
                            className="group block h-full rounded-xl2 border border-white/10 bg-night-3/60 p-7 transition-colors hover:border-cobalt/40 dark:bg-night-3"
                        >
                            <div className="flex gap-6">
                                <div className="shrink-0">
                                    <BookCover book={hero} size="lg" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="inline-flex items-center gap-1.5 self-start rounded-full bg-amber-400 px-2.5 py-1 text-[10px] font-bold tracking-editorial text-amber-950 uppercase">
                                        <Icon name="star-fill" size={11} /> #1
                                        Terpopuler
                                    </span>
                                    <h3
                                        className="mt-4 font-serif text-2xl leading-tight transition-colors group-hover:text-cobalt-lt"
                                        style={{ textWrap: 'balance' }}
                                    >
                                        {hero.title}
                                    </h3>
                                    <div className="mt-1 text-sm text-paper/60">
                                        {hero.author}
                                    </div>
                                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-paper/55">
                                        {hero.synopsis}
                                    </p>
                                    <div className="mt-auto flex items-center gap-4 pt-4 text-xs">
                                        <span className="inline-flex items-center gap-1 text-amber-400">
                                            <Icon name="star-fill" size={12} />{' '}
                                            <span className="tabnum">
                                                {hero.rating.toFixed(1)}
                                            </span>
                                        </span>
                                        <span className="tabnum text-paper/40">
                                            Dipinjam {borrowCount(hero)}×
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </Reveal>

                    {/* List 2-6 */}
                    <div className="col-span-12 lg:col-span-7">
                        <div className="grid gap-x-8 gap-y-1 sm:grid-cols-2">
                            {rest.slice(0, 6).map((b, i) => (
                                <Reveal key={b.id} delay={i * 50}>
                                    <a
                                        href={`#/buku/${b.id}`}
                                        className="group flex items-center gap-4 border-b border-white/5 py-3.5 transition-colors hover:border-cobalt/30"
                                    >
                                        <span className="tabnum w-7 font-serif text-2xl text-paper/30 transition-colors group-hover:text-cobalt-lt">
                                            {i + 2}
                                        </span>
                                        <div className="min-w-0 flex-1">
                                            <div className="line-clamp-1 font-serif text-base leading-snug transition-colors group-hover:text-cobalt-lt">
                                                {b.title}
                                            </div>
                                            <div className="line-clamp-1 text-xs text-paper/45">
                                                {b.author}
                                            </div>
                                        </div>
                                        <div className="shrink-0 text-right">
                                            <div className="inline-flex items-center gap-1 text-xs text-amber-400">
                                                <Icon
                                                    name="star-fill"
                                                    size={11}
                                                />{' '}
                                                <span className="tabnum">
                                                    {b.rating.toFixed(1)}
                                                </span>
                                            </div>
                                        </div>
                                    </a>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ─────────── STATS ─────────── */
function StatsSection() {
    const icons = {
        koleksi: 'book',
        judul: 'bookmark',
        anggota: 'user',
        pinjam: 'clock',
    };
    return (
        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
            <div className="mx-auto mb-14 max-w-2xl text-center">
                <Reveal>
                    <Eyebrow className="mx-auto">Dalam Angka</Eyebrow>
                </Reveal>
                <Reveal delay={80}>
                    <h2
                        className="mt-5 font-serif text-3xl text-ink lg:text-5xl dark:text-paper"
                        style={{ textWrap: 'balance' }}
                    >
                        Perpustakaan yang terus{' '}
                        <em className="text-cobalt dark:text-cobalt-lt">
                            bertumbuh
                        </em>
                    </h2>
                </Reveal>
            </div>
            <Stagger
                step={80}
                className="grid grid-cols-2 gap-4 lg:grid-cols-4"
            >
                {STATS.map((s) => (
                    <StatCard
                        key={s.id}
                        value={s.value}
                        suffix={s.suffix}
                        label={s.label}
                        note={s.note}
                        icon={icons[s.id]}
                    />
                ))}
            </Stagger>

            {/* collection-by-category chart */}
            <Reveal>
                <div className="hairline mt-16 rounded-xl2 border bg-card p-7 lg:p-10 dark:bg-night-2">
                    <div className="mb-8 flex items-end justify-between gap-4">
                        <div>
                            <div className="font-mono text-[11px] tracking-editorial text-muted uppercase dark:text-paper/50">
                                Komposisi Koleksi
                            </div>
                            <h3 className="mt-1 font-serif text-2xl text-ink dark:text-paper">
                                Sebaran judul per kategori
                            </h3>
                        </div>
                        <div className="text-right">
                            <div className="tabnum font-serif text-3xl text-cobalt dark:text-cobalt-lt">
                                {CATEGORIES.length}
                            </div>
                            <div className="text-xs text-muted dark:text-paper/50">
                                rumpun
                            </div>
                        </div>
                    </div>
                    <CategoryChart />
                </div>
            </Reveal>
        </section>
    );
}

function CategoryChart() {
    const [ref, shown] = useReveal();
    const max = Math.max(...CATEGORIES.map((c) => c.count));
    return (
        <div ref={ref} className="space-y-3">
            {CATEGORIES.map((c, i) => (
                <a
                    key={c.id}
                    href={`#/katalog/buku?kategori=${c.id}`}
                    className="group grid grid-cols-12 items-center gap-3"
                >
                    <div className="col-span-5 flex min-w-0 items-center gap-2 sm:col-span-3">
                        <span className="text-base">{c.icon}</span>
                        <span className="truncate text-sm text-ink transition-colors group-hover:text-cobalt dark:text-paper dark:group-hover:text-cobalt-lt">
                            {c.name}
                        </span>
                    </div>
                    <div className="col-span-6 sm:col-span-8">
                        <div className="h-7 overflow-hidden rounded-full bg-paper-2/70 dark:bg-night-3">
                            <div
                                className="progress-bar flex h-full items-center justify-end rounded-full pr-3"
                                style={{
                                    width: shown
                                        ? `${(c.count / max) * 100}%`
                                        : '0%',
                                    background: `linear-gradient(90deg, #1F9D73, ${i % 2 ? '#34C690' : '#D2A653'})`,
                                    transitionDelay: `${i * 80}ms`,
                                }}
                            >
                                <span className="tabnum text-[11px] font-bold text-white">
                                    {c.count}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="tabnum col-span-1 hidden text-right text-xs text-muted sm:block dark:text-paper/45">
                        {Math.round((c.count / max) * 100)}%
                    </div>
                </a>
            ))}
        </div>
    );
}

/* ─────────── WHY US ─────────── */
function WhyUs() {
    const feats = [
        {
            icon: 'book',
            title: 'Koleksi Terkurasi',
            body: 'Setiap judul dipilih pustakawan, bukan algoritma. Dari sastra kanon hingga sains terkini, semua melalui proses kurasi.',
        },
        {
            icon: 'globe',
            title: 'Akses Digital 24/7',
            body: 'Telusuri katalog, reservasi buku, dan akses e-book serta jurnal akademik kapan saja, dari mana saja.',
        },
        {
            icon: 'user',
            title: 'Untuk Setiap Jenjang',
            body: 'Melayani siswa SD hingga SMA dengan koleksi yang sesuai usia dan kebutuhan akademik tiap tingkat.',
        },
        {
            icon: 'star',
            title: 'Program Literasi',
            body: 'Klub baca, lomba resensi, dan pelatihan literasi digital yang menumbuhkan kebiasaan membaca sejak dini.',
        },
    ];
    return (
        <section className="hairline border-y bg-paper-2/40 dark:bg-night-2/30">
            <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
                <div className="grid grid-cols-12 gap-10 lg:gap-16">
                    <div className="col-span-12 lg:col-span-4">
                        <Reveal>
                            <Eyebrow>Fitur Kami</Eyebrow>
                        </Reveal>
                        <Reveal delay={80}>
                            <h2
                                className="mt-5 font-serif text-3xl leading-tight text-ink lg:text-5xl dark:text-paper"
                                style={{ textWrap: 'balance' }}
                            >
                                Lebih dari sekadar{' '}
                                <em className="text-cobalt dark:text-cobalt-lt">
                                    rak buku
                                </em>
                            </h2>
                        </Reveal>
                        <Reveal delay={140}>
                            <p className="mt-4 leading-relaxed text-muted dark:text-paper/60">
                                Sejak 1968, kami membangun ruang baca yang
                                tenang, terkurasi, dan menyambut — tempat di
                                mana setiap siswa menemukan bacaan yang tepat.
                            </p>
                        </Reveal>
                        <Reveal delay={200}>
                            <Button
                                as="a"
                                href="#/tentang/profil"
                                variant="dark"
                                className="mt-7"
                            >
                                Tentang Kami{' '}
                                <Icon name="arrow-right" size={14} />
                            </Button>
                        </Reveal>
                    </div>
                    <div className="col-span-12 lg:col-span-8">
                        <Stagger
                            step={70}
                            className="grid gap-4 sm:grid-cols-2"
                        >
                            {feats.map((f, i) => (
                                <FeatureCard key={i} {...f} />
                            ))}
                        </Stagger>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ─────────── TESTIMONIALS ─────────── */
function Testimonials() {
    return (
        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
            <div className="mx-auto mb-14 max-w-2xl text-center">
                <Reveal>
                    <Eyebrow className="mx-auto">Testimoni</Eyebrow>
                </Reveal>
                <Reveal delay={80}>
                    <h2
                        className="mt-5 font-serif text-3xl text-ink lg:text-5xl dark:text-paper"
                        style={{ textWrap: 'balance' }}
                    >
                        Dipercaya siswa, guru, &amp;{' '}
                        <em className="text-cobalt dark:text-cobalt-lt">
                            alumni
                        </em>
                    </h2>
                </Reveal>
            </div>
            <Stagger
                step={70}
                className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4"
            >
                {TESTIMONIALS.map((t, i) => {
                    const p = COVER_PALETTES[t.palette];
                    return (
                        <div
                            key={i}
                            className="bracket hairline flex h-full flex-col rounded-xl2 border bg-card p-6 text-cobalt transition-all duration-300 hover:border-cobalt/40 hover:shadow-lift dark:bg-night-2 dark:text-cobalt-lt"
                        >
                            <div className="text-cobalt dark:text-cobalt-lt">
                                <Rating value={5} size={13} showNum={false} />
                            </div>
                            <p className="mt-4 flex-1 text-sm leading-relaxed text-ink/80 dark:text-paper/75">
                                “{t.text}”
                            </p>
                            <div className="hairline mt-5 flex items-center gap-3 border-t pt-4">
                                <div
                                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full font-serif text-sm"
                                    style={{ background: p.bg, color: p.ink }}
                                >
                                    {t.name
                                        .split(' ')
                                        .map((w) => w[0])
                                        .slice(0, 2)
                                        .join('')}
                                </div>
                                <div>
                                    <div className="text-sm font-semibold text-ink dark:text-paper">
                                        {t.name}
                                    </div>
                                    <div className="text-[11px] text-muted dark:text-paper/50">
                                        {t.role}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </Stagger>
        </section>
    );
}

/* ─────────── PUBLISHERS MARQUEE ─────────── */
function PublishersMarquee() {
    return (
        <section className="overflow-hidden py-16 lg:py-20">
            <div className="mx-auto mb-10 max-w-7xl px-6 text-center lg:px-10">
                <Reveal>
                    <p className="font-mono text-xs tracking-wider-2 text-muted uppercase dark:text-paper/50">
                        Bekerja sama dengan penerbit tepercaya
                    </p>
                </Reveal>
            </div>
            <Marquee>
                {PUBLISHERS.map((p) => (
                    <a
                        key={p.id}
                        href={`#/katalog/buku?penerbit=${p.id}`}
                        className="group hairline flex shrink-0 items-center gap-3 rounded-xl2 border bg-card px-7 py-4 transition-all hover:border-cobalt/30 hover:shadow-soft dark:bg-night-2"
                    >
                        <div className="grid h-9 w-9 place-items-center rounded-lg bg-cobalt-50 text-cobalt dark:bg-cobalt/15 dark:text-cobalt-lt">
                            <Icon name="building" size={16} />
                        </div>
                        <div>
                            <div className="font-serif text-base whitespace-nowrap text-ink transition-colors group-hover:text-cobalt dark:text-paper dark:group-hover:text-cobalt-lt">
                                {p.name}
                            </div>
                            <div className="text-[11px] text-muted dark:text-paper/50">
                                {p.city} · sejak {p.founded}
                            </div>
                        </div>
                    </a>
                ))}
            </Marquee>
        </section>
    );
}

/* ─────────── NEWS ─────────── */
function NewsSection({ news }) {
    const [big, ...rest] = news;
    const pBig = COVER_PALETTES[big.palette];
    return (
        <section className="hairline border-y bg-paper-2/40 dark:bg-night-2/30">
            <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
                <div className="mb-12 flex items-end justify-between gap-6">
                    <div>
                        <Reveal>
                            <Eyebrow>Kabar Terbaru</Eyebrow>
                        </Reveal>
                        <Reveal delay={80}>
                            <h2
                                className="mt-5 font-serif text-3xl text-ink lg:text-5xl dark:text-paper"
                                style={{ textWrap: 'balance' }}
                            >
                                Berita & kegiatan perpustakaan
                            </h2>
                        </Reveal>
                    </div>
                    <Reveal delay={120}>
                        <a
                            href="#/berita"
                            className="group hidden items-center gap-2 text-sm font-semibold text-ink hover:text-cobalt md:inline-flex dark:text-paper dark:hover:text-cobalt-lt"
                        >
                            Semua berita{' '}
                            <Icon
                                name="arrow-right"
                                size={16}
                                className="transition-transform group-hover:translate-x-1"
                            />
                        </a>
                    </Reveal>
                </div>

                <div className="grid grid-cols-12 gap-6">
                    <Reveal className="col-span-12 lg:col-span-6">
                        <a
                            href={`#/berita/${big.id}`}
                            className="group hairline block h-full overflow-hidden rounded-xl2 border bg-card transition-all hover:border-cobalt/30 hover:shadow-lift dark:bg-night-2"
                        >
                            <div
                                className="spine-shadow relative aspect-[16/10]"
                                style={{ background: pBig.bg, color: pBig.ink }}
                            >
                                <div className="dot-grid absolute inset-0 opacity-30" />
                                <div className="absolute inset-0 flex flex-col justify-between p-8">
                                    <Badge tone="cobalt">{big.category}</Badge>
                                    <div
                                        className="font-serif text-3xl leading-tight italic lg:text-4xl"
                                        style={{ textWrap: 'balance' }}
                                    >
                                        "
                                        {big.title
                                            .split(' ')
                                            .slice(0, 7)
                                            .join(' ')}
                                        …"
                                    </div>
                                </div>
                            </div>
                            <div className="p-7">
                                <div className="font-mono text-[11px] tracking-editorial text-muted uppercase dark:text-paper/50">
                                    {formatDate(big.date)} · {big.minutes} menit
                                    baca
                                </div>
                                <h3
                                    className="mt-2 font-serif text-2xl leading-snug text-ink transition-colors group-hover:text-cobalt dark:text-paper dark:group-hover:text-cobalt-lt"
                                    style={{ textWrap: 'balance' }}
                                >
                                    {big.title}
                                </h3>
                                <p className="mt-2 line-clamp-2 text-sm text-muted dark:text-paper/60">
                                    {big.excerpt}
                                </p>
                            </div>
                        </a>
                    </Reveal>

                    <div className="col-span-12 flex flex-col gap-6 lg:col-span-6">
                        {rest.map((n, i) => (
                            <Reveal key={n.id} delay={i * 80}>
                                <a
                                    href={`#/berita/${n.id}`}
                                    className="group hairline flex gap-5 overflow-hidden rounded-xl2 border bg-card transition-all hover:border-cobalt/30 hover:shadow-lift dark:bg-night-2"
                                >
                                    <div
                                        className="spine-shadow relative w-32 shrink-0"
                                        style={{
                                            background:
                                                COVER_PALETTES[n.palette].bg,
                                            color: COVER_PALETTES[n.palette]
                                                .ink,
                                        }}
                                    >
                                        <div className="absolute inset-0 grid place-items-center p-3">
                                            <Icon
                                                name="book"
                                                size={22}
                                                style={{
                                                    color: COVER_PALETTES[
                                                        n.palette
                                                    ].accent,
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="py-5 pr-5">
                                        <div className="font-mono text-[10px] tracking-editorial text-cobalt uppercase dark:text-cobalt-lt">
                                            {n.category} · {formatDate(n.date)}
                                        </div>
                                        <h3
                                            className="mt-1.5 line-clamp-2 font-serif text-lg leading-snug text-ink transition-colors group-hover:text-cobalt dark:text-paper dark:group-hover:text-cobalt-lt"
                                            style={{ textWrap: 'balance' }}
                                        >
                                            {n.title}
                                        </h3>
                                        <p className="mt-1.5 line-clamp-2 text-xs text-muted dark:text-paper/55">
                                            {n.excerpt}
                                        </p>
                                    </div>
                                </a>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ─────────── FAQ ─────────── */
function FaqSection() {
    const items = [
        {
            q: 'Siapa saja yang bisa menjadi anggota?',
            a: 'Seluruh siswa aktif Yayasan Santo Lukas dari jenjang SD hingga SMA, beserta guru dan staf, otomatis terdaftar sebagai anggota. Alumni dan orang tua dapat mengajukan kartu akses melalui formulir kontak.',
        },
        {
            q: 'Berapa lama masa peminjaman buku?',
            a: 'Masa pinjam standar adalah 14 hari, dengan opsi perpanjangan satu kali (7 hari) yang dapat dilakukan mandiri melalui akun anggota, selama buku tidak sedang diantri anggota lain.',
        },
        {
            q: 'Berapa banyak buku yang bisa dipinjam sekaligus?',
            a: 'Siswa SD dapat meminjam hingga 2 buku, SMP hingga 3 buku, dan SMA hingga 4 buku secara bersamaan. Guru dan staf memiliki kuota khusus.',
        },
        {
            q: 'Apakah ada koleksi digital yang bisa diakses dari rumah?',
            a: 'Ya. Melalui menu Sumber, anggota dapat mengakses e-book, jurnal akademik (JSTOR, Perpusnas), dan tautan riset tepercaya menggunakan kredensial sekolah.',
        },
        {
            q: 'Bagaimana jika buku yang saya cari sedang dipinjam?',
            a: 'Anda dapat menambahkannya ke Wishlist dan mengaktifkan notifikasi. Saat buku tersedia kembali, kami akan mengirim pemberitahuan melalui surel sekolah Anda.',
        },
    ];
    return (
        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
            <div className="grid grid-cols-12 gap-10 lg:gap-16">
                <div className="col-span-12 lg:col-span-4">
                    <Reveal>
                        <Eyebrow>Tanya Jawab</Eyebrow>
                    </Reveal>
                    <Reveal delay={80}>
                        <h2
                            className="mt-5 font-serif text-3xl leading-tight text-ink lg:text-5xl dark:text-paper"
                            style={{ textWrap: 'balance' }}
                        >
                            Pertanyaan yang sering diajukan
                        </h2>
                    </Reveal>
                    <Reveal delay={140}>
                        <p className="mt-4 text-muted dark:text-paper/60">
                            Belum menemukan jawaban?{' '}
                            <a
                                href="#/tentang/kontak"
                                className="font-semibold text-cobalt hover:underline dark:text-cobalt-lt"
                            >
                                Hubungi pustakawan
                            </a>{' '}
                            kami.
                        </p>
                    </Reveal>
                </div>
                <div className="col-span-12 lg:col-span-8">
                    <Reveal delay={100}>
                        <Accordion items={items} />
                    </Reveal>
                </div>
            </div>
        </section>
    );
}

/* ─────────── CTA JOIN ─────────── */
function CtaJoin() {
    return (
        <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">
            <Reveal>
                <div className="relative overflow-hidden rounded-4xl bg-cobalt p-10 text-white lg:p-16">
                    <div className="dot-grid absolute inset-0 opacity-20" />
                    <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-white/10 blur-2xl" />
                    <div className="absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-cobalt-dk/40 blur-2xl" />
                    <div className="relative grid grid-cols-12 items-center gap-8">
                        <div className="col-span-12 lg:col-span-8">
                            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold tracking-editorial text-white uppercase">
                                <Icon name="user" size={12} /> Akun Anggota
                            </span>
                            <h2
                                className="mt-5 font-serif text-3xl leading-tight lg:text-5xl"
                                style={{ textWrap: 'balance' }}
                            >
                                Masuk untuk mengelola pinjaman & wishlist-mu
                            </h2>
                            <p className="mt-4 max-w-xl leading-relaxed text-white/80">
                                Pantau buku yang sedang dipinjam, tanggal jatuh
                                tempo, riwayat bacaan, dan simpan judul incaran
                                — semua dalam satu dashboard.
                            </p>
                        </div>
                        <div className="col-span-12 flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:flex-col">
                            <Button
                                as="a"
                                href="#/akun"
                                variant="dark"
                                size="lg"
                                className="w-full !bg-white !text-cobalt hover:!bg-paper"
                            >
                                Masuk Anggota{' '}
                                <Icon name="arrow-right" size={14} />
                            </Button>
                            <Button
                                as="a"
                                href="#/katalog/buku"
                                variant="ghost"
                                size="lg"
                                className="w-full border border-white/30 !text-white hover:!bg-white/10"
                            >
                                Jelajah Katalog
                            </Button>
                        </div>
                    </div>
                </div>
            </Reveal>
        </section>
    );
}

/* ─────────── FOR YOU (rekomendasi personal) ─────────── */
function ForYou() {
    const picks = ['b008', 'b013', 'b019', 'b023', 'b029', 'b004']
        .map(bookById)
        .filter(Boolean);
    const reasons = [
        'Karena kamu suka sastra',
        'Sering dipinjam teman sekelas',
        'Genre favoritmu',
        'Penulis yang kamu ikuti',
        'Trending di SMA',
        'Melanjutkan bacaanmu',
    ];
    return (
        <section className="hairline border-y bg-night-2/0 dark:bg-night-2/30">
            <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
                <div className="mb-10 flex items-end justify-between gap-6">
                    <div>
                        <Reveal>
                            <Eyebrow>Untukmu</Eyebrow>
                        </Reveal>
                        <Reveal delay={80}>
                            <h2
                                className="mt-5 font-serif text-3xl text-ink lg:text-5xl dark:text-paper"
                                style={{ textWrap: 'balance' }}
                            >
                                Rekomendasi{' '}
                                <span className="grad-text">yang dipilih</span>{' '}
                                untukmu
                            </h2>
                        </Reveal>
                        <Reveal delay={120}>
                            <p className="mt-3 max-w-xl text-muted dark:text-paper/60">
                                Berdasarkan riwayat bacaan dan minat anggota
                                dengan selera serupa.
                            </p>
                        </Reveal>
                    </div>
                    <Reveal delay={140}>
                        <div className="hairline hidden items-center gap-2 rounded-full border bg-card px-4 py-2 md:flex dark:bg-night-2">
                            <span className="grid h-7 w-7 place-items-center rounded-full bg-cobalt text-xs font-bold text-white">
                                CW
                            </span>
                            <span className="text-sm">
                                <span className="text-muted dark:text-paper/55">
                                    Disesuaikan untuk
                                </span>{' '}
                                <span className="font-semibold text-ink dark:text-paper">
                                    Caesar
                                </span>
                            </span>
                        </div>
                    </Reveal>
                </div>
                <Stagger
                    step={50}
                    className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6"
                >
                    {picks.map((b, i) => (
                        <div key={b.id} className="group">
                            <div className="mb-2">
                                <Tag tone="accent" className="!text-[9px]">
                                    {reasons[i]}
                                </Tag>
                            </div>
                            <BookCard book={b} size="md" />
                        </div>
                    ))}
                </Stagger>
            </div>
        </section>
    );
}

/* ─────────── CURATOR SHELF (Rak Pilihan Guru) ─────────── */
function CuratorShelf() {
    const shelf = ['b001', 'b004', 'b007', 'b013', 'b018']
        .map(bookById)
        .filter(Boolean);
    return (
        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
            <div className="grid grid-cols-12 items-start gap-10 lg:gap-16">
                <div className="col-span-12 lg:col-span-4">
                    <Reveal>
                        <Eyebrow>Rak Pilihan Kurator</Eyebrow>
                    </Reveal>
                    <Reveal delay={80}>
                        <h2
                            className="mt-5 font-serif text-3xl leading-tight text-ink lg:text-4xl dark:text-paper"
                            style={{ textWrap: 'balance' }}
                        >
                            Lima buku yang{' '}
                            <em className="text-cobalt dark:text-cobalt-lt">
                                wajib dibaca
                            </em>{' '}
                            sebelum lulus
                        </h2>
                    </Reveal>
                    <Reveal delay={140}>
                        <div className="hairline bracket mt-6 rounded-xl2 border bg-card p-6 text-cobalt dark:bg-night-2 dark:text-cobalt-lt">
                            <p className="font-quote text-lg leading-relaxed text-ink dark:text-paper">
                                <em className="quote">
                                    "Buku-buku ini bukan sekadar bacaan — mereka
                                    mengajarkan cara melihat dunia dengan lebih
                                    jujur."
                                </em>
                            </p>
                            <div className="mt-5 flex items-center gap-3">
                                <div
                                    className="grid h-11 w-11 place-items-center rounded-full font-bold text-white"
                                    style={{ background: '#15543F' }}
                                >
                                    WS
                                </div>
                                <div>
                                    <div className="text-sm font-semibold text-ink dark:text-paper">
                                        Bapak Wahyu Setiawan
                                    </div>
                                    <div className="text-xs text-muted dark:text-paper/55">
                                        Guru Bahasa Indonesia · Kurator
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>
                <div className="col-span-12 lg:col-span-8">
                    <Stagger
                        step={60}
                        className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5"
                    >
                        {shelf.map((b) => (
                            <BookCard key={b.id} book={b} size="md" />
                        ))}
                    </Stagger>
                </div>
            </div>
        </section>
    );
}

/* ─────────── EVENTS (Jadwal Klub Baca) ─────────── */
function EventsSection() {
    const events = [
        {
            d: '21',
            m: 'Mei',
            day: 'Selasa',
            time: '15.30',
            title: 'Selasa Sastra: Membedah Bumi Manusia',
            tag: 'Klub Baca',
            loc: 'Ruang Baca Utama',
            seats: '8 kursi tersisa',
        },
        {
            d: '28',
            m: 'Mei',
            day: 'Selasa',
            time: '15.30',
            title: 'Diskusi Filsafat: Pengantar Stoikisme',
            tag: 'Diskusi',
            loc: 'Ruang Diskusi 2',
            seats: '12 kursi tersisa',
        },
        {
            d: '02',
            m: 'Jun',
            day: 'Sabtu',
            time: '09.00',
            title: 'Workshop Literasi Digital Kelas X',
            tag: 'Workshop',
            loc: 'Lab Komputer',
            seats: 'Penuh · daftar antri',
        },
        {
            d: '07',
            m: 'Jun',
            day: 'Kamis',
            time: '14.00',
            title: 'Bedah Buku bersama Penulis Tamu',
            tag: 'Acara',
            loc: 'Aula Yayasan',
            seats: '24 kursi tersisa',
        },
    ];
    return (
        <section className="hairline border-y bg-paper-2/40 dark:bg-night-2/30">
            <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
                <div className="mb-12 flex items-end justify-between gap-6">
                    <div>
                        <Reveal>
                            <Eyebrow>Agenda</Eyebrow>
                        </Reveal>
                        <Reveal delay={80}>
                            <h2
                                className="mt-5 font-serif text-3xl text-ink lg:text-5xl dark:text-paper"
                                style={{ textWrap: 'balance' }}
                            >
                                Acara &amp; jadwal klub baca
                            </h2>
                        </Reveal>
                    </div>
                    <Reveal delay={120}>
                        <a
                            href="#/berita"
                            className="group hidden items-center gap-2 text-sm font-semibold text-ink hover:text-cobalt md:inline-flex dark:text-paper dark:hover:text-cobalt-lt"
                        >
                            Kalender penuh{' '}
                            <Icon
                                name="arrow-right"
                                size={16}
                                className="transition-transform group-hover:translate-x-1"
                            />
                        </a>
                    </Reveal>
                </div>
                <Stagger
                    step={70}
                    className="grid grid-cols-1 gap-4 md:grid-cols-2"
                >
                    {events.map((e, i) => (
                        <div
                            key={i}
                            className="group hairline flex items-stretch gap-5 rounded-xl2 border bg-card p-5 transition-all duration-300 hover:border-cobalt/30 hover:shadow-lift dark:bg-night-2"
                        >
                            <div className="grid w-20 shrink-0 place-content-center rounded-xl bg-cobalt py-3 text-center text-white">
                                <div className="tabnum font-serif text-3xl leading-none">
                                    {e.d}
                                </div>
                                <div className="mt-1 text-[11px] tracking-editorial uppercase opacity-90">
                                    {e.m}
                                </div>
                            </div>
                            <div className="min-w-0 flex-1">
                                <div className="mb-1.5 flex items-center gap-2">
                                    <Tag tone="accent">{e.tag}</Tag>
                                    <span className="text-xs text-muted dark:text-paper/50">
                                        {e.day} · {e.time} WIB
                                    </span>
                                </div>
                                <h3
                                    className="font-serif text-lg leading-snug text-ink transition-colors group-hover:text-cobalt dark:text-paper dark:group-hover:text-cobalt-lt"
                                    style={{ textWrap: 'balance' }}
                                >
                                    {e.title}
                                </h3>
                                <div className="mt-2 flex items-center gap-4 text-xs text-muted dark:text-paper/55">
                                    <span className="inline-flex items-center gap-1">
                                        <Icon name="pin" size={12} /> {e.loc}
                                    </span>
                                    <span className="inline-flex items-center gap-1 font-medium text-cobalt dark:text-cobalt-lt">
                                        <Icon name="user" size={12} /> {e.seats}
                                    </span>
                                </div>
                            </div>
                            <button className="hairline btn-press shrink-0 self-center rounded-full border px-4 py-2 text-xs font-semibold tracking-editorial text-ink uppercase transition-colors hover:border-cobalt hover:bg-cobalt hover:text-white dark:text-paper">
                                Daftar
                            </button>
                        </div>
                    ))}
                </Stagger>
            </div>
        </section>
    );
}

/* helpers */
function formatDate(iso) {
    const d = new Date(iso);
    return d.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
}

Object.assign(window, { HomePage, formatDate });
