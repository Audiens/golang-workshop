<?php

namespace Runner;

class Operation
{
    public static function Factory($what): IOperation
    {

        switch ($what) {
            case '+':
                $result = new Sum();
                break;
            case '*':
                $result = new Molt();
                break;
            case '-':
                $result = new Sub();
                break;
            default:
                $result = New InvalidOperation();
                break;
        }

        return $result;

    }
}
