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
                                className="hairline group relative block overflow-hidden rounded-xl2 border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cobalt/30 hover:shadow-lift dark:bg-night-2"
                            >
                                {/* hover blob */}
                                <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-cobalt-50 transition-transform duration-500 group-hover:scale-150 dark:bg-cobalt/10" />

                                <div className="relative flex items-start justify-between">
                                    <div className="grid h-12 w-12 place-items-center overflow-hidden rounded-xl bg-brand/10 ring-1 ring-brand/15 transition-transform duration-300 group-hover:scale-110">
                                        {c.icon ? (
                                            <ImageWithFallback
                                                src={c.icon}
                                                alt={c.name}
                                                loading="lazy"
                                                className="h-7 w-7 object-contain"
                                            />
                                        ) : (
                                            <LayoutGrid className="h-6 w-6 text-brand" />
                                        )}
                                    </div>
                                    <ArrowUpRight className="h-[18px] w-[18px] text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cobalt dark:group-hover:text-cobalt-lt" />
                                </div>

                                <div className="relative mt-7">
                                    <div className="font-display text-lg font-semibold text-foreground transition-colors group-hover:text-cobalt dark:group-hover:text-cobalt-lt">
                                        {c.name}
                                    </div>
                                    <div className="mt-1 text-xs text-muted-foreground">
                                        <span className="tabnum font-medium text-foreground/70">
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
