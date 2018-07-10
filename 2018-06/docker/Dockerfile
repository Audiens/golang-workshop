FROM php:7.1-cli

ARG UID=666

RUN echo 'debconf debconf/frontend select Noninteractive' | debconf-set-selections
RUN apt-get update && apt-get upgrade -y

RUN apt-get install -y apt-utils sudo git tree redis-server

RUN docker-php-ext-install sockets

COPY config/sudoers /etc/sudoers

RUN useradd -ms /bin/bash audiens
RUN usermod -aG sudo audiens
RUN usermod -aG $UID audiens
RUN echo audiens:audiens | chpasswd

COPY config/redis.conf /home/audiens/redis.conf

USER audiens

WORKDIR /home/audiens/projects

RUN sudo chown -R audiens:audiens /home/audiens

COPY config/.bashrc /home/audiens/.bashrc

WORKDIR /home/audiens/projects/2018-06

VOLUME ["/home/audiens/projects"]

