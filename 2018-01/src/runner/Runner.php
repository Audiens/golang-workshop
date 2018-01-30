<?php

namespace runner;

use strategy\StrategyConcat;
use strategy\StrategyDefault;
use strategy\StrategyInterface;
use strategy\StrategyMultiply;
use strategy\StrategySum;

class Runner
{
    public function run($what, $argument1, $argument2, $argument3)
    {
        switch ($what) {
            case StrategyInterface::SUM:
                return StrategySum::doOperation($argument1, $argument2, $argument3);
            case StrategyInterface::MULTIPLY:
                return StrategyMultiply::doOperation($argument1, $argument2, $argument3);
            case StrategyInterface::CONCAT:
                return StrategyConcat::doOperation($argument1, $argument2, $argument3);
            default:
                return StrategyDefault::doOperation($argument1, $argument2, $argument3);
        }
    }
}
