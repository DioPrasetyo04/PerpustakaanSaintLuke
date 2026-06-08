import type {
    SocialMediaPlatform,
    SocialMediaProps,
} from './SocialMediaProps';

export type { SocialMediaPlatform };
/** @deprecated gunakan {@link SocialMediaProps} */
export type AuthorSocialMediaProps = SocialMediaProps;

export type AuthorProps = {
    id: number;
    name: string;
    username: string;
    avatar: string;
    count_of_books?: number;
    socialmedia?: SocialMediaProps[];
};
