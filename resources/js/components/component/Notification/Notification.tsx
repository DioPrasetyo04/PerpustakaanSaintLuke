import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';

type Props = {
    notification: {
        type: 'success' | 'error';
        message: string;
    } | null;
    onClose: () => void;
};

export default function Notification({ notification, onClose }: Props) {
    if (typeof document === 'undefined') return null;

    const isSuccess = notification?.type === 'success';

    return createPortal(
        <AnimatePresence>
            {notification && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-9999 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full max-w-sm rounded-2xl bg-white p-8 text-center shadow-2xl dark:bg-gray-900"
                    >
                        <div
                            className={`mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full ${
                                isSuccess ? 'bg-green-100 dark:bg-green-500/20' : 'bg-red-100 dark:bg-red-500/20'
                            }`}
                        >
                            {isSuccess ? (
                                <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
                            ) : (
                                <XCircle className="h-12 w-12 text-red-600 dark:text-red-400" />
                            )}
                        </div>

                        <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                            {isSuccess ? 'Success' : 'Error'}
                        </h3>

                        <p className="text-gray-600 dark:text-gray-300">{notification.message}</p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body,
    );
}
