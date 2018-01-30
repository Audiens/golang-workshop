<?php

namespace runner;

use command\AddCommand;
use command\Agent;
use command\MathObject;

class Runner
{
    public function run($operator, $argument1, $argument2, $argument3)
    {
        $mathObject = new MathObject($argument1, $argument2, $argument3);
        $smith = new Agent();

        switch ($operator) {
            case '+':
                $addCommand = new AddCommand($mathObject);
                $smith->placeCommand($addCommand);
                break;
            default:
                break;
        }
    }
}
