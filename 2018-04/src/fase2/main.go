package main

import (
	"fase1/downloader"
	"fase2/extractor"
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

	isUrlMatched, _ := regexp.MatchString("^https?://.{1,}", url)
	if !isUrlMatched {
		fmt.Fprintf(os.Stderr, "You must provide a valid url!\n")
		os.Exit(2)
	}

	content, err := downloader.Download(url)

	if err != nil {
		os.Exit(1)
	}

	extracted := extractor.ExtractLinks(content)

	for _, e := range extracted {
		fmt.Println(e)
	}
}
