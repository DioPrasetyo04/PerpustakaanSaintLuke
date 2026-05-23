import { useEffect, useRef, useState } from 'react';
import { router } from '@inertiajs/react';
import { useLanguage } from '@/hooks/useLanguage';
import { assetAccessDenied } from '@/data/data';
import type { FlashProps, PageProps } from '@/types';

type DeniedType = 'expired' | 'unauthorized';

type Props = {
    initialFlash: FlashProps | null;
};

export default function AccessDeniedModal({ initialFlash }: Props) {
    const [deniedType, setDeniedType] = useState<DeniedType | null>(
        initialFlash?.access_denied ?? null,
    );
    const [visible, setVisible] = useState(!!initialFlash?.access_denied);
    const [animating, setAnimating] = useState(!!initialFlash?.access_denied);
    const { language } = useLanguage();
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const remove = router.on('navigate', (event) => {
            const flash = (event.detail.page.props as PageProps).flash ?? null;
            const type: DeniedType | null = flash?.access_denied ?? null;
            if (type) {
                setDeniedType(type);
                setVisible(true);
                setAnimating(true);
            }
        });
        return remove;
    }, []);

    const dismiss = () => {
        setAnimating(false);
        timerRef.current = setTimeout(() => {
            setVisible(false);
            setDeniedType(null);
        }, 250);
    };

    useEffect(() => {
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, []);

    if (!visible || !deniedType) return null;

    const content = assetAccessDenied[language][deniedType];

    return (
        <div
            className={`fixed inset-0 z-[9998] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 transition-opacity duration-300 ${
                animating ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={dismiss}
        >
            <div
                className={`relative w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl bg-white dark:bg-gray-900 transition-all duration-300 ${
                    animating
                        ? 'opacity-100 scale-100 translate-y-0'
                        : 'opacity-0 scale-95 translate-y-4'
                }`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={dismiss}
                    className="absolute top-3 right-3 z-10 rounded-full p-1.5 bg-gray-100/80 dark:bg-gray-700/80 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                    aria-label="Tutup"
                >
                    <svg
                        className="w-4 h-4 text-gray-600 dark:text-gray-200"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>

                <div className="px-6 py-8 space-y-4 text-center">
                    {/* Icon */}
                    <div
                        className={`mx-auto flex items-center justify-center w-16 h-16 rounded-full ${
                            deniedType === 'expired'
                                ? 'bg-amber-100 dark:bg-amber-900/30'
                                : 'bg-red-100 dark:bg-red-900/30'
                        }`}
                    >
                        <svg
                            className={`w-8 h-8 ${
                                deniedType === 'expired'
                                    ? 'text-amber-500 dark:text-amber-400'
                                    : 'text-red-500 dark:text-red-400'
                            }`}
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={1.5}
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                            />
                        </svg>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white font-['Poppins']">
                        {content.title}
                    </h2>

                    {/* Description */}
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                        {content.description}
                    </p>

                    {/* Close Button */}
                    <button
                        onClick={dismiss}
                        className="w-full py-2.5 rounded-xl text-sm font-semibold text-white transition bg-gray-800 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 mt-2"
                    >
                        Mengerti
                    </button>
                </div>
            </div>
        </div>
    );
}
