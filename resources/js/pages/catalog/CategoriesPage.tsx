import { catalogCategories } from '@/data/data';
import { useDebounce } from '@/hooks/useDebounce';
import { useLanguage } from '@/hooks/useLanguage';
import { useSearch } from '@/hooks/useSearch';
import { FeaturedCatalogCategoriesProps } from '@/types/CatalogPage/CatalogCategoriesPageProps';
import { router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { route } from 'ziggy-js';
import {
    CatalogHeader,
    CatalogSearch,
    CatalogResultMeta,
    CatalogEmpty,
    SortToggle,
} from '@/components/component/Catalog/CatalogShell';
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

    // Urut nama A–Z (asc) / Z–A (desc). null = ikut urutan default server.
    const [sortDir, setSortDir] = useState<'asc' | 'desc' | null>(null);
    const sortParams = sortDir
        ? { field: 'name', direction: sortDir }
        : {};

    useEffect(() => {
        router.get(
            route('catalog.categories'),
            {
                search: debounceSearch,
                categories_page: 1,
                categories_load: state.load,
                ...sortParams,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            },
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounceSearch, state.load, sortDir]);

    const onPageChange = (page: number) => {
        router.get(
            route('catalog.categories'),
            {
                search,
                categories_page: page,
                categories_load: categories.meta.per_page,
                ...sortParams,
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
                ...sortParams,
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
        <div className="min-h-screen bg-background py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <CatalogHeader
                    eyebrow={language === 'id' ? 'Katalog' : 'Catalog'}
                    title={text.title}
                    count={categories.meta.total}
                    subtitle={text.subtitle}
                />
                <CatalogSearch
                    placeholder={text.placeholder}
                    value={search}
                    onChange={handleSearchChange}
                    trailing={
                        <SortToggle
                            direction={sortDir}
                            onChange={setSortDir}
                            language={language}
                        />
                    }
                />
                {categories.data.length > 0 ? (
                    <>
                        <CatalogResultMeta
                            start={start}
                            end={end}
                            total={categories.meta.total}
                            language={language}
                            noun={{ id: 'kategori', en: 'categories' }}
                        />
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {categories.data.map((category) => (
                                <CategoriesCard
                                    key={category.id}
                                    {...category}
                                    href={route('catalog.category.books', {
                                        slug: category.slug,
                                    })}
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
                    <CatalogEmpty
                        icon={TbCategoryPlus}
                        title={
                            language === 'id'
                                ? 'Kategori Tidak Ditemukan'
                                : 'Categories Not Found'
                        }
                        desc={
                            language === 'id'
                                ? 'Coba gunakan kata kunci lain untuk mencari kategori yang anda inginkan.'
                                : 'Try using different keywords to find the category you want.'
                        }
                    />
                )}
            </div>
        </div>
    );
};

export default CategoriesPage;
