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
--net=host \
-d \
-v "$DIR"/../../:/home/audiens/projects \
--privileged \
--name "$CONTAINER" \
-ti "$IMAGE" tail -f /dev/null

sleep 1

docker exec -ti -u audiens "$CONTAINER" bash
