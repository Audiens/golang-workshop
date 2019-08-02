<?php

require_once __DIR__.'/../../vendor/autoload.php';

$runner = new \Runner\Runner();

echo $runner->run('+',1,1,2);
echo $runner->run('*',7,5,2);
echo $runner->run('-',80,40,20);
echo $runner->run('/',50,2,5);
echo $runner->run('?',65,92,41);


