package downloader

import (
	"errors"
	"fmt"
	"io/ioutil"
	"net/http"

	"github.com/sirupsen/logrus"
)

// Download download a web page's text content
func Download(url string) (string, error) {
	logrus.WithField("URL", url).Info("Downloading...")

	response, err := http.Get(url)

	if err != nil || response.StatusCode != 200 {
		if err == nil {
			err = errors.New(fmt.Sprintf("Status code: %d", response.StatusCode))
		}

		logrus.Error("Unable to download the page.")
		return "", err
	}

	defer response.Body.Close()
	content, err := ioutil.ReadAll(response.Body)

	if err != nil {
		logrus.Error("Unable to read the response's body!")
	}

	return string(content), err
}
