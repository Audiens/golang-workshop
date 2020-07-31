#!/usr/bin/env bash

export UID=$(id -u)
export GID=$(id -g)

case $1 in
"start")
  docker-compose -f ./docker/workshop.compose.yml up --build -d
  ;;
"stop")
  docker-compose -f ./docker/workshop.compose.yml down
  ;;
"tail")
  docker-compose -f ./docker/workshop.compose.yml logs -f $2
  ;;
"connect")
  docker exec -it docker_apache_1 sh
  ;;
*)
  echo "Usage: ws start, stop, tail, connect"
  ;;
esac