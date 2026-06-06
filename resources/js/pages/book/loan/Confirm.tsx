import { useState } from 'react';

import { motion } from 'framer-motion';
import { Link, router, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, BookOpen } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import type { ConfirmLoanPageProps } from '@/types/ConfirmLoanPage/ConfirmLoanPageProps';
import { dataLoan } from '@/data/data';
import { Card } from '@/components/ui/card';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import { Label } from '@/components/ui/label';
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
    | 'loan.not_digital'
    | 'loan.already_reading'
    | 'loan.settings_not_configured';

type LoanTranslation = {
    headerNavigation: string;
    days: string;
    confirmTitle: string;
    accessDuration: string;
    accessDeadline: string;
    accessTermsTitle: string;
    accessTerms: string[];
    confirmButton: string;
    processing: string;
    cancel: string;
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
    const { book, loanPreview } = props;
    const [loading, setLoading] = useState(false);
    const [checkBox, setCheckBox] = useState(false);
    const data = dataLoan[language] as LoanTranslation;
    const [notification, setNotification] = useState<{
        type: 'success' | 'error';
        message: string;
    } | null>(null);

    const t = (key: LoanKey) => data[key] ?? key;

    const onHandleCheckBoxChange = (checked: boolean) => {
        setCheckBox(checked);
    };

    // 🔥 KONFIRMASI BACA BUKU DIGITAL
    // Memakai alur peminjaman DIGITAL (loan_type digital) yang otomatis
    // dikembalikan saat masa akses berakhir, lalu membuka aset buku.
    const onHandleReadBook = async () => {
        try {
            if (!checkBox) {
                return setNotification({
                    type: 'error',
                    message: data?.checked,
                });
            }
            setLoading(true);

            const response = await axios.post(
                `/loan/digital/book/${book.slug}`,
            );

            setLoading(false);

            const successKey: LoanKey = response.data.message;

            setNotification({
                type: 'success',
                message: t(successKey),
            });

            // 🔥 popup dulu → delay → buka aset buku
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
        <div className="min-h-screen bg-background py-8">
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
                        <h1 className="mb-6 font-display text-2xl font-bold text-foreground">
                            {data.confirmTitle}
                        </h1>

                        {/* Book Summary */}
                        <div className="mb-6 flex gap-4 rounded-lg bg-background p-4">
                            <div className="h-28 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                                <ImageWithFallback
                                    src={book.cover}
                                    alt={book.title}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <div>
                                <h3 className="mb-1 font-semibold text-foreground">
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
                                            <p className="text-sm text-muted-foreground">
                                                {author?.name}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Access Duration */}
                        <div className="mb-6">
                            <Label className="mb-2 block">
                                {data.accessDuration}
                            </Label>
                            <Label>
                                {loanPreview.duration} {data.days}
                            </Label>
                        </div>

                        {/* Access Deadline Info */}
                        <div className="mb-6 rounded-lg border border-cobalt-lt bg-cobalt-50 p-4">
                            <div className="flex items-start gap-3">
                                <Calendar className="mt-0.5 h-5 w-5 text-cobalt-dk" />
                                <div>
                                    <p className="mb-1 font-medium text-ink">
                                        {data.accessDeadline}
                                    </p>
                                    <p className="text-sm text-cobalt-dk">
                                        {loanPreview.due_date}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Access Terms */}
                        <div className="mb-6 rounded-lg bg-background p-4">
                            <h4 className="mb-2 font-medium text-foreground">
                                {data.accessTermsTitle}
                            </h4>
                            <ul className="list-disc space-y-1 pl-3 text-justify text-sm text-muted-foreground">
                                {data.accessTerms.map((term, index) => (
                                    <li key={index}>{term}</li>
                                ))}
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
                                onClick={onHandleReadBook}
                                className="flex-1 gap-2 bg-primary hover:bg-primary/90"
                                size="lg"
                                disabled={loading}
                            >
                                {loading ? (
                                    data.processing
                                ) : (
                                    <>
                                        {data.confirmButton}
                                        <BookOpen className="h-4 w-4" />
                                    </>
                                )}
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
                                    {data.cancel}
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
