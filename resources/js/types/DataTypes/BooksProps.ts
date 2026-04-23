import { AuthorProps } from './AuthorsProps';
import { CategoryProps } from './CategoryProps';
import { LanguageProps } from './LanguageProps';
import { PublisherProps } from './PublisherProps';

export type BookProps = {
    id: number;
    title: string;
    slug: string;
    cover: string;
    book_code: string;
    status: string;
    is_published: boolean;
    publisher: PublisherProps;
    language: LanguageProps;
    authors: AuthorProps[];
    categories: CategoryProps[];
    synopsis?: string;
    price?: number;
    avg_rating?: number;
    publication_year?: number;
};
