FROM php:8.2-cli

RUN apt-get update && apt-get install -y \
    sqlite3 \
    libsqlite3-dev \
    zip \
    unzip \
    git \
    && docker-php-ext-install pdo_sqlite fileinfo \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
WORKDIR /var/www/html
COPY backend/ .
RUN composer install --no-dev --optimize-autoloader
RUN cp .env.example .env
RUN touch database/database.sqlite && chmod 664 database/database.sqlite
RUN php artisan key:generate --force && php artisan migrate --force && php artisan db:seed --force
EXPOSE 8000
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]