import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';
import { Star } from 'lucide-react';
import { cn, formattedRating } from '@/lib/utils';
import { Card } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import BookmarkButton from '@/components/common/BookmarkButton';
import type { BookProps, BookStatus } from '@/types/DataTypes/BooksProps';
import { useLanguage } from '@/hooks/useLanguage';

type BookCardProps = BookProps & {
    isBookmarked?: boolean;
};

const statusVariant: Record<
    BookStatus,
    'available' | 'unavailale' | 'loan' | 'lost' | 'damaged'
> = {
    Tersedia: 'available',
    'Tidak Tersedia': 'unavailale',
    Dipinjam: 'loan',
    Hilang: 'lost',
    Rusak: 'damaged',
};

const BookCard = ({
    title,
    slug,
    cover,
    status,
    authors,
    categories,
    publisher,
    synopsis,
    avg_rating,
    isBookmarked = false,
}: BookCardProps) => {
    const { language } = useLanguage();
    const isAvailable = status === 'Tersedia';

    const labels = {
        author: language === 'id' ? 'Penulis' : 'Author',
        category: language === 'id' ? 'Kategori' : 'Categories',
        publisher: language === 'id' ? 'Penerbit' : 'Publisher',
        detail: language === 'id' ? 'Lihat Detail Buku' : 'View Book Detail',
    };

    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            whileHover={{ y: -8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            className="h-full"
        >
            <Link
                href={isAvailable ? `/book/detail/${slug}` : ''}
                onClick={(e) => {
                    if (!isAvailable) e.preventDefault();
                }}
                className={cn('block h-full', !isAvailable && 'pointer-events-none')}
                tabIndex={isAvailable ? undefined : -1}
            >
                <Card
                    className={cn(
                        'group theme-transition flex h-full flex-col gap-0 overflow-hidden rounded-2xl border border-gray-200/80 bg-card p-0 shadow-sm transition-all duration-300 hover:border-brand/60 hover:shadow-2xl hover:shadow-brand/10 dark:border-white/10',
                        !isAvailable && 'opacity-70',
                    )}
                >
                    {/* Thumbnail */}
                    <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                        <ImageWithFallback
                            src={cover}
                            alt={title}
                            loading="lazy"
                            className="block h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                        <Badge
                            variant={statusVariant[status]}
                            className="absolute top-3 left-3 z-10 rounded-full px-2.5 py-1 shadow-lg"
                        >
                            {status}
                        </Badge>

                        <div className="absolute top-3 right-3 z-10">
                            <BookmarkButton
                                slug={slug}
                                title={title}
                                isBookmarked={isBookmarked}
                            />
                        </div>
                    </div>

                    {/* Body */}
                    <div className="flex flex-1 flex-col p-4">
                        <div className="mb-2 flex items-start justify-between gap-2">
                            <h3 className="line-clamp-2 font-poppins font-semibold text-foreground transition-colors group-hover:text-brand">
                                {title}
                            </h3>
                            <span className="flex shrink-0 items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
                                <Star className="h-3.5 w-3.5 fill-current" />
                                {formattedRating(avg_rating) ?? 0}
                            </span>
                        </div>

                        {synopsis && (
                            <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
                                {synopsis}
                            </p>
                        )}

                        {/* Author */}
                        {authors?.length > 0 && (
                            <div className="mb-3">
                                <p className="mb-1.5 text-[0.7rem] font-semibold tracking-wide text-muted-foreground uppercase">
                                    {labels.author}
                                </p>
                                <div className="flex flex-wrap items-center gap-1.5">
                                    {authors.map((author) => (
                                        <span
                                            key={author.id}
                                            className="flex items-center gap-1.5 rounded-full bg-secondary py-0.5 pr-2.5 pl-0.5 text-xs font-medium text-secondary-foreground"
                                        >
                                            <ImageWithFallback
                                                src={author.avatar}
                                                alt={author.name}
                                                loading="lazy"
                                                className="h-5 w-5 rounded-full object-cover"
                                            />
                                            {author.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Categories */}
                        {categories?.length > 0 && (
                            <div className="mb-3">
                                <p className="mb-1.5 text-[0.7rem] font-semibold tracking-wide text-muted-foreground uppercase">
                                    {labels.category}
                                </p>
                                <div className="flex flex-wrap items-center gap-1.5">
                                    {categories.map((category) => (
                                        <Badge
                                            key={category.id}
                                            variant="outline"
                                            className="gap-1 rounded-full border-brand/30 text-[0.7rem] text-foreground/80"
                                        >
                                            {category.icon && (
                                                <img
                                                    src={category.icon}
                                                    alt=""
                                                    aria-hidden
                                                    loading="lazy"
                                                    className="h-3.5 w-3.5"
                                                />
                                            )}
                                            {category.name}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Publisher */}
                        {publisher?.name && (
                            <div className="mb-4">
                                <p className="mb-1.5 text-[0.7rem] font-semibold tracking-wide text-muted-foreground uppercase">
                                    {labels.publisher}
                                </p>
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary py-0.5 pr-2.5 pl-0.5 text-xs font-medium text-secondary-foreground">
                                    <ImageWithFallback
                                        src={publisher.logo}
                                        alt={publisher.name}
                                        loading="lazy"
                                        className="h-5 w-5 rounded-full object-cover"
                                    />
                                    {publisher.name}
                                </span>
                            </div>
                        )}

                        {/* CTA */}
                        <div className="mt-auto pt-1">
                            <Button
                                className={cn(
                                    'w-full rounded-xl transition-colors duration-300',
                                    isAvailable
                                        ? 'bg-brand text-brand-foreground shadow-sm hover:bg-brand/90'
                                        : 'cursor-not-allowed bg-muted text-muted-foreground',
                                )}
                                disabled={!isAvailable}
                            >
                                {isAvailable ? labels.detail : status}
                            </Button>
                        </div>
                    </div>
                </Card>
            </Link>
        </motion.article>
    );
};

export default BookCard;
