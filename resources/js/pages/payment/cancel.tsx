import { useState } from 'react';
import { motion } from 'framer-motion';
import { XCircle, ArrowLeft, CreditCard, AlertTriangle } from 'lucide-react';
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

export default function PaymentCancel() {
    const { fine } = usePage<{ fine: FineProp | null }>().props;
    const [isRetrying, setIsRetrying] = useState(false);

    const handleRetryPayment = async () => {
        if (!fine) return;
        setIsRetrying(true);
        const result = await payFine(fine.id);
        if (!result.ok) setIsRetrying(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                        className="mb-8 text-center"
                    >
                        <div className="mb-6 inline-flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-red-400 to-red-600 shadow-2xl">
                            <XCircle className="h-14 w-14 text-white" />
                        </div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="mb-3 font-['Poppins'] text-3xl font-bold text-gray-900 sm:text-4xl"
                        >
                            Payment Cancelled
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-lg text-gray-600"
                        >
                            Your payment was not completed
                        </motion.p>
                    </motion.div>

                    {fine ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <Card className="mb-6 border-2 border-red-100 p-6 shadow-xl">
                                <div className="mb-6 flex items-center gap-2">
                                    <AlertTriangle className="h-5 w-5 text-red-600" />
                                    <h2 className="font-['Poppins'] text-xl font-bold text-gray-900">
                                        Payment Details
                                    </h2>
                                </div>

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
                                        <Badge className="bg-red-500">
                                            <XCircle className="mr-1 h-3 w-3" />
                                            Payment Cancelled
                                        </Badge>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600">Fine ID:</span>
                                        <span className="font-medium text-gray-900">
                                            {fine.id}
                                        </span>
                                    </div>
                                </div>

                                <div className="rounded-xl border-2 border-red-200 bg-gradient-to-br from-red-50 to-orange-50 p-6">
                                    <div className="flex items-center justify-between">
                                        <span className="text-lg font-medium text-gray-900">
                                            Amount Due:
                                        </span>
                                        <span className="text-3xl font-bold text-red-600">
                                            {moneyFormatter(fine.amount)}
                                        </span>
                                    </div>
                                </div>
                            </Card>

                            <Card className="mb-6 border-yellow-200 bg-yellow-50 p-6">
                                <div className="flex gap-3">
                                    <AlertTriangle className="mt-1 h-6 w-6 flex-shrink-0 text-yellow-600" />
                                    <div>
                                        <h3 className="mb-2 font-semibold text-gray-900">
                                            Why did this happen?
                                        </h3>
                                        <ul className="space-y-1 text-sm text-gray-700">
                                            <li>• You closed the payment window before completing the transaction</li>
                                            <li>• The payment session may have expired</li>
                                            <li>• You may have clicked the cancel button</li>
                                        </ul>
                                    </div>
                                </div>
                            </Card>

                            <div className="space-y-3">
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
                                            <CreditCard className="mr-2 h-5 w-5" />
                                            Try Payment Again
                                        </>
                                    )}
                                </Button>

                                <Link href="/history?tab=fines" className="block">
                                    <Button variant="outline" className="w-full" size="lg">
                                        <ArrowLeft className="mr-2 h-5 w-5" />
                                        Back to Fine History
                                    </Button>
                                </Link>
                            </div>

                            <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
                                <p className="text-center text-sm text-blue-800">
                                    Need help? Contact our support team at
                                    support@library.com
                                </p>
                            </div>
                        </motion.div>
                    ) : (
                        <Card className="p-8 text-center">
                            <p className="mb-4 text-gray-600">
                                No payment information available
                            </p>
                            <Link href="/history?tab=fines">
                                <Button>Go to Fine History</Button>
                            </Link>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}
