<?php

namespace Runner;

class Runner
{
    public function run($what, $argument1, $argument2, $argument3)
    {

        $factory = new AritFactory();

        $opClass = $factory->getArith($what);

        return $opClass->calc($argument1,$argument2,$argument3);

    }
}
