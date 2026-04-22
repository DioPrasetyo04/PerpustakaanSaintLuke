import { AuthorProps } from '../DataTypes/AuthorsProps';
import { Paginated } from '../pagination';

export type FeaturedCatalogAuthorsrops = {
    books: Paginated<AuthorProps>;
    state: {
        page: number;
        load: number;
        search: string;
    };
};
