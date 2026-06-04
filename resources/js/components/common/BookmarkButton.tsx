 import { useState } from 'react';
import { motion } from 'framer-motion';
import { router } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { Bookmark } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/hooks/useLanguage';
import Notification from '@/components/component/Notification/Notification';

type BookmarkButtonProps = {
    slug: string;
    title: string;
    isBookmarked?: boolean;
    className?: string;
};

const BookmarkButton = ({
    slug,
    title,
    isBookmarked = false,
    className,
}: BookmarkButtonProps) => {
    const { language } = useLanguage();
    const [bookmarked, setBookmarked] = useState<boolean>(isBookmarked);
    const [pending, setPending] = useState<boolean>(false);
    const [notification, setNotification] = useState<{
        type: 'success' | 'error';
        message: string;
    } | null>(null);

    const tooltip = bookmarked
        ? language === 'id'
            ? 'Hapus bookmark'
            : 'Remove bookmark'
        : language === 'id'
          ? 'Simpan ke bookmark'
          : 'Save to bookmark';

    const translateError = (key: string): string => {
        const messages: Record<string, { id: string; en: string }> = {
            'bookmark.already_exists': {
                id: 'Buku sudah disimpan.',
                en: 'Book is already bookmarked.',
            },
            'bookmark.not_found': {
                id: 'Bookmark tidak ditemukan.',
                en: 'Bookmark not found.',
            },
        };
        const fallback = {
            id: 'Terjadi kesalahan. Silakan coba lagi.',
            en: 'Something went wrong. Please try again.',
        };
        const entry = messages[key] ?? fallback;
        return language === 'id' ? entry.id : entry.en;
    };

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
                onError: (errors) => {
                    const key = errors?.business;
                    setNotification({
                        type: 'error',
                        message: key
                            ? translateError(key)
                            : 'Gagal menghapus bookmark. Silakan coba lagi.',
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
                onError: (errors) => {
                    const key = errors?.business;
                    setNotification({
                        type: 'error',
                        message: key
                            ? translateError(key)
                            : 'Gagal menyimpan bookmark. Pastikan Anda sudah login dan coba lagi.',
                    });
                },
                onFinish: () => setPending(false),
            },
        );
    };

    return (
        <>
            <div className={cn('group/bm relative', className)}>
                <motion.button
                    type="button"
                    onClick={toggleBookmark}
                    disabled={pending}
                    aria-label={tooltip}
                    aria-pressed={bookmarked}
                    whileTap={{ scale: 0.85 }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    className={cn(
                        'flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-md transition-colors duration-300 disabled:opacity-60',
                        bookmarked
                            ? 'border-brand/40 bg-brand/15 shadow-[0_0_16px_-2px] shadow-brand/60'
                            : 'border-black/5 bg-white/90 shadow-lg dark:border-white/10 dark:bg-white/10',
                    )}
                >
                    <Bookmark
                        className={cn(
                            'h-[1.15rem] w-[1.15rem] transition-all duration-300',
                            bookmarked
                                ? 'fill-brand text-brand'
                                : 'text-gray-600 dark:text-gray-200',
                        )}
                    />
                </motion.button>

                {/* Tooltip */}
                <span
                    role="tooltip"
                    className="pointer-events-none absolute top-1/2 right-full mr-2 -translate-y-1/2 translate-x-1 rounded-lg bg-gray-900/90 px-2.5 py-1 text-xs font-medium whitespace-nowrap text-white opacity-0 shadow-lg backdrop-blur-sm transition-all duration-200 group-hover/bm:translate-x-0 group-hover/bm:opacity-100 dark:bg-white/90 dark:text-gray-900"
                >
                    {tooltip}
                </span>
            </div>

            <Notification
                notification={notification}
                onClose={() => setNotification(null)}
            />
        </>
    );
};

export default BookmarkButton;
