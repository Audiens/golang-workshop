package f3utility_test

import (
	"fase3/f3utility"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestRelToAbsUrl(t *testing.T) {
	url := "http://mywebsite.test"
	input := []string{
		"page.html", "http://test.my.page.it",
		"/yeppa/whatever.html", "//my.websi.te",
	}
	expected := []string{
		"http://mywebsite.test/page.html",
		"http://test.my.page.it",
		"http://mywebsite.test/yeppa/whatever.html",
		"//my.websi.te",
	}

	result := f3utility.RelToAbsUrl(input, url)

	assert.Equal(t, expected, result)
}

func TestUnique(t *testing.T) {
	input := []string{"a", "b", "c", "c", "b", "a"}
	expected := []string{"a", "b", "c"}
	result := f3utility.Unique(input)

	assert.Equal(t, expected, result)
}

func TestOnlyOfDomain(t *testing.T) {
	url := "http://domain.test/path"
	input := []string{"http://domain.test/path/yes", "http://domain.test/another/path", "http://othersite.test"}
	expected := []string{"http://domain.test/path/yes", "http://domain.test/another/path"}
	result := f3utility.OnlyOfDomain(input, url)

	assert.Equal(t, expected, result)
}
