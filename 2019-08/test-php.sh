#!/usr/bin/env bash

composer install --quiet
./bin/phpunit --color
