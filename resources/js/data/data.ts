import { BookDataProps } from '@/types/books';
import { CategoriesType } from '@/types/categories';
import type { LanguageItem, NavAuthItem, NavItem } from '@/types/navbar';

// ─── Logo ──────────────────────────────────────────────────────────────────────
export const navLogo = {
    id: 'title',
    label: {
        id: 'Perpustakaan Santo Lukas',
        en: 'Saint Luke E-Library',
    },
};

// ─── Main Nav Items ────────────────────────────────────────────────────────────
export const navItems: NavItem[] = [
    {
        id: 'home',
        label: { id: 'Beranda', en: 'Home' },
        href: '/',
    },
    {
        id: 'catalog',
        label: { id: 'Katalog', en: 'Catalog' },
        href: '/catalog',
        menu: [
            {
                id: 'allbooks',
                label: { id: 'Semua Buku', en: 'All Books' },
                href: '/catalog',
            },
            {
                id: 'categories',
                label: { id: 'Kategori Buku', en: 'Book Categories' },
                href: '/catalog?tab=categories',
            },
            {
                id: 'popular',
                label: { id: 'Buku Populer', en: 'Popular Books' },
                href: '/catalog?tab=popular',
            },
        ],
    },
    {
        id: 'e-resources',
        label: { id: 'Sumber', en: 'Resources' },
        href: '/e-resources',
    },
    {
        id: 'circulation',
        label: { id: 'Sirkulasi', en: 'Circulation' },
        href: '/circulation',
        menu: [
            {
                id: 'borrow',
                label: { id: 'Pinjam Buku', en: 'Borrow Books' },
                href: '/loans',
            },
            {
                id: 'return',
                label: { id: 'Kembalikan Buku', en: 'Return Books' },
                href: '/returns',
            },
            {
                id: 'history',
                label: { id: 'Riwayat', en: 'History' },
                href: '/loans/history',
            },
        ],
    },
    {
        id: 'recomendation',
        label: { id: 'Rekomendasi', en: 'Recommendation' },
        href: '/recommendations',
    },
    {
        id: 'about',
        label: { id: 'Tentang', en: 'About' },
        href: '/about',
        menu: [
            {
                id: 'profile',
                label: { id: 'Profil', en: 'Profile' },
                href: '/about#profile',
            },
            {
                id: 'vision-mission',
                label: { id: 'Visi dan Misi', en: 'Vision & Mission' },
                href: '/about#vision-mission',
            },
            {
                id: 'structure',
                label: {
                    id: 'Struktur Organisasi',
                    en: 'Organization Structure',
                },
                href: '/about#structure',
            },
            {
                id: 'contact',
                label: { id: 'Kontak', en: 'Contact' },
                href: '/about#contact',
            },
        ],
    },
];

// ─── Auth Nav Items (Login / Register) ────────────────────────────────────────
export const navAuthItems: NavAuthItem[] = [
    // {
    //     id: 'login',
    //     label: { id: 'Masuk', en: 'Login' },
    //     href: '/login',
    //     variant: 'ghost',
    // },
    {
        id: 'masuk',
        label: { id: 'Masuk', en: 'Login' },
        href: '/login',
        variant: 'default',
    },
];

export const languageItems: LanguageItem[] = [
    {
        id: 1,
        language: 'id',
        label: 'Indonesia',
    },
    {
        id: 2,
        language: 'en',
        label: 'English',
    },
];

export const slidesHero = [
    '/assets/images/hero1.png',
    '/assets/images/hero2.png',
    '/assets/images/hero3.png',
];

export const contentHero = {
    id: {
        badge: 'Buku Adalah Gudang Ilmu',
        title: 'E-Library Santo Lukas',
        subtitle: 'Selamat Datang di E-Library Santo Lukas',
        description: 'Pusat Informasi Buku Santo Lukas',
    },
    en: {
        badge: 'Books Are a Storehouse of Knowledge',
        title: 'Saint Luke E-Library',
        subtitle: 'Welcome to Saint Luke E-Library',
        description: 'Saint Luke E-Library Information Center',
    },
};

export const featureBookHeaderHome = {
    id: {
        title: 'Buku Populer',
        subtitle:
            'Temukan buku-buku populer dan berperingkat tinggi kami di berbagai kategori',
    },
    en: {
        title: 'Popular Books',
        subtitle:
            'Discover our most popular and highly-rated books across various categories',
    },
};

export const featuredBooksDataHome: BookDataProps[] = [
    {
        id: 1,
        book_code: 'BK-001',
        title: 'Belajar React TypeScript',
        slug: 'belajar-react-typescript',
        publication_year: 2024,
        isbn: '9786230000001',
        synopsis:
            'Panduan lengkap belajar React dengan TypeScript dari dasar hingga advanced.',
        number_of_pages: 320,
        status: 'available',
        cover: '/assets/images/books/react-ts.jpg',
        price: 120000,
        is_published: true,

        language: {
            id: 1,
            code: 'ID',
            language: 'Indonesia',
            photo: '/assets/images/language/id.png',
        },

        author: {
            id: 1,
            name: 'John Doe',
            username: 'john',
            email: 'john@example.com',
            avatar: '/assets/images/authors/john.jpg',
            created_at: '2025-01-01',
            updated_at: '2025-01-01',
        },

        publisher: {
            id: 1,
            name: 'Gramedia',
            slug: 'gramedia',
            email: 'info@gramedia.com',
            address: 'Jakarta, Indonesia',
            phone: '08123456789',
            logo: '/assets/images/publisher/gramedia.png',
            is_active: true,
        },

        stock: {
            id: 1,
            book_id: 1,
            total: 20,
            available: 15,
            loan: 3,
            lost: 1,
            damaged: 1,
        },

        assets: [
            {
                id: 1,
                book_id: 1,
                type: 'pdf',
                utility_path: '/assets/books/react-ts.pdf',
            },
            {
                id: 2,
                book_id: 1,
                type: 'cover',
                utility_path: '/assets/books/react-ts.png',
            },
        ],

        categories: [
            {
                id: 1,
                name: 'Programming',
                slug: 'programming',
                icon: '/assets/book/programming.png',
                BookOfCategories: {
                    book_id: 1,
                    category_id: 1,
                },
            },
            {
                id: 2,
                name: 'Web Development',
                slug: 'web-development',
                icon: '/assets/book/web-development.png',
                BookOfCategories: {
                    book_id: 1,
                    category_id: 2,
                },
            },
        ],

        created_at: '2025-01-01',
        updated_at: '2025-01-01',
    },

    {
        id: 2,
        book_code: 'BK-002',
        title: 'Laravel API Mastery',
        slug: 'laravel-api-mastery',
        publication_year: 2023,
        isbn: '9786230000002',
        synopsis:
            'Membangun REST API Laravel dengan authentication JWT dan best practice.',
        number_of_pages: 280,
        status: 'available',
        cover: '/assets/images/books/laravel-api.jpg',
        price: 110000,
        is_published: true,

        language: {
            id: 1,
            code: 'ID',
            language: 'Indonesia',
        },

        author: {
            id: 2,
            name: 'Angelica Indah',
            username: 'angelica',
            email: 'angelica@mail.com',
            avatar: '/assets/images/authors/angelica.jpg',
        },

        publisher: {
            id: 2,
            name: 'Informatika',
            slug: 'informatika',
            email: 'info@informatika.com',
            address: 'Bandung',
            phone: '08222222222',
            logo: '/assets/images/publisher/informatika.png',
            is_active: true,
        },

        stock: {
            id: 2,
            book_id: 2,
            total: 10,
            available: 8,
            loan: 2,
            lost: 0,
            damaged: 0,
        },

        assets: [
            {
                id: 3,
                book_id: 2,
                type: 'pdf',
                utility_path: '/assets/books/laravel-api.pdf',
            },
        ],

        categories: [
            {
                id: 3,
                name: 'Backend',
                slug: 'backend',
                icon: '/assets/images/categories/backend.png',
                BookOfCategories: {
                    book_id: 2,
                    category_id: 3,
                },
            },
        ],

        created_at: '2025-01-02',
        updated_at: '2025-01-02',
    },
];

export const categoriesHeaderHome = {
    id: {
        title: 'Semua Categories',
        description:
            'Berbagai data categories yang tersedia pada platform perpustakaan',
    },
    en: {
        title: 'All Categories',
        description:
            'Various data categories available on the library platform',
    },
};

export const CategoriesData: CategoriesType[] = [
    {
        id: 1,
        name: 'Horror',
        slug: 'horror-1403',
        icon: 'https://cdn-icons-png.freepik.com/256/8494/8494367.png?semt=ais_white_label',
        photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3M5lZRS1L7EsUjp7xRi-5k11Y7U7Dj5Gmgw&s',
        description: 'Horror category buku',
        is_active: true,
        count_book: 100,
    },
    {
        id: 2,
        name: 'Funny',
        slug: 'funny-193',
        icon: 'https://thumbs.dreamstime.com/b/happy-clown-face-wearing-hat-smiling-red-nose-curly-hair-simple-line-art-illustration-perfect-entertainment-329191831.jpg',
        photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3M5lZRS1L7EsUjp7xRi-5k11Y7U7Dj5Gmgw&s',
        description: 'Buku dengan category funny',
        is_active: true,
        count_book: 200,
    },
];
