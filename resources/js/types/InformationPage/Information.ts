import type { InformationProps } from '../DataTypes/InformationProps';
import type { Paginated } from '../pagination';

export type InformationPageType = {
    informationsData: Paginated<InformationProps>;
    state: {
        search: string;
        page: number;
        load: number;
    };
};
