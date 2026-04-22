import { CategoryProps } from './CategoryProps';

export type InformationProps = {
    id: number;
    image: string;
    name: string;
    slug: string;
    description: string;
    categories: CategoryProps[];
    created_at?: string;
    language?: string;
};
