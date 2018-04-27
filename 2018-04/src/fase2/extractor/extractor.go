package extractor

import (
	"regexp"
)

func ExtractLinks(html string) []string {
	re := regexp.MustCompile(`<a.*href="([^"]+)"`)
	matched := re.FindAllStringSubmatch(html, -1)

	result := []string{}

	for _, m := range matched {
		result = append(result, m[1])
	}

	return result
}
