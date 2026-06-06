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
import { FeaturedCatalogPublisherProps } from '@/types/CatalogPage/CatalogPublisherPageProps';
import { catalogPublishers } from '@/data/data';
import { PublisherCard } from '@/components/component/Card/PublisherCard';

const PublishersPage = () => {
    const { publishers, state } =
        usePage<FeaturedCatalogPublisherProps>().props;
    const { language } = useLanguage();
    const text =
        language === 'id' ? catalogPublishers.id : catalogPublishers.en;
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
            route('catalog.publishers'),
            {
                search: debounceSearch,
                publishers_page: 1,
                publishers_load: state.load,
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
            route('catalog.publishers'),
            {
                search,
                publishers_page: page,
                publishers_load: publishers.meta.per_page,
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
            route('catalog.publishers'),
            {
                search,
                publishers_page: 1,
                publishers_load: perPage,
                ...sortParams,
            },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    const start =
        (publishers.meta.current_page - 1) * publishers.meta.per_page + 1;
    const end = Math.min(
        publishers.meta.current_page * publishers.meta.per_page,
        publishers.meta.total,
    );

    return (
        <div className="min-h-screen bg-background py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <CatalogHeader
                    eyebrow={language === 'id' ? 'Katalog' : 'Catalog'}
                    title={text.title}
                    count={publishers.meta.total}
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
                {publishers.data.length > 0 ? (
                    <>
                        <CatalogResultMeta
                            start={start}
                            end={end}
                            total={publishers.meta.total}
                            language={language}
                            noun={{ id: 'penerbit', en: 'publishers' }}
                        />
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {publishers.data.map((publisher) => (
                                <PublisherCard
                                    key={publisher.id}
                                    {...publisher}
                                    onHandlePublisherClick={route(
                                        'catalog.publisher.books',
                                        {
                                            slug: publisher.slug,
                                        },
                                    )}
                                />
                            ))}
                        </div>
                        {publishers.meta.total > publishers.meta.per_page && (
                            <Pagination
                                page={publishers.meta.current_page}
                                total={publishers.meta.total}
                                perPage={publishers.meta.per_page}
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
                                ? 'Penerbit Tidak Ditemukan'
                                : 'Publishers Not Found'
                        }
                        desc={
                            language === 'id'
                                ? 'Coba gunakan kata kunci lain untuk mencari penerbit yang anda inginkan.'
                                : 'Try using different keywords to find the publisher you want.'
                        }
                    />
                )}
            </div>
        </div>
    );
};

export default PublishersPage;
