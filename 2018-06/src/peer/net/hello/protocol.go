package hello

import (
	"crypto/sha256"
	"encoding/binary"
	"errors"
	"fmt"
	"net"
	"peer/net/ipv4"
	"peer/net/multicast"
	"peer/net/unicast"

	uuid "github.com/satori/go.uuid"
)

type Peer struct {
	Ip     string
	Port   uint16
	NodeId [32]byte
}

const OpHello = uint16(1)
const OpWhere = uint16(2)

func generateNodeId() [32]byte {
	uuidVal := uuid.Must(uuid.NewV4()).Bytes()

	return sha256.Sum256([]byte(uuidVal))
}

func ExternalIP() (string, error) {
	ifaces, err := net.Interfaces()
	if err != nil {
		return "", err
	}
	for _, iface := range ifaces {
		if iface.Flags&net.FlagUp == 0 {
			continue // interface down
		}
		if iface.Flags&net.FlagLoopback != 0 {
			continue // loopback interface
		}
		addrs, err := iface.Addrs()
		if err != nil {
			return "", err
		}
		for _, addr := range addrs {
			var ip net.IP
			switch v := addr.(type) {
			case *net.IPNet:
				ip = v.IP
			case *net.IPAddr:
				ip = v.IP
			}
			if ip == nil || ip.IsLoopback() {
				continue
			}
			ip = ip.To4()
			if ip == nil {
				continue // not an ipv4 address
			}
			return ip.String(), nil
		}
	}
	return "", errors.New("are you connected to the network?")
}

func BuildPeer() (*Peer, error) {
	result := Peer{}
	extIp, err := ExternalIP()

	if err != nil {
		return &result, err
	}

	result.Ip = extIp
	result.Port = uint16(unicast.Port)
	result.NodeId = generateNodeId()

	return &result, err
}

func SendHello(peer *Peer, multicastAddr string) error {
	op := make([]byte, 2)
	binary.BigEndian.PutUint16(op, OpHello)

	ip := make([]byte, 4)
	binary.BigEndian.PutUint32(ip, ipv4.IpToUint32(peer.Ip))

	port := make([]byte, 2)
	binary.BigEndian.PutUint16(port, peer.Port)

	msg := append(op, ip...)
	msg = append(msg, port...)
	msg = append(msg, peer.NodeId[:]...)

	return multicast.SendMessage(multicastAddr, msg)
}

func SendWhereIsWorld(multicastAddr string) error {
	op := make([]byte, 2)
	binary.BigEndian.PutUint16(op, OpWhere)

	port := make([]byte, 2)
	binary.BigEndian.PutUint16(port, unicast.Port)

	msg := append(op, port...)

	return multicast.SendMessage(multicastAddr, msg)
}

func ParseHelloMessage(numBytes int, bytes []byte) (Peer, error) {
	var result Peer

	if numBytes != 40 {
		return result, errors.New(fmt.Sprintf("Expected 40 bytes, found %d", numBytes))
	}

	op := binary.BigEndian.Uint16(bytes[0:2])

	if op != OpHello {
		return result, errors.New(fmt.Sprintf("Expected OP hello, found %d", op))
	}

	result.Ip = ipv4.Uint32ToIp(binary.BigEndian.Uint32(bytes[2:6]))

	result.Port = binary.BigEndian.Uint16(bytes[6:8])
	copy(result.NodeId[:], bytes[8:40])

	return result, nil
}

func ParseWhereMessage(numBytes int, bytes []byte) (uint16, error) {
	var port uint16 = 0

	if numBytes != 4 {
		return port, errors.New(fmt.Sprintf("Expected 4 bytes, found %d", numBytes))
	}

	op := binary.BigEndian.Uint16(bytes[0:2])

	if op != OpWhere {
		return port, errors.New(fmt.Sprintf("Expected OP where, found %d", op))
	}

	port = binary.BigEndian.Uint16(bytes[2:4])

	return port, nil
}
