package main

// SwappableUint8 a swappable uint8
type SwappableUint8 uint8

// Swappable a struct which is able to swap its content with another one
type Swappable interface {
	Swap(Swappable)
}

func main() {
	// implement the Swappable interface on the SwappableUint8 type
	// and test it
}
