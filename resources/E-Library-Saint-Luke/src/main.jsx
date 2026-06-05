// main.jsx — Root component: routing + tweaks + theming

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "dark": true,
  "tilt3d": true,
  "density": "comfortable",
  "dropCap": true,
  "accent": "cobalt"
}/*EDITMODE-END*/;

const ACCENTS = {
  cobalt:    { name: 'Emerald',  hex: '#1F9D73', dk: '#15795A', lt: '#34C690' },
  brass:     { name: 'Brass',    hex: '#B0822F', dk: '#7C5A28', lt: '#D2A653' },
  teal:      { name: 'Teal',     hex: '#0E8C8C', dk: '#0A6A6A', lt: '#2FB6B6' },
  violet:    { name: 'Plum',     hex: '#7A4BC4', dk: '#5C36A0', lt: '#9D74E0' },
};

function App() {
  const route = useHashRoute();
  const lang = useLang();
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // dark mode
  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', !!t.dark);
  }, [t.dark]);

  // 3D toggle — adds .no3d to html which disables hover transform
  React.useEffect(() => {
    document.documentElement.classList.toggle('no3d', !t.tilt3d);
  }, [t.tilt3d]);

  // accent override — only changes hue, keeps Nordic structure
  React.useEffect(() => {
    const a = ACCENTS[t.accent] || ACCENTS.cobalt;
    const css = `
      .text-cobalt { color: ${a.hex} !important; }
      .bg-cobalt   { background-color: ${a.hex} !important; }
      .bg-cobalt-dk, .hover\\:bg-cobalt-dk:hover { background-color: ${a.dk} !important; }
      .border-cobalt { border-color: ${a.hex} !important; }
      .hover\\:border-cobalt:hover { border-color: ${a.hex} !important; }
      .hover\\:text-cobalt:hover { color: ${a.hex} !important; }
      .hover\\:text-cobalt-dk:hover { color: ${a.dk} !important; }
      .group:hover .group-hover\\:text-cobalt { color: ${a.hex} !important; }
      .focus\\:border-cobalt:focus, .focus-within\\:border-cobalt:focus-within { border-color: ${a.hex} !important; }
      .text-cobalt-dk { color: ${a.dk} !important; }
      .dark .dark\\:text-cobalt-lt { color: ${a.lt} !important; }
      .drop-cap::first-letter { color: ${a.hex} !important; }
      ::selection { background: ${a.hex} !important; color: #FFFFFF !important; }
      *:focus-visible { outline-color: ${a.hex} !important; }
      .nav-link::after { background: ${a.hex} !important; }
      .section-num { color: ${a.hex} !important; }
      .accent-cobalt { accent-color: ${a.hex} !important; }
      .book-3d:hover .book-title { color: ${a.hex} !important; }
    `;
    let el = document.getElementById('accent-css');
    if (!el) {
      el = document.createElement('style');
      el.id = 'accent-css';
      document.head.appendChild(el);
    }
    el.textContent = css;
  }, [t.accent]);

  // density CSS var
  React.useEffect(() => {
    document.documentElement.style.setProperty('--density', t.density === 'compact' ? '.88' : '1');
  }, [t.density]);

  const page = resolvePage(route, t);
  const activeNav = activeNavKey(route);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar dark={t.dark} onToggleDark={() => setTweak('dark', !t.dark)} active={activeNav} />
      <main className="flex-1">
        <PageTransition pageKey={route.path}>
          {page}
        </PageTransition>
      </main>
      <Footer />
      <QuickViewHost />
      <FlowHost />
      <ViewerHost />

      <TweaksPanel title="Tweaks · E-Library">
        <TweakSection label="Tema" />
        <TweakColor
          label="Warna aksen"
          value={ACCENTS[t.accent]?.hex || ACCENTS.cobalt.hex}
          options={[ACCENTS.cobalt.hex, ACCENTS.brass.hex, ACCENTS.teal.hex, ACCENTS.violet.hex]}
          onChange={(v) => {
            const key = Object.keys(ACCENTS).find(k => ACCENTS[k].hex === v) || 'cobalt';
            setTweak('accent', key);
          }}
        />
        <TweakToggle label="Mode malam" value={t.dark} onChange={(v) => setTweak('dark', v)} />

        <TweakSection label="Interaksi" />
        <TweakToggle label="Animasi 3D pada cover" value={t.tilt3d} onChange={(v) => setTweak('tilt3d', v)} />
        <TweakToggle label="Drop cap pada sinopsis" value={t.dropCap} onChange={(v) => setTweak('dropCap', v)} />
        <TweakRadio label="Kepadatan"
          value={t.density}
          options={['compact','comfortable']}
          onChange={(v) => setTweak('density', v)}
        />

        <TweakSection label="Navigasi cepat" />
        <TweakButton label="Beranda" onClick={() => goTo('')} />
        <TweakButton label="Katalog + Filter" onClick={() => goTo('katalog/buku')} />
        <TweakButton label="Detail Buku (contoh)" onClick={() => goTo('buku/b001')} />
        <TweakButton label="Dashboard Anggota" onClick={() => goTo('akun/dashboard')} />
        <TweakButton label="Riwayat Peminjaman" onClick={() => goTo('akun/riwayat')} />
        <TweakButton label="Pengaturan Profil" onClick={() => goTo('akun/pengaturan')} />
        <TweakButton label="Aktivasi / Register" onClick={() => goTo('daftar')} />
      </TweaksPanel>
    </div>
  );
}

function activeNavKey(route) {
  const seg = route.segs[0];
  if (!seg) return 'home';
  if (seg === 'katalog' || seg === 'buku' || seg === 'penulis' || seg === 'top') return 'katalog';
  if (seg === 'sumber') return 'sumber';
  if (seg === 'berita') return 'berita';
  if (seg === 'tentang') return 'tentang';
  return seg;
}

function resolvePage(route, t) {
  const [a, b] = route.segs;
  if (!a) return <HomePage />;
  if (a === 'katalog') {
    if (b === 'buku' || !b) return <CatalogPage route={route} />;
    if (b === 'kategori') return <CategoryPage />;
    if (b === 'penulis')  return <AuthorsPage />;
    if (b === 'penerbit') return <PublishersPage />;
    return <CatalogPage route={route} />;
  }
  if (a === 'buku' && b) return <BookDetailPage id={b} dropCap={t.dropCap} />;
  if (a === 'penulis' && b) return <AuthorDetailPage id={b} />;
  if (a === 'top') return <TopReadsPage />;
  if (a === 'sumber') return <ResourcesPage />;
  if (a === 'berita') return b ? <NewsDetailPage id={b} /> : <NewsListPage />;
  if (a === 'tentang') {
    if (b === 'profil')      return <ProfilePage />;
    if (b === 'visi-misi')   return <VisionPage />;
    if (b === 'struktur')    return <StructurePage />;
    if (b === 'kontak')      return <ContactPage />;
    return <ProfilePage />;
  }
  if (a === 'akun') {
    if (b === 'dashboard') return <DashboardPage />;
    if (b === 'wishlist')  return <WishlistPage />;
    if (b === 'riwayat')   return <HistoryPage />;
    if (b === 'pengaturan') return <SettingsPage />;
    return <LoginPage />;
  }
  if (a === 'daftar') return <RegisterPage />;
  if (a === 'cari') return <SearchPage route={route} />;
  return <NotFound />;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
