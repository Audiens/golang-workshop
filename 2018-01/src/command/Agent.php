<?php

namespace command;

// 007
class Agent
{
    /** @var CommandInterface[]*/
    private $queue;

    public function __construct()
    {
        $this->queue = [];
    }

    public function placeCommand(CommandInterface $command)
    {
        array_push($this->queue, $command);
        $toExec = array_shift($this->queue);

        if ($toExec !== null) {
            $toExec->execute();
        }
    }
}
