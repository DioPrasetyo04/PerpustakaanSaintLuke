import { BookProps } from '../DataTypes/BooksProps';
import { CategoryProps } from '../DataTypes/CategoryProps';
import { InformationProps } from '../DataTypes/InformationProps';
import { Paginated } from '../pagination';

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
