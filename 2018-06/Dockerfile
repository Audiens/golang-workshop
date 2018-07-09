# From
FROM debian:stretch-slim

ARG UID=1000
ARG USERNAME=devday

RUN useradd $USERNAME -o -u $UID
RUN mkdir -p /opt/src && \
  chown $USERNAME:$USERNAME /opt/src

COPY ./docker/entrypoint.sh /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
VOLUME ["/opt/src"]
