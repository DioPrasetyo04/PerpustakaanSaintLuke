<img width="512" height="512" alt="image" src="https://github.com/user-attachments/assets/8776837e-2ffc-4487-ad6a-e2a1338760dd" />

# Perpustakaan Santo Lukas (E-Library)


Aplikasi perpustakaan digital sekolah berbasis **Laravel 12 + Filament 5 (admin) + React/Inertia (frontend publik)**. Fitur inti: katalog buku (fisik & digital), peminjaman online, kartu anggota berbarcode, reminder & auto-return otomatis, pembayaran denda (Midtrans), notifikasi email + WhatsApp (Fonnte), login Google, laporan PDF, dan konversi dokumen Office → PDF (LibreOffice).

Dokumen ini berisi panduan **lengkap** dari instalasi lokal, konfigurasi semua kredensial, sampai deploy ke server (fokus **cPanel**) agar berjalan tanpa error.

---

## Daftar Isi

1. [Ringkasan Fitur & Logika Bisnis](#1-ringkasan-fitur--logika-bisnis)
2. [Kebutuhan Sistem (Requirements)](#2-kebutuhan-sistem-requirements)
3. [Instalasi & Setup Lokal (Windows + Laragon)](#3-instalasi--setup-lokal-windows--laragon)
4. [Konfigurasi `.env` & Kredensial](#4-konfigurasi-env--kredensial)
5. [Setup LibreOffice / soffice (Konversi PDF)](#5-setup-libreoffice--soffice-konversi-pdf)
6. [Scheduler & Queue Worker (Reminder + Auto-Return)](#6-scheduler--queue-worker-reminder--auto-return)
7. [Menjalankan Program (Lokal & Produksi)](#7-menjalankan-program-lokal--produksi)
8. [Export & Import Database MySQL](#8-export--import-database-mysql)
9. [Deploy ke cPanel (Langkah demi Langkah)](#9-deploy-ke-cpanel-langkah-demi-langkah)
10. [Checklist Verifikasi Pasca-Deploy](#10-checklist-verifikasi-pasca-deploy)
11. [Troubleshooting](#11-troubleshooting)

---

## 1. Ringkasan Fitur & Logika Bisnis

Memahami fitur penting agar setup kredensial tidak ada yang terlewat.

| Modul | Penjelasan | Dependensi eksternal |
|---|---|---|
| **Katalog & Buku** | Buku fisik dan digital. Buku digital wajib punya aset (PDF/Office) untuk dibaca online. | LibreOffice (konversi Office→PDF) |
| **Peminjaman (Loan)** | Anggota meminjam buku via frontend. Buku digital punya `due_date`; fisik dikembalikan manual oleh staf. Scan barcode kartu anggota saat peminjaman. | — |
| **Kartu Anggota** | Kartu ber-barcode (Code128) + QR = `username`, bisa diunduh PDF. | dompdf, php-barcode-generator, endroid/qr-code |
| **Reminder Peminjaman** | Email + WhatsApp otomatis saat sisa H-3, H-1, dan hari-H jatuh tempo. Dedup harian via cache. | SMTP (email), Fonnte (WhatsApp), **Scheduler + Queue** |
| **Auto-Return** | Peminjaman **digital** yang lewat jatuh tempo dikembalikan otomatis (tanpa ubah stok). | **Scheduler** |
| **Denda (Fines)** | Perhitungan denda keterlambatan + pembayaran online. | Midtrans |
| **Notifikasi** | Email transaksional (verifikasi, reset password, persetujuan admin, reminder) & WhatsApp. | SMTP, Fonnte |
| **Login Google** | OAuth Google (akun sengaja dibuat unverified). | Google OAuth (Socialite) |
| **Admin (Filament)** | Panel staf: kelola buku, anggota, peminjaman, laporan, struktur organisasi, dsb. Role via filament-shield / spatie-permission. | — |
| **Laporan PDF** | 5 laporan dompdf yang sudah dioptimasi hemat memori. | dompdf |
| **Cache Query** | Cache Redis (predis) untuk Beranda/Katalog dengan invalidasi tag. | Redis (opsional; fallback aman) |

**Komponen yang WAJIB jalan terus-menerus di produksi:**
- **Scheduler** (`schedule:run` tiap menit) → memicu reminder & auto-return per jam.
- **Queue Worker** (`queue:work`) → mengirim email reminder (notifikasi `ShouldQueue`) & konversi PDF (job).

> WhatsApp dikirim sinkron dari command → tidak butuh worker. Email & konversi PDF butuh worker (atau `QUEUE_CONNECTION=sync` di shared hosting).

---

## 2. Kebutuhan Sistem (Requirements)

| Komponen | Versi minimum | Catatan |
|---|---|---|
| **PHP** | 8.2+ (disarankan 8.3) | Ekstensi: `bcmath`, `ctype`, `curl`, `dom`, `fileinfo`, `gd`/`imagick`, `intl`, `mbstring`, `openssl`, `pdo`, `pdo_mysql`, `tokenizer`, `xml`, `zip`, `exec` (untuk LibreOffice) |
| **Composer** | 2.x | |
| **Node.js** | 20+ | Untuk build aset frontend (Vite) |
| **MySQL / MariaDB** | MySQL 8 / MariaDB 10.4+ | DB utama |
| **LibreOffice** | terbaru | Konversi Office (docx/pptx/xlsx) → PDF |
| **Redis** | opsional | Cache query; jika tidak ada, kode fail-safe |
| **Web server** | Apache / Nginx | cPanel = Apache |

Library PHP utama (dari `composer.json`): Filament 5, filament-shield, spatie/laravel-permission, laravel/fortify, laravel/socialite, barryvdh/laravel-dompdf, intervention/image, endroid/qr-code, picqer/php-barcode-generator, midtrans/midtrans-php, predis/predis, inertiajs/inertia-laravel.

---

## 3. Instalasi & Setup Lokal (Windows + Laragon)

```powershell
# 1. Clone & masuk folder (di Laragon: C:\laragon\www\)
git clone <repo-url> perpustakaan-saint-luke
cd C:\laragon\www\perpustakaan-saint-luke

# 2. Install dependency PHP
composer install

# 3. Install dependency JS
npm install

# 4. Siapkan file environment
copy .env.example .env
php artisan key:generate

# 5. Buat database kosong (via HeidiSQL/phpMyAdmin Laragon), lalu set di .env
#    DB_DATABASE=Saint_Luke_Library  (sesuaikan)

# 6. Migrasi + seeder
php artisan migrate --seed

# 7. Symlink storage (agar file/cover/PDF bisa diakses publik)
php artisan storage:link

# 8. Generate permission Filament Shield (jika diminta)
php artisan shield:generate --all   # atau php artisan shield:install

# 9. Build / jalankan aset frontend
npm run dev      # mode development (hot reload)
#   atau
npm run build    # build sekali (produksi)
```

Jalankan aplikasi:

```powershell
# Cara cepat (semua proses sekaligus: server + queue + vite)
composer run dev

# atau manual
php artisan serve
```

Akses:
- Frontend publik: `http://127.0.0.1:8000`
- Panel admin Filament: `http://127.0.0.1:8000/admin`

> Catatan Laragon: jika memakai virtual host (mis. `http://perpustakaan-saint-luke.test`), sesuaikan `APP_URL` di `.env`.

---

## 4. Konfigurasi `.env` & Kredensial

Berikut semua blok kredensial yang dipakai program. Nilai pada `.env` repo ini adalah contoh/sandbox — **ganti dengan milik Anda saat produksi**.

### 4.1 Aplikasi & Database

```env
APP_NAME="Perpustakaan Santo Lukas"
APP_ENV=local                 # produksi: production
APP_KEY=                      # diisi otomatis oleh php artisan key:generate
APP_DEBUG=true                # produksi: WAJIB false
APP_URL=http://127.0.0.1:8000 # produksi: https://domain-anda.com
APP_TIMEZONE=Asia/Jakarta     # PENTING agar scheduler hourly jalan jam WIB

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=Saint_Luke_Library
DB_USERNAME=root              # produksi: user DB cPanel
DB_PASSWORD=                  # produksi: password DB cPanel
```

> **Tambahkan `APP_TIMEZONE=Asia/Jakarta`** (default Laravel `UTC`). Tanpa ini reminder/auto-return jalan di jam UTC.

### 4.2 Session, Cache, Queue

```env
SESSION_DRIVER=database
QUEUE_CONNECTION=database     # produksi VPS: database (+worker). Shared hosting cPanel tanpa worker: sync
CACHE_STORE=database          # bisa redis jika tersedia
FILESYSTEM_DISK=local
```

### 4.3 Redis (opsional)

```env
REDIS_CLIENT=predis           # phpredis tidak dipakai; predis murni PHP
REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379
```
Jika server tidak punya Redis, biarkan `CACHE_STORE=database`. Query cache fail-safe (tidak error bila Redis mati).

### 4.4 Email (SMTP)

```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=email-anda@gmail.com
MAIL_PASSWORD=xxxxxxxxxxxxxxxx        # Gmail: pakai App Password (16 digit), BUKAN password akun
MAIL_FROM_ADDRESS="perpustakaan@domain-anda.sch.id"
MAIL_FROM_NAME="${APP_NAME}"
```
> Gmail butuh **App Password** (aktifkan 2FA → buat App Password). Jangan commit kredensial asli.

### 4.5 WhatsApp (Fonnte)

```env
FONNTE_TOKEN=token-device-fonnte
```
Token didapat dari dashboard [Fonnte](https://fonnte.com) → device. Dipakai `WhatsAppService` untuk reminder.
> Saat `APP_URL` masih `127.0.0.1`/`localhost`, pengiriman cover buku di-skip otomatis (Fonnte tidak bisa fetch URL lokal). Produksi pakai URL publik agar cover terkirim.

### 4.6 Midtrans (Pembayaran Denda)

```env
MIDTRANS_MERCHANT_ID=Gxxxxxxxxx
MIDTRANS_CLIENT_KEY=SB-Mid-client-xxxxx     # SB-... = sandbox
MIDTRANS_SERVER_KEY=SB-Mid-server-xxxxx
MIDTRANS_IS_SANITIZED=true
MIDTRANS_IS3DS=true
MIDTRANS_IS_PRODUCTION=false                # produksi nyata: true + pakai key production (tanpa SB-)
```
Kredensial dari dashboard [Midtrans](https://dashboard.midtrans.com). Untuk go-live ubah ke key Production dan `MIDTRANS_IS_PRODUCTION=true`.

### 4.7 Google OAuth (Login Google)

```env
GOOGLE_CLIENT_ID=xxxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxxxx
GOOGLE_REDIRECT_URI="${APP_URL}/auth/google/callback"
```
Dari [Google Cloud Console](https://console.cloud.google.com) → Credentials → OAuth Client ID (Web). **Authorized redirect URI** harus persis sama dengan `GOOGLE_REDIRECT_URI` (mis. `https://domain-anda.com/auth/google/callback`).

### 4.8 LibreOffice (konversi PDF)

```env
# Lokal Windows:
LIBREOFFICE_BINARY="C:\\Program Files\\LibreOffice\\program\\soffice.exe"
# Produksi Linux/cPanel:
# LIBREOFFICE_BINARY=soffice
```
Lihat [bagian 5](#5-setup-libreoffice--soffice-konversi-pdf).

---

## 5. Setup LibreOffice / soffice (Konversi PDF)

Program mengubah dokumen Office (`.docx`, `.pptx`, `.xlsx`) menjadi PDF lewat **`ConnvertAssetToPdfJob`** yang memanggil binary LibreOffice (`soffice`). Binary diambil dari `config('services.libreoffice.binary')` ← env `LIBREOFFICE_BINARY` (default `soffice`).

### 5.1 Lokal (Windows)

1. Install **LibreOffice** dari <https://www.libreoffice.org/download>.
2. Path default: `C:\Program Files\LibreOffice\program\soffice.exe`.
3. Set di `.env`:
   ```env
   LIBREOFFICE_BINARY="C:\\Program Files\\LibreOffice\\program\\soffice.exe"
   ```
   > Wajib pakai **double backslash** (`\\`) di `.env`.
4. Verifikasi dari PowerShell:
   ```powershell
   & "C:\Program Files\LibreOffice\program\soffice.exe" --headless --version
   ```

### 5.2 Produksi (Linux VPS — punya akses root)

```bash
sudo apt-get update
sudo apt-get install -y libreoffice           # atau paket minimal: libreoffice-core libreoffice-writer libreoffice-impress libreoffice-calc
which soffice                                  # contoh hasil: /usr/bin/soffice
```
Set di `.env`:
```env
LIBREOFFICE_BINARY=soffice
```
Jika binary tidak di PATH, isi path absolut, mis. `LIBREOFFICE_BINARY=/usr/bin/soffice`.

> Pastikan user web/worker punya **HOME** writable. Tambahkan di supervisor/cron bila perlu:
> `environment=HOME="/var/www/perpustakaan-saint-luke/storage/app"` agar LibreOffice bisa membuat profil sementara.

### 5.3 Produksi (cPanel / Shared Hosting)

Mayoritas shared hosting **tidak menyediakan LibreOffice** dan **memblokir `exec()`**. Cek dulu:

```bash
# via SSH cPanel (jika tersedia)
which soffice || which libreoffice
php -r "var_dump(function_exists('exec'));"
```

Tiga skenario:

1. **Ada `soffice` & `exec()` aktif** → set `LIBREOFFICE_BINARY=soffice` (atau path absolutnya). Selesai.
2. **`exec()` diblokir / tidak ada LibreOffice** → fitur "unggah Office lalu auto-convert ke PDF" tidak bisa jalan di server itu. **Solusi:** unggah buku digital dalam bentuk **PDF langsung** (lewati konversi), atau konversi manual di lokal lalu unggah hasil PDF-nya.
3. **Butuh penuh** → gunakan **VPS** (Niagahoster Cloud VPS, DigitalOcean, dll), bukan shared hosting, lalu ikuti 5.2.

> Catatan kode: sebelumnya path soffice di-hardcode ke Windows di `ConnvertAssetToPdfJob`. Sudah diperbaiki agar membaca `LIBREOFFICE_BINARY`, sehingga portabel ke Linux. Bila konversi gagal, error dicatat di `storage/logs/laravel.log` (binary, input, kode keluar, output).

---

## 6. Scheduler & Queue Worker (Reminder + Auto-Return)

Dua task otomatis terdaftar di `routes/console.php`:

```php
Schedule::call(fn () => app(SendLoanReminder::class)->handle())->hourly();        // reminder email+WA H-3/H-1/H-0
Schedule::call(fn () => app(AutoReturnExpiredLoans::class)->handle())->hourly();  // auto-return digital expired
```

Agar berjalan otomatis, OS scheduler memanggil `php artisan schedule:run` **tiap menit**; Laravel yang menentukan kapan task hourly dieksekusi. Detail lengkap ada di [`deploy/SETUP.md`](deploy/SETUP.md) beserta file siap pakai di `deploy/`.

### 6.1 Lokal (Windows)

Cara cepat (foreground, 2 terminal):
```powershell
php artisan schedule:work          # Terminal 1 (pengganti cron di dev)
php artisan queue:work --tries=3   # Terminal 2 (kirim email & konversi PDF)
```

Tanpa terminal (Windows Task Scheduler) — file XML & .bat sudah disiapkan:
```powershell
# Jalankan sebagai Administrator. Sesuaikan path PHP di deploy\windows\*.bat dulu.
schtasks /create /xml deploy\windows\PerpustakaanScheduler.xml  /tn "PerpustakaanScheduler"
schtasks /create /xml deploy\windows\PerpustakaanQueueWorker.xml /tn "PerpustakaanQueueWorker"
```

### 6.2 Produksi (Linux VPS) — cara ringan & tidak membebani

**Scheduler via cron** (1 entry, satu proses singkat tiap menit — sangat ringan):
```bash
crontab -e
# tambahkan (lihat deploy/linux/crontab.txt):
* * * * * cd /var/www/perpustakaan-saint-luke && php artisan schedule:run >> /dev/null 2>&1
```

**Queue worker via Supervisor** (daemon auto-restart, hemat — `--sleep=3` agar idle tidak makan CPU):
```bash
sudo apt-get install -y supervisor
sudo cp deploy/linux/supervisor-queue.conf /etc/supervisor/conf.d/perpustakaan-queue.conf
sudo supervisorctl reread && sudo supervisorctl update
sudo supervisorctl start perpustakaan-queue:*
```
Setelah deploy kode baru: `php artisan queue:restart` (worker ambil versi terbaru).

### 6.3 Produksi (cPanel) — TANPA worker, hemat penyimpanan

Shared hosting umumnya **tidak izinkan proses long-running** (queue worker). Pakai pola ini agar ringan dan tidak menumpuk job:

1. **Cron Job di cPanel** (menu *Cron Jobs*), tiap menit:
   ```
   * * * * * /usr/local/bin/php /home/USER/perpustakaan/artisan schedule:run >> /dev/null 2>&1
   ```
   > Ganti `USER` & path. Path PHP cPanel sering `/usr/local/bin/php` atau pakai versi spesifik (`ea-php82`), cek di *Select PHP Version* / *MultiPHP*.

2. **Kirim email secara sinkron** (tanpa worker) di `.env`:
   ```env
   QUEUE_CONNECTION=sync
   ```
   Email dikirim langsung saat command jalan (lebih lambat ~beberapa detik/email karena SMTP handshake, tapi tidak butuh daemon dan tidak menumpuk job di tabel `jobs`).

3. **Agar tidak memberatkan server & storage:**
   - `LOG_LEVEL=error` + rotasi log (`LOG_CHANNEL=daily`) supaya `laravel.log` tidak membengkak.
   - Bersihkan job gagal berkala: `php artisan queue:prune-failed --hours=48` (bisa dijadwalkan).
   - `SendLoanReminder` punya **dedup harian** (cache) → aman dipicu per jam, tiap (user, buku) hanya 1× sehari.
   - Cron `schedule:run` hanya jalan beberapa milidetik per menit → beban CPU minimal.

> Cek task terdaftar: `php artisan schedule:list` → harus muncul 2 entry dengan expresi `0 * * * *`.

---

## 7. Menjalankan Program (Lokal & Produksi)

### Lokal
```powershell
composer run dev      # server + queue + vite sekaligus (lihat scripts di composer.json)
# atau terpisah:
php artisan serve
npm run dev
```

### Produksi (setelah deploy)
Tidak pakai `php artisan serve`. Web server (Apache/Nginx) mengarah ke folder `public/`. Yang dijalankan rutin hanya **cron `schedule:run`** dan (jika VPS) **queue worker**. Aset frontend di-build sekali: `npm run build`.

Optimasi cache produksi (jalankan tiap kali deploy kode/config baru):
```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache
composer dump-autoload -o
```
Bila ubah `.env`/config: `php artisan config:clear` lalu cache ulang. Bila restart server (mis. Laragon lokal) diperlukan setelah ubah `opcache`.

---

## 8. Export & Import Database MySQL (untuk Deploy)

### 8.1 Export dari lokal

**Via mysqldump (disarankan, dari PowerShell):**
```powershell
# Laragon: mysqldump biasanya di C:\laragon\bin\mysql\...\bin
mysqldump -u root -p Saint_Luke_Library > C:\laragon\www\perpustakaan-saint-luke\backup_db.sql
```
Tanpa password (Laragon default root tanpa password):
```powershell
mysqldump -u root Saint_Luke_Library --result-file=backup_db.sql
```

**Via phpMyAdmin (Laragon → Database):** pilih database → tab **Export** → format **SQL** → *Go*.

> Tips ukuran kecil: tambah `--no-create-db --single-transaction --quick`. Jika ada masalah charset, pakai `--default-character-set=utf8mb4`.

### 8.2 Import ke cPanel

1. Di cPanel buka **MySQL® Databases** → buat database baru (mis. `userku_perpus`) + user DB + assign user ke database (All Privileges). Catat nama DB, user, password (semuanya di-prefix nama akun cPanel).
2. Buka **phpMyAdmin** → pilih database baru → tab **Import** → unggah `backup_db.sql` → *Go*.
   - File besar (>50MB) sering ditolak phpMyAdmin → kompres jadi `.sql.gz`/`.zip`, atau import via SSH:
     ```bash
     mysql -u userku_dbuser -p userku_perpus < backup_db.sql
     ```
3. Set kredensial DB itu di `.env` server (`DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`, `DB_HOST=localhost`).

> Alternatif tanpa export-import: setelah upload kode, jalankan `php artisan migrate --force --seed` di server (jika ingin DB fresh). Export-import dipakai bila ingin **membawa data yang sudah ada**.

---

## 9. Deploy ke cPanel (Langkah demi Langkah)

> Asumsi: shared hosting cPanel dengan SSH (kalau tidak ada SSH, gunakan File Manager + Terminal cPanel jika tersedia; beberapa langkah composer/npm dilakukan di lokal lalu di-upload).

### Langkah 1 — Siapkan build di lokal
```powershell
composer install --optimize-autoloader --no-dev
npm install
npm run build
```
Hasil build ada di `public/build`. (Di shared hosting Node.js sering tidak ada, jadi **build di lokal**, lalu upload folder `public/build` & `vendor`.)

### Langkah 2 — Upload kode
- Upload seluruh project ke folder di luar `public_html`, mis. `/home/USER/perpustakaan/`.
- Sertakan `vendor/` dan `public/build/` hasil langkah 1 (atau jalankan `composer install` via SSH di server bila PHP & composer tersedia).
- **Jangan** upload `.env` lama yang berisi kredensial sandbox; buat `.env` baru di server.

### Langkah 3 — Arahkan domain ke folder `public/`
cPanel default menyajikan `public_html`. Dua opsi:

- **Opsi A (disarankan):** set *Document Root* domain ke `/home/USER/perpustakaan/public` (lewat *Domains* / addon domain).
- **Opsi B:** taruh isi `public/` di dalam `public_html`, dan edit `public_html/index.php` agar require ke path project:
  ```php
  require __DIR__.'/../perpustakaan/vendor/autoload.php';
  $app = require_once __DIR__.'/../perpustakaan/bootstrap/app.php';
  ```
  Pastikan `.htaccess` Laravel ikut tersalin ke `public_html`.

### Langkah 4 — Buat & isi `.env` di server
```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://domain-anda.com
APP_TIMEZONE=Asia/Jakarta

DB_CONNECTION=mysql
DB_HOST=localhost
DB_DATABASE=userku_perpus
DB_USERNAME=userku_dbuser
DB_PASSWORD=rahasia

QUEUE_CONNECTION=sync          # shared hosting tanpa worker
CACHE_STORE=database
SESSION_DRIVER=database

# isi kredensial asli: MAIL_*, FONNTE_TOKEN, MIDTRANS_* (production), GOOGLE_* 
LIBREOFFICE_BINARY=soffice     # hanya berguna bila server punya LibreOffice (lihat 5.3)
```

### Langkah 5 — Generate key, migrasi, storage link, cache
Via SSH (atau Terminal cPanel):
```bash
cd /home/USER/perpustakaan
php artisan key:generate
php artisan migrate --force          # atau import DB (bagian 8)
php artisan storage:link             # bila symlink tak diizinkan, lihat Troubleshooting
php artisan shield:generate --all
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache
```

### Langkah 6 — Cron untuk scheduler
cPanel → **Cron Jobs** → tambah (tiap menit):
```
* * * * * /usr/local/bin/php /home/USER/perpustakaan/artisan schedule:run >> /dev/null 2>&1
```

### Langkah 7 — Permission folder
Pastikan writable:
```bash
chmod -R 775 storage bootstrap/cache
```

### Langkah 8 — Atur callback & whitelist pihak ketiga
- **Google OAuth:** tambahkan `https://domain-anda.com/auth/google/callback` di Authorized redirect URIs.
- **Midtrans:** set Notification/Payment URL ke endpoint produksi bila pakai webhook; gunakan key Production.
- **Fonnte:** pastikan device aktif & token benar; `APP_URL` https publik agar cover terkirim.

---

## 10. Checklist Verifikasi Pasca-Deploy

- [v] `https://domain-anda.com` tampil (frontend), `/admin` bisa login.
- [v] `APP_DEBUG=false`, `APP_ENV=production`.
- [v] Aset (CSS/JS) termuat → `public/build` ada & `npm run build` terbaru.
- [v] `storage:link` aktif → cover buku, kartu PDF, file tampil.
- [v] Registrasi/login + verifikasi email berfungsi (cek inbox).
- [v] Login Google berhasil (redirect URI cocok).
- [v] `php artisan schedule:list` menampilkan 2 task hourly.
- [v] Tunggu/test cron → reminder email & WhatsApp terkirim (cek `storage/logs/laravel.log`).
- [v] Auto-return digital expired berjalan.
- [v] Pembayaran denda Midtrans (mode sesuai) sukses.
- [v] (Jika dipakai) konversi Office→PDF jalan, atau buku digital diunggah sebagai PDF langsung.
- [v] `storage/logs/laravel.log` tidak berisi error fatal.

---

## 11. Troubleshooting

| Masalah | Penyebab & Solusi |
|---|---|
| **500 Internal Server Error** | `APP_KEY` kosong (`php artisan key:generate`), permission `storage`/`bootstrap/cache` (`chmod 775`), atau cache config basi (`php artisan config:clear`). Cek `storage/logs/laravel.log`. |
| **Aset/CSS tidak muncul** | `npm run build` belum dijalankan / `public/build` tak ter-upload, atau `APP_URL` salah. |
| **`storage:link` ditolak shared hosting** | Buat symlink manual via File Manager, atau buat folder `public/storage` lalu salin isi (kehilangan keuntungan symlink), atau gunakan helper symlink cPanel. |
| **Email tidak terkirim** | App Password Gmail salah, port/host SMTP salah, atau `QUEUE_CONNECTION=database` tanpa worker (pakai `sync` di cPanel). |
| **Reminder tidak jalan otomatis** | Cron `schedule:run` belum dipasang / path PHP salah; `APP_TIMEZONE` belum `Asia/Jakarta`; cek `php artisan schedule:list`. |
| **Konversi Office→PDF gagal** | LibreOffice tidak terinstall / `exec()` diblokir (shared hosting) / `LIBREOFFICE_BINARY` salah / HOME tidak writable. Lihat [5.3]. Cek log error job di `laravel.log`. |
| **WhatsApp cover tidak terkirim** | `APP_URL` masih lokal/non-publik → Fonnte tak bisa fetch cover (teks tetap terkirim). Pakai URL https publik. |
| **Login Google `redirect_uri_mismatch`** | `GOOGLE_REDIRECT_URI` tidak persis sama dengan yang didaftarkan di Google Cloud Console. |
| **Midtrans gagal/Invalid key** | Masih pakai key sandbox saat `MIDTRANS_IS_PRODUCTION=true` (atau sebaliknya). Samakan mode & key. |
| **Tabel `jobs` membengkak** | Pakai `QUEUE_CONNECTION=sync` di shared hosting, atau jalankan worker + `queue:prune-failed`. |
| **Redis error** | Set `CACHE_STORE=database`; query cache fail-safe sehingga tidak fatal. |

---

### Referensi file deploy di repo
- [`deploy/SETUP.md`](deploy/SETUP.md) — panduan scheduler & queue lintas environment
- `deploy/linux/crontab.txt`, `deploy/linux/supervisor-queue.conf` — konfigurasi VPS
- `deploy/windows/*.xml`, `deploy/windows/*.bat` — Task Scheduler Windows lokal
