import type { BookProps } from '../DataTypes/BooksProps';
import type { CategoryProps } from '../DataTypes/CategoryProps';
import type { InformationProps } from '../DataTypes/InformationProps';
import type { Paginated } from '../pagination';

export type FeaturedBookProps = {
    books: Paginated<BookProps>;
    state: {
        page: number;
        load: number;
        search: string;
    };
};

export type FeaturedCategoriesProps = {
    categories: Paginated<CategoryProps>;
    state: {
        page: number;
        load: number;
        search: string;
    };
};

export type FeaturedInformationProps = {
    informations: Paginated<InformationProps>;
    state: {
        page: number;
        load: number;
        search: string;
    };
};
