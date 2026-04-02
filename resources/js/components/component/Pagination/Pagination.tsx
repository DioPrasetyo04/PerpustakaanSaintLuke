import { PaginationProps } from '@/types/pagination';
import React from 'react';
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

    const start = (page - 1) * perPage + 1;
    const end = Math.min(page * perPage, total);
    return (
        <div className="mt-10 flex flex-col gap-4 border-t pt-6 md:flex-row md:items-center md:justify-between">
            {/* showing text */}
            <p className="text-sm text-gray-600">
                Showing <span className="font-semibold">{start}</span> to{' '}
                <span className="font-semibold">{end}</span> of{' '}
                <span className="font-semibold">{total}</span> results
            </p>

            <div className="flex items-center gap-6">
                {/* rows per page */}
                <PaginationSelect value={perPage} onChange={onPerPageChange} />

                {/* buttons */}
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
