import { useEffect, useRef, useState } from 'react';
import type { AnnouncementProps } from '@/types';

type Props = {
    announcement: AnnouncementProps | null;
};

type CountdownState = {
    text: string;
    isOpen: boolean;
};

function parseTime(hhmm: string): { h: number; m: number } {
    const [h, m] = hhmm.split(':').map(Number);
    return { h, m };
}

function toSeconds(h: number, m: number, s = 0): number {
    return h * 3600 + m * 60 + s;
}

function formatDuration(seconds: number): string {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h} jam : ${String(m).padStart(2, '0')} menit : ${String(s).padStart(2, '0')} detik`;
}

function computeCountdown(openTime: string, closeTime: string): CountdownState {
    const now = new Date();
    const nowSec = toSeconds(now.getHours(), now.getMinutes(), now.getSeconds());
    const { h: oh, m: om } = parseTime(openTime);
    const { h: ch, m: cm } = parseTime(closeTime);
    const openSec = toSeconds(oh, om);
    const closeSec = toSeconds(ch, cm);

    if (nowSec >= openSec && nowSec < closeSec) {
        const diff = closeSec - nowSec;
        return { text: `Tutup dalam ${formatDuration(diff)}`, isOpen: true };
    }

    if (nowSec < openSec) {
        const diff = openSec - nowSec;
        return { text: `Buka dalam ${formatDuration(diff)}`, isOpen: false };
    }

    return { text: 'Perpustakaan sudah tutup hari ini', isOpen: false };
}

const STORAGE_KEY_PREFIX = 'announcement_dismissed_';

export default function AnnouncementModal({ announcement }: Props) {
    const [visible, setVisible] = useState(false);
    const [animating, setAnimating] = useState(false);
    const [countdown, setCountdown] = useState<CountdownState>({ text: '', isOpen: false });
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        if (!announcement) return;

        const key = STORAGE_KEY_PREFIX + announcement.days + '_' + new Date().toDateString();
        if (localStorage.getItem(key)) return;

        const initial = computeCountdown(announcement.open_time, announcement.close_time);
        setCountdown(initial);
        setVisible(true);
        setAnimating(true);

        intervalRef.current = setInterval(() => {
            setCountdown(computeCountdown(announcement.open_time, announcement.close_time));
        }, 1000);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [announcement]);

    const dismiss = () => {
        if (!announcement) return;
        setAnimating(false);
        setTimeout(() => {
            setVisible(false);
            const key = STORAGE_KEY_PREFIX + announcement.days + '_' + new Date().toDateString();
            localStorage.setItem(key, '1');
        }, 250);
    };

    if (!visible || !announcement) return null;

    return (
        <div
            className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 transition-opacity duration-300 ${
                animating ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={dismiss}
        >
            <div
                className={`relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl bg-white dark:bg-gray-900 transition-all duration-300 ${
                    animating ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'
                }`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={dismiss}
                    className="absolute top-3 right-3 z-10 rounded-full p-1.5 bg-gray-100/80 dark:bg-gray-700/80 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                    aria-label="Tutup"
                >
                    <svg className="w-4 h-4 text-gray-600 dark:text-gray-200" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Photo */}
                {announcement.photo && (
                    <div className="relative w-full h-52 overflow-hidden">
                        <img
                            src={announcement.photo}
                            alt={announcement.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}

                {/* Content */}
                <div className="px-6 py-5 space-y-4">
                    {/* Title */}
                    <h2 className="text-xl font-bold text-center text-gray-900 dark:text-white font-['Poppins']">
                        {announcement.title}
                    </h2>

                    {/* Countdown + Status */}
                    <div className="space-y-2">
                        {/* Countdown pill */}
                        <div className="flex justify-center">
                            <span
                                className={`inline-block text-sm font-semibold px-4 py-1.5 rounded-full ${
                                    countdown.isOpen
                                        ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400'
                                        : 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400'
                                }`}
                            >
                                {countdown.text}
                            </span>
                        </div>

                        {/* Status badge */}
                        <div className="flex items-center justify-center gap-2">
                            <span
                                className={`inline-block w-2.5 h-2.5 rounded-full animate-pulse ${
                                    countdown.isOpen ? 'bg-green-500' : 'bg-red-500'
                                }`}
                            />
                            <span
                                className={`text-sm font-semibold ${
                                    countdown.isOpen
                                        ? 'text-green-600 dark:text-green-400'
                                        : 'text-red-600 dark:text-red-400'
                                }`}
                            >
                                {countdown.isOpen ? 'Perpustakaan Buka' : 'Perpustakaan Tutup'}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                ({announcement.open_time} – {announcement.close_time})
                            </span>
                        </div>
                    </div>

                    {/* Description */}
                    {announcement.description && (
                        <div
                            className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed text-center [&_*]:max-w-none"
                            dangerouslySetInnerHTML={{ __html: announcement.description }}
                        />
                    )}

                    {/* Mengerti Button */}
                    <button
                        onClick={dismiss}
                        className="w-full py-2.5 rounded-xl text-sm font-semibold text-white transition bg-gray-800 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600"
                    >
                        Mengerti
                    </button>
                </div>
            </div>
        </div>
    );
}
