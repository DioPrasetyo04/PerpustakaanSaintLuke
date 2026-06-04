import { motion } from 'framer-motion';
import { Building2, Users2, BookOpen, Laptop, Search, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/hooks/useLanguage';

const content = {
    id: {
        hero: {
            title: 'Profil Perpustakaan',
            subtitle: 'Pelajari sejarah, misi, dan komitmen kami terhadap keunggulan',
        },
        about: {
            heading: 'Tentang Perpustakaan Santo Lukas',
            whoTitle: 'Siapa Kami',
            paragraphs: [
                'Perpustakaan Santo Lukas adalah perpustakaan akademis modern yang didirikan untuk melayani kebutuhan pendidikan dan penelitian mahasiswa, dosen, serta peneliti. Perpustakaan kami dilengkapi dengan fasilitas mutakhir dan koleksi sumber daya yang komprehensif di berbagai disiplin ilmu.',
                'Didirikan dengan komitmen terhadap keunggulan pendidikan, kami menyediakan akses ke ribuan buku, jurnal, sumber daya digital, dan materi multimedia. Misi kami adalah menumbuhkan kecintaan belajar dan mendukung pencapaian akademis melalui layanan perpustakaan yang inovatif.',
                'Kami percaya bahwa pengetahuan adalah kunci pertumbuhan pribadi dan profesional. Melalui platform e-library modern kami, akses informasi kapan saja dan di mana saja menjadi lebih mudah dari sebelumnya.',
            ],
            factsTitle: 'Fakta Penting',
            facts: [
                { label: 'Didirikan', value: '2015' },
                { label: 'Anggota Terdaftar', value: '15.000+' },
                { label: 'Koleksi Buku', value: '50.000+ judul' },
                { label: 'Sumber Digital', value: '10.000+ e-book & jurnal' },
            ],
        },
        journey: {
            title: 'Perjalanan Kami',
            milestones: [
                {
                    year: '2015',
                    title: 'Pendirian',
                    desc: 'Perpustakaan Santo Lukas didirikan dengan koleksi awal 10.000 buku dan visi menjadi pusat sumber daya akademis terkemuka.',
                },
                {
                    year: '2018',
                    title: 'Transformasi Digital',
                    desc: 'Meluncurkan platform e-library pertama kami, menyediakan akses 24/7 ke sumber daya digital dan memperkenalkan sistem katalog online.',
                },
                {
                    year: '2021',
                    title: 'Ekspansi',
                    desc: 'Memperluas ruang fisik sebesar 50% dan menambah koleksi hingga lebih dari 30.000 judul. Memperkenalkan ruang penelitian khusus dan area belajar kolaboratif.',
                },
                {
                    year: '2024',
                    title: 'Era Modern',
                    desc: 'Mencapai tonggak 50.000+ buku dan 15.000+ anggota terdaftar. Meluncurkan layanan digital komprehensif termasuk pencarian dan sistem rekomendasi berbasis AI.',
                },
            ],
        },
        services: {
            title: 'Layanan Kami',
            items: [
                { icon: '📚', title: 'Peminjaman Buku', desc: 'Pinjam buku fisik dengan periode pinjaman yang fleksibel' },
                { icon: '💻', title: 'Perpustakaan Digital', desc: 'Akses e-book dan jurnal kapan saja, di mana saja' },
                { icon: '🔍', title: 'Dukungan Penelitian', desc: 'Bantuan ahli untuk proyek penelitian Anda' },
                { icon: '👥', title: 'Ruang Belajar', desc: 'Area tenang dan kolaboratif untuk belajar' },
            ],
        },
    },
    en: {
        hero: {
            title: 'Library Profile',
            subtitle: 'Learn about our history, mission, and commitment to excellence',
        },
        about: {
            heading: 'About Saint Luke Library',
            whoTitle: 'Who We Are',
            paragraphs: [
                'Saint Luke Library is a modern academic library established to serve the educational and research needs of students, faculty, and researchers. Our library is equipped with state-of-the-art facilities and a comprehensive collection of resources spanning various disciplines.',
                'Founded with a commitment to excellence in education, we provide access to thousands of books, journals, digital resources, and multimedia materials. Our mission is to foster a love for learning and support academic achievement through innovative library services.',
                'We believe that knowledge is the key to personal and professional growth. Through our modern e-library platform, we make it easier than ever to access information anytime, anywhere.',
            ],
            factsTitle: 'Key Facts',
            facts: [
                { label: 'Established', value: '2015' },
                { label: 'Registered Members', value: '15,000+' },
                { label: 'Book Collection', value: '50,000+ titles' },
                { label: 'Digital Resources', value: '10,000+ e-books & journals' },
            ],
        },
        journey: {
            title: 'Our Journey',
            milestones: [
                {
                    year: '2015',
                    title: 'Foundation',
                    desc: "Saint Luke Library was established with an initial collection of 10,000 books and a vision to become a leading academic resource center.",
                },
                {
                    year: '2018',
                    title: 'Digital Transformation',
                    desc: "Launched our first e-library platform, providing 24/7 access to digital resources and introducing online catalog system.",
                },
                {
                    year: '2021',
                    title: 'Expansion',
                    desc: "Expanded our physical space by 50% and grew our collection to over 30,000 titles. Introduced specialized research rooms and collaborative study spaces.",
                },
                {
                    year: '2024',
                    title: 'Modern Era',
                    desc: "Achieved milestone of 50,000+ books and 15,000+ registered members. Launched comprehensive digital services including AI-powered search and recommendation system.",
                },
            ],
        },
        services: {
            title: 'Our Services',
            items: [
                { icon: '📚', title: 'Book Lending', desc: 'Borrow physical books with flexible loan periods' },
                { icon: '💻', title: 'Digital Library', desc: 'Access e-books and journals anytime, anywhere' },
                { icon: '🔍', title: 'Research Support', desc: 'Expert assistance for your research projects' },
                { icon: '👥', title: 'Study Spaces', desc: 'Quiet and collaborative areas for learning' },
            ],
        },
    },
};

const factIcons = [Building2, Users2, BookOpen, Laptop];
const factColors = ['bg-brand', 'bg-secondary', 'bg-accent', 'bg-brand'];

function ProfilePage() {
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

            {/* Profile Content */}
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
                            <div className="rounded-xl bg-brand/10 p-3">
                                <Building2 className="h-8 w-8 text-brand" />
                            </div>
                            <h2 className="font-['Poppins'] text-3xl font-bold text-foreground sm:text-4xl">
                                {t.about.heading}
                            </h2>
                        </div>
                        <div className="mb-8 h-1 w-24 rounded-full bg-gradient-to-r from-brand to-blue-400" />
                    </motion.div>

                    {/* Who We Are + Key Facts */}
                    <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <Card className="h-full p-8">
                                <h3 className="mb-4 font-['Poppins'] text-2xl font-bold text-foreground">
                                    {t.about.whoTitle}
                                </h3>
                                <div className="space-y-4 leading-relaxed text-muted-foreground">
                                    {t.about.paragraphs.map((p, i) => (
                                        <p key={i}>{p}</p>
                                    ))}
                                </div>
                            </Card>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            <Card className="h-full bg-gradient-to-br from-brand/5 to-blue-500/5 p-8">
                                <h3 className="mb-6 font-['Poppins'] text-2xl font-bold text-foreground">
                                    {t.about.factsTitle}
                                </h3>
                                <div className="space-y-4">
                                    {t.about.facts.map((fact, i) => {
                                        const Icon = factIcons[i];
                                        return (
                                            <div key={i} className="flex items-center gap-4">
                                                <div className={`${factColors[i]} rounded-lg p-3 text-white`}>
                                                    <Icon className="h-6 w-6" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-foreground">{fact.label}</p>
                                                    <p className="text-muted-foreground">{fact.value}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </Card>
                        </motion.div>
                    </div>

                    {/* Timeline */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                    >
                        <Card className="p-8">
                            <h3 className="mb-8 text-center font-['Poppins'] text-2xl font-bold text-foreground">
                                {t.journey.title}
                            </h3>
                            <div className="space-y-8">
                                {t.journey.milestones.map((m, i) => {
                                    const colors = ['bg-brand', 'bg-secondary', 'bg-accent', 'bg-brand'];
                                    return (
                                        <motion.div
                                            key={m.year}
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.1 * i }}
                                            className="flex gap-6"
                                        >
                                            <div className="flex-shrink-0">
                                                <div
                                                    className={`${colors[i]} flex h-16 w-16 items-center justify-center rounded-full text-lg font-bold text-white`}
                                                >
                                                    {m.year}
                                                </div>
                                            </div>
                                            <div className="flex-1 pt-2">
                                                <h4 className="mb-2 font-semibold text-foreground">{m.title}</h4>
                                                <p className="text-muted-foreground">{m.desc}</p>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </Card>
                    </motion.div>

                    {/* Services */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        className="mt-12"
                    >
                        <h3 className="mb-6 text-center font-['Poppins'] text-2xl font-bold text-foreground">
                            {t.services.title}
                        </h3>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                            {t.services.items.map((service, i) => (
                                <motion.div
                                    key={service.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 * i }}
                                >
                                    <Card className="h-full p-6 text-center transition-shadow hover:shadow-lg">
                                        <div className="mb-4 text-5xl">{service.icon}</div>
                                        <h4 className="mb-2 font-semibold text-foreground">{service.title}</h4>
                                        <p className="text-sm text-muted-foreground">{service.desc}</p>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}

export default ProfilePage;
