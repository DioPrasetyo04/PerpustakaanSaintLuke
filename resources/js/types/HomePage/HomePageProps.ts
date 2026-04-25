import type {
    BookChartItem,
    BorrowChartItem,
    CategoryChartItem,
    MemberChartItem,
} from './HomeType';
import type { Paginated } from '../pagination';
import type { BookProps } from '../DataTypes/BooksProps';
import type { CategoryProps } from '../DataTypes/CategoryProps';
import type { InformationProps } from '../DataTypes/InformationProps';
export type HomePageProps = {
    data: {
        books: Paginated<BookProps>;
        categories: Paginated<CategoryProps>;
        informations: Paginated<InformationProps>;
        count_of_all_books: number;
        count_of_all_authors: number;
        count_of_all_users: number;
        charts: {
            borrow_chart: BorrowChartItem[];
            book_chart: BookChartItem[];
            category_chart: CategoryChartItem[];
            member_chart: MemberChartItem[];
        };
    };
    state: {
        books: {
            page: number;
            load: number;
            search: string;
        };
        categories: {
            page: number;
            load: number;
            search: string;
        };
        informations: {
            page: number;
            load: number;
            search: string;
        };
    };
};
