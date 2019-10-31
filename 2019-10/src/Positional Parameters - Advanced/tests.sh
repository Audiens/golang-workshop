#!/bin/bash

file1="file1"
file2="file2"
file3="file 3"
dir_name=".environment/created_files"

check_if_file_exists(){
        cd $dir_name
        for i in "$@"; do
                if [ -f "./$i" ]; then
                        echo "Passed for $i!"
                else
                        echo "Not Passed for $i :("
                fi
        done
}

check_if_dir_exists(){
        if [ -d "./$i" ]; then
                echo "Directory exists, good job!"
        fi
}

check_if_dir_exists $dir_name
check_if_file_exists $file1 $file2 "$file3"
