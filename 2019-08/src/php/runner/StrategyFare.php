<?php


namespace Runner;


class StrategyFare
{

    private $coso;

    public function __construct(AritInterface $coso)
    {
        $this->coso = $coso;
    }

    public function faiOperazione($param1, $param2, $param3):int
    {
        return $this->coso->calc($param1, $param2, $param3);
    }
}
