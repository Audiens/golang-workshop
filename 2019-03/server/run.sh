#!/usr/bin/env bash
set -eo pipefail

case $1 in
  start)
    yarn start | cat
    ;;
  *)
    exec "$@"
    ;;
esac