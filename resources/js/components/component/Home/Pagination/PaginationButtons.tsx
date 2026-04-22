import { PaginationButtonsProps } from '@/types/pagination';
import React from 'react';

const PaginationButtons = ({
    page,
    totalPages,
    onPageChange,
}: PaginationButtonsProps) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    return (
        <div className="flex items-center gap-1">
            {/* prev */}
            <button
                disabled={page === 1}
                onClick={() => onPageChange(page - 1)}
                className="rounded-md border border-black bg-amber-500 px-3 py-2 text-sm text-black disabled:opacity-50"
            >
                Previous
            </button>

            {/* numbers */}
            {pages.map((p) => (
                <button
                    key={p}
                    onClick={() => onPageChange(p)}
                    className={`rounded-md px-3 py-2 text-sm ${
                        page === p
                            ? 'border bg-red-500 text-black'
                            : 'border text-black'
                    }`}
                >
                    {p}
                </button>
            ))}

            {/* next */}
            <button
                disabled={page === totalPages}
                onClick={() => onPageChange(page + 1)}
                className="rounded-md border border-black bg-amber-500 px-3 py-2 text-sm text-black disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
};

export default PaginationButtons;
