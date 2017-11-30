#!/bin/bash

DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

#build the docker image in the current directory
docker build -t ws_image ${DIR}

# remove the former container
docker rm -f ws_container

#run the container
docker run \
--net=host \
-v ${DIR}/../../:/home/audiens/projects \
--name ws_container \
-ti ws_image bash
