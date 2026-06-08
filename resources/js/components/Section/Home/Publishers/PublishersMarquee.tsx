import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { route } from 'ziggy-js';
import { ArrowRight, ArrowUpRight, Building2 } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { useQueryParams } from '@/hooks/useQueryParams';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import Pagination from '@/components/component/Home/Pagination/Pagination';
import type { FeaturedPublisher } from '@/types/HomePage/HomePageProps';
import type { Paginated } from '@/types/pagination';

type PublishersMarqueeProps = {
    publishers: Paginated<FeaturedPublisher>;
};

const PublishersMarquee = ({ publishers }: PublishersMarqueeProps) => {
    const { language } = useLanguage();

    const items = publishers?.data ?? [];
    const meta = publishers?.meta;

    const { createPagination } = useQueryParams();
    const { onPageChange, onPerPageChange } = createPagination(
        'publishers',
        meta?.per_page ?? 8,
    );

    if (items.length === 0) return null;

    return (
        <section className="theme-transition relative overflow-hidden border-y border-border/60 bg-muted/30 py-20 lg:py-28 dark:bg-white/2">
            <div className="line-grid pointer-events-none absolute inset-0 opacity-40" />
            <div className="relative mx-auto max-w-[100rem] px-6 lg:px-10">
                {/* Header */}
                <div className="mb-12 flex items-end justify-between gap-6">
                    <div>
                        <motion.span
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="tracking-editorial inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase text-cobalt dark:text-cobalt-lt"
                        >
                            <Building2 className="h-3.5 w-3.5" />
                            {language === 'id' ? 'Mitra Penerbit' : 'Publisher Partners'}
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.08 }}
                            className="mt-5 font-display text-3xl font-bold text-foreground lg:text-5xl"
                            style={{ textWrap: 'balance' }}
                        >
                            {language === 'id'
                                ? 'Telusuri berdasarkan penerbit'
                                : 'Browse by publisher'}
                        </motion.h2>
                        <p className="mt-3 max-w-xl text-muted-foreground">
                            {language === 'id'
                                ? 'Pilih penerbit untuk menjelajahi koleksi buku dari mitra tepercaya kami.'
                                : 'Pick a publisher to explore the collection from our trusted partners.'}
                        </p>
                    </div>
                    <Link
                        href={route('catalog.publishers')}
                        className="group hidden shrink-0 items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-cobalt md:inline-flex dark:hover:text-cobalt-lt"
                    >
                        {language === 'id' ? 'Semua penerbit' : 'All publishers'}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                {/* Grid pilih penerbit */}
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                    {items.map((p, i) => (
                        <motion.div
                            key={p.id}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.04 }}
                        >
                            <Link
                                href={route('catalog.publisher.books', {
                                    slug: p.slug,
                                })}
                                className="hairline group flex h-full items-center gap-3.5 rounded-xl2 border bg-card p-4 transition-all duration-300 hover:-translate-y-1 hover:border-cobalt/30 hover:shadow-lift dark:bg-night-2"
                            >
                                <div className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-xl bg-cobalt-50 text-cobalt ring-1 ring-cobalt/10 transition-transform duration-300 group-hover:scale-110 dark:bg-cobalt/15 dark:text-cobalt-lt">
                                    {p.logo ? (
                                        <ImageWithFallback
                                            src={p.logo}
                                            alt={p.name}
                                            loading="lazy"
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <Building2 className="h-5 w-5" />
                                    )}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="truncate font-display text-sm font-semibold text-foreground transition-colors group-hover:text-cobalt dark:group-hover:text-cobalt-lt">
                                        {p.name}
                                    </div>
                                    <div className="mt-0.5 text-[11px] text-muted-foreground">
                                        <span className="tabnum font-medium text-foreground/70">
                                            {p.books_count}
                                        </span>{' '}
                                        {language === 'id' ? 'judul' : 'titles'}
                                    </div>
                                </div>
                                <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cobalt dark:group-hover:text-cobalt-lt" />
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {meta && meta.last_page > 1 && (
                    <Pagination
                        page={meta.current_page}
                        total={meta.total}
                        perPage={meta.per_page}
                        onPageChange={onPageChange}
                        onPerPageChange={onPerPageChange}
                    />
                )}

                {/* Mobile view-all */}
                <div className="mt-10 text-center md:hidden">
                    <Link
                        href={route('catalog.publishers')}
                        className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-cobalt/40 hover:text-cobalt dark:bg-night-2 dark:hover:text-cobalt-lt"
                    >
                        {language === 'id' ? 'Semua penerbit' : 'All publishers'}
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default PublishersMarquee;
