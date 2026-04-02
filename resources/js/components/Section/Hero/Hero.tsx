import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import { contentHero, slidesHero } from '@/data/data';
import { MdOutlineMenuBook } from 'react-icons/md';
import { FaSearch } from 'react-icons/fa';
import { ButtonVariants } from '@/components/ui/button3D';

const HeroSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const { language } = useLanguage();

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slidesHero.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const content = language === 'id' ? contentHero.id : contentHero.en;
    return (
        <section
            id="home"
            className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-20"
        >
            <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
            <div className="bg-gradient absolute inset-0 z-[1] bg-gradient-to-r from-black/30 via-transparent to-black/30"></div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 h-full w-full bg-cover bg-center"
                >
                    <img
                        src={slidesHero[currentSlide]}
                        alt={`Hero ${currentSlide + 1}`}
                        className="h-full w-full object-cover object-center"
                    />
                </motion.div>
            </AnimatePresence>
            <div className="absolute right-8 bottom-8 z-10 flex gap-4">
                {slidesHero.map((_, index) => (
                    <motion.button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-1.5 rounded-full transition-all duration-500 ${currentSlide === index ? 'w-12 bg-[#C8A45C] dark:bg-[#D4AF37]' : 'w-8 bg-white/40 hover:bg-white/50 dark:bg-white/10 dark:hover:bg-white/20'}`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    ></motion.button>
                ))}
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.3, 1] }}
                    className="space-y-10"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: 0.2,
                            duration: 0.8,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="inline-block"
                    >
                        <div className="group relative">
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#C8A45C] to-[#D4AF37] opacity-50 blur-lg transition-opacity duration-500 group-hover:opacity-75"></div>
                            <div className="relative inset-0 flex flex-row items-center gap-3 rounded-full bg-gradient-to-r from-[#C8A45C] to-[#D4AF37] px-3 py-2 shadow-[0_8px_0_0_rgba(200,164,92,0.4)] dark:bg-white/10 dark:shadow-[0px_4px_10px_rgba(0,0,0,0.3]">
                                <MdOutlineMenuBook className="h-6 w-6 object-cover" />
                                <span className="relative text-xs font-semibold tracking-wider text-[#C8A45C] uppercase dark:text-white">
                                    {content.badge}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: 0.4,
                            duration: 0.8,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="space-y-6"
                    >
                        <h1
                            className="mb-6 text-6xl tracking-tight text-white sm:text-7xl lg:text-6xl"
                            style={{ fontFamily: 'Playfair Display, serif' }}
                        >
                            <motion.span
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                                className="mb-2 block text-[#C8A45C] dark:text-[#D4AF37]"
                            >
                                {content.title}
                            </motion.span>
                            <motion.span
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6, duration: 0.8 }}
                                className="block"
                            >
                                {content.subtitle}
                            </motion.span>
                        </h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 0.8 }}
                            className="mx-auto max-w-3xl text-lg leading-relaxed font-light text-white/95 md:text-xl lg:text-3xl"
                        >
                            {content.description}
                        </motion.p>
                    </motion.div>
                </motion.div>
            </div>
            <div className="relative z-10 mx-auto max-w-[2000px] rounded-full bg-white px-4 py-2 sm:px-3 lg:px-2 dark:bg-[#D4AF37]">
                <label
                    htmlFor="search"
                    className="flex flex-row items-center justify-between justify-center gap-1"
                >
                    <div className="object-cover object-center p-2">
                        <FaSearch className="h-6 w-6 text-white" />
                    </div>
                    <form method="post" className="flex gap-2 px-2 py-2">
                        <input
                            type="text"
                            placeholder={
                                language === 'id'
                                    ? 'Cari Sesuatu...'
                                    : 'Search Anyway...'
                            }
                            id="search"
                            className="rounded-full px-5 py-2 text-white dark:text-black"
                        />
                        <ButtonVariants
                            variant={'default'}
                            size={'sm'}
                            type="submit"
                        >
                            Submit
                        </ButtonVariants>
                    </form>
                </label>
            </div>
            {/* Premium Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 12, 0] }}
                    transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                    className="flex flex-col items-center gap-2"
                >
                    <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/40 p-1.5">
                        <motion.div
                            animate={{
                                y: [0, 16, 0],
                                opacity: [1, 0, 1],
                            }}
                            transition={{
                                duration: 2.5,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                            className="h-1.5 w-1.5 rounded-full bg-white"
                        />
                    </div>
                    <span className="text-xs font-medium tracking-wider text-white/60 uppercase">
                        {language === 'ID' ? 'Gulir' : 'Scroll'}
                    </span>
                </motion.div>
            </motion.div>

            {/* Decorative Elements */}
            <div className="absolute top-1/4 left-10 h-32 w-32 animate-pulse rounded-full bg-[#C8A45C]/10 blur-3xl dark:bg-[#D4AF37]/10"></div>
            <div
                className="absolute right-10 bottom-1/4 h-40 w-40 animate-pulse rounded-full bg-[#C8A45C]/10 blur-3xl dark:bg-[#D4AF37]/10"
                style={{ animationDelay: '1s' }}
            ></div>
        </section>
    );
};

export default HeroSection;
