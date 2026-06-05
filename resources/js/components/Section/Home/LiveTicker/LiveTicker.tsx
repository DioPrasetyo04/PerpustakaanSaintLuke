import { useMemo } from 'react';
import { Link } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { useLanguage } from '@/hooks/useLanguage';
import type { LiveActivity } from '@/types/HomePage/HomePageProps';

type LiveTickerProps = {
    activities: LiveActivity[];
};

const VERBS: Record<LiveActivity['status'], { id: string; en: string }> = {
    borrowed: { id: 'meminjam', en: 'borrowed' },
    returned: { id: 'mengembalikan', en: 'returned' },
};

type Lang = 'id' | 'en';

/** Waktu relatif ringkas (dwibahasa) dari sebuah tanggal ISO. */
const relativeTime = (iso: string | null, lang: Lang): string => {
    if (!iso) return lang === 'id' ? 'baru saja' : 'just now';

    const then = new Date(iso).getTime();
    if (Number.isNaN(then)) return lang === 'id' ? 'baru saja' : 'just now';

    const diffSec = Math.max(0, Math.floor((Date.now() - then) / 1000));
    const min = Math.floor(diffSec / 60);
    const hr = Math.floor(min / 60);
    const day = Math.floor(hr / 24);

    if (lang === 'id') {
        if (diffSec < 60) return 'baru saja';
        if (min < 60) return `${min} menit lalu`;
        if (hr < 24) return `${hr} jam lalu`;
        if (day === 1) return 'kemarin';
        if (day < 30) return `${day} hari lalu`;
        const month = Math.floor(day / 30);
        return month < 12 ? `${month} bulan lalu` : `${Math.floor(month / 12)} tahun lalu`;
    }

    if (diffSec < 60) return 'just now';
    if (min < 60) return `${min} min ago`;
    if (hr < 24) return `${hr} hr ago`;
    if (day === 1) return 'yesterday';
    if (day < 30) return `${day} days ago`;
    const month = Math.floor(day / 30);
    return month < 12 ? `${month} mo ago` : `${Math.floor(month / 12)} yr ago`;
};

const LiveTicker = ({ activities }: LiveTickerProps) => {
    const { language } = useLanguage();
    const lang: Lang = language === 'en' ? 'en' : 'id';

    const items = useMemo(
        () => (activities ?? []).filter((a) => a?.title),
        [activities],
    );

    if (items.length === 0) return null;

    const Row = ({ it }: { it: LiveActivity }) => {
        const verb = (VERBS[it.status] ?? VERBS.borrowed)[lang];
        const titleNode = it.slug ? (
            <Link
                href={route('book.detail', { slug: it.slug })}
                className="font-quote italic text-cobalt transition-colors hover:text-cobalt-dk dark:text-cobalt-lt"
            >
                {it.title}
            </Link>
        ) : (
            <span className="font-quote italic text-cobalt dark:text-cobalt-lt">
                {it.title}
            </span>
        );

        return (
            <span className="inline-flex items-center gap-2 px-5 text-[13px] whitespace-nowrap">
                <span
                    className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                        it.status === 'returned'
                            ? 'bg-amber-500'
                            : 'bg-emerald-500'
                    }`}
                />
                <span className="font-semibold text-foreground">{it.name}</span>
                <span className="text-muted-foreground">{verb}</span>
                {titleNode}
                <span className="text-muted-foreground/60">
                    · {relativeTime(it.date, lang)}
                </span>
                <span className="ml-3 text-line dark:text-night-line">/</span>
            </span>
        );
    };

    return (
        <div className="ticker-wrap hairline relative overflow-hidden border-y bg-card/70 py-2.5 backdrop-blur dark:bg-night-2/60">
            <div className="ticker-track">
                {items.map((it) => (
                    <Row key={`a-${it.id}`} it={it} />
                ))}
                {items.map((it) => (
                    <Row key={`b-${it.id}`} it={it} />
                ))}
            </div>
            <div className="absolute inset-y-0 left-0 z-10 flex items-center gap-2 bg-gradient-to-r from-background via-background/95 to-transparent pr-6 pl-4">
                <span className="tracking-editorial inline-flex items-center gap-1.5 rounded-full bg-rose-600 px-2.5 py-1 text-[10px] font-bold uppercase text-white">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                    Live
                </span>
            </div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
        </div>
    );
};

export default LiveTicker;
