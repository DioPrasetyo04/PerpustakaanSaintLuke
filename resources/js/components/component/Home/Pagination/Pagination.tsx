import { PaginationProps } from '@/types/pagination';
import PaginationSelect from './PaginationSelect';
import PaginationButtons from './PaginationButtons';

const Pagination = ({
    page,
    total,
    perPage,
    onPageChange,
    onPerPageChange,
}: PaginationProps) => {
    const totalPages = Math.ceil(total / perPage);

    const start = total === 0 ? 0 : (page - 1) * perPage + 1;
    const end = Math.min(page * perPage, total);

    return (
        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-6 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{start}</span> to{' '}
                <span className="font-semibold text-foreground">{end}</span> of{' '}
                <span className="font-semibold text-foreground">{total}</span> results
            </p>

            <div className="flex flex-wrap items-center justify-between gap-4 sm:justify-end sm:gap-6">
                <PaginationSelect value={perPage} onChange={onPerPageChange} />
                <PaginationButtons
                    page={page}
                    totalPages={totalPages}
                    onPageChange={onPageChange}
                />
            </div>
        </div>
    );
};

export default Pagination;
