import { BookProps } from './BooksProps';

export type StockProps = {
    id: number;
    book_id: number;
    total: number;
    available: number;
    loan: number;
    lost: number;
    damaged: number;
    book?: BookProps;
};
