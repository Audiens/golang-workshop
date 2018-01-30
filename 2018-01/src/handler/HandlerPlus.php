<?php

namespace handler;

use Data\DataObject;

class HandlerPlus extends Handler
{
    public function __construct(Handler $handler = null)
    {
        parent::__construct($handler);
    }

    protected function processing(DataObject $data)
    {
        if ($data->getOperator() == '+') {
            return $data->getP1() + $data->getP2() + $data->getP3();
        }

        return null;
    }


}