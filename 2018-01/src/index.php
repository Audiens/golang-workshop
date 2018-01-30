<?php

require_once __DIR__.'/../vendor/autoload.php';

$runner = new \runner\Runner();
$facade = new \facade\RunnerFacade($runner);


$facade->execute();

