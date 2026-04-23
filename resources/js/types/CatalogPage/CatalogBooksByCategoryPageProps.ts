import { BookProps } from '../DataTypes/BooksProps';
import { Paginated } from '../pagination';
export type FilterType = 'category' | 'author' | 'publisher';
export type BooksByFilterPageProps = {
    books: Paginated<BookProps>;
    state: {
        page: number;
        load: number;
        search: string;
    };
    type: FilterType;
    slug: string;
};
