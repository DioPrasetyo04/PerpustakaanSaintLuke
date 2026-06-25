import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
    Search,
    Bookmark,
    BookOpen,
    RefreshCw,
    DollarSign,
    CreditCard,
    CheckCircle,
    Clock,
    XCircle,
    Eye,
    Trash2,
    Star,
    AlertCircle,
    Wallet,
    TrendingUp,
    Calendar,
} from 'lucide-react';
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import { Link, router, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import Pagination from '@/components/component/Home/Pagination/Pagination';
import Notification from '@/components/component/Notification/Notification';
import ConfirmDialog from '@/components/component/Notification/ConfirmDialog';
import { useDebounce } from '@/hooks/useDebounce';
import { useSearch } from '@/hooks/useSearch';
import { Paginated } from '@/types/pagination';
import { PageProps } from '@/types';
import { payFine } from '@/lib/midtrans';

type TabId = 'bookmarks' | 'loans' | 'returns' | 'fines';

type BookmarkItem = {
    id: string;
    book_id: number;
    book_title: string;
    slug: string;
    author: string;
    category: string | null;
    cover_url: string | null;
    date_bookmarked: string | null;
    available: boolean;
    rating: number;
};

type LoanItem = {
    id: string;
    loan_code: string;
    book_title: string;
    slug: string;
    author: string;
    cover_url: string | null;
    borrow_date: string;
    due_date: string;
    status: 'active' | 'overdue';
};

type ReturnItem = {
    id: string;
    return_book_code: string;
    book_title: string;
    slug: string;
    author: string;
    cover_url: string | null;
    borrow_date: string | null;
    return_date: string | null;
    due_date: string | null;
    condition: string | null;
    notes: string | null;
    status: 'on-time' | 'late';
    loan_code?: string;
    loan_status?: string;
    fine?: {
        id: string;
        order_id: string | null;
        late_fee: number;
        other_fee: number;
        total_fee: number;
        status: 'paid' | 'unpaid';
        payment_status: string | null;
    } | null;
    review?: {
        rating: number;
        comment: string | null;
    } | null;
};

type FineItem = {
    id: string;
    order_id: string | null;
    book_title: string;
    slug: string;
    author: string;
    cover_url: string | null;
    borrow_date: string | null;
    due_date: string | null;
    return_date: string | null;
    days_overdue: number;
    fine_amount: number;
    late_fee: number;
    other_fee: number;
    status: 'paid' | 'unpaid';
    payment_status: string | null;
    condition?: string | null;
    notes?: string | null;
    return_book_code?: string | null;
    return_status?: 'on-time' | 'late';
};

type TabFilters = {
    search: string | null;
    status: string | null;
    page: number;
    per_page: number;
};

type TrendPoint = { label: string; total: number };

type BookmarkStats = {
    total: number;
    available: number;
    borrowed: number;
    avg_rating: number;
    by_category: TrendPoint[];
};

type LoanStats = {
    total: number;
    active: number;
    overdue: number;
    trend: TrendPoint[];
};

type ReturnStats = {
    total: number;
    on_time: number;
    late: number;
    trend: TrendPoint[];
};

type FineStats = {
    total: number;
    total_amount: number;
    paid_amount: number;
    unpaid_amount: number;
    unpaid_count: number;
    trend: TrendPoint[];
};

type HistoryStats = {
    bookmarks: BookmarkStats;
    loans: LoanStats;
    returns: ReturnStats;
    fines: FineStats;
};

type HistoryPageProps = PageProps<{
    activeTab: TabId;
    stats: HistoryStats;
    bookmarks: Paginated<BookmarkItem>;
    loans: Paginated<LoanItem>;
    returns: Paginated<ReturnItem>;
    fines: Paginated<FineItem>;
    filters: {
        bookmarks: TabFilters;
        loans: TabFilters;
        returns: TabFilters;
        fines: TabFilters;
    };
}>;

const TAB_CONFIG: Array<{ id: TabId; label: string; icon: typeof Bookmark }> = [
    { id: 'bookmarks', label: 'Bookmarked Books', icon: Bookmark },
    { id: 'loans', label: 'Loan History', icon: BookOpen },
    { id: 'returns', label: 'Return History', icon: RefreshCw },
    { id: 'fines', label: 'Fines History', icon: DollarSign },
];

const formatDate = (value: string | null | undefined) => {
    if (!value) return '-';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString();
};

const getInitialTabFromUrl = (fallback: TabId): TabId => {
    if (typeof window === 'undefined') return fallback;
    const params = new URLSearchParams(window.location.search);
    const tab = params.get('tab') as TabId | null;
    if (tab && ['bookmarks', 'loans', 'returns', 'fines'].includes(tab)) {
        return tab;
    }
    return fallback;
};

export default function HistoryPage() {
    const { props } = usePage<HistoryPageProps>();
    const { bookmarks, loans, returns, fines, filters, stats } = props;

    const [activeTab, setActiveTab] = useState<TabId>(() =>
        getInitialTabFromUrl(props.activeTab ?? 'bookmarks'),
    );

    const [selectedFine, setSelectedFine] = useState<FineItem | null>(null);
    const [selectedReturn, setSelectedReturn] = useState<ReturnItem | null>(null);

    // Per-tab search inputs (each preserved in URL via useSearch hook).
    const bookmarksSearchState = useSearch({
        paramKey: 'bookmarks_search',
        defaultValue: filters.bookmarks.search ?? '',
    });
    const loansSearchState = useSearch({
        paramKey: 'loans_search',
        defaultValue: filters.loans.search ?? '',
    });
    const returnsSearchState = useSearch({
        paramKey: 'returns_search',
        defaultValue: filters.returns.search ?? '',
    });
    const finesSearchState = useSearch({
        paramKey: 'fines_search',
        defaultValue: filters.fines.search ?? '',
    });

    const [bookmarksStatus, setBookmarksStatus] = useState<string>(
        filters.bookmarks.status ?? 'all',
    );
    const [loansStatus, setLoansStatus] = useState<string>(
        filters.loans.status ?? 'all',
    );
    const [returnsStatus, setReturnsStatus] = useState<string>(
        filters.returns.status ?? 'all',
    );
    const [finesStatus, setFinesStatus] = useState<string>(
        filters.fines.status ?? 'all',
    );

    const debouncedBookmarksSearch = useDebounce(bookmarksSearchState.search, 400);
    const debouncedLoansSearch = useDebounce(loansSearchState.search, 400);
    const debouncedReturnsSearch = useDebounce(returnsSearchState.search, 400);
    const debouncedFinesSearch = useDebounce(finesSearchState.search, 400);

    // Skip first-render Inertia visits per tab (data already comes from props).
    const skipFirstBookmarks = useRef(true);
    const skipFirstLoans = useRef(true);
    const skipFirstReturns = useRef(true);
    const skipFirstFines = useRef(true);

    // Reload a specific tab through Inertia with current per-tab params,
    // preserving other tabs' URL state.
    const reloadTab = (
        tab: TabId,
        overrides: Partial<Record<string, string | number | null>> = {},
    ) => {
        const baseParams = new URLSearchParams(window.location.search);
        const allParams: Record<string, string | number> = {};
        baseParams.forEach((value, key) => {
            if (value !== '' && value !== null && value !== undefined) {
                allParams[key] = value;
            }
        });

        Object.entries(overrides).forEach(([key, value]) => {
            if (value === null || value === undefined || value === '' || value === 'all') {
                delete allParams[key];
            } else {
                allParams[key] = value as string | number;
            }
        });

        router.get(route('history.index'), allParams, {
            only: [tab],
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    // Effects: when search or status changes for the active tab, reload only that tab.
    useEffect(() => {
        if (skipFirstBookmarks.current) {
            skipFirstBookmarks.current = false;
            return;
        }
        reloadTab('bookmarks', {
            bookmarks_search: debouncedBookmarksSearch || null,
            bookmarks_status: bookmarksStatus,
            bookmarks_page: 1,
            bookmarks_per_page: bookmarks.meta.per_page,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedBookmarksSearch, bookmarksStatus]);

    useEffect(() => {
        if (skipFirstLoans.current) {
            skipFirstLoans.current = false;
            return;
        }
        reloadTab('loans', {
            loans_search: debouncedLoansSearch || null,
            loans_status: loansStatus,
            loans_page: 1,
            loans_per_page: loans.meta.per_page,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedLoansSearch, loansStatus]);

    useEffect(() => {
        if (skipFirstReturns.current) {
            skipFirstReturns.current = false;
            return;
        }
        reloadTab('returns', {
            returns_search: debouncedReturnsSearch || null,
            returns_status: returnsStatus,
            returns_page: 1,
            returns_per_page: returns.meta.per_page,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedReturnsSearch, returnsStatus]);

    useEffect(() => {
        if (skipFirstFines.current) {
            skipFirstFines.current = false;
            return;
        }
        reloadTab('fines', {
            fines_search: debouncedFinesSearch || null,
            fines_status: finesStatus,
            fines_page: 1,
            fines_per_page: fines.meta.per_page,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedFinesSearch, finesStatus]);

    const switchTab = (tab: TabId) => {
        setActiveTab(tab);
        const params = new URLSearchParams(window.location.search);
        params.set('tab', tab);
        window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
    };

    const tabPayload = useMemo(() => {
        switch (activeTab) {
            case 'bookmarks':
                return {
                    meta: bookmarks.meta,
                    search: bookmarksSearchState.search,
                    onSearchChange: bookmarksSearchState.handleSearchChange,
                    status: bookmarksStatus,
                    onStatusChange: setBookmarksStatus,
                    onPageChange: (page: number) =>
                        reloadTab('bookmarks', { bookmarks_page: page }),
                    onPerPageChange: (perPage: number) =>
                        reloadTab('bookmarks', {
                            bookmarks_page: 1,
                            bookmarks_per_page: perPage,
                        }),
                };
            case 'loans':
                return {
                    meta: loans.meta,
                    search: loansSearchState.search,
                    onSearchChange: loansSearchState.handleSearchChange,
                    status: loansStatus,
                    onStatusChange: setLoansStatus,
                    onPageChange: (page: number) =>
                        reloadTab('loans', { loans_page: page }),
                    onPerPageChange: (perPage: number) =>
                        reloadTab('loans', {
                            loans_page: 1,
                            loans_per_page: perPage,
                        }),
                };
            case 'returns':
                return {
                    meta: returns.meta,
                    search: returnsSearchState.search,
                    onSearchChange: returnsSearchState.handleSearchChange,
                    status: returnsStatus,
                    onStatusChange: setReturnsStatus,
                    onPageChange: (page: number) =>
                        reloadTab('returns', { returns_page: page }),
                    onPerPageChange: (perPage: number) =>
                        reloadTab('returns', {
                            returns_page: 1,
                            returns_per_page: perPage,
                        }),
                };
            case 'fines':
            default:
                return {
                    meta: fines.meta,
                    search: finesSearchState.search,
                    onSearchChange: finesSearchState.handleSearchChange,
                    status: finesStatus,
                    onStatusChange: setFinesStatus,
                    onPageChange: (page: number) =>
                        reloadTab('fines', { fines_page: page }),
                    onPerPageChange: (perPage: number) =>
                        reloadTab('fines', {
                            fines_page: 1,
                            fines_per_page: perPage,
                        }),
                };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        activeTab,
        bookmarks.meta,
        loans.meta,
        returns.meta,
        fines.meta,
        bookmarksSearchState.search,
        loansSearchState.search,
        returnsSearchState.search,
        finesSearchState.search,
        bookmarksStatus,
        loansStatus,
        returnsStatus,
        finesStatus,
    ]);

    const handlePayFine = (fineId: string) => {
        payFine(fineId);
    };

    // Bookmark delete flow: open ConfirmDialog → router.delete → Notification
    const [bookmarkToDelete, setBookmarkToDelete] = useState<BookmarkItem | null>(
        null,
    );
    const [bookmarkDeleting, setBookmarkDeleting] = useState(false);
    const [notification, setNotification] = useState<{
        type: 'success' | 'error';
        message: string;
    } | null>(null);

    const requestDeleteBookmark = (item: BookmarkItem) => {
        setBookmarkToDelete(item);
    };

    const cancelDeleteBookmark = () => {
        if (bookmarkDeleting) return;
        setBookmarkToDelete(null);
    };

    const confirmDeleteBookmark = () => {
        if (!bookmarkToDelete || bookmarkDeleting) return;
        const target = bookmarkToDelete;

        setBookmarkDeleting(true);
        router.delete(route('bookmark.destroy', { slug: target.slug }), {
            preserveScroll: true,
            preserveState: true,
            only: ['bookmarks'],
            onSuccess: () => {
                setBookmarkToDelete(null);
                setNotification({
                    type: 'success',
                    message: `Bookmark untuk "${target.book_title}" berhasil dihapus.`,
                });
            },
            onError: () => {
                setNotification({
                    type: 'error',
                    message: 'Gagal menghapus bookmark. Silakan coba lagi.',
                });
            },
            onFinish: () => setBookmarkDeleting(false),
        });
    };

    return (
        <div className="min-h-screen bg-background py-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    {/* Header */}
                    <div className="mb-8">
                        <div className="tracking-editorial mb-2 font-mono text-[10px] uppercase text-cobalt dark:text-cobalt-lt">
                            Riwayat · History
                        </div>
                        <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-2">
                            My History
                        </h1>
                        <p className="text-muted-foreground">
                            View your bookmarks, loans, returns, and fines
                            history
                        </p>
                    </div>

                    {/* Tabs */}
                    <div className="hairline mb-6 bg-card rounded-xl2 border shadow-soft p-2">
                        <div className="flex flex-wrap gap-2">
                            {TAB_CONFIG.map((tab) => {
                                const Icon = tab.icon;
                                const isActive = activeTab === tab.id;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => switchTab(tab.id)}
                                        className={`flex items-center gap-2 px-4 sm:px-6 py-3 rounded-lg font-medium transition-all ${
                                            isActive
                                                ? 'bg-gradient-to-r from-cobalt to-cobalt-dk text-white shadow-lg'
                                                : 'text-muted-foreground hover:bg-muted'
                                        }`}
                                    >
                                        <Icon className="h-5 w-5" />
                                        <span className="hidden sm:inline">
                                            {tab.label}
                                        </span>
                                        <span className="sm:hidden">
                                            {tab.label.split(' ')[0]}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Stats & Chart per active tab */}
                    {activeTab === 'bookmarks' && (
                        <BookmarkStatsSection stats={stats.bookmarks} />
                    )}
                    {activeTab === 'loans' && (
                        <LoanStatsSection stats={stats.loans} />
                    )}
                    {activeTab === 'returns' && (
                        <ReturnStatsSection stats={stats.returns} />
                    )}
                    {activeTab === 'fines' && (
                        <FineStatsSection stats={stats.fines} />
                    )}

                    {/* Filters */}
                    <Card className="p-4 mb-6">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search books or authors..."
                                    value={tabPayload.search}
                                    onChange={tabPayload.onSearchChange}
                                    className="pl-10"
                                />
                            </div>

                            <Select
                                value={tabPayload.status}
                                onValueChange={tabPayload.onStatusChange}
                            >
                                <SelectTrigger className="w-full sm:w-48">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {activeTab === 'bookmarks' && (
                                        <>
                                            <SelectItem value="all">All Status</SelectItem>
                                            <SelectItem value="available">Available</SelectItem>
                                            <SelectItem value="borrowed">Borrowed</SelectItem>
                                        </>
                                    )}
                                    {activeTab === 'loans' && (
                                        <>
                                            <SelectItem value="all">All Status</SelectItem>
                                            <SelectItem value="active">Active</SelectItem>
                                            <SelectItem value="overdue">Overdue</SelectItem>
                                        </>
                                    )}
                                    {activeTab === 'returns' && (
                                        <>
                                            <SelectItem value="all">All Status</SelectItem>
                                            <SelectItem value="on-time">On Time</SelectItem>
                                            <SelectItem value="late">Late</SelectItem>
                                        </>
                                    )}
                                    {activeTab === 'fines' && (
                                        <>
                                            <SelectItem value="all">All Status</SelectItem>
                                            <SelectItem value="unpaid">Unpaid</SelectItem>
                                            <SelectItem value="paid">Paid</SelectItem>
                                        </>
                                    )}
                                </SelectContent>
                            </Select>
                        </div>
                    </Card>

                    {/* Results info */}
                    <div className="mb-4">
                        <p className="text-sm text-muted-foreground">
                            Showing {tabPayload.meta.from ?? 0}-{tabPayload.meta.to ?? 0} of{' '}
                            {tabPayload.meta.total} records
                        </p>
                    </div>

                    {/* Desktop table */}
                    {activeTab === 'bookmarks' && (
                        <BookmarksTable
                            items={bookmarks.data}
                            onDelete={requestDeleteBookmark}
                        />
                    )}
                    {activeTab === 'loans' && <LoansTable items={loans.data} />}
                    {activeTab === 'returns' && (
                        <ReturnsTable
                            items={returns.data}
                            onViewDetail={(item) => setSelectedReturn(item)}
                        />
                    )}
                    {activeTab === 'fines' && (
                        <FinesTable
                            items={fines.data}
                            onPay={handlePayFine}
                            onViewDetail={(item) => setSelectedFine(item)}
                        />
                    )}

                    {/* Empty state */}
                    {tabPayload.meta.total === 0 && (
                        <div className="text-center py-16">
                            <div className="text-6xl mb-4">📚</div>
                            <h3 className="text-xl font-semibold text-foreground mb-2">
                                No records found
                            </h3>
                            <p className="text-muted-foreground">
                                Try adjusting your search or filters
                            </p>
                        </div>
                    )}

                    {/* Shared Pagination */}
                    {tabPayload.meta.total > 0 && tabPayload.meta.has_pages && (
                        <Pagination
                            page={tabPayload.meta.current_page}
                            total={tabPayload.meta.total}
                            perPage={tabPayload.meta.per_page}
                            onPageChange={tabPayload.onPageChange}
                            onPerPageChange={tabPayload.onPerPageChange}
                        />
                    )}
                </motion.div>
            </div>

            <ConfirmDialog
                open={bookmarkToDelete !== null}
                title="Delete Bookmark"
                message={
                    bookmarkToDelete
                        ? `Apakah Anda yakin ingin menghapus bookmark untuk "${bookmarkToDelete.book_title}"?`
                        : ''
                }
                confirmLabel="Delete"
                cancelLabel="Cancel"
                loading={bookmarkDeleting}
                onConfirm={confirmDeleteBookmark}
                onCancel={cancelDeleteBookmark}
            />

            <Notification
                notification={notification}
                onClose={() => setNotification(null)}
            />

            {/* Return Detail Modal */}
            {selectedReturn && (
                <Dialog open={selectedReturn !== null} onOpenChange={(open) => !open && setSelectedReturn(null)}>
                    <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-y-auto p-0">
                        <div className="p-6">
                            <DialogHeader className="mb-4">
                                <DialogTitle className="text-xl font-bold flex items-center justify-between">
                                    <span>Detail Pengembalian Buku</span>
                                    <Badge variant="outline" className="font-mono text-xs">
                                        {selectedReturn.return_book_code}
                                    </Badge>
                                </DialogTitle>
                            </DialogHeader>

                            {/* Book Info Header */}
                            <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl bg-muted/30 border mb-6">
                                <div className="w-20 h-28 flex-shrink-0 rounded-lg overflow-hidden border bg-background self-center sm:self-start">
                                    <ImageWithFallback
                                        src={selectedReturn.cover_url ?? undefined}
                                        alt={selectedReturn.book_title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <h4 className="font-bold text-foreground text-lg mb-1">
                                            {selectedReturn.book_title}
                                        </h4>
                                        <p className="text-sm text-muted-foreground mb-3">
                                            oleh {selectedReturn.author}
                                        </p>
                                    </div>
                                    <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                                        {selectedReturn.loan_code && (
                                            <div className="flex items-center gap-1 bg-background border px-2 py-1 rounded">
                                                <span>Peminjaman:</span>
                                                <span className="font-semibold text-foreground">{selectedReturn.loan_code}</span>
                                            </div>
                                        )}
                                        {selectedReturn.loan_status && (
                                            <div className="flex items-center gap-1 bg-background border px-2 py-1 rounded">
                                                <span>Status:</span>
                                                <span className="font-semibold text-foreground capitalize">{selectedReturn.loan_status.replace('_', ' ')}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Rental and Return Timestamps */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                                <div className="p-3 border rounded-xl bg-card shadow-soft flex flex-col justify-between">
                                    <span className="text-xs text-muted-foreground mb-1 block">Tanggal Pinjam</span>
                                    <div className="flex items-center gap-2 text-foreground font-semibold">
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                        <span>{formatDate(selectedReturn.borrow_date)}</span>
                                    </div>
                                </div>
                                <div className="p-3 border rounded-xl bg-card shadow-soft flex flex-col justify-between">
                                    <span className="text-xs text-muted-foreground mb-1 block">Jatuh Tempo</span>
                                    <div className="flex items-center gap-2 text-foreground font-semibold">
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                        <span>{formatDate(selectedReturn.due_date)}</span>
                                    </div>
                                </div>
                                <div className="p-3 border rounded-xl bg-card shadow-soft flex flex-col justify-between">
                                    <span className="text-xs text-muted-foreground mb-1 block">Tanggal Kembali</span>
                                    <div className="flex items-center gap-2 text-foreground font-semibold">
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                        <span>{formatDate(selectedReturn.return_date)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Book Return Status / Condition */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t pt-6 mb-6">
                                <div>
                                    <h5 className="font-semibold text-sm text-foreground mb-3 flex items-center gap-1.5">
                                        <RefreshCw className="h-4 w-4 text-cobalt" />
                                        Status Pengembalian
                                    </h5>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center justify-between py-1 border-b">
                                            <span className="text-sm text-muted-foreground">Ketepatan Waktu</span>
                                            {getReturnStatusBadge(selectedReturn.status)}
                                        </div>
                                        <div className="flex items-center justify-between py-1">
                                            <span className="text-sm text-muted-foreground">Kondisi Pengembalian</span>
                                            {getConditionBadge(selectedReturn.condition)}
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h5 className="font-semibold text-sm text-foreground mb-3 flex items-center gap-1.5">
                                        <AlertCircle className="h-4 w-4 text-cobalt" />
                                        Catatan Pengecekan
                                    </h5>
                                    <div className="p-3 rounded-xl border bg-muted/20 text-sm text-muted-foreground min-h-[70px]">
                                        {selectedReturn.notes ? (
                                            <div dangerouslySetInnerHTML={{ __html: selectedReturn.notes }} />
                                        ) : (
                                            <span className="italic">Tidak ada catatan kondisi buku.</span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Fine Breakdown Section */}
                            {selectedReturn.fine && (
                                <div className="border-t pt-6 mb-6">
                                    <h5 className="font-semibold text-sm text-foreground mb-3 flex items-center gap-1.5">
                                        <DollarSign className="h-4 w-4 text-rose-500" />
                                        Rincian Denda
                                    </h5>
                                    <div className="p-4 rounded-xl border bg-rose-500/[0.02] space-y-3">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Denda Keterlambatan</span>
                                            <span className="font-medium text-foreground">{formatIDR(selectedReturn.fine.late_fee)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Denda Kondisi Buku (Kerusakan/Kehilangan)</span>
                                            <span className="font-medium text-foreground">{formatIDR(selectedReturn.fine.other_fee)}</span>
                                        </div>
                                        <div className="border-t pt-3 flex justify-between items-center">
                                            <span className="font-semibold text-sm text-foreground">Total Denda</span>
                                            <span className="font-bold text-lg text-rose-600 dark:text-rose-400">
                                                {formatIDR(selectedReturn.fine.total_fee)}
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap items-center justify-between border-t pt-3 text-xs gap-2">
                                            <div className="flex items-center gap-2">
                                                <span className="text-muted-foreground">Status Pembayaran:</span>
                                                {selectedReturn.fine.status === 'paid' ? (
                                                    <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-medium">
                                                        Paid
                                                    </Badge>
                                                ) : (
                                                    <Badge className="bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 font-medium">
                                                        Unpaid
                                                    </Badge>
                                                )}
                                            </div>
                                            {selectedReturn.fine.order_id && (
                                                <div className="text-muted-foreground font-mono">
                                                    ID: {selectedReturn.fine.order_id}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Review Section */}
                            {selectedReturn.review && (
                                <div className="border-t pt-6">
                                    <h5 className="font-semibold text-sm text-foreground mb-3 flex items-center gap-1.5">
                                        <Star className="h-4 w-4 text-amber-500" />
                                        Ulasan Peminjam
                                    </h5>
                                    <div className="p-4 rounded-xl border bg-muted/20 space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-muted-foreground">Rating Diberikan</span>
                                            <StarRating rating={selectedReturn.review.rating} />
                                        </div>
                                        {selectedReturn.review.comment && (
                                            <div className="text-sm text-muted-foreground border-t pt-3">
                                                <p className="italic">"{selectedReturn.review.comment}"</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </DialogContent>
                </Dialog>
            )}

            {/* Fine Detail Modal */}
            {selectedFine && (
                <Dialog open={selectedFine !== null} onOpenChange={(open) => !open && setSelectedFine(null)}>
                    <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-y-auto p-0">
                        <div className="p-6">
                            <DialogHeader className="mb-4">
                                <DialogTitle className="text-xl font-bold flex items-center justify-between">
                                    <span>Detail Denda</span>
                                    {selectedFine.order_id && (
                                        <Badge variant="outline" className="font-mono text-xs">
                                            ID Transaksi: {selectedFine.order_id}
                                        </Badge>
                                    )}
                                </DialogTitle>
                            </DialogHeader>

                            {/* Book Info Header */}
                            <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl bg-muted/30 border mb-6">
                                <div className="w-20 h-28 flex-shrink-0 rounded-lg overflow-hidden border bg-background self-center sm:self-start">
                                    <ImageWithFallback
                                        src={selectedFine.cover_url ?? undefined}
                                        alt={selectedFine.book_title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <h4 className="font-bold text-foreground text-lg mb-1">
                                            {selectedFine.book_title}
                                        </h4>
                                        <p className="text-sm text-muted-foreground mb-3">
                                            oleh {selectedFine.author}
                                        </p>
                                    </div>
                                    <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                                        {selectedFine.return_book_code && (
                                            <div className="flex items-center gap-1 bg-background border px-2 py-1 rounded">
                                                <span>Kode Kembali:</span>
                                                <span className="font-semibold text-foreground">{selectedFine.return_book_code}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Rental and Return Timestamps */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                                <div className="p-3 border rounded-xl bg-card shadow-soft flex flex-col justify-between">
                                    <span className="text-xs text-muted-foreground mb-1 block">Tanggal Pinjam</span>
                                    <div className="flex items-center gap-2 text-foreground font-semibold">
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                        <span>{formatDate(selectedFine.borrow_date)}</span>
                                    </div>
                                </div>
                                <div className="p-3 border rounded-xl bg-card shadow-soft flex flex-col justify-between">
                                    <span className="text-xs text-muted-foreground mb-1 block">Jatuh Tempo</span>
                                    <div className="flex items-center gap-2 text-foreground font-semibold">
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                        <span>{formatDate(selectedFine.due_date)}</span>
                                    </div>
                                </div>
                                <div className="p-3 border rounded-xl bg-card shadow-soft flex flex-col justify-between">
                                    <span className="text-xs text-muted-foreground mb-1 block">Tanggal Kembali</span>
                                    <div className="flex items-center gap-2 text-foreground font-semibold">
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                        <span>{formatDate(selectedFine.return_date)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Return Status and Condition */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t pt-6 mb-6">
                                <div>
                                    <h5 className="font-semibold text-sm text-foreground mb-3 flex items-center gap-1.5">
                                        <RefreshCw className="h-4 w-4 text-cobalt" />
                                        Status Pengembalian
                                    </h5>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center justify-between py-1 border-b">
                                            <span className="text-sm text-muted-foreground">Ketepatan Waktu</span>
                                            {getReturnStatusBadge(selectedFine.return_status)}
                                        </div>
                                        <div className="flex items-center justify-between py-1">
                                            <span className="text-sm text-muted-foreground">Kondisi Pengembalian</span>
                                            {getConditionBadge(selectedFine.condition)}
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h5 className="font-semibold text-sm text-foreground mb-3 flex items-center gap-1.5">
                                        <AlertCircle className="h-4 w-4 text-cobalt" />
                                        Catatan Pengecekan
                                    </h5>
                                    <div className="p-3 rounded-xl border bg-muted/20 text-sm text-muted-foreground min-h-[70px]">
                                        {selectedFine.notes ? (
                                            <div dangerouslySetInnerHTML={{ __html: selectedFine.notes }} />
                                        ) : (
                                            <span className="italic">Tidak ada catatan kondisi buku.</span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Fine Breakdown Section */}
                            <div className="border-t pt-6 mb-6">
                                <h5 className="font-semibold text-sm text-foreground mb-3 flex items-center gap-1.5">
                                    <DollarSign className="h-4 w-4 text-rose-500" />
                                    Rincian Denda
                                </h5>
                                <div className="p-4 rounded-xl border bg-rose-500/[0.02] space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Denda Keterlambatan</span>
                                        <span className="font-medium text-foreground">{formatIDR(selectedFine.late_fee)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Denda Kondisi Buku (Kerusakan/Kehilangan)</span>
                                        <span className="font-medium text-foreground">{formatIDR(selectedFine.other_fee)}</span>
                                    </div>
                                    <div className="border-t pt-3 flex justify-between items-center">
                                        <span className="font-semibold text-sm text-foreground">Total Denda</span>
                                        <span className="font-bold text-lg text-rose-600 dark:text-rose-400">
                                            {formatIDR(selectedFine.fine_amount)}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between border-t pt-3 text-xs">
                                        <span className="text-muted-foreground">Status Pembayaran:</span>
                                        {selectedFine.status === 'paid' ? (
                                            <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-medium">
                                                Paid
                                            </Badge>
                                        ) : (
                                            <Badge className="bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 font-medium">
                                                Unpaid
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Pay Button inside Modal for unpaid fines */}
                            <div className="flex justify-end gap-2 border-t pt-6">
                                <Button
                                    variant="outline"
                                    onClick={() => setSelectedFine(null)}
                                >
                                    Tutup
                                </Button>
                                {selectedFine.status === 'unpaid' && (
                                    <Button
                                        className="bg-primary hover:bg-primary/90 gap-2"
                                        onClick={() => {
                                            const id = selectedFine.id;
                                            setSelectedFine(null);
                                            handlePayFine(id);
                                        }}
                                    >
                                        <CreditCard className="h-4 w-4" />
                                        Bayar Sekarang
                                    </Button>
                                )}
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
}

const StarRating = ({ rating }: { rating: number }) => {
    return (
        <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    className={`h-4 w-4 ${
                        star <= Math.round(rating)
                            ? 'text-amber-500 fill-amber-500'
                            : 'text-muted/30 dark:text-muted/10'
                    }`}
                />
            ))}
            <span className="ml-1 text-sm font-semibold">{rating.toFixed(1)}</span>
        </div>
    );
};

const getConditionBadge = (condition: string | null | undefined) => {
    if (!condition) return <span className="text-muted-foreground">-</span>;
    const cond = condition.toLowerCase();
    if (cond === 'baik' || cond === 'good') {
        return (
            <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 gap-1 font-medium">
                <CheckCircle className="h-3 w-3" />
                Baik
            </Badge>
        );
    }
    if (cond === 'rusak' || cond === 'damaged') {
        return (
            <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 gap-1 font-medium">
                <AlertCircle className="h-3 w-3" />
                Rusak
            </Badge>
        );
    }
    if (cond === 'hilang' || cond === 'lost') {
        return (
            <Badge className="bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 gap-1 font-medium">
                <XCircle className="h-3 w-3" />
                Hilang
            </Badge>
        );
    }
    return <Badge variant="outline">{condition}</Badge>;
};

const getReturnStatusBadge = (status: 'on-time' | 'late' | string | null | undefined) => {
    if (!status) return null;
    const isLate = status.toLowerCase() === 'late';
    if (isLate) {
        return (
            <Badge className="bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 gap-1 font-medium">
                <Clock className="h-3 w-3" />
                Terlambat
            </Badge>
        );
    }
    return (
        <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 gap-1 font-medium">
            <CheckCircle className="h-3 w-3" />
            Tepat Waktu
        </Badge>
    );
};

/* ------------------------------------------------------------------ */
/* Stats & charts                                                     */
/* ------------------------------------------------------------------ */

const COBALT = '#1E3A8A';
const COBALT_LT = '#3B82F6';
const ACCENT = '#F59E0B';

const formatIDR = (value: number) => `Rp ${value.toLocaleString('id-ID')}`;

function StatCard({
    icon: Icon,
    iconClass,
    bg,
    label,
    value,
    delay = 0,
}: {
    icon: typeof Bookmark;
    iconClass: string;
    bg: string;
    label: string;
    value: string | number;
    delay?: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
        >
            <Card className="p-3 transition-shadow hover:shadow-lg sm:p-4">
                <div className="flex items-center gap-3">
                    <div className={`flex-shrink-0 rounded-full p-2.5 ${bg}`}>
                        <Icon className={`h-5 w-5 ${iconClass}`} />
                    </div>
                    <div className="min-w-0">
                        <p className="truncate text-[11px] text-muted-foreground sm:text-xs">
                            {label}
                        </p>
                        <p className="text-lg font-bold text-foreground sm:text-xl">
                            {value}
                        </p>
                    </div>
                </div>
            </Card>
        </motion.div>
    );
}

function ChartCard({
    title,
    hasData,
    children,
}: {
    title: string;
    hasData: boolean;
    children: React.ReactElement;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
        >
            <Card className="p-4 sm:p-6">
                <h3 className="mb-4 text-sm font-semibold text-foreground sm:text-base">
                    {title}
                </h3>
                {hasData ? (
                    <ResponsiveContainer width="100%" height={220}>
                        {children}
                    </ResponsiveContainer>
                ) : (
                    <div className="flex h-[220px] flex-col items-center justify-center gap-2 text-muted-foreground">
                        <TrendingUp className="h-8 w-8 opacity-30" />
                        <p className="text-sm">No data to display yet</p>
                    </div>
                )}
            </Card>
        </motion.div>
    );
}

function BookmarkStatsSection({ stats }: { stats: BookmarkStats }) {
    const hasData = stats.by_category.some((c) => c.total > 0);
    return (
        <div className="mb-6 space-y-4">
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                <StatCard
                    icon={Bookmark}
                    iconClass="text-cobalt dark:text-cobalt-lt"
                    bg="bg-cobalt/10"
                    label="Total Bookmarks"
                    value={stats.total}
                    delay={0.05}
                />
                <StatCard
                    icon={CheckCircle}
                    iconClass="text-green-600"
                    bg="bg-green-100 dark:bg-green-500/15"
                    label="Available"
                    value={stats.available}
                    delay={0.1}
                />
                <StatCard
                    icon={BookOpen}
                    iconClass="text-red-600"
                    bg="bg-red-100 dark:bg-red-500/15"
                    label="Borrowed"
                    value={stats.borrowed}
                    delay={0.15}
                />
                <StatCard
                    icon={Star}
                    iconClass="text-amber-500"
                    bg="bg-amber-100 dark:bg-amber-500/15"
                    label="Avg Rating"
                    value={stats.avg_rating.toFixed(1)}
                    delay={0.2}
                />
            </div>
            <ChartCard title="Bookmarks by Category" hasData={hasData}>
                <BarChart data={stats.by_category}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="label" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
                    <Tooltip
                        formatter={(v: any) => [v, 'Bookmarks']}
                        cursor={{ fill: 'rgba(30,58,138,0.08)' }}
                    />
                    <Bar dataKey="total" fill={COBALT} radius={[4, 4, 0, 0]} />
                </BarChart>
            </ChartCard>
        </div>
    );
}

function LoanStatsSection({ stats }: { stats: LoanStats }) {
    const hasData = stats.trend.some((p) => p.total > 0);
    return (
        <div className="mb-6 space-y-4">
            <div className="grid grid-cols-3 gap-3">
                <StatCard
                    icon={BookOpen}
                    iconClass="text-cobalt dark:text-cobalt-lt"
                    bg="bg-cobalt/10"
                    label="Total Loans"
                    value={stats.total}
                    delay={0.05}
                />
                <StatCard
                    icon={Clock}
                    iconClass="text-blue-600"
                    bg="bg-blue-100 dark:bg-blue-500/15"
                    label="Active"
                    value={stats.active}
                    delay={0.1}
                />
                <StatCard
                    icon={XCircle}
                    iconClass="text-red-600"
                    bg="bg-red-100 dark:bg-red-500/15"
                    label="Overdue"
                    value={stats.overdue}
                    delay={0.15}
                />
            </div>
            <ChartCard title="Loan Activity (Last 6 Months)" hasData={hasData}>
                <LineChart data={stats.trend}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="label" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
                    <Tooltip formatter={(v: any) => [v, 'Loans']} />
                    <Line
                        type="monotone"
                        dataKey="total"
                        stroke={COBALT}
                        strokeWidth={2}
                        dot={{ r: 3 }}
                    />
                </LineChart>
            </ChartCard>
        </div>
    );
}

function ReturnStatsSection({ stats }: { stats: ReturnStats }) {
    const hasData = stats.trend.some((p) => p.total > 0);
    return (
        <div className="mb-6 space-y-4">
            <div className="grid grid-cols-3 gap-3">
                <StatCard
                    icon={RefreshCw}
                    iconClass="text-cobalt dark:text-cobalt-lt"
                    bg="bg-cobalt/10"
                    label="Total Returns"
                    value={stats.total}
                    delay={0.05}
                />
                <StatCard
                    icon={CheckCircle}
                    iconClass="text-green-600"
                    bg="bg-green-100 dark:bg-green-500/15"
                    label="On Time"
                    value={stats.on_time}
                    delay={0.1}
                />
                <StatCard
                    icon={XCircle}
                    iconClass="text-red-600"
                    bg="bg-red-100 dark:bg-red-500/15"
                    label="Late"
                    value={stats.late}
                    delay={0.15}
                />
            </div>
            <ChartCard title="Returns (Last 6 Months)" hasData={hasData}>
                <LineChart data={stats.trend}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="label" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
                    <Tooltip formatter={(v: any) => [v, 'Returns']} />
                    <Line
                        type="monotone"
                        dataKey="total"
                        stroke={COBALT_LT}
                        strokeWidth={2}
                        dot={{ r: 3 }}
                    />
                </LineChart>
            </ChartCard>
        </div>
    );
}

function FineStatsSection({ stats }: { stats: FineStats }) {
    const hasData = stats.trend.some((p) => p.total > 0);
    return (
        <div className="mb-6 space-y-4">
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                <StatCard
                    icon={DollarSign}
                    iconClass="text-cobalt dark:text-cobalt-lt"
                    bg="bg-cobalt/10"
                    label="Total Fines"
                    value={formatIDR(stats.total_amount)}
                    delay={0.05}
                />
                <StatCard
                    icon={Wallet}
                    iconClass="text-green-600"
                    bg="bg-green-100 dark:bg-green-500/15"
                    label="Paid"
                    value={formatIDR(stats.paid_amount)}
                    delay={0.1}
                />
                <StatCard
                    icon={AlertCircle}
                    iconClass="text-red-600"
                    bg="bg-red-100 dark:bg-red-500/15"
                    label="Unpaid"
                    value={formatIDR(stats.unpaid_amount)}
                    delay={0.15}
                />
                <StatCard
                    icon={CreditCard}
                    iconClass="text-amber-500"
                    bg="bg-amber-100 dark:bg-amber-500/15"
                    label="Unpaid Bills"
                    value={stats.unpaid_count}
                    delay={0.2}
                />
            </div>
            <ChartCard
                title="Fines Paid (Last 6 Months)"
                hasData={hasData}
            >
                <BarChart data={stats.trend}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="label" tick={{ fontSize: 12 }} />
                    <YAxis
                        tick={{ fontSize: 12 }}
                        width={70}
                        tickFormatter={(v: number) =>
                            v >= 1000 ? `${v / 1000}k` : `${v}`
                        }
                    />
                    <Tooltip
                        formatter={(v: any) => [formatIDR(v), 'Paid']}
                        cursor={{ fill: 'rgba(245,158,11,0.08)' }}
                    />
                    <Bar dataKey="total" fill={ACCENT} radius={[4, 4, 0, 0]} />
                </BarChart>
            </ChartCard>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/* Tab tables                                                         */
/* ------------------------------------------------------------------ */

const BookCell = ({
    title,
    author,
    cover,
}: {
    title: string;
    author: string;
    cover: string | null;
}) => (
    <div className="flex items-center gap-3">
        <div className="w-12 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
            <ImageWithFallback
                src={cover ?? undefined}
                alt={title}
                className="w-full h-full object-cover"
            />
        </div>
        <div>
            <p className="font-medium text-foreground">{title}</p>
            <p className="text-sm text-muted-foreground">{author}</p>
        </div>
    </div>
);

const Th = ({ children }: { children: React.ReactNode }) => (
    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {children}
    </th>
);

const Td = ({ children }: { children: React.ReactNode }) => (
    <td className="px-4 py-3 align-middle text-sm text-foreground">{children}</td>
);

const TableWrap = ({ children }: { children: React.ReactNode }) => (
    <Card className="overflow-hidden">
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-border">
                {children}
            </table>
        </div>
    </Card>
);

function BookmarksTable({
    items,
    onDelete,
}: {
    items: BookmarkItem[];
    onDelete: (item: BookmarkItem) => void;
}) {
    if (items.length === 0) return null;
    return (
        <TableWrap>
            <thead className="bg-background">
                <tr>
                    <Th>Book</Th>
                    <Th>Category</Th>
                    <Th>Date Bookmarked</Th>
                    <Th>Rating</Th>
                    <Th>Status</Th>
                    <Th>Actions</Th>
                </tr>
            </thead>
            <tbody className="divide-y divide-border bg-card">
                {items.map((item, index) => (
                    <motion.tr
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-background"
                    >
                        <Td>
                            <BookCell
                                title={item.book_title}
                                author={item.author}
                                cover={item.cover_url}
                            />
                        </Td>
                        <Td>
                            {item.category ? (
                                <Badge variant="outline">{item.category}</Badge>
                            ) : (
                                '-'
                            )}
                        </Td>
                        <Td>{formatDate(item.date_bookmarked)}</Td>
                        <Td>
                            <div className="flex items-center gap-1">
                                <span className="text-yellow-500">⭐</span>
                                <span>{item.rating}</span>
                            </div>
                        </Td>
                        <Td>
                            {item.available ? (
                                <Badge className="bg-green-500">Available</Badge>
                            ) : (
                                <Badge className="bg-red-500">Borrowed</Badge>
                            )}
                        </Td>
                        <Td>
                            <div className="flex gap-2">
                                <Link href={route('book.detail', { slug: item.slug })}>
                                    <Button size="sm" variant="outline">
                                        <Eye className="h-4 w-4" />
                                    </Button>
                                </Link>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="text-red-600 hover:text-red-700"
                                    onClick={() => onDelete(item)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </Td>
                    </motion.tr>
                ))}
            </tbody>
        </TableWrap>
    );
}

function LoansTable({ items }: { items: LoanItem[] }) {
    if (items.length === 0) return null;
    return (
        <TableWrap>
            <thead className="bg-background">
                <tr>
                    <Th>Book</Th>
                    <Th>Borrow Date</Th>
                    <Th>Due Date</Th>
                    <Th>Status</Th>
                    <Th>Actions</Th>
                </tr>
            </thead>
            <tbody className="divide-y divide-border bg-card">
                {items.map((item, index) => (
                    <motion.tr
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-background"
                    >
                        <Td>
                            <BookCell
                                title={item.book_title}
                                author={item.author}
                                cover={item.cover_url}
                            />
                        </Td>
                        <Td>{formatDate(item.borrow_date)}</Td>
                        <Td>{formatDate(item.due_date)}</Td>
                        <Td>
                            {item.status === 'active' ? (
                                <Badge className="bg-blue-500">
                                    <Clock className="h-3 w-3 mr-1" /> Active
                                </Badge>
                            ) : (
                                <Badge className="bg-red-500">
                                    <XCircle className="h-3 w-3 mr-1" /> Overdue
                                </Badge>
                            )}
                        </Td>
                        <Td>
                            <Link
                                href={route('book.assets', {
                                    slug: item.slug,
                                })}
                            >
                                <Button size="sm" variant="outline">
                                    <Eye className="h-4 w-4" />
                                </Button>
                            </Link>
                        </Td>
                    </motion.tr>
                ))}
            </tbody>
        </TableWrap>
    );
}

function ReturnsTable({
    items,
    onViewDetail,
}: {
    items: ReturnItem[];
    onViewDetail: (item: ReturnItem) => void;
}) {
    if (items.length === 0) return null;
    return (
        <TableWrap>
            <thead className="bg-background">
                <tr>
                    <Th>Book</Th>
                    <Th>Borrow Date</Th>
                    <Th>Return Date</Th>
                    <Th>Condition</Th>
                    <Th>Status</Th>
                    <Th>Actions</Th>
                </tr>
            </thead>
            <tbody className="divide-y divide-border bg-card">
                {items.map((item, index) => (
                    <motion.tr
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-background"
                    >
                        <Td>
                            <BookCell
                                title={item.book_title}
                                author={item.author}
                                cover={item.cover_url}
                            />
                        </Td>
                        <Td>{formatDate(item.borrow_date)}</Td>
                        <Td>{formatDate(item.return_date)}</Td>
                        <Td>
                            {item.condition ? (
                                <Badge variant="outline">{item.condition}</Badge>
                            ) : (
                                '-'
                            )}
                        </Td>
                        <Td>
                            {item.status === 'on-time' ? (
                                <Badge className="bg-green-500">
                                    <CheckCircle className="h-3 w-3 mr-1" /> On Time
                                </Badge>
                            ) : (
                                <Badge className="bg-red-500">
                                    <XCircle className="h-3 w-3 mr-1" /> Late
                                </Badge>
                            )}
                        </Td>
                        <Td>
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => onViewDetail(item)}
                            >
                                <Eye className="h-4 w-4" />
                            </Button>
                        </Td>
                    </motion.tr>
                ))}
            </tbody>
        </TableWrap>
    );
}

function FinesTable({
    items,
    onPay,
    onViewDetail,
}: {
    items: FineItem[];
    onPay: (id: string) => void;
    onViewDetail: (item: FineItem) => void;
}) {
    if (items.length === 0) return null;
    return (
        <TableWrap>
            <thead className="bg-background">
                <tr>
                    <Th>Book</Th>
                    <Th>Due Date</Th>
                    <Th>Days Overdue</Th>
                    <Th>Fine Amount</Th>
                    <Th>Status</Th>
                    <Th>Actions</Th>
                </tr>
            </thead>
            <tbody className="divide-y divide-border bg-card">
                {items.map((item, index) => (
                    <motion.tr
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-background"
                    >
                        <Td>
                            <BookCell
                                title={item.book_title}
                                author={item.author}
                                cover={item.cover_url}
                            />
                        </Td>
                        <Td>{formatDate(item.due_date)}</Td>
                        <Td>
                            <Badge variant="outline" className="text-red-600">
                                {item.days_overdue} days
                            </Badge>
                        </Td>
                        <Td>
                            <span className="font-semibold text-foreground">
                                Rp {item.fine_amount.toLocaleString('id-ID')}
                            </span>
                        </Td>
                        <Td>
                            {item.status === 'unpaid' ? (
                                <Badge className="bg-red-500">Unpaid</Badge>
                            ) : (
                                <Badge className="bg-green-500">Paid</Badge>
                            )}
                        </Td>
                        <Td>
                            <div className="flex items-center gap-2">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => onViewDetail(item)}
                                >
                                    <Eye className="h-4 w-4" />
                                </Button>
                                {item.status === 'unpaid' ? (
                                    <Button
                                        size="sm"
                                        className="bg-primary hover:bg-primary/90"
                                        onClick={() => onPay(item.id)}
                                    >
                                        <CreditCard className="h-4 w-4 mr-2" />
                                        Pay Now
                                    </Button>
                                ) : (
                                    <Badge
                                        variant="outline"
                                        className="text-green-600 font-medium"
                                    >
                                        <CheckCircle className="h-3 w-3 mr-1" />
                                        Paid
                                    </Badge>
                                )}
                            </div>
                        </Td>
                    </motion.tr>
                ))}
            </tbody>
        </TableWrap>
    );
}
