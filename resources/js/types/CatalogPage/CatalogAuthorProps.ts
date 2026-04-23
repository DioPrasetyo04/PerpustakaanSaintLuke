import { AuthorProps } from '../DataTypes/AuthorsProps';
import { CategoryProps } from '../DataTypes/CategoryProps';
import { Paginated } from '../pagination';

export type FeaturedCatalogAuthorsProps = {
    authors: Paginated<AuthorProps>;
    state: {
        page: number;
        load: number;
        search: string;
    };
};
