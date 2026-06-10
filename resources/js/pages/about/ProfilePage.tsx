import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';

const fadeUp = {
    initial: { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
};

function Eyebrow({ children }: { children: React.ReactNode }) {
    return (
        <span className="inline-flex items-center gap-2 rounded-full bg-cobalt-50 px-3 py-1 text-[11px] font-semibold tracking-editorial text-cobalt uppercase dark:bg-cobalt/15 dark:text-cobalt-lt">
            <span className="h-1.5 w-1.5 rounded-full bg-cobalt dark:bg-cobalt-lt" />
            {children}
        </span>
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
            {
                y: '1968',
                t: 'Awal Mula',
                b: 'Satu ruang kecil dengan 400 judul di belakang asrama. Pustakawan pertama adalah seorang romo yang juga mengajar Bahasa Latin.',
            },
            {
                y: '1985',
                t: 'Perluasan Pertama',
                b: 'Yayasan mendirikan gedung perpustakaan dua lantai. Koleksi melampaui 3.000 judul, klub baca pertama dibentuk.',
            },
            {
                y: '2003',
                t: 'Era Digital',
                b: 'Katalogisasi pertama dengan sistem komputer. Akses ke jurnal akademik dimulai melalui kerjasama dengan PNRI.',
            },
            {
                y: '2018',
                t: 'Renovasi Modern',
                b: 'Renovasi total: ruang baca tenang, ruang diskusi, dan area koleksi langka. 9.500 judul dan 1.400 anggota aktif.',
            },
            {
                y: '2026',
                t: 'Hari Ini',
                b: '12.480 koleksi, 1.856 anggota, dan portal daring yang Anda gunakan saat ini.',
            },
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
            {
                y: '1968',
                t: 'The Beginning',
                b: 'One small room with 400 titles behind the dormitory. The first librarian was a priest who also taught Latin.',
            },
            {
                y: '1985',
                t: 'First Expansion',
                b: 'The foundation built a two-storey library. The collection passed 3,000 titles; the first book club formed.',
            },
            {
                y: '2003',
                t: 'Digital Era',
                b: 'First computerised cataloguing. Access to academic journals began via partnership with PNRI.',
            },
            {
                y: '2018',
                t: 'Modern Renovation',
                b: 'A full renovation: quiet reading rooms, discussion rooms, and a rare-collection area. 9,500 titles and 1,400 active members.',
            },
            {
                y: '2026',
                t: 'Today',
                b: '12,480 items, 1,856 members, and the online portal you are using right now.',
            },
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
                <div className="mx-auto grid max-w-[100rem] grid-cols-1 gap-10 px-6 pt-16 pb-20 lg:grid-cols-12 lg:px-10">
                    <div className="col-span-full lg:col-span-7">
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

                    <div className="col-span-full lg:col-span-5">
                        <div className="lg:sticky lg:top-32">
                            <div className="spine-shadow relative flex aspect-[16/11] flex-col justify-between overflow-hidden rounded-2xl bg-ink p-6 text-paper shadow-book-3d sm:aspect-[4/3] sm:p-8 lg:aspect-[4/5]">
                                {/* Latar gambar ruang baca + overlay agar teks tetap terbaca */}
                                <img
                                    src="/assets/images/profile-library.svg"
                                    alt="Ruang baca Perpustakaan Santo Lukas"
                                    loading="lazy"
                                    className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                                />
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/45 to-ink/90" />
                                <div className="relative font-mono text-[10px] tracking-editorial text-cobalt-lt uppercase">
                                    {t.since}
                                </div>
                                <div className="relative">
                                    <div className="tabnum font-display text-[88px] leading-none drop-shadow-lg sm:text-[110px] lg:text-[120px]">
                                        1968
                                    </div>
                                    <div className="mt-4 h-px w-12 bg-cobalt-lt" />
                                    <div className="mt-4 font-quote text-xl text-paper italic drop-shadow sm:text-2xl">
                                        {t.motto}
                                    </div>
                                    <div className="mt-3 font-mono text-[10px] tracking-editorial text-paper/70 uppercase">
                                        {t.mottoBy}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ProfilePage;
