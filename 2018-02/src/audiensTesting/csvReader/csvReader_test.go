package csvReader_test

import (
	"audiensTesting/csvReader"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestMapData(t *testing.T) {
	expected := []csvReader.Anagrafica{
		csvReader.Anagrafica{
			Nome:      "Nome Complessato, Anche",
			Cognome:   "Cognome",
			Via:       "Via",
			Citta:     "Città",
			Provincia: "Provincia",
			ZipCode:   "ZipCode",
		},
	}

	input := `
"Nome Complessato, Anche", Cognome, Via, Città, Provincia, ZipCode
`

	result := csvReader.MapData(input)

	assert.Len(t, result, 1, "There should be only one result")

	assert.Equal(t, expected, result)
}
