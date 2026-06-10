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
import DropdownMenuLanguage from './DropdownMenuLanguage';
import { useLanguage } from '@/hooks/useLanguage';
import { useAppearance } from '@/hooks/use-appearance';
import { cn } from '@/lib/utils';
import type { NavItem } from '@/types/navbar';

/* Brand mark — SL monogram + wordmark */
function BrandMark() {
    return (
        <div className="flex min-w-0 items-center gap-3">
            <div
                className="relative grid h-[38px] w-[38px] shrink-0 place-items-center rounded-xl text-paper shadow-soft"
                aria-hidden="true"
            >
                <img
                    src="/assets/logos/Saint-Luke.png"
                    alt="Logo Saint Luke"
                    className="h-full w-full"
                />
                <span className="absolute -right-1 -bottom-1 h-3 w-3 rounded-full border-2 border-paper bg-cobalt dark:border-night" />
            </div>
            <div className="min-w-0 leading-tight">
                <div className="truncate font-display text-[16px] font-semibold text-foreground">
                    E-Library
                </div>
                <div className="truncate font-sans text-[9px] tracking-editorial text-muted-foreground uppercase">
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
    const { language } = useLanguage();
    const { resolvedAppearance, updateAppearance } = useAppearance();
    const isDark = resolvedAppearance === 'dark';

    const [auth, setAuth] = useState<any>(initialAuth ?? null);
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    // Accordion menu mobile (Katalog/Tentang) yang sedang terbuka.
    const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);
    // Dropdown profil pada drawer mobile (default tertutup).
    const [mobileProfileOpen, setMobileProfileOpen] = useState(false);
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

    // Grup (Katalog/Tentang) dianggap aktif bila salah satu submenunya aktif.
    const isGroupActive = (n: NavItem) =>
        isActive(n.href) || !!n.menu?.some((m) => isActive(m.href));

    // Saat drawer dibuka, otomatis buka accordion grup yang memuat halaman aktif.
    useEffect(() => {
        if (!mobileOpen) return;
        const activeGroup = navItems.find((n) => n.menu && isGroupActive(n));
        setMobileSubmenu(activeGroup?.id ?? null);
        setMobileProfileOpen(false); // selalu mulai tertutup tiap drawer dibuka
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mobileOpen]);

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
        // Cari di Katalog Buku (BooksPage membaca filters.search).
        router.get(route('catalog.books'), kw ? { search: kw } : {});
    };

    const avatarSrc = auth?.user?.avatar
        ? `/storage/${auth.user.avatar}`
        : '/assets/images/default-avatar.webp';

    return (
        <>
            <header
                className={`sticky top-0 z-40 transition-all duration-300 ${
                    scrolled
                        ? 'hairline border-b bg-card/85 backdrop-blur-md dark:bg-night/85'
                        : 'border-b border-transparent bg-paper dark:bg-night'
                }`}
            >
                {/* main bar */}
                <div className="mx-auto max-w-[100rem] px-6 lg:px-10">
                    <div className="flex h-[68px] items-center justify-between gap-3 lg:gap-4">
                        <Link href="/" className="min-w-0" aria-label="Beranda">
                            <BrandMark />
                        </Link>

                        {/* desktop nav */}
                        <nav
                            className="hidden shrink-0 items-center gap-1 lg:flex"
                            aria-label="Navigasi utama"
                        >
                            {navItems.map((n: NavItem) => (
                                <div
                                    key={n.id}
                                    className="relative"
                                    onMouseEnter={() =>
                                        n.menu && handleEnter(n.id)
                                    }
                                    onMouseLeave={() => n.menu && handleLeave()}
                                >
                                    <Link
                                        href={n.href}
                                        aria-current={
                                            isGroupActive(n)
                                                ? 'page'
                                                : undefined
                                        }
                                        className={cn(
                                            'nav-link inline-flex items-center gap-1 rounded-full px-3.5 py-2 font-sans text-[14px] font-medium transition-colors hover:text-cobalt dark:hover:text-cobalt-lt',
                                            isGroupActive(n)
                                                ? 'text-cobalt dark:text-cobalt-lt'
                                                : 'text-foreground',
                                        )}
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
                                                {n.menu.map((m) => {
                                                    const subActive = isActive(
                                                        m.href,
                                                    );
                                                    return (
                                                        <Link
                                                            key={m.id}
                                                            href={m.href}
                                                            aria-current={
                                                                subActive
                                                                    ? 'page'
                                                                    : undefined
                                                            }
                                                            onClick={() =>
                                                                setOpenMenu(
                                                                    null,
                                                                )
                                                            }
                                                            className="group flex items-start gap-3 rounded-lg px-4 py-3 transition-colors hover:bg-paper-2/70 dark:hover:bg-night-3"
                                                        >
                                                            <span
                                                                className={cn(
                                                                    'mt-2 h-1.5 w-1.5 shrink-0 rounded-full transition-transform group-hover:scale-150',
                                                                    subActive
                                                                        ? 'bg-cobalt'
                                                                        : 'bg-muted-foreground/30',
                                                                )}
                                                            />
                                                            <span className="flex-1">
                                                                <span
                                                                    className={cn(
                                                                        'block font-display text-[15px]',
                                                                        subActive
                                                                            ? 'text-cobalt dark:text-cobalt-lt'
                                                                            : 'text-foreground',
                                                                    )}
                                                                >
                                                                    {language ===
                                                                    'en'
                                                                        ? m
                                                                              .label
                                                                              .en
                                                                        : m
                                                                              .label
                                                                              .id}
                                                                </span>
                                                            </span>
                                                            <ArrowUpRight className="mt-1 h-3.5 w-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-60" />
                                                        </Link>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </nav>

                        {/* right controls */}
                        <div className="flex shrink-0 items-center gap-2">
                            {/* search */}
                            <form
                                onSubmit={submitSearch}
                                role="search"
                                className="hairline hidden h-10 items-center gap-2 rounded-full border bg-card/70 px-4 backdrop-blur transition-colors focus-within:border-cobalt xl:flex xl:w-[200px] 2xl:w-[260px] dark:bg-night-2/70"
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

                            {/* language switcher (dropdown, data-driven) */}
                            <div className="hidden sm:block">
                                <DropdownMenuLanguage isScrolled />
                            </div>

                            {/* dark toggle */}
                            <button
                                onClick={() =>
                                    updateAppearance(isDark ? 'light' : 'dark')
                                }
                                aria-label={
                                    isDark ? 'Mode terang' : 'Mode malam'
                                }
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
                                    onMouseEnter={() =>
                                        handleEnter('__profile')
                                    }
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
                                                {profileSubNavItems.map(
                                                    (item) => {
                                                        const Icon =
                                                            profileIcons[
                                                                item.icon
                                                            ] ?? User;
                                                        const isLogout =
                                                            item.icon ===
                                                            'logout';
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
                                                                    setOpenMenu(
                                                                        null,
                                                                    )
                                                                }
                                                                className={`flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm transition-colors ${
                                                                    isLogout
                                                                        ? 'text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10'
                                                                        : 'text-foreground hover:bg-paper-2/70 dark:hover:bg-night-3'
                                                                }`}
                                                            >
                                                                <Icon className="h-4 w-4" />
                                                                {language ===
                                                                'en'
                                                                    ? item.label
                                                                          .en
                                                                    : item.label
                                                                          .id}
                                                            </Link>
                                                        );
                                                    },
                                                )}
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
            </header>

            {/* mobile drawer — DIRENDER DI LUAR <header>: header memakai
                backdrop-filter saat scroll yang membuat containing block untuk
                elemen position:fixed, sehingga drawer ikut terpotong bila berada
                di dalam header. Di luar header, fixed kembali relatif ke viewport. */}
            {mobileOpen && (
                <div className="fixed inset-0 z-[60] lg:hidden">
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
                            {navItems.map((n: NavItem) => {
                                const label =
                                    language === 'en' ? n.label.en : n.label.id;

                                // Item dengan submenu → accordion yang bisa diklik.
                                if (n.menu) {
                                    const expanded = mobileSubmenu === n.id;
                                    const groupActive = isGroupActive(n);
                                    return (
                                        <div key={n.id} className="py-0.5">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setMobileSubmenu(
                                                        expanded ? null : n.id,
                                                    )
                                                }
                                                aria-expanded={expanded}
                                                className={cn(
                                                    'flex w-full items-center justify-between rounded-lg px-3 py-2.5 font-display text-lg transition-colors',
                                                    groupActive
                                                        ? 'bg-cobalt-50 text-cobalt dark:bg-cobalt/10 dark:text-cobalt-lt'
                                                        : 'text-foreground hover:bg-paper-2/60 dark:hover:bg-night-3',
                                                )}
                                            >
                                                <span>{label}</span>
                                                <ChevronDown
                                                    className={cn(
                                                        'h-4 w-4 transition-transform',
                                                        expanded &&
                                                            'rotate-180',
                                                    )}
                                                />
                                            </button>
                                            {expanded && (
                                                <div className="hairline mt-1 ml-3 space-y-0.5 border-l pl-4">
                                                    {n.menu.map((m) => {
                                                        const subActive =
                                                            isActive(m.href);
                                                        return (
                                                            <Link
                                                                key={m.id}
                                                                href={m.href}
                                                                onClick={() =>
                                                                    setMobileOpen(
                                                                        false,
                                                                    )
                                                                }
                                                                aria-current={
                                                                    subActive
                                                                        ? 'page'
                                                                        : undefined
                                                                }
                                                                className={cn(
                                                                    'block rounded-md px-3 py-2 text-sm transition-colors',
                                                                    subActive
                                                                        ? 'bg-cobalt-50 font-semibold text-cobalt dark:bg-cobalt/10 dark:text-cobalt-lt'
                                                                        : 'text-foreground/70 hover:text-cobalt dark:hover:text-cobalt-lt',
                                                                )}
                                                            >
                                                                {language ===
                                                                'en'
                                                                    ? m.label.en
                                                                    : m.label
                                                                          .id}
                                                            </Link>
                                                        );
                                                    })}
                                                </div>
                                            )}
                                        </div>
                                    );
                                }

                                // Item tanpa submenu → link langsung.
                                const active = isActive(n.href);
                                return (
                                    <Link
                                        key={n.id}
                                        href={n.href}
                                        onClick={() => setMobileOpen(false)}
                                        aria-current={
                                            active ? 'page' : undefined
                                        }
                                        className={cn(
                                            'my-0.5 block rounded-lg px-3 py-2.5 font-display text-lg transition-colors',
                                            active
                                                ? 'bg-cobalt-50 text-cobalt dark:bg-cobalt/10 dark:text-cobalt-lt'
                                                : 'text-foreground hover:bg-paper-2/60 dark:hover:bg-night-3',
                                        )}
                                    >
                                        {label}
                                    </Link>
                                );
                            })}
                        </nav>
                        <div className="hairline mt-2 space-y-4 border-t p-5">
                            {/* language */}
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">
                                    {t('Bahasa', 'Language')}
                                </span>
                                <DropdownMenuLanguage
                                    variant="mobile"
                                    isScrolled
                                />
                            </div>

                            {/* theme: light / dark */}
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">
                                    {t('Tema', 'Theme')}
                                </span>
                                <div className="hairline flex items-center overflow-hidden rounded-full border text-[11px] font-bold">
                                    <button
                                        onClick={() =>
                                            updateAppearance('light')
                                        }
                                        aria-pressed={!isDark}
                                        className={cn(
                                            'flex items-center gap-1.5 px-3 py-2 tracking-wider uppercase transition-colors',
                                            !isDark
                                                ? 'bg-cobalt text-white'
                                                : 'text-muted-foreground',
                                        )}
                                    >
                                        <Sun className="h-3.5 w-3.5" />
                                        {t('Terang', 'Light')}
                                    </button>
                                    <button
                                        onClick={() => updateAppearance('dark')}
                                        aria-pressed={isDark}
                                        className={cn(
                                            'flex items-center gap-1.5 px-3 py-2 tracking-wider uppercase transition-colors',
                                            isDark
                                                ? 'bg-cobalt text-white'
                                                : 'text-muted-foreground',
                                        )}
                                    >
                                        <Moon className="h-3.5 w-3.5" />
                                        {t('Gelap', 'Dark')}
                                    </button>
                                </div>
                            </div>

                            {/* Profil pengguna — dropdown (klik untuk buka) atau login */}
                            {isAuthenticated ? (
                                <div className="hairline rounded-xl2 border bg-card p-2 dark:bg-night-2">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setMobileProfileOpen((o) => !o)
                                        }
                                        aria-expanded={mobileProfileOpen}
                                        className="flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors hover:bg-paper-2/60 dark:hover:bg-night-3"
                                    >
                                        <img
                                            src={avatarSrc}
                                            alt={auth.user.name}
                                            className="h-11 w-11 rounded-full object-cover ring-1 ring-border"
                                        />
                                        <div className="min-w-0 flex-1">
                                            <div className="truncate font-display text-base font-semibold text-foreground">
                                                {auth.user.name}
                                            </div>
                                            {auth.user.email && (
                                                <div className="truncate text-xs text-muted-foreground">
                                                    {auth.user.email}
                                                </div>
                                            )}
                                        </div>
                                        <ChevronDown
                                            className={cn(
                                                'h-4 w-4 shrink-0 text-muted-foreground transition-transform',
                                                mobileProfileOpen &&
                                                    'rotate-180',
                                            )}
                                        />
                                    </button>
                                    {mobileProfileOpen && (
                                        <div className="hairline mt-1 border-t pt-1">
                                            {profileSubNavItems.map((item) => {
                                                const Icon =
                                                    profileIcons[item.icon] ??
                                                    User;
                                                const isLogout =
                                                    item.icon === 'logout';
                                                const itemActive =
                                                    !isLogout &&
                                                    isActive(item.href);
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
                                                            setMobileOpen(false)
                                                        }
                                                        aria-current={
                                                            itemActive
                                                                ? 'page'
                                                                : undefined
                                                        }
                                                        className={cn(
                                                            'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors',
                                                            isLogout
                                                                ? 'text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10'
                                                                : itemActive
                                                                  ? 'bg-cobalt-50 font-medium text-cobalt dark:bg-cobalt/10 dark:text-cobalt-lt'
                                                                  : 'text-foreground hover:bg-paper-2/70 dark:hover:bg-night-3',
                                                        )}
                                                    >
                                                        <Icon className="h-4 w-4" />
                                                        {language === 'en'
                                                            ? item.label.en
                                                            : item.label.id}
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Link
                                    href={navAuthItems.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="btn-press flex w-full items-center justify-center gap-2 rounded-full bg-cobalt px-4 py-3 text-[13px] font-semibold tracking-editorial text-white uppercase transition-colors hover:bg-cobalt-dk"
                                >
                                    <User className="h-4 w-4" />
                                    {language === 'en'
                                        ? navAuthItems.label.en
                                        : navAuthItems.label.id}
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;
