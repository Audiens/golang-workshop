<?php

namespace strategy;

class StrategyDefault implements StrategyInterface
{
    public static function doOperation(int $p1, int $p2, int $p3)
    {
        return 0;
    }
}