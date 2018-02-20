#!/usr/bin/env bash

# Generate the .env file

echo "GOPATH=`pwd`" > .env
echo "GOBIN=`pwd`/bin" >> .env
