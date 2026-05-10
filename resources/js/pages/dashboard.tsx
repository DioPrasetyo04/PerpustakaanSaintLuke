import { router, usePage } from '@inertiajs/react';
import { motion } from 'motion/react';
import { BookOpen, Clock, AlertCircle, Calendar, TrendingUp, History, RotateCcw, Filter } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import { toast } from 'sonner';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState } from 'react';
import type { DashboardPageProps } from '@/types/DashboardPage/DashboardPageProps';
import Pagination from '@/components/component/Home/Pagination/Pagination';

export default function Dashboard() {
    const { auth, stats, charts, loans, returnBooks, categories, filters, activeTab } = usePage<DashboardPageProps>().props;

    const [pending, setPending] = useState({
        sortBy: filters.sortBy,
        status: filters.status,
        category: filters.category,
        dateRange: filters.dateRange,
    });

    const go = (params: Record<string, unknown>) =>
        router.get('/dashboard', params as any, { preserveScroll: false, replace: true });

    const handleTabChange = (tab: 'borrowed' | 'returned') =>
        go({ tab, ...filters, page: 1 });

    const handleSubmitFilters = () => {
        go({ tab: activeTab, ...pending, page: 1 });
        toast.success('Filters applied!');
    };

    const handleResetFilters = () => {
        const d = { sortBy: 'Due Date', status: 'All Status', category: 'All Categories', dateRange: 'All Time' };
        setPending(d);
        go({ tab: activeTab, ...d, page: 1 });
        toast.success('Filters reset!');
    };

    const handlePageChange = (page: number) =>
        go({ tab: activeTab, ...filters, page });

    const handlePerPageChange = (perPage: number) =>
        go({ tab: activeTab, ...filters, per_page: perPage, page: 1 });

    const pagination = activeTab === 'borrowed' ? loans : returnBooks;

    const deadlineBadge = (status: string, days: number) => {
        if (status === 'Overdue') return { variant: 'destructive' as const, label: `${Math.abs(days)} days overdue` };
        if (status === 'danger') return { variant: 'destructive' as const, label: `${days} days left` };
        if (status === 'warning') return { variant: 'secondary' as const, label: `${days} days left` };
        return { variant: 'outline' as const, label: `${days} days left` };
    };

    return (
        <div className="min-h-screen bg-gray-50 py-4 sm:py-6 lg:py-8">
            <div className="container mx-auto px-3 sm:px-4 lg:px-8">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-4 sm:mb-6 lg:mb-8">
                    <h1 className="mb-1 font-['Poppins'] text-xl font-bold text-gray-900 sm:mb-2 sm:text-2xl lg:text-4xl">
                        Welcome back, {auth.user.name}! 👋
                    </h1>
                    <p className="text-xs text-gray-600 sm:text-sm lg:text-base">Here's what's happening with your library account</p>
                </motion.div>

                {/* Stats Grid */}
                <div className="mb-4 grid grid-cols-2 gap-2 sm:mb-6 sm:gap-3 lg:mb-8 lg:grid-cols-4 lg:gap-6">
                    {[
                        { icon: <BookOpen className="h-3.5 w-3.5 text-primary sm:h-4 sm:w-4 lg:h-6 lg:w-6" />, bg: 'bg-primary/10', label: 'Currently Borrowed', value: stats.currentlyBorrowed, color: 'text-gray-900' },
                        { icon: <TrendingUp className="h-3.5 w-3.5 text-green-600 sm:h-4 sm:w-4 lg:h-6 lg:w-6" />, bg: 'bg-green-100', label: 'Books Read', value: stats.booksRead, color: 'text-gray-900' },
                        { icon: <Clock className="h-3.5 w-3.5 text-accent sm:h-4 sm:w-4 lg:h-6 lg:w-6" />, bg: 'bg-accent/10', label: 'Due Soon (3 days)', value: stats.dueSoon, color: 'text-gray-900' },
                        { icon: <AlertCircle className={`h-3.5 w-3.5 sm:h-4 sm:w-4 lg:h-6 lg:w-6 ${stats.fineCount > 0 ? 'text-red-600' : 'text-gray-400'}`} />, bg: stats.fineCount > 0 ? 'bg-red-100' : 'bg-gray-100', label: 'Total Fines', value: `Rp ${stats.totalFines.toLocaleString('id-ID')}`, color: stats.fineCount > 0 ? 'text-red-600' : 'text-gray-900' },
                    ].map((s, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * (i + 1) }}>
                            <Card className="p-2 transition-shadow hover:shadow-lg sm:p-3 lg:p-6">
                                <div className="flex flex-col items-start gap-1.5 sm:flex-row sm:items-center sm:gap-2 lg:gap-4">
                                    <div className={`${s.bg} rounded-full p-1.5 sm:p-2 lg:p-3`}>{s.icon}</div>
                                    <div>
                                        <p className="text-[10px] leading-tight text-gray-600 sm:text-xs lg:text-sm">{s.label}</p>
                                        <p className={`text-base font-bold sm:text-lg lg:text-2xl ${s.color}`}>{s.value}</p>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <div className="grid gap-4 sm:gap-6 lg:grid-cols-3 lg:gap-8">
                    {/* Main Content */}
                    <div className="space-y-4 sm:space-y-6 lg:col-span-2 lg:space-y-8">
                        {/* Charts */}
                        <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 lg:gap-6">
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                                <Card className="p-3 sm:p-4 lg:p-6">
                                    <h3 className="mb-3 text-sm font-semibold text-gray-900 sm:text-base lg:text-lg">User Borrowing (Past Week)</h3>
                                    <ResponsiveContainer width="100%" height={200}>
                                        <LineChart data={charts.borrowing}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                                            <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
                                            <Tooltip />
                                            <Line type="monotone" dataKey="total" stroke="#1E3A8A" strokeWidth={2} dot={{ r: 3 }} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </Card>
                            </motion.div>
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                                <Card className="p-3 sm:p-4 lg:p-6">
                                    <h3 className="mb-3 text-sm font-semibold text-gray-900 sm:text-base lg:text-lg">Fine Payments IDR (Past Week)</h3>
                                    <ResponsiveContainer width="100%" height={200}>
                                        <BarChart data={charts.finePayment}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                                            <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
                                            <Tooltip formatter={(v: number) => [`Rp ${v.toLocaleString('id-ID')}`, 'Amount']} />
                                            <Bar dataKey="total" fill="#F59E0B" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </Card>
                            </motion.div>
                        </div>

                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
                            <Card className="p-3 sm:p-4 lg:p-6">
                                <h3 className="mb-3 text-sm font-semibold text-gray-900 sm:text-base lg:text-lg">Book Returns (Past Week)</h3>
                                <ResponsiveContainer width="100%" height={200}>
                                    <LineChart data={charts.returning}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                                        <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
                                        <Tooltip />
                                        <Line type="monotone" dataKey="total" stroke="#3B82F6" strokeWidth={2} dot={{ r: 3 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </Card>
                        </motion.div>

                        {/* Book List */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
                            <div className="mb-3 flex items-center justify-between lg:mb-4">
                                <h2 className="text-base font-semibold text-gray-900 sm:text-lg lg:text-xl">
                                    {activeTab === 'borrowed' ? 'Currently Borrowed' : 'Recently Returned'}
                                </h2>
                                <a href={activeTab === 'borrowed' ? '/dashboard/loans' : '/dashboard/returns'}>
                                    <Button variant="link" className="p-0 text-xs text-primary sm:text-sm">View All</Button>
                                </a>
                            </div>

                            <div className="min-h-[250px] space-y-2 sm:space-y-3 lg:space-y-4">
                                {activeTab === 'borrowed' ? (
                                    loans.data.length > 0 ? loans.data.map((loan, i) => {
                                        const badge = deadlineBadge(loan.deadline_status, loan.days_left);
                                        return (
                                            <motion.div key={loan.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.9 + i * 0.1 }}>
                                                <Card className="p-2.5 transition-shadow hover:shadow-lg sm:p-3 lg:p-5">
                                                    <div className="flex gap-2 sm:gap-3 lg:gap-4">
                                                        <div className="h-16 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100 sm:h-24 sm:w-16 lg:h-28 lg:w-20">
                                                            <ImageWithFallback src={loan.book.cover ?? undefined} alt={loan.book.title} className="h-full w-full object-cover" />
                                                        </div>
                                                        <div className="min-w-0 flex-1">
                                                            <h3 className="mb-0.5 truncate text-xs font-semibold text-gray-900 sm:mb-1 sm:text-sm lg:text-base">{loan.book.title}</h3>
                                                            <p className="mb-1 truncate text-[10px] text-gray-600 sm:mb-2 sm:text-xs lg:text-sm">{loan.book.authors.map(a => a.name).join(', ')}</p>
                                                            <div className="flex flex-wrap items-center gap-1.5 text-[10px] sm:gap-2 sm:text-xs lg:gap-3">
                                                                <div className="flex items-center gap-0.5 sm:gap-1">
                                                                    <Calendar className="h-2.5 w-2.5 text-gray-400 sm:h-3 sm:w-3 lg:h-4 lg:w-4" />
                                                                    <span className="text-gray-600">Due: {loan.due_date}</span>
                                                                </div>
                                                                <Badge variant={badge.variant} className="px-1.5 py-0 text-[9px] sm:text-[10px] lg:text-xs">{badge.label}</Badge>
                                                                {loan.book.categories[0] && (
                                                                    <Badge variant="outline" className="px-1.5 py-0 text-[9px] sm:text-[10px] lg:text-xs">{loan.book.categories[0].name}</Badge>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col gap-1 sm:gap-1.5 lg:gap-2">
                                                            <a href={`/assets/book/${loan.book.slug}`}>
                                                                <Button size="sm" variant="outline" className="h-7 px-2 text-[10px] whitespace-nowrap sm:h-8 sm:px-3 sm:text-xs">View</Button>
                                                            </a>
                                                            <a href={`/confirmation/return/book/${loan.book.slug}/${loan.loan_code}`}>
                                                                <Button size="sm" className="h-7 bg-primary px-2 text-[10px] whitespace-nowrap sm:h-8 sm:px-3 sm:text-xs">Return</Button>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </Card>
                                            </motion.div>
                                        );
                                    }) : (
                                        <div className="flex h-48 flex-col items-center justify-center gap-2 text-gray-400">
                                            <BookOpen className="h-10 w-10 opacity-30" />
                                            <p className="text-sm">No active loans found</p>
                                        </div>
                                    )
                                ) : (
                                    returnBooks.data.length > 0 ? returnBooks.data.map((ret, i) => (
                                        <motion.div key={ret.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.9 + i * 0.1 }}>
                                            <Card className="p-2.5 transition-shadow hover:shadow-lg sm:p-3 lg:p-5">
                                                <div className="flex gap-2 sm:gap-3 lg:gap-4">
                                                    <div className="h-16 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100 sm:h-24 sm:w-16 lg:h-28 lg:w-20">
                                                        <ImageWithFallback src={ret.book.cover ?? undefined} alt={ret.book.title} className="h-full w-full object-cover" />
                                                    </div>
                                                    <div className="min-w-0 flex-1">
                                                        <h3 className="mb-0.5 truncate text-xs font-semibold text-gray-900 sm:mb-1 sm:text-sm lg:text-base">{ret.book.title}</h3>
                                                        <p className="mb-1 truncate text-[10px] text-gray-600 sm:mb-2 sm:text-xs lg:text-sm">{ret.book.authors.map(a => a.name).join(', ')}</p>
                                                        <div className="flex flex-wrap items-center gap-1.5 text-[10px] sm:gap-2 sm:text-xs lg:gap-3">
                                                            <div className="flex items-center gap-0.5 sm:gap-1">
                                                                <Calendar className="h-2.5 w-2.5 text-gray-400 sm:h-3 sm:w-3 lg:h-4 lg:w-4" />
                                                                <span className="text-gray-600">Returned: {ret.return_date}</span>
                                                            </div>
                                                            <Badge variant={ret.return_status_color === 'danger' ? 'destructive' : 'secondary'} className="px-1.5 py-0 text-[9px] sm:text-[10px] lg:text-xs">
                                                                {ret.return_status_label}
                                                            </Badge>
                                                            {ret.has_fine && ret.fine_amount != null && (
                                                                <Badge variant="destructive" className="px-1.5 py-0 text-[9px] sm:text-[10px] lg:text-xs">
                                                                    Rp {ret.fine_amount.toLocaleString('id-ID')}
                                                                </Badge>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col gap-1 sm:gap-1.5">
                                                        <a href={`/dashboard/return/${ret.return_book_code}`}>
                                                            <Button size="sm" variant="outline" className="h-7 px-2 text-[10px] whitespace-nowrap sm:h-8 sm:px-3 sm:text-xs">Detail</Button>
                                                        </a>
                                                    </div>
                                                </div>
                                            </Card>
                                        </motion.div>
                                    )) : (
                                        <div className="flex h-48 flex-col items-center justify-center gap-2 text-gray-400">
                                            <RotateCcw className="h-10 w-10 opacity-30" />
                                            <p className="text-sm">No return history found</p>
                                        </div>
                                    )
                                )}
                            </div>

                            {pagination.meta.total > 0 && (
                                <Pagination
                                    page={pagination.meta.current_page}
                                    total={pagination.meta.total}
                                    perPage={pagination.meta.per_page}
                                    onPageChange={handlePageChange}
                                    onPerPageChange={handlePerPageChange}
                                />
                            )}
                        </motion.div>
                    </div>

                    {/* Sidebar */}
                    <div className="flex flex-col gap-3 sm:gap-4 lg:gap-6">
                        {/* Quick Actions */}
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }}>
                            <Card className="p-3 sm:p-4 lg:p-6">
                                <h3 className="mb-2 text-sm font-semibold text-gray-900 sm:mb-3 sm:text-base lg:mb-4 lg:text-lg">Quick Actions</h3>
                                <div className="space-y-1.5 sm:space-y-2">
                                    <a href="/catalog/books" className="block">
                                        <Button variant="outline" className="h-8 w-full justify-start gap-2 text-xs sm:h-9 sm:text-sm lg:h-10 lg:text-base">
                                            <BookOpen className="h-3 w-3 sm:h-3.5 sm:w-3.5 lg:h-4 lg:w-4" /> Browse Books
                                        </Button>
                                    </a>
                                    <Button
                                        variant={activeTab === 'borrowed' ? 'default' : 'outline'}
                                        className={`h-8 w-full justify-start gap-2 text-xs sm:h-9 sm:text-sm lg:h-10 lg:text-base ${activeTab === 'borrowed' ? 'bg-primary text-white' : ''}`}
                                        onClick={() => handleTabChange('borrowed')}
                                    >
                                        <History className="h-3 w-3 sm:h-3.5 sm:w-3.5 lg:h-4 lg:w-4" /> Borrow History
                                    </Button>
                                    <Button
                                        variant={activeTab === 'returned' ? 'default' : 'outline'}
                                        className={`h-8 w-full justify-start gap-2 text-xs sm:h-9 sm:text-sm lg:h-10 lg:text-base ${activeTab === 'returned' ? 'bg-primary text-white' : ''}`}
                                        onClick={() => handleTabChange('returned')}
                                    >
                                        <RotateCcw className="h-3 w-3 sm:h-3.5 sm:w-3.5 lg:h-4 lg:w-4" /> Return History
                                    </Button>
                                </div>
                            </Card>
                        </motion.div>

                        {/* Filters */}
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }}>
                            <Card className="p-3 sm:p-4 lg:p-6">
                                <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-900 sm:mb-4 sm:text-base lg:mb-6 lg:text-lg">
                                    <Filter className="h-3.5 w-3.5 sm:h-4 sm:w-4 lg:h-5 lg:w-5" /> Filter Options
                                </h3>
                                <div className="space-y-3 sm:space-y-4 lg:space-y-5">
                                    <div>
                                        <label className="mb-1.5 block text-xs font-semibold text-gray-800 sm:mb-2 sm:text-sm">Sort By</label>
                                        <select value={pending.sortBy} onChange={e => setPending(p => ({ ...p, sortBy: e.target.value }))}
                                            className="w-full rounded-lg border border-gray-200 bg-white p-2 text-xs focus:ring-2 focus:ring-primary focus:outline-none sm:p-2.5 sm:text-sm">
                                            <option>Due Date</option>
                                            <option>Title</option>
                                            <option>Author</option>
                                            <option>Borrow Date</option>
                                        </select>
                                    </div>
                                    {activeTab === 'borrowed' && (
                                        <div>
                                            <label className="mb-1.5 block text-xs font-semibold text-gray-800 sm:mb-2 sm:text-sm">Status</label>
                                            <select value={pending.status} onChange={e => setPending(p => ({ ...p, status: e.target.value }))}
                                                className="w-full rounded-lg border border-gray-200 bg-white p-2 text-xs focus:ring-2 focus:ring-primary focus:outline-none sm:p-2.5 sm:text-sm">
                                                <option>All Status</option>
                                                <option>Due Soon</option>
                                                <option>Overdue</option>
                                                <option>On Time</option>
                                            </select>
                                        </div>
                                    )}
                                    <div>
                                        <label className="mb-1.5 block text-xs font-semibold text-gray-800 sm:mb-2 sm:text-sm">Category</label>
                                        <select value={pending.category} onChange={e => setPending(p => ({ ...p, category: e.target.value }))}
                                            className="w-full rounded-lg border border-gray-200 bg-white p-2 text-xs focus:ring-2 focus:ring-primary focus:outline-none sm:p-2.5 sm:text-sm">
                                            <option>All Categories</option>
                                            {categories.map(c => <option key={c}>{c}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="mb-1.5 block text-xs font-semibold text-gray-800 sm:mb-2 sm:text-sm">Date Range</label>
                                        <select value={pending.dateRange} onChange={e => setPending(p => ({ ...p, dateRange: e.target.value }))}
                                            className="w-full rounded-lg border border-gray-200 bg-white p-2 text-xs focus:ring-2 focus:ring-primary focus:outline-none sm:p-2.5 sm:text-sm">
                                            <option>All Time</option>
                                            <option>Last 7 Days</option>
                                            <option>Last 30 Days</option>
                                            <option>Last 3 Months</option>
                                        </select>
                                    </div>
                                    <div className="space-y-1.5 border-t border-gray-200 pt-3 sm:space-y-2">
                                        <Button onClick={handleSubmitFilters} className="w-full bg-primary py-2 text-xs hover:bg-primary/90 sm:py-3 sm:text-sm">
                                            Submit Filters
                                        </Button>
                                        <Button variant="outline" onClick={handleResetFilters} className="w-full py-2 text-xs sm:py-3 sm:text-sm">
                                            Reset Filters
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
