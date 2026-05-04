import type { AssetProps } from '../DataTypes/AssetProps';
import type { BookProps } from '../DataTypes/BooksProps';

export type AssetPageProps = {
    book: BookProps;
    assets: AssetProps[];
    totalAssets: number;
};
