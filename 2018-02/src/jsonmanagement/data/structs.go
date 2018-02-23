package data

type Description struct {
	Id    string `json:"id"`
	Label string `json:"label"`
}

type TopLevel struct {
	Header string        `json:"header"`
	Items  []Description `json:"items"`
}
