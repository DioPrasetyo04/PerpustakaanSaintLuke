import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    Search,
    Bookmark,
    MapPin,
    Check,
    BookOpen,
    Globe,
    Users,
    Star,
    ArrowRight,
    Clock,
} from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const fadeUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
};

/* Editorial eyebrow */
function Eyebrow({
    children,
    center = false,
}: {
    children: React.ReactNode;
    center?: boolean;
}) {
    return (
        <div
            className={`inline-flex items-center gap-2 font-mono text-[11px] tracking-editorial text-cobalt uppercase dark:text-cobalt-lt ${center ? 'justify-center' : ''}`}
        >
            <span className="h-1.5 w-1.5 rounded-full bg-cobalt dark:bg-cobalt-lt" />
            {children}
        </div>
    );
}

/* ─────────── TRUST BAR ─────────── */
export function TrustBar() {
    const { language } = useLanguage();
    const items =
        language === 'id'
            ? [
                  {
                      icon: BookOpen,
                      t: 'Katalog Lengkap',
                      s: '12.480+ koleksi terkurasi',
                  },
                  {
                      icon: Clock,
                      t: 'Pinjam Mudah',
                      s: 'Reservasi daring 24/7',
                  },
                  {
                      icon: Globe,
                      t: 'Sumber Digital',
                      s: 'E-book, jurnal & riset',
                  },
                  {
                      icon: Check,
                      t: 'Gratis Anggota',
                      s: 'Untuk seluruh siswa',
                  },
              ]
            : [
                  {
                      icon: BookOpen,
                      t: 'Full Catalog',
                      s: '12,480+ curated items',
                  },
                  {
                      icon: Clock,
                      t: 'Easy Borrowing',
                      s: 'Online reservation 24/7',
                  },
                  {
                      icon: Globe,
                      t: 'Digital Sources',
                      s: 'E-books, journals & research',
                  },
                  { icon: Check, t: 'Free Membership', s: 'For all students' },
              ];
    return (
        <section className="hairline border-y bg-card/60 backdrop-blur dark:bg-night-2/40">
            <div className="mx-auto max-w-7xl px-6 lg:px-10">
                <div className="hairline grid grid-cols-2 divide-x divide-y lg:grid-cols-4 lg:divide-y-0">
                    {items.map((it, i) => {
                        const Icon = it.icon;
                        return (
                            <div
                                key={i}
                                className="flex items-center gap-3 px-4 py-6 lg:px-6"
                            >
                                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-cobalt-50 text-cobalt dark:bg-cobalt/15 dark:text-cobalt-lt">
                                    <Icon className="h-[18px] w-[18px]" />
                                </div>
                                <div>
                                    <div className="text-sm font-semibold text-foreground">
                                        {it.t}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                        {it.s}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

/* ─────────── HOW TO BORROW ─────────── */
export function HowToBorrow() {
    const { language } = useLanguage();
    const steps =
        language === 'id'
            ? [
                  {
                      icon: Search,
                      title: 'Cari & Temukan',
                      body: 'Telusuri katalog daring, gunakan filter kategori, penulis, atau ketersediaan.',
                  },
                  {
                      icon: Bookmark,
                      title: 'Reservasi Online',
                      body: 'Klik "Pinjam" pada halaman buku. Reservasi langsung tercatat di akunmu.',
                  },
                  {
                      icon: MapPin,
                      title: 'Ambil di Rak',
                      body: 'Datang ke perpustakaan, tunjukkan kode, ambil di lokasi rak yang tertera.',
                  },
                  {
                      icon: Check,
                      title: 'Baca & Kembalikan',
                      body: 'Pinjam hingga 14 hari. Perpanjang sekali lewat akun jika butuh waktu lebih.',
                  },
              ]
            : [
                  {
                      icon: Search,
                      title: 'Search & Find',
                      body: 'Browse the online catalog, filter by category, author, or availability.',
                  },
                  {
                      icon: Bookmark,
                      title: 'Reserve Online',
                      body: 'Click "Borrow" on a book page. The reservation is logged to your account.',
                  },
                  {
                      icon: MapPin,
                      title: 'Pick Up at Shelf',
                      body: 'Come to the library, show your code, collect it at the listed shelf.',
                  },
                  {
                      icon: Check,
                      title: 'Read & Return',
                      body: 'Borrow up to 14 days. Extend once via your account if you need more time.',
                  },
              ];
    return (
        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
            <motion.div
                {...fadeUp}
                className="mx-auto mb-16 max-w-2xl text-center"
            >
                <div className="flex justify-center">
                    <Eyebrow center>
                        {language === 'id' ? 'Cara Meminjam' : 'How to Borrow'}
                    </Eyebrow>
                </div>
                <h2
                    className="mt-5 font-display text-3xl text-foreground lg:text-5xl"
                    style={{ textWrap: 'balance' }}
                >
                    {language === 'id'
                        ? 'Empat langkah, bukumu di tangan'
                        : 'Four steps, your book in hand'}
                </h2>
            </motion.div>

            <div className="flex flex-col gap-10 lg:flex-row lg:gap-6">
                {steps.map((s, i) => {
                    const Icon = s.icon;
                    return (
                        <motion.div
                            key={i}
                            {...fadeUp}
                            transition={{ delay: i * 0.09 }}
                            className="relative flex-1"
                        >
                            <div className="hairline grid h-14 w-14 place-items-center rounded-2xl border bg-card text-cobalt shadow-soft dark:bg-night-2 dark:text-cobalt-lt">
                                <Icon className="h-6 w-6" />
                            </div>
                            <div className="mt-5 font-mono text-[11px] tracking-editorial text-muted-foreground uppercase">
                                {language === 'id' ? 'Langkah' : 'Step'} 0
                                {i + 1}
                            </div>
                            <h3 className="mt-2 font-display text-xl font-semibold text-foreground">
                                {s.title}
                            </h3>
                            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                {s.body}
                            </p>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}

/* ─────────── WHY US ─────────── */
export function WhyUs() {
    const { language } = useLanguage();
    const feats =
        language === 'id'
            ? [
                  {
                      icon: BookOpen,
                      title: 'Koleksi Terkurasi',
                      body: 'Setiap judul dipilih pustakawan, bukan algoritma. Dari sastra kanon hingga sains terkini.',
                  },
                  {
                      icon: Globe,
                      title: 'Akses Digital 24/7',
                      body: 'Telusuri katalog, reservasi buku, dan akses e-book serta jurnal akademik kapan saja.',
                  },
                  {
                      icon: Users,
                      title: 'Untuk Setiap Jenjang',
                      body: 'Melayani siswa SD hingga SMA dengan koleksi sesuai usia dan kebutuhan akademik.',
                  },
                  {
                      icon: Star,
                      title: 'Program Literasi',
                      body: 'Klub baca, lomba resensi, dan pelatihan literasi digital yang menumbuhkan minat baca.',
                  },
              ]
            : [
                  {
                      icon: BookOpen,
                      title: 'Curated Collection',
                      body: 'Every title is chosen by librarians, not algorithms — from canon literature to current science.',
                  },
                  {
                      icon: Globe,
                      title: '24/7 Digital Access',
                      body: 'Browse the catalog, reserve books, and access e-books and academic journals anytime.',
                  },
                  {
                      icon: Users,
                      title: 'For Every Level',
                      body: 'Serving primary to high-school students with age- and curriculum-appropriate collections.',
                  },
                  {
                      icon: Star,
                      title: 'Literacy Programs',
                      body: 'Book clubs, review contests, and digital-literacy training that grow reading habits.',
                  },
              ];
    return (
        <section className="hairline border-y bg-paper-2/40 dark:bg-night-2/30">
            <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
                <div className="grid grid-cols-12 gap-10 lg:gap-16">
                    <motion.div
                        {...fadeUp}
                        className="col-span-12 lg:col-span-4"
                    >
                        <Eyebrow>
                            {language === 'id' ? 'Kenapa Kami' : 'Why Us'}
                        </Eyebrow>
                        <h2
                            className="mt-5 font-display text-3xl leading-tight text-foreground lg:text-5xl"
                            style={{ textWrap: 'balance' }}
                        >
                            {language === 'id' ? (
                                <>
                                    Lebih dari sekadar{' '}
                                    <em className="text-cobalt not-italic dark:text-cobalt-lt">
                                        rak buku
                                    </em>
                                </>
                            ) : (
                                <>
                                    More than just a{' '}
                                    <em className="text-cobalt not-italic dark:text-cobalt-lt">
                                        bookshelf
                                    </em>
                                </>
                            )}
                        </h2>
                        <p className="mt-4 leading-relaxed text-muted-foreground">
                            {language === 'id'
                                ? 'Kami membangun ruang baca yang tenang, terkurasi, dan menyambut — tempat setiap siswa menemukan bacaan yang tepat.'
                                : 'We build a quiet, curated, welcoming reading space — where every student finds the right read.'}
                        </p>
                        <Link
                            href="/about/profile"
                            className="btn-press mt-7 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-paper transition-colors hover:bg-ink-soft dark:bg-card dark:text-foreground"
                        >
                            {language === 'id' ? 'Tentang Kami' : 'About Us'}
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </motion.div>

                    <div className="col-span-12 grid gap-4 sm:grid-cols-2 lg:col-span-8">
                        {feats.map((f, i) => {
                            const Icon = f.icon;
                            return (
                                <motion.div
                                    key={i}
                                    {...fadeUp}
                                    transition={{ delay: i * 0.07 }}
                                    className="hairline rounded-xl2 border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cobalt/30 hover:shadow-lift dark:bg-night-2"
                                >
                                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-cobalt-50 text-cobalt dark:bg-cobalt/15 dark:text-cobalt-lt">
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
                                        {f.title}
                                    </h3>
                                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                        {f.body}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ─────────── TESTIMONIALS ─────────── */
export function Testimonials() {
    const { language } = useLanguage();
    const data = [
        {
            name: 'Nadia Putri',
            role: language === 'id' ? 'Siswa Kelas XI IPA' : 'Grade 11 Science',
            text:
                language === 'id'
                    ? 'Perpustakaan ini jadi tempat favoritku. Katalog daringnya bikin nyari buku gampang banget, tinggal reservasi dari HP.'
                    : 'This library became my favorite spot. The online catalog makes finding books so easy — I just reserve from my phone.',
            bg: '#14201B',
            ink: '#34C690',
        },
        {
            name: 'Bpk. Yohanes',
            role: language === 'id' ? 'Wali Kelas X' : 'Grade 10 Teacher',
            text:
                language === 'id'
                    ? 'Sebagai guru, saya terbantu sekali. Murid bisa diarahkan ke sumber tepercaya, dan pustakawannya responsif.'
                    : 'As a teacher, it helps me a lot. I can point students to trusted sources, and the librarians are responsive.',
            bg: '#15543F',
            ink: '#D2A653',
        },
        {
            name: 'Raka Saputra',
            role: language === 'id' ? 'Siswa Kelas XII' : 'Grade 12 Student',
            text:
                language === 'id'
                    ? 'Dulu malas baca. Sejak ikut klub baca di sini, sekarang target 1 buku per minggu. Koleksinya lengkap.'
                    : 'I used to dislike reading. Since joining the book club here, I aim for a book a week. The collection is complete.',
            bg: '#1F9D73',
            ink: '#08120D',
        },
        {
            name: 'Citra Maharani',
            role: language === 'id' ? 'Alumni Angkatan 2024' : 'Class of 2024',
            text:
                language === 'id'
                    ? 'Sudah lulus pun masih sering balik. Suasananya tenang, dan koleksi sastranya benar-benar terkurasi.'
                    : 'Even after graduating I still come back. The atmosphere is calm, and the literature collection is truly curated.',
            bg: '#243831',
            ink: '#D2A653',
        },
    ];
    return (
        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
            <motion.div
                {...fadeUp}
                className="mx-auto mb-14 max-w-2xl text-center"
            >
                <div className="flex justify-center">
                    <Eyebrow center>
                        {language === 'id' ? 'Kata Mereka' : 'Testimonials'}
                    </Eyebrow>
                </div>
                <h2
                    className="mt-5 font-display text-3xl text-foreground lg:text-5xl"
                    style={{ textWrap: 'balance' }}
                >
                    {language === 'id' ? (
                        <>
                            Dipercaya siswa, guru, &{' '}
                            <em className="text-cobalt not-italic dark:text-cobalt-lt">
                                alumni
                            </em>
                        </>
                    ) : (
                        <>
                            Trusted by students, teachers, &{' '}
                            <em className="text-cobalt not-italic dark:text-cobalt-lt">
                                alumni
                            </em>
                        </>
                    )}
                </h2>
            </motion.div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
                {data.map((t, i) => (
                    <motion.div
                        key={i}
                        {...fadeUp}
                        transition={{ delay: i * 0.07 }}
                        className="bracket hairline flex h-full flex-col rounded-xl2 border bg-card p-6 text-cobalt transition-all duration-300 hover:border-cobalt/40 hover:shadow-lift dark:bg-night-2 dark:text-cobalt-lt"
                    >
                        <div className="flex gap-0.5">
                            {[...Array(5)].map((_, s) => (
                                <Star
                                    key={s}
                                    className="h-3.5 w-3.5 fill-brass-lt text-brass-lt"
                                />
                            ))}
                        </div>
                        <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground/80">
                            “{t.text}”
                        </p>
                        <div className="hairline mt-5 flex items-center gap-3 border-t pt-4">
                            <div
                                className="grid h-10 w-10 shrink-0 place-items-center rounded-full font-display text-sm"
                                style={{ background: t.bg, color: t.ink }}
                            >
                                {t.name
                                    .split(' ')
                                    .map((w) => w[0])
                                    .slice(0, 2)
                                    .join('')}
                            </div>
                            <div>
                                <div className="text-sm font-semibold text-foreground">
                                    {t.name}
                                </div>
                                <div className="text-[11px] text-muted-foreground">
                                    {t.role}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

/* ─────────── CTA JOIN ─────────── */
export function CtaJoin() {
    const { language } = useLanguage();
    return (
        <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">
            <motion.div {...fadeUp}>
                <div className="relative overflow-hidden rounded-4xl bg-cobalt p-10 text-white lg:p-16">
                    <div className="dot-grid absolute inset-0 opacity-20" />
                    <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-white/10 blur-2xl" />
                    <div className="absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-cobalt-dk/40 blur-2xl" />
                    <div className="relative grid grid-cols-12 items-center gap-8">
                        <div className="col-span-12 lg:col-span-8">
                            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold tracking-editorial uppercase">
                                <Users className="h-3 w-3" />
                                {language === 'id'
                                    ? 'Akun Anggota'
                                    : 'Member Account'}
                            </span>
                            <h2
                                className="mt-5 font-display text-3xl leading-tight lg:text-5xl"
                                style={{ textWrap: 'balance' }}
                            >
                                {language === 'id'
                                    ? 'Masuk untuk mengelola pinjaman & wishlist-mu'
                                    : 'Sign in to manage your loans & wishlist'}
                            </h2>
                            <p className="mt-4 max-w-xl leading-relaxed text-white/80">
                                {language === 'id'
                                    ? 'Pantau buku yang sedang dipinjam, tanggal jatuh tempo, riwayat bacaan, dan simpan judul incaran — semua dalam satu dashboard.'
                                    : 'Track borrowed books, due dates, reading history, and save titles you want — all in one dashboard.'}
                            </p>
                        </div>
                        <div className="col-span-12 flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:flex-col">
                            <Link
                                href="/dashboard"
                                className="btn-press inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-cobalt transition-colors hover:bg-paper"
                            >
                                {language === 'id'
                                    ? 'Masuk Anggota'
                                    : 'Member Sign In'}
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                            <Link
                                href="/catalog/books"
                                className="btn-press inline-flex w-full items-center justify-center rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                            >
                                {language === 'id'
                                    ? 'Jelajah Katalog'
                                    : 'Browse Catalog'}
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
