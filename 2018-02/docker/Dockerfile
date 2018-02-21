FROM golang:1-stretch

ARG UID=1000
ARG GID=1000

ENV GOPATH=/build
ENV GOBIN=/build/bin
ENV GOOS=linux

# Installing dependencies
RUN apt-get update \
  && apt-get install -y ninja-build zip \
  && apt-get clean && apt-get autoclean

# User creation
RUN groupadd -g $GID -o -r build \
  && useradd -d /build -g $GID -o -r -u $UID build \
  && mkdir /build \
  && chown build: /build

VOLUME /build
WORKDIR /build
ENTRYPOINT ["/build/docker/entrypoint.sh"]
USER build
