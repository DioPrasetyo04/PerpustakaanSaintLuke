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
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 py-12">
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
                            className="mb-3 font-['Poppins'] text-3xl font-bold text-gray-900 sm:text-4xl"
                        >
                            Payment Error
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-lg text-gray-600"
                        >
                            We encountered a problem processing your payment
                        </motion.p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <Card className="mb-6 border-2 border-orange-100 bg-red-50/30 p-6 shadow-xl">
                            <div className="mb-4 flex items-start gap-3">
                                <AlertTriangle className="mt-1 h-6 w-6 flex-shrink-0 text-orange-600" />
                                <div>
                                    <h2 className="mb-2 font-['Poppins'] text-xl font-bold text-gray-900">
                                        Error Details
                                    </h2>
                                    <p className="text-gray-700">{errorMessage}</p>
                                </div>
                            </div>
                        </Card>

                        {fine && (
                            <Card className="mb-6 border-2 border-gray-200 p-6 shadow-xl">
                                <h3 className="mb-4 font-['Poppins'] text-lg font-bold text-gray-900">
                                    Payment Information
                                </h3>

                                <div className="mb-6 flex gap-4 border-b border-gray-200 pb-6">
                                    <div className="h-28 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                                        <ImageWithFallback
                                            src={fine.cover_url ?? undefined}
                                            alt={fine.book_title ?? ''}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="mb-2 font-semibold text-gray-900">
                                            {fine.book_title}
                                        </h3>
                                        {fine.category && (
                                            <Badge variant="outline" className="mb-2">
                                                {fine.category}
                                            </Badge>
                                        )}
                                        <p className="text-sm text-gray-600">
                                            Fine ID: {fine.id}
                                        </p>
                                    </div>
                                </div>

                                <div className="mb-6 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600">Status:</span>
                                        <Badge className="bg-orange-500">
                                            <AlertTriangle className="mr-1 h-3 w-3" />
                                            Payment Error
                                        </Badge>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600">Fine ID:</span>
                                        <span className="font-medium text-gray-900">
                                            {fine.id}
                                        </span>
                                    </div>
                                </div>

                                <div className="rounded-xl border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-red-50 p-6">
                                    <div className="flex items-center justify-between">
                                        <span className="text-lg font-medium text-gray-900">
                                            Amount Due:
                                        </span>
                                        <span className="text-3xl font-bold text-orange-600">
                                            {moneyFormatter(fine.amount)}
                                        </span>
                                    </div>
                                </div>
                            </Card>
                        )}

                        <Card className="mb-6 border-blue-200 bg-blue-50 p-6">
                            <h3 className="mb-3 font-semibold text-gray-900">
                                Common Causes:
                            </h3>
                            <ul className="space-y-2 text-sm text-gray-700">
                                <li className="flex items-start gap-2">
                                    <span className="font-bold text-blue-600">•</span>
                                    <span>Server is temporarily unavailable or experiencing high traffic</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="font-bold text-blue-600">•</span>
                                    <span>Payment gateway connection timeout</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="font-bold text-blue-600">•</span>
                                    <span>Network connectivity issues</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="font-bold text-blue-600">•</span>
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

                        <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50 p-6">
                            <h3 className="mb-4 text-center font-semibold text-gray-900">
                                Still having issues?
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-center gap-3 text-sm">
                                    <Mail className="h-4 w-4 text-primary" />
                                    <span className="text-gray-700">support@library.com</span>
                                </div>
                                <div className="flex items-center justify-center gap-3 text-sm">
                                    <Phone className="h-4 w-4 text-primary" />
                                    <span className="text-gray-700">+62 812 3456 7890</span>
                                </div>
                            </div>
                            <p className="mt-4 text-center text-xs text-gray-600">
                                Our support team is available to assist you
                            </p>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
