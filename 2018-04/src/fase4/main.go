package main

import (
	"fase1/downloader"
	"fase2/extractor"
	"fase3/f3utility"
	"fmt"
	"os"
	"regexp"
	"strconv"
	"strings"
)

var visited = make(map[string]bool)

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

	messages := make(chan string)
	done := make(chan bool)

	go func() {
		messages <- url
	}()

	fmt.Println(len(messages))

	totalCrawled := 0

	for singleUrl := range messages {
		go crawl(singleUrl, messages, done)
		totalCrawled++

		go func() {
			varDone := <-done

			if varDone {
				close(messages)
			}
		}()
	}

	fmt.Println("Total url crawled: " + strconv.Itoa(totalCrawled))

}

func crawl(url string, messages chan string, done chan bool) {
	fmt.Println("WILL CRAWL " + url)

	content, err := downloader.Download(url)

	if err != nil {
		fmt.Println("CANNOT CRAWL " + url + " ERR: " + err.Error())
		return
	}

	extracted := extractor.ExtractLinks(content)
	extracted = f3utility.RelToAbsUrl(extracted, url)
	extracted = f3utility.Unique(extracted)
	extracted = f3utility.OnlyOfDomain(extracted, url)

	aORb := regexp.MustCompile("\\?|#|.html")

	added := 0

	for _, e := range extracted {

		matches := aORb.FindAllStringIndex(e, -1)
		if len(matches) > 1 {
			continue
		}

		if strings.Contains(e, "mailto") {
			continue
		}
		if strings.Contains(e, "/#") {
			continue
		}
		if len(e) > 150 {
			continue
		}

		if visited[e] {
			continue
		}

		visited[e] = true
		added++
		messages <- e
	}

	if added == 0 {
		go func() {
			done <- true
		}()
	}
}
