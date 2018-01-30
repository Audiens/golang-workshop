<?php

namespace runner;

use factory\RunnerInterface;

class RunnerMulti implements RunnerInterface
{
    public function run($what, $argument1, $argument2, $argument3)
    {
        return $argument1 * $argument2 * $argument3;
    }
}
