export type PaginationProps = {
    page: number;
    total: number;
    perPage: number;
    onPageChange: (page: number) => void;
    onPerPageChange: (perPage: number) => void;
};

export type PaginationSelectProps = {
    value: number;
    onChange: (value: number) => void;
};

export type PaginationButtonsProps = {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

export type Paginated<T> = {
    data: T[];
    meta: {
        current_page: number;
        from: number;
        last_page: number;
        per_page: number;
        to: number;
        total: number;
        has_pages: boolean;
    };
    links: {
        next?: string;
        prev?: string;
    };
};
