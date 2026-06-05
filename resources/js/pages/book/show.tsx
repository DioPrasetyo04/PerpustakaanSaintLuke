import { Link, router, usePage } from '@inertiajs/react';
import {
    Star,
    BookOpen,
    ChevronRight,
    ArrowRight,
    Bookmark,
    Quote,
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import type { DetailBookProps } from '@/types/DetailBookPage/DetailBookProps';
import { bookDetailPage } from '@/data/data';
import SectionRecomended from '@/components/Section/BookDetail/RecomendedBooks';
import { formattedRating, formattedYear } from '@/lib/utils';
import DOMPurify from 'dompurify';
import Notification from '@/components/component/Notification/Notification';

/* Numbered editorial section label (prototype SectionLabel) */
function SectionLabel({
    num,
    label,
    className = '',
}: {
    num: string;
    label: string;
    className?: string;
}) {
    return (
        <div className={`flex items-center gap-3 ${className}`}>
            <span className="section-num text-sm tabnum">{num}</span>
            <span className="h-px flex-1 bg-line dark:bg-night-line" />
            <span className="tracking-editorial font-mono text-[11px] uppercase text-muted-foreground">
                {label}
            </span>
        </div>
    );
}

/* Star rating row */
function Stars({ value, size = 14 }: { value: number; size?: number }) {
    const full = Math.floor(value);
    const half = value % 1 >= 0.5;
    return (
        <span className="inline-flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => {
                if (i < full)
                    return (
                        <Star
                            key={i}
                            style={{ width: size, height: size }}
                            className="fill-brass-lt text-brass-lt"
                        />
                    );
                if (i === full && half)
                    return (
                        <span
                            key={i}
                            className="relative"
                            style={{ width: size, height: size }}
                        >
                            <Star
                                style={{ width: size, height: size }}
                                className="absolute text-muted-foreground/40"
                            />
                            <Star
                                style={{
                                    width: size,
                                    height: size,
                                    clipPath: 'inset(0 50% 0 0)',
                                }}
                                className="absolute fill-brass-lt text-brass-lt"
                            />
                        </span>
                    );
                return (
                    <Star
                        key={i}
                        style={{ width: size, height: size }}
                        className="text-muted-foreground/40"
                    />
                );
            })}
        </span>
    );
}

function BookShow() {
    const { language } = useLanguage();
    const { props } = usePage<DetailBookProps>();
    const { book, recomendedBooks, reviews } = props;
    const t = bookDetailPage[language];

    const bookAvailable = book?.status === 'Tersedia';
    const [wishlistPending, setWishlistPending] = useState(false);
    const [wishlistSaved, setWishlistSaved] = useState(false);
    const [notification, setNotification] = useState<{
        type: 'success' | 'error';
        message: string;
    } | null>(null);

    const onHandleBorrowConfirmation = () => {
        if (bookAvailable) {
            router.get(route('loan.confirmation', book.slug));
        }
    };

    const onHandleAddWishlist = () => {
        if (!book || wishlistPending) return;
        setWishlistPending(true);

        router.post(
            route('bookmark.store', { slug: book.slug }),
            {},
            {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => {
                    setWishlistSaved(true);
                    setNotification({
                        type: 'success',
                        message: `Bookmark untuk "${book.title}" berhasil disimpan.`,
                    });
                },
                onError: () => {
                    setNotification({
                        type: 'error',
                        message:
                            'Gagal menyimpan bookmark. Pastikan Anda sudah login dan coba lagi.',
                    });
                },
                onFinish: () => setWishlistPending(false),
            },
        );
    };

    if (!book) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background">
                <div className="text-center">
                    <div className="font-display text-7xl text-cobalt/40 italic dark:text-cobalt-lt/40">
                        404
                    </div>
                    <h2 className="mt-4 mb-4 font-display text-2xl font-bold text-foreground">
                        {t.bookNotFound}
                    </h2>
                    <Link href="/catalog/books">
                        <Button>{t.backToCatalog}</Button>
                    </Link>
                </div>
            </div>
        );
    }

    const ratingValue = Number(book.avg_rating) || 0;
    const firstSentence = (book.synopsis ?? '')
        .replace(/<[^>]*>/g, '')
        .split('.')[0];

    const biblio: [string, string | number, ('mono' | undefined)?][] = [
        ['ISBN', book.isbn ?? '-', 'mono'],
        ['Halaman', book.number_of_pages ?? '-'],
        [
            'Tahun Terbit',
            book?.publication_year
                ? formattedYear(book.publication_year, language)
                : '-',
            'mono',
        ],
        ['Bahasa', book.language?.language ?? '-'],
        ['Penerbit', book.publisher?.name ?? '-'],
        ['Kategori', book.categories?.[0]?.name ?? '-'],
    ];

    return (
        <>
            <section className="bg-background pb-24">
                {/* Tinted hero band */}
                <div className="hairline relative overflow-hidden border-b">
                    <div className="hero-mesh pointer-events-none absolute inset-0 opacity-70" />
                    <div
                        className="line-grid pointer-events-none absolute inset-0 opacity-50"
                        style={{
                            maskImage:
                                'linear-gradient(to bottom, black, transparent)',
                        }}
                    />
                    <div className="relative mx-auto max-w-7xl px-6 pt-8 pb-14 lg:px-10">
                        {/* Breadcrumb */}
                        <nav className="tracking-editorial mb-10 flex items-center gap-2 font-mono text-[10px] uppercase text-muted-foreground">
                            <Link
                                href="/"
                                className="hover:text-cobalt dark:hover:text-cobalt-lt"
                            >
                                {language === 'id' ? 'Beranda' : 'Home'}
                            </Link>
                            <ChevronRight className="h-2.5 w-2.5" />
                            <Link
                                href="/catalog/books"
                                className="hover:text-cobalt dark:hover:text-cobalt-lt"
                            >
                                {language === 'id' ? 'Katalog' : 'Catalog'}
                            </Link>
                            <ChevronRight className="h-2.5 w-2.5" />
                            <span className="max-w-[200px] truncate text-foreground">
                                {book.title}
                            </span>
                        </nav>

                        <div className="grid grid-cols-12 gap-10 lg:gap-12">
                            {/* Cover + actions */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="col-span-12 lg:col-span-5 xl:col-span-4"
                            >
                                <div className="lg:sticky lg:top-28">
                                    <div className="group book-3d flex justify-center lg:justify-start">
                                        <div className="book-3d-inner w-full max-w-[320px] overflow-hidden rounded-r-xl rounded-l-sm bg-muted shadow-book-3d">
                                            <div className="aspect-[3/4] overflow-hidden">
                                                <ImageWithFallback
                                                    src={book.cover}
                                                    alt={book.title}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-8 lg:max-w-[340px]">
                                        <Button
                                            className="w-full gap-2 bg-cobalt text-white hover:bg-cobalt-dk"
                                            size="lg"
                                            disabled={!bookAvailable}
                                            onClick={onHandleBorrowConfirmation}
                                        >
                                            {bookAvailable
                                                ? t.borrowBook
                                                : t.notAvailable}
                                            <ArrowRight className="h-4 w-4" />
                                        </Button>

                                        <button
                                            onClick={onHandleAddWishlist}
                                            disabled={
                                                wishlistPending || wishlistSaved
                                            }
                                            className={`btn-press mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border py-2.5 text-sm font-medium transition-colors disabled:opacity-70 ${
                                                wishlistSaved
                                                    ? 'border-cobalt bg-cobalt-50 text-cobalt dark:bg-cobalt/15 dark:text-cobalt-lt'
                                                    : 'hairline hover:border-cobalt hover:text-cobalt dark:hover:text-cobalt-lt'
                                            }`}
                                        >
                                            <Bookmark
                                                className={`h-4 w-4 ${wishlistSaved ? 'fill-current' : ''}`}
                                            />
                                            {wishlistSaved
                                                ? language === 'id'
                                                    ? 'Tersimpan'
                                                    : 'Saved'
                                                : wishlistPending
                                                  ? 'Saving...'
                                                  : t.addWishlist}
                                        </button>

                                        {/* availability card */}
                                        <div className="bracket mt-6 overflow-hidden rounded-xl2 border bg-card text-cobalt dark:bg-night-2 dark:text-cobalt-lt">
                                            <div className="hairline flex items-center justify-between border-b p-5">
                                                <div>
                                                    <div className="tracking-editorial font-mono text-[10px] uppercase text-muted-foreground">
                                                        {language === 'id'
                                                            ? 'Ketersediaan'
                                                            : 'Availability'}
                                                    </div>
                                                    <div className="mt-1.5">
                                                        <span
                                                            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                                                                bookAvailable
                                                                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                                                                    : 'bg-muted text-muted-foreground'
                                                            }`}
                                                        >
                                                            <span
                                                                className={`h-1.5 w-1.5 rounded-full ${bookAvailable ? 'bg-emerald-500' : 'bg-muted-foreground'}`}
                                                            />
                                                            {book.status}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="font-display text-3xl tabnum text-foreground">
                                                        {book.stock?.available ??
                                                            0}
                                                        <span className="text-xl text-muted-foreground">
                                                            /
                                                            {book.stock?.total ??
                                                                0}
                                                        </span>
                                                    </div>
                                                    <div className="text-[10px] text-muted-foreground">
                                                        {language === 'id'
                                                            ? 'eksemplar'
                                                            : 'copies'}
                                                    </div>
                                                </div>
                                            </div>
                                            {/* quick facts */}
                                            <div className="hairline grid grid-cols-3 divide-x">
                                                {[
                                                    {
                                                        v: book.number_of_pages,
                                                        l:
                                                            language === 'id'
                                                                ? 'Halaman'
                                                                : 'Pages',
                                                    },
                                                    {
                                                        v: '14',
                                                        l:
                                                            language === 'id'
                                                                ? 'Hari pinjam'
                                                                : 'Loan days',
                                                    },
                                                    {
                                                        v: formattedRating(
                                                            book.avg_rating,
                                                        ),
                                                        l:
                                                            language === 'id'
                                                                ? 'Penilaian'
                                                                : 'Rating',
                                                    },
                                                ].map((f, i) => (
                                                    <div
                                                        key={i}
                                                        className="p-4 text-center"
                                                    >
                                                        <div className="font-display text-xl tabnum text-foreground">
                                                            {f.v}
                                                        </div>
                                                        <div className="tracking-editorial mt-1 font-mono text-[9px] uppercase text-muted-foreground">
                                                            {f.l}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Header content */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="col-span-12 lg:col-span-7 xl:col-span-8"
                            >
                                <div className="flex flex-wrap items-center gap-2">
                                    {book.categories?.map((category, index) => (
                                        <span
                                            key={index}
                                            className="inline-flex items-center gap-2 rounded-full bg-cobalt-50 px-3 py-1 text-xs font-semibold text-cobalt-dk dark:bg-cobalt/15 dark:text-cobalt-lt"
                                        >
                                            {category.icon && (
                                                <ImageWithFallback
                                                    className="h-4 w-4 object-contain"
                                                    src={category.icon}
                                                    alt={category.name}
                                                />
                                            )}
                                            {category.name}
                                        </span>
                                    ))}
                                </div>

                                <h1
                                    className="mt-5 font-display text-4xl leading-[1.04] text-foreground lg:text-5xl xl:text-[58px]"
                                    style={{ textWrap: 'balance' }}
                                >
                                    {book.title}
                                </h1>

                                <div className="mt-4 flex flex-wrap items-center gap-3 text-foreground/75">
                                    <span className="flex items-center gap-2">
                                        {book.authors?.map((author, index) => (
                                            <span
                                                key={index}
                                                className="flex items-center gap-2"
                                            >
                                                <ImageWithFallback
                                                    src={author.avatar}
                                                    alt={author.name}
                                                    className="h-7 w-7 rounded-full object-cover"
                                                />
                                                <span className="font-display text-xl italic">
                                                    {author.name}
                                                </span>
                                            </span>
                                        ))}
                                    </span>
                                    <span className="text-muted-foreground">
                                        ·
                                    </span>
                                    <span className="text-sm text-muted-foreground">
                                        {book.publisher?.name}
                                        {book.publication_year
                                            ? `, ${book.publication_year}`
                                            : ''}
                                    </span>
                                </div>

                                {/* meta strip */}
                                <div className="hairline mt-7 flex flex-wrap items-center gap-6 rounded-xl2 border bg-card/60 px-5 py-4 dark:bg-night-2/50">
                                    <div className="flex items-center gap-2">
                                        <Stars value={ratingValue} size={15} />
                                        <span className="text-sm font-semibold text-foreground">
                                            {formattedRating(book.avg_rating)}
                                        </span>
                                        <span className="text-xs text-muted-foreground">
                                            ({reviews.data.length}{' '}
                                            {language === 'id'
                                                ? 'ulasan'
                                                : 'reviews'}
                                            )
                                        </span>
                                    </div>
                                    <span className="h-6 w-px bg-line dark:bg-night-line" />
                                    <div className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                                        <BookOpen className="h-4 w-4 text-cobalt dark:text-cobalt-lt" />
                                        {book.number_of_pages}{' '}
                                        {language === 'id' ? 'halaman' : 'pages'}
                                    </div>
                                </div>

                                {/* synopsis */}
                                <div className="mt-10">
                                    <SectionLabel
                                        num="01"
                                        label={t.synopsis}
                                        className="mb-5"
                                    />
                                    <div
                                        className="drop-cap text-lg leading-[1.75] text-foreground/85"
                                        style={{ textWrap: 'pretty' }}
                                        dangerouslySetInnerHTML={{
                                            __html: DOMPurify.sanitize(
                                                book.synopsis ?? '',
                                            ),
                                        }}
                                    />
                                </div>

                                {/* Pull quote */}
                                {firstSentence && (
                                    <figure className="relative my-12 overflow-hidden rounded-xl2 bg-ink p-8 text-paper lg:p-10 dark:bg-night-3">
                                        <div className="line-grid absolute inset-0 opacity-20" />
                                        <Quote className="absolute top-5 left-6 h-12 w-12 text-cobalt-lt/30" />
                                        <blockquote
                                            className="relative max-w-2xl font-quote text-2xl leading-snug italic lg:text-3xl"
                                            style={{ textWrap: 'balance' }}
                                        >
                                            {firstSentence}.
                                        </blockquote>
                                        <figcaption className="tracking-editorial relative mt-5 font-mono text-[11px] uppercase text-cobalt-lt">
                                            {language === 'id'
                                                ? 'Kutipan pembuka'
                                                : 'Opening line'}{' '}
                                            · {book.title}
                                        </figcaption>
                                    </figure>
                                )}

                                {/* Bibliografi */}
                                <div className="mt-12">
                                    <SectionLabel
                                        num="02"
                                        label={
                                            language === 'id'
                                                ? 'Detail Bibliografi'
                                                : 'Bibliographic Details'
                                        }
                                        className="mb-5"
                                    />
                                    <dl className="hairline grid grid-cols-2 gap-px overflow-hidden rounded-xl2 border bg-line lg:grid-cols-3 dark:bg-night-line">
                                        {biblio.map(([k, v, kind]) => (
                                            <div
                                                key={k}
                                                className="bg-card p-4 transition-colors hover:bg-cobalt-50 dark:bg-night-2 dark:hover:bg-night-3"
                                            >
                                                <dt className="tracking-editorial font-mono text-[10px] uppercase text-muted-foreground">
                                                    {k}
                                                </dt>
                                                <dd
                                                    className={`mt-1 text-foreground ${kind === 'mono' ? 'font-mono text-sm' : 'text-sm'}`}
                                                >
                                                    {v}
                                                </dd>
                                            </div>
                                        ))}
                                    </dl>
                                </div>

                                {/* Reviews */}
                                <div className="mt-14">
                                    <SectionLabel
                                        num="03"
                                        label={
                                            language === 'id'
                                                ? 'Ulasan Pembaca'
                                                : 'Reader Reviews'
                                        }
                                        className="mb-6"
                                    />
                                    <div className="grid grid-cols-12 gap-8">
                                        {/* score */}
                                        <div className="col-span-12 sm:col-span-4">
                                            <div className="hairline rounded-xl2 border bg-card p-6 text-center dark:bg-night-2">
                                                <div className="font-display text-6xl tabnum text-foreground">
                                                    {formattedRating(
                                                        book.avg_rating,
                                                    )}
                                                </div>
                                                <div className="mt-2 flex justify-center">
                                                    <Stars
                                                        value={ratingValue}
                                                        size={14}
                                                    />
                                                </div>
                                                <div className="mt-2 text-xs text-muted-foreground">
                                                    {reviews.data.length}{' '}
                                                    {language === 'id'
                                                        ? 'ulasan'
                                                        : 'reviews'}
                                                </div>
                                            </div>
                                        </div>
                                        {/* review list */}
                                        <div className="col-span-12 space-y-4 sm:col-span-8">
                                            {reviews.data.length > 0 ? (
                                                reviews.data.map((review) => (
                                                    <div
                                                        key={review.id}
                                                        className="hairline rounded-xl2 border bg-card p-5 dark:bg-night-2"
                                                    >
                                                        <div className="flex items-center justify-between gap-3">
                                                            <div className="flex items-center gap-3">
                                                                <ImageWithFallback
                                                                    src={
                                                                        review
                                                                            .user
                                                                            ?.avatar
                                                                    }
                                                                    alt={
                                                                        review
                                                                            .user
                                                                            ?.name
                                                                    }
                                                                    className="h-10 w-10 shrink-0 rounded-full object-cover"
                                                                />
                                                                <div>
                                                                    <div className="text-sm font-semibold text-foreground">
                                                                        {
                                                                            review
                                                                                .user
                                                                                ?.name
                                                                        }
                                                                    </div>
                                                                    <div className="text-[11px] text-muted-foreground">
                                                                        {
                                                                            review.created_at
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <Stars
                                                                value={Number(
                                                                    review.rating,
                                                                )}
                                                                size={12}
                                                            />
                                                        </div>
                                                        <p
                                                            className="mt-3 text-sm leading-relaxed text-foreground/80"
                                                            dangerouslySetInnerHTML={{
                                                                __html: DOMPurify.sanitize(
                                                                    review.comment ??
                                                                        '',
                                                                ),
                                                            }}
                                                        />
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="hairline flex h-full items-center justify-center rounded-xl2 border border-dashed bg-card/50 p-8 text-center text-sm text-muted-foreground dark:bg-night-2/50">
                                                    {language === 'id'
                                                        ? 'Belum ada ulasan untuk buku ini.'
                                                        : 'No reviews for this book yet.'}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Recommended Books */}
                <div className="mx-auto mt-16 max-w-7xl px-6 lg:px-10">
                    <SectionRecomended
                        headerSection={t.recommended}
                        recomendedBooks={recomendedBooks}
                    />
                </div>
            </section>
            <Notification
                notification={notification}
                onClose={() => setNotification(null)}
            />
        </>
    );
}
export default BookShow;
