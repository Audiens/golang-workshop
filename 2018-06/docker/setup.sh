#!/bin/bash

IMAGE='2018_image'
CONTAINER='2018_container'

DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

docker build \
    -t "$IMAGE" \
    --build-arg UID=`id -u` \
    "$DIR"

docker rm -f "$CONTAINER"

docker run \
-d \
-v "$DIR"/../../:/home/audiens/projects \
-v "${DIR}"/config/redis.conf:/usr/local/etc/redis/redis.conf \
--privileged \
--name "$CONTAINER" \
--net=host \
-ti "$IMAGE" bash -c "redis-server /home/audiens/redis.conf && tail -f /dev/null"

sleep 1

docker exec -ti -u audiens "$CONTAINER" bash
