package f3utility

import (
	"net/url"
	"regexp"
)

func RelToAbsUrl(input []string, url string) (result []string) {
	absRe := regexp.MustCompile("(https?:)?//")

	baseUrlRunes := []rune(url)
	if baseUrlRunes[len(baseUrlRunes)-1] != '/' {
		baseUrlRunes = append(baseUrlRunes, '/')
	}
	baseUrl := string(baseUrlRunes)

	for _, v := range input {
		tmp := v
		if !absRe.MatchString(tmp) {
			tmpRunes := []rune(tmp)

			if tmpRunes[0] == '/' {
				tmp = baseUrl + string(tmpRunes[1:])
			} else {
				tmp = baseUrl + tmp
			}
		}

		result = append(result, tmp)
	}

	return result
}

func Unique(input []string) (result []string) {
	resultMap := map[string]bool{}

	for _, i := range input {
		resultMap[i] = true
	}

	for i, _ := range resultMap {
		result = append(result, i)
	}

	return result
}

func OnlyOfDomain(input []string, baseUrl string) (result []string) {
	parsedUrl, _ := url.Parse(baseUrl)
	domain := parsedUrl.Host

	for _, v := range input {
		if ok, _ := regexp.MatchString(domain, v); ok {
			result = append(result, v)
		}
	}

	return result
}
