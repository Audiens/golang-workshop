<?php

namespace Runner;

class Runner
{
    public function run($what, $argument1, $argument2, $argument3)
    {
        return Operation::Factory($what)->getResult($argument1, $argument2, $argument3);
    }
}
