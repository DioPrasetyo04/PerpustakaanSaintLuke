# Arsitektur Proyek — E‑Library Santo Lukas (Perpustakaan Saint Luke)

> Dokumen onboarding & referensi arsitektur. Menjelaskan tech stack, pola desain, model domain,
> routing, otorisasi, panel admin Filament, dan seluruh alur bisnis aplikasi. Semua tautan file
> bersifat relatif terhadap root proyek dan dapat diklik.

## Daftar Isi
1. [Ringkasan Proyek & Tech Stack](#1-ringkasan-proyek--tech-stack)
2. [Arsitektur Tingkat Tinggi](#2-arsitektur-tingkat-tinggi)
3. [Pola Service / Repository / Interface](#3-pola-service--repository--interface)
4. [Domain Model & Relasi](#4-domain-model--relasi)
5. [Daftar Fitur](#5-daftar-fitur)
6. [Peta Routing](#6-peta-routing)
7. [Otorisasi & RBAC (3 Lapis)](#7-otorisasi--rbac-3-lapis)
8. [Panel Admin Filament](#8-panel-admin-filament)
9. [Alur Bisnis Utama](#9-alur-bisnis-utama)
10. [Scheduler, Jobs & Notifikasi](#10-scheduler-jobs--notifikasi)
11. [Integrasi Midtrans](#11-integrasi-midtrans)
12. [Enums & Status](#12-enums--status)
13. [Konvensi & Catatan untuk Kontributor Baru](#13-konvensi--catatan-untuk-kontributor-baru)

---

## 1. Ringkasan Proyek & Tech Stack

**E‑Library Santo Lukas** adalah sistem manajemen perpustakaan sekaligus **perpustakaan digital (e‑resource)**.
Anggota dapat meminjam buku digital, membaca aset (PDF/gambar/video), mengembalikan, membayar denda online,
dan mencatat kunjungan. Staf mengelola seluruh katalog, peminjaman, keuangan, dan laporan lewat panel admin.

### Tech Stack
| Lapisan | Teknologi |
|---|---|
| Backend | Laravel 12, PHP 8.2 |
| Frontend publik/anggota | Inertia.js 2 + React 19 + TypeScript + Tailwind (`resources/js`) |
| Panel admin/staf | Filament v5 di `/admin` (`app/Filament`) |
| Auth | Laravel Fortify (login, register, reset, 2FA) + Sanctum |
| RBAC | Spatie Permission + BezhanSalleh Filament Shield |
| Pembayaran | Midtrans Snap (denda) |
| PDF | barryvdh/laravel-dompdf (laporan & kartu anggota) |
| Kartu anggota | endroid/qr-code (QR) + picqer/php-barcode-generator (Code128) |
| Gambar | intervention/image |
| Chart | flowframe/laravel-trend + Filament charts |
| Lain | ysfkaya/filament-phone-input, pragmarx/countries, WhatsApp via Fonnte API |

Definisi dependensi lengkap: [composer.json](composer.json) & [package.json](package.json).

---

## 2. Arsitektur Tingkat Tinggi

Aplikasi punya **dua antarmuka (dual‑frontend)** di atas satu backend Laravel:

```
┌────────────────────────────────────────────────────────────────┐
│                        Laravel 12 (PHP 8.2)                      │
│                                                                  │
│  ┌────────────────────────┐        ┌──────────────────────────┐ │
│  │  Frontend PUBLIK         │        │  Panel ADMIN (Filament)  │ │
│  │  Inertia + React + TS    │        │  /admin                  │ │
│  │  (resources/js)          │        │  (app/Filament)          │ │
│  └───────────┬──────────────┘        └────────────┬─────────────┘ │
│              │ Controller → Service                │ Resource /     │
│              │   → Repo(Interface) → Model         │ Page / Widget  │
│              └──────────────────┬──────────────────┘                │
│                                 │                                   │
│                          Eloquent Models                            │
│                          MySQL Database                             │
└──────────────────────────────────────────────────────────────────┘
```

### Lapisan sisi publik/Inertia (pola utama)

```
Route (routes/web.php)
  └─ Controller (tipis; inject Service via constructor)
       └─ Service (logika bisnis + validasi aturan + DB::transaction)
            └─ Interface Repository  ← di-bind ke Repository konkret di AppServiceProvider
                 └─ Repository (query Eloquent murni)
                      └─ Model (Eloquent + relasi + static query helper + enum cast)

  Output → App\Http\Resources\* (+ helper transformData / paginateResource)
         → Inertia::render(...)  ATAU  response()->json(...)
```

Middleware global & alias didaftarkan di [bootstrap/app.php](bootstrap/app.php). Inertia membagikan
data global (`auth.user`, `announcement`, `flash.access_denied`, `csrfToken`) lewat
[HandleInertiaRequests](app/Http/Middleware/HandleInertiaRequests.php).

---

## 3. Pola Service / Repository / Interface

Inti arsitektur sisi publik adalah pemisahan tegas tanggung jawab dengan **dependency inversion**:

- **Controller** — tipis, hanya menerima request, memanggil Service, mengembalikan `Inertia::render` / JSON.
  Contoh: [LoanController](app/Http/Controllers/LoanController.php).
- **Service** — menampung *business rules*, validasi aturan, dan transaksi DB. Service bergantung pada
  **Interface** repository, bukan implementasi konkret. Contoh: [LoanService](app/Services/LoanService.php)
  dengan `validateLoan()` (5 aturan peminjaman).
- **Interface** (`app/Interface/*`) — kontrak repository. Contoh:
  [LoanInterfaceRepositories](app/Interface/LoanInterfaceRepositories.php).
- **Repository** (`app/Repositories/*`) — query Eloquent murni, mengimplementasikan interface. Contoh:
  [LoanRepositories](app/Repositories/LoanRepositories.php).

### Binding Interface → Implementasi
Didaftarkan di [AppServiceProvider::register()](app/Providers/AppServiceProvider.php) (13 binding):

| Interface | Implementasi |
|---|---|
| `HomeInterfaceRepositories` | `HomeRepositories` |
| `CatalogInterfaceRepositories` | `CatalogRepositories` |
| `ResourceInterfaceRepositories` | `ResourceRepositories` |
| `BookInterfaceRepositories` | `BookRepositories` |
| `InformationRepositoriesInterface` | `InformationRepositories` |
| `LoanInterfaceRepositories` | `LoanRepositories` |
| `AssetInterfaceRepositories` | `AssetRepositories` |
| `ReturnBookInterfaceRepositories` | `ReturnBookRepositories` |
| `DashboardInterfaceRepositories` | `DashboardRepositories` |
| `HistoryInterfaceRepositories` | `HistoryRepositories` |
| `BookmarkInterfaceRepositories` | `BookmarkRepositories` |
| `ProfileInterfaceRepositories` | `ProfileRepositories` |
| `UpdatePasswordInterfaceRepositories` | `UpdatePasswordRepositories` |

> **Catatan pola:** sebagian logika query juga hidup sebagai **static method di Model**
> (mis. `Loan::hasActiveLoan`, `Loan::checkStock`, `Fine::hasUnpaidFine`, `FineSettings::checkSettings`)
> dan dipanggil langsung dari Service. Output dirapikan oleh **API Resource** (`app/Http/Resources/*`)
> melalui helper `transformData()` / `paginateResource()`.

### Helper global
[app/Helpers/helpers.php](app/Helpers/helpers.php) (di‑autoload via `composer.json`):
`generateUniqueCode`, `generateSlug`, `generateUsername`, `generateRandomPassword`, `transformData`,
`paginateResource`, `signatureMidtrans`, `RupiahFormatted`, `moneyFormatter`, `formatLast12Months`,
`countryOptions`, `tiptapToHtml`.

---

## 4. Domain Model & Relasi

Model berada di `app/Models`. Relasi inti:

```
User ──< Loan ──< LoanDetail >── Book ──1 Stock
 │                   │             │
 │                   │             ├──< (m2m) Category / Author / Asset / Type
 │                   │             └──< (hasManyThrough) ReviewBook
 │                   │
 │                   └──1 ReturnBook ──1 ReturnBookCheck (kondisi)
 │                                   └──1 Fine ──(Midtrans order_id)
 │
 ├──< Visit            ├──< Bookmark (m2m Book)
 └──< SocialMedia (morph)
```

### Entitas kunci
- **[User](app/Models/User.php)** — `implements FilamentUser, MustVerifyEmail, HasAvatar`; pakai `HasRoles`,
  `TwoFactorAuthenticatable`, `SoftDeletes`. Punya: approval (`is_approved`, `approved_by`, `approved_at`),
  kartu anggota (`member_card_issued_at/by`), `type`/`type_other` (jenis pengunjung). Relasi: `loans`,
  `loanDetails` (hasManyThrough), `books` (added_by), `bookmarks`, `socialmedia` (morphMany), `visits`.
  `canAccessPanel()` membatasi akses `/admin`. `findByMemberBarcode()` mencari user dari nilai barcode (= username).
- **[Book](app/Models/Book.php)** — `SoftDeletes`. Relasi: `publisher`, `language`, `addedBy` (belongsTo);
  `stock` (hasOne); `categories`/`authors`/`assets`/`types`/`bookmarks`/`loans` (m2m); `reviews` (hasManyThrough).
  Cast enum `BookStatus`, `PublishedBooks`. Atribut: `location_book`, `price`, `cover`, `isbn`, `synopsis`.
- **[Loan](app/Models/Loan.php)** — kepala transaksi peminjaman per user. `loanDetails` (hasMany), `books`
  (m2m), `returnBooks` (hasManyThrough). Status enum `LoanStatus`. `recomputeStatus()` menghitung
  loaned/partial/returned dari proporsi detail yang sudah punya `returnBook`. Berisi static helper stok
  (`substractionStock`, `addLoanStock`, `rollbacLoanStock`, dll.).
- **LoanDetail** — satu baris per buku dalam sebuah Loan (`book_id`, `loan_date`, `due_date`, `status`).
  Sebuah buku dianggap "sudah dikembalikan" jika `LoanDetail` punya relasi `returnBook`.
- **ReturnBook** → **ReturnBookCheck** (kondisi `GOOD`/`DAMAGED`/`LOST`) & **Fine**. Status enum `ReturnBookStatus`.
- **[Fine](app/Models/Fine.php)** — `late_fee + other_fee = total_fee`, `payment_status` (enum `PaymentStatus`),
  `order_id` (Midtrans). `Fine::hasUnpaidFine($userId)` memblokir peminjaman/pengembalian baru. Atribut
  virtual `user` ditelusuri lewat `returnBook.loanDetail.loan.user`.
- **Stock** — `total`, `available`, `loan`, `damaged`, `lost` per buku.
- **FineSettings** — singleton konfigurasi: `loan_duration_days`, `late_fee_per_day`, fee + tipe diskon
  (`DiscountType`: nominal/persentase) untuk kondisi rusak & hilang.
- **Lainnya** — Author, Category, Publisher, Language, Type, [Asset](app/Models/Asset.php) (file e‑resource +
  konversi PDF), Announcement (jadwal buka/tutup harian), Information, ReviewBook, Bookmark, SocialMedia,
  Visit, [RouteAccess](app/Models/RouteAccess.php).

Skema lengkap ada di [database/migrations](database/migrations) (±45 migrasi).

---

## 5. Daftar Fitur

### Sisi Publik / Anggota (Inertia + React)
- **Home** — hero, kategori, buku unggulan, popup pengumuman, FAQ, statistik.
- **Katalog** — daftar buku, kategori, penulis, penerbit + filter & pencarian.
- **Detail buku** — sinopsis, rating/review, buku rekomendasi, tombol bookmark & pinjam.
- **Bookmark** — simpan/hapus buku favorit.
- **Peminjaman digital** — konfirmasi + buat peminjaman.
- **Pembaca aset digital** — baca PDF/gambar/video buku yang sedang dipinjam (`/assets/book/{slug}`).
- **Pengembalian** — konfirmasi & proses kembali, plus tulis review buku.
- **Pembayaran denda** — Midtrans Snap (halaman success/pending/failed/cancel/error).
- **Riwayat** — riwayat peminjaman & pengembalian.
- **E‑Resources & Informasi** — halaman e‑resource dan artikel/pengumuman.
- **Profil** — edit profil, sosial media, ubah password, two‑factor.
- **Kiosk Kunjungan** — `/visit`: scan kartu / cari user / isi manual sebagai tamu.

### Sisi Admin (Filament `/admin`)
- **Resource** (15): Books, Authors, Categories, Publishers, Announcements, Information, Loans, ReturnBooks,
  Fines, FineSettings, Visits, Users, Roles, Permissions, RouteAccesses.
- **Widget** — tiap resource punya `StatsOverview` + `Chart` di header halaman List.
- **Laporan** (5 halaman) — Buku, Denda, Kunjungan, Peminjaman, Pengembalian, dengan export PDF.
- **Scan kartu anggota** — di LoanResource (buat peminjaman) & VisitResource (catat kunjungan).
- **Registrasi staf + approval** — pendaftaran staf disetujui admin via signed URL email.
- **Kartu anggota** — terbitkan & unduh PDF kartu (Code128 + QR).

---

## 6. Peta Routing

Sumber: [routes/web.php](routes/web.php), [routes/auth.php](routes/auth.php),
[routes/settings.php](routes/settings.php), [routes/console.php](routes/console.php).

### Publik (tanpa auth)
| Route | Nama | Controller |
|---|---|---|
| `GET /` | `home` | HomeController |
| `GET /book/detail/{slug}` | `book.detail` | BookController |
| `GET /catalog/books|categories|authors|publishers` (+ by‑slug) | `catalog.*` | CatalogController |
| `GET /resources` | `resource` | ResourceController |
| `GET /informations`, `/information/detail/{slug}` | `announcements.index`, `announcement.detail` | InformationController |
| `GET/POST /visit`, `/visit/scan`, `/visit/search-users`, `/visit/user/{user}` | `visit.*` | VisitFormController (throttle:30,1) |
| `POST /payments`, `/payments/callback`, `GET /payments/{state}` | `payment.*` | PaymentController (callback CSRF‑exempt) |
| `GET /assets/stream/{id}` | `assets.stream` | AssetController |

### Terproteksi
| Middleware | Route |
|---|---|
| `auth, verified` | `GET /dashboard`, `GET /history` |
| `auth` | bookmark store/destroy; `loan.confirmation/store/index/detail` |
| `auth, ensure.loan` | `book.assets` (baca aset); `return.confirmation/store/index/detail` |
| `signed` | `admin/users/{user}/approve|reject` (approval pendaftaran, `withTrashed`) |
| `auth` | `admin/users/{user}/member-card/download` |

`ensure.loan` = [EnsureUserHasActiveLoan](app/Http/Middleware/EnsureUserHasActiveLoan.php) — memastikan user
punya peminjaman aktif untuk buku tsb; jika `due_date` lewat → auto‑return + redirect "expired".

### Auth & Settings
- **auth.php** — register, login, forgot/reset password, confirm‑password, logout.
- **settings.php** — `profile.edit/update/destroy`, `social-media.*`, `password-update.*` (throttle:6,1),
  `appearance.edit`, `two-factor.show`.

### Scheduler (console.php)
- `SendLoanReminder` → setiap hari **08:00**.
- `AutoReturnExpiredLoans` → setiap hari **00:01**.

---

## 7. Otorisasi & RBAC (3 Lapis)

### Lapis 1 — Spatie Permission + Filament Shield
Roles (dari [RolePermissionSeeder](database/seeders/RolePermissionSeeder.php)): `admin`, `manager`,
`writer`, `user`, `member`.

| Role | Cakupan permission |
|---|---|
| `admin` | Semua permission |
| `manager` | Semua **kecuali** entitas Manajemen Pengguna (User/Role/Permission/RouteAccess) |
| `writer` | Hanya Katalog Buku (Book/Author/Category/Publisher) + widget buku |
| `member` / `user` | Pengguna perpustakaan (sisi publik) |

Policy per‑resource ada di [app/Policies](app/Policies). Permission dihasilkan oleh Filament Shield.

### Lapis 2 — Akses panel admin
[User::canAccessPanel()](app/Models/User.php) — hanya user dengan `is_approved = true` **dan** salah satu
role `admin`/`manager`/`writer` yang boleh masuk panel `/admin`.

### Lapis 3 — RBAC dinamis berbasis database
[DynamicRoleAndPermissionMiddleware](app/Http/Middleware/DynamicRoleAndPermissionMiddleware.php) mencocokkan
`route_name` saat ini dengan tabel `route_accesses` (kolom `role_ids` & `permission_ids` bertipe JSON, lihat
[RouteAccess](app/Models/RouteAccess.php)). Akses diizinkan jika user punya salah satu role **atau** permission
yang terdaftar untuk route tersebut. Dikelola lewat **RouteAccessResource** di panel admin — memungkinkan
mengubah hak akses route tanpa deploy ulang.

---

## 8. Panel Admin Filament

Konfigurasi: [AdminPanelProvider](app/Providers/Filament/AdminPanelProvider.php).
- Path `/admin`, brand "E‑Library Santo Lukas", warna primary **Amber**, lebar konten penuh.
- Auth lengkap: login, **registration** (`Filament\Pages\Auth\Register`), profile, password reset.
- **Navigation groups**: Katalog Buku, Peminjaman, Keuangan, Informasi, Kunjungan, Manajemen Pengguna, Laporan.
- **Auto‑discovery** Resources/Pages/Widgets dari `app/Filament`.
- Plugin **FilamentShield** (grup Manajemen Pengguna).
- **renderHook**: CSS kustom, kartu user‑menu, popup pengumuman, dan badge status buka/tutup perpustakaan
  (dihitung dari `Announcement` hari ini → jam buka/tutup).

### Struktur sebuah Resource (pola konsisten)
Tiap resource (mis. `app/Filament/Resources/Loans/`) dipecah menjadi:
```
LoanResource.php          # definisi resource + navigasi + relasi
Pages/                    # ListLoans, CreateLoan, EditLoan, ViewLoan
Schemas/                  # LoanForm (form), LoanInfolist (detail)
Tables/                   # LoansTable (kolom + filter + aksi)
Widgets/                  # LoanStatsOverview + LoanTrendChart (header List)
Concerns/                 # InteractsWithMemberScan (scan kartu)
```

### Halaman Laporan
5 halaman (`app/Filament/Pages/Laporan*.php`) berbagi trait
[BuildsLaporan](app/Filament/Pages/Concerns/BuildsLaporan.php): membentuk *bucket* periode
(harian / harian‑per‑minggu / mingguan / mingguan‑per‑bulan / bulanan), membuat **chart SVG** inline,
lalu export **PDF** via DomPDF (template di `resources/views/pdf/laporan-*.blade.php`).

---

## 9. Alur Bisnis Utama

### 9.1 Registrasi & Approval
- **Anggota publik** mendaftar lewat halaman publik → [RegisteredUserService](app/Services/RegisteredUserService.php)
  membuat user, `generateUsername()`, otomatis `assignRole('member')`, kirim event `Registered` (verifikasi email).
- **Staf** mendaftar via Filament `Register` → admin menerima `AdminApprovalRequestNotification` →
  admin mengeklik **signed URL** approve/reject di
  [UserApprovalController](app/Http/Controllers/Admin/UserApprovalController.php) →
  `User::approve()` set `is_approved`, kirim `AccountApprovedNotification`. Reject = soft delete user.

### 9.2 Peminjaman (Loan)
[LoanService::postDataLoanUserAuth()](app/Services/LoanService.php) menjalankan `validateLoan()` — **5 aturan**:
1. Buku sama tidak boleh dipinjam dua kali sebelum dikembalikan (`Loan::hasActiveLoan`).
2. Tidak boleh meminjam jika masih ada denda belum dibayar (`Fine::hasUnpaidFine`).
3. Stok harus tersedia (`Loan::checkStock`).
4. Akun harus terverifikasi email (`Loan::checkUserVerified`).
5. `FineSettings` harus terkonfigurasi (`FineSettings::checkSettings`).

Durasi pinjam = `FineSettings::loan_duration_days` (default **14** hari). Dalam `DB::transaction`: jika user
sudah punya Loan aktif → tambahkan `LoanDetail`; jika belum → buat `Loan` baru (`loan_code` via
`generateUniqueCode`). Kesalahan dilempar sebagai `BusinessException` dengan key i18n.

### 9.3 Membaca Aset Digital
Route `book.assets` dijaga `ensure.loan`. [EnsureUserHasActiveLoan](app/Http/Middleware/EnsureUserHasActiveLoan.php):
- Jika ada `LoanDetail` aktif & `due_date` **lewat** → panggil
  [DigitalAutoReturnService::autoReturn()](app/Services/DigitalAutoReturnService.php) lalu redirect dengan
  flash `access_denied = expired`.
- [AssetService](app/Services/AssetService.php): file Office (doc/xls/ppt) dikonversi ke PDF secara **async**
  via [ConnvertAssetToPdfJob](app/Jobs/ConnvertAssetToPdfJob.php) (LibreOffice headless `soffice.exe`),
  dengan status `PROCESSING → READY/FAILED` (enum `ConvertStatusTypes`). File non‑office langsung `READY`.

### 9.4 Pengembalian + Denda
[ReturnBookService::processReturnBook()](app/Services/ReturnBookService.php) dalam transaksi:
1. Hitung **lateFee** = hari telat × `late_fee_per_day`.
2. Hitung **otherFee** untuk kondisi `DAMAGED`/`LOST` — nominal atau persen dari `book.price` (lihat `DiscountType`).
3. `totalFee = lateFee + otherFee` → status `COST` jika > 0, selain itu `RETURNED`.
4. Buat `ReturnBook` + `ReturnBookCheck` (catatan kondisi) + `Fine` (jika ada biaya, `payment_status = PENDING`).
5. `LoanDetail.status = RETURNED` → `Loan::recomputeStatus()`.

Di sisi admin, trait [HandleReturnBook](app/Traits/handleReturnBook.php) menyesuaikan **stok** & **Fine**
ketika kondisi buku diubah (rollback kondisi lama → terapkan kondisi baru → hapus/hitung ulang denda).

### 9.5 Pembayaran Denda (Midtrans) — lihat §11.

### 9.6 Auto‑return & Reminder — lihat §10.

### 9.7 Kunjungan + Kartu Anggota
- **Kartu anggota** ([MemberCardService](app/Services/MemberCardService.php)): nilai barcode/QR = `username`
  (= Nomor Anggota). Menghasilkan barcode **Code128** (scanner USB) + **QR** (kamera) + logo + foto, semua
  sebagai data‑URI base64 agar konsisten di modal HTML & PDF. Diterbitkan/unduh via `MemberCardController`
  & UserResource. `User::issueMemberCard()` idempotent.
- **Kiosk publik** ([VisitFormController](app/Http/Controllers/VisitFormController.php)): `scan` →
  `User::findByMemberBarcode` → status `guest` (tak dikenal) / `rejected` (staf) / `already` (sudah hari ini,
  `Visit::recordedToday`) / `success` (buat Visit otomatis). Bisa juga cari user terdaftar atau isi manual tamu.
- **Admin** juga bisa scan kartu di LoanResource lewat trait
  [InteractsWithMemberScan](app/Filament/Resources/Loans/Concerns/InteractsWithMemberScan.php).

### 9.8 Laporan — lihat §8 (Halaman Laporan).

---

## 10. Scheduler, Jobs & Notifikasi

### Scheduler ([routes/console.php](routes/console.php))
- **[AutoReturnExpiredLoans](app/Console/Commands/AutoReturnExpiredLoans.php)** (`loan:auto-return-expired`,
  00:01) — mengembalikan otomatis semua `LoanDetail` yang lewat `due_date` & belum punya `returnBook`, lewat
  `DigitalAutoReturnService` (tanpa manipulasi stok, karena peminjaman digital).
- **[SendLoanReminder](app/Console/Commands/SendLoanReminder.php)** (`reminder:loan`, 08:00) — untuk loan
  yang jatuh tempo dalam **H‑3 / H‑1 / H‑0**, mengirim `LoanReminderNotification` (notifikasi DB/email) +
  pesan **WhatsApp**.

### Jobs
- **[ConnvertAssetToPdfJob](app/Jobs/ConnvertAssetToPdfJob.php)** — konversi file Office → PDF (LibreOffice).

### Notifikasi
- `AdminApprovalRequestNotification`, `AccountApprovedNotification`, `LoanReminderNotification` (di `app/Notifications`).
- **WhatsApp** via [WhatsAppService](app/Services/WhatsAppService.php) → API **Fonnte**
  (`https://api.fonnte.com/send`, token dari `FONNTE_TOKEN`), mengirim cover buku + caption reminder berformat.

---

## 11. Integrasi Midtrans

Kode di [PaymentController](app/Http/Controllers/PaymentController.php) (config di [config/midtrans.php](config/midtrans.php)):
- **`create`** — verifikasi kepemilikan denda (`authorizeFineOwner`), set `order_id = FINE-{id}-{time}`,
  minta **Snap token**.
- **`callback`** — endpoint notifikasi (CSRF‑exempt via `payments/*` di bootstrap). Verifikasi tanda tangan
  dengan `signatureMidtrans()` (SHA‑512). Pemetaan status:
  - `settlement` / `capture` → `Fine.payment_status = SUCCESS`, `ReturnBook.status = RETURNED`.
  - `pending` → `PENDING`, `ReturnBook = CHECKED`.
  - `expire` / `cancel` / `deny` → `FAILED`.
  - lainnya → `ERROR`.
- **Halaman hasil** — `handleSuccess/Pending/Failed/Cancel/Error` me‑render halaman Inertia `payment/*`.
- Snap.js diinject sebagai aset Filament di [AppServiceProvider::boot()](app/Providers/AppServiceProvider.php)
  (`https://app.sandbox.midtrans.com/snap/snap.js`); handler frontend di `resources/js/midtrans`.

> Status saat ini **sandbox** (`is_production = false`). Versi `MidtransService` ([app/Services/MidtransService.php](app/Services/MidtransService.php))
> menyediakan helper `getSnapToken()` setara, namun `PaymentController` mengonfigurasi Snap secara langsung.

---

## 12. Enums & Status

Berada di [app/Enums](app/Enums); banyak dipakai sebagai cast model + sumber opsi (`::options()`/`::values()`).

| Enum | Nilai |
|---|---|
| `LoanStatus` | `loaned`, `partial returned`, `returned` |
| `ReturnBookStatus` | `Dikembalikan`, `Pengecekan`, `Denda` |
| `PaymentStatus` | `PENDING`, `SUCCESS`, `FAILED`, `ERROR` (label Bahasa Indonesia) |
| `ConvertStatusTypes` | `Processing`, `Ready`, `Failed` (konversi PDF aset) |
| `BookCondition` | `GOOD`, `DAMAGED`, `LOST` |
| `DiscountType` | nominal / persentase (perhitungan denda rusak/hilang) |
| Lainnya | `BookStatus`, `BookType`, `BookLanguage`, `PublishedBooks`, `UserType`, `UserGender`, `Days`, `MessageType`, `SocialMedia`, `AssetTypes`, `LoanBookStatus` |

---

## 13. Konvensi & Catatan untuk Kontributor Baru

**Alur menambah fitur publik baru (mengikuti pola yang ada):**
1. Buat **Interface** di `app/Interface/`, **Repository** di `app/Repositories/`, daftarkan binding di
   [AppServiceProvider::register()](app/Providers/AppServiceProvider.php).
2. Buat **Service** (logika + validasi + transaksi) yang inject interface tersebut.
3. Buat **Controller** tipis yang inject Service, kembalikan `Inertia::render` / JSON.
4. Buat **API Resource** di `app/Http/Resources/` dan gunakan helper `transformData()`.
5. Daftarkan **route** di [routes/web.php](routes/web.php) dengan middleware yang sesuai.
6. Lempar error domain via `BusinessException` (key i18n) — di‑render JSON `{message, context}` oleh
   [bootstrap/app.php](bootstrap/app.php), lalu diterjemahkan di frontend.

**Alur menambah resource admin baru:** ikuti struktur folder Filament (Resource + Pages + Schemas + Tables +
Widgets), pasang `StatsOverview` + `Chart` di header List (pola seluruh resource), atur navigasi ke salah satu
navigation group, dan tambahkan policy bila perlu.

**Konvensi penting:**
- Kode unik entitas dibuat dengan `generateUniqueCode($prefix, Model::class, $field)` (prefix `SAINT-LUKE-LIBRARY-…`).
- Tanggal memakai `CarbonImmutable` (diset di `AppServiceProvider`).
- Di produksi: `DB::prohibitDestructiveCommands()` aktif & aturan password ketat (min 12, mixed, uncompromised).
- Linting: `composer lint` (Pint). Test: `composer test` (Pest) — lihat `tests/`.
- Menjalankan dev: `composer dev` (server + queue + vite). Konversi aset Office butuh **LibreOffice** terpasang
  (path di [ConnvertAssetToPdfJob](app/Jobs/ConnvertAssetToPdfJob.php)).

**Hal yang perlu diperhatikan (potensi kebingungan):**
- "Sudah dikembalikan" ditentukan oleh **ada/tidaknya relasi `returnBook`** pada `LoanDetail`, bukan kolom status.
- Stok dikelola lewat static method di `Loan` & `ReturnBookCheck`; auto‑return digital **tidak** mengubah stok.
- Ada dua jalur perhitungan denda yang harus tetap selaras: `ReturnBookService` (pengembalian via web) dan
  trait `HandleReturnBook` (perubahan kondisi via admin).
- Sebagian binding/komentar masih menyisakan kode lama yang dinonaktifkan (mis. callback Midtrans versi lama) —
  acuan kebenaran adalah blok aktif.
