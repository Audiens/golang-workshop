package main

import (
	"encoding/binary"
	"encoding/hex"
	"fmt"
	"net"
	"peer/net/hello"
	"peer/net/multicast"
	"peer/net/unicast"
	"time"
)

var peers map[string]hello.Peer
var myself *hello.Peer

func listener(src *net.UDPAddr, numBytes int, bytes []byte) {
	fmt.Printf("Read %d bytes from %+v\n", numBytes, src)
	// fmt.Printf("%+v", bytes[0:numBytes])

	op := binary.BigEndian.Uint16(bytes[0:2])
	switch op {
	case hello.OpHello:
		peer, err := hello.ParseHelloMessage(numBytes, bytes)
		if err != nil {
			fmt.Printf("%+v\n", err)

			return
		}

		if string(peer.NodeId[:]) == string(myself.NodeId[:]) {
			return
		}

		fmt.Printf("Found HELLOWORLD operator with data: %+v\n", peer)

		peers[hex.EncodeToString(peer.NodeId[:])] = peer
		break
	case hello.OpWhere:
		port, err := hello.ParseWhereMessage(numBytes, bytes)

		fmt.Println(src.IP.String())
		remoteIp := src.IP.String()
		if remoteIp == myself.Ip && port == myself.Port {
			return
		}

		if err != nil {
			fmt.Printf("%+v\n", err)

			return
		}

		fmt.Printf("Found WHEREISWORLD operator with port: %d\n", port)
		fmt.Println("Sending message back on the specified port.")
		err = hello.SendHello(myself, fmt.Sprintf("%s:%d", remoteIp, port))

		if err != nil {
			panic(err)
		}

		break
	default:
		fmt.Println("何?!?") // Nani?!?
		break
	}
}

func main() {
	peer, err := hello.BuildPeer()
	multicastAddr := fmt.Sprintf("%s:%d", multicast.Address, multicast.Port)
	peers = make(map[string]hello.Peer)

	if err != nil {
		panic(err)
	}

	myself = peer

	extIp, err := hello.ExternalIP()

	go multicast.Join(multicastAddr, listener)
	go unicast.Join(fmt.Sprintf("%s:%d", extIp, unicast.Port), listener)

	err = hello.SendHello(myself, multicastAddr)

	if err != nil {
		panic(err)
	}

	err = hello.SendWhereIsWorld(multicastAddr)

	if err != nil {
		panic(err)
	}

	for {
		time.Sleep(time.Second)
	}
}
