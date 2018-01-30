<?php

namespace runner;

class Runner
{
    private $observers = []; // We will store observers here

    public function attach($observer)
    {
        if (!in_array($observer, $this->observers)) {
            $this->observers[] = $observer;
        }
    }


    public function notify($param1, $param2)
    {
        foreach ($this->observers as $observer) {
            $observer->notify($param1, $param2);
        }
    }

    public function run($what, $argument1, $argument2, $argument3)
    {

        $this->notify($argument1, $argument2);

        switch ($what) {
            case '+':
                $result = $argument1 + $argument2 + $argument3;
                break;
            case '*':
                $result = $argument1 * $argument2 * $argument3;
                break;
            default:
                $result = 0;
                break;
        }

        return $result;

    }
}

class Observer
{
    public function notify($param1, $param2)
    {
        if ($param2 === 5) {
            echo "@";
        }

        if ($param1 == 1) {
            echo "?";
        }

    }
}
