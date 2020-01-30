FROM php:5.5-cli

ARG UID
ARG GID
ARG DEBUG

RUN uname -a

RUN groupadd --gid $GID --non-unique audiens
RUN useradd --create-home --shell /bin/bash --uid $UID --gid $GID --non-unique audiens

USER audiens

WORKDIR /home/audiens/projects

COPY config/.bashrc /home/audiens/.bashrc

WORKDIR /home/audiens/projects/2020-01
VOLUME ["/home/audiens/projects"]
