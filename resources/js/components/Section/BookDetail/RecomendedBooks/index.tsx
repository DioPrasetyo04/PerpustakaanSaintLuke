import BookCard from '@/components/component/Card/BookCard';
import Pagination from '@/components/component/Home/Pagination/Pagination';
import { useQueryParams } from '@/hooks/useQueryParams';
import { BookProps } from '@/types/DataTypes/BooksProps';
import { Paginated } from '@/types/pagination';
import React from 'react';

type SectionRecomendedBooks = {
    headerSection: string;
    recomendedBooks: Paginated<BookProps>;
};

function SectionRecomended({
    headerSection,
    recomendedBooks,
}: SectionRecomendedBooks) {
    const { createPagination } = useQueryParams();

    const { onPageChange, onPerPageChange } = createPagination(
        'recommended_books_page',
        recomendedBooks.meta.per_page,
    );
    return (
        <div className="mb-12">
            <h2 className="mb-6 font-['Poppins'] text-2xl font-bold text-gray-900 sm:text-3xl">
                {headerSection}
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {recomendedBooks.data.map((recBook) => (
                    <BookCard key={recBook.id} {...recBook} />
                ))}
            </div>
            <Pagination
                page={recomendedBooks.meta.current_page}
                total={recomendedBooks.meta.total}
                perPage={recomendedBooks.meta.per_page}
                onPageChange={onPageChange}
                onPerPageChange={onPerPageChange}
            />
        </div>
    );
}

export default SectionRecomended;
