import { PaginationButtonsProps } from '@/types/pagination';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

/** Build a windowed page list with ellipsis: 1 … 4 5 [6] 7 8 … 20 */
const buildPages = (page: number, totalPages: number): (number | '…')[] => {
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages: (number | '…')[] = [1];
    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);
    if (start > 2) pages.push('…');
    for (let p = start; p <= end; p++) pages.push(p);
    if (end < totalPages - 1) pages.push('…');
    pages.push(totalPages);
    return pages;
};

const arrowClass =
    'flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition-all duration-300 hover:border-brand hover:text-brand disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/10 dark:bg-white/5 dark:text-gray-300 dark:hover:border-brand dark:hover:text-brand';

const PaginationButtons = ({
    page,
    totalPages,
    onPageChange,
}: PaginationButtonsProps) => {
    const pages = buildPages(page, totalPages);

    return (
        <nav
            aria-label="Pagination"
            className="flex items-center gap-1.5"
        >
            <button
                type="button"
                aria-label="Previous page"
                disabled={page === 1}
                onClick={() => onPageChange(page - 1)}
                className={arrowClass}
            >
                <ChevronLeft className="h-4 w-4" />
            </button>

            {pages.map((p, i) =>
                p === '…' ? (
                    <span
                        key={`ellipsis-${i}`}
                        className="px-1.5 text-sm text-gray-400 dark:text-gray-500"
                    >
                        …
                    </span>
                ) : (
                    <button
                        key={p}
                        type="button"
                        aria-current={page === p ? 'page' : undefined}
                        onClick={() => onPageChange(p)}
                        className={cn(
                            'flex h-9 min-w-9 items-center justify-center rounded-full px-3 text-sm font-medium transition-all duration-300',
                            page === p
                                ? 'bg-brand text-brand-foreground shadow-sm'
                                : 'border border-gray-200 bg-white text-gray-600 hover:border-brand hover:text-brand dark:border-white/10 dark:bg-white/5 dark:text-gray-300 dark:hover:border-brand dark:hover:text-brand',
                        )}
                    >
                        {p}
                    </button>
                ),
            )}

            <button
                type="button"
                aria-label="Next page"
                disabled={page === totalPages}
                onClick={() => onPageChange(page + 1)}
                className={arrowClass}
            >
                <ChevronRight className="h-4 w-4" />
            </button>
        </nav>
    );
};

export default PaginationButtons;
