import { motion } from 'framer-motion';
import {
    Mail,
    Phone,
    MapPin,
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    Clock,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/useLanguage';

const content = {
    id: {
        hero: {
            title: 'Hubungi Kami',
            subtitle: 'Kami siap membantu Anda. Hubungi kami kapan saja.',
        },
        getInTouch: 'Hubungi Kami',
        contactInfo: {
            title: 'Informasi Kontak',
            address: {
                label: 'Alamat',
                lines: [
                    'Perpustakaan Santo Lukas',
                    'Jl. Universitas No. 123',
                    'Distrik Akademik',
                    'Kota, Provinsi 12345',
                    'Indonesia',
                ],
            },
            phone: {
                label: 'Telepon',
                lines: [
                    'Utama: +62 (21) 123-4567',
                    'Meja Referensi: +62 (21) 123-4568',
                    'Faks: +62 (21) 123-4569',
                ],
            },
            email: {
                label: 'Email',
                lines: [
                    'Umum: info@saintlukeperpustakaan.id',
                    'Dukungan: support@saintlukeperpustakaan.id',
                    'Referensi: referensi@saintlukeperpustakaan.id',
                ],
            },
            followUs: 'Ikuti Kami',
        },
        hours: {
            title: 'Jam Operasional',
            days: [
                { day: 'Senin – Jumat', sub: 'Hari Kerja', time: '08.00 – 20.00', style: 'blue' },
                { day: 'Sabtu', sub: 'Akhir Pekan', time: '09.00 – 17.00', style: 'green' },
                { day: 'Minggu', sub: 'Akhir Pekan', time: '10.00 – 16.00', style: 'purple' },
                { day: 'Hari Libur Nasional', sub: 'Hari Khusus', time: 'Tutup', style: 'red' },
            ],
            help: {
                title: 'Butuh Bantuan?',
                desc: 'Meja referensi kami tersedia selama jam operasional untuk membantu penelitian, menemukan sumber daya, dan menjawab pertanyaan Anda.',
                btn: 'Kirim Pesan',
            },
        },
        departments: {
            title: 'Kontak Departemen',
            items: [
                { department: 'Manajemen Koleksi', contact: 'Dr. Michael Chen', email: 'koleksi@saintlukas.id', phone: '+62 (21) 123-4570', color: 'from-blue-500 to-blue-600' },
                { department: 'Layanan Digital', contact: 'Sarah Johnson', email: 'digital@saintlukas.id', phone: '+62 (21) 123-4571', color: 'from-green-500 to-green-600' },
                { department: 'Layanan Pengguna', contact: 'Robert Williams', email: 'layanan@saintlukas.id', phone: '+62 (21) 123-4572', color: 'from-purple-500 to-purple-600' },
                { department: 'Layanan Teknis', contact: 'Dr. Lisa Anderson', email: 'teknis@saintlukas.id', phone: '+62 (21) 123-4573', color: 'from-amber-500 to-amber-600' },
                { department: 'Sistem IT', contact: 'David Martinez', email: 'it@saintlukas.id', phone: '+62 (21) 123-4574', color: 'from-red-500 to-red-600' },
                { department: 'Arsip', contact: 'Emily Roberts', email: 'arsip@saintlukas.id', phone: '+62 (21) 123-4575', color: 'from-indigo-500 to-indigo-600' },
            ],
        },
        map: {
            title: 'Temukan Kami',
            label: 'Peta Interaktif',
            address: 'Jl. Universitas No. 123, Distrik Akademik',
            btn: 'Buka di Google Maps',
        },
    },
    en: {
        hero: {
            title: 'Contact Us',
            subtitle: "We're here to help. Get in touch with us anytime.",
        },
        getInTouch: 'Get in Touch',
        contactInfo: {
            title: 'Contact Information',
            address: {
                label: 'Address',
                lines: [
                    'Saint Luke Library',
                    '123 University Avenue',
                    'Academic District',
                    'City, State 12345',
                    'United States',
                ],
            },
            phone: {
                label: 'Phone',
                lines: [
                    'Main: +1 (555) 123-4567',
                    'Reference Desk: +1 (555) 123-4568',
                    'Fax: +1 (555) 123-4569',
                ],
            },
            email: {
                label: 'Email',
                lines: [
                    'General: info@saintlukelibrary.edu',
                    'Support: support@saintlukelibrary.edu',
                    'Reference: reference@saintlukelibrary.edu',
                ],
            },
            followUs: 'Follow Us',
        },
        hours: {
            title: 'Opening Hours',
            days: [
                { day: 'Monday – Friday', sub: 'Weekdays', time: '8:00 AM – 8:00 PM', style: 'blue' },
                { day: 'Saturday', sub: 'Weekend', time: '9:00 AM – 5:00 PM', style: 'green' },
                { day: 'Sunday', sub: 'Weekend', time: '10:00 AM – 4:00 PM', style: 'purple' },
                { day: 'Public Holidays', sub: 'Special Days', time: 'Closed', style: 'red' },
            ],
            help: {
                title: 'Need Help?',
                desc: 'Our reference desk is available during all opening hours to assist you with research, finding resources, and answering your questions.',
                btn: 'Send Us a Message',
            },
        },
        departments: {
            title: 'Department Contacts',
            items: [
                { department: 'Collection Management', contact: 'Dr. Michael Chen', email: 'collections@saintlukelibrary.edu', phone: '+1 (555) 123-4570', color: 'from-blue-500 to-blue-600' },
                { department: 'Digital Services', contact: 'Sarah Johnson', email: 'digital@saintlukelibrary.edu', phone: '+1 (555) 123-4571', color: 'from-green-500 to-green-600' },
                { department: 'User Services', contact: 'Robert Williams', email: 'userservices@saintlukelibrary.edu', phone: '+1 (555) 123-4572', color: 'from-purple-500 to-purple-600' },
                { department: 'Technical Services', contact: 'Dr. Lisa Anderson', email: 'technical@saintlukelibrary.edu', phone: '+1 (555) 123-4573', color: 'from-amber-500 to-amber-600' },
                { department: 'IT Systems', contact: 'David Martinez', email: 'itsupport@saintlukelibrary.edu', phone: '+1 (555) 123-4574', color: 'from-red-500 to-red-600' },
                { department: 'Archives', contact: 'Emily Roberts', email: 'archives@saintlukelibrary.edu', phone: '+1 (555) 123-4575', color: 'from-indigo-500 to-indigo-600' },
            ],
        },
        map: {
            title: 'Find Us',
            label: 'Interactive Map',
            address: '123 University Avenue, Academic District',
            btn: 'Open in Google Maps',
        },
    },
};

const hourStyles: Record<string, { wrapper: string; timeClass: string }> = {
    blue:   { wrapper: 'bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/40 dark:to-blue-900/40 border border-blue-200 dark:border-blue-800',   timeClass: 'text-brand font-bold' },
    green:  { wrapper: 'bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950/40 dark:to-green-900/40 border border-green-200 dark:border-green-800',  timeClass: 'text-green-700 dark:text-green-400 font-bold' },
    purple: { wrapper: 'bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-950/40 dark:to-purple-900/40 border border-purple-200 dark:border-purple-800', timeClass: 'text-purple-700 dark:text-purple-400 font-bold' },
    red:    { wrapper: 'bg-gradient-to-r from-red-50 to-red-100 dark:from-red-950/40 dark:to-red-900/40 border-2 border-red-300 dark:border-red-700',           timeClass: 'text-red-700 dark:text-red-400 font-bold' },
};

function ContactPage() {
    const { language } = useLanguage();
    const t = content[language as 'id' | 'en'] ?? content.en;

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-gradient-to-r from-brand via-blue-500 to-secondary py-20 text-white"
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

            {/* Contact Content */}
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
                                <Mail className="h-8 w-8 text-brand" />
                            </div>
                            <h2 className="font-['Poppins'] text-3xl font-bold text-foreground sm:text-4xl">
                                {t.getInTouch}
                            </h2>
                        </div>
                        <div className="mb-8 h-1 w-24 rounded-full bg-gradient-to-r from-brand to-secondary" />
                    </motion.div>

                    {/* Contact Info + Opening Hours */}
                    <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
                        {/* Contact Information */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <Card className="h-full p-8">
                                <h3 className="mb-6 font-['Poppins'] text-2xl font-bold text-foreground">
                                    {t.contactInfo.title}
                                </h3>
                                <div className="space-y-6">
                                    {/* Address */}
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 rounded-lg bg-brand/10 p-3">
                                            <MapPin className="h-6 w-6 text-brand" />
                                        </div>
                                        <div>
                                            <p className="mb-1 font-semibold text-foreground">
                                                {t.contactInfo.address.label}
                                            </p>
                                            <p className="text-muted-foreground">
                                                {t.contactInfo.address.lines.map((line, i) => (
                                                    <span key={i}>
                                                        {line}
                                                        {i < t.contactInfo.address.lines.length - 1 && <br />}
                                                    </span>
                                                ))}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 rounded-lg bg-secondary/10 p-3">
                                            <Phone className="h-6 w-6 text-secondary" />
                                        </div>
                                        <div>
                                            <p className="mb-1 font-semibold text-foreground">
                                                {t.contactInfo.phone.label}
                                            </p>
                                            <p className="text-muted-foreground">
                                                {t.contactInfo.phone.lines.map((line, i) => (
                                                    <span key={i}>
                                                        {line}
                                                        {i < t.contactInfo.phone.lines.length - 1 && <br />}
                                                    </span>
                                                ))}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 rounded-lg bg-accent/10 p-3">
                                            <Mail className="h-6 w-6 text-accent" />
                                        </div>
                                        <div>
                                            <p className="mb-1 font-semibold text-foreground">
                                                {t.contactInfo.email.label}
                                            </p>
                                            <p className="text-muted-foreground">
                                                {t.contactInfo.email.lines.map((line, i) => (
                                                    <span key={i}>
                                                        {line}
                                                        {i < t.contactInfo.email.lines.length - 1 && <br />}
                                                    </span>
                                                ))}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Social Links */}
                                <div className="mt-8 border-t border-border pt-8">
                                    <h4 className="mb-4 font-semibold text-foreground">
                                        {t.contactInfo.followUs}
                                    </h4>
                                    <div className="flex gap-3">
                                        <Button
                                            size="icon"
                                            variant="outline"
                                            className="transition-colors hover:border-blue-600 hover:bg-blue-600 hover:text-white"
                                        >
                                            <Facebook className="h-5 w-5" />
                                        </Button>
                                        <Button
                                            size="icon"
                                            variant="outline"
                                            className="transition-colors hover:border-sky-500 hover:bg-sky-500 hover:text-white"
                                        >
                                            <Twitter className="h-5 w-5" />
                                        </Button>
                                        <Button
                                            size="icon"
                                            variant="outline"
                                            className="transition-colors hover:border-pink-600 hover:bg-pink-600 hover:text-white"
                                        >
                                            <Instagram className="h-5 w-5" />
                                        </Button>
                                        <Button
                                            size="icon"
                                            variant="outline"
                                            className="transition-colors hover:border-blue-700 hover:bg-blue-700 hover:text-white"
                                        >
                                            <Linkedin className="h-5 w-5" />
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>

                        {/* Opening Hours */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            <Card className="h-full p-8">
                                <div className="mb-6 flex items-center gap-3">
                                    <Clock className="h-6 w-6 text-brand" />
                                    <h3 className="font-['Poppins'] text-2xl font-bold text-foreground">
                                        {t.hours.title}
                                    </h3>
                                </div>
                                <div className="space-y-4">
                                    {t.hours.days.map((row) => {
                                        const s = hourStyles[row.style];
                                        return (
                                            <div
                                                key={row.day}
                                                className={`flex items-center justify-between rounded-lg p-4 ${s.wrapper}`}
                                            >
                                                <div>
                                                    <span className="block font-semibold text-foreground">
                                                        {row.day}
                                                    </span>
                                                    <span className="text-xs text-muted-foreground">
                                                        {row.sub}
                                                    </span>
                                                </div>
                                                <span className={s.timeClass}>{row.time}</span>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="mt-6 rounded-lg bg-gradient-to-r from-brand/10 to-secondary/10 p-6">
                                    <h4 className="mb-2 font-semibold text-foreground">
                                        {t.hours.help.title}
                                    </h4>
                                    <p className="mb-4 text-sm text-muted-foreground">
                                        {t.hours.help.desc}
                                    </p>
                                    <Button className="w-full bg-brand hover:bg-brand/90">
                                        <Mail className="mr-2 h-4 w-4" />
                                        {t.hours.help.btn}
                                    </Button>
                                </div>
                            </Card>
                        </motion.div>
                    </div>

                    {/* Department Contacts */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="mb-12"
                    >
                        <h3 className="mb-6 text-center font-['Poppins'] text-2xl font-bold text-foreground">
                            {t.departments.title}
                        </h3>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {t.departments.items.map((dept, index) => (
                                <motion.div
                                    key={dept.department}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 * index }}
                                >
                                    <Card className="h-full p-6 transition-shadow hover:shadow-xl">
                                        <div
                                            className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r ${dept.color} text-xl font-bold text-white`}
                                        >
                                            {dept.department.charAt(0)}
                                        </div>
                                        <h4 className="mb-2 font-['Poppins'] font-bold text-foreground">
                                            {dept.department}
                                        </h4>
                                        <p className="mb-3 text-sm text-muted-foreground">
                                            {dept.contact}
                                        </p>
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                <Mail className="h-3 w-3 text-brand" />
                                                <span className="truncate">{dept.email}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                <Phone className="h-3 w-3 text-brand" />
                                                <span>{dept.phone}</span>
                                            </div>
                                        </div>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Map Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                    >
                        <h3 className="mb-6 text-center font-['Poppins'] text-2xl font-bold text-foreground">
                            {t.map.title}
                        </h3>
                        <Card className="p-8">
                            <div className="flex aspect-video items-center justify-center rounded-lg bg-gradient-to-br from-muted to-muted/60">
                                <div className="text-center">
                                    <MapPin className="mx-auto mb-4 h-16 w-16 text-muted-foreground/50" />
                                    <p className="font-medium text-muted-foreground">
                                        {t.map.label}
                                    </p>
                                    <p className="mt-2 text-sm text-muted-foreground/70">
                                        {t.map.address}
                                    </p>
                                    <Button className="mt-4 bg-brand hover:bg-brand/90">
                                        <MapPin className="mr-2 h-4 w-4" />
                                        {t.map.btn}
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}

export default ContactPage;
