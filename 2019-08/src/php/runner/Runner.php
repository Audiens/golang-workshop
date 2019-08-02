<?php

namespace Runner;

class Runner
{
    public function run($what, $argument1, $argument2, $argument3)
    {

        switch ($what) {
            case '+':
                $result = $argument1 + $argument2 + $argument3;
                break;
            case '*':
                $result = $argument1 * $argument2 * $argument3;
                break;
            default:
                $result = 0;
                break;
        }

        return $result;

    }
}
