package routine_test

import (
	"encoding/json"
	"fmt"
	"goroutine/routine"
	"io/ioutil"
	"strings"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestDoOperationsStack(t *testing.T) {
	var commands = []routine.Command{}
	var jsonStream, _ = ioutil.ReadFile("../operations.json")
	var decoder = json.NewDecoder(strings.NewReader(string(jsonStream)))

	decoder.Decode(&commands)

	results := routine.DoOperationsStack(commands)

	assert.Len(t, results, 8, "There should be 8 results")

	for _, result := range results {
		fmt.Println(result.String())
	}
}
