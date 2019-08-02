<?php


namespace Runner;


class AritFactory
{

    public function getArith(string $operation):OpInterface
    {
        switch($operation){
            case '+':
                return new Add();
                break;
            case '*':
                return new Mult();
                break;
            case '-':
                return new Minus();
                break;
            case '/':
                return new Div();
                break;
            default:
                return new DefaultOp();
        }
    }
}
