import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';

type Props = {
    notification: {
        type: 'success' | 'error';
        message: string;
    } | null;
    onClose: () => void;
};

export default function LoanNotification({ notification, onClose }: Props) {
    if (!notification) return null;

    const isSuccess = notification.type === 'success';

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="rounded-2xl bg-white p-8 text-center"
                >
                    <div
                        className={`mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full ${
                            isSuccess ? 'bg-green-100' : 'bg-red-100'
                        }`}
                    >
                        {isSuccess ? (
                            <CheckCircle className="h-12 w-12 text-green-600" />
                        ) : (
                            <XCircle className="h-12 w-12 text-red-600" />
                        )}
                    </div>

                    <h3 className="mb-2 text-2xl font-bold text-gray-900">
                        {isSuccess ? 'Success' : 'Error'}
                    </h3>

                    <p className="text-gray-600">{notification.message}</p>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
