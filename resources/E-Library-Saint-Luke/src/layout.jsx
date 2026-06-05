// layout.jsx — Navbar, Footer, AppShell
const { useState: lUseState, useEffect: lUseEffect, useRef: lUseRef } = React;

/* Tiny router helpers */
function useHashRoute() {
    const [route, setRoute] = lUseState(() => parseRoute(window.location.hash));
    lUseEffect(() => {
        const onH = () => setRoute(parseRoute(window.location.hash));
        window.addEventListener('hashchange', onH);
        return () => window.removeEventListener('hashchange', onH);
    }, []);
    return route;
}
function parseRoute(hash) {
    const clean = (hash || '').replace(/^#\/?/, '');
    const [path = '', q = ''] = clean.split('?');
    const segs = path.split('/').filter(Boolean);
    const query = Object.fromEntries(new URLSearchParams(q));
    return { path: segs.join('/'), segs, query };
}
function goTo(path) {
    window.location.hash = '/' + path.replace(/^\//, '');
    // scroll the layout's main scroller back to top on nav
    setTimeout(() => {
        const sc = document.getElementById('app-scroll');
        if (sc) sc.scrollTo({ top: 0, behavior: 'smooth' });
        else window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);
}

/* Brand mark — neutral placeholder (no copyrighted logo) */
function BrandMark({ size = 38 }) {
    return (
        <div className="flex items-center gap-3">
            <div
                className="relative grid place-items-center rounded-xl bg-ink text-paper shadow-soft dark:bg-card dark:text-ink"
                style={{ width: size, height: size }}
                aria-hidden="true"
            >
                <span className="font-serif text-[19px] leading-none italic">
                    SL
                </span>
                <span className="absolute -right-1 -bottom-1 h-3 w-3 rounded-full border-2 border-paper bg-cobalt dark:border-night" />
            </div>
            <div className="leading-tight">
                <div className="font-serif text-[16px] font-semibold text-ink dark:text-paper">
                    E-Library
                </div>
                <div className="font-sans text-[9px] tracking-editorial text-muted uppercase dark:text-paper/55">
                    Yayasan Pendidikan Umum Santo Lukas Pademangan - Jakarta
                    Utara
                </div>
            </div>
        </div>
    );
}

/* ── i18n: lightweight language toggle (ID/EN) ── */
let __LANG = (() => {
    try {
        return localStorage.getItem('elib_lang') || 'id';
    } catch {
        return 'id';
    }
})();
function getLang() {
    return __LANG;
}
function setLang(l) {
    __LANG = l;
    try {
        localStorage.setItem('elib_lang', l);
    } catch {}
    document.documentElement.lang = l;
    window.dispatchEvent(new CustomEvent('om-lang', { detail: l }));
}
function useLang() {
    const [l, setL] = lUseState(getLang());
    lUseEffect(() => {
        const h = (e) => setL(e.detail);
        window.addEventListener('om-lang', h);
        return () => window.removeEventListener('om-lang', h);
    }, []);
    return l;
}
function t(id, en) {
    return getLang() === 'en' ? en : id;
}

/* Nav items + dropdowns */
const NAV = [
    { label: 'Beranda', labelEn: 'Home', path: '' },
    {
        label: 'Katalog',
        labelEn: 'Catalog',
        path: 'katalog',
        menu: [
            {
                label: 'Semua Buku',
                labelEn: 'All Books',
                desc: 'Telusuri seluruh koleksi dengan filter lengkap',
                descEn: 'Browse the full collection with filters',
                path: 'katalog/buku',
            },
            {
                label: 'Kategori',
                labelEn: 'Categories',
                desc: 'Jelajahi berdasarkan tema dan disiplin',
                descEn: 'Explore by theme and discipline',
                path: 'katalog/kategori',
            },
            {
                label: 'Penulis',
                labelEn: 'Authors',
                desc: 'Index A–Z penulis dan karya mereka',
                descEn: 'A–Z index of authors and works',
                path: 'katalog/penulis',
            },
            {
                label: 'Penerbit',
                labelEn: 'Publishers',
                desc: 'Daftar penerbit dan koleksi terkait',
                descEn: 'Publishers and related collections',
                path: 'katalog/penerbit',
            },
            {
                label: 'Buku Terpopuler',
                labelEn: 'Top Reads',
                desc: 'Daftar pilihan pembaca semester ini',
                descEn: "This semester's reader picks",
                path: 'top',
            },
        ],
    },
    { label: 'Sumber', labelEn: 'Resources', path: 'sumber' },
    { label: 'Berita', labelEn: 'News', path: 'berita' },
    {
        label: 'Tentang',
        labelEn: 'About',
        path: 'tentang',
        menu: [
            {
                label: 'Profil Yayasan',
                labelEn: 'Foundation Profile',
                desc: 'Riwayat dan filosofi perpustakaan',
                descEn: 'History and philosophy of the library',
                path: 'tentang/profil',
            },
            {
                label: 'Visi & Misi',
                labelEn: 'Vision & Mission',
                desc: 'Apa yang kami tuju dan kami lakukan',
                descEn: 'What we aim for and what we do',
                path: 'tentang/visi-misi',
            },
            {
                label: 'Struktur Organisasi',
                labelEn: 'Organization',
                desc: 'Tim di balik perpustakaan',
                descEn: 'The team behind the library',
                path: 'tentang/struktur',
            },
            {
                label: 'Kontak',
                labelEn: 'Contact',
                desc: 'Alamat, jam, dan peta',
                descEn: 'Address, hours, and map',
                path: 'tentang/kontak',
            },
        ],
    },
];

/* Dropdown menu */
function DropdownMenu({ items, onSelect, lang }) {
    const [stage, setStage] = lUseState('out');
    lUseEffect(() => {
        const t = setTimeout(() => setStage('in'), 16);
        return () => clearTimeout(t);
    }, []);
    return (
        <div
            className={`hairline dd-enter absolute top-full left-0 mt-3 w-[360px] overflow-hidden rounded-xl2 border bg-card shadow-lift dark:bg-night-2 ${stage === 'in' ? 'in' : ''}`}
            role="menu"
        >
            <div className="p-2">
                {items.map((it, i) => (
                    <button
                        key={i}
                        role="menuitem"
                        onClick={() => onSelect(it.path)}
                        className="group flex w-full items-start gap-3 rounded-lg px-4 py-3 text-left transition-colors hover:bg-paper-2/70 dark:hover:bg-night-3"
                    >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cobalt transition-transform group-hover:scale-150" />
                        <span className="flex-1">
                            <span className="block font-serif text-[15px] text-ink dark:text-paper">
                                {lang === 'en' ? it.labelEn : it.label}
                            </span>
                            <span className="mt-0.5 block text-xs text-muted dark:text-paper/55">
                                {lang === 'en' ? it.descEn : it.desc}
                            </span>
                        </span>
                        <Icon
                            name="arrow-up-right"
                            size={14}
                            className="mt-1 text-ink opacity-0 transition-opacity group-hover:opacity-60 dark:text-paper"
                        />
                    </button>
                ))}
            </div>
        </div>
    );
}

/* Search field — used in navbar */
function SearchField({ compact = false, autoFocus = false, onSubmit }) {
    const [q, setQ] = lUseState('');
    const [focus, setFocus] = lUseState(false);
    const inp = lUseRef(null);
    lUseEffect(() => {
        if (autoFocus && inp.current) inp.current.focus();
    }, [autoFocus]);
    const submit = (e) => {
        e?.preventDefault();
        if (q.trim()) {
            (onSubmit || ((t) => goTo(`cari?q=${encodeURIComponent(t)}`)))(
                q.trim(),
            );
        }
    };
    return (
        <form
            onSubmit={submit}
            className={`group hairline flex items-center gap-2 rounded-full border bg-card/70 backdrop-blur transition-all dark:bg-night-2/70 ${focus ? 'border-cobalt shadow-soft' : ''} ${compact ? 'h-10 px-4' : 'h-12 px-5'}`}
            role="search"
        >
            <Icon
                name="search"
                size={compact ? 15 : 17}
                className="text-ink/60 dark:text-paper/55"
            />
            <input
                ref={inp}
                type="search"
                placeholder="Cari judul, penulis, atau ISBN..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                className={`placeholder:text-muted-2 flex-1 bg-transparent outline-none dark:text-paper dark:placeholder:text-paper/40 ${compact ? 'text-sm' : 'text-[15px]'}`}
                aria-label="Pencarian katalog"
            />
            {q && (
                <button
                    type="button"
                    onClick={() => setQ('')}
                    aria-label="Hapus"
                    className="text-muted hover:text-ink dark:hover:text-paper"
                >
                    <Icon name="close" size={14} />
                </button>
            )}
            {!compact && (
                <button
                    type="submit"
                    className="rounded-full bg-cobalt px-4 py-1.5 font-sans text-[10px] font-semibold tracking-editorial text-white uppercase transition-colors hover:bg-cobalt-dk"
                >
                    Cari
                </button>
            )}
        </form>
    );
}

/* Navbar */
function Navbar({ onToggleDark, dark, active }) {
    const [open, setOpen] = lUseState(null); // dropdown key
    const [mobile, setMobile] = lUseState(false);
    const [scrolled, setScrolled] = lUseState(false);
    const lang = useLang();
    const closeT = lUseRef(null);

    lUseEffect(() => {
        const sc = document.getElementById('app-scroll');
        const onS = () => setScrolled((sc?.scrollTop ?? window.scrollY) > 8);
        onS();
        if (sc) sc.addEventListener('scroll', onS);
        else window.addEventListener('scroll', onS);
        return () => {
            if (sc) sc.removeEventListener('scroll', onS);
            else window.removeEventListener('scroll', onS);
        };
    }, []);

    const handleEnter = (k) => {
        clearTimeout(closeT.current);
        setOpen(k);
    };
    const handleLeave = () => {
        closeT.current = setTimeout(() => setOpen(null), 150);
    };

    return (
        <header
            className={`sticky top-0 z-40 transition-all duration-300 ${
                scrolled
                    ? 'hairline border-b bg-card/85 backdrop-blur-md dark:bg-night/85'
                    : 'border-b border-transparent bg-paper dark:bg-night'
            }`}
        >
            {/* top strip */}
            <div className="hairline border-b bg-ink/[.03] dark:bg-night-2/40">
                <div className="mx-auto flex h-8 max-w-7xl items-center justify-between px-6 font-sans text-[11px] text-ink/60 lg:px-10 dark:text-paper/55">
                    <div className="flex items-center gap-4">
                        <span className="hidden items-center gap-1.5 sm:inline-flex">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />{' '}
                            {t('Perpustakaan buka', 'Library open')} ·{' '}
                            <span className="font-medium">06.30 – 16.00</span>
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <a
                            href="#/sumber"
                            className="hover:text-cobalt dark:hover:text-cobalt-lt"
                        >
                            {t('Sumber Digital', 'Digital Resources')}
                        </a>
                        <a
                            href="#/tentang/kontak"
                            className="hover:text-cobalt dark:hover:text-cobalt-lt"
                        >
                            {t('Bantuan', 'Help')}
                        </a>
                        <a
                            href="#/berita"
                            className="hidden hover:text-cobalt sm:inline dark:hover:text-cobalt-lt"
                        >
                            {t('Berita', 'News')}
                        </a>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-6 lg:px-10">
                <div className="flex h-[68px] items-center justify-between gap-6">
                    <a
                        href="#/"
                        className="flex shrink-0 items-center gap-3"
                        aria-label="Beranda"
                    >
                        <BrandMark />
                    </a>

                    {/* desktop nav */}
                    <nav
                        className="hidden items-center gap-1 lg:flex"
                        aria-label="Navigasi utama"
                    >
                        {NAV.map((n) => (
                            <div
                                key={n.path || 'home'}
                                className="relative"
                                onMouseEnter={() =>
                                    n.menu && handleEnter(n.path || 'home')
                                }
                                onMouseLeave={() => n.menu && handleLeave()}
                            >
                                <a
                                    href={`#/${n.path}`}
                                    aria-current={
                                        active === (n.path || 'home')
                                            ? 'page'
                                            : undefined
                                    }
                                    className={`nav-link inline-flex items-center gap-1 rounded-full px-3.5 py-2 font-sans text-[14px] font-medium text-ink transition-colors hover:text-cobalt dark:text-paper dark:hover:text-cobalt-lt`}
                                >
                                    {lang === 'en' ? n.labelEn : n.label}
                                    {n.menu && (
                                        <Icon
                                            name="chevron-down"
                                            size={12}
                                            className={`transition-transform ${open === (n.path || 'home') ? 'rotate-180' : ''}`}
                                        />
                                    )}
                                </a>
                                {n.menu && open === (n.path || 'home') && (
                                    <DropdownMenu
                                        items={n.menu}
                                        lang={lang}
                                        onSelect={(p) => {
                                            setOpen(null);
                                            goTo(p);
                                        }}
                                    />
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* right controls */}
                    <div className="flex items-center gap-2">
                        <div className="hidden w-[260px] md:block xl:w-[320px]">
                            <SearchField compact />
                        </div>
                        {/* language toggle */}
                        <div className="hairline hidden items-center overflow-hidden rounded-full border text-[11px] font-bold sm:flex">
                            {['id', 'en'].map((lc) => (
                                <button
                                    key={lc}
                                    onClick={() => setLang(lc)}
                                    className={`px-2.5 py-2 tracking-wider uppercase transition-colors ${lang === lc ? 'bg-cobalt text-white' : 'text-muted hover:text-ink dark:text-paper/55 dark:hover:text-paper'}`}
                                    aria-label={
                                        lc === 'id'
                                            ? 'Bahasa Indonesia'
                                            : 'English'
                                    }
                                    aria-pressed={lang === lc}
                                >
                                    {lc}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={onToggleDark}
                            aria-label={dark ? 'Mode terang' : 'Mode malam'}
                            className="hairline grid h-10 w-10 place-items-center rounded-full border text-ink transition-colors hover:border-cobalt/40 hover:text-cobalt dark:text-paper dark:hover:text-cobalt-lt"
                        >
                            <Icon name={dark ? 'sun' : 'moon'} size={17} />
                        </button>
                        <a
                            href="#/akun"
                            className="btn-press hidden items-center gap-2 rounded-full bg-cobalt px-4 py-2.5 font-sans text-[12px] font-semibold tracking-editorial text-white uppercase transition-colors hover:bg-cobalt-dk md:inline-flex"
                        >
                            <Icon name="user" size={14} />{' '}
                            {t('Masuk', 'Sign In')}
                        </a>
                        <button
                            onClick={() => setMobile(true)}
                            aria-label="Buka menu"
                            className="hairline grid h-10 w-10 place-items-center rounded-full border text-ink lg:hidden dark:text-paper"
                        >
                            <Icon name="menu" size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* mobile drawer */}
            {mobile && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div
                        className="absolute inset-0 bg-ink/40"
                        onClick={() => setMobile(false)}
                    />
                    <div className="absolute top-0 right-0 bottom-0 w-[88%] max-w-sm overflow-y-auto bg-paper dark:bg-night">
                        <div className="hairline flex items-center justify-between border-b p-5">
                            <BrandMark />
                            <button
                                onClick={() => setMobile(false)}
                                aria-label="Tutup"
                                className="grid h-10 w-10 place-items-center"
                            >
                                <Icon name="close" size={20} />
                            </button>
                        </div>
                        <div className="hairline border-b p-5">
                            <SearchField />
                        </div>
                        <nav className="p-3" aria-label="Navigasi seluler">
                            {NAV.map((n) => (
                                <div key={n.path || 'home'} className="py-1">
                                    <a
                                        href={`#/${n.path}`}
                                        onClick={() => setMobile(false)}
                                        className="block px-3 py-2 font-serif text-lg text-ink dark:text-paper"
                                    >
                                        {lang === 'en' ? n.labelEn : n.label}
                                    </a>
                                    {n.menu && (
                                        <div className="hairline ml-3 border-l pl-6">
                                            {n.menu.map((m) => (
                                                <a
                                                    key={m.path}
                                                    href={`#/${m.path}`}
                                                    onClick={() =>
                                                        setMobile(false)
                                                    }
                                                    className="block py-1.5 text-sm text-ink/70 hover:text-cobalt dark:text-paper/70"
                                                >
                                                    {lang === 'en'
                                                        ? m.labelEn
                                                        : m.label}
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </nav>
                    </div>
                </div>
            )}
        </header>
    );
}

/* Footer */
function Footer() {
    const lang = useLang();
    return (
        <footer className="mt-0 bg-ink text-paper dark:bg-night-2">
            {/* newsletter band */}
            <div className="border-b border-paper/10">
                <div className="mx-auto grid max-w-7xl grid-cols-12 items-center gap-8 px-6 py-12 lg:px-10">
                    <div className="col-span-12 lg:col-span-6">
                        <h3
                            className="font-serif text-2xl lg:text-3xl"
                            style={{ textWrap: 'balance' }}
                        >
                            {t(
                                'Dapatkan rekomendasi bacaan tiap bulan',
                                'Get monthly reading recommendations',
                            )}
                        </h3>
                        <p className="mt-2 max-w-md text-sm text-paper/60">
                            {t(
                                'Berlangganan buletin perpustakaan untuk kabar koleksi baru, acara klub baca, dan pilihan pustakawan.',
                                'Subscribe to the library newsletter for new collections, book club events, and librarian picks.',
                            )}
                        </p>
                    </div>
                    <div className="col-span-12 lg:col-span-6">
                        <form
                            onSubmit={(e) => e.preventDefault()}
                            className="flex max-w-md items-center gap-2 rounded-full border border-paper/10 bg-night-3/80 p-2 transition-colors focus-within:border-cobalt/50 lg:ml-auto dark:bg-night-3"
                        >
                            <Icon
                                name="mail"
                                size={18}
                                className="ml-3 text-paper/50"
                            />
                            <input
                                type="email"
                                placeholder={t(
                                    'Alamat surel sekolah',
                                    'School email address',
                                )}
                                className="flex-1 bg-transparent py-2 text-sm text-paper outline-none placeholder:text-paper/40"
                                aria-label="Email"
                            />
                            <button className="btn-press rounded-full bg-cobalt px-5 py-2.5 text-xs font-semibold tracking-editorial whitespace-nowrap text-white uppercase transition-colors hover:bg-cobalt-dk">
                                {t('Langganan', 'Subscribe')}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-6 pt-16 pb-10 lg:px-10">
                <div className="grid grid-cols-12 gap-8">
                    <div className="col-span-12 md:col-span-5">
                        <div className="flex items-center gap-3">
                            <div className="grid h-12 w-12 place-items-center rounded-xl bg-card text-ink">
                                <span className="font-serif text-[22px] leading-none italic">
                                    SL
                                </span>
                            </div>
                            <div>
                                <div className="font-serif text-2xl">
                                    Perpustakaan Santo Lukas
                                </div>
                                <div className="mt-1 font-sans text-[10px] tracking-editorial text-paper/55 uppercase">
                                    Yayasan Pendidikan · Jakarta Utara
                                </div>
                            </div>
                        </div>
                        <p className="mt-6 max-w-md text-sm leading-relaxed text-paper/70">
                            Tempat tenang untuk membaca, meriset, dan tumbuh —
                            sejak 1968. Lebih dari dua belas ribu koleksi
                            merawat ingatan dan menumbuhkan rasa ingin tahu
                            siswa dari SD hingga SMA.
                        </p>
                        <div className="mt-6 flex items-center gap-2">
                            <a
                                href="#/tentang/kontak"
                                className="grid h-10 w-10 place-items-center rounded-full border border-paper/20 transition-colors hover:border-cobalt hover:bg-cobalt hover:text-white"
                            >
                                <Icon name="mail" size={16} />
                            </a>
                            <a
                                href="#/tentang/kontak"
                                className="grid h-10 w-10 place-items-center rounded-full border border-paper/20 transition-colors hover:border-cobalt hover:bg-cobalt hover:text-white"
                            >
                                <Icon name="phone" size={16} />
                            </a>
                            <a
                                href="#/tentang/kontak"
                                className="grid h-10 w-10 place-items-center rounded-full border border-paper/20 transition-colors hover:border-cobalt hover:bg-cobalt hover:text-white"
                            >
                                <Icon name="instagram" size={16} />
                            </a>
                        </div>
                    </div>

                    <div className="col-span-6 md:col-span-2">
                        <div className="mb-4 font-sans text-[10px] tracking-editorial text-paper/45 uppercase">
                            {t('Jelajahi', 'Explore')}
                        </div>
                        <ul className="space-y-2.5 text-sm text-paper/70">
                            <li>
                                <a
                                    href="#/katalog/buku"
                                    className="transition-colors hover:text-cobalt-lt"
                                >
                                    Katalog Buku
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#/katalog/penulis"
                                    className="transition-colors hover:text-cobalt-lt"
                                >
                                    Penulis
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#/katalog/penerbit"
                                    className="transition-colors hover:text-cobalt-lt"
                                >
                                    Penerbit
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#/top"
                                    className="transition-colors hover:text-cobalt-lt"
                                >
                                    Buku Terpopuler
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#/sumber"
                                    className="transition-colors hover:text-cobalt-lt"
                                >
                                    Sumber Daring
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-span-6 md:col-span-2">
                        <div className="mb-4 font-sans text-[10px] tracking-editorial text-paper/45 uppercase">
                            {t('Yayasan', 'Foundation')}
                        </div>
                        <ul className="space-y-2.5 text-sm text-paper/70">
                            <li>
                                <a
                                    href="#/tentang/profil"
                                    className="transition-colors hover:text-cobalt-lt"
                                >
                                    Profil
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#/tentang/visi-misi"
                                    className="transition-colors hover:text-cobalt-lt"
                                >
                                    Visi & Misi
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#/tentang/struktur"
                                    className="transition-colors hover:text-cobalt-lt"
                                >
                                    Struktur
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#/berita"
                                    className="transition-colors hover:text-cobalt-lt"
                                >
                                    Berita
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#/tentang/kontak"
                                    className="transition-colors hover:text-cobalt-lt"
                                >
                                    Kontak
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-span-12 md:col-span-3">
                        <div className="mb-4 font-sans text-[10px] tracking-editorial text-paper/45 uppercase">
                            {t('Datang Berkunjung', 'Visit Us')}
                        </div>
                        <address className="text-sm leading-relaxed text-paper/75 not-italic">
                            {CONTACT.address}
                        </address>
                        <div className="mt-4 space-y-1.5 text-sm text-paper/75">
                            <div className="flex items-start gap-2">
                                <Icon
                                    name="phone"
                                    size={14}
                                    className="mt-0.5 text-cobalt-lt"
                                />{' '}
                                {CONTACT.phone}
                            </div>
                            <div className="flex items-start gap-2">
                                <Icon
                                    name="mail"
                                    size={14}
                                    className="mt-0.5 text-cobalt-lt"
                                />{' '}
                                {CONTACT.email}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 flex flex-col justify-between gap-3 border-t border-paper/10 pt-6 text-xs text-paper/55 md:flex-row">
                    <div>
                        © 2026 Yayasan Santo Lukas · Seluruh hak cipta
                        dilindungi.
                    </div>
                    <div className="font-mono tracking-editorial uppercase">
                        Dirancang untuk pembaca, oleh pembaca.
                    </div>
                </div>
            </div>
        </footer>
    );
}

Object.assign(window, {
    useHashRoute,
    goTo,
    Navbar,
    Footer,
    BrandMark,
    SearchField,
    useLang,
    getLang,
    setLang,
    t,
});
