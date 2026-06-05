// pages-book.jsx — Halaman Detail Buku (rich, modern)
const { useState: bUseState, useEffect: bUseEffect } = React;

function BookDetailPage({ id, dropCap = true }) {
  const book = bookById(id);
  if (!book) return <NotFound message="Buku tidak ditemukan." />;
  const author = authorById(book.authorId);
  const publisher = publisherById(book.publisher);
  const category = categoryById(book.category);
  const similar = BOOKS.filter(b => b.category === book.category && b.id !== book.id).slice(0, 5);
  const moreByAuthor = BOOKS.filter(b => b.authorId === book.authorId && b.id !== book.id).slice(0, 4);
  const reviews = reviewsFor(book);
  const bars = ratingBars(book);
  const [saved, setSaved] = bUseState(false);
  const pal = COVER_PALETTES[book.palette];
  // luminance check: is the cover bg light? → use a dark backdrop for the pull-quote
  const isLightBg = (() => {
    const h = pal.bg.replace('#','');
    const r = parseInt(h.slice(0,2),16), g = parseInt(h.slice(2,4),16), b = parseInt(h.slice(4,6),16);
    return (0.2126*r + 0.7152*g + 0.0722*b) > 150;
  })();
  const quoteBg = isLightBg ? '#14201B' : pal.bg;
  const quoteAccent = isLightBg ? '#34C690' : pal.accent;

  return (
    <section className="pb-24">
      {/* Tinted hero band */}
      <div className="relative overflow-hidden border-b hairline">
        <div className="absolute inset-0 hero-mesh opacity-70 pointer-events-none" />
        <div className="absolute inset-0 line-grid opacity-50 pointer-events-none" style={{ maskImage: 'linear-gradient(to bottom, black, transparent)' }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-8 pb-14 relative">
          {/* Breadcrumb */}
          <nav className="font-mono uppercase tracking-editorial text-[10px] text-muted dark:text-paper/55 flex items-center gap-2 mb-10">
            <a href="#/" className="hover:text-cobalt dark:hover:text-cobalt-lt">Beranda</a>
            <Icon name="chevron-right" size={10} />
            <a href="#/katalog/buku" className="hover:text-cobalt dark:hover:text-cobalt-lt">Katalog</a>
            <Icon name="chevron-right" size={10} />
            <a href={`#/katalog/buku?kategori=${book.category}`} className="hover:text-cobalt dark:hover:text-cobalt-lt">{category?.name}</a>
            <Icon name="chevron-right" size={10} />
            <span className="text-ink dark:text-paper truncate max-w-[200px]">{book.title}</span>
          </nav>

          <div className="grid grid-cols-12 gap-10 lg:gap-12">
            {/* Cover + actions */}
            <div className="col-span-12 lg:col-span-5 xl:col-span-4">
              <div className="lg:sticky lg:top-28">
                <Reveal>
                  <div className="group flex justify-center lg:justify-start">
                    <BookMedia book={book} size="xl" editable />
                  </div>
                </Reveal>

                <Reveal delay={120}>
                  <div className="mt-8 lg:max-w-[340px]">
                    {BOOK_TYPES[book.type]?.borrowable ? (
                      <Button variant="primary" size="lg" className="w-full" disabled={book.available === 0} onClick={() => openBorrow(book)}>
                        {book.available > 0 ? 'Pinjam Buku Ini' : 'Reservasi · Daftar Antri'}
                        <Icon name="arrow-right" size={14} />
                      </Button>
                    ) : (
                      <Button variant="primary" size="lg" className="w-full" onClick={() => openBorrow(book)}>
                        Reservasi di Rak <Icon name="pin" size={14} />
                      </Button>
                    )}
                    {book.type !== 'fisik' && (book.attachments || []).length > 0 && (
                      <button onClick={() => openViewer(book)} className="mt-2 w-full inline-flex items-center justify-center gap-2 rounded-full border border-cobalt/40 bg-cobalt-50 dark:bg-cobalt/10 py-2.5 text-sm font-semibold text-cobalt dark:text-cobalt-lt hover:bg-cobalt hover:text-white transition-colors btn-press">
                        <Icon name="globe" size={15} /> Baca Daring Sekarang
                      </button>
                    )}
                    <div className="mt-2 flex items-center gap-2">
                      <TypeChip type={book.type} />
                      {(book.attachments || []).map(a => (
                        <button key={a} onClick={() => openViewer(book, a)} title={`Buka ${ATTACH_META[a].label}`}
                          className="inline-flex items-center gap-1 px-2 py-1 rounded-full border hairline text-[10px] font-medium text-muted dark:text-paper/60 hover:border-cobalt hover:text-cobalt dark:hover:text-cobalt-lt transition-colors">
                          <Icon name={ATTACH_META[a].icon} size={11} /> {ATTACH_META[a].label}
                        </button>
                      ))}
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <button onClick={() => { toggleBookmark(book.id); setSaved(s => !s); }}
                        className={`inline-flex items-center justify-center gap-2 rounded-full border py-2.5 text-sm font-medium transition-colors ${saved ? 'border-cobalt bg-cobalt-50 dark:bg-cobalt/15 text-cobalt dark:text-cobalt-lt' : 'hairline hover:border-cobalt hover:text-cobalt dark:hover:text-cobalt-lt'}`}>
                        <Icon name={saved ? 'bookmark' : 'bookmark'} size={14} className={saved ? 'fill-current' : ''} /> {saved ? 'Tersimpan' : 'Markah'}
                      </button>
                      <button className="inline-flex items-center justify-center gap-2 rounded-full border hairline py-2.5 text-sm font-medium hover:border-cobalt hover:text-cobalt dark:hover:text-cobalt-lt transition-colors">
                        <Icon name="download" size={14} /> Sampel
                      </button>
                    </div>

                    {/* status + rack */}
                    <div className="bracket text-cobalt dark:text-cobalt-lt mt-6 rounded-xl2 border hairline bg-card dark:bg-night-2 overflow-hidden">
                      <div className="p-5 flex items-center justify-between border-b hairline">
                        <div>
                          <div className="font-mono text-[10px] uppercase tracking-editorial text-muted dark:text-paper/55">Ketersediaan</div>
                          <div className="mt-1.5"><AvailabilityPill available={book.available} copies={book.copies} /></div>
                        </div>
                        <div className="text-right">
                          <div className="font-serif text-3xl text-ink dark:text-paper tabnum">{book.available}<span className="text-muted-2 text-xl">/{book.copies}</span></div>
                          <div className="text-[10px] text-muted dark:text-paper/50">eksemplar</div>
                        </div>
                      </div>
                      {/* circulation breakdown */}
                      <div className="grid grid-cols-3 divide-x hairline border-b hairline">
                        {[
                          { v: book.available, l: 'Tersedia', dot: 'bg-emerald-500', tx: 'text-emerald-600 dark:text-emerald-400' },
                          { v: book.loaned,    l: 'Dipinjam', dot: 'bg-brass',       tx: 'text-brass dark:text-brass-lt' },
                          { v: book.lost,      l: 'Hilang',   dot: 'bg-rose-500',     tx: 'text-rose-500' },
                        ].map((s, i) => (
                          <div key={i} className="p-4 text-center">
                            <div className={`font-serif text-2xl tabnum ${s.tx}`}>{s.v}</div>
                            <div className="mt-1 inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-editorial text-muted dark:text-paper/55">
                              <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} /> {s.l}
                            </div>
                          </div>
                        ))}
                      </div>
                      {/* availability bar */}
                      <div className="px-5 pt-4">
                        <div className="h-2 rounded-full overflow-hidden flex bg-paper-2 dark:bg-night-3">
                          <div className="h-full bg-emerald-500" style={{ width: `${(book.available / book.copies) * 100}%` }} />
                          <div className="h-full bg-brass" style={{ width: `${(book.loaned / book.copies) * 100}%` }} />
                          <div className="h-full bg-rose-500" style={{ width: `${(book.lost / book.copies) * 100}%` }} />
                        </div>
                        <div className="mt-1.5 text-[10px] text-muted dark:text-paper/50 text-center">Total {book.copies} eksemplar terdaftar</div>
                      </div>
                      <div className="p-5 grid grid-cols-2 gap-4">
                        <div>
                          <div className="font-mono text-[10px] uppercase tracking-editorial text-muted dark:text-paper/55">Lokasi Rak</div>
                          <div className="mt-1 font-mono text-lg text-ink dark:text-paper tabnum">{book.rack}</div>
                        </div>
                        <div>
                          <div className="font-mono text-[10px] uppercase tracking-editorial text-muted dark:text-paper/55">Lantai</div>
                          <div className="mt-1 font-serif text-lg text-ink dark:text-paper">Lantai 2</div>
                        </div>
                      </div>
                    </div>

                    {/* quick facts */}
                    <div className="mt-3 grid grid-cols-3 gap-2">
                      {[
                        { ic:'book', v:`${book.pages}`, l:'Halaman' },
                        { ic:'clock', v:'14', l:'Hari pinjam' },
                        { ic:'star-fill', v:book.rating.toFixed(1), l:'Penilaian' },
                      ].map((f,i) => (
                        <div key={i} className="rounded-xl border hairline bg-card dark:bg-night-2 p-3 text-center">
                          <Icon name={f.ic} size={15} className="mx-auto text-cobalt dark:text-cobalt-lt" />
                          <div className="mt-1.5 font-serif text-lg text-ink dark:text-paper tabnum">{f.v}</div>
                          <div className="text-[9px] uppercase tracking-editorial text-muted dark:text-paper/50">{f.l}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>

            {/* Header content */}
            <div className="col-span-12 lg:col-span-7 xl:col-span-8">
              <Reveal>
                <div className="flex items-center gap-2 flex-wrap">
                  <Tag tone="accent">{category?.name}</Tag>
                  {book.new && <Badge tone="cobalt">Baru tiba</Badge>}
                  {book.popularity >= 90 && <Badge tone="amber">Populer</Badge>}
                </div>
                <h1 className="mt-5 font-serif text-ink dark:text-paper text-4xl lg:text-5xl xl:text-[58px] leading-[1.04]" style={{ textWrap: 'balance' }}>
                  {book.title}
                </h1>
                <div className="mt-4 flex items-center gap-3 flex-wrap text-ink/75 dark:text-paper/75">
                  <a href={`#/penulis/${book.authorId}`} className="font-serif italic text-xl hover:text-cobalt dark:hover:text-cobalt-lt">{book.author}</a>
                  <span className="text-muted dark:text-paper/45">·</span>
                  <span className="text-sm">{publisher?.name}, <span className="tabnum">{book.year}</span></span>
                </div>

                {/* meta strip */}
                <div className="mt-7 flex items-center gap-6 flex-wrap rounded-xl2 border hairline bg-card/60 dark:bg-night-2/50 px-5 py-4">
                  <div className="flex items-center gap-2">
                    <Rating value={book.rating} size={15} />
                    <span className="text-xs text-muted dark:text-paper/50">({reviews.length} ulasan)</span>
                  </div>
                  <span className="w-px h-6 bg-line dark:bg-night-line" />
                  <div className="text-sm text-muted dark:text-paper/60 inline-flex items-center gap-1.5">
                    <Icon name="user" size={14} className="text-cobalt dark:text-cobalt-lt" /> Dipinjam <span className="text-ink dark:text-paper font-medium tabnum">{borrowCount(book)}×</span>
                  </div>
                  <span className="w-px h-6 bg-line dark:bg-night-line hidden sm:block" />
                  <div className="text-sm text-muted dark:text-paper/60 hidden sm:inline-flex items-center gap-1.5">
                    <Icon name="bookmark" size={14} className="text-cobalt dark:text-cobalt-lt" /> Rak {book.rack}
                  </div>
                </div>
              </Reveal>

              {/* synopsis */}
              <Reveal delay={80}>
                <div className="mt-10">
                  <SectionLabel num="01" label="Sinopsis" className="mb-5" />
                  <p className={`text-lg leading-[1.75] text-ink/85 dark:text-paper/85 ${dropCap ? 'drop-cap' : ''}`} style={{ textWrap: 'pretty' }}>
                    {book.synopsis}
                  </p>
                  <p className="mt-5 text-lg leading-[1.75] text-ink/85 dark:text-paper/85" style={{ textWrap: 'pretty' }}>
                    Edisi koleksi perpustakaan ini berasal dari pengadaan {book.year} dengan {book.copies} eksemplar. Buku ini menjadi rujukan dalam beberapa diskusi klub baca dan kerap dipinjam menjelang penugasan akhir semester.
                  </p>
                  <div className="mt-7 flex flex-wrap gap-2">
                    {book.tags.map(t => <Tag key={t} tone="outline">{t}</Tag>)}
                  </div>
                </div>
              </Reveal>

              {/* Pull quote */}
              <Reveal delay={60}>
                <figure className="my-12 relative rounded-xl2 overflow-hidden p-8 lg:p-10 text-paper" style={{ background: quoteBg }}>
                  <div className="absolute inset-0 line-grid opacity-20" />
                  <div className="absolute top-4 left-6 font-quote text-7xl opacity-25" style={{ color: quoteAccent }}>"</div>
                  <blockquote className="relative font-quote italic text-2xl lg:text-3xl leading-snug max-w-2xl" style={{ textWrap: 'balance' }}>
                    {book.synopsis.split('.')[0]}.
                  </blockquote>
                  <figcaption className="relative mt-5 font-mono uppercase tracking-editorial text-[11px]" style={{ color: quoteAccent }}>
                    Kutipan pembuka · {book.title}
                  </figcaption>
                </figure>
              </Reveal>

              {/* Bibliografi */}
              <Reveal delay={40}>
                <div className="mt-12">
                  <SectionLabel num="02" label="Detail Bibliografi" className="mb-5" />
                  <dl className="grid grid-cols-2 lg:grid-cols-3 gap-px bg-line dark:bg-night-line border hairline rounded-xl2 overflow-hidden">
                    {[
                      ['ISBN', book.isbn, 'mono'],
                      ['Halaman', `${book.pages} hlm`],
                      ['Tahun Terbit', book.year, 'mono'],
                      ['Bahasa', 'Indonesia'],
                      ['Penerbit', publisher?.name],
                      ['Kategori', category?.name],
                      ['Kode Rak', book.rack, 'mono'],
                      ['Eksemplar', `${book.available} dari ${book.copies}`],
                      ['Akuisisi', 'Pengadaan Reguler'],
                    ].map(([k, v, kind]) => (
                      <div key={k} className="bg-card dark:bg-night-2 p-4 hover:bg-cobalt-50 dark:hover:bg-night-3 transition-colors">
                        <dt className="text-[10px] font-mono uppercase tracking-editorial text-muted dark:text-paper/55">{k}</dt>
                        <dd className={`mt-1 text-ink dark:text-paper ${kind === 'mono' ? 'font-mono text-sm' : 'text-sm'}`}>{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </Reveal>

              {/* Reviews + rating breakdown */}
              <Reveal delay={40}>
                <div className="mt-14">
                  <SectionLabel num="03" label="Ulasan Pembaca" className="mb-6" />
                  <div className="grid grid-cols-12 gap-8">
                    {/* score */}
                    <div className="col-span-12 sm:col-span-4">
                      <div className="rounded-xl2 border hairline bg-card dark:bg-night-2 p-6 text-center">
                        <div className="font-serif text-6xl text-ink dark:text-paper tabnum">{book.rating.toFixed(1)}</div>
                        <div className="mt-2 flex justify-center"><Rating value={book.rating} size={14} showNum={false} /></div>
                        <div className="mt-2 text-xs text-muted dark:text-paper/55">{borrowCount(book)} peminjam · {reviews.length} ulasan</div>
                      </div>
                      <div className="mt-4 space-y-1.5">
                        {bars.map((pct, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <span className="text-[11px] text-muted dark:text-paper/50 w-3 tabnum">{5 - i}</span>
                            <Icon name="star-fill" size={10} className="text-brass-lt" />
                            <div className="flex-1 h-1.5 rounded-full bg-paper-2 dark:bg-night-3 overflow-hidden">
                              <div className="h-full rounded-full bg-brass-lt" style={{ width: `${pct}%` }} />
                            </div>
                            <span className="text-[10px] text-muted-2 tabnum w-7 text-right">{pct}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* review list */}
                    <div className="col-span-12 sm:col-span-8 space-y-4">
                      {reviews.map((r, i) => (
                        <div key={i} className="rounded-xl2 border hairline bg-card dark:bg-night-2 p-5">
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 grid place-items-center rounded-full font-serif text-sm shrink-0" style={{ background: COVER_PALETTES[(i+book.palette)%COVER_PALETTES.length].bg, color: COVER_PALETTES[(i+book.palette)%COVER_PALETTES.length].ink }}>
                                {r.name.split(' ').map(w => w[0]).slice(0,2).join('')}
                              </div>
                              <div>
                                <div className="font-semibold text-sm text-ink dark:text-paper">{r.name}</div>
                                <div className="text-[11px] text-muted dark:text-paper/50">{r.role}</div>
                              </div>
                            </div>
                            <Rating value={r.rating} size={12} showNum={false} />
                          </div>
                          <p className="mt-3 text-sm leading-relaxed text-ink/80 dark:text-paper/75">"{r.text}"</p>
                        </div>
                      ))}
                      <button className="w-full rounded-full border hairline py-3 text-sm font-medium text-ink dark:text-paper hover:border-cobalt hover:text-cobalt dark:hover:text-cobalt-lt transition-colors">
                        Tulis ulasan Anda
                      </button>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Author block */}
              {author && (
                <Reveal delay={40}>
                  <div className="mt-14">
                    <SectionLabel num="04" label="Tentang Penulis" className="mb-6" />
                    <div className="bracket text-cobalt dark:text-cobalt-lt rounded-xl2 border hairline bg-card dark:bg-night-2 p-7">
                      <div className="grid grid-cols-12 gap-6 items-start">
                        <div className="col-span-3 sm:col-span-2">
                          <div className="aspect-square rounded-xl grid place-items-center font-serif italic text-3xl"
                            style={{ background: COVER_PALETTES[author.palette].bg, color: COVER_PALETTES[author.palette].ink }}>
                            {author.name.split(' ').map(w => w[0]).slice(0,2).join('')}
                          </div>
                        </div>
                        <div className="col-span-9 sm:col-span-10">
                          <a href={`#/penulis/${author.id}`} className="font-serif text-2xl text-ink dark:text-paper hover:text-cobalt dark:hover:text-cobalt-lt">{author.name}</a>
                          <div className="mt-1 text-xs font-mono uppercase tracking-editorial text-muted dark:text-paper/55">
                            {author.country}{author.born ? ` · ${author.born}` : ''}{author.died ? `–${author.died}` : ''} · {author.works} karya
                          </div>
                          <p className="mt-3 text-ink/75 dark:text-paper/75 leading-relaxed max-w-2xl">{author.bio}</p>
                          <a href={`#/penulis/${author.id}`} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-cobalt dark:text-cobalt-lt hover:gap-3 transition-all">
                            Lihat semua karya <Icon name="arrow-right" size={14} />
                          </a>
                        </div>
                      </div>
                    </div>

                    {moreByAuthor.length > 0 && (
                      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-5">
                        {moreByAuthor.map(b => <BookCard key={b.id} book={b} size="sm" />)}
                      </div>
                    )}
                  </div>
                </Reveal>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Similar books */}
      {similar.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 lg:px-10 mt-16">
          <div className="flex items-end justify-between mb-8">
            <SectionLabel num="↪" label="Karya Serupa di Rak yang Sama" />
            <a href={`#/katalog/buku?kategori=${book.category}`} className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-ink dark:text-paper hover:text-cobalt dark:hover:text-cobalt-lt group">
              Lihat kategori <Icon name="arrow-right" size={15} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
          <Stagger step={50} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
            {similar.map(b => <BookCard key={b.id} book={b} size="sm" />)}
          </Stagger>
        </div>
      )}
    </section>
  );
}

function NotFound({ message = 'Halaman tidak ditemukan.' }) {
  return (
    <div className="max-w-3xl mx-auto px-6 py-32 text-center">
      <div className="font-serif italic text-7xl text-cobalt/40 dark:text-cobalt-lt/40">404</div>
      <h1 className="mt-4 font-serif text-3xl text-ink dark:text-paper">{message}</h1>
      <p className="mt-2 text-ink/70 dark:text-paper/65">Coba kembali ke beranda atau telusuri katalog.</p>
      <Button as="a" href="#/" variant="primary" className="mt-6">Kembali ke Beranda</Button>
    </div>
  );
}

Object.assign(window, { BookDetailPage, NotFound });
