package ipv4

import (
	"strconv"
	"strings"
)

func IpToUint32(ip string) uint32 {
	parts := strings.Split(ip, ".")
	result := uint32(0)

	for i, num := range parts {
		intVal, _ := strconv.ParseUint(num, 10, 8)

		result += uint32(intVal) << uint32(8*(3-i))
	}

	return result
}

func Uint32ToIp(ipLong uint32) string {
	var ipStr [4]string

	for i := 0; i < 4; i++ {
		ipPart := (ipLong >> uint32((3-i)*8)) & 0xFF
		ipStr[i] = strconv.Itoa(int(ipPart))
	}

	return strings.Join(ipStr[:], ".")
}
