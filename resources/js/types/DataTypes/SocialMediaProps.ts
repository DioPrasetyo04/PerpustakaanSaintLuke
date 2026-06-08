export type SocialMediaPlatform =
    | 'instagram'
    | 'facebook'
    | 'twitter'
    | 'tiktok'
    | 'whatsapp'
    | 'linkedin'
    | 'gmail';

export type SocialMediaProps = {
    id: number;
    platform: SocialMediaPlatform;
    url: string;
    username?: string | null;
};
