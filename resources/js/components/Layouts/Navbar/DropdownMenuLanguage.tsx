import { useLanguage } from '@/hooks/useLanguage';
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import { languageItems } from '@/data/data';
import { ButtonVariants } from '@/components/ui/button3D';

// SVG Flags
const FlagID = () => (
    <svg
        width="25"
        height="25"
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
    >
        <rect width="64" height="32" fill="#E70011" />
        <rect y="32" width="64" height="32" fill="#FFFFFF" />
    </svg>
);

const FlagEN = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 60 30"
        width="25"
        height="25"
    >
        <rect width="60" height="30" fill="#012169" />
        <polygon points="0,0 6,0 60,24 60,30 54,30 0,6" fill="#FFFFFF" />
        <polygon points="60,0 54,0 0,24 0,30 6,30 60,6" fill="#FFFFFF" />
        <polygon points="0,0 4,0 60,26 60,30 56,30 0,4" fill="#C8102E" />
        <polygon points="60,0 56,0 0,26 0,30 4,30 60,4" fill="#C8102E" />
        <rect x="24" width="12" height="30" fill="#FFFFFF" />
        <rect y="9" width="60" height="12" fill="#FFFFFF" />
        <rect x="26" width="8" height="30" fill="#C8102E" />
        <rect y="11" width="60" height="8" fill="#C8102E" />
    </svg>
);

export const getFlag = (langCode: string) => {
    switch (langCode) {
        case 'id':
            return <FlagID />;
        case 'en':
            return <FlagEN />;
        default:
            return null;
    }
};

const DropdownMenuLanguage = ({ isScrolled }: { isScrolled: boolean }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { language, setLanguage } = useLanguage();

    const onHandleOpen = () => {
        setIsOpen((open) => !open);
    };

    const activeLanguageText = language || 'id';

    return (
        <div
            className="relative flex h-full items-center"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <ButtonVariants
                variant={'languageItem'}
                onClick={onHandleOpen}
                className={cn(
                    'flex items-center gap-2 rounded-full px-3 py-1.5 transition-all duration-200',
                    isScrolled
                        ? 'text-gray-600 hover:bg-gray-100'
                        : 'text-white/90 hover:bg-white/10 hover:text-white',
                    isOpen &&
                        (isScrolled
                            ? 'bg-gray-100'
                            : 'bg-white/10 text-white'),
                )}
            >
                <div className="flex items-center justify-center gap-1.5 p-0">
                    {getFlag(activeLanguageText)}
                    <span className="text-xs leading-none font-bold">
                        {activeLanguageText}
                    </span>
                </div>
                <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <ChevronDown className="h-4 w-4" />
                </motion.span>
            </ButtonVariants>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.97 }}
                        transition={{ duration: 0.18, ease: 'easeOut' }}
                        className="absolute top-full right-0 mt-2 min-w-[120px] overflow-hidden rounded-xl border border-[#E5E7EB]/60 bg-white shadow-xl backdrop-blur-xl"
                    >
                        {languageItems.map((lang) => {
                            const isCurrent =
                                activeLanguageText === lang.language;
                            return (
                                <button
                                    key={lang.id}
                                    onClick={() => {
                                        setLanguage(lang.language);
                                        setIsOpen(false);
                                    }}
                                    className={cn(
                                        'flex w-full items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-[#C8A45C]/10 hover:text-[#C8A45C]',
                                        isCurrent
                                            ? 'bg-[#C8A45C]/5 font-semibold text-[#C8A45C]'
                                            : 'text-gray-600',
                                    )}
                                >
                                    {getFlag(lang.language)}
                                    <span className="text-xs font-bold">
                                        {lang.label}
                                    </span>
                                </button>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default DropdownMenuLanguage;
