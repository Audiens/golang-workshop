#!/usr/bin/env bash

echo "Cleaning previous builds..."
ninja -t clean

echo "Compiling new binaries..."
ninja $@
