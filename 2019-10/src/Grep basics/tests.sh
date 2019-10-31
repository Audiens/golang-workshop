#!/bin/bash

file_names=(out-usb.txt out-pci.txt out-disabled.txt out-no-a.txt out-registered.txt)
dir=".grade"



for file_name in ${file_names[@]}; do
	if [[ -f $file_name ]]; then
		case $file_name in
		*usb*)
			if [[ $(diff -u $file_name $dir/expected-usb.txt) -eq "" ]]; then
				echo "Great! Test for $file_name passed!"
			else
				echo "Ops, $file_name does not contain the correct text :( - Failed"
			fi
			;;
		*pci*)
			if [[ $(diff -u $file_name $dir/expected-pci.txt) -eq "" ]]; then
				echo "Great! Test for $file_name passed!"
			else
				echo "Ops, $file_name does not contain the correct text :( - Failed"
			fi
			;;
		*no*)
			if [[ $(diff -u $file_name $dir/expected-no-a.txt) -eq "" ]]; then
				echo "Great! Test for $file_name passed!"
			else
				echo "Ops, $file_name does not contain the correct text :( - Failed"
			fi
			;;
		*registered*)
			if [[ $(diff -u $file_name $dir/expected-registered.txt) -eq "" ]]; then
				echo "Great! Test for $file_name passed!"
			else
				echo "Ops, $file_name does not contain the correct text :( - Failed"
			fi
			;;
		*disabled*)
			if [[ $(diff -u $file_name $dir/expected-disabled.txt) -eq "" ]]; then
				echo "Great! Test for $file_name passed!"
			else
				echo "Ops, $file_name does not contain the correct text :( - Failed"
			fi
			;;
		*)
			echo "NO"
			;;
		esac
	else
		echo "Ops, $file_name does not exists :( - Failed"
	fi
done

