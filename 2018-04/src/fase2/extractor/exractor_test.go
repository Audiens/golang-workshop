package extractor_test

import (
	"fase2/extractor"
	"io/ioutil"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestExtractLinks(t *testing.T) {

	html, _ := ioutil.ReadFile("./test_webpage.html")
	extracted := extractor.ExtractLinks(string(html))
	expected := []string{
		"/", "/", "#", "/doc/", "/pkg/", "/project/",
		"/help/", "/blog/", "http://play.golang.org/",
		"#", "#", "//tour.golang.org/", "/dl/",
		"//blog.golang.org/", "https://developers.google.com/site-policies#restrictions",
		"/LICENSE", "/doc/tos.html", "http://www.google.com/intl/en/policies/privacy/",
	}

	assert.Equal(t, expected, extracted)
}
