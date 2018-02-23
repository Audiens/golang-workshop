package pointers

// SwappableUint8 a swappable uint8
type SwappableUint8 uint8

func (s1 *SwappableUint8) Swap(s2 *SwappableUint8) {
	var tmp1 = *s1
	var tmp2 = *s2

	*s1 = tmp2
	*s2 = tmp1
}
