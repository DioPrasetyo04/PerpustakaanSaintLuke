import type { SocialMediaProps } from './SocialMediaProps';

export type UserProps = {
    id: number;
    name: string;
    username?: string;
    email: string;
    email_verified_at?: string;
    phone?: string;
    avatar?: string;
    date_of_birth?: string;
    address?: string;
    socialmedia?: SocialMediaProps[];
};
