import type { InertiaLinkProps } from '@inertiajs/react';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

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

export const moneyFormatter = (value: string | number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(Number(value));
};
