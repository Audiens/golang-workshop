FROM php:7.1-cli

ARG UID=nada
ARG GID=nada

RUN apt-get update
RUN apt-get install -y git wget unzip xsltproc colordiff

RUN docker-php-ext-install pcntl

# --- AST ---
RUN git clone https://github.com/nikic/php-ast.git php-ast \
    && cd php-ast \
    && git fetch --tags \
    && latestTag=$(git describe --tags `git rev-list --tags --max-count=1`) \
    && git checkout $latestTag \
    && phpize \
    && ./configure \
    && make \
    && make install \
    && echo "extension=ast.so" > /usr/local/etc/php/conf.d/ext-ast.ini

RUN mkdir -p /home/sphp
RUN useradd -r -u "$UID" sphp
RUN chown -R sphp:sphp /home/sphp/

RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
RUN php -r "if (hash_file('SHA384', 'composer-setup.php') === '669656bab3166a7aff8a7506b8cb2d1c292f042046c5a994c43155c0be6190fa0355160742ab2e1c88d40d5be660b410') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
RUN php composer-setup.php
RUN php -r "unlink('composer-setup.php');"
RUN mv composer.phar /usr/bin/composer
RUN chmod +x /usr/bin/composer

USER sphp

WORKDIR /home/sphp/projects/sphp