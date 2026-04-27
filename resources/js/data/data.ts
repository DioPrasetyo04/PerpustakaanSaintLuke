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
        href: '/informations',
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

export const catalogAuthors = {
    id: {
        title: 'Katalog Penulis',
        subtitle: 'Jelajahi dan temukan penulis buku yang anda minati',
        placeholder: 'Cari dan temukan penulis buku....',
    },
    en: {
        title: 'Authors Catalog',
        subtitle: 'Browse and find the authors of books that interest you',
        placeholder: 'Search and find book authors....',
    },
};

export const catalogPublishers = {
    id: {
        title: 'Katalog Penerbit',
        subtitle: 'Jelajahi dan temukan penerbit buku yang anda minati',
        placeholder: 'Cari dan temukan penerbit buku...',
    },
    en: {
        title: 'Publishers Catalog',
        subtitle: 'Browse and find the publishers of books that interest you',
        placeholder: 'Search and find book publishers....',
    },
};

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

export const filtersHeaderPage = {
    id: {
        title: 'Sumber Daya Buku',
        description:
            'Temukan buku yang kamu inginkan menggunakan filter sumber daya yang dibutuhkan',
        placeholder: 'Cari buku sesuai sumber daya....',
    },
    en: {
        title: 'E-Resources Book',
        description:
            'Find the book you want using the required resource filters...',
        placeholder: 'Search for books according to resources....',
    },
};

export const bookDetailPage = {
    id: {
        bookNotFound: 'Buku Tidak Ditemukan',
        backToCatalog: 'Kembali Ke Resources',
        borrowBook: 'Pinjam Buku',
        notAvailable: 'Buku Tidak Tersedia',
        addWishlist: 'Simpan Buku',
        publisher: 'Penerbit',
        pubYear: 'Tahun Publikasi',
        bookLanguage: 'Bahasa',
        bookPages: 'Jumlah Halaman',
        synopsis: 'Sinopsis',
        recommended: 'Buku Rekomendasi',
        headerReviews: 'Lihat beberapa komentar beberapa user terkait buku ini',
    },
    en: {
        bookNotFound: 'Book Not Found',
        backToCatalog: 'Back to Catalog',
        borrowBook: 'Borrow Book',
        notAvailable: 'Book Not Available',
        addWishlist: 'Add To Wishlist',
        publisher: 'Publisher',
        pubYear: 'Publication Year',
        bookLanguage: 'Language',
        bookPages: 'Number Of Pages',
        synopsis: 'Synopsis',
        recommended: 'Recomended Books',
        headerReviews: 'See what readers think about this book',
    },
};

export const RegisterDataPage = {
    id: {
        logoHeader: 'Perpustakaan Santo Lukas',
        header: 'Daftar Akun Anda!',
        description: 'Daftar Akun Anda Untuk Mendapatkan Banyak Akses!',
        fieldHeaderName: 'Nama',
        placeholderName: 'Input Nama Kamu...',
        fieldHeaderEmail: 'Email',
        placeholderEmail: 'Input Email Kamu...',
        fieldHeaderPassword: 'Password',
        placeholderPassword: 'Input Password Kamu...',
        fieldHeaderConfirmPassword: 'Konfirmasi Password',
        placeholderConfirmPassword: 'Input Konfirmasi Password Kamu...',
        fieldHeaderPhone: 'Nomor Telepon',
        fieldHeaderAvatar: 'Foto Profil',
        placeholderAvatar: 'Input Foto Profil Kamu...',
    },
    en: {
        logoHeader: 'Saint Luke Library',
        header: 'Register Your Account!',
        description: 'Register Your Account This From To Access Your Data',
        fieldHeaderName: 'Name',
        placeholderName: 'Input Your Name...',
        fieldHeaderEmail: 'Email',
        placeholderEmail: 'Input Your Email...',
        fieldHeaderPassword: 'Password',
        placeholderPassword: 'Input Your Password...',
        fieldHeaderConfirmPassword: 'Confirmation Password',
        placeholderConfirmPassword: 'Input Your Confirm Password...',
        fieldHeaderPhone: 'Phone Number',
        fieldHeaderAvatar: 'Profile Image',
        placeholderAvatar: 'Input Your Profile Image...',
    },
};

export const AuthDataPage = {
    id: {
        logoHeader: 'Perpustakaan Santo Lukas',
        header: 'Login Akun Anda!',
        description: 'Selamat Datang Silahkan Login!',
        fieldHeaderEmail: 'Email',
        placeholderEmail: 'Input Email Kamu...',
        fieldHeaderPassword: 'Password',
        placeholderPassword: 'Input Password Kamu...',
    },
    en: {
        logoHeader: 'Saint Luke Library',
        header: 'Login Your Account!',
        description: 'Welcome Back Please Login Your Account!',
        fieldHeaderEmail: 'Email',
        placeholderEmail: 'Input Your Email...',
        fieldHeaderPassword: 'Password',
        placeholderPassword: 'Input Your Password...',
    },
};

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
