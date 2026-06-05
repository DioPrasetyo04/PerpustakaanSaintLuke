import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';
import { Star, ArrowRight } from 'lucide-react';
import { cn, formattedRating } from '@/lib/utils';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import BookmarkButton from '@/components/common/BookmarkButton';
import type { BookProps, BookStatus } from '@/types/DataTypes/BooksProps';
import { useLanguage } from '@/hooks/useLanguage';

type BookCardProps = BookProps & {
    isBookmarked?: boolean;
};

/* availability chip tone per status (prototype TypeChip vibe) */
const statusTone: Record<BookStatus, string> = {
    Tersedia:
        'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
    'Tidak Tersedia':
        'bg-muted text-muted-foreground',
    Dipinjam: 'bg-brass-50 text-brass dark:bg-brass/15 dark:text-brass-lt',
    Hilang: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300',
    Rusak: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200',
};

const BookCard = ({
    title,
    slug,
    cover,
    status,
    authors,
    categories,
    publisher,
    avg_rating,
    isBookmarked = false,
}: BookCardProps) => {
    const { language } = useLanguage();
    const isAvailable = status === 'Tersedia';
    const category = categories?.[0];
    const author = authors?.[0];
    const rating = formattedRating(avg_rating) ?? '0';
    const popular = Number(avg_rating) >= 4.5;

    const labels = {
        available: language === 'id' ? 'Tersedia' : 'Available',
        queue: language === 'id' ? 'Antri' : 'Queue',
        view: language === 'id' ? 'Lihat' : 'View',
        popular: language === 'id' ? 'Populer' : 'Popular',
        out: language === 'id' ? 'Habis' : 'Out',
    };

    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            className="h-full"
        >
            <Link href={`/book/detail/${slug}`} className="group block h-full">
                <div className="prod-card flex h-full flex-col overflow-hidden rounded-xl2 border border-border bg-card shadow-soft transition-all duration-300 group-hover:border-cobalt/40 group-hover:shadow-lift">
                    {/* Image area — 3D tilting book */}
                    <div className="relative flex justify-center bg-paper-2/50 px-4 pt-6 pb-8 dark:bg-night-3/40">
                        <div className="dot-grid pointer-events-none absolute inset-0 opacity-40" />
                        <div className="book3d-stage relative w-full">
                            <div className="book3d-tilt aspect-[3/4] w-full">
                                <div className="book3d-face spine-shadow h-full w-full overflow-hidden rounded-l-sm rounded-r-md">
                                    <ImageWithFallback
                                        src={cover}
                                        alt={title}
                                        loading="lazy"
                                        className="h-full w-full object-cover"
                                    />
                                    <div className="book3d-sheen" />
                                </div>
                            </div>
                        </div>

                        {/* badges top-left */}
                        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5">
                            {popular && (
                                <span className="tracking-editorial inline-flex items-center gap-1 rounded-full bg-brass px-2 py-0.5 text-[10px] font-bold uppercase text-white shadow-sm">
                                    <Star className="h-2.5 w-2.5 fill-current" />
                                    {labels.popular}
                                </span>
                            )}
                            {!isAvailable && (
                                <span className="tracking-editorial inline-flex items-center rounded-full bg-ink/85 px-2 py-0.5 text-[10px] font-bold uppercase text-paper shadow-sm dark:bg-paper/90 dark:text-ink">
                                    {labels.out}
                                </span>
                            )}
                        </div>

                        {/* bookmark top-right */}
                        <div
                            className="absolute top-3 right-3 z-10"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                            }}
                        >
                            <BookmarkButton
                                slug={slug}
                                title={title}
                                isBookmarked={isBookmarked}
                            />
                        </div>
                    </div>

                    {/* Meta */}
                    <div className="flex flex-1 flex-col p-4 pt-3.5">
                        <div className="mb-2 flex items-center justify-between gap-2">
                            <span className="tracking-editorial truncate font-mono text-[10px] uppercase text-cobalt dark:text-cobalt-lt">
                                {category?.name}
                            </span>
                            <span
                                className={cn(
                                    'tracking-editorial shrink-0 rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase',
                                    statusTone[status],
                                )}
                            >
                                {status}
                            </span>
                        </div>

                        <h3 className="line-clamp-2 font-display text-[16px] leading-snug font-semibold text-foreground transition-colors group-hover:text-cobalt dark:group-hover:text-cobalt-lt">
                            {title}
                        </h3>

                        {author?.name && (
                            <div className="mt-1 line-clamp-1 text-xs text-muted-foreground">
                                {author.name}
                            </div>
                        )}

                        <div className="mt-3 flex items-center justify-between gap-2 text-xs">
                            <span className="inline-flex shrink-0 items-center gap-1 text-brass-lt">
                                <Star className="h-3 w-3 fill-current" />
                                <span className="font-semibold tabnum text-foreground">
                                    {rating}
                                </span>
                            </span>
                            {publisher?.name && (
                                <span className="truncate text-muted-foreground">
                                    {publisher.name}
                                </span>
                            )}
                        </div>

                        <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                            <span
                                className={cn(
                                    'inline-flex items-center gap-1.5 text-[11px] font-medium',
                                    isAvailable
                                        ? 'text-emerald-600 dark:text-emerald-400'
                                        : 'text-muted-foreground',
                                )}
                            >
                                <span
                                    className={cn(
                                        'h-1.5 w-1.5 rounded-full',
                                        isAvailable
                                            ? 'bg-emerald-500'
                                            : 'bg-muted-foreground',
                                    )}
                                />
                                {isAvailable ? labels.available : labels.queue}
                            </span>
                            <span className="tracking-editorial inline-flex translate-x-1 items-center gap-1 text-[11px] font-semibold uppercase text-cobalt opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 dark:text-cobalt-lt">
                                {labels.view}
                                <ArrowRight className="h-3 w-3" />
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.article>
    );
};

export default BookCard;
