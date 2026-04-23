import { useLanguage } from '@/hooks/useLanguage';
import { FilterType } from '@/types/CatalogPage/CatalogBooksByCategoryPageProps';
import type { InertiaLinkProps } from '@inertiajs/react';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { route } from 'ziggy-js';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function toUrl(url: NonNullable<InertiaLinkProps['href']>): string {
    return typeof url === 'string' ? url : url.url;
}

export const formattedDate = (value: string, language: string) => {
    const date = new Date(value);
    return date.toLocaleDateString(language === 'id' ? 'id-ID' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

export const getBooksRoute = (type: FilterType, attribute: string) => {
    switch (type) {
        case 'category':
            return route('catalog.category.books', { slug: attribute });
        case 'author':
            return route('catalog.author.books', { username: attribute });
        case 'publisher':
            return route('catalog.publisher.books', { slug: attribute });
        default:
            return route('catalog.books');
    }
};
