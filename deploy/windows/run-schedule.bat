@echo off
REM Laravel Scheduler runner — dipanggil Windows Task Scheduler tiap 1 menit.
REM Edit PHP_BIN dan PROJECT_DIR kalau path Anda berbeda.

set "PROJECT_DIR=C:\laragon\www\perpustakaan-saint-luke"
set "PHP_BIN=C:\laragon\bin\php\php-8.3.12-Win32-vs16-x64\php.exe"

cd /d "%PROJECT_DIR%"
"%PHP_BIN%" artisan schedule:run >> "%PROJECT_DIR%\storage\logs\schedule-run.log" 2>&1
