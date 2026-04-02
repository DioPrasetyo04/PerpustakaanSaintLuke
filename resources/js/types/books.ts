export type BookDataProps = {
    id: number;
    book_code: string;
    title: string;
    slug: string;
    publication_year?: number;
    isbn?: string;
    synopsis: string;
    number_of_pages?: number;
    status?: string;
    cover?: string;
    price?: number;
    is_published?: boolean;
    language?: LanguageProps;
    author?: UserProps;
    publisher?: PublisherProps;
    stock?: StockProps;
    assets?: AssetsProps[];
    categories?: CategoryProps[];
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
};

export type LanguageProps = {
    id: number;
    code: string;
    language: string;
    photo?: string;
};

export type UserProps = {
    id: number;
    name: string;
    username: string;
    email: string;
    phone?: string;
    avatar?: string;
    email_verified_at?: string;
    date_of_birth?: string;
    address?: string;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
};

export type PublisherProps = {
    id: number;
    name: string;
    slug: string;
    email: string;
    address: string;
    phone: string;
    logo: string;
    is_active: boolean;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
};

export type StockProps = {
    id: number;
    book_id: number;
    total: number;
    available: number;
    loan: number;
    lost: number;
    damaged: number;
    book?: BookDataProps;
    created_at?: string;
    updated_at?: string;
};

export type AssetsProps = {
    id: number;
    book_id: number;
    type: string;
    utility_path: string;
    book?: BookDataProps;
    created_at?: string;
    updated_at?: string;
};

export type CategoryProps = {
    id: number;
    name: string;
    slug: string;
    icon: string;

    BookOfCategories?: {
        book_id: number;
        category_id: number;
    };

    created_at?: string;
    updated_at?: string;
};
