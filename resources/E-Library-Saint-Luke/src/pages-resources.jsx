// pages-resources.jsx — Sumber Daring + Berita (list + detail) + Top Reads
const { useState: rUseState, useMemo: rUseMemo } = React;

/* ──────── SUMBER (Resources) ──────── */
function ResourcesPage() {
  const [type, setType] = rUseState('Semua');
  const types = ['Semua', ...Array.from(new Set(RESOURCES.map(r => r.type)))];
  const items = RESOURCES.filter(r => type === 'Semua' || r.type === type);
  const typeIcon = { 'E-Book':'book', 'Jurnal':'bookmark', 'Kursus':'play', 'Riset':'search', 'Ensiklopedi':'globe', 'Video':'play', 'Referensi':'book' };

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-10 pt-12 pb-24">
      <Reveal><Eyebrow>Sumber Daring</Eyebrow></Reveal>
      <div className="mt-5 grid grid-cols-12 gap-8 items-end">
        <div className="col-span-12 lg:col-span-8">
          <Reveal delay={60}>
            <h1 className="font-serif text-4xl lg:text-6xl text-ink dark:text-paper leading-[1.03]" style={{ textWrap: 'balance' }}>
              E-book, jurnal &amp; riset yang kami <em className="text-cobalt dark:text-cobalt-lt">percayai</em>.
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-4 max-w-2xl text-muted dark:text-paper/65">
              Sumber daring terkurasi yang diakses lewat kredensial sekolah atau akses terbuka. Diperiksa pustakawan tiap awal semester.
            </p>
          </Reveal>
        </div>
        <Reveal delay={160} className="col-span-12 lg:col-span-4">
          <div className="rounded-xl2 border hairline bg-card dark:bg-night-2 p-5 flex items-center gap-4">
            <div className="w-12 h-12 grid place-items-center rounded-xl bg-cobalt text-white shrink-0"><Icon name="globe" size={22} /></div>
            <div>
              <div className="font-serif text-2xl text-ink dark:text-paper tabnum">{RESOURCES.length} sumber</div>
              <div className="text-xs text-muted dark:text-paper/55">Akses gratis untuk anggota</div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Filter chips */}
      <div className="mt-10 flex items-center gap-2 overflow-x-auto pb-2">
        {types.map(t => (
          <button
            key={t}
            onClick={() => setType(t)}
            className={`chip shrink-0 px-4 py-2 rounded-full text-sm font-medium border whitespace-nowrap ${type === t ? 'bg-cobalt text-white border-cobalt' : 'hairline text-ink dark:text-paper hover:border-cobalt/40'}`}
          >
            {t}
          </button>
        ))}
      </div>

      <Stagger step={60} className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map(r => {
          const p = COVER_PALETTES[r.palette];
          return (
            <a
              key={r.id}
              href="#/sumber"
              className="group flex flex-col rounded-xl2 border hairline bg-card dark:bg-night-2 overflow-hidden hover:shadow-lift hover:border-cobalt/30 hover:-translate-y-1 transition-all duration-300"
            >
              {/* thumbnail header */}
              <div className="relative h-36 overflow-hidden sheen" style={{ background: p.bg, color: p.ink }}>
                <div className="absolute inset-0 dot-grid opacity-30" />
                <div className="absolute top-4 left-4"><span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-editorial" style={{ background: p.accent, color: p.bg }}><Icon name={typeIcon[r.type] || 'book'} size={11} /> {r.type}</span></div>
                <div className="absolute top-4 right-4 w-8 h-8 grid place-items-center rounded-full border" style={{ borderColor: p.accent + '66', color: p.accent }}><Icon name="external" size={14} /></div>
                <div className="absolute inset-x-5 bottom-4">
                  <div className="font-quote italic text-2xl leading-tight" style={{ color: p.accent }}>{r.tag}</div>
                </div>
              </div>
              {/* body */}
              <div className="flex flex-col flex-1 p-5">
                <h3 className="font-serif text-lg text-ink dark:text-paper leading-snug group-hover:text-cobalt dark:group-hover:text-cobalt-lt transition-colors" style={{ textWrap: 'balance' }}>{r.title}</h3>
                <p className="mt-2 text-sm text-muted dark:text-paper/60 leading-relaxed line-clamp-3">{r.desc}</p>
                <div className="mt-auto pt-4 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-editorial text-muted dark:text-paper/50">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> {r.format}
                  </span>
                  <span className="text-[12px] font-semibold uppercase tracking-editorial text-cobalt dark:text-cobalt-lt inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    Buka <Icon name="arrow-up-right" size={13} />
                  </span>
                </div>
              </div>
            </a>
          );
        })}
      </Stagger>

      {/* Help block */}
      <Reveal>
        <div className="mt-16 rounded-4xl overflow-hidden bg-cobalt text-white p-8 lg:p-12 relative">
          <div className="absolute inset-0 dot-grid opacity-20" />
          <div className="absolute -right-16 -top-16 w-72 h-72 rounded-full bg-white/10 blur-2xl" />
          <div className="relative grid grid-cols-12 gap-8 items-center">
            <div className="col-span-12 lg:col-span-8">
              <h3 className="font-serif text-3xl lg:text-4xl leading-tight" style={{ textWrap: 'balance' }}>Tidak menemukan sumber yang Anda cari?</h3>
              <p className="mt-3 text-white/80 max-w-xl leading-relaxed">Pustakawan dapat membantu mengakses jurnal berbayar lewat kemitraan antar-perpustakaan, atau merekomendasikan alternatif berkualitas.</p>
            </div>
            <div className="col-span-12 lg:col-span-4 lg:text-right">
              <Button as="a" href="#/tentang/kontak" variant="dark" size="lg" className="!bg-white !text-cobalt hover:!bg-paper">
                Hubungi Pustakawan <Icon name="arrow-right" size={14} />
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ──────── BERITA (News list + detail) ──────── */
function NewsThumb({ n, className = '', big = false }) {
  const p = COVER_PALETTES[n.palette];
  const catIcon = { 'Pengumuman':'bookmark', 'Acara':'star', 'Kompetisi':'star-fill', 'Edukasi':'user', 'Koleksi':'book', 'Kemitraan':'globe' };
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ background: p.bg, color: p.ink }}>
      <div className="absolute inset-0 dot-grid opacity-25" />
      <div className="absolute -right-8 -bottom-8 opacity-20">
        <Icon name={catIcon[n.category] || 'book'} size={big ? 150 : 96} />
      </div>
      <div className="absolute inset-0 p-6 flex flex-col justify-between">
        <span className="inline-flex self-start items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-editorial" style={{ background: p.accent, color: p.bg }}>
          <Icon name={catIcon[n.category] || 'book'} size={11} /> {n.category}
        </span>
        <div className={`font-quote italic leading-[1.1] ${big ? 'text-3xl lg:text-4xl' : 'text-xl'}`} style={{ color: p.accent, textWrap: 'balance' }}>
          {n.title.split(' ').slice(0, big ? 7 : 4).join(' ')}…
        </div>
      </div>
    </div>
  );
}

function NewsListPage() {
  const [cat, setCat] = rUseState('Semua');
  const cats = ['Semua', ...Array.from(new Set(NEWS.map(n => n.category)))];
  const list = NEWS.filter(n => cat === 'Semua' || n.category === cat);
  const [featured, ...rest] = list;

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-10 pt-12 pb-24">
      <Reveal><Eyebrow>Berita &amp; Kabar</Eyebrow></Reveal>
      <Reveal delay={60}>
        <h1 className="mt-5 font-serif text-4xl lg:text-6xl text-ink dark:text-paper leading-[1.03]" style={{ textWrap: 'balance' }}>
          Kabar dari <em className="text-cobalt dark:text-cobalt-lt">rak-rak</em> kami.
        </h1>
      </Reveal>
      <Reveal delay={120}>
        <p className="mt-3 max-w-2xl text-muted dark:text-paper/65">
          Pengumuman, acara, kompetisi, dan kabar koleksi langka — diperbarui rutin oleh tim perpustakaan.
        </p>
      </Reveal>

      {/* category chips */}
      <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-2">
        {cats.map(c => (
          <button key={c} onClick={() => setCat(c)}
            className={`chip shrink-0 px-4 py-2 rounded-full text-sm font-medium border whitespace-nowrap ${cat === c ? 'bg-cobalt text-white border-cobalt' : 'hairline text-ink dark:text-paper hover:border-cobalt/40'}`}>
            {c}
          </button>
        ))}
      </div>

      {/* Featured */}
      {featured && (
        <Reveal>
          <a href={`#/berita/${featured.id}`} className="group mt-8 grid grid-cols-12 rounded-xl2 border hairline bg-card dark:bg-night-2 overflow-hidden hover:shadow-lift hover:border-cobalt/30 transition-all">
            <div className="col-span-12 lg:col-span-7"><NewsThumb n={featured} big className="h-60 lg:h-full min-h-[300px] sheen" /></div>
            <div className="col-span-12 lg:col-span-5 p-8 lg:p-10 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-4">
                <Badge tone="cobalt">Sorotan</Badge>
                <span className="text-[11px] font-mono uppercase tracking-editorial text-muted dark:text-paper/50">{formatDate(featured.date)}</span>
              </div>
              <h2 className="font-serif text-2xl lg:text-3xl text-ink dark:text-paper leading-tight group-hover:text-cobalt dark:group-hover:text-cobalt-lt transition-colors" style={{ textWrap: 'balance' }}>{featured.title}</h2>
              <p className="mt-3 text-muted dark:text-paper/65 leading-relaxed line-clamp-3">{featured.excerpt}</p>
              <div className="mt-5 flex items-center gap-3 text-sm">
                <span className="w-8 h-8 rounded-full grid place-items-center text-white text-xs font-bold" style={{ background: '#15543F' }}>{featured.author.split(' ').map(w=>w[0]).slice(0,2).join('')}</span>
                <span className="text-muted dark:text-paper/55">{featured.author} · {featured.minutes} mnt baca</span>
                <Icon name="arrow-right" size={16} className="ml-auto text-cobalt dark:text-cobalt-lt group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </a>
        </Reveal>
      )}

      {/* Grid */}
      <Stagger step={60} className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {rest.map(n => (
          <a key={n.id} href={`#/berita/${n.id}`} className="group flex flex-col rounded-xl2 border hairline bg-card dark:bg-night-2 overflow-hidden hover:shadow-lift hover:border-cobalt/30 hover:-translate-y-1 transition-all duration-300">
            <NewsThumb n={n} className="h-44 sheen" />
            <div className="flex flex-col flex-1 p-5">
              <div className="text-[11px] font-mono uppercase tracking-editorial text-muted dark:text-paper/50">{formatDate(n.date)} · {n.minutes} mnt</div>
              <h3 className="mt-1.5 font-serif text-lg text-ink dark:text-paper leading-snug group-hover:text-cobalt dark:group-hover:text-cobalt-lt transition-colors" style={{ textWrap: 'balance' }}>{n.title}</h3>
              <p className="mt-2 text-sm text-muted dark:text-paper/60 line-clamp-2">{n.excerpt}</p>
              <div className="mt-auto pt-4 flex items-center justify-between text-xs">
                <span className="text-muted dark:text-paper/50">Oleh {n.author}</span>
                <span className="text-cobalt dark:text-cobalt-lt font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all">Baca <Icon name="arrow-right" size={12} /></span>
              </div>
            </div>
          </a>
        ))}
      </Stagger>
    </section>
  );
}

function NewsDetailPage({ id }) {
  const n = NEWS.find(x => x.id === id);
  if (!n) return <NotFound message="Berita tidak ditemukan." />;
  const p = COVER_PALETTES[n.palette];
  const others = NEWS.filter(x => x.id !== id).slice(0, 3);

  return (
    <article className="pb-24">
      {/* Hero */}
      <div className="border-b hairline">
        <div className="max-w-3xl mx-auto px-6 lg:px-10 pt-16 pb-12">
          <nav className="font-mono uppercase tracking-editorial text-[10px] text-muted dark:text-paper/55 flex items-center gap-2 mb-6">
            <a href="#/berita" className="hover:text-cobalt">Berita</a>
            <Icon name="chevron-right" size={10} />
            <span className="text-ink dark:text-paper">{n.category}</span>
          </nav>
          <Tag tone="accent">{n.category}</Tag>
          <h1 className="mt-6 font-serif text-3xl md:text-5xl text-ink dark:text-paper leading-[1.1]" style={{ textWrap: 'balance' }}>
            {n.title}
          </h1>
          <div className="mt-6 text-sm text-muted dark:text-paper/55 font-mono uppercase tracking-editorial flex items-center gap-3">
            <span>{formatDate(n.date)}</span>
            <span>·</span>
            <span>{n.author}</span>
            <span>·</span>
            <span>{n.minutes} menit baca</span>
          </div>
        </div>
      </div>

      {/* Cover */}
      <div
        className="aspect-[16/6] paper-grain spine-shadow"
        style={{ background: p.bg, color: p.ink }}
      >
        <div className="max-w-3xl mx-auto h-full px-6 lg:px-10 flex items-center">
          <div className="font-quote italic text-3xl lg:text-5xl opacity-90 max-w-2xl" style={{ textWrap: 'balance' }}>
            "{n.excerpt}"
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-3xl mx-auto px-6 lg:px-10 pt-16">
        <p className="text-xl leading-[1.7] text-ink/85 dark:text-paper/85 drop-cap" style={{ textWrap: 'pretty' }}>
          {n.body}
        </p>
        <p className="mt-6 text-lg leading-[1.75] text-ink/85 dark:text-paper/85" style={{ textWrap: 'pretty' }}>
          Untuk pertanyaan, mohon hubungi meja referensi atau kirim surel ke alamat resmi perpustakaan.
          Kami berterima kasih atas dukungan komunitas pembaca yang membuat program ini terwujud.
        </p>
        <div className="mt-10 p-6 border hairline bg-card dark:bg-night-2">
          <div className="font-mono uppercase tracking-editorial text-[10px] text-cobalt mb-2">Bagikan</div>
          <div className="flex items-center gap-3 text-sm text-ink/70 dark:text-paper/70">
            <button className="hover:text-cobalt">Salin tautan</button>
            <span className="text-line">·</span>
            <button className="hover:text-cobalt">Email</button>
            <span className="text-line">·</span>
            <button className="hover:text-cobalt">Cetak</button>
          </div>
        </div>
      </div>

      {/* Related */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 mt-24 border-t hairline pt-12">
        <SectionLabel num="↪" label="Berita Lainnya" className="mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-line dark:bg-night-line">
          {others.map(o => {
            const op = COVER_PALETTES[o.palette];
            return (
              <a key={o.id} href={`#/berita/${o.id}`} className="group block bg-card dark:bg-night-2 hover:bg-paper dark:hover:bg-night-3 transition-colors">
                <div className="aspect-[4/3] paper-grain spine-shadow p-6 flex flex-col justify-between" style={{ background: op.bg, color: op.ink }}>
                  <div className="font-mono uppercase tracking-editorial text-[10px]" style={{ color: op.accent }}>
                    {o.category}
                  </div>
                  <div className="font-serif italic text-xl leading-tight" style={{ textWrap: 'balance' }}>
                    "{o.title.split(' ').slice(0,5).join(' ')}…"
                  </div>
                </div>
                <div className="p-5">
                  <div className="text-[11px] font-mono uppercase tracking-editorial text-muted dark:text-paper/55">{formatDate(o.date)}</div>
                  <h3 className="mt-1 font-serif text-lg text-ink dark:text-paper group-hover:text-cobalt leading-snug" style={{ textWrap: 'balance' }}>{o.title}</h3>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </article>
  );
}

/* ──────── TOP READS ──────── */
function PodiumCard({ book, rank, champion = false }) {
  const medal = { 1: { bg:'#C9A24E', label:'Emas', ring:'#D2A653' }, 2: { bg:'#A8B0B8', label:'Perak', ring:'#C2CAD2' }, 3: { bg:'#B07A4A', label:'Perunggu', ring:'#C99060' } }[rank];
  return (
    <a href={`#/buku/${book.id}`} className={`group block rounded-xl2 border bg-card dark:bg-night-2 overflow-hidden hover:shadow-lift transition-all duration-300 ${champion ? 'border-cobalt/40 dark:border-cobalt/50 lg:scale-[1.04]' : 'hairline hover:border-cobalt/30'}`}>
      <div className={`relative flex items-end justify-center pt-8 pb-5 ${champion ? 'bg-cobalt/[.06] dark:bg-cobalt/[.1]' : 'bg-paper-2/40 dark:bg-night-3/40'}`}>
        <div className="absolute inset-0 dot-grid opacity-30" />
        {/* medal */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5">
          <span className="w-9 h-9 grid place-items-center rounded-full font-serif text-base text-white shadow-md tabnum" style={{ background: medal.bg }}>{rank}</span>
          {champion && <span className="px-2 py-1 rounded-full bg-cobalt text-white text-[9px] font-bold uppercase tracking-editorial">Juara</span>}
        </div>
        <div className="absolute top-3 right-3 z-10"><BookmarkButton book={book} /></div>
        <div className="relative"><BookCover book={book} size={champion ? 'lg' : 'md'} /></div>
      </div>
      <div className="p-5 text-center">
        <h3 className={`font-serif text-ink dark:text-paper leading-snug group-hover:text-cobalt dark:group-hover:text-cobalt-lt transition-colors ${champion ? 'text-xl' : 'text-lg'}`} style={{ textWrap: 'balance' }}>{book.title}</h3>
        <div className="mt-1 text-sm text-muted dark:text-paper/55">{book.author}</div>
        <div className="mt-3 flex items-center justify-center gap-3 text-xs">
          <span className="inline-flex items-center gap-1 text-brass-lt"><Icon name="star-fill" size={12} /> <span className="text-ink dark:text-paper tabnum font-medium">{book.rating.toFixed(1)}</span></span>
          <span className="text-line dark:text-night-line">·</span>
          <span className="text-muted dark:text-paper/50 tabnum">Dipinjam {borrowCount(book)}×</span>
        </div>
      </div>
    </a>
  );
}

function TopReadsPage() {
  const top = [...BOOKS].sort((a,b) => b.popularity - a.popularity).slice(0, 20);
  const podium = top.slice(0, 3);
  const rest = top.slice(3);

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-10 pt-12 pb-24">
      <div className="font-mono uppercase tracking-editorial text-[10px] text-cobalt">Pilihan Pembaca</div>
      <h1 className="mt-3 font-serif text-4xl lg:text-6xl text-ink dark:text-paper" style={{ textWrap: 'balance' }}>
        Dua puluh judul yang paling sering <em className="text-cobalt">dicari</em> semester ini.
      </h1>
      <p className="mt-4 max-w-2xl text-ink/70 dark:text-paper/65">
        Diurutkan berdasarkan jumlah peminjaman dari Januari hingga Mei 2026. Daftar diperbarui mingguan.
      </p>

      {/* Podium — medal cards, no overlap */}
      <div className="mt-16 grid grid-cols-12 gap-6 items-end">
        <Reveal className="col-span-12 sm:col-span-4 order-2 sm:order-1">
          <PodiumCard book={podium[1]} rank={2} />
        </Reveal>
        <Reveal delay={120} className="col-span-12 sm:col-span-4 order-1 sm:order-2">
          <PodiumCard book={podium[0]} rank={1} champion />
        </Reveal>
        <Reveal delay={240} className="col-span-12 sm:col-span-4 order-3">
          <PodiumCard book={podium[2]} rank={3} />
        </Reveal>
      </div>

      {/* Rest as list */}
      <div className="mt-20 border-t hairline">
        <ol className="divide-y hairline">
          {rest.map((b, i) => (
            <Reveal key={b.id} delay={i * 40}>
              <li>
                <a href={`#/buku/${b.id}`} className="flex items-center gap-6 py-5 group">
                  <span className="font-serif italic text-4xl text-cobalt/60 tabnum w-12 text-right">
                    {String(i + 4).padStart(2, '0')}
                  </span>
                  <BookCover book={b} size="xs" />
                  <div className="flex-1 min-w-0">
                    <div className="font-serif text-lg text-ink dark:text-paper group-hover:text-cobalt line-clamp-1">{b.title}</div>
                    <div className="text-sm text-muted dark:text-paper/55 line-clamp-1">{b.author} · {b.year}</div>
                  </div>
                  <div className="hidden sm:block">
                    <Rating value={b.rating} size={11} showNum={false} />
                  </div>
                  <span className="hidden md:inline font-mono uppercase tracking-editorial text-[10px] text-muted dark:text-paper/55 tabnum">
                    {b.popularity}%
                  </span>
                  <Icon name="arrow-up-right" size={14} className="text-ink/30 group-hover:text-cobalt hidden sm:block" />
                </a>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

Object.assign(window, { ResourcesPage, NewsListPage, NewsDetailPage, TopReadsPage });
