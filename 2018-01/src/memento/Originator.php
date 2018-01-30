<?php

namespace memento;

// Mother
class Originator
{
    /** @var int */
    private $state;

    public function createMemento(): Memento
    {
        return new Memento($this->state);
    }

    public function restoreMemento(Memento $memento): void
    {
        $this->state = $memento->getState();
    }

    /**
     * @return int
     */
    public function getState(): int
    {
        return $this->state;
    }

    /**
     * @param int[] $arguments
     * @return int
     */
    public function sum(array $arguments)
    {
        $this->state++;

        return array_reduce($arguments, function ($carry, $num) {
            return $num + $carry;
        }, 0) + $this->state;
    }
}
