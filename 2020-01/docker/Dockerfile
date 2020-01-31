FROM php:7.1.20-apache

RUN echo 'debconf debconf/frontend select Noninteractive' | debconf-set-selections
RUN apt-get update && apt-get upgrade -y

#SPLIT APT PACKAGES TO MAKE USE OF CACHING
RUN apt-get install -y apt-utils sudo git tree

#SUDOERS + SSH
COPY config/sudoers /etc/sudoers

RUN sed -i "s/Listen 80/Listen 8080/" /etc/apache2/ports.conf

# Fix permissions
RUN useradd -u 1000 -U web \
  && chmod go+rwx /var/lock/apache2 \
  && chmod go+rwx /var/run/apache2

WORKDIR /home/audiens/projects

#COMPOSER
RUN curl -sS https://getcomposer.org/installer | sudo php -- --install-dir=/usr/local/bin --filename=composer

EXPOSE 8080
WORKDIR /home/audiens/projects/2020-01/
VOLUME ["/home/audiens/projects"]
ENTRYPOINT ["/usr/sbin/apache2ctl", "-D", "FOREGROUND"]
