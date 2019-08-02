<?php

namespace Runner;

class Molt implements IOperation
{
    public function getResult($argument1, $argument2, $argument3): int {
        return $argument1 * $argument2 * $argument3;
    }

}
