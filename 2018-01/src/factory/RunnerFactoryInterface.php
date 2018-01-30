<?php

namespace factory;

interface RunnerFactoryInterface
{
    public function makeRunner(): RunnerInterface;
}
