import type { faqHeaderType, faqType } from '@/types/DataTypes/faqtype';
import type {
    LanguageItem,
    NavAuth,
    NavItem,
    NavItemSettingsAuth,
    SubNavItemSettingsAuth,
} from '@/types/navbar';
import { FlagEN, FlagID } from '@/components/Layouts/Navbar/Flags';

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
        code: 'ID',
        flag: FlagID,
    },
    {
        id: 2,
        language: 'en',
        label: 'English',
        code: 'EN',
        flag: FlagEN,
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

export const dataLoan = {
    id: {
        headerNavigation: 'Kembali Ke Detail Buku',
        days: 'Hari',
        borrowingTerms: {
            rule1: 'Pengembalian buku sebelum batas waktu',
            rule2: 'Pengembalian buku setelah batas waktu denda',
        },
        confirmTitle: 'Baca Buku',
        accessDuration: 'Lama Waktu Akses',
        accessDeadline: 'Batas Waktu Akses',
        accessTermsTitle: 'Ketentuan Akses',
        accessTerms: [
            'Buku digital dapat dibaca selama masa akses berlangsung',
            'Akses akan otomatis berakhir saat batas waktu tercapai',
            'Buku dikembalikan secara otomatis tanpa denda',
            'Anda dapat mengakses kembali buku ini kapan saja setelah masa akses berakhir',
        ],
        confirmButton: 'Konfirmasi Baca',
        processing: 'Memproses...',
        cancel: 'Batal',
        checked:
            'Mohon Centang Persetujuan Untuk Menyetujui Ketentuan Akses',
        'loan.success': 'Peminjaman berhasil',
        'loan.only_one_active': 'Hanya boleh 1 pinjaman aktif',
        'loan.same_book_active': 'Buku ini sudah dipinjam',
        'loan.has_unpaid_fine': 'Masih ada denda yang belum dibayar',
        'loan.stock_empty': 'Stok buku habis',
        'loan.user_not_verified': 'Akun belum terverifikasi',
        'loan.settings_not_configured': 'Pengaturan belum tersedia',
        'loan.not_digital': 'Buku ini tidak tersedia dalam format digital',
        'loan.already_reading': 'Buku ini sedang aktif Anda baca',
        'loan.failed': 'Gagal melakukan peminjaman',
    },
    en: {
        headerNavigation: 'Back to Book Details',
        days: 'Days',
        borrowingTerms: {
            rule1: 'Return the book on or before the due date',
            rule2: 'Late returns incur a fine',
        },
        confirmTitle: 'Read Book',
        accessDuration: 'Access Duration',
        accessDeadline: 'Access Deadline',
        accessTermsTitle: 'Access Terms',
        accessTerms: [
            'The digital book can be read during the active access period',
            'Access will automatically end once the deadline is reached',
            'The book is returned automatically with no fines',
            'You can access this book again anytime after the period ends',
        ],
        confirmButton: 'Confirm Read',
        processing: 'Processing...',
        cancel: 'Cancel',
        checked: 'Please tick the box to agree to the access terms',
        'loan.success': 'Loan success',
        'loan.only_one_active': 'Only one active loan allowed',
        'loan.same_book_active': 'Book already borrowed',
        'loan.has_unpaid_fine': 'You have unpaid fines',
        'loan.stock_empty': 'Book out of stock',
        'loan.user_not_verified': 'User not verified',
        'loan.settings_not_configured': 'Settings not configured',
        'loan.not_digital': 'This book is not available in digital format',
        'loan.already_reading': 'You are currently reading this book',
        'loan.failed': 'Failed to borrow book',
    },
};

export const returnConfirmPage = {
    id: {
        back: 'Kembali ke Pinjaman',
        backToBook: 'Kembali ke Buku',
        title: 'Pengembalian Buku',
        bookToReturn: 'Buku yang Dikembalikan',
        dueDate: 'Batas Waktu',
        summaryPhysical: 'Ringkasan Pengembalian',
        summaryDigital: 'Ringkasan Akses',
        borrowDate: 'Tanggal Pinjam',
        accessDate: 'Tanggal Akses',
        dueDateLabel: 'Batas Waktu',
        accessUntil: 'Batas Waktu Akses',
        status: 'Status',
        lateFee: 'Denda Keterlambatan',
        digitalNoFee: 'Buku digital diakhiri otomatis tanpa denda',
        validateTitle: 'Validasi Data Pengembalian',
        validateDescPhysical:
            'Saya mengonfirmasi buku dalam kondisi baik dan seluruh materi pinjaman dikembalikan.',
        validateDescDigital:
            'Saya mengonfirmasi ingin mengakhiri masa akses buku digital ini.',
        confirmReturn: 'Konfirmasi Pengembalian',
        confirmReturnDigital: 'Akhiri Akses',
        cancel: 'Batal',
        rateTitle: 'Beri Penilaian Anda',
        rateSubtitle: 'Bagikan pengalaman membaca buku ini',
        yourRating: 'Rating Anda',
        ratingHints: ['Sangat Buruk', 'Buruk', 'Cukup', 'Bagus', 'Luar Biasa'],
        yourReview: 'Ulasan Anda',
        optional: 'Opsional',
        reviewPlaceholder: 'Bagikan pendapat Anda tentang buku ini...',
        submitReview: 'Kirim Ulasan',
        submitting: 'Mengirim...',
        returnSuccess:
            'Buku berhasil dikembalikan! Terima kasih atas masukan Anda.',
        returnFailed: 'Gagal mengembalikan buku',
        validateError:
            'Silakan validasi data pengembalian dengan mencentang kotak',
        ratingError: 'Silakan pilih rating sebelum mengirim',
    },
    en: {
        back: 'Back to Loans',
        backToBook: 'Back to Book',
        title: 'Return Book',
        bookToReturn: 'Book to Return',
        dueDate: 'Due Date',
        summaryPhysical: 'Return Summary',
        summaryDigital: 'Access Summary',
        borrowDate: 'Borrow Date',
        accessDate: 'Access Date',
        dueDateLabel: 'Due Date',
        accessUntil: 'Access Deadline',
        status: 'Status',
        lateFee: 'Late Fee',
        digitalNoFee: 'Digital access ends automatically with no fine',
        validateTitle: 'Validate Return Data',
        validateDescPhysical:
            'I confirm that the book is in good condition and all borrowed materials are being returned.',
        validateDescDigital:
            'I confirm that I want to end the access period for this digital book.',
        confirmReturn: 'Confirm Return',
        confirmReturnDigital: 'End Access',
        cancel: 'Cancel',
        rateTitle: 'Rate Your Experience',
        rateSubtitle: 'Share your reading experience for this book',
        yourRating: 'Your Rating',
        ratingHints: ['Very Poor', 'Poor', 'Fair', 'Good', 'Excellent'],
        yourReview: 'Your Review',
        optional: 'Optional',
        reviewPlaceholder: 'Share your thoughts about this book...',
        submitReview: 'Submit Review',
        submitting: 'Submitting...',
        returnSuccess:
            'Book returned successfully! Thank you for your feedback.',
        returnFailed: 'Failed to return the book',
        validateError: 'Please validate the return data by checking the box',
        ratingError: 'Please select a rating before submitting',
    },
};

export const assetAccessDenied = {
    id: {
        expired: {
            title: 'Masa Akses Habis',
            description:
                'Masa aktif lihat akses buku sudah habis. Silahkan pinjam kembali untuk mengakses buku ini.',
        },
        unauthorized: {
            title: 'Akses Tidak Diperbolehkan',
            description:
                'Anda tidak memiliki akses untuk membaca buku ini. Pinjam buku terlebih dahulu.',
        },
    },
    en: {
        expired: {
            title: 'Access Expired',
            description:
                'Your book access period has ended. Please borrow the book again to regain access.',
        },
        unauthorized: {
            title: 'Access Not Allowed',
            description:
                'You do not have permission to access this book. Please borrow it first.',
        },
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
