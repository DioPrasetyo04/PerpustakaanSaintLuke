import { navLogo } from '@/data/data';
import { useLanguage } from '@/hooks/useLanguage';
import { NavbarLogoProps } from '@/types/navbar';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import React from 'react';

const NavbarLogo = ({ scrollToSection }: NavbarLogoProps) => {
    const { language } = useLanguage();
    return (
        <>
            <motion.div
                className="group flex cursor-pointer items-center"
                onClick={() => scrollToSection('hero')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 1.0 }}
            >
                <Link
                    href={'/'}
                    className="group relative flex flex-row items-center justify-center gap-[5px] p-3"
                >
                    <div className="bg-cover bg-center p-5">
                        <img
                            src="/assets/logos/Saint-Luke.jpg"
                            alt="logo saint luke"
                            className="h-15 w-15 rounded-full object-cover object-center p-0"
                        />
                    </div>
                    <div
                        className="text-2xl font-bold tracking-tight"
                        style={{
                            fontFamily: 'Playfair Display, serif',
                        }}
                    >
                        <span
                            key={navLogo.id}
                            className="text-[#C8A45C] transition-colors duration-300 group-hover:text-[#B69449]"
                        >
                            {language === 'id'
                                ? navLogo.label.id
                                : navLogo.label.en}
                        </span>
                    </div>
                    <motion.div
                        className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[#C8A45C] to-transparent"
                        initial={{ width: 0 }}
                        whileHover={{ width: '100%' }}
                        transition={{ duration: 0.3 }}
                    />
                </Link>
            </motion.div>
        </>
    );
};

export default NavbarLogo;
