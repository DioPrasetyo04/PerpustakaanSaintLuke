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

export const formattedDate = (value: string | undefined, language: string) => {
    const date = new Date(value ?? '');
    return date.toLocaleDateString(language === 'id' ? 'id-ID' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

export const formattedRating = (
    value?: number | string,
    decimals: number = 1,
) => {
    const num = Number(value);
    return !isNaN(num) ? num.toFixed(decimals) : '0.0';
};

export const formattedYear = (value: string | number, language: string) => {
    const date = new Date(value);
    return date.toLocaleDateString(language === 'id' ? 'id-ID' : 'en-US', {
        year: 'numeric',
    });
};
