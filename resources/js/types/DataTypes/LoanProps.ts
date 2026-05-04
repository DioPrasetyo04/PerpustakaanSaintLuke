import type { BookProps } from './BooksProps';
import type { UserProps } from './UserProps';

export type LoanProps = {
    id: number;
    user_id: number;
    book_id: number;
    loan_date: string;
    due_date: string;
    user?: UserProps;
    book?: BookProps;
};
