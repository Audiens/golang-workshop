<?php


namespace Runner;


class Minus implements OpInterface
{
    public function calc($arg1,$arg2,$arg3):int
    {
        return $arg1-$arg2-$arg3;
    }
}
