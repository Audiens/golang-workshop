<?php

namespace runner;

use factory\RunnerInterface;

class RunnerDefault implements RunnerInterface
{
    public function run($what, $argument1, $argument2, $argument3)
    {
        return 0;
    }
}
