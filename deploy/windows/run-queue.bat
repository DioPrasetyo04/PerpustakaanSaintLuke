@echo off
REM Laravel Queue Worker daemon — dipanggil Windows Task Scheduler saat startup.
REM Loop memastikan worker otomatis restart kalau berhenti (mis. karena `queue:restart`).
REM Edit PHP_BIN dan PROJECT_DIR kalau path Anda berbeda.

set "PROJECT_DIR=C:\laragon\www\perpustakaan-saint-luke"
set "PHP_BIN=C:\laragon\bin\php\php-8.3.12-Win32-vs16-x64\php.exe"

cd /d "%PROJECT_DIR%"

:loop
"%PHP_BIN%" artisan queue:work database --tries=3 --sleep=3 --timeout=120 >> "%PROJECT_DIR%\storage\logs\queue-worker.log" 2>&1
timeout /t 5 /nobreak >nul
goto loop
