import { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { motion, AnimatePresence } from 'framer-motion';
import {
    CatalogBookCard,
    type CatalogBook,
} from '@/components/common/CatalogBookCard';
import { Pagination } from '@/components/common/Pagination';
import { Footer } from '@/components/common/Footer';
import { useLanguage } from '@/hooks/useLanguage';

const allBooks: CatalogBook[] = [
    {
        id: '1',
        title: 'The Art of Programming',
        author: 'Jane Smith',
        category: 'Technology',
        coverUrl:
            'https://images.unsplash.com/photo-1763905180945-977cd687f7f9?w=400',
        rating: 4.8,
        available: true,
        year: 2024,
        publisher: 'Tech Press',
        language: 'English',
    },
    {
        id: '2',
        title: 'Modern Science',
        author: 'Dr. Michael Chen',
        category: 'Science',
        coverUrl:
            'https://images.unsplash.com/photo-1725870475677-7dc91efe9f93?w=400',
        rating: 4.6,
        available: true,
        year: 2023,
        publisher: 'Science Publishers',
        language: 'English',
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
        year: 2022,
        publisher: 'Historical Books',
        language: 'English',
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
        year: 2025,
        publisher: 'Literary House',
        language: 'English',
    },
    {
        id: '5',
        title: 'Digital Marketing Essentials',
        author: 'Robert Williams',
        category: 'Business',
        coverUrl:
            'https://images.unsplash.com/photo-1752243731865-c2fa851af7ec?w=400',
        rating: 4.5,
        available: true,
        year: 2024,
        publisher: 'Business Press',
        language: 'English',
    },
    {
        id: '6',
        title: 'Advanced Mathematics',
        author: 'Dr. Lisa Anderson',
        category: 'Science',
        coverUrl:
            'https://images.unsplash.com/photo-1725870475677-7dc91efe9f93?w=400',
        rating: 4.4,
        available: true,
        year: 2023,
        publisher: 'Academic Press',
        language: 'English',
    },
    {
        id: '7',
        title: 'Web Development Fundamentals',
        author: 'David Brown',
        category: 'Technology',
        coverUrl:
            'https://images.unsplash.com/photo-1763905180945-977cd687f7f9?w=400',
        rating: 4.7,
        available: false,
        year: 2024,
        publisher: 'Tech Press',
        language: 'English',
    },
    {
        id: '8',
        title: 'World War Chronicles',
        author: 'James Wilson',
        category: 'History',
        coverUrl:
            'https://images.unsplash.com/photo-1764509422504-f9aee0a1dd76?w=400',
        rating: 4.6,
        available: true,
        year: 2021,
        publisher: 'Historical Books',
        language: 'English',
    },
    {
        id: '9',
        title: 'Business Strategy',
        author: 'Michael Davis',
        category: 'Business',
        coverUrl:
            'https://images.unsplash.com/photo-1752243731865-c2fa851af7ec?w=400',
        rating: 4.3,
        available: true,
        year: 2024,
        publisher: 'Business Press',
        language: 'English',
    },
    {
        id: '10',
        title: 'Poetry Collection',
        author: 'Anna Martinez',
        category: 'Literature',
        coverUrl:
            'https://images.unsplash.com/photo-1772380407481-81b8f13bd010?w=400',
        rating: 4.8,
        available: true,
        year: 2025,
        publisher: 'Literary House',
        language: 'English',
    },
    {
        id: '11',
        title: 'Physics Fundamentals',
        author: 'Dr. Robert Lee',
        category: 'Science',
        coverUrl:
            'https://images.unsplash.com/photo-1725870475677-7dc91efe9f93?w=400',
        rating: 4.5,
        available: false,
        year: 2023,
        publisher: 'Science Publishers',
        language: 'English',
    },
    {
        id: '12',
        title: 'Mobile App Development',
        author: 'Sarah Kim',
        category: 'Technology',
        coverUrl:
            'https://images.unsplash.com/photo-1763905180945-977cd687f7f9?w=400',
        rating: 4.6,
        available: true,
        year: 2024,
        publisher: 'Tech Press',
        language: 'English',
    },
];

const categories = [
    'Technology',
    'Science',
    'History',
    'Literature',
    'Business',
    'Arts',
];
const publishers = [
    'Tech Press',
    'Science Publishers',
    'Historical Books',
    'Literary House',
    'Business Press',
    'Academic Press',
];

export default function CatalogPage() {
    const { language } = useLanguage();
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('title');
    const [showFilters, setShowFilters] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const [filters, setFilters] = useState({
        categories: [] as string[],
        publishers: [] as string[],
        availability: 'all',
    });

    const toggleFilter = (type: 'categories' | 'publishers', value: string) => {
        setFilters((prev) => {
            const current = prev[type];
            const updated = current.includes(value)
                ? current.filter((item) => item !== value)
                : [...current, value];
            return { ...prev, [type]: updated };
        });
        setCurrentPage(1);
    };

    const filteredBooks = allBooks.filter((book) => {
        const matchesSearch =
            book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.author.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory =
            filters.categories.length === 0 ||
            filters.categories.includes(book.category);
        const matchesPublisher =
            filters.publishers.length === 0 ||
            (book.publisher && filters.publishers.includes(book.publisher));
        const matchesAvailability =
            filters.availability === 'all' ||
            (filters.availability === 'available' && book.available) ||
            (filters.availability === 'borrowed' && !book.available);

        return (
            matchesSearch &&
            matchesCategory &&
            matchesPublisher &&
            matchesAvailability
        );
    });

    const sortedBooks = [...filteredBooks].sort((a, b) => {
        if (sortBy === 'title') return a.title.localeCompare(b.title);
        if (sortBy === 'author') return a.author.localeCompare(b.author);
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'year') return (b.year || 0) - (a.year || 0);
        return 0;
    });

    const totalPages = Math.ceil(sortedBooks.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedBooks = sortedBooks.slice(startIndex, endIndex);

    const t = {
        title: language === 'id' ? 'Katalog Buku' : 'Book Catalog',
        subtitle:
            language === 'id'
                ? `Jelajahi koleksi ${allBooks.length} buku kami`
                : `Browse our collection of ${allBooks.length} books`,
        search:
            language === 'id'
                ? 'Cari buku atau penulis...'
                : 'Search books or authors...',
        filters: language === 'id' ? 'Filter' : 'Filters',
        category: language === 'id' ? 'Kategori' : 'Category',
        publisher: language === 'id' ? 'Penerbit' : 'Publisher',
        availability: language === 'id' ? 'Ketersediaan' : 'Availability',
        allBooks: language === 'id' ? 'Semua Buku' : 'All Books',
        availableOnly: language === 'id' ? 'Tersedia Saja' : 'Available Only',
        borrowed: language === 'id' ? 'Dipinjam' : 'Borrowed',
        clearFilters: language === 'id' ? 'Hapus Filter' : 'Clear Filters',
        showing: language === 'id' ? 'Menampilkan' : 'Showing',
        of: language === 'id' ? 'dari' : 'of',
        books: language === 'id' ? 'buku' : 'books',
        noBooks: language === 'id' ? 'Buku tidak ditemukan' : 'No books found',
        tryAdjust:
            language === 'id'
                ? 'Coba sesuaikan pencarian atau filter Anda'
                : 'Try adjusting your search or filters',
        sortTitle: language === 'id' ? 'Judul' : 'Title',
        sortAuthor: language === 'id' ? 'Penulis' : 'Author',
        sortRating: language === 'id' ? 'Rating' : 'Rating',
        sortYear: language === 'id' ? 'Tahun' : 'Year',
    };

    return (
        <>
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="mb-2 font-['Poppins'] text-3xl font-bold text-gray-900 sm:text-4xl">
                            {t.title}
                        </h1>
                        <p className="text-gray-600">{t.subtitle}</p>
                    </div>

                    <div className="flex flex-col gap-6 lg:flex-row">
                        {/* Sidebar Filters - Desktop */}
                        <div className="hidden w-64 flex-shrink-0 lg:block">
                            <div className="sticky top-24 rounded-xl bg-white p-6 shadow-sm">
                                <h3 className="mb-4 flex items-center gap-2 font-semibold text-gray-900">
                                    <Filter className="h-4 w-4" />
                                    {t.filters}
                                </h3>

                                {/* Category Filter */}
                                <div className="mb-6">
                                    <Label className="mb-3 block">
                                        {t.category}
                                    </Label>
                                    <div className="space-y-2">
                                        {categories.map((category) => (
                                            <div
                                                key={category}
                                                className="flex items-center"
                                            >
                                                <Checkbox
                                                    id={`cat-${category}`}
                                                    checked={filters.categories.includes(
                                                        category,
                                                    )}
                                                    onCheckedChange={() =>
                                                        toggleFilter(
                                                            'categories',
                                                            category,
                                                        )
                                                    }
                                                />
                                                <label
                                                    htmlFor={`cat-${category}`}
                                                    className="ml-2 cursor-pointer text-sm text-gray-700"
                                                >
                                                    {category}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Publisher Filter */}
                                <div className="mb-6">
                                    <Label className="mb-3 block">
                                        {t.publisher}
                                    </Label>
                                    <div className="space-y-2">
                                        {publishers.map((publisher) => (
                                            <div
                                                key={publisher}
                                                className="flex items-center"
                                            >
                                                <Checkbox
                                                    id={`pub-${publisher}`}
                                                    checked={filters.publishers.includes(
                                                        publisher,
                                                    )}
                                                    onCheckedChange={() =>
                                                        toggleFilter(
                                                            'publishers',
                                                            publisher,
                                                        )
                                                    }
                                                />
                                                <label
                                                    htmlFor={`pub-${publisher}`}
                                                    className="ml-2 cursor-pointer text-sm text-gray-700"
                                                >
                                                    {publisher}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Availability Filter */}
                                <div className="mb-6">
                                    <Label className="mb-3 block">
                                        {t.availability}
                                    </Label>
                                    <Select
                                        value={filters.availability}
                                        onValueChange={(value) => {
                                            setFilters({
                                                ...filters,
                                                availability: value,
                                            });
                                            setCurrentPage(1);
                                        }}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">
                                                {t.allBooks}
                                            </SelectItem>
                                            <SelectItem value="available">
                                                {t.availableOnly}
                                            </SelectItem>
                                            <SelectItem value="borrowed">
                                                {t.borrowed}
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <Button
                                    variant="outline"
                                    className="w-full"
                                    onClick={() => {
                                        setFilters({
                                            categories: [],
                                            publishers: [],
                                            availability: 'all',
                                        });
                                        setCurrentPage(1);
                                    }}
                                >
                                    {t.clearFilters}
                                </Button>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="flex-1">
                            {/* Search and Sort Bar */}
                            <div className="mb-6 rounded-xl bg-white p-4 shadow-sm">
                                <div className="flex flex-col gap-4 sm:flex-row">
                                    <div className="relative flex-1">
                                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                        <Input
                                            placeholder={t.search}
                                            value={searchQuery}
                                            onChange={(e) => {
                                                setSearchQuery(e.target.value);
                                                setCurrentPage(1);
                                            }}
                                            className="pl-10"
                                        />
                                    </div>

                                    <div className="flex gap-2">
                                        <Select
                                            value={sortBy}
                                            onValueChange={setSortBy}
                                        >
                                            <SelectTrigger className="w-40">
                                                <SelectValue placeholder="Sort by" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="title">
                                                    {t.sortTitle}
                                                </SelectItem>
                                                <SelectItem value="author">
                                                    {t.sortAuthor}
                                                </SelectItem>
                                                <SelectItem value="rating">
                                                    {t.sortRating}
                                                </SelectItem>
                                                <SelectItem value="year">
                                                    {t.sortYear}
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>

                                        <Button
                                            variant="outline"
                                            className="lg:hidden"
                                            onClick={() =>
                                                setShowFilters(!showFilters)
                                            }
                                        >
                                            <Filter className="mr-2 h-4 w-4" />
                                            {t.filters}
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* Mobile Filters */}
                            <AnimatePresence>
                                {showFilters && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{
                                            height: 'auto',
                                            opacity: 1,
                                        }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="mb-6 overflow-hidden rounded-xl bg-white p-6 shadow-sm lg:hidden"
                                    >
                                        <div className="mb-4 flex items-center justify-between">
                                            <h3 className="font-semibold text-gray-900">
                                                {t.filters}
                                            </h3>
                                            <button
                                                onClick={() =>
                                                    setShowFilters(false)
                                                }
                                            >
                                                <X className="h-5 w-5" />
                                            </button>
                                        </div>

                                        <div className="space-y-6">
                                            <div>
                                                <Label className="mb-3 block">
                                                    {t.category}
                                                </Label>
                                                <div className="space-y-2">
                                                    {categories.map(
                                                        (category) => (
                                                            <div
                                                                key={category}
                                                                className="flex items-center"
                                                            >
                                                                <Checkbox
                                                                    id={`cat-mobile-${category}`}
                                                                    checked={filters.categories.includes(
                                                                        category,
                                                                    )}
                                                                    onCheckedChange={() =>
                                                                        toggleFilter(
                                                                            'categories',
                                                                            category,
                                                                        )
                                                                    }
                                                                />
                                                                <label
                                                                    htmlFor={`cat-mobile-${category}`}
                                                                    className="ml-2 cursor-pointer text-sm text-gray-700"
                                                                >
                                                                    {category}
                                                                </label>
                                                            </div>
                                                        ),
                                                    )}
                                                </div>
                                            </div>

                                            <div>
                                                <Label className="mb-3 block">
                                                    {t.availability}
                                                </Label>
                                                <Select
                                                    value={
                                                        filters.availability
                                                    }
                                                    onValueChange={(value) => {
                                                        setFilters({
                                                            ...filters,
                                                            availability: value,
                                                        });
                                                        setCurrentPage(1);
                                                    }}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="all">
                                                            {t.allBooks}
                                                        </SelectItem>
                                                        <SelectItem value="available">
                                                            {t.availableOnly}
                                                        </SelectItem>
                                                        <SelectItem value="borrowed">
                                                            {t.borrowed}
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Results Count */}
                            <div className="mb-4">
                                <p className="text-sm text-gray-600">
                                    {t.showing} {startIndex + 1}-
                                    {Math.min(endIndex, sortedBooks.length)}{' '}
                                    {t.of} {sortedBooks.length} {t.books}
                                </p>
                            </div>

                            {/* Book Grid */}
                            {sortedBooks.length > 0 ? (
                                <>
                                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                        {paginatedBooks.map((book) => (
                                            <CatalogBookCard
                                                key={book.id}
                                                {...book}
                                            />
                                        ))}
                                    </div>

                                    {totalPages > 1 && (
                                        <Pagination
                                            currentPage={currentPage}
                                            totalPages={totalPages}
                                            onPageChange={setCurrentPage}
                                        />
                                    )}
                                </>
                            ) : (
                                <div className="py-16 text-center">
                                    <div className="mb-4 text-6xl">
                                        {'\uD83D\uDCDA'}
                                    </div>
                                    <h3 className="mb-2 text-xl font-semibold text-gray-900">
                                        {t.noBooks}
                                    </h3>
                                    <p className="text-gray-600">
                                        {t.tryAdjust}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

