<?php

namespace strategy;

interface StrategyInterface
{
    public const SUM = "+";
    public const MULTIPLY = "*";
    public const CONCAT = "?";

    public static function doOperation(int $p1, int $p2, int $p3);
}