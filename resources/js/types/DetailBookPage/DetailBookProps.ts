import type { BookProps } from '../DataTypes/BooksProps';
import type { ReviewsProps } from '../DataTypes/ReviewsProps';
import type { Paginated } from '../pagination';

export type DetailBookProps = {
    book: BookProps;
    recomendedBooks: Paginated<BookProps>;
    reviews: Paginated<ReviewsProps>;
    state: {
        recomended_books_page: number;
        recomended_books_load: number;
        review_books_page: number;
        review_books_load: number;
    };
};
