package routine

import (
	"runtime"
	"sync"
)

type CmdList []Command

func DoOperation(cmd Command, results *[]Result) {
	switch cmd.Operation {
	case "sum":
		*results = append(*results, Result{command: cmd, result: cmd.Arg1 + cmd.Arg2})
		break
	case "subtraction":
		*results = append(*results, Result{command: cmd, result: cmd.Arg1 - cmd.Arg2})
		break
	case "multiply": // Alias: multiplic
		*results = append(*results, Result{command: cmd, result: cmd.Arg1 * cmd.Arg2})
		break
	case "division": // Tom Clancy The
		*results = append(*results, Result{command: cmd, result: cmd.Arg1 / cmd.Arg2})
		break
	}
}

func DoCmdList(list CmdList, results *[]Result, callable func()) {
	defer callable()

	for _, cmd := range list {
		DoOperation(cmd, results)
	}
}

func DoOperationsStack(cmds []Command) []Result {
	numRoutines := runtime.NumCPU() - 1
	results := &[]Result{}
	cmdList := []CmdList{}

	for i := 0; i < len(cmds); i++ {
		var index = i % numRoutines

		if len(cmdList) == index {
			cmdList = append(cmdList, CmdList{})
		}

		cmdList[index] = append(cmdList[index], cmds[i])
	}

	var wg sync.WaitGroup

	wg.Add(numRoutines)

	for _, list := range cmdList {
		go DoCmdList(list, results, func() {
			wg.Done()
		})
	}

	wg.Wait()

	return *results
}
