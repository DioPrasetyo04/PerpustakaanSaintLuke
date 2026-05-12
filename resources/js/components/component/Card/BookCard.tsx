import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardDescription } from '../../ui/card';
import { Link, router } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { Badge } from '../../ui/badge';
import { cn, formattedRating } from '@/lib/utils';
import { Bookmark } from 'lucide-react';
import { Button } from '../../ui/button';
import { BookProps, BookStatus } from '@/types/DataTypes/BooksProps';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import Notification from '@/components/component/Notification/Notification';

type BookCardProps = BookProps & {
    isBookmarked?: boolean;
};

const BookCard = ({
    id,
    title,
    slug,
    cover,
    status,
    authors,
    categories,
    avg_rating,
    isBookmarked = false,
}: BookCardProps) => {
    const [bookmarked, setBookmarked] = useState<boolean>(isBookmarked);
    const [pending, setPending] = useState<boolean>(false);
    const [notification, setNotification] = useState<{
        type: 'success' | 'error';
        message: string;
    } | null>(null);

    const getStatusColor = (status: BookStatus) => {
        switch (status) {
            case 'Tersedia':
                return 'bg-green-500';
            default:
                return 'bg-red-500';
        }
    };
    const isAvailable = status === 'Tersedia';

    const toggleBookmark = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (pending) return;
        setPending(true);

        if (bookmarked) {
            router.delete(route('bookmark.destroy', { slug }), {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => {
                    setBookmarked(false);
                    setNotification({
                        type: 'success',
                        message: `Bookmark untuk "${title}" berhasil dihapus.`,
                    });
                },
                onError: () => {
                    setNotification({
                        type: 'error',
                        message: 'Gagal menghapus bookmark. Silakan coba lagi.',
                    });
                },
                onFinish: () => setPending(false),
            });
            return;
        }

        router.post(
            route('bookmark.store', { slug }),
            {},
            {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => {
                    setBookmarked(true);
                    setNotification({
                        type: 'success',
                        message: `Bookmark untuk "${title}" berhasil disimpan.`,
                    });
                },
                onError: () => {
                    setNotification({
                        type: 'error',
                        message:
                            'Gagal menyimpan bookmark. Pastikan Anda sudah login dan coba lagi.',
                    });
                },
                onFinish: () => setPending(false),
            },
        );
    };

    return (
        <>
            <motion.div
                key={id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8 }}
                transition={{
                    type: 'spring',
                    stiffness: 300,
                }}
            >
                <Link
                    href={isAvailable ? `/book/detail/${slug}` : ''}
                    onClick={(e) => {
                        if (!isAvailable) e.preventDefault();
                    }}
                    className={cn(!isAvailable && 'pointer-events-none')}
                >
                    <Card
                        className={cn(
                            'group overflow-hidden border-2 p-0 transition-all hover:border-primary hover:shadow-2xl',
                            !isAvailable && 'cursor-not-allowed opacity-60',
                        )}
                    >
                        <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                            <ImageWithFallback
                                src={cover}
                                alt={title}
                                className="block h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute top-3 left-3 z-10">
                                <Badge
                                    className={cn(
                                        getStatusColor(status),
                                        'text-white shadow-lg',
                                    )}
                                >
                                    {status}
                                </Badge>
                            </div>
                            <button
                                type="button"
                                onClick={toggleBookmark}
                                disabled={pending}
                                className="absolute top-3 right-3 z-10 rounded-full bg-white/90 p-2 shadow-lg transition-all hover:bg-white disabled:opacity-60"
                            >
                                <Bookmark
                                    className={cn(
                                        'h-5 w-5',
                                        bookmarked
                                            ? 'fill-primary text-primary'
                                            : 'text-gray-600',
                                    )}
                                />
                            </button>
                        </div>
                        <div className="p-4">
                            <h3 className="mb-1 line-clamp-2 font-['Poppins'] font-semibold text-gray-900 transition-colors group-hover:text-primary">
                                {title}
                            </h3>
                            {authors.length > 0 && (
                                <CardDescription className="mb-2 flex items-center gap-2">
                                    {authors.map((author) => (
                                        <div
                                            key={author.id}
                                            className="flex items-center gap-2 p-2"
                                        >
                                            <ImageWithFallback
                                                src={author.avatar}
                                                alt={author.name}
                                                className="h-8 w-8 rounded-full object-cover object-center"
                                            />
                                            <span
                                                key={author.id}
                                                className="text-semibold mr-2 font-poppins"
                                            >
                                                {author.name}
                                            </span>
                                        </div>
                                    ))}
                                </CardDescription>
                            )}
                            <div className="flex items-center justify-between">
                                {categories.length > 0 && (
                                    <div className="flex flex-wrap items-center gap-2">
                                        {categories.map((category) => (
                                            <Badge
                                                key={category.id}
                                                variant="outline"
                                                className="flex items-center gap-1 text-xs"
                                            >
                                                {category.icon && (
                                                    <img
                                                        src={category.icon}
                                                        alt={category.name}
                                                        className="h-4 w-4"
                                                    />
                                                )}
                                                {category.name}
                                            </Badge>
                                        ))}
                                    </div>
                                )}

                                <div className="flex items-center gap-1">
                                    <span className="text-yellow-500">⭐</span>
                                    <span className="text-sm font-medium text-gray-700">
                                        {formattedRating(avg_rating) ?? 0}
                                    </span>
                                </div>
                            </div>
                            <div
                                onClick={(e) => {
                                    if (!isAvailable) e.preventDefault();
                                }}
                                className="mt-8 block"
                            >
                                <Button
                                    className={cn(
                                        'w-full',
                                        isAvailable
                                            ? 'bg-primary hover:bg-primary/90'
                                            : `${getStatusColor(status)} cursor-not-allowed`,
                                    )}
                                    disabled={!isAvailable}
                                >
                                    {isAvailable ? 'Lihat Detail Buku' : status}
                                </Button>
                            </div>
                        </div>
                    </Card>
                </Link>
            </motion.div>

            <Notification
                notification={notification}
                onClose={() => setNotification(null)}
            />
        </>
    );
};

export default BookCard;
