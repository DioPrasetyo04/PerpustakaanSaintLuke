import type {
    BookChartItem,
    VisitorChartItem,
    CategoryChartItem,
    MemberChartItem,
} from './HomeType';
import type { Paginated } from '../pagination';
import type { BookProps } from '../DataTypes/BooksProps';
import type { CategoryProps } from '../DataTypes/CategoryProps';
import type { InformationProps } from '../DataTypes/InformationProps';

export type LiveActivity = {
    id: number;
    name: string;
    status: 'borrowed' | 'returned';
    title: string;
    slug: string | null;
    cover: string | null;
    date: string | null;
};

export type FeaturedPublisher = {
    id: number;
    name: string;
    slug: string;
    logo: string | null;
    books_count: number;
};

export type Testimonial = {
    id: number;
    name: string;
    slug: string;
    role: string | null;
    description: string | null;
    video_url: string | null;
    thumbnail_url: string | null;
};

export type HomePageProps = {
    data: {
        books: Paginated<BookProps>;
        categories: Paginated<CategoryProps>;
        informations: Paginated<InformationProps>;
        live_activities: LiveActivity[];
        publishers: FeaturedPublisher[];
        testimonials: Testimonial[];
        count_of_all_books: number;
        count_of_all_visitors: number;
        count_of_all_users: number;
        charts: {
            visitor_chart: VisitorChartItem[];
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
