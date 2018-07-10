package unicast

import (
	"log"
	"net"
	"peer/net/multicast"
)

const maxDatagramSize = 2048
const Port = uint16(9728)

func SendMessage(unicastAddr string, message []byte) error {
	return multicast.SendMessage(unicastAddr, message)
}

func Join(unicastAddr string, listener func(*net.UDPAddr, int, []byte)) error {
	addr, err := net.ResolveUDPAddr("udp", unicastAddr)

	if err != nil {
		return err
	}

	udpConn, err := net.ListenUDP("udp", addr)

	if err != nil {
		return err
	}

	udpConn.SetReadBuffer(maxDatagramSize)
	for {
		bytes := make([]byte, maxDatagramSize)
		numBytes, src, err := udpConn.ReadFromUDP(bytes)
		if err != nil {
			log.Fatal("ReadFromUDP failed:", err)
		}
		listener(src, numBytes, bytes)
	}

	return nil
}
