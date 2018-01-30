<?php

namespace runner;

use Data\DataObject;
use handler\HandlerConcat;
use handler\HandlerMoltiplic;
use handler\HandlerPlus;

class Runner
{
    public function run($what, $argument1, $argument2, $argument3)
    {

        $dataObject = new DataObject();

        $dataObject->setOperator($what);

        $dataObject->setP1($argument1);
        $dataObject->setP2($argument2);
        $dataObject->setP3($argument3);

        $chain = new HandlerConcat(new HandlerPlus(new HandlerMoltiplic()));

        return $chain->handle($dataObject);

    }
}
