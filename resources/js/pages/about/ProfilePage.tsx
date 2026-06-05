import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';

const fadeUp = {
    initial: { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
};

function Eyebrow({ children }: { children: React.ReactNode }) {
    return (
        <span className="tracking-editorial inline-flex items-center gap-2 rounded-full bg-cobalt-50 px-3 py-1 text-[11px] font-semibold uppercase text-cobalt dark:bg-cobalt/15 dark:text-cobalt-lt">
            <span className="h-1.5 w-1.5 rounded-full bg-cobalt dark:bg-cobalt-lt" />
            {children}
        </span>
    );
}

function SectionLabel({ num, label }: { num: string; label: string }) {
    return (
        <div className="mb-12 flex items-center gap-3">
            <span className="section-num text-xl tabnum">{num}</span>
            <span className="tracking-editorial font-mono text-[11px] font-semibold uppercase text-foreground/70">
                {label}
            </span>
            <span className="h-px flex-1 bg-line dark:bg-night-line" />
        </div>
    );
}

const content = {
    id: {
        eyebrow: 'Tentang Yayasan',
        titlePre: 'Sebuah ',
        titleEm: 'rumah baca',
        titlePost: ' yang tumbuh sejak 1968.',
        p1: 'Perpustakaan Yayasan Santo Lukas dimulai dari satu ruang kecil di belakang bangunan asrama — tiga rak kayu jati, sekitar empat ratus judul, dan seorang pustakawan paruh waktu. Lima puluh delapan tahun kemudian, rumah baca ini telah berkembang menjadi pusat literasi yang melayani lebih dari seribu delapan ratus anggota aktif, dari kelas satu SD hingga kelas tiga SMA.',
        p2: 'Kami percaya membaca bukan sekadar memindahkan kata dari halaman ke kepala — ia adalah latihan untuk mendengarkan, menimbang, dan mencintai dunia dengan lebih tepat. Itulah sebabnya setiap judul yang masuk ke rak kami melalui proses kurasi pustakawan, bukan sekadar diisi berdasarkan tren.',
        since: 'Sejak Tahun',
        motto: '"Membaca adalah cara paling tenang untuk mengubah hati."',
        mottoBy: 'Motto Yayasan',
        timelineLabel: 'Lima Babak Sejarah',
        milestones: [
            { y: '1968', t: 'Awal Mula', b: 'Satu ruang kecil dengan 400 judul di belakang asrama. Pustakawan pertama adalah seorang romo yang juga mengajar Bahasa Latin.' },
            { y: '1985', t: 'Perluasan Pertama', b: 'Yayasan mendirikan gedung perpustakaan dua lantai. Koleksi melampaui 3.000 judul, klub baca pertama dibentuk.' },
            { y: '2003', t: 'Era Digital', b: 'Katalogisasi pertama dengan sistem komputer. Akses ke jurnal akademik dimulai melalui kerjasama dengan PNRI.' },
            { y: '2018', t: 'Renovasi Modern', b: 'Renovasi total: ruang baca tenang, ruang diskusi, dan area koleksi langka. 9.500 judul dan 1.400 anggota aktif.' },
            { y: '2026', t: 'Hari Ini', b: '12.480 koleksi, 1.856 anggota, dan portal daring yang Anda gunakan saat ini.' },
        ],
        stats: [
            { v: '58', l: 'Tahun melayani' },
            { v: '12.480', l: 'Koleksi keseluruhan' },
            { v: '1.856', l: 'Anggota aktif' },
            { v: '430', l: 'Klub baca per tahun' },
        ],
    },
    en: {
        eyebrow: 'About the Foundation',
        titlePre: 'A ',
        titleEm: 'reading home',
        titlePost: ' growing since 1968.',
        p1: 'The Saint Luke Foundation Library began in a small room behind the dormitory — three teak shelves, about four hundred titles, and one part-time librarian. Fifty-eight years later, this reading home has grown into a literacy hub serving over one thousand eight hundred active members, from first grade to senior high school.',
        p2: 'We believe reading is not merely moving words from page to mind — it is practice in listening, weighing, and loving the world more precisely. That is why every title on our shelves passes through librarian curation, not merely stocked by trend.',
        since: 'Since',
        motto: '"Reading is the quietest way to change a heart."',
        mottoBy: 'Foundation Motto',
        timelineLabel: 'Five Chapters of History',
        milestones: [
            { y: '1968', t: 'The Beginning', b: 'One small room with 400 titles behind the dormitory. The first librarian was a priest who also taught Latin.' },
            { y: '1985', t: 'First Expansion', b: 'The foundation built a two-storey library. The collection passed 3,000 titles; the first book club formed.' },
            { y: '2003', t: 'Digital Era', b: 'First computerised cataloguing. Access to academic journals began via partnership with PNRI.' },
            { y: '2018', t: 'Modern Renovation', b: 'A full renovation: quiet reading rooms, discussion rooms, and a rare-collection area. 9,500 titles and 1,400 active members.' },
            { y: '2026', t: 'Today', b: '12,480 items, 1,856 members, and the online portal you are using right now.' },
        ],
        stats: [
            { v: '58', l: 'Years of service' },
            { v: '12,480', l: 'Total collection' },
            { v: '1,856', l: 'Active members' },
            { v: '430', l: 'Book clubs per year' },
        ],
    },
};

function ProfilePage() {
    const { language } = useLanguage();
    const t = content[language] ?? content.id;

    return (
        <section className="bg-background pb-24">
            {/* Editorial hero */}
            <div className="hairline border-b">
                <div className="mx-auto grid max-w-7xl grid-cols-12 gap-10 px-6 pt-16 pb-20 lg:px-10">
                    <div className="col-span-12 lg:col-span-7">
                        <motion.div {...fadeUp}>
                            <Eyebrow>{t.eyebrow}</Eyebrow>
                        </motion.div>
                        <motion.h1
                            {...fadeUp}
                            transition={{ delay: 0.05 }}
                            className="mt-3 font-display text-4xl leading-[1.05] text-foreground lg:text-6xl"
                            style={{ textWrap: 'balance' }}
                        >
                            {t.titlePre}
                            <em className="text-cobalt not-italic dark:text-cobalt-lt">
                                {t.titleEm}
                            </em>
                            {t.titlePost}
                        </motion.h1>
                        <motion.p
                            {...fadeUp}
                            transition={{ delay: 0.1 }}
                            className="drop-cap mt-8 max-w-2xl text-lg leading-[1.75] text-foreground/80"
                            style={{ textWrap: 'pretty' }}
                        >
                            {t.p1}
                        </motion.p>
                        <motion.p
                            {...fadeUp}
                            transition={{ delay: 0.15 }}
                            className="mt-6 max-w-2xl text-lg leading-[1.75] text-foreground/80"
                            style={{ textWrap: 'pretty' }}
                        >
                            {t.p2}
                        </motion.p>
                    </div>

                    <div className="col-span-12 lg:col-span-5">
                        <div className="lg:sticky lg:top-32">
                            <div className="spine-shadow flex aspect-[4/5] flex-col justify-between bg-ink p-8 text-paper shadow-book-3d">
                                <div className="tracking-editorial font-mono text-[10px] uppercase text-cobalt-lt">
                                    {t.since}
                                </div>
                                <div>
                                    <div className="font-display text-[120px] leading-none tabnum">
                                        1968
                                    </div>
                                    <div className="mt-4 h-px w-12 bg-cobalt-lt" />
                                    <div className="mt-4 font-quote text-2xl text-paper/85 italic">
                                        {t.motto}
                                    </div>
                                    <div className="tracking-editorial mt-3 font-mono text-[10px] uppercase text-paper/55">
                                        {t.mottoBy}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Timeline */}
            <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
                <SectionLabel num="01" label={t.timelineLabel} />
                <div className="grid grid-cols-12 gap-8">
                    {t.milestones.map((s, i) => (
                        <motion.div
                            key={s.y}
                            {...fadeUp}
                            transition={{ delay: i * 0.08 }}
                            className="col-span-12 md:col-span-6 lg:col-span-4"
                        >
                            <div className="bracket hairline h-full rounded-xl2 border bg-card p-8 text-cobalt transition-all duration-300 hover:-translate-y-1 hover:border-cobalt/40 hover:shadow-lift dark:bg-night-2 dark:text-cobalt-lt">
                                <div className="font-display text-5xl tabnum text-cobalt italic dark:text-cobalt-lt">
                                    {s.y}
                                </div>
                                <div className="mt-2 font-display text-xl text-foreground">
                                    {s.t}
                                </div>
                                <p className="mt-3 text-sm leading-relaxed text-foreground/75">
                                    {s.b}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Numbers band */}
            <div className="bg-ink py-20 text-paper dark:bg-night-2">
                <div className="mx-auto max-w-7xl px-6 lg:px-10">
                    <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
                        {t.stats.map((s, i) => (
                            <motion.div key={s.l} {...fadeUp} transition={{ delay: i * 0.08 }}>
                                <div className="font-display text-6xl tabnum text-paper">
                                    {s.v}
                                </div>
                                <div className="mt-2 text-sm text-paper/70">{s.l}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ProfilePage;
