package main

// Square a square
type Square struct {
	width float64
}

// Rectangular a rectangular
type Rectangular struct {
	width  float64
	height float64
}

// Circle a circle
type Circle struct {
	radius float64
}

// Triangle a triangle
type Triangle struct {
	side1 float64
	side2 float64
	side3 float64
}

func main() {
	// Create an interface which allows to calculate the area and the perimeter of different geometric structs
	// and implement the interface in the above structs, then test it
}
