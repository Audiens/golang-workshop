#!/bin/bash

output="$(./hello.sh)"

if [ "$output" == "Hello, World!" ]; then
        echo "Passed"
else
        echo "Not Passed :("
fi
