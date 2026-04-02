import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { NavbarDesktopProps } from '@/types/navbar';
import type { NavItem } from '@/types/navbar';
import { cn } from '@/lib/utils';
import { DropdownMenuItem } from './DropdownMenuItem';
import { useLanguage } from '@/hooks/useLanguage';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { ButtonVariants } from '@/components/ui/button3D';
import DropdownMenuLanguage from './DropdownMenuLanguage';

// ─── NavbarDesktop ─────────────────────────────────────────────────────────────
const NavbarDesktop = ({
    navItems,
    navAuthItems,
    isScrolled,
    activeSection,
    language,
}: NavbarDesktopProps) => {
    const { theme, setTheme } = useTheme();

    return (
        <section className="hidden w-full items-center justify-between gap-4 lg:flex">
            {/* Nav Items (Flex centered, shrinks gracefully) */}
            <div className="flex flex-1 items-center justify-center gap-1 lg:gap-1.5">
                {navItems.map((item) => {
                    const label =
                        language === 'id' ? item.label.id : item.label.en;
                    const isActive = activeSection === item.id;

                    if (item.menu && item.menu.length > 0) {
                        return (
                            <DropdownMenuItem
                                key={item.id}
                                item={item}
                                language={language}
                                isScrolled={isScrolled}
                            />
                        );
                    }

                    return (
                        <Link key={item.id} href={item.href}>
                            <ButtonVariants
                                variant="navItem"
                                size="sm"
                                data-state={isActive ? 'open' : 'closed'}
                                className={cn(
                                    'px-4',
                                    isScrolled
                                        ? 'text-gray-200 hover:text-white'
                                        : 'text-white/90 hover:text-white',
                                    isActive &&
                                        'bg-[#C8A45C]/30 text-white shadow-[0_0px_0_0_transparent]',
                                )}
                            >
                                {label}
                            </ButtonVariants>
                        </Link>
                    );
                })}
            </div>

            {/* Auth Items */}
            <div className="flex shrink-0 items-center justify-center gap-2">
                {/* Theme Toggle */}
                <button
                    onClick={() =>
                        setTheme(theme === 'dark' ? 'light' : 'dark')
                    }
                    className={cn(
                        'flex h-9 w-9 items-center justify-center rounded-full transition-colors',
                        isScrolled
                            ? 'text-gray-600 hover:bg-gray-100'
                            : 'text-white/90 hover:bg-white/10',
                    )}
                >
                    {theme === 'dark' ? (
                        <Sun className="h-4 w-4" />
                    ) : (
                        <Moon className="h-4 w-4" />
                    )}
                </button>

                {/* Language Toggle */}
                <DropdownMenuLanguage isScrolled={isScrolled} />

                {navAuthItems.map((authItem) => {
                    const label =
                        language === 'id'
                            ? authItem.label.id
                            : authItem.label.en;

                    if (authItem.variant === 'ghost') {
                        return (
                            <Link key={authItem.id} href={authItem.href}>
                                <ButtonVariants
                                    variant="ghost"
                                    className={cn(
                                        isScrolled
                                            ? 'text-gray-700 hover:bg-gray-100'
                                            : 'text-white/80 hover:bg-white/10 hover:text-white',
                                    )}
                                >
                                    {label}
                                </ButtonVariants>
                            </Link>
                        );
                    }

                    return (
                        <Link key={authItem.id} href={authItem.href}>
                            <ButtonVariants variant="default">
                                {label}
                            </ButtonVariants>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
};

export default NavbarDesktop;
