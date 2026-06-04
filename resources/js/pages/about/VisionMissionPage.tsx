import { motion } from 'framer-motion';
import { Target } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/hooks/useLanguage';

const content = {
    id: {
        hero: {
            title: 'Visi & Misi',
            subtitle: 'Komitmen kami terhadap keunggulan akademis dan pembelajaran seumur hidup',
        },
        guiding: {
            heading: 'Memandu Masa Depan Kami',
        },
        vision: {
            title: 'Visi Kami',
            description:
                'Menjadi perpustakaan akademis terkemuka yang memberdayakan individu melalui akses pengetahuan, mendorong inovasi, berpikir kritis, dan pembelajaran seumur hidup di era digital.',
            futureTitle: 'Kami membayangkan masa depan di mana:',
            futureItems: [
                'Pengetahuan dapat diakses oleh semua orang, di mana saja',
                'Belajar menjadi perjalanan seumur hidup',
                'Teknologi dan tradisi bekerja secara harmonis',
                'Komunitas berkembang melalui pengetahuan bersama',
            ],
        },
        mission: {
            title: 'Misi Kami',
            description:
                'Kami berkomitmen untuk memberikan layanan perpustakaan yang luar biasa yang mendukung kesuksesan akademis dan pertumbuhan pribadi. Misi kami mencakup:',
            items: [
                {
                    title: 'Keunggulan Sumber Daya',
                    desc: 'Menyediakan akses komprehensif ke beragam sumber daya informasi',
                },
                {
                    title: 'Dukungan Akademis',
                    desc: 'Mendukung keunggulan akademis melalui layanan perpustakaan yang inovatif',
                },
                {
                    title: 'Literasi Informasi',
                    desc: 'Menumbuhkan literasi informasi dan pengembangan keterampilan penelitian',
                },
                {
                    title: 'Lingkungan Inklusif',
                    desc: 'Menciptakan lingkungan belajar yang inklusif bagi semua pengguna',
                },
                {
                    title: 'Integrasi Teknologi',
                    desc: 'Memanfaatkan teknologi untuk meningkatkan aksesibilitas dan pengalaman pengguna',
                },
            ],
        },
        coreValues: {
            title: 'Nilai Inti Kami',
            items: [
                {
                    icon: '🎯',
                    title: 'Keunggulan',
                    description: 'Kami berusaha mencapai standar tertinggi dalam segala hal yang kami lakukan',
                    color: 'from-blue-500 to-blue-600',
                },
                {
                    icon: '🤝',
                    title: 'Kolaborasi',
                    description: 'Kami bekerja sama untuk mencapai tujuan bersama dan mendukung komunitas kami',
                    color: 'from-green-500 to-green-600',
                },
                {
                    icon: '💡',
                    title: 'Inovasi',
                    description: 'Kami merangkul ide dan teknologi baru untuk meningkatkan layanan kami',
                    color: 'from-purple-500 to-purple-600',
                },
                {
                    icon: '🌟',
                    title: 'Integritas',
                    description: 'Kami bertindak dengan kejujuran, transparansi, dan tanggung jawab etis',
                    color: 'from-amber-500 to-amber-600',
                },
                {
                    icon: '🌍',
                    title: 'Inklusivitas',
                    description: 'Kami menyambut dan menghormati semua anggota komunitas kami yang beragam',
                    color: 'from-red-500 to-red-600',
                },
                {
                    icon: '📖',
                    title: 'Pembelajaran',
                    description: 'Kami mendorong pembelajaran berkelanjutan dan rasa ingin tahu intelektual',
                    color: 'from-indigo-500 to-indigo-600',
                },
            ],
        },
        strategic: {
            title: 'Tujuan Strategis 2024–2028',
            items: [
                {
                    title: 'Perluas Koleksi Digital',
                    desc: 'Tingkatkan e-resources sebesar 50% dan perbaiki aksesibilitas digital',
                },
                {
                    title: 'Tingkatkan Pengalaman Pengguna',
                    desc: 'Implementasikan pencarian bertenaga AI dan rekomendasi yang dipersonalisasi',
                },
                {
                    title: 'Perkuat Kemitraan',
                    desc: 'Bangun kolaborasi dengan institusi akademis di seluruh dunia',
                },
                {
                    title: 'Kembangkan Program Pembelajaran',
                    desc: 'Buat lokakarya dan pelatihan untuk penelitian dan literasi digital',
                },
                {
                    title: 'Modernisasi Infrastruktur',
                    desc: 'Tingkatkan fasilitas dan terapkan praktik berkelanjutan',
                },
                {
                    title: 'Dorong Inovasi',
                    desc: 'Dukung inisiatif penelitian dan beasiswa kreatif',
                },
            ],
        },
    },
    en: {
        hero: {
            title: 'Vision & Mission',
            subtitle: 'Our commitment to academic excellence and lifelong learning',
        },
        guiding: {
            heading: 'Guiding Our Future',
        },
        vision: {
            title: 'Our Vision',
            description:
                'To be a leading academic library that empowers individuals through access to knowledge, fostering innovation, critical thinking, and lifelong learning in the digital age.',
            futureTitle: 'We envision a future where:',
            futureItems: [
                'Knowledge is accessible to everyone, everywhere',
                'Learning becomes a lifelong journey',
                'Technology and tradition work in harmony',
                'Communities thrive through shared knowledge',
            ],
        },
        mission: {
            title: 'Our Mission',
            description:
                'We are committed to providing exceptional library services that support academic success and personal growth. Our mission encompasses:',
            items: [
                {
                    title: 'Resource Excellence',
                    desc: 'Provide comprehensive access to diverse information resources',
                },
                {
                    title: 'Academic Support',
                    desc: 'Support academic excellence through innovative library services',
                },
                {
                    title: 'Information Literacy',
                    desc: 'Foster information literacy and research skills development',
                },
                {
                    title: 'Inclusive Environment',
                    desc: 'Create an inclusive learning environment for all users',
                },
                {
                    title: 'Technology Integration',
                    desc: 'Leverage technology to enhance library accessibility and user experience',
                },
            ],
        },
        coreValues: {
            title: 'Our Core Values',
            items: [
                {
                    icon: '🎯',
                    title: 'Excellence',
                    description: 'We strive for the highest standards in everything we do',
                    color: 'from-blue-500 to-blue-600',
                },
                {
                    icon: '🤝',
                    title: 'Collaboration',
                    description: 'We work together to achieve common goals and support our community',
                    color: 'from-green-500 to-green-600',
                },
                {
                    icon: '💡',
                    title: 'Innovation',
                    description: 'We embrace new ideas and technologies to improve our services',
                    color: 'from-purple-500 to-purple-600',
                },
                {
                    icon: '🌟',
                    title: 'Integrity',
                    description: 'We act with honesty, transparency, and ethical responsibility',
                    color: 'from-amber-500 to-amber-600',
                },
                {
                    icon: '🌍',
                    title: 'Inclusivity',
                    description: 'We welcome and respect all members of our diverse community',
                    color: 'from-red-500 to-red-600',
                },
                {
                    icon: '📖',
                    title: 'Learning',
                    description: 'We promote continuous learning and intellectual curiosity',
                    color: 'from-indigo-500 to-indigo-600',
                },
            ],
        },
        strategic: {
            title: 'Strategic Goals 2024–2028',
            items: [
                {
                    title: 'Expand Digital Collections',
                    desc: 'Increase e-resources by 50% and improve digital accessibility',
                },
                {
                    title: 'Enhance User Experience',
                    desc: 'Implement AI-powered search and personalized recommendations',
                },
                {
                    title: 'Strengthen Partnerships',
                    desc: 'Build collaborations with academic institutions worldwide',
                },
                {
                    title: 'Develop Learning Programs',
                    desc: 'Create workshops and training for research and digital literacy',
                },
                {
                    title: 'Modernize Infrastructure',
                    desc: 'Upgrade facilities and implement sustainable practices',
                },
                {
                    title: 'Foster Innovation',
                    desc: 'Support research initiatives and creative scholarship',
                },
            ],
        },
    },
};

const badgeColors = ['bg-brand', 'bg-secondary', 'bg-accent'];

function VisionMissionPage() {
    const { language } = useLanguage();
    const t = content[language as 'id' | 'en'] ?? content.en;

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-gradient-to-r from-brand to-blue-500 py-20 text-white"
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-center"
                    >
                        <h1 className="mb-4 font-['Poppins'] text-4xl font-bold sm:text-5xl lg:text-6xl">
                            {t.hero.title}
                        </h1>
                        <p className="mx-auto max-w-3xl text-xl text-blue-100">
                            {t.hero.subtitle}
                        </p>
                    </motion.div>
                </div>
            </motion.section>

            {/* Vision & Mission Content */}
            <section className="py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-12"
                    >
                        <div className="mb-4 flex items-center gap-3">
                            <div className="rounded-xl bg-secondary/10 p-3">
                                <Target className="h-8 w-8 text-secondary" />
                            </div>
                            <h2 className="font-['Poppins'] text-3xl font-bold text-foreground sm:text-4xl">
                                {t.guiding.heading}
                            </h2>
                        </div>
                        <div className="mb-8 h-1 w-24 rounded-full bg-gradient-to-r from-secondary to-accent" />
                    </motion.div>

                    {/* Vision + Mission Cards */}
                    <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
                        {/* Vision */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <Card className="h-full border-t-4 border-brand p-8">
                                <div className="mb-6 flex items-center gap-3">
                                    <div className="rounded-full bg-brand/10 p-3">
                                        <Target className="h-6 w-6 text-brand" />
                                    </div>
                                    <h3 className="font-['Poppins'] text-2xl font-bold text-foreground">
                                        {t.vision.title}
                                    </h3>
                                </div>
                                <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
                                    {t.vision.description}
                                </p>
                                <div className="rounded-lg bg-brand/5 p-6">
                                    <h4 className="mb-3 font-semibold text-foreground">
                                        {t.vision.futureTitle}
                                    </h4>
                                    <ul className="space-y-2 text-muted-foreground">
                                        {t.vision.futureItems.map((item, i) => (
                                            <li key={i} className="flex items-start gap-2">
                                                <span className="mt-1 text-brand">•</span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </Card>
                        </motion.div>

                        {/* Mission */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            <Card className="h-full border-t-4 border-secondary p-8">
                                <div className="mb-6 flex items-center gap-3">
                                    <div className="rounded-full bg-secondary/10 p-3">
                                        <Target className="h-6 w-6 text-secondary" />
                                    </div>
                                    <h3 className="font-['Poppins'] text-2xl font-bold text-foreground">
                                        {t.mission.title}
                                    </h3>
                                </div>
                                <p className="mb-6 leading-relaxed text-muted-foreground">
                                    {t.mission.description}
                                </p>
                                <ul className="space-y-4">
                                    {t.mission.items.map((item, i) => (
                                        <li
                                            key={i}
                                            className="flex items-start gap-3 rounded-lg bg-secondary/5 p-4"
                                        >
                                            <span className="mt-1 text-xl font-bold text-secondary">
                                                {i + 1}
                                            </span>
                                            <div>
                                                <strong className="text-foreground">{item.title}</strong>
                                                <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </Card>
                        </motion.div>
                    </div>

                    {/* Core Values */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="mb-12"
                    >
                        <h3 className="mb-6 text-center font-['Poppins'] text-2xl font-bold text-foreground">
                            {t.coreValues.title}
                        </h3>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {t.coreValues.items.map((value, index) => (
                                <motion.div
                                    key={value.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 * index }}
                                >
                                    <Card className="h-full p-6 transition-shadow hover:shadow-xl">
                                        <div
                                            className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r ${value.color} text-3xl`}
                                        >
                                            {value.icon}
                                        </div>
                                        <h4 className="mb-2 text-center font-['Poppins'] font-bold text-foreground">
                                            {value.title}
                                        </h4>
                                        <p className="text-center text-sm text-muted-foreground">
                                            {value.description}
                                        </p>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Strategic Goals */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                    >
                        <Card className="bg-gradient-to-br from-brand/5 to-secondary/5 p-8">
                            <h3 className="mb-6 text-center font-['Poppins'] text-2xl font-bold text-foreground">
                                {t.strategic.title}
                            </h3>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                {t.strategic.items.map((goal, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <div
                                            className={`${badgeColors[i % badgeColors.length]} flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full font-bold text-white`}
                                        >
                                            {i + 1}
                                        </div>
                                        <div>
                                            <h4 className="mb-1 font-semibold text-foreground">
                                                {goal.title}
                                            </h4>
                                            <p className="text-sm text-muted-foreground">{goal.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}

export default VisionMissionPage;
