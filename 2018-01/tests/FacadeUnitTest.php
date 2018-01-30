<?php

use facade\RunnerFacade;
use PHPUnit\Framework\TestCase;
use Prophecy\Prophecy\ObjectProphecy;
use runner\Runner;

class FacadeUnitTest extends TestCase
{
    public function testMain()
    {
        /** @var Runner|ObjectProphecy $runner */
        $runner = $this->prophesize(Runner::class);
        $runner->run('+',5,5,5)
               ->shouldBeCalled();
        $runner->run('*',4,6,7)
               ->shouldBeCalled();
        $runner->run('?',95,45,63)
               ->shouldBeCalled();
        $runner->run('?',1,2,3)
               ->shouldBeCalled();

        $facade = new RunnerFacade($runner->reveal());
        $facade->execute();
    }
}