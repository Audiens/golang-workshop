<?php

require_once __DIR__.'/../vendor/autoload.php';

$runner = new \runner\Runner();

$arg1 = 1;
$arg2 = 1;
$arg3 = 2;

$runner->run('+', $arg1, $arg2, $arg3);


