<?php

namespace Runner;

class InvalidOperation implements IOperation
{
    public function getResult($argument1, $argument2, $argument3): int {
        return 0;
    }

}
