#!/usr/bin/env bash

uid=`id -u`
content="`cat docker-compose.template.yml | sed -e 's/{{uid}}/'"$uid"'/g'`"
echo "$content" > docker-compose.yml
