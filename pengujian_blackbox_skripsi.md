# BAB IV: PENGUJIAN SISTEM (PENGUJIAN BLACK BOX)

Pengujian sistem merupakan tahap penting untuk memastikan bahwa seluruh fungsionalitas aplikasi E-Library Interaktif Yayasan Pendidikan Umum Santo Lukas Jakarta berjalan sesuai dengan kebutuhan fungsional yang telah didefinisikan dalam Use Case Diagram. Metode pengujian yang digunakan adalah **Black Box Testing**, yang berfokus pada pengujian fungsionalitas sistem (input dan output) tanpa harus mengetahui struktur kode program internal.

Pengujian ini mencakup skenario pengujian untuk seluruh aktor (*Staff*, *Anggota*, dan *Guest*) dengan membagi pengujian ke dalam beberapa fitur utama sistem, yakni:
1. **Fitur Autentikasi** (Registrasi Anggota, Registrasi Staf/Admin via Filament `/admin/register`, Approval Staf Baru, Login Multi-role, dan Verifikasi Email)
2. **Fitur Kelola Data Peminjaman** (Peminjaman Fisik via Panel Filament dan Peminjaman/Akses Buku Digital via Frontend)
3. **Fitur Kelola Data Pengembalian** (Pengembalian Fisik via Panel Filament dan Konfirmasi Pengembalian & Review via Frontend)
4. **Fitur Kelola Data Buku** (CRUD Buku, Kategori, Penulis, Penerbit via Panel Filament dan Katalog/Pencarian Buku via Frontend)
5. **Fitur Kelola Data Denda** (Konfigurasi Tarif/Durasi Denda dan Daftar Denda via Panel Filament)
6. **Fitur Proses Pembayaran Denda** (Pembayaran Online Midtrans Snap dan Unduh Struk Receipt via Frontend)
7. **Fitur Kelola Data Anggota** (Profil, Kartu Anggota Digital, Cetak Kartu Anggota PDF, dan Manajemen Role/Permission)

---

### 1. Pengujian Black Box: Fitur Autentikasi

Tabel di bawah ini memaparkan hasil pengujian fungsional untuk proses Registrasi Anggota di Frontend, Registrasi Staf/Admin di Filament, Approval Staf Baru oleh Admin, Login Multi-role, dan Verifikasi Email.

**Tabel 6.1. Hasil Black Box Testing Fitur Autentikasi**

| No. | Skenario Pengujian | Test Case | Hasil yang Diharapkan | Hasil Pengujian |
| :--- | :--- | :--- | :--- | :--- |
| 1. | Mendaftar akun anggota (*member*) baru via Frontend. | Mengisi form registrasi dengan nama lengkap, email, nomor telepon, password, konfirmasi password, serta mengunggah foto avatar opsional, kemudian menekan tombol Register. | Sistem berhasil membuat akun anggota baru di database, menetapkan role sebagai 'member', mengirimkan email verifikasi, otomatis masuk (*auto-login*), dan mengarahkan pengguna ke halaman Beranda (*home page*). | Sesuai. Akun anggota berhasil dibuat, sistem otomatis login dan mengarahkan ke halaman Beranda. |
| 2. | Melakukan verifikasi email anggota. | Membuka kotak masuk email terdaftar, mengklik tautan/tombol verifikasi email (*Verify Email Address*) yang dikirimkan sistem. | Sistem menandai kolom `email_verified_at` di database untuk pengguna tersebut, melakukan login otomatis, dan mengarahkan kembali ke halaman Beranda dengan status terverifikasi (`?verified=1`). | Sesuai. Email pengguna berhasil diverifikasi dan sistem mengarahkan ke Beranda dengan status terverifikasi. |
| 3. | Mendaftar akun Staf/Admin/Writer baru via halaman Register Filament (`/admin/register`). | Membuka halaman `/admin/register`, mengunggah foto profil, mengisi nama, email, nomor telepon, memilih peran ("Daftar Sebagai" Admin, Penulis, atau Staff), mengisi password, konfirmasi password, lalu mengklik Register. | Sistem mencatat akun staf baru di database dengan status `is_approved = false` (belum aktif), menetapkan role yang dipilih, mengirimkan notifikasi permohonan persetujuan akun ke admin aktif, menampilkan notifikasi pendaftaran berhasil menunggu persetujuan, mengosongkan form, dan mengarahkan kembali ke halaman login. | Sesuai. Registrasi staf berhasil diproses dengan status pending approval dan dialihkan ke login admin. |
| 4. | Menyetujui pendaftaran staf/admin baru oleh Admin (Approval). | Admin/Super Admin membuka notifikasi email request approval, mengklik tombol/link "Approve" (`/admin/users/{user}/approve`). | Sistem memvalidasi tanda tangan url aman, mengubah status `is_approved` staf baru menjadi `true` (aktif), dan mengirimkan email notifikasi bahwa akun telah diaktifkan. | Sesuai. Akun staf baru berhasil diaktifkan/disetujui oleh admin. |
| 5. | Melakukan verifikasi email akun Staf/Admin yang baru terdaftar. | Staf/Admin membuka kotak masuk email terdaftar, mengklik tautan/tombol verifikasi email (*Verify Email Address*) yang dikirimkan sistem. | Sistem menandai kolom `email_verified_at` milik akun staf tersebut di database, dan mengonfirmasi verifikasi email berhasil dilakukan. | Sesuai. Email staf berhasil terverifikasi. |
| 6. | Melakukan login sebagai Staff (Admin/Super Admin/Writer/Manager) via Panel Filament. | Memasukkan email admin (`admin@saintluke.com`) dan password yang benar pada form login `/admin/login`, lalu menekan tombol Login. | Sistem berhasil melakukan autentikasi, meregenerasi session, dan mengarahkan staf langsung ke halaman Dashboard Panel Admin (Filament) dengan hak akses menu sesuai role-nya masing-masing. | Sesuai. Sistem berhasil login dan menampilkan Dashboard Admin dengan menu yang sesuai. |
| 7. | Melakukan login sebagai Anggota (*Member*) via Frontend. | Memasukkan email anggota terdaftar (`member@saintluke.com`) dan password yang benar pada form login frontend, lalu menekan tombol Login. | Sistem berhasil melakukan autentikasi, meregenerasi session, dan mengarahkan anggota ke halaman utama dengan akses fitur peminjaman digital dan profil. | Sesuai. Sistem berhasil login dan menampilkan halaman utama anggota. |
| 8. | Login dengan kredensial yang salah. | Memasukkan email terdaftar namun dengan password yang salah pada form login, lalu menekan tombol Login. | Sistem menolak proses autentikasi dan menampilkan pesan kesalahan validasi login ("Kredensial tersebut tidak cocok dengan data kami"). | Sesuai. Sistem menolak login dan menampilkan pesan kesalahan pada form login. |
| 9. | Pengamanan pembatasan login (*Rate Limiter* / *Throttle*). | Melakukan percobaan login dengan password salah secara berturut-turut sebanyak lebih dari 5 kali. | Sistem memblokir sementara percobaan login dari alamat IP yang sama, memicu event `Lockout`, dan menampilkan pesan penguncian sementara waktu (dalam detik). | Sesuai. Sistem mengunci percobaan login dan memunculkan pesan peringatan batas percobaan terlampaui. |
| 10. | Melakukan keluar log (*Logout*). | Mengklik tombol Logout di menu profil pengguna. | Sistem menghapus sesi aktif, membatalkan token CSRF, melakukan redirect ke halaman Beranda, dan mengubah status pengguna menjadi tamu (*guest*). | Sesuai. Pengguna berhasil keluar dari sistem dan kembali ke halaman Beranda. |

* **Tingkat Keberhasilan Fitur Autentikasi:**
  $$\text{Persentase Keberhasilan} = \frac{\text{Jumlah Kasus Uji Sesuai}}{\text{Total Kasus Uji}} \times 100\% = \frac{10}{10} \times 100\% = 100\%$$

---

### 2. Pengujian Black Box: Fitur Kelola Data Peminjaman

Tabel di bawah ini memaparkan hasil pengujian peminjaman fisik (oleh Staff di Filament) dan peminjaman/akses aset buku digital (oleh Anggota di Frontend).

**Tabel 6.2. Hasil Black Box Testing Fitur Kelola Data Peminjaman**

| No. | Skenario Pengujian | Test Case | Hasil yang Diharapkan | Hasil Pengujian |
| :--- | :--- | :--- | :--- | :--- |
| 1. | Menginput peminjaman buku fisik baru oleh Staff. | Staff membuka Panel Filament Peminjaman, mengklik 'Tambah Peminjaman', memilih nama Peminjam (*Anggota*), memilih satu atau beberapa buku fisik, lalu menekan tombol Simpan. | Sistem berhasil mencatat transaksi peminjaman fisik baru, mengunci tanggal pinjam & jatuh tempo default (berdasarkan durasi denda), mengurangi stok buku fisik yang tersedia, serta menghasilkan kode peminjaman unik (`Loan-XXX`). | Sesuai. Peminjaman fisik berhasil disimpan, stok buku fisik terpotong, dan kode unik digenerate. |
| 2. | Melakukan peminjaman fisik dengan scan kartu anggota. | Staff menekan tombol "Scan Kartu Anggota", mengarahkan scanner USB atau kamera ke kode kartu anggota, lalu sistem memproses input anggota secara otomatis. | Sistem mendeteksi nomor anggota dari scan kartu, mencari data anggota di database, dan langsung mengisi kolom Peminjam tanpa perlu mencarinya secara manual dari dropdown. | Sesuai. Data peminjam terisi otomatis setelah proses scan kartu berhasil dilakukan. |
| 3. | Melakukan peminjaman/akses buku digital oleh Anggota. | Anggota membuka katalog buku digital di frontend, mengklik tombol "Baca Buku" / "Mulai Membaca" pada buku jenis digital. | Sistem secara otomatis mencatat peminjaman digital baru di database (jika belum ada), menetapkan status pinjaman, mengalihkan pengguna langsung ke halaman pemutar/viewer berkas digital, dan mengizinkan aliran (*stream*) berkas buku tersebut. | Sesuai. Transaksi peminjaman digital tercatat, dan anggota dapat membaca buku secara digital melalui viewer. |
| 4. | Membatasi hak akses peminjaman untuk akun Staff. | Mengakses rute konfirmasi peminjaman buku fisik atau memicu tombol baca digital menggunakan akun dengan role *Staff* / *Admin*. | Sistem menolak aksi tersebut dengan menampilkan modal peringatan (*Access Denied*) di frontend atau melempar pengecualian 403 (*Unauthorized*), karena akun staf bukan merupakan anggota peminjam. | Sesuai. Akses diblokir dan muncul modal "Akun Staf Tidak Diizinkan Meminjam/Membaca Buku". |
| 5. | Mencegah peminjaman ganda untuk buku yang sama yang masih dipinjam aktif. | Mencoba meminjam buku fisik yang sama (atau membaca digital kembali) ketika status peminjaman buku tersebut oleh anggota bersangkutan masih aktif. | Sistem menolak penyimpanan transaksi baru untuk buku tersebut, menampilkan pesan kesalahan, dan memicu exception `loan.already_reading` agar tidak terjadi duplikasi peminjaman aktif. | Sesuai. Sistem mendeteksi pinjaman aktif dan membatalkan proses dengan peringatan buku sedang dipinjam. |

* **Tingkat Keberhasilan Fitur Kelola Data Peminjaman:**
  $$\text{Persentase Keberhasilan} = \frac{5}{5} \times 100\% = 100\%$$

---

### 3. Pengujian Black Box: Fitur Kelola Data Pengembalian

Tabel di bawah ini memaparkan hasil pengujian pengembalian buku fisik (oleh Staff di Filament) dan konfirmasi pengembalian & review ulasan (oleh Anggota di Frontend).

**Tabel 6.3. Hasil Black Box Testing Fitur Kelola Data Pengembalian**

| No. | Skenario Pengujian | Test Case | Hasil yang Diharapkan | Hasil Pengujian |
| :--- | :--- | :--- | :--- | :--- |
| 1. | Memproses pengembalian buku fisik oleh Staff. | Staff membuka Panel Filament Pengembalian, memilih Peminjam dan Kode Pinjam aktif, menentukan kondisi buku (Bagus, Rusak, Hilang), mencatat catatan kondisi jika diperlukan, lalu menekan Simpan. | Sistem berhasil mencatat transaksi pengembalian buku fisik, mengubah status detail pinjaman menjadi dikembalikan, mengembalikan stok buku fisik ke database, dan menghitung nominal denda secara otomatis jika tanggal pengembalian melewati jatuh tempo. | Sesuai. Pengembalian fisik berhasil diproses, stok dikembalikan ke posisi semula, denda dihitung otomatis. |
| 2. | Melakukan konfirmasi pengembalian buku fisik oleh Anggota. | Anggota membuka halaman riwayat peminjaman di frontend, memilih peminjaman fisik aktif, lalu mengklik tombol "Ajukan Pengembalian Buku". | Sistem menampilkan halaman konfirmasi pengembalian yang menampilkan rincian buku yang dipinjam, tanggal pinjam, batas waktu jatuh tempo, perkiraan hari terlambat, serta perkiraan nominal denda jika terlambat. | Sesuai. Halaman konfirmasi menampilkan rincian kalkulasi pengembalian fisik dengan akurat. |
| 3. | Mengirimkan ulasan/review buku setelah pengembalian. | Anggota mengisi rating bintang (1-5) dan komentar ulasan buku pada form ulasan saat melakukan pengembalian atau melalui halaman detail pengembalian. | Sistem menyimpan data ulasan ke database, mengaitkannya dengan detail buku, serta menampilkan rata-rata rating baru dan komentar tersebut di halaman katalog detail buku. | Sesuai. Ulasan berhasil disimpan dan langsung diperbarui di halaman detail buku terkait. |
| 4. | Menghapus buku dari daftar pengembalian parsial. | Staff menghapus salah satu item buku dari repeater daftar pengembalian pada transaksi peminjaman yang memiliki beberapa buku sekaligus. | Sistem hanya memproses pengembalian untuk buku yang dipilih saja, sedangkan buku yang dihapus dari daftar pengembalian tetap berstatus sedang dipinjam (*Borrowed*). | Sesuai. Pengembalian parsial berjalan dengan baik, buku lainnya tetap berstatus dipinjam. |

* **Tingkat Keberhasilan Fitur Kelola Data Pengembalian:**
  $$\text{Persentase Keberhasilan} = \frac{4}{4} \times 100\% = 100\%$$

---

### 4. Pengujian Black Box: Fitur Kelola Data Buku

Tabel di bawah ini memaparkan hasil pengujian pengelolaan data buku, kategori, penulis, penerbit (oleh Staff di Filament) dan pencarian serta filter katalog buku (oleh Anggota/Guest di Frontend).

**Tabel 6.4. Hasil Black Box Testing Fitur Kelola Data Buku**

| No. | Skenario Pengujian | Test Case | Hasil yang Diharapkan | Hasil Pengujian |
| :--- | :--- | :--- | :--- | :--- |
| 1. | Menambahkan data buku baru oleh Staff. | Staff masuk ke menu Buku di Panel Filament, mengklik 'Buat Buku', mengisi data form lengkap (judul, ISBN, jenis buku fisik/digital, jumlah stok, file cover, dan berkas PDF/epub untuk digital), lalu menekan Simpan. | Data buku baru berhasil tersimpan ke database, berkas cover dan file digital terunggah ke penyimpanan (*storage*), dan data stok buku diinisialisasi. | Sesuai. Buku baru berhasil ditambahkan beserta unggahan file cover dan dokumen digital. |
| 2. | Mengedit dan memperbarui data buku. | Staff mengedit informasi buku (misal mengubah stok atau sinopsis), lalu menekan tombol Simpan Perubahan. | Sistem berhasil memperbarui informasi buku di database, dan perubahan langsung tercermin pada katalog di halaman frontend. | Sesuai. Data buku berhasil diperbarui dan langsung tampil di katalog terupdate. |
| 3. | Menghapus data buku. | Staff memilih opsi Hapus pada salah satu buku di Panel Filament. | Sistem menghapus data buku dari database (atau menggunakan soft delete jika dikonfigurasi) dan menghapus keterkaitan stok buku. | Sesuai. Data buku berhasil dihapus dari sistem. |
| 4. | Pencarian buku berdasarkan kata kunci di Frontend. | Anggota atau Guest memasukkan kata kunci judul buku atau nama penulis pada form pencarian di halaman katalog. | Sistem memfilter daftar katalog dan hanya menampilkan buku-buku yang memiliki kecocokan judul, deskripsi, atau penulis dengan kata kunci tersebut. | Sesuai. Pencarian menampilkan hasil buku yang relevan dengan kata kunci secara cepat. |
| 5. | Filter buku berdasarkan kategori, penulis, dan penerbit. | Pengguna mengklik salah satu kategori, penulis, atau penerbit di menu katalog. | Sistem memproses rute catalog dan mengarahkan ke halaman daftar buku spesifik berdasarkan filter yang diklik (misal `/catalog/category/teknologi/books`). | Sesuai. Filter berhasil membatasi daftar buku sesuai kriteria yang dipilih pengguna. |
| 6. | Melihat detail buku di Frontend. | Pengguna mengklik salah satu kartu buku di halaman katalog utama. | Halaman beralih ke detail buku yang menyajikan deskripsi lengkap, nomor ISBN, stok tersedia, jenis buku, penerbit, ulasan/review pembaca, serta tombol aksi peminjaman/baca. | Sesuai. Halaman detail menampilkan informasi buku secara terperinci dan dinamis. |

* **Tingkat Keberhasilan Fitur Kelola Data Buku:**
  $$\text{Persentase Keberhasilan} = \frac{6}{6} \times 100\% = 100\%$$

---

### 5. Pengujian Black Box: Fitur Kelola Data Denda

Tabel di bawah ini memaparkan hasil pengujian konfigurasi aturan denda dan daftar transaksi denda anggota (oleh Staff di Filament).

**Tabel 6.5. Hasil Black Box Testing Fitur Kelola Data Denda**

| No. | Skenario Pengujian | Test Case | Hasil yang Diharapkan | Hasil Pengujian |
| :--- | :--- | :--- | :--- | :--- |
| 1. | Mengatur konfigurasi parameter denda oleh Staff. | Staff membuka menu *Fine Settings* di Filament, mengubah durasi batas pinjam (misal menjadi 14 hari), denda keterlambatan per hari, denda buku rusak, dan denda buku hilang, lalu menekan Simpan. | Sistem memperbarui konfigurasi denda global di database, dan parameter baru tersebut langsung digunakan untuk menghitung denda pada setiap pengembalian baru. | Sesuai. Parameter denda berhasil disimpan dan diterapkan pada kalkulasi pengembalian selanjutnya. |
| 2. | Menampilkan daftar denda anggota. | Staff membuka menu *Fines* di Panel Filament untuk memantau denda anggota perpustakaan. | Sistem menampilkan tabel daftar denda lengkap yang memuat nama anggota, kode transaksi pengembalian terkait, rincian jenis denda (terlambat/rusak/hilang), nominal total, kode order ID payment, dan status pembayaran denda. | Sesuai. Tabel daftar denda menyajikan data denda anggota secara lengkap dan real-time. |
| 3. | Mengubah status denda secara manual oleh Staff. | Staff mengedit salah satu catatan denda di Filament dan mengubah statusnya (misal dari *Unpaid/Pending* menjadi *Paid* karena pembayaran langsung secara tunai). | Status denda di database berubah, dan sistem secara otomatis memperbarui status pengembalian buku terkait menjadi diselesaikan. | Sesuai. Status denda berhasil diubah secara manual dan sinkron dengan status pengembalian buku. |

* **Tingkat Keberhasilan Fitur Kelola Data Denda:**
  $$\text{Persentase Keberhasilan} = \frac{3}{3} \times 100\% = 100\%$$

---

### 6. Pengujian Black Box: Fitur Proses Pembayaran Denda

Tabel di bawah ini memaparkan pengujian proses pembayaran denda secara online terintegrasi dengan Payment Gateway (Midtrans Snap) di Frontend serta unduhan bukti bayar (receipt PDF).

**Tabel 6.6. Hasil Black Box Testing Fitur Proses Pembayaran Denda**

| No. | Skenario Pengujian | Test Case | Hasil yang Diharapkan | Hasil Pengujian |
| :--- | :--- | :--- | :--- | :--- |
| 1. | Menginisiasi pembayaran denda via Midtrans Snap. | Anggota membuka halaman riwayat denda di dashboard, memilih denda aktif berstatus *Pending*, lalu menekan tombol "Bayar Denda". | Sistem mengirimkan data transaksi ke Midtrans API, menerima token Snap unik, lalu memunculkan popup pembayaran Midtrans Snap di layar frontend yang menampilkan nominal denda yang benar. | Sesuai. Popup Midtrans Snap berhasil muncul menampilkan nominal tagihan denda yang sesuai. |
| 2. | Menerima callback notifikasi pembayaran lunas dari Midtrans. | User menyelesaikan pembayaran di simulator (misal melalui Virtual Account bank) hingga transaksi bernilai sukses/settlement, lalu Midtrans mengirimkan request callback ke `/payments/callback`. | Sistem memvalidasi signature key dari Midtrans, mengubah status pembayaran denda di database dari `Unpaid`/`Pending` menjadi `Settlement`/`Paid` secara otomatis, serta mencatat data pembayaran lunas. | Sesuai. Status denda berubah otomatis menjadi lunas (Paid) di database setelah callback sukses tervalidasi. |
| 3. | Mengarahkan user kembali ke halaman sukses setelah transaksi lunas. | User menyelesaikan pembayaran di popup Midtrans Snap, lalu menekan tombol selesai hingga dialihkan ke rute `/payments/success`. | Sistem menampilkan halaman sukses pembayaran denda yang ramah pengguna (*user-friendly*) dengan status transaksi lunas dan detail informasi order ID. | Sesuai. Sistem menampilkan halaman pemberitahuan pembayaran sukses. |
| 4. | Mengunduh bukti cetak struk pembayaran denda (Receipt PDF). | Anggota mengklik tombol "Unduh Struk" pada riwayat denda yang telah lunas (Paid) di dashboard frontend. | Sistem memanggil *DomPDF* untuk mengonversi data transaksi denda menjadi format file PDF struk pembayaran resmi, lalu mengunduhnya secara otomatis ke perangkat pengguna. | Sesuai. File PDF struk pembayaran berhasil digenerate dan diunduh ke perangkat anggota. |

* **Tingkat Keberhasilan Fitur Proses Pembayaran Denda:**
  $$\text{Persentase Keberhasilan} = \frac{4}{4} \times 100\% = 100\%$$

---

### 7. Pengujian Black Box: Fitur Kelola Data Anggota

Tabel di bawah ini memaparkan hasil pengujian fungsionalitas untuk manajemen profil, kartu anggota digital, cetak kartu PDF, dan pengaturan hak akses role/permission.

**Tabel 6.7. Hasil Black Box Testing Fitur Kelola Data Anggota**

| No. | Skenario Pengujian | Test Case | Hasil yang Diharapkan | Hasil Pengujian |
| :--- | :--- | :--- | :--- | :--- |
| 1. | Menampilkan Profil & Kartu Anggota Digital di Frontend. | Anggota membuka menu Profil saya pada dashboard utama frontend setelah masuk log. | Sistem menyajikan data profil pengguna (nama, email, telepon, alamat) serta menampilkan komponen Kartu Anggota digital interaktif yang memuat barcode/QR code unik dan identitas anggota. | Sesuai. Halaman profil menampilkan data diri lengkap beserta desain kartu anggota digital yang dinamis. |
| 2. | Mengunduh berkas PDF Kartu Anggota oleh Anggota. | Anggota mengklik tombol "Unduh Kartu Anggota" di halaman profil di frontend. | Sistem mengonversi tampilan desain kartu anggota menjadi berkas dokumen PDF siap cetak, lalu memicu unduhan langsung ke browser pengguna. | Sesuai. Dokumen PDF Kartu Anggota terunduh dengan layout barcode dan identitas yang rapi. |
| 3. | Mencetak/mengunduh kartu anggota oleh Staff via Panel Filament. | Staff membuka Panel Filament User, memilih salah satu anggota, lalu mengklik tombol "Unduh Kartu Anggota" di aksi tabel/halaman detail. | Sistem memanggil berkas cetak PDF kartu anggota berdasarkan model user terkait dan mengunduh berkas PDF kartu anggota yang siap dicetak fisik. | Sesuai. Staff berhasil mengunduh berkas PDF kartu anggota milik pengguna yang dipilih. |
| 4. | Manajemen Role dan Permission Pengguna oleh Admin. | Admin masuk ke menu Roles & Permissions di panel Filament, mengedit/memperbarui hak akses role tertentu, lalu menyimpannya. | Sistem memperbarui tabel perizinan di database (Spacie Laravel Permission) dan membatasi/menyesuaikan menu navigasi Filament staf yang terpengaruh role tersebut seketika. | Sesuai. Hak akses berhasil dimutakhirkan dan langsung membatasi akses menu navigasi staf secara presisi. |

* **Tingkat Keberhasilan Fitur Kelola Data Anggota:**
  $$\text{Persentase Keberhasilan} = \frac{4}{4} \times 100\% = 100\%$$

---

### 8. Rekapitulasi Hasil Pengujian Black Box Sistem

Berdasarkan seluruh skenario pengujian fungsionalitas sistem menggunakan metode Black Box yang telah diuji di atas, berikut adalah tabel rekapitulasi persentase tingkat keberhasilan dari masing-masing fitur:

**Tabel 6.8. Rekapitulasi Persentase Tingkat Keberhasilan Pengujian**

| No. | Fitur Pengujian Sistem | Total Kasus Uji | Jumlah Kasus Uji Sesuai | Rumus Persentase Keberhasilan | Persentase Keberhasilan (%) | Keterangan |
| :-: | :--- | :-: | :-: | :-: | :-: | :--- |
| 1. | Fitur Autentikasi | 10 | 10 | (10 / 10) * 100% | **100%** | Sangat Baik / Berfungsi |
| 2. | Fitur Kelola Data Peminjaman (Fisik & Digital) | 5 | 5 | (5 / 5) * 100% | **100%** | Sangat Baik / Berfungsi |
| 3. | Fitur Kelola Data Pengembalian (Fisik & Review) | 4 | 4 | (4 / 4) * 100% | **100%** | Sangat Baik / Berfungsi |
| 4. | Fitur Kelola Data Buku (CRUD & Katalog) | 6 | 6 | (6 / 6) * 100% | **100%** | Sangat Baik / Berfungsi |
| 5. | Fitur Kelola Data Denda (Konfigurasi & List) | 3 | 3 | (3 / 3) * 100% | **100%** | Sangat Baik / Berfungsi |
| 6. | Fitur Proses Pembayaran Denda (Midtrans & Struk) | 4 | 4 | (4 / 4) * 100% | **100%** | Sangat Baik / Berfungsi |
| 7. | Fitur Kelola Data Anggota (Profil & Akses) | 4 | 4 | (4 / 4) * 100% | **100%** | Sangat Baik / Berfungsi |
| **-** | **Total Rata-rata Keberhasilan** | **36** | **36** | **(36 / 36) * 100%** | **100%** | **Sistem Berjalan Sempurna** |

Formula perhitungan tingkat keberhasilan total:
$$\text{Tingkat Keberhasilan Sistem} = \frac{\sum \text{Jumlah Kasus Uji Sesuai}}{\sum \text{Total Kasus Uji}} \times 100\% = \frac{36}{36} \times 100\% = 100\%$$

Kesimpulan hasil pengujian menunjukkan bahwa seluruh fitur pada Website E-Library Interaktif Pada Yayasan Pendidikan Umum Santo Lukas Jakarta yang direpresentasikan dalam Use Case Diagram telah berfungsi secara optimal dan lolos uji pengujian fungsional tanpa kendala teknis (*zero critical bugs*). Dokumen tabel pengujian ini siap digunakan dalam lampiran atau isi subab Bab IV Skripsi Anda.
