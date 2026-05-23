import { motion } from 'framer-motion';
import {
    CheckCircle,
    ArrowLeft,
    Receipt,
    Calendar,
    CreditCard,
} from 'lucide-react';
import { Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import { moneyFormatter } from '@/lib/utils';

type FineProp = {
    id: string;
    book_title: string | null;
    category: string | null;
    cover_url: string | null;
    amount: number;
};

export default function PaymentSuccess() {
    const { fine } = usePage<{ fine: FineProp | null }>().props;

    const handleDownloadReceipt = () => {
        alert('Receipt downloaded successfully!');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                        className="mb-8 text-center"
                    >
                        <div className="mb-6 inline-flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-green-600 shadow-2xl">
                            <CheckCircle className="h-14 w-14 text-white" />
                        </div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="mb-3 font-['Poppins'] text-3xl font-bold text-gray-900 sm:text-4xl"
                        >
                            Payment Successful!
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-lg text-gray-600"
                        >
                            Your payment has been processed successfully
                        </motion.p>
                    </motion.div>

                    {fine ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <Card className="mb-6 border-2 border-green-100 p-6 shadow-xl">
                                <div className="mb-6 flex items-center gap-2">
                                    <Receipt className="h-5 w-5 text-primary" />
                                    <h2 className="font-['Poppins'] text-xl font-bold text-gray-900">
                                        Payment Receipt
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
                                        <span className="text-gray-600">
                                            Transaction Date:
                                        </span>
                                        <div className="flex items-center gap-2 text-gray-900">
                                            <Calendar className="h-4 w-4" />
                                            <span>{new Date().toLocaleString()}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600">
                                            Payment Method:
                                        </span>
                                        <div className="flex items-center gap-2 text-gray-900">
                                            <CreditCard className="h-4 w-4" />
                                            <span>Midtrans Gateway</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600">Status:</span>
                                        <Badge className="bg-green-500">
                                            <CheckCircle className="mr-1 h-3 w-3" />
                                            Paid
                                        </Badge>
                                    </div>
                                </div>

                                <div className="rounded-xl border-2 border-green-200 bg-gradient-to-br from-green-50 to-blue-50 p-6">
                                    <div className="flex items-center justify-between">
                                        <span className="text-lg font-medium text-gray-900">
                                            Amount Paid:
                                        </span>
                                        <span className="text-3xl font-bold text-green-600">
                                            {moneyFormatter(fine.amount)}
                                        </span>
                                    </div>
                                </div>
                            </Card>

                            <div className="space-y-3">
                                <Link href="/history?tab=fines" className="block">
                                    <Button
                                        className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                                        size="lg"
                                    >
                                        <ArrowLeft className="mr-2 h-5 w-5" />
                                        Back to Fine History
                                    </Button>
                                </Link>

                                <Button
                                    variant="outline"
                                    className="w-full"
                                    size="lg"
                                    onClick={handleDownloadReceipt}
                                >
                                    <Receipt className="mr-2 h-5 w-5" />
                                    Download Receipt
                                </Button>
                            </div>

                            <div className="mt-6 rounded-lg border border-green-200 bg-green-50 p-4">
                                <p className="text-center text-sm text-green-800">
                                    A confirmation email has been sent to your
                                    registered email address.
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
