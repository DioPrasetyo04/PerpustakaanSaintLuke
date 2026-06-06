import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    ArrowRight,
    CalendarDays,
    Clock,
    MapPin,
    Ticket,
    Users,
} from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { cn } from '@/lib/utils';
import Carousel from '@/components/common/Carousel';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import type { EventItem } from '@/types/HomePage/HomePageProps';

type EventsProps = {
    events: EventItem[];
};

const fadeUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
};

const copy = {
    id: {
        eyebrow: 'Agenda',
        title: 'Acara & jadwal klub baca',
        desc: 'Ikuti kegiatan literasi, diskusi, dan workshop perpustakaan — geser untuk melihat agenda berikutnya.',
        calendar: 'Kalender penuh',
        full: 'Penuh · daftar antri',
        open: 'Terbuka untuk umum',
        seatsLeft: (n: number) => `${n} kursi tersisa`,
        register: 'Daftar',
        wib: 'WIB',
    },
    en: {
        eyebrow: 'Agenda',
        title: 'Events & book-club schedule',
        desc: 'Join the library’s literacy programs, discussions, and workshops — swipe to see what’s next.',
        calendar: 'Full calendar',
        full: 'Full · waitlist',
        open: 'Open to public',
        seatsLeft: (n: number) => `${n} seats left`,
        register: 'Register',
        wib: 'WIB',
    },
};

/** Pisahkan tanggal ISO menjadi bagian-bagian terlokalisasi untuk kartu. */
function formatParts(iso: string | null, language: 'id' | 'en') {
    if (!iso) return null;
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return null;
    const locale = language === 'id' ? 'id-ID' : 'en-US';
    return {
        day: date.toLocaleDateString(locale, { day: '2-digit' }),
        month: date.toLocaleDateString(locale, { month: 'short' }),
        weekday: date.toLocaleDateString(locale, { weekday: 'long' }),
        time: date.toLocaleTimeString(locale, {
            hour: '2-digit',
            minute: '2-digit',
        }),
    };
}

const Events = ({ events }: EventsProps) => {
    const { language } = useLanguage();
    const t = language === 'id' ? copy.id : copy.en;

    const items = events ?? [];
    if (items.length === 0) return null;

    const Card = ({ e }: { e: EventItem }) => {
        const parts = formatParts(e.start_at, language);
        const isFull = e.capacity !== null && (e.seats_left ?? 0) <= 0;
        const seatsLabel =
            e.capacity === null
                ? t.open
                : isFull
                  ? t.full
                  : t.seatsLeft(e.seats_left ?? 0);

        return (
            <article className="hairline group flex h-full flex-col overflow-hidden rounded-xl2 border bg-card transition-all duration-300 hover:border-cobalt/30 hover:shadow-lift dark:bg-night-2">
                {/* Poster */}
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                    {e.thumbnail_url ? (
                        <ImageWithFallback
                            src={e.thumbnail_url}
                            alt={e.title}
                            loading="lazy"
                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    ) : (
                        <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-cobalt/20 via-night-2 to-night">
                            <CalendarDays className="h-10 w-10 text-white/20" />
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30" />

                    {/* Date badge */}
                    {parts && (
                        <div className="absolute top-3 left-3 grid w-16 place-content-center rounded-xl bg-white/95 py-2 text-center text-cobalt shadow-lift backdrop-blur-sm dark:bg-night-3/90 dark:text-cobalt-lt">
                            <div className="font-display text-2xl leading-none">
                                {parts.day}
                            </div>
                            <div className="tracking-editorial mt-0.5 text-[10px] font-semibold uppercase opacity-90">
                                {parts.month}
                            </div>
                        </div>
                    )}

                    {/* Category tag */}
                    {e.category && (
                        <span className="tracking-editorial absolute top-3 right-3 rounded-full bg-cobalt px-2.5 py-1 text-[10px] font-semibold uppercase text-white shadow-sm">
                            {e.category}
                        </span>
                    )}
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col p-5">
                    {parts && (
                        <div className="mb-2 flex items-center gap-3 text-xs text-muted-foreground">
                            <span className="inline-flex items-center gap-1.5">
                                <Clock className="h-3.5 w-3.5" />
                                {parts.weekday} · {parts.time} {t.wib}
                            </span>
                        </div>
                    )}

                    <h3
                        className="font-display text-lg leading-snug text-foreground transition-colors group-hover:text-cobalt dark:group-hover:text-cobalt-lt"
                        style={{ textWrap: 'balance' }}
                    >
                        {e.title}
                    </h3>

                    {e.description && (
                        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                            {e.description}
                        </p>
                    )}

                    <div className="mt-auto space-y-2.5 pt-4">
                        {e.location && (
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                <MapPin className="h-3.5 w-3.5 shrink-0" />
                                <span className="truncate">{e.location}</span>
                            </div>
                        )}

                        <div className="flex items-center justify-between gap-3">
                            <span
                                className={cn(
                                    'inline-flex items-center gap-1.5 text-xs font-medium',
                                    isFull
                                        ? 'text-rose-500'
                                        : 'text-cobalt dark:text-cobalt-lt',
                                )}
                            >
                                <Users className="h-3.5 w-3.5" />
                                {seatsLabel}
                            </span>

                            {e.registration_url && !isFull && (
                                <a
                                    href={e.registration_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 rounded-full bg-cobalt px-3 py-1.5 text-xs font-semibold text-white transition-transform hover:scale-105"
                                >
                                    <Ticket className="h-3.5 w-3.5" />
                                    {t.register}
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </article>
        );
    };

    return (
        <section className="hairline border-y bg-paper-2/40 dark:bg-night-2/30">
            <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
                {/* Header */}
                <div className="mb-12 flex items-end justify-between gap-6">
                    <div>
                        <motion.span
                            {...fadeUp}
                            className="tracking-editorial inline-flex items-center gap-2 rounded-full bg-cobalt-50 px-3 py-1 text-[11px] font-semibold uppercase text-cobalt dark:bg-cobalt/15 dark:text-cobalt-lt"
                        >
                            <span className="h-1.5 w-1.5 rounded-full bg-cobalt dark:bg-cobalt-lt" />
                            {t.eyebrow}
                        </motion.span>
                        <motion.h2
                            {...fadeUp}
                            transition={{ delay: 0.08 }}
                            className="mt-5 font-display text-3xl text-foreground lg:text-5xl"
                            style={{ textWrap: 'balance' }}
                        >
                            {t.title}
                        </motion.h2>
                        <motion.p
                            {...fadeUp}
                            transition={{ delay: 0.12 }}
                            className="mt-4 max-w-xl text-muted-foreground"
                        >
                            {t.desc}
                        </motion.p>
                    </div>
                    <Link
                        href="/informations"
                        className="group hidden items-center gap-2 text-sm font-semibold text-foreground hover:text-cobalt md:inline-flex dark:hover:text-cobalt-lt"
                    >
                        {t.calendar}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                {/* Carousel (swipe + pagination) */}
                <Carousel<EventItem>
                    items={items}
                    getKey={(e) => e.id}
                    ariaLabel={t.title}
                    spaceBetween={20}
                    autoplay={items.length > 3 ? 4500 : undefined}
                    loop={items.length > 3}
                    renderItem={(e) => <Card e={e} />}
                    breakpoints={{
                        0: { slidesPerView: 1.1 },
                        480: { slidesPerView: 1.6 },
                        768: { slidesPerView: 2.2 },
                        1024: { slidesPerView: 3 },
                    }}
                />

                {/* Full calendar link (mobile) */}
                <div className="mt-6 md:hidden">
                    <Link
                        href="/informations"
                        className="group inline-flex items-center gap-2 text-sm font-semibold text-cobalt dark:text-cobalt-lt"
                    >
                        {t.calendar}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Events;
