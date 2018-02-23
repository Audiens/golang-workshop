package intfs

import (
	"math"
)

type Geometry interface {
	Area() float64
	Perim() float64
}

// Square a square
type Square struct {
	Width float64
}

// Rectangular a rectangular
type Rectangular struct {
	Width  float64
	Height float64
}

// Circle a circle
type Circle struct {
	Radius float64
}

// Triangle a triangle
type Triangle struct {
	Side1 float64
	Side2 float64
	Side3 float64
}

func (s Square) Area() float64 {
	return s.Width * s.Width
}

func (s Square) Perim() float64 {
	return s.Width * 4
}

func (r Rectangular) Area() float64 {
	return r.Width * r.Height
}

func (r Rectangular) Perim() float64 {
	return 2*r.Width + 2*r.Height
}

func (c Circle) Area() float64 {
	return math.Pi * c.Radius * c.Radius
}

func (c Circle) Perim() float64 {
	return c.Radius * 2 * math.Pi
}

func (t Triangle) Area() float64 {
	p := t.Perim() / 2

	return math.Sqrt(p * (p - t.Side1) * (p - t.Side2) * (p - t.Side3))
}

func (t Triangle) Perim() float64 {
	return t.Side1 + t.Side2 + t.Side3
}
