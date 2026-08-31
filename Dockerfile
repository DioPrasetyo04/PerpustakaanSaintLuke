# Configure image PHP version
FROM php:8.3-cli

# Set working directory
WORKDIR /var/www

# 1. Install sistem dependensi, LibreOffice (untuk konversi Office ke PDF), dan MySQL client
RUN apt-get update && apt-get install -y --no-install-recommends \
    git \
    curl \
    zip \
    unzip \
    libreoffice \
    libreoffice-writer \
    libreoffice-calc \
    libreoffice-impress \
    default-mysql-client \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# 2. Gunakan official PHP extension installer agar instalasi GD, Imagick, Redis, dll. stabil di PHP 8.3
COPY --from=mlocati/php-extension-installer /usr/bin/install-php-extensions /usr/local/bin/

# 3. Install seluruh ekstensi PHP yang dibutuhkan Laravel, Filament, dan Image/Redis
RUN install-php-extensions \
    bcmath \
    ctype \
    dom \
    fileinfo \
    gd \
    intl \
    mbstring \
    pdo \
    pdo_mysql \
    xml \
    pcntl \
    zip \
    exif \
    imagick \
    redis

# 4. Install Node.js 20 & NPM (Dibutuhkan untuk build frontend & Wayfinder plugin)
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# 5. Copy Composer 2
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# 5. Copy seluruh source code project
COPY . .

# 6. Set permission untuk storage & cache
RUN chmod -R 775 storage bootstrap/cache

# Expose port
EXPOSE 8000

# Default command
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]