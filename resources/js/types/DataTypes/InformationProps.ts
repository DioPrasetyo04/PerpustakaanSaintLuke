import type { CategoryProps } from './CategoryProps';

export type InformationProps = {
    index?: number;
    id: number;
    image?: string;
    name: string;
    slug: string;
    description: string;
    category: CategoryProps;
    created_at?: string;
    language?: string;
};
