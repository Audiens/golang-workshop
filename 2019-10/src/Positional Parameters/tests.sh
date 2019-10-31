#!/bin/bash

file_name="output.txt"
lines_number=$(cat ./$file_name | wc -l)

#echo $lines_number

if [ -f ./$file_name ]; then
        if [ $lines_number -eq 3 ]; then
                first_string_to_check=$(tail -n 1 ./$file_name)
                #echo $first_string_to_check
                if [ "$first_string_to_check"=="firstwordSECONDWORD" ]; then
                        if grep -q "Appended line" ./$file_name; then
                                echo "Passed!"
                        else
                                echo "Seems that there is no Appended line string - Failed :("
                        fi
                else
                        echo "The last line is not firstwordSECONDWORD as requested - Failed :("
                fi
        else
                echo "Lines in a file are > or < than 3 - Failed :("
        fi
else
        echo "Output.txt file not exists! Failed :("
fi
