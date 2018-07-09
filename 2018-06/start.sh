#/usr/bin/env bash

./gendockercompose.sh
docker-compose up --scale app=32
