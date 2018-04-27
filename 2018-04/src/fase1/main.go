package main

import (
	"fase1/downloader"
	"fmt"
	"os"
	"regexp"
)

func main() {
	if len(os.Args) != 2 {
		fmt.Fprintf(os.Stderr, "Usage: %s URL\n", os.Args[0])
		os.Exit(1)
	}

	url := os.Args[1]

	matched, _ := regexp.MatchString("^https?://.{1,}", url)
	if !matched {
		fmt.Fprintf(os.Stderr, "You must provide a valid url!\n")
		os.Exit(2)
	}

	content, err := downloader.Download(url)

	if err != nil {
		os.Exit(1)
	}

	fmt.Println(content)
}
