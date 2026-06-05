import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';

const fadeUp = {
    initial: { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
};

type Palette = { bg: string; ink: string };
const PALETTES: Palette[] = [
    { bg: '#14201B', ink: '#F2F0EA' },
    { bg: '#1F9D73', ink: '#08120D' },
    { bg: '#243831', ink: '#D2A653' },
    { bg: '#0E1311', ink: '#34C690' },
    { bg: '#E7E4D9', ink: '#15795A' },
    { bg: '#15543F', ink: '#EAF6F0' },
    { bg: '#B0822F', ink: '#0E1311' },
];

type Person = { name: string; role: string; layer: number; palette: number };

const content = {
    id: {
        eyebrow: 'Tentang Yayasan',
        title: 'Struktur Organisasi',
        subtitle:
            'Tujuh orang yang mengurus rak, koleksi, layanan, dan program literasi — sehari-hari.',
        noteLabel: 'Catatan',
        note: 'Kepala Perpustakaan bertanggung jawab langsung kepada Ketua Yayasan. Tim staf melayani jam buka penuh, dan tiga relawan siswa SMA membantu sirkulasi setiap sore selama hari sekolah.',
        org: [
            { name: 'Romo Antonius Yulianto, Pr.', role: 'Pembina Yayasan', layer: 0, palette: 0 },
            { name: 'Dr. Maria Sutanto, M.Pd.', role: 'Ketua Yayasan', layer: 1, palette: 1 },
            { name: 'Bapak Yohanes Pramono, S.Si., M.Pd.', role: 'Kepala Perpustakaan', layer: 2, palette: 2 },
            { name: 'Ibu Margareta Dewi, S.I.Pust.', role: 'Pustakawan Senior', layer: 3, palette: 5 },
            { name: 'Dr. Hendra Wijaya', role: 'Spesialis Literasi Digital', layer: 3, palette: 3 },
            { name: 'Bapak Wahyu Setiawan, S.Pd.', role: 'Koordinator Klub Baca', layer: 3, palette: 6 },
            { name: 'Ibu Rina Halim', role: 'Layanan Sirkulasi & Anggota', layer: 3, palette: 4 },
        ] as Person[],
    },
    en: {
        eyebrow: 'About the Foundation',
        title: 'Organization Structure',
        subtitle:
            'Seven people who tend the shelves, collection, services, and literacy programs — day to day.',
        noteLabel: 'Note',
        note: 'The Head Librarian reports directly to the Foundation Chair. The staff team serves full opening hours, and three high-school student volunteers assist circulation every afternoon during school days.',
        org: [
            { name: 'Fr. Antonius Yulianto, Pr.', role: 'Foundation Patron', layer: 0, palette: 0 },
            { name: 'Dr. Maria Sutanto, M.Pd.', role: 'Foundation Chair', layer: 1, palette: 1 },
            { name: 'Mr. Yohanes Pramono, S.Si., M.Pd.', role: 'Head Librarian', layer: 2, palette: 2 },
            { name: 'Mrs. Margareta Dewi, S.I.Pust.', role: 'Senior Librarian', layer: 3, palette: 5 },
            { name: 'Dr. Hendra Wijaya', role: 'Digital Literacy Specialist', layer: 3, palette: 3 },
            { name: 'Mr. Wahyu Setiawan, S.Pd.', role: 'Book Club Coordinator', layer: 3, palette: 6 },
            { name: 'Mrs. Rina Halim', role: 'Circulation & Membership', layer: 3, palette: 4 },
        ] as Person[],
    },
};

function initials(name: string) {
    return name
        .replace(/(Romo|Fr\.|Dr\.|Bapak|Ibu|Mr\.|Mrs\.|Pr\.|S\.[A-Za-z.]+|M\.[A-Za-z.]+)/g, '')
        .trim()
        .split(' ')
        .filter(Boolean)
        .map((w) => w[0])
        .slice(0, 2)
        .join('');
}

function PersonCard({ p, lg = false }: { p: Person; lg?: boolean }) {
    const pal = PALETTES[p.palette] ?? PALETTES[0];
    return (
        <motion.div {...fadeUp}>
            <div
                className={`bracket hairline flex h-full flex-col items-center rounded-xl2 border bg-card text-center text-cobalt transition-all duration-300 hover:border-cobalt hover:shadow-lift dark:bg-night-2 dark:text-cobalt-lt ${lg ? 'p-7' : 'p-5'}`}
            >
                <div
                    className="mb-4 grid h-20 w-20 place-items-center rounded-full font-display text-2xl italic"
                    style={{ background: pal.bg, color: pal.ink }}
                >
                    {initials(p.name)}
                </div>
                <div
                    className="font-display text-base leading-snug text-foreground"
                    style={{ textWrap: 'balance' }}
                >
                    {p.name}
                </div>
                <div className="tracking-editorial mt-1 font-mono text-[10px] uppercase text-cobalt dark:text-cobalt-lt">
                    {p.role}
                </div>
            </div>
        </motion.div>
    );
}

function Connector() {
    return (
        <div className="my-6 flex justify-center" aria-hidden="true">
            <div className="h-10 w-px bg-line dark:bg-night-line" />
        </div>
    );
}

function OrganizationStructurePage() {
    const { language } = useLanguage();
    const t = content[language] ?? content.id;
    const layer = (n: number) => t.org.filter((p) => p.layer === n);

    return (
        <section className="mx-auto max-w-7xl bg-background px-6 pt-16 pb-24 lg:px-10">
            <motion.span
                {...fadeUp}
                className="tracking-editorial inline-flex items-center gap-2 rounded-full bg-cobalt-50 px-3 py-1 text-[11px] font-semibold uppercase text-cobalt dark:bg-cobalt/15 dark:text-cobalt-lt"
            >
                <span className="h-1.5 w-1.5 rounded-full bg-cobalt dark:bg-cobalt-lt" />
                {t.eyebrow}
            </motion.span>
            <motion.h1
                {...fadeUp}
                transition={{ delay: 0.05 }}
                className="mt-5 font-display text-4xl text-foreground lg:text-6xl"
                style={{ textWrap: 'balance' }}
            >
                {t.title}
            </motion.h1>
            <motion.p
                {...fadeUp}
                transition={{ delay: 0.1 }}
                className="mt-3 max-w-2xl text-foreground/70"
            >
                {t.subtitle}
            </motion.p>

            {/* Org tree */}
            <div className="mt-16">
                <div className="flex justify-center">
                    <div className="w-[280px]">
                        <PersonCard p={layer(0)[0]} lg />
                    </div>
                </div>
                <Connector />
                <div className="flex justify-center">
                    <div className="w-[280px]">
                        <PersonCard p={layer(1)[0]} lg />
                    </div>
                </div>
                <Connector />
                <div className="flex justify-center">
                    <div className="w-[280px]">
                        <PersonCard p={layer(2)[0]} lg />
                    </div>
                </div>
                <Connector />
                <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                    {layer(3).map((p) => (
                        <PersonCard key={p.name} p={p} />
                    ))}
                </div>
            </div>

            {/* Note */}
            <div className="hairline mt-20 grid grid-cols-12 gap-8 border-t pt-10">
                <div className="col-span-12 lg:col-span-4">
                    <div className="flex items-center gap-3">
                        <span className="section-num text-xl">✦</span>
                        <span className="tracking-editorial font-mono text-[11px] font-semibold uppercase text-foreground/70">
                            {t.noteLabel}
                        </span>
                        <span className="h-px flex-1 bg-line dark:bg-night-line" />
                    </div>
                </div>
                <div className="col-span-12 lg:col-span-8">
                    <p className="text-lg leading-relaxed text-foreground/80">
                        {t.note}
                    </p>
                </div>
            </div>
        </section>
    );
}

export default OrganizationStructurePage;
