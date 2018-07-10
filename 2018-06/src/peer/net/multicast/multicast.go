package multicast

import (
	"log"
	"net"
)

const maxDatagramSize = 2048
const Address = "224.224.0.1"
const Port = 9727

func Join(multicastAddr string, listener func(*net.UDPAddr, int, []byte)) error {
	addr, err := net.ResolveUDPAddr("udp", multicastAddr)

	if err != nil {
		return err
	}

	udpConn, err := net.ListenMulticastUDP("udp", nil, addr)

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

func SendMessage(multicastAddr string, message []byte) error {
	addr, err := net.ResolveUDPAddr("udp", multicastAddr)
	if err != nil {
		return err
	}

	udpConn, err := net.DialUDP("udp", nil, addr)
	udpConn.Write(message)

	if err != nil {
		return err
	}

	err = udpConn.Close()

	return err
}
