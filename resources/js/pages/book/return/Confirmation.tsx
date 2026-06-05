import React, { useState } from 'react';
import { usePage, Link, router } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import { formattedDate, moneyFormatter } from '@/lib/utils';
import Notification from '@/components/component/Notification/Notification';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/hooks/useLanguage';

export default function Confirmation() {
    const { data } = usePage<any>().props;
    const { book, loan, late_fee, total_fee, late_days, has_review } = data;
    const {language} = useLanguage();

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

    // Dynamic days remaining calculation
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dueDate = new Date(loan.due_date);
    dueDate.setHours(0, 0, 0, 0);

    const diffTime = dueDate.getTime() - today.getTime();
    const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let daysLeftText = '';
    let daysLeftColor = '';

    if (daysLeft < 0) {
        daysLeftText = `Overdue by ${Math.abs(daysLeft)} days`;
        daysLeftColor = 'text-red-600';
    } else if (daysLeft <= 3) {
        daysLeftText = `${daysLeft} days remaining`;
        daysLeftColor = 'text-yellow-500';
    } else {
        daysLeftText = `${daysLeft} days remaining`;
        daysLeftColor = 'text-green-600';
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
                    message: 'Book returned successfully! Thank you for your feedback.',
                });
            },
            onError: (errors: Record<string, string>) => {
                setIsSubmitting(false);
                setNotification({
                    type: 'error',
                    message: errors.message || 'Failed to return the book',
                });
            },
            onFinish: () => {
                setIsSubmitting(false);
            },
        });
    };

    const handleConfirmReturn = () => {
        if (!isValidated) {
            setNotification({
                type: 'error',
                message: 'Please validate the return data by checking the checkbox',
            });
            return;
        }
        if (has_review) {
            submitReturn(false);
        } else {
            setShowRatingForm(true);
        }
    };

    const handleSubmitRating = () => {
        if (rating === 0) {
            setNotification({
                type: 'error',
                message: 'Please select a rating before submitting',
            });
            return;
        }
        submitReturn(true);
    };

    const authorNames =
        book?.authors?.map((a: any) => a.name).join(', ') || 'Unknown Author';

    return (
        <div className="min-h-screen bg-background py-8">
            <div className="container mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
                <Link href={`/dashboard/loans`}>
                    <Button variant="ghost" className="mb-6 gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Loans
                    </Button>
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <Card className="p-8">
                        <h1 className="mb-6 font-display text-2xl font-bold text-foreground">
                            Return Book
                        </h1>

                        {/* Book Info */}
                        <div className="mb-6">
                            <Label className="mb-3 block">Book to Return</Label>
                            <div className="flex items-center gap-4 rounded-lg border border-border bg-background p-4">
                                <div className="h-20 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                                    <ImageWithFallback
                                        src={book?.cover}
                                        alt={book?.title}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-foreground">
                                        {book?.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        {authorNames}
                                    </p>
                                    <p className="mt-1 text-xs text-muted-foreground">
                                        Due Date: {formattedDate(loan?.due_date, language)}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Return Summary */}
                        <div className="mb-6 rounded-lg border border-cobalt-50 bg-cobalt-50 p-4">
                            <h4 className="mb-3 font-medium text-foreground">
                                Return Summary
                            </h4>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">
                                        Borrow Date:
                                    </span>
                                    <span className="text-foreground">
                                        {formattedDate(loan?.loan_date, language)}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">
                                        Due Date:
                                    </span>
                                    <span className="text-foreground">
                                        {formattedDate(loan?.due_date, language)}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">
                                        Status:
                                    </span>
                                    <span
                                        className={`font-medium ${daysLeftColor}`}
                                    >
                                        {daysLeftText}
                                    </span>
                                </div>
                                <div className="flex justify-between border-t border-cobalt-lt pt-2">
                                    <span className="font-medium text-muted-foreground">
                                        Late Fee:
                                    </span>
                                    <span
                                        className={`font-medium ${
                                            Number(late_fee || 0) > 0
                                                ? 'text-red-600'
                                                : 'text-green-600'
                                        }`}
                                    >
                                        {moneyFormatter(late_fee || 0)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Validation Checkbox */}
                        <div className="mb-6 rounded-lg border border-brass-lt bg-brass-50 p-4">
                            <div className="flex items-start gap-3">
                                <Checkbox
                                    id="validate"
                                    checked={isValidated}
                                    onCheckedChange={(checked) =>
                                        setIsValidated(checked as boolean)
                                    }
                                    className="mt-1"
                                />
                                <div className="flex-1">
                                    <label
                                        htmlFor="validate"
                                        className="mb-1 block cursor-pointer font-medium text-foreground"
                                    >
                                        Validate Return Data
                                    </label>
                                    <p className="text-sm text-muted-foreground">
                                        I confirm that the book is in good
                                        condition and all borrowed materials are
                                        being returned.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                            <Button
                                onClick={handleConfirmReturn}
                                className="flex-1 bg-primary hover:bg-primary/90"
                                size="lg"
                                disabled={!isValidated}
                            >
                                Confirm Return
                            </Button>
                            <Link href={`/dashboard/loans`} className="flex-1">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="w-full"
                                >
                                    Cancel
                                </Button>
                            </Link>
                        </div>
                    </Card>
                </motion.div>

                {/* Rating Form Modal */}
                <AnimatePresence>
                    {showRatingForm && (
                        <>
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => {}}
                                className="fixed inset-0 z-40 bg-black/50"
                            />

                            {/* Modal */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                            >
                                <Card className="w-full max-w-md p-6">
                                    <h2 className="mb-4 font-display text-xl font-bold text-foreground">
                                        Rate Your Experience
                                    </h2>

                                    <p className="mb-6 text-muted-foreground">
                                        How would you rate "{book?.title}"?
                                    </p>

                                    {/* Star Rating */}
                                    <div className="mb-6">
                                        <Label className="mb-3 block">
                                            Your Rating
                                        </Label>
                                        <div className="mb-2 flex justify-center gap-2">
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
                                                    className="transition-transform hover:scale-110"
                                                >
                                                    <Star
                                                        className={`h-10 w-10 ${
                                                            star <=
                                                            (hoverRating ||
                                                                rating)
                                                                ? 'fill-yellow-400 text-yellow-400'
                                                                : 'text-muted-foreground'
                                                        }`}
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                        {rating > 0 && (
                                            <p className="text-center text-sm text-muted-foreground">
                                                {rating}{' '}
                                                {rating === 1
                                                    ? 'star'
                                                    : 'stars'}
                                            </p>
                                        )}
                                    </div>

                                    {/* Review Message */}
                                    <div className="mb-6">
                                        <Label
                                            htmlFor="review"
                                            className="mb-2 block"
                                        >
                                            Your Review (Optional)
                                        </Label>
                                        <Textarea
                                            id="review"
                                            placeholder="Share your thoughts about this book..."
                                            value={reviewMessage}
                                            onChange={(e) =>
                                                setReviewMessage(e.target.value)
                                            }
                                            rows={4}
                                            className="resize-none"
                                        />
                                    </div>

                                    {/* Modal Actions */}
                                    <div className="flex gap-3">
                                        <Button
                                            onClick={handleSubmitRating}
                                            className="flex-1 bg-primary hover:bg-primary/90"
                                            disabled={
                                                rating === 0 || isSubmitting
                                            }
                                        >
                                            {isSubmitting
                                                ? 'Submitting...'
                                                : 'Submit Review'}
                                        </Button>
                                        <Button
                                            variant="outline"
                                            onClick={() =>
                                                setShowRatingForm(false)
                                            }
                                            disabled={isSubmitting}
                                            className="flex-1"
                                        >
                                            Cancel
                                        </Button>
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
