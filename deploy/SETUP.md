# Deployment Setup — Scheduler & Queue Worker

Panduan menjalankan reminder peminjaman buku **otomatis** (tanpa harus jalankan `php artisan reminder:loan` manual) di berbagai environment.

## Arsitektur

```
OS Scheduler (cron / Task Scheduler)
   ↓ panggil tiap menit
php artisan schedule:run
   ↓ baca routes/console.php
Schedule::call(...)->hourly()  →  SendLoanReminder + AutoReturnExpiredLoans

Queue Worker (daemon, jalan terus)
   ↓
php artisan queue:work --tries=3
   ↓ proses LoanReminderNotification → kirim email via SMTP
```

Dua komponen, **dua-duanya harus aktif**:
- **Scheduler** memicu reminder per jam.
- **Queue Worker** mengirim email (karena `LoanReminderNotification implements ShouldQueue`).

WhatsApp dikirim sinkron dari command, **tidak butuh worker**.

---

## 1. Local — Windows + Laragon

### Cara A: Foreground (paling cepat untuk dev session)

Buka 2 terminal di Laragon, jalankan masing-masing:

```powershell
# Terminal 1
php artisan schedule:work

# Terminal 2
php artisan queue:work --tries=3
```

Tutup terminal → berhenti. Cocok kalau Anda hanya mau testing sebentar.

### Cara B: Windows Task Scheduler (tanpa terminal)

1. **Sesuaikan path PHP** di `deploy/windows/run-schedule.bat` & `run-queue.bat`. Path saat ini sudah set ke PHP 8.3.12 Laragon — cek dengan `where php` kalau berbeda.

2. **Import 2 Scheduled Task** (jalankan di PowerShell sebagai Administrator):
   ```powershell
   cd C:\laragon\www\perpustakaan-saint-luke
   schtasks /create /xml deploy\windows\PerpustakaanScheduler.xml /tn "PerpustakaanScheduler"
   schtasks /create /xml deploy\windows\PerpustakaanQueueWorker.xml /tn "PerpustakaanQueueWorker"
   ```

3. **Verifikasi**:
   ```powershell
   schtasks /query /tn "PerpustakaanScheduler"
   schtasks /query /tn "PerpustakaanQueueWorker"
   ```

4. **Test paksa jalan** (tanpa nunggu tiap menit):
   ```powershell
   schtasks /run /tn "PerpustakaanScheduler"
   schtasks /run /tn "PerpustakaanQueueWorker"
   ```

5. **Lihat log**:
   - `storage/logs/schedule-run.log` — output `schedule:run`
   - `storage/logs/queue-worker.log` — output queue worker
   - `storage/logs/laravel.log` — log Laravel utama

6. **Hapus task** (kalau tidak butuh lagi):
   ```powershell
   schtasks /delete /tn "PerpustakaanScheduler" /f
   schtasks /delete /tn "PerpustakaanQueueWorker" /f
   ```

---

## 2. Linux VPS (Ubuntu/Debian)

Asumsi path project: `/var/www/perpustakaan-saint-luke`. Sesuaikan kalau berbeda.

### Cron (untuk scheduler)

```bash
crontab -e
```
Tambah baris (lihat `deploy/linux/crontab.txt`):
```cron
* * * * * cd /var/www/perpustakaan-saint-luke && php artisan schedule:run >> /dev/null 2>&1
```

### Supervisor (untuk queue worker)

```bash
sudo apt-get install -y supervisor
sudo cp deploy/linux/supervisor-queue.conf /etc/supervisor/conf.d/perpustakaan-queue.conf
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start perpustakaan-queue:*
sudo supervisorctl status perpustakaan-queue:*
```

Sesuaikan path & user di file conf kalau project bukan di `/var/www/...` atau bukan `www-data`.

### Setelah deploy kode baru
```bash
php artisan queue:restart    # worker fetch versi terbaru
```
Supervisord akan auto-respawn worker.

---

## 3. Shared Hosting (cPanel / Niagahoster)

Biasanya **tidak izinkan long-running process** (queue worker). Workaround:

1. **Cron Jobs** di cPanel:
   - Setiap 1 menit: `cd /home/user/public_html && php artisan schedule:run`
2. **Email sync** (tidak pakai queue): di `.env`
   ```env
   QUEUE_CONNECTION=sync
   ```
   Email akan dikirim langsung di proses yang sama dengan `reminder:loan`. Lebih lambat (5–10 detik per email karena SMTP handshake), tapi tidak butuh worker.

---

## Penting

| Item | Catatan |
|---|---|
| **Time zone** | Set `APP_TIMEZONE=Asia/Jakarta` di `.env` agar `->hourly()` jalan jam pas WIB. Default Laravel `UTC`. |
| **APP_URL** | Production: harus public URL (`https://elibrary.com`) agar Fonte bisa fetch cover. Local: `127.0.0.1` → WhatsAppService auto-skip cover (sudah handled). |
| **Schedule list** | Cek schedule terdaftar: `php artisan schedule:list`. Harus tampil 2 entry dengan expression `0 * * * *`. |
| **Dedup harian** | `SendLoanReminder` punya Cache::add — aman ditrigger berkali-kali per jam, tiap user-buku hanya 1× per hari. Reset: `php artisan cache:clear`. |
