import React, { useEffect, useRef, useState } from 'react';
import { Link, router } from '@inertiajs/react';
import { route } from 'ziggy-js';
import {
    Search,
    Menu,
    X,
    ChevronDown,
    Moon,
    Sun,
    User,
    ArrowUpRight,
    LayoutDashboard,
    Settings,
    History as HistoryIcon,
    LogOut,
} from 'lucide-react';
import { navItems, navAuthItems, profileSubNavItems } from '@/data/data';
import { useLanguage } from '@/hooks/useLanguage';
import { useAppearance } from '@/hooks/use-appearance';
import type { NavItem } from '@/types/navbar';

/* Brand mark — SL monogram + wordmark */
function BrandMark() {
    return (
        <div className="flex items-center gap-3">
            <div
                className="relative grid h-[38px] w-[38px] place-items-center rounded-xl bg-ink text-paper shadow-soft dark:bg-card dark:text-ink"
                aria-hidden="true"
            >
               <img src="/assets/logos/Saint-Luke.png" alt="Logo Saint Luke" className="h-full w-full" />
                <span className="absolute -right-1 -bottom-1 h-3 w-3 rounded-full border-2 border-paper bg-cobalt dark:border-night" />
            </div>
            <div className="leading-tight">
                <div className="font-display text-[16px] font-semibold text-foreground">
                    E-Library
                </div>
                <div className="font-sans text-[9px] tracking-editorial text-muted-foreground uppercase">
                    Yayasan Pendidikan Umum Santo Lukas
                </div>
            </div>
        </div>
    );
}

const profileIcons: Record<
    string,
    React.ComponentType<{ className?: string }>
> = {
    dashboard: LayoutDashboard,
    settings: Settings,
    riwayat: HistoryIcon,
    logout: LogOut,
};

const Navbar = ({ initialAuth }: { initialAuth?: any }) => {
    const { language, setLanguage } = useLanguage();
    const { resolvedAppearance, updateAppearance } = useAppearance();
    const isDark = resolvedAppearance === 'dark';

    const [auth, setAuth] = useState<any>(initialAuth ?? null);
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [openMenu, setOpenMenu] = useState<string | null>(null);
    const [currentPath, setCurrentPath] = useState<string>(
        typeof window !== 'undefined' ? window.location.pathname : '/',
    );
    const [search, setSearch] = useState('');
    const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const isAuthenticated = !!auth?.user;

    useEffect(() => {
        const remove = router.on('navigate', (event) => {
            const page = event.detail.page;
            setAuth((page.props as any).auth ?? null);
            setCurrentPath(page.url.split('?')[0]);
        });
        return remove;
    }, []);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        document.body.classList.toggle('overflow-hidden', mobileOpen);
        return () => document.body.classList.remove('overflow-hidden');
    }, [mobileOpen]);

    const t = (id: string, en: string) => (language === 'en' ? en : id);

    const isActive = (href: string) =>
        href === '/'
            ? currentPath === '/'
            : currentPath === href || currentPath.startsWith(href + '/');

    const handleEnter = (id: string) => {
        if (closeTimer.current) clearTimeout(closeTimer.current);
        setOpenMenu(id);
    };
    const handleLeave = () => {
        closeTimer.current = setTimeout(() => setOpenMenu(null), 140);
    };

    const submitSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const kw = search.trim();
        router.get(route('resource'), kw ? { search: kw } : {});
    };

    const avatarSrc = auth?.user?.avatar
        ? `/storage/${auth.user.avatar}`
        : '/assets/images/default-avatar.png';

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
                <div className="mx-auto flex h-8 max-w-7xl items-center justify-between px-6 font-sans text-[11px] text-muted-foreground lg:px-10">
                    <div className="flex items-center gap-4">
                        <span className="hidden items-center gap-1.5 sm:inline-flex">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            {t('Perpustakaan buka', 'Library open')} ·{' '}
                            <span className="font-medium">06.30 – 16.00</span>
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link
                            href="/resources"
                            className="hover:text-cobalt dark:hover:text-cobalt-lt"
                        >
                            {t('Sumber Digital', 'Digital Resources')}
                        </Link>
                        <Link
                            href="/about/contact"
                            className="hover:text-cobalt dark:hover:text-cobalt-lt"
                        >
                            {t('Bantuan', 'Help')}
                        </Link>
                        <Link
                            href="/informations"
                            className="hidden hover:text-cobalt sm:inline dark:hover:text-cobalt-lt"
                        >
                            {t('Berita', 'News')}
                        </Link>
                    </div>
                </div>
            </div>

            {/* main bar */}
            <div className="mx-auto max-w-7xl px-6 lg:px-10">
                <div className="flex h-[68px] items-center justify-between gap-6">
                    <Link href="/" className="shrink-0" aria-label="Beranda">
                        <BrandMark />
                    </Link>

                    {/* desktop nav */}
                    <nav
                        className="hidden items-center gap-1 lg:flex"
                        aria-label="Navigasi utama"
                    >
                        {navItems.map((n: NavItem) => (
                            <div
                                key={n.id}
                                className="relative"
                                onMouseEnter={() => n.menu && handleEnter(n.id)}
                                onMouseLeave={() => n.menu && handleLeave()}
                            >
                                <Link
                                    href={n.href}
                                    aria-current={
                                        isActive(n.href) ? 'page' : undefined
                                    }
                                    className="nav-link inline-flex items-center gap-1 rounded-full px-3.5 py-2 font-sans text-[14px] font-medium text-foreground transition-colors hover:text-cobalt dark:hover:text-cobalt-lt"
                                >
                                    {language === 'en'
                                        ? n.label.en
                                        : n.label.id}
                                    {n.menu && (
                                        <ChevronDown
                                            className={`h-3 w-3 transition-transform ${openMenu === n.id ? 'rotate-180' : ''}`}
                                        />
                                    )}
                                </Link>
                                {n.menu && openMenu === n.id && (
                                    <div className="hairline dd-enter in absolute top-full left-0 mt-3 w-[300px] overflow-hidden rounded-xl2 border bg-card shadow-lift dark:bg-night-2">
                                        <div className="p-2">
                                            {n.menu.map((m) => (
                                                <Link
                                                    key={m.id}
                                                    href={m.href}
                                                    onClick={() =>
                                                        setOpenMenu(null)
                                                    }
                                                    className="group flex items-start gap-3 rounded-lg px-4 py-3 transition-colors hover:bg-paper-2/70 dark:hover:bg-night-3"
                                                >
                                                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cobalt transition-transform group-hover:scale-150" />
                                                    <span className="flex-1">
                                                        <span className="block font-display text-[15px] text-foreground">
                                                            {language === 'en'
                                                                ? m.label.en
                                                                : m.label.id}
                                                        </span>
                                                    </span>
                                                    <ArrowUpRight className="mt-1 h-3.5 w-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-60" />
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* right controls */}
                    <div className="flex items-center gap-2">
                        {/* search */}
                        <form
                            onSubmit={submitSearch}
                            role="search"
                            className="hairline hidden h-10 items-center gap-2 rounded-full border bg-card/70 px-4 backdrop-blur transition-colors focus-within:border-cobalt md:flex md:w-[200px] xl:w-[260px] dark:bg-night-2/70"
                        >
                            <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
                            <input
                                type="search"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder={t(
                                    'Cari judul, penulis…',
                                    'Search title, author…',
                                )}
                                className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                                aria-label="Pencarian katalog"
                            />
                        </form>

                        {/* language pills */}
                        <div className="hairline hidden items-center overflow-hidden rounded-full border text-[11px] font-bold sm:flex">
                            {(['id', 'en'] as const).map((lc) => (
                                <button
                                    key={lc}
                                    onClick={() => setLanguage(lc)}
                                    aria-pressed={language === lc}
                                    className={`px-2.5 py-2 tracking-wider uppercase transition-colors ${
                                        language === lc
                                            ? 'bg-cobalt text-white'
                                            : 'text-muted-foreground hover:text-foreground'
                                    }`}
                                >
                                    {lc}
                                </button>
                            ))}
                        </div>

                        {/* dark toggle */}
                        <button
                            onClick={() =>
                                updateAppearance(isDark ? 'light' : 'dark')
                            }
                            aria-label={isDark ? 'Mode terang' : 'Mode malam'}
                            className="hairline grid h-10 w-10 place-items-center rounded-full border text-foreground transition-colors hover:border-cobalt/40 hover:text-cobalt dark:hover:text-cobalt-lt"
                        >
                            {isDark ? (
                                <Sun className="h-[17px] w-[17px]" />
                            ) : (
                                <Moon className="h-[17px] w-[17px]" />
                            )}
                        </button>

                        {/* auth */}
                        {isAuthenticated ? (
                            <div
                                className="relative hidden md:block"
                                onMouseEnter={() => handleEnter('__profile')}
                                onMouseLeave={handleLeave}
                            >
                                <button className="hairline flex items-center gap-2 rounded-full border py-1 pr-3 pl-1 transition-colors hover:border-cobalt/40">
                                    <img
                                        src={avatarSrc}
                                        alt={auth.user.name}
                                        className="h-8 w-8 rounded-full object-cover"
                                    />
                                    <span className="max-w-[100px] truncate text-sm font-medium text-foreground">
                                        {auth.user.name}
                                    </span>
                                    <ChevronDown className="h-3 w-3 text-muted-foreground" />
                                </button>
                                {openMenu === '__profile' && (
                                    <div className="hairline dd-enter in absolute top-full right-0 mt-3 w-[220px] overflow-hidden rounded-xl2 border bg-card shadow-lift dark:bg-night-2">
                                        <div className="p-2">
                                            {profileSubNavItems.map((item) => {
                                                const Icon =
                                                    profileIcons[item.icon] ??
                                                    User;
                                                const isLogout =
                                                    item.icon === 'logout';
                                                return (
                                                    <Link
                                                        key={item.id}
                                                        href={item.href}
                                                        method={
                                                            isLogout
                                                                ? 'post'
                                                                : 'get'
                                                        }
                                                        as={
                                                            isLogout
                                                                ? 'button'
                                                                : 'a'
                                                        }
                                                        onClick={() =>
                                                            setOpenMenu(null)
                                                        }
                                                        className={`flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm transition-colors ${
                                                            isLogout
                                                                ? 'text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10'
                                                                : 'text-foreground hover:bg-paper-2/70 dark:hover:bg-night-3'
                                                        }`}
                                                    >
                                                        <Icon className="h-4 w-4" />
                                                        {language === 'en'
                                                            ? item.label.en
                                                            : item.label.id}
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link
                                href={navAuthItems.href}
                                className="btn-press hidden items-center gap-2 rounded-full bg-cobalt px-4 py-2.5 font-sans text-[12px] font-semibold tracking-editorial text-white uppercase transition-colors hover:bg-cobalt-dk md:inline-flex"
                            >
                                <User className="h-3.5 w-3.5" />
                                {language === 'en'
                                    ? navAuthItems.label.en
                                    : navAuthItems.label.id}
                            </Link>
                        )}

                        {/* mobile hamburger */}
                        <button
                            onClick={() => setMobileOpen(true)}
                            aria-label="Buka menu"
                            className="hairline grid h-10 w-10 place-items-center rounded-full border text-foreground lg:hidden"
                        >
                            <Menu className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* mobile drawer */}
            {mobileOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div
                        className="absolute inset-0 bg-ink/40"
                        onClick={() => setMobileOpen(false)}
                    />
                    <div className="absolute top-0 right-0 bottom-0 w-[88%] max-w-sm overflow-y-auto bg-paper dark:bg-night">
                        <div className="hairline flex items-center justify-between border-b p-5">
                            <BrandMark />
                            <button
                                onClick={() => setMobileOpen(false)}
                                aria-label="Tutup"
                                className="grid h-10 w-10 place-items-center"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <div className="hairline border-b p-5">
                            <form
                                onSubmit={(e) => {
                                    submitSearch(e);
                                    setMobileOpen(false);
                                }}
                                className="hairline flex items-center gap-2 rounded-full border bg-card px-4 py-2.5 dark:bg-night-2"
                            >
                                <Search className="h-4 w-4 text-muted-foreground" />
                                <input
                                    type="search"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder={t('Cari…', 'Search…')}
                                    className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                                />
                            </form>
                        </div>
                        <nav className="p-3" aria-label="Navigasi seluler">
                            {navItems.map((n: NavItem) => (
                                <div key={n.id} className="py-1">
                                    <Link
                                        href={n.href}
                                        onClick={() => setMobileOpen(false)}
                                        className="block px-3 py-2 font-display text-lg text-foreground"
                                    >
                                        {language === 'en'
                                            ? n.label.en
                                            : n.label.id}
                                    </Link>
                                    {n.menu && (
                                        <div className="hairline ml-3 border-l pl-6">
                                            {n.menu.map((m) => (
                                                <Link
                                                    key={m.id}
                                                    href={m.href}
                                                    onClick={() =>
                                                        setMobileOpen(false)
                                                    }
                                                    className="block py-1.5 text-sm text-foreground/70 hover:text-cobalt"
                                                >
                                                    {language === 'en'
                                                        ? m.label.en
                                                        : m.label.id}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </nav>
                        <div className="hairline mt-2 flex items-center justify-between border-t p-5">
                            <div className="hairline flex items-center overflow-hidden rounded-full border text-[11px] font-bold">
                                {(['id', 'en'] as const).map((lc) => (
                                    <button
                                        key={lc}
                                        onClick={() => setLanguage(lc)}
                                        className={`px-2.5 py-2 tracking-wider uppercase transition-colors ${
                                            language === lc
                                                ? 'bg-cobalt text-white'
                                                : 'text-muted-foreground'
                                        }`}
                                    >
                                        {lc}
                                    </button>
                                ))}
                            </div>
                            {isAuthenticated ? (
                                <Link
                                    href="/dashboard"
                                    onClick={() => setMobileOpen(false)}
                                    className="rounded-full bg-cobalt px-4 py-2.5 text-[12px] font-semibold text-white"
                                >
                                    {t('Dashboard', 'Dashboard')}
                                </Link>
                            ) : (
                                <Link
                                    href={navAuthItems.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="rounded-full bg-cobalt px-4 py-2.5 text-[12px] font-semibold text-white"
                                >
                                    {language === 'en'
                                        ? navAuthItems.label.en
                                        : navAuthItems.label.id}
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
