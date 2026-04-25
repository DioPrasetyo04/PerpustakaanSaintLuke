import { UserProps } from './UserProps';

export type ReviewsProps = {
    id: number;
    rating: number;
    comment: string;
    created_at: string;
    user?: UserProps;
};
