package data

import "encoding/json"

func Parse(jsonStream []byte) (TopLevel, error) {
	var result TopLevel
	err := json.Unmarshal(jsonStream, &result)

	return result, err
}
