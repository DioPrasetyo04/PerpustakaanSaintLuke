import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, ArrowLeft, RefreshCw, Mail, Phone } from 'lucide-react';
import { Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import { moneyFormatter } from '@/lib/utils';
import { payFine } from '@/lib/midtrans';

type FineProp = {
    id: string;
    book_title: string | null;
    category: string | null;
    cover_url: string | null;
    amount: number;
};

export default function PaymentError() {
    const { fine, message } = usePage<{
        fine: FineProp | null;
        message: string | null;
    }>().props;
    const [isRetrying, setIsRetrying] = useState(false);

    const errorMessage =
        message || 'An unexpected error occurred during payment processing';

    const handleRetryPayment = async () => {
        if (!fine) return;
        setIsRetrying(true);
        const result = await payFine(fine.id);
        if (!result.ok) setIsRetrying(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 py-12 dark:from-orange-950/20 dark:via-background dark:to-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl">
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                        className="mb-8 text-center"
                    >
                        <div className="mb-6 inline-flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-red-600 shadow-2xl">
                            <AlertTriangle className="h-14 w-14 text-white" />
                        </div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="mb-3 font-display text-3xl font-bold text-foreground sm:text-4xl"
                        >
                            Payment Error
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-lg text-muted-foreground"
                        >
                            We encountered a problem processing your payment
                        </motion.p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <Card className="mb-6 border-2 border-orange-100 bg-red-50/30 p-6 shadow-xl dark:border-orange-900/40 dark:bg-red-950/20">
                            <div className="mb-4 flex items-start gap-3">
                                <AlertTriangle className="mt-1 h-6 w-6 flex-shrink-0 text-orange-600 dark:text-orange-400" />
                                <div>
                                    <h2 className="mb-2 font-display text-xl font-bold text-foreground">
                                        Error Details
                                    </h2>
                                    <p className="text-foreground">{errorMessage}</p>
                                </div>
                            </div>
                        </Card>

                        {fine && (
                            <Card className="mb-6 border-2 border-border p-6 shadow-xl">
                                <h3 className="mb-4 font-display text-lg font-bold text-foreground">
                                    Payment Information
                                </h3>

                                <div className="mb-6 flex gap-4 border-b border-border pb-6">
                                    <div className="h-28 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                                        <ImageWithFallback
                                            src={fine.cover_url ?? undefined}
                                            alt={fine.book_title ?? ''}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="mb-2 font-semibold text-foreground">
                                            {fine.book_title}
                                        </h3>
                                        {fine.category && (
                                            <Badge variant="outline" className="mb-2">
                                                {fine.category}
                                            </Badge>
                                        )}
                                        <p className="text-sm text-muted-foreground">
                                            Fine ID: {fine.id}
                                        </p>
                                    </div>
                                </div>

                                <div className="mb-6 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-muted-foreground">Status:</span>
                                        <Badge className="bg-orange-500">
                                            <AlertTriangle className="mr-1 h-3 w-3" />
                                            Payment Error
                                        </Badge>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-muted-foreground">Fine ID:</span>
                                        <span className="font-medium text-foreground">
                                            {fine.id}
                                        </span>
                                    </div>
                                </div>

                                <div className="rounded-xl border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-red-50 p-6 dark:border-orange-900/40 dark:from-orange-950/30 dark:to-red-950/20">
                                    <div className="flex items-center justify-between">
                                        <span className="text-lg font-medium text-foreground">
                                            Amount Due:
                                        </span>
                                        <span className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                                            {moneyFormatter(fine.amount)}
                                        </span>
                                    </div>
                                </div>
                            </Card>
                        )}

                        <Card className="mb-6 border-cobalt-lt bg-cobalt-50 p-6 dark:border-cobalt-dk dark:bg-cobalt-dk/15">
                            <h3 className="mb-3 font-semibold text-foreground">
                                Common Causes:
                            </h3>
                            <ul className="space-y-2 text-sm text-foreground">
                                <li className="flex items-start gap-2">
                                    <span className="font-bold text-cobalt-dk">•</span>
                                    <span>Server is temporarily unavailable or experiencing high traffic</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="font-bold text-cobalt-dk">•</span>
                                    <span>Payment gateway connection timeout</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="font-bold text-cobalt-dk">•</span>
                                    <span>Network connectivity issues</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="font-bold text-cobalt-dk">•</span>
                                    <span>Temporary service maintenance</span>
                                </li>
                            </ul>
                        </Card>

                        <div className="mb-6 space-y-3">
                            {fine && (
                                <Button
                                    className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                                    size="lg"
                                    onClick={handleRetryPayment}
                                    disabled={isRetrying}
                                >
                                    {isRetrying ? (
                                        <>
                                            <div className="mr-2 h-5 w-5 animate-spin rounded-full border-b-2 border-white" />
                                            Redirecting...
                                        </>
                                    ) : (
                                        <>
                                            <RefreshCw className="mr-2 h-5 w-5" />
                                            Try Again
                                        </>
                                    )}
                                </Button>
                            )}

                            <Link href="/history?tab=fines" className="block">
                                <Button variant="outline" className="w-full" size="lg">
                                    <ArrowLeft className="mr-2 h-5 w-5" />
                                    Back to Fine History
                                </Button>
                            </Link>
                        </div>

                        <Card className="border-brass-lt bg-gradient-to-br from-brass-50 to-cobalt-50 p-6 dark:border-brass dark:from-brass/15 dark:to-cobalt-dk/15">
                            <h3 className="mb-4 text-center font-semibold text-foreground">
                                Still having issues?
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-center gap-3 text-sm">
                                    <Mail className="h-4 w-4 text-primary" />
                                    <span className="text-foreground">support@library.com</span>
                                </div>
                                <div className="flex items-center justify-center gap-3 text-sm">
                                    <Phone className="h-4 w-4 text-primary" />
                                    <span className="text-foreground">+62 812 3456 7890</span>
                                </div>
                            </div>
                            <p className="mt-4 text-center text-xs text-muted-foreground">
                                Our support team is available to assist you
                            </p>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
