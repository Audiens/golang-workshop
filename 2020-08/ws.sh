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
 docker-compose -f ./docker/workshop.compose.yml exec apache bash
  ;;
"restart")
  #docker-compose -f ./docker/workshop.compose.yml restart apache
  docker-compose -f ./docker/workshop.compose.yml exec apache apachectl -k graceful
  ;;
*)
  echo "Usage: ws start, stop, tail, connect"
  ;;
esac