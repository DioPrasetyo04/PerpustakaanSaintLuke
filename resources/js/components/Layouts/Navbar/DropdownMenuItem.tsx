import { NavItem } from '@/types/navbar';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { ButtonVariants } from '@/components/ui/button3D';

export const DropdownMenuItem = ({
    item,
    language,
    isScrolled,
}: {
    item: NavItem;
    language: string;
    isScrolled: boolean;
}) => {
    const [open, setOpen] = useState(false);
    const label = language === 'id' ? item.label.id : item.label.en;

    const onHandleOpen = () => {
        setOpen((open) => !open);
    };
    return (
        <div
            className="relative"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            onClick={onHandleOpen}
        >
            {/* Trigger */}
            <ButtonVariants
                variant="navItem"
                size="sm"
                data-state={open ? 'open' : 'closed'}
                className={cn(
                    'flex items-center gap-1.5 px-4',
                    isScrolled
                        ? 'text-gray-200 hover:text-white'
                        : 'text-white/90 hover:text-white',
                )}
            >
                {label}
                <motion.span
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <ChevronDown className="h-4 w-4" />
                </motion.span>
            </ButtonVariants>

            {/* Dropdown panel */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.97 }}
                        transition={{ duration: 0.18, ease: 'easeOut' }}
                        className="absolute top-full left-0 mt-2 min-w-[180px] rounded-xl border border-[#E5E7EB]/60 bg-white/95 py-1.5 shadow-xl backdrop-blur-xl"
                    >
                        {item.menu?.map((sub) => (
                            <Link
                                key={sub.id}
                                href={sub.href}
                                className="block px-4 py-2 text-sm text-gray-600 transition-colors hover:bg-[#C8A45C]/10 hover:text-[#C8A45C]"
                            >
                                {language === 'id'
                                    ? sub.label.id
                                    : sub.label.en}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
