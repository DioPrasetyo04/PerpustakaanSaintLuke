import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { MapPin, Users, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const fadeUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
};

const eventsData = {
    id: [
        { d: '21', m: 'Mei', day: 'Selasa', time: '15.30', title: 'Selasa Sastra: Membedah Bumi Manusia', tag: 'Klub Baca', loc: 'Ruang Baca Utama', seats: '8 kursi tersisa' },
        { d: '28', m: 'Mei', day: 'Selasa', time: '15.30', title: 'Diskusi Filsafat: Pengantar Stoikisme', tag: 'Diskusi', loc: 'Ruang Diskusi 2', seats: '12 kursi tersisa' },
        { d: '02', m: 'Jun', day: 'Sabtu', time: '09.00', title: 'Workshop Literasi Digital Kelas X', tag: 'Workshop', loc: 'Lab Komputer', seats: 'Penuh · daftar antri' },
        { d: '07', m: 'Jun', day: 'Kamis', time: '14.00', title: 'Bedah Buku bersama Penulis Tamu', tag: 'Acara', loc: 'Aula Yayasan', seats: '24 kursi tersisa' },
    ],
    en: [
        { d: '21', m: 'May', day: 'Tuesday', time: '15.30', title: 'Literary Tuesday: Dissecting Bumi Manusia', tag: 'Book Club', loc: 'Main Reading Room', seats: '8 seats left' },
        { d: '28', m: 'May', day: 'Tuesday', time: '15.30', title: 'Philosophy Talk: Intro to Stoicism', tag: 'Discussion', loc: 'Discussion Room 2', seats: '12 seats left' },
        { d: '02', m: 'Jun', day: 'Saturday', time: '09.00', title: 'Digital Literacy Workshop · Grade X', tag: 'Workshop', loc: 'Computer Lab', seats: 'Full · waitlist' },
        { d: '07', m: 'Jun', day: 'Thursday', time: '14.00', title: 'Book Discussion with Guest Author', tag: 'Event', loc: 'Foundation Hall', seats: '24 seats left' },
    ],
};

const Events = () => {
    const { language } = useLanguage();
    const events = eventsData[language] ?? eventsData.id;

    return (
        <section className="hairline border-y bg-paper-2/40 dark:bg-night-2/30">
            <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
                <div className="mb-12 flex items-end justify-between gap-6">
                    <div>
                        <motion.span
                            {...fadeUp}
                            className="tracking-editorial inline-flex items-center gap-2 rounded-full bg-cobalt-50 px-3 py-1 text-[11px] font-semibold uppercase text-cobalt dark:bg-cobalt/15 dark:text-cobalt-lt"
                        >
                            <span className="h-1.5 w-1.5 rounded-full bg-cobalt dark:bg-cobalt-lt" />
                            {language === 'id' ? 'Agenda' : 'Agenda'}
                        </motion.span>
                        <motion.h2
                            {...fadeUp}
                            transition={{ delay: 0.08 }}
                            className="mt-5 font-display text-3xl text-foreground lg:text-5xl"
                            style={{ textWrap: 'balance' }}
                        >
                            {language === 'id'
                                ? 'Acara & jadwal klub baca'
                                : 'Events & book-club schedule'}
                        </motion.h2>
                    </div>
                    <Link
                        href="/informations"
                        className="group hidden items-center gap-2 text-sm font-semibold text-foreground hover:text-cobalt md:inline-flex dark:hover:text-cobalt-lt"
                    >
                        {language === 'id' ? 'Kalender penuh' : 'Full calendar'}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {events.map((e, i) => (
                        <motion.div
                            key={i}
                            {...fadeUp}
                            transition={{ delay: i * 0.07 }}
                            className="hairline group flex items-stretch gap-5 rounded-xl2 border bg-card p-5 transition-all duration-300 hover:border-cobalt/30 hover:shadow-lift dark:bg-night-2"
                        >
                            <div className="grid w-20 shrink-0 place-content-center rounded-xl bg-cobalt py-3 text-center text-white">
                                <div className="font-display text-3xl leading-none">
                                    {e.d}
                                </div>
                                <div className="tracking-editorial mt-1 text-[11px] uppercase opacity-90">
                                    {e.m}
                                </div>
                            </div>
                            <div className="min-w-0 flex-1">
                                <div className="mb-1.5 flex items-center gap-2">
                                    <span className="tracking-editorial rounded-full bg-cobalt-50 px-2.5 py-1 text-[10px] font-semibold uppercase text-cobalt dark:bg-cobalt/15 dark:text-cobalt-lt">
                                        {e.tag}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                        {e.day} · {e.time} WIB
                                    </span>
                                </div>
                                <h3
                                    className="font-display text-lg leading-snug text-foreground transition-colors group-hover:text-cobalt dark:group-hover:text-cobalt-lt"
                                    style={{ textWrap: 'balance' }}
                                >
                                    {e.title}
                                </h3>
                                <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                                    <span className="inline-flex items-center gap-1">
                                        <MapPin className="h-3 w-3" /> {e.loc}
                                    </span>
                                    <span className="inline-flex items-center gap-1 font-medium text-cobalt dark:text-cobalt-lt">
                                        <Users className="h-3 w-3" /> {e.seats}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Events;
