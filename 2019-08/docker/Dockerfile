FROM php:7.1-cli

ARG UID

RUN echo 'deb [trusted=yes] http://deb.nodesource.com/node_8.x stretch main'                      >> /etc/apt/sources.list.d/nodesource.list
RUN echo 'deb-src [trusted=yes] http://deb.nodesource.com/node_8.x stretch main'                  >> /etc/apt/sources.list.d/nodesource.list
RUN echo "deb [trusted=yes] http://dl.yarnpkg.com/debian/ stable main"                            >> /etc/apt/sources.list.d/yarn.list

RUN echo 'debconf debconf/frontend select Noninteractive' | debconf-set-selections
RUN apt-get update && apt-get upgrade --allow-unauthenticated -y
RUN mkdir -p /usr/share/man/man1 /usr/share/man/man7
RUN apt-get install --allow-unauthenticated -y vim nodejs yarn sudo git tree zip

COPY config/sudoers /etc/sudoers

RUN useradd -ms /bin/bash audiens
RUN usermod -aG sudo audiens
RUN usermod -aG $UID audiens
RUN echo audiens:audiens | chpasswd

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer --version

USER audiens

WORKDIR /home/audiens/projects

RUN sudo chown -R audiens:audiens /home/audiens

WORKDIR /home/audiens/projects/2019-08

VOLUME ["/home/audiens/projects"]
