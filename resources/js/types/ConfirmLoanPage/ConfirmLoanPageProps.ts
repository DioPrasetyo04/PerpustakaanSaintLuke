'book';
import type { BookProps } from '../DataTypes/BooksProps';
import type { FineSettingsProps } from '../DataTypes/FineSettingsProps';
import type { LoanPreviewProps } from '../DataTypes/LoanPreviewProps';

export type ConfirmLoanPageProps = {
    book: BookProps;
    fineSettings: FineSettingsProps;
    loanPreview: LoanPreviewProps;
};
