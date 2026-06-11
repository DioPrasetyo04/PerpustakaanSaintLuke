import { Link, router, usePage } from '@inertiajs/react';
import {
    Star,
    BookOpen,
    ChevronRight,
    Bookmark,
    Quote,
    BookPlus,
    AtSign,
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import type { DetailBookProps } from '@/types/DetailBookPage/DetailBookProps';
import { bookDetailPage } from '@/data/data';
import SectionRecomended from '@/components/Section/BookDetail/RecomendedBooks';
import Carousel from '@/components/common/Carousel';
import { SocialMediaLinks } from '@/components/common/SocialMediaLinks';
import BookTypeBadge, {
    uniqueFormats,
} from '@/components/common/BookTypeBadge';
import type { ReviewsProps } from '@/types/DataTypes/ReviewsProps';
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

/* Kartu ulasan untuk slider (avatar, nama, rating, komentar, media sosial) */
function ReviewCard({ review }: { review: ReviewsProps }) {
    return (
        <div className="hairline flex h-full flex-col rounded-xl2 border bg-card p-5 transition-all duration-300 hover:border-cobalt/30 hover:shadow-lift dark:bg-night-2">
            <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                    <ImageWithFallback
                        src={review.user?.avatar}
                        alt={review.user?.name}
                        className="h-11 w-11 shrink-0 rounded-full object-cover ring-2 ring-cobalt/15"
                    />
                    <div className="min-w-0">
                        <div className="truncate text-sm font-semibold text-foreground">
                            {review.user?.name}
                        </div>
                        <div className="text-[11px] text-muted-foreground">
                            {review.created_at}
                        </div>
                    </div>
                </div>
                <Stars value={Number(review.rating)} size={12} />
            </div>

            <p
                className="mt-3 line-clamp-5 flex-1 text-sm leading-relaxed text-foreground/80"
                dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(review.comment ?? ''),
                }}
            />

            <SocialMediaLinks
                socials={review.user?.socialmedia}
                size="sm"
                className="mt-4 border-t border-border/60 pt-4"
            />
        </div>
    );
}

function BookShow() {
    const { language } = useLanguage();
    const { props } = usePage<DetailBookProps>();
    const { book, recomendedBooks, reviews } = props;
    const fineSettingsConfigured =
        (props as unknown as { fineSettingsConfigured?: boolean })
            .fineSettingsConfigured ?? true;
    const t = bookDetailPage[language];

    // Peran user yang sedang login (dibagikan via Inertia di HandleInertiaRequests).
    // Staf (admin/super_admin) tidak boleh meminjam/membaca buku — fitur peminjaman
    // hanya untuk akun anggota.
    const authRoles =
        (props as unknown as { auth?: { roles?: string[] } }).auth?.roles ?? [];
    const STAFF_ROLES = ['admin', 'super_admin'];
    const isStaff = authRoles.some((role) => STAFF_ROLES.includes(role));

    const bookAvailable = book?.status === 'Tersedia';
    const [wishlistPending, setWishlistPending] = useState(false);
    const [wishlistSaved, setWishlistSaved] = useState(book?.is_bookmarked ?? false);
    const [notification, setNotification] = useState<{
        type: 'success' | 'error';
        message: string;
    } | null>(null);

    // "Baca Buku": arahkan ke halaman konfirmasi akses buku digital.
    // Konfirmasi di sana yang mencatat peminjaman digital lalu membuka aset.
    const onHandleReadConfirmation = () => {
        if (!book) return;

        // Validasi: akun staf (admin/super admin) tidak boleh membaca/meminjam buku.
        if (isStaff) {
            setNotification({
                type: 'error',
                message:
                    language === 'id'
                        ? 'Akun staf (admin/super admin) tidak dapat membaca atau meminjam buku. Silakan gunakan akun anggota.'
                        : 'Staff accounts (admin/super admin) cannot read or borrow books. Please use a member account.',
            });
            return;
        }

        // Pengaturan denda belum dikonfigurasi admin → JANGAN redirect ke
        // halaman konfirmasi. Munculkan popup multi-bahasa "Pengaturan Denda
        // Belum Diatur" di tempat (tanpa navigasi). Lihat AccessDeniedModal.
        if (!fineSettingsConfigured) {
            window.dispatchEvent(
                new CustomEvent('access-denied', { detail: 'fine_unset' }),
            );
            return;
        }

        router.get(route('loan.confirmation', book.slug));
    };

    const onHandleAddWishlist = () => {
        if (!book || wishlistPending) return;
        setWishlistPending(true);

        // Jika sudah tersimpan, klik berikutnya menghapus bookmark (toggle),
        // sama seperti tombol ikon bookmark pada kartu buku.
        if (wishlistSaved) {
            router.delete(route('bookmark.destroy', { slug: book.slug }), {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => {
                    setWishlistSaved(false);
                    setNotification({
                        type: 'success',
                        message: `Bookmark untuk "${book.title}" berhasil dihapus.`,
                    });
                },
                onError: () => {
                    setNotification({
                        type: 'error',
                        message:
                            'Gagal menghapus bookmark. Silakan coba lagi.',
                    });
                },
                onFinish: () => setWishlistPending(false),
            });
            return;
        }

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

    // Aset perpustakaan ini digital: hanya tombol "Baca Buku" yang tersedia.
    // Buku tanpa format Digital (mis. fisik saja) tidak menampilkan tombol baca.
    const formats = uniqueFormats(book.types);
    const showRead = formats.includes('digital');

    const firstSentence = (book.synopsis ?? '')
        .replace(/<[^>]*>/g, '')
        .split('.')[0];

    const biblio: {
        k: string;
        v: string | number;
        mono?: boolean;
        img?: string | null;
    }[] = [
        { k: 'ISBN', v: book.isbn ?? '-', mono: true },
        { k: 'Halaman', v: book.number_of_pages ?? '-' },
        {
            k: 'Tahun Terbit',
            v: book?.publication_year
                ? formattedYear(book.publication_year, language)
                : '-',
            mono: true,
        },
        {
            k: 'Bahasa',
            v: book.language?.language ?? '-',
            img: book.language?.photo,
        },
        {
            k: 'Penerbit',
            v: book.publisher?.name ?? '-',
            img: book.publisher?.logo,
        },
        {
            k: 'Kategori',
            v: book.categories?.[0]?.name ?? '-',
            img: book.categories?.[0]?.icon,
        },
    ];

    // Klasifikasi & Lokasi tampil sebagai baris terpisah 2 kolom proporsional
    const biblioPair: {
        k: string;
        v: string | number;
        mono?: boolean;
        img?: string | null;
    }[] = [
        {
            k: language === 'id' ? 'No. Klasifikasi' : 'Classification No.',
            v: book.classification_number ?? '-',
            mono: true,
        },
        {
            k: language === 'id' ? 'Lokasi Buku' : 'Book Location',
            v: book.location_book ?? '-',
        },
        {
            k: language === 'id' ? 'Jilid Buku' : 'Volume',
            v: book.volume
                ? language === 'id'
                    ? `Jilid ke-${book.volume}`
                    : `Volume ${book.volume}`
                : '-',
            mono: true,
        },
    ];

    const bookFormats = uniqueFormats(book.types);

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
                    <div className="relative mx-auto max-w-[100rem] px-6 pt-8 pb-14 lg:px-10">
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

                        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
                            {/* Cover + actions */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="col-span-full lg:col-span-5 xl:col-span-4"
                            >
                                <div className="lg:sticky lg:top-28">
                                    <div className="group book3d-stage flex justify-center lg:justify-start">
                                        <div className="book3d-tilt aspect-[3/4] w-full max-w-[320px]">
                                            <div className="book3d-face spine-shadow h-full w-full overflow-hidden rounded-l-sm rounded-r-md bg-muted">
                                                <ImageWithFallback
                                                    src={book.cover}
                                                    alt={book.title}
                                                    className="h-full w-full object-cover"
                                                />
                                                <div className="book3d-sheen" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-8 lg:max-w-[340px]">
                                        {/* Buku Digital → Baca: arahkan ke konfirmasi akses. */}
                                        {showRead && (
                                            <Button
                                                className="w-full gap-2 bg-cobalt text-white hover:bg-cobalt-dk"
                                                size="lg"
                                                onClick={onHandleReadConfirmation}
                                            >
                                                {language === 'id'
                                                    ? 'Baca Buku'
                                                    : 'Read Book'}
                                                <BookOpen className="h-4 w-4" />
                                            </Button>
                                        )}

                                        <button
                                            onClick={onHandleAddWishlist}
                                            disabled={wishlistPending}
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
                                className="col-span-full lg:col-span-7 xl:col-span-8"
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
                                    {/* Format buku: Digital / Fisik / keduanya */}
                                    <BookTypeBadge types={book.types} size="md" />
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
                                        {biblio.map(({ k, v, mono, img }) => (
                                            <div
                                                key={k}
                                                className="bg-card p-4 transition-colors hover:bg-cobalt-50 dark:bg-night-2 dark:hover:bg-night-3"
                                            >
                                                <dt className="tracking-editorial font-mono text-[10px] uppercase text-muted-foreground">
                                                    {k}
                                                </dt>
                                                <dd
                                                    className={`mt-1.5 flex items-center gap-2 text-foreground ${mono ? 'font-mono text-sm' : 'text-sm'}`}
                                                >
                                                    {img && (
                                                        <ImageWithFallback
                                                            src={img}
                                                            alt={String(v)}
                                                            className="h-6 w-6 shrink-0 rounded bg-white/5 object-contain ring-1 ring-border"
                                                        />
                                                    )}
                                                    <span className="min-w-0 truncate">
                                                        {v}
                                                    </span>
                                                </dd>
                                            </div>
                                        ))}

                                    </dl>

                                    {/* No. Klasifikasi, Lokasi & Jilid Buku — baris sendiri, kolom proporsional di desktop */}
                                    <dl className="hairline mt-4 grid grid-cols-1 gap-px overflow-hidden rounded-xl2 border bg-line sm:grid-cols-2 lg:grid-cols-3 dark:bg-night-line">
                                        {biblioPair.map(({ k, v, mono, img }) => (
                                            <div
                                                key={k}
                                                className="bg-card p-4 transition-colors hover:bg-cobalt-50 dark:bg-night-2 dark:hover:bg-night-3"
                                            >
                                                <dt className="tracking-editorial font-mono text-[10px] uppercase text-muted-foreground">
                                                    {k}
                                                </dt>
                                                <dd
                                                    className={`mt-1.5 flex items-center gap-2 text-foreground ${mono ? 'font-mono text-sm' : 'text-sm'}`}
                                                >
                                                    {img && (
                                                        <ImageWithFallback
                                                            src={img}
                                                            alt={String(v)}
                                                            className="h-6 w-6 shrink-0 rounded bg-white/5 object-contain ring-1 ring-border"
                                                        />
                                                    )}
                                                    <span className="min-w-0 truncate">
                                                        {v}
                                                    </span>
                                                </dd>
                                            </div>
                                        ))}
                                    </dl>

                                    {/* Format tersedia + penambah buku, berdampingan & responsif */}
                                    <div
                                        className={`mt-4 grid items-stretch gap-4 ${book.addedBy ? 'md:grid-cols-2' : ''}`}
                                    >
                                        {bookFormats.length > 0 && (
                                            <div className="hairline group/fmt relative flex flex-col overflow-hidden rounded-xl2 border bg-card p-5 transition-all duration-300 hover:border-cobalt/30 hover:shadow-lift dark:bg-night-2">
                                                <div className="tracking-editorial font-mono text-[10px] uppercase text-muted-foreground">
                                                    {language === 'id'
                                                        ? 'Format Tersedia'
                                                        : 'Available Format'}
                                                </div>
                                                <div className="mt-auto flex flex-wrap items-center gap-2 pt-4">
                                                    <BookTypeBadge
                                                        types={book.types}
                                                        size="md"
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        {/* Ditambahkan oleh — avatar, nama, media sosial */}
                                        {book.addedBy && (
                                            <div className="hairline group/add relative flex flex-col overflow-hidden rounded-xl2 border bg-card p-5 transition-all duration-300 hover:border-cobalt/30 hover:shadow-lift dark:bg-night-2">
                                                {/* aksen glow saat hover */}
                                                <div className="pointer-events-none absolute -top-10 -right-10 h-28 w-28 rounded-full bg-cobalt/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover/add:opacity-100" />

                                                <div className="tracking-editorial flex items-center gap-1.5 font-mono text-[10px] uppercase text-muted-foreground">
                                                    <BookPlus className="h-3.5 w-3.5 text-cobalt dark:text-cobalt-lt" />
                                                    {language === 'id'
                                                        ? 'Ditambahkan oleh'
                                                        : 'Added by'}
                                                </div>

                                                <div className="mt-3.5 flex items-center gap-3.5">
                                                    <div className="relative shrink-0">
                                                        <ImageWithFallback
                                                            src={
                                                                book.addedBy
                                                                    .avatar
                                                            }
                                                            alt={
                                                                book.addedBy
                                                                    .name
                                                            }
                                                            className="h-12 w-12 rounded-full object-cover ring-2 ring-cobalt/25 transition-transform duration-300 group-hover/add:scale-105"
                                                        />
                                                        {/* badge penanda staf/penambah */}
                                                        <span className="absolute -right-1 -bottom-1 grid h-5 w-5 place-items-center rounded-full bg-cobalt text-white ring-2 ring-card dark:ring-night-2">
                                                            <BookPlus className="h-2.5 w-2.5" />
                                                        </span>
                                                    </div>
                                                    <div className="min-w-0">
                                                        <div className="truncate font-display text-base font-semibold text-foreground">
                                                            {book.addedBy.name}
                                                        </div>
                                                        <div className="mt-0.5 inline-flex max-w-full items-center gap-1 truncate text-[11px] text-muted-foreground">
                                                            {book.addedBy
                                                                .username ? (
                                                                <>
                                                                    <AtSign className="h-3 w-3 shrink-0" />
                                                                    <span className="truncate">
                                                                        {
                                                                            book
                                                                                .addedBy
                                                                                .username
                                                                        }
                                                                    </span>
                                                                </>
                                                            ) : language ===
                                                              'id' ? (
                                                                'Pustakawan'
                                                            ) : (
                                                                'Librarian'
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* media sosial bila ada */}
                                                <SocialMediaLinks
                                                    socials={
                                                        book.addedBy.socialmedia
                                                    }
                                                    size="sm"
                                                    className="mt-auto border-t border-border/60 pt-4"
                                                />
                                            </div>
                                        )}
                                    </div>
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
                                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-12">
                                        {/* score */}
                                        <div className="col-span-full sm:col-span-4">
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
                                        {/* review list — swiper agar bisa digeser ke samping */}
                                        <div className="col-span-full min-w-0 sm:col-span-8">
                                            {reviews.data.length > 0 ? (
                                                <Carousel<ReviewsProps>
                                                    items={reviews.data}
                                                    getKey={(review) =>
                                                        review.id
                                                    }
                                                    ariaLabel={
                                                        language === 'id'
                                                            ? 'Ulasan pembaca'
                                                            : 'Reader reviews'
                                                    }
                                                    spaceBetween={16}
                                                    breakpoints={{
                                                        0: {
                                                            slidesPerView: 1,
                                                        },
                                                        1024: {
                                                            slidesPerView: 1.5,
                                                        },
                                                        1280: {
                                                            slidesPerView: 2,
                                                        },
                                                    }}
                                                    renderItem={(review) => (
                                                        <ReviewCard
                                                            review={review}
                                                        />
                                                    )}
                                                />
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
                <div className="mx-auto mt-16 max-w-[100rem] px-6 lg:px-10">
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
