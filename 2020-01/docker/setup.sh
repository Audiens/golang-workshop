#!/bin/bash

echo "Removing exited docker containers..."
#docker ps -a -f status=exited -q | xargs -r docker rm -v

echo "Removing dangling images..."
#docker images --no-trunc -q -f dangling=true | xargs -r docker rmi

DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

#build the docker image in the current directory
docker build -t cc_image $DIR

# remove the former container
docker rm -f cc_container

#run the container
docker run \
--net=host \
-v $DIR/../../:/home/audiens/projects \
--name cc_container \
-ti cc_image bash