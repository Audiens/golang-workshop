<?php

namespace runner;

use factory\RunnerFactory;
use factory\RunnerInterface;

class Runner implements RunnerInterface
{
    private $runnerFactory;

    function __construct()
    {
        $this->runnerFactory = new RunnerFactory();
    }

    public function run($what, $argument1, $argument2, $argument3)
    {
        return $this->runnerFactory->makeRunner($what)->run($what, $argument1, $argument2, $argument3);
    }
}
