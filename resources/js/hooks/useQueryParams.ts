import { router } from '@inertiajs/react';
export const useQueryParams = () => {
    const updateQuery = (newParams: Record<string, any>) => {
        const params = new URLSearchParams(window.location.search);

        Object.entries(newParams).forEach(([key, value]) => {
            params.set(key, String(value));
        });

        router.get(
            `/?${params.toString()}`,
            {},
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            },
        );
    };

    const createPagination = (prefix: string, perPage: number) => {
        return {
            onPageChange: (page: number) => {
                updateQuery({
                    [`${prefix}_page`]: page,
                    [`${prefix}_load`]: perPage,
                });
            },
            onPerPageChange: (perPage: number) => {
                updateQuery({
                    [`${prefix}_page`]: 1,
                    [`${prefix}_load`]: perPage,
                });
            },
        };
    };

    return { updateQuery, createPagination };
};
