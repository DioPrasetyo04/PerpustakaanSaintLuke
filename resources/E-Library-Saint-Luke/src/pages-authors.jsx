// pages-authors.jsx — Index A-Z penulis + detail
const { useState: aUseState, useMemo: aUseMemo } = React;

function AuthorsPage() {
  const [letter, setLetter] = aUseState('SEMUA');
  const [search, setSearch] = aUseState('');

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const grouped = aUseMemo(() => {
    const f = AUTHORS
      .filter(a => letter === 'SEMUA' || a.name.toUpperCase().startsWith(letter))
      .filter(a => !search || a.name.toLowerCase().includes(search.toLowerCase()));
    const g = {};
    for (const a of f) {
      const k = a.name[0].toUpperCase();
      (g[k] ||= []).push(a);
    }
    return g;
  }, [letter, search]);

  const activeLetters = new Set(AUTHORS.map(a => a.name[0].toUpperCase()));

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-10 pt-12 pb-24">
      <div className="font-mono uppercase tracking-editorial text-[10px] text-cobalt">Katalog</div>
      <div className="grid grid-cols-12 gap-8 items-end">
        <div className="col-span-12 lg:col-span-7">
          <h1 className="mt-3 font-serif text-4xl lg:text-5xl text-ink dark:text-paper" style={{ textWrap: 'balance' }}>
            Indeks <em className="text-cobalt">Penulis</em>
          </h1>
          <p className="mt-3 max-w-2xl text-ink/70 dark:text-paper/65">
            {AUTHORS.length} nama yang karyanya menemani siswa kami — dari sastrawan klasik Nusantara hingga pemikir kontemporer dunia.
          </p>
        </div>
        <div className="col-span-12 lg:col-span-5">
          <SearchField compact onSubmit={(t) => setSearch(t)} />
        </div>
      </div>

      {/* Alphabet bar */}
      <div className="mt-10 border-y hairline py-4 flex items-center gap-1 flex-wrap">
        <button
          onClick={() => setLetter('SEMUA')}
          className={`px-3 py-1 font-mono uppercase tracking-editorial text-[11px]
            ${letter === 'SEMUA' ? 'bg-ink text-paper dark:bg-card dark:text-ink' : 'text-ink/65 dark:text-paper/65 hover:text-cobalt'}`}
        >
          Semua
        </button>
        <span className="mx-2 text-line">·</span>
        {alphabet.map(L => {
          const hasAny = activeLetters.has(L);
          return (
            <button
              key={L}
              disabled={!hasAny}
              onClick={() => setLetter(L)}
              className={`w-8 h-8 grid place-items-center font-mono text-sm tabnum
                ${letter === L ? 'bg-cobalt text-paper' : hasAny ? 'text-ink dark:text-paper hover:text-cobalt' : 'text-line dark:text-night-line cursor-not-allowed'}`}
            >
              {L}
            </button>
          );
        })}
      </div>

      {/* Grouped list */}
      <div className="mt-12">
        {Object.keys(grouped).sort().length === 0 && (
          <div className="text-center py-20 text-muted dark:text-paper/55">Tidak ada nama dengan kriteria tersebut.</div>
        )}
        {Object.keys(grouped).sort().map(L => (
          <Reveal key={L} className="mb-12">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 lg:col-span-2">
                <div className="lg:sticky lg:top-32">
                  <div className="font-serif text-7xl lg:text-8xl italic text-cobalt">{L}</div>
                  <div className="font-mono uppercase tracking-editorial text-[10px] text-muted dark:text-paper/55">
                    <span className="tabnum">{grouped[L].length}</span> penulis
                  </div>
                </div>
              </div>
              <div className="col-span-12 lg:col-span-10">
                <ul className="divide-y hairline">
                  {grouped[L].map(a => (
                    <li key={a.id}>
                      <a href={`#/penulis/${a.id}`} className="grid grid-cols-12 gap-4 py-5 group items-center hover:bg-card dark:hover:bg-night-2 transition-colors -mx-2 px-2">
                        <div className="col-span-2 sm:col-span-1">
                          <div
                            className="aspect-square grid place-items-center font-serif text-base"
                            style={{ background: COVER_PALETTES[a.palette].bg, color: COVER_PALETTES[a.palette].ink }}
                          >
                            {a.name.split(' ').map(w => w[0]).slice(0,2).join('')}
                          </div>
                        </div>
                        <div className="col-span-7 sm:col-span-6">
                          <div className="font-serif text-lg text-ink dark:text-paper group-hover:text-cobalt">{a.name}</div>
                          <div className="text-xs text-muted dark:text-paper/55">{a.country} · {a.era}</div>
                        </div>
                        <div className="hidden sm:block col-span-3 text-xs font-mono uppercase tracking-editorial text-muted dark:text-paper/55">
                          {a.born}{a.died ? ` – ${a.died}` : ' – kini'}
                        </div>
                        <div className="col-span-3 sm:col-span-2 text-right">
                          <span className="font-serif text-xl text-ink dark:text-paper tabnum">{a.works}</span>
                          <span className="block text-[10px] uppercase font-mono tracking-editorial text-muted dark:text-paper/55">karya</span>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function AuthorDetailPage({ id }) {
  const author = authorById(id);
  if (!author) return <NotFound message="Penulis tidak ditemukan." />;
  const works = BOOKS.filter(b => b.authorId === id);
  const palette = COVER_PALETTES[author.palette];

  return (
    <section className="pt-10 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <nav className="font-mono uppercase tracking-editorial text-[10px] text-muted dark:text-paper/55 flex items-center gap-2 mb-8">
          <a href="#/" className="hover:text-cobalt">Beranda</a>
          <Icon name="chevron-right" size={10} />
          <a href="#/katalog/penulis" className="hover:text-cobalt">Penulis</a>
          <Icon name="chevron-right" size={10} />
          <span className="text-ink dark:text-paper">{author.name}</span>
        </nav>

        <div className="grid grid-cols-12 gap-10">
          <div className="col-span-12 lg:col-span-4">
            <div
              className="aspect-[3/4] grid place-items-center font-serif text-7xl spine-shadow shadow-book-3d"
              style={{ background: palette.bg, color: palette.ink }}
            >
              <div className="text-center">
                <div className="italic">{author.name.split(' ').map(w => w[0]).slice(0,2).join('')}</div>
                <div className="mt-4 h-px w-12 mx-auto" style={{ background: palette.accent }} />
                <div className="mt-4 font-sans uppercase tracking-editorial text-[10px] opacity-80">{author.country}</div>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-px bg-line dark:bg-night-line">
              <div className="bg-card dark:bg-night-2 p-4">
                <div className="text-[10px] font-mono uppercase tracking-editorial text-muted dark:text-paper/55">Lahir</div>
                <div className="mt-1 font-serif text-2xl text-ink dark:text-paper tabnum">{author.born || '—'}</div>
              </div>
              <div className="bg-card dark:bg-night-2 p-4">
                <div className="text-[10px] font-mono uppercase tracking-editorial text-muted dark:text-paper/55">Wafat</div>
                <div className="mt-1 font-serif text-2xl text-ink dark:text-paper tabnum">{author.died || 'masih hidup'}</div>
              </div>
              <div className="bg-card dark:bg-night-2 p-4">
                <div className="text-[10px] font-mono uppercase tracking-editorial text-muted dark:text-paper/55">Era</div>
                <div className="mt-1 font-serif text-lg text-ink dark:text-paper">{author.era}</div>
              </div>
              <div className="bg-card dark:bg-night-2 p-4">
                <div className="text-[10px] font-mono uppercase tracking-editorial text-muted dark:text-paper/55">Karya</div>
                <div className="mt-1 font-serif text-2xl text-ink dark:text-paper tabnum">{author.works}</div>
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-8">
            <div className="font-mono uppercase tracking-editorial text-[10px] text-cobalt">{author.era} · {author.country}</div>
            <h1 className="mt-3 font-serif text-4xl lg:text-6xl text-ink dark:text-paper leading-[1.05]" style={{ textWrap: 'balance' }}>
              {author.name}
            </h1>
            <p className="mt-8 text-lg leading-[1.75] text-ink/85 dark:text-paper/85 max-w-3xl drop-cap" style={{ textWrap: 'pretty' }}>
              {author.bio}
            </p>

            <div className="mt-16">
              <SectionLabel num="↪" label={`Koleksi Perpustakaan — ${works.length} Judul`} className="mb-8" />
              {works.length === 0 ? (
                <div className="text-muted dark:text-paper/55 italic">Karya penulis ini belum masuk ke koleksi kami.</div>
              ) : (
                <Stagger step={70} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
                  {works.map(b => <BookCard key={b.id} book={b} size="md" />)}
                </Stagger>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { AuthorsPage, AuthorDetailPage });
