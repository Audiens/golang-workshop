<?php

namespace factory;

use runner\Runner;
use runner\RunnerDefault;
use runner\RunnerMulti;
use runner\RunnerPlus;

class RunnerFactory implements RunnerFactoryInterface
{
    public function makeRunner($op = null) :RunnerInterface
    {
        switch($op){
            case "+":
                return new RunnerPlus();
            case "*":
                return new RunnerMulti();
            case "@":
                return new Runner();
            default:
                return new RunnerDefault();
        }
    }
}
