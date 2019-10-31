#!/bin/bash

filename="Today"
value=$(head -n 1 ./$filename)
if [ -f ./$filename ]; then
        if [ $value == "DevDay" ]; then
                echo "Passed!"
        else
                echo "File should contain \"DevDay\" string - Failed :("
        fi
else
        echo "File \"Today\" does not exists - Failed :("
fi
