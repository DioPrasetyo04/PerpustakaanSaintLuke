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
