<?php

namespace Runner;

interface IOperation
{
    public function getResult($argument1, $argument2, $argument3): int;

}
