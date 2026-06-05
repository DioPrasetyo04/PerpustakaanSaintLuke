import { BookProps } from '../DataTypes/BooksProps';
import { Paginated } from '../pagination';

export type CatalogCategoryOption = {
    id: number;
    name: string;
    icon?: string | null;
    count_of_books?: number;
};

export type CatalogAuthorOption = {
    id: number;
    name: string;
};

export type CatalogPublisherOption = {
    id: number;
    name: string;
    logo?: string | null;
};

export type CatalogTypeOption = {
    id: number;
    type: string;
    icon?: string | null;
};

export type CatalogFilters = {
    search: string;
    categories: string[];
    authors: string[];
    publishers: string[];
    types: string[];
    attachments: string[];
    availability: string;
    yearMin: number | null;
    yearMax: number | null;
    field: string;
    direction: string;
};

export type CatalogOptions = {
    statusOptions: Record<string, string>;
    categories: CatalogCategoryOption[];
    authors: CatalogAuthorOption[];
    publishers: CatalogPublisherOption[];
    types: CatalogTypeOption[];
    attachments: string[];
    yearBounds: { min: number; max: number };
};

export type FeaturedCatalogBooksProps = {
    books: Paginated<BookProps>;
    state: {
        page: number;
        load: number;
        search: string;
    };
    filters: CatalogFilters;
    options: CatalogOptions;
};
