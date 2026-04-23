import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/useLanguage';
import {
    BooksByFilterPageProps,
    FilterType,
} from '@/types/CatalogPage/CatalogBooksByCategoryPageProps';
import { router, usePage } from '@inertiajs/react';
import { ArrowLeft, BookOpenCheck, Search, UserPen } from 'lucide-react';
import { route } from 'ziggy-js';
import { GiBookshelf } from 'react-icons/gi';
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { useSearch } from '@/hooks/useSearch';
import { useDebounce } from '@/hooks/useDebounce';
import BookCard from '@/components/component/Card/BookCard';
import Pagination from '@/components/component/Home/Pagination/Pagination';

const BooksByFilterPage = () => {
    const { books, state, type, slug } =
        usePage<BooksByFilterPageProps>().props;
    const { language } = useLanguage();

    const { search, handleSearchChange } = useSearch({
        defaultValue: state.search || '',
    });

    const debounceSearch = useDebounce(search, 400);

    const getBooksRoute = (type: FilterType, attribute: string) => {
        switch (type) {
            case 'category':
                return route('catalog.category.books', { slug: attribute });
            case 'author':
                return route('catalog.author.books', { username: attribute });
            case 'publisher':
                return route('catalog.publisher.books', { slug: attribute });
            default:
                return route('catalog.books');
        }
    };

    const titleMap: Record<typeof type, string> = {
        category: language === 'id' ? 'Kategori' : 'Category',
        author: language === 'id' ? 'Penulis' : 'Author',
        publisher: language === 'id' ? 'Penerbit' : 'Publisher',
    };

    const iconMap: Record<typeof type, React.ElementType> = {
        category: GiBookshelf,
        author: UserPen,
        publisher: BookOpenCheck,
    };

    const Icon = iconMap[type];

    const backRouteMap: Record<typeof type, string> = {
        category: route('catalog.categories'),
        author: route('catalog.authors'),
        publisher: route('catalog.publishers'),
    };

    useEffect(() => {
        router.get(
            getBooksRoute(type, slug),
            {
                search: debounceSearch,
                page: 1,
                load: state.load,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            },
        );
    }, [debounceSearch, state.load, type, slug]);

    const onPageChange = (page: number) => {
        router.get(
            getBooksRoute(type, slug),
            {
                search,
                page,
                books_load: books.meta.per_page,
            },
            {
                preserveState: true,
            },
        );
    };

    const onPerPageChange = (perPage: number) => {
        router.get(
            getBooksRoute(type, slug),
            {
                search,
                page: 1,
                load: perPage,
            },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    return (
        <>
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <Button
                            variant="ghost"
                            onClick={() => router.get(backRouteMap[type])}
                            className="mb-4 hover:bg-primary/10"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />{' '}
                            {type === 'category' &&
                                (language === 'id'
                                    ? 'Kembali Ke Menu Kategori'
                                    : 'Back To Categories')}
                            {type === 'author' &&
                                (language === 'id'
                                    ? 'Kembali Ke Menu Penulis'
                                    : 'Back To Authors')}
                            {type === 'publisher' &&
                                (language === 'id'
                                    ? 'Kembali Ke Menu Penerbit'
                                    : 'Back To Publishers')}
                        </Button>
                        <div className="mb-4 flex items-center gap-4">
                            <div className="rounded-xl bg-primary/10 p-4">
                                <Icon className="h-12 w-12 text-primary" />
                            </div>
                            <div>
                                <h1 className="font-['Poppins'] text-3xl font-bold text-gray-900 sm:text-4xl">
                                    {titleMap[type]} Books
                                </h1>
                                <p className="text-gray-600">
                                    {books.meta.total} books found
                                </p>
                            </div>
                        </div>
                    </motion.div>
                    <div className="mb-6 rounded-xl bg-white p-4 shadow-sm">
                        <div className="relative">
                            <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                            <Input
                                placeholder={
                                    language === 'id'
                                        ? 'Cari Buku...'
                                        : 'Search Books...'
                                }
                                value={search}
                                onChange={handleSearchChange}
                                className="h-12 pl-11 text-base"
                            />
                        </div>
                    </div>
                    {/* LIST */}
                    {books.data.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                                {books.data.map((book) => (
                                    <BookCard key={book.id} {...book} />
                                ))}
                            </div>

                            {books.meta.total > books.meta.per_page && (
                                <Pagination
                                    page={books.meta.current_page}
                                    total={books.meta.total}
                                    perPage={books.meta.per_page}
                                    onPageChange={onPageChange}
                                    onPerPageChange={onPerPageChange}
                                />
                            )}
                        </>
                    ) : (
                        <div className="py-16 text-center">No books found</div>
                    )}
                </div>
            </div>
        </>
    );
};

export default BooksByFilterPage;
