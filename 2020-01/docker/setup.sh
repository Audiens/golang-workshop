#!/bin/bash

dockerfile=""
image_name=""
container_name=""

case $1 in
"5.5")
  dockerfile="5.5.Dockerfile"
  image_name="5.5.image"
  container_name="5.5.container"
  ;;
"5.6")
  dockerfile="5.6.Dockerfile"
  image_name="5.6.image"
  container_name="5.6.container"
  ;;
*)
  echo "Version not allowed"
  exit 1
  ;;
esac

DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)

# build the docker image in the current directory
docker build --build-arg UID="$(id -u)" --build-arg GID="$(id -g)" -t ${image_name} -f "${DIR}/${dockerfile}" "${DIR}"

# run the container
docker run \
  --rm \
  --net=host \
  -v "${DIR}/../../:/home/audiens/projects" \
  --name ${container_name} \
  -ti ${image_name} bash
