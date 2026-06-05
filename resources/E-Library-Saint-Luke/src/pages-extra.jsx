// pages-extra.jsx — Riwayat, Pengaturan, Register, Borrow/Return + Review, Attachment Viewer
const { useState: eUseState, useEffect: eUseEffect, useRef: eUseRef } = React;

/* ════════ ACCOUNT SUBNAV (shared) ════════ */
function AccountTabs({ active }) {
  const tabs = [
    { k:'dashboard', label:'Dashboard', icon:'grid',     path:'akun/dashboard' },
    { k:'riwayat',   label:'Riwayat',   icon:'clock',    path:'akun/riwayat' },
    { k:'wishlist',  label:'Wishlist',  icon:'bookmark', path:'akun/wishlist' },
    { k:'pengaturan',label:'Pengaturan',icon:'user',     path:'akun/pengaturan' },
  ];
  return (
    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 mb-8 border-b hairline">
      {tabs.map(t => (
        <a key={t.k} href={`#/${t.path}`}
          className={`shrink-0 inline-flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 -mb-px transition-colors ${active === t.k ? 'border-cobalt text-cobalt dark:text-cobalt-lt' : 'border-transparent text-muted dark:text-paper/55 hover:text-ink dark:hover:text-paper'}`}>
          <Icon name={t.icon} size={15} /> {t.label}
        </a>
      ))}
    </div>
  );
}

/* ════════ RIWAYAT (History) ════════ */
function HistoryPage() {
  const [filter, setFilter] = eUseState('semua');
  // build a richer history from MY_LOANS + extra synthetic past loans
  const extra = ['b004','b011','b022','b014','b031','b026','b003','b020'].map((id, i) => ({
    id: 'h' + i, bookId: id,
    borrowedOn: ['2026-03-02','2026-02-14','2026-01-20','2026-01-05','2025-12-12','2025-11-28','2025-11-10','2025-10-22'][i],
    dueOn: ['2026-03-16','2026-02-28','2026-02-03','2026-01-19','2025-12-26','2025-12-12','2025-11-24','2025-11-05'][i],
    status: 'Dikembalikan', reviewed: i % 2 === 0,
  }));
  const all = [...MY_LOANS, ...extra];
  const active = all.filter(l => l.status !== 'Dikembalikan');
  const returned = all.filter(l => l.status === 'Dikembalikan');
  const shown = filter === 'aktif' ? active : filter === 'selesai' ? returned : all;

  const stats = [
    { v: all.length, l: 'Total transaksi', icon: 'clock' },
    { v: active.length, l: 'Sedang dipinjam', icon: 'book' },
    { v: returned.length, l: 'Dikembalikan', icon: 'check' },
    { v: returned.filter(r=>r.reviewed).length, l: 'Sudah diulas', icon: 'star' },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-10 pt-12 pb-24">
      <Reveal><Eyebrow>Akun Anggota</Eyebrow></Reveal>
      <Reveal delay={60}>
        <h1 className="mt-5 font-serif text-4xl lg:text-5xl text-ink dark:text-paper">Riwayat Peminjaman</h1>
      </Reveal>
      <Reveal delay={120}><p className="mt-3 text-muted dark:text-paper/65 max-w-2xl">Seluruh aktivitas peminjaman dan pengembalianmu, terekam rapi.</p></Reveal>

      <AccountTabs active="riwayat" />

      {/* stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s, i) => (
          <Reveal key={i} delay={i*60}>
            <div className="rounded-xl2 border hairline bg-card dark:bg-night-2 p-5 flex items-center gap-4">
              <div className="w-11 h-11 grid place-items-center rounded-full bg-cobalt-50 dark:bg-cobalt/15 text-cobalt dark:text-cobalt-lt shrink-0"><Icon name={s.icon} size={18} /></div>
              <div>
                <div className="font-serif text-3xl text-ink dark:text-paper tabnum"><Counter value={s.v} /></div>
                <div className="text-xs text-muted dark:text-paper/55">{s.l}</div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* filter chips */}
      <div className="flex items-center gap-2 mb-6">
        {[['semua','Semua'],['aktif','Sedang Dipinjam'],['selesai','Selesai']].map(([k,l]) => (
          <button key={k} onClick={() => setFilter(k)}
            className={`chip px-4 py-2 rounded-full text-sm font-medium border ${filter === k ? 'bg-cobalt text-white border-cobalt' : 'hairline text-ink dark:text-paper hover:border-cobalt/40'}`}>
            {l}
          </button>
        ))}
      </div>

      {/* timeline list */}
      <div className="space-y-3">
        {shown.map((l, i) => {
          const b = bookById(l.bookId); if (!b) return null;
          const overdue = l.status.includes('Terlambat');
          const isActive = l.status !== 'Dikembalikan';
          return (
            <Reveal key={l.id} delay={i*40}>
              <div className="group flex items-center gap-5 rounded-xl2 border hairline bg-card dark:bg-night-2 p-4 hover:shadow-soft hover:border-cobalt/30 transition-all">
                <a href={`#/buku/${b.id}`} className="shrink-0"><BookCover book={b} size="xs" /></a>
                <div className="flex-1 min-w-0">
                  <a href={`#/buku/${b.id}`} className="font-serif text-lg text-ink dark:text-paper hover:text-cobalt dark:hover:text-cobalt-lt line-clamp-1">{b.title}</a>
                  <div className="text-sm text-muted dark:text-paper/55">{b.author}</div>
                  <div className="mt-2 flex items-center gap-2 flex-wrap text-xs">
                    <TypeChip type={b.type} />
                    <span className="inline-flex items-center gap-1 text-muted dark:text-paper/50"><Icon name="clock" size={11} /> {formatDate(l.borrowedOn)} → {formatDate(l.dueOn)}</span>
                  </div>
                </div>
                <div className="hidden md:flex flex-col items-end gap-2 shrink-0">
                  {overdue ? <Tag tone="accent">{l.status}</Tag> : isActive ? <Tag tone="teal">{l.status}</Tag> : <Tag tone="default">Selesai</Tag>}
                  {isActive ? (
                    <button onClick={() => openReturn(b)} className="text-xs font-semibold text-cobalt dark:text-cobalt-lt hover:underline inline-flex items-center gap-1">Kembalikan <Icon name="arrow-right" size={12} /></button>
                  ) : l.reviewed ? (
                    <span className="text-xs text-muted-2 inline-flex items-center gap-1"><Icon name="check" size={12} /> Sudah diulas</span>
                  ) : (
                    <button onClick={() => openReview(b)} className="text-xs font-semibold text-cobalt dark:text-cobalt-lt hover:underline inline-flex items-center gap-1"><Icon name="star" size={12} /> Beri ulasan</button>
                  )}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

/* ════════ PENGATURAN (Settings / Profile) ════════ */
function SettingsPage() {
  const [tab, setTab] = eUseState('profil');
  const [saved, setSaved] = eUseState(false);
  const flash = () => { setSaved(true); setTimeout(() => setSaved(false), 2200); };

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-10 pt-12 pb-24">
      <Reveal><Eyebrow>Akun Anggota</Eyebrow></Reveal>
      <Reveal delay={60}><h1 className="mt-5 font-serif text-4xl lg:text-5xl text-ink dark:text-paper">Pengaturan Profil</h1></Reveal>

      <AccountTabs active="pengaturan" />

      <div className="grid grid-cols-12 gap-8">
        {/* left rail */}
        <div className="col-span-12 lg:col-span-3">
          <div className="lg:sticky lg:top-32 space-y-1">
            {[['profil','Profil','user'],['keamanan','Keamanan','book'],['notifikasi','Notifikasi','bookmark'],['preferensi','Preferensi','grid']].map(([k,l,ic]) => (
              <button key={k} onClick={() => setTab(k)}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2.5 transition-colors ${tab === k ? 'bg-cobalt text-white' : 'text-ink dark:text-paper hover:bg-paper-2/60 dark:hover:bg-night-3'}`}>
                <Icon name={ic} size={15} /> {l}
              </button>
            ))}
          </div>
        </div>

        {/* panel */}
        <div className="col-span-12 lg:col-span-9">
          {tab === 'profil' && (
            <div className="space-y-6">
              {/* avatar header */}
              <div className="rounded-xl2 border hairline bg-card dark:bg-night-2 p-6 flex items-center gap-5">
                <div className="w-20 h-20 rounded-2xl grid place-items-center text-white font-serif text-2xl shadow-soft" style={{ background: 'linear-gradient(135deg,#1F9D73,#15543F)' }}>CW</div>
                <div className="flex-1">
                  <div className="font-serif text-2xl text-ink dark:text-paper">Caesar Wijaya</div>
                  <div className="text-sm text-muted dark:text-paper/55">NIS 2024.1057 · Kelas XI IPA 2</div>
                </div>
                <Button variant="outline" size="sm"><Icon name="download" size={13} /> Ganti Foto</Button>
              </div>
              {/* form */}
              <div className="rounded-xl2 border hairline bg-card dark:bg-night-2 p-6">
                <h3 className="font-serif text-xl text-ink dark:text-paper mb-5">Data Diri</h3>
                <div className="grid sm:grid-cols-2 gap-5">
                  <SettingField label="Nama Lengkap" value="Caesar Wijaya" />
                  <SettingField label="NIS" value="2024.1057" disabled />
                  <SettingField label="Kelas" value="XI IPA 2" />
                  <SettingField label="Surel Sekolah" value="caesar.w@santolukas.sch.id" type="email" />
                  <SettingField label="Nomor Telepon" value="0812-3456-7890" type="tel" />
                  <SettingField label="Tanggal Lahir" value="2008-05-14" type="date" />
                  <div className="sm:col-span-2"><SettingField label="Alamat" value="Jl. Pademangan II, Jakarta Utara" textarea /></div>
                </div>
                <div className="mt-6 flex items-center gap-3">
                  <Button variant="primary" onClick={flash}>Simpan Perubahan</Button>
                  <Button variant="ghost">Batal</Button>
                  {saved && <span className="text-sm text-emerald-600 dark:text-emerald-400 inline-flex items-center gap-1"><Icon name="check" size={15} /> Tersimpan</span>}
                </div>
              </div>
            </div>
          )}

          {tab === 'keamanan' && (
            <div className="rounded-xl2 border hairline bg-card dark:bg-night-2 p-6">
              <h3 className="font-serif text-xl text-ink dark:text-paper mb-5">Ubah Kata Sandi</h3>
              <div className="space-y-5 max-w-md">
                <SettingField label="Kata Sandi Lama" value="" type="password" placeholder="••••••••" />
                <SettingField label="Kata Sandi Baru" value="" type="password" placeholder="Minimal 8 karakter" />
                <SettingField label="Konfirmasi Kata Sandi" value="" type="password" placeholder="Ulangi kata sandi baru" />
              </div>
              <div className="mt-6"><Button variant="primary" onClick={flash}>Perbarui Sandi</Button></div>
              {saved && <span className="ml-3 text-sm text-emerald-600 dark:text-emerald-400 inline-flex items-center gap-1"><Icon name="check" size={15} /> Sandi diperbarui</span>}
              <div className="mt-8 pt-6 border-t hairline">
                <h4 className="font-semibold text-ink dark:text-paper">Sesi Aktif</h4>
                <div className="mt-3 flex items-center justify-between p-4 rounded-xl bg-paper-2/40 dark:bg-night-3/40">
                  <div className="flex items-center gap-3"><Icon name="globe" size={18} className="text-cobalt dark:text-cobalt-lt" /><div><div className="text-sm font-medium text-ink dark:text-paper">Chrome · Windows</div><div className="text-xs text-muted dark:text-paper/50">Jakarta · Aktif sekarang</div></div></div>
                  <span className="text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 font-medium">Perangkat ini</span>
                </div>
              </div>
            </div>
          )}

          {tab === 'notifikasi' && (
            <div className="rounded-xl2 border hairline bg-card dark:bg-night-2 p-6">
              <h3 className="font-serif text-xl text-ink dark:text-paper mb-5">Preferensi Notifikasi</h3>
              <div className="divide-y hairline">
                {[
                  ['Pengingat jatuh tempo','Ingatkan 2 hari sebelum batas pengembalian',true],
                  ['Buku wishlist tersedia','Beri tahu saat buku incaranmu bisa dipinjam',true],
                  ['Koleksi baru','Kabar judul baru sesuai minatmu',false],
                  ['Acara & klub baca','Undangan acara dan jadwal diskusi',true],
                  ['Buletin bulanan','Rekomendasi bacaan tiap bulan',false],
                ].map(([t,d,on], i) => <ToggleRow key={i} title={t} desc={d} defaultOn={on} />)}
              </div>
            </div>
          )}

          {tab === 'preferensi' && (
            <div className="rounded-xl2 border hairline bg-card dark:bg-night-2 p-6">
              <h3 className="font-serif text-xl text-ink dark:text-paper mb-5">Preferensi Membaca</h3>
              <div className="space-y-6">
                <div>
                  <div className="text-sm font-medium text-ink dark:text-paper mb-2">Genre favorit</div>
                  <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map(c => <ChipToggle key={c.id} label={`${c.icon} ${c.name}`} defaultOn={['fiksi','sains','sejarah'].includes(c.id)} />)}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-ink dark:text-paper mb-2">Target baca tahunan</div>
                  <div className="flex items-center gap-3">
                    <input type="range" min="6" max="60" defaultValue="24" className="yr-range flex-1 appearance-none bg-transparent" />
                    <span className="font-serif text-2xl text-cobalt dark:text-cobalt-lt tabnum w-12 text-center">24</span>
                    <span className="text-sm text-muted dark:text-paper/55">buku</span>
                  </div>
                </div>
                <div><Button variant="primary" onClick={flash}>Simpan Preferensi</Button>{saved && <span className="ml-3 text-sm text-emerald-600 dark:text-emerald-400 inline-flex items-center gap-1"><Icon name="check" size={15} /> Tersimpan</span>}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function SettingField({ label, value, type = 'text', disabled, textarea, placeholder }) {
  return (
    <label className="block">
      <div className="text-xs font-mono uppercase tracking-editorial text-muted dark:text-paper/55 mb-2">{label}</div>
      {textarea ? (
        <textarea defaultValue={value} rows={2} className="w-full bg-paper-2/40 dark:bg-night-3/50 border hairline rounded-xl px-4 py-2.5 text-sm text-ink dark:text-paper outline-none focus:border-cobalt resize-none" />
      ) : (
        <input type={type} defaultValue={value} disabled={disabled} placeholder={placeholder}
          className={`w-full bg-paper-2/40 dark:bg-night-3/50 border hairline rounded-xl px-4 py-2.5 text-sm text-ink dark:text-paper outline-none focus:border-cobalt ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`} />
      )}
    </label>
  );
}

function ToggleRow({ title, desc, defaultOn }) {
  const [on, setOn] = eUseState(defaultOn);
  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <div><div className="text-sm font-medium text-ink dark:text-paper">{title}</div><div className="text-xs text-muted dark:text-paper/50">{desc}</div></div>
      <button onClick={() => setOn(!on)} role="switch" aria-checked={on}
        className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${on ? 'bg-cobalt' : 'bg-paper-2 dark:bg-night-4'}`}>
        <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${on ? 'left-[22px]' : 'left-0.5'}`} />
      </button>
    </div>
  );
}

function ChipToggle({ label, defaultOn }) {
  const [on, setOn] = eUseState(defaultOn);
  return (
    <button onClick={() => setOn(!on)}
      className={`chip px-3 py-1.5 rounded-full text-xs font-medium border ${on ? 'bg-cobalt text-white border-cobalt' : 'hairline text-ink dark:text-paper hover:border-cobalt/40'}`}>
      {label}
    </button>
  );
}

/* ════════ REGISTER ════════ */
function RegisterPage() {
  const [step, setStep] = eUseState(1);
  const [loading, setLoading] = eUseState(false);
  const next = () => { if (step < 3) setStep(step + 1); };
  const submit = () => { setLoading(true); setTimeout(() => { setLoading(false); goTo('akun/dashboard'); }, 900); };

  return (
    <section className="min-h-[calc(100vh-160px)] grid grid-cols-12">
      {/* form side */}
      <div className="col-span-12 lg:col-span-7 px-6 lg:px-20 py-12 flex flex-col">
        <a href="#/" className="inline-flex"><BrandMark /></a>
        <div className="flex-1 grid place-items-center py-10">
          <div className="w-full max-w-md">
            <Eyebrow>Aktivasi Anggota</Eyebrow>
            <h1 className="mt-5 font-serif text-4xl text-ink dark:text-paper" style={{ textWrap:'balance' }}>Buat akun perpustakaan</h1>
            <p className="mt-2 text-muted dark:text-paper/60">Khusus siswa & staf Yayasan Saint Luke. Gratis selamanya.</p>

            {/* stepper */}
            <div className="mt-8 flex items-center gap-2">
              {[1,2,3].map(s => (
                <React.Fragment key={s}>
                  <div className={`w-8 h-8 grid place-items-center rounded-full text-sm font-bold transition-colors ${step >= s ? 'bg-cobalt text-white' : 'bg-paper-2 dark:bg-night-3 text-muted'}`}>{step > s ? <Icon name="check" size={15} /> : s}</div>
                  {s < 3 && <div className={`flex-1 h-0.5 rounded ${step > s ? 'bg-cobalt' : 'bg-paper-2 dark:bg-night-3'}`} />}
                </React.Fragment>
              ))}
            </div>

            <div className="mt-8 space-y-4">
              {step === 1 && (
                <div className="space-y-4 tab-panel">
                  <RegField label="NIS / NIP" placeholder="Contoh: 2024.1057" />
                  <RegField label="Nama Lengkap" placeholder="Sesuai data sekolah" />
                  <div className="grid grid-cols-2 gap-4">
                    <RegField label="Jenjang" select options={['SD','SMP','SMA']} />
                    <RegField label="Kelas" placeholder="XI IPA 2" />
                  </div>
                </div>
              )}
              {step === 2 && (
                <div className="space-y-4 tab-panel">
                  <RegField label="Surel Sekolah" type="email" placeholder="nama@santolukas.sch.id" />
                  <RegField label="Nomor Telepon" type="tel" placeholder="08xx-xxxx-xxxx" />
                  <RegField label="Kata Sandi" type="password" placeholder="Minimal 8 karakter" />
                  <RegField label="Konfirmasi Sandi" type="password" placeholder="Ulangi kata sandi" />
                </div>
              )}
              {step === 3 && (
                <div className="space-y-4 tab-panel">
                  <div className="rounded-xl2 border hairline bg-paper-2/40 dark:bg-night-3/40 p-5">
                    <div className="font-serif text-lg text-ink dark:text-paper mb-3">Ringkasan</div>
                    {[['Nama','Caesar Wijaya'],['NIS','2024.1057'],['Jenjang','SMA · XI IPA 2'],['Surel','caesar.w@santolukas.sch.id']].map(([k,v]) => (
                      <div key={k} className="flex justify-between py-1.5 text-sm border-b hairline last:border-0"><span className="text-muted dark:text-paper/55">{k}</span><span className="text-ink dark:text-paper font-medium">{v}</span></div>
                    ))}
                  </div>
                  <label className="flex items-start gap-2.5 text-sm text-muted dark:text-paper/65">
                    <input type="checkbox" defaultChecked className="mt-0.5 accent-cobalt" />
                    Saya menyetujui <a href="#/tentang/profil" className="text-cobalt dark:text-cobalt-lt">tata tertib perpustakaan</a> dan kebijakan privasi yayasan.
                  </label>
                </div>
              )}
            </div>

            <div className="mt-8 flex items-center gap-3">
              {step > 1 && <Button variant="outline" onClick={() => setStep(step-1)}><Icon name="chevron-left" size={14} /> Kembali</Button>}
              {step < 3
                ? <Button variant="primary" onClick={next} className="flex-1">Lanjut <Icon name="arrow-right" size={14} /></Button>
                : <Button variant="primary" onClick={submit} className="flex-1">{loading ? 'Memproses…' : <>Aktivasi Akun <Icon name="check" size={14} /></>}</Button>}
            </div>

            <div className="mt-8 text-sm text-muted dark:text-paper/60 text-center">
              Sudah punya akun? <a href="#/akun" className="text-cobalt dark:text-cobalt-lt font-semibold hover:underline">Masuk di sini</a>
            </div>
          </div>
        </div>
      </div>

      {/* visual side */}
      <div className="hidden lg:flex lg:col-span-5 bg-cobalt text-white p-14 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 line-grid opacity-15" />
        <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
        <div className="relative font-mono uppercase tracking-wider-2 text-[11px] text-white/70">Bergabung dengan 1.856 pembaca</div>
        <div className="relative">
          <div className="flex gap-4 mb-8">
            {['b001','b006','b029'].map((id,i) => <div key={id} className={i===1?'-mt-4':''}><BookCover book={bookById(id)} size="md" /></div>)}
          </div>
          <blockquote className="font-quote italic text-3xl leading-snug max-w-sm">"Satu kartu, ribuan dunia untuk dijelajahi."</blockquote>
          <div className="mt-4 text-white/60 text-sm">Perpustakaan Yayasan Saint Luke · sejak 1968</div>
        </div>
        <div className="relative flex items-center gap-6">
          {[['12.480+','Koleksi'],['58 thn','Melayani'],['4.8★','Kepuasan']].map(([v,l]) => (
            <div key={l}><div className="font-serif text-2xl">{v}</div><div className="text-xs text-white/60">{l}</div></div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RegField({ label, type = 'text', placeholder, select, options }) {
  return (
    <label className="block">
      <div className="text-xs font-mono uppercase tracking-editorial text-muted dark:text-paper/55 mb-2">{label}</div>
      {select ? (
        <select className="w-full bg-paper-2/40 dark:bg-night-3/50 border hairline rounded-xl px-4 py-3 text-sm text-ink dark:text-paper outline-none focus:border-cobalt">
          {options.map(o => <option key={o}>{o}</option>)}
        </select>
      ) : (
        <input type={type} placeholder={placeholder} className="w-full bg-paper-2/40 dark:bg-night-3/50 border hairline rounded-xl px-4 py-3 text-sm text-ink dark:text-paper outline-none focus:border-cobalt" />
      )}
    </label>
  );
}

/* ════════ BORROW / RETURN / REVIEW — global modals ════════ */
function openBorrow(book) { window.dispatchEvent(new CustomEvent('om-borrow', { detail: book })); }
function openReturn(book) { window.dispatchEvent(new CustomEvent('om-return', { detail: book })); }
function openReview(book) { window.dispatchEvent(new CustomEvent('om-review', { detail: book })); }

function FlowHost() {
  const [state, setState] = eUseState(null); // { mode, book }
  eUseEffect(() => {
    const onB = (e) => setState({ mode:'borrow', book:e.detail });
    const onR = (e) => setState({ mode:'return', book:e.detail });
    const onV = (e) => setState({ mode:'review', book:e.detail });
    window.addEventListener('om-borrow', onB);
    window.addEventListener('om-return', onR);
    window.addEventListener('om-review', onV);
    return () => { window.removeEventListener('om-borrow', onB); window.removeEventListener('om-return', onR); window.removeEventListener('om-review', onV); };
  }, []);
  eUseEffect(() => {
    if (state) { document.body.style.overflow = 'hidden'; const k = (e)=>{ if(e.key==='Escape') setState(null); }; document.addEventListener('keydown', k); return () => { document.body.style.overflow=''; document.removeEventListener('keydown', k); }; }
  }, [state]);
  if (!state) return null;
  const close = () => setState(null);
  return (
    <div className="fixed inset-0 z-[100] grid place-items-center p-4">
      <div className="absolute inset-0 bg-ink/70 dark:bg-black/80 backdrop-blur-sm qv-overlay" onClick={close} />
      <div className="qv-panel relative w-full max-w-lg bg-card dark:bg-night-2 rounded-xl2 border hairline shadow-lift overflow-hidden">
        {state.mode === 'borrow' && <BorrowBody book={state.book} onClose={close} />}
        {state.mode === 'return' && <ReturnBody book={state.book} onClose={close} />}
        {state.mode === 'review' && <ReviewBody book={state.book} onClose={close} />}
      </div>
    </div>
  );
}

function BorrowBody({ book, onClose }) {
  const [done, setDone] = eUseState(false);
  const meta = BOOK_TYPES[book.type];
  const physical = book.type === 'fisik';
  const due = new Date(Date.now() + 14*864e5).toLocaleDateString('id-ID', { day:'numeric', month:'long', year:'numeric' });
  if (done) {
    return (
      <div className="p-8 text-center">
        <div className="w-16 h-16 mx-auto grid place-items-center rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 mb-5"><Icon name="check" size={30} /></div>
        <h3 className="font-serif text-2xl text-ink dark:text-paper">Peminjaman berhasil!</h3>
        <p className="mt-2 text-sm text-muted dark:text-paper/60 max-w-sm mx-auto">{book.type === 'fisik' ? `Ambil "${book.title}" di rak ${book.rack}, Lantai 2.` : `"${book.title}" sudah tersedia di akunmu. Selamat membaca!`}</p>
        <div className="mt-5 p-4 rounded-xl bg-paper-2/40 dark:bg-night-3/40 text-sm flex items-center justify-between"><span className="text-muted dark:text-paper/55">Kode reservasi</span><span className="font-mono font-bold text-cobalt dark:text-cobalt-lt">SL-{book.id.toUpperCase()}-{Math.floor(Math.random()*900+100)}</span></div>
        <div className="mt-6 flex gap-3">
          {book.type !== 'fisik' && <Button variant="primary" className="flex-1" onClick={() => { onClose(); openViewer(book); }}>Baca Sekarang <Icon name="arrow-right" size={14} /></Button>}
          <Button variant={book.type !== 'fisik' ? 'outline' : 'primary'} className="flex-1" onClick={onClose}>Selesai</Button>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="flex items-start gap-4 p-6 border-b hairline">
        <BookCover book={book} size="sm" />
        <div className="flex-1 pt-1">
          <div className="text-[10px] font-mono uppercase tracking-editorial text-cobalt dark:text-cobalt-lt mb-1">Konfirmasi Peminjaman</div>
          <h3 className="font-serif text-xl text-ink dark:text-paper leading-tight">{book.title}</h3>
          <div className="text-sm text-muted dark:text-paper/55">{book.author}</div>
          <div className="mt-2"><TypeChip type={book.type} /></div>
        </div>
        <button onClick={onClose} aria-label="Tutup" className="w-9 h-9 grid place-items-center rounded-full border hairline text-muted hover:text-cobalt"><Icon name="close" size={16} /></button>
      </div>
      <div className="p-6">
        {physical ? (
          <div className="rounded-xl bg-brass-50 dark:bg-brass/10 border border-brass/30 p-4 flex items-start gap-3">
            <Icon name="book" size={20} className="text-brass shrink-0 mt-0.5" />
            <div className="text-sm text-ink dark:text-paper"><b>Buku fisik</b> — tidak dapat dipinjam daring. Silakan reservasi lalu ambil langsung di rak <b>{book.rack}</b>, Lantai 2 perpustakaan.</div>
          </div>
        ) : (
          <div className="rounded-xl bg-cobalt-50 dark:bg-cobalt/10 border border-cobalt/30 p-4 flex items-start gap-3">
            <Icon name={meta.icon} size={20} className="text-cobalt dark:text-cobalt-lt shrink-0 mt-0.5" />
            <div className="text-sm text-ink dark:text-paper"><b>{meta.label}</b> — dapat dibaca daring langsung setelah dipinjam. {book.type === 'keduanya' && 'Tersedia juga di rak fisik.'}</div>
          </div>
        )}
        <dl className="mt-5 space-y-3 text-sm">
          {[['Masa pinjam','14 hari'],['Jatuh tempo', due],['Lokasi rak', book.rack],['Format', (book.attachments||[]).map(a=>ATTACH_META[a].label).join(', ') || 'Cetak']].map(([k,v]) => (
            <div key={k} className="flex justify-between"><dt className="text-muted dark:text-paper/55">{k}</dt><dd className="text-ink dark:text-paper font-medium text-right">{v}</dd></div>
          ))}
        </dl>
        <div className="mt-6 flex gap-3">
          <Button variant="ghost" className="flex-1" onClick={onClose}>Batal</Button>
          <Button variant="primary" className="flex-1" onClick={() => setDone(true)}>{physical ? 'Reservasi' : 'Pinjam Sekarang'} <Icon name="arrow-right" size={14} /></Button>
        </div>
      </div>
    </div>
  );
}

function ReturnBody({ book, onClose }) {
  const [done, setDone] = eUseState(false);
  if (done) {
    return (
      <div className="p-8 text-center">
        <div className="w-16 h-16 mx-auto grid place-items-center rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 mb-5"><Icon name="check" size={30} /></div>
        <h3 className="font-serif text-2xl text-ink dark:text-paper">Buku dikembalikan</h3>
        <p className="mt-2 text-sm text-muted dark:text-paper/60">Terima kasih sudah menjaga "{book.title}". Mau beri ulasan singkat?</p>
        <div className="mt-6 flex gap-3">
          <Button variant="outline" className="flex-1" onClick={onClose}>Nanti saja</Button>
          <Button variant="primary" className="flex-1" onClick={() => { onClose(); openReview(book); }}><Icon name="star" size={14} /> Beri Ulasan</Button>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="flex items-start gap-4 p-6 border-b hairline">
        <BookCover book={book} size="sm" />
        <div className="flex-1 pt-1">
          <div className="text-[10px] font-mono uppercase tracking-editorial text-cobalt dark:text-cobalt-lt mb-1">Konfirmasi Pengembalian</div>
          <h3 className="font-serif text-xl text-ink dark:text-paper leading-tight">{book.title}</h3>
          <div className="text-sm text-muted dark:text-paper/55">{book.author}</div>
        </div>
        <button onClick={onClose} aria-label="Tutup" className="w-9 h-9 grid place-items-center rounded-full border hairline text-muted hover:text-cobalt"><Icon name="close" size={16} /></button>
      </div>
      <div className="p-6">
        <p className="text-sm text-ink dark:text-paper">Pastikan buku dalam kondisi baik. Untuk buku fisik, kembalikan ke meja sirkulasi Lantai 2. Untuk buku digital, akses bacamu akan dihentikan.</p>
        <div className="mt-5 flex gap-3">
          <Button variant="ghost" className="flex-1" onClick={onClose}>Batal</Button>
          <Button variant="primary" className="flex-1" onClick={() => setDone(true)}>Kembalikan Buku <Icon name="check" size={14} /></Button>
        </div>
      </div>
    </div>
  );
}

function ReviewBody({ book, onClose }) {
  const [rating, setRating] = eUseState(0);
  const [hover, setHover] = eUseState(0);
  const [text, setText] = eUseState('');
  const [done, setDone] = eUseState(false);
  if (done) {
    return (
      <div className="p-8 text-center">
        <div className="w-16 h-16 mx-auto grid place-items-center rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 mb-5"><Icon name="check" size={30} /></div>
        <h3 className="font-serif text-2xl text-ink dark:text-paper">Terima kasih atas ulasanmu!</h3>
        <p className="mt-2 text-sm text-muted dark:text-paper/60">Ulasanmu membantu pembaca lain menemukan buku yang tepat.</p>
        <Button variant="primary" className="mt-6" onClick={onClose}>Selesai</Button>
      </div>
    );
  }
  return (
    <div>
      <div className="flex items-start gap-4 p-6 border-b hairline">
        <BookCover book={book} size="sm" />
        <div className="flex-1 pt-1">
          <div className="text-[10px] font-mono uppercase tracking-editorial text-cobalt dark:text-cobalt-lt mb-1">Beri Ulasan</div>
          <h3 className="font-serif text-xl text-ink dark:text-paper leading-tight">{book.title}</h3>
          <div className="text-sm text-muted dark:text-paper/55">{book.author}</div>
        </div>
        <button onClick={onClose} aria-label="Tutup" className="w-9 h-9 grid place-items-center rounded-full border hairline text-muted hover:text-cobalt"><Icon name="close" size={16} /></button>
      </div>
      <div className="p-6">
        <div className="text-sm font-medium text-ink dark:text-paper mb-2">Berapa bintang untuk buku ini?</div>
        <div className="flex items-center gap-1.5" onMouseLeave={() => setHover(0)}>
          {[1,2,3,4,5].map(s => (
            <button key={s} onClick={() => setRating(s)} onMouseEnter={() => setHover(s)} className="btn-press" aria-label={`${s} bintang`}>
              <Icon name="star-fill" size={32} className={(hover||rating) >= s ? 'text-brass-lt' : 'text-paper-2 dark:text-night-3'} />
            </button>
          ))}
          {rating > 0 && <span className="ml-2 text-sm text-muted dark:text-paper/55">{['','Kurang','Cukup','Bagus','Sangat bagus','Luar biasa'][rating]}</span>}
        </div>
        <div className="mt-5">
          <div className="text-sm font-medium text-ink dark:text-paper mb-2">Tulis pendapatmu <span className="text-muted-2 font-normal">(opsional)</span></div>
          <textarea value={text} onChange={(e)=>setText(e.target.value)} rows={4} placeholder="Apa yang kamu suka atau tidak suka dari buku ini?" className="w-full bg-paper-2/40 dark:bg-night-3/50 border hairline rounded-xl px-4 py-3 text-sm text-ink dark:text-paper outline-none focus:border-cobalt resize-none" />
          <div className="mt-1 text-xs text-muted-2 text-right">{text.length}/500</div>
        </div>
        <div className="mt-4 flex gap-3">
          <Button variant="ghost" className="flex-1" onClick={onClose}>Batal</Button>
          <Button variant="primary" className="flex-1" disabled={rating === 0} onClick={() => setDone(true)}>Kirim Ulasan</Button>
        </div>
      </div>
    </div>
  );
}

/* ════════ ATTACHMENT VIEWER ════════ */
function openViewer(book, kind) { window.dispatchEvent(new CustomEvent('om-viewer', { detail: { book, kind } })); }

function ViewerHost() {
  const [data, setData] = eUseState(null);
  eUseEffect(() => {
    const on = (e) => setData(e.detail);
    window.addEventListener('om-viewer', on);
    return () => window.removeEventListener('om-viewer', on);
  }, []);
  eUseEffect(() => {
    if (data) { document.body.style.overflow = 'hidden'; const k=(e)=>{if(e.key==='Escape')setData(null);}; document.addEventListener('keydown',k); return ()=>{document.body.style.overflow='';document.removeEventListener('keydown',k);}; }
  }, [data]);
  if (!data) return null;
  const { book } = data;
  const atts = book.attachments && book.attachments.length ? book.attachments : ['pdf'];
  return <ViewerShell book={book} atts={atts} initial={data.kind} onClose={() => setData(null)} />;
}

function ViewerShell({ book, atts, initial, onClose }) {
  const [kind, setKind] = eUseState(initial && atts.includes(initial) ? initial : atts[0]);
  const [page, setPage] = eUseState(1);
  const pal = COVER_PALETTES[book.palette];
  const totalPages = 12;
  return (
    <div className="fixed inset-0 z-[110] flex flex-col bg-night text-paper qv-overlay">
      {/* top bar */}
      <div className="flex items-center justify-between gap-4 px-5 py-3 border-b border-night-line bg-night-2 shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-12 rounded shrink-0 spine-shadow" style={{ background: pal.bg }} />
          <div className="min-w-0">
            <div className="font-serif text-base truncate">{book.title}</div>
            <div className="text-xs text-paper/50 truncate">{book.author} · Akses Digital</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {atts.map(a => (
            <button key={a} onClick={() => setKind(a)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold inline-flex items-center gap-1.5 transition-colors ${kind === a ? 'bg-cobalt text-white' : 'bg-night-3 text-paper/70 hover:text-paper'}`}>
              <Icon name={ATTACH_META[a].icon} size={13} /> {ATTACH_META[a].label}
            </button>
          ))}
          <button onClick={onClose} aria-label="Tutup" className="ml-2 w-9 h-9 grid place-items-center rounded-full bg-night-3 hover:bg-night-4 text-paper"><Icon name="close" size={17} /></button>
        </div>
      </div>

      {/* stage */}
      <div className="flex-1 grid place-items-center overflow-auto p-6">
        {kind === 'pdf' && (
          <div className="w-full max-w-3xl mx-auto">
            <div className="bg-white text-ink rounded-lg shadow-2xl aspect-[1/1.414] p-10 lg:p-16 overflow-hidden relative">
              <div className="text-[10px] font-mono uppercase tracking-editorial text-muted">{book.title} · Hal {page}</div>
              <h2 className="mt-8 font-serif text-2xl text-ink">{page === 1 ? book.title : `Bab ${page}`}</h2>
              {page === 1 && <div className="mt-1 text-sm text-muted">{book.author}</div>}
              <div className="mt-6 space-y-3">
                {Array.from({length: 9}).map((_, i) => <div key={i} className="h-2.5 rounded bg-ink/10" style={{ width: `${88 - (i % 4) * 12}%` }} />)}
              </div>
              <p className="mt-6 text-sm leading-relaxed text-ink/70 line-clamp-6">{book.synopsis}</p>
            </div>
          </div>
        )}
        {kind === 'video' && (
          <div className="w-full max-w-3xl aspect-video rounded-xl bg-black grid place-items-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-30" style={{ background:`radial-gradient(circle at 50% 50%, ${pal.accent}, transparent 70%)` }} />
            <button className="relative w-20 h-20 rounded-full bg-white/90 grid place-items-center text-ink hover:scale-105 transition-transform"><Icon name="play" size={34} /></button>
            <div className="absolute bottom-0 inset-x-0 p-4"><div className="h-1 rounded-full bg-white/20"><div className="h-full w-1/3 rounded-full bg-cobalt" /></div><div className="mt-2 text-xs text-paper/60 flex justify-between"><span>Pengantar: {book.title}</span><span>04:12 / 12:30</span></div></div>
          </div>
        )}
        {kind === 'audio' && (
          <div className="w-full max-w-md rounded-2xl bg-night-2 border border-night-line p-8 text-center">
            <div className="w-40 h-40 mx-auto rounded-xl spine-shadow grid place-items-center mb-6" style={{ background: pal.bg, color: pal.ink }}><Icon name="play" size={40} /></div>
            <div className="font-serif text-xl">{book.title}</div>
            <div className="text-sm text-paper/50">Audiobook · Bab {page}</div>
            <div className="mt-6 flex items-center justify-center gap-5">
              <button className="text-paper/60 hover:text-paper"><Icon name="chevron-left" size={22} /></button>
              <button className="w-14 h-14 rounded-full bg-cobalt grid place-items-center text-white"><Icon name="play" size={24} /></button>
              <button className="text-paper/60 hover:text-paper"><Icon name="chevron-right" size={22} /></button>
            </div>
            <div className="mt-6 h-1 rounded-full bg-night-4"><div className="h-full w-2/5 rounded-full bg-cobalt" /></div>
            <div className="mt-2 text-xs text-paper/50 flex justify-between"><span>18:42</span><span>46:10</span></div>
          </div>
        )}
        {kind === 'image' && (
          <div className="w-full max-w-3xl">
            <div className="grid grid-cols-2 gap-3">
              {Array.from({length: 4}).map((_, i) => (
                <div key={i} className="aspect-[4/3] rounded-lg spine-shadow grid place-items-center relative overflow-hidden" style={{ background: COVER_PALETTES[(book.palette + i) % COVER_PALETTES.length].bg }}>
                  <div className="absolute inset-0 dot-grid opacity-30" />
                  <Icon name="download" size={28} style={{ color: COVER_PALETTES[(book.palette+i)%COVER_PALETTES.length].accent }} />
                  <span className="absolute bottom-2 left-3 text-[10px] font-mono uppercase tracking-editorial" style={{ color: COVER_PALETTES[(book.palette+i)%COVER_PALETTES.length].ink }}>Plat {i+1}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 text-center text-sm text-paper/50">Galeri ilustrasi · {book.title}</div>
          </div>
        )}
      </div>

      {/* bottom controls (pdf/audio paging) */}
      {(kind === 'pdf' || kind === 'audio') && (
        <div className="flex items-center justify-center gap-4 px-5 py-3 border-t border-night-line bg-night-2 shrink-0">
          <button onClick={() => setPage(Math.max(1, page-1))} disabled={page===1} className="w-9 h-9 grid place-items-center rounded-full bg-night-3 disabled:opacity-30 hover:bg-night-4"><Icon name="chevron-left" size={16} /></button>
          <span className="text-sm text-paper/60 tabnum">{kind==='pdf' ? `Halaman ${page} / ${totalPages}` : `Bab ${page} / 8`}</span>
          <button onClick={() => setPage(Math.min(kind==='pdf'?totalPages:8, page+1))} className="w-9 h-9 grid place-items-center rounded-full bg-night-3 hover:bg-night-4"><Icon name="chevron-right" size={16} /></button>
        </div>
      )}
    </div>
  );
}

Object.assign(window, {
  HistoryPage, SettingsPage, RegisterPage,
  FlowHost, ViewerHost, openBorrow, openReturn, openReview, openViewer,
  AccountTabs,
});
