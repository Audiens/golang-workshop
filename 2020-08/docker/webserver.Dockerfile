FROM composer:latest

FROM php:7.4.4-apache

ARG UID
ARG GID

COPY --from=0 /usr/bin/composer /usr/bin/composer

RUN sed -i "s/Listen 80/Listen 8080/" /etc/apache2/ports.conf
RUN apt-get update && apt-get -y install zip git

RUN useradd audiens --uid=${UID} -g www-data
RUN chown audiens /usr/bin/composer

USER audiens
RUN composer --version

WORKDIR /var/www/html

EXPOSE 8080