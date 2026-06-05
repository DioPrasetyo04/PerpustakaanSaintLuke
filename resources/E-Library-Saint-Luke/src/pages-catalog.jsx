// pages-catalog.jsx — Halaman Katalog Buku (with filter sidebar)
const { useState: cUseState, useMemo: cUseMemo, useEffect: cUseEffect } = React;

function CatalogPage({ route }) {
  const initialCat = route?.query?.kategori || '';
  const initialPub = route?.query?.penerbit || '';
  const initialAut = route?.query?.penulis  || '';
  const initialQ   = route?.query?.q        || '';

  const [filters, setFilters] = cUseState({
    q: initialQ,
    category: initialCat,
    publisher: initialPub,
    author: initialAut,
    availability: 'all', // all | available | limited
    sort: 'popular',     // popular | newest | rating | title
    yearMin: 2005,
    yearMax: 2026,
    attachments: [],     // pdf, audio, video, image
    types: [],           // digital, fisik, keduanya
  });
  const [view, setView] = cUseState('grid');
  const [page, setPage] = cUseState(1);
  const [showFilter, setShowFilter] = cUseState(false);
  const [loading, setLoading] = cUseState(false);
  const perPage = 12;

  cUseEffect(() => { setPage(1); }, [filters]);
  cUseEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 320);
    return () => clearTimeout(t);
  }, [filters, page]);

  const filtered = cUseMemo(() => {
    let arr = BOOKS.slice();
    if (filters.q) {
      const q = filters.q.toLowerCase();
      arr = arr.filter(b => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q) || b.isbn.includes(q));
    }
    if (filters.category) arr = arr.filter(b => b.category === filters.category);
    if (filters.publisher) arr = arr.filter(b => b.publisher === filters.publisher);
    if (filters.author) arr = arr.filter(b => b.authorId === filters.author);
    if (filters.availability === 'available') arr = arr.filter(b => b.available > 0);
    if (filters.availability === 'limited') arr = arr.filter(b => b.available > 0 && b.available / b.copies < .4);
    arr = arr.filter(b => b.year >= filters.yearMin && b.year <= filters.yearMax);
    if (filters.types.length) arr = arr.filter(b => filters.types.includes(b.type));
    if (filters.attachments.length) arr = arr.filter(b => filters.attachments.every(a => (b.attachments || []).includes(a)));

    if (filters.sort === 'popular') arr.sort((a,b) => b.popularity - a.popularity);
    if (filters.sort === 'newest')  arr.sort((a,b) => b.year - a.year);
    if (filters.sort === 'rating')  arr.sort((a,b) => b.rating - a.rating);
    if (filters.sort === 'title')   arr.sort((a,b) => a.title.localeCompare(b.title));
    return arr;
  }, [filters]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const visible = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-10 pt-12 pb-24">
      {/* Header */}
      <div className="mb-10">
        <div className="font-mono uppercase tracking-editorial text-[10px] text-cobalt">
          Katalog
        </div>
        <h1 className="mt-3 font-serif text-4xl lg:text-5xl text-ink dark:text-paper" style={{ textWrap: 'balance' }}>
          Seluruh koleksi, satu tempat.
        </h1>
        <p className="mt-3 max-w-2xl text-ink/70 dark:text-paper/65">
          {filtered.length.toLocaleString('id-ID')} dari {BOOKS.length} judul ditampilkan
          {filters.category && <> · kategori <em className="text-cobalt">{categoryById(filters.category)?.name}</em></>}
          {filters.author && <> · penulis <em className="text-cobalt">{authorById(filters.author)?.name}</em></>}
          {filters.publisher && <> · penerbit <em className="text-cobalt">{publisherById(filters.publisher)?.name}</em></>}
        </p>
      </div>

      {/* Quick category chips */}
      <div className="mb-6 flex items-center gap-2 overflow-x-auto pb-2 -mx-1 px-1">
        <button
          onClick={() => setFilters({ ...filters, category: '' })}
          className={`chip shrink-0 px-4 py-2 rounded-full text-sm font-medium border whitespace-nowrap ${!filters.category ? 'bg-cobalt text-white border-cobalt' : 'hairline text-ink dark:text-paper hover:border-cobalt/40'}`}
        >
          Semua
        </button>
        {CATEGORIES.map(c => (
          <button
            key={c.id}
            onClick={() => setFilters({ ...filters, category: filters.category === c.id ? '' : c.id })}
            className={`chip shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border whitespace-nowrap ${filters.category === c.id ? 'bg-cobalt text-white border-cobalt' : 'hairline text-ink dark:text-paper hover:border-cobalt/40'}`}
          >
            <span>{c.icon}</span> {c.name}
          </button>
        ))}
      </div>

      {/* Active filter chips */}
      {(filters.q || filters.author || filters.publisher || filters.availability !== 'all' || filters.types.length || filters.attachments.length || filters.yearMin !== 2005 || filters.yearMax !== 2026) && (
        <div className="mb-6 flex items-center gap-2 flex-wrap">
          <span className="text-xs font-mono uppercase tracking-editorial text-muted dark:text-paper/50">Filter aktif:</span>
          {filters.q && <FilterChip label={`"${filters.q}"`} onRemove={() => setFilters({ ...filters, q: '' })} />}
          {filters.author && <FilterChip label={authorById(filters.author)?.name} onRemove={() => setFilters({ ...filters, author: '' })} />}
          {filters.publisher && <FilterChip label={publisherById(filters.publisher)?.name} onRemove={() => setFilters({ ...filters, publisher: '' })} />}
          {filters.availability !== 'all' && <FilterChip label={filters.availability === 'available' ? 'Tersedia' : 'Terbatas'} onRemove={() => setFilters({ ...filters, availability: 'all' })} />}
          {filters.types.map(tp => <FilterChip key={tp} label={BOOK_TYPES[tp].label} onRemove={() => setFilters({ ...filters, types: filters.types.filter(x=>x!==tp) })} />)}
          {filters.attachments.map(at => <FilterChip key={at} label={ATTACH_META[at].label} onRemove={() => setFilters({ ...filters, attachments: filters.attachments.filter(x=>x!==at) })} />)}
          {(filters.yearMin !== 2005 || filters.yearMax !== 2026) && <FilterChip label={`${filters.yearMin}–${filters.yearMax}`} onRemove={() => setFilters({ ...filters, yearMin:2005, yearMax:2026 })} />}
          <button onClick={() => setFilters({ q:'', category:filters.category, publisher:'', author:'', availability:'all', sort:filters.sort, yearMin:2005, yearMax:2026, attachments:[], types:[] })} className="text-xs text-cobalt dark:text-cobalt-lt font-semibold hover:underline ml-1">Bersihkan</button>
        </div>
      )}

      <div className="grid grid-cols-12 gap-8">
        {/* Sidebar */}
        <aside className={`col-span-12 lg:col-span-3 ${showFilter ? '' : 'hidden lg:block'}`}>
          <FilterSidebar filters={filters} setFilters={setFilters} onClose={() => setShowFilter(false)} />
        </aside>

        {/* Main */}
        <div className="col-span-12 lg:col-span-9">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-y hairline py-4 mb-8">
            <button
              onClick={() => setShowFilter(s => !s)}
              className="lg:hidden inline-flex items-center gap-2 text-sm text-ink dark:text-paper"
            >
              <Icon name="filter" size={14} /> Filter
            </button>
            <div className="flex items-center gap-2 ml-auto">
              <span className="hidden sm:inline text-xs font-mono uppercase tracking-editorial text-muted dark:text-paper/55">
                Urut
              </span>
              <select
                value={filters.sort}
                onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
                className="text-sm bg-card dark:bg-night-2 border hairline rounded-full px-4 py-2 outline-none focus:border-cobalt"
              >
                <option value="popular">Terpopuler</option>
                <option value="newest">Terbaru</option>
                <option value="rating">Penilaian</option>
                <option value="title">Judul A–Z</option>
              </select>
              <div className="inline-flex border hairline rounded-full overflow-hidden">
                <button
                  onClick={() => setView('grid')}
                  className={`w-10 h-9 grid place-items-center ${view === 'grid' ? 'bg-ink text-paper dark:bg-card dark:text-ink' : 'text-ink/60 dark:text-paper/60'}`}
                  aria-label="Tampilan grid"
                  aria-pressed={view === 'grid'}
                >
                  <Icon name="grid" size={14} />
                </button>
                <button
                  onClick={() => setView('list')}
                  className={`w-10 h-9 grid place-items-center ${view === 'list' ? 'bg-ink text-paper dark:bg-card dark:text-ink' : 'text-ink/60 dark:text-paper/60'}`}
                  aria-label="Tampilan daftar"
                  aria-pressed={view === 'list'}
                >
                  <Icon name="list" size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Results */}
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
              {Array.from({length: 8}).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : visible.length === 0 ? (
            <EmptyResults onClear={() => setFilters({ q:'', category:'', publisher:'', author:'', availability:'all', sort:'popular', yearMin:2005, yearMax:2026, attachments:[], types:[] })} />
          ) : view === 'grid' ? (
            <Stagger step={50} className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
              {visible.map((b) => <BookCard key={b.id} book={b} />)}
            </Stagger>
          ) : (
            <div className="divide-y hairline">
              {visible.map((b) => (
                <Reveal key={b.id}>
                  <a href={`#/buku/${b.id}`} className="flex gap-5 py-5 group">
                    <BookCover book={b} size="sm" />
                    <div className="flex-1 min-w-0">
                      <div className="font-serif text-xl text-ink dark:text-paper group-hover:text-cobalt">{b.title}</div>
                      <div className="text-sm text-muted dark:text-paper/55">{b.author} · {publisherById(b.publisher)?.name} · {b.year}</div>
                      <p className="mt-2 text-sm text-ink/70 dark:text-paper/65 line-clamp-2 max-w-3xl">{b.synopsis}</p>
                      <div className="mt-3 flex items-center gap-3 flex-wrap">
                        <Rating value={b.rating} size={12} />
                        <AvailabilityPill available={b.available} copies={b.copies} />
                        <span className="font-mono text-[10px] uppercase tracking-editorial text-muted dark:text-paper/55">Rak {b.rack}</span>
                      </div>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-between border-t hairline pt-6">
              <span className="text-xs font-mono uppercase tracking-editorial text-muted dark:text-paper/55">
                Halaman <span className="text-ink dark:text-paper tabnum">{page}</span> dari <span className="tabnum">{totalPages}</span>
              </span>
              <div className="flex items-center gap-2">
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                  className="w-10 h-10 grid place-items-center rounded-full border hairline disabled:opacity-30 hover:border-cobalt hover:text-cobalt transition-colors">
                  <Icon name="chevron-left" size={14} />
                </button>
                {Array.from({length: totalPages}).slice(0, 5).map((_, i) => {
                  const p = i + 1;
                  return (
                    <button key={p} onClick={() => setPage(p)}
                      className={`w-10 h-10 grid place-items-center rounded-full text-sm tabnum transition-colors ${p === page ? 'bg-cobalt text-white' : 'border hairline hover:border-cobalt hover:text-cobalt'}`}>
                      {p}
                    </button>
                  );
                })}
                <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                  className="w-10 h-10 grid place-items-center rounded-full border hairline disabled:opacity-30 hover:border-cobalt hover:text-cobalt transition-colors">
                  <Icon name="chevron-right" size={14} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* FilterSidebar */
function FilterSidebar({ filters, setFilters, onClose }) {
  const set = (k, v) => setFilters({ ...filters, [k]: v });
  const filterGroup = (label) => (
    <div className="font-mono uppercase tracking-editorial text-[10px] text-muted dark:text-paper/55 mb-3">{label}</div>
  );
  return (
    <div className="bg-card dark:bg-night-2 border hairline rounded-xl2 p-6 sticky top-32">
      <div className="flex items-center justify-between mb-6">
        <div className="font-serif text-xl text-ink dark:text-paper">Filter</div>
        <button onClick={() => setFilters({ q:'', category:'', publisher:'', author:'', availability:'all', sort:filters.sort, yearMin:2005, yearMax:2026, attachments:[], types:[] })} className="text-xs text-cobalt hover:text-cobalt-dk">
          Reset
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        {filterGroup('Cari dalam katalog')}
        <SearchField compact onSubmit={(t) => set('q', t)} />
        {filters.q && (
          <div className="mt-2 text-xs text-muted dark:text-paper/55">
            Hasil untuk <span className="text-ink dark:text-paper">"{filters.q}"</span>
            <button onClick={() => set('q', '')} className="ml-2 text-cobalt">×</button>
          </div>
        )}
      </div>

      {/* Availability */}
      <div className="mb-6">
        {filterGroup('Ketersediaan')}
        <div className="space-y-2">
          {[
            { v: 'all',       label: 'Semua' },
            { v: 'available', label: 'Tersedia untuk dipinjam' },
            { v: 'limited',   label: 'Persediaan terbatas' },
          ].map(o => (
            <label key={o.v} className="flex items-center gap-2.5 text-sm cursor-pointer text-ink/80 dark:text-paper/75 hover:text-cobalt">
              <input
                type="radio"
                name="avail"
                checked={filters.availability === o.v}
                onChange={() => set('availability', o.v)}
                className="accent-cobalt"
              />
              {o.label}
            </label>
          ))}
        </div>
      </div>

      {/* Tipe Koleksi */}
      <div className="mb-6">
        {filterGroup('Tipe Koleksi')}
        <div className="space-y-2">
          {Object.entries(BOOK_TYPES).map(([key, m]) => {
            const on = filters.types.includes(key);
            return (
              <label key={key} className="flex items-center gap-2.5 text-sm cursor-pointer text-ink/80 dark:text-paper/75 hover:text-cobalt">
                <input type="checkbox" checked={on} onChange={() => set('types', on ? filters.types.filter(x=>x!==key) : [...filters.types, key])} className="accent-cobalt" />
                <Icon name={m.icon} size={14} className="text-muted dark:text-paper/50" />
                <span className="flex-1">{m.label}</span>
                {!m.borrowable && <span className="text-[9px] font-mono uppercase tracking-editorial text-amber-600 dark:text-amber-300">rak</span>}
              </label>
            );
          })}
        </div>
        <p className="mt-2 text-[11px] text-muted-2 leading-snug">Digital &amp; Fisik+Digital dapat dipinjam daring. Fisik hanya di rak.</p>
      </div>

      {/* Lampiran */}
      <div className="mb-6">
        {filterGroup('Lampiran')}
        <div className="flex flex-wrap gap-2">
          {Object.entries(ATTACH_META).map(([key, m]) => {
            const on = filters.attachments.includes(key);
            return (
              <button key={key} onClick={() => set('attachments', on ? filters.attachments.filter(x=>x!==key) : [...filters.attachments, key])}
                className={`chip inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${on ? 'bg-cobalt text-white border-cobalt' : 'hairline text-ink dark:text-paper hover:border-cobalt/40'}`}>
                <Icon name={m.icon} size={12} /> {m.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tahun Publikasi */}
      <div className="mb-6">
        {filterGroup('Tahun Publikasi')}
        <YearRange
          min={2005} max={2026}
          valueMin={filters.yearMin} valueMax={filters.yearMax}
          onChange={(lo, hi) => setFilters({ ...filters, yearMin: lo, yearMax: hi })}
        />
      </div>

      {/* Category */}
      <div className="mb-6">
        {filterGroup('Kategori')}
        <div className="space-y-1.5 max-h-[260px] overflow-y-auto pr-1">
          <FilterButton active={!filters.category} onClick={() => set('category', '')}>Semua kategori</FilterButton>
          {CATEGORIES.map(c => (
            <FilterButton key={c.id} active={filters.category === c.id} onClick={() => set('category', c.id)}>
              <span className="flex-1 text-left">{c.name}</span>
              <span className="text-[10px] font-mono opacity-60 tabnum">{c.count}</span>
            </FilterButton>
          ))}
        </div>
      </div>

      {/* Publisher */}
      <div className="mb-6">
        {filterGroup('Penerbit')}
        <select
          value={filters.publisher}
          onChange={(e) => set('publisher', e.target.value)}
          className="w-full bg-paper dark:bg-night-3 border hairline rounded-lg px-3 py-2.5 text-sm outline-none focus:border-cobalt"
        >
          <option value="">Semua penerbit</option>
          {PUBLISHERS.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
      </div>

      {/* Author */}
      <div>
        {filterGroup('Penulis')}
        <select
          value={filters.author}
          onChange={(e) => set('author', e.target.value)}
          className="w-full bg-paper dark:bg-night-3 border hairline rounded-lg px-3 py-2.5 text-sm outline-none focus:border-cobalt"
        >
          <option value="">Semua penulis</option>
          {AUTHORS.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
        </select>
      </div>

      {onClose && (
        <button onClick={onClose} className="lg:hidden mt-6 w-full bg-ink text-paper py-2 text-sm uppercase tracking-editorial">
          Terapkan
        </button>
      )}
    </div>
  );
}

function FilterChip({ label, onRemove }) {
  return (
    <span className="chip inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cobalt-50 dark:bg-cobalt/15 text-cobalt dark:text-cobalt-lt text-xs font-medium">
      {label}
      <button onClick={onRemove} aria-label="Hapus filter" className="hover:bg-cobalt/20 rounded-full w-4 h-4 grid place-items-center">
        <Icon name="close" size={11} />
      </button>
    </span>
  );
}

function YearRange({ min, max, valueMin, valueMax, onChange }) {
  const lo = Math.max(min, Math.min(valueMin, valueMax));
  const hi = Math.min(max, Math.max(valueMin, valueMax));
  const pct = (v) => ((v - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="px-2.5 py-1 rounded-lg bg-cobalt-50 dark:bg-cobalt/15 text-cobalt dark:text-cobalt-lt text-sm font-semibold tabnum">{lo}</span>
        <span className="text-muted-2 text-xs">—</span>
        <span className="px-2.5 py-1 rounded-lg bg-cobalt-50 dark:bg-cobalt/15 text-cobalt dark:text-cobalt-lt text-sm font-semibold tabnum">{hi}</span>
      </div>
      <div className="relative h-6 flex items-center">
        <div className="absolute inset-x-0 h-1.5 rounded-full bg-paper-2 dark:bg-night-3" />
        <div className="absolute h-1.5 rounded-full bg-cobalt" style={{ left: `${pct(lo)}%`, right: `${100 - pct(hi)}%` }} />
        <input type="range" min={min} max={max} value={lo}
          onChange={(e) => { const v = Math.min(+e.target.value, hi); onChange(v, hi); }}
          className="yr-range absolute inset-x-0 w-full appearance-none bg-transparent pointer-events-none" aria-label="Tahun minimum" />
        <input type="range" min={min} max={max} value={hi}
          onChange={(e) => { const v = Math.max(+e.target.value, lo); onChange(lo, v); }}
          className="yr-range absolute inset-x-0 w-full appearance-none bg-transparent pointer-events-none" aria-label="Tahun maksimum" />
      </div>
      <div className="flex items-center justify-between mt-1 text-[10px] text-muted-2 tabnum">
        <span>{min}</span><span>{max}</span>
      </div>
    </div>
  );
}

function FilterButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left text-sm py-2 px-3 rounded-lg flex items-center justify-between transition-colors
        ${active ? 'bg-cobalt/10 text-cobalt' : 'text-ink/75 dark:text-paper/75 hover:bg-ink/[.04] dark:hover:bg-card/[.04]'}`}
    >
      {children}
    </button>
  );
}

function EmptyResults({ onClear }) {
  return (
    <div className="border hairline rounded-xl2 p-16 text-center bg-card dark:bg-night-2">
      <div className="font-serif italic text-5xl text-cobalt/40 mb-4">"?"</div>
      <h3 className="font-serif text-2xl text-ink dark:text-paper">Tidak ada hasil yang cocok</h3>
      <p className="mt-2 text-sm text-ink/65 dark:text-paper/65">Coba ubah filter atau cari dengan kata kunci yang berbeda.</p>
      <Button variant="primary" className="mt-6" onClick={onClear}>Bersihkan filter</Button>
    </div>
  );
}

/* ────────── Kategori page ────────── */
function CategoryPage() {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-10 pt-12 pb-24">
      <div className="font-mono uppercase tracking-editorial text-[10px] text-cobalt">Katalog</div>
      <h1 className="mt-3 font-serif text-4xl lg:text-5xl text-ink dark:text-paper">Indeks Kategori</h1>
      <p className="mt-3 max-w-2xl text-ink/70 dark:text-paper/65">
        Sembilan rumpun yang merangkum seluruh koleksi. Klik untuk menelusuri.
      </p>

      <div className="mt-12 grid grid-cols-12 gap-4">
        {CATEGORIES.map((c, i) => (
          <Reveal key={c.id} delay={i * 50} className={`col-span-12 sm:col-span-6 lg:col-span-4 ${i === 0 ? 'lg:col-span-8 lg:row-span-2' : ''}`}>
            <a
              href={`#/katalog/buku?kategori=${c.id}`}
              className={`group relative flex flex-col justify-between rounded-xl2 border hairline bg-card dark:bg-night-2 hover:shadow-lift hover:border-cobalt/30 hover:-translate-y-1 transition-all duration-300 p-8 h-full overflow-hidden
                ${i === 0 ? 'min-h-[280px]' : 'min-h-[180px]'}`}
            >
              <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-cobalt-50 dark:bg-cobalt/10 group-hover:scale-150 transition-transform duration-500" />
              <div className={`relative ${i === 0 ? 'text-5xl' : 'text-3xl'}`}>{c.icon}</div>
              <div className="relative">
                <div className={`font-serif text-ink dark:text-paper group-hover:text-cobalt dark:group-hover:text-cobalt-lt transition-colors ${i === 0 ? 'text-4xl' : 'text-xl'}`}>
                  {c.name}
                </div>
                <div className="mt-1 font-mono text-[10px] text-muted dark:text-paper/55 uppercase tracking-editorial">
                  <span className="tabnum">{c.count}</span> judul tersedia
                </div>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ────────── Penerbit page ────────── */
function PublishersPage() {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-10 pt-12 pb-24">
      <div className="font-mono uppercase tracking-editorial text-[10px] text-cobalt">Katalog</div>
      <h1 className="mt-3 font-serif text-4xl lg:text-5xl text-ink dark:text-paper">Penerbit</h1>
      <p className="mt-3 max-w-2xl text-ink/70 dark:text-paper/65">
        Rumah-rumah penerbitan di balik koleksi kami — dari penerbit klasik hingga independen.
      </p>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {PUBLISHERS.map((p, i) => (
          <Reveal key={p.id} delay={i * 50}>
            <a href={`#/katalog/buku?penerbit=${p.id}`} className="group block rounded-xl2 border hairline bg-card dark:bg-night-2 hover:shadow-lift hover:border-cobalt/30 hover:-translate-y-1 transition-all duration-300 p-8 h-full">
              <div className="flex items-start justify-between">
                <div className="w-11 h-11 grid place-items-center rounded-xl bg-cobalt-50 dark:bg-cobalt/15 text-cobalt dark:text-cobalt-lt group-hover:scale-110 transition-transform"><Icon name="building" size={20} /></div>
                <span className="font-mono text-[10px] uppercase tracking-editorial text-muted dark:text-paper/55">
                  Sejak <span className="tabnum">{p.founded}</span>
                </span>
              </div>
              <div className="mt-6 font-serif text-2xl text-ink dark:text-paper group-hover:text-cobalt dark:group-hover:text-cobalt-lt transition-colors">{p.name}</div>
              <div className="mt-1 text-sm text-muted dark:text-paper/55">{p.city}, Indonesia</div>
              <div className="mt-6 flex items-end justify-between">
                <div>
                  <div className="font-serif text-4xl text-ink dark:text-paper tabnum">{p.books}</div>
                  <div className="text-xs text-muted dark:text-paper/55">judul di koleksi</div>
                </div>
                <Icon name="arrow-up-right" size={16} className="text-ink/30 group-hover:text-cobalt dark:group-hover:text-cobalt-lt group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

Object.assign(window, { CatalogPage, CategoryPage, PublishersPage });
