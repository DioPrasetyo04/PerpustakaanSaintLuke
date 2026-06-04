import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { router } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { useLanguage } from '@/hooks/useLanguage';
import { contentHero, slidesHero } from '@/data/data';
import { BookOpen, Search, Loader2, ChevronDown } from 'lucide-react';

const HeroSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [searchInput, setSearchInput] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const { language } = useLanguage();

    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const keyword = searchInput.trim();
        router.get(route('resource'), keyword ? { search: keyword } : {}, {
            preserveScroll: false,
            onStart: () => setSubmitting(true),
            onFinish: () => setSubmitting(false),
        });
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slidesHero.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const content = language === 'id' ? contentHero.id : contentHero.en;

    return (
        <header
            id="home"
            className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-20"
        >
            {/* Background slide carousel */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 h-full w-full"
                >
                    <img
                        src={slidesHero[currentSlide]}
                        alt={`Hero ${currentSlide + 1}`}
                        className="h-full w-full object-cover object-center"
                    />
                </motion.div>
            </AnimatePresence>

            {/* Cinematic overlays: dark vignette + subtle warm gold tint */}
            <div className="absolute inset-0 z-1 bg-linear-to-b from-black/70 via-black/55 to-black/80" />
            <div className="absolute inset-0 z-1 bg-linear-to-tr from-brand/15 via-transparent to-transparent" />

            {/* Floating decorative blobs */}
            <div className="animate-float absolute top-1/4 left-10 z-1 h-40 w-40 rounded-full bg-brand/15 blur-3xl" />
            <div className="animate-float-slow absolute right-12 bottom-1/4 z-1 h-52 w-52 rounded-full bg-amber-300/10 blur-3xl" />

            {/* Slide indicators */}
            <div className="absolute right-8 bottom-8 z-20 flex gap-3">
                {slidesHero.map((_, index) => (
                    <motion.button
                        key={index}
                        aria-label={`Go to slide ${index + 1}`}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-1.5 rounded-full transition-all duration-500 ${
                            currentSlide === index
                                ? 'w-12 bg-brand'
                                : 'w-8 bg-white/40 hover:bg-white/60'
                        }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    />
                ))}
            </div>

            {/* Content */}
            <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-4 py-12 text-center sm:px-6 lg:px-8">
                <motion.span
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-7 inline-flex items-center gap-2 rounded-full border border-brand/40 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-brand uppercase shadow-lg backdrop-blur-md"
                >
                    <BookOpen className="h-4 w-4" />
                    {content.badge}
                </motion.span>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="font-poppins text-4xl font-bold tracking-tight text-white drop-shadow-2xl sm:text-6xl lg:text-7xl"
                >
                    <span className="block text-brand">{content.title}</span>
                    <span className="mt-2 block">{content.subtitle}</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="mx-auto mt-6 max-w-2xl text-base leading-relaxed font-light text-white/90 sm:text-lg lg:text-xl"
                >
                    {content.description}
                </motion.p>

                {/* Glass search */}
                <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    onSubmit={handleSearchSubmit}
                    role="search"
                    className="mt-10 w-full max-w-xl"
                >
                    <div className="group flex items-center gap-2 rounded-full border border-white/20 bg-white/10 p-2 pl-5 shadow-2xl backdrop-blur-xl transition-all duration-300 focus-within:border-brand/60 focus-within:bg-white/15 focus-within:ring-4 focus-within:ring-brand/20">
                        <Search className="h-5 w-5 shrink-0 text-white/70 transition-colors group-focus-within:text-brand" />
                        <input
                            type="text"
                            id="search"
                            name="search"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            placeholder={
                                language === 'id'
                                    ? 'Cari buku, penulis, atau kategori...'
                                    : 'Search books, authors, or categories...'
                            }
                            className="min-w-0 flex-1 bg-transparent text-sm text-white placeholder:text-white/60 focus:outline-none sm:text-base"
                        />
                        <button
                            type="submit"
                            disabled={submitting}
                            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground shadow-lg shadow-black/20 transition-all duration-300 hover:scale-105 hover:bg-brand/90 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {submitting ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <Search className="h-4 w-4 sm:hidden" />
                            )}
                            <span className="hidden sm:inline">
                                {language === 'id' ? 'Cari' : 'Search'}
                            </span>
                        </button>
                    </div>
                </motion.form>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="flex flex-col items-center gap-1.5"
                >
                    <div className="flex h-9 w-5.5 items-start justify-center rounded-full border-2 border-white/40 p-1.5">
                        <motion.div
                            animate={{ y: [0, 14, 0], opacity: [1, 0, 1] }}
                            transition={{
                                duration: 2.5,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                            className="h-1.5 w-1.5 rounded-full bg-white"
                        />
                    </div>
                    <ChevronDown className="h-4 w-4 text-white/60" />
                </motion.div>
            </motion.div>
        </header>
    );
};

export default HeroSection;
