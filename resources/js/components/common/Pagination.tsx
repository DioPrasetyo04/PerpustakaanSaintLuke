import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export function Pagination({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationProps) {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    const getVisiblePages = () => {
        if (totalPages <= 5) return pages;
        if (currentPage <= 3) return pages.slice(0, 5);
        if (currentPage >= totalPages - 2) return pages.slice(totalPages - 5);
        return pages.slice(currentPage - 3, currentPage + 2);
    };

    const visiblePages = getVisiblePages();

    return (
        <div className="mt-8 flex items-center justify-center gap-2">
            <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="gap-1"
            >
                <ChevronLeft className="h-4 w-4" />
                Previous
            </Button>

            {currentPage > 3 && totalPages > 5 && (
                <>
                    <Button
                        variant={currentPage === 1 ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => onPageChange(1)}
                        className="w-10"
                    >
                        1
                    </Button>
                    {currentPage > 4 && (
                        <span className="text-muted-foreground">...</span>
                    )}
                </>
            )}

            {visiblePages.map((page) => (
                <Button
                    key={page}
                    variant={currentPage === page ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => onPageChange(page)}
                    className={`w-10 ${currentPage === page ? 'bg-primary' : ''}`}
                >
                    {page}
                </Button>
            ))}

            {currentPage < totalPages - 2 && totalPages > 5 && (
                <>
                    {currentPage < totalPages - 3 && (
                        <span className="text-muted-foreground">...</span>
                    )}
                    <Button
                        variant={
                            currentPage === totalPages ? 'default' : 'outline'
                        }
                        size="sm"
                        onClick={() => onPageChange(totalPages)}
                        className="w-10"
                    >
                        {totalPages}
                    </Button>
                </>
            )}

            <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="gap-1"
            >
                Next
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
    );
}
