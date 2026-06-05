// pages-home.jsx — Beranda (Nordic Library v2 — digital product platform)
const { useState: hUseState, useEffect: hUseEffect, useRef: hUseRef } = React;

function HomePage() {
  const latest   = BOOKS.filter(b => b.new || b.year >= 2018).slice(0, 10);
  const popular  = [...BOOKS].sort((a,b) => b.popularity - a.popularity).slice(0, 5);
  const trending = [...BOOKS].sort((a,b) => b.popularity - a.popularity).slice(0, 10);
  const featured = BOOKS.find(b => b.id === 'b001');
  const featured2 = BOOKS.find(b => b.id === 'b006');
  const featured3 = BOOKS.find(b => b.id === 'b029');
  const news = NEWS.slice(0, 3);

  return (
    <div>
      <Hero featured={featured} featured2={featured2} featured3={featured3} />
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
    const el = secRef.current; if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
  };
  return (
    <section ref={secRef} onMouseMove={onMove} className="relative overflow-hidden">
      <div className="absolute inset-0 cursor-glow pointer-events-none" />
      <div className="absolute inset-0 hero-mesh pointer-events-none" />
      <div className="absolute inset-0 dot-grid opacity-[.5] pointer-events-none" style={{ maskImage: 'linear-gradient(to bottom, black, transparent 70%)' }} />
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-14 lg:pt-20 pb-16 lg:pb-24 relative">
        <div className="grid grid-cols-12 gap-8 lg:gap-6 items-center">
          {/* LEFT */}
          <div className="col-span-12 lg:col-span-7">
            <Reveal>
              <Eyebrow>Perpustakaan Digital · Yayasan Santo Lukas</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-6 font-serif font-medium text-ink dark:text-paper leading-[.98] text-[44px] sm:text-[60px] lg:text-[72px] xl:text-[80px]" style={{ textWrap: 'balance' }}>
                <span className="block">Ruang baca digital</span>
                <span className="block">yang <em className="text-cobalt dark:text-cobalt-lt">terlengkap</em> &amp;</span>
                <span className="block relative">
                  <span className="hero-stroke absolute -top-1 left-0 select-none pointer-events-none hidden lg:block" aria-hidden="true">terpercaya.</span>
                  <span className="relative">terpercaya.</span>
                </span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted dark:text-paper/65">
                Jelajahi <span className="text-ink dark:text-paper font-semibold">12.480+ koleksi</span> — sastra, sains, sejarah, hingga jurnal akademik. Cari, pinjam, dan kelola bacaanmu dalam satu portal yang dirancang untuk siswa Santo Lukas.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-8 max-w-2xl">
                <HeroSearch />
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted dark:text-paper/55">
                <span className="font-mono uppercase tracking-editorial">Trending:</span>
                {['Pramoedya','Filosofi Teras','Atomic Habits','Sapiens','Laskar Pelangi'].map(t => (
                  <a key={t} href={`#/cari?q=${encodeURIComponent(t)}`} className="px-3 py-1 rounded-full border hairline hover:border-cobalt/40 hover:text-cobalt dark:hover:text-cobalt-lt transition-colors">{t}</a>
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
                  <div key={i} className="flex items-center gap-8">
                    {i > 0 && <span className="w-px h-10 bg-line dark:bg-night-line" />}
                    <div>
                      <div className="font-serif text-2xl text-ink dark:text-paper tabnum">{s.v}</div>
                      <div className="text-xs text-muted dark:text-paper/50">{s.l}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* RIGHT — floating book showcase with mouse parallax */}
          <div className="col-span-12 lg:col-span-5 relative">
            <HeroShowcase featured={featured} featured2={featured2} featured3={featured3} />
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
    setP({ x: (e.clientX - r.left - r.width / 2) / r.width, y: (e.clientY - r.top - r.height / 2) / r.height });
  };
  const onLeave = () => setP({ x: 0, y: 0 });
  const tf = (mx, my, extra = {}) => ({ transform: `translate3d(${p.x * mx}px, ${p.y * my}px, 0)`, transition: 'transform .25s ease-out', ...extra });
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className="relative h-[420px] lg:h-[520px] flex items-center justify-center">
      <div className="absolute w-72 h-72 rounded-full bg-cobalt/10 blur-3xl" />
      <div className="relative">
        <div className="floaty relative z-20" style={tf(24, 18)}>
          <BookCover book={featured} size="xl" className="shadow-book-3d" noHover />
        </div>
        <div className="floaty-2 absolute -left-24 top-16 z-10 hidden sm:block opacity-95" style={tf(44, 32)}>
          <BookCover book={featured2} size="lg" noHover />
        </div>
        <div className="floaty absolute -right-20 bottom-8 z-30 hidden sm:block" style={tf(-36, 26, { animationDelay: '-3s' })}>
          <BookCover book={featured3} size="md" noHover />
        </div>
        <div className="absolute -right-6 top-4 z-40 bg-card dark:bg-night-3 rounded-2xl border hairline shadow-lift px-4 py-3 floaty-2" style={tf(-18, -14)}>
          <div className="flex items-center gap-1.5">
            <Icon name="star-fill" size={14} className="text-brass-lt" />
            <span className="font-serif text-lg text-ink dark:text-paper">4.8</span>
          </div>
          <div className="text-[10px] text-muted dark:text-paper/50 uppercase tracking-editorial mt-0.5">Pilihan Pustakawan</div>
        </div>
        <div className="absolute -left-10 bottom-2 z-40 bg-card dark:bg-night-3 rounded-2xl border hairline shadow-lift px-4 py-3 floaty hidden sm:block" style={tf(20, -16)}>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-sm font-semibold text-ink dark:text-paper">Tersedia kini</span>
          </div>
          <div className="text-[10px] text-muted dark:text-paper/50 mt-0.5">2 dari 4 eksemplar</div>
        </div>
      </div>
    </div>
  );
}

function HeroSearch() {
  const [q, setQ] = hUseState('');
  const submit = (e) => { e.preventDefault(); if (q.trim()) goTo(`cari?q=${encodeURIComponent(q.trim())}`); };
  return (
    <form onSubmit={submit} className="flex items-center gap-2 p-2 rounded-full bg-card dark:bg-night-2 border hairline shadow-lift focus-within:border-cobalt/50 transition-colors">
      <div className="pl-4 text-muted"><Icon name="search" size={20} /></div>
      <input
        value={q} onChange={(e) => setQ(e.target.value)}
        placeholder="Cari judul, penulis, ISBN, atau topik…"
        className="flex-1 bg-transparent outline-none text-ink dark:text-paper placeholder:text-muted-2 text-base py-2"
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
    { icon: 'book',   t: 'Katalog Lengkap',  s: '12.480+ koleksi terkurasi' },
    { icon: 'clock',  t: 'Pinjam Mudah',     s: 'Reservasi daring 24/7' },
    { icon: 'globe',  t: 'Sumber Digital',   s: 'E-book, jurnal & riset' },
    { icon: 'check',  t: 'Gratis Anggota',   s: 'Untuk seluruh siswa' },
  ];
  return (
    <section className="border-y hairline bg-card/60 dark:bg-night-2/40 backdrop-blur">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 hairline">
          {items.map((it, i) => (
            <Reveal key={i} delay={i * 70}>
              <div className="flex items-center gap-3 px-4 lg:px-6 py-6">
                <div className="w-11 h-11 grid place-items-center rounded-full bg-cobalt-50 dark:bg-cobalt/15 text-cobalt dark:text-cobalt-lt shrink-0">
                  <Icon name={it.icon} size={18} />
                </div>
                <div>
                  <div className="font-semibold text-sm text-ink dark:text-paper">{it.t}</div>
                  <div className="text-xs text-muted dark:text-paper/50">{it.s}</div>
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
  const pick = BOOKS.find(b => b.id === 'b003') || BOOKS[2];
  const pal = COVER_PALETTES[pick.palette];
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 lg:pt-20">
      <div className="grid grid-cols-12 gap-5">
        {/* Big spotlight */}
        <Reveal className="col-span-12 lg:col-span-8">
          <div className="bracket text-paper relative overflow-hidden rounded-xl2 bg-cobalt min-h-[260px] h-full flex">
            <div className="absolute inset-0 line-grid opacity-20" />
            <div className="absolute -right-16 -top-16 w-72 h-72 rounded-full bg-brass/20 blur-2xl" />
            <div className="relative z-10 p-8 lg:p-10 flex flex-col justify-between gap-6 flex-1">
              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brass text-white text-[11px] font-bold uppercase tracking-editorial">
                  <Icon name="star-fill" size={12} /> Sorotan Minggu Ini
                </span>
                <h3 className="mt-5 font-serif text-3xl lg:text-4xl leading-tight text-paper" style={{ textWrap: 'balance' }}>
                  Pilihan pustakawan: <em className="text-brass-lt">{pick.title}</em>
                </h3>
                <p className="mt-3 text-paper/70 text-sm max-w-md leading-relaxed line-clamp-2">{pick.synopsis}</p>
              </div>
              <div className="flex items-center gap-4">
                <Button as="a" href={`#/buku/${pick.id}`} variant="dark" className="!bg-paper !text-cobalt hover:!bg-card">
                  Baca Sinopsis <Icon name="arrow-right" size={14} />
                </Button>
                <div className="flex items-center gap-2 text-sm text-paper/70">
                  <span className="inline-flex items-center gap-1 text-brass-lt"><Icon name="star-fill" size={13} /> {pick.rating.toFixed(1)}</span>
                  <span>·</span>
                  <span className="tabnum">Dipinjam {borrowCount(pick)}×</span>
                </div>
              </div>
            </div>
            <div className="relative z-10 hidden sm:flex items-center pr-8 lg:pr-12">
              <div className="rotate-3"><BookCover book={pick} size="lg" /></div>
            </div>
          </div>
        </Reveal>

        {/* Member CTA card */}
        <Reveal delay={120} className="col-span-12 lg:col-span-4">
          <div className="bracket text-cobalt dark:text-cobalt-lt relative overflow-hidden rounded-xl2 border-2 border-cobalt/30 dark:border-cobalt-lt/30 bg-cobalt-50 dark:bg-night-2 min-h-[260px] h-full p-8 flex flex-col justify-between">
            <div className="absolute -left-10 -bottom-10 w-44 h-44 rounded-full bg-brass/10 blur-2xl" />
            <div className="relative">
              <span className="font-mono uppercase tracking-editorial text-[11px] text-brass dark:text-brass-lt">Anggota Baru?</span>
              <div className="mt-4 font-serif text-3xl text-ink dark:text-paper leading-tight" style={{ textWrap: 'balance' }}>
                Aktivasi kartu, pinjam <em>gratis</em> selamanya.
              </div>
              <p className="mt-3 text-sm text-muted dark:text-paper/60">Seluruh siswa Yayasan Saint Luke otomatis jadi anggota. Cukup aktivasi sekali.</p>
            </div>
            <div className="relative mt-6 flex items-center justify-between">
              <Button as="a" href="#/akun" variant="primary">Aktivasi Sekarang</Button>
              <span className="font-mono text-[11px] uppercase tracking-editorial text-muted dark:text-paper/50">Gratis</span>
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
    <section className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
      <div className="flex items-end justify-between gap-6 mb-12">
        <div>
          <Reveal><Eyebrow>Jelajahi Koleksi</Eyebrow></Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 font-serif text-3xl lg:text-5xl text-ink dark:text-paper" style={{ textWrap: 'balance' }}>
              Telusuri berdasarkan <em className="text-cobalt dark:text-cobalt-lt">kategori</em>
            </h2>
          </Reveal>
        </div>
        <Reveal delay={120}>
          <a href="#/katalog/kategori" className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-ink dark:text-paper hover:text-cobalt dark:hover:text-cobalt-lt group">
            Semua kategori <Icon name="arrow-right" size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </Reveal>
      </div>

      <Stagger step={50} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {CATEGORIES.map((c) => (
          <a key={c.id} href={`#/katalog/buku?kategori=${c.id}`}
            className="group relative rounded-xl2 border hairline bg-card dark:bg-night-2 p-6 overflow-hidden hover:shadow-lift hover:border-cobalt/30 hover:-translate-y-1 transition-all duration-300">
            <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-cobalt-50 dark:bg-cobalt/10 group-hover:scale-150 transition-transform duration-500" />
            <div className="relative flex items-start justify-between">
              <div className="text-3xl">{c.icon}</div>
              <Icon name="arrow-up-right" size={18} className="text-muted-2 group-hover:text-cobalt dark:group-hover:text-cobalt-lt group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
            <div className="relative mt-8">
              <div className="font-serif text-xl text-ink dark:text-paper group-hover:text-cobalt dark:group-hover:text-cobalt-lt transition-colors">{c.name}</div>
              <div className="mt-1 text-xs text-muted dark:text-paper/50"><span className="tabnum font-medium">{c.count}</span> judul tersedia</div>
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
    <section className="border-y hairline bg-paper-2/40 dark:bg-night-2/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
        <div className="flex items-end justify-between gap-6 mb-12">
          <div>
            <Reveal><Eyebrow>Baru Tiba</Eyebrow></Reveal>
            <Reveal delay={80}>
              <h2 className="mt-5 font-serif text-3xl lg:text-5xl text-ink dark:text-paper" style={{ textWrap: 'balance' }}>
                Koleksi terbaru di rak kami
              </h2>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <a href="#/katalog/buku" className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-ink dark:text-paper hover:text-cobalt dark:hover:text-cobalt-lt group">
              Lihat semua <Icon name="arrow-right" size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </Reveal>
        </div>

        <Stagger step={50} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
          {books.map((b) => <BookCard key={b.id} book={b} size="md" />)}
        </Stagger>
      </div>
    </section>
  );
}

/* ─────────── HOW TO BORROW ─────────── */
function HowToBorrow() {
  const steps = [
    { num: '1', icon: 'search',   title: 'Cari & Temukan',  body: 'Telusuri katalog daring, gunakan filter kategori, penulis, atau ketersediaan untuk menemukan buku.' },
    { num: '2', icon: 'bookmark', title: 'Reservasi Online', body: 'Klik "Pinjam" pada halaman buku. Reservasi langsung tercatat di akun anggotamu.' },
    { num: '3', icon: 'pin',      title: 'Ambil di Rak',     body: 'Datang ke perpustakaan, tunjukkan kode reservasi, ambil di lokasi rak yang tertera.' },
    { num: '4', icon: 'check',    title: 'Baca & Kembalikan', body: 'Pinjam hingga 14 hari. Perpanjang sekali lewat akun jika butuh waktu lebih.' },
  ];
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <Reveal><Eyebrow className="mx-auto">Cara Meminjam</Eyebrow></Reveal>
        <Reveal delay={80}>
          <h2 className="mt-5 font-serif text-3xl lg:text-5xl text-ink dark:text-paper" style={{ textWrap: 'balance' }}>
            Empat langkah, bukumu di tangan
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <p className="mt-4 text-muted dark:text-paper/60">Proses sederhana dan transparan — dari pencarian hingga buku sampai di tanganmu.</p>
        </Reveal>
      </div>

      <Stagger step={90} className="flex flex-col lg:flex-row gap-10 lg:gap-6">
        {steps.map((s, i) => <Step key={i} {...s} last={i === steps.length - 1} />)}
      </Stagger>
    </section>
  );
}

/* ─────────── TRENDING ─────────── */
function TrendingSection({ books }) {
  const [hero, ...rest] = books;
  return (
    <section className="border-y hairline bg-ink dark:bg-night-2 text-paper">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
        <div className="flex items-end justify-between gap-6 mb-12">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cobalt/20 text-cobalt-lt text-[11px] font-semibold uppercase tracking-editorial">
                <span className="w-1.5 h-1.5 rounded-full bg-cobalt-lt animate-pulse" /> Paling Dicari
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-5 font-serif text-3xl lg:text-5xl" style={{ textWrap: 'balance' }}>
                Sedang ramai dipinjam <em className="text-cobalt-lt">minggu ini</em>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <a href="#/top" className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-paper hover:text-cobalt-lt group">
              Top 20 <Icon name="arrow-right" size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </Reveal>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Featured #1 */}
          <Reveal className="col-span-12 lg:col-span-5">
            <a href={`#/buku/${hero.id}`} className="group block rounded-xl2 border border-white/10 bg-night-3/60 dark:bg-night-3 p-7 hover:border-cobalt/40 transition-colors h-full">
              <div className="flex gap-6">
                <div className="shrink-0"><BookCover book={hero} size="lg" /></div>
                <div className="flex flex-col">
                  <span className="inline-flex items-center gap-1.5 self-start px-2.5 py-1 rounded-full bg-amber-400 text-amber-950 text-[10px] font-bold uppercase tracking-editorial">
                    <Icon name="star-fill" size={11} /> #1 Terpopuler
                  </span>
                  <h3 className="mt-4 font-serif text-2xl leading-tight group-hover:text-cobalt-lt transition-colors" style={{ textWrap: 'balance' }}>{hero.title}</h3>
                  <div className="mt-1 text-sm text-paper/60">{hero.author}</div>
                  <p className="mt-3 text-sm text-paper/55 leading-relaxed line-clamp-3">{hero.synopsis}</p>
                  <div className="mt-auto pt-4 flex items-center gap-4 text-xs">
                    <span className="inline-flex items-center gap-1 text-amber-400"><Icon name="star-fill" size={12} /> <span className="tabnum">{hero.rating.toFixed(1)}</span></span>
                    <span className="text-paper/40 tabnum">Dipinjam {borrowCount(hero)}×</span>
                  </div>
                </div>
              </div>
            </a>
          </Reveal>

          {/* List 2-6 */}
          <div className="col-span-12 lg:col-span-7">
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-1">
              {rest.slice(0, 6).map((b, i) => (
                <Reveal key={b.id} delay={i * 50}>
                  <a href={`#/buku/${b.id}`} className="group flex items-center gap-4 py-3.5 border-b border-white/5 hover:border-cobalt/30 transition-colors">
                    <span className="font-serif text-2xl text-paper/30 group-hover:text-cobalt-lt tabnum w-7 transition-colors">{i + 2}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-serif text-base leading-snug group-hover:text-cobalt-lt transition-colors line-clamp-1">{b.title}</div>
                      <div className="text-xs text-paper/45 line-clamp-1">{b.author}</div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="inline-flex items-center gap-1 text-amber-400 text-xs"><Icon name="star-fill" size={11} /> <span className="tabnum">{b.rating.toFixed(1)}</span></div>
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
  const icons = { koleksi:'book', judul:'bookmark', anggota:'user', pinjam:'clock' };
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <Reveal><Eyebrow className="mx-auto">Dalam Angka</Eyebrow></Reveal>
        <Reveal delay={80}>
          <h2 className="mt-5 font-serif text-3xl lg:text-5xl text-ink dark:text-paper" style={{ textWrap: 'balance' }}>
            Perpustakaan yang terus <em className="text-cobalt dark:text-cobalt-lt">bertumbuh</em>
          </h2>
        </Reveal>
      </div>
      <Stagger step={80} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((s) => (
          <StatCard key={s.id} value={s.value} suffix={s.suffix} label={s.label} note={s.note} icon={icons[s.id]} />
        ))}
      </Stagger>

      {/* collection-by-category chart */}
      <Reveal>
        <div className="mt-16 rounded-xl2 border hairline bg-card dark:bg-night-2 p-7 lg:p-10">
          <div className="flex items-end justify-between gap-4 mb-8">
            <div>
              <div className="font-mono uppercase tracking-editorial text-[11px] text-muted dark:text-paper/50">Komposisi Koleksi</div>
              <h3 className="mt-1 font-serif text-2xl text-ink dark:text-paper">Sebaran judul per kategori</h3>
            </div>
            <div className="text-right">
              <div className="font-serif text-3xl text-cobalt dark:text-cobalt-lt tabnum">{CATEGORIES.length}</div>
              <div className="text-xs text-muted dark:text-paper/50">rumpun</div>
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
  const max = Math.max(...CATEGORIES.map(c => c.count));
  return (
    <div ref={ref} className="space-y-3">
      {CATEGORIES.map((c, i) => (
        <a key={c.id} href={`#/katalog/buku?kategori=${c.id}`} className="group grid grid-cols-12 items-center gap-3">
          <div className="col-span-5 sm:col-span-3 flex items-center gap-2 min-w-0">
            <span className="text-base">{c.icon}</span>
            <span className="text-sm text-ink dark:text-paper truncate group-hover:text-cobalt dark:group-hover:text-cobalt-lt transition-colors">{c.name}</span>
          </div>
          <div className="col-span-6 sm:col-span-8">
            <div className="h-7 rounded-full bg-paper-2/70 dark:bg-night-3 overflow-hidden">
              <div
                className="progress-bar h-full rounded-full flex items-center justify-end pr-3"
                style={{
                  width: shown ? `${(c.count / max) * 100}%` : '0%',
                  background: `linear-gradient(90deg, #1F9D73, ${i % 2 ? '#34C690' : '#D2A653'})`,
                  transitionDelay: `${i * 80}ms`,
                }}
              >
                <span className="text-[11px] font-bold text-white tabnum">{c.count}</span>
              </div>
            </div>
          </div>
          <div className="hidden sm:block col-span-1 text-right text-xs text-muted dark:text-paper/45 tabnum">{Math.round((c.count / max) * 100)}%</div>
        </a>
      ))}
    </div>
  );
}

/* ─────────── WHY US ─────────── */
function WhyUs() {
  const feats = [
    { icon: 'book',     title: 'Koleksi Terkurasi',  body: 'Setiap judul dipilih pustakawan, bukan algoritma. Dari sastra kanon hingga sains terkini, semua melalui proses kurasi.' },
    { icon: 'globe',    title: 'Akses Digital 24/7', body: 'Telusuri katalog, reservasi buku, dan akses e-book serta jurnal akademik kapan saja, dari mana saja.' },
    { icon: 'user',     title: 'Untuk Setiap Jenjang', body: 'Melayani siswa SD hingga SMA dengan koleksi yang sesuai usia dan kebutuhan akademik tiap tingkat.' },
    { icon: 'star',     title: 'Program Literasi',   body: 'Klub baca, lomba resensi, dan pelatihan literasi digital yang menumbuhkan kebiasaan membaca sejak dini.' },
  ];
  return (
    <section className="border-y hairline bg-paper-2/40 dark:bg-night-2/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
        <div className="grid grid-cols-12 gap-10 lg:gap-16">
          <div className="col-span-12 lg:col-span-4">
            <Reveal><Eyebrow>Kenapa Kami</Eyebrow></Reveal>
            <Reveal delay={80}>
              <h2 className="mt-5 font-serif text-3xl lg:text-5xl text-ink dark:text-paper leading-tight" style={{ textWrap: 'balance' }}>
                Lebih dari sekadar <em className="text-cobalt dark:text-cobalt-lt">rak buku</em>
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-4 text-muted dark:text-paper/60 leading-relaxed">
                Sejak 1968, kami membangun ruang baca yang tenang, terkurasi, dan menyambut — tempat di mana setiap siswa menemukan bacaan yang tepat.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <Button as="a" href="#/tentang/profil" variant="dark" className="mt-7">
                Tentang Kami <Icon name="arrow-right" size={14} />
              </Button>
            </Reveal>
          </div>
          <div className="col-span-12 lg:col-span-8">
            <Stagger step={70} className="grid sm:grid-cols-2 gap-4">
              {feats.map((f, i) => <FeatureCard key={i} {...f} />)}
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
    <section className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <Reveal><Eyebrow className="mx-auto">Kata Mereka</Eyebrow></Reveal>
        <Reveal delay={80}>
          <h2 className="mt-5 font-serif text-3xl lg:text-5xl text-ink dark:text-paper" style={{ textWrap: 'balance' }}>
            Dipercaya siswa, guru, &amp; <em className="text-cobalt dark:text-cobalt-lt">alumni</em>
          </h2>
        </Reveal>
      </div>
      <Stagger step={70} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {TESTIMONIALS.map((t, i) => {
          const p = COVER_PALETTES[t.palette];
          return (
            <div key={i} className="bracket text-cobalt dark:text-cobalt-lt rounded-xl2 border hairline bg-card dark:bg-night-2 p-6 hover:shadow-lift hover:border-cobalt/40 transition-all duration-300 flex flex-col h-full">
              <div className="text-cobalt dark:text-cobalt-lt"><Rating value={5} size={13} showNum={false} /></div>
              <p className="mt-4 text-sm leading-relaxed text-ink/80 dark:text-paper/75 flex-1">“{t.text}”</p>
              <div className="mt-5 flex items-center gap-3 pt-4 border-t hairline">
                <div className="w-10 h-10 grid place-items-center rounded-full font-serif text-sm shrink-0" style={{ background: p.bg, color: p.ink }}>
                  {t.name.split(' ').map(w => w[0]).slice(0,2).join('')}
                </div>
                <div>
                  <div className="font-semibold text-sm text-ink dark:text-paper">{t.name}</div>
                  <div className="text-[11px] text-muted dark:text-paper/50">{t.role}</div>
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
    <section className="py-16 lg:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 mb-10 text-center">
        <Reveal>
          <p className="text-xs font-mono uppercase tracking-wider-2 text-muted dark:text-paper/50">
            Bekerja sama dengan penerbit tepercaya
          </p>
        </Reveal>
      </div>
      <Marquee>
        {PUBLISHERS.map((p) => (
          <a key={p.id} href={`#/katalog/buku?penerbit=${p.id}`}
            className="group flex items-center gap-3 px-7 py-4 rounded-xl2 border hairline bg-card dark:bg-night-2 hover:border-cobalt/30 hover:shadow-soft transition-all shrink-0">
            <div className="w-9 h-9 grid place-items-center rounded-lg bg-cobalt-50 dark:bg-cobalt/15 text-cobalt dark:text-cobalt-lt"><Icon name="building" size={16} /></div>
            <div>
              <div className="font-serif text-base text-ink dark:text-paper whitespace-nowrap group-hover:text-cobalt dark:group-hover:text-cobalt-lt transition-colors">{p.name}</div>
              <div className="text-[11px] text-muted dark:text-paper/50">{p.city} · sejak {p.founded}</div>
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
    <section className="border-y hairline bg-paper-2/40 dark:bg-night-2/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
        <div className="flex items-end justify-between gap-6 mb-12">
          <div>
            <Reveal><Eyebrow>Kabar Terbaru</Eyebrow></Reveal>
            <Reveal delay={80}>
              <h2 className="mt-5 font-serif text-3xl lg:text-5xl text-ink dark:text-paper" style={{ textWrap: 'balance' }}>
                Berita & kegiatan perpustakaan
              </h2>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <a href="#/berita" className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-ink dark:text-paper hover:text-cobalt dark:hover:text-cobalt-lt group">
              Semua berita <Icon name="arrow-right" size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </Reveal>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <Reveal className="col-span-12 lg:col-span-6">
            <a href={`#/berita/${big.id}`} className="group block rounded-xl2 border hairline bg-card dark:bg-night-2 overflow-hidden hover:shadow-lift hover:border-cobalt/30 transition-all h-full">
              <div className="aspect-[16/10] relative spine-shadow" style={{ background: pBig.bg, color: pBig.ink }}>
                <div className="absolute inset-0 dot-grid opacity-30" />
                <div className="absolute inset-0 p-8 flex flex-col justify-between">
                  <Badge tone="cobalt">{big.category}</Badge>
                  <div className="font-serif italic text-3xl lg:text-4xl leading-tight" style={{ textWrap: 'balance' }}>
                    "{big.title.split(' ').slice(0, 7).join(' ')}…"
                  </div>
                </div>
              </div>
              <div className="p-7">
                <div className="text-[11px] font-mono uppercase tracking-editorial text-muted dark:text-paper/50">{formatDate(big.date)} · {big.minutes} menit baca</div>
                <h3 className="mt-2 font-serif text-2xl text-ink dark:text-paper leading-snug group-hover:text-cobalt dark:group-hover:text-cobalt-lt transition-colors" style={{ textWrap: 'balance' }}>{big.title}</h3>
                <p className="mt-2 text-sm text-muted dark:text-paper/60 line-clamp-2">{big.excerpt}</p>
              </div>
            </a>
          </Reveal>

          <div className="col-span-12 lg:col-span-6 flex flex-col gap-6">
            {rest.map((n, i) => (
              <Reveal key={n.id} delay={i * 80}>
                <a href={`#/berita/${n.id}`} className="group flex gap-5 rounded-xl2 border hairline bg-card dark:bg-night-2 overflow-hidden hover:shadow-lift hover:border-cobalt/30 transition-all">
                  <div className="w-32 shrink-0 relative spine-shadow" style={{ background: COVER_PALETTES[n.palette].bg, color: COVER_PALETTES[n.palette].ink }}>
                    <div className="absolute inset-0 grid place-items-center p-3">
                      <Icon name="book" size={22} style={{ color: COVER_PALETTES[n.palette].accent }} />
                    </div>
                  </div>
                  <div className="py-5 pr-5">
                    <div className="text-[10px] font-mono uppercase tracking-editorial text-cobalt dark:text-cobalt-lt">{n.category} · {formatDate(n.date)}</div>
                    <h3 className="mt-1.5 font-serif text-lg text-ink dark:text-paper leading-snug group-hover:text-cobalt dark:group-hover:text-cobalt-lt transition-colors line-clamp-2" style={{ textWrap: 'balance' }}>{n.title}</h3>
                    <p className="mt-1.5 text-xs text-muted dark:text-paper/55 line-clamp-2">{n.excerpt}</p>
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
    { q: 'Siapa saja yang bisa menjadi anggota?', a: 'Seluruh siswa aktif Yayasan Santo Lukas dari jenjang SD hingga SMA, beserta guru dan staf, otomatis terdaftar sebagai anggota. Alumni dan orang tua dapat mengajukan kartu akses melalui formulir kontak.' },
    { q: 'Berapa lama masa peminjaman buku?', a: 'Masa pinjam standar adalah 14 hari, dengan opsi perpanjangan satu kali (7 hari) yang dapat dilakukan mandiri melalui akun anggota, selama buku tidak sedang diantri anggota lain.' },
    { q: 'Berapa banyak buku yang bisa dipinjam sekaligus?', a: 'Siswa SD dapat meminjam hingga 2 buku, SMP hingga 3 buku, dan SMA hingga 4 buku secara bersamaan. Guru dan staf memiliki kuota khusus.' },
    { q: 'Apakah ada koleksi digital yang bisa diakses dari rumah?', a: 'Ya. Melalui menu Sumber, anggota dapat mengakses e-book, jurnal akademik (JSTOR, Perpusnas), dan tautan riset tepercaya menggunakan kredensial sekolah.' },
    { q: 'Bagaimana jika buku yang saya cari sedang dipinjam?', a: 'Anda dapat menambahkannya ke Wishlist dan mengaktifkan notifikasi. Saat buku tersedia kembali, kami akan mengirim pemberitahuan melalui surel sekolah Anda.' },
  ];
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
      <div className="grid grid-cols-12 gap-10 lg:gap-16">
        <div className="col-span-12 lg:col-span-4">
          <Reveal><Eyebrow>Tanya Jawab</Eyebrow></Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 font-serif text-3xl lg:text-5xl text-ink dark:text-paper leading-tight" style={{ textWrap: 'balance' }}>
              Pertanyaan yang sering diajukan
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-4 text-muted dark:text-paper/60">Belum menemukan jawaban? <a href="#/tentang/kontak" className="text-cobalt dark:text-cobalt-lt font-semibold hover:underline">Hubungi pustakawan</a> kami.</p>
          </Reveal>
        </div>
        <div className="col-span-12 lg:col-span-8">
          <Reveal delay={100}><Accordion items={items} /></Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─────────── CTA JOIN ─────────── */
function CtaJoin() {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-24">
      <Reveal>
        <div className="relative rounded-4xl overflow-hidden bg-cobalt text-white p-10 lg:p-16">
          <div className="absolute inset-0 dot-grid opacity-20" />
          <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -left-10 -bottom-24 w-72 h-72 rounded-full bg-cobalt-dk/40 blur-2xl" />
          <div className="relative grid grid-cols-12 gap-8 items-center">
            <div className="col-span-12 lg:col-span-8">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-white text-[11px] font-semibold uppercase tracking-editorial">
                <Icon name="user" size={12} /> Akun Anggota
              </span>
              <h2 className="mt-5 font-serif text-3xl lg:text-5xl leading-tight" style={{ textWrap: 'balance' }}>
                Masuk untuk mengelola pinjaman & wishlist-mu
              </h2>
              <p className="mt-4 text-white/80 max-w-xl leading-relaxed">
                Pantau buku yang sedang dipinjam, tanggal jatuh tempo, riwayat bacaan, dan simpan judul incaran — semua dalam satu dashboard.
              </p>
            </div>
            <div className="col-span-12 lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <Button as="a" href="#/akun" variant="dark" size="lg" className="!bg-white !text-cobalt hover:!bg-paper w-full">
                Masuk Anggota <Icon name="arrow-right" size={14} />
              </Button>
              <Button as="a" href="#/katalog/buku" variant="ghost" size="lg" className="!text-white border border-white/30 hover:!bg-white/10 w-full">
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
  const picks = ['b008','b013','b019','b023','b029','b004'].map(bookById).filter(Boolean);
  const reasons = ['Karena kamu suka sastra','Sering dipinjam teman sekelas','Genre favoritmu','Penulis yang kamu ikuti','Trending di SMA','Melanjutkan bacaanmu'];
  return (
    <section className="border-y hairline bg-night-2/0 dark:bg-night-2/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
        <div className="flex items-end justify-between gap-6 mb-10">
          <div>
            <Reveal><Eyebrow>Untukmu</Eyebrow></Reveal>
            <Reveal delay={80}>
              <h2 className="mt-5 font-serif text-3xl lg:text-5xl text-ink dark:text-paper" style={{ textWrap: 'balance' }}>
                Rekomendasi <span className="grad-text">yang dipilih</span> untukmu
              </h2>
            </Reveal>
            <Reveal delay={120}><p className="mt-3 text-muted dark:text-paper/60 max-w-xl">Berdasarkan riwayat bacaan dan minat anggota dengan selera serupa.</p></Reveal>
          </div>
          <Reveal delay={140}>
            <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full border hairline bg-card dark:bg-night-2">
              <span className="w-7 h-7 grid place-items-center rounded-full bg-cobalt text-white text-xs font-bold">CW</span>
              <span className="text-sm"><span className="text-muted dark:text-paper/55">Disesuaikan untuk</span> <span className="font-semibold text-ink dark:text-paper">Caesar</span></span>
            </div>
          </Reveal>
        </div>
        <Stagger step={50} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
          {picks.map((b, i) => (
            <div key={b.id} className="group">
              <div className="mb-2"><Tag tone="accent" className="!text-[9px]">{reasons[i]}</Tag></div>
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
  const shelf = ['b001','b004','b007','b013','b018'].map(bookById).filter(Boolean);
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
      <div className="grid grid-cols-12 gap-10 lg:gap-16 items-start">
        <div className="col-span-12 lg:col-span-4">
          <Reveal><Eyebrow>Rak Pilihan Kurator</Eyebrow></Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 font-serif text-3xl lg:text-4xl text-ink dark:text-paper leading-tight" style={{ textWrap: 'balance' }}>
              Lima buku yang <em className="text-cobalt dark:text-cobalt-lt">wajib dibaca</em> sebelum lulus
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <div className="mt-6 p-6 rounded-xl2 border hairline bg-card dark:bg-night-2 bracket text-cobalt dark:text-cobalt-lt">
              <p className="font-quote text-ink dark:text-paper text-lg leading-relaxed"><em className="quote">"Buku-buku ini bukan sekadar bacaan — mereka mengajarkan cara melihat dunia dengan lebih jujur."</em></p>
              <div className="mt-5 flex items-center gap-3">
                <div className="w-11 h-11 rounded-full grid place-items-center text-white font-bold" style={{ background: '#15543F' }}>WS</div>
                <div>
                  <div className="font-semibold text-ink dark:text-paper text-sm">Bapak Wahyu Setiawan</div>
                  <div className="text-xs text-muted dark:text-paper/55">Guru Bahasa Indonesia · Kurator</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
        <div className="col-span-12 lg:col-span-8">
          <Stagger step={60} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
            {shelf.map(b => <BookCard key={b.id} book={b} size="md" />)}
          </Stagger>
        </div>
      </div>
    </section>
  );
}

/* ─────────── EVENTS (Jadwal Klub Baca) ─────────── */
function EventsSection() {
  const events = [
    { d:'21', m:'Mei', day:'Selasa', time:'15.30', title:'Selasa Sastra: Membedah Bumi Manusia', tag:'Klub Baca', loc:'Ruang Baca Utama', seats:'8 kursi tersisa' },
    { d:'28', m:'Mei', day:'Selasa', time:'15.30', title:'Diskusi Filsafat: Pengantar Stoikisme', tag:'Diskusi', loc:'Ruang Diskusi 2', seats:'12 kursi tersisa' },
    { d:'02', m:'Jun', day:'Sabtu',  time:'09.00', title:'Workshop Literasi Digital Kelas X', tag:'Workshop', loc:'Lab Komputer', seats:'Penuh · daftar antri' },
    { d:'07', m:'Jun', day:'Kamis',  time:'14.00', title:'Bedah Buku bersama Penulis Tamu', tag:'Acara', loc:'Aula Yayasan', seats:'24 kursi tersisa' },
  ];
  return (
    <section className="border-y hairline bg-paper-2/40 dark:bg-night-2/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
        <div className="flex items-end justify-between gap-6 mb-12">
          <div>
            <Reveal><Eyebrow>Agenda</Eyebrow></Reveal>
            <Reveal delay={80}>
              <h2 className="mt-5 font-serif text-3xl lg:text-5xl text-ink dark:text-paper" style={{ textWrap: 'balance' }}>
                Acara &amp; jadwal klub baca
              </h2>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <a href="#/berita" className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-ink dark:text-paper hover:text-cobalt dark:hover:text-cobalt-lt group">
              Kalender penuh <Icon name="arrow-right" size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </Reveal>
        </div>
        <Stagger step={70} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {events.map((e, i) => (
            <div key={i} className="group flex items-stretch gap-5 rounded-xl2 border hairline bg-card dark:bg-night-2 p-5 hover:shadow-lift hover:border-cobalt/30 transition-all duration-300">
              <div className="shrink-0 w-20 rounded-xl bg-cobalt text-white grid place-content-center text-center py-3">
                <div className="font-serif text-3xl leading-none tabnum">{e.d}</div>
                <div className="text-[11px] uppercase tracking-editorial mt-1 opacity-90">{e.m}</div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <Tag tone="accent">{e.tag}</Tag>
                  <span className="text-xs text-muted dark:text-paper/50">{e.day} · {e.time} WIB</span>
                </div>
                <h3 className="font-serif text-lg text-ink dark:text-paper leading-snug group-hover:text-cobalt dark:group-hover:text-cobalt-lt transition-colors" style={{ textWrap: 'balance' }}>{e.title}</h3>
                <div className="mt-2 flex items-center gap-4 text-xs text-muted dark:text-paper/55">
                  <span className="inline-flex items-center gap-1"><Icon name="pin" size={12} /> {e.loc}</span>
                  <span className="inline-flex items-center gap-1 text-cobalt dark:text-cobalt-lt font-medium"><Icon name="user" size={12} /> {e.seats}</span>
                </div>
              </div>
              <button className="self-center shrink-0 px-4 py-2 rounded-full border hairline text-xs font-semibold uppercase tracking-editorial text-ink dark:text-paper hover:bg-cobalt hover:text-white hover:border-cobalt transition-colors btn-press">Daftar</button>
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
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
}

Object.assign(window, { HomePage, formatDate });
