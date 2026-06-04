import { Link } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import type { NavbarDesktopProps } from '@/types/navbar';
import { cn } from '@/lib/utils';
import { DropdownMenuItem } from './DropdownMenuItem';
import { DropdownMenuProfile } from './DropdownMenuProfile';
import { useAppearance } from '@/hooks/use-appearance';
import { ButtonVariants } from '@/components/ui/button3D';
import DropdownMenuLanguage from './DropdownMenuLanguage';

const NavbarDesktop = ({
    navItems,
    navAuthItems,
    profileAuth,
    isAuthenticated,
    isScrolled,
    activeSection,
    language,
}: NavbarDesktopProps) => {
    const { resolvedAppearance, updateAppearance } = useAppearance();
    const isDark = resolvedAppearance === 'dark';

    return (
        <section className="hidden w-full items-center justify-between gap-4 lg:flex">
            {/* Nav Items */}
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
                                    'px-4 transition-colors',
                                    isScrolled
                                        ? 'text-foreground/70 hover:text-foreground'
                                        : 'text-white/90 hover:text-white',
                                    isActive &&
                                        'bg-brand/15 text-brand hover:text-brand',
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
                    type="button"
                    aria-label={
                        isDark ? 'Switch to light mode' : 'Switch to dark mode'
                    }
                    onClick={() =>
                        updateAppearance(isDark ? 'light' : 'dark')
                    }
                    className={cn(
                        'flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border transition-all duration-300 hover:scale-105',
                        isScrolled
                            ? 'border-border text-foreground/70 hover:border-brand/40 hover:text-brand'
                            : 'border-white/20 text-white/90 hover:border-white/40 hover:text-white',
                    )}
                >
                    <AnimatePresence mode="wait" initial={false}>
                        {isDark ? (
                            <motion.span
                                key="sun"
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                                transition={{ duration: 0.25 }}
                            >
                                <Sun className="h-4 w-4" />
                            </motion.span>
                        ) : (
                            <motion.span
                                key="moon"
                                initial={{ rotate: 90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: -90, opacity: 0 }}
                                transition={{ duration: 0.25 }}
                            >
                                <Moon className="h-4 w-4" />
                            </motion.span>
                        )}
                    </AnimatePresence>
                </button>

                {/* Language Toggle */}
                <DropdownMenuLanguage isScrolled={isScrolled} />

                {isAuthenticated && profileAuth ? (
                    <DropdownMenuProfile
                        profileAuth={profileAuth}
                        language={language}
                        isScrolled={isScrolled}
                    />
                ) : (
                    <Link href={navAuthItems.href}>
                        <ButtonVariants variant="default">
                            {language === 'id'
                                ? navAuthItems.label.id
                                : navAuthItems.label.en}
                        </ButtonVariants>
                    </Link>
                )}
            </div>
        </section>
    );
};

export default NavbarDesktop;
