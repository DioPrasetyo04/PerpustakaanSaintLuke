import { PublisherProps } from '../DataTypes/PublisherProps';
import { Paginated } from '../pagination';

export type FeaturedCatalogPublisherProps = {
    publishers: Paginated<PublisherProps>;
    state: {
        page: number;
        load: number;
        search: string;
    };
};
