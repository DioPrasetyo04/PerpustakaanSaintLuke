# 🐳 Panduan Penggunaan Docker - Perpustakaan Santo Lukas

Dokumentasi lengkap untuk menjalankan aplikasi **Perpustakaan Santo Lukas (Laravel 12 + React / Inertia + Filament 5)** menggunakan Docker dan Docker Compose.

---

## 📋 Daftar Layanan Container

Arsitektur container yang telah dikonfigurasi:

| Service | Container Name | Base Image | Port Host | Fungsi |
|---|---|---|---|---|
| **app** | `elibrary-app` | `php:8.3-cli` (Custom Dockerfile) | `8000:8000` | Backend Laravel, Artisan Serve, LibreOffice, Composer |
| **node** | `elibrary-node` | `Custom Dockerfile` (PHP 8.3 + Node 20) | `5173:5173` | Frontend React + Vite (HMR Hot Reload & Wayfinder) |
| **mysql** | `elibrary-mysql` | `mysql:8.0` | `3306:3306` | Database MySQL 8.0 & auto-import SQL |
| **redis** | `elibrary-redis` | `redis:alpine` | `6379:6379` | Cache query & session store |
| **phpmyadmin** | `elibrary-phpmyadmin` | `phpmyadmin:latest` | `8080:8080` | Web UI Database (Alternatif XAMPP phpMyAdmin) |

---

## ⚙️ 1. Persiapan File `.env`

Pastikan file `.env` di root project memiliki konfigurasi berikut agar terhubung ke jaringan Docker:

```env
APP_NAME="Perpustakaan Santo Lukas"
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000
APP_TIMEZONE=Asia/Jakarta

# Database Docker
DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=DB_DATABASE
DB_USERNAME=DB_USERNAME
DB_PASSWORD=DB_PASSWORD

# Redis Docker
REDIS_CLIENT=predis
REDIS_HOST=redis
REDIS_PASSWORD=REDIS_PASSWORD
REDIS_PORT=6379

# LibreOffice (Linux Container)
LIBREOFFICE_BINARY=soffice

# Vite Dev Server
VITE_DEV_SERVER_URL=0.0.0.0

# Third Party (Midtrans, Google, Fonnte, SMTP)
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=MAIL_USERNAME
MAIL_PASSWORD=MAIL_PASSWORD
MAIL_FROM_ADDRESS="perpustakaan-saint-luke@sch.id"

FONNTE_TOKEN=FONNTE_TOKEN

GOOGLE_CLIENT_ID=GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=GOOGLE_CLIENT_SECRET
GOOGLE_REDIRECT_URI="${APP_URL}/auth/google/callback"
```

---

## 🚀 2. Cara Menjalankan Docker

### A. Build dan Jalankan Container (Pertama Kali)

Buka terminal di root project dan jalankan:

```bash
docker compose up -d --build
```

> **Catatan Database Pertama Kali:**  
> File `data/saint_luke_library.sql` akan secara **otomatis di-import ke database MySQL** saat container MySQL pertama kali di-inisialisasi.

---

### B. Memantau Proses Log

Untuk memastikan dependensi `composer install` dan `npm install` selesai:

```bash
# Log Laravel App
docker compose logs -f app

# Log Vite / Node
docker compose logs -f node

# Log MySQL
docker compose logs -f mysql
```

---

### C. Menjalankan Perintah Artisan di Container

Jika ingin menjalankan command Laravel di dalam container `app`:

```bash
# Generate Shield Permission (Filament)
docker compose exec app php artisan shield:generate --all

# Clear Cache
docker compose exec app php artisan config:clear
docker compose exec app php artisan cache:clear

# Menjalankan Queue Worker secara manual (bila dibutuhkan)
docker compose exec app php artisan queue:work

# Masuk ke Terminal Container
docker compose exec app bash
```

---

## 🌐 3. URL Akses Aplikasi

Setelah semua container running (`Up`), akses melalui browser:

- **Frontend Publik (React / Inertia):** [http://localhost:8000](http://localhost:8000)
- **Admin Panel (Filament):** [http://localhost:8000/admin](http://localhost:8000/admin)
- **phpMyAdmin (Web Database):** [http://localhost:8080](http://localhost:8080)
  - **Server:** `mysql`
  - **Username:** `root`
  - **Password:** `root`
- **Vite Server (Hot Module Reload):** [http://localhost:5173](http://localhost:5173)

---

## 🛑 4. Menghentikan dan Merestart Container

```bash
# Menghentikan container (data DB & volume tetap aman)
docker compose down

# Menghentikan dan menghapus semua volume (Reset total DB)
docker compose down -v

# Menjalankan kembali setelah dihentikan
docker compose up -d
```
