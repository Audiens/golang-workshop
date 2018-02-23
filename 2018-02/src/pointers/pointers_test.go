package pointers_test

import (
	"pointers"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestSwap(t *testing.T) {
	const aValue pointers.SwappableUint8 = 8
	const bValue pointers.SwappableUint8 = 10

	var aVar pointers.SwappableUint8 = aValue
	var bVar pointers.SwappableUint8 = bValue

	aVar.Swap(&bVar)

	assert.Equal(t, bValue, aVar)
	assert.Equal(t, aValue, bVar)

	bVar.Swap(&aVar)

	assert.Equal(t, aValue, aVar)
	assert.Equal(t, bValue, bVar)
}
