import BookCard from '@/components/component/Card/BookCard';
import Pagination from '@/components/component/Home/Pagination/Pagination';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { filtersHeaderPage } from '@/data/data';
import { useLanguage } from '@/hooks/useLanguage';
import { ResourceFilterPageProps } from '@/types/Resource/ResourceFilterPageProps';
import { router, usePage } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { Filter, Search, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { route } from 'ziggy-js';
export default function ResourcesPage() {
    const { props, url } = usePage<ResourceFilterPageProps>();
    const {
        resources,
        filters,
        statusOptions,
        authorsOptions,
        categoriesOptions,
        publishersOptions,
    } = props;
    const { language } = useLanguage();

    const text =
        language === 'id' ? filtersHeaderPage.id : filtersHeaderPage.en;

    const getQuery = (key: string) => {
        const params = new URLSearchParams(url.split('?')[1]);
        return params.get(key);
    };

    const [searchQuery, setSearchQuery] = useState(
        getQuery('search') || filters?.search || '',
    );

    const [localFilters, setLocalFilters] = useState({
        categories: filters?.categories || [],
        authors: filters?.authors || [],
        publishers: filters?.publishers || [],
        availability: filters?.availability || '',
    });

    const [sortBy, setSortBy] = useState(filters?.field || 'title');

    const getSortParams = (value: string) => {
        switch (value) {
            case 'title':
                return { field: 'title', direction: 'asc' };
            case 'categories':
                return { field: 'name', direction: 'asc' };
            case 'authors':
                return { field: 'name', direction: 'asc' };
            case 'publisher':
                return { field: 'name', direction: 'asc' };
            case 'publication_year':
                return { field: 'publication_year', direction: 'desc' };
            case 'rating':
                return { field: 'avg_rating', direction: 'desc' };
            default:
                return { field: 'title', direction: 'asc' };
        }
    };

    // useEffect url
    useEffect(() => {
        const search = getQuery('search') || '';
        setSearchQuery(search);
    }, [url]);

    useEffect(() => {
        const sort = getSortParams(sortBy);
        router.get(
            '/resources',
            {
                search: searchQuery,
                categories: localFilters.categories,
                authors: localFilters.authors,
                publishers: localFilters.publishers,
                availability: localFilters.availability,
                field: sort.field,
                direction: sort.direction,
            },
            {
                preserveState: true,
                replace: true,
            },
        );
    }, [searchQuery, localFilters, sortBy]);

    // toogleFilter;
    const toggleFilter = (type: keyof typeof localFilters, value: string) => {
        setLocalFilters((prev) => {
            const current = prev[type] as string[];
            const updated = current.includes(value)
                ? current.filter((item) => item !== value)
                : [...current, value];
            return { ...prev, [type]: updated };
        });
    };

    const start = (resources.meta.current_page - 1) * resources.meta.per_page;
    const end = start + resources.data.length;

    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onPageChange = (page: number) => {
        router.get(
            route('resource'),
            {
                search: searchQuery,
                resources_page: page,
                resources_load: resources.meta.per_page,
            },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    const onPerPageChange = (perPage: number) => {
        router.get(
            route('resource'),
            {
                search: searchQuery,
                resources_page: 1,
                resources_load: perPage,
            },
            {
                preserveState: true,
                replace: true,
            },
        );
    };
    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="mb-2 font-['Poppins'] text-3xl font-bold text-gray-900 sm:text-4xl">
                        {text?.title}
                    </h1>
                    <p className="text-gray-600">{text?.description}</p>

                    {/* Active Filters Display */}
                    {localFilters.categories.length > 0 ||
                        localFilters.authors.length > 0 ||
                        localFilters.publishers.length > 0 ||
                        (localFilters.availability.length > 0 && (
                            <div className="mt-4 flex flex-wrap gap-2">
                                <span className="text-sm text-gray-600">
                                    Active filters:
                                </span>
                                {localFilters.categories.map((cat) => (
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
                                {localFilters.authors.map((author) => (
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
                                {localFilters.publishers.map((pub) => (
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
                        ))}
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
                                    {categoriesOptions?.map((category) => (
                                        <div
                                            key={category.id}
                                            className={`flex items-center justify-between rounded-lg p-2 transition-colors ${
                                                localFilters.categories.includes(
                                                    category.name,
                                                )
                                                    ? 'bg-primary/5'
                                                    : 'hover:bg-gray-50'
                                            }`}
                                        >
                                            <div className="flex flex-1 items-center">
                                                <Checkbox
                                                    id={`cat-${category.name}`}
                                                    checked={localFilters.categories.includes(
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
                                                    htmlFor={`cat-${category.name}`}
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
                                                {category.count_of_books}
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
                                    value={localFilters.authors[0] || 'all'}
                                    onValueChange={(value) => {
                                        setLocalFilters({
                                            ...localFilters,
                                            authors:
                                                value === 'all' ? [] : [value],
                                        });
                                    }}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="All Authors" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">
                                            All Authors
                                        </SelectItem>
                                        {authorsOptions?.map((author) => (
                                            <SelectItem
                                                key={author.id}
                                                value={author.name}
                                            >
                                                {author.name}
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
                                    {publishersOptions?.map((publisher) => (
                                        <div
                                            key={publisher.id}
                                            className="flex items-center"
                                        >
                                            <Checkbox
                                                id={`pub-${publisher.id}`}
                                                checked={localFilters.publishers.includes(
                                                    publisher.name,
                                                )}
                                                onCheckedChange={() =>
                                                    toggleFilter(
                                                        'publishers',
                                                        publisher.name,
                                                    )
                                                }
                                            />
                                            <label
                                                htmlFor={`pub-${publisher.id}`}
                                                className="ml-3 cursor-pointer text-sm text-gray-700"
                                            >
                                                {publisher.name}
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
                                    value={localFilters.availability || ''}
                                    onValueChange={(value) =>
                                        setLocalFilters({
                                            ...localFilters,
                                            availability:
                                                value === 'all' ? '' : value,
                                        })
                                    }
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="All Availability" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">
                                            All Books
                                        </SelectItem>
                                        {Object.entries(
                                            statusOptions || {},
                                        ).map(([key, value]) => (
                                            <SelectItem key={key} value={key}>
                                                {value}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={() =>
                                    setLocalFilters({
                                        categories: [],
                                        authors: [],
                                        publishers: [],
                                        availability: '',
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
                                        placeholder={text.placeholder}
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
                                            <SelectItem value="publisher">
                                                Publisher
                                            </SelectItem>
                                            <SelectItem value="categories">
                                                Category
                                            </SelectItem>
                                            <SelectItem value="rating">
                                                Rating
                                            </SelectItem>
                                            <SelectItem value="publication_year">
                                                Publication Year
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
                                                {categoriesOptions?.map(
                                                    (category) => (
                                                        <div
                                                            key={category.id}
                                                            className="flex items-center justify-between"
                                                        >
                                                            <div className="flex flex-1 items-center">
                                                                <Checkbox
                                                                    id={`cat-mobile-${category.id}`}
                                                                    checked={localFilters.categories.includes(
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
                                                                {
                                                                    category.count_of_books
                                                                }
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
                                                    localFilters.authors[0] ||
                                                    'all'
                                                }
                                                onValueChange={(value) => {
                                                    setLocalFilters((prev) => ({
                                                        ...prev,
                                                        authors:
                                                            value === 'all'
                                                                ? []
                                                                : [value],
                                                    }));
                                                }}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="All Authors" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="all">
                                                        All Authors
                                                    </SelectItem>
                                                    {authorsOptions?.map(
                                                        (author) => (
                                                            <SelectItem
                                                                key={author.id}
                                                                value={
                                                                    author.name
                                                                }
                                                            >
                                                                {author.name}
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
                                                value={
                                                    localFilters.availability
                                                }
                                                onValueChange={(value) =>
                                                    setLocalFilters({
                                                        ...localFilters,
                                                        availability: value,
                                                    })
                                                }
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="All Books" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="all">
                                                        All Books
                                                    </SelectItem>
                                                    {Object.entries(
                                                        statusOptions || {},
                                                    ).map(([key, value]) => (
                                                        <SelectItem
                                                            key={key}
                                                            value={key}
                                                        >
                                                            {value}
                                                        </SelectItem>
                                                    ))}
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
                                Showing {start + 1}-{end} of{' '}
                                {resources.meta.total} books
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
                        ) : resources.data.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                    {resources.data.map((book) => (
                                        <BookCard key={book.id} {...book} />
                                    ))}
                                </div>

                                {/* Pagination */}
                                {resources.meta.total >
                                    resources.meta.per_page && (
                                    <Pagination
                                        page={resources.meta.current_page}
                                        total={resources.meta.total}
                                        perPage={resources.meta.per_page}
                                        onPageChange={onPageChange}
                                        onPerPageChange={onPerPageChange}
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
