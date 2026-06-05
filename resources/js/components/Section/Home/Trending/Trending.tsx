
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Star, ArrowRight } from 'lucide-react';
import { route } from 'ziggy-js';
import { useLanguage } from '@/hooks/useLanguage';
import { formattedRating } from '@/lib/utils';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import type { BookProps } from '@/types/DataTypes/BooksProps';

type TrendingProps = {
    books: BookProps[];
};

const fadeUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
};

const Trending = ({ books }: TrendingProps) => {
    const { language } = useLanguage();
    const list = (books ?? []).filter((b) => b?.title).slice(0, 7);
    if (list.length === 0) return null;
    const [hero, ...rest] = list;

    return (
        <section className="hairline border-y bg-ink text-paper dark:bg-night-2">
            <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
                <div className="mb-12 flex items-end justify-between gap-6">
                    <div>
                        <motion.span
                            {...fadeUp}
                            className="tracking-editorial inline-flex items-center gap-2 rounded-full bg-cobalt/20 px-3 py-1 text-[11px] font-semibold uppercase text-cobalt-lt"
                        >
                            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cobalt-lt" />
                            {language === 'id' ? 'Paling Dicari' : 'Most Wanted'}
                        </motion.span>
                        <motion.h2
                            {...fadeUp}
                            transition={{ delay: 0.08 }}
                            className="mt-5 font-display text-3xl lg:text-5xl"
                            style={{ textWrap: 'balance' }}
                        >
                            {language === 'id' ? (
                                <>
                                    Sedang ramai dipinjam{' '}
                                    <em className="text-cobalt-lt not-italic">minggu ini</em>
                                </>
                            ) : (
                                <>
                                    Trending borrows{' '}
                                    <em className="text-cobalt-lt not-italic">this week</em>
                                </>
                            )}
                        </motion.h2>
                    </div>
                    <Link
                        href="/catalog/books"
                        className="group hidden items-center gap-2 text-sm font-semibold text-paper hover:text-cobalt-lt md:inline-flex"
                    >
                        {language === 'id' ? 'Lihat semua' : 'View all'}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                <div className="grid grid-cols-12 gap-8">
                    {/* Featured #1 */}
                    <motion.div {...fadeUp} className="col-span-12 lg:col-span-5">
                        <Link
                            href={route('book.detail', { slug: hero.slug })}
                            className="group block h-full rounded-xl2 border border-white/10 bg-night-3/60 p-7 transition-colors hover:border-cobalt/40 dark:bg-night-3"
                        >
                            <div className="flex gap-6">
                                <div className="shrink-0 overflow-hidden rounded-l-sm rounded-r-lg shadow-book-3d spine-shadow">
                                    <ImageWithFallback
                                        src={hero.cover}
                                        alt={hero.title}
                                        className="aspect-[3/4] w-32 object-cover"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <span className="tracking-editorial inline-flex items-center gap-1.5 self-start rounded-full bg-amber-400 px-2.5 py-1 text-[10px] font-bold uppercase text-amber-950">
                                        <Star className="h-2.5 w-2.5 fill-current" />
                                        {language === 'id' ? '#1 Terpopuler' : '#1 Most Popular'}
                                    </span>
                                    <h3
                                        className="mt-4 font-display text-2xl leading-tight transition-colors group-hover:text-cobalt-lt"
                                        style={{ textWrap: 'balance' }}
                                    >
                                        {hero.title}
                                    </h3>
                                    <div className="mt-1 text-sm text-paper/60">
                                        {hero.authors?.[0]?.name}
                                    </div>
                                    {hero.synopsis && (
                                        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-paper/55">
                                            {hero.synopsis}
                                        </p>
                                    )}
                                    <div className="mt-auto flex items-center gap-4 pt-4 text-xs">
                                        <span className="inline-flex items-center gap-1 text-amber-400">
                                            <Star className="h-3 w-3 fill-current" />
                                            {formattedRating(hero.avg_rating) ?? '—'}
                                        </span>
                                        {hero.publication_year && (
                                            <span className="text-paper/40">
                                                {hero.publication_year}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </motion.div>

                    {/* List 2-7 */}
                    <div className="col-span-12 lg:col-span-7">
                        <div className="grid gap-x-8 gap-y-1 sm:grid-cols-2">
                            {rest.map((b, i) => (
                                <motion.div
                                    key={b.id}
                                    {...fadeUp}
                                    transition={{ delay: i * 0.05 }}
                                >
                                    <Link
                                        href={route('book.detail', { slug: b.slug })}
                                        className="group flex items-center gap-4 border-b border-white/5 py-3.5 transition-colors hover:border-cobalt/30"
                                    >
                                        <span className="w-7 font-display text-2xl text-paper/30 transition-colors group-hover:text-cobalt-lt">
                                            {i + 2}
                                        </span>
                                        <div className="min-w-0 flex-1">
                                            <div className="line-clamp-1 font-display text-base leading-snug transition-colors group-hover:text-cobalt-lt">
                                                {b.title}
                                            </div>
                                            <div className="line-clamp-1 text-xs text-paper/45">
                                                {b.authors?.[0]?.name}
                                            </div>
                                        </div>
                                        <div className="shrink-0 text-right">
                                            <span className="inline-flex items-center gap-1 text-xs text-amber-400">
                                                <Star className="h-2.5 w-2.5 fill-current" />
                                                {formattedRating(b.avg_rating) ?? '—'}
                                            </span>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Trending;
