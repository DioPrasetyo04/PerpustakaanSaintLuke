export type * from './auth';
export type * from './navigation';
export type * from './ui';

export type AnnouncementProps = {
    title: string;
    description: string | null;
    photo: string | null;
    open_time: string;
    close_time: string;
    days: string;
};

export type FlashProps = {
    access_denied?: 'expired' | 'unauthorized' | 'staff';
};

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: import('./auth').User;
    };
    announcement: AnnouncementProps | null;
    flash: FlashProps | null;
    csrfToken: string;
};
