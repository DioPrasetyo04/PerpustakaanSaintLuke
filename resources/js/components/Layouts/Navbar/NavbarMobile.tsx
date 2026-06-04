import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '@inertiajs/react';
import { ChevronDown, Moon, Sun, LayoutDashboard, Settings, History, LogOut } from 'lucide-react';
import type { NavbarMobileProps } from '@/types/navbar';
import { cn } from '@/lib/utils';
import { ButtonVariants } from '@/components/ui/button3D';
import { useLanguage } from '@/hooks/useLanguage';
import { useAppearance } from '@/hooks/use-appearance';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    dashboard: LayoutDashboard,
    settings: Settings,
    riwayat: History,
    logout: LogOut,
};

const NavbarMobile = ({
    navItems,
    navAuthItems,
    profileAuth,
    isAuthenticated,
    isMenuOpen,
    setIsMenuOpen,
    isActive,
    activeSection,
    language,
}: NavbarMobileProps) => {
    const { setLanguage } = useLanguage();
    const { resolvedAppearance, updateAppearance } = useAppearance();
    const isDark = resolvedAppearance === 'dark';
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const handleClose = () => setIsMenuOpen(false);

    const toggleDropdown = (id: string) => {
        setOpenDropdown((prev) => (prev === id ? null : id));
    };

    return (
        <AnimatePresence>
            {isMenuOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="theme-transition overflow-hidden border-t border-border bg-background/95 backdrop-blur-xl lg:hidden"
                >
                    <div className="container mx-auto flex flex-col gap-1 px-4 py-4">
                        {/* Nav Items */}
                        {navItems.map((item) => {
                            const label =
                                language === 'id'
                                    ? item.label.id
                                    : item.label.en;
                            const active = activeSection === item.id;
                            const hasMenu = item.menu && item.menu.length > 0;
                            const isOpen = openDropdown === item.id;

                            if (hasMenu) {
                                return (
                                    <div key={item.id}>
                                        {/* Parent item with toggle */}
                                        <ButtonVariants
                                            variant="navItem"
                                            size="sm"
                                            onClick={() =>
                                                toggleDropdown(item.id)
                                            }
                                            data-state={
                                                isOpen ? 'open' : 'closed'
                                            }
                                            className={cn(
                                                'flex w-full items-center justify-between px-5',
                                                active && 'bg-brand/15 text-brand',
                                            )}
                                        >
                                            {label}
                                            <motion.span
                                                animate={{
                                                    rotate: isOpen ? 180 : 0,
                                                }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <ChevronDown className="h-4 w-4" />
                                            </motion.span>
                                        </ButtonVariants>

                                        {/* Sub items */}
                                        <AnimatePresence>
                                            {isOpen && (
                                                <motion.div
                                                    initial={{
                                                        height: 0,
                                                        opacity: 0,
                                                    }}
                                                    animate={{
                                                        height: 'auto',
                                                        opacity: 1,
                                                    }}
                                                    exit={{
                                                        height: 0,
                                                        opacity: 0,
                                                    }}
                                                    transition={{
                                                        duration: 0.2,
                                                    }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="mt-1 ml-4 flex flex-col gap-1 border-l-2 border-brand/30 pl-3">
                                                        {item.menu?.map(
                                                            (sub) => (
                                                                <Link
                                                                    key={sub.id}
                                                                    href={
                                                                        sub.href
                                                                    }
                                                                    onClick={
                                                                        handleClose
                                                                    }
                                                                    className="w-full"
                                                                >
                                                                    <ButtonVariants
                                                                        variant="navItem"
                                                                        size="sm"
                                                                        className="w-full justify-start border-none text-muted-foreground shadow-none hover:bg-muted"
                                                                    >
                                                                        {language ===
                                                                        'id'
                                                                            ? sub
                                                                                  .label
                                                                                  .id
                                                                            : sub
                                                                                  .label
                                                                                  .en}
                                                                    </ButtonVariants>
                                                                </Link>
                                                            ),
                                                        )}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                );
                            }

                            return (
                                <Link
                                    key={item.id}
                                    href={item.href}
                                    onClick={handleClose}
                                    className="w-full"
                                >
                                    <ButtonVariants
                                        variant="navItem"
                                        size="sm"
                                        data-state={active ? 'open' : 'closed'}
                                        className={cn(
                                            'w-full justify-start px-5',
                                            active && 'bg-brand/15 text-brand',
                                        )}
                                    >
                                        {label}
                                    </ButtonVariants>
                                </Link>
                            );
                        })}

                        {/* Divider */}
                        <div className="my-2 h-px bg-border" />

                        {/* Toggles */}
                        <div className="flex items-center justify-between px-3 py-2">
                            <span className="text-left text-sm font-medium text-muted-foreground">
                                {language === 'id' ? 'Setelan' : 'Settings'}
                            </span>
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    aria-label={
                                        isDark
                                            ? 'Switch to light mode'
                                            : 'Switch to dark mode'
                                    }
                                    onClick={() =>
                                        updateAppearance(
                                            isDark ? 'light' : 'dark',
                                        )
                                    }
                                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-foreground/70 transition-colors hover:border-brand/40 hover:text-brand"
                                >
                                    {isDark ? (
                                        <Sun className="h-4 w-4" />
                                    ) : (
                                        <Moon className="h-4 w-4" />
                                    )}
                                </button>
                                <button
                                    type="button"
                                    onClick={() =>
                                        setLanguage(
                                            language === 'id' ? 'en' : 'id',
                                        )
                                    }
                                    className="flex h-9 items-center justify-center gap-1.5 rounded-lg border border-border px-3 text-sm font-bold text-foreground/70 transition-colors hover:border-brand/40 hover:text-brand"
                                >
                                    <span className="text-base leading-none">
                                        {language === 'id' ? '🇮🇩' : '🇬🇧'}
                                    </span>
                                    <span>
                                        {language === 'id' ? 'ID' : 'EN'}
                                    </span>
                                </button>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="my-2 h-px bg-border" />

                        {/* Auth Section */}
                        {isAuthenticated && profileAuth ? (
                            <div className="mt-2 flex flex-col gap-1 px-2">
                                {/* Profile header */}
                                <div className="flex items-center gap-3 px-3 py-3">
                                    <img
                                        src={profileAuth.photo}
                                        alt={profileAuth.name}
                                        className="h-10 w-10 rounded-full object-cover ring-2 ring-brand/50"
                                    />
                                    <div>
                                        <p className="text-sm font-semibold text-foreground">
                                            {profileAuth.name}
                                        </p>
                                    </div>
                                </div>

                                {/* Profile menu items */}
                                {profileAuth.menu.map((item) => {
                                    const Icon = iconMap[item.icon];
                                    const label =
                                        language === 'id'
                                            ? item.label.id
                                            : item.label.en;
                                    const isLogout = item.icon === 'logout';

                                    if (isLogout) {
                                        return (
                                            <div
                                                key={item.id}
                                                className="border-t border-border pt-1"
                                            >
                                                <Link
                                                    href={item.href}
                                                    method="post"
                                                    as="button"
                                                    onClick={handleClose}
                                                    className="flex w-full items-center gap-3 rounded-lg px-5 py-2.5 text-sm text-red-500 transition-colors hover:bg-red-50"
                                                >
                                                    {Icon && (
                                                        <Icon className="h-4 w-4" />
                                                    )}
                                                    {label}
                                                </Link>
                                            </div>
                                        );
                                    }

                                    return (
                                        <Link
                                            key={item.id}
                                            href={item.href}
                                            onClick={handleClose}
                                            className="w-full"
                                        >
                                            <ButtonVariants
                                                variant="navItem"
                                                size="sm"
                                                className="w-full justify-start gap-3 px-5"
                                            >
                                                {Icon && (
                                                    <Icon className="h-4 w-4" />
                                                )}
                                                {label}
                                            </ButtonVariants>
                                        </Link>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="mt-2 flex flex-col gap-3 px-2">
                                <Link
                                    href={navAuthItems.href}
                                    onClick={handleClose}
                                    className="w-full"
                                >
                                    <ButtonVariants
                                        variant="default"
                                        className="w-full"
                                    >
                                        {language === 'id'
                                            ? navAuthItems.label.id
                                            : navAuthItems.label.en}
                                    </ButtonVariants>
                                </Link>
                            </div>
                        )}

                        {/* Safe-area bottom spacing */}
                        <div className="h-2" />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default NavbarMobile;
