import { catalogAuthors, catalogCategories } from '@/data/data';
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
import Pagination from '@/components/component/Home/Pagination/Pagination';
import { TbCategoryPlus } from 'react-icons/tb';
import { FeaturedCatalogAuthorsProps } from '@/types/CatalogPage/CatalogAuthorProps';
import { AuthorsCard } from '@/components/component/Card/AuthorCard';

const AuthorsPage = () => {
    const { authors, state } = usePage<FeaturedCatalogAuthorsProps>().props;
    const { language } = useLanguage();
    const text = language === 'id' ? catalogAuthors.id : catalogAuthors.en;
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
            route('catalog.authors'),
            {
                search: debounceSearch,
                authors_page: 1,
                authors_load: state.load,
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
            route('catalog.authors'),
            {
                search,
                authors_page: page,
                authors_load: authors.meta.per_page,
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
            route('catalog.authors'),
            {
                search,
                authors_page: 1,
                authors_load: perPage,
                ...sortParams,
            },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    const start = (authors.meta.current_page - 1) * authors.meta.per_page + 1;
    const end = Math.min(
        authors.meta.current_page * authors.meta.per_page,
        authors.meta.total,
    );

    return (
        <div className="min-h-screen bg-background py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <CatalogHeader
                    eyebrow={language === 'id' ? 'Katalog' : 'Catalog'}
                    title={text.title}
                    count={authors.meta.total}
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
                {authors.data.length > 0 ? (
                    <>
                        <CatalogResultMeta
                            start={start}
                            end={end}
                            total={authors.meta.total}
                            language={language}
                            noun={{ id: 'penulis', en: 'authors' }}
                        />
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {authors.data.map((author) => (
                                <AuthorsCard
                                    key={author.id}
                                    {...author}
                                    onHandleAuthorClick={route(
                                        'catalog.author.books',
                                        {
                                            username: author.username,
                                        },
                                    )}
                                />
                            ))}
                        </div>
                        {authors.meta.total > authors.meta.per_page && (
                            <Pagination
                                page={authors.meta.current_page}
                                total={authors.meta.total}
                                perPage={authors.meta.per_page}
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
                                ? 'Penulis Tidak Ditemukan'
                                : 'Authors Not Found'
                        }
                        desc={
                            language === 'id'
                                ? 'Coba gunakan kata kunci lain untuk mencari penulis yang anda inginkan.'
                                : 'Try using different keywords to find the author you want.'
                        }
                    />
                )}
            </div>
        </div>
    );
};

export default AuthorsPage;
