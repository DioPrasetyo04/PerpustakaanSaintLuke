import { motion } from 'framer-motion';
import { Users2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/hooks/useLanguage';

const content = {
    id: {
        heroTitle: 'Struktur Organisasi',
        heroSubtitle: 'Mengenal tim berdedikasi di balik Perpustakaan Santo Lukas',
        leadershipTitle: 'Tim Pimpinan',
        directorBadge: 'Direktur Perpustakaan',
        directorTitle: 'Kepala Perpustakaan',
        directorBio:
            'Dr. Thompson membawa pengalaman lebih dari 20 tahun dalam manajemen perpustakaan dan ilmu informasi. Beliau memegang gelar Ph.D. dalam Ilmu Perpustakaan dan Informasi dari Universitas Stanford.',
        departmentHeadsTitle: 'Kepala Departemen',
        orgChartTitle: 'Bagan Organisasi',
        orgChartNote:
            'Setiap departemen dijalankan oleh tim pustakawan, spesialis, dan staf pendukung yang bekerja sama untuk memberikan layanan terbaik bagi komunitas kami.',
        teamTitle: 'Tim Kami',
        stats: [
            { number: '45', label: 'Total Staf' },
            { number: '18', label: 'Pustakawan Profesional' },
            { number: '12', label: 'Spesialis IT' },
            { number: '15', label: 'Staf Pendukung' },
        ],
        departments: [
            {
                name: 'Dr. Michael Chen',
                position: 'Kepala Koleksi',
                department: 'Manajemen Koleksi',
                bio: 'Mengawasi pengadaan, pengkatalogan, dan pelestarian bahan perpustakaan',
            },
            {
                name: 'Sarah Johnson',
                position: 'Kepala Layanan Digital',
                department: 'Sumber Daya Digital',
                bio: 'Mengelola e-resources, platform digital, dan layanan online',
            },
            {
                name: 'Robert Williams',
                position: 'Kepala Layanan Pengguna',
                department: 'Layanan Pembaca',
                bio: 'Memastikan pengalaman pengguna dan layanan pelanggan yang luar biasa',
            },
            {
                name: 'Dr. Lisa Anderson',
                position: 'Kepala Layanan Teknis',
                department: 'Katalogisasi & Pemrosesan',
                bio: 'Mengelola standar metadata dan alur kerja pemrosesan teknis',
            },
            {
                name: 'David Martinez',
                position: 'Kepala Sistem IT',
                department: 'Teknologi Perpustakaan',
                bio: 'Mengawasi infrastruktur IT dan integrasi teknologi',
            },
            {
                name: 'Emily Roberts',
                position: 'Kepala Arsip',
                department: 'Koleksi Khusus',
                bio: 'Mengkurasi dan melestarikan buku langka serta dokumen bersejarah',
            },
        ],
    },
    en: {
        heroTitle: 'Organization Structure',
        heroSubtitle: 'Meet the dedicated team behind Saint Luke Library',
        leadershipTitle: 'Leadership Team',
        directorBadge: 'Library Director',
        directorTitle: 'Chief Library Officer',
        directorBio:
            'Dr. Thompson brings over 20 years of experience in library management and information science. She holds a Ph.D. in Library and Information Science from Stanford University.',
        departmentHeadsTitle: 'Department Heads',
        orgChartTitle: 'Organizational Chart',
        orgChartNote:
            'Each department operates with dedicated teams of librarians, specialists, and support staff working together to provide excellent service to our community.',
        teamTitle: 'Our Team',
        stats: [
            { number: '45', label: 'Total Staff' },
            { number: '18', label: 'Professional Librarians' },
            { number: '12', label: 'IT Specialists' },
            { number: '15', label: 'Support Staff' },
        ],
        departments: [
            {
                name: 'Dr. Michael Chen',
                position: 'Head of Collections',
                department: 'Collection Management',
                bio: 'Oversees acquisition, cataloging, and preservation of library materials',
            },
            {
                name: 'Sarah Johnson',
                position: 'Head of Digital Services',
                department: 'Digital Resources',
                bio: 'Manages e-resources, digital platforms, and online services',
            },
            {
                name: 'Robert Williams',
                position: 'Head of User Services',
                department: 'Reader Services',
                bio: 'Ensures exceptional user experience and customer service',
            },
            {
                name: 'Dr. Lisa Anderson',
                position: 'Head of Technical Services',
                department: 'Cataloging & Processing',
                bio: 'Manages metadata standards and technical processing workflows',
            },
            {
                name: 'David Martinez',
                position: 'Head of IT Systems',
                department: 'Library Technology',
                bio: 'Oversees IT infrastructure and technology integration',
            },
            {
                name: 'Emily Roberts',
                position: 'Head of Archives',
                department: 'Special Collections',
                bio: 'Curates and preserves rare books and historical documents',
            },
        ],
    },
};

const departmentColors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-purple-500',
    'bg-amber-500',
    'bg-red-500',
    'bg-indigo-500',
];

const departmentImages = [
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200',
    'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200',
];

const chartLabels = {
    id: {
        director: 'Direktur Perpustakaan',
        collections: 'Koleksi',
        digital: 'Layanan Digital',
        user: 'Layanan Pengguna',
        technical: 'Layanan Teknis',
        it: 'Sistem IT',
        archives: 'Arsip',
    },
    en: {
        director: 'Library Director',
        collections: 'Collections',
        digital: 'Digital Services',
        user: 'User Services',
        technical: 'Technical Services',
        it: 'IT Systems',
        archives: 'Archives',
    },
};

function OrganizationStructurePage() {
    const { language } = useLanguage();
    const t = content[language as 'id' | 'en'] ?? content.en;
    const chart = chartLabels[language as 'id' | 'en'] ?? chartLabels.en;

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
                            {t.heroTitle}
                        </h1>
                        <p className="mx-auto max-w-3xl text-xl text-amber-100">
                            {t.heroSubtitle}
                        </p>
                    </motion.div>
                </div>
            </motion.section>

            {/* Organization Content */}
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
                                <Users2 className="h-8 w-8 text-brand" />
                            </div>
                            <h2 className="font-['Poppins'] text-3xl font-bold text-foreground sm:text-4xl">
                                {t.leadershipTitle}
                            </h2>
                        </div>
                        <div className="mb-8 h-1 w-24 rounded-full bg-gradient-to-r from-brand to-blue-500" />
                    </motion.div>

                    {/* Library Director */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="mb-12"
                    >
                        <Card className="mx-auto max-w-3xl bg-gradient-to-r from-blue-700 to-blue-900 p-8 text-white">
                            <div className="text-center">
                                <div className="mx-auto mb-6 flex h-32 w-32 items-center justify-center overflow-hidden rounded-full bg-white/20 backdrop-blur-sm">
                                    <img
                                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200"
                                        alt="Dr. Elizabeth Thompson"
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <Badge className="mb-3 bg-white/20 text-sm text-white">
                                    {t.directorBadge}
                                </Badge>
                                <h3 className="mb-2 font-['Poppins'] text-3xl font-bold">
                                    Dr. Elizabeth Thompson
                                </h3>
                                <p className="mb-4 text-lg text-blue-100">
                                    {t.directorTitle}
                                </p>
                                <p className="mx-auto max-w-2xl text-blue-50">
                                    {t.directorBio}
                                </p>
                            </div>
                        </Card>
                    </motion.div>

                    {/* Department Heads */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-8"
                    >
                        <h3 className="mb-6 text-center font-['Poppins'] text-2xl font-bold text-foreground">
                            {t.departmentHeadsTitle}
                        </h3>
                    </motion.div>

                    <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {t.departments.map((staff, index) => (
                            <motion.div
                                key={staff.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 * index }}
                            >
                                <Card className="h-full p-6 transition-shadow hover:shadow-xl">
                                    <div className="mb-4 text-center">
                                        <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full">
                                            <img
                                                src={departmentImages[index]}
                                                alt={staff.name}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                        <Badge variant="outline" className="mb-2">
                                            {staff.department}
                                        </Badge>
                                        <h3 className="mb-1 font-['Poppins'] text-lg font-bold text-foreground">
                                            {staff.name}
                                        </h3>
                                        <p className="mb-3 text-sm font-medium text-brand">
                                            {staff.position}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {staff.bio}
                                        </p>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    {/* Organizational Chart */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                    >
                        <h3 className="mb-6 text-center font-['Poppins'] text-2xl font-bold text-foreground">
                            {t.orgChartTitle}
                        </h3>
                        <Card className="bg-gradient-to-br from-muted/50 to-blue-50/30 p-8 dark:from-muted/20 dark:to-blue-950/20">
                            <div className="space-y-6">
                                {/* Level 1 - Director */}
                                <div className="flex justify-center">
                                    <div className="rounded-lg bg-gradient-to-r from-blue-700 to-blue-900 px-6 py-4 text-center text-white shadow-lg">
                                        <div className="font-bold">{chart.director}</div>
                                        <div className="text-sm text-blue-100">
                                            Dr. Elizabeth Thompson
                                        </div>
                                    </div>
                                </div>

                                {/* Connector */}
                                <div className="flex justify-center">
                                    <div className="h-8 w-0.5 bg-border" />
                                </div>

                                {/* Level 2 - Departments */}
                                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                                    {[
                                        { color: departmentColors[0], label: chart.collections, short: 'Dr. M. Chen' },
                                        { color: departmentColors[1], label: chart.digital, short: 'S. Johnson' },
                                        { color: departmentColors[2], label: chart.user, short: 'R. Williams' },
                                        { color: departmentColors[3], label: chart.technical, short: 'Dr. L. Anderson' },
                                        { color: departmentColors[4], label: chart.it, short: 'D. Martinez' },
                                        { color: departmentColors[5], label: chart.archives, short: 'E. Roberts' },
                                    ].map((dept) => (
                                        <div
                                            key={dept.label}
                                            className={`${dept.color} rounded-lg px-4 py-3 text-center text-white shadow`}
                                        >
                                            <div className="text-sm font-semibold">{dept.label}</div>
                                            <div className="text-xs opacity-90">{dept.short}</div>
                                        </div>
                                    ))}
                                </div>

                                {/* Legend */}
                                <div className="mt-8 border-t border-border pt-6">
                                    <p className="text-center text-sm text-muted-foreground">
                                        {t.orgChartNote}
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </motion.div>

                    {/* Staff Statistics */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 }}
                        className="mt-12"
                    >
                        <h3 className="mb-6 text-center font-['Poppins'] text-2xl font-bold text-foreground">
                            {t.teamTitle}
                        </h3>
                        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                            {t.stats.map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 * index }}
                                >
                                    <Card className="p-6 text-center transition-shadow hover:shadow-lg">
                                        <div className="mb-2 text-4xl font-bold text-brand">
                                            {stat.number}
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            {stat.label}
                                        </div>
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

export default OrganizationStructurePage;
