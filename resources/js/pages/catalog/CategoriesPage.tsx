import { catalogCategories } from '@/data/data';
import { useDebounce } from '@/hooks/useDebounce';
import { useLanguage } from '@/hooks/useLanguage';
import { useSearch } from '@/hooks/useSearch';
import { FeaturedCatalogCategoriesProps } from '@/types/CatalogPage/CatalogCategoriesPageProps';
import { router, usePage } from '@inertiajs/react';
import React, { useEffect } from 'react';
import { route } from 'ziggy-js';
import { motion } from 'framer-motion';
import { BiSolidCategory } from 'react-icons/bi';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { CategoriesCard } from '@/components/component/Card/CategoriesCard';
import Pagination from '@/components/component/Home/Pagination/Pagination';
import { TbCategoryPlus } from 'react-icons/tb';

const CategoriesPage = () => {
    const { categories, state } =
        usePage<FeaturedCatalogCategoriesProps>().props;
    const { language } = useLanguage();
    const text =
        language === 'id' ? catalogCategories.id : catalogCategories.en;
    const { search, handleSearchChange } = useSearch({
        defaultValue: state.search || '',
    });

    const debounceSearch = useDebounce(search, 400);

    useEffect(() => {
        router.get(
            route('catalog.categories'),
            {
                search: debounceSearch,
                categories_page: 1,
                categories_load: state.load,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            },
        );
    }, [debounceSearch, state.load]);

    const onPageChange = (page: number) => {
        router.get(
            route('catalog.categories'),
            {
                search,
                categories_page: page,
                categories_load: categories.meta.per_page,
            },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    const onPerPageChange = (perPage: number) => {
        router.get(
            route('catalog.categories'),
            {
                search,
                categories_page: 1,
                categories_load: perPage,
            },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    const start =
        (categories.meta.current_page - 1) * categories.meta.per_page + 1;
    const end = Math.min(
        categories.meta.current_page * categories.meta.per_page,
        categories.meta.total,
    );

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <div className="mb-4 flex items-center gap-4">
                        <div className="rounded-xl bg-primary/10 p-4">
                            <BiSolidCategory className="h-8 w-8 text-primary" />
                        </div>
                        <div>
                            <h1 className="font-['Poppins'] text-3xl font-bold text-gray-900 sm:text-4xl">
                                {`${text.title} (${categories.meta.total})`}
                            </h1>
                            <p className="font-['Poppins'] text-xl font-bold text-gray-900 sm:text-4xl">
                                {`${text.subtitle}`}
                            </p>
                        </div>
                    </div>
                </motion.div>
                <div className="mb-6 rounded-xl bg-white p-4 shadow-sm">
                    <div className="relative">
                        <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                        <Input
                            placeholder={text.placeholder}
                            value={search}
                            onChange={handleSearchChange}
                            className="h-12 pl-11 text-base"
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <p className="text-sm text-gray-600">
                        Showing {start} to {end} of {categories.meta.total}
                        results
                    </p>
                </div>
                {categories.data.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {categories.data.map((category) => (
                                <CategoriesCard
                                    key={category.id}
                                    {...category}
                                />
                            ))}
                        </div>
                        {categories.meta.total > categories.meta.per_page && (
                            <Pagination
                                page={categories.meta.current_page}
                                total={categories.meta.total}
                                perPage={categories.meta.per_page}
                                onPageChange={onPageChange}
                                onPerPageChange={onPerPageChange}
                            />
                        )}
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
                        <TbCategoryPlus className="h-20 w-20 text-primary" />

                        <h3 className="mb-2 text-2xl font-semibold text-gray-900">
                            {language === 'id'
                                ? 'Category Tidak Ditemukan'
                                : 'Categories Not Found'}
                        </h3>
                        <p className="text-xl text-gray-600">
                            {language === 'id'
                                ? 'Coba gunakan kata kunci lain untuk mencari category yang anda inginkan.'
                                : 'Try using different keywords to find the category you want.'}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoriesPage;
