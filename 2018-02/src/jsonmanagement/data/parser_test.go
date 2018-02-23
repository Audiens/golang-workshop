package data_test

import (
	"io/ioutil"
	"jsonmanagement/data"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestParse(t *testing.T) {
	jsonStream, _ := ioutil.ReadFile("../example.json")

	result, err := data.Parse(jsonStream)

	assert.Nil(t, err, "There should not be an error")
	assert.Equal(t, "SVG Viewer", result.Header)
	assert.Len(t, result.Items, 22)
	assert.Equal(t, data.Description{}, result.Items[2])
	assert.Equal(t, data.Description{Id: "OpenNew", Label: "Open New"}, result.Items[1])
}
