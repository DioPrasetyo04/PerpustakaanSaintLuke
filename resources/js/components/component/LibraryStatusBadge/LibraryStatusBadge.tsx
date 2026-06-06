import { useEffect, useRef, useState } from 'react';
import { router } from '@inertiajs/react';
import type { AnnouncementProps } from '@/types';

type Props = {
    initialAnnouncement: AnnouncementProps | null;
};

function parseTime(hhmm: string): { h: number; m: number } {
    const [h, m] = hhmm.split(':').map(Number);
    return { h, m };
}

function toSeconds(h: number, m: number, s = 0): number {
    return h * 3600 + m * 60 + s;
}

function computeIsOpen(openTime: string, closeTime: string): boolean {
    const now = new Date();
    const nowSec = toSeconds(now.getHours(), now.getMinutes(), now.getSeconds());
    const { h: oh, m: om } = parseTime(openTime);
    const { h: ch, m: cm } = parseTime(closeTime);
    return nowSec >= toSeconds(oh, om) && nowSec < toSeconds(ch, cm);
}

export default function LibraryStatusBadge({ initialAnnouncement }: Props) {
    const [announcement, setAnnouncement] = useState<AnnouncementProps | null>(initialAnnouncement);
    const [isOpen, setIsOpen] = useState(false);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // Update announcement data on Inertia navigations
    useEffect(() => {
        const removeListener = router.on('navigate', (event) => {
            const pageAnnouncement = (event.detail.page.props as any).announcement ?? null;
            setAnnouncement(pageAnnouncement);
        });
        return removeListener;
    }, []);

    // Real-time tick every second
    useEffect(() => {
        if (!announcement) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            return;
        }

        const tick = () => {
            setIsOpen(computeIsOpen(announcement.open_time, announcement.close_time));
        };

        tick();
        intervalRef.current = setInterval(tick, 1000);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [announcement]);

    if (!announcement) return null;

    return (
        <div
            style={{
                position: 'fixed',
                left: 0,
                right: 0,
                bottom: '1rem',
                // Di bawah mobile drawer (z-60) agar tidak menutupi menu navbar
                // responsif saat dibuka; tetap mengambang di atas konten halaman.
                zIndex: 40,
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                padding: '0 1.25rem',
                pointerEvents: 'none',
            }}
        >
            <div
                style={{
                    pointerEvents: 'auto',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 1rem',
                    borderRadius: '9999px',
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    color: '#ffffff',
                    backgroundColor: isOpen ? '#16a34a' : '#dc2626',
                    boxShadow: '0 10px 15px -3px rgba(0,0,0,.15), 0 4px 6px -4px rgba(0,0,0,.1)',
                    transition: 'background-color 0.3s ease',
                    userSelect: 'none',
                }}
            >
                {/* Icon */}
                <span style={{ display: 'inline-flex', lineHeight: 0 }}>
                    {isOpen ? (
                        <svg
                            width="18"
                            height="18"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2.5}
                            viewBox="0 0 24 24"
                        >
                            <circle cx="12" cy="12" r="9" />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M8.5 12.5l2.5 2.5 4.5-5"
                            />
                        </svg>
                    ) : (
                        <svg
                            width="18"
                            height="18"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2.5}
                            viewBox="0 0 24 24"
                        >
                            <circle cx="12" cy="12" r="9" />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 9l6 6M15 9l-6 6"
                            />
                        </svg>
                    )}
                </span>

                {/* Text */}
                <span>
                    {isOpen ? 'Perpustakaan Buka' : 'Perpustakaan Tutup'}
                </span>

                {/* Hours */}
                <span
                    style={{
                        fontSize: '0.75rem',
                        fontWeight: 400,
                        opacity: 0.85,
                    }}
                >
                    ({announcement.open_time} – {announcement.close_time})
                </span>
            </div>
        </div>
    );
}
