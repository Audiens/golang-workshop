package main

import (
        "fmt"
        "log"
        "os"
)

func main() {
	if len(os.Args) != 2 {
                fmt.Fprintf(os.Stderr, "Usage: %s URL\n", os.Args[0])
                os.Exit(1)
        }
}

