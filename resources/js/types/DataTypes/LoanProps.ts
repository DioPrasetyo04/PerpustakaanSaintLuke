import type { BookProps } from './BooksProps';
import type { UserProps } from './UserProps';

export type LoanProps = {
    id: number;
    user_id: number;
    book_id: number;
    loan_code: string;
    loan_date: string;
    due_date: string;
    loan_type?: 'physical' | 'digital' | string;
    user?: UserProps;
    book?: BookProps;
};
