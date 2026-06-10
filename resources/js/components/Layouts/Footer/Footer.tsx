import { Link } from '@inertiajs/react';
import { Mail, Phone, Instagram, MapPin } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

export function Footer() {
    const { language } = useLanguage();

    const t = {
        newsletterTitle: {
            id: 'Dapatkan rekomendasi bacaan tiap bulan',
            en: 'Get monthly reading recommendations',
        },
        newsletterDesc: {
            id: 'Berlangganan buletin perpustakaan untuk kabar koleksi baru, acara klub baca, dan pilihan pustakawan.',
            en: 'Subscribe to the library newsletter for new collections, book club events, and librarian picks.',
        },
        emailPlaceholder: {
            id: 'Alamat surel sekolah',
            en: 'School email address',
        },
        subscribe: { id: 'Langganan', en: 'Subscribe' },
        about: {
            id: 'Tempat tenang untuk membaca, meriset, dan tumbuh. Lebih dari dua belas ribu koleksi merawat ingatan dan menumbuhkan rasa ingin tahu siswa dari SD hingga SMA.',
            en: 'A quiet place to read, research, and grow. More than twelve thousand collections nurture memory and curiosity for students from primary to high school.',
        },
        explore: { id: 'Jelajahi', en: 'Explore' },
        foundation: { id: 'Yayasan', en: 'Foundation' },
        visit: { id: 'Datang Berkunjung', en: 'Visit Us' },
        catalog: { id: 'Katalog Buku', en: 'Book Catalog' },
        authors: { id: 'Penulis', en: 'Authors' },
        publishers: { id: 'Penerbit', en: 'Publishers' },
        categories: { id: 'Kategori', en: 'Categories' },
        resources: { id: 'Sumber Daring', en: 'Online Resources' },
        profile: { id: 'Profil', en: 'Profile' },
        vision: { id: 'Visi & Misi', en: 'Vision & Mission' },
        structure: { id: 'Struktur', en: 'Structure' },
        news: { id: 'Berita', en: 'News' },
        contact: { id: 'Kontak', en: 'Contact' },
        libraryName: {
            id: 'Perpustakaan Santo Lukas',
            en: 'Saint Luke Library',
        },
        copyright: {
            id: '© 2026 Yayasan Santo Lukas · Seluruh hak cipta dilindungi.',
            en: '© 2026 Saint Luke Foundation · All rights reserved.',
        },
        tagline: {
            id: 'Dirancang untuk pembaca, oleh pembaca.',
            en: 'Designed for readers, by readers.',
        },
    };

    const l = (key: keyof typeof t) =>
        language === 'id' ? t[key].id : t[key].en;

    const address =
        'Jalan Pademangan II Gang 7 No. 54, Kelurahan Pademangan Timur, Kecamatan Pademangan, Kota Jakarta Utara, DKI Jakarta 14410';

    return (
        <footer className="mt-0 bg-ink text-paper dark:bg-night-2">
            <div className="mx-auto max-w-[100rem] px-6 pt-16 pb-24 lg:px-10 lg:pb-10">
                <div className="grid grid-cols-2 gap-8 md:grid-cols-12">
                    <div className="col-span-2 md:col-span-5">
                        <div className="flex items-center gap-3">
                            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-card p-1.5">
                                <img
                                    src="/assets/logos/Saint-Luke.png"
                                    alt="Logo Perpustakaan Santo Lukas"
                                    className="h-full w-full object-contain"
                                />
                            </div>
                            <div>
                                <div className="font-display text-2xl">
                                    {l('libraryName')}
                                </div>
                                <div className="tracking-editorial mt-1 text-[10px] uppercase text-paper/55">
                                    Yayasan Pendidikan · Jakarta Utara
                                </div>
                            </div>
                        </div>
                        <p className="mt-6 max-w-md text-sm leading-relaxed text-paper/70">
                            {l('about')}
                        </p>
                        <div className="mt-6 flex items-center gap-2">
                            <Link
                                href="/about/contact"
                                className="grid h-10 w-10 place-items-center rounded-full border border-paper/20 transition-colors hover:border-cobalt hover:bg-cobalt hover:text-white"
                                aria-label="Email"
                            >
                                <Mail className="h-4 w-4" />
                            </Link>
                            <Link
                                href="/about/contact"
                                className="grid h-10 w-10 place-items-center rounded-full border border-paper/20 transition-colors hover:border-cobalt hover:bg-cobalt hover:text-white"
                                aria-label="Phone"
                            >
                                <Phone className="h-4 w-4" />
                            </Link>
                            <Link
                                href="/about/contact"
                                className="grid h-10 w-10 place-items-center rounded-full border border-paper/20 transition-colors hover:border-cobalt hover:bg-cobalt hover:text-white"
                                aria-label="Instagram"
                            >
                                <Instagram className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>

                    <div className="col-span-1 md:col-span-2">
                        <div className="tracking-editorial mb-4 text-[10px] uppercase text-paper/45">
                            {l('explore')}
                        </div>
                        <ul className="space-y-2.5 text-sm text-paper/70">
                            <li>
                                <Link
                                    href="/catalog/books"
                                    className="transition-colors hover:text-cobalt-lt"
                                >
                                    {l('catalog')}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/catalog/categories"
                                    className="transition-colors hover:text-cobalt-lt"
                                >
                                    {l('categories')}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/catalog/authors"
                                    className="transition-colors hover:text-cobalt-lt"
                                >
                                    {l('authors')}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/catalog/publishers"
                                    className="transition-colors hover:text-cobalt-lt"
                                >
                                    {l('publishers')}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/resources"
                                    className="transition-colors hover:text-cobalt-lt"
                                >
                                    {l('resources')}
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-span-1 md:col-span-2">
                        <div className="tracking-editorial mb-4 text-[10px] uppercase text-paper/45">
                            {l('foundation')}
                        </div>
                        <ul className="space-y-2.5 text-sm text-paper/70">
                            <li>
                                <Link
                                    href="/about/profile"
                                    className="transition-colors hover:text-cobalt-lt"
                                >
                                    {l('profile')}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/about/vision-mission"
                                    className="transition-colors hover:text-cobalt-lt"
                                >
                                    {l('vision')}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/about/organization-structure"
                                    className="transition-colors hover:text-cobalt-lt"
                                >
                                    {l('structure')}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/informations"
                                    className="transition-colors hover:text-cobalt-lt"
                                >
                                    {l('news')}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/about/contact"
                                    className="transition-colors hover:text-cobalt-lt"
                                >
                                    {l('contact')}
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-span-2 md:col-span-3">
                        <div className="tracking-editorial mb-4 text-[10px] uppercase text-paper/45">
                            {l('visit')}
                        </div>
                        <div className="space-y-2.5 text-sm text-paper/75">
                            <div className="flex items-start gap-2">
                                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cobalt-lt" />
                                <address className="leading-relaxed not-italic">
                                    {address}
                                </address>
                            </div>
                            <div className="flex items-start gap-2">
                                <Phone className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cobalt-lt" />{' '}
                                021-6507574
                            </div>
                            <div className="flex items-start gap-2">
                                <Mail className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cobalt-lt" />{' '}
                                santo.lukas@yahoo.co.id
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 flex flex-col justify-between gap-3 border-t border-paper/10 pt-6 text-xs text-paper/55 md:flex-row">
                    <div>{l('copyright')}</div>
                    <div className="tracking-editorial font-mono uppercase">
                        {l('tagline')}
                    </div>
                </div>
            </div>
        </footer>
    );
}
