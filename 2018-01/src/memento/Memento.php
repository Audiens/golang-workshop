<?php

namespace memento;

// Mori
class Memento
{
    /** @var int */
    private $state;

    public function __construct(int $state)
    {
        $this->state = $state;
    }

    public function getState(): int
    {
        return $this->state;
    }
}
