package main

import "fmt"

// Command a command definition
type Command struct {
	Operation string  `json:"op"`
	Arg1      float64 `json:"arg1"`
	Arg2      float64 `json:"arg2"`
}

// Result the result of a command
type Result struct {
	command Command
	result  float64
}

func (cmd *Command) String() string {
	switch op := cmd.Operation; op {
	case "multiply":
		return fmt.Sprintf("%.2fx%.2f", cmd.Arg1, cmd.Arg2)
	case "sum":
		return fmt.Sprintf("%.2f+%.2f", cmd.Arg1, cmd.Arg2)
	case "subtraction":
		return fmt.Sprintf("%.2f-%.2f", cmd.Arg1, cmd.Arg2)
	case "division":
		return fmt.Sprintf("%.2f/%.2f", cmd.Arg1, cmd.Arg2)
	}

	return fmt.Sprintf("Unknown operation: %s (%.2f, %.2f)", cmd.Operation, cmd.Arg1, cmd.Arg2)
}

func (res *Result) String() string {
	return fmt.Sprintf("%s = %.2f", res.command.String(), res.result)
}

func main() {
	// Create and test a function able to parse the provided JSON file.
	// Depending on the number of CPU units, let the application spawn (CPUnum - 1) go routines
	// to put the results in a slice of Result{s}.
	//
	// Eventually print the results
}
