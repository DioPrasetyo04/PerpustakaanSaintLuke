import { BookProps } from '../DataTypes/BooksProps';
import { Paginated } from '../pagination';

type AvailabilityType =
    | 'Tersedia'
    | 'Tidak Tersedia'
    | 'Dipinjam'
    | 'Hilang'
    | 'Rusak';

export type ResourceFilterPageProps = {
    resources: Paginated<BookProps>;
    filters?: {
        search?: string;
        categories?: string[];
        authors?: string[];
        publishers?: string[];
        availability?: AvailabilityType;
        field?: string;
        direction?: string;
    };
    statusOptions?: Record<string, string>;
    authorsOptions?: {
        id: number;
        name: string;
        uasername?: string;
        avatar?: string;
    }[];
    categoriesOptions?: {
        id: number;
        name: string;
        slug?: string;
        icon?: string;
        count_of_books?: number;
    }[];
    publishersOptions?: {
        id: number;
        name: string;
        logo?: string;
        slug?: string;
    }[];
};
