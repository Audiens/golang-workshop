<?php

namespace command;

class MathObject
{
    /** @var array */
    private $arguments;

    /**
     * MathLogics constructor.
     * @param int[]|float[] $arguments
     */
    public function __construct(...$arguments)
    {
        $this->arguments = $arguments;
    }

    /**
     * @return int|float
     */
    public function add() {
         $result = 0;

         foreach($this->arguments as $n){
             $result += $n;
         }

         return $result;
    }
}
