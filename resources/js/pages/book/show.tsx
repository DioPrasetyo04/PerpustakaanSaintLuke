import { Link, router, usePage } from '@inertiajs/react';
import {
    Star,
    Calendar,
    Globe,
    BookOpen,
    Building,
    Hash,
    CheckCircle,
    XCircle,
    ArrowLeft,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import type { DetailBookProps } from '@/types/DetailBookPage/DetailBookProps';
import { bookDetailPage } from '@/data/data';
import SectionRecomended from '@/components/Section/BookDetail/RecomendedBooks';
import { formattedRating, formattedYear } from '@/lib/utils';
import DOMPurify from 'dompurify';

function BookShow() {
    const { language } = useLanguage();
    const { props } = usePage<DetailBookProps>();
    const { book, recomendedBooks, reviews } = props;
    const t = bookDetailPage[language];

    const bookAvailable = book.status === 'Tersedia';

    const onHandleBorrowConfirmation = () => {
        if (bookAvailable) {
            router.get(route('loan.confirmation', book.slug));
        }
    };

    if (!book) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h2 className="mb-2 text-2xl font-bold text-gray-900">
                        {t.bookNotFound}
                    </h2>
                    <Link href="/catalog">
                        <Button>{t.backToCatalog}</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Back Button */}
                    <Link href="/catalog/books">
                        <Button variant="ghost" className="mb-6 gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            {t.backToCatalog}
                        </Button>
                    </Link>

                    {/* Book Details */}
                    <div className="mb-12 grid gap-8 lg:grid-cols-3">
                        {/* Book Cover */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="lg:col-span-1"
                        >
                            <div className="sticky top-24 overflow-hidden rounded-xl bg-white shadow-lg">
                                <div className="group relative aspect-[3/4] overflow-hidden bg-gray-100">
                                    <ImageWithFallback
                                        src={book.cover}
                                        alt={book.title}
                                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>

                                <div className="p-6">
                                    <div className="mb-4 flex items-center gap-2">
                                        {book.status === 'Tersedia' ? (
                                            <>
                                                <CheckCircle className="h-5 w-5 text-green-500" />
                                                <span className="font-medium text-green-700">
                                                    {book.status}
                                                </span>
                                                <span className="text-sm text-gray-500">
                                                    ({book.stock?.total}{' '}
                                                    {book.stock?.available})
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                <XCircle className="h-5 w-5 text-red-500" />
                                                <span className="font-medium text-red-700">
                                                    {book.status}
                                                </span>
                                            </>
                                        )}
                                    </div>

                                    <Button
                                        className="mb-3 w-full bg-primary hover:bg-primary/90"
                                        size="lg"
                                        disabled={!bookAvailable}
                                        onClick={onHandleBorrowConfirmation}
                                    >
                                        {book.status === 'Tersedia'
                                            ? t.borrowBook
                                            : t.notAvailable}
                                    </Button>

                                    <Button
                                        variant="outline"
                                        className="w-full"
                                        size="lg"
                                    >
                                        {t.addWishlist}
                                    </Button>
                                </div>
                            </div>
                        </motion.div>

                        {/* Book Information */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="lg:col-span-2"
                        >
                            <div className="rounded-xl bg-white p-8 shadow-lg">
                                <div className="mb-6">
                                    <h1 className="mb-3 font-['Poppins'] text-3xl font-bold text-gray-900 sm:text-4xl">
                                        {book.title}
                                    </h1>

                                    <div className="mb-4 flex flex-wrap items-center gap-4">
                                        <div className="flex items-center gap-1">
                                            <Star className="h-5 w-5 fill-amber-400 text-accent" />
                                            <span className="text-lg font-semibold text-gray-900">
                                                {formattedRating(
                                                    book.avg_rating,
                                                )}
                                            </span>
                                            <span className="text-gray-500">
                                                / 5.0
                                            </span>
                                        </div>
                                        {book.categories.map(
                                            (category, index) => (
                                                <Badge
                                                    key={index}
                                                    className="flex items-center justify-center gap-2 bg-primary/10 p-2 text-primary"
                                                >
                                                    <ImageWithFallback
                                                        className="h-8 w-8 object-cover object-center"
                                                        src={category.icon}
                                                        alt={category.name}
                                                    />{' '}
                                                    {category.name}
                                                </Badge>
                                            ),
                                        )}
                                    </div>

                                    <div className="flex flex-col gap-y-5 p-2">
                                        <p className="flex items-center gap-2 text-lg text-gray-700">
                                            Authors
                                        </p>
                                        <div className="flex flex-row pr-3">
                                            {book.authors.map(
                                                (author, index) => (
                                                    <p
                                                        key={index}
                                                        className="flex gap-2 p-2"
                                                    >
                                                        <ImageWithFallback
                                                            src={author.avatar}
                                                            alt={author.name}
                                                            className="h-8 w-8 rounded-full object-cover object-center"
                                                        />
                                                        <span className="font-poppins text-lg font-medium text-gray-700">
                                                            {author.name}
                                                        </span>
                                                    </p>
                                                ),
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Details Grid */}
                                <div className="mb-8 grid gap-4 sm:grid-cols-2">
                                    <Card className="p-4">
                                        <div className="flex gap-3">
                                            <Building className="h-5 w-5 text-gray-400" />
                                            <div>
                                                <div className="text-sm text-gray-500">
                                                    {t.publisher}
                                                </div>
                                                <div className="flex gap-2 p-3">
                                                    <ImageWithFallback
                                                        className="h-8 w-8 rounded-full object-cover object-center"
                                                        src={
                                                            book.publisher.logo
                                                        }
                                                        alt={
                                                            book.publisher.name
                                                        }
                                                    />
                                                    <span className="font-medium text-gray-900">
                                                        {book.publisher.name}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>

                                    <Card className="p-4">
                                        <div className="flex gap-3">
                                            <Calendar className="h-5 w-5 text-gray-400" />
                                            <div>
                                                <div className="text-sm text-gray-500">
                                                    {t.pubYear}
                                                </div>
                                                <div className="font-medium text-gray-900">
                                                    {book?.publication_year
                                                        ? formattedYear(
                                                              book.publication_year,
                                                              language,
                                                          )
                                                        : '-'}
                                                </div>
                                            </div>
                                        </div>
                                    </Card>

                                    <Card className="p-4">
                                        <div className="flex gap-3">
                                            <Globe className="h-5 w-5 text-gray-400" />
                                            <div>
                                                <div className="text-sm text-gray-500">
                                                    {t.bookLanguage}
                                                </div>
                                                <div className="flex items-center gap-2 p-2">
                                                    <ImageWithFallback
                                                        className="h-8 w-8 object-cover object-center"
                                                        src={
                                                            book.language.photo
                                                        }
                                                        alt={
                                                            book.language
                                                                .language
                                                        }
                                                    />
                                                    <div className="font-medium text-gray-900">
                                                        {book.language.language}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>

                                    <Card className="p-4">
                                        <div className="flex gap-3">
                                            <BookOpen className="h-5 w-5 text-gray-400" />
                                            <div>
                                                <div className="text-sm text-gray-500">
                                                    {t.bookPages}
                                                </div>
                                                <div className="font-medium text-gray-900">
                                                    {book.number_of_pages}
                                                </div>
                                            </div>
                                        </div>
                                    </Card>

                                    <Card className="p-4 sm:col-span-2">
                                        <div className="flex gap-3">
                                            <Hash className="h-5 w-5 text-gray-400" />
                                            <div>
                                                <div className="text-sm text-gray-500">
                                                    ISBN
                                                </div>
                                                <div className="font-medium text-gray-900">
                                                    {book.isbn}
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </div>

                                {/* Synopsis */}
                                <div>
                                    <h2 className="mb-3 text-xl font-semibold text-gray-900">
                                        {t.synopsis}
                                    </h2>
                                    <p
                                        className="leading-relaxed text-gray-700"
                                        dangerouslySetInnerHTML={{
                                            __html: DOMPurify.sanitize(
                                                book.synopsis ?? '',
                                            ),
                                        }}
                                    ></p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Recommended Books */}
                    <div className="mb-12">
                        <SectionRecomended
                            headerSection={t.recommended}
                            recomendedBooks={recomendedBooks}
                        />
                    </div>

                    {/* Reviews Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mb-12"
                    >
                        {/* Reviews List */}
                        <div className="space-y-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="mb-12"
                            >
                                <Card className="border-4 border-primary/30 bg-gradient-to-br from-indigo-400 via-blue-400 to-purple-500 p-6 shadow-2xl sm:p-10">
                                    {/* Header Section */}
                                    <div className="mb-8 rounded-2xl bg-gradient-to-r from-indigo-400 to-red-500 p-6 shadow-xl">
                                        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                                            <div className="text-center sm:text-left">
                                                <h2 className="mb-2 font-['Poppins'] text-3xl font-black text-white drop-shadow-lg sm:text-4xl">
                                                    📝 User Reviews (
                                                    {reviews.data.length})
                                                </h2>
                                                <p className="text-lg text-white/90">
                                                    {t.headerReviews}
                                                </p>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <Badge className="bg-accent px-6 py-3 text-xl text-blue-500 shadow-lg">
                                                    ⭐ {book.avg_rating} Average
                                                </Badge>
                                                <Button className="bg-white font-bold text-primary shadow-lg hover:bg-gray-100">
                                                    <Star className="mr-2 h-4 w-4 fill-accent text-accent" />
                                                    Sort by Rating
                                                </Button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Reviews List */}
                                    {reviews.data.length > 0 && (
                                        <div className="space-y-8">
                                            {reviews.data.map(
                                                (review, index) => {
                                                    const rating = Number(
                                                        review.rating,
                                                    );
                                                    const fullStars =
                                                        Math.floor(rating);
                                                    const hasHalf =
                                                        rating % 1 >= 0.5;
                                                    return (
                                                        <motion.div
                                                            key={review.id}
                                                            initial={{
                                                                opacity: 0,
                                                                x: -20,
                                                            }}
                                                            animate={{
                                                                opacity: 1,
                                                                x: 0,
                                                            }}
                                                            transition={{
                                                                delay:
                                                                    index *
                                                                    0.15,
                                                            }}
                                                            className="transform rounded-2xl border-2 border-primary/10 bg-white p-6 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:border-primary/30 hover:shadow-2xl sm:p-8"
                                                        >
                                                            <div className="flex gap-6">
                                                                {/* Reviewer Avatar with Badge */}
                                                                <div className="relative flex-shrink-0">
                                                                    <div className="absolute -top-2 -right-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-accent text-sm font-bold text-white shadow-lg">
                                                                        #
                                                                        {index +
                                                                            1}
                                                                    </div>
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
                                                                        className="h-20 w-20 rounded-2xl border-4 border-white object-cover shadow-xl ring-4 ring-primary/20 sm:h-24 sm:w-24"
                                                                    />
                                                                </div>

                                                                {/* Review Content */}
                                                                <div className="min-w-0 flex-1">
                                                                    {/* Reviewer Info */}
                                                                    <div className="mb-4 rounded-xl bg-gradient-to-r from-primary/5 to-secondary/5 p-4">
                                                                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                                                            <div className="flex-1">
                                                                                <h3 className="mb-1 flex items-center gap-2 font-['Poppins'] text-xl font-black text-gray-900 sm:text-2xl">
                                                                                    {
                                                                                        review
                                                                                            .user
                                                                                            ?.name
                                                                                    }
                                                                                    <span className="text-green-500">
                                                                                        ✓
                                                                                    </span>
                                                                                </h3>
                                                                                <p className="text-sm font-medium text-gray-600">
                                                                                    📧{' '}
                                                                                    {
                                                                                        review
                                                                                            .user
                                                                                            ?.email
                                                                                    }
                                                                                </p>
                                                                            </div>
                                                                            <div className="text-left sm:text-right">
                                                                                <div className="mb-2 flex flex-wrap items-center gap-1">
                                                                                    {[
                                                                                        ...Array(
                                                                                            5,
                                                                                        ),
                                                                                    ].map(
                                                                                        (
                                                                                            _,
                                                                                            i,
                                                                                        ) => {
                                                                                            if (
                                                                                                i <
                                                                                                fullStars
                                                                                            ) {
                                                                                                return (
                                                                                                    <Star
                                                                                                        key={
                                                                                                            i
                                                                                                        }
                                                                                                        className="h-6 w-6 fill-amber-400 text-amber-400"
                                                                                                    />
                                                                                                );
                                                                                            }

                                                                                            if (
                                                                                                i ===
                                                                                                    fullStars &&
                                                                                                hasHalf
                                                                                            ) {
                                                                                                return (
                                                                                                    <div
                                                                                                        key={
                                                                                                            i
                                                                                                        }
                                                                                                        className="relative h-6 w-6"
                                                                                                    >
                                                                                                        <Star className="absolute h-6 w-6 text-gray-300" />
                                                                                                        <Star
                                                                                                            className="absolute h-6 w-6 fill-amber-400 text-amber-400"
                                                                                                            style={{
                                                                                                                clipPath:
                                                                                                                    'inset(0 50% 0 0)',
                                                                                                            }}
                                                                                                        />
                                                                                                    </div>
                                                                                                );
                                                                                            }

                                                                                            return (
                                                                                                <Star
                                                                                                    key={
                                                                                                        i
                                                                                                    }
                                                                                                    className="h-6 w-6 text-gray-300"
                                                                                                />
                                                                                            );
                                                                                        },
                                                                                    )}
                                                                                    <span className="ml-2 text-lg font-bold text-primary">
                                                                                        {formattedRating(
                                                                                            review.rating,
                                                                                        )}
                                                                                    </span>
                                                                                </div>
                                                                                <p className="inline-block rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-500">
                                                                                    🕐{' '}
                                                                                    {
                                                                                        review.created_at
                                                                                    }
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    {/* Review Comment */}
                                                                    <div className="mb-4 rounded-xl border-l-4 border-primary bg-gradient-to-br from-gray-50 to-blue-50 p-5 shadow-md">
                                                                        <p
                                                                            className="text-base leading-relaxed font-medium text-gray-800 sm:text-lg"
                                                                            dangerouslySetInnerHTML={{
                                                                                __html: DOMPurify.sanitize(
                                                                                    review.comment ??
                                                                                        '',
                                                                                ),
                                                                            }}
                                                                        ></p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    );
                                                },
                                            )}
                                        </div>
                                    )}

                                    {/* Load More Section */}
                                    {/* <div className="mt-10 border-t-4 border-dashed border-primary/30 pt-8 text-center">
                                        <p className="mb-4 text-lg font-semibold text-gray-600">
                                            Want to see more reviews?
                                        </p>
                                        <Button className="transform bg-gradient-to-r from-primary to-secondary px-10 py-6 text-lg font-bold text-white shadow-xl transition-all hover:scale-105 hover:from-primary/90 hover:to-secondary/90 hover:shadow-2xl">
                                            📚 Load More Reviews
                                        </Button>
                                    </div> */}
                                </Card>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    );
}
export default BookShow;
