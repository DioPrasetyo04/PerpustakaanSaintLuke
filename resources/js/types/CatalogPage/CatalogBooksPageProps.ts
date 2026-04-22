import { AuthorProps } from '../DataTypes/AuthorsProps';
import { BookProps } from '../DataTypes/BooksProps';
import { CategoryProps } from '../DataTypes/CategoryProps';
import { Paginated } from '../pagination';

export type FeaturedCatalogBooksProps = {
    books: Paginated<BookProps>;
    state: {
        page: number;
        load: number;
        search: string;
    };
};
