#!/bin/bash

awk -f report-income.awk < materials/invoices.txt > output.txt

if diff -q materials/expected-output.txt output.txt; then
	echo "Great! Good job, test passed!"
else
	echo "The output is not correct :( - Failed"
fi

rm output.txt
