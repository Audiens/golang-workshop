# Protocollo HELLO (baby)

Il protocollo definisce un metodo per l'**auto discovery** tra **peer** connessi alla stessa **rete multicast**.

## Porte
Il protocollo utilizza la porta in ascolto UDP `9727` per ascoltare i messaggi multicast, la porta UDP `9728` per quelli unicast.

## OP: helloworld
L'operazione manda in multicast un messaggio rappresentante il suo indirizzo con la porta in ascolto, con un payload
come segue:

- 16 bit (2 byte) (codice operazione, sempre hex: `00 01`)
- 32 bit (4 byte) (indirizzo IPv4)
- 16 bit (2 byte) (porta di ascolto)
- 256 bit (8 sequenze uint32 o 4 sequenze uint64) (32 byte) (identificativo
  peer (node ID))

Ogni peer connesso al multicast riceve il messaggio, leggere il valore ed
inserire nella lista dei peer il nuovo arrivato.

### Esempio:

- IP: 192.168.42.72 (hex: c0 a8 2a 48)
- Porta: 5497 (hex: 15 79)
- Node ID: 3881014792, 2972177988, 314673092, 3499220140, 2484207887, 3140454013, 2782387163, 21199229


Payload (esadecimale, 40 byte):

`[op: 00 01] [ip: c0 a8 2a 48] [port: 15 79] [node id: e7 53 96 08 b1 27 d6 44 12 c1 87 c4 d0 91 dc ac 94 12 01 0f bb 2f 86 7d a5 d7 db db 01 43 79 7d]`

Storage (hash map): `peers[$nodeId] = { ip: $ip, port: $port }`

## OP: whereisworld

L'operazione manda in multicast un messaggio di richiesta di identificazione.
I peer connessi alla rete risponderanno al richiedente i propri identificativi
(op `helloworld`) in unicast. Il codice operazione è `00 02`.

### Esempio

Il nodo A entra nella rete multicast ed invia il proprio identificativo tramite
operatore `helloworld`. Per conoscere i membri della rete invia anche l'op
`whereisworld`, il quale riceverà successivamente il messaggio `helloworld` in
risposta dai singoli peer connessi.

- **A** invia `helloworld`, `whereisworld` (multicast)
- **B, C, D** (connessi alla rete) ricevono i due comandi e registrano **A** in
risposta all'op `helloworld`
- **B, C, D** in risposta all'op `whereisworld` inviano in unicast il messaggio
`helloworld` direttamente ad **A**, il quale registra **B, C, D**


# Esempi di codice

## Calcolo IPv4 (dot notation a uint32)

- PHP: ip2long
- Formula (shift binario): `ip[3] << 24 + ip[2] << 16 + ip[1] << 8 + ip[0]`
- Formula (somma, shift binario): `SUM(ip[i] << 8 * (3-i))`

Esempio:
```go
func uint32ToIp(ipLong uint32) string {
	var ipStr [4]string

	for i := 0; i < 4; i++ {
		ipPart := ( ipLong >> uint32((3-i)*8) ) & 0xFF
		ipStr[i] = strconv.Itoa(int(ipPart))
	}

	return strings.Join(ipStr[:], ".")
}
```

## Calcolo IPv4 (uint32 a dot notation)

- PHP: long2ip
- Formula (unshift binario): `ip[i] = (ipLong >> ((3-i)*8)) & 0xFF`

Esempio:
```go
func uint32ToIp(ipLong uint32) string {
	var ipStr [4]string

	for i := 0; i < 4; i++ {
		ipPart := ( ipLong >> uint32((3-i)*8) ) & 0xFF
		ipStr[i] = strconv.Itoa(int(ipPart))
	}

	return strings.Join(ipStr[:], ".")
}
```
