#!/usr/bin/env bash

set -e

IMAGE_TAG="audiens_workshop_go_build"

echo "Compiling docker build image (finger-crossed)..."
docker build --quiet \
  --tag "$IMAGE_TAG" \
  --build-arg "UID=`id -u`" \
  --build-arg "GID=`id -g`" \
  ./docker

echo "Compiling go soruces..."
docker run \
  --rm \
  --interactive \
  --volume "`pwd`:/build" \
  "$IMAGE_TAG" $@
