import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Quote, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/hooks/useLanguage';
import Carousel from '@/components/common/Carousel';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import type { Testimonial } from '@/types/HomePage/HomePageProps';

type TestimonialsProps = {
    testimonials: Testimonial[];
};

const copy = {
    id: {
        eyebrow: 'Kata Mereka',
        title: 'Cerita & testimoni dari anggota kami',
        desc: 'Dengarkan langsung pengalaman siswa, guru, dan alumni — setiap cerita terekam dalam video.',
        watch: 'Putar video',
        rec: 'REC',
    },
    en: {
        eyebrow: 'Their Words',
        title: 'Stories & testimonials from our members',
        desc: 'Hear directly from students, teachers, and alumni — every story captured on video.',
        watch: 'Play video',
        rec: 'REC',
    },
};

/* Warna ring kartu bergiliran (emerald ↔ brass) agar dinamis seperti referensi. */
const RINGS = [
    'shadow-[0_0_22px_-2px] shadow-cobalt/50',
    'shadow-[0_0_22px_-2px] shadow-brass/50',
];

const Testimonials = ({ testimonials }: TestimonialsProps) => {
    const { language } = useLanguage();
    const t = language === 'id' ? copy.id : copy.en;

    const items = testimonials ?? [];
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    if (items.length === 0) return null;

    const open = (index: number) => setActiveIndex(index);
    const close = () => setActiveIndex(null);
    const go = (dir: number) =>
        setActiveIndex((curr) => {
            if (curr === null) return curr;
            return (curr + dir + items.length) % items.length;
        });

    const Card = ({ it, index }: { it: Testimonial; index: number }) => (
        <button
            type="button"
            onClick={() => open(index)}
            aria-label={`${t.watch}: ${it.name}`}
            className="group relative block aspect-[3/4] w-full overflow-hidden rounded-2xl border border-border/60 bg-night-2 text-left"
        >
            {/* Poster / thumbnail */}
            {it.thumbnail_url ? (
                <ImageWithFallback
                    src={it.thumbnail_url}
                    alt={it.name}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
            ) : (
                <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-night-3 via-night-2 to-night">
                    <span className="font-display text-5xl font-bold text-white/10">
                        {it.name.charAt(0).toUpperCase()}
                    </span>
                </div>
            )}

            {/* Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/40" />

            {/* Top bar: REC + index */}
            <div className="absolute inset-x-0 top-0 flex items-center justify-between px-3 py-2.5 text-[10px] font-bold tracking-editorial text-white/90 uppercase">
                <span className="inline-flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-rose-500" />
                    {t.rec}
                </span>
                <span className="tabnum text-white/70">
                    {index + 1}/{items.length}
                </span>
            </div>

            {/* Play button */}
            <div className="absolute inset-0 grid place-items-center">
                <span
                    className={cn(
                        'grid h-14 w-14 place-items-center rounded-full bg-white/15 text-white backdrop-blur-md ring-1 ring-white/40 transition-all duration-300 group-hover:scale-110 group-hover:bg-cobalt',
                        RINGS[index % RINGS.length],
                    )}
                >
                    <Play className="ml-0.5 h-5 w-5 fill-current" />
                </span>
            </div>

            {/* Bottom: name + role */}
            <div className="absolute inset-x-0 bottom-0 p-4">
                <div className="font-display text-base font-bold text-white">
                    {it.name}
                </div>
                {it.role && (
                    <div className="mt-0.5 text-xs text-white/65">{it.role}</div>
                )}
            </div>

            {/* hover ring */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-2 ring-transparent transition-colors duration-300 group-hover:ring-cobalt/60" />
        </button>
    );

    return (
        <section className="theme-transition relative overflow-hidden py-20 lg:py-28">
            <div className="hero-mesh pointer-events-none absolute inset-0 opacity-60" />
            <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
                {/* Header */}
                <div className="mx-auto mb-14 max-w-2xl text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="tracking-editorial mx-auto inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase text-cobalt dark:text-cobalt-lt"
                    >
                        <Quote className="h-3.5 w-3.5" />
                        {t.eyebrow}
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.08 }}
                        className="mt-5 font-display text-3xl font-bold text-foreground lg:text-5xl"
                        style={{ textWrap: 'balance' }}
                    >
                        {t.title}
                    </motion.h2>
                    <p className="mt-4 text-muted-foreground">{t.desc}</p>
                </div>

                {/* Cards */}
                <Carousel<Testimonial>
                    items={items}
                    getKey={(it) => it.id}
                    ariaLabel={t.title}
                    spaceBetween={16}
                    autoplay={items.length > 4 ? 3500 : undefined}
                    loop={items.length > 4}
                    renderItem={(it, index) => <Card it={it} index={index} />}
                    breakpoints={{
                        0: { slidesPerView: 1.4 },
                        480: { slidesPerView: 2.2 },
                        768: { slidesPerView: 3 },
                        1024: { slidesPerView: 4 },
                    }}
                />
            </div>

            {/* Modal player */}
            <TestimonialModal
                items={items}
                index={activeIndex}
                onClose={close}
                onNav={go}
                onSelect={setActiveIndex}
            />
        </section>
    );
};

/* ───────── Modal pemutar video ───────── */
function TestimonialModal({
    items,
    index,
    onClose,
    onNav,
    onSelect,
}: {
    items: Testimonial[];
    index: number | null;
    onClose: () => void;
    onNav: (dir: number) => void;
    onSelect: (i: number) => void;
}) {
    const { language } = useLanguage();
    const active = index !== null ? items[index] : null;

    // Tutup dengan Escape + navigasi panah.
    useEffect(() => {
        if (index === null) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight') onNav(1);
            if (e.key === 'ArrowLeft') onNav(-1);
        };
        window.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
        };
    }, [index, onClose, onNav]);

    return (
        <AnimatePresence>
            {active && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96, y: 16 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.97, y: 10 }}
                        transition={{ type: 'spring', stiffness: 280, damping: 26 }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-night-2 shadow-2xl"
                    >
                        {/* Close */}
                        <button
                            type="button"
                            onClick={onClose}
                            aria-label="Close"
                            className="absolute top-3 right-3 z-20 grid h-9 w-9 place-items-center rounded-full bg-black/50 text-white backdrop-blur-md transition-colors hover:bg-rose-600"
                        >
                            <X className="h-4 w-4" />
                        </button>

                        {/* Video */}
                        <div className="relative aspect-video w-full bg-black">
                            {active.video_url ? (
                                <video
                                    key={active.id}
                                    src={active.video_url}
                                    poster={active.thumbnail_url ?? undefined}
                                    controls
                                    autoPlay
                                    playsInline
                                    className="h-full w-full"
                                />
                            ) : (
                                <div className="grid h-full place-items-center text-white/60">
                                    {language === 'id'
                                        ? 'Video tidak tersedia'
                                        : 'Video unavailable'}
                                </div>
                            )}

                            {/* Prev / Next */}
                            {items.length > 1 && (
                                <>
                                    <button
                                        type="button"
                                        onClick={() => onNav(-1)}
                                        aria-label="Previous"
                                        className="absolute top-1/2 left-3 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-black/50 text-white backdrop-blur-md transition-colors hover:bg-cobalt"
                                    >
                                        <ChevronLeft className="h-5 w-5" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => onNav(1)}
                                        aria-label="Next"
                                        className="absolute top-1/2 right-3 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-black/50 text-white backdrop-blur-md transition-colors hover:bg-cobalt"
                                    >
                                        <ChevronRight className="h-5 w-5" />
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Detail */}
                        <div className="max-h-[40vh] overflow-y-auto p-6">
                            <div className="flex items-start gap-3">
                                <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-cobalt/15 font-display text-sm font-bold text-cobalt dark:text-cobalt-lt">
                                    {active.name.charAt(0).toUpperCase()}
                                </span>
                                <div className="min-w-0">
                                    <h3 className="font-display text-lg font-bold text-white">
                                        {active.name}
                                    </h3>
                                    {active.role && (
                                        <p className="text-xs text-white/55">
                                            {active.role}
                                        </p>
                                    )}
                                </div>
                            </div>
                            {active.description && (
                                <p className="mt-4 text-sm leading-relaxed text-white/75">
                                    {active.description}
                                </p>
                            )}

                            {/* Daftar testimoni lain */}
                            {items.length > 1 && (
                                <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
                                    {items.map((it, i) => (
                                        <button
                                            key={it.id}
                                            type="button"
                                            onClick={() => onSelect(i)}
                                            className={cn(
                                                'relative aspect-video h-14 shrink-0 overflow-hidden rounded-lg border transition-all',
                                                i === index
                                                    ? 'border-cobalt ring-2 ring-cobalt/50'
                                                    : 'border-white/10 opacity-60 hover:opacity-100',
                                            )}
                                            aria-label={it.name}
                                        >
                                            {it.thumbnail_url ? (
                                                <ImageWithFallback
                                                    src={it.thumbnail_url}
                                                    alt={it.name}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <span className="grid h-full w-full place-items-center bg-night-3 text-xs text-white/50">
                                                    {it.name.charAt(0)}
                                                </span>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default Testimonials;
