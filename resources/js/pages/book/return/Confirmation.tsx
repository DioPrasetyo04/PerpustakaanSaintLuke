import { useEffect, useState } from 'react';
import { usePage, Link, router } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft,
    Star,
    CalendarClock,
    CheckCircle2,
    ShieldCheck,
} from 'lucide-react';
import BookTypeBadge from '@/components/common/BookTypeBadge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import { cn, formattedDate, moneyFormatter } from '@/lib/utils';
import Notification from '@/components/component/Notification/Notification';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/hooks/useLanguage';
import { returnConfirmPage } from '@/data/data';

export default function Confirmation() {
    const { data, fineSettingsConfigured } = usePage<any>().props;
    const { book, loan, late_fee, has_review, loan_type } = data;
    const { language } = useLanguage();
    const t = returnConfirmPage[language];

    // Pengaturan denda belum dikonfigurasi admin → tolak pengembalian. Saat
    // halaman dibuka, munculkan popup multi-bahasa "Pengaturan Denda Belum
    // Diatur" (tanpa redirect) dan blokir tombol konfirmasi di bawah.
    const fineUnset = fineSettingsConfigured === false;
    useEffect(() => {
        if (!fineUnset) return;
        // Defer: pada full page load, effect anak ini jalan SEBELUM listener
        // AccessDeniedModal (parent di app.tsx) terpasang. Tunda satu tick agar
        // event 'access-denied' tidak terlewat.
        const id = window.setTimeout(() => {
            window.dispatchEvent(
                new CustomEvent('access-denied', { detail: 'fine_unset' }),
            );
        }, 0);
        return () => window.clearTimeout(id);
    }, [fineUnset]);

    // Alur frontend kini 100% digital (peminjaman fisik dihapus). Hanya pinjaman
    // yang eksplisit 'physical' (mis. dibuat admin) yang diperlakukan fisik;
    // digital & data lama (loan_type NULL) → diperlakukan sebagai akses digital.
    const isDigital = loan_type !== 'physical';

    // Untuk akses digital, navigasi "kembali" mengarah ke halaman aset buku
    // (pinjaman masih aktif selama belum dikonfirmasi pengembalian).
    const backHref = isDigital
        ? `/assets/book/${book.slug}`
        : '/dashboard/loans';
    const backLabel = isDigital ? t.backToBook : t.back;

    const [isValidated, setIsValidated] = useState(false);
    const [showRatingForm, setShowRatingForm] = useState(false);
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [reviewMessage, setReviewMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [notification, setNotification] = useState<{
        type: 'success' | 'error';
        message: string;
    } | null>(null);

    // Sisa hari hingga jatuh tempo / batas akses.
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(loan.due_date);
    dueDate.setHours(0, 0, 0, 0);
    const daysLeft = Math.ceil(
        (dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
    );

    let daysLeftText = '';
    let daysLeftColor = '';
    if (daysLeft < 0) {
        const n = Math.abs(daysLeft);
        daysLeftText =
            language === 'id' ? `Terlambat ${n} hari` : `Overdue by ${n} days`;
        daysLeftColor = 'text-red-600 dark:text-red-400';
    } else {
        daysLeftText =
            language === 'id'
                ? `${daysLeft} hari tersisa`
                : `${daysLeft} days remaining`;
        daysLeftColor =
            daysLeft <= 3
                ? 'text-amber-600 dark:text-amber-400'
                : 'text-emerald-600 dark:text-emerald-400';
    }

    const submitReturn = (withRating: boolean) => {
        setIsSubmitting(true);

        const payload: Record<string, unknown> = {
            slug: book.slug,
            loan_code: loan.loan_code,
            condition: 'Baik',
        };

        if (withRating) {
            payload.rating = rating;
            payload.comment = reviewMessage;
        }

        router.post(`/return/book/${book.slug}`, payload, {
            onSuccess: () => {
                setNotification({
                    type: 'success',
                    message: t.returnSuccess,
                });
            },
            onError: (errors: Record<string, string>) => {
                setIsSubmitting(false);
                setNotification({
                    type: 'error',
                    message: errors.message || t.returnFailed,
                });
            },
            onFinish: () => setIsSubmitting(false),
        });
    };

    const handleConfirmReturn = () => {
        // Denda belum diatur → munculkan kembali popup penolakan, jangan proses.
        if (fineUnset) {
            window.dispatchEvent(
                new CustomEvent('access-denied', { detail: 'fine_unset' }),
            );
            return;
        }
        if (!isValidated) {
            setNotification({ type: 'error', message: t.validateError });
            return;
        }
        // Sudah pernah review buku ini → langsung kembalikan tanpa modal.
        if (has_review) {
            submitReturn(false);
        } else {
            setShowRatingForm(true);
        }
    };

    const handleSubmitRating = () => {
        if (rating === 0) {
            setNotification({ type: 'error', message: t.ratingError });
            return;
        }
        submitReturn(true);
    };

    const authorNames =
        book?.authors?.map((a: any) => a.name).join(', ') || 'Unknown Author';

    return (
        <div className="min-h-screen bg-background py-8">
            <div className="container mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
                <Link href={backHref}>
                    <Button variant="ghost" className="mb-6 gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        {backLabel}
                    </Button>
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <Card className="hairline overflow-hidden border p-0 dark:bg-night-2">
                        {/* Header band */}
                        <div className="hairline relative overflow-hidden border-b px-8 py-6">
                            <div className="hero-mesh pointer-events-none absolute inset-0 opacity-60" />
                            <div className="relative flex items-center justify-between gap-4">
                                <div>
                                    <p className="tracking-editorial font-mono text-[10px] uppercase text-muted-foreground">
                                        {isDigital
                                            ? language === 'id'
                                                ? 'Akhiri Akses Digital'
                                                : 'End Digital Access'
                                            : language === 'id'
                                              ? 'Proses Pengembalian'
                                              : 'Return Process'}
                                    </p>
                                    <h1 className="mt-1 font-display text-2xl font-bold text-foreground">
                                        {t.title}
                                    </h1>
                                </div>
                                {/* Semua format yang dimiliki buku (Digital & Fisik) */}
                                <div className="flex flex-wrap items-center justify-end gap-1.5">
                                    <BookTypeBadge
                                        types={book?.types}
                                        size="md"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="p-8">
                            {/* Book Info */}
                            <Label className="tracking-editorial mb-3 block font-mono text-[10px] uppercase text-muted-foreground">
                                {t.bookToReturn}
                            </Label>
                            <div className="hairline mb-6 flex items-center gap-4 rounded-xl2 border bg-card p-4 dark:bg-night-3">
                                <div className="h-24 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-muted shadow-sm ring-1 ring-border">
                                    <ImageWithFallback
                                        src={book?.cover}
                                        alt={book?.title}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-display text-lg font-semibold text-foreground">
                                        {book?.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground italic">
                                        {authorNames}
                                    </p>
                                    <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                                        <CalendarClock className="h-3.5 w-3.5 text-cobalt dark:text-cobalt-lt" />
                                        {t.dueDate}:{' '}
                                        {formattedDate(loan?.due_date, language)}
                                    </p>
                                </div>
                            </div>

                            {/* Summary */}
                            <div className="hairline mb-6 rounded-xl2 border bg-cobalt-50 p-5 dark:border-cobalt/20 dark:bg-cobalt/10">
                                <h4 className="mb-4 flex items-center gap-2 font-display font-semibold text-foreground">
                                    <CalendarClock className="h-4 w-4 text-cobalt dark:text-cobalt-lt" />
                                    {isDigital
                                        ? t.summaryDigital
                                        : t.summaryPhysical}
                                </h4>
                                <div className="space-y-2.5 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">
                                            {isDigital
                                                ? t.accessDate
                                                : t.borrowDate}
                                        </span>
                                        <span className="font-medium text-foreground tabnum">
                                            {formattedDate(
                                                loan?.loan_date,
                                                language,
                                            )}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">
                                            {isDigital
                                                ? t.accessUntil
                                                : t.dueDateLabel}
                                        </span>
                                        <span className="font-medium text-foreground tabnum">
                                            {formattedDate(
                                                loan?.due_date,
                                                language,
                                            )}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">
                                            {t.status}
                                        </span>
                                        <span
                                            className={cn(
                                                'font-semibold',
                                                daysLeftColor,
                                            )}
                                        >
                                            {daysLeftText}
                                        </span>
                                    </div>

                                    {/* Biaya: digital tanpa denda, fisik tampil late fee */}
                                    {isDigital ? (
                                        <div className="mt-2 flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-2.5 text-emerald-700 dark:text-emerald-400">
                                            <ShieldCheck className="h-4 w-4 flex-shrink-0" />
                                            <span className="text-xs font-medium">
                                                {t.digitalNoFee}
                                            </span>
                                        </div>
                                    ) : (
                                        <div className="hairline flex justify-between border-t pt-2.5">
                                            <span className="font-medium text-muted-foreground">
                                                {t.lateFee}
                                            </span>
                                            <span
                                                className={cn(
                                                    'font-semibold',
                                                    Number(late_fee || 0) > 0
                                                        ? 'text-red-600 dark:text-red-400'
                                                        : 'text-emerald-600 dark:text-emerald-400',
                                                )}
                                            >
                                                {moneyFormatter(late_fee || 0)}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Validation Checkbox */}
                            <label
                                htmlFor="validate"
                                className={cn(
                                    'mb-6 flex cursor-pointer items-start gap-3 rounded-xl2 border p-4 transition-colors',
                                    isValidated
                                        ? 'border-cobalt bg-cobalt-50 dark:border-cobalt/40 dark:bg-cobalt/10'
                                        : 'hairline bg-card hover:border-cobalt/50 dark:bg-night-3',
                                )}
                            >
                                <Checkbox
                                    id="validate"
                                    checked={isValidated}
                                    onCheckedChange={(checked) =>
                                        setIsValidated(checked as boolean)
                                    }
                                    className="mt-0.5"
                                />
                                <div className="flex-1">
                                    <span className="mb-1 block font-medium text-foreground">
                                        {t.validateTitle}
                                    </span>
                                    <p className="text-sm text-muted-foreground">
                                        {isDigital
                                            ? t.validateDescDigital
                                            : t.validateDescPhysical}
                                    </p>
                                </div>
                            </label>

                            {/* Action Buttons */}
                            <div className="flex gap-3">
                                <Button
                                    onClick={handleConfirmReturn}
                                    className="flex-1 gap-2 bg-cobalt text-white hover:bg-cobalt-dk"
                                    size="lg"
                                    disabled={
                                        !isValidated || isSubmitting || fineUnset
                                    }
                                >
                                    <CheckCircle2 className="h-4 w-4" />
                                    {isDigital
                                        ? t.confirmReturnDigital
                                        : t.confirmReturn}
                                </Button>
                                <Link href={backHref} className="flex-1">
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        className="w-full"
                                    >
                                        {t.cancel}
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </Card>
                </motion.div>

                {/* Rating Form Modal */}
                <AnimatePresence>
                    {showRatingForm && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() =>
                                    !isSubmitting && setShowRatingForm(false)
                                }
                                className="fixed inset-0 z-40 bg-ink/60 backdrop-blur-sm"
                            />

                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                            >
                                <Card className="hairline w-full max-w-md overflow-hidden border p-0 shadow-2xl dark:bg-night-2">
                                    {/* Modal header w/ book info */}
                                    <div className="hairline relative overflow-hidden border-b p-6">
                                        <div className="hero-mesh pointer-events-none absolute inset-0 opacity-60" />
                                        <div className="relative">
                                            <h2 className="font-display text-xl font-bold text-foreground">
                                                {t.rateTitle}
                                            </h2>
                                            <p className="mt-0.5 text-sm text-muted-foreground">
                                                {t.rateSubtitle}
                                            </p>
                                            <div className="mt-4 flex items-center gap-3">
                                                <div className="h-20 w-14 flex-shrink-0 overflow-hidden rounded-lg bg-muted shadow-sm ring-1 ring-border">
                                                    <ImageWithFallback
                                                        src={book?.cover}
                                                        alt={book?.title}
                                                        className="h-full w-full object-cover"
                                                    />
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="truncate font-display font-semibold text-foreground">
                                                        {book?.title}
                                                    </p>
                                                    <p className="truncate text-sm text-muted-foreground italic">
                                                        {authorNames}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        {/* Star Rating */}
                                        <Label className="tracking-editorial mb-3 block font-mono text-[10px] uppercase text-muted-foreground">
                                            {t.yourRating}
                                        </Label>
                                        <div className="mb-1 flex justify-center gap-2">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    type="button"
                                                    onClick={() =>
                                                        setRating(star)
                                                    }
                                                    onMouseEnter={() =>
                                                        setHoverRating(star)
                                                    }
                                                    onMouseLeave={() =>
                                                        setHoverRating(0)
                                                    }
                                                    className="btn-press transition-transform hover:scale-110"
                                                >
                                                    <Star
                                                        className={cn(
                                                            'h-10 w-10 transition-colors',
                                                            star <=
                                                                (hoverRating ||
                                                                    rating)
                                                                ? 'fill-brass-lt text-brass-lt'
                                                                : 'text-muted-foreground/40',
                                                        )}
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                        <p className="mb-6 h-5 text-center text-sm font-medium text-brass dark:text-brass-lt">
                                            {(hoverRating || rating) > 0
                                                ? t.ratingHints[
                                                      (hoverRating || rating) - 1
                                                  ]
                                                : ''}
                                        </p>

                                        {/* Review Message */}
                                        <div className="mb-6">
                                            <Label
                                                htmlFor="review"
                                                className="mb-2 flex items-center gap-2"
                                            >
                                                {t.yourReview}
                                                <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-normal text-muted-foreground">
                                                    {t.optional}
                                                </span>
                                            </Label>
                                            <Textarea
                                                id="review"
                                                placeholder={t.reviewPlaceholder}
                                                value={reviewMessage}
                                                onChange={(e) =>
                                                    setReviewMessage(
                                                        e.target.value,
                                                    )
                                                }
                                                rows={4}
                                                className="resize-none"
                                            />
                                        </div>

                                        {/* Modal Actions */}
                                        <div className="flex gap-3">
                                            <Button
                                                onClick={handleSubmitRating}
                                                className="flex-1 bg-cobalt text-white hover:bg-cobalt-dk"
                                                disabled={
                                                    rating === 0 || isSubmitting
                                                }
                                            >
                                                {isSubmitting
                                                    ? t.submitting
                                                    : t.submitReview}
                                            </Button>
                                            <Button
                                                variant="outline"
                                                onClick={() =>
                                                    setShowRatingForm(false)
                                                }
                                                disabled={isSubmitting}
                                                className="flex-1"
                                            >
                                                {t.cancel}
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>

                {notification && (
                    <Notification
                        notification={notification}
                        onClose={() => setNotification(null)}
                    />
                )}
            </div>
        </div>
    );
}
