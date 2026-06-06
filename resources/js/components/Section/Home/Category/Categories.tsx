import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { ArrowRight, ArrowUpRight, LayoutGrid } from 'lucide-react';
import { categoriesHeaderHome } from '@/data/data';
import { useLanguage } from '@/hooks/useLanguage';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import type { FeaturedCategoriesProps } from '@/types/HomePage/FeaturedHome';
import type { CategoryProps } from '@/types/DataTypes/CategoryProps';

const Categories = ({ categories }: FeaturedCategoriesProps) => {
    const { language } = useLanguage();
    const text =
        language === 'id' ? categoriesHeaderHome.id : categoriesHeaderHome.en;

    // Tampilkan ringkas di beranda (maks. 9), selebihnya via "Semua kategori".
    const items = (categories?.data ?? []).slice(0, 9);

    if (items.length === 0) return null;

    return (
        <section className="theme-transition relative overflow-hidden py-20 lg:py-28">
            <div className="dot-grid pointer-events-none absolute inset-0 opacity-40" />
            <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
                {/* Header */}
                <div className="mb-12 flex items-end justify-between gap-6">
                    <div>
                        <motion.span
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="tracking-editorial inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase text-cobalt dark:text-cobalt-lt"
                        >
                            <LayoutGrid className="h-3.5 w-3.5" />
                            {language === 'id' ? 'Jelajahi Koleksi' : 'Explore Collection'}
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.08 }}
                            className="mt-5 font-display text-3xl font-bold text-foreground lg:text-5xl"
                            style={{ textWrap: 'balance' }}
                        >
                            {text.title}
                        </motion.h2>
                        <p className="mt-3 max-w-xl text-muted-foreground">
                            {text.description}
                        </p>
                    </div>
                    <Link
                        href={route('catalog.categories')}
                        className="group hidden shrink-0 items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-cobalt md:inline-flex dark:hover:text-cobalt-lt"
                    >
                        {language === 'id' ? 'Semua kategori' : 'All categories'}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                    {items.map((c: CategoryProps, i: number) => (
                        <motion.div
                            key={c.id}
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                        >
                            <Link
                                href={route('catalog.category.books', {
                                    slug: c.slug,
                                })}
                                className="hairline group relative block aspect-[4/3] overflow-hidden rounded-xl2 border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-cobalt/30 hover:shadow-lift dark:bg-night-2"
                            >
                                {/* Foto kategori sebagai gambar utama kartu */}
                                {c.photo ? (
                                    <ImageWithFallback
                                        src={c.photo}
                                        alt={c.name}
                                        loading="lazy"
                                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="absolute inset-0 bg-gradient-to-br from-cobalt/25 via-night-2 to-night" />
                                )}

                                {/* Scrim agar teks terbaca di atas foto */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/35" />

                                {/* Ikon kategori — tetap berkotak, kini sebagai badge di atas */}
                                <div className="absolute top-3 left-3 grid h-11 w-11 place-items-center overflow-hidden rounded-xl bg-white/90 ring-1 ring-white/40 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110 dark:bg-night-3/85">
                                    {c.icon ? (
                                        <ImageWithFallback
                                            src={c.icon}
                                            alt={c.name}
                                            loading="lazy"
                                            className="h-7 w-7 object-contain"
                                        />
                                    ) : (
                                        <LayoutGrid className="h-6 w-6 text-cobalt dark:text-cobalt-lt" />
                                    )}
                                </div>

                                {/* Panah */}
                                <span className="absolute top-3 right-3 grid h-8 w-8 place-items-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-all duration-300 group-hover:bg-cobalt">
                                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                </span>

                                {/* Nama + jumlah judul (overlay bawah) */}
                                <div className="absolute inset-x-0 bottom-0 p-4">
                                    <div className="font-display text-lg font-semibold text-white">
                                        {c.name}
                                    </div>
                                    <div className="mt-0.5 text-xs text-white/70">
                                        <span className="tabnum font-medium text-white/90">
                                            {c.count_of_books ?? 0}
                                        </span>{' '}
                                        {language === 'id'
                                            ? 'judul tersedia'
                                            : 'titles available'}
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Mobile view-all */}
                <div className="mt-10 text-center md:hidden">
                    <Link
                        href={route('catalog.categories')}
                        className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-cobalt/40 hover:text-cobalt dark:bg-night-2 dark:hover:text-cobalt-lt"
                    >
                        {language === 'id' ? 'Semua kategori' : 'All categories'}
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Categories;
