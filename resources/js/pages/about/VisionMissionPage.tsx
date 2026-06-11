import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';

const fadeUp = {
    initial: { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
};

function SectionLabel({ num, label }: { num: string; label: string }) {
    return (
        <div className="flex items-center gap-3">
            <span className="section-num tabnum text-xl">{num}</span>
            <span className="font-mono text-[30px] font-semibold tracking-editorial text-foreground/70 uppercase">
                {label}
            </span>
            {/* <span className="h-px flex-1 bg-line dark:bg-night-line" /> */}
        </div>
    );
}

const content = {
    id: {
        eyebrow: 'Tentang Yayasan',
        title: 'Visi & Misi',
        visiLabel: 'Visi',
        misiLabel: 'Misi',
        visionPre: 'Menjadi ',
        visionEm:
            'Yayasan Pendidikan Katolik yang profesional, unggul, berdaya saing ',
        visionPost: 'dan berdaya pikat baik',
        visionEm2: 'di tingkat lokal maupun global',
        missions: [
            {
                num: 'I',
                t: 'Tata Kelola Profesional',
                b: 'Melaksanakan tata kelola lembaga secara profesional, partisipatif, dinamis, akuntabel, dan transparan',
            },
            {
                num: 'II',
                t: 'Perkembangan Pendidikan Berkualitas',
                b: 'Mengembangkan pendidikan dan pengajaran yang bermutu baik dalam bidang akademik, moral, dan iman,',
            },
            {
                num: 'III',
                t: 'Kultur Organisasi Yang Baik',
                b: 'Menciptakan kultur organisasi yang baik melalui pembentukan karakter berdasarkan nilai-nilai Katolik dan Spirit Santo Lukas, karakter kebangsaan dan nilai-nilai moral universal',
            },
            {
                num: 'IV',
                t: 'Kerja Sama Profesional',
                b: 'Melakukan kerja sama dengan berbagai pihak untuk meningkatkan kinerja lembaga',
            },
        ],
        // closing:
        //     '"Membaca adalah cara paling tenang untuk mengubah hati. Dan hati yang berubah, mengubah segala yang lain."',
        // closingBy: 'Motto Yayasan Santo Lukas',
    },
    en: {
        eyebrow: 'About the Foundation',
        title: 'Vision & Mission',
        visiLabel: 'Vision',
        misiLabel: 'Mission',
        visionPre: 'Become ',
        visionEm:
            'A professional, superior, competitive Catholic Education Foundation ',
        visionPost: 'and good appeal ',
        visionEm2: 'at both local and global levels',
        missions: [
            {
                num: 'I',
                t: 'Professional Governance',
                b: 'Implement institutional governance in a professional, participatory, dynamic, accountable and transparent manner.',
            },
            {
                num: 'II',
                t: 'Development of Quality Education',
                b: 'Develop good quality education and teaching in the fields of academics, morals and faith',
            },
            {
                num: 'III',
                t: 'Good Organizational Culture',
                b: 'Creating a good organizational culture through character building based on Catholic values ​​and the Spirit of Saint Luke, national character and universal moral values',
            },
            {
                num: 'IV',
                t: 'Professional Collaboration',
                b: 'Collaborate with various parties to improve institutional performance',
            },
        ],
        // closing:
        //     '"Reading is the quietest way to change a heart. And a changed heart changes everything else."',
        // closingBy: 'Saint Luke Foundation Motto',
    },
};

function VisionMissionPage() {
    const { language } = useLanguage();
    const t = content[language] ?? content.id;

    return (
        <section className="bg-background pb-24">
            <div className="mx-auto max-w-5xl px-6 pt-16 lg:px-10">
                <motion.span
                    {...fadeUp}
                    className="inline-flex items-center gap-2 rounded-full bg-cobalt-50 px-3 py-1 text-[11px] font-semibold tracking-editorial text-cobalt uppercase dark:bg-cobalt/15 dark:text-cobalt-lt"
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

                {/* Visi */}
                <div className="mt-20 grid grid-cols-1 gap-8 lg:grid-cols-12">
                    <div className="col-span-full lg:col-span-3">
                        <SectionLabel num="I" label={t.visiLabel} />
                    </div>
                    <motion.div
                        {...fadeUp}
                        className="col-span-full lg:col-span-9"
                    >
                        <div
                            className="font-display text-3xl leading-[1.15] text-foreground lg:text-5xl"
                            style={{ textWrap: 'balance' }}
                        >
                            {t.visionPre}
                            <em className="text-cobalt not-italic dark:text-cobalt-lt">
                                {t.visionEm}
                            </em>
                            {t.visionPost}
                            <em className="italic">{t.visionEm2}</em>.
                        </div>
                    </motion.div>
                </div>

                {/* Misi */}
                <div className="mt-24 grid grid-cols-1 gap-8 lg:grid-cols-12">
                    <div className="col-span-full lg:col-span-3">
                        <SectionLabel num="II" label={t.misiLabel} />
                    </div>
                    <div className="col-span-full space-y-px lg:col-span-9">
                        {t.missions.map((m, i) => (
                            <motion.div
                                key={m.num}
                                {...fadeUp}
                                transition={{ delay: i * 0.08 }}
                                className="hairline grid grid-cols-12 gap-4 border-t py-8"
                            >
                                <div className="col-span-2 lg:col-span-1">
                                    <div className="font-display text-5xl text-cobalt italic dark:text-cobalt-lt">
                                        {m.num}
                                    </div>
                                </div>
                                <div className="col-span-10 lg:col-span-11">
                                    <h3
                                        className="font-display text-2xl leading-snug text-foreground"
                                        style={{ textWrap: 'balance' }}
                                    >
                                        {m.t}
                                    </h3>
                                    <p
                                        className="mt-3 max-w-2xl text-lg leading-[1.7] text-foreground/80"
                                        style={{ textWrap: 'pretty' }}
                                    >
                                        {m.b}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Closing */}
                {/* <motion.div
                    {...fadeUp}
                    className="hairline mt-24 border-t pt-12 text-center"
                >
                    <div
                        className="mx-auto max-w-3xl font-quote text-2xl leading-snug text-foreground italic lg:text-3xl"
                        style={{ textWrap: 'balance' }}
                    >
                        {t.closing}
                    </div>
                    <div className="mt-4 font-mono text-[20px] tracking-editorial text-muted-foreground uppercase">
                        {t.closingBy}
                    </div>
                </motion.div> */}
            </div>
        </section>
    );
}

export default VisionMissionPage;
