import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import { useTheme } from 'next-themes';
import DropdownMenuLanguage from './DropdownMenuLanguage';

const NavbarActions = () => {
    const { language, setLanguage } = useLanguage();
    return (
        <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <DropdownMenuLanguage isScrolled={false} />

            {/* Dark Mode Toggle */}
            {/* <motion.button
                // onClick={() => setDarkModeHandler(darkMode)}
                className="rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] p-2.5 transition-all duration-300 hover:border-[#C8A45C] dark:border-[#334155] dark:bg-[#1E293B] dark:hover:border-[#D4AF37]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <AnimatePresence mode="wait">
                    {darkMode ? (
                        <motion.div
                            key="sun"
                            initial={{
                                rotate: -90,
                                opacity: 0,
                            }}
                            animate={{
                                rotate: 0,
                                opacity: 1,
                            }}
                            exit={{
                                rotate: 90,
                                opacity: 0,
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            <Sun className="h-4 w-4 text-[#D4AF37]" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="moon"
                            initial={{
                                rotate: 90,
                                opacity: 0,
                            }}
                            animate={{
                                rotate: 0,
                                opacity: 1,
                            }}
                            exit={{
                                rotate: -90,
                                opacity: 0,
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            <Moon className="h-4 w-4 text-[#C8A45C]" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button> */}
        </div>
    );
};

export default NavbarActions;
