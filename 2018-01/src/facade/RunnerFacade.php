<?php

namespace facade;

use runner\Runner;

class RunnerFacade
{
    /** @var Runner */
    private $runner;

    /**
     * Facade constructor.
     * @param $runner
     */
    public function __construct(Runner $runner)
    {
        $this->runner = $runner;
    }

    function execute(): void {
        echo $this->runner->run('+',5,5,5);
        echo $this->runner->run('*',4,6,7);
        echo $this->runner->run('?',95,45,63);
        echo $this->runner->run('?',1,2,3);
    }
}
