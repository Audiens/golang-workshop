FROM php:7-cli

RUN echo 'debconf debconf/frontend select Noninteractive' | debconf-set-selections
RUN apt-get update && apt-get upgrade -y

#SPLIT APT PACKAGES TO MAKE USE OF CACHING
RUN apt-get install -y apt-utils sudo git tree

#SUDOERS + SSH
COPY config/sudoers /etc/sudoers

RUN useradd -ms /bin/bash audiens
RUN usermod -aG sudo audiens
RUN usermod -aG 1000 audiens
RUN echo audiens:audiens | chpasswd

USER audiens

WORKDIR /home/audiens/projects

#COMPOSER
RUN curl -sS https://getcomposer.org/installer | sudo php -- --install-dir=/usr/local/bin --filename=composer

RUN sudo chown -R audiens:audiens /home/audiens

COPY config/.bashrc /home/audiens/.bashrc

# Install PECL extensions
RUN sudo pecl install xdebug
RUN sudo docker-php-ext-enable xdebug

WORKDIR /home/audiens/projects/code-quality-workshop
VOLUME ["/home/audiens/projects"]
