import type { AuthorProps } from './AuthorsProps';
import type { CategoryProps } from './CategoryProps';
import type { LanguageProps } from './LanguageProps';
import { LoanProps } from './LoanProps';
import type { PublisherProps } from './PublisherProps';
import type { StockProps } from './StockProps';

export type BookStatus =
    | 'Tersedia'
    | 'Tidak Tersedia'
    | 'Dipinjam'
    | 'Hilang'
    | 'Rusak';

export type BookFormat = 'digital' | 'fisik';

export type BookTypeProps = {
    id: number;
    type: BookFormat;
};

export type BookProps = {
    id: number;
    title: string;
    slug: string;
    cover: string;
    number_of_pages: number;
    isbn: string;
    book_code: string;
    status: BookStatus;
    is_published: boolean;
    publisher: PublisherProps;
    language: LanguageProps;
    authors: AuthorProps[];
    categories: CategoryProps[];
    types?: BookTypeProps[];
    synopsis?: string;
    price?: number;
    avg_rating?: number;
    publication_year?: number;
    stock?: StockProps;
    loan?: LoanProps[];
};
