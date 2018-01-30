<?php

namespace runner;

use memento\Originator;

class Runner
{
    private $originator;
    private $memento;

    public function __construct()
    {
        $this->originator = new Originator();
    }

    /**
     * @param string $op
     * @param int[] ...$arguments
     *
     * @return int
     */
    public function run(string $op, ...$arguments): int
    {
        switch ($op) {
            case '+':
                return $this->originator->sum($arguments);
            case '+s':
                $this->memento = $this->originator->createMemento();
                $result = $this->originator->sum($arguments);

                return $result;
            case '+r':
                if ($this->memento !== null) {
                    $this->originator->restoreMemento($this->memento);
                }

                return $this->originator->sum($arguments);
            default:
                return 0;
        }
    }
}
