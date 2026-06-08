import { useLanguage } from '@/hooks/useLanguage';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ChevronDown, Check } from 'lucide-react';
import { languageItems } from '@/data/data';
import { ButtonVariants } from '@/components/ui/button3D';

type DropdownMenuLanguageProps = {
    isScrolled?: boolean;
    variant?: 'desktop' | 'mobile';
};

const DropdownMenuLanguage = ({
    isScrolled = false,
    variant = 'desktop',
}: DropdownMenuLanguageProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const { language, setLanguage } = useLanguage();
    const isMobile = variant === 'mobile';

    const activeItem =
        languageItems.find((lang) => lang.language === language) ??
        languageItems[0];
    const ActiveFlag = activeItem.flag;

    // Desktop pakai hover, mobile pakai klik.
    const hoverHandlers = isMobile
        ? {}
        : {
              onMouseEnter: () => setIsOpen(true),
              onMouseLeave: () => setIsOpen(false),
          };

    return (
        <div className="relative flex h-full items-center" {...hoverHandlers}>
            <ButtonVariants
                variant={'languageItem'}
                onClick={() => setIsOpen((open) => !open)}
                className={cn(
                    'flex items-center gap-2 rounded-full px-3 py-1.5 transition-all duration-200',
                    isScrolled
                        ? 'text-muted-foreground hover:bg-muted'
                        : 'text-white/90 hover:bg-white/10 hover:text-white',
                    isOpen &&
                        (isScrolled ? 'bg-muted' : 'bg-white/10 text-white'),
                    isMobile &&
                        'border border-border text-foreground/70 hover:border-brand/40 hover:bg-transparent hover:text-brand',
                )}
            >
                <div className="flex items-center justify-center gap-1.5 p-0">
                    <ActiveFlag />
                    <span className="text-xs leading-none font-bold">
                        {activeItem.code}
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
                        className={cn(
                            'absolute right-0 z-50 min-w-[140px] overflow-hidden rounded-xl border border-border bg-card shadow-xl backdrop-blur-xl',
                            isMobile ? 'bottom-full mb-2' : 'top-full mt-2',
                        )}
                    >
                        {languageItems.map((lang) => {
                            const Flag = lang.flag;
                            const isCurrent = language === lang.language;
                            return (
                                <button
                                    key={lang.id}
                                    onClick={() => {
                                        setLanguage(lang.language);
                                        setIsOpen(false);
                                    }}
                                    className={cn(
                                        'flex w-full items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-brand/10 hover:text-brand',
                                        isCurrent
                                            ? 'bg-brand/5 font-semibold text-brand'
                                            : 'text-muted-foreground',
                                    )}
                                >
                                    <Flag />
                                    <span className="flex-1 text-left text-xs font-bold">
                                        {lang.label}
                                    </span>
                                    {isCurrent && (
                                        <Check className="h-4 w-4 shrink-0" />
                                    )}
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
