import React, { useMemo, useState } from 'react';

import { motion } from 'framer-motion';
import { Link, router, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import type { ConfirmLoanPageProps } from '@/types/ConfirmLoanPage/ConfirmLoanPageProps';
import { dataLoan } from '@/data/data';
import { Card } from '@/components/ui/card';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import { Label } from '@/components/ui/label';
// import { FaPercentage } from 'react-icons/fa';
import { moneyFormatter } from '@/lib/utils';
import LoanNotification from '@/components/component/Notification/Notification';
import axios from 'axios';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Checkbox } from '@/components/ui/checkbox';

type LoanKey =
    | 'loan.success'
    | 'loan.failed'
    | 'loan.stock_empty'
    | 'loan.only_one_active'
    | 'loan.same_book_active'
    | 'loan.has_unpaid_fine'
    | 'loan.user_not_verified'
    | 'loan.settings_not_configured';

type LoanTranslation = {
    headerNavigation: string;
    days: string;
    borrowingTerms: {
        rule1: string;
        rule2: string;
    };
    checked: string;
} & Record<LoanKey, string>;

type PagePropsWithFlash = ConfirmLoanPageProps & {
    flash?: {
        success?: string;
    };
};
export default function Confirm() {
    const { language } = useLanguage();
    const { props } = usePage<PagePropsWithFlash>();
    const { book, fineSettings, loanPreview } = props;
    const [loading, setLoading] = useState(false);
    const [checkBox, setCheckBox] = useState(false);
    const data = dataLoan[language] as LoanTranslation;
    const [notification, setNotification] = useState<{
        type: 'success' | 'error';
        message: string;
    } | null>(null);

    const t = (key: LoanKey) => data[key] ?? key;

    const calculators = {
        percentage: (price: number, fee: number) => (price * fee) / 100,
        fixed: (_: number, fee: number) => fee,
    };

    const calculateDamageType = useMemo(() => {
        if (!book || !fineSettings) return 0;

        const price = Number(book.price);
        const fee = Number(fineSettings.damage_fee_book);
        const type = fineSettings.damage_discount_type;

        return calculators[type]?.(price, fee) ?? 0;
    }, [book, fineSettings]);

    const calculateLostType = useMemo(() => {
        if (!book || !fineSettings) return 0;

        const price = Number(book.price);
        const fee = Number(fineSettings.lost_fee_book);
        const type = fineSettings.lost_discount_type;

        return calculators[type]?.(price, fee) ?? 0;
    }, [book, fineSettings]);

    const onHandleCheckBoxChange = (checked: boolean) => {
        setCheckBox(checked);
    };

    // 🔥 HANDLE BORROW
    const onHandleBorrowBook = async () => {
        try {
            if (!checkBox) {
                return setNotification({
                    type: 'error',
                    message: data?.checked,
                });
            }
            setLoading(true);

            const response = await axios.post(`/loan/book/${book.slug}`, {
                book_id: book.id,
            });

            setLoading(false);

            const successKey: LoanKey = response.data.message;

            setNotification({
                type: 'success',
                message: t(successKey),
            });

            // 🔥 popup dulu → delay → redirect
            setTimeout(() => {
                router.visit(`/assets/book/${response.data.slug}`);
            }, 1500);
        } catch (error: any) {
            setLoading(false);

            const errorKey =
                (error?.response?.data?.message as string)?.trim() ||
                'loan.failed';

            setNotification({
                type: 'error',
                message: t(errorKey as LoanKey),
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
                <Link href={`/book/detail/${book.slug}`}>
                    <Button variant="ghost" className="mb-6 gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        {data?.headerNavigation}
                    </Button>
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <Card className="p-8">
                        <h1 className="mb-6 font-['Poppins'] text-2xl font-bold text-gray-900">
                            Borrow Book
                        </h1>

                        {/* Book Summary */}
                        <div className="mb-6 flex gap-4 rounded-lg bg-gray-50 p-4">
                            <div className="h-28 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200">
                                <ImageWithFallback
                                    src={book.cover}
                                    alt={book.title}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <div>
                                <h3 className="mb-1 font-semibold text-gray-900">
                                    {book.title}
                                </h3>
                                <div className="flex flex-1 items-center gap-3 p-2">
                                    {book.authors.map((author, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-center gap-2 p-2"
                                        >
                                            <ImageWithFallback
                                                className="h-8 w-8 rounded-full object-cover object-center"
                                                src={author?.avatar}
                                            />
                                            <p className="text-sm text-gray-600">
                                                {author?.name}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Borrow Duration */}
                        <div className="mb-6">
                            <Label className="mb-2 block">
                                Borrow Duration
                            </Label>
                            <Label>
                                {loanPreview.duration} {data.days}
                            </Label>
                        </div>

                        {/* Due Date Info */}
                        <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
                            <div className="flex items-start gap-3">
                                <Calendar className="mt-0.5 h-5 w-5 text-blue-600" />
                                <div>
                                    <p className="mb-1 font-medium text-blue-900">
                                        Due Date
                                    </p>
                                    <p className="text-sm text-blue-700">
                                        {loanPreview.due_date}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Terms */}
                        <div className="mb-6 rounded-lg bg-gray-50 p-4">
                            <h4 className="mb-2 font-medium text-gray-900">
                                Borrowing Terms
                            </h4>
                            <ul className="list-disc space-y-1 pl-3 text-justify text-sm text-gray-600">
                                <li>
                                    Return the book on or before the due date
                                </li>
                                <li>Late returns incur a fine of $1 per day</li>
                                {fineSettings.damage_discount_type ===
                                'percentage' ? (
                                    <li className="w-full list-disc items-center">
                                        Damage type{' '}
                                        {fineSettings.damage_discount_type} {''}
                                        {fineSettings.damage_fee_book}% from
                                        total price book{' '}
                                        {moneyFormatter(book?.price ?? 0)}{' '}
                                        equals to {''}
                                        {moneyFormatter(calculateDamageType)}
                                    </li>
                                ) : (
                                    <li>cndncdbn</li>
                                )}
                                {fineSettings.lost_discount_type ===
                                'percentage' ? (
                                    <li className="w-full list-disc items-center">
                                        Lost type{' '}
                                        {fineSettings.lost_discount_type} {''}
                                        {fineSettings.lost_fee_book}% from total
                                        price book{' '}
                                        {moneyFormatter(book?.price ?? 0)}{' '}
                                        equals to {''}
                                        {moneyFormatter(calculateLostType)}
                                    </li>
                                ) : (
                                    <li>cndncdbn</li>
                                )}
                                <li>Take good care of the book</li>
                                <li>Report any damage immediately</li>
                            </ul>
                        </div>

                        <FieldGroup className="w-full">
                            <Field
                                orientation="horizontal"
                                data-invalid={
                                    !checkBox && notification?.type === 'error'
                                }
                            >
                                <Checkbox
                                    checked={checkBox}
                                    id="terms-checkbox-invalid"
                                    name="terms-checkbox-invalid"
                                    aria-invalid
                                    onCheckedChange={onHandleCheckBoxChange}
                                />
                                <FieldLabel htmlFor="terms-checkbox-invalid">
                                    {data?.checked}
                                </FieldLabel>
                            </Field>
                        </FieldGroup>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                            <Button
                                onClick={onHandleBorrowBook}
                                className="flex-1 bg-primary hover:bg-primary/90"
                                size="lg"
                                disabled={loading}
                            >
                                {loading ? 'Processing...' : 'Confirm Borrow'}
                            </Button>
                            <Link
                                href={`/book/detail/${book.slug}`}
                                className="flex-1"
                            >
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

                {notification && (
                    <LoanNotification
                        notification={notification}
                        onClose={() => setNotification(null)}
                    />
                )}
            </div>
        </div>
    );
}
