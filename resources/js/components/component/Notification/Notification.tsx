import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, X, XCircle } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

type Props = {
    notification: {
        type: 'success' | 'error';
        message: string;
    } | null;
    onClose: () => void;
};

export default function Notification({ notification, onClose }: Props) {
    const { language } = useLanguage();

    if (typeof document === 'undefined') return null;

    const isSuccess = notification?.type === 'success';
    const closeLabel = language === 'id' ? 'Tutup' : 'Close';

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
                        className="relative w-full max-w-sm rounded-2xl bg-card p-8 text-center shadow-2xl dark:bg-card"
                    >
                        {/* Tombol close (X) di pojok kanan atas */}
                        <button
                            type="button"
                            onClick={onClose}
                            aria-label={closeLabel}
                            className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        >
                            <X className="h-5 w-5" />
                        </button>

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

                        <h3 className="mb-2 text-2xl font-bold text-foreground dark:text-white">
                            {isSuccess ? 'Success' : 'Error'}
                        </h3>

                        <p className="text-muted-foreground dark:text-muted-foreground">{notification.message}</p>

                        <button
                            type="button"
                            onClick={onClose}
                            className={`mt-6 inline-flex w-full items-center justify-center rounded-full px-6 py-2.5 text-sm font-semibold text-white transition-colors ${
                                isSuccess
                                    ? 'bg-green-600 hover:bg-green-700'
                                    : 'bg-red-600 hover:bg-red-700'
                            }`}
                        >
                            {closeLabel}
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body,
    );
}
