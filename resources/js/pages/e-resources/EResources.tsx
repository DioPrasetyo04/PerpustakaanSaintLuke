import { Link, usePage } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Bookmark, Filter, Search, X } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';
import { Pagination } from '@/components/common/Pagination';

// Mock Data
const allBooks = [
    {
        id: '1',
        title: 'Advanced Mathematics',
        author: 'Dr. Lisa Anderson',
        category: 'Science',
        coverUrl:
            'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400',
        rating: 4.4,
        available: true,
        year: 2023,
        publisher: 'Academic Press',
        language: 'English',
    },
    {
        id: '2',
        title: 'Ancient Civilizations',
        author: 'Prof. Sarah Johnson',
        category: 'History',
        coverUrl:
            'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400',
        rating: 4.7,
        available: false,
        year: 2022,
        publisher: 'Historical Books',
        language: 'English',
    },
    {
        id: '3',
        title: 'Business Strategy',
        author: 'Michael Davis',
        category: 'Business',
        coverUrl:
            'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400',
        rating: 4.3,
        available: true,
        year: 2024,
        publisher: 'Business Press',
        language: 'English',
    },
    {
        id: '4',
        title: 'Classic Literature',
        author: 'Emily Roberts',
        category: 'Literature',
        coverUrl:
            'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
        rating: 4.9,
        available: true,
        year: 2025,
        publisher: 'Literary House',
        language: 'English',
    },
    {
        id: '5',
        title: 'The Art of Programming',
        author: 'Jane Smith',
        category: 'Technology',
        coverUrl:
            'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400',
        rating: 4.8,
        available: true,
        year: 2024,
        publisher: 'Tech Press',
        language: 'English',
    },
    {
        id: '6',
        title: 'Modern Science',
        author: 'Dr. Michael Chen',
        category: 'Science',
        coverUrl:
            'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400',
        rating: 4.6,
        available: true,
        year: 2023,
        publisher: 'Science Publishers',
        language: 'English',
    },
    {
        id: '7',
        title: 'Web Development Fundamentals',
        author: 'David Brown',
        category: 'Technology',
        coverUrl:
            'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400',
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
            'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400',
        rating: 4.6,
        available: true,
        year: 2021,
        publisher: 'Historical Books',
        language: 'English',
    },
    {
        id: '9',
        title: 'Digital Marketing Essentials',
        author: 'Robert Williams',
        category: 'Business',
        coverUrl:
            'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
        rating: 4.5,
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
            'https://images.unsplash.com/photo-1513001900722-370f803f498d?w=400',
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
            'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400',
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
            'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400',
        rating: 4.6,
        available: true,
        year: 2024,
        publisher: 'Tech Press',
        language: 'English',
    },
];

const allCategories = [
    {
        id: '1',
        name: 'Technology',
        slug: 'technology',
        icon: '💻',
        count: 1250,
    },
    { id: '2', name: 'Science', slug: 'science', icon: '🔬', count: 980 },
    { id: '3', name: 'History', slug: 'history', icon: '📜', count: 750 },
    {
        id: '4',
        name: 'Literature',
        slug: 'literature',
        icon: '📚',
        count: 1100,
    },
    { id: '5', name: 'Arts', slug: 'arts', icon: '🎨', count: 650 },
    { id: '6', name: 'Business', slug: 'business', icon: '💼', count: 820 },
    {
        id: '7',
        name: 'Mathematics',
        slug: 'mathematics',
        icon: '🔢',
        count: 540,
    },
];

const allAuthors = [
    'Jane Smith',
    'Dr. Michael Chen',
    'Prof. Sarah Johnson',
    'Emily Roberts',
    'Robert Williams',
    'Dr. Lisa Anderson',
    'David Brown',
    'Anna Martinez',
    'James Wilson',
    'Dr. Robert Lee',
    'Sarah Kim',
    'Michael Davis',
];

const allPublishers = [
    'Tech Press',
    'Science Publishers',
    'Historical Books',
    'Literary House',
    'Business Press',
    'Academic Press',
];

export default function EResources() {
    const { url } = usePage();
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('title');
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [bookmarkedBooks, setBookmarkedBooks] = useState<string[]>([]);
    const itemsPerPage = 12;

    const [filters, setFilters] = useState({
        categories: [] as string[],
        authors: [] as string[],
        publishers: [] as string[],
        availability: 'all',
    });

    // Initialize filters from URL params
    useEffect(() => {
        const queryParams = new URLSearchParams(url.split('?')[1] || '');

        const categoryParam = queryParams.get('category');
        const authorParam = queryParams.get('author');
        const publisherParam = queryParams.get('publisher');
        // const availabilityParam = queryParams.get('availability');

        setFilters((prev) => {
            const newFilters = { ...prev };

            if (categoryParam) {
                const categoryMatch = allCategories.find(
                    (category) =>
                        category.slug.toLowerCase() ===
                        categoryParam.toLowerCase(),
                );

                if (categoryMatch) {
                    newFilters.categories = [categoryMatch.name];
                }
            }

            if (authorParam) {
                newFilters.authors = [authorParam];
            }

            if (publisherParam) {
                newFilters.publishers = [publisherParam];
            }

            return newFilters;
        });
    }, [url]);

    const toggleFilter = (type: keyof typeof filters, value: string) => {
        setFilters((prev) => {
            const current = prev[type] as string[];
            const updated = current.includes(value)
                ? current.filter((item) => item !== value)
                : [...current, value];
            return { ...prev, [type]: updated };
        });
    };

    const toggleBookmark = (bookId: string) => {
        setBookmarkedBooks((prev) =>
            prev.includes(bookId)
                ? prev.filter((id) => id !== bookId)
                : [...prev, bookId],
        );
    };

    const filteredBooks = useMemo(() => {
        return allBooks.filter((book) => {
            const matchesSearch =
                book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                book.author.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesCategory =
                filters.categories.length === 0 ||
                filters.categories.includes(book.category);

            const matchesAuthor =
                filters.authors.length === 0 ||
                filters.authors.includes(book.author);

            const matchesPublisher =
                filters.publishers.length === 0 ||
                filters.publishers.includes(book.publisher);

            const matchesAvailability =
                filters.availability === 'all' ||
                (filters.availability === 'available' && book.available) ||
                (filters.availability === 'borrowed' && !book.available);

            return (
                matchesSearch &&
                matchesCategory &&
                matchesAuthor &&
                matchesPublisher &&
                matchesAvailability
            );
        });
    }, [searchQuery, filters]);

    const sortedBooks = useMemo(() => {
        return [...filteredBooks].sort((a, b) => {
            if (sortBy === 'title') return a.title.localeCompare(b.title);
            if (sortBy === 'author') return a.author.localeCompare(b.author);
            if (sortBy === 'rating') return b.rating - a.rating;
            if (sortBy === 'year') return b.year - a.year;
            return 0;
        });
    }, [filteredBooks, sortBy]);

    const { paginatedBooks, totalPages, startIndex, endIndex } = useMemo(() => {
        const totalPages = Math.ceil(sortedBooks.length / itemsPerPage);

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        const paginatedBooks = sortedBooks.slice(startIndex, endIndex);

        return {
            paginatedBooks,
            totalPages,
            startIndex,
            endIndex,
        };
    }, [sortedBooks, currentPage]);

    return (
        <div className="min-h-screen bg-gray-50 py-[120px]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="mb-2 font-['Poppins'] text-3xl font-bold text-gray-900 sm:text-4xl">
                        E-Resources
                    </h1>
                    <p className="text-gray-600">
                        Browse and filter our comprehensive digital collection
                    </p>

                    {/* Active Filters Display */}
                    {(filters.categories.length > 0 ||
                        filters.authors.length > 0 ||
                        filters.publishers.length > 0) && (
                        <div className="mt-4 flex flex-wrap gap-2">
                            <span className="text-sm text-gray-600">
                                Active filters:
                            </span>
                            {filters.categories.map((cat) => (
                                <Badge
                                    key={cat}
                                    variant="secondary"
                                    className="bg-primary/10 text-primary"
                                >
                                    Category: {cat}
                                    <button
                                        onClick={() =>
                                            toggleFilter('categories', cat)
                                        }
                                        className="ml-2 hover:text-red-600"
                                    >
                                        <X className="h-3 w-3" />
                                    </button>
                                </Badge>
                            ))}
                            {filters.authors.map((author) => (
                                <Badge
                                    key={author}
                                    variant="secondary"
                                    className="bg-secondary/10 text-secondary"
                                >
                                    Author: {author}
                                    <button
                                        onClick={() =>
                                            toggleFilter('authors', author)
                                        }
                                        className="ml-2 hover:text-red-600"
                                    >
                                        <X className="h-3 w-3" />
                                    </button>
                                </Badge>
                            ))}
                            {filters.publishers.map((pub) => (
                                <Badge
                                    key={pub}
                                    variant="secondary"
                                    className="bg-amber-100 text-amber-700"
                                >
                                    Publisher: {pub}
                                    <button
                                        onClick={() =>
                                            toggleFilter('publishers', pub)
                                        }
                                        className="ml-2 hover:text-red-600"
                                    >
                                        <X className="h-3 w-3" />
                                    </button>
                                </Badge>
                            ))}
                        </div>
                    )}
                </motion.div>

                <div className="flex flex-col gap-6 lg:flex-row">
                    {/* Sidebar Filters - Desktop */}
                    <div className="hidden w-72 flex-shrink-0 lg:block">
                        <div className="sticky top-24 rounded-xl bg-white p-6 shadow-sm">
                            <h3 className="mb-6 flex items-center gap-2 font-['Poppins'] text-lg font-bold text-gray-900">
                                <Filter className="h-5 w-5" />
                                Filters
                            </h3>

                            {/* Category Filter */}
                            <div className="mb-6">
                                <Label className="mb-3 block font-semibold text-gray-900">
                                    Category
                                </Label>
                                <div className="custom-scrollbar max-h-64 space-y-2 overflow-y-auto pr-2">
                                    {allCategories.map((category) => (
                                        <div
                                            key={category.id}
                                            className={`flex items-center justify-between rounded-lg p-2 transition-colors ${
                                                filters.categories.includes(
                                                    category.name,
                                                )
                                                    ? 'bg-primary/5'
                                                    : 'hover:bg-gray-50'
                                            }`}
                                        >
                                            <div className="flex flex-1 items-center">
                                                <Checkbox
                                                    id={`cat-${category.id}`}
                                                    checked={filters.categories.includes(
                                                        category.name,
                                                    )}
                                                    onCheckedChange={() =>
                                                        toggleFilter(
                                                            'categories',
                                                            category.name,
                                                        )
                                                    }
                                                />
                                                <label
                                                    htmlFor={`cat-${category.id}`}
                                                    className="ml-3 flex flex-1 cursor-pointer items-center gap-2 text-sm text-gray-700"
                                                >
                                                    <span className="text-lg">
                                                        {category.icon}
                                                    </span>
                                                    <span>{category.name}</span>
                                                </label>
                                            </div>
                                            <Badge
                                                variant="outline"
                                                className="text-xs"
                                            >
                                                {category.count}
                                            </Badge>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Author Filter */}
                            <div className="mb-6">
                                <Label className="mb-3 block font-semibold text-gray-900">
                                    Author
                                </Label>
                                <Select
                                    value={filters.authors[0] || 'all'}
                                    onValueChange={(value) => {
                                        if (value === 'all') {
                                            setFilters({
                                                ...filters,
                                                authors: [],
                                            });
                                        } else {
                                            setFilters({
                                                ...filters,
                                                authors: [value],
                                            });
                                        }
                                    }}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="All Authors" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">
                                            All Authors
                                        </SelectItem>
                                        {allAuthors.map((author) => (
                                            <SelectItem
                                                key={author}
                                                value={author}
                                            >
                                                {author}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Publisher Filter */}
                            <div className="mb-6">
                                <Label className="mb-3 block font-semibold text-gray-900">
                                    Publisher
                                </Label>
                                <div className="custom-scrollbar max-h-48 space-y-2 overflow-y-auto pr-2">
                                    {allPublishers.map((publisher) => (
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
                                                className="ml-3 cursor-pointer text-sm text-gray-700"
                                            >
                                                {publisher}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Availability Filter */}
                            <div className="mb-6">
                                <Label className="mb-3 block font-semibold text-gray-900">
                                    Availability
                                </Label>
                                <Select
                                    value={filters.availability}
                                    onValueChange={(value) =>
                                        setFilters({
                                            ...filters,
                                            availability: value,
                                        })
                                    }
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">
                                            All Books
                                        </SelectItem>
                                        <SelectItem value="available">
                                            Available Only
                                        </SelectItem>
                                        <SelectItem value="borrowed">
                                            Borrowed
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={() =>
                                    setFilters({
                                        categories: [],
                                        authors: [],
                                        publishers: [],
                                        availability: 'all',
                                    })
                                }
                            >
                                Clear Filters
                            </Button>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Search and Sort Bar */}
                        <div className="mb-6 rounded-xl bg-white p-4 shadow-sm">
                            <div className="flex flex-col gap-4 sm:flex-row">
                                <div className="relative flex-1">
                                    <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                    <Input
                                        placeholder="Search books..."
                                        value={searchQuery}
                                        onChange={(e) =>
                                            setSearchQuery(e.target.value)
                                        }
                                        className="pl-10"
                                    />
                                </div>

                                <div className="flex gap-2">
                                    <Select
                                        value={sortBy}
                                        onValueChange={setSortBy}
                                    >
                                        <SelectTrigger className="w-full sm:w-40">
                                            <SelectValue placeholder="Sort by" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="title">
                                                Title
                                            </SelectItem>
                                            <SelectItem value="author">
                                                Author
                                            </SelectItem>
                                            <SelectItem value="rating">
                                                Rating
                                            </SelectItem>
                                            <SelectItem value="year">
                                                Year
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>

                                    <Button
                                        variant="outline"
                                        className="lg:hidden"
                                        onClick={() =>
                                            setShowMobileFilters(
                                                !showMobileFilters,
                                            )
                                        }
                                    >
                                        <Filter className="mr-2 h-4 w-4" />
                                        Filters
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Mobile Filters */}
                        <AnimatePresence>
                            {showMobileFilters && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="mb-6 overflow-hidden rounded-xl bg-white p-6 shadow-sm lg:hidden"
                                >
                                    <div className="mb-4 flex items-center justify-between">
                                        <h3 className="font-semibold text-gray-900">
                                            Filters
                                        </h3>
                                        <button
                                            onClick={() =>
                                                setShowMobileFilters(false)
                                            }
                                        >
                                            <X className="h-5 w-5" />
                                        </button>
                                    </div>

                                    <div className="space-y-6">
                                        {/* Mobile Category Filter */}
                                        <div>
                                            <Label className="mb-3 block font-semibold">
                                                Category
                                            </Label>
                                            <div className="max-h-48 space-y-2 overflow-y-auto">
                                                {allCategories.map(
                                                    (category) => (
                                                        <div
                                                            key={category.id}
                                                            className="flex items-center justify-between"
                                                        >
                                                            <div className="flex flex-1 items-center">
                                                                <Checkbox
                                                                    id={`cat-mobile-${category.id}`}
                                                                    checked={filters.categories.includes(
                                                                        category.name,
                                                                    )}
                                                                    onCheckedChange={() =>
                                                                        toggleFilter(
                                                                            'categories',
                                                                            category.name,
                                                                        )
                                                                    }
                                                                />
                                                                <label
                                                                    htmlFor={`cat-mobile-${category.id}`}
                                                                    className="ml-3 flex cursor-pointer items-center gap-2 text-sm text-gray-700"
                                                                >
                                                                    <span>
                                                                        {
                                                                            category.icon
                                                                        }
                                                                    </span>
                                                                    <span>
                                                                        {
                                                                            category.name
                                                                        }
                                                                    </span>
                                                                </label>
                                                            </div>
                                                            <Badge
                                                                variant="outline"
                                                                className="text-xs"
                                                            >
                                                                {category.count}
                                                            </Badge>
                                                        </div>
                                                    ),
                                                )}
                                            </div>
                                        </div>

                                        {/* Mobile Author Filter */}
                                        <div>
                                            <Label className="mb-3 block font-semibold">
                                                Author
                                            </Label>
                                            <Select
                                                value={
                                                    filters.authors[0] || 'all'
                                                }
                                                onValueChange={(value) => {
                                                    if (value === 'all') {
                                                        setFilters({
                                                            ...filters,
                                                            authors: [],
                                                        });
                                                    } else {
                                                        setFilters({
                                                            ...filters,
                                                            authors: [value],
                                                        });
                                                    }
                                                }}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="All Authors" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="all">
                                                        All Authors
                                                    </SelectItem>
                                                    {allAuthors.map(
                                                        (author) => (
                                                            <SelectItem
                                                                key={author}
                                                                value={author}
                                                            >
                                                                {author}
                                                            </SelectItem>
                                                        ),
                                                    )}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        {/* Mobile Availability Filter */}
                                        <div>
                                            <Label className="mb-3 block font-semibold">
                                                Availability
                                            </Label>
                                            <Select
                                                value={filters.availability}
                                                onValueChange={(value) =>
                                                    setFilters({
                                                        ...filters,
                                                        availability: value,
                                                    })
                                                }
                                            >
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="all">
                                                        All Books
                                                    </SelectItem>
                                                    <SelectItem value="available">
                                                        Available Only
                                                    </SelectItem>
                                                    <SelectItem value="borrowed">
                                                        Borrowed
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
                                Showing {startIndex + 1}-
                                {Math.min(endIndex, sortedBooks.length)} of{' '}
                                {sortedBooks.length} books
                            </p>
                        </div>

                        {/* Book Grid */}
                        {isLoading ? (
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {[...Array(12)].map((_, i) => (
                                    <div key={i} className="space-y-3">
                                        <Skeleton className="aspect-[3/4] w-full rounded-xl" />
                                        <Skeleton className="h-4 w-3/4" />
                                        <Skeleton className="h-4 w-1/2" />
                                    </div>
                                ))}
                            </div>
                        ) : sortedBooks.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                    {paginatedBooks.map((book) => (
                                        <motion.div
                                            key={book.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            whileHover={{ y: -8 }}
                                            transition={{
                                                type: 'spring',
                                                stiffness: 300,
                                            }}
                                        >
                                            <Link href={`/book/${book.id}`}>
                                                <Card className="group overflow-hidden border-2 transition-all hover:border-primary hover:shadow-2xl">
                                                    <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                                                        <img
                                                            src={book.coverUrl}
                                                            alt={book.title}
                                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                        />
                                                        <div className="absolute top-3 left-3 z-10">
                                                            <Badge
                                                                className={`${
                                                                    book.available
                                                                        ? 'bg-green-500 hover:bg-green-600'
                                                                        : 'bg-red-500 hover:bg-red-600'
                                                                } text-white shadow-lg`}
                                                            >
                                                                {book.available
                                                                    ? 'Available'
                                                                    : 'Borrowed'}
                                                            </Badge>
                                                        </div>
                                                        <button
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                toggleBookmark(
                                                                    book.id,
                                                                );
                                                            }}
                                                            className="absolute top-3 right-3 z-10 rounded-full bg-white/90 p-2 shadow-lg transition-all hover:bg-white"
                                                        >
                                                            <Bookmark
                                                                className={`h-5 w-5 ${
                                                                    bookmarkedBooks.includes(
                                                                        book.id,
                                                                    )
                                                                        ? 'fill-primary text-primary'
                                                                        : 'text-gray-600'
                                                                }`}
                                                            />
                                                        </button>
                                                    </div>
                                                    <div className="p-4">
                                                        <h3 className="mb-1 line-clamp-2 font-['Poppins'] font-semibold text-gray-900 transition-colors group-hover:text-primary">
                                                            {book.title}
                                                        </h3>
                                                        <p className="mb-2 text-sm text-gray-600">
                                                            {book.author}
                                                        </p>
                                                        <div className="flex items-center justify-between">
                                                            <Badge
                                                                variant="outline"
                                                                className="text-xs"
                                                            >
                                                                {book.category}
                                                            </Badge>
                                                            <div className="flex items-center gap-1">
                                                                <span className="text-yellow-500">
                                                                    ⭐
                                                                </span>
                                                                <span className="text-sm font-medium text-gray-700">
                                                                    {
                                                                        book.rating
                                                                    }
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Card>
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Pagination */}
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
                                <div className="mb-4 text-6xl">📚</div>
                                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                                    No books found
                                </h3>
                                <p className="text-gray-600">
                                    Try adjusting your search or filters
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
