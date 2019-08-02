<?php


namespace Runner;


class Div implements AritInterface
{

    public function calc(int $param1, int $param2, int $param3): int
    {
        if($param2 == 0 || $param3 == 0){
            return 0;
        }

        return (int)round($param1/$param2/$param3, 1);
    }
}
