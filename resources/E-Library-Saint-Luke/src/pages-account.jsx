// pages-account.jsx — Login + Dashboard + Wishlist + Search results
const { useState: uUseState, useMemo: uUseMemo } = React;

/* ──────── LOGIN ──────── */
function LoginPage() {
  const [loading, setLoading] = uUseState(false);
  const [error, setError] = uUseState('');
  const [showPw, setShowPw] = uUseState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      goTo('akun/dashboard');
    }, 800);
  };

  return (
    <section className="min-h-[calc(100vh-200px)] grid grid-cols-12">
      {/* Left: form */}
      <div className="col-span-12 lg:col-span-7 px-6 lg:px-20 py-16 flex flex-col">
        <div className="flex items-center gap-3 mb-12">
          <BrandMark />
        </div>

        <div className="flex-1 grid place-items-center">
          <div className="w-full max-w-md">
            <div className="font-mono uppercase tracking-editorial text-[10px] text-cobalt">
              Masuk Anggota
            </div>
            <h1 className="mt-3 font-serif text-4xl text-ink dark:text-paper" style={{ textWrap: 'balance' }}>
              Selamat datang kembali.
            </h1>
            <p className="mt-2 text-ink/70 dark:text-paper/65">
              Masuk dengan nomor induk siswa atau alamat surel sekolah.
            </p>

            <form onSubmit={onSubmit} className="mt-8 space-y-px bg-line dark:bg-night-line border hairline">
              <label className="bg-card dark:bg-night-2 p-5 block group focus-within:bg-paper dark:focus-within:bg-night-3 transition-colors">
                <div className="font-mono uppercase tracking-editorial text-[10px] text-muted dark:text-paper/55 mb-2">
                  NIS atau Surel Sekolah
                </div>
                <input
                  type="text"
                  defaultValue="2024.1057"
                  className="w-full bg-transparent outline-none text-ink dark:text-paper text-lg"
                  required
                />
              </label>
              <label className="bg-card dark:bg-night-2 p-5 block group focus-within:bg-paper dark:focus-within:bg-night-3 transition-colors relative">
                <div className="font-mono uppercase tracking-editorial text-[10px] text-muted dark:text-paper/55 mb-2">
                  Kata Sandi
                </div>
                <input
                  type={showPw ? 'text' : 'password'}
                  defaultValue="••••••••••"
                  className="w-full bg-transparent outline-none text-ink dark:text-paper text-lg pr-16"
                  required
                />
                <button type="button" onClick={() => setShowPw(s => !s)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-xs font-mono uppercase tracking-editorial text-cobalt">
                  {showPw ? 'Sembunyi' : 'Tampil'}
                </button>
              </label>
            </form>

            <div className="mt-4 flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-ink/70 dark:text-paper/70">
                <input type="checkbox" defaultChecked className="accent-cobalt" />
                Ingat saya
              </label>
              <a href="#/akun" className="text-cobalt hover:text-cobalt-dk">Lupa sandi?</a>
            </div>

            <Button onClick={onSubmit} variant="dark" size="lg" className="mt-6 w-full">
              {loading ? 'Memproses…' : <>Masuk <Icon name="arrow-right" size={14} /></>}
            </Button>

            {error && <div className="mt-4 text-sm text-cobalt">{error}</div>}

            <div className="mt-6 text-sm text-ink/70 dark:text-paper/70 text-center">
              Belum punya akun? <a href="#/daftar" className="text-cobalt dark:text-cobalt-lt font-semibold hover:underline">Aktivasi anggota</a>
            </div>

            <div className="mt-8 pt-6 border-t hairline text-sm text-ink/65 dark:text-paper/65 text-center">
              Tamu (alumni, orang tua, mitra)?
              <a href="#/tentang/kontak" className="ml-2 text-cobalt dark:text-cobalt-lt hover:underline">Ajukan kartu akses</a>
            </div>
          </div>
        </div>
      </div>

      {/* Right: editorial pane */}
      <div className="hidden lg:flex lg:col-span-5 bg-ink text-paper p-16 flex-col justify-between paper-grain relative overflow-hidden">
        <div className="font-mono uppercase tracking-editorial text-[10px] text-cobalt">
          Catatan Pustakawan
        </div>
        <div>
          <BookCover book={bookById('b001')} size="lg" className="absolute right-10 top-1/2 -translate-y-1/2 rotate-3 shadow-book-3d" />
          <BookCover book={bookById('b008')} size="md" className="absolute right-32 top-1/2 -translate-y-2/3 -rotate-6 shadow-book" />
        </div>
        <div>
          <blockquote className="font-quote italic text-3xl leading-snug max-w-xs" style={{ textWrap: 'balance' }}>
            "Tidak ada hari yang sepenuhnya buruk jika di akhirnya kita bertemu satu halaman yang baik."
          </blockquote>
          <div className="mt-4 font-mono uppercase tracking-editorial text-[10px] text-paper/45">
            — Ibu Margareta, pustakawan senior
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────── DASHBOARD ──────── */
function ProgressRing({ value, max, size = 84 }) {
  const [ref, shown] = useReveal();
  const pct = Math.min(1, value / max);
  const r = (size - 10) / 2;
  const circ = 2 * Math.PI * r;
  return (
    <div ref={ref} className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size/2} cy={size/2} r={r} fill="none" strokeWidth="8" className="stroke-paper-2 dark:stroke-night-3" />
        <circle cx={size/2} cy={size/2} r={r} fill="none" strokeWidth="8" strokeLinecap="round"
          stroke="#1F9D73"
          strokeDasharray={circ}
          strokeDashoffset={shown ? circ * (1 - pct) : circ}
          style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(.2,.7,.2,1)' }} />
      </svg>
      <div className="absolute inset-0 grid place-content-center text-center">
        <div className="font-serif text-xl text-ink dark:text-paper tabnum">{Math.round(pct*100)}%</div>
      </div>
    </div>
  );
}

function DashboardPage() {
  const user = { name:'Caesar Wijaya', class:'XI IPA 2', nis:'2024.1057', joined:'2022-07' };
  const active = MY_LOANS.filter(l => l.status !== 'Dikembalikan');
  const history = MY_LOANS.filter(l => l.status === 'Dikembalikan');

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-10 pt-12 pb-24">
      {/* Header */}
      <div className="grid grid-cols-12 gap-6 items-center">
        <div className="col-span-12 md:col-span-7">
          <div className="font-mono uppercase tracking-editorial text-[10px] text-cobalt">
            Akun Anggota · NIS {user.nis}
          </div>
          <h1 className="mt-3 font-serif text-4xl lg:text-5xl text-ink dark:text-paper">
            Halo, <em className="text-cobalt">{user.name.split(' ')[0]}</em>.
          </h1>
          <p className="mt-3 text-ink/70 dark:text-paper/65">
            Kelas {user.class} · Anggota sejak Juli 2022 · Status: <span className="text-ink dark:text-paper">Aktif</span>
          </p>
        </div>
        <div className="col-span-12 md:col-span-5 flex justify-end gap-2">
          <Button as="a" href="#/akun/riwayat" variant="outline">
            <Icon name="clock" size={14} /> Riwayat
          </Button>
          <Button as="a" href="#/akun/pengaturan" variant="outline">
            <Icon name="user" size={14} /> Pengaturan
          </Button>
          <Button variant="ghost" onClick={() => goTo('akun')}>
            <Icon name="logout" size={14} /> Keluar
          </Button>
        </div>
      </div>

      <div className="mt-8"><AccountTabs active="dashboard" /></div>

      {/* Gamification band */}
      <div className="mt-10 grid grid-cols-12 gap-4">
        {/* Reading goal ring */}
        <div className="col-span-12 lg:col-span-4 rounded-xl2 border hairline bg-card dark:bg-night-2 p-6 flex items-center gap-6">
          <ProgressRing value={14} max={24} />
          <div>
            <div className="font-mono uppercase tracking-editorial text-[10px] text-muted dark:text-paper/55">Target 2026</div>
            <div className="mt-1 font-serif text-2xl text-ink dark:text-paper">14 <span className="text-muted-2">/ 24 buku</span></div>
            <p className="mt-1 text-xs text-muted dark:text-paper/55">10 buku lagi untuk capai targetmu. Terus baca!</p>
          </div>
        </div>

        {/* Streak */}
        <div className="col-span-6 lg:col-span-3 rounded-xl2 border hairline bg-card dark:bg-night-2 p-6 sheen overflow-hidden group">
          <div className="flex items-center justify-between">
            <div className="w-11 h-11 grid place-items-center rounded-full bg-brass/15 text-2xl">🔥</div>
            <span className="text-[10px] font-mono uppercase tracking-editorial text-brass dark:text-brass-lt">Aktif</span>
          </div>
          <div className="mt-4 font-serif text-4xl text-ink dark:text-paper tabnum"><Counter value={12} /></div>
          <div className="text-xs text-muted dark:text-paper/55">minggu beruntun membaca</div>
        </div>

        {/* Level */}
        <div className="col-span-6 lg:col-span-5 rounded-xl2 border hairline bg-cobalt text-white p-6 relative overflow-hidden">
          <div className="absolute inset-0 line-grid opacity-20" />
          <div className="relative flex items-center justify-between">
            <div>
              <div className="font-mono uppercase tracking-editorial text-[10px] text-white/70">Level Pembaca</div>
              <div className="mt-1 font-serif text-2xl">Kutu Buku Tingkat 3</div>
              <div className="mt-3 w-44 h-2 rounded-full bg-white/20 overflow-hidden">
                <div className="progress-bar h-full rounded-full bg-white" style={{ width: '72%' }} />
              </div>
              <div className="mt-1.5 text-[11px] text-white/70">720 / 1000 XP menuju Tingkat 4</div>
            </div>
            <div className="text-5xl">📚</div>
          </div>
        </div>
      </div>

      {/* Badges */}
      <div className="mt-4 rounded-xl2 border hairline bg-card dark:bg-night-2 p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="font-mono uppercase tracking-editorial text-[11px] text-muted dark:text-paper/55">Lencana Diraih</div>
          <span className="text-xs text-muted dark:text-paper/45">6 dari 12 terbuka</span>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {[
            { e:'🏆', t:'Juara Resensi', on:true },
            { e:'📖', t:'100 Buku', on:true },
            { e:'⏱️', t:'Tepat Waktu', on:true },
            { e:'🌍', t:'Penjelajah Genre', on:true },
            { e:'🌙', t:'Pembaca Malam', on:true },
            { e:'⚡', t:'Streak 10 Mgg', on:true },
            { e:'🎓', t:'Sastra Klasik', on:false },
            { e:'🔬', t:'Sains Pro', on:false },
            { e:'✍️', t:'5 Ulasan', on:false },
            { e:'🗺️', t:'Atlas Reader', on:false },
            { e:'💎', t:'Koleksi Langka', on:false },
            { e:'👑', t:'Master', on:false },
          ].map((b, i) => (
            <div key={i} className={`group/badge rounded-xl border p-3 text-center transition-all ${b.on ? 'hairline bg-paper-2/40 dark:bg-night-3/40 hover:border-cobalt/40 hover:-translate-y-0.5' : 'border-dashed hairline opacity-45'}`}>
              <div className={`text-2xl ${b.on ? '' : 'grayscale'}`}>{b.e}</div>
              <div className="mt-1.5 text-[10px] font-medium text-ink dark:text-paper leading-tight">{b.t}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-px bg-line dark:bg-night-line border hairline">
        {[
          { v:14, l:'Total dipinjam' },
          { v:2,  l:'Sedang dipinjam' },
          { v:1,  l:'Wajib dikembalikan' },
          { v:5,  l:'Wishlist' },
        ].map(s => (
          <div key={s.l} className="bg-card dark:bg-night-2 p-6">
            <div className="font-serif text-5xl text-ink dark:text-paper tabnum">{s.v}</div>
            <div className="mt-1 text-xs text-muted dark:text-paper/55">{s.l}</div>
          </div>
        ))}
      </div>

      {/* Active loans */}
      <div className="mt-16">
        <SectionLabel num="01" label="Sedang Dipinjam" className="mb-6" />
        <div className="space-y-px bg-line dark:bg-night-line border hairline">
          {active.map(l => {
            const b = bookById(l.bookId);
            const overdue = l.status.includes('Terlambat');
            return (
              <div key={l.id} className="bg-card dark:bg-night-2 p-5 flex items-center gap-6">
                <BookCover book={b} size="xs" />
                <div className="flex-1 min-w-0">
                  <a href={`#/buku/${b.id}`} className="font-serif text-lg text-ink dark:text-paper hover:text-cobalt line-clamp-1">{b.title}</a>
                  <div className="text-sm text-muted dark:text-paper/55">{b.author}</div>
                  <div className="mt-2 flex items-center gap-3 flex-wrap text-xs">
                    <span className="font-mono uppercase tracking-editorial text-muted dark:text-paper/55">
                      Pinjam {formatDate(l.borrowedOn)}
                    </span>
                    <span className={`font-mono uppercase tracking-editorial ${overdue ? 'text-cobalt' : 'text-emerald-700 dark:text-emerald-300'}`}>
                      Jatuh tempo {formatDate(l.dueOn)}
                    </span>
                  </div>
                </div>
                <div className="hidden md:flex flex-col items-end gap-2">
                  {overdue ? (
                    <Tag tone="accent">{l.status}</Tag>
                  ) : (
                    <Tag tone="teal">{l.status}</Tag>
                  )}
                  <div className="flex items-center gap-3">
                    {b.type !== 'fisik' && (
                      <button onClick={() => openViewer(b)} className="text-xs text-cobalt dark:text-cobalt-lt hover:underline font-semibold inline-flex items-center gap-1">
                        <Icon name="globe" size={12} /> Baca
                      </button>
                    )}
                    <button onClick={() => openReturn(b)} className="text-xs text-cobalt dark:text-cobalt-lt hover:underline font-semibold inline-flex items-center gap-1">
                      Kembalikan <Icon name="arrow-right" size={12} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* History */}
      <div className="mt-16">
        <SectionLabel num="02" label="Riwayat Peminjaman" className="mb-6" />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left font-mono uppercase tracking-editorial text-[10px] text-muted dark:text-paper/55 border-b hairline">
                <th className="py-3 pr-4">Judul</th>
                <th className="py-3 pr-4">Penulis</th>
                <th className="py-3 pr-4 text-right">Dipinjam</th>
                <th className="py-3 pr-4 text-right">Dikembalikan</th>
                <th className="py-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y hairline">
              {history.map(l => {
                const b = bookById(l.bookId);
                return (
                  <tr key={l.id} className="hover:bg-card dark:hover:bg-night-2 transition-colors">
                    <td className="py-4 pr-4">
                      <a href={`#/buku/${b.id}`} className="font-serif text-base text-ink dark:text-paper hover:text-cobalt">{b.title}</a>
                    </td>
                    <td className="py-4 pr-4 text-muted dark:text-paper/55">{b.author}</td>
                    <td className="py-4 pr-4 text-right tabnum">{formatDate(l.borrowedOn)}</td>
                    <td className="py-4 pr-4 text-right tabnum">{formatDate(l.dueOn)}</td>
                    <td className="py-4 text-right"><Tag tone="default">Selesai</Tag></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recommendations */}
      <div className="mt-20 border-t hairline pt-12">
        <SectionLabel num="03" label="Direkomendasikan untuk Anda" className="mb-8" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {BOOKS.slice(15, 20).map(b => <BookCard key={b.id} book={b} size="sm" />)}
        </div>
      </div>
    </section>
  );
}

/* ──────── WISHLIST ──────── */
function WishlistPage() {
  const [items, setItems] = uUseState(MY_WISHLIST);

  const remove = (id) => setItems(it => it.filter(x => x !== id));

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-10 pt-12 pb-24">
      <div className="font-mono uppercase tracking-editorial text-[10px] text-cobalt">Akun Anggota</div>
      <h1 className="mt-3 font-serif text-4xl lg:text-5xl text-ink dark:text-paper">
        Daftar <em className="text-cobalt">Reading List</em>
      </h1>
      <p className="mt-3 max-w-2xl text-ink/70 dark:text-paper/65">
        Judul-judul yang ingin Anda baca berikutnya. Saat tersedia, kami akan mengirim
        notifikasi melalui surel sekolah.
      </p>

      {items.length === 0 ? (
        <div className="mt-16 border hairline bg-card dark:bg-night-2 p-16 text-center">
          <div className="font-serif italic text-5xl text-cobalt/40">∅</div>
          <h3 className="mt-3 font-serif text-2xl text-ink dark:text-paper">Wishlist Anda kosong</h3>
          <p className="mt-2 text-sm text-ink/65 dark:text-paper/65">Tambahkan buku dari halaman detail untuk menyimpan di sini.</p>
          <Button as="a" href="#/katalog/buku" variant="primary" className="mt-6">
            Jelajahi katalog
          </Button>
        </div>
      ) : (
        <div className="mt-12 space-y-px bg-line dark:bg-night-line border hairline">
          {items.map(id => {
            const b = bookById(id);
            return (
              <div key={id} className="bg-card dark:bg-night-2 p-5 flex items-center gap-6 group">
                <BookCover book={b} size="xs" />
                <div className="flex-1 min-w-0">
                  <a href={`#/buku/${b.id}`} className="font-serif text-lg text-ink dark:text-paper hover:text-cobalt line-clamp-1">{b.title}</a>
                  <div className="text-sm text-muted dark:text-paper/55">{b.author} · {b.year}</div>
                  <div className="mt-2"><AvailabilityPill available={b.available} copies={b.copies} /></div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled={b.available === 0}>
                    {b.available > 0 ? 'Pinjam' : 'Antri'}
                  </Button>
                  <button
                    onClick={() => remove(id)}
                    className="w-9 h-9 grid place-items-center text-muted hover:text-cobalt hover:bg-cobalt/10 transition-colors"
                    aria-label="Hapus"
                  >
                    <Icon name="trash" size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

/* ──────── SEARCH RESULTS ──────── */
function SearchPage({ route }) {
  const q = (route?.query?.q || '').trim();
  const [active, setActive] = uUseState('Semua');

  const results = uUseMemo(() => {
    if (!q) return { books:[], authors:[], publishers:[], news:[] };
    const ql = q.toLowerCase();
    return {
      books: BOOKS.filter(b => b.title.toLowerCase().includes(ql) || b.author.toLowerCase().includes(ql) || b.isbn.includes(ql) || (b.tags||[]).some(t => t.toLowerCase().includes(ql)) || b.synopsis.toLowerCase().includes(ql)),
      authors: AUTHORS.filter(a => a.name.toLowerCase().includes(ql)),
      publishers: PUBLISHERS.filter(p => p.name.toLowerCase().includes(ql)),
      news: NEWS.filter(n => n.title.toLowerCase().includes(ql) || n.excerpt.toLowerCase().includes(ql)),
    };
  }, [q]);

  const total = results.books.length + results.authors.length + results.publishers.length + results.news.length;
  const tabs = [
    { k:'Semua',     n: total },
    { k:'Buku',      n: results.books.length },
    { k:'Penulis',   n: results.authors.length },
    { k:'Penerbit',  n: results.publishers.length },
    { k:'Berita',    n: results.news.length },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-10 pt-12 pb-24">
      <div className="font-mono uppercase tracking-editorial text-[10px] text-cobalt">Pencarian</div>
      <h1 className="mt-3 font-serif text-3xl lg:text-5xl text-ink dark:text-paper leading-tight" style={{ textWrap: 'balance' }}>
        Hasil untuk <em className="text-cobalt">"{q || '…'}"</em>
      </h1>
      <p className="mt-3 text-ink/70 dark:text-paper/65">
        <span className="tabnum">{total}</span> kecocokan ditemukan di seluruh portal.
      </p>

      <div className="mt-8 max-w-2xl">
        <SearchField />
      </div>

      {/* Tabs */}
      <div className="mt-10 border-y hairline py-3 flex items-center gap-1 flex-wrap">
        {tabs.map(t => (
          <button
            key={t.k}
            onClick={() => setActive(t.k)}
            className={`px-4 py-1.5 font-mono uppercase tracking-editorial text-[11px] inline-flex items-center gap-1.5
              ${active === t.k ? 'bg-ink text-paper dark:bg-card dark:text-ink' : 'text-ink/65 dark:text-paper/65 hover:text-cobalt'}`}
          >
            {t.k}
            <span className={`tabnum text-[10px] px-1 ${active === t.k ? 'text-paper/70 dark:text-ink/70' : 'opacity-60'}`}>{t.n}</span>
          </button>
        ))}
      </div>

      {total === 0 && q ? (
        <div className="mt-16 border hairline bg-card dark:bg-night-2 p-16 text-center">
          <div className="font-serif italic text-5xl text-cobalt/40">?</div>
          <h3 className="mt-3 font-serif text-2xl text-ink dark:text-paper">Tidak ada hasil</h3>
          <p className="mt-2 text-sm text-ink/65 dark:text-paper/65">Coba kata kunci lain, atau lihat saran berikut.</p>
          <div className="mt-6 flex items-center justify-center gap-2 flex-wrap">
            {['Pramoedya','Stoikisme','Sapardi','Sains'].map(t => (
              <a key={t} href={`#/cari?q=${t}`} className="px-3 py-1 border hairline text-xs hover:border-cobalt hover:text-cobalt">{t}</a>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-10 space-y-16">
          {/* Books */}
          {(active === 'Semua' || active === 'Buku') && results.books.length > 0 && (
            <div>
              {active === 'Semua' && <SectionLabel num="✦" label={`Buku · ${results.books.length}`} className="mb-6" />}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                {results.books.slice(0, active === 'Semua' ? 5 : 100).map(b => <BookCard key={b.id} book={b} size="sm" />)}
              </div>
            </div>
          )}

          {/* Authors */}
          {(active === 'Semua' || active === 'Penulis') && results.authors.length > 0 && (
            <div>
              {active === 'Semua' && <SectionLabel num="✦" label={`Penulis · ${results.authors.length}`} className="mb-6" />}
              <ul className="divide-y hairline">
                {results.authors.map(a => (
                  <li key={a.id}>
                    <a href={`#/penulis/${a.id}`} className="flex items-center gap-4 py-4 group">
                      <div className="w-12 h-12 grid place-items-center font-serif text-sm" style={{ background: COVER_PALETTES[a.palette].bg, color: COVER_PALETTES[a.palette].ink }}>
                        {a.name.split(' ').map(w => w[0]).slice(0,2).join('')}
                      </div>
                      <div className="flex-1">
                        <div className="font-serif text-lg text-ink dark:text-paper group-hover:text-cobalt">{a.name}</div>
                        <div className="text-xs text-muted dark:text-paper/55">{a.country} · {a.works} karya</div>
                      </div>
                      <Icon name="arrow-up-right" size={14} className="text-ink/30 group-hover:text-cobalt" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Publishers */}
          {(active === 'Semua' || active === 'Penerbit') && results.publishers.length > 0 && (
            <div>
              {active === 'Semua' && <SectionLabel num="✦" label={`Penerbit · ${results.publishers.length}`} className="mb-6" />}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-line dark:bg-night-line">
                {results.publishers.map(p => (
                  <a key={p.id} href={`#/katalog/buku?penerbit=${p.id}`} className="bg-card dark:bg-night-2 p-5 hover:bg-paper dark:hover:bg-night-3 transition-colors flex items-center justify-between group">
                    <div>
                      <div className="font-serif text-lg text-ink dark:text-paper group-hover:text-cobalt">{p.name}</div>
                      <div className="text-xs text-muted dark:text-paper/55">{p.city} · {p.books} judul</div>
                    </div>
                    <Icon name="building" size={18} className="text-cobalt/70" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* News */}
          {(active === 'Semua' || active === 'Berita') && results.news.length > 0 && (
            <div>
              {active === 'Semua' && <SectionLabel num="✦" label={`Berita · ${results.news.length}`} className="mb-6" />}
              <ul className="divide-y hairline">
                {results.news.map(n => (
                  <li key={n.id}>
                    <a href={`#/berita/${n.id}`} className="block py-4 group">
                      <div className="text-[11px] font-mono uppercase tracking-editorial text-muted dark:text-paper/55">
                        {n.category} · {formatDate(n.date)}
                      </div>
                      <div className="mt-1 font-serif text-lg text-ink dark:text-paper group-hover:text-cobalt">{n.title}</div>
                      <p className="mt-1 text-sm text-ink/65 dark:text-paper/65 line-clamp-2">{n.excerpt}</p>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

Object.assign(window, { LoginPage, DashboardPage, WishlistPage, SearchPage });
