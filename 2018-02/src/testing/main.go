package main

import "io/ioutil"

func main() {
	csvData, _ := ioutil.ReadFile("./test-data.csv")
	textToReverse, _ := ioutil.ReadFile("./test-reverse.txt")

	// Create an application able to parse the CSV written above
	// putting the result in a struct containing name, surname, address, city, province, zip code
	// and test it so that the output is guaranteed.

	// Create an application able to reverse the text written above
	// and test it so that the output is guaranteed.

	// Create an application which uses the previous CSV parser and sort the results
	// by [surname, name, city] and test it so that the output is guaranteed
}
