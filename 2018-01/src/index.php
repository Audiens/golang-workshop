<?php

require_once __DIR__.'/../vendor/autoload.php';

$runnerFactory = new \factory\RunnerFactory();

$runner = $runnerFactory->makeRunner('@');

for($i = 0;$i < 10;$i++){
   echo $runner->run('+',1,1,2);
}




