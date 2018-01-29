#!/bin/bash

set -e

IMAGE_NAME="sphp_image"
CONTAINER_NAME="sphp_container"
USER="$UID"
USER_NAME="sphp"

echo "Removing dangling images..."
#docker image prune -f

DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

echo "$DIR"

#build the docker image in the current directory
docker build \
--build-arg GID="$UID" \
--build-arg UID="$UID" \
-t "$IMAGE_NAME" $DIR

#run th/usr/bin/redis-servercontainer
docker run \
--rm \
--net=host \
--privileged \
-v "$DIR":/home/sphp/projects/sphp \
--name "$CONTAINER_NAME" \
--user "$USER" \
-ti "$IMAGE_NAME" /bin/bash

sleep 1

docker exec -ti -u sphp "$CONTAINER_NAME" bash
