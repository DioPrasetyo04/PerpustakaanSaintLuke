import { Paginated } from '@/types/pagination';

export type DashboardStats = {
    currentlyBorrowed: number;
    booksRead: number;
    dueSoon: number;
    totalFines: number;
    fineCount: number;
};

export type ChartDataPoint = {
    day: string;
    total: number;
};

export type DashboardCharts = {
    borrowing: ChartDataPoint[];
    returning: ChartDataPoint[];
    finePayment: ChartDataPoint[];
};

export type LoanBook = {
    id: number;
    loan_code: string;
    loan_date: string;
    due_date: string;
    days_left: number;
    deadline_status: 'Overdue' | 'danger' | 'warning' | 'safe';
    book: {
        id: number;
        title: string;
        slug: string;
        cover: string | null;
        reviews_avg_rating: number | null;
        authors: { id: number; name: string; username: string }[];
        categories: { id: number; name: string }[];
        publisher: { id: number; name: string } | null;
    };
};

export type ReturnBookItem = {
    id: number;
    return_book_code: string;
    return_date: string;
    status: string;
    return_status_label: string;
    return_status_color: 'danger' | 'safe';
    has_fine: boolean;
    fine_amount: number | null;
    payment_status: string | null;
    loan: {
        id: number;
        loan_code: string;
        loan_date: string;
        due_date: string;
    };
    book: {
        id: number;
        title: string;
        slug: string;
        cover: string | null;
        reviews_avg_rating: number | null;
        authors: { id: number; name: string; username: string }[];
        categories: { id: number; name: string }[];
        publisher: { id: number; name: string } | null;
    };
};

export type DashboardFilters = {
    sortBy: string;
    status: string;
    category: string;
    dateRange: string;
};

export type DashboardPageProps = {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
            avatar: string | null;
        };
    };
    stats: DashboardStats;
    charts: DashboardCharts;
    loans: Paginated<LoanBook>;
    returnBooks: Paginated<ReturnBookItem>;
    categories: string[];
    filters: DashboardFilters;
    activeTab: 'borrowed' | 'returned';
};
