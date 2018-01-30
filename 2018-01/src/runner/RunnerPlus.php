<?php

namespace runner;

use factory\RunnerInterface;

class RunnerPlus implements RunnerInterface
{
    public function run($what, $argument1, $argument2, $argument3)
    {
        return $argument1 + $argument2 + $argument3;
    }
}
