package csvReader

import (
	"encoding/csv"
	"strings"
)

type Anagrafica struct {
	Nome      string
	Cognome   string
	Via       string
	Citta     string
	Provincia string
	ZipCode   string
}

func MapData(csvData string) []Anagrafica {
	var result []Anagrafica

	r := csv.NewReader(strings.NewReader(csvData))
	records, _ := r.ReadAll()

	for _, record := range records {
		anag := Anagrafica{
			Nome:      strings.Trim(record[0], " "),
			Cognome:   strings.Trim(record[1], " "),
			Via:       strings.Trim(record[2], " "),
			Citta:     strings.Trim(record[3], " "),
			Provincia: strings.Trim(record[4], " "),
			ZipCode:   strings.Trim(record[5], " "),
		}

		result = append(result, anag)
	}

	return result
}
