import { BookDataProps } from '@/types/HomePage/HomeType';
import { CategoriesType } from '@/types/categories';
import { faqHeaderType, faqType } from '@/types/DataTypes/faqtype';
import type {
    LanguageItem,
    NavAuth,
    NavItem,
    NavItemSettingsAuth,
    SubNavItemSettingsAuth,
} from '@/types/navbar';

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
                id: 'books',
                label: { id: 'Buku', en: 'Books' },
                href: '/catalog/books',
            },
            {
                id: 'categories',
                label: { id: 'Kategori Buku', en: 'Book Categories' },
                href: '/catalog/categories',
            },
            {
                id: 'penulis',
                label: { id: 'Penulis', en: 'Authors' },
                href: '/catalog/authors',
            },
            {
                id: 'publishers',
                label: { id: 'Penerbit', en: 'Publishers' },
                href: '/catalog/publishers',
            },
        ],
    },
    {
        id: 'e-resources',
        label: { id: 'Sumber', en: 'Resources' },
        href: '/resources',
    },
    {
        id: 'announcement',
        label: { id: 'Berita', en: 'Announcement' },
        href: '/announcements',
    },
    {
        id: 'about',
        label: { id: 'Tentang', en: 'About' },
        href: '/about',
        menu: [
            {
                id: 'profile',
                label: { id: 'Profil', en: 'Profile' },
                href: '/about/profile',
            },
            {
                id: 'vision-mission',
                label: { id: 'Visi dan Misi', en: 'Vision & Mission' },
                href: '/about/vision-mission',
            },
            {
                id: 'structure',
                label: {
                    id: 'Struktur Organisasi',
                    en: 'Organization Structure',
                },
                href: '/about/organization-structure',
            },
            {
                id: 'contact',
                label: { id: 'Kontak', en: 'Contact' },
                href: '/about/contact',
            },
        ],
    },
];

export const profileSubNavItems: SubNavItemSettingsAuth[] = [
    {
        id: 1,
        icon: 'dashboard',
        label: { id: 'Dashboard', en: 'Dashboard' },
        href: '/dashboard',
    },
    {
        id: 2,
        icon: 'settings',
        label: { id: 'Pengaturan', en: 'Settings' },
        href: '/settings',
    },
    {
        id: 3,
        icon: 'riwayat',
        label: { id: 'Riwayat', en: 'History' },
        href: '/history',
    },
    {
        id: 4,
        icon: 'logout',
        label: { id: 'Keluar', en: 'Logout' },
        href: '/logout',
    },
];

export const profileAuth: NavItemSettingsAuth = {
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'widya',
    menu: profileSubNavItems,
};

// ─── Auth Nav Items (Login / Register) ────────────────────────────────────────
export const navAuthItems: NavAuth = {
    label: { id: 'Masuk', en: 'Login' },
    href: '/login',
    variant: 'default',
};

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

export const statsHeaderHome = {
    id: {
        title: 'Statistik Perpustakaan',
        subtitle:
            'Lihat statistik terkini tentang koleksi buku, kategori, anggota, dan aktivitas peminjaman',
    },
    en: {
        title: 'Library Statistics',
        subtitle:
            'View the latest statistics about our book collection, categories, members, and borrowing activities',
    },
};

export const catalogBooks = {
    id: {
        title: 'Katalog Buku',
        subtitle: 'Cari dan temukan buku-buku populer yang tersedia',
        placeholder: 'Cari buku....',
    },
    en: {
        title: 'Books Catalog',
        subtitle: 'Search and find popular books available',
        placeholder: 'Search books...',
    },
};

export const catalogCategories = {
    id: {
        title: 'Katalog Kategori',
        subtitle: 'Jelajahi koleksi buku berdasarkan kategori yang diminati',
        placeholder: 'Cari kategori....',
    },
    en: {
        title: 'Categories Catalog',
        subtitle: 'Browse our book collection by category',
        placeholder: 'Search categories...',
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
        title: 'Jelajahi Berdasarkan Kategori',
        description:
            'Jelajahi koleksi kami yang beragam berdasarkan bidang subjek',
    },
    en: {
        title: 'Browse by Category',
        description:
            'Explore our diverse collection organized by subject areas',
    },
};

export const CategoriesData: CategoriesType[] = [
    {
        id: 1,
        name: 'Technology',
        slug: 'technology',
        icon: '',
        emoji: '\uD83D\uDCBB',
        photo: '',
        description: 'Technology books',
        is_active: true,
        count_book: 1250,
        color: 'bg-blue-100 text-blue-700',
    },
    {
        id: 2,
        name: 'Science',
        slug: 'science',
        icon: '',
        emoji: '\uD83D\uDD2C',
        photo: '',
        description: 'Science books',
        is_active: true,
        count_book: 980,
        color: 'bg-green-100 text-green-700',
    },
    {
        id: 3,
        name: 'History',
        slug: 'history',
        icon: '',
        emoji: '\uD83D\uDCDC',
        photo: '',
        description: 'History books',
        is_active: true,
        count_book: 750,
        color: 'bg-amber-100 text-amber-700',
    },
    {
        id: 4,
        name: 'Literature',
        slug: 'literature',
        icon: '',
        emoji: '\uD83D\uDCDA',
        photo: '',
        description: 'Literature books',
        is_active: true,
        count_book: 1100,
        color: 'bg-purple-100 text-purple-700',
    },
    {
        id: 5,
        name: 'Arts',
        slug: 'arts',
        icon: '',
        emoji: '\uD83C\uDFA8',
        photo: '',
        description: 'Arts books',
        is_active: true,
        count_book: 650,
        color: 'bg-pink-100 text-pink-700',
    },
    {
        id: 6,
        name: 'Business',
        slug: 'business',
        icon: '',
        emoji: '\uD83D\uDCBC',
        photo: '',
        description: 'Business books',
        is_active: true,
        count_book: 820,
        color: 'bg-indigo-100 text-indigo-700',
    },
];

export const announcementsHeaderHome = {
    id: {
        title: 'Pengumuman Terbaru',
        description:
            'Tetap update dengan berita perpustakaan dan acara mendatang',
    },
    en: {
        title: 'Latest Announcements',
        description: 'Stay updated with library news and upcoming events',
    },
};

export type AnnouncementType = {
    id: number;
    title: string;
    description: string;
    date: string;
    imageUrl: string;
};

export const announcementsData: AnnouncementType[] = [
    {
        id: 1,
        title: 'New Digital Archive Available',
        description: 'Access over 500 new digitized historical documents',
        date: 'March 1, 2026',
        imageUrl:
            'https://images.unsplash.com/photo-1556360853-5c1e1b64ff6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWJyYXJ5JTIwYW5ub3VuY2VtZW50JTIwZXZlbnR8ZW58MXx8fHwxNzcyNjA1MzE5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
        id: 2,
        title: 'Book Reading Event',
        description: 'Join us for a community reading session every Saturday',
        date: 'Ongoing',
        imageUrl:
            'https://images.unsplash.com/photo-1632830096559-fb7091533755?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwcmVhZGluZyUyMGJvb2tzfGVufDF8fHx8MTc3MjQ4NzMwMXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
        id: 3,
        title: 'Extended Library Hours',
        description:
            'Library now open until 10 PM on weekdays for your convenience',
        date: 'February 28, 2026',
        imageUrl:
            'https://images.unsplash.com/photo-1656849093660-f672e7dabaca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWJyYXJ5JTIwYnVpbGRpbmclMjBpbnRlcmlvciUyMGJvb2tzfGVufDF8fHx8MTc3MjYwNTMxNnww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
        id: 4,
        title: 'Author Meet & Greet',
        description:
            'Special event with bestselling author Emily Roberts on March 15th',
        date: 'March 15, 2026',
        imageUrl:
            'https://images.unsplash.com/photo-1772380407481-81b8f13bd010?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaXRlcmF0dXJlJTIwY2xhc3NpYyUyMGJvb2t8ZW58MXx8fHwxNzcyNTQyMjEzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
        id: 5,
        title: "New Children's Section",
        description:
            "Newly renovated children's area with over 1,000 books now open",
        date: 'February 20, 2026',
        imageUrl:
            'https://images.unsplash.com/photo-1763905180945-977cd687f7f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwcHJvZ3JhbW1pbmclMjBib29rfGVufDF8fHx8MTc3MjYwNTMxN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
        id: 6,
        title: 'Library Closed - Holiday',
        description: 'Library will be closed on March 10th for public holiday',
        date: 'March 10, 2026',
        imageUrl:
            'https://images.unsplash.com/photo-1725870475677-7dc91efe9f93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2llbmNlJTIwdGV4dGJvb2slMjBlZHVjYXRpb258ZW58MXx8fHwxNzcyNTA5NDUxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
        id: 7,
        title: 'Summer Reading Challenge',
        description: 'Join our summer reading program and win exciting prizes',
        date: 'April 1, 2026',
        imageUrl:
            'https://images.unsplash.com/photo-1556360853-5c1e1b64ff6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWJyYXJ5JTIwYW5ub3VuY2VtZW50JTIwZXZlbnR8ZW58MXx8fHwxNzcyNjA1MzE5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
        id: 8,
        title: 'New Study Rooms Available',
        description: 'Reserve our newly added private study rooms online',
        date: 'March 20, 2026',
        imageUrl:
            'https://images.unsplash.com/photo-1632830096559-fb7091533755?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwcmVhZGluZyUyMGJvb2tzfGVufDF8fHx8MTc3MjQ4NzMwMXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
];

export const faqHeader: faqHeaderType = {
    id: {
        title: 'Pertanyaan yang Sering Diajukan',
        description: 'Semua pertanyaan yang diajukan oleh pengguna platform',
    },
    en: {
        title: 'Frequently Asked Questions',
        description: 'All questions asked by platform users',
    },
};

export const faqs: faqType = [
    {
        id: 1,
        question: {
            id: 'Bagaimana cara saya menjadi anggota perpustakaan?',
            en: 'How do I become a library member?',
        },
        answer: {
            id: 'Untuk menjadi anggota perpustakaan anda bisa registrasi atau login sebagai anggota perpustakaan yang tersedia pada navbar menu masuk untuk menjadi anggota dan dapat mengakses data buku secara online',
            en: 'To become a library member, you can register or log in as a library member which is available on the login menu navbar to become a member and can access book data online.',
        },
    },
    {
        id: 2,
        question: {
            id: 'Bagaimana cara saya meminjam buku dari perpustakaan?',
            en: 'How do I borrow books from the library?',
        },
        answer: {
            id: 'Untuk meminjam buku, Anda perlu mendaftar sebagai anggota terlebih dahulu. Setelah terdaftar, Anda dapat mencari buku yang tersedia di katalog atau sumber daya kami dan mengaksesnya secara online atau dapat datang ke perpustakaan untuk dapat mengaksesnya.',
            en: 'To borrow books, you must first register as a member. Once registered, you can search for available books in our catalog or resources and access them online or in-person.',
        },
    },
    {
        id: 3,
        question: {
            id: 'Apakah dapat dapat meminjam lebih dari satu buku?',
            en: 'Can I borrow more than one book?',
        },
        answer: {
            id: 'Dalam sistem perpustakaan ini anda hanya boleh meminjam 1 buku, selama anda masih meminjam buku anda tidak bisa meminjam buku lain',
            en: 'In this library system you can only borrow 1 book, as long as you are still borrowing a book you cannot borrow another book.',
        },
    },
    {
        id: 4,
        question: {
            id: 'Berapa lama masa peminjaman buku?',
            en: 'What is the loan period for books?',
        },
        answer: {
            id: 'Masa peminjaman standar adalah 14 hari untuk masa peminjaman buku, Setelah 14 hari anda akan dikenakan denda keterlambatan. Jika buku yang anda pinjam belum dikembalikan maka anda tidak dapat meminjam buku baru.',
            en: 'The standard loan period for a book is 14 days. After 14 days, you will be charged a late fee. If the book you borrowed has not been returned, you will not be able to borrow a new book.',
        },
    },
    {
        id: 5,
        question: {
            id: 'Bagaimana cara mengembalikan buku yang sudah dipinjam?',
            en: 'How do I return a book I`ve borrowed?',
        },
        answer: {
            id: 'Pengembalian buku bisa anda akses pada menu dashboard atau pada saat anda mengakses sumber bacaan buku',
            en: 'You can access book returns on the dashboard menu or when you access the book reading source.',
        },
    },
    {
        id: 6,
        question: {
            id: 'Apakah buku-buku yang tersedia dapat saya cari sesuai keinginan saya?',
            en: 'Can I search for the available books according to my wishes?',
        },
        answer: {
            id: 'Anda dapat menjadi pada fitur resources atau sumber daya yang kami sediakan fitur tersebut berfungsi untuk melakukan pencarian buku sesuai keinginan anda',
            en: 'You can be on the resources feature or resources that we provide. This feature functions to search for books according to your wishes.',
        },
    },
    {
        id: 7,
        question: {
            id: 'Apa yang terjadi jika saya mengembalikan buku terlambat?',
            en: 'What happens if I return a book late?',
        },
        answer: {
            id: 'Jika anda mengumpulkan buku lebih dari batas waktu yang ditentukan maka anda akan dikenakan denda keterlambatan pengembalian buku, dan anda dapat membayar denda keterlambatan',
            en: 'If you collect books more than the specified time limit, you will be charged a late book return fine, and you can pay the late fine.',
        },
    },
    {
        id: 8,
        question: {
            id: 'Sistem pembayaran apa yang akan digunakan dalam paltform ini?',
            en: 'What payment systems will be used in this platform?',
        },
        answer: {
            id: 'Sistem pembayaran akan terintegrasi dengan jenis apapun, seperti Qris, Transfer Antar Bank, dll',
            en: 'The payment system will be integrated with any type, such as Qris, Interbank Transfer, etc.',
        },
    },
];
