package intfs_test

import (
	"intfs/intfs"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestRectangular(t *testing.T) {
	var rect = intfs.Rectangular{
		Width:  300,
		Height: 400,
	}

	assert.Equal(t, float64(1400), rect.Perim(), "perimeter should be 1400")
	assert.Equal(t, float64(120000), rect.Area(), "area should be 120000")
}

func TestSquare(t *testing.T) {
	var square = intfs.Square{
		Width: 300,
	}

	assert.Equal(t, float64(1200), square.Perim(), "perimeter should be 1200")
	assert.Equal(t, float64(90000), square.Area(), "area should be 90000")
}

func TestCircle(t *testing.T) {
	var circle = intfs.Circle{
		Radius: 20,
	}

	assert.Equal(t, float64(125.66370614359172), circle.Perim(), "perimeter should be 125.66370614359172")
	assert.Equal(t, float64(1256.6370614359173), circle.Area(), "area should be 1256.6370614359173")
}

func TestTriangle(t *testing.T) {
	var triangle = intfs.Triangle{
		Side1: 18,
		Side2: 30,
		Side3: 24,
	}

	assert.Equal(t, float64(72), triangle.Perim(), "perimeter should be 72")
	assert.Equal(t, float64(216), triangle.Area(), "area should be 216")
}
