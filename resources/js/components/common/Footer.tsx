import {
    BookOpen,
    Mail,
    Phone,
    MapPin,
    Facebook,
    Twitter,
    Instagram,
} from 'lucide-react';
import { Link } from '@inertiajs/react';
import { useLanguage } from '@/hooks/useLanguage';

export function Footer() {
    const { language } = useLanguage();

    const t = {
        about: {
            id: 'Perpustakaan digital modern yang menyediakan akses ke ribuan buku, jurnal, dan sumber daya akademis untuk komunitas kami.',
            en: 'A modern digital library providing access to thousands of books, journals, and academic resources for our community.',
        },
        quickLinks: { id: 'Tautan Cepat', en: 'Quick Links' },
        browseCatalog: { id: 'Jelajahi Katalog', en: 'Browse Catalog' },
        announcements: { id: 'Pengumuman', en: 'Announcements' },
        becomeMember: { id: 'Daftar Anggota', en: 'Become a Member' },
        memberDashboard: { id: 'Dashboard Anggota', en: 'Member Dashboard' },
        contactUs: { id: 'Hubungi Kami', en: 'Contact Us' },
        openingHours: { id: 'Jam Operasional', en: 'Opening Hours' },
        monFri: { id: 'Senin - Jumat:', en: 'Monday - Friday:' },
        sat: { id: 'Sabtu:', en: 'Saturday:' },
        sun: { id: 'Minggu:', en: 'Sunday:' },
        closed: { id: 'Tutup', en: 'Closed' },
        copyright: {
            id: '\u00a9 2026 Perpustakaan Santo Lukas. Hak cipta dilindungi.',
            en: '\u00a9 2026 Saint Luke Library. All rights reserved.',
        },
        libraryName: {
            id: 'Perpustakaan Santo Lukas',
            en: 'Saint Luke Library',
        },
    };

    const l = (key: keyof typeof t) =>
        language === 'id' ? t[key].id : t[key].en;

    return (
        <footer className="mt-auto border-t border-gray-200 bg-gray-50">
            <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {/* About */}
                    <div>
                        <div className="mb-4 flex items-center gap-2">
                            <div className="rounded-lg bg-primary p-2">
                                <BookOpen className="h-5 w-5 text-white" />
                            </div>
                            <span className="font-['Poppins'] text-lg font-semibold text-primary">
                                {l('libraryName')}
                            </span>
                        </div>
                        <p className="text-sm leading-relaxed text-gray-600">
                            {l('about')}
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="mb-4 font-semibold text-gray-900">
                            {l('quickLinks')}
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/catalog"
                                    className="text-sm text-gray-600 transition-colors hover:text-primary"
                                >
                                    {l('browseCatalog')}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/announcements"
                                    className="text-sm text-gray-600 transition-colors hover:text-primary"
                                >
                                    {l('announcements')}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/register"
                                    className="text-sm text-gray-600 transition-colors hover:text-primary"
                                >
                                    {l('becomeMember')}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/dashboard"
                                    className="text-sm text-gray-600 transition-colors hover:text-primary"
                                >
                                    {l('memberDashboard')}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="mb-4 font-semibold text-gray-900">
                            {l('contactUs')}
                        </h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-2 text-sm text-gray-600">
                                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />
                                <span>
                                    Jl. Perpustakaan No. 123, Kota Akademik
                                </span>
                            </li>
                            <li className="flex items-center gap-2 text-sm text-gray-600">
                                <Phone className="h-4 w-4 flex-shrink-0" />
                                <span>+62 (21) 123-4567</span>
                            </li>
                            <li className="flex items-center gap-2 text-sm text-gray-600">
                                <Mail className="h-4 w-4 flex-shrink-0" />
                                <span>info@perpustakaan-santolukas.id</span>
                            </li>
                        </ul>
                    </div>

                    {/* Opening Hours */}
                    <div>
                        <h3 className="mb-4 font-semibold text-gray-900">
                            {l('openingHours')}
                        </h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li className="flex justify-between">
                                <span>{l('monFri')}</span>
                                <span className="font-medium">
                                    8:00 AM - 8:00 PM
                                </span>
                            </li>
                            <li className="flex justify-between">
                                <span>{l('sat')}</span>
                                <span className="font-medium">
                                    9:00 AM - 5:00 PM
                                </span>
                            </li>
                            <li className="flex justify-between">
                                <span>{l('sun')}</span>
                                <span className="font-medium">
                                    {l('closed')}
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-8 md:flex-row">
                    <p className="text-sm text-gray-600">{l('copyright')}</p>

                    <div className="flex items-center gap-4">
                        <a
                            href="#"
                            className="rounded-full bg-gray-200 p-2 transition-colors hover:bg-primary hover:text-white"
                            aria-label="Facebook"
                        >
                            <Facebook className="h-4 w-4" />
                        </a>
                        <a
                            href="#"
                            className="rounded-full bg-gray-200 p-2 transition-colors hover:bg-primary hover:text-white"
                            aria-label="Twitter"
                        >
                            <Twitter className="h-4 w-4" />
                        </a>
                        <a
                            href="#"
                            className="rounded-full bg-gray-200 p-2 transition-colors hover:bg-primary hover:text-white"
                            aria-label="Instagram"
                        >
                            <Instagram className="h-4 w-4" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
