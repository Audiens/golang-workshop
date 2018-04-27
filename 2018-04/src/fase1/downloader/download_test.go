package downloader_test

import (
	"fase1/downloader"
	"testing"

	"github.com/stretchr/testify/assert"
	httpmock "gopkg.in/jarcoal/httpmock.v1"
)

func TestDownloadSuccess(t *testing.T) {
	const url = "http://mywebsite.test"
	const content = "21399c1f-025f-494f-8142-25c88c57fea8"

	httpmock.Activate()
	defer httpmock.DeactivateAndReset()

	httpmock.RegisterResponder("GET", url, httpmock.NewStringResponder(200, content))

	downloaded, err := downloader.Download(url)

	assert.NoError(t, err, "There should be no error downloading a mocked website")
	assert.Equal(t, content, downloaded, "The downloaded content should be the mocked one")
}

func TestDownload404(t *testing.T) {
	const url = "http://mywebsite.test"
	const content = "21399c1f-025f-494f-8142-25c88c57fea8"

	httpmock.Activate()
	defer httpmock.DeactivateAndReset()

	httpmock.RegisterResponder("GET", url, httpmock.NewStringResponder(404, content))

	downloaded, err := downloader.Download(url)

	assert.Error(t, err, "The server should return 404")
	assert.Equal(t, "", downloaded, "It should stop reading the content upon non-200 status code")
}
