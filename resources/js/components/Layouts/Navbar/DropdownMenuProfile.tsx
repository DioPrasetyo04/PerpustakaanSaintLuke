import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ChevronDown, LayoutDashboard, Settings, History, LogOut } from 'lucide-react';
import { Link } from '@inertiajs/react';
import type { NavItemSettingsAuth } from '@/types/navbar';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    dashboard: LayoutDashboard,
    settings: Settings,
    riwayat: History,
    logout: LogOut,
};

export const DropdownMenuProfile = ({
    profileAuth,
    language,
    isScrolled,
}: {
    profileAuth: NavItemSettingsAuth;
    language: string;
    isScrolled: boolean;
}) => {
    const [open, setOpen] = useState(false);

    return (
        <div
            className="relative"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >
            {/* Trigger - Avatar + Name */}
            <button
                onClick={() => setOpen((o) => !o)}
                className={cn(
                    'flex items-center gap-2 rounded-full px-3 py-1.5 transition-colors',
                    isScrolled
                        ? 'text-foreground hover:bg-muted'
                        : 'text-white/90 hover:bg-white/10',
                )}
            >
                <img
                    src={profileAuth.photo}
                    alt={profileAuth.name}
                    className="h-8 w-8 rounded-full object-cover ring-2 ring-[#C8A45C]/50"
                />
                <span className="text-sm font-medium">{profileAuth.name}</span>
                <motion.span
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <ChevronDown className="h-4 w-4" />
                </motion.span>
            </button>

            {/* Dropdown panel */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.97 }}
                        transition={{ duration: 0.18, ease: 'easeOut' }}
                        className="absolute top-full right-0 mt-2 min-w-[200px] overflow-hidden rounded-xl border border-[#E5E7EB]/60 bg-white/95 py-1.5 shadow-xl backdrop-blur-xl"
                    >
                        {/* Profile header */}
                        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
                            <img
                                src={profileAuth.photo}
                                alt={profileAuth.name}
                                className="h-10 w-10 rounded-full object-cover"
                            />
                            <div>
                                <p className="text-sm font-semibold text-foreground">
                                    {profileAuth.name}
                                </p>
                            </div>
                        </div>

                        {/* Menu items */}
                        <div className="py-1">
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
                                                className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-500 transition-colors hover:bg-red-50"
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
                                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-[#C8A45C]/10 hover:text-[#C8A45C]"
                                    >
                                        {Icon && <Icon className="h-4 w-4" />}
                                        {label}
                                    </Link>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
