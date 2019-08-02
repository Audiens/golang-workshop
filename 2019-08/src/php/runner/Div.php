<?php


namespace Runner;


class Div implements OpInterface
{
    public function calc($arg1,$arg2,$arg3):int
    {
        return (int)round($arg1/$arg2/$arg3,0);
    }
}
