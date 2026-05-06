import type { AssetProps } from '../DataTypes/AssetProps';
import type { BookProps } from '../DataTypes/BooksProps';
import type { LoanProps } from '../DataTypes/LoanProps';

export type AssetPageProps = {
    book: BookProps;
    assets: AssetProps[];
    loan: LoanProps;
    totalAssets: number;
};
