<?php

namespace Runner;

class Runner
{
    public function run($operation, $argument1, $argument2, $argument3):int
    {

        $classToUse = new Defaultiamo();

        switch ($operation){
            case '+':
                $classToUse = new Sum();
                break;
            case '*':
                $classToUse = new MoltCarmeloMolt();
                break;
            case '-':
                $classToUse = new Sottr();
                break;
            case '/':
                $classToUse = new Div();
                break;
            default:
                break;
        }

        $strategy = new StrategyFare($classToUse);

        return $strategy->faiOperazione($argument1, $argument2, $argument3);
    }
}
