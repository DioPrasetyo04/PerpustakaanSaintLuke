import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '@inertiajs/react';
import { ChevronDown, Moon, Sun } from 'lucide-react';
import type { NavbarMobileProps } from '@/types/navbar';
import { cn } from '@/lib/utils';
import { ButtonVariants } from '@/components/ui/button3D';
import { useLanguage } from '@/hooks/useLanguage';
import { useTheme } from 'next-themes';

const NavbarMobile = ({
    navItems,
    navAuthItems,
    isMenuOpen,
    setIsMenuOpen,
    isActive,
    activeSection,
    language,
}: NavbarMobileProps) => {
    const { setLanguage } = useLanguage();
    const { theme, setTheme } = useTheme();
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
                    className="overflow-hidden border-t border-gray-100 bg-white/95 backdrop-blur-xl lg:hidden"
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
                                                active && 'bg-[#C8A45C]/20',
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
                                                    <div className="mt-1 ml-4 flex flex-col gap-1 border-l-2 border-[#C8A45C]/30 pl-3">
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
                                                                        className="w-full justify-start border-none text-gray-400 shadow-none hover:bg-white/5"
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
                                            active && 'bg-[#C8A45C]/20',
                                        )}
                                    >
                                        {label}
                                    </ButtonVariants>
                                </Link>
                            );
                        })}

                        {/* Divider */}
                        <div className="my-2 h-px bg-gray-100" />

                        {/* Toggles */}
                        <div className="flex items-center justify-between px-3 py-2">
                            <span className="text-left text-sm font-medium text-gray-600">
                                Setelan
                            </span>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() =>
                                        setTheme(
                                            theme === 'dark' ? 'light' : 'dark',
                                        )
                                    }
                                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition-colors hover:bg-gray-50"
                                >
                                    {theme === 'dark' ? (
                                        <Sun className="h-4 w-4" />
                                    ) : (
                                        <Moon className="h-4 w-4" />
                                    )}
                                </button>
                                <button
                                    onClick={() =>
                                        setLanguage(
                                            language === 'id' ? 'en' : 'id',
                                        )
                                    }
                                    className="flex h-9 items-center justify-center gap-1.5 rounded-lg border border-gray-200 px-3 text-sm font-bold text-gray-600 transition-colors hover:bg-gray-50"
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
                        <div className="my-2 h-px bg-gray-100" />

                        {/* Auth Buttons */}
                        <div className="mt-2 flex flex-col gap-3 px-2">
                            {navAuthItems.map((authItem) => {
                                const label =
                                    language === 'id'
                                        ? authItem.label.id
                                        : authItem.label.en;

                                if (authItem.variant === 'ghost') {
                                    return (
                                        <Link
                                            key={authItem.id}
                                            href={authItem.href}
                                            onClick={handleClose}
                                            className="w-full"
                                        >
                                            <ButtonVariants
                                                variant="ghost"
                                                className="w-full"
                                            >
                                                {label}
                                            </ButtonVariants>
                                        </Link>
                                    );
                                }

                                return (
                                    <Link
                                        key={authItem.id}
                                        href={authItem.href}
                                        onClick={handleClose}
                                        className="w-full"
                                    >
                                        <ButtonVariants
                                            variant="default"
                                            className="w-full"
                                        >
                                            {label}
                                        </ButtonVariants>
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Safe-area bottom spacing */}
                        <div className="h-2" />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default NavbarMobile;
