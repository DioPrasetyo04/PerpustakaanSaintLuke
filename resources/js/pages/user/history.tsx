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
} from 'lucide-react';
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
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import Pagination from '@/components/component/Home/Pagination/Pagination';
import Notification from '@/components/component/Notification/Notification';
import ConfirmDialog from '@/components/component/Notification/ConfirmDialog';
import { useDebounce } from '@/hooks/useDebounce';
import { useSearch } from '@/hooks/useSearch';
import { Paginated } from '@/types/pagination';
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
    status: 'on-time' | 'late';
};

type FineItem = {
    id: string;
    order_id: string | null;
    book_title: string;
    slug: string;
    author: string;
    cover_url: string | null;
    due_date: string | null;
    return_date: string | null;
    days_overdue: number;
    fine_amount: number;
    late_fee: number;
    other_fee: number;
    status: 'paid' | 'unpaid';
    payment_status: string | null;
};

type TabFilters = {
    search: string | null;
    status: string | null;
    page: number;
    per_page: number;
};

type HistoryPageProps = {
    activeTab: TabId;
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
};

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
    const { bookmarks, loans, returns, fines, filters } = props;

    const [activeTab, setActiveTab] = useState<TabId>(() =>
        getInitialTabFromUrl(props.activeTab ?? 'bookmarks'),
    );

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
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="font-['Poppins'] text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                            My History
                        </h1>
                        <p className="text-gray-600">
                            View your bookmarks, loans, returns, and fines
                            history
                        </p>
                    </div>

                    {/* Tabs */}
                    <div className="mb-6 bg-white rounded-xl shadow-sm p-2">
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
                                                ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                                                : 'text-gray-600 hover:bg-gray-100'
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

                    {/* Filters */}
                    <Card className="p-4 mb-6">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
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
                        <p className="text-sm text-gray-600">
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
                        <ReturnsTable items={returns.data} />
                    )}
                    {activeTab === 'fines' && (
                        <FinesTable items={fines.data} onPay={handlePayFine} />
                    )}

                    {/* Empty state */}
                    {tabPayload.meta.total === 0 && (
                        <div className="text-center py-16">
                            <div className="text-6xl mb-4">📚</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                No records found
                            </h3>
                            <p className="text-gray-600">
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
        <div className="w-12 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
            <ImageWithFallback
                src={cover ?? undefined}
                alt={title}
                className="w-full h-full object-cover"
            />
        </div>
        <div>
            <p className="font-medium text-gray-900">{title}</p>
            <p className="text-sm text-gray-600">{author}</p>
        </div>
    </div>
);

const Th = ({ children }: { children: React.ReactNode }) => (
    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
        {children}
    </th>
);

const Td = ({ children }: { children: React.ReactNode }) => (
    <td className="px-4 py-3 align-middle text-sm text-gray-700">{children}</td>
);

const TableWrap = ({ children }: { children: React.ReactNode }) => (
    <Card className="overflow-hidden">
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
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
            <thead className="bg-gray-50">
                <tr>
                    <Th>Book</Th>
                    <Th>Category</Th>
                    <Th>Date Bookmarked</Th>
                    <Th>Rating</Th>
                    <Th>Status</Th>
                    <Th>Actions</Th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
                {items.map((item, index) => (
                    <motion.tr
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-gray-50"
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
            <thead className="bg-gray-50">
                <tr>
                    <Th>Book</Th>
                    <Th>Borrow Date</Th>
                    <Th>Due Date</Th>
                    <Th>Status</Th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
                {items.map((item, index) => (
                    <motion.tr
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-gray-50"
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
                    </motion.tr>
                ))}
            </tbody>
        </TableWrap>
    );
}

function ReturnsTable({ items }: { items: ReturnItem[] }) {
    if (items.length === 0) return null;
    return (
        <TableWrap>
            <thead className="bg-gray-50">
                <tr>
                    <Th>Book</Th>
                    <Th>Borrow Date</Th>
                    <Th>Return Date</Th>
                    <Th>Condition</Th>
                    <Th>Status</Th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
                {items.map((item, index) => (
                    <motion.tr
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-gray-50"
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
                    </motion.tr>
                ))}
            </tbody>
        </TableWrap>
    );
}

function FinesTable({
    items,
    onPay,
}: {
    items: FineItem[];
    onPay: (id: string) => void;
}) {
    if (items.length === 0) return null;
    return (
        <TableWrap>
            <thead className="bg-gray-50">
                <tr>
                    <Th>Book</Th>
                    <Th>Due Date</Th>
                    <Th>Days Overdue</Th>
                    <Th>Fine Amount</Th>
                    <Th>Status</Th>
                    <Th>Actions</Th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
                {items.map((item, index) => (
                    <motion.tr
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-gray-50"
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
                            <span className="font-semibold text-gray-900">
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
                                    className="text-green-600"
                                >
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    Paid
                                </Badge>
                            )}
                        </Td>
                    </motion.tr>
                ))}
            </tbody>
        </TableWrap>
    );
}
