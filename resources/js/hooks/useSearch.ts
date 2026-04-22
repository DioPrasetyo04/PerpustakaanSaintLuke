import { useState, useEffect } from 'react';

type UseSearchOptions = {
    defaultValue?: string;
    paramKey?: string; // nama query param (default: "search")
};

export const useSearch = ({
    defaultValue = '',
    paramKey = 'search',
}: UseSearchOptions = {}) => {
    const getQueryValue = () => {
        if (typeof window === 'undefined') return defaultValue;
        const params = new URLSearchParams(window.location.search);
        return params.get(paramKey) || defaultValue;
    };

    const [search, setSearch] = useState<string>(getQueryValue);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    // Sync ke URL (optional, biar reusable bisa aktif/nonaktif)
    const updateURL = (value: string) => {
        const params = new URLSearchParams(window.location.search);

        if (value) {
            params.set(paramKey, value);
        } else {
            params.delete(paramKey);
        }

        window.history.replaceState(
            {},
            '',
            `${window.location.pathname}?${params}`,
        );
    };

    useEffect(() => {
        updateURL(search);
    }, [search]);

    return {
        search,
        handleSearchChange,
    };
};
