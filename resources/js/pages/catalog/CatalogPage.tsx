import { useState, useEffect } from 'react';
import {
    Search,
    BookOpen,
    Grid3x3,
    Users,
    Building2,
    ArrowLeft,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { router, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import BookCard from '@/components/component/BookCard/BookCard';
import { Card } from '@/components/ui/card';
import Pagination from '@/components/component/Pagination/Pagination';
import { Input } from '@/components/ui/input';

// Mock Data
const allBooks = [
    {
        id: '1',
        title: 'The Art of Programming',
        author: 'Jane Smith',
        category: 'Technology',
        coverUrl:
            'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400',
        rating: 4.8,
        available: true,
        year: 2024,
        publisher: 'Tech Press',
    },
    {
        id: '2',
        title: 'Modern Science',
        author: 'Dr. Michael Chen',
        category: 'Science',
        coverUrl:
            'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400',
        rating: 4.6,
        available: true,
        year: 2023,
        publisher: 'Science Publishers',
    },
    {
        id: '3',
        title: 'Ancient Civilizations',
        author: 'Prof. Sarah Johnson',
        category: 'History',
        coverUrl:
            'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400',
        rating: 4.7,
        available: false,
        year: 2022,
        publisher: 'Historical Books',
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
    },
    {
        id: '5',
        title: 'Digital Marketing Essentials',
        author: 'Robert Williams',
        category: 'Business',
        coverUrl:
            'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
        rating: 4.5,
        available: true,
        year: 2024,
        publisher: 'Business Press',
    },
    {
        id: '6',
        title: 'Advanced Mathematics',
        author: 'Dr. Lisa Anderson',
        category: 'Science',
        coverUrl:
            'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400',
        rating: 4.4,
        available: true,
        year: 2023,
        publisher: 'Academic Press',
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
    },
    {
        id: '9',
        title: 'Business Strategy',
        author: 'Michael Davis',
        category: 'Business',
        coverUrl:
            'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400',
        rating: 4.3,
        available: true,
        year: 2024,
        publisher: 'Business Press',
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
    },
];

const allCategories = [
    {
        id: '1',
        name: 'Technology',
        slug: 'technology',
        icon: '💻',
        count: 1250,
        color: 'bg-blue-100 text-blue-700',
    },
    {
        id: '2',
        name: 'Science',
        slug: 'science',
        icon: '🔬',
        count: 980,
        color: 'bg-green-100 text-green-700',
    },
    {
        id: '3',
        name: 'History',
        slug: 'history',
        icon: '📜',
        count: 750,
        color: 'bg-amber-100 text-amber-700',
    },
    {
        id: '4',
        name: 'Literature',
        slug: 'literature',
        icon: '📚',
        count: 1100,
        color: 'bg-purple-100 text-purple-700',
    },
    {
        id: '5',
        name: 'Arts',
        slug: 'arts',
        icon: '🎨',
        count: 650,
        color: 'bg-pink-100 text-pink-700',
    },
    {
        id: '6',
        name: 'Business',
        slug: 'business',
        icon: '💼',
        count: 820,
        color: 'bg-indigo-100 text-indigo-700',
    },
    {
        id: '7',
        name: 'Mathematics',
        slug: 'mathematics',
        icon: '🔢',
        count: 540,
        color: 'bg-cyan-100 text-cyan-700',
    },
    {
        id: '8',
        name: 'Philosophy',
        slug: 'philosophy',
        icon: '🤔',
        count: 420,
        color: 'bg-red-100 text-red-700',
    },
];

const allAuthors = [
    {
        id: '1',
        name: 'Jane Smith',
        bookCount: 15,
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
        specialty: 'Technology',
    },
    {
        id: '2',
        name: 'Dr. Michael Chen',
        bookCount: 23,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
        specialty: 'Science',
    },
    {
        id: '3',
        name: 'Prof. Sarah Johnson',
        bookCount: 18,
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
        specialty: 'History',
    },
    {
        id: '4',
        name: 'Emily Roberts',
        bookCount: 12,
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200',
        specialty: 'Literature',
    },
    {
        id: '5',
        name: 'Robert Williams',
        bookCount: 9,
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200',
        specialty: 'Business',
    },
    {
        id: '6',
        name: 'Dr. Lisa Anderson',
        bookCount: 21,
        avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=200',
        specialty: 'Science',
    },
    {
        id: '7',
        name: 'David Brown',
        bookCount: 14,
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
        specialty: 'Technology',
    },
    {
        id: '8',
        name: 'Anna Martinez',
        bookCount: 11,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
        specialty: 'Literature',
    },
];

const allPublishers = [
    {
        id: '1',
        name: 'Tech Press',
        bookCount: 156,
        logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200',
        location: 'New York, USA',
    },
    {
        id: '2',
        name: 'Science Publishers',
        bookCount: 243,
        logo: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=200',
        location: 'London, UK',
    },
    {
        id: '3',
        name: 'Historical Books',
        bookCount: 189,
        logo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200',
        location: 'Boston, USA',
    },
    {
        id: '4',
        name: 'Literary House',
        bookCount: 298,
        logo: 'https://images.unsplash.com/photo-1604357209793-fca5dca89f97?w=200',
        location: 'Paris, France',
    },
    {
        id: '5',
        name: 'Business Press',
        bookCount: 134,
        logo: 'https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=200',
        location: 'Tokyo, Japan',
    },
    {
        id: '6',
        name: 'Academic Press',
        bookCount: 312,
        logo: 'https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?w=200',
        location: 'Oxford, UK',
    },
];

export default function CatalogPage() {
    const { tab } = usePage().props as {
        tab?: string;
    };

    const activeTab = tab ?? 'books';

    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(12);

    const [selectedFilter, setSelectedFilter] = useState<{
        type: 'category' | 'author' | 'publisher' | null;
        value: string;
        name: string;
    } | null>(null);

    // reset when tab change
    useEffect(() => {
        setCurrentPage(1);
        setSearchQuery('');
        setSelectedFilter(null);
    }, [activeTab]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery]);

    // Compute filtered data based on active tab, search, and filters
    const currentData = (() => {
        let data: any[] = [];

        if (selectedFilter) {
            // When a filter is selected, show books filtered by that filter
            if (selectedFilter.type === 'category') {
                data = allBooks.filter(
                    (b) => b.category.toLowerCase() === selectedFilter.value,
                );
            } else if (selectedFilter.type === 'author') {
                const author = allAuthors.find(
                    (a) => a.id === selectedFilter.value,
                );
                data = author
                    ? allBooks.filter((b) => b.author === author.name)
                    : [];
            } else if (selectedFilter.type === 'publisher') {
                const publisher = allPublishers.find(
                    (p) => p.id === selectedFilter.value,
                );
                data = publisher
                    ? allBooks.filter((b) => b.publisher === publisher.name)
                    : [];
            }
        } else {
            switch (activeTab) {
                case 'books':
                    data = allBooks;
                    break;
                case 'categories':
                    data = allCategories;
                    break;
                case 'author':
                    data = allAuthors;
                    break;
                case 'publisher':
                    data = allPublishers;
                    break;
                default:
                    data = allBooks;
            }
        }

        // Apply search filter
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            data = data.filter((item: any) =>
                (item.title || item.name || '').toLowerCase().includes(q),
            );
        }

        return data;
    })();

    const startIndex = (currentPage - 1) * perPage;
    const endIndex = startIndex + perPage;
    const paginatedData = currentData.slice(startIndex, endIndex);
    const totalPages = Math.ceil(currentData.length / perPage);

    const changeTab = (tab: string) => {
        router.get(
            '/catalog',
            { tab },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    const getTitle = () => {
        switch (activeTab) {
            case 'books':
                return 'Books Catalog';
            case 'categories':
                return 'Book Categories';
            case 'author':
                return 'Authors';
            case 'publisher':
                return 'Publishers';
            default:
                return 'Books Catalog';
        }
    };

    const getIcon = () => {
        switch (activeTab) {
            case 'books':
                return <BookOpen className="h-8 w-8 text-primary" />;
            case 'categories':
                return <Grid3x3 className="h-8 w-8 text-primary" />;
            case 'author':
                return <Users className="h-8 w-8 text-primary" />;
            case 'publisher':
                return <Building2 className="h-8 w-8 text-primary" />;
            default:
                return <BookOpen className="h-8 w-8 text-primary" />;
        }
    };

    const handleCategoryClick = (category: any) => {
        setSelectedFilter({
            type: 'category',
            value: category.slug,
            name: category.name,
        });
        setCurrentPage(1);
        setSearchQuery('');
    };

    const handleAuthorClick = (author: any) => {
        setSelectedFilter({
            type: 'author',
            value: author.id,
            name: author.name,
        });
        setCurrentPage(1);
        setSearchQuery('');
    };

    const handlePublisherClick = (publisher: any) => {
        setSelectedFilter({
            type: 'publisher',
            value: publisher.id,
            name: publisher.name,
        });
        setCurrentPage(1);
        setSearchQuery('');
    };

    const handleBackToList = () => {
        setSelectedFilter(null);
        setCurrentPage(1);
        setSearchQuery('');
    };

    return (
        <div className="min-h-screen bg-gray-50 py-[120px]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    {selectedFilter && (
                        <Button
                            variant="ghost"
                            onClick={handleBackToList}
                            className="mb-4 hover:bg-primary/10"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to{' '}
                            {activeTab === 'categories'
                                ? 'Categories'
                                : activeTab === 'author'
                                  ? 'Authors'
                                  : 'Publishers'}
                        </Button>
                    )}
                    <div className="mb-4 flex items-center gap-4">
                        <div className="rounded-xl bg-primary/10 p-4">
                            {getIcon()}
                        </div>
                        <div>
                            <h1 className="font-['Poppins'] text-3xl font-bold text-gray-900 sm:text-4xl">
                                {getTitle()}
                            </h1>
                            <p className="text-gray-600">
                                {selectedFilter ? (
                                    <>Showing {currentData.length} books</>
                                ) : (
                                    <>
                                        Browse our collection of{' '}
                                        {currentData.length} {activeTab}
                                    </>
                                )}
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Search Bar */}
                <div className="mb-6 rounded-xl bg-white p-4 shadow-sm">
                    <div className="relative">
                        <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                        <Input
                            placeholder={`Search ${activeTab}...`}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="h-12 pl-11 text-base"
                        />
                    </div>
                </div>

                {/* Results Count */}
                <div className="mb-4">
                    <p className="text-sm text-gray-600">
                        Showing {startIndex + 1}-
                        {Math.min(endIndex, currentData.length)} of{' '}
                        {currentData.length} {activeTab}
                    </p>
                </div>

                {/* Content Grid */}
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
                ) : currentData.length > 0 ? (
                    <>
                        {/* Books Grid */}
                        {(activeTab === 'books' || selectedFilter) && (
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {paginatedData.map((book: any) => (
                                    <BookCard key={book.id} {...book} />
                                ))}
                            </div>
                        )}

                        {/* Categories Grid */}
                        {activeTab === 'categories' && !selectedFilter && (
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {paginatedData.map((category: any) => (
                                    <motion.div
                                        key={category.id}
                                        whileHover={{ y: -8 }}
                                        transition={{
                                            type: 'spring',
                                            stiffness: 300,
                                        }}
                                    >
                                        <Card
                                            className="cursor-pointer border-2 p-6 transition-shadow hover:border-primary hover:shadow-xl"
                                            onClick={() =>
                                                handleCategoryClick(category)
                                            }
                                        >
                                            <div className="text-center">
                                                <div
                                                    className={`${category.color} mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full text-4xl`}
                                                >
                                                    {category.icon}
                                                </div>
                                                <h3 className="mb-2 font-['Poppins'] text-lg font-bold text-gray-900">
                                                    {category.name}
                                                </h3>
                                                <p className="mb-3 text-sm text-gray-600">
                                                    {category.count} Books
                                                </p>
                                                <Badge
                                                    className={category.color}
                                                >
                                                    {category.slug}
                                                </Badge>
                                            </div>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        )}

                        {/* Authors Grid */}
                        {activeTab === 'author' && !selectedFilter && (
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {paginatedData.map((author: any) => (
                                    <motion.div
                                        key={author.id}
                                        whileHover={{ y: -8 }}
                                        transition={{
                                            type: 'spring',
                                            stiffness: 300,
                                        }}
                                    >
                                        <Card
                                            className="cursor-pointer border-2 p-6 transition-shadow hover:border-primary hover:shadow-xl"
                                            onClick={() =>
                                                handleAuthorClick(author)
                                            }
                                        >
                                            <div className="text-center">
                                                <img
                                                    src={author.avatar}
                                                    alt={author.name}
                                                    className="mx-auto mb-4 h-24 w-24 rounded-full border-4 border-primary/20 object-cover"
                                                />
                                                <h3 className="mb-1 font-['Poppins'] text-lg font-bold text-gray-900">
                                                    {author.name}
                                                </h3>
                                                <p className="mb-2 text-sm text-gray-600">
                                                    {author.specialty}
                                                </p>
                                                <Badge
                                                    variant="outline"
                                                    className="border-primary text-primary"
                                                >
                                                    {author.bookCount} Books
                                                </Badge>
                                            </div>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        )}

                        {/* Publishers Grid */}
                        {activeTab === 'publisher' && !selectedFilter && (
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {paginatedData.map((publisher: any) => (
                                    <motion.div
                                        key={publisher.id}
                                        whileHover={{ y: -8 }}
                                        transition={{
                                            type: 'spring',
                                            stiffness: 300,
                                        }}
                                    >
                                        <Card
                                            className="cursor-pointer border-2 p-6 transition-shadow hover:border-primary hover:shadow-xl"
                                            onClick={() =>
                                                handlePublisherClick(publisher)
                                            }
                                        >
                                            <div className="flex items-start gap-4">
                                                <img
                                                    src={publisher.logo}
                                                    alt={publisher.name}
                                                    className="h-16 w-16 rounded-lg border-2 border-gray-200 object-cover"
                                                />
                                                <div className="flex-1">
                                                    <h3 className="mb-1 font-['Poppins'] text-lg font-bold text-gray-900">
                                                        {publisher.name}
                                                    </h3>
                                                    <p className="mb-3 text-sm text-gray-600">
                                                        📍 {publisher.location}
                                                    </p>
                                                    <Badge className="bg-primary text-white">
                                                        {publisher.bookCount}{' '}
                                                        Publications
                                                    </Badge>
                                                </div>
                                            </div>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        )}

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <Pagination
                                page={currentPage}
                                total={currentData.length}
                                perPage={perPage}
                                onPageChange={setCurrentPage}
                                onPerPageChange={(val) => {
                                    setPerPage(val);
                                    setCurrentPage(1);
                                }}
                            />
                        )}
                    </>
                ) : (
                    <div className="py-16 text-center">
                        <div className="mb-4 text-6xl">
                            {activeTab === 'books' && '📚'}
                            {activeTab === 'categories' && '📂'}
                            {activeTab === 'author' && '✍️'}
                            {activeTab === 'publisher' && '🏢'}
                        </div>
                        <h3 className="mb-2 text-xl font-semibold text-gray-900">
                            No {activeTab} found
                        </h3>
                        <p className="text-gray-600">
                            Try adjusting your search
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
