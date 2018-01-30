<?php

require_once __DIR__.'/../vendor/autoload.php';

$runner = new \runner\Runner();

$szObs = new \runner\Observer();
$runner->attach($szObs);

echo $runner->run('+',1,1,2);
echo $runner->run('*',7,5,2);
echo $runner->run('?',65,92,41);


