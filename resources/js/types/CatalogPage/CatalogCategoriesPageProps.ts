import { CategoryProps } from '../DataTypes/CategoryProps';
import { Paginated } from '../pagination';

export type FeaturedCatalogCategoriesProps = {
    categories: Paginated<CategoryProps>;
    state: {
        page: number;
        load: number;
        search: string;
    };
};
