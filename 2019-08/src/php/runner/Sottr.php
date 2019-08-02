<?php


namespace Runner;


class Sottr implements AritInterface
{

    public function calc(int $param1, int $param2, int $param3): int
    {
        return $param1 - $param2 - $param3;
    }
}
