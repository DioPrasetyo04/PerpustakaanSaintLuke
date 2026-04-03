import { Link } from '@inertiajs/react';
import {
    Star,
    Calendar,
    Globe,
    BookOpen,
    User,
    Building,
    Hash,
    CheckCircle,
    XCircle,
    ArrowLeft,
    MessageSquare,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import { motion } from 'framer-motion';
import {
    CatalogBookCard,
    type CatalogBook,
} from '@/components/common/CatalogBookCard';
import { Footer } from '@/components/common/Footer';
import { useLanguage } from '@/hooks/useLanguage';

interface BookDetail {
    id: string;
    title: string;
    author: string;
    category: string;
    coverUrl: string;
    rating: number;
    available: boolean;
    year: number;
    publisher: string;
    language: string;
    pages: number;
    isbn: string;
    stock: number;
    synopsis: string;
}

const bookData: Record<string, BookDetail> = {
    '1': {
        id: '1',
        title: 'The Art of Programming',
        author: 'Jane Smith',
        category: 'Technology',
        coverUrl:
            'https://images.unsplash.com/photo-1763905180945-977cd687f7f9?w=800',
        rating: 4.8,
        available: true,
        year: 2024,
        publisher: 'Tech Press',
        language: 'English',
        pages: 450,
        isbn: '978-3-16-148410-0',
        stock: 3,
        synopsis:
            'A comprehensive guide to modern programming principles and practices. This book covers everything from basic algorithms to advanced software design patterns, making it perfect for both beginners and experienced developers.',
    },
    '2': {
        id: '2',
        title: 'Modern Science',
        author: 'Dr. Michael Chen',
        category: 'Science',
        coverUrl:
            'https://images.unsplash.com/photo-1725870475677-7dc91efe9f93?w=800',
        rating: 4.6,
        available: true,
        year: 2023,
        publisher: 'Science Publishers',
        language: 'English',
        pages: 380,
        isbn: '978-3-16-148410-1',
        stock: 5,
        synopsis:
            'An exploration of cutting-edge scientific discoveries and breakthroughs that are shaping our understanding of the world.',
    },
    '3': {
        id: '3',
        title: 'Ancient Civilizations',
        author: 'Prof. Sarah Johnson',
        category: 'History',
        coverUrl:
            'https://images.unsplash.com/photo-1764509422504-f9aee0a1dd76?w=800',
        rating: 4.7,
        available: false,
        year: 2022,
        publisher: 'Historical Books',
        language: 'English',
        pages: 520,
        isbn: '978-3-16-148410-2',
        stock: 0,
        synopsis:
            'Journey through the greatest civilizations in human history, from Mesopotamia to the Roman Empire.',
    },
    '4': {
        id: '4',
        title: 'Classic Literature',
        author: 'Emily Roberts',
        category: 'Literature',
        coverUrl:
            'https://images.unsplash.com/photo-1772380407481-81b8f13bd010?w=800',
        rating: 4.9,
        available: true,
        year: 2025,
        publisher: 'Literary House',
        language: 'English',
        pages: 300,
        isbn: '978-3-16-148410-3',
        stock: 7,
        synopsis:
            'A curated collection of timeless literary works that continue to inspire and captivate readers across generations.',
    },
};

const recommendedBooks: CatalogBook[] = [
    {
        id: '2',
        title: 'Modern Science',
        author: 'Dr. Michael Chen',
        category: 'Science',
        coverUrl:
            'https://images.unsplash.com/photo-1725870475677-7dc91efe9f93?w=400',
        rating: 4.6,
        available: true,
    },
    {
        id: '3',
        title: 'Ancient Civilizations',
        author: 'Prof. Sarah Johnson',
        category: 'History',
        coverUrl:
            'https://images.unsplash.com/photo-1764509422504-f9aee0a1dd76?w=400',
        rating: 4.7,
        available: false,
    },
    {
        id: '4',
        title: 'Classic Literature',
        author: 'Emily Roberts',
        category: 'Literature',
        coverUrl:
            'https://images.unsplash.com/photo-1772380407481-81b8f13bd010?w=400',
        rating: 4.9,
        available: true,
    },
    {
        id: '5',
        title: 'Digital Marketing',
        author: 'Robert Williams',
        category: 'Business',
        coverUrl:
            'https://images.unsplash.com/photo-1752243731865-c2fa851af7ec?w=400',
        rating: 4.5,
        available: true,
    },
];

const reviewsData = [
    {
        id: 1,
        userName: 'Michael Anderson',
        userEmail: 'michael.anderson@example.com',
        userAvatar: 'https://i.pravatar.cc/150?img=12',
        rating: 5,
        comment:
            'Excellent book for beginners and advanced programmers alike. The examples are clear and well-explained.',
        date: '2 weeks ago',
    },
    {
        id: 2,
        userName: 'Sarah Williams',
        userEmail: 'sarah.williams@example.com',
        userAvatar: 'https://i.pravatar.cc/150?img=45',
        rating: 4,
        comment:
            'Very informative and comprehensive. Some chapters could be more concise, but overall a great resource.',
        date: '1 month ago',
    },
    {
        id: 3,
        userName: 'David Chen',
        userEmail: 'david.chen@example.com',
        userAvatar: 'https://i.pravatar.cc/150?img=33',
        rating: 5,
        comment:
            "This book changed my understanding of programming fundamentals. The author's approach is methodical and easy to follow.",
        date: '2 months ago',
    },
    {
        id: 4,
        userName: 'Emily Rodriguez',
        userEmail: 'emily.rodriguez@example.com',
        userAvatar: 'https://i.pravatar.cc/150?img=26',
        rating: 4,
        comment:
            'Great content with practical examples. Would have loved more real-world project examples.',
        date: '3 months ago',
    },
];

interface BookShowProps {
    id?: string;
}

export default function BookShow({ id }: BookShowProps) {
    const { language: lang } = useLanguage();
    const bookId = id || '1';
    const book = bookData[bookId] || bookData['1'];

    const t = {
        backToCatalog: lang === 'id' ? 'Kembali ke Katalog' : 'Back to Catalog',
        available: lang === 'id' ? 'Tersedia' : 'Available',
        notAvailable: lang === 'id' ? 'Tidak Tersedia' : 'Not Available',
        copies: lang === 'id' ? 'eksemplar' : 'copies',
        borrowBook: lang === 'id' ? 'Pinjam Buku Ini' : 'Borrow This Book',
        addWishlist:
            lang === 'id'
                ? 'Tambah ke Daftar Keinginan'
                : 'Add to Wishlist',
        publisher: lang === 'id' ? 'Penerbit' : 'Publisher',
        pubYear: lang === 'id' ? 'Tahun Terbit' : 'Publication Year',
        bookLanguage: lang === 'id' ? 'Bahasa' : 'Language',
        bookPages: lang === 'id' ? 'Halaman' : 'Pages',
        synopsis: lang === 'id' ? 'Sinopsis' : 'Synopsis',
        recommended: lang === 'id' ? 'Buku Rekomendasi' : 'Recommended Books',
        reviews: lang === 'id' ? 'Ulasan Pembaca' : 'User Reviews',
        seeReviews:
            lang === 'id'
                ? 'Lihat apa yang pembaca pikirkan tentang buku ini'
                : 'See what readers think about this book',
        average: lang === 'id' ? 'Rata-rata' : 'Average',
        helpful: lang === 'id' ? 'Membantu' : 'Helpful',
        reply: lang === 'id' ? 'Balas' : 'Reply',
        report: lang === 'id' ? 'Laporkan' : 'Report',
        bookNotFound:
            lang === 'id' ? 'Buku tidak ditemukan' : 'Book not found',
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
                    <Link href="/catalog">
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
                                        src={book.coverUrl}
                                        alt={book.title}
                                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>

                                <div className="p-6">
                                    <div className="mb-4 flex items-center gap-2">
                                        {book.available ? (
                                            <>
                                                <CheckCircle className="h-5 w-5 text-green-500" />
                                                <span className="font-medium text-green-700">
                                                    {t.available}
                                                </span>
                                                <span className="text-sm text-gray-500">
                                                    ({book.stock} {t.copies})
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                <XCircle className="h-5 w-5 text-red-500" />
                                                <span className="font-medium text-red-700">
                                                    {t.notAvailable}
                                                </span>
                                            </>
                                        )}
                                    </div>

                                    <Button
                                        className="mb-3 w-full bg-primary hover:bg-primary/90"
                                        size="lg"
                                        disabled={!book.available}
                                    >
                                        {book.available
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
                                            <Star className="h-5 w-5 fill-accent text-accent" />
                                            <span className="text-lg font-semibold text-gray-900">
                                                {book.rating}
                                            </span>
                                            <span className="text-gray-500">
                                                /5.0
                                            </span>
                                        </div>
                                        <Badge className="bg-primary/10 text-primary">
                                            {book.category}
                                        </Badge>
                                    </div>

                                    <p className="flex items-center gap-2 text-lg text-gray-700">
                                        <User className="h-4 w-4" />
                                        by{' '}
                                        <span className="font-medium">
                                            {book.author}
                                        </span>
                                    </p>
                                </div>

                                {/* Details Grid */}
                                <div className="mb-8 grid gap-4 sm:grid-cols-2">
                                    <Card className="p-4">
                                        <div className="flex items-center gap-3">
                                            <Building className="h-5 w-5 text-gray-400" />
                                            <div>
                                                <div className="text-sm text-gray-500">
                                                    {t.publisher}
                                                </div>
                                                <div className="font-medium text-gray-900">
                                                    {book.publisher}
                                                </div>
                                            </div>
                                        </div>
                                    </Card>

                                    <Card className="p-4">
                                        <div className="flex items-center gap-3">
                                            <Calendar className="h-5 w-5 text-gray-400" />
                                            <div>
                                                <div className="text-sm text-gray-500">
                                                    {t.pubYear}
                                                </div>
                                                <div className="font-medium text-gray-900">
                                                    {book.year}
                                                </div>
                                            </div>
                                        </div>
                                    </Card>

                                    <Card className="p-4">
                                        <div className="flex items-center gap-3">
                                            <Globe className="h-5 w-5 text-gray-400" />
                                            <div>
                                                <div className="text-sm text-gray-500">
                                                    {t.bookLanguage}
                                                </div>
                                                <div className="font-medium text-gray-900">
                                                    {book.language}
                                                </div>
                                            </div>
                                        </div>
                                    </Card>

                                    <Card className="p-4">
                                        <div className="flex items-center gap-3">
                                            <BookOpen className="h-5 w-5 text-gray-400" />
                                            <div>
                                                <div className="text-sm text-gray-500">
                                                    {t.bookPages}
                                                </div>
                                                <div className="font-medium text-gray-900">
                                                    {book.pages}
                                                </div>
                                            </div>
                                        </div>
                                    </Card>

                                    <Card className="p-4 sm:col-span-2">
                                        <div className="flex items-center gap-3">
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
                                    <p className="leading-relaxed text-gray-700">
                                        {book.synopsis}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Recommended Books */}
                    <div className="mb-12">
                        <h2 className="mb-6 font-['Poppins'] text-2xl font-bold text-gray-900 sm:text-3xl">
                            {t.recommended}
                        </h2>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {recommendedBooks.map((recBook) => (
                                <CatalogBookCard key={recBook.id} {...recBook} />
                            ))}
                        </div>
                    </div>

                    {/* Reviews Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mb-12"
                    >
                        <Card className="border-4 border-primary/30 bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 p-6 shadow-2xl sm:p-10">
                            {/* Header */}
                            <div className="mb-8 rounded-2xl bg-gradient-to-r from-primary to-secondary p-6 shadow-xl">
                                <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                                    <div className="text-center sm:text-left">
                                        <h2 className="mb-2 font-['Poppins'] text-3xl font-black text-white drop-shadow-lg sm:text-4xl">
                                            {t.reviews} ({reviewsData.length})
                                        </h2>
                                        <p className="text-lg text-white/90">
                                            {t.seeReviews}
                                        </p>
                                    </div>
                                    <Badge className="bg-accent px-6 py-3 text-xl text-white shadow-lg">
                                        {'\u2B50'} {book.rating} {t.average}
                                    </Badge>
                                </div>
                            </div>

                            {/* Reviews List */}
                            <div className="space-y-8">
                                {reviewsData.map((review, index) => (
                                    <motion.div
                                        key={review.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.15 }}
                                        className="transform rounded-2xl border-2 border-primary/10 bg-white p-6 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:border-primary/30 hover:shadow-2xl sm:p-8"
                                    >
                                        <div className="flex gap-6">
                                            {/* Avatar */}
                                            <div className="relative flex-shrink-0">
                                                <div className="absolute -top-2 -right-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-accent text-sm font-bold text-white shadow-lg">
                                                    #{index + 1}
                                                </div>
                                                <img
                                                    src={review.userAvatar}
                                                    alt={review.userName}
                                                    className="h-20 w-20 rounded-2xl border-4 border-white object-cover ring-4 ring-primary/20 shadow-xl sm:h-24 sm:w-24"
                                                />
                                                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 transform rounded-full bg-gradient-to-r from-accent to-yellow-500 px-3 py-1 shadow-lg">
                                                    <div className="flex items-center gap-1">
                                                        {[
                                                            ...Array(
                                                                review.rating,
                                                            ),
                                                        ].map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                className="h-3 w-3 fill-white text-white"
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="min-w-0 flex-1">
                                                <div className="mb-4 rounded-xl bg-gradient-to-r from-primary/5 to-secondary/5 p-4">
                                                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                                        <div className="flex-1">
                                                            <h3 className="mb-1 flex items-center gap-2 font-['Poppins'] text-xl font-black text-gray-900 sm:text-2xl">
                                                                {
                                                                    review.userName
                                                                }
                                                                <span className="text-green-500">
                                                                    {'\u2713'}
                                                                </span>
                                                            </h3>
                                                            <p className="text-sm font-medium text-gray-600">
                                                                {
                                                                    review.userEmail
                                                                }
                                                            </p>
                                                        </div>
                                                        <div className="text-left sm:text-right">
                                                            <div className="mb-2 flex flex-wrap items-center gap-1">
                                                                {[
                                                                    ...Array(5),
                                                                ].map(
                                                                    (_, i) => (
                                                                        <Star
                                                                            key={
                                                                                i
                                                                            }
                                                                            className={`h-6 w-6 ${
                                                                                i <
                                                                                review.rating
                                                                                    ? 'fill-accent text-accent drop-shadow-md'
                                                                                    : 'text-gray-300'
                                                                            }`}
                                                                        />
                                                                    ),
                                                                )}
                                                                <span className="ml-2 text-lg font-bold text-primary">
                                                                    {
                                                                        review.rating
                                                                    }
                                                                    .0
                                                                </span>
                                                            </div>
                                                            <p className="inline-block rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-500">
                                                                {review.date}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Comment */}
                                                <div className="mb-4 rounded-xl border-l-4 border-primary bg-gradient-to-br from-gray-50 to-blue-50 p-5 shadow-md">
                                                    <p className="text-base font-medium italic leading-relaxed text-gray-800 sm:text-lg">
                                                        "{review.comment}"
                                                    </p>
                                                </div>

                                                {/* Actions */}
                                                <div className="flex flex-wrap items-center gap-3">
                                                    <button className="flex transform items-center gap-2 rounded-xl bg-gradient-to-r from-green-500 to-green-600 px-5 py-2.5 font-bold text-white shadow-lg transition-all hover:scale-105 hover:from-green-600 hover:to-green-700 hover:shadow-xl">
                                                        {t.helpful}
                                                    </button>
                                                    <button className="flex transform items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-5 py-2.5 font-bold text-white shadow-lg transition-all hover:scale-105 hover:from-blue-600 hover:to-blue-700 hover:shadow-xl">
                                                        <MessageSquare className="h-5 w-5" />
                                                        {t.reply}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </Card>
                    </motion.div>
                </div>
            </div>
            <Footer />
        </>
    );
}

